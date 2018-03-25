import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, NumLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField } from "./heron-expr";
import { Statement, CompoundStatement, IfStatement, EmptyStatement, VarDeclStatement, WhileStatement, DoStatement, ForStatement, ExprStatement, ContinueStatement, ReturnStatement } from "./heron-statement";
import { throwError, HeronAstNode, validateNode, visitAst } from "./heron-ast-rewrite";
import { FuncDef, FuncParamDef } from "./heron-defs";
import { FuncRef, TypeRef, TypeParamRef, Ref } from "./heron-refs";
import { typeConstant, typeArray, functionType, Type, functionInput, TypeArray, functionOutput, typeVariable, TypeVariable, TypeConstant, isFunctionType, isTypeConstant, TypeResolver } from "./type-system";
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

    export function getType(node: HeronAstNode): Type {
        if (!node) 
           return AnyType;
        validateNode(node, "typeExpr", "typeName");
        return typeConstant(node.allText);
    }
}

// A val is a single value. It might not be none.  
class Val {
    constructor(
        public readonly value: any,
        public readonly type: Type)
    { }

    prev: Val; 
    node: HeronAstNode; 
}

class FuncSet {
    constructor(
        public readonly defs: FuncDef[]
    )
    { }
}

export function union(...vals:Val[]) {
    let value = vals[0].value;
    let type = vals[0].type;
    for (var i=1; vals.length; ++i) {
        if (value !== vals[i].value)
            value = null;
        if (type.toString() !== vals[i].toString())
            type = Types.AnyType;
    }
    return new Val(value, type);
}

const valNever = new Val(null, Types.NeverType);
const valVoid = new Val(null, Types.VoidType);
const valAny = new Val(null, Types.AnyType);

function valNumber(x: number): Val { return new Val(x, Types.NumType); }
function valString(x: string): Val { return new Val(x, Types.StrType); }
function valBoolean(x: boolean): Val { return new Val(x, Types.BoolType); }
function valFunc(x: FuncDef): Val { return new Val(x, Types.FuncType); }
function valLambda(x: Lambda): Val { return new Val(x, Types.LambdaType); }
function valArray(x: Val[]): Val { return new Val(x, Types.ArrayType); }
function valFromType(x: Type): Val { return new Val(null, x); }

/**
 * Contains the bindings for the current scope. 
 */
export class Env { 
    parent: Env;
    bindings: { [name: string]: Val; } = {};
    children: Env[] = [];
};

/** 
 * This is an abstract (symbolic) evaluator. It is used to determined types,
 * and various other properties of expressions.  
 */
export class Evaluator 
{
    env = new Env();
    
    pushEnv() {
        let s = new Env();
        s.parent = this.env;
        s.parent.children.push(s);
        this.env = s;
    }

    popEnv() {
        this.env = this.env.parent;
        if (!this.env)
            throw new Error("Unmatched scopes");
    }

    evalStatement(statement: Statement)
    {
        if (statement instanceof CompoundStatement) 
        {
            this.pushEnv();
            for (var st of statement.statements)
                this.evalStatement(st);
            this.popEnv();
        }
        else if (statement instanceof IfStatement) {
            this.pushEnv();
            this.evalExpr(statement.condition);
            this.evalStatement(statement.onTrue);
            this.evalStatement(statement.onFalse);
            this.popEnv();
        }
        else if (statement instanceof ReturnStatement) {
            this.bindVar(statement.node, '$result', this.evalExpr(statement.condition));
        }
        else if (statement instanceof ContinueStatement) {
            // Do nothing 
        }
        else if (statement instanceof ExprStatement) {
            this.evalExpr(statement.expr);
        }
        else if (statement instanceof ForStatement) {
            this.pushEnv();
            this.bindVar(statement.node, statement.identifier, valAny);
            this.evalExpr(statement.array);
            this.popEnv();
        }
        else if (statement instanceof DoStatement) {
            this.pushEnv();
            this.evalStatement(statement.body);
            this.evalExpr(statement.condition);
            this.popEnv();
        }
        else if (statement instanceof WhileStatement) {
            this.pushEnv();
            this.evalExpr(statement.condition);
            this.evalStatement(statement.body);
            this.popEnv();
        }
        else if (statement instanceof VarDeclStatement) {
            for (var vd of statement.vars) {
                if (!vd.exprNode.expr)
                    throw new Error("Missing an expression node.")
                let val = this.evalExpr(vd.exprNode.expr);
                this.bindVar(statement.node, vd.name, val);
            }
        }
        else if (statement instanceof EmptyStatement) {
            // Do nothing. 
        }
        else {
            throw new Error("Unrecognized statement " + statement);
        }
    }

    bindVar(node: HeronAstNode, name: string, val: Val): Val {
        val.prev = this.env.bindings[name];        
        val.node = node;
        this.env.bindings[name] = val;
        return val;
    }

    findVar(name: string): Val { 
        for (var scope=this.env; scope != null; scope=scope.parent) {
            if (name in scope.bindings)
                return scope.bindings[name];
        }
        throw new Error("Could not find var " + name);
    }
       
    evalFunc(f: FuncDef, args: Val[] = []): Val {
        let r: Val = valVoid;
        
        if (!f.body) {
            // intrinsic
            let rt = f.retTypeNode;
            return new Val(null, Types.getType(rt));
        }
        else if (f.body.statement) {
            this.evalStatement(f.body.statement);
            r = this.findVar('$result');
        }
        else if (f.body.expr) {
            r = this.evalExpr(f.body.expr);
        }
        else {
            throw new Error("Function body has no expression or statement");
        }

        this.popEnv();
        return r;
    }
    
    evalLambda(f: Lambda, args: Val[]): Val {            
        this.pushEnv();
        for (var p of f.params)
            this.bindVar(p.node, p.name, args[0]);
            
        let r: Val = valVoid;
        
        if (f.bodyNode.statement) {
            this.evalStatement(f.bodyNode.statement);
            r = this.findVar('$result');
        }
        else if (f.bodyNode.expr) {
            r = this.evalExpr(f.bodyNode.expr);
        }
        else {
            throw new Error("Function body has no expression or statement");
        }

        this.popEnv();
        return r;
    }

    evalFuncSet(node: HeronAstNode, fs: FuncDef[], args: Val[]): Val {
        // Try calling each function. 
        
        // TODO: find function from result.

        let results = fs.map(def => this.evalFunc(def, args));
        let validResults = results.filter(r => r != null);
        if (validResults.length === 0) {
            throwError(node, "Found no matching functions");
        }
        else if (validResults.length > 1) {
            throwError(node, "Found multiple matching functions");
        }
        else {        
            return validResults[0];
        }
    }

    evalExpr(expr: Expr): Val {
        if (expr === null)
            return valVoid;

        if (expr instanceof VarName) {
            if (expr.node.ref instanceof FuncRef) {
                // TODO: figure out the FuncTYpe
                return new Val(new FuncSet(expr.node.ref.defs), Types.FuncType);
            }
            if (expr.node.ref instanceof TypeRef || expr.node.ref instanceof TypeParamRef) {
                // TODO: eventually we might want to support 
                throwError(expr.node, "Type names are not allowed in expressions: " + expr.name);
            }
            // TODO: the reference could be to something else
            return this.findVar(expr.name);
        }
        else if (expr instanceof FunCall) {
            // TODO: just like VarName this could resolve to a bunch of possibilities. 
            // We need to chooose the one that works. There are a few possibilities. 
            // Now in the case of functions: just argument counts is not a good idea.
            // really we should look at the arg types. 
            let func = this.evalExpr(expr.func);
            let args = expr.args.map(a => this.evalExpr(a));
            if (func.value instanceof FuncSet) {
                this.evalFuncSet(expr.node, func.value.defs, args);
            } else if (func instanceof Lambda) {
                this.evalLambda(func, args);
            }
            else {
                throw new Error("Not an invokable function " + func);
            }
        }
        else if (expr instanceof ConditionalExpr) {
            this.pushEnv();
            let cond = this.evalExpr(expr.cond);
            let onTrue = this.evalExpr(expr.onTrue);
            let onFalse = this.evalExpr(expr.onFalse);
            if (cond instanceof Val) {
                if (cond.type !== Types.BoolType) {
                    throw new Error("The type of an if condition is not a boolean, it is " + cond.type);
                }
                if (cond.value === true) return onTrue;
                if (cond.value === false) return onFalse;
            }
            let r = union(onTrue, onFalse);
            this.popEnv();
            return r;
        }
        else if (expr instanceof ObjectLiteral || expr instanceof ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof ArrayLiteral) {
            return valArray(expr.vals.map(this.evalExpr));
        }
        else if (expr instanceof BoolLiteral) {
            return valBoolean(expr.value);
        }
        else if (expr instanceof NumLiteral) {
            return valNumber(expr.value);
        }
        else if (expr instanceof StrLiteral) {
            return valString(expr.value);
        }
        else if (expr instanceof VarExpr) {
            this.pushEnv();
            for (let v of expr.vars) {
                let varExpr = v.exprNode.expr;
                if (!varExpr)
                    throwError(v.exprNode, "No expression associated with variable: " + v.name);
                this.bindVar(v.node, v.name, this.evalExpr(varExpr));
            }
            let r = this.evalExpr(expr.expr);
            this.popEnv();
            return r;
        }
        else if (expr instanceof Lambda) {
            return valLambda(expr);
        }
        else if (expr instanceof PostfixDec) {
            return this.postfixApply(expr.lvalue, (x) => x - 1);
        }
        else if (expr instanceof PostfixInc) {
            return this.postfixApply(expr.lvalue, (x) => x + 1);
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
    }

    postfixApply(expr: Expr, f: (x) => any): any {
        let r = this.evalExpr(expr);
        if (expr instanceof VarName) {
            this.bindVar(expr.node, expr.name, f(r));
        }
        else {
            throwError(expr.node, "Cannot apply postfix expression to: " + expr);
        }
        return r;
    }
}

export function findFunc(mod: Module, name: string): FuncDef {
    let defs = mod.body.children.map(c => c.def).filter(d => d instanceof FuncDef);
    for (var d of defs)
        if (d.name === name)
            return d as FuncDef;
    return null;
}

export function getAllRefs(node: HeronAstNode): Ref[] {
    let refs: Ref[] = [];
    visitAst(node, n => !n.ref || refs.push(n.ref));
    return refs;
}

export function argumentIndex(f: FunCall, x: Expr): number {
    return f.args.indexOf(x);
}

export function getFuncParamType(f: FuncDef, n: number): Type {
    let type = computeFuncType(f);
    let inputs = functionInput(type);
    if (!(inputs instanceof TypeArray)) 
        throw new Error("Function input must be a TypeArray");
    return inputs.types[n];
}

export function getFuncReturnType(f: FuncDef): Type {
    let type = computeFuncType(f);
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

export function getParamType(refs: Ref[], p: FuncParamDef): Type {
    if (p.type)
        return p.type;

    if (p.typeNode) 
        return p.type = Types.getType(p.typeNode);

    let paramRefs = refs.filter(r => r.defs.indexOf(p) >= 0);
    let types:Type[] = [];
    for (let pr of paramRefs) {
        let expr = pr.node.expr;
        if (!expr)
            throw new Error("A parameter reference, must be an expression");

        let f = expr.functionArgument;
        if (f) {
            // Recursively analyze called functions. 
            let ref = f.func.node.ref;
            let n = argumentIndex(f, expr);
            if (ref) {
                for (var d of ref.defs)
                    if (d instanceof FuncDef && d.params.length > n)
                        types.push(getFuncParamType(d, n));
            }
        }

        f = expr.calledFunction;
        if (f) {
            let n = f.args.length;
            types.push(funcTypeWithNArgs(n));
        }
    }

    return p.type = typeUnion(types);
}

export function computeFuncType(f: FuncDef): Type {
    if (f.type) return f.type;
    // This is a temporary.
    f.type = funcTypeWithNArgs(f.params.length);
    let refs = getAllRefs(f.body);
    let paramTypes = f.params.map(p => getParamType(refs, p));
    let retType = f.retTypeNode ? Types.getType(f.retTypeNode) : Types.AnyType;
    let inputType = typeArray(paramTypes);
    return f.type = functionType(inputType, retType);
}

export function analyzeFunctions(pkg: Package) {
    let funcs = pkg.allFuncDefs;
    for (let f of funcs) {
        let t = computeFuncType(f);
        console.log(f.name + ' : ' + t.toString())
    }
    // * Get all of the functions from all of the modules. 
    // * Look at how they are all used
    // * Do they have a type signature? 
    // * If not what would their type signature be? T0, T1, T2: T3
    // * So what are the constraints on the various type signatures? 
    // * There are a lot of functions called on each one. 
    // * basically what is the trait. 
    // * Should the trait have "T1" / "T2" or somethiin
}

