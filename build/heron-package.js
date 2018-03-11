"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_defs_1 = require("./heron-defs");
var heron_refs_1 = require("./heron-refs");
var heron_scope_analysis_1 = require("./heron-scope-analysis");
var heron_expr_1 = require("./heron-expr");
var heron_types_1 = require("./heron-types");
// A package is a compiled system. It contains a set of modules in different source files. 
var Package = /** @class */ (function () {
    function Package() {
        this.modules = [];
        this.scope = new heron_scope_analysis_1.Scope(null);
        this.scopes = [this.scope];
        this.refs = [];
        this.defs = [];
        this.files = [];
    }
    // When done adding files call "processModules" to sort the dependencies 
    Package.prototype.addFile = function (node, intrinsic, filePath) {
        heron_ast_rewrite_1.validateNode(node, 'file');
        var langVerNode = heron_ast_rewrite_1.validateNode(node.children[0], 'langVerURN');
        var langVer = this.parseURN(langVerNode);
        if (langVer.length != 3)
            heron_ast_rewrite_1.throwError(langVerNode, "Expected three component to language version URN: name, flavor, and version");
        var file = new SourceFile(node, intrinsic, filePath, langVerNode.allText);
        var moduleNode = heron_ast_rewrite_1.validateNode(node.children[1], 'module');
        var moduleNameNode = heron_ast_rewrite_1.validateNode(moduleNode.children[0], 'moduleName');
        var moduleBodyNode = heron_ast_rewrite_1.validateNode(moduleNode.children[1], 'moduleBody');
        var moduleNameURN = this.parseModuleName(moduleNameNode);
        var importNodes = moduleBodyNode.children.filter(function (c) { return c.name === 'import'; });
        var importURNs = importNodes.map(this.parseModuleName);
        var module = new Module(moduleNode, moduleNameURN, file, importURNs);
        this.files.push(file);
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
    // Called once all of the files have been added. 
    Package.prototype.processModules = function () {
        // Order modules, so that dependencies are resolved correctly. 
        // A module cannot have a cyclical dependency
        this.sortModuleDependencies();
        // The visitor will be used for adding scopes and references
        var visitor = new AstVisitor();
        // Iterate over the modules (they are now sorted)
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var m = _a[_i];
            var ast = m.node;
            // Perform pre-processing
            heron_ast_rewrite_1.preprocessAst(ast);
            // Create definitions 
            heron_ast_rewrite_1.visitAst(ast, heron_defs_1.createDef);
            // Add scopes and references
            if (!m.file.intrinsic)
                this.pushScope(m.node);
            visitor.visitNode(m.node, this);
            if (!m.file.intrinsic)
                this.popScope();
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
        var scope = new heron_scope_analysis_1.Scope(node);
        scope.id = this.scopes.length;
        this.scopes.push(scope);
        this.scope.children.push(scope);
        scope.parent = this.scope;
        this.scope = scope;
    };
    Package.prototype.popScope = function () {
        this.scope = this.scope.parent;
    };
    Package.prototype.findDefs = function (name) {
        return this.scope.findDefs(name);
    };
    Package.prototype.addDef = function (def) {
        if (!def)
            throw new Error('Missing def as function argument to addDef');
        // We need to avoid double adding a def. 
        // This can happen because modules pre-scan their children for all definitions, 
        // so that they are present for each function. 
        if (this.defs.indexOf(def) < 0) {
            this.scope.defs.push(def);
            this.defs.push(def);
        }
    };
    Package.prototype.addRef = function (name, node, refType) {
        var ref = new heron_refs_1.Ref(node, name, this.scope, refType, this.findDefs(name));
        this.scope.refs.push(ref);
        this.refs.push(ref);
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
// Used for visiting nodes in the Heron node looking for name defintions, usages, and scopes.
var AstVisitor = /** @class */ (function () {
    function AstVisitor() {
    }
    // Visitor helper functions
    AstVisitor.prototype.visitNode = function (node, state) {
        if (node['def'])
            state.addDef(node['def']);
        var fnName = 'visit_' + node.name;
        if (fnName in this)
            this[fnName](node, state);
        else
            this.visitChildren(node, state);
    };
    AstVisitor.prototype.visitChildren = function (node, state) {
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            this.visitNode(child, state);
        }
    };
    // Particular node visitors 
    AstVisitor.prototype.visit_compoundStatement = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_funcDef = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_intrinsicDef = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_typeName = function (node, state) {
        state.addRef(node.allText, node, heron_refs_1.RefType.type);
    };
    AstVisitor.prototype.visit_lambdaBody = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_lambdaExpr = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_module = function (node, state) {
        // All definitions at the module level, are available to all others.
        for (var _i = 0, _a = node.children[1].children; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c['def'])
                state.addDef(c['def']);
        }
        this.visitChildren(node, state);
    };
    AstVisitor.prototype.visit_recCompoundStatement = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_varExpr = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_varName = function (node, state) {
        state.addRef(node.allText, node, heron_refs_1.RefType.var);
    };
    return AstVisitor;
}());
//# sourceMappingURL=heron-package.js.map