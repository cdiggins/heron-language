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
    Types.IntType = type_system_1.typeConstant('Int');
    Types.FloatType = type_system_1.typeConstant('Float');
    Types.BoolType = type_system_1.typeConstant('Bool');
    Types.StrType = type_system_1.typeConstant('Str');
    Types.LambdaType = type_system_1.typeConstant('Lambda');
    Types.VoidType = type_system_1.typeConstant('Void');
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
var TypeStrategyClass = /** @class */ (function () {
    function TypeStrategyClass() {
        this.casts = {
            'Float': ['Int'],
            'ArrayBuilder': ['Array'],
            'Array': ['Float2', 'Float3', 'Float4'],
            'Float4': ['Float', 'Float2', 'Float3'],
            'Float3': ['Float', 'Float2'],
            'Float2': ['Float'],
        };
    }
    TypeStrategyClass.prototype.chooseConstant = function (a, b) {
        if ((this.casts[a.name] || []).indexOf(b.name) >= 0)
            return a;
        if ((this.casts[b.name] || []).indexOf(a.name) >= 0)
            return b;
        throw new Error("Failed to resolve type constants: " + a + " and " + b);
    };
    TypeStrategyClass.prototype.canCastTo = function (arg, param) {
        if (arg.name === param.name)
            return true;
        if ((this.casts[param.name] || []).indexOf(arg.name) >= 0)
            return true;
        if (param.name === 'Array' && arg.name === 'ArrayBuilder')
            return true;
        return false;
    };
    return TypeStrategyClass;
}());
exports.typeStrategy = new TypeStrategyClass();
function callFunction(funOriginal, args, argTypes, mainUnifier) {
    // We have to create fresh variable names.
    var fun = type_system_1.freshVariableNames(funOriginal);
    var u = new type_system_1.TypeResolver(exports.typeStrategy);
    var paramTypes = getArgTypes(fun);
    var returnType = getReturnType(fun);
    // Parameters should match the number of arguments given to it. 
    if (paramTypes.length !== args.length)
        throw new Error("Mismatched number of arguments was " + args.length + " expected " + paramTypes.length);
    // Unify the passed arguments with the parameter types.    
    for (var i = 0; i < args.length; ++i) {
        var argType = argTypes[i];
        var paramType = paramTypes[i];
        var arg = args[i];
        if (argType instanceof type_system_1.PolyType && isFunctionSet(argType)) {
            if (!(paramType instanceof type_system_1.PolyType))
                throw new Error("Parameter is not a poly-type: can't figure out best match");
            // We have to figure out which type is the best here. 
            //console.log("We have a function set as an argument.")
            var n = chooseBestFunctionIndex(paramType, argType);
            argType = functionSetOptions(argType)[n];
            arg.functionIndex = n;
        }
        // Do the local unification to get the proper return type
        u.unifyTypes(paramType, argType);
        // Do the unification of the arguments with the types.
        var globalType = mainUnifier.unifyTypes(argType, paramType);
        // In case the referenced node is a variable or parameter, 
        // we are going to unify it with the resulting global type. 
        if (arg.node.ref instanceof heron_refs_1.FuncParamRef) {
            mainUnifier.unifyTypes(arg.node.ref.def.type, globalType);
        }
        else if (arg.node.ref instanceof heron_refs_1.VarRef) {
            mainUnifier.unifyTypes(arg.node.ref.def.type, globalType);
        }
    }
    // We return the unified version of the return type.
    return u.getUnifiedType(returnType);
}
exports.callFunction = callFunction;
function computeFuncTypeFromSig(f, genParams) {
    var u = new type_system_1.TypeResolver(exports.typeStrategy);
    var t = genericFuncType(f.params.length);
    var hasSpecType = false;
    for (var i = 0; i < f.params.length; ++i) {
        var param = f.params[i];
        var paramType = typeFromNode(f.params[i].typeNode, genParams);
        if (paramType !== null) {
            hasSpecType = true;
            param.type = paramType;
            u.unifyTypes(getArgType(t, i), paramType);
        }
    }
    var retType = typeFromNode(f.retTypeNode, genParams);
    if (retType) {
        hasSpecType = true;
        u.unifyTypes(getReturnType(t), retType);
    }
    if (hasSpecType)
        return u.getUnifiedType(t);
    else
        return t;
}
exports.computeFuncTypeFromSig = computeFuncTypeFromSig;
function computeFuncType(f) {
    if (!f.type) {
        var sigNode = heron_ast_rewrite_1.validateNode(f.node.children[0], "funcSig");
        var genParamsNode = heron_ast_rewrite_1.validateNode(sigNode.children[1], "genericParams");
        var genParams = genParamsNode.children.map(function (p) { return p.allText; });
        f.type = computeFuncTypeFromSig(f, genParams);
        var u = new type_system_1.TypeResolver(exports.typeStrategy);
        var te = new TypeEvaluator(f.params, genParams, f.body, f.retTypeNode, exports.typeStrategy, u);
        f.type = te.getFinalResult();
        //console.log("Type for " + f);
        //console.log(" is " + normalizeType(f.type));
    }
    return f.type;
}
exports.computeFuncType = computeFuncType;
function getLambdaType(l, u) {
    if (!l.type) {
        var te = new TypeEvaluator(l.params, [], l.bodyNode, null, exports.typeStrategy, u);
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
    var args = [];
    for (var i = 0; i < n; ++i)
        args.push(type_system_1.newTypeVar());
    return genericFuncTypeFromArgs(args);
}
exports.genericFuncType = genericFuncType;
function genericFuncTypeFromArgs(args) {
    return funcType(args, type_system_1.newTypeVar());
}
exports.genericFuncTypeFromArgs = genericFuncTypeFromArgs;
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
function makeFunctionSet(types) {
    if (types.length === 0)
        throw new Error("Not enough types");
    if (types.length === 1)
        return types[0];
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var t = types_1[_i];
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
function canCallFunc(f, args, exact) {
    var params = getArgTypes(f);
    if (params.length !== args.length)
        return false;
    for (var i = 0; i < params.length; ++i)
        if (!canPassArg(args[i], params[i], exact))
            return false;
    return true;
}
exports.canCallFunc = canCallFunc;
function canPassArg(arg, param, exact) {
    if (param instanceof type_system_1.TypeVariable || arg instanceof type_system_1.TypeVariable)
        return true;
    if (param instanceof type_system_1.TypeConstant) {
        if (arg instanceof type_system_1.TypeConstant)
            if (exact)
                return type_system_1.isTypeConstant(arg, param.name);
            else
                return exports.typeStrategy.canCastTo(arg, param);
        else
            return false;
    }
    if (param instanceof type_system_1.PolyType) {
        if (!(arg instanceof type_system_1.PolyType))
            return false;
        if (arg.types.length !== param.types.length)
            return false;
        for (var i = 0; i < arg.types.length; ++i)
            if (!canPassArg(arg.types[i], param.types[i], exact))
                return false;
    }
    return true;
}
exports.canPassArg = canPassArg;
function functionSetOptions(f) {
    return f.types[1].types.map(function (t) { return t; });
}
exports.functionSetOptions = functionSetOptions;
// Gives a score to a function based on how many concrete types it has  
function functionSpecificity(func) {
    var args = getArgTypes(func);
    var n = 0;
    for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
        var a = args_1[_i];
        if (a instanceof type_system_1.PolyType || a instanceof type_system_1.TypeConstant)
            n++;
    }
    return n;
}
exports.functionSpecificity = functionSpecificity;
function chooseMostGeneric(funcSet) {
    var options = functionSetOptions(funcSet);
    var scores = options.map(functionSpecificity);
    var result = 0, many = false;
    for (var i = 1; i < scores.length; ++i) {
        if (scores[i] < scores[result] && scores[i] >= 0)
            result = i, many = false;
        else if (scores[i] === scores[result])
            many = true;
    }
    return many ? -1 : result;
}
exports.chooseMostGeneric = chooseMostGeneric;
function chooseBestFunctionIndexFromArgs(args, funcSet) {
    // Try an exact match (no casting)
    var tmp = chooseBestFunctionIndexFromArgsHelper(args, funcSet, true);
    if (tmp >= 0)
        return tmp;
    // Try an inexact match (casting)
    tmp = chooseBestFunctionIndexFromArgsHelper(args, funcSet, false);
    if (tmp >= 0)
        return tmp;
    // If nothing else works, just try the most generic option
    tmp = chooseMostGeneric(funcSet);
    if (tmp >= 0)
        return tmp;
    throw new Error("Found no matching function");
}
exports.chooseBestFunctionIndexFromArgs = chooseBestFunctionIndexFromArgs;
function chooseBestFunctionIndexFromArgsHelper(args, funcSet, exact) {
    var options = functionSetOptions(funcSet);
    var scores = [];
    // First try with exact matching
    for (var i_1 = 0; i_1 < options.length; ++i_1) {
        var g = options[i_1];
        if (canCallFunc(g, args, exact))
            scores.push(functionSpecificity(g));
        else
            scores.push(-1);
    }
    var res = 0;
    var many = false;
    for (var i = 1; i < scores.length; ++i) {
        if (scores[i] > scores[res]) {
            many = false;
            res = i;
        }
        else if (scores[i] === scores[res]) {
            many = true;
        }
    }
    if (res >= 0 && !many)
        return res;
    else
        return -1;
}
exports.chooseBestFunctionIndexFromArgsHelper = chooseBestFunctionIndexFromArgsHelper;
function chooseBestFunctionIndex(f, funcSet) {
    return chooseBestFunctionIndexFromArgs(getArgTypes(f), funcSet);
}
exports.chooseBestFunctionIndex = chooseBestFunctionIndex;
// This class computes the type for a function
var TypeEvaluator = /** @class */ (function () {
    function TypeEvaluator(params, typeParams, bodyNode, retTypeNode, typeStrategy, unifier) {
        this.params = params;
        this.typeParams = typeParams;
        this.bodyNode = bodyNode;
        this.retTypeNode = retTypeNode;
        this.typeStrategy = typeStrategy;
        this.unifier = unifier;
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
        else if (bodyNode && bodyNode.expr) {
            var bodyType = this.getType(bodyNode.expr);
            this.unifyReturn(bodyType);
        }
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
        return this.unifier.getUnifiedType(this.function);
    };
    TypeEvaluator.prototype.getType = function (x) {
        // if (x.type) return x.type;
        try {
            if (x instanceof heron_statement_1.Statement) {
                this.getStatementType(x);
                return x.type = Types.VoidType;
            }
            else {
                var rawType = this.getExpressionType(x);
                var uniType = this.unifier.getUnifiedType(rawType);
                //console.log("Expression   : " + x.toString());
                //console.log("Has type     : " + uniType);
                return uniType;
                //return x.type = rawType;
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
            if (statement.expr)
                this.unifyReturn(statement.expr);
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
        //if (expr.type) return expr.type;
        //console.log("Evaluating type of: " + expr.toString());
        if (expr instanceof heron_expr_1.VarName) {
            if (!expr.node.ref)
                heron_ast_rewrite_1.throwError(expr.node, "Missing ref");
            var ref = expr.node.ref;
            if (ref instanceof heron_refs_1.FuncRef) {
                return makeFunctionSet(ref.defs.map(function (r) { return computeFuncType(r); }));
            }
            else if (ref instanceof heron_refs_1.VarRef) {
                if (!ref.def.type)
                    ref.def.type = this.getType(ref.def.exprNode.expr);
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
            throw new Error("Unrecognized expression");
        }
        else if (expr instanceof heron_expr_1.FunCall) {
            var funcType_1 = this.getType(expr.func);
            var argTypes = expr.args.map(function (a) { return _this.getType(a); });
            if (funcType_1 instanceof type_system_1.PolyType) {
                // Work out the function type  
                if (isFunctionSet(funcType_1)) {
                    var funcs = funcType_1.types[1].types;
                    var n = chooseBestFunctionIndexFromArgs(argTypes, funcType_1);
                    expr.func.functionIndex = n;
                    funcType_1 = funcs[n];
                }
                if (!isFunctionType(funcType_1))
                    throw new Error("Can't call " + funcType_1);
                for (var i = 0; i < argTypes.length; ++i) {
                    var arg = expr.args[i];
                    var exp = getArgType(funcType_1, i);
                    // TODO: maybe extend this to all types, not just function args.
                    // I can see this being something we want for arrays as well.
                    if (arg instanceof heron_expr_1.Lambda) {
                        this.unify(arg, exp);
                        // Recompute the type now.
                        arg.type = null;
                        this.getType(arg);
                    }
                }
                // We have to create new Type variable names when calling a
                return callFunction(funcType_1, expr.args, argTypes, this.unifier);
            }
            else if (funcType_1 instanceof type_system_1.TypeVariable) {
                var genFunc = genericFuncTypeFromArgs(argTypes);
                this.unify(funcType_1, genFunc);
                var retType = getReturnType(genFunc);
                var r = callFunction(genFunc, expr.args, argTypes, this.unifier);
                this.unify(retType, r);
                return r;
            }
            else {
                throw new Error("Can't call " + funcType_1);
            }
        }
        else if (expr instanceof heron_expr_1.ConditionalExpr) {
            this.unifyBool(expr.condition);
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
        else if (expr instanceof heron_expr_1.IntLiteral) {
            return Types.IntType;
        }
        else if (expr instanceof heron_expr_1.FloatLiteral) {
            return Types.FloatType;
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
                v.type = this.getType(varExpr);
            }
            var r = this.getType(expr.expr);
            return r;
        }
        else if (expr instanceof heron_expr_1.Lambda) {
            return getLambdaType(expr, this.unifier);
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
        return this.unify(x, Types.BoolType);
    };
    TypeEvaluator.prototype.unifyInt = function (x) {
        return this.unify(x, Types.IntType);
    };
    TypeEvaluator.prototype.unifyReturn = function (x) {
        return this.unify(x, this.getReturnType());
    };
    return TypeEvaluator;
}());
exports.TypeEvaluator = TypeEvaluator;
//# sourceMappingURL=heron-types.js.map