"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var heron_expr_1 = require("./heron-expr");
var heron_statement_1 = require("./heron-statement");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_refs_1 = require("./heron-refs");
var type_system_1 = require("./type-system");
var heron_types_1 = require("./heron-types");
// Question:
// Where is the value defined? 
// Where is the value used? 
// Is the value used in an array? 
// Is the value passed to the set(ab: ArrayBuilder, x, i) function?
// Is the value used in a closure? 
// Do we know that the value is only one of a set of values? 
// Do we know if the value has a lower-bound?
// Do we know if the value has an upper-bound?
var AbstractValue = /** @class */ (function () {
    function AbstractValue(value, type) {
        this.value = value;
        this.type = type;
    }
    AbstractValue.prototype.equals = function (x) {
        return this.value === x;
    };
    return AbstractValue;
}());
exports.AbstractValue = AbstractValue;
var AbstractFuncValue = /** @class */ (function (_super) {
    __extends(AbstractFuncValue, _super);
    function AbstractFuncValue(funcs) {
        var _this = _super.call(this, funcs, heron_types_1.makeFunctionSet(funcs.map(function (f) { return f.type; }))) || this;
        _this.funcs = funcs;
        return _this;
    }
    return AbstractFuncValue;
}(AbstractValue));
exports.AbstractFuncValue = AbstractFuncValue;
var AbstractBool = /** @class */ (function (_super) {
    __extends(AbstractBool, _super);
    function AbstractBool(value) {
        var _this = _super.call(this, value, heron_types_1.Types.BoolType) || this;
        _this.value = value;
        return _this;
    }
    return AbstractBool;
}(AbstractValue));
exports.AbstractBool = AbstractBool;
var AbstractInt = /** @class */ (function (_super) {
    __extends(AbstractInt, _super);
    function AbstractInt(value) {
        var _this = _super.call(this, value, heron_types_1.Types.IntType) || this;
        _this.value = value;
        return _this;
    }
    return AbstractInt;
}(AbstractValue));
exports.AbstractInt = AbstractInt;
var AbstractFloat = /** @class */ (function (_super) {
    __extends(AbstractFloat, _super);
    function AbstractFloat(value) {
        var _this = _super.call(this, value, heron_types_1.Types.FloatType) || this;
        _this.value = value;
        return _this;
    }
    return AbstractFloat;
}(AbstractValue));
exports.AbstractFloat = AbstractFloat;
var AbstractString = /** @class */ (function (_super) {
    __extends(AbstractString, _super);
    function AbstractString(value) {
        var _this = _super.call(this, value, heron_types_1.Types.StrType) || this;
        _this.value = value;
        return _this;
    }
    return AbstractString;
}(AbstractValue));
exports.AbstractString = AbstractString;
var AbstractArray = /** @class */ (function (_super) {
    __extends(AbstractArray, _super);
    function AbstractArray(value) {
        var _this = _super.call(this, value, heron_types_1.Types.ArrayType) || this;
        _this.value = value;
        return _this;
    }
    return AbstractArray;
}(AbstractValue));
exports.AbstractArray = AbstractArray;
var AbstractOptions = /** @class */ (function (_super) {
    __extends(AbstractOptions, _super);
    function AbstractOptions(values) {
        var _this = _super.call(this, values, values[0].type) || this;
        _this.values = values;
        // TODO: this should allow different types 
        if (!(values.every(function (v) { return type_system_1.compareTypes(v.type, _this.type); })))
            throw new Error("Values have a different type");
        return _this;
    }
    return AbstractOptions;
}(AbstractValue));
exports.AbstractOptions = AbstractOptions;
var AbstractFunction = /** @class */ (function (_super) {
    __extends(AbstractFunction, _super);
    function AbstractFunction(defs) {
        var _this = _super.call(this, _this.defs) || this;
        _this.defs = defs;
        return _this;
    }
    return AbstractFunction;
}(AbstractValue));
exports.AbstractFunction = AbstractFunction;
function negate(val) {
}
exports.negate = negate;
function range(val) {
}
exports.range = range;
function conditionalValue(cond, onTrue, onFalse) {
}
exports.conditionalValue = conditionalValue;
// This class computes the type for a function
var AbstractEvaluator = /** @class */ (function () {
    function AbstractEvaluator() {
        this.scopes = [];
    }
    AbstractEvaluator.prototype.setValue = function (symbol, val) {
    };
    AbstractEvaluator.prototype.execute = function (statement) {
        if (statement instanceof heron_statement_1.CompoundStatement) {
            for (var _i = 0, _a = statement.statements; _i < _a.length; _i++) {
                var st = _a[_i];
                this.execute(st);
            }
        }
        else if (statement instanceof heron_statement_1.IfStatement) {
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
        else if (statement instanceof heron_statement_1.ReturnStatement) {
            if (statement.condition)
                this.setValue("$return", this.eval(statement.condition));
        }
        else if (statement instanceof heron_statement_1.ContinueStatement) {
            // Do nothing 
        }
        else if (statement instanceof heron_statement_1.ExprStatement) {
            this.eval(statement.expr);
        }
        else if (statement instanceof heron_statement_1.ForStatement) {
            var forLoopVar = statement.node.def;
            this.setValue(forLoopVar.name, range(this.eval(statement.array)));
            // TODO: this is incorrect
            this.loop = range(this.eval(statement.array));
            this.execute(statement.loop);
            this.loop = null;
        }
        else if (statement instanceof heron_statement_1.DoStatement) {
            this.loop = this.eval(statement.condition);
            this.execute(statement.body);
            this.loop = null;
        }
        else if (statement instanceof heron_statement_1.WhileStatement) {
            this.loop = this.eval(statement.condition);
            this.execute(statement.body);
            this.loop = null;
        }
        else if (statement instanceof heron_statement_1.VarDeclStatement) {
            for (var _b = 0, _c = statement.vars; _b < _c.length; _b++) {
                var vd = _c[_b];
                this.setValue(vd.name, this.eval(vd.exprNode.expr));
            }
        }
        else if (statement instanceof heron_statement_1.EmptyStatement) {
            // Do nothing. 
        }
        else {
            throw new Error("Unrecognized statement " + statement);
        }
    };
    AbstractEvaluator.prototype.eval = function (expr) {
        var _this = this;
        if (expr instanceof heron_expr_1.VarName) {
            if (!expr.node.ref)
                heron_ast_rewrite_1.throwError(expr.node, "Missing ref");
            var ref = expr.node.ref;
            if (ref instanceof heron_refs_1.FuncRef) {
                return new AbstractFunctionSet(ref.defs);
            }
            else if (ref instanceof heron_refs_1.VarRef) {
                return heron_types_1.assure(ref.def.type);
            }
            else if (ref instanceof heron_refs_1.FuncParamRef) {
                return heron_types_1.assure(ref.def.type);
            }
            else if (ref instanceof heron_refs_1.ForLoopVarRef) {
                return heron_types_1.assure(ref.def.type);
            }
            else if (ref instanceof heron_refs_1.TypeRef || ref instanceof heron_refs_1.TypeParamRef) {
                // TODO: eventually we might want to support 
                heron_ast_rewrite_1.throwError(expr.node, "Type names are not allowed in expressions: " + expr.name);
            }
            // TODO: the reference could be to something else
            //return this.findVar(expr.name);
            throw new Error("Unrecoggnized expression");
        }
        else if (expr instanceof heron_expr_1.FunCall) {
            var func = this.getType(expr.func);
            var args = expr.args.map(function (a) { return _this.getType(a); });
            if (func instanceof type_system_1.PolyType) {
                if (heron_types_1.isFunctionSet(func)) {
                    console.log("Function: " + expr.func);
                    return heron_types_1.callFunctionSet(func, args, this.unifier);
                }
                else if (heron_types_1.isFunctionType(func))
                    // We have to create new Type variable names when calling a
                    return heron_types_1.callFunction(func, args, this.unifier);
                else
                    throw new Error("Can't call " + func);
            }
            else if (func instanceof type_system_1.TypeVariable) {
                var genFunc = heron_types_1.genericFuncTypeFromArgs(args);
                this.unify(func, genFunc);
                var retType = heron_types_1.getReturnType(genFunc);
                var r = heron_types_1.callFunction(genFunc, args, this.unifier);
                this.unify(retType, r);
                return r;
            }
            else {
                throw new Error("Can't call " + func);
            }
        }
        else if (expr instanceof heron_expr_1.ConditionalExpr) {
            var condition = this.eval(expr.condition);
            var onTrue = this.eval(expr.onTrue);
            var onFalse = this.eval(expr.onFalse);
            return conditionalValue(condition, onTrue, onFalse);
        }
        else if (expr instanceof heron_expr_1.ObjectLiteral || expr instanceof heron_expr_1.ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof heron_expr_1.ArrayLiteral) {
            return arrayValue(expr.vals);
        }
        else if (expr instanceof heron_expr_1.BoolLiteral) {
            return heron_types_1.Types.BoolType;
        }
        else if (expr instanceof heron_expr_1.IntLiteral) {
            return heron_types_1.Types.IntType;
        }
        else if (expr instanceof heron_expr_1.FloatLiteral) {
            return heron_types_1.Types.FloatType;
        }
        else if (expr instanceof heron_expr_1.StrLiteral) {
            return heron_types_1.Types.StrType;
        }
        else if (expr instanceof heron_expr_1.VarExpr) {
            for (var _i = 0, _a = expr.vars; _i < _a.length; _i++) {
                var v = _a[_i];
                var varExpr = v.exprNode.expr;
                if (!varExpr)
                    heron_ast_rewrite_1.throwError(v.exprNode, "No expression associated with variable: " + v.name);
            }
            var r = this.getType(expr.expr);
            return r;
        }
        else if (expr instanceof heron_expr_1.Lambda) {
            return lambdaValue(this.eval(expr));
        }
        else if (expr instanceof heron_expr_1.PostfixDec) {
            return decValue(this.eval(expr));
        }
        else if (expr instanceof heron_expr_1.PostfixInc) {
            return incValue(this.eval(expr));
        }
        else if (expr instanceof heron_expr_1.VarAssignmentExpr) {
            var ref = expr.node.children[0].ref;
            if (!ref)
                heron_ast_rewrite_1.throwError(expr.node, "Variable assignment is missing reference");
            if (ref.defs.length > 1)
                heron_ast_rewrite_1.throwError(expr.node, "Multiple defs found");
            if (ref.defs.length < 1)
                heron_ast_rewrite_1.throwError(expr.node, "No defs found");
            var def = ref.defs[0];
            return this.unify(def.type, expr.value);
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
    };
    return AbstractEvaluator;
}());
exports.AbstractEvaluator = AbstractEvaluator;
//# sourceMappingURL=heron-abstract-eval.js.map