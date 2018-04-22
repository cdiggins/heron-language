"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Scope used for the purpose of name analysis creating ref/def chains.
 * A scope contains unique name declarations. Scopes are arranaged in a tree.
 */
var Scope = /** @class */ (function () {
    function Scope(node) {
        this.node = node;
        this.id = 0;
        this.refs = [];
        this.defs = [];
        this.children = [];
        this.parent = null;
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
function nodeId(node) {
    return node ? node.name + '_' + node['id'] : '';
}
exports.nodeId = nodeId;
exports.scopeType = ['funcDef', 'instrinsicDef', 'module', 'varExpr', 'compoundStatement'];
// Used for visiting nodes in the Heron node looking for name defintions, usages, and scopes.
var NameAnalyzer = /** @class */ (function () {
    function NameAnalyzer() {
    }
    // Visitor helper functions
    NameAnalyzer.prototype.visitNode = function (node, state) {
        if (node.def)
            state.addDef(node.def);
        var fnName = 'visit_' + node.name;
        if (fnName in this)
            (this[fnName])(node, state);
        else
            this.visitChildren(node, state);
    };
    NameAnalyzer.prototype.visitChildren = function (node, state) {
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            this.visitNode(child, state);
        }
    };
    // Particular node visitors 
    NameAnalyzer.prototype.visit_compoundStatement = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    NameAnalyzer.prototype.visit_forLoop = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    NameAnalyzer.prototype.visit_funcDef = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    NameAnalyzer.prototype.visit_intrinsicDef = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    NameAnalyzer.prototype.visit_typeName = function (node, state) {
        state.addRef(node.allText, node);
    };
    NameAnalyzer.prototype.visit_lambdaBody = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    NameAnalyzer.prototype.visit_lambdaExpr = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    NameAnalyzer.prototype.visit_varExpr = function (node, state) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    };
    NameAnalyzer.prototype.visit_varName = function (node, state) {
        state.addRef(node.allText, node);
    };
    return NameAnalyzer;
}());
exports.NameAnalyzer = NameAnalyzer;
//# sourceMappingURL=heron-name-analysis.js.map