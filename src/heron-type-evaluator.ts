import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, IntLiteral, FloatLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField, VarAssignmentExpr } from "./heron-expr";
import { Statement, CompoundStatement, IfStatement, EmptyStatement, VarDeclStatement, WhileStatement, DoStatement, ForStatement, ExprStatement, ContinueStatement, ReturnStatement } from "./heron-statement";
import { throwError, HeronAstNode, validateNode, visitAst } from "./heron-ast-rewrite";
import { FuncDef, FuncParamDef, ForLoopVarDef, VarDef } from "./heron-defs";
import { FuncRef, TypeRef, TypeParamRef, Ref, FuncParamRef, VarRef, ForLoopVarRef } from "./heron-refs";
import { typeConstant, polyType, Type, PolyType, typeVariable, TypeVariable, TypeConstant, isTypeConstant, TypeResolver, newTypeVar, Lookup, freshVariableNames, MonoType, normalizeType, TypeStrategy } from "./type-system";
import { Module, Package } from "./heron-package";
import { genericFuncType, typeFromNode, getNumArgTypes, getArgType, getReturnType, Types, getLambdaType, getArrayElementType, makeNewArrayType, callFunction, genericFuncTypeFromArgs, isFunctionType, callFunctionSet, isFunctionSet, assure, makeFunctionSet, computeFuncType } from "./heron-types";

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
        if (x.type)
            return x.type;

        try {  
            if (x instanceof Statement) {
                this.getStatementType(x);
                return x.type = Types.VoidType;
            }
            else if (x instanceof Expr) {
                const rawType = this.getExpressionType(x);
                const uniType = this.unifier.getUnifiedType(rawType);
                //console.log("Expression   : " + x.toString());
                //console.log("Has type     : " + uniType);
                return x.type = uniType;
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

        //console.log("Evaluating type of: " + expr.toString());

        if (expr instanceof VarName) {
            if (!expr.node.ref) 
                throwError(expr.node, "Missing ref");
                
            const ref = expr.node.ref;
            if (ref instanceof FuncRef) {
                return makeFunctionSet(ref.defs.map(r => computeFuncType(r)));
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
                if (isFunctionSet(func)) {
                    console.log("Function: " + expr.func);
                    return callFunctionSet(func, args, this.unifier);
                }
                else if (isFunctionType(func))
                    // We have to create new Type variable names when calling a
                    return callFunction(func, args, this.unifier);
                else 
                    throw new Error("Can't call " + func);
            }
            else if (func instanceof TypeVariable) {
                const genFunc = genericFuncTypeFromArgs(args);
                this.unify(func, genFunc);
                const retType = getReturnType(genFunc);
                const r = callFunction(genFunc, args, this.unifier);
                this.unify(retType, r);
                return r;
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