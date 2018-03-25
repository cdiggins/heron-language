"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_expr_1 = require("./heron-expr");
var heron_statement_1 = require("./heron-statement");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_refs_1 = require("./heron-refs");
var type_system_1 = require("./type-system");
function assure(t) {
    if (!t)
        throw new Error("Value was not defined");
    return t;
}
exports.assure = assure;
var id = 0;
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
    Types.ErrorType = type_system_1.typeConstant('Error');
    Types.NeverType = type_system_1.typeConstant('Never');
    Types.TypeType = type_system_1.typeConstant('Type');
    Types.FuncType = type_system_1.typeConstant('Func');
})(Types = exports.Types || (exports.Types = {}));
function typeFromNode(node, typeParams) {
    if (!node)
        return null;
    heron_ast_rewrite_1.validateNode(node, "typeExpr", "typeName");
    if (node.name === "typeExpr") {
        if (node.children.length === 1)
            return typeFromNode(node.children[0], typeParams);
        return type_system_1.polyType(node.children.map(function (c) { return typeFromNode(c, typeParams); }));
    }
    else if (node.name === "typeName") {
        var text = node.allText;
        if (typeParams.indexOf(text) >= 0)
            return type_system_1.typeVariable(text);
        else
            return type_system_1.typeConstant(text);
    }
}
exports.typeFromNode = typeFromNode;
// This class computes the type for a function
var TypeEvaluator = /** @class */ (function () {
    function TypeEvaluator(params, typeParams, bodyNode, retTypeNode) {
        this.params = params;
        this.typeParams = typeParams;
        this.bodyNode = bodyNode;
        this.retTypeNode = retTypeNode;
        this.unifier = new type_system_1.TypeResolver();
        this.function = genericFuncType(params.length);
        for (var i = 0; i < params.length; ++i) {
            var param = params[i];
            var paramType = typeFromNode(params[i].typeNode, typeParams);
            if (paramType !== null) {
                param.type = paramType;
                this.unify(this.getArgType(i), paramType);
            }
            else {
                param.type = this.getArgType(i);
            }
        }
        var retType = typeFromNode(retTypeNode, typeParams);
        if (retType)
            this.unifyReturn(retType);
        if (bodyNode && bodyNode.statement)
            this.getType(bodyNode.statement);
        else if (bodyNode && bodyNode.expr)
            this.getType(bodyNode.expr);
    }
    Object.defineProperty(TypeEvaluator.prototype, "numArgs", {
        get: function () {
            return getNumArgTypes(this.function);
        },
        enumerable: true,
        configurable: true
    });
    TypeEvaluator.prototype.getArgType = function (n) {
        return getArgType(this.function, n);
    };
    TypeEvaluator.prototype.getReturnType = function () {
        return getReturnType(this.function);
    };
    TypeEvaluator.prototype.getFinalResult = function () {
        return this.unifier.getUnifiedType(this.function, [], {});
    };
    TypeEvaluator.prototype.getType = function (x) {
        if (x.type)
            return x.type;
        try {
            if (x instanceof heron_statement_1.Statement) {
                this.getStatementType(x);
                return x.type = Types.VoidType;
            }
            else if (x instanceof heron_expr_1.Expr) {
                return x.type = this.unifier.getUnifiedType(this.getExpressionType(x));
            }
        }
        catch (e) {
            return x.type = Types.ErrorType;
        }
    };
    TypeEvaluator.prototype.getStatementType = function (statement) {
        if (statement.type)
            return statement.type;
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
                this.unifyReturn(Types.VoidType);
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
            var arrayType = makeNewArrayType();
            var elementType = getArrayElementType(arrayType);
            if (forLoopVar.type)
                this.unify(forLoopVar.type, elementType);
            else
                forLoopVar.type = elementType;
            this.unify(statement.array, arrayType);
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
        if (expr instanceof heron_expr_1.VarName) {
            if (!expr.node.ref)
                heron_ast_rewrite_1.throwError(expr.node, "Missing ref");
            var ref = expr.node.ref;
            if (ref instanceof heron_refs_1.FuncRef) {
                return makeFunctionSet(ref.defs.map(computeFuncType));
            }
            else if (ref instanceof heron_refs_1.VarRef) {
                return assure(ref.def.type);
            }
            else if (ref instanceof heron_refs_1.FuncParamRef) {
                return assure(ref.def.type);
            }
            else if (ref instanceof heron_refs_1.ForLoopVarRef) {
                return assure(ref.def.type);
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
                if (isFunctionSet(func))
                    return this.callFunctionSet(func, args);
                else if (isFunctionType(func))
                    // We have to create new Type variable names when calling a
                    return this.callFunction(func, args);
                else
                    throw new Error("Can't call " + func);
            }
            else if (func instanceof type_system_1.TypeVariable) {
                var funcType_1 = genericFuncTypeFromArgs(args);
                this.unify(func, funcType_1);
                return getReturnType(funcType_1);
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
            var arrayType = makeNewArrayType();
            var elemType = getArrayElementType(arrayType);
            for (var _i = 0, _a = expr.vals; _i < _a.length; _i++) {
                var v = _a[_i];
                this.unify(v, elemType);
            }
            return arrayType;
        }
        else if (expr instanceof heron_expr_1.BoolLiteral) {
            return Types.BoolType;
        }
        else if (expr instanceof heron_expr_1.NumLiteral) {
            return Types.NumType;
        }
        else if (expr instanceof heron_expr_1.StrLiteral) {
            return Types.StrType;
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
            return getLambdaType(expr);
        }
        else if (expr instanceof heron_expr_1.PostfixDec) {
            return this.unifyNumber(expr.lvalue);
        }
        else if (expr instanceof heron_expr_1.PostfixInc) {
            return this.unifyNumber(expr.lvalue);
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
        return this.unify(x, Types.BoolType);
    };
    TypeEvaluator.prototype.unifyNumber = function (x) {
        return this.unify(x, Types.NumType);
    };
    TypeEvaluator.prototype.unifyReturn = function (x) {
        return this.unify(x, this.getReturnType());
    };
    TypeEvaluator.prototype.callFunction = function (funOriginal, argTypes) {
        // We have to create fresh variable names.
        // BUT I need to assure that those names have a lower priority then the 
        // ones we have now. This might happen automatically, but I am not 100% sure.
        var fun = type_system_1.freshVariableNames(funOriginal, id++);
        var u = new type_system_1.TypeResolver();
        var paramTypes = getArgTypes(fun);
        var returnType = getReturnType(fun);
        // Parameters should match the number of arguments given to it. 
        if (paramTypes.length !== argTypes.length)
            throw new Error("Mismatched number of arguments was " + argTypes.length + " expected " + paramTypes.length);
        // Unify the passed arguments with the parameter types.         
        for (var i = 0; argTypes.length; ++i)
            u.unifyTypes(paramTypes[i], argTypes[i]);
        // We return the unified version of the return type.
        return u.getUnifiedType(returnType);
    };
    TypeEvaluator.prototype.callFunctionSet = function (funset, args) {
        var funcs = funset.types[1];
        var results = [];
        for (var i = 0; i < funcs.types.length; ++i) {
            var func = funcs.types[i];
            if (!(func instanceof type_system_1.PolyType) || !isFunctionType(func))
                throw new Error("Expected a function type");
            var paramTypes = getArgTypes(func);
            // Not providing enough parameters: continue          
            if (args.length !== paramTypes.length)
                continue;
            // Are the types compatible?
            if (canCallFunc(func, args))
                results.push(func);
        }
        if (results.length === 0)
            throw new Error("Could not find a function that matches the types");
        if (results.length === 1)
            return this.callFunction(results[0], args);
        // TODO: maybe unify types if we can. 
        return makeUnionType(results.map(getReturnType));
    };
    return TypeEvaluator;
}());
exports.TypeEvaluator = TypeEvaluator;
function computeFuncType(f) {
    if (!f.type) {
        var sigNode = heron_ast_rewrite_1.validateNode(f.node.children[0], "funcSig");
        var genParamsNode = heron_ast_rewrite_1.validateNode(sigNode.children[1], "genericParams");
        var genParams = genParamsNode.children.map(function (p) { return p.allText; });
        var te = new TypeEvaluator(f.params, genParams, f.body, f.retTypeNode);
        f.type = te.getFinalResult();
    }
    return f.type;
}
exports.computeFuncType = computeFuncType;
function getLambdaType(l) {
    if (!l.type) {
        var te = new TypeEvaluator(l.params, [], l.bodyNode, null);
        l.type = te.getFinalResult();
    }
    return l.type;
}
exports.getLambdaType = getLambdaType;
function funcType(args, ret) {
    return type_system_1.polyType([type_system_1.typeConstant('Func')].concat(args, [ret]));
}
exports.funcType = funcType;
function genericFuncType(n) {
    var params = [];
    for (var i = 0; i < n; ++i)
        params.push(type_system_1.typeVariable('T' + i));
    return funcType(params, type_system_1.typeVariable('R'));
}
exports.genericFuncType = genericFuncType;
function genericFuncTypeFromArgs(args) {
    return funcType(args, type_system_1.newTypeVar());
}
exports.genericFuncTypeFromArgs = genericFuncTypeFromArgs;
function typeUnion(types) {
    var tmp = {};
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var t = types_1[_i];
        tmp[t.toString()] = t;
    }
    var r = [];
    for (var k in tmp)
        r.push(tmp[k]);
    if (r.length === 0)
        return Types.VoidType;
    if (r.length === 1)
        return r[0];
    return type_system_1.polyType([type_system_1.typeConstant('union'), type_system_1.polyType(r)]);
}
exports.typeUnion = typeUnion;
function makeArrayType(elementType) {
    return type_system_1.polyType([type_system_1.typeConstant('Array'), elementType]);
}
exports.makeArrayType = makeArrayType;
function makeNewTypeVar() {
    return new type_system_1.TypeVariable('$' + id++);
}
exports.makeNewTypeVar = makeNewTypeVar;
function makeNewArrayType() {
    return makeArrayType(makeNewTypeVar());
}
exports.makeNewArrayType = makeNewArrayType;
function getArrayElementType(t) {
    return t.types[1];
}
exports.getArrayElementType = getArrayElementType;
function makeUnionType(types) {
    var tmp = {};
    for (var _i = 0, types_2 = types; _i < types_2.length; _i++) {
        var t = types_2[_i];
        if (isUnionType(t)) {
            for (var _a = 0, _b = getTypesInUnion(t); _a < _b.length; _a++) {
                var t2 = _b[_a];
                tmp[t.toString()] = t;
            }
        }
        else
            tmp[t.toString()] = t;
    }
    var r = [];
    for (var k in tmp)
        r.push(tmp[k]);
    if (r.length === 1)
        return r[0];
    return type_system_1.polyType([type_system_1.typeConstant('union'), type_system_1.polyType(r)]);
}
exports.makeUnionType = makeUnionType;
function makeFunctionSet(types) {
    if (types.length === 0)
        throw new Error("Not enough types");
    if (types.length === 1)
        return types[0];
    for (var _i = 0, types_3 = types; _i < types_3.length; _i++) {
        var t = types_3[_i];
        if (!isFunctionType(t))
            throw new Error("Only function types can be used to make a function set");
    }
    return type_system_1.polyType([type_system_1.typeConstant('FuncSet'), type_system_1.polyType(types)]);
}
exports.makeFunctionSet = makeFunctionSet;
function isFunctionSet(type) {
    return type_system_1.isTypeConstant(type.types[0], 'FuncSet');
}
exports.isFunctionSet = isFunctionSet;
function isFunctionType(type) {
    return (type instanceof type_system_1.PolyType) && type_system_1.isTypeConstant(type.types[0], 'Func');
}
exports.isFunctionType = isFunctionType;
function isUnionType(type) {
    if (!(type instanceof type_system_1.PolyType))
        return false;
    return type_system_1.isTypeConstant(type.types[0], 'union');
}
exports.isUnionType = isUnionType;
function getTypesInUnion(type) {
    if (!isUnionType(type))
        throw new Error("Not a union type");
    return type.types[1].types;
}
exports.getTypesInUnion = getTypesInUnion;
function getNumArgTypes(f) {
    return f.types.length - 2;
}
exports.getNumArgTypes = getNumArgTypes;
function getArgType(f, n) {
    return getArgTypes(f)[n];
}
exports.getArgType = getArgType;
function getArgTypes(f) {
    return f.types.slice(1, f.types.length - 1);
}
exports.getArgTypes = getArgTypes;
function getReturnType(f) {
    return f.types[f.types.length - 1];
}
exports.getReturnType = getReturnType;
function canCallFunc(f, args) {
    // TODO: can I pass the arg type to the function type, and other shit.
    return true;
}
exports.canCallFunc = canCallFunc;
//# sourceMappingURL=heron-types.js.map