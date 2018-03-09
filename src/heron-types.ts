import { Type, typeConstant, typeArray } from "type-inference/type-system";

export module Types 
{
    // A simplistic type-system for now. 
    // The goal is to distinguish between functions with the same name.
    export const AnyType = typeConstant('Any');
    export const ArrayType = typeConstant('Array');
    export const ObjectType = typeConstant('Object');
    export const NumType = typeConstant('Num');
    export const BoolType = typeConstant('Bool');
    export const StrType = typeConstant('Str');
    export const LambdaType = typeConstant('Lambda');
    export const VoidType = typeConstant('Void');
    export const TypeType = typeConstant('Type');

    // we create special names for objects. 
    let objectId = 0;
    export function createObjectType() : Type {
        return typeConstant('object' + objectId++);
    }
}
