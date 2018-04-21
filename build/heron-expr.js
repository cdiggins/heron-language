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
        // If the type is a function set, there are multiple defs, this indicates which one. 
        // TODO: maybe the defs and the type should be updated at the same time, rather than leaving us 
        // to check these values. 
        this.functionIndex = 0;
        node.expr = this;
    }
    Expr.prototype.toString = function () {
        return 'expr' + this.node['id'];
    };
    return Expr;
}());
exports.Expr = Expr;
var PostfixDec = /** @class */ (function (_super) {
    __extends(PostfixDec, _super);
    function PostfixDec(node, lvalue) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.lvalue = lvalue;
        return _this;
    }
    PostfixDec.prototype.toString = function () {
        return '--' + this.lvalue;
    };
    return PostfixDec;
}(Expr));
exports.PostfixDec = PostfixDec;
var PostfixInc = /** @class */ (function (_super) {
    __extends(PostfixInc, _super);
    function PostfixInc(node, lvalue) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.lvalue = lvalue;
        return _this;
    }
    PostfixInc.prototype.toString = function () {
        return '++' + this.lvalue;
    };
    return PostfixInc;
}(Expr));
exports.PostfixInc = PostfixInc;
// An anonymous function, also known as a lambda.
var Lambda = /** @class */ (function (_super) {
    __extends(Lambda, _super);
    function Lambda(node, params, bodyNode) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.params = params;
        _this.bodyNode = bodyNode;
        return _this;
    }
    Object.defineProperty(Lambda.prototype, "body", {
        get: function () {
            return this.bodyNode.expr ? this.bodyNode.expr : this.bodyNode.statement;
        },
        enumerable: true,
        configurable: true
    });
    Lambda.prototype.toString = function () {
        var body = this.bodyNode.expr
            ? this.bodyNode.expr.toString()
            : (this.bodyNode.statement)
                ? this.bodyNode.statement.toString()
                : "???";
        return '(' + this.params.map(function (p) { return p.name; }).join(',') + ') => ' + body;
    };
    return Lambda;
}(Expr));
exports.Lambda = Lambda;
// The name of a variable. This could resolve to a function name, in which case there 
// will be multiple types.
var VarName = /** @class */ (function (_super) {
    __extends(VarName, _super);
    function VarName(node, name) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.name = name;
        return _this;
    }
    VarName.prototype.toString = function () {
        return this.name;
    };
    return VarName;
}(Expr));
exports.VarName = VarName;
// Let bindings: variable declarations used in the contet of another expression.
var VarExpr = /** @class */ (function (_super) {
    __extends(VarExpr, _super);
    function VarExpr(node, vars, expr) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.vars = vars;
        _this.expr = expr;
        return _this;
    }
    VarExpr.prototype.toString = function () {
        return 'var ' + this.vars.join(', ') + ' in ' + this.expr;
    };
    return VarExpr;
}(Expr));
exports.VarExpr = VarExpr;
// The different kinds of literals like boolean, number, ints, arrays, objects, and more. 
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(node, value) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.value = value;
        return _this;
    }
    Literal.prototype.toString = function () {
        return this.value.toString();
    };
    return Literal;
}(Expr));
exports.Literal = Literal;
var BoolLiteral = /** @class */ (function (_super) {
    __extends(BoolLiteral, _super);
    function BoolLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BoolLiteral;
}(Literal));
exports.BoolLiteral = BoolLiteral;
var IntLiteral = /** @class */ (function (_super) {
    __extends(IntLiteral, _super);
    function IntLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IntLiteral;
}(Literal));
exports.IntLiteral = IntLiteral;
var FloatLiteral = /** @class */ (function (_super) {
    __extends(FloatLiteral, _super);
    function FloatLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FloatLiteral;
}(Literal));
exports.FloatLiteral = FloatLiteral;
var StrLiteral = /** @class */ (function (_super) {
    __extends(StrLiteral, _super);
    function StrLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StrLiteral;
}(Literal));
exports.StrLiteral = StrLiteral;
// An array literal expression
var ArrayLiteral = /** @class */ (function (_super) {
    __extends(ArrayLiteral, _super);
    function ArrayLiteral(node, vals) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.vals = vals;
        return _this;
    }
    ArrayLiteral.prototype.toString = function () {
        return '[' + this.vals.join(',') + ']';
    };
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
    ObjectField.prototype.toString = function () {
        return this.name + '=' + this.expr;
    };
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
    ObjectLiteral.prototype.toString = function () {
        return '{ ' + this.fields.join(';') + ' }';
    };
    return ObjectLiteral;
}(Expr));
exports.ObjectLiteral = ObjectLiteral;
// Function call expressions
var FunCall = /** @class */ (function (_super) {
    __extends(FunCall, _super);
    function FunCall(node, func, args) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.func = func;
        _this.args = args;
        func.calledFunction = _this;
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            arg.functionArgument = _this;
        }
        return _this;
    }
    FunCall.prototype.toString = function () {
        return this.func + '(' + this.args.join(',') + ')';
    };
    return FunCall;
}(Expr));
exports.FunCall = FunCall;
// Conditional (ternary operator) expressions. 
var ConditionalExpr = /** @class */ (function (_super) {
    __extends(ConditionalExpr, _super);
    function ConditionalExpr(node, condition, onTrue, onFalse) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.condition = condition;
        _this.onTrue = onTrue;
        _this.onFalse = onFalse;
        return _this;
    }
    ConditionalExpr.prototype.toString = function () {
        return this.condition + ' ? ' + this.onTrue + ' : ' + this.onFalse;
    };
    return ConditionalExpr;
}(Expr));
exports.ConditionalExpr = ConditionalExpr;
// Assignment of a value to a variable 
var VarAssignmentExpr = /** @class */ (function (_super) {
    __extends(VarAssignmentExpr, _super);
    function VarAssignmentExpr(node, name, value) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.name = name;
        _this.value = value;
        return _this;
    }
    VarAssignmentExpr.prototype.toString = function () {
        return this.name + ' = ' + this.value;
    };
    return VarAssignmentExpr;
}(Expr));
exports.VarAssignmentExpr = VarAssignmentExpr;
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
    if (!node)
        throw new Error("Missing node");
    if (node.expr)
        return node.expr;
    switch (node.name) {
        case "postfixExpr":
            switch (node.children[1].name) {
                case "fieldSelect":
                    heron_ast_rewrite_1.throwError(node, "Field selects should be transformed into function calls");
                case "arrayIndex":
                    heron_ast_rewrite_1.throwError(node, "Array indexing should be transformed into function calls");
                case "postIncOp":
                    return new PostfixInc(node, createExpr(node.children[0]));
                case "postDecOp":
                    return new PostfixDec(node, createExpr(node.children[0]));
                case "funCall":
                    // TODO: find the correct function based on the number and types of the arguments
                    return createFunCall(node);
                default:
                    heron_ast_rewrite_1.throwError(node, "Unrecognized postfix expression: " + node.name);
            }
        case "objectExpr":
            return createObjectLiteral(node);
        case "lambdaExpr":
            return createLambdaExpr(node);
        case "varExpr":
            return createVarExpr(node);
        case "arrayExpr":
            return createArrayExpr(node);
        case "bool":
            return createBoolExpr(node);
        case "number":
            return createNumExpr(node);
        case "string":
            return createStrExpr(node);
        case "prefixExpr":
            heron_ast_rewrite_1.throwError(node, "Prefix expr should be converted into function calls");
        case "conditionalExpr":
            return createConditionalExpr(node);
        case "varName":
            return createVarNameExpr(node);
        case "parenExpr":
            return addExpr(node, createExpr(node.children[0]));
        case "assignmentExpr":
            return createVarAssignmentExpr(node);
        case "multiplicativeExpr":
        case "additiveExpr":
        case "relationalExpr":
        case "equalityExpr":
        case "rangeExpr":
        case "literal":
        case "leafExpr":
        case "recExpr":
        case "expr":
            heron_ast_rewrite_1.throwError(node, "Unsupported expression found: pre-processing was not performed: " + node.name);
    }
}
exports.createExpr = createExpr;
function createFunCall(node) {
    heron_ast_rewrite_1.validateNode(node, 'postfixExpr');
    if (node.children.length != 2)
        heron_ast_rewrite_1.throwError(node, 'Expected two children of a postfix expression');
    var func = createExpr(node.children[0]);
    if (!func)
        heron_ast_rewrite_1.throwError(node, 'Missing function');
    var funCall = heron_ast_rewrite_1.validateNode(node.children[1], 'funCall');
    return new FunCall(node, func, funCall.children.map(createExpr));
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
    return new ObjectLiteral(heron_ast_rewrite_1.validateNode(node, 'objectExpr'), node.children.map(createObjectField));
}
exports.createObjectLiteral = createObjectLiteral;
function createArrayExpr(node) {
    return new ArrayLiteral(heron_ast_rewrite_1.validateNode(node, 'arrayExpr'), node.children.map(createExpr));
}
exports.createArrayExpr = createArrayExpr;
function createBoolExpr(node) {
    var value = node.allText === 'true' ? true : false;
    return new BoolLiteral(heron_ast_rewrite_1.validateNode(node, 'bool'), value);
}
exports.createBoolExpr = createBoolExpr;
function createConditionalExpr(node) {
    heron_ast_rewrite_1.validateNode(node, 'conditionalExpr');
    if (node.children.length !== 2)
        heron_ast_rewrite_1.throwError(node, 'Conditional expressions should have two children');
    var rightNode = heron_ast_rewrite_1.validateNode(node.children[1], 'conditionalExprRight');
    if (rightNode.children.length !== 2)
        heron_ast_rewrite_1.throwError(node, 'Right side of conditional expression should have two children');
    return new ConditionalExpr(node, createExpr(node.children[0]), createExpr(rightNode.children[0]), createExpr(rightNode.children[1]));
}
exports.createConditionalExpr = createConditionalExpr;
// TODO: the fact that I am calling a lambda body an expression is a problem.
function createLambdaExpr(node) {
    return new Lambda(heron_ast_rewrite_1.validateNode(node, 'lambdaExpr'), node.children[0].children.map(function (c) { return heron_defs_1.getDef(c, 'FuncParamDef'); }), node.children[1].children[0]);
}
exports.createLambdaExpr = createLambdaExpr;
function createNumExpr(node) {
    heron_ast_rewrite_1.validateNode(node, 'number');
    var value = parseFloat(node.allText);
    if (node.allText.indexOf('.') >= 0 || node.allText.indexOf('f') >= 0)
        return new FloatLiteral(node, value);
    else
        return new IntLiteral(node, value);
}
exports.createNumExpr = createNumExpr;
function createStrExpr(node) {
    return new StrLiteral(heron_ast_rewrite_1.validateNode(node, 'string'), node.allText);
}
exports.createStrExpr = createStrExpr;
function createVarNameExpr(node) {
    return new VarName(heron_ast_rewrite_1.validateNode(node, 'varName'), node.allText);
}
exports.createVarNameExpr = createVarNameExpr;
function createVarExpr(node) {
    heron_ast_rewrite_1.validateNode(node, 'varExpr');
    var defs = node.children[0].children.map(function (c) { return c.def; });
    var body = createExpr(node.children[1]);
    return new VarExpr(node, defs, body);
}
exports.createVarExpr = createVarExpr;
function createVarAssignmentExpr(node) {
    heron_ast_rewrite_1.validateNode(node, 'assignmentExpr');
    var lvalue = heron_ast_rewrite_1.validateNode(node.children[0], 'varName').allText;
    var op = heron_ast_rewrite_1.validateNode(node.children[1].children[0], 'assignmentOp').allText;
    if (node.children[1].children.length !== 2)
        heron_ast_rewrite_1.throwError(node, 'Expected two children on right side of assignment expression');
    if (op !== '=')
        heron_ast_rewrite_1.throwError(node, 'All assignment operators are supposed to be rewritten: found ' + op);
    var rvalue = node.children[1].children[1];
    // TODO: add 
    return new VarAssignmentExpr(node, lvalue, createExpr(rvalue));
}
exports.createVarAssignmentExpr = createVarAssignmentExpr;
//# sourceMappingURL=heron-expr.js.map