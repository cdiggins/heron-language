"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Myna = require("myna-parser");
var heron_parser_1 = require("./heron-parser");
var heron_compiler_1 = require("./heron-compiler");
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
    [g.expr, ['a?b:(c)'], ['f > max ? max : (f < min ? min) : f']],
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
function outputPackageStats(pkg) {
    console.log("Files: ");
    console.log(pkg.files);
    console.log("# Modules  : " + pkg.modules.length);
    console.log("# Scopes   : " + pkg.scopes.length);
    console.log("# Defs     : " + pkg.defs.length);
    console.log("# Usages   : " + pkg.usages.length);
}
function tests() {
    // TODO: eventually we need to pre-scan the files    
    var inputs = ['geometry-vector3'];
    var pkg = heron_compiler_1.createPackage(inputs);
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