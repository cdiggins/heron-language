import { Myna } from "myna-parser/myna";
import { FuncDef, TypeDef, VarDef, FuncParamDef, createFuncParamDef } from "./heron-defs";
import { validateNode, visitAst } from "./heron-ast-rewrite";

// Expressions are either: named function sets, anonymous functions, function calls, variables, or literals.
// In order to work out the type we need to work out the type of the things it depends on first. 
// This can be done by creating a graph, OR by simply computing type by pulling on the thread. 
export class Expr {
    constructor(
        public readonly node: Myna.AstNode,
    )
    { node['expr'] = this; }
}

// A named reference to a function can resolve to multiple functions, so we talk in terms of function sets.
// The type of a function set is the union of the types of each function definition it has  
export class FuncSet extends Expr {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly defs: FuncDef[],
    )
    { super(node); }
}

// An anonymous function, also known as a lambda.
export class AnonFunc extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly params: FuncParamDef[],
        public readonly body: Expr,
    )
    { super(node); }
}

// A variable is a name  
export class Var extends Expr {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string,
        public readonly def: VarDef,
    )
    { super(node); } // TODO: work out the type
}

// The different kinds of literals like boolean, number, ints, arrays, objects, and more. 
export class Literal<T> extends Expr {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly value: T,
    )
    { super(node); }
}

// An array literal expression
export class ArrayLiteral extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly vals: Expr[],
    )
    { super(node); }    
}

export class ObjectField extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly name: string,
        public readonly expr: Expr)
    { super(node); }
}

// An object literal expression
export class ObjectLiteral extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly fields: ObjectField[]
    )
    { super(node); }    
}

// Type expressions 
export class TypeExpr extends Expr {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly def: TypeDef, 
    )
    { super(node); }
}

// Function call expressions
export class FunCall extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly func: Expr,
        public readonly args: Expr[],
        )
    { super(node); }
}

// Conditional (ternary operator) expressions. 
export class ConditionalExpr extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly cond: Expr,
        public readonly onTrue: Expr,
        public readonly onFalse: Expr,
        )
    { super(node); }
}

//==========================================================================================
// Expressions

export function addExpr<T extends Expr>(node: Myna.AstNode, expr: T): T {
    node['expr'] = expr;
    return expr;
}

export function computeExprs(ast: Myna.AstNode) {
    visitAst(ast, createExpr);
}

export function createExpr(node: Myna.AstNode): Expr {
    switch (node.name) {
        case "postfixExpr":
            switch (node.children[1].name)
            {
                case "fieldSelect":
                    throw new Error("Field selects should be transformed into function calls");
                case "arrayIndex":
                    throw new Error("Array indexing should be transformed into function calls");
                case "postIncOp":
                case "postDecOp":
                    throw new Error("Not supported yet, postInc and postDec should be converted to assignment expressions");
                case "funCall":
                    // TODO: find the correct function based on the number and types of the arguments
                    return createFunCall(node);
                default:
                    throw new Error("Unrecognized postfix expression: " + node.name);
            }
        case "objectExpr":
            return createObjectLiteral(node);
        case "lambdaExpr":
            return createLambdaExpr(node);
        case "varExpr":
            return addExpr(node, createExpr(node.children[1]));
        case "arrayExpr":
            return createArrayExpr(node);
        case "bool":
            return createBoolExpr(node);
        case "number":
            return createNumExpr(node);
        case "string":
            return createStrExpr(node);
        case "prefixExpr":
            throw new Error("Prefix expr should be converted into function calls");
        case "typeExpr":
            return createTypeExpr(node);
        case "conditionalExpr":
            return createConditionalExpr(node);
        case "literal":
        case "leafExpr":
        case "parenExpr":
        case "expr":
        case "recExpr":
            return addExpr(node, createExpr(node.children[0]));            
        case "multiplicativeExpr":
        case "additiveExpr":
        case "relationalExpr":
        case "equalityExpr":
        case "rangeExpr":            
            throw new Error("Unsupported expression found: pre-processing was not performed: " + node.name);
        default:
            throw new Error("Not a recognized expression: " + node.name)
    }
}

export function createFunCall(node: Myna.AstNode): FunCall
{ 
    if (node.name !== 'postfixExpr')
        throw new Error('Expected a postfix expr as an argument');
    if (node.children.length != 2)
        throw new Error('Expected two children of a postfix expression');
    let func = createExpr(node.children[0]);
    if (node.children[1].name !== 'funCall')
        throw new Error('Expected a funCall as the right child, not ' + node.children[1].name)
    let args = node.children[1].children;
    return new FunCall(node, func, args.map(createExpr));
}

export function createObjectField(node: Myna.AstNode): ObjectField {
    validateNode(node, "objectField");
    let name = node.child[0].allText;
    let expr = createExpr(node.child[1]);
    return new ObjectField(node, name, expr);
}

export function createObjectLiteral(node: Myna.AstNode): ObjectLiteral {
    return new ObjectLiteral(node, node.children.map(createObjectField));
}

export function createArrayExpr(node: Myna.AstNode): ArrayLiteral {
    return new ArrayLiteral(node, node.children.map(createExpr));
}

export function createBoolExpr(node: Myna.AstNode): Literal<boolean> {
    let value = node.allText === 'true' ? true : false;
    return new Literal<boolean>(node, value);
}

export function createConditionalExpr(node: Myna.AstNode): ConditionalExpr {
    return new ConditionalExpr(node, createExpr(node.children[0]), createExpr(node.children[1]), createExpr(node.children[2]));
}

// TODO: the fact that I am calling a lambda body an expression is a problem.
export function createLambdaExpr(node: Myna.AstNode): AnonFunc {
    return new AnonFunc(node, node.children[0].children.map(createFuncParamDef), createExpr(node.children[1]));
}

export function createNumExpr(node: Myna.AstNode): Literal<number> {
    let value = parseFloat(node.allText);
    return new Literal<number>(node, value);
}

export function createStrExpr(node: Myna.AstNode): Literal<string> {
    return new Literal<string>(node, node.allText);
}

export function createTypeExpr(node: Myna.AstNode): TypeExpr {
    return new TypeExpr(node, node['def'] as TypeDef);
}

export function createVarExpr(node: Myna.AstNode) {
}









