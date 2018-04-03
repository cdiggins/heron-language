import { FuncDef, FuncParamDef } from "./heron-defs";
import { Type, normalizeType } from "./type-system";
import { Types } from "./heron-types";
import { CodeBuilder } from "./code-builder";
import { VarName, FunCall, ConditionalExpr, ObjectLiteral, ArrayLiteral, BoolLiteral, IntLiteral, FloatLiteral, StrLiteral, VarExpr, PostfixDec, Lambda, PostfixInc, Expr, ObjectField, VarAssignmentExpr } from "./heron-expr";
import { Statement, CompoundStatement, IfStatement, EmptyStatement, VarDeclStatement, WhileStatement, DoStatement, ForStatement, ExprStatement, ContinueStatement, ReturnStatement } from "./heron-statement";
import { SourceFile, Module } from "./heron-package";
import { identifierToString } from "./heron-ast-rewrite";

export function toJavaScript(x: Statement|Expr|FuncDef|Module): string {
    const toJs = new HeronToJs();
    toJs.visit(x);
    return toJs.cb.toString();
}

export function funcDefName(f: FuncDef) {
    return identifierToString(f.name) + '_' + f.node.id;
}

export function funcParamDefName(p: FuncParamDef) {
    return p.name;
}

// This class computes the type for a function
export class HeronToJs 
{    
    cb = new CodeBuilder();

    visit(x: Statement|Expr|FuncDef|Module) {
        if (x instanceof Statement)
            this.visitStatement(x);
        else if (x instanceof Expr)
            this.visitExpr(x);
        else if (x instanceof FuncDef)
            this.visitFuncDef(x);
        else 
            this.visitModule(x);
    }

    visitModule(m: Module) {
        this.cb.pushLine('// Module ' + m.name);
        this.cb.pushLine('// file ' + m.file.filePath);
        for (const i of m.imports)
            this.cb.pushLine('// imports ' + i);
        for (const f of m.functions)
            this.visit(f);
    }

    visitFuncDef(f: FuncDef) {        
        this.cb.pushLine('// ' +  normalizeType(f.type));
        this.cb.pushLine('function ' + funcDefName(f) + '(' + f.params.map(funcParamDefName).join(', ') + ')');
        if (!f.body) {
            this.cb.pushLine('{');
            this.cb.pushLine('// INTRINSIC');
            this.cb.pushLine('}');
        }
        else if (f.body.statement) 
        {
            this.visit(f.body.statement);
        }
        else if (f.body.expr) {
            this.cb.pushLine('{');
            this.cb.push('return ');
            this.visit(f.body.expr);
            this.cb.pushLine(';');
            this.cb.pushLine('}');
        }   
        else 
            throw new Error("No body statement or expression");
    }

    visitStatement(statement: Statement)
    {
        if (statement instanceof CompoundStatement) 
        {
            if (statement.statements.length === 0)
                this.cb.pushLine('{ }');
            else 
            {
                this.cb.pushLine('{');
                for (const st of statement.statements)
                    this.visit(st);
                this.cb.pushLine('}');
            }
        }
        else if (statement instanceof IfStatement) {
            this.cb.push('if (')
            this.visit(statement.condition);
            this.cb.pushLine(')');
            this.visit(statement.onTrue);
            this.cb.pushLine('else');
            this.visit(statement.onFalse);
        }
        else if (statement instanceof ReturnStatement) {
            this.cb.push('return ');
            if (statement.expr)
                this.visit(statement.expr);
            this.cb.pushLine(';');
        }
        else if (statement instanceof ContinueStatement) {
            this.cb.pushLine('continue;')
        }
        else if (statement instanceof ExprStatement) {
            this.visit(statement.expr);
            this.cb.pushLine(';')
        }
        else if (statement instanceof ForStatement) {
            this.cb.push('for (const ');
            this.cb.push(identifierToString(statement.identifier));
            this.cb.push(' of ');
            this.visit(statement.array);
            this.cb.pushLine(')');
            this.visit(statement.loop);
        }
        else if (statement instanceof DoStatement) {
            this.cb.pushLine('do');
            this.visit(statement.body);
            this.cb.push('while (');
            this.visit(statement.condition);
            this.cb.pushLine(')');
        }
        else if (statement instanceof WhileStatement) {
            this.cb.push('while (');
            this.visit(statement.condition);
            this.cb.pushLine(')');
            this.visit(statement.body);
        }
        else if (statement instanceof VarDeclStatement) {
            for (const vd of statement.vars) {
                // TODO: I want to know when I can use 'const' instead of 'let'
                this.cb.push('let ' + vd.name + ' = ');
                this.visit(vd.exprNode.expr);
                this.cb.pushLine(';');
            }
        }
        else if (statement instanceof EmptyStatement) {
            // Do nothing. 
        }
        else {
            throw new Error("Unrecognized statement " + statement);
        }
    }

    visitDelimited(xs: Expr[], delim = ',') {
        for (let i=0; i < xs.length; ++i) {
            if (i > 0) this.cb.push(delim);
            this.visit(xs[i])
        }
    }

    visitExpr(expr: Expr)
    {
        if (expr instanceof VarName) {
            this.cb.push(identifierToString(expr.name));
        }
        else if (expr instanceof FunCall) {
            // TODO: this will fail when used with a lambda in the calling position.
            const fd = expr.func.node.ref.defs[expr.functionIndex];
            if (fd instanceof FuncDef)
            {
                // If this is a known reference to a funcion
                this.cb.push(funcDefName(fd));
            }
            else 
            {
                // We just visit it like an ordinary function
                this.visit(expr.func);
            }
            this.cb.push('(');
            this.visitDelimited(expr.args);
            this.cb.push(')');
        }
        else if (expr instanceof ConditionalExpr) {
            this.visit(expr.condition);
            this.cb.push(' ? ');    
            this.visit(expr.onTrue);
            this.cb.push(' : ');
            this.visit(expr.onFalse);
        }
        else if (expr instanceof ObjectLiteral || expr instanceof ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof ArrayLiteral) {
            this.cb.push('[');
            this.visitDelimited(expr.vals);
            this.cb.push(']');
        }
        else if (expr instanceof BoolLiteral) {
            this.cb.push(expr.value ? "true" : "false");
        }
        else if (expr instanceof IntLiteral) {            
            this.cb.push(expr.value.toString());
        }
        else if (expr instanceof FloatLiteral) {            
            this.cb.push(expr.value.toString());
        }
        else if (expr instanceof StrLiteral) {
            // TODO: escape the special charaters in value
            this.cb.push('"' + expr.value + '"');
        }
        else if (expr instanceof VarExpr) {
            // TODO: ((varName) => ...)(value)
            // TODO: the expr really should only have one var. 
            // I need to do rewriting during the analysis, to create one around each one. 
            // OR: I just treat it as a lambda and a call. Which might simplify other things. 
            // BUT: it would require the constant handling is properly handled. 
            throw new Error("Not implemented yet");
        }
        else if (expr instanceof Lambda) {
            this.cb.push('(')
            this.cb.push(expr.params.map(p => p.name).join(', '));
            this.cb.push(') => ')
            if (expr.bodyNode.expr) 
                this.visit(expr.bodyNode.expr);
            else    
                this.visit(expr.bodyNode.statement);
        }
        else if (expr instanceof PostfixDec) {
            this.visit(expr.lvalue);
            this.cb.push('--');
        }
        else if (expr instanceof PostfixInc) {
            this.visit(expr.lvalue);
            this.cb.push('++');
        }
        else if (expr instanceof VarAssignmentExpr) {
            this.cb.push(expr.name + ' = ');
            this.visit(expr.value);
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
    }    
}