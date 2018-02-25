"use strict";

import { Myna as m } from "myna-parser";
import { heronGrammar, parseHeron } from './heron-parser';
import { heronToJs } from "./heron-to-js";
import { Myna } from "myna-parser/myna";

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

for (let ruleTest of ruleTests) {
    let rule = ruleTest[0];
    for (let passInput of ruleTest[1]) 
        testParse(rule, assert, passInput, true);
    for (let failInput of ruleTest[2]) 
        testParse(rule, assert, failInput, false);
}

declare var require;
const fs = require('fs');

function testParseFile(f) {
    let heronTest = fs.readFileSync(f, 'utf-8');
    let ast = parseHeron(heronTest);
    let cb = heronToJs(ast);
    console.log(cb.toString());    
}

// TEMP: 
console.log(Myna.astSchemaToString('heron'));

//testParseFile('.\\tests\\seascape.heron');
//testParseFile('.\\tests\\stdlib.heron');
testParseFile('.\\tests\\geometry-vector3.heron');

declare var process;
process.exit();