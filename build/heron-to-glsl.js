"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_defs_1 = require("./heron-defs");
var code_builder_1 = require("./code-builder");
var heron_expr_1 = require("./heron-expr");
var heron_statement_1 = require("./heron-statement");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_refs_1 = require("./heron-refs");
var heron_types_1 = require("./heron-types");
var heron_to_html_1 = require("./heron-to-html");
// https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)
// https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)
// http://www.shaderific.com/glsl-statements
var id = 0;
function toGlsl(x) {
    var toGlsl = new HeronToGlsl();
    toGlsl.visit(x);
    return toGlsl.cb.toString();
}
exports.toGlsl = toGlsl;
function funcDefName(f) {
    return heron_ast_rewrite_1.identifierToString(f.name) + '_' + f.node.id;
}
exports.funcDefName = funcDefName;
function funcParamString(p) {
    return toTypeString(p.type) + " " + p.name;
}
function toTypeString(t) {
    switch (t.toString()) {
        case "":
        default:
            return "???";
    }
}
// This class computes the type for a function
var HeronToGlsl = /** @class */ (function () {
    function HeronToGlsl() {
        this.cb = new code_builder_1.CodeBuilder();
    }
    HeronToGlsl.prototype.visit = function (x) {
        if (x instanceof heron_statement_1.Statement)
            this.visitStatement(x);
        else if (x instanceof heron_expr_1.Expr)
            this.visitExpr(x);
        else if (x instanceof heron_defs_1.FuncDef)
            this.visitFuncDef(x);
        else if (x instanceof heron_defs_1.VarDef)
            this.visitVarDef(x);
        else
            this.visitModule(x);
    };
    HeronToGlsl.prototype.visitModule = function (m) {
        this.cb.pushLine('// Module ' + m.name);
        this.cb.pushLine('// file ' + m.file.filePath);
        for (var _i = 0, _a = m.imports; _i < _a.length; _i++) {
            var i = _a[_i];
            this.cb.pushLine('// imports ' + i);
        }
        for (var _b = 0, _c = m.vars; _b < _c.length; _b++) {
            var v = _c[_b];
            this.visit(v);
        }
        for (var _d = 0, _e = m.functions; _d < _e.length; _d++) {
            var f = _e[_d];
            this.visit(f);
        }
    };
    HeronToGlsl.prototype.functionSig = function (f) {
        var ret = toTypeString(heron_types_1.getFuncReturnType(f.type));
        return ret + ' ' + funcDefName(f) + '(' + f.params.map(funcParamString).join(', ') + ')';
    };
    HeronToGlsl.prototype.visitVarDef = function (v) {
        this.cb.push(toTypeString(v.type) + " " + v.name + ' = ');
        this.visit(v.exprNode.expr);
        this.cb.pushLine(';');
    };
    HeronToGlsl.prototype.intrinsicName = function (f) {
        var name = heron_ast_rewrite_1.identifierToString(f.name);
        /*
        for (const p of f.params) {
            name += '_' + p.type.toString();
        }
        */
        return name;
    };
    HeronToGlsl.prototype.visitFuncDef = function (f) {
        if (f.isIntrinsic)
            return;
        this.cb.pushLine(this.functionSig(f));
        if (f.body.statement) {
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
    };
    HeronToGlsl.prototype.visitStatement = function (statement) {
        if (statement instanceof heron_statement_1.CompoundStatement) {
            if (statement.statements.length === 0)
                this.cb.pushLine('{ }');
            else {
                this.cb.pushLine('{');
                for (var _i = 0, _a = statement.statements; _i < _a.length; _i++) {
                    var st = _a[_i];
                    this.visit(st);
                }
                this.cb.pushLine('}');
            }
        }
        else if (statement instanceof heron_statement_1.IfStatement) {
            this.cb.push('if (');
            this.visit(statement.condition);
            this.cb.pushLine(')');
            this.visit(statement.onTrue);
            this.cb.pushLine('else');
            this.visit(statement.onFalse);
        }
        else if (statement instanceof heron_statement_1.ReturnStatement) {
            this.cb.push('return ');
            if (statement.expr)
                this.visit(statement.expr);
            this.cb.pushLine(';');
        }
        else if (statement instanceof heron_statement_1.ContinueStatement) {
            this.cb.pushLine('continue;');
        }
        else if (statement instanceof heron_statement_1.ExprStatement) {
            this.visit(statement.expr);
            this.cb.pushLine(';');
        }
        else if (statement instanceof heron_statement_1.ForStatement) {
            var i = "i" + id++;
            var t = toTypeString(statement.type);
            var e = statement.identifier;
            var n = "n" + id++;
            this.cb.push(n + " = ");
            this.visit(statement.array);
            this.cb.pushLine(".length;");
            this.cb.push("for (int " + i + "=0; " + i + " < " + n + "; ++" + i + ")");
            this.cb.pushLine('{');
            this.cb.push(t + " " + e + " = ");
            this.visit(statement.array);
            this.cb.pushLine("[" + i + "];");
            this.visit(statement.loop);
            this.cb.pushLine('}');
        }
        else if (statement instanceof heron_statement_1.DoStatement) {
            this.cb.pushLine('do');
            this.visit(statement.body);
            this.cb.push('while (');
            this.visit(statement.condition);
            this.cb.pushLine(')');
        }
        else if (statement instanceof heron_statement_1.WhileStatement) {
            this.cb.push('while (');
            this.visit(statement.condition);
            this.cb.pushLine(')');
            this.visit(statement.body);
        }
        else if (statement instanceof heron_statement_1.VarDeclStatement) {
            for (var _b = 0, _c = statement.vars; _b < _c.length; _b++) {
                var vd = _c[_b];
                var t = heron_to_html_1.toHeronTypeString(vd.type);
                this.cb.push(t + ' ' + vd.name + ' = ');
                this.visit(vd.exprNode.expr);
                this.cb.pushLine(';');
            }
        }
        else if (statement instanceof heron_statement_1.EmptyStatement) {
            // Do nothing. 
        }
        else {
            throw new Error("Unrecognized statement " + statement);
        }
    };
    HeronToGlsl.prototype.visitDelimited = function (xs, delim) {
        if (delim === void 0) { delim = ','; }
        for (var i = 0; i < xs.length; ++i) {
            if (i > 0)
                this.cb.push(delim);
            this.visit(xs[i]);
        }
    };
    HeronToGlsl.prototype.visitExpr = function (expr, noType) {
        if (noType === void 0) { noType = false; }
        if (expr instanceof heron_expr_1.VarName) {
            if (expr.node.ref instanceof heron_refs_1.FuncRef) {
                if (expr.node.ref.defs.length === 1) {
                    this.cb.push(funcDefName(expr.node.ref.defs[0]));
                }
                else {
                    // TODO: if I could find a better way to compute this, so it was nearly impossible to screw up,
                    // that would be great.
                    if (expr.functionIndex === -1) {
                        throw new Error("No function index was computed for expression: " + expr);
                    }
                    else {
                        this.cb.push(funcDefName(expr.node.ref.defs[expr.functionIndex]));
                    }
                }
            }
            else {
                this.cb.push(heron_ast_rewrite_1.identifierToString(expr.name));
            }
        }
        else if (expr instanceof heron_expr_1.FunCall) {
            // TODO: this will fail when used with a lambda in the calling position.
            var fd = expr.func.node.ref.defs[expr.functionIndex];
            if (fd instanceof heron_defs_1.FuncDef) {
                // If this is a known reference to a funcion
                this.cb.push(funcDefName(fd));
            }
            else {
                // We just visit it like an ordinary function
                this.visit(expr.func);
            }
            this.cb.push('(');
            this.visitDelimited(expr.args);
            this.cb.push(')');
        }
        else if (expr instanceof heron_expr_1.ConditionalExpr) {
            this.visit(expr.condition);
            this.cb.push(' ? ');
            this.visit(expr.onTrue);
            this.cb.push(' : ');
            this.visit(expr.onFalse);
        }
        else if (expr instanceof heron_expr_1.ObjectLiteral || expr instanceof heron_expr_1.ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof heron_expr_1.ArrayLiteral) {
            this.cb.push('[');
            this.visitDelimited(expr.vals);
            this.cb.push(']');
        }
        else if (expr instanceof heron_expr_1.BoolLiteral) {
            this.cb.push(expr.value ? "true" : "false");
        }
        else if (expr instanceof heron_expr_1.IntLiteral) {
            this.cb.push(expr.value.toString());
        }
        else if (expr instanceof heron_expr_1.FloatLiteral) {
            this.cb.push(expr.value.toString());
        }
        else if (expr instanceof heron_expr_1.StrLiteral) {
            // TODO: escape the special charaters in value
            this.cb.push('"' + expr.value + '"');
        }
        else if (expr instanceof heron_expr_1.VarExpr) {
            var vars = expr.vars.slice();
            for (var i = 0; i < vars.length; ++i) {
                var vd = vars[i];
                this.cb.push('((');
                this.cb.push(vd.name);
                this.cb.push(') => ');
            }
            this.visit(expr.expr);
            for (var i = vars.length - 1; i >= 0; --i) {
                var vd = vars[i];
                this.cb.push(')(');
                this.visit(vd.exprNode.expr);
                this.cb.push(')');
            }
            this.cb.pushLine();
        }
        else if (expr instanceof heron_expr_1.Lambda) {
            this.cb.push('(');
            this.cb.push(expr.params.map(function (p) { return p.name; }).join(', '));
            this.cb.push(') => ');
            if (expr.bodyNode.expr)
                this.visit(expr.bodyNode.expr);
            else
                this.visit(expr.bodyNode.statement);
        }
        else if (expr instanceof heron_expr_1.PostfixDec) {
            this.visitExpr(expr.lvalue, true);
            this.cb.push('--');
        }
        else if (expr instanceof heron_expr_1.PostfixInc) {
            this.visitExpr(expr.lvalue, true);
            this.cb.push('++');
        }
        else if (expr instanceof heron_expr_1.VarAssignmentExpr) {
            this.cb.push(expr.name + ' = ');
            this.visit(expr.value);
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
        if (expr.type && !noType) {
            this.cb.pushLine(' // ' + expr.type);
        }
    };
    return HeronToGlsl;
}());
exports.HeronToGlsl = HeronToGlsl;
//# sourceMappingURL=heron-to-glsl.js.map