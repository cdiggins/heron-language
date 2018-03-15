import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, NumLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField } from "./heron-expr";
import { Statement } from "./heron-statement";
import { throwError } from "./heron-ast-rewrite";

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

    bindVar(name: string, val: Val): Val {
        this.env = { ...this.env, name: val };
        return val;
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
            // TODO: there could be multiple variables with this name. 
            // We should have a 'ref' and multiple 'defs'. If there 
            // is ambiguity we are going to have to return the whole set. 
            return this.findVar(expr.name);
        }
        else if (expr instanceof FunCall) {
            // TODO: just like VarName this could resolve to a bunch of possibilities. 
            // We need to chooose the one that works. There are a few possibilities. 
            // Now in the case of functions: just argument counts is not a good idea.
            // really we should look at the arg types. 
            let func = this.eval(expr.func);
            let args = expr.args.map(this.eval);

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
                for (let v of expr.vars) {
                    let varExpr = v.exprNode.expr;
                    if (!varExpr)
                        throwError(v.exprNode, "No expression associated with variable: " + v.name);
                    this.bindVar(v.name, this.eval(varExpr));
                }
                return this.eval(expr.expr);
            });
        }
        else if (expr instanceof Lambda) {
            return expr;
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
        let r = this.eval(expr);
        if (expr instanceof VarName) {
            this.bindVar(expr.name, f(r));
        }
        else {
            throw new Error("Cannot apply postfix expression to: " + expr);
        }
        return r;
    }
}

