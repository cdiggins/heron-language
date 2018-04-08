import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, IntLiteral, FloatLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField, VarAssignmentExpr } from "./heron-expr";
import { Statement, CompoundStatement, IfStatement, EmptyStatement, VarDeclStatement, WhileStatement, DoStatement, ForStatement, ExprStatement, ContinueStatement, ReturnStatement } from "./heron-statement";
import { throwError, HeronAstNode, validateNode, visitAst } from "./heron-ast-rewrite";
import { FuncDef, FuncParamDef, ForLoopVarDef, VarDef } from "./heron-defs";
import { FuncRef, TypeRef, TypeParamRef, Ref, FuncParamRef, VarRef, ForLoopVarRef } from "./heron-refs";
import { typeConstant, polyType, Type, PolyType, typeVariable, TypeVariable, TypeConstant, isTypeConstant, TypeResolver, newTypeVar, Lookup, freshVariableNames, MonoType, normalizeType } from "./type-system";
import { Module, Package } from "./heron-package";
import { TypeEvaluator } from "./heron-type-evaluator";

export function assure<T>(t: T): T {
    if (!t)
        throw new Error("Value was not defined");
    return t;
}

let id = 0;

export module Types 
{
    // A simplistic type-system for now. 
    // The goal is to distinguish between functions with the same name.
    export const AnyType = typeConstant('Any');
    export const ArrayType = typeConstant('Array');
    export const ObjectType = typeConstant('Object');
    export const IntType = typeConstant('Int');
    export const FloatType = typeConstant('Float');
    export const BoolType = typeConstant('Bool');
    export const StrType = typeConstant('Str');
    export const LambdaType = typeConstant('Lambda');
    export const VoidType = typeConstant('Void');
    export const TypeType = typeConstant('Type');
    export const FuncType = typeConstant('Func');
}

export function typeFromNode(node: HeronAstNode, typeParams: string[]): Type {
    if (!node) return null;
    validateNode(node, "typeExpr", "typeName");
    if (node.name === "typeExpr") {
        if (node.children.length === 1) 
            return typeFromNode(node.children[0], typeParams);
        return polyType(node.children.map(c => typeFromNode(c, typeParams)));
    }
    else if (node.name === "typeName") {
        const text = node.allText;
        if (typeParams.indexOf(text) >= 0) 
            return typeVariable(text);
        else             
            return typeConstant(text);
    }
}

class TypeStrategyClass {
    readonly casts = { 
        'Float': ['Int'], 
        'ArrayBuilder': ['Array'],
        'Array': ['Float2', 'Float3', 'Float4'],
        'Float4': ['Float', 'Float2', 'Float3'],
        'Float3': ['Float', 'Float2'],
        'Float2': ['Float'],
    }

    chooseConstant(a: TypeConstant, b: TypeConstant): TypeConstant {
        if ((this.casts[a.name] || []).indexOf(b.name) >= 0) return a;
        if ((this.casts[b.name] || []).indexOf(a.name) >= 0) return b;        
        throw new Error("Failed to resolve type constants: " + a + " and " + b);
    }

    canCastTo(arg: TypeConstant, param: TypeConstant): boolean {
        if (arg.name === param.name) 
            return true;
        if ((this.casts[param.name] || []).indexOf(arg.name) >= 0) 
            return true;
        if (param.name === 'Array' && arg.name === 'ArrayBuilder') 
            return true;        
        return false;
    }
}

export const typeStrategy = new TypeStrategyClass();

export function callFunctionSet(fun: FunCall, funcSet: PolyType, args: Expr[], argTypes: Type[], unifier: TypeResolver): Type {
    console.log("Calling function-set with: ");
    console.log("    " + args.join(", "))
    console.log("    " + argTypes.join(", "))
    console.log("Function choices: ");
    const funcs = (funcSet.types[1] as PolyType).types;
    for (const f of funcs)
        console.log("  " + f);
    let n = chooseBestFunctionIndexFromArgs(argTypes, funcSet); 
    fun.functionIndex = n;
    return callFunction(funcs[n] as PolyType, args, argTypes, unifier);
}

export function callFunction(funOriginal: PolyType, args: Expr[], argTypes: Type[], mainUnifier: TypeResolver): Type {                
    // We have to create fresh variable names.
    const fun = freshVariableNames(funOriginal) as PolyType;
    const u = new TypeResolver(typeStrategy);
    const paramTypes = getArgTypes(fun); 
    const returnType = getReturnType(fun);

    // Parameters should match the number of arguments given to it. 
    if (paramTypes.length !== args.length)
        throw new Error("Mismatched number of arguments was " + args.length + " expected " + paramTypes.length);    

    // Unify the passed arguments with the parameter types.    
    for (let i=0; i < args.length; ++i) {        
        let argType = argTypes[i];
        const paramType = paramTypes[i];
        const arg = args[i];
        if (argType instanceof PolyType && isFunctionSet(argType)) {
            if (!(paramType instanceof PolyType))
                throw new Error("Parameter is not a poly-type: can't figure out best match");
            // We have to figure out which type is the best here. 
            //console.log("We have a function set as an argument.")
            const n = chooseBestFunctionIndex(paramType, argType);
            argType = functionSetOptions(argType)[n];
            arg.functionIndex = n;
        }

        // Do the local unification to get the proper return type
        const localType = u.unifyTypes(paramType, argType);

        // Do the unification of the arguments with the types.
        const globalType = mainUnifier.unifyTypes(argType, paramType);        

        // In case the referenced node is a variable or parameter, 
        // we are going to unify it with the resulting global type. 
        if (arg.node.ref instanceof FuncParamRef) {
            mainUnifier.unifyTypes(arg.node.ref.def.type, globalType);
        }
        else if (arg.node.ref instanceof VarRef) {
            mainUnifier.unifyTypes(arg.node.ref.def.type, globalType);
        }        
    }

    // DEBUG:
    //console.log("Unifier state:");
    //console.log(u.state);

    // We return the unified version of the return type.
    return u.getUnifiedType(returnType);
}    

export function computeFuncTypeFromSig(f: FuncDef, genParams: string[]): PolyType {
    const u = new TypeResolver(typeStrategy);
    const t = genericFuncType(f.params.length);
    let hasSpecType = false;
    for (let i=0; i < f.params.length; ++i) {
        const param = f.params[i];
        const paramType = typeFromNode(f.params[i].typeNode, genParams);
        if (paramType !== null) {
            hasSpecType = true;
            param.type = paramType;
            u.unifyTypes(getArgType(t, i), paramType);
        }
    }
    const retType = typeFromNode(f.retTypeNode, genParams);
    if (retType) {
        hasSpecType = true;        
        u.unifyTypes(getReturnType(t), retType);
    }
    if (hasSpecType)
        return u.getUnifiedType(t) as PolyType;
    else
        return t;
}

export function computeFuncType(f: FuncDef): PolyType {
    if (!f.type) {
        const sigNode = validateNode(f.node.children[0], "funcSig");
        const genParamsNode = validateNode(sigNode.children[1], "genericParams");
        const genParams = genParamsNode.children.map(p => p.allText);
        f.type = computeFuncTypeFromSig(f, genParams);
        const u = new TypeResolver(typeStrategy);
        const te = new TypeEvaluator(f.params, genParams, f.body, f.retTypeNode, typeStrategy, u);
        f.type = te.getFinalResult();
        console.log("Type for " + f);
        console.log(" is " + normalizeType(f.type));
    }
    return f.type as PolyType;
}

export function getLambdaType(l: Lambda, u: TypeResolver): PolyType {
    if (!l.type) {
        const te = new TypeEvaluator(l.params, [], l.bodyNode, null, typeStrategy, u);
        l.type = te.getFinalResult();
    }
    return l.type as PolyType;
}

export function funcType(args: Type[], ret: Type): PolyType {
    return polyType([typeConstant('Func'), ...args, ret]);
}

export function genericFuncType(n: number): PolyType {
    const args: Type[] = [];
    for (let i=0; i < n; ++i)
        args.push(newTypeVar());
    return genericFuncTypeFromArgs(args);
}

export function genericFuncTypeFromArgs(args: Type[]): PolyType {
    return funcType(args, newTypeVar());
}

export function makeArrayType(elementType: Type): PolyType {
    return polyType([typeConstant('Array'), elementType]);
}

export function makeNewTypeVar() {
    return new TypeVariable('$' + id++);
}

export function makeNewArrayType() {
    return makeArrayType(makeNewTypeVar());
}

export function getArrayElementType(t: PolyType) {
    return t.types[1];
}

export function makeFunctionSet(types: PolyType[]): PolyType {    
    if (types.length === 0)
        throw new Error("Not enough types");
    if (types.length === 1)
        return types[0];
    for (const t of types)
        if (!isFunctionType(t))
            throw new Error("Only function types can be used to make a function set");
    return polyType([typeConstant('FuncSet'), polyType(types)]);
}

export function isFunctionSet(type: PolyType): boolean {
    return isTypeConstant(type.types[0], 'FuncSet');
}

export function isFunctionType(type: Type): boolean {    
    return (type instanceof PolyType) && isTypeConstant(type.types[0], 'Func');
}

export function getNumArgTypes(f: PolyType): number {
    return f.types.length - 2;
}

export function getArgType(f: PolyType, n: number): Type {
    return getArgTypes(f)[n];
}

export function getArgTypes(f: PolyType): Type[] {
    return f.types.slice(1, f.types.length - 1);
}

export function getReturnType(f: PolyType): Type {
    return f.types[f.types.length-1];
}

export function canCallFunc(f: PolyType, args: Type[]): boolean {
    const params = getArgTypes(f);
    if (params.length !== args.length) return false;
    for (let i=0; i < params.length; ++i)
        if (!canPassArg(args[i], params[i]))
            return false;
    return true;
}

export function canPassArg(arg: Type, param: Type) {
    if (param instanceof TypeVariable || arg instanceof TypeVariable)
        return true;
    if (param instanceof TypeConstant) {
        if (arg instanceof TypeConstant)
            return typeStrategy.canCastTo(arg, param);
        else
            return false;        
    }
    if (param instanceof PolyType)
    {
        if (!(arg instanceof PolyType))
            return false;
        if (arg.types.length !== param.types.length) 
            return false;
        for (let i=0; i < arg.types.length; ++i)
            if (!canPassArg(arg.types[i], param.types[i]))
                return false;
    }
    return true;
}

export function functionSetOptions(f: PolyType): PolyType[] {
    return (f.types[1] as PolyType).types.map(t => t as PolyType);
}

export function chooseBestFunctionIndexFromArgs(args: Type[], funcSet: PolyType): number {
    let r = -1;
    const options = functionSetOptions(funcSet);
    for (let i = 0; i  < options.length; ++i) {
        const g = options[i];
        if (canCallFunc(g, args))
        {
            if (r < 0)
                r = i;
            else 
                throw new Error("Multiple options found");
        }
    }
    if (r >= 0)
        return r;
    else 
        throw new Error("No function found");
}

export function chooseBestFunctionIndex(f: PolyType, funcSet: PolyType): number {
    return chooseBestFunctionIndexFromArgs(getArgTypes(f), funcSet);
}