"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_expr_1 = require("./heron-expr");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
function computeExprs(ast) {
    heron_ast_rewrite_1.visitAst(ast, createExpr);
}
exports.computeExprs = computeExprs;
function createExpr(node) {
    switch (node.name) {
        case "postfixExpr":
            switch (node.children[1].name) {
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
exports.createExpr = createExpr;
function createFunCall(node) {
    if (node.name !== 'postfixExpr')
        throw new Error('Expected a postfix expr as an argument');
    if (node.children.length != 2)
        throw new Error('Expected two children of a postfix expression');
    var func = node.children[0];
    if (node.children[1].name !== 'funCall')
        throw new Error('Expected a funCall as the right child, not ' + node.children[1].name);
    var args = node.children[1].children;
    var r = new heron_expr_1.FunCall(node, null, func, args.map(createExpr));
    node['funCall'] = this;
}
exports.createFunCall = createFunCall;
//# sourceMappingURL=heron-expr-builder.js.map