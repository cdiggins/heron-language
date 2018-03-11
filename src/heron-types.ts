import { Type, typeConstant, typeArray, isTypeArray, TypeArray, isTypeConstant, functionType, TypeConstant } from "type-inference/build/type-system";
import { HeronAstNode, throwError, validateNode } from "./heron-ast-rewrite";
import { Lambda, VarName, Literal, BoolLiteral, NumLiteral, StrLiteral, ArrayLiteral, ObjectLiteral, FunCall, ConditionalExpr, Expr } from "./heron-expr";
import { Def, FuncDef, FuncParamDef, TypeDef, VarDef, ForLoopVarDef } from "./heron-defs";
import { RefType } from "./heron-refs";

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
}


// we create special types, one for each object scene in the game.
export function createObjectType(id: string): Type {
    return typeConstant('object' + id);
}

export function isUnionType(t: Type): boolean {
    return t instanceof TypeArray 
        && t.types.length > 0 
        && isTypeConstant(t.types[0], 'union');
}

export function getUnionOptions(t: Type): Type[] {
    if (!isUnionType(t))
        throw new Error("Expected a union type")
    let r = (t as TypeArray).types.slice(1);
    if (r.some(isUnionType))
        throw new Error('A union type should not contain union types');
    return r;
}

// Given several different types creates a union
export function unionType(...types:Type[]): Type {
    let r: Type[] = [];
    for (let t of types)
    {
        if (isUnionType(t))
            r.push(...getUnionOptions(t))
        else 
            r.push(t);
    }    
    if (r.some(isUnionType))
        throw new Error('A union type should not contain union types');
    return typeArray([typeConstant('union'), ...r]);
}

// Merges two types together
export function mergeTypes(a: Type, b: Type): Type {
    if (a.toString() !== b.toString())
        throw new Error("Types are not the same");
    return a;
}

// Computes a type if necessary, or returns the current type of the node
export function computeType(node: HeronAstNode): Type {    
    if (node.type)        
        return node.type;
    if (node.expr)
        return node.type = getExprType(node.expr);
    if (node.def)
        return node.type = getDefType(node.def);
    
    // TODO: replace this with something more sophsticated when parameterized types 
    // are supported. 
    if (node.name === 'typeExpr' || node.name === 'returnType')
        return node.type = new TypeConstant(node.allText);
    
    return node.type;
}

// Returns the type of an expression
export function getExprType(expr: Expr): Type 
{ 
    if (expr.node.type) 
        return expr.node.type;

    if (expr instanceof Lambda) 
    {
        return Types.LambdaType;
    } 
    else if (expr instanceof VarName) 
    {
        return unionType(...expr.defs.map(d => computeType(d.node)));
    } 
    else if (expr instanceof BoolLiteral) 
    {
        return Types.BoolType;
    } 
    else if (expr instanceof NumLiteral) 
    {
        return Types.NumType;
    }
    else if (expr instanceof StrLiteral) 
    {
        return Types.StrType;
    } 
    else if (expr instanceof ArrayLiteral) 
    {
        return Types.ArrayType;
    } 
    else if (expr instanceof ObjectLiteral) 
    {
        return createObjectType(expr.node.id.toString());
    } 
    else if (expr instanceof FunCall) 
    {
        // TODO: figure out what function is being called, 
        // by looking at the types and numbers of the arguments. 
        // There are only so many definitions.
        let funcType = computeType(expr.func.node);
        // funcType is either a union of function types, or a function type.
        // The result is really dependent on which function we want to call based on the 
        // type of the arguments 
        return Types.AnyType;
    } 
    else if (expr instanceof ConditionalExpr) 
    {
        return mergeTypes(
            computeType(expr.onFalse.node), 
            computeType(expr.onTrue.node));
    } 
    return Types.VoidType;
}

// The type of a definition 
export function getDefType(def: Def) 
{
    if (def.node.type)
        return def.node.type;

    if (def instanceof FuncDef) 
    {
        let argTypes = def.params.map(p => {
            let r = computeType(p.node);
            if (!r)
                throw new Error('Function parameter should never have a null type');
            return r;
        });
        let retType = def.retTypeNode 
            ? computeType(def.retTypeNode) 
            : Types.AnyType;
        if (!retType)
            throw new Error('Function should never have a null return type');
        return functionType(typeArray(argTypes), retType);
    }
    else if (def instanceof FuncParamDef) 
    {
        return def.typeNode 
            ? computeType(def.typeNode) 
            : Types.AnyType;
    }
    else if (def instanceof TypeDef) 
    {
        // TODO: maybe consider pooling these 
        return new TypeConstant(def.name);
    }
    else if (def instanceof VarDef) 
    {
        return computeType(def.expr);
    }
    else if (def instanceof ForLoopVarDef)
    {
        // TODO: figure out the type of the array, and the type of an element.        
        return Types.AnyType;
    }
}