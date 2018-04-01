import * as Myna from "myna-parser";
import { heronGrammar, parseHeron } from './heron-parser';
import { heronToJs } from "./heron-to-js";
import { HeronAstNode, preprocessAst, parseLocation, visitAst, throwError } from "./heron-ast-rewrite";
import { heronToText } from "./heron-to-text";
import { parseFile, parseModule, createPackage } from "./heron-compiler";
import { Ref } from "./heron-refs";
import { Package, Module } from "./heron-package";
import { FuncDef, FuncParamDef } from "./heron-defs";
//import { Evaluator, Types, union, analyzeFunctions, findFunc } from "./heron-eval";
import { FunCall, Expr } from "./heron-expr";
import { getTraits } from "./heron-traits";
import { computeFuncType, callFunction } from "./heron-types";
import { parseType } from "./type-parser";
import { PolyType, TypeResolver } from "./type-system";

const m = Myna.Myna;
const g = heronGrammar;

declare var require;
const assert = require('assert');

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
    for (var i=0; i < a.children.length; ++i)
        if (!compareAst(a.children[i], b.children[i]))
            return false;
    return true;
}

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

declare var require;
const fs = require('fs');

// TODO: add parent pointers to each node, and an ID, and a reverse index lookup. 
// after the rewrite phase

function functionSigToString(node: HeronAstNode) {
    if (node.name === 'funcDef')
        return "function " + node.children[0].allText;
    if (node.name === 'intrinsicDef')
        return "intrinsic " + node.children[0].allText;
    throw new Error("Node has no signature" + node.name);
}

function refDetails(ref: Ref): string {
    return `Ref Details
${parseLocation(ref.node)}
    ref = ${ref.toString()}
    name = ${ref.name}
    node = ${ref.node['id']}    
    expr = ${ref.node['expr']}
    ${ref.defs}`;
}

function outputPackageStats(pkg: Package) {
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

function outputTraits(pkg: Package) {
    const traits = getTraits(pkg);
    for (const t of traits) {
        console.log("Trait " + t.type);
        for (const f of t.funcs) {
            console.log("  " +f.toString())
        }
    }
}

function outputFunctionTypes(pkg: Package) {
    for (const f of pkg.allFuncDefs) {
        let t = computeFuncType(f);
        if (f.body) {
            console.log(f.toString());
            console.log(" : " + t);
        }
    }
}

function testParseType(expr: string) {
    const t = parseType(expr);
    console.log(expr);
    console.log(" : " + t);
}

function testParseTypes() {
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

function testCallFunctions() {
    const map = "(Func (Array 'A) (Func 'A 'B) (Array 'B))";
    const tests = [
        ["(Func 'A 'A)", "(Num)"],
        ["(Func 'A 'B ('B 'A))", "(Num Bool)"],
        [map, "((Array Num) (Func Num Str))"],        
    ];
    for (const t of tests) {
        const f = parseType(t[0]) as PolyType;
        const args = parseType(t[1]) as PolyType;
        const r = callFunction(f, args.types, new TypeResolver((a, b) => { throw new Error("Inconsistent types"); }));
        console.log("func   : " + f);
        console.log("args   : " + args);
        console.log("result : " + r);
    }
}

function tests() {
    //testParsingRules();
    //testParseTypes();
    //testCallFunctions();

    let inputFiles = ['geometry-vector3', 'array', 'test'];
    let pkg = createPackage(inputFiles);
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