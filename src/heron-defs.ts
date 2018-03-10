// This module provides support for dealing with definitions.  
// A definition could be a function definition, parameter definition, variable definition, type definition. 
 
import { Myna } from "myna-parser/myna";
import { visitAst, validateNode, throwError } from "./heron-ast-rewrite";
import { Expr, createExpr } from "./heron-expr";

// Temporary: the type of something is one of these things.  
type TypeRef = Myna.AstNode | string;


// This is a definition of a name. It could be a function, variable, type
export class Def {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string, 
        public readonly type: TypeRef,
    )
    { node['def'] = this; }

    toString() {
        return this.name + '_' + this.constructor['name'] + this.node['id'];
    }
}

// Represents the definition of a function 
export class FuncDef extends Def 
{    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string, 
        public readonly type: TypeRef,
        public readonly params: FuncParamDef[],
        public readonly genericParams: TypeParamDef[],
        )
    { super(node, name, type); }
}

// Represent a parameter to a function or a lambda expression 
export class FuncParamDef extends Def
{
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string, 
        public readonly type: TypeRef,
    )
    { super(node, name, type); }
}

// Represents the definition of a variable. 
// The type is not known, until the type of the expression is figured out.
export class VarDef extends Def
{
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string, 
        public readonly expr: Myna.AstNode
    )
    { super(node, name, null); }    
}

// Represents the definition of a type 
export class TypeDef extends Def
{
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string, 
    )
    { super(node, name, 'type'); }        
}

// Represents the definition of a generic type parameter 
export class TypeParamDef extends Def
{
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string, 
        public readonly constraint: Myna.AstNode
    )
    { super(node, name, 'type'); }        
}

// Represents the definition of a module
export class ModuleDef extends Def
{
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string, 
    )
    { super(node, name, null); }            
}

//==========================================================================================
// Exported functions

export function createDef(node: Myna.AstNode): Def {
    // NOTE: typeParamDef and funcParamDef are created by the funcDef    
    switch (node.name) {
        case "funcDef": 
            return createFuncDef(node); 
        case "intrinsicDef": 
            return createFuncDef(node); 
        case "typeDef": 
            return createTypeDef(node); 
        case "varDecl": 
            return createVarDef(node); 
    }
    return null
}

//==========================================================================================

export function createTypeParam(node: Myna.AstNode): TypeParamDef {
    validateNode(node, 'genericParam');
    let name = node.children[0].allText;
    let constraint = node.children.length > 1 ? node.children[1] : null;
    return new TypeParamDef(node, name, constraint);
}

export function createFuncDef(node: Myna.AstNode): FuncDef {
    validateNode(node, 'funcDef', 'intrinsicDef');
    let sig = validateNode(node.children[0], 'funcSig');
    let name = sig.children[0].allText;
    let genericParamsNodes = validateNode(sig.children[1], 'genericParams');
    let genericParams = genericParamsNodes.children.map(createTypeParam);
    let params = validateNode(sig.children[2], 'funcParams').children.map(createFuncParamDef);
    let retType = (sig.children.length > 2) ? sig.children[3] : null;
    return new FuncDef(node, name, retType, params, genericParams);
}

export function createFuncParamDef(node: Myna.AstNode): FuncParamDef {
    validateNode(node, 'funcParam');
    let name = node.children[0].allText;
    let type =  (node.children.length > 1) ? node.children[1] : null;
    return new FuncParamDef(node, name, type);
}

export function createVarDef(node: Myna.AstNode) {
    validateNode(node, 'varDecl');
    let name = validateNode(node.children[0], 'varNameDecl');
    let init = validateNode(node.children[1], 'varInitialization');
    return new VarDef(node, name.allText, init.children[0]);
}

export function createTypeDef(node: Myna.AstNode) {
    validateNode(node, 'typeDef');
    let name = node.children[0].allText;
    return new TypeDef(node, name);
}

export function getDef<T extends Def>(node: Myna.AstNode, typeName: string): T {
    if (!node) throw new Error("Node is missing");
    let def = node['def'];
    if (!def) throwError(node, "No definition associated with node");
    if (def.constructor['name'] !== typeName) 
        throwError(node, "Incorrect definition type, expected " + typeName + " was " + def.constructor['name']);
    return def as T;
}

// STEP1: create the defs
// STEP2: create the refs ... 
// STEP3: figure out the expression ...
// STEP4: figure out the types ...
