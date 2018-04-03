import { FuncDef } from "./heron-defs";
import { Type } from "./type-system";
import { Types } from "./heron-types";

// Question:
// Where is the value defined? 
// Where is the value used? 
// Is the value used in an array? 
// Is the value passed to the set(ab: ArrayBuilder, x, i) function?
// Is the value used in a closure? 
// Do we know that the value is only one of a set of values? 
// Do we know if the value has a lower-bound?
// Do we know if the value has an upper-bound?

export class AbstractValue {
    constructor(
        public readonly value: any,
        public readonly type: Type)
    { }

    equals(x: any): boolean {
        return this.value === x;
    }
}

export class AbstractFunction extends AbstractValue {
    constructor(
        public readonly func: FuncDef)
    { 
        super(func, func.type);
    }        
}

export class AbstractBool extends AbstractValue {
    constructor(public readonly value: boolean) { super(value, Types.BoolType); }
}

export class AbstractInt extends AbstractValue {
    constructor(public readonly value: number) { super(value, Types.IntType); }
}

export class AbstractFloat extends AbstractValue {
    constructor(public readonly value: boolean) { super(value, Types.FloatType); }
}

export class AbstractString extends AbstractValue {
    constructor(public readonly value: boolean) { super(value, Types.StrType); }
}

export class AbstractArray extends AbstractValue {
    constructor(public readonly value: any[]) { super(value, Types.ArrayType); }
}

export class AbstractOptions extends AbstractValue {
    constructor(
        public readonly values: AbstractValue[]
    )
    { 
        super(values, values[0].type);         
    }    
}

// This class computes the type for a function
export class AbstractEvaluator 
{    

    setValue(symbol: string, val: AbstractValue) {
    }

    execute(statement: Statement)
    {
        if (statement instanceof CompoundStatement) 
        {
            for (const st of statement.statements)
                this.execute(st);
        }
        else if (statement instanceof IfStatement) {
            this.condition = this.eval(statement.condition);
            if (this.condition.equals(true)) {
                this.execute(statement.onTrue);
            }
            else if (this.condition.equals(false)) {
                this.execute(statement.onTrue);
            }
            this.execute(statement.onFalse);
            this.condition = null;
        }
        else if (statement instanceof ReturnStatement) {
            if (statement.condition)
                this.setValue("$return", this.eval(statement.condition));
        }
        else if (statement instanceof ContinueStatement) {
            // Do nothing 
        }
        else if (statement instanceof ExprStatement) {
            this.eval(statement.expr);
        }
        else if (statement instanceof ForStatement) {
            const forLoopVar = statement.node.def;
            this.setValue(forLoopVar.name, range(this.eval(statement.array)));
            // TODO: this is incorrect
            this.loop = range(this.eval(statement.array));
            this.execute(statement.loop);
            this.loop = null;
        }
        else if (statement instanceof DoStatement) {
            this.loop = this.eval(statement.condition);
            this.execute(statement.body);
            this.loop = null;
        }
        else if (statement instanceof WhileStatement) {
            this.loop = this.eval(statement.condition);
            this.execute(statement.body);
            this.loop = null;
        }
        else if (statement instanceof VarDeclStatement) {
            for (const vd of statement.vars) 
                this.setValue(vd.name, this.eval(vd.exprNode.expr));
        }
        else if (statement instanceof EmptyStatement) {
            // Do nothing. 
        }
        else {
            throw new Error("Unrecognized statement " + statement);
        }
    }

    eval(expr: Expr): AbstractValue
    {
        if (expr instanceof VarName) {
            if (!expr.node.ref) 
                throwError(expr.node, "Missing ref");
                
            const ref = expr.node.ref;
            if (ref instanceof FuncRef) {
                return new AbstractFunctionSet(ref.defs);
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
            const condition = this.eval(expr.condition);
            const onTrue = this.eval(expr.onTrue);
            const onFalse = this.eval(expr.onFalse);
            return conditionalValue(condition, onTrue, onFalse);
        }
        else if (expr instanceof ObjectLiteral || expr instanceof ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof ArrayLiteral) {
            return arrayValue(expr.vals);
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
            return lambdaValue(this.eval(expr));
        }
        else if (expr instanceof PostfixDec) {
            return decValue(this.eval(expr));
        }
        else if (expr instanceof PostfixInc) {
            return incValue(this.eval(expr));
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
}