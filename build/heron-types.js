"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_system_1 = require("type-inference/build/type-system");
var heron_expr_1 = require("./heron-expr");
var heron_defs_1 = require("./heron-defs");
var Types;
(function (Types) {
    // A simplistic type-system for now. 
    // The goal is to distinguish between functions with the same name.
    Types.AnyType = type_system_1.typeConstant('Any');
    Types.ArrayType = type_system_1.typeConstant('Array');
    Types.ObjectType = type_system_1.typeConstant('Object');
    Types.NumType = type_system_1.typeConstant('Num');
    Types.BoolType = type_system_1.typeConstant('Bool');
    Types.StrType = type_system_1.typeConstant('Str');
    Types.LambdaType = type_system_1.typeConstant('Lambda');
    Types.VoidType = type_system_1.typeConstant('Void');
    Types.TypeType = type_system_1.typeConstant('Type');
})(Types = exports.Types || (exports.Types = {}));
// we create special types, one for each object scene in the game.
function createObjectType(id) {
    return type_system_1.typeConstant('object' + id);
}
exports.createObjectType = createObjectType;
function isUnionType(t) {
    return t instanceof type_system_1.TypeArray
        && t.types.length > 0
        && type_system_1.isTypeConstant(t.types[0], 'union');
}
exports.isUnionType = isUnionType;
function getUnionOptions(t) {
    if (!isUnionType(t))
        throw new Error("Expected a union type");
    var r = t.types.slice(1);
    if (r.some(isUnionType))
        throw new Error('A union type should not contain union types');
    return r;
}
exports.getUnionOptions = getUnionOptions;
// Given several different types creates a union. 
// TODO: remove redundant types from the union. 
function unionType() {
    var types = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        types[_i] = arguments[_i];
    }
    if (types.length === 1)
        return types[0];
    var r = [];
    for (var _a = 0, types_1 = types; _a < types_1.length; _a++) {
        var t = types_1[_a];
        if (isUnionType(t))
            r.push.apply(r, getUnionOptions(t));
        else
            r.push(t);
    }
    // This should be impossible, based on the above code, but just making sure no one
    // creates a unionType via another mechaism 
    if (r.some(isUnionType))
        throw new Error('A union type should not contain union types');
    return type_system_1.typeArray([type_system_1.typeConstant('union')].concat(r));
}
exports.unionType = unionType;
// Merges two types together
function mergeTypes(a, b) {
    if (a.toString() !== b.toString()) {
        // TODO: deal with incompatible types 
        // throw new Error("Types are not the same");
        return Types.AnyType;
    }
    return a;
}
exports.mergeTypes = mergeTypes;
// Computes a type if necessary, or returns the current type of the node
function computeType(node) {
    if (node.type)
        return node.type;
    if (node.expr)
        return node.type = getExprType(node.expr);
    if (node.def)
        return node.type = getDefType(node.def);
    // TODO: replace this with something more sophsticated when parameterized types 
    // are supported. 
    if (node.name === 'typeExpr' || node.name === 'returnType')
        return node.type = new type_system_1.TypeConstant(node.allText);
    return node.type;
}
exports.computeType = computeType;
// Returns the type of an expression
function getExprType(expr) {
    if (expr.node.type)
        return expr.node.type;
    if (expr instanceof heron_expr_1.Lambda) {
        return Types.LambdaType;
    }
    else if (expr instanceof heron_expr_1.VarName) {
        // TODO: figure this out based on the definitions found. 
        return Types.AnyType;
    }
    else if (expr instanceof heron_expr_1.BoolLiteral) {
        return Types.BoolType;
    }
    else if (expr instanceof heron_expr_1.NumLiteral) {
        return Types.NumType;
    }
    else if (expr instanceof heron_expr_1.StrLiteral) {
        return Types.StrType;
    }
    else if (expr instanceof heron_expr_1.ArrayLiteral) {
        return Types.ArrayType;
    }
    else if (expr instanceof heron_expr_1.ObjectLiteral) {
        return createObjectType(expr.node.id.toString());
    }
    else if (expr instanceof heron_expr_1.FunCall) {
        // TODO: figure out what function is being called, 
        // by looking at the types and numbers of the arguments. 
        // There are only so many definitions.
        var funcType = computeType(expr.func.node);
        // funcType is either a union of function types, or a function type.
        // The result is really dependent on which function we want to call based on the 
        // type of the arguments 
        return Types.AnyType;
    }
    else if (expr instanceof heron_expr_1.ConditionalExpr) {
        return mergeTypes(computeType(expr.onFalse.node), computeType(expr.onTrue.node));
    }
    else if (expr instanceof heron_expr_1.PostfixDec || expr instanceof heron_expr_1.PostfixInc) {
        return Types.NumType;
    }
    return Types.VoidType;
}
exports.getExprType = getExprType;
// The type of a definition 
function getDefType(def) {
    if (def.node.type)
        return def.node.type;
    if (def instanceof heron_defs_1.FuncDef) {
        var argTypes = def.params.map(function (p) {
            var r = computeType(p.node);
            if (!r)
                throw new Error('Function parameter should never have a null type');
            return r;
        });
        var retType = def.retTypeNode
            ? computeType(def.retTypeNode)
            : Types.AnyType;
        if (!retType)
            throw new Error('Function should never have a null return type');
        return type_system_1.functionType(type_system_1.typeArray(argTypes), retType);
    }
    else if (def instanceof heron_defs_1.FuncParamDef) {
        return def.typeNode
            ? computeType(def.typeNode)
            : Types.AnyType;
    }
    else if (def instanceof heron_defs_1.TypeDef) {
        // TODO: maybe consider pooling these 
        return new type_system_1.TypeConstant(def.name);
    }
    else if (def instanceof heron_defs_1.VarDef) {
        return getExprType(def.exprNode.expr);
    }
    else if (def instanceof heron_defs_1.ForLoopVarDef) {
        // TODO: figure out the type of the array, and the type of an element.        
        return Types.AnyType;
    }
}
exports.getDefType = getDefType;
//# sourceMappingURL=heron-types.js.map