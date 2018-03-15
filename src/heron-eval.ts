import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, NumLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField } from "./heron-expr";
import { Statement } from "./heron-statement";

type Val = boolean | number | string | Union | Lambda; 
class Union { vals: Val[]; }
class Env { [name: string]: Val };

function union(...vals: Val[]): Union {
    return { vals };
}

class Evaluator 
{
    env = new Env();

    exec(statement: Statement): Statement {
        throw new Error('Not implemented yet');
    }

    bindVar(name: string, val: Val) {
        this.env = { ...this.env, name: val };
    }

    findVar(name: string): Val {        
        return this.env[name];
    }

    scopeEnv<T>(fun: () => T): T {
        let env = this.env;
        let r = fun();
        this.env = env;
        return r;
    }

    eval(expr: Expr): Val {
        if (expr instanceof VarName) {
            return this.findVar(expr.name);
        }
        else if (expr instanceof FunCall) {
            expr.func;
        }
        else if (expr instanceof ConditionalExpr) {
            return this.scopeEnv(() => {
                let cond = this.eval(expr.cond);
                let onTrue = this.eval(expr.onTrue);
                let onFalse = this.eval(expr.onFalse);
                if (cond === true) 
                    return onTrue;
                else if (cond === false) 
                    return onFalse;
                else 
                    return union(onTrue, onFalse);
            });
        }
        else if (expr instanceof ObjectLiteral || expr instanceof ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof ArrayLiteral) {
            return { vals:expr.vals.map(this.eval) };
        }
        else if (expr instanceof BoolLiteral) {
            return expr.value;
        }
        else if (expr instanceof NumLiteral) {
            return expr.value;
        }
        else if (expr instanceof StrLiteral) {
            return expr.value;
        }
        else if (expr instanceof VarExpr) {
            return this.scopeEnv(() => { 
                for (var v of expr.vars) 
                    this.bindVar(v.name, this.eval(v.expr));
                return this.eval(v.expr);
            });
        }
        else if (expr instanceof Lambda) {
            return expr;
        }
        else if (expr instanceof PostfixDec) {
            
        }
        else if  (expr instanceof PostfixInc) {
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
    }
}