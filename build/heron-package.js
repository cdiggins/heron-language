"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_defs_1 = require("./heron-defs");
var heron_refs_1 = require("./heron-refs");
var heron_expr_1 = require("./heron-expr");
var heron_name_analysis_1 = require("./heron-name-analysis");
var heron_statement_1 = require("./heron-statement");
// A package is a compiled system. It contains a set of modules in different source files. 
var Package = /** @class */ (function () {
    function Package() {
        this.modules = [];
        this.scope = new heron_name_analysis_1.Scope(null);
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
    Package.prototype.findFunction = function (name) {
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var m = _a[_i];
            for (var _b = 0, _c = m.functions; _b < _c.length; _b++) {
                var f = _c[_b];
                if (f.name === name)
                    return f;
            }
        }
    };
    Object.defineProperty(Package.prototype, "allFuncDefs", {
        get: function () {
            var r = [];
            for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
                var m = _a[_i];
                for (var _b = 0, _c = m.body.children; _b < _c.length; _b++) {
                    var c = _c[_b];
                    if (c.def instanceof heron_defs_1.FuncDef)
                        r.push(c.def);
                }
            }
            r.sort(function (d1, d2) { return (d1.name < d2.name) ? -1 : (d1.name > d2.name ? 1 : 0); });
            return r;
        },
        enumerable: true,
        configurable: true
    });
    // When done adding files call "processModules" to sort the dependencies 
    Package.prototype.addFile = function (node, intrinsic, filePath) {
        var _this = this;
        heron_ast_rewrite_1.validateNode(node, 'file');
        var langVerNode = heron_ast_rewrite_1.validateNode(node.children[0], 'langVer');
        //let langVer = this.parseURN(langVerNode);
        //if (langVer.length != 3) throwError(langVerNode, "Expected three component to language version URN: name, flavor, and version")
        var file = new SourceFile(node, intrinsic, filePath, langVerNode.allText);
        this.files.push(file);
        var moduleNode = heron_ast_rewrite_1.validateNode(node.children[1], 'module');
        var moduleNameNode = heron_ast_rewrite_1.validateNode(moduleNode.children[0], 'moduleName');
        var moduleBodyNode = heron_ast_rewrite_1.validateNode(moduleNode.children[1], 'moduleBody');
        var moduleNameURN = this.parseModuleName(moduleNameNode);
        var importNodes = moduleBodyNode.children.filter(function (c) { return c.name === 'importStatement'; });
        var importURNs = importNodes.map(function (n) { return _this.parseModuleName(n.children[0]); });
        var module = new Module(moduleNode, moduleNameURN, file, importURNs, moduleBodyNode);
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
            if (c.def) {
                // Func def or type def 
                this.addDef(c.def);
            }
            else if (c.statement instanceof heron_statement_1.VarDeclStatement) {
                // If a variable declaration there are potentially multiple variable defs 
                for (var _b = 0, _c = c.statement.vars; _b < _c.length; _b++) {
                    var vd = _c[_b];
                    this.addDef(vd);
                }
            }
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
            // Create expressions, and add them to the nodes
            heron_ast_rewrite_1.visitAst(ast, heron_expr_1.createExpr);
            // Create statement, and add them to the nodes
            heron_ast_rewrite_1.visitAst(ast, heron_statement_1.createStatement);
            // Rewrite the if statements 
            //visitAst(ast, rewriteIfStatements);
        }
        // Analyze names for each module.
        for (var _b = 0, _c = this.modules; _b < _c.length; _b++) {
            var m = _c[_b];
            this.pushScope(m.node);
            // Firt load all intrinsic definitions into the global scope
            for (var _d = 0, _e = this.modules; _d < _e.length; _d++) {
                var m_1 = _e[_d];
                if (m_1.file.intrinsic)
                    this.loadModuleDefs(m_1);
            }
            this.loadModuleDependencies(m);
            this.loadModuleDefs(m);
            nameAnalyzer.visitNode(m.node, this);
            this.popScope();
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
        var scope = new heron_name_analysis_1.Scope(node);
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
    Package.prototype.addRef = function (name, node) {
        var defs = this.findDefs(name);
        if (defs.length === 0)
            heron_ast_rewrite_1.throwError(node, "Could not find defintiions for " + name);
        var ref;
        if (defs[0] instanceof heron_defs_1.FuncDef) {
            if (!defs.every(function (d) { return d instanceof heron_defs_1.FuncDef; }))
                heron_ast_rewrite_1.throwError(node, "Reference resolved to mix of function definitions and variable definitions: " + name);
            ref = new heron_refs_1.FuncRef(node, name, this.scope, defs);
        }
        else {
            if (defs.length !== 1)
                heron_ast_rewrite_1.throwError(node, "Reference resolved to multiple variable definitions: " + name);
            var def = defs[0];
            if (def instanceof heron_defs_1.TypeDef) {
                ref = new heron_refs_1.TypeRef(node, name, this.scope, def);
            }
            else if (def instanceof heron_defs_1.TypeParamDef) {
                ref = new heron_refs_1.TypeParamRef(node, name, this.scope, def);
            }
            else if (def instanceof heron_defs_1.FuncParamDef) {
                ref = new heron_refs_1.FuncParamRef(node, name, this.scope, def);
            }
            else if (def instanceof heron_defs_1.VarDef) {
                ref = new heron_refs_1.VarRef(node, name, this.scope, def);
            }
            else if (def instanceof heron_defs_1.ForLoopVarDef) {
                ref = new heron_refs_1.ForLoopVarRef(node, name, this.scope, def);
            }
            else {
                heron_ast_rewrite_1.throwError(node, "Unrecognized definition type " + def);
            }
        }
        this.scope.refs.push(ref);
        return ref;
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
    function Module(node, name, file, imports, body) {
        this.node = node;
        this.name = name;
        this.file = file;
        this.imports = imports;
        this.body = body;
    }
    Object.defineProperty(Module.prototype, "functions", {
        get: function () {
            var r = [];
            for (var _i = 0, _a = this.body.children.map(function (c) { return c.def; }); _i < _a.length; _i++) {
                var x = _a[_i];
                if (x && x instanceof heron_defs_1.FuncDef)
                    r.push(x);
            }
            return r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "vars", {
        get: function () {
            var r = [];
            for (var _i = 0, _a = this.body.children; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x.statement instanceof heron_statement_1.VarDeclStatement)
                    for (var _b = 0, _c = x.statement.vars; _b < _c.length; _b++) {
                        var vd = _c[_b];
                        r.push(vd);
                    }
            }
            return r;
        },
        enumerable: true,
        configurable: true
    });
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=heron-package.js.map