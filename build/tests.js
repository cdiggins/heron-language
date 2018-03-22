"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Myna = require("myna-parser");
var heron_parser_1 = require("./heron-parser");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_compiler_1 = require("./heron-compiler");
var heron_defs_1 = require("./heron-defs");
var heron_eval_1 = require("./heron-eval");
var type_system_1 = require("./type-system");
var m = Myna.Myna;
var g = heron_parser_1.heronGrammar;
var assert = require('assert');
// Assure that two ASTs have the same shape
// For example if I generate some text, and re-parse it.
function compareAst(a, b) {
    if (!a && b || a && !b)
        return false;
    if (a.children.length != b.children.length)
        return false;
    if (a.children.length === 0)
        return a.allText === b.allText;
    if (a.name !== b.name)
        return false;
    for (var i = 0; i < a.children.length; ++i)
        if (!compareAst(a.children[i], b.children[i]))
            return false;
    return true;
}
// Tests parsing an individual rule against the input input text, and returns an object 
// representing the result of running the test 
function testParse(rule, assert, text, shouldPass) {
    if (shouldPass == undefined)
        shouldPass = true;
    var result = m.failed;
    var err = undefined;
    try {
        var node = m.parse(rule, text);
        if (node)
            result = node.end;
    }
    catch (e) {
        err = e;
    }
    var testResult = {
        name: rule.toString() + ' with input "' + text + '"',
        description: result + "/" + text.length,
        negative: !shouldPass,
        success: (result === text.length) !== !shouldPass,
        error: err,
        ruleDescr: rule.type + ": " + rule.toString(),
        rule: rule
    };
    if (!testResult.success)
        console.log(testResult);
    assert.ok(testResult.success, testResult.name + (shouldPass ? "" : " should fail"));
}
var ruleTests = [
    [g.comment, ['/* abc */', '// abc \n', '/* abc */ /* def */ '], ['abc', '', '/*']],
    [g.funCall, ['(a, b)', '(a)', '(F )', '()'], []],
    [g.expr, ['42', '3+4', '3 + 4', '3 * (2 + 4)', '3 * 2 + 4', 'a', 'a++', 'f(1,2)', 'f(3, 5)', 'f()', 'f(12)', 'hx > 0.0'], []],
    [g.expr, ['0..1', '0 .. 1', 'f(a .. b)'], ['xs[0:5]', 'xs[4:0:-1]']],
    [g.expr, ['x => 42', '(x) => 13', 'x=>3', 'x => { return 42; }', '(x, y) => x * y'], []],
    [g.expr, ['(3)', '(3 + 2)', '(c)', '(a)+(b)', 'a+(b)', 'a+b+c', 'a?b:c', 'a?b+c:d', 'a?b:c+d', 'a?(b):c', '(a)?b:c'], []],
    [g.expr, ['a?b:1(c)'], ['f > max ? max : (f < min ? min) : f']],
    [g.expr, ['op+', 'f(op+)', 'f(0, op+)'], []],
    [g.expr, ['a?b:c', 'a?b:c?d:e', 'a?b:(c<d?e:f)', 'a>3?b:c', 'a > 3 ? b : c', 'f > max ? max : (f < min ? min : f)'], []],
    [g.statement, [
            'var x = 0;',
            'f();',
            'if (x) f();',
            'if (x) f(); else g();',
            'return;',
            ';',
            'var test = 1;\n /* */',
            'return p;',
            'if (hx) return p;',
            'if (hx > 0.0) return p;',
            'if(hx > 0.0) return p;',
        ],
        [
            'f()',
            'return 42',
            'g',
            ';;',
        ]]
];
function testParsingRules() {
    for (var _i = 0, ruleTests_1 = ruleTests; _i < ruleTests_1.length; _i++) {
        var ruleTest = ruleTests_1[_i];
        var rule = ruleTest[0];
        for (var _a = 0, _b = ruleTest[1]; _a < _b.length; _a++) {
            var passInput = _b[_a];
            testParse(rule, assert, passInput, true);
        }
        for (var _c = 0, _d = ruleTest[2]; _c < _d.length; _c++) {
            var failInput = _d[_c];
            testParse(rule, assert, failInput, false);
        }
    }
}
// TEMP: this needs to be uncommented
testParsingRules();
var fs = require('fs');
// TODO: add parent pointers to each node, and an ID, and a reverse index lookup. 
// after the rewrite phase
function functionSigToString(node) {
    if (node.name === 'funcDef')
        return "function " + node.children[0].allText;
    if (node.name === 'intrinsicDef')
        return "intrinsic " + node.children[0].allText;
    throw new Error("Node has no signature" + node.name);
}
function refDetails(ref) {
    return "Ref Details\n" + heron_ast_rewrite_1.parseLocation(ref.node) + "\n    ref = " + ref.toString() + "\n    name = " + ref.name + "\n    node = " + ref.node['id'] + "    \n    expr = " + ref.node['expr'] + "\n    " + ref.defs;
}
function outputPackageStats(pkg) {
    console.log("Files: ");
    console.log(pkg.files);
    console.log("# Modules  : " + pkg.modules.length);
    console.log("# Scopes   : " + pkg.scopes.length);
    console.log("# Defs     : " + pkg.defs.length);
    console.log("# Usages   : " + pkg.refs.length);
    var multiDefs = pkg.refs.filter(function (r) { return r.defs.length > 1; });
    var zeroDefs = pkg.refs.filter(function (r) { return r.defs.length == 0; });
    console.log('# Refs with multiple defs : ' + multiDefs.length);
    console.log('# Refs with zero defs : ' + zeroDefs.length);
    for (var _i = 0, multiDefs_1 = multiDefs; _i < multiDefs_1.length; _i++) {
        var d = multiDefs_1[_i];
        console.log(refDetails(d));
    }
}
function findFunc(mod, name) {
    var defs = mod.body.children.map(function (c) { return c.def; }).filter(function (d) { return d instanceof heron_defs_1.FuncDef; });
    for (var _i = 0, defs_1 = defs; _i < defs_1.length; _i++) {
        var d = defs_1[_i];
        if (d.name === name)
            return d;
    }
    return null;
}
function getAllFuncDefs(pkg) {
    var r = [];
    for (var _i = 0, _a = pkg.modules; _i < _a.length; _i++) {
        var m_1 = _a[_i];
        for (var _b = 0, _c = m_1.body.children; _b < _c.length; _b++) {
            var c = _c[_b];
            if (c.def instanceof heron_defs_1.FuncDef)
                r.push(c.def);
        }
    }
    r.sort(function (d1, d2) { return (d1.name < d2.name) ? -1 : (d1.name > d2.name ? 1 : 0); });
    return r;
}
function getAllRefs(node) {
    var refs = [];
    heron_ast_rewrite_1.visitAst(node, function (n) { return !n.ref || refs.push(n.ref); });
    return refs;
}
function argumentIndex(f, x) {
    return f.args.indexOf(x);
}
function getFuncParamType(f, n) {
    var type = getFuncType(f);
    var inputs = type_system_1.functionInput(type);
    if (!(inputs instanceof type_system_1.TypeArray))
        throw new Error("Function input must be a TypeArray");
    return inputs.types[n];
}
function getFuncReturnType(f) {
    var type = getFuncType(f);
    return type_system_1.functionOutput(type);
}
function funcTypeWithNArgs(n) {
    var params = [];
    for (var i = 0; i < n; ++i)
        params.push(type_system_1.typeVariable('T' + i));
    return type_system_1.functionType(type_system_1.typeArray(params), type_system_1.typeVariable('R'));
}
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
        return heron_eval_1.Types.VoidType;
    if (r.length === 1)
        return r[0];
    return type_system_1.typeArray([type_system_1.typeConstant('union'), type_system_1.typeArray(r)]);
}
function getParamType(refs, p) {
    if (p.type)
        return p.type;
    if (p.typeNode)
        return p.type = heron_eval_1.Types.getType(p.typeNode);
    var paramRefs = refs.filter(function (r) { return r.defs.indexOf(p) >= 0; });
    var types = [];
    for (var _i = 0, paramRefs_1 = paramRefs; _i < paramRefs_1.length; _i++) {
        var pr = paramRefs_1[_i];
        var expr = pr.node.expr;
        if (!expr)
            throw new Error("A parameter reference, must be an expression");
        var f = expr.functionArgument;
        if (f) {
            // Recursively analyze called functions. 
            var ref = f.func.node.ref;
            var n = argumentIndex(f, expr);
            if (ref) {
                for (var _a = 0, _b = ref.defs; _a < _b.length; _a++) {
                    var d = _b[_a];
                    if (d instanceof heron_defs_1.FuncDef && d.params.length > n)
                        types.push(getFuncParamType(d, n));
                }
            }
        }
        f = expr.calledFunction;
        if (f) {
            var n = f.args.length;
            types.push(funcTypeWithNArgs(n));
        }
    }
    return p.type = typeUnion(types);
}
function getFuncType(f) {
    if (f.type)
        return f.type;
    // This is a temporary.
    f.type = funcTypeWithNArgs(f.params.length);
    var refs = getAllRefs(f.body);
    var paramTypes = f.params.map(function (p) { return getParamType(refs, p); });
    var retType = f.retTypeNode ? heron_eval_1.Types.getType(f.retTypeNode) : heron_eval_1.Types.AnyType;
    var inputType = type_system_1.typeArray(paramTypes);
    return f.type = type_system_1.functionType(inputType, retType);
}
function analyzeFunctions(pkg) {
    var funcs = getAllFuncDefs(pkg);
    for (var _i = 0, funcs_1 = funcs; _i < funcs_1.length; _i++) {
        var f = funcs_1[_i];
        var t = getFuncType(f);
        console.log(f.name + ' : ' + t.toString());
    }
    // * Get all of the functions from all of the modules. 
    // * Look at how they are all used
    // * Do they have a type signature? 
    // * If not what would their type signature be? T0, T1, T2: T3
    // * So what are the constraints on the various type signatures? 
    // * There are a lot of functions called on each one. 
    // * basically what is the trait. 
    // * Should the trait have "T1" / "T2" or somethiin
}
function tests() {
    var inputFiles = ['geometry-vector3', 'array', 'test'];
    var pkg = heron_compiler_1.createPackage(inputFiles);
    //outputPackageStats(pkg);
    // find the main entry point and call into it. 
    var modName = 'heron:tests:0.1';
    var mainMod = pkg.getModule(modName);
    if (!mainMod)
        throw new Error("Could not find module: " + modName);
    var mainFunc = findFunc(mainMod, 'main');
    if (!mainFunc)
        throw new Error("Could not find entry point function " + modName + "." + mainFunc);
    var evaluator = new heron_eval_1.Evaluator();
    // Try to figure out the value of all the called functions. 
    //evaluator.evalFunc(mainFunc);
    // Look at the usages of each parameter in each function.
    analyzeFunctions(pkg);
    console.log('Done');
}
/*
testParseExpr("2 + 3");
testParseCode("2 + 3", g.additiveExpr);
testParseCode("2 + 3", g.relationalExpr);
testParseCode("2 + 3", g.equalityExpr);
testParseCode("2 + 3", g.logicalAndExpr);
testParseCode("2 + 3", g.logicalXOrExpr);
testParseCode("2 + 3", g.logicalOrExpr);
testParseCode("2 + 3", g.rangeExpr);
testParseCode("2 + 3", g.conditionalExpr);
testParseCode("2 + 3", g.assignmentExpr);
*/
//testParseFile('.\\tests\\seascape.heron');
//testParseFile('.\\tests\\stdlib.heron');
//testParseFile('.\\inputs\\geometry-vector3.heron');
//testParseFile('.\\inputs\\intrinsics.heron');
tests();
process.exit();
//# sourceMappingURL=tests.js.map