"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heron_refs_1 = require("./heron-refs");
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
            this[fnName](node, state);
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
        state.addRef(node.allText, node, heron_refs_1.RefType.type);
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
    NameAnalyzer.prototype.visit_recCompoundStatement = function (node, state) {
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
        state.addRef(node.allText, node, heron_refs_1.RefType.var);
    };
    return NameAnalyzer;
}());
exports.NameAnalyzer = NameAnalyzer;
//# sourceMappingURL=heron-name-analysis.js.map