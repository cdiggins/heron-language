"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_refs_1 = require("./heron-refs");
var type_system_1 = require("./type-system");
var heron_type_evaluator_1 = require("./heron-type-evaluator");
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
function callFunctionSet(fun, funcSet, args, argTypes, unifier) {
    console.log("Calling function-set with: ");
    console.log("    " + args.join(", "));
    console.log("    " + argTypes.join(", "));
    console.log("Function choices: ");
    var funcs = funcSet.types[1].types;
    for (var _i = 0, funcs_1 = funcs; _i < funcs_1.length; _i++) {
        var f = funcs_1[_i];
        console.log("  " + f);
    }
    var n = chooseBestFunctionIndexFromArgs(argTypes, funcSet);
    fun.functionIndex = n;
    return callFunction(funcs[n], args, argTypes, unifier);
}
exports.callFunctionSet = callFunctionSet;
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
        var localType = u.unifyTypes(paramType, argType);
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
    // DEBUG:
    //console.log("Unifier state:");
    //console.log(u.state);
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
        var te = new heron_type_evaluator_1.TypeEvaluator(f.params, genParams, f.body, f.retTypeNode, exports.typeStrategy, u);
        f.type = te.getFinalResult();
        console.log("Type for " + f);
        console.log(" is " + type_system_1.normalizeType(f.type));
    }
    return f.type;
}
exports.computeFuncType = computeFuncType;
function getLambdaType(l, u) {
    if (!l.type) {
        var te = new heron_type_evaluator_1.TypeEvaluator(l.params, [], l.bodyNode, null, exports.typeStrategy, u);
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
    var r = -1;
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
//# sourceMappingURL=heron-types.js.map