"use strict";
// This module is used for computing scopes and resolving 
// references to definitions. A name means different things depending on 
// the scope. Scopes are managed in a Package, which represents the 
// entire set of compiled source code. 
Object.defineProperty(exports, "__esModule", { value: true });
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_defs_1 = require("./heron-defs");
var heron_refs_1 = require("./heron-refs");
// A scope contains unique name declarations. Scopes are arranaged in a tree. 
var Scope = /** @class */ (function () {
    function Scope(node) {
        this.node = node;
        this.id = 0;
        this.refs = [];
        this.defs = [];
        this.children = [];
        if (node)
            node['scope'] = this;
    }
    // We can find multiple defs at the same level (e.g. functions)
    Scope.prototype.findDefs = function (name) {
        var r = [];
        for (var _i = 0, _a = this.defs; _i < _a.length; _i++) {
            var d = _a[_i];
            if (d.name === name)
                r.push(d);
        }
        if (r.length > 0)
            return r;
        return this.parent
            ? this.parent.findDefs(name)
            : [];
    };
    Scope.prototype.allDefs = function (r) {
        if (r === void 0) { r = []; }
        r.push.apply(r, this.defs);
        this.children.forEach(function (c) { return c.allDefs(r); });
        return r;
    };
    Scope.prototype.allRefs = function (r) {
        if (r === void 0) { r = []; }
        r.push.apply(r, this.refs);
        this.children.forEach(function (c) { return c.allRefs(r); });
        return r;
    };
    Scope.prototype.allScopes = function (r) {
        if (r === void 0) { r = []; }
        r.push(this);
        this.children.forEach(function (c) { return c.allScopes(r); });
        return r;
    };
    Scope.prototype.toString = function () {
        if (!this.node)
            return "__global__";
        return nodeId(this.node);
    };
    return Scope;
}());
exports.Scope = Scope;
// Wraps a source file 
var SourceFile = /** @class */ (function () {
    function SourceFile(filePath, node) {
        this.filePath = filePath;
        this.node = node;
    }
    return SourceFile;
}());
exports.SourceFile = SourceFile;
// A package is a compiled system. It contains a set of modules. 
// This is built incrementally by a visitor and stores all scopes, definitions, 
// and references that are found. 
var Package = /** @class */ (function () {
    function Package() {
        this.modules = [];
        this.scope = new Scope(null);
        this.scopes = [this.scope];
        this.refs = [];
        this.defs = [];
        this.files = [];
    }
    // When done calling analyzeFile on all files, call "resolveLinks"
    Package.prototype.addFile = function (node, isBuiltIn, filePath) {
        if (node.name !== 'file')
            heron_ast_rewrite_1.throwError(node, 'Not a file');
        node['file'] = filePath;
        var visitor = new AstVisitor();
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.name !== 'module')
                continue;
            // Built in modules have their names added to the global scope
            if (!isBuiltIn)
                this.pushScope(node);
            var modName = node.children[0].allText;
            var module = new heron_defs_1.ModuleDef(node, modName);
            this.modules.push(module);
            visitor.visitNode(node, this);
            // Built in modules have their names added to the global scope
            if (!isBuiltIn)
                this.popScope();
        }
        this.files.push(new SourceFile(filePath, node));
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
        var scope = new Scope(node);
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
function nodeId(node) {
    return node ? node.name + '_' + node['id'] : '';
}
exports.nodeId = nodeId;
exports.scopeType = ['funcDef', 'instrinsicDef', 'module', 'varExpr', 'compoundStatement'];
function isValidScopeType(s) {
    return exports.scopeType.indexOf(s) >= 0;
}
//# sourceMappingURL=heron-scope-analysis.js.map