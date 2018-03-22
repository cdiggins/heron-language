"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_expr_1 = require("./heron-expr");
var heron_statement_1 = require("./heron-statement");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var type_system_1 = require("./type-system");
var heron_refs_1 = require("./heron-refs");
var Types;
(function (Types) {
    // A simplistic type-system for now. 
    // The goal is to distinguish between functions with the same name.
    Types.AnyType = type_system_1.typeConstant('Any');
    Types.ArrayType = type_system_1.typeConstant('Array');
    Types.ObjectType = type_system_1.typeConstant('Object');
    Types.NumType = type_system_1.typeConstant('Num');
    Types.BoolType = type_system_1.typeConstant('Bool');
    Types.StrType = type_system_1.typeConstant('Str');
    Types.LambdaType = type_system_1.typeConstant('Lambda');
    Types.VoidType = type_system_1.typeConstant('Void');
    Types.NeverType = type_system_1.typeConstant('Never');
    Types.TypeType = type_system_1.typeConstant('Type');
    Types.FuncType = type_system_1.typeConstant('Func');
    function getType(node) {
        if (!node)
            return Types.AnyType;
        heron_ast_rewrite_1.validateNode(node, "typeExpr", "typeName");
        return type_system_1.typeConstant(node.allText);
    }
    Types.getType = getType;
})(Types = exports.Types || (exports.Types = {}));
// A val is a single value. It might not be none.  
var Val = /** @class */ (function () {
    function Val(value, type) {
        this.value = value;
        this.type = type;
    }
    return Val;
}());
var FuncSet = /** @class */ (function () {
    function FuncSet(defs) {
        this.defs = defs;
    }
    return FuncSet;
}());
function union() {
    var vals = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vals[_i] = arguments[_i];
    }
    var value = vals[0].value;
    var type = vals[0].type;
    for (var i = 1; vals.length; ++i) {
        if (value !== vals[i].value)
            value = null;
        if (type.toString() !== vals[i].toString())
            type = Types.AnyType;
    }
    return new Val(value, type);
}
exports.union = union;
var valNever = new Val(null, Types.NeverType);
var valVoid = new Val(null, Types.VoidType);
var valAny = new Val(null, Types.AnyType);
function valNumber(x) { return new Val(x, Types.NumType); }
function valString(x) { return new Val(x, Types.StrType); }
function valBoolean(x) { return new Val(x, Types.BoolType); }
function valFunc(x) { return new Val(x, Types.FuncType); }
function valLambda(x) { return new Val(x, Types.LambdaType); }
function valArray(x) { return new Val(x, Types.ArrayType); }
/**
 * Contains the bindings for the current scope.
 */
var Env = /** @class */ (function () {
    function Env() {
        this.bindings = {};
        this.children = [];
    }
    return Env;
}());
exports.Env = Env;
;
/**
 * This is an abstract (symbolic) evaluator. It is used to determined types,
 * and various other properties of expressions.
 */
var Evaluator = /** @class */ (function () {
    function Evaluator() {
        this.env = new Env();
    }
    Evaluator.prototype.pushEnv = function () {
        var s = new Env();
        s.parent = this.env;
        s.parent.children.push(s);
        this.env = s;
    };
    Evaluator.prototype.popEnv = function () {
        this.env = this.env.parent;
        if (!this.env)
            throw new Error("Unmatched scopes");
    };
    Evaluator.prototype.evalStatement = function (statement) {
        if (statement instanceof heron_statement_1.CompoundStatement) {
            this.pushEnv();
            for (var _i = 0, _a = statement.statements; _i < _a.length; _i++) {
                var st = _a[_i];
                this.evalStatement(st);
            }
            this.popEnv();
        }
        else if (statement instanceof heron_statement_1.IfStatement) {
            this.pushEnv();
            this.evalExpr(statement.condition);
            this.evalStatement(statement.onTrue);
            this.evalStatement(statement.onFalse);
            this.popEnv();
        }
        else if (statement instanceof heron_statement_1.ReturnStatement) {
            this.bindVar(statement.node, '$result', this.evalExpr(statement.condition));
        }
        else if (statement instanceof heron_statement_1.ContinueStatement) {
            // Do nothing 
        }
        else if (statement instanceof heron_statement_1.ExprStatement) {
            this.evalExpr(statement.expr);
        }
        else if (statement instanceof heron_statement_1.ForStatement) {
            this.pushEnv();
            this.bindVar(statement.node, statement.identifier, valAny);
            this.evalExpr(statement.array);
            this.popEnv();
        }
        else if (statement instanceof heron_statement_1.DoStatement) {
            this.pushEnv();
            this.evalStatement(statement.body);
            this.evalExpr(statement.condition);
            this.popEnv();
        }
        else if (statement instanceof heron_statement_1.WhileStatement) {
            this.pushEnv();
            this.evalExpr(statement.condition);
            this.evalStatement(statement.body);
            this.popEnv();
        }
        else if (statement instanceof heron_statement_1.VarDeclStatement) {
            for (var _b = 0, _c = statement.vars; _b < _c.length; _b++) {
                var vd = _c[_b];
                if (!vd.exprNode.expr)
                    throw new Error("Missing an expression node.");
                var val = this.evalExpr(vd.exprNode.expr);
                this.bindVar(statement.node, vd.name, val);
            }
        }
        else if (statement instanceof heron_statement_1.EmptyStatement) {
            // Do nothing. 
        }
        else {
            throw new Error("Unrecognized statement " + statement);
        }
    };
    Evaluator.prototype.bindVar = function (node, name, val) {
        val.prev = this.env.bindings[name];
        val.node = node;
        this.env.bindings[name] = val;
        return val;
    };
    Evaluator.prototype.findVar = function (name) {
        for (var scope = this.env; scope != null; scope = scope.parent) {
            if (name in scope.bindings)
                return scope.bindings[name];
        }
        throw new Error("Could not find var " + name);
    };
    Evaluator.prototype.canPassType = function (arg, typeNode) {
        if (typeNode === null)
            return true;
        var srcType = arg.type;
        var destType = Types.getType(typeNode);
        var srcTypeStr = srcType.toString();
        var destTypeStr = destType.toString();
        if (srcTypeStr === destTypeStr)
            return true;
        if (destTypeStr == 'Any')
            return true;
        var casts = {
            Float: ['Int', 'Bool'],
            Float2: ['Float', 'Int', 'Bool'],
            Float3: ['Float', 'Float2', 'Int', 'Bool'],
            Float4: ['Float', 'Float2', 'Float3', 'Int', 'Bool'],
        };
        // NOTE: this is not the best way to do casts. 
        if (destTypeStr in casts) {
            if (casts[destTypeStr].indexOf(srcTypeStr))
                return true;
        }
        // TODOO: throw new Erro
    };
    Evaluator.prototype.evalFunc = function (f, args) {
        if (args === void 0) { args = []; }
        // Check the number of the parameters. 
        if (f.params.length !== args.length)
            return null;
        for (var i = 0; i < args.length; ++i)
            if (!this.canPassType(args[i], f.params[i].typeNode))
                return null;
        this.pushEnv();
        for (var _i = 0, _a = f.params; _i < _a.length; _i++) {
            var p = _a[_i];
            this.bindVar(p.node, p.name, args[0]);
        }
        var r = valVoid;
        if (!f.body) {
            // intrinsic
            var rt = f.retTypeNode;
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
    };
    Evaluator.prototype.evalLambda = function (f, args) {
        // Check the number of the parameters. 
        if (f.params.length !== args.length)
            return null;
        for (var i = 0; i < args.length; ++i)
            if (!this.canPassType(args[i], f.params[i].typeNode))
                return null;
        this.pushEnv();
        for (var _i = 0, _a = f.params; _i < _a.length; _i++) {
            var p = _a[_i];
            this.bindVar(p.node, p.name, args[0]);
        }
        var r = valVoid;
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
    };
    Evaluator.prototype.evalFuncSet = function (node, fs, args) {
        var _this = this;
        // Try calling each function. 
        var results = fs.map(function (def) { return _this.evalFunc(def, args); });
        var validResults = results.filter(function (r) { return r != null; });
        if (validResults.length === 0) {
            heron_ast_rewrite_1.throwError(node, "Found no matching functions");
        }
        else if (validResults.length > 1) {
            heron_ast_rewrite_1.throwError(node, "Found multiple matching functions");
        }
        else {
            return validResults[0];
        }
    };
    Evaluator.prototype.evalExpr = function (expr) {
        var _this = this;
        if (expr === null)
            return valVoid;
        if (expr instanceof heron_expr_1.VarName) {
            if (expr.node.ref instanceof heron_refs_1.FuncRef) {
                // TODO: figure out the FuncTYpe
                return new Val(new FuncSet(expr.node.ref.defs), Types.FuncType);
            }
            if (expr.node.ref instanceof heron_refs_1.TypeRef || expr.node.ref instanceof heron_refs_1.TypeParamRef) {
                // TODO: eventually we might want to support 
                heron_ast_rewrite_1.throwError(expr.node, "Type names are not allowed in expressions: " + expr.name);
            }
            // TODO: the reference could be to something else
            return this.findVar(expr.name);
        }
        else if (expr instanceof heron_expr_1.FunCall) {
            // TODO: just like VarName this could resolve to a bunch of possibilities. 
            // We need to chooose the one that works. There are a few possibilities. 
            // Now in the case of functions: just argument counts is not a good idea.
            // really we should look at the arg types. 
            var func = this.evalExpr(expr.func);
            var args = expr.args.map(function (a) { return _this.evalExpr(a); });
            if (func.value instanceof FuncSet) {
                this.evalFuncSet(expr.node, func.value.defs, args);
            }
            else if (func instanceof heron_expr_1.Lambda) {
                this.evalLambda(func, args);
            }
            else {
                throw new Error("Not an invokable function " + func);
            }
        }
        else if (expr instanceof heron_expr_1.ConditionalExpr) {
            this.pushEnv();
            var cond = this.evalExpr(expr.cond);
            var onTrue = this.evalExpr(expr.onTrue);
            var onFalse = this.evalExpr(expr.onFalse);
            if (cond instanceof Val) {
                if (cond.type !== Types.BoolType) {
                    throw new Error("The type of an if condition is not a boolean, it is " + cond.type);
                }
                if (cond.value === true)
                    return onTrue;
                if (cond.value === false)
                    return onFalse;
            }
            var r = union(onTrue, onFalse);
            this.popEnv();
            return r;
        }
        else if (expr instanceof heron_expr_1.ObjectLiteral || expr instanceof heron_expr_1.ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof heron_expr_1.ArrayLiteral) {
            return valArray(expr.vals.map(this.evalExpr));
        }
        else if (expr instanceof heron_expr_1.BoolLiteral) {
            return valBoolean(expr.value);
        }
        else if (expr instanceof heron_expr_1.NumLiteral) {
            return valNumber(expr.value);
        }
        else if (expr instanceof heron_expr_1.StrLiteral) {
            return valString(expr.value);
        }
        else if (expr instanceof heron_expr_1.VarExpr) {
            this.pushEnv();
            for (var _i = 0, _a = expr.vars; _i < _a.length; _i++) {
                var v = _a[_i];
                var varExpr = v.exprNode.expr;
                if (!varExpr)
                    heron_ast_rewrite_1.throwError(v.exprNode, "No expression associated with variable: " + v.name);
                this.bindVar(v.node, v.name, this.evalExpr(varExpr));
            }
            var r = this.evalExpr(expr.expr);
            this.popEnv();
            return r;
        }
        else if (expr instanceof heron_expr_1.Lambda) {
            return valLambda(expr);
        }
        else if (expr instanceof heron_expr_1.PostfixDec) {
            return this.postfixApply(expr.lvalue, function (x) { return x - 1; });
        }
        else if (expr instanceof heron_expr_1.PostfixInc) {
            return this.postfixApply(expr.lvalue, function (x) { return x + 1; });
        }
        else {
            throw new Error("Not a recognized expression " + expr);
        }
    };
    Evaluator.prototype.postfixApply = function (expr, f) {
        var r = this.evalExpr(expr);
        if (expr instanceof heron_expr_1.VarName) {
            this.bindVar(expr.node, expr.name, f(r));
        }
        else {
            heron_ast_rewrite_1.throwError(expr.node, "Cannot apply postfix expression to: " + expr);
        }
        return r;
    };
    return Evaluator;
}());
exports.Evaluator = Evaluator;
//# sourceMappingURL=heron-eval.js.map