"use strict";
// This module provides support for dealing with reference. 
// A reference is a name (identifier) that refers to a definition.
// There can be more than one definitions (for examples when dealing with overloaded functions)
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
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
// A reference to one or more definitions.
var Ref = /** @class */ (function () {
    function Ref(node, name, scope, defs) {
        this.node = node;
        this.name = name;
        this.scope = scope;
        this.defs = defs;
        node.ref = this;
        if (defs.length === 0)
            heron_ast_rewrite_1.throwError(node, 'No definition found for ' + name);
    }
    Ref.prototype.toString = function () {
        return this.name + '_' + this.node['id'] + ':' + this.node.name + '[' + this.defs.join(', ') + ']';
    };
    return Ref;
}());
exports.Ref = Ref;
var VarRef = /** @class */ (function (_super) {
    __extends(VarRef, _super);
    function VarRef(node, name, scope, def) {
        var _this = _super.call(this, node, name, scope, [def]) || this;
        _this.node = node;
        _this.name = name;
        _this.scope = scope;
        _this.def = def;
        return _this;
    }
    return VarRef;
}(Ref));
exports.VarRef = VarRef;
var ForLoopVarRef = /** @class */ (function (_super) {
    __extends(ForLoopVarRef, _super);
    function ForLoopVarRef(node, name, scope, def) {
        var _this = _super.call(this, node, name, scope, [def]) || this;
        _this.node = node;
        _this.name = name;
        _this.scope = scope;
        _this.def = def;
        return _this;
    }
    return ForLoopVarRef;
}(Ref));
exports.ForLoopVarRef = ForLoopVarRef;
var FuncParamRef = /** @class */ (function (_super) {
    __extends(FuncParamRef, _super);
    function FuncParamRef(node, name, scope, def) {
        var _this = _super.call(this, node, name, scope, [def]) || this;
        _this.node = node;
        _this.name = name;
        _this.scope = scope;
        _this.def = def;
        return _this;
    }
    return FuncParamRef;
}(Ref));
exports.FuncParamRef = FuncParamRef;
var TypeRef = /** @class */ (function (_super) {
    __extends(TypeRef, _super);
    function TypeRef(node, name, scope, def) {
        var _this = _super.call(this, node, name, scope, [def]) || this;
        _this.node = node;
        _this.name = name;
        _this.scope = scope;
        _this.def = def;
        return _this;
    }
    return TypeRef;
}(Ref));
exports.TypeRef = TypeRef;
var TypeParamRef = /** @class */ (function (_super) {
    __extends(TypeParamRef, _super);
    function TypeParamRef(node, name, scope, def) {
        var _this = _super.call(this, node, name, scope, [def]) || this;
        _this.node = node;
        _this.name = name;
        _this.scope = scope;
        _this.def = def;
        return _this;
    }
    return TypeParamRef;
}(Ref));
exports.TypeParamRef = TypeParamRef;
var FuncRef = /** @class */ (function (_super) {
    __extends(FuncRef, _super);
    function FuncRef(node, name, scope, defs) {
        var _this = _super.call(this, node, name, scope, defs) || this;
        _this.node = node;
        _this.name = name;
        _this.scope = scope;
        _this.defs = defs;
        return _this;
    }
    return FuncRef;
}(Ref));
exports.FuncRef = FuncRef;
//# sourceMappingURL=heron-refs.js.map