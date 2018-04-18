import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, IntLiteral, FloatLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField, VarAssignmentExpr } from "./heron-expr";
import { Statement, CompoundStatement, IfStatement, EmptyStatement, VarDeclStatement, WhileStatement, DoStatement, ForStatement, ExprStatement, ContinueStatement, ReturnStatement } from "./heron-statement";
import { throwError, HeronAstNode, validateNode } from "./heron-ast-rewrite";
import { FuncParamDef, FuncDef } from "./heron-defs";
import { FuncRef, TypeRef, TypeParamRef, FuncParamRef, VarRef, ForLoopVarRef } from "./heron-refs";
import { Type, PolyType, TypeVariable, TypeResolver, TypeStrategy, typeConstant, polyType, typeVariable, TypeConstant, freshVariableNames, isTypeConstant, newTypeVar } from "./type-system";

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
        u.unifyTypes(paramType, argType);

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
        //console.log("Type for " + f);
        //console.log(" is " + normalizeType(f.type));
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

export function canCallFunc(f: PolyType, args: Type[], exact: boolean): boolean {
    const params = getArgTypes(f);
    if (params.length !== args.length) return false;
    for (let i=0; i < params.length; ++i)
        if (!canPassArg(args[i], params[i], exact))
            return false;
    return true;
}

export function canPassArg(arg: Type, param: Type, exact: boolean) {
    if (param instanceof TypeVariable || arg instanceof TypeVariable)
        return true;
    if (param instanceof TypeConstant) {
        if (arg instanceof TypeConstant)
            if (exact)
                return isTypeConstant(arg, param.name);
            else
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
            if (!canPassArg(arg.types[i], param.types[i], exact))
                return false;
    }
    return true;
}

export function functionSetOptions(f: PolyType): PolyType[] {
    return (f.types[1] as PolyType).types.map(t => t as PolyType);
}

// Gives a score to a function based on how many concrete types it has  
export function functionSpecificity(func: PolyType): number {
    const args = getArgTypes(func);
    let n = 0;
    for (const a of args)
        if (a instanceof PolyType || a instanceof TypeConstant)
            n++;
    return n;
}

export function chooseMostGeneric(funcSet: PolyType): number {
    const options = functionSetOptions(funcSet);
    let scores = options.map(functionSpecificity);
    let result = 0, many = false;
    for (let i=1; i < scores.length; ++i) {
        if (scores[i] < scores[result] && scores[i] >= 0) 
            result = i, many = false;
        else if (scores[i] === scores[result])
            many = true;
    }
    return many ? -1 : result;
}

export function chooseBestFunctionIndexFromArgs(args: Type[], funcSet: PolyType): number {
    // Try an exact match (no casting)
    let tmp = chooseBestFunctionIndexFromArgsHelper(args, funcSet, true);
    if (tmp >= 0) return tmp;
    // Try an inexact match (casting)
    tmp = chooseBestFunctionIndexFromArgsHelper(args, funcSet, false);
    if (tmp >= 0) return tmp;
    // If nothing else works, just try the most generic option
    tmp = chooseMostGeneric(funcSet);
    if (tmp >= 0) return tmp;
    throw new Error("Found no matching function");
}

export function chooseBestFunctionIndexFromArgsHelper(args: Type[], funcSet: PolyType, exact: boolean): number {
    const options = functionSetOptions(funcSet);

    let scores = [];
    
    // First try with exact matching
    for (let i = 0; i  < options.length; ++i) {
        const g = options[i];
        if (canCallFunc(g, args, exact))
            scores.push(functionSpecificity(g)); 
        else 
            scores.push(-1);
    }
    
    let res = 0;
    let many = false;
    for (var i=1; i < scores.length; ++i) {
        if (scores[i] > scores[res]) {
            many = false;
            res = i;
        }
        else if (scores[i] === scores[res]) {
            many = true;
        }
    }
    if (res >= 0 && !many)
        return res;
    else   
        return -1;
}

export function chooseBestFunctionIndex(f: PolyType, funcSet: PolyType): number {
    return chooseBestFunctionIndexFromArgs(getArgTypes(f), funcSet);
}

// This class computes the type for a function
export class TypeEvaluator 
{
    public readonly function: PolyType;

    constructor(
        public readonly params: FuncParamDef[],
        public readonly typeParams: string[],
        public readonly bodyNode: HeronAstNode,
        public readonly retTypeNode: HeronAstNode,
        public readonly typeStrategy: TypeStrategy, 
        public readonly unifier: TypeResolver,
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
        // if (x.type) return x.type;

        try {  
            if (x instanceof Statement) {
                this.getStatementType(x);
                return x.type = Types.VoidType;
            }
            else {
                const rawType = this.getExpressionType(x);
                const uniType = this.unifier.getUnifiedType(rawType);
                //console.log("Expression   : " + x.toString());
                //console.log("Has type     : " + uniType);

                return uniType;
                //return x.type = rawType;
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

        //console.log("Computing statement type:");
        //console.log(statement.node.allText);

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
            if (statement.expr)
                this.unifyReturn(statement.expr);
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
                    throwError(vd.exprNode, "Missing an expression");
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
        
        //if (expr.type) return expr.type;

        //console.log("Evaluating type of: " + expr.toString());

        if (expr instanceof VarName) {
            if (!expr.node.ref) 
                throwError(expr.node, "Missing ref");
                
            const ref = expr.node.ref;
            if (ref instanceof FuncRef) {
                return makeFunctionSet(ref.defs.map(r => computeFuncType(r)));
            }
            else if (ref instanceof VarRef) {
                if (!ref.def.type)
                    ref.def.type = this.getType(ref.def.exprNode.expr);
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
            throw new Error("Unrecognized expression");
        }
        else if (expr instanceof FunCall) {
            let funcType = this.getType(expr.func);
            const argTypes = expr.args.map(a => this.getType(a));
            
            if (funcType instanceof PolyType) {
                // Work out the function type  
                if (isFunctionSet(funcType)) {
                    const funcs = (funcType.types[1] as PolyType).types;
                    let n = chooseBestFunctionIndexFromArgs(argTypes, funcType); 
                    expr.func.functionIndex = n;
                    funcType = funcs[n] as PolyType;
                }
                
                if (!isFunctionType(funcType)) 
                    throw new Error("Can't call " + funcType);                
                
                for (let i=0; i < argTypes.length; ++i) {
                    const arg = expr.args[i];            
                    const exp = getArgType(funcType as PolyType, i);
                    
                    // TODO: maybe extend this to all types, not just function args.
                    // I can see this being something we want for arrays as well.
                    if (arg instanceof Lambda) {
                        this.unify(arg, exp);
                        // Recompute the type now.
                        arg.type = null;
                        this.getType(arg)
                    }
                }

                // We have to create new Type variable names when calling a
                return callFunction(funcType as PolyType, expr.args, argTypes, this.unifier);
            }
            else if (funcType instanceof TypeVariable) {
                const genFunc = genericFuncTypeFromArgs(argTypes);
                this.unify(funcType, genFunc);
                const retType = getReturnType(genFunc);
                const r = callFunction(genFunc, expr.args, argTypes, this.unifier);
                this.unify(retType, r);
                return r;
            }
            else {
                throw new Error("Can't call " + funcType);
            }
        }
        else if (expr instanceof ConditionalExpr) {
            this.unifyBool(expr.condition);
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
                v.type = this.getType(varExpr);
            }
            const r = this.getType(expr.expr);
            return r;
        }
        else if (expr instanceof Lambda) {
            return getLambdaType(expr, this.unifier);
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