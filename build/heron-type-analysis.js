"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_system_1 = require("type-inference/build/type-system");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
// A simplistic type-system for now. The goal
// is to distinguish between functions with the same name 
var AnyType = type_system_1.typeConstant('Any');
var ArrayType = type_system_1.typeConstant('Array');
var ObjectType = type_system_1.typeConstant('Object');
var NumType = type_system_1.typeConstant('Num');
var BoolType = type_system_1.typeConstant('Bool');
var StrType = type_system_1.typeConstant('Str');
var LambdaType = type_system_1.typeConstant('Lambda');
var VoidType = type_system_1.typeConstant('Void');
function computeTypes(ast) {
    heron_ast_rewrite_1.visitAst(ast, setType);
}
exports.computeTypes = computeTypes;
function setType(ast) {
    if (heron_ast_rewrite_1.isExpr(ast))
        ast['type'] = computeType(ast);
}
exports.setType = setType;
function computeFunctionType(returnType, argTypes) {
    return type_system_1.functionType(type_system_1.typeArray(argTypes), returnType);
}
exports.computeFunctionType = computeFunctionType;
function computeType(expr) {
    switch (expr.name) {
        case "postfixExpr":
            switch (expr.children[1].name) {
                case "fieldSelect":
                    throw new Error("Field selects should be transformed into function calls");
                case "arrayIndex":
                    throw new Error("Array indexing should be transformed into function calls");
                case "postIncOp":
                case "postDecOp":
                    return NumType;
                case "funCall":
                    // TODO: find the correct function based on the number and types of the arguments
                    return AnyType;
                default:
                    throw new Error("Unrecognized postfix expression: " + expr.name);
            }
        case "objectExpr":
            return ObjectType;
        case "lambdaExpr":
            return LambdaType;
        case "varExpr":
            return computeType(expr.children[expr.children.length - 1]);
        case "arrayExpr":
            return ArrayType;
        case "bool":
            return BoolType;
        case "number":
            return NumType;
        case "string":
            return StrType;
        case "prefixExpr":
            switch (expr.children[0].allText) {
                case "!": return BoolType;
                case "-": return BoolType;
                default: throw new Error("Unrecognized prefix operator " + expr.children[0].allText);
            }
        case "conditionalExpr":
            // TODO: constrain the two sides 
            return computeType(expr.children[1]);
        case "literal":
        case "leafExpr":
        case "parenExpr":
        case "expr":
        case "recExpr":
            return computeType(expr.children[0]);
        case "multiplicativeExpr":
        case "additiveExpr":
        case "relationalExpr":
        case "equalityExpr":
        case "rangeExpr":
            throw new Error("Unsupported expression found: pre-processing was not performed: " + expr.name);
        default:
            return VoidType;
    }
}
exports.computeType = computeType;
//# sourceMappingURL=heron-type-analysis.js.map