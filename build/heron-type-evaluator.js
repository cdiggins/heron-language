"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_expr_1 = require("./heron-expr");
var heron_statement_1 = require("./heron-statement");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_refs_1 = require("./heron-refs");
var type_system_1 = require("./type-system");
var heron_types_1 = require("./heron-types");
// This class computes the type for a function
var TypeEvaluator = /** @class */ (function () {
    function TypeEvaluator(params, typeParams, bodyNode, retTypeNode, typeStrategy, unifier) {
        this.params = params;
        this.typeParams = typeParams;
        this.bodyNode = bodyNode;
        this.retTypeNode = retTypeNode;
        this.typeStrategy = typeStrategy;
        this.unifier = unifier;
        this.function = heron_types_1.genericFuncType(params.length);
        for (var i = 0; i < params.length; ++i) {
            var param = params[i];
            var paramType = heron_types_1.typeFromNode(params[i].typeNode, typeParams);
            if (paramType !== null) {
                param.type = paramType;
                this.unify(this.getArgType(i), paramType);
            }
            else {
                param.type = this.getArgType(i);
            }
        }
        var retType = heron_types_1.typeFromNode(retTypeNode, typeParams);
        if (retType)
            this.unifyReturn(retType);
        if (bodyNode && bodyNode.statement)
            this.getType(bodyNode.statement);
        else if (bodyNode && bodyNode.expr) {
            var bodyType = this.getType(bodyNode.expr);
            this.unifyReturn(bodyType);
        }
    }
    Object.defineProperty(TypeEvaluator.prototype, "numArgs", {
        get: function () {
            return heron_types_1.getNumArgTypes(this.function);
        },
        enumerable: true,
        configurable: true
    });
    TypeEvaluator.prototype.getArgType = function (n) {
        return heron_types_1.getArgType(this.function, n);
    };
    TypeEvaluator.prototype.getReturnType = function () {
        return heron_types_1.getReturnType(this.function);
    };
    TypeEvaluator.prototype.getFinalResult = function () {
        return this.unifier.getUnifiedType(this.function);
    };
    TypeEvaluator.prototype.getType = function (x) {
        if (x.type)
            return x.type;
        try {
            if (x instanceof heron_statement_1.Statement) {
                this.getStatementType(x);
                return x.type = heron_types_1.Types.VoidType;
            }
            else if (x instanceof heron_expr_1.Expr) {
                var rawType = this.getExpressionType(x);
                var uniType = this.unifier.getUnifiedType(rawType);
                //console.log("Expression   : " + x.toString());
                //console.log("Has type     : " + uniType);
                return x.type = uniType;
            }
        }
        catch (e) {
            heron_ast_rewrite_1.throwError(x.node, e.message);
        }
    };
    TypeEvaluator.prototype.getStatementType = function (statement) {
        if (statement.type)
            return statement.type;
        //console.log("Computing statement type:");
        //console.log(statement.node.allText);
        if (statement instanceof heron_statement_1.CompoundStatement) {
            for (var _i = 0, _a = statement.statements; _i < _a.length; _i++) {
                var st = _a[_i];
                this.getType(st);
            }
        }
        else if (statement instanceof heron_statement_1.IfStatement) {
            this.unifyBool(statement.condition);
            this.getType(statement.onTrue);
            this.getType(statement.onFalse);
        }
        else if (statement instanceof heron_statement_1.ReturnStatement) {
            if (statement.condition)
                this.unifyReturn(statement.condition);
            else
                this.unifyReturn(heron_types_1.Types.VoidType);
        }
        else if (statement instanceof heron_statement_1.ContinueStatement) {
            // Do nothing 
        }
        else if (statement instanceof heron_statement_1.ExprStatement) {
            this.getType(statement.expr);
        }
        else if (statement instanceof heron_statement_1.ForStatement) {
            var forLoopVar = statement.node.def;
            if (!forLoopVar)
                heron_ast_rewrite_1.throwError(statement.node, "Missing for loop variable definition");
            var arrayType = heron_types_1.makeNewArrayType();
            var elementType = heron_types_1.getArrayElementType(arrayType);
            if (forLoopVar.type)
                this.unify(forLoopVar.type, elementType);
            else
                forLoopVar.type = elementType;
            this.unify(statement.array, arrayType);
            this.getType(statement.loop);
        }
        else if (statement instanceof heron_statement_1.DoStatement) {
            this.getType(statement.body);
            this.unifyBool(statement.condition);
        }
        else if (statement instanceof heron_statement_1.WhileStatement) {
            this.unifyBool(statement.condition);
            this.getType(statement.body);
        }
        else if (statement instanceof heron_statement_1.VarDeclStatement) {
            for (var _b = 0, _c = statement.vars; _b < _c.length; _b++) {
                var vd = _c[_b];
                if (!vd.exprNode.expr)
                    heron_ast_rewrite_1.throwError(vd.exprNode, "Missing an expression");
                vd.type = this.getType(vd.exprNode.expr);
            }
        }
        else if (statement instanceof heron_statement_1.EmptyStatement) {
            // Do nothing. 
        }
        else {
            throw new Error("Unrecognized statement " + statement);
        }
    };
    TypeEvaluator.prototype.getExpressionType = function (expr) {
        var _this = this;
        if (expr === null)
            throw new Error("No type available on a null expression");
        if (expr.type)
            return expr.type;
        //console.log("Evaluating type of: " + expr.toString());
        if (expr instanceof heron_expr_1.VarName) {
            if (!expr.node.ref)
                heron_ast_rewrite_1.throwError(expr.node, "Missing ref");
            var ref = expr.node.ref;
            if (ref instanceof heron_refs_1.FuncRef) {
                return heron_types_1.makeFunctionSet(ref.defs.map(function (r) { return heron_types_1.computeFuncType(r); }));
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
            var cond = this.unifyBool(expr.cond);
            var onTrue = this.getType(expr.onTrue);
            var onFalse = this.getType(expr.onFalse);
            return this.unify(onTrue, onFalse);
        }
        else if (expr instanceof heron_expr_1.ObjectLiteral || expr instanceof heron_expr_1.ObjectField) {
            throw new Error("Object literals not yet supported");
        }
        else if (expr instanceof heron_expr_1.ArrayLiteral) {
            var arrayType = heron_types_1.makeNewArrayType();
            var elemType = heron_types_1.getArrayElementType(arrayType);
            for (var _i = 0, _a = expr.vals; _i < _a.length; _i++) {
                var v = _a[_i];
                this.unify(v, elemType);
            }
            return arrayType;
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
            for (var _b = 0, _c = expr.vars; _b < _c.length; _b++) {
                var v = _c[_b];
                var varExpr = v.exprNode.expr;
                if (!varExpr)
                    heron_ast_rewrite_1.throwError(v.exprNode, "No expression associated with variable: " + v.name);
            }
            var r = this.getType(expr.expr);
            return r;
        }
        else if (expr instanceof heron_expr_1.Lambda) {
            return heron_types_1.getLambdaType(expr, this.unifier);
        }
        else if (expr instanceof heron_expr_1.PostfixDec) {
            return this.unifyInt(expr.lvalue);
        }
        else if (expr instanceof heron_expr_1.PostfixInc) {
            return this.unifyInt(expr.lvalue);
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
    TypeEvaluator.prototype.unify = function (a, b) {
        if (a instanceof heron_expr_1.Expr)
            a = this.getType(a);
        if (b instanceof heron_expr_1.Expr)
            b = this.getType(b);
        return this.unifier.unifyTypes(a, b);
    };
    TypeEvaluator.prototype.unifyBool = function (x) {
        return this.unify(x, heron_types_1.Types.BoolType);
    };
    TypeEvaluator.prototype.unifyInt = function (x) {
        return this.unify(x, heron_types_1.Types.IntType);
    };
    TypeEvaluator.prototype.unifyReturn = function (x) {
        return this.unify(x, this.getReturnType());
    };
    return TypeEvaluator;
}());
exports.TypeEvaluator = TypeEvaluator;
//# sourceMappingURL=heron-type-evaluator.js.map