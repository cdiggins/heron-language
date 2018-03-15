"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_defs_1 = require("./heron-defs");
var heron_refs_1 = require("./heron-refs");
var heron_scope_1 = require("./heron-scope");
var heron_expr_1 = require("./heron-expr");
var heron_types_1 = require("./heron-types");
var heron_name_analysis_1 = require("./heron-name-analysis");
// A package is a compiled system. It contains a set of modules in different source files. 
var Package = /** @class */ (function () {
    function Package() {
        this.modules = [];
        this.scope = new heron_scope_1.Scope(null);
        this.scopes = [this.scope];
        this.files = [];
    }
    Object.defineProperty(Package.prototype, "defs", {
        get: function () {
            return this.scope.allDefs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Package.prototype, "refs", {
        get: function () {
            return this.scope.allRefs();
        },
        enumerable: true,
        configurable: true
    });
    // When done adding files call "processModules" to sort the dependencies 
    Package.prototype.addFile = function (node, intrinsic, filePath) {
        var _this = this;
        heron_ast_rewrite_1.validateNode(node, 'file');
        var langVerNode = heron_ast_rewrite_1.validateNode(node.children[0], 'langVer');
        var langVer = this.parseURN(langVerNode);
        //if (langVer.length != 3) throwError(langVerNode, "Expected three component to language version URN: name, flavor, and version")
        var file = new SourceFile(node, intrinsic, filePath, langVerNode.allText);
        this.files.push(file);
        var moduleNode = heron_ast_rewrite_1.validateNode(node.children[1], 'module');
        var moduleNameNode = heron_ast_rewrite_1.validateNode(moduleNode.children[0], 'moduleName');
        var moduleBodyNode = heron_ast_rewrite_1.validateNode(moduleNode.children[1], 'moduleBody');
        var moduleNameURN = this.parseModuleName(moduleNameNode);
        var importNodes = moduleBodyNode.children.filter(function (c) { return c.name === 'importStatement'; });
        var importURNs = importNodes.map(function (n) { return _this.parseModuleName(n.children[0]); });
        var module = new Module(moduleNode, moduleNameURN, file, importURNs);
        this.modules.push(module);
    };
    // Given a URN 
    Package.prototype.parseURN = function (node) {
        return node.children.map(function (c) { return c.allText; });
    };
    // Extract the URN for a module name from the node
    Package.prototype.parseModuleName = function (node) {
        heron_ast_rewrite_1.validateNode(node, 'moduleName');
        return node.allText;
    };
    // Load the definitions of a modules
    Package.prototype.loadModuleDefs = function (module) {
        var moduleBody = heron_ast_rewrite_1.validateNode(module.node.children[1], 'moduleBody');
        for (var _i = 0, _a = moduleBody.children; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.def)
                this.addDef(c.def);
        }
    };
    // Load the definitions from the various dependent modules 
    Package.prototype.loadModuleDependencies = function (module) {
        for (var _i = 0, _a = module.imports; _i < _a.length; _i++) {
            var imp = _a[_i];
            var impMod = this.getModule(imp);
            if (!impMod)
                heron_ast_rewrite_1.throwError(module.node, "Could not find imported module " + imp);
            this.loadModuleDefs(impMod);
        }
    };
    // Called once all of the files have been added. 
    Package.prototype.processModules = function () {
        // Order modules, so that dependencies are resolved correctly. 
        // A module cannot have a cyclical dependency
        this.sortModuleDependencies();
        // The visitor will be used for adding scopes and references
        var nameAnalyzer = new heron_name_analysis_1.NameAnalyzer();
        // Iterate over the modules, pre-process their trees and create definitions. 
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var m = _a[_i];
            var ast = m.node;
            // Perform pre-processing
            heron_ast_rewrite_1.preprocessAst(ast, m.file);
            // Create definitions 
            heron_ast_rewrite_1.visitAst(ast, heron_defs_1.createDef);
        }
        // Firt load all intrinsic definitions into the global scope
        for (var _b = 0, _c = this.modules; _b < _c.length; _b++) {
            var m = _c[_b];
            if (m.file.intrinsic)
                this.loadModuleDefs(m);
        }
        // Analyze names for each module.
        var moduleScopes = {};
        for (var _d = 0, _e = this.modules; _d < _e.length; _d++) {
            var m = _e[_d];
            this.pushScope(m.node);
            this.loadModuleDependencies(m);
            this.loadModuleDefs(m);
            nameAnalyzer.visitNode(m.node, this);
            this.popScope();
        }
        // Compute expressions and types 
        for (var _f = 0, _g = this.modules; _f < _g.length; _f++) {
            var m = _g[_f];
            var ast = m.node;
            // Create expressions, and add them to the nodes
            heron_ast_rewrite_1.visitAst(ast, heron_expr_1.createExpr);
            // assign types to expressions and definitions
            heron_ast_rewrite_1.visitAst(ast, heron_types_1.computeType);
        }
    };
    // Resolves links and assures that the language 
    Package.prototype.sortModuleDependencies = function () {
        var queue = this.modules.slice();
        var result = [];
        var tmp = [];
        for (var _i = 0, queue_1 = queue; _i < queue_1.length; _i++) {
            var m = queue_1[_i];
            if (m.file.intrinsic) {
                if (m.imports.length > 0)
                    heron_ast_rewrite_1.throwError(m.node, "Intrinsic modules should not have imports");
                result.push(m);
            }
            else {
                tmp.push(m);
            }
        }
        queue = tmp;
        // Local function (recursive)
        function process(next) {
            // Check if already processed
            if (result.some(function (m) { return m.name === next; }))
                return;
            // Look for the module in the queue
            var i = queue.length;
            while (--i >= 0)
                if (queue[i].name === next)
                    break;
            if (i < 0)
                throw new Error("Could not find module named: " + next);
            var m = queue[i];
            // First process imported modules
            for (var _i = 0, _a = m.imports; _i < _a.length; _i++) {
                var importName = _a[_i];
                process(importName);
            }
            // Remove from queue 
            queue.splice(i, 1);
            // Add to the result
            result.push(m);
        }
        while (queue.length > 0)
            process(queue[0].name);
        // We have no sorted the modules according to their dependencies.
        this.modules = result;
    };
    // Scans for modules
    Package.prototype.getModule = function (name) {
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.name === name)
                return m;
        }
        throw new Error("Module not found " + name);
    };
    //=============================================
    // These functions are used by the visitor to incrementally build the package  
    Package.prototype.pushScope = function (node) {
        var scope = new heron_scope_1.Scope(node);
        scope.id = this.scopes.length;
        this.scopes.push(scope);
        this.scope.children.push(scope);
        scope.parent = this.scope;
        return this.scope = scope;
    };
    Package.prototype.popScope = function () {
        this.scope = this.scope.parent;
    };
    Package.prototype.findDefs = function (name) {
        return this.scope.findDefs(name);
    };
    Package.prototype.addDef = function (def) {
        if (def && this.scope.defs.indexOf(def) < 0)
            this.scope.defs.push(def);
    };
    Package.prototype.addRef = function (name, node, refType) {
        var ref = new heron_refs_1.Ref(node, name, this.scope, refType, this.findDefs(name));
        this.scope.refs.push(ref);
    };
    return Package;
}());
exports.Package = Package;
// Wraps a source file 
var SourceFile = /** @class */ (function () {
    function SourceFile(node, intrinsic, filePath, lang) {
        this.node = node;
        this.intrinsic = intrinsic;
        this.filePath = filePath;
        this.lang = lang;
        node.file = this;
    }
    return SourceFile;
}());
exports.SourceFile = SourceFile;
// Represents the definition of a module
var Module = /** @class */ (function () {
    function Module(node, name, file, imports) {
        this.node = node;
        this.name = name;
        this.file = file;
        this.imports = imports;
    }
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=heron-package.js.map