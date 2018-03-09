"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_system_1 = require("type-inference/type-system");
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
    // we create special names for objects. 
    var objectId = 0;
    function createObjectType(fields) {
        return type_system_1.typeArray([type_system_1.typeConstant('object' + objectId)].concat(fields.map(type_system_1.typeConstant)));
    }
    Types.createObjectType = createObjectType;
})(Types = exports.Types || (exports.Types = {}));
//# sourceMappingURL=heron-types.js.map