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
var heron_defs_1 = require("./heron-defs");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
// Expressions are either: named function sets, anonymous functions, function calls, variables, or literals.
// In order to work out the type we need to work out the type of the things it depends on first. 
// This can be done by creating a graph, OR by simply computing type by pulling on the thread. 
var Expr = /** @class */ (function () {
    function Expr(node) {
        this.node = node;
        node['expr'] = this;
    }
    return Expr;
}());
exports.Expr = Expr;
// A named reference to a function can resolve to multiple functions, so we talk in terms of function sets.
// The type of a function set is the union of the types of each function definition it has  
var FuncSet = /** @class */ (function (_super) {
    __extends(FuncSet, _super);
    function FuncSet(node, defs) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.defs = defs;
        return _this;
    }
    return FuncSet;
}(Expr));
exports.FuncSet = FuncSet;
// An anonymous function, also known as a lambda.
var AnonFunc = /** @class */ (function (_super) {
    __extends(AnonFunc, _super);
    function AnonFunc(node, params, body) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.params = params;
        _this.body = body;
        return _this;
    }
    return AnonFunc;
}(Expr));
exports.AnonFunc = AnonFunc;
// A variable is a name  
var Var = /** @class */ (function (_super) {
    __extends(Var, _super);
    function Var(node, name, def) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.name = name;
        _this.def = def;
        return _this;
    } // TODO: work out the type
    return Var;
}(Expr));
exports.Var = Var;
// The different kinds of literals like boolean, number, ints, arrays, objects, and more. 
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(node, value) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
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
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.vals = vals;
        return _this;
    }
    return ArrayLiteral;
}(Expr));
exports.ArrayLiteral = ArrayLiteral;
var ObjectField = /** @class */ (function (_super) {
    __extends(ObjectField, _super);
    function ObjectField(node, name, expr) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.name = name;
        _this.expr = expr;
        return _this;
    }
    return ObjectField;
}(Expr));
exports.ObjectField = ObjectField;
// An object literal expression
var ObjectLiteral = /** @class */ (function (_super) {
    __extends(ObjectLiteral, _super);
    function ObjectLiteral(node, fields) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.fields = fields;
        return _this;
    }
    return ObjectLiteral;
}(Expr));
exports.ObjectLiteral = ObjectLiteral;
// Type expressions 
var TypeExpr = /** @class */ (function (_super) {
    __extends(TypeExpr, _super);
    function TypeExpr(node, def) {
        var _this = _super.call(this, node) || this;
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
    function FunCall(node, func, args) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.func = func;
        _this.args = args;
        return _this;
    }
    return FunCall;
}(Expr));
exports.FunCall = FunCall;
// Conditional (ternary operator) expressions. 
var ConditionalExpr = /** @class */ (function (_super) {
    __extends(ConditionalExpr, _super);
    function ConditionalExpr(node, cond, onTrue, onFalse) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.cond = cond;
        _this.onTrue = onTrue;
        _this.onFalse = onFalse;
        return _this;
    }
    return ConditionalExpr;
}(Expr));
exports.ConditionalExpr = ConditionalExpr;
//==========================================================================================
// Expressions
function addExpr(node, expr) {
    node['expr'] = expr;
    return expr;
}
exports.addExpr = addExpr;
function computeExprs(ast) {
    heron_ast_rewrite_1.visitAst(ast, createExpr);
}
exports.computeExprs = computeExprs;
function createExpr(node) {
    switch (node.name) {
        case "postfixExpr":
            switch (node.children[1].name) {
                case "fieldSelect":
                    throw new Error("Field selects should be transformed into function calls");
                case "arrayIndex":
                    throw new Error("Array indexing should be transformed into function calls");
                case "postIncOp":
                case "postDecOp":
                    throw new Error("Not supported yet, postInc and postDec should be converted to assignment expressions");
                case "funCall":
                    // TODO: find the correct function based on the number and types of the arguments
                    return createFunCall(node);
                default:
                    throw new Error("Unrecognized postfix expression: " + node.name);
            }
        case "objectExpr":
            return createObjectLiteral(node);
        case "lambdaExpr":
            return createLambdaExpr(node);
        case "varExpr":
            return addExpr(node, createExpr(node.children[1]));
        case "arrayExpr":
            return createArrayExpr(node);
        case "bool":
            return createBoolExpr(node);
        case "number":
            return createNumExpr(node);
        case "string":
            return createStrExpr(node);
        case "prefixExpr":
            throw new Error("Prefix expr should be converted into function calls");
        case "typeExpr":
            return createTypeExpr(node);
        case "conditionalExpr":
            return createConditionalExpr(node);
        case "literal":
        case "leafExpr":
        case "parenExpr":
        case "expr":
        case "recExpr":
            return addExpr(node, createExpr(node.children[0]));
        case "multiplicativeExpr":
        case "additiveExpr":
        case "relationalExpr":
        case "equalityExpr":
        case "rangeExpr":
            throw new Error("Unsupported expression found: pre-processing was not performed: " + node.name);
        default:
            throw new Error("Not a recognized expression: " + node.name);
    }
}
exports.createExpr = createExpr;
function createFunCall(node) {
    if (node.name !== 'postfixExpr')
        throw new Error('Expected a postfix expr as an argument');
    if (node.children.length != 2)
        throw new Error('Expected two children of a postfix expression');
    var func = createExpr(node.children[0]);
    if (node.children[1].name !== 'funCall')
        throw new Error('Expected a funCall as the right child, not ' + node.children[1].name);
    var args = node.children[1].children;
    return new FunCall(node, func, args.map(createExpr));
}
exports.createFunCall = createFunCall;
function createObjectField(node) {
    heron_ast_rewrite_1.validateNode(node, "objectField");
    var name = node.child[0].allText;
    var expr = createExpr(node.child[1]);
    return new ObjectField(node, name, expr);
}
exports.createObjectField = createObjectField;
function createObjectLiteral(node) {
    return new ObjectLiteral(node, node.children.map(createObjectField));
}
exports.createObjectLiteral = createObjectLiteral;
function createArrayExpr(node) {
    return new ArrayLiteral(node, node.children.map(createExpr));
}
exports.createArrayExpr = createArrayExpr;
function createBoolExpr(node) {
    var value = node.allText === 'true' ? true : false;
    return new Literal(node, value);
}
exports.createBoolExpr = createBoolExpr;
function createConditionalExpr(node) {
    return new ConditionalExpr(node, createExpr(node.children[0]), createExpr(node.children[1]), createExpr(node.children[2]));
}
exports.createConditionalExpr = createConditionalExpr;
// TODO: the fact that I am calling a lambda body an expression is a problem.
function createLambdaExpr(node) {
    return new AnonFunc(node, node.children[0].children.map(heron_defs_1.createFuncParamDef), createExpr(node.children[1]));
}
exports.createLambdaExpr = createLambdaExpr;
function createNumExpr(node) {
    var value = parseFloat(node.allText);
    return new Literal(node, value);
}
exports.createNumExpr = createNumExpr;
function createStrExpr(node) {
    return new Literal(node, node.allText);
}
exports.createStrExpr = createStrExpr;
function createTypeExpr(node) {
    return new TypeExpr(node, node['def']);
}
exports.createTypeExpr = createTypeExpr;
function createVarExpr(node) {
}
exports.createVarExpr = createVarExpr;
//# sourceMappingURL=heron-expr.js.map