"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The kind of the reference
var RefType;
(function (RefType) {
    RefType[RefType["fun"] = 0] = "fun";
    RefType[RefType["var"] = 1] = "var";
    RefType[RefType["type"] = 2] = "type";
    RefType[RefType["arg"] = 3] = "arg";
    RefType[RefType["lvalue"] = 4] = "lvalue";
    RefType[RefType["rvalue"] = 5] = "rvalue";
})(RefType = exports.RefType || (exports.RefType = {}));
// A reference to one or more definitions.
var Ref = /** @class */ (function () {
    function Ref(name, node, usageType) {
        this.name = name;
        this.node = node;
        this.usageType = usageType;
        // This value is set manually
        this.defs = [];
        node['ref'] = this;
    }
    Object.defineProperty(Ref.prototype, "usageTypeString", {
        get: function () {
            switch (this.usageType) {
                case RefType.arg: return 'arg';
                case RefType.fun: return 'fun';
                case RefType.lvalue: return 'lval';
                case RefType.rvalue: return 'rval';
                case RefType.type: return 'type';
                case RefType.var: return 'var';
            }
            throw new Error("Not a handled usage type");
        },
        enumerable: true,
        configurable: true
    });
    Ref.prototype.toString = function () {
        return this.name + '_' + this.node['id'] + ':' + this.node.name + ':' + this.usageTypeString;
    };
    return Ref;
}());
exports.Ref = Ref;
//# sourceMappingURL=heron-refs.js.map