import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, IntLiteral, FloatLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField, VarAssignmentExpr } from "./heron-expr";
import { Statement, CompoundStatement, IfStatement, EmptyStatement, VarDeclStatement, WhileStatement, DoStatement, ForStatement, ExprStatement, ContinueStatement, ReturnStatement } from "./heron-statement";
import { throwError, HeronAstNode, validateNode, visitAst } from "./heron-ast-rewrite";
import { FuncDef, FuncParamDef, ForLoopVarDef, VarDef } from "./heron-defs";
import { FuncRef, TypeRef, TypeParamRef, Ref, FuncParamRef, VarRef, ForLoopVarRef } from "./heron-refs";
import { typeConstant, polyType, Type, PolyType, typeVariable, TypeVariable, TypeConstant, isTypeConstant, TypeResolver, newTypeVar, Lookup, freshVariableNames, MonoType, normalizeType } from "./type-system";
import { Module, Package } from "./heron-package";

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

export function typeStrategy(a: TypeConstant, b: TypeConstant): TypeConstant {
    const casts = { 
        'Float': ['Int'], 
        'Array': ['ArrayBuilder', 'Float2', 'Float3', 'Float4'],
        'Float4': ['Float', 'Float2', 'Float3'],
        'Float3': ['Float', 'Float2'],
        'Float2': ['Float'],
    }
    
    if ((casts[a.name] || []).indexOf(b.name) >= 0) return a;
    if ((casts[b.name] || []).indexOf(a.name) >= 0) return b;        

    throw new Error("Failed to resolve type constants: " + a + " and " + b);
}

// This class computes the type for a function
export class TypeEvaluator 
{
    unifier: TypeResolver = new TypeResolver(typeStrategy);
    function: PolyType;

    constructor(
        public readonly params: FuncParamDef[],
        public readonly typeParams: string[],
        public readonly bodyNode: HeronAstNode,
        public readonly retTypeNode: HeronAstNode
    )
    { 
        this.function = genericFuncType(params.length);

        for (let i=0; i < params.length; ++i) {
            const param = params[i];
            const paramType = typeFromNode(params[i].typeNode, typeParams);
            if (paramType !== null) {
                param.type = paramType;
                this.unify(this.getArgType(i), paramType);
            }
            else {
                param.type = this.getArgType(i);
            }
        }

        const retType = typeFromNode(retTypeNode, typeParams);
        if (retType)
            this.unifyReturn(retType);
        if (bodyNode && bodyNode.statement)         
            this.getType(bodyNode.statement);
        else if (bodyNode && bodyNode.expr) {
            const bodyType = this.getType(bodyNode.expr);
            this.unifyReturn(bodyType);
        }
    }

    get numArgs(): number{
        return getNumArgTypes(this.function);
    }

    getArgType(n: number): Type {
        return getArgType(this.function, n);
    }

    getReturnType(): Type {
        return getReturnType(this.function);
    }

    getFinalResult() : PolyType {
        return this.unifier.getUnifiedType(this.function) as PolyType;
    }

    getType(x: Statement | Expr): Type
    {     
        if (x.type)
            return x.type;

        try {  
            if (x instanceof Statement) {
                this.getStatementType(x);
                return x.type = Types.VoidType;
            }
            else if (x instanceof Expr) {
                return x.type = this.unifier.getUnifiedType(this.getExpressionType(x));
            }
        }
        catch (e) {
            throwError(x.node, e.message);
        }
    }

    getStatementType(statement: Statement)
    {
        if (statement.type)
            return statement.type; 

        if (statement instanceof CompoundStatement) 
        {
            for (const st of statement.statements)
                this.getType(st);
        }
        else if (statement instanceof IfStatement) {
            this.unifyBool(statement.condition);
            this.getType(statement.onTrue);
            this.getType(statement.onFalse);
        }
        else if (statement instanceof ReturnStatement) {
            if (statement.condition)
                this.unifyReturn(statement.condition);
            else 
                this.unifyReturn(Types.VoidType);
        }
        else if (statement instanceof ContinueStatement) {
            // Do nothing 
        }
        else if (statement instanceof ExprStatement) {
            this.getType(statement.expr);
        }
        else if (statement instanceof ForStatement) {
            const forLoopVar = statement.node.def;
            if (!forLoopVar)
                throwError(statement.node, "Missing for loop variable definition");
            const arrayType = makeNewArrayType();
            const elementType = getArrayElementType(arrayType);
            if (forLoopVar.type)
                this.unify(forLoopVar.type, elementType);
            else   
                forLoopVar.type = elementType;
            this.unify(statement.array, arrayType);
            this.getType(statement.loop);
        }
        else if (statement instanceof DoStatement) {
            this.getType(statement.body);
            this.unifyBool(statement.condition);
        }
        else if (statement instanceof WhileStatement) {
            this.unifyBool(statement.condition);
            this.getType(statement.body);
        }
        else if (statement instanceof VarDeclStatement) {
            for (const vd of statement.vars) {
                if (!vd.exprNode.expr)
                    throwError(vd.exprNode, "Missing an expression")
                vd.type = this.getType(vd.exprNode.expr);
            }
        }
        else if (statement instanceof EmptyStatement) {
            // Do nothing. 
        }
        else {
            throw new Error("Unrecognized statement " + statement);
        }
    }

    getExpressionType(expr: Expr): Type {
        if (expr === null)
            throw new Error("No type available on a null expression");
        if (expr.type)
            return expr.type;

        if (expr instanceof VarName) {
            if (!expr.node.ref) 
                throwError(expr.node, "Missing ref");
                
            const ref = expr.node.ref;
            if (ref instanceof FuncRef) {
                return makeFunctionSet(ref.defs.map(computeFuncType));
            }
            else if (ref instanceof VarRef) {
                return assure(ref.def.type);
            }
            else if (ref instanceof FuncParamRef) {
                return assure(ref.def.type);
            }
            else if (ref instanceof ForLoopVarRef) {
                return assure(ref.def.type);
            }
            else if (ref instanceof TypeRef || ref instanceof TypeParamRef) {
                // TODO: eventually we might want to support 
                throwError(expr.node, "Type names are not allowed in expressions: " + expr.name);
            }
            // TODO: the reference could be to something else
            //return this.findVar(expr.name);
            throw new Error("Unrecoggnized expression");
        }
        else if (expr instanceof FunCall) {
            let func = this.getType(expr.func);
            const args = expr.args.map(a => this.getType(a));
            if (func instanceof PolyType) {
                if (isFunctionSet(func))
                    return callFunctionSet(func, args, this.unifier);
                else if (isFunctionType(func))
                    // We have to create new Type variable names when calling a
                    return callFunction(func, args, this.unifier);
                else 
                    throw new Error("Can't call " + func);
            }
            else if (func instanceof TypeVariable) {
                const genFunc = genericFuncTypeFromArgs(args);
                this.unify(func, genFunc);
                return callFunction(genFunc, args, this.unifier);
            }
            else {
                throw new Error("Can't call " + func);
            }
        }
        else if (expr instanceof ConditionalExpr) {
            const cond = this.unifyBool(expr.cond);
            const onTrue = this.getType(expr.onTrue);
            const onFalse = this.getType(expr.onFalse);
            return this.unify(onTrue, onFalse);
        }
        else if (expr instanceof ObjectLiteral || expr instanceof ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof ArrayLiteral) {
            const arrayType = makeNewArrayType();
            const elemType = getArrayElementType(arrayType);
            for (const v of expr.vals)
                this.unify(v, elemType);
            return arrayType;
        }
        else if (expr instanceof BoolLiteral) {
            return Types.BoolType;
        }
        else if (expr instanceof IntLiteral) {            
            return Types.IntType;
        }
        else if (expr instanceof FloatLiteral) {            
            return Types.FloatType;
        }
        else if (expr instanceof StrLiteral) {
            return Types.StrType;
        }
        else if (expr instanceof VarExpr) {
            for (const v of expr.vars) {
                const varExpr = v.exprNode.expr;
                if (!varExpr)
                    throwError(v.exprNode, "No expression associated with variable: " + v.name);
            }
            const r = this.getType(expr.expr);
            return r;
        }
        else if (expr instanceof Lambda) {
            return getLambdaType(expr);
        }
        else if (expr instanceof PostfixDec) {
            return this.unifyInt(expr.lvalue);
        }
        else if (expr instanceof PostfixInc) {
            return this.unifyInt(expr.lvalue);
        }
        else if (expr instanceof VarAssignmentExpr) {
            const ref = expr.node.children[0].ref;
            if (!ref)
                throwError(expr.node, "Variable assignment is missing reference");
            if (ref.defs.length > 1) 
                throwError(expr.node, "Multiple defs found");
            if (ref.defs.length < 1) 
                throwError(expr.node, "No defs found");
            const def = ref.defs[0];
            return this.unify(def.type, expr.value);
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
    }
    
    unify(a: Type | Expr, b: Type | Expr): Type {
        if (a instanceof Expr)
            a = this.getType(a);
        if (b instanceof Expr)
            b = this.getType(b);
        return this.unifier.unifyTypes(a, b);
    }

    unifyBool(x: Type | Expr): Type {
        return this.unify(x, Types.BoolType);
    }

    unifyInt(x: Type | Expr): Type {
        return this.unify(x, Types.IntType);
    }

    unifyReturn(x: Type | Expr): Type {
        return this.unify(x, this.getReturnType());
    }
}

export function callFunctionSet(funset: PolyType, args: Type[], unifier: TypeResolver): Type {
    const funcs = funset.types[1] as PolyType;
    const results: PolyType[] = [];
    for (let i=0; i < funcs.types.length; ++i) {
        const func = funcs.types[i];
        if (!(func instanceof PolyType) || !isFunctionType(func))
            throw new Error("Expected a function type");

        const paramTypes = getArgTypes(func);  

        // Not providing enough parameters: continue          
        if (args.length !== paramTypes.length)
            continue;
                  
        // Are the types compatible?
        if (canCallFunc(func, args))
            results.push(func);
    }
    if (results.length === 0)
        throw new Error("Could not find a function that matches the types");

    if (results.length === 1)
        return callFunction(results[0], args, unifier);

    // TODO: maybe unify types if we can. 
    
    return makeUnionType(results.map(getReturnType));           
}        

export function callFunction(funOriginal: PolyType, argTypes: Type[], mainUnifier: TypeResolver): Type {                
    // We have to create fresh variable names.

    // BUT I need to assure that those names have a lower priority then the 
    // ones we have now. This might happen automatically, but I am not 100% sure.
    const fun = freshVariableNames(funOriginal) as PolyType;
    const u = new TypeResolver(typeStrategy);
    const paramTypes = getArgTypes(fun); 
    const returnType = getReturnType(fun);

    // Parameters should match the number of arguments given to it. 
    if (paramTypes.length !== argTypes.length)
        throw new Error("Mismatched number of arguments was " + argTypes.length + " expected " + paramTypes.length);    

    // Unify the passed arguments with the parameter types.    
    for (let i=0; i < argTypes.length; ++i) {        
        let argType = argTypes[i];
        const paramType = paramTypes[i];

        if (argType instanceof PolyType && isFunctionSet(argType)) {
            // We have to figure out which type is the best here. 
            console.log("We have a function set as an argument.")
            const bestMatch = chooseBestFunction(paramType, argType);
            argType = bestMatch;
        }

        // Do the local unification to get the proper return type
        u.unifyTypes(paramType, argType);
        // Do the unification of the arguments with the types.
        mainUnifier.unifyTypes(argTypes[i], paramTypes[i]);
    }

    // DEBUG:
    //console.log("Unifier state:");
    //console.log(u.state);

    // We return the unified version of the return type.
    return u.getUnifiedType(returnType);
}    

export function computeFuncType(f: FuncDef): PolyType {
    if (!f.type) {
        if (f.name === "min")
            console.log("min");
        f.type = genericFuncType(f.params.length);
        //console.log("Computing type for " + f.toString());
        const sigNode = validateNode(f.node.children[0], "funcSig");
        const genParamsNode = validateNode(sigNode.children[1], "genericParams");
        const genParams = genParamsNode.children.map(p => p.allText);
        const te = new TypeEvaluator(f.params, genParams, f.body, f.retTypeNode);
        f.type = te.getFinalResult();
        console.log("Type for " + f);
        console.log(" is " + normalizeType(f.type));
    }
    return f.type as PolyType;
}

export function getLambdaType(l: Lambda): PolyType {
    if (!l.type) {
        const te = new TypeEvaluator(l.params, [], l.bodyNode, null);
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

export function typeUnion(types: Type[]): Type {
    const tmp = {};
    for (const t of types) 
        tmp[t.toString()] = t;

    const r:Type[] = [];
    for (const k in tmp)
        r.push(tmp[k]);
    
    if (r.length === 0)
        return Types.VoidType;
    if (r.length === 1)
        return r[0];
        
    return polyType([typeConstant('union'), polyType(r)]);
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

export function makeUnionType(types: Type[]): PolyType {
    const tmp = {};
    for (const t of types) {
        if (isUnionType(t)) {
            for (const t2 of getTypesInUnion(t))
                tmp[t.toString()] = t;
        }
        else 
            tmp[t.toString()] = t;
    }
    const r = [];
    for (const k in tmp)
        r.push(tmp[k])    
    if (r.length === 1)
        return r[0];
    return polyType([typeConstant('union'), polyType(r)]);
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

export function isUnionType(type: Type): boolean {
    if (!(type instanceof PolyType))
        return false;
    return isTypeConstant(type.types[0], 'union');
}

export function getTypesInUnion(type: Type): Type[] {
    if (!isUnionType(type))
        throw new Error("Not a union type");
    return ((type as PolyType).types[1] as PolyType).types;
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
    // TODO: can I pass the arg type to the function type, and other stuff
    return true;
}

// Given a function set, choose the best one to pass to the arg, or throw an error 
export function chooseBestFunction(arg: Type, funcSet: PolyType): PolyType {
    if (!isFunctionType(arg))
        throw new Error("Argument is not a function");
    const n = chooseBestFunctionIndex(arg as PolyType, funcSet);
    return (funcSet.types[1] as PolyType).types[1] as PolyType;
}

export function functionSetOptions(f: PolyType): PolyType[] {
    return (f.types[1] as PolyType).types.map(t => t as PolyType);
}

export function chooseBestFunctionIndex(f: PolyType, funcSet: PolyType): number {
    const args = getArgTypes(f);
    let r = -1;
    for (const g of functionSetOptions(funcSet)) {
        const argsG = getArgTypes(g);
        // TODO: replace with a more sophisticated algorithm        
        if (argsG.length === args.length) 
            if (r < 0)
                 r = 0;
            else 
                throw new Error("Multiple options found");
    }
    return r;
}