"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_parser_1 = require("./heron-parser");
var heron_package_1 = require("./heron-package");
var heron_types_1 = require("./heron-types");
var g = heron_parser_1.heronGrammar;
var fs = require('fs');
var path = require('path');
// TODO: use or throw out.
//const nodePackage = JSON.parse(fs.readFileSync('package.json','utf8'));
//const ver = nodePackage.version; 
//const flavor = 'std';
var ext = '.heron';
// Module resolution
exports.moduleFolder = path.join('.', 'input');
exports.outputFolder = path.join('.', 'output');
exports.intrinsicModules = ['intrinsics'];
exports.modules = [];
//================================================================
// Main functions 
function createPackage(moduleNames) {
    var pkg = new heron_package_1.Package();
    // Load the intrinsic (built-in) modules
    for (var _i = 0, intrinsicModules_1 = exports.intrinsicModules; _i < intrinsicModules_1.length; _i++) {
        var name_1 = intrinsicModules_1[_i];
        addModuleToPackage(name_1, true, pkg);
    }
    // Load the specified modules (any order)    
    for (var _a = 0, moduleNames_1 = moduleNames; _a < moduleNames_1.length; _a++) {
        var name_2 = moduleNames_1[_a];
        addModuleToPackage(name_2, false, pkg);
    }
    // The package is doing the heavy lifting 
    pkg.processModules();
    // Compute types 
    for (var _b = 0, _c = pkg.allFuncDefs; _b < _c.length; _b++) {
        var f = _c[_b];
        heron_types_1.computeFuncType(f);
    }
    return pkg;
}
exports.createPackage = createPackage;
function addModuleToPackage(name, intrinsic, pkg) {
    var modulePath = moduleNameToPath(name);
    var ast = parseFile(modulePath);
    if (ast)
        pkg.addFile(ast, intrinsic, modulePath);
}
exports.addModuleToPackage = addModuleToPackage;
function moduleNameToPath(f) {
    return path.join(exports.moduleFolder, f + ext);
}
exports.moduleNameToPath = moduleNameToPath;
function parseModule(moduleName) {
    var modulePath = moduleNameToPath(moduleName);
    return parseFile(modulePath);
}
exports.parseModule = parseModule;
function parseFile(f) {
    try {
        var code = fs.readFileSync(f, 'utf-8');
        var ast = heron_parser_1.parseHeron(code, g.file);
        return ast;
    }
    catch (e) {
        console.log("An error occurred while parsing " + f);
        console.log(e.message);
        return null;
    }
}
exports.parseFile = parseFile;
//# sourceMappingURL=heron-compiler.js.map