import * as Myna from "myna-parser";
import { heronGrammar } from './heron-parser';
import { HeronToJs, funcDefName } from "./heron-to-js";
import { parseLocation } from "./heron-ast-rewrite";
import { createPackage } from "./heron-compiler";
import { Ref } from "./heron-refs";
import { Package } from "./heron-package";
import { computeFuncType } from "./heron-types";
import { parseType } from "./type-parser";
import { normalizeType } from "./type-system";
import { heronModuleToHtml, heronPackageToHtml } from "./heron-to-html";

const m = Myna.Myna;
const g = heronGrammar;

declare var require;
const assert = require('assert');
const path = require('path');

// Assure that two ASTs have the same shape
// For example if I generate some text, and re-parse it.
/* TOOD: use or throw away.
function compareAst(a, b) {
    if (!a && b || a && !b)
        return false;
    if (a.children.length != b.children.length)
        return false;    
    if (a.children.length === 0)
        return a.allText === b.allText;
    if (a.name !== b.name)
        return false;
    for (var i=0; i < a.children.length; ++i)
        if (!compareAst(a.children[i], b.children[i]))
            return false;
    return true;
}
*/

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
    [g.expr, ['a?b:1(c)'], ['f > max ? max : (f < min ? min) : f']], 
    [g.expr, ['op+', 'f(op+)', 'f(0, op+)'], []],
    [g.expr, ['(r1+r2*cos(v))', '(r1 + r2 * cos(v))', '( r1 + r2 * cos(v) )', '( r1 + r2 * cos(v) ) * cos(u)'], []],
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

export function testParsingRules() {
    for (let ruleTest of ruleTests) {
        let rule = ruleTest[0]; 
        for (let passInput of ruleTest[1]) 
            testParse(rule, assert, passInput, true);
        for (let failInput of ruleTest[2]) 
            testParse(rule, assert, failInput, false);
    }
}

declare var require;
const fs = require('fs');

function refDetails(ref: Ref): string {
    return `Ref Details
${parseLocation(ref.node)}
    ref = ${ref.toString()}
    name = ${ref.name}
    node = ${ref.node['id']}    
    expr = ${ref.node['expr']}
    ${ref.defs}`;
}

export function outputPackageStats(pkg: Package) {
    console.log("Files: ");
    console.log(pkg.files);
    console.log("# Modules  : " + pkg.modules.length);
    console.log("# Scopes   : " + pkg.scopes.length);
    console.log("# Defs     : " + pkg.defs.length);
    console.log("# Usages   : " + pkg.refs.length);        

    let multiDefs = pkg.refs.filter(r => r.defs.length > 1);
    let zeroDefs = pkg.refs.filter(r => r.defs.length == 0);
    console.log('# Refs with multiple defs : ' + multiDefs.length)
    console.log('# Refs with zero defs : ' + zeroDefs.length)

    for (var d of multiDefs)
        console.log(refDetails(d));
}

function outputFunctionTypes(pkg: Package) {
    for (const f of pkg.allFuncDefs) {
        let t = computeFuncType(f);
        if (f.body) {
            const finalType = normalizeType(t);
            console.log(f.toString() + " :: " + finalType);
        }
    }
}

function testParseType(expr: string) {
    const t = parseType(expr);
    console.log(expr);
    console.log(" : " + t);
}

export function testParseTypes() {
    const typeStrings = [
        "(Num Num)",
        "(Func 'T0 'T1 R)",
        "(Array Num)",
        "(Array (Func 'T0 Num))",
        "(Func (Array 'T) (Func 'T 'U) (Array 'U))",
        "(Func (Array 'T) (Array 'U) (Func 'T 'U 'V) (Array 'V))",
        "(Func (Array 'T) (Array 'U) (Func 'T 'U Int 'V) (Array 'V))",
    ];
    for (const ts of typeStrings)
        testParseType(ts);
}

function tests() {
    //testParsingRules();
    //testParseTypes();
    
    let inputFiles = ['geometry-vector3', 'geometry-mesh', 'array', 'test'];
    let pkg = createPackage(inputFiles);
    
    //outputPackageStats(pkg);
    /*
    for (const sf of pkg.files) {
        const outputPath = sf.filePath.substr(0, sf.filePath.lastIndexOf('.')) + '.output.heron';
        const text = heronToText(sf.node as HeronAstNode);
        fs.writeFileSync(outputPath, text);
    }*/
    const toJs = new HeronToJs();
    for (const m of pkg.modules) {
        toJs.visit(m);        
    }
    const now = new Date();
    const library = fs.readFileSync(path.join('src', 'js-intrinsics.js'), 'utf-8');
    let text = '// Generated using Heron on ' + now.toDateString() + ' ' + now.toTimeString() + '\n'; 
    text += 'var heron = (function () {\n';
    text += library + '\n';
    text += toJs.cb.toString();
    text += '\n';
   
    // Originally we just exported the main
    // const main = pkg.findFunction("main");    

    // Now we export every function from the main module
    text += 'return {';    
    const m = pkg.getModule("heron:tests:0.1");
    for (const f of m.functions) 
        text += f.name + ' : ' + funcDefName(f) + ',\n';
    text += '};\n';
    text += '})();\n';
    text += 'heron.main()';
    //fs.writeFileSync(path.join(outputFolder, 'output.js'), text);
    fs.writeFileSync(path.join('demo', 'output.js'), text);

    //outputPackageStats(pkg);
    // find the main entry point and call into it. 
    let modName = 'heron:tests:0.1';
    let mainMod = pkg.getModule(modName);
    if (!mainMod)
        throw new Error("Could not find module: " + modName);
   
    //let mainFunc = findFunc(mainMod, 'main');
    //if (!mainFunc)
    //   throw new Error("Could not find entry point function " + modName + "." + mainFunc);
    // let evaluator = new Evaluator();
    
    // Try to figure out the value of all the called functions. 
    //evaluator.evalFunc(mainFunc);

    // Look at the usages of each parameter in each function.
    //analyzeFunctions(pkg);

    // An experiemnt for guessing Traits. 
    // I shave decided that traits need to be declared. 
    //outputTraits(pkg);

    outputFunctionTypes(pkg);

    /*
    for (const k in intrinsics)
        console.log(intrinsics[k].toString());
    */

    heronPackageToHtml(pkg);
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

declare var process;
process.exit();