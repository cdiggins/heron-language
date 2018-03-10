"use strict";
// This module provides support for dealing with reference. 
// A reference is a name (identifier) that refers to a definition.
// There can be more than one definitions (for examples when dealing with overloaded functions)
Object.defineProperty(exports, "__esModule", { value: true });
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
// The kind of the reference
var RefType;
(function (RefType) {
    RefType[RefType["var"] = 0] = "var";
    RefType[RefType["type"] = 1] = "type";
})(RefType = exports.RefType || (exports.RefType = {}));
// A reference to one or more definitions.
var Ref = /** @class */ (function () {
    function Ref(node, name, scope, refType, defs) {
        this.node = node;
        this.name = name;
        this.scope = scope;
        this.refType = refType;
        this.defs = defs;
        node['ref'] = this;
        if (defs.length === 0)
            heron_ast_rewrite_1.throwError(node, 'No definition found for ' + name);
    }
    Object.defineProperty(Ref.prototype, "refTypeString", {
        get: function () {
            switch (this.refType) {
                //case RefType.arg: return 'arg';
                //case RefType.fun: return 'fun';
                //case RefType.lvalue: return 'lval';
                //case RefType.rvalue: return 'rval';
                case RefType.type: return 'type';
                case RefType.var: return 'var';
            }
            heron_ast_rewrite_1.throwError(this.node, "Not a handled usage type");
        },
        enumerable: true,
        configurable: true
    });
    Ref.prototype.toString = function () {
        return this.name + '_' + this.node['id'] + ':' + this.node.name + ':' + this.refTypeString + '[' + this.defs.join(', ') + ']';
    };
    return Ref;
}());
exports.Ref = Ref;
//# sourceMappingURL=heron-refs.js.map