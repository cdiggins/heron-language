import { Myna } from "myna-parser/myna";
import { Type, typeConstant, functionType, arrayType, typeArray } from "type-inference/build/type-system";
import { isMethodCall, isExpr, visitAst } from "./heron-ast-rewrite";

// A simplistic type-system for now. The goal
// is to distinguish between functions with the same name 
const AnyType = typeConstant('Any');
const ArrayType = typeConstant('Array');
const ObjectType = typeConstant('Object');
const NumType = typeConstant('Num');
const BoolType = typeConstant('Bool');
const StrType = typeConstant('Str');
const LambdaType = typeConstant('Lambda');
const VoidType = typeConstant('Void');

export function computeTypes(ast: Myna.AstNode) {
    visitAst(ast, setType);
}

export function setType(ast: Myna.AstNode) {
    if (isExpr(ast))
        ast['type'] = computeType(ast);
}

export function computeFunctionType(returnType: Type, argTypes: Type[]): Type {
    return functionType(typeArray(argTypes), returnType);
}

export function computeType(expr: Myna.AstNode): Type {
    switch (expr.name) {
        case "postfixExpr":
            switch (expr.children[1].name)
            {
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