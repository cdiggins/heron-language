import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, NumLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField } from "./heron-expr";
import { Statement, CompoundStatement, IfStatement, EmptyStatement, VarDeclStatement, WhileStatement, DoStatement, ForStatement, ExprStatement, ContinueStatement, ReturnStatement } from "./heron-statement";
import { throwError, HeronAstNode, validateNode, visitAst } from "./heron-ast-rewrite";
import { FuncDef, FuncParamDef, ForLoopVarDef } from "./heron-defs";
import { FuncRef, TypeRef, TypeParamRef, Ref } from "./heron-refs";
import { typeConstant, typeArray, functionType, Type, functionInput, TypeArray, functionOutput, typeVariable, TypeVariable, TypeConstant, isFunctionType, isTypeConstant, Unifier } from "./type-system";
import { Module, Package } from "./heron-package";

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
    export const NeverType = typeConstant('Never');
    export const TypeType = typeConstant('Type');
    export const FuncType = typeConstant('Func');
}

export function typeFromNode(node: HeronAstNode): Type {
    // TODO: make a generic type!!!! 

    if (!node) return null;
    validateNode(node, "typeExpr", "typeName");
    return typeConstant(node.allText);
}

// This class computes the type for a function
export class TypeEvaluator 
{
    unifier: Unifier = new Unifier();
    function: TypeArray;

    constructor(
        public readonly params: FuncParamDef[],
        public readonly bodyNode: HeronAstNode,
        public readonly retTypeNode: HeronAstNode
    )
    { 
        this.function = makeGenericFuncType(params.length);

        for (var i=0; i < params.length; ++i) {
            let param = params[i];
            let paramType = typeFromNode(params[i].typeNode);
            if (paramType !== null) {
                param.type = paramType;
                this.unify(this.getArgType(i), paramType);
            }
            else {
                param.type = this.getArgType(i);
            }
        }

        let retType = typeFromNode(retTypeNode);
        if (retType)
            this.unifyReturn(retType);

        if (bodyNode && bodyNode.statement)         
            this.getType(bodyNode.statement);
        else if (bodyNode && bodyNode.expr) 
            this.getType(bodyNode.expr);
    }

    getArgType(n: number) {
        return getArgTypes(this.function)[n];
    }

    getReturnType() {
        return functionOutput(this.function);
    }

    getFinalResult() : TypeArray {
        let result = this.unifier.getUnifiedType(this.function, [], {});
        if (!isFunctionType(result))
            throw new Error("Expected final result to be a type array");
        return result as TypeArray;
    }

    getType(x: Statement | Expr): Type
    {       
        if (x instanceof Statement) {
            this.getStatementType(x);
            return Types.VoidType;
        }
        else if (x instanceof Expr) 
            return x.type = this.getExpressionType(x);        
    }

    getStatementType(statement: Statement)
    {
        if (statement instanceof CompoundStatement) 
        {
            for (var st of statement.statements)
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
            let forLoopVar = statement.node.def;
            if (!forLoopVar)
                throwError(statement.node, "Missing for loop variable definition");
            let arrayType = makeNewArrayType();
            let elementType = getArrayElementType(arrayType);
            if (forLoopVar.type)
                this.unify(forLoopVar.type, elementType);
            else   
                forLoopVar.type = elementType;
            this.unify(statement.array, arrayType);
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
            for (var vd of statement.vars) {
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
            if (expr.node.ref instanceof FuncRef) {
                return makeFunctionSet(expr.node.ref.defs.map(d => d.type));
            }
            if (expr.node.ref instanceof TypeRef || expr.node.ref instanceof TypeParamRef) {
                // TODO: eventually we might want to support 
                throwError(expr.node, "Type names are not allowed in expressions: " + expr.name);
            }
            // TODO: the reference could be to something else
            //return this.findVar(expr.name);
            throw new Error("Uncroegnized expression");
        }
        else if (expr instanceof FunCall) {
            let func = this.getType(expr.func);
            let args = expr.args.map(a => this.getType(a));
            if (func instanceof TypeArray) {
                if (isFunctionSet(func))
                    return this.callFunction(func, args);
                else if (isFunctionType(func))
                    return this.callFunction(func, args);
                else 
                    throw new Error("Can't call " + func);
            }
            else {
                throw new Error("Not an invokable function " + func);
            }
        }
        else if (expr instanceof ConditionalExpr) {
            let cond = this.unifyBool(expr.cond);
            let onTrue = this.getType(expr.onTrue);
            let onFalse = this.getType(expr.onFalse);
            return this.unify(onTrue, onFalse);
        }
        else if (expr instanceof ObjectLiteral || expr instanceof ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof ArrayLiteral) {
            let arrayType = makeNewArrayType();
            let elemType = getArrayElementType(arrayType);
            for (let v of expr.vals)
                this.unify(v, elemType);
            return arrayType;
        }
        else if (expr instanceof BoolLiteral) {
            return Types.BoolType;
        }
        else if (expr instanceof NumLiteral) {
            return Types.NumType;
        }
        else if (expr instanceof StrLiteral) {
            return Types.StrType;
        }
        else if (expr instanceof VarExpr) {
            for (let v of expr.vars) {
                let varExpr = v.exprNode.expr;
                if (!varExpr)
                    throwError(v.exprNode, "No expression associated with variable: " + v.name);
            }
            let r = this.getType(expr.expr);
            return r;
        }
        else if (expr instanceof Lambda) {
            return getLambdaType(expr);
        }
        else if (expr instanceof PostfixDec) {
            return this.unifyNumber(expr.lvalue);
        }
        else if (expr instanceof PostfixInc) {
            return this.unifyNumber(expr.lvalue);
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

    unifyNumber(x: Type | Expr): Type {
        return this.unify(x, Types.NumType);
    }

    unifyReturn(x: Type | Expr): Type {
        return this.unify(x, this.getReturnType());
    }

    callFunction(fun: TypeArray, args: Type[]): Type {
        let params = getArgTypes(fun);
        if (params.length !== args.length)
            throw new Error("Mismatched number of arguments was " + args.length + " expected " + params.length);
        for (let i=0; args.length; ++i) 
            this.unify(params[i], args[i]);
        return getReturnType(fun);
    }
           
    callFunctionSet(funset: TypeArray, args: Type[]): Type {
        let funcs = funset.types[1] as TypeArray;
        let results: TypeArray[] = [];
        for (var i=0; i < funcs.types.length; ++i) {
            let func = funcs[i];
            if (!isFunctionType(func))
                throw new Error("Expected a function type");

            let paramTypes = getArgTypes(func);  

            // Not providing enough parameters: continue          
            if (args.length !== paramTypes.length)
                continue;
                      
            // Are the types compatible?
            if (canCallFunc(func, args))
                results.push(func);
        }

        // TODO: unify some of these types with the arguments. 
        // What is tricky: if there are N functions, we have to know which one we are calling. 
        // if we don't, well we aren't really unifying anything.
        
        // BUT notice: sometimes the arguments are all the same. 
        // In other cases, we can end up with intersection types or discriminated union types


        if (results.length === 0)
            throw new Error("Could not find a function that matches the types");

        if (results.length === 1)
            return this.callFunction(results[0], args);
        
        return makeUnionType(results.map(getReturnType));           
    }
        
}

export function getFuncType(f: FuncDef): TypeArray {
    if (!f.type) {
        var te = new TypeEvaluator(f.params, f.body, f.retTypeNode);
        f.type = te.getFinalResult();
    }
    return f.type as TypeArray;
}

export function getLambdaType(l: Lambda): TypeArray {
    if (!l.type) {
        var te = new TypeEvaluator(l.params, l.bodyNode, null);
        l.type = te.getFinalResult();
    }
    return l.type as TypeArray;
}

export function getFuncParamType(f: FuncDef, n: number): Type {
    let type = getFuncType(f);
    let inputs = functionInput(type);
    if (!(inputs instanceof TypeArray)) 
        throw new Error("Function input must be a TypeArray");
    return inputs.types[n];
}

export function getFuncReturnType(f: FuncDef): Type {
    let type = getFuncType(f);
    return functionOutput(type);
}

export function funcTypeWithNArgs(n: number): Type {
    let params:Type[] = [];
    for (var i=0; i < n; ++i)
        params.push(typeVariable('T' + i))
    return functionType(typeArray(params), typeVariable('R'));
}

export function typeUnion(types: Type[]): Type {
    let tmp = {};
    for (let t of types) 
        tmp[t.toString()] = t;

    let r:Type[] = [];
    for (let k in tmp)
        r.push(tmp[k]);
    
    if (r.length === 0)
        return Types.VoidType;
    if (r.length === 1)
        return r[0];
        
    return typeArray([typeConstant('union'), typeArray(r)]);
}

export function makeGenericFuncType(nArgCount: number): TypeArray {
    let args = new Array(nArgCount).map((x, i) => typeVariable('T' + i));
    return functionType(typeArray(args), typeVariable('R'));
} 

export function makeArrayType(elementType: Type): TypeArray {
    return typeArray([typeConstant('array'), elementType]);
}

let n = 0;
export function makeNewTypeVar() {
    return new TypeVariable('T$' + n++);
}

export function makeNewArrayType() {
    return makeArrayType(makeNewTypeVar());
}

export function getArrayElementType(t: TypeArray) {
    return t.types[1];
}

export function makeUnionType(types: Type[]): TypeArray {
    let tmp = {};
    for (var t of types) {
        if (isUnionType(t)) {
            for (var t2 of getTypesInUnion(t))
                tmp[t.toString()] = t;
        }
        else 
            tmp[t.toString()] = t;
    }
    let r = [];
    for (var k in tmp)
        r.push(tmp[k])    
    return typeArray([typeConstant('union'), typeArray(types)]);
}

export function makeFunctionSet(types: Type[]): TypeArray {    
    for (var t of types)
        if (!isFunctionType(t))
            throw new Error("Only function types can be used to make a function set");
    return typeArray([typeConstant('funset'), typeArray(types)]);
}

export function isFunctionSet(type: TypeArray): boolean {
    return isTypeConstant(type.types[0], 'funset');
}

export function isUnionType(type: Type): boolean {
    if (!(type instanceof TypeArray))
        return false;
    return isTypeConstant(type.types[0], 'union');
}

export function getTypesInUnion(type: Type): Type[] {
    if (!isUnionType(type))
        throw new Error("Not a union type");
    return ((type as TypeArray).types[1] as TypeArray).types;
}

export function getArgTypes(f: TypeArray): Type[] {
    return ((functionInput(f)) as TypeArray).types;
}

export function getReturnType(f: TypeArray): Type {
    return functionOutput(f);
}

export function canCallFunc(f: TypeArray, args: Type[]): boolean {
    // TODO: can I pass the arg type to the function type, and other shit.
    return true;
}