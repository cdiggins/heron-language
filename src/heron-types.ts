import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, IntLiteral, FloatLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField, VarAssignmentExpr } from "./heron-expr";
import { Statement, CompoundStatement, IfStatement, EmptyStatement, VarDeclStatement, WhileStatement, DoStatement, ForStatement, ExprStatement, ContinueStatement, ReturnStatement } from "./heron-statement";
import { throwError, HeronAstNode, validateNode, visitAst } from "./heron-ast-rewrite";
import { FuncDef, VarDef } from "./heron-defs";
import { FuncRef, TypeRef, TypeParamRef, FuncParamRef, VarRef, ForLoopVarRef } from "./heron-refs";
import { Type, PolyType, TypeVariable, TypeResolver, TypeStrategy, typeConstant, polyType, typeVariable, TypeConstant, isTypeConstant, newTypeVar, normalizeType, Lookup, freshVariableNames } from "./type-system";
import { trace } from "./utils";

export class FunctionSet { 
    constructor(public functions: PolyType[]) { 
        if (functions.some(f => !f))
            throw new Error("One of the functions is null");
    }

    toString(): string {
        return "[" + this.functions.join(" | ") + "]";
    }
}
export type HeronType = Type | PolyType[];

export function assure<T>(t: T): T {
    if (!t)
        throw new Error("Value was not defined");
    return t;
}

export module Types 
{
    // A simplistic HeronType-system for now. 
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
    export const TypeType = typeConstant('HeronType');
    export const FuncType = typeConstant('Func');
}

export function typeFromNode(node: HeronAstNode, typeParams: Lookup<string>): HeronType|null {
    if (!node) return null;
    validateNode(node, "typeExpr", "typeName");
    if (node.name === "typeExpr") {
        if (node.children.length === 1) 
            return typeFromNode(node.children[0], typeParams);
        return polyType(node.children.map(c => {
            const tmp = typeFromNode(c, typeParams);
            if (!tmp)
                throw new Error("Could not find inner type node");
            return tmp;
        }));
    }
    else if (node.name === "typeName") {
        const text = node.allText;
        if (text in typeParams) 
            return typeVariable(typeParams[text]);
        else             
            return typeConstant(text);
    }
    return null;
}

class TypeStrategyClass {
    readonly casts: { [_:string]:string[] } = { 
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
        throw new Error("Failed to resolve HeronType constants: " + a + " and " + b);
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

export function callFunction(funOriginal: PolyType, args: Expr[], argTypes: HeronType[], mainUnifier: TypeResolver): HeronType {                
    // TODO: I used to think this but it is not correct 
    // We have to create fresh variable names.
    const fun = funOriginal; // freshVariableNames(funOriginal) as PolyType;
    trace("funcType", "New version of function " + fun);
    const paramTypes = getFuncArgTypes(fun); 

    // Parameters should match the number of arguments given to it. 
    if (paramTypes.length !== args.length)
        throw new Error("Mismatched number of arguments was " + args.length + " expected " + paramTypes.length);    

    // Unify the passed arguments with the parameter types.    
    const finalArgTypes: Type[] = [];
    for (let i=0; i < args.length; ++i) {        
        let argType = argTypes[i];
        if (!argType)
            throw new Error("illegal argument type");

        const paramType = paramTypes[i];
        const arg = args[i];
        if (argType instanceof FunctionSet) {
            trace("chooseFunc", "Function set as argument");
            let n = -1;
            if (!(paramType instanceof PolyType)) {
                n = chooseMostGeneric(argType);
                trace("chooseFunc", "Parameter is not a poly-rype: can't figure out best match, defaulting to most generic");
            }
            else {
                // We have to figure out which type is the best here. 
                n = chooseBestFunctionIndex(paramType as PolyType, argType);
            }

            if (n < 0)
                throw new Error("No function found");
            argType = argType.functions[n];
            if (!argType)
                throw new Error("No function type found");
            arg.functionIndex = n;
        }
    
        const finalArgType = mainUnifier.unifyTypes(argType, paramType);
        trace("funcType", "Unifying argument " + arg + " with " + argType + " and " + paramType + " is " + finalArgType);
        finalArgTypes.push(finalArgType);
    }

    // Create a final function type, and unify it. 
    const finalRetType = mainUnifier.getUnifiedType(getFuncReturnType(fun));
    trace("funcType", "Unified return type of " + fun + " is " + finalRetType);
    
    // We return the unified version of the return HeronType.
    return finalRetType;
}    

export function computeFuncTypeFromSig(f: FuncDef|Lambda, genParams: Lookup<string>): PolyType {
    // TODO: rename the genParams 
    const u = new TypeResolver(typeStrategy);
    const t = genericFuncType(f.params.length);
    let hasSpecType = false;
    for (let i=0; i < f.params.length; ++i) {
        const param = f.params[i];
        const paramType = typeFromNode(f.params[i].typeNode, genParams);
        if (paramType) {
            hasSpecType = true;
            param.type = paramType;            
            u.unifyTypes(getFuncArgType(t, i), paramType);
        }
        else {
            param.type = getFuncArgType(t, i);
        }
        trace("funcType", "Parameter " + i + " " + param.type);
    }
    const retType = f instanceof FuncDef ? typeFromNode(f.retTypeNode, genParams) : null;
    if (retType) {
        hasSpecType = true;        
        u.unifyTypes(getFuncReturnType(t), retType);
    }
    if (hasSpecType)
        return u.getUnifiedType(t) as PolyType;
    else
        return t;
}

export function genParamsToNewVarLookup(genParams: string[]) : Lookup<string> {
    const r: Lookup<string> = {};
    for (const p of genParams)
        r[p] = newTypeVar().name;
    return r;
}

export function computeVarType(v: VarDef): Type {
    if (!v.type) {
        const expr = v.exprNode.expr;
        const tmp = genericFuncType(0);
        const u = new TypeResolver(typeStrategy);
        const te = new FunctionTypeEvaluator(v.name, 0, expr, typeStrategy, u, tmp);
        const r = getFuncReturnType(te.result);
        v.type = r;
    }
    return v.type;
}

export function computeFuncType(f: FuncDef): PolyType {
    if (!f.type) {
        trace("funcType", "Computing function type for " + f);
        const sigNode = validateNode(f.node.children[0], "funcSig");
        const genParamsNode = validateNode(sigNode.children[1], "genericParams");
        const genParams = genParamsNode.children.map(p => p.allText);
        const body = f.body ? (f.body.expr ? f.body.expr || null : f.body.statement || null) : null;
        // This is important, because it is used when a recursive call is made. 
        // Additionally, if types are present in the signature we use those
        f.type = computeFuncTypeFromSig(f, genParamsToNewVarLookup(genParams));
        const u = new TypeResolver(typeStrategy);
        const te = new FunctionTypeEvaluator(f.name, f.params.length, body, typeStrategy, u, f.type as PolyType);
        te.refineTypes();
        f.type = te.result;
        trace('funcType', " " + u.state)
        trace('funcType', "Type for " + f + " is " + normalizeType(f.type));
    }
    // When getting a function def type we generate new variable names each time. 
    return freshVariableNames(f.type) as PolyType;
}

export function getLambdaType(l: Lambda, u: TypeResolver, shape: PolyType): PolyType {
    if (!l.type) {
        l.type = shape;
        for (let i=0; i < l.params.length; ++i)
            l.params[i].type = getFuncArgType(shape, i);
        const te = new FunctionTypeEvaluator('_lambda_', l.params.length, l.body, typeStrategy, u, shape);
        l.type = te.result;        
    }
    return l.type as PolyType;
}

export function funcType(args: HeronType[], ret: HeronType): PolyType {
    return polyType([typeConstant('Func'), ...args, ret]);
}

export function genericFuncType(n: number): PolyType {
    const args: HeronType[] = [];
    for (let i=0; i < n; ++i)
        args.push(newTypeVar());
    return genericFuncTypeFromArgs(args);
}

export function genericFuncTypeFromArgs(args: HeronType[]): PolyType {
    return funcType(args, newTypeVar());
}

export function makeArrayType(elementType: HeronType): PolyType {
    return polyType([typeConstant('Array'), elementType]);
}

export function makeNewArrayType() {
    return makeArrayType(newTypeVar());
}

export function getArrayElementType(t: PolyType) {
    return t.types[1];
}

export function makeFunctionSet(types: PolyType[]): HeronType {    
    if (types.length === 0)
        throw new Error("Not enough types");
    if (types.length === 1)
        return types[0];
    for (const t of types)
        if (!isFunctionType(t))
            throw new Error("Only function types can be used to make a function set");
    return new FunctionSet(types);
}

export function isFunctionType(type: Type): boolean {    
    return (type instanceof PolyType) && isTypeConstant(type.types[0], 'Func');
}

export function getNumArgTypes(f: PolyType): number {
    return f.types.length - 2;
}

export function getFuncArgCount(f: PolyType): number {
    return f.types.length - 2;
}

export function getFuncArgType(f: PolyType, n: number): HeronType {
    if (n < 0 || n > getFuncArgCount(f))
        throw new Error("Argument index out of bounds");
    return getFuncArgTypes(f)[n];
}

export function getFuncArgTypes(f: PolyType): HeronType[] {
    return f.types.slice(1, f.types.length - 1);
}

export function getFuncReturnType(f: PolyType): HeronType {
    return f.types[f.types.length-1];
}

export function canCallFunc(f: PolyType, args: HeronType[], exact: boolean): boolean {
    const params = getFuncArgTypes(f);
    if (params.length !== args.length) return false;
    for (let i=0; i < params.length; ++i)
        if (!canPassArg(args[i], params[i], exact))
            return false;
    return true;
}

export function canPassArg(arg: HeronType, param: HeronType, exact: boolean) {
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

// Gives a score to a function based on how many concrete types it has  
export function functionSpecificity(func: PolyType): number {
    const args = getFuncArgTypes(func);
    let n = 0;
    for (const a of args)
        if (a instanceof PolyType || a instanceof TypeConstant)
            n++;
    return n;
}

// TODO: this is a horrible algorithm. It will choose functions that are absolutely no good. 
export function chooseMostGeneric(funcSet: FunctionSet): number {
    const options = funcSet.functions;
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

export function chooseBestFunctionIndexFromArgs(args: HeronType[], originalFuncSet: FunctionSet): number {
    // Removes functions that don't have the right number of arguments.
    // TODO: this code is ugly as sin, clean it up
    const newFunctions: PolyType[] = [];
    const remap: number[] = [];
    for (let i = 0; i < originalFuncSet.functions.length; ++i) { 
        const f = originalFuncSet.functions[i];
        if (getFuncArgCount(f) === args.length) {
            remap.push(i);
            newFunctions.push(f)
        }
    }
    if (newFunctions.length === 0)
        throw new Error("No function matches the number of arguments " + args.length);
    if (newFunctions.length === 1)
        return remap[0];

    const funcSet = new FunctionSet(newFunctions);

    // Remove functions that are absolutely no good. 

    trace("chooseFunc", "Choosing function using args: " + args.join(", "));
    trace("chooseFunc", "Choosing function from choices:");
    let r = -1;
    while (r < 0) {
        for (const opt of funcSet.functions)
            trace("chooseFunc", "    " + opt);
        r = chooseBestFunctionIndexFromArgsHelper(args, funcSet, true);
        if (r >= 0) break;
        trace('chooseFunc', 'No exact match found, trying inexact matches');
        // Try an inexact match (casting)
        r = chooseBestFunctionIndexFromArgsHelper(args, funcSet, false);
        if (r >= 0) break;
        trace('chooseFunc', 'No inexact match found, trying generic matches');
        // If nothing else works, just try the most generic option
        r = chooseMostGeneric(funcSet);
        if (r >= 0) break;

        throw new Error("Found no matching function");        
    }    
    return remap[r];
}

export function chooseBestFunctionIndexFromArgsHelper(args: HeronType[], funcSet: FunctionSet, exact: boolean): number {
    const options = funcSet.functions;
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

export function chooseBestFunctionIndex(f: PolyType, funcSet: FunctionSet): number {
    return chooseBestFunctionIndexFromArgs(getFuncArgTypes(f), funcSet);
}

/** 
 * This class computes the HeronType for a function. The shape argument says that we have a certain 
 * expectation for the form of the lambda (e.g. it is used or passed in different contexts).
 */
export class FunctionTypeEvaluator 
{
    private readonly _function: PolyType;
    public readonly result: PolyType;

    constructor(
        public readonly name: string,
        public readonly argCount: number,
        public readonly body: Expr | Statement | null,
        public readonly typeStrategy: TypeStrategy, 
        public readonly unifier: TypeResolver,
        public readonly shape: PolyType,
    )
    { 
        if (!isFunctionType(shape))
            throw new Error("Missing function shape: create a generic function HeronType if you don't know what to pass");

        //this._function = freshParameterNames(shape) as PolyType;
        this._function = shape;

        trace('funcType', 'Getting function type for ' + name);
        trace('funcType', '  given type ' + this._function);
    
        if (body)
            this.getType(body);
        if (body instanceof Expr)        
            this.unifyReturn(body);

        this.result = this.unifier.getUnifiedType(this._function) as PolyType;
        trace('funcType', "Final type for " + name + " originally type " + this._function + " is " + this.result); 
        //trace('funcType', "Unifier state:");
        //trace('funcType', this.unifier.state);
    }

    // Pass through all of the statements and expressions and recompute the types. 
    // This allows us to get a bit further in the types 
    refineTypes() {
        if (this.body)
            visitAst(this.body.node, n => this.refineType(n));
    }

    refineType(n: HeronAstNode) {
        if (n.expr) {
            if (n.expr instanceof FunCall) {
                // TODO:  get a more accurate function here.
            }

            n.expr.type = this.unifier.getUnifiedType(n.expr.type);
        }
    }
    

    get numArgs(): number{
        return getFuncArgCount(this._function);
    }

    getArgType(n: number): HeronType {
        return getFuncArgType(this._function, n);
    }

    getReturnType(): HeronType {
        return getFuncReturnType(this._function);
    }

    getType(x: Statement | Expr | undefined): HeronType
    {     
        if (!x)
            throw new Error("Invalid argument");
        
        if (x.type) 
            return x.type;

        try {  
            if (x instanceof Statement) {
                this.getStatementType(x);
                return x.type = Types.VoidType;
            }
            else {
                const rawType = this.getExprType(x);

                if (rawType instanceof FunctionSet)
                    return x.type = rawType;
                const uniType = this.unifier.getUnifiedType(rawType);

                console.log("Expression     : " + x.toString());
                //console.log("  has raw type : " + rawType);
                console.log("  has type     : " + uniType);
                //return x.type = rawType;

                if (!uniType)
                    throw new Error("Missing unified type")
                return x.type = uniType;
            }
        }
        catch (e) {
            throwError(x.node, e.message);
        }
        throw new Error("Unexpected code path");
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
            if (statement.expr)
                this.unifyReturn(statement.expr);
            else 
                this.unifyTypes(this.getReturnType(), Types.VoidType);
        }
        else if (statement instanceof ContinueStatement) {
            // Do nothing 
        }
        else if (statement instanceof ExprStatement) {
            this.getType(statement.expr);
        }
        else if (statement instanceof ForStatement) {
            const forLoopVar = statement.node.def;
            if (!forLoopVar) {
                throwError(statement.node, "Missing for loop variable definition");
                throw new Error("Unexpected code path")
            }
            const arrayType = makeNewArrayType();
            const elementType = getArrayElementType(arrayType);
            if (forLoopVar.type)
                this.unifyTypes(forLoopVar.type, elementType);
            else   
                forLoopVar.type = elementType;
            this.unifyExpr(statement.array, arrayType);
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

    getExprType(expr: Expr): HeronType {
        if (expr === null)
            throw new Error("No HeronType available on a null expression");
        
        if (expr.type)             
            return expr.type;

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
                throwError(expr.node, "HeronType names are not allowed in expressions: " + expr.name);
            }
            // TODO: the reference could be to something else
            //return this.findVar(expr.name);
            throw new Error("Unrecognized expression");
        }
        else if (expr instanceof FunCall) {
            let funcType = this.getType(expr.func);
            if (!funcType)
                throw new Error("Could not get type of function");
            const argTypes: HeronType[]  = [];
            for (const a of expr.args) {
                const argType = this.getType(a);
                if (!argType)
                    throw new Error("Could not get type of argument: " + a);
                if (!a.type)
                    throw new Error("Type was not set on argument: " + a);
                argTypes.push(argType);
            }
            trace("chooseFunc", "Function call: " + expr);
            trace("chooseFunc", "Has function type " + funcType);
            trace("chooseFunc", "arg types : " + argTypes.join(", "));
            
            if (funcType instanceof FunctionSet) {
                const funcs = funcType.functions;
                //trace('chooseFunc', 'Looking for function match for: ' + expr.toString());
                let n = chooseBestFunctionIndexFromArgs(argTypes, funcType); 
                expr.func.functionIndex = n;
                funcType = funcs[n];
                if (!funcType)
                    throw new Error("Could not get the func type");
            }

            if (funcType instanceof PolyType) {
                if (!isFunctionType(funcType)) 
                    throw new Error("Can't call " + funcType);                
                
                const nArgTypes = getFuncArgCount(funcType);
                if(expr.args.length !== nArgTypes)
                    throw new Error("Mismatched number of args");
                for (let i=0; i < expr.args.length; ++i) {
                    this.unifyExpr(expr.args[i], getFuncArgType(funcType, i));                    
                }

                trace("chooseFunc", "final arg types : " + argTypes.join(", "));

                // We have to create new HeronType variable names when calling a
                return callFunction(funcType as PolyType, expr.args, argTypes, this.unifier);
            }
            else if (funcType instanceof TypeVariable) {
                trace("chooseFunc", "The functionType is a variable: " + funcType);
                const genFunc = genericFuncTypeFromArgs(argTypes);
                trace("chooseFunc", "Created a generic function: " + genFunc);
                this.unifyExpr(expr.func, genFunc);
                const retType = getFuncReturnType(genFunc);
                const r = callFunction(genFunc, expr.args, argTypes, this.unifier);
                for (const argType of argTypes) {
                    trace("chooseFunc", "Argument type is " + argType + ", unified is " + this.unifier.getUnifiedType(argType));
                }
                trace("chooseFunc", "Final unification for the function " + this.unifier.getUnifiedType(genFunc));
                trace("chooseFunc", "Final unification for the variable " + this.unifier.getUnifiedType(funcType));
                this.unifyTypes(retType, r);
                return r;
            }
            else {
                throw new Error("Can't call " + funcType);
            }
        }
        else if (expr instanceof ConditionalExpr) {
            this.unifyBool(expr.condition);
            return this.unifyExprWithExpr(expr.onTrue, expr.onFalse);
        }
        else if (expr instanceof ObjectLiteral || expr instanceof ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof ArrayLiteral) {
            const arrayType = makeNewArrayType();
            const elemType = getArrayElementType(arrayType);
            for (const v of expr.vals)
                this.unifyExpr(v, elemType);
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
            return getLambdaType(expr, this.unifier, genericFuncType(expr.params.length));
        }
        else if (expr instanceof PostfixDec) {
            return this.unifyInt(expr.lvalue);
        }
        else if (expr instanceof PostfixInc) {
            return this.unifyInt(expr.lvalue);
        }
        else if (expr instanceof VarAssignmentExpr) {
            const ref = expr.node.children[0].ref;
            if (!ref) {
                throwError(expr.node, "Variable assignment is missing reference");
                throw new Error("Unreachable code")
            }
            if (ref.defs.length > 1) 
                throwError(expr.node, "Multiple defs found");
            if (ref.defs.length < 1) 
                throwError(expr.node, "No defs found");
            const def = ref.defs[0];
            return this.unifyExpr(expr.value, def.type);
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
    }

    unifyExprWithExpr(exprA: Expr, exprB: Expr): HeronType {
        return this.unifyExpr(exprA, this.getType(exprB));
    }
    
    unifyExpr(expr: Expr, givenType: HeronType): HeronType {
        if (!expr) throw new Error("Expected expression");
        if (!givenType) throw new Error("Expected type");
        if (!(expr instanceof Expr))
            throw new Error("Expected expr to be of Expr type");
        if (!(givenType instanceof Type || givenType instanceof FunctionSet))
            throw new Error("Expected givenType to be of type HeronTypes");
        let exprType = this.getType(expr);

        if (exprType instanceof FunctionSet) {       
            if (!(givenType instanceof PolyType))
                throw new Error("Expected a PolyType to unify a fucnction set");
            const index = chooseBestFunctionIndex(givenType, exprType);
            exprType = exprType.functions[index];
            expr.functionIndex = index;
        }

        if (givenType instanceof FunctionSet) {
            if (!(exprType instanceof PolyType))
                throw new Error("Expected a PolyType to unify a fucnction set");
            const index = chooseBestFunctionIndex(exprType, givenType);
            givenType = givenType.functions[index];            
        }

        return this.unifyTypes(exprType, givenType)
    }

    unifyTypes(a: HeronType, b: HeronType): HeronType {
        if (!a || !b || a instanceof FunctionSet || b instanceof FunctionSet)
            throw new Error("Invalid argument");
        const ret = this.unifier.unifyTypes(a, b);
        trace("funcType", "Unification of " + a + " and " + b + " is " + ret);
        return ret;
    }

    unifyBool(x: Expr): HeronType {
        return this.unifyExpr(x, Types.BoolType);
    }

    unifyInt(x: Expr): HeronType {
        return this.unifyExpr(x, Types.IntType);
    }

    unifyReturn(x: Expr): HeronType {
        return this.unifyExpr(x, this.getReturnType());
    }    
}