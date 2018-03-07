"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var myna_1 = require("myna-parser/myna");
var heron_name_analysis_1 = require("./heron-name-analysis");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_type_analysis_1 = require("./heron-type-analysis");
var heron_parser_1 = require("./heron-parser");
var g = heron_parser_1.heronGrammar;
var fs = require('fs');
var path = require('path');
var nodePackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var ver = nodePackage.version;
var flavor = 'std';
var ext = '.heron';
// After processing and transforming the nodes in the AST tree they 
// are extended with the following new properties. 
// This is not a JavaScript class: you don't have a typeof.
var HeronAstNode = /** @class */ (function (_super) {
    __extends(HeronAstNode, _super);
    function HeronAstNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HeronAstNode;
}(myna_1.Myna.AstNode));
exports.HeronAstNode = HeronAstNode;
// Module resolution
exports.moduleFolder = path.join('.', 'inputs');
exports.defaultModules = ['intrinsics'];
exports.modules = [];
//================================================================
// Main functions 
function createPackage(moduleNames) {
    var pkg = new heron_name_analysis_1.Package();
    loadDefaultModules(pkg);
    for (var _i = 0, moduleNames_1 = moduleNames; _i < moduleNames_1.length; _i++) {
        var m = moduleNames_1[_i];
        parseModule(m, false, pkg);
    }
    pkg.resolveLinks();
    return pkg;
}
exports.createPackage = createPackage;
//================================================================
function scanAllModules() {
    var path = exports.moduleFolder + exports.defaultModules;
    var files = fs.readdirSync(path);
    throw new Error("Not finished yet");
}
exports.scanAllModules = scanAllModules;
function moduleNameToPath(f) {
    return path.join(exports.moduleFolder, f + ext);
}
exports.moduleNameToPath = moduleNameToPath;
function parseModule(moduleName, builtIn, pkg) {
    var modulePath = moduleNameToPath(moduleName);
    parseFile(modulePath, builtIn, pkg);
}
exports.parseModule = parseModule;
function loadDefaultModules(pkg) {
    for (var _i = 0, defaultModules_1 = exports.defaultModules; _i < defaultModules_1.length; _i++) {
        var moduleName = defaultModules_1[_i];
        parseModule(moduleName, true, pkg);
    }
}
exports.loadDefaultModules = loadDefaultModules;
function parseFile(f, builtIn, pkg) {
    var outputFile = f.substring(0, f.lastIndexOf('.')) + '.output.heron';
    var code = fs.readFileSync(f, 'utf-8');
    var mynaAst = heron_parser_1.parseHeron(code, g.file);
    var ast = toHeronAst(mynaAst, pkg, builtIn, f);
    return ast;
}
exports.parseFile = parseFile;
// Convert a generic Myna AST tree into a proper Heron AST. 
function toHeronAst(ast, pkg, builtIn, filePath) {
    // Perform pre-processing
    ast = heron_ast_rewrite_1.preprocessAst(ast);
    // Adding the file to the package, does a name analysis.
    pkg.addFile(ast, builtIn, filePath);
    // All expressions are assigned types (WIP)
    heron_type_analysis_1.computeTypes(ast);
    // Type-cast the node.
    return ast;
}
exports.toHeronAst = toHeronAst;
//# sourceMappingURL=heron-compiler.js.map