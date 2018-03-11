"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_parser_1 = require("./heron-parser");
var heron_to_text_1 = require("./heron-to-text");
var heron_package_1 = require("./heron-package");
var g = heron_parser_1.heronGrammar;
var fs = require('fs');
var path = require('path');
var nodePackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var ver = nodePackage.version;
var flavor = 'std';
var ext = '.heron';
// Module resolution
exports.moduleFolder = path.join('.', 'inputs');
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
    for (var _b = 0, _c = pkg.files; _b < _c.length; _b++) {
        var sf = _c[_b];
        var outputPath = sf.filePath.substr(0, sf.filePath.lastIndexOf('.')) + '.output.heron';
        var text = heron_to_text_1.heronToText(sf.node);
        fs.writeFileSync(outputPath, text);
    }
    return pkg;
}
exports.createPackage = createPackage;
function addModuleToPackage(moduleName, intrinsic, pkg) {
    var modulePath = moduleNameToPath(name);
    var ast = parseFile(modulePath);
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
    var outputFile = f.substring(0, f.lastIndexOf('.')) + '.output.heron';
    var code = fs.readFileSync(f, 'utf-8');
    var ast = heron_parser_1.parseHeron(code, g.file);
    return ast;
}
exports.parseFile = parseFile;
//# sourceMappingURL=heron-compiler.js.map