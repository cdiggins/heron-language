import { Myna } from "myna-parser/myna";
import { Type, typeConstant, functionType, arrayType, typeArray } from "type-inference/build/type-system";
import { isMethodCall, isExpr, visitAst } from "./heron-ast-rewrite";

/*
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

*/