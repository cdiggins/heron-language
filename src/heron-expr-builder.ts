import { Myna } from "myna-parser/myna";
import { Expr, FunCall } from "./heron-expr";
import { visitAst } from "./heron-ast-rewrite";

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
            return ObjectType;
        case "lambdaExpr":
            return LambdaType;
        case "varExpr":
            return computeType(node.children[node.children.length - 1]);
        case "arrayExpr":
            return ArrayType;
        case "bool":
            return BoolType;
        case "number":
            return NumType;
        case "string":
            return StrType;
        case "prefixExpr":
            switch (node.children[0].allText) {
                case "!": return BoolType;
                case "-": return BoolType;                
                default: throw new Error("Unrecognized prefix operator " + node.children[0].allText);
            }
        case "typeName":
        case "typeExpr":
            return TypeType;
        case "conditionalExpr":
            // TODO: constrain the two sides 
            return computeType(node.children[1]);
        case "literal":
        case "leafExpr":
        case "parenExpr":
        case "expr":
        case "recExpr":
            return computeType(node.children[0]);
        case "multiplicativeExpr":
        case "additiveExpr":
        case "relationalExpr":
        case "equalityExpr":
        case "rangeExpr":            
            throw new Error("Unsupported expression found: pre-processing was not performed: " + node.name);
        default:
            return VoidType;
    }
}

export function createFunCall(node: Myna.AstNode): FunCall
{ 
    if (node.name !== 'postfixExpr')
        throw new Error('Expected a postfix expr as an argument');
    if (node.children.length != 2)
        throw new Error('Expected two children of a postfix expression');
    let func = node.children[0];         
    if (node.children[1].name !== 'funCall')
        throw new Error('Expected a funCall as the right child, not ' + node.children[1].name)
    let args = node.children[1].children;
    let r = new FunCall(node, null, func, args.map(createExpr));
    node['funCall'] = this;
}