import { Myna } from "myna-parser/myna";
import { Type, typeConstant, functionType, arrayType, typeArray } from "type-inference/build/type-system";
import { isMethodCall, isExpr, visitAst } from "./heron-ast-rewrite";
