"use strict";
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
var heron_types_1 = require("./heron-types");
// Expressions are either: named function sets, anonymous functions, function calls, variables, or literals.
// In order to work out the type we need to work out the type of the things it depends on first. 
// This can be done by creating a graph, OR by simply computing type by pulling on the thread. 
var Expr = /** @class */ (function () {
    function Expr(node, type) {
        this.node = node;
        this.type = type;
    }
    return Expr;
}());
exports.Expr = Expr;
// A named reference to a function can resolve to multiple functions, so we talk in terms of function sets.
// The type of a function set is the union of the types of each function definition it has  
var FuncSet = /** @class */ (function (_super) {
    __extends(FuncSet, _super);
    function FuncSet(node, type, defs) {
        var _this = _super.call(this, node, type) || this;
        _this.node = node;
        _this.type = type;
        _this.defs = defs;
        return _this;
    }
    return FuncSet;
}(Expr));
exports.FuncSet = FuncSet;
// An anonymous function, also known as a lambda.
var AnonFunc = /** @class */ (function (_super) {
    __extends(AnonFunc, _super);
    function AnonFunc(node, type, params) {
        var _this = _super.call(this, node, type) || this;
        _this.node = node;
        _this.type = type;
        _this.params = params;
        return _this;
    }
    return AnonFunc;
}(Expr));
exports.AnonFunc = AnonFunc;
// A variable is a name  
var Var = /** @class */ (function (_super) {
    __extends(Var, _super);
    function Var(node, type, value, def) {
        var _this = _super.call(this, node, type) || this;
        _this.node = node;
        _this.type = type;
        _this.value = value;
        _this.def = def;
        return _this;
    }
    return Var;
}(Expr));
exports.Var = Var;
// The different kinds of literals like boolean, number, ints, arrays, objects, and more. 
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(node, type, value) {
        var _this = _super.call(this, node, type) || this;
        _this.node = node;
        _this.type = type;
        _this.value = value;
        return _this;
    }
    return Literal;
}(Expr));
exports.Literal = Literal;
// An array literal expression
var ArrayLiteral = /** @class */ (function (_super) {
    __extends(ArrayLiteral, _super);
    function ArrayLiteral(node, vals) {
        var _this = _super.call(this, node, heron_types_1.Types.ArrayType) || this;
        _this.node = node;
        _this.vals = vals;
        return _this;
    }
    return ArrayLiteral;
}(Expr));
exports.ArrayLiteral = ArrayLiteral;
// An object literal expression
var ObjectLiteral = /** @class */ (function (_super) {
    __extends(ObjectLiteral, _super);
    function ObjectLiteral(node, names, vals) {
        var _this = _super.call(this, node, heron_types_1.Types.createObjectType(names)) || this;
        _this.node = node;
        _this.names = names;
        _this.vals = vals;
        return _this;
    }
    return ObjectLiteral;
}(Expr));
exports.ObjectLiteral = ObjectLiteral;
// Type expressions 
var TypeExpr = /** @class */ (function (_super) {
    __extends(TypeExpr, _super);
    function TypeExpr(node, def) {
        var _this = _super.call(this, node, heron_types_1.Types.TypeType) || this;
        _this.node = node;
        _this.def = def;
        return _this;
    }
    return TypeExpr;
}(Expr));
exports.TypeExpr = TypeExpr;
// Function call expressions
var FunCall = /** @class */ (function (_super) {
    __extends(FunCall, _super);
    function FunCall(node, type, func, args) {
        var _this = _super.call(this, node, type) || this;
        _this.node = node;
        _this.type = type;
        _this.func = func;
        _this.args = args;
        return _this;
    }
    return FunCall;
}(Expr));
exports.FunCall = FunCall;
//# sourceMappingURL=heron-expr.js.map