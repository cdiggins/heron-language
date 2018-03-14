"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function nodeId(node) {
    return node ? node.name + '_' + node['id'] : '';
}
exports.nodeId = nodeId;
exports.scopeType = ['funcDef', 'instrinsicDef', 'module', 'varExpr', 'compoundStatement'];
function isValidScopeType(s) {
    return exports.scopeType.indexOf(s) >= 0;
}
//# sourceMappingURL=heron-scope.js.map