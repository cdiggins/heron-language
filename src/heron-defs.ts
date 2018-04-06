// This module provides support for dealing with definitions.  
// A definition could be a function definition, parameter definition, variable definition, type definition. 
 
import { Myna } from "myna-parser/myna";
import { visitAst, validateNode, throwError, HeronAstNode } from "./heron-ast-rewrite";
import { Expr, createExpr } from "./heron-expr";
import { Type } from "./type-system";

// This is a definition of a name. It could be a function, variable, type
export class Def {    
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string, 
    )
    { node.def = this; }

    // Added as a post-process step 
    type: Type;
    
    toString() {
        return this.name + '_' + this.constructor['name'] + this.node['id'];
    }
}

export function typeNodeToStr(node: HeronAstNode): string {
    if (!node || !node.allText) return "any";
    return node.allText;
}

// Represents the definition of a function 
export class FuncDef extends Def 
{    
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string, 
        public readonly retTypeNode: HeronAstNode,
        public readonly params: FuncParamDef[],
        public readonly genericParams: TypeParamDef[],
        public readonly body: HeronAstNode, 
        )
    { super(node, name); }
    
    toString(): string {
        return this.name + "(" + this.params.join(", ") + ") : " + typeNodeToStr(this.retTypeNode);
    }

    get isIntrinsic(): boolean {
        return !this.body;
    }
}

// Represent a parameter to a function or a lambda expression 
export class FuncParamDef extends Def
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string, 
        public readonly typeNode: HeronAstNode,
    )
    { super(node, name); }

    toString(): string {
        return this.name +  " : " + typeNodeToStr(this.typeNode);
    }
}

// Represents the definition of a variable. 
export class VarDef extends Def
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string, 
        public readonly exprNode: HeronAstNode,
    )
    { super(node, name); }    
}

// Represents the definition of a variable used in a for loop
// The type is not known, until the type of the expression is figured out.
// Unlike a VarDef the expression must be an array.
export class ForLoopVarDef extends Def
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string, 
        public readonly exprNode: HeronAstNode,
    )
    { super(node, name); }    
}

// Represents the definition of a type 
export class TypeDef extends Def
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string, 
    )
    { super(node, name); }        
}

// Represents the definition of a generic type parameter 
export class TypeParamDef extends Def
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string, 
        public readonly constraint: HeronAstNode
    )
    { super(node, name); }        
}

//==========================================================================================
// Exported functions

export function createDef(node: HeronAstNode): Def {
    // NOTE: typeParamDef and funcParamDef are created by the funcDef    
    switch (node.name) {
        case "funcDef": 
        case "intrinsicDef": 
            return createFuncDef(node); 
        case "typeDef": 
            return createTypeDef(node); 
        case "forLoop":
            return createForLoopVarDef(node);
        case "varDecl": 
            return createVarDef(node); 
        case "lambdaArg":
        case "lambdaArgNoType":
            return createFuncParamDef(node);
    }
    return null
}

//==========================================================================================

export function createTypeParam(node: HeronAstNode): TypeParamDef {
    validateNode(node, 'genericParam');
    let name = node.children[0].allText;
    let constraint = node.children.length > 1 ? node.children[1] : null;
    return new TypeParamDef(node, name, constraint);
}

export function createFuncDef(node: HeronAstNode): FuncDef {
    validateNode(node, 'funcDef', 'intrinsicDef');
    let sig = validateNode(node.children[0], 'funcSig');
    let name = sig.children[0].allText;
    let genericParamsNodes = validateNode(sig.children[1], 'genericParams');
    let genericParams = genericParamsNodes.children.map(createTypeParam);
    let params = validateNode(sig.children[2], 'funcParams').children.map(createFuncParamDef);
    let retType = (sig.children.length > 2) ? sig.children[3] : null;
    let body = node.children.length > 1  ? node.children[1] : null;
    return new FuncDef(node, name, retType, params, genericParams, body);
}

export function createFuncParamDef(node: HeronAstNode): FuncParamDef {
    validateNode(node, 'funcParam', 'lambdaArg', 'lambdaArgNoType');
    let name = node.children[0].allText;
    let type =  (node.children.length > 1) ? node.children[1] : null;
    return new FuncParamDef(node, name, type);
}

export function createVarDef(node: HeronAstNode): VarDef {
    validateNode(node, 'varDecl');
    let name = validateNode(node.children[0], 'varNameDecl');
    return new VarDef(node, name.allText, node.children[1]);
}

export function createForLoopVarDef(node: HeronAstNode): ForLoopVarDef {
    validateNode(node, 'forLoop');
    let name = validateNode(node.children[0], 'identifier');
    return new ForLoopVarDef(node, name.allText, node.children[1]);
}

export function createTypeDef(node: HeronAstNode): TypeDef {
    validateNode(node, 'typeDef');
    let name = node.children[0].allText;
    return new TypeDef(node, name);
}

export function getDef<T extends Def>(node: HeronAstNode, typeName: string): T {
    if (!node) throw new Error("Node is missing");
    let def = node.def;
    if (!def) throwError(node, "No definition associated with node");
    if (def.constructor['name'] !== typeName) 
        throwError(node, "Incorrect definition type, expected " + typeName + " was " + def.constructor['name']);
    return def as T;
}