"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var heron_expr_1 = require("./heron-expr");
var Union = /** @class */ (function () {
    function Union() {
    }
    return Union;
}());
var Env = /** @class */ (function () {
    function Env() {
    }
    return Env;
}());
;
function union() {
    var vals = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vals[_i] = arguments[_i];
    }
    return { vals: vals };
}
var Evaluator = /** @class */ (function () {
    function Evaluator() {
        this.env = new Env();
    }
    Evaluator.prototype.exec = function (statement) {
        throw new Error('Not implemented yet');
    };
    Evaluator.prototype.bindVar = function (name, val) {
        this.env = __assign({}, this.env, { name: val });
    };
    Evaluator.prototype.findVar = function (name) {
        return this.env[name];
    };
    Evaluator.prototype.scopeEnv = function (fun) {
        var env = this.env;
        var r = fun();
        this.env = env;
        return r;
    };
    Evaluator.prototype.eval = function (expr) {
        var _this = this;
        if (expr instanceof heron_expr_1.VarName) {
            return this.findVar(expr.name);
        }
        else if (expr instanceof heron_expr_1.FunCall) {
            expr.func;
        }
        else if (expr instanceof heron_expr_1.ConditionalExpr) {
            return this.scopeEnv(function () {
                var cond = _this.eval(expr.cond);
                var onTrue = _this.eval(expr.onTrue);
                var onFalse = _this.eval(expr.onFalse);
                if (cond === true)
                    return onTrue;
                else if (cond === false)
                    return onFalse;
                else
                    return union(onTrue, onFalse);
            });
        }
        else if (expr instanceof heron_expr_1.ObjectLiteral || expr instanceof heron_expr_1.ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof heron_expr_1.ArrayLiteral) {
            return { vals: expr.vals.map(this.eval) };
        }
        else if (expr instanceof heron_expr_1.BoolLiteral) {
            return expr.value;
        }
        else if (expr instanceof heron_expr_1.NumLiteral) {
            return expr.value;
        }
        else if (expr instanceof heron_expr_1.StrLiteral) {
            return expr.value;
        }
        else if (expr instanceof heron_expr_1.VarExpr) {
            return this.scopeEnv(function () {
                for (var _i = 0, _a = expr.vars; _i < _a.length; _i++) {
                    var v = _a[_i];
                    _this.bindVar(v.name, _this.eval(v.expr));
                }
                return _this.eval(v.expr);
            });
        }
        else if (expr instanceof heron_expr_1.Lambda) {
            return expr;
        }
        else if (expr instanceof heron_expr_1.PostfixDec) {
        }
        else if (expr instanceof heron_expr_1.PostfixInc) {
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
    };
    return Evaluator;
}());
//# sourceMappingURL=heron-eval.js.map