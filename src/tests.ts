"use strict";

import * as Myna from "myna-parser";
import { heronGrammar, parseHeron } from './heron-parser';
import { heronToJs } from "./heron-to-js";
import { transformAst } from "./heron-ast-rewrite";
import { analyzeHeronNames, NameAnalyzer, Scope } from "./heron-name-analysis";

const m = Myna.Myna;
const g = heronGrammar;

declare var require;
const assert = require('assert');

// Tests parsing an individual rule against the input input text, and returns an object 
// representing the result of running the test 
function testParse(rule, assert, text, shouldPass)  {    
    if (shouldPass == undefined) shouldPass = true;
    let result = m.failed;
    let err = undefined;    
    try {        
        let node = m.parse(rule, text);
        if (node)
            result = node.end;            
    }
    catch (e) {
        err = e;
    }

    let testResult = {
        name : rule.toString() + ' with input "' + text + '"',
        description : result + "/" + text.length,
        negative : !shouldPass,
        success : (result === text.length) !== !shouldPass,
        error : err,
        ruleDescr : rule.type + ": " + rule.toString(),
        rule : rule        
    };
    
    if (!testResult.success)
        console.log(testResult);

    assert.ok(testResult.success, testResult.name + (shouldPass ? "" : " should fail"));
}

const ruleTests = [
    [g.comment, ['/* abc */', '// abc \n', '/* abc */ /* def */ '], ['abc', '', '/*']],
    [g.funCall, ['(a, b)', '(a)', '(F )', '()'], []],
    [g.expr, ['42', '3+4', '3 + 4', '3 * (2 + 4)', '3 * 2 + 4', 'a', 'a++', 'f(1,2)', 'f(3, 5)', 'f()', 'f(12)', 'hx > 0.0'], []],
    [g.expr, ['0..1', '0 .. 1', 'f(a .. b)'], ['xs[0:5]', 'xs[4:0:-1]']],
    [g.expr, ['x => 42', '(x) => 13', 'x=>3', 'x => { return 42; }', '(x, y) => x * y'], []],
    [g.expr, ['(3)', '(3 + 2)', '(c)', '(a)+(b)', 'a+(b)', 'a+b+c', 'a?b:c', 'a?b+c:d', 'a?b:c+d','a?(b):c', '(a)?b:c'], []],
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
    for (let ruleTest of ruleTests) {
        let rule = ruleTest[0]; 
        for (let passInput of ruleTest[1]) 
            testParse(rule, assert, passInput, true);
        for (let failInput of ruleTest[2]) 
            testParse(rule, assert, failInput, false);
    }
}

// TEMP: this needs to be uncommented
// testParsingRules()

declare var require;
const fs = require('fs');

function outputScopeAnalysis(scope: Scope, indent = '')  
{        
    const nodeName = scope.node ? scope.node.name : "";
    console.log(indent + "scope[" + scope.id + "] " + nodeName);
    for (let def of scope.defs) {
        console.log(indent + "- var " + def.name + " used " + def.usages.length);
    }
    for (let child of scope.children) {
        outputScopeAnalysis(child, indent + '  ');
    }
}

function testParseCode(code, r = g.file) {
    let ast = parseHeron(code, r);
    ast = transformAst(ast);
    let names = analyzeHeronNames(ast);
    outputScopeAnalysis(names.curScope);
    let cb = heronToJs(ast);
    //console.log(cb.toString());    
}

function testParseFile(f) {
    testParseCode(fs.readFileSync(f, 'utf-8'));
}

function testParseExpr(code) {
    return testParseCode(code, g.expr);
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
testParseFile('.\\inputs\\geometry-vector3.heron');

declare var process;
process.exit();