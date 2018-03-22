"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_system_1 = require("type-inference/build/type-system");
function union() {
    var vals = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vals[_i] = arguments[_i];
    }
    var value = vals[0].value;
    var type = vals[0].type;
    for (var i = 1; vals.length; ++i) {
        if (value !== vals[i].value)
            value = null;
        if (type.toString() !== vals[i].toString())
            type = Types.AnyType;
    }
    return new Val(value, type);
}
exports.union = union;
// A simplistic type-system for now. 
// The goal is to distinguish between functions with the same name.
exports.AnyType = type_system_1.typeConstant('Any');
exports.ArrayType = type_system_1.typeConstant('Array');
exports.ObjectType = type_system_1.typeConstant('Object');
exports.NumType = type_system_1.typeConstant('Num');
exports.BoolType = type_system_1.typeConstant('Bool');
exports.StrType = type_system_1.typeConstant('Str');
exports.LambdaType = type_system_1.typeConstant('Lambda');
exports.VoidType = type_system_1.typeConstant('Void');
exports.NeverType = type_system_1.typeConstant('Never');
exports.TypeType = type_system_1.typeConstant('Type');
exports.FuncType = type_system_1.typeConstant('Func');
function getType(node) {
    if (node === null)
        throw new Error("Missing node");
    validateNode(node, "typeExpr", "typeName");
    return type_system_1.typeConstant(node.allText);
}
exports.getType = getType;
//# sourceMappingURL=heron-types.js.map