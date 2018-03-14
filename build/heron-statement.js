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
var heron_expr_1 = require("./heron-expr");
var Statement = /** @class */ (function () {
    function Statement(node) {
        this.node = node;
        node.statement = this;
    }
    return Statement;
}());
exports.Statement = Statement;
var CompoundStatement = /** @class */ (function (_super) {
    __extends(CompoundStatement, _super);
    function CompoundStatement(node, statements) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.statements = statements;
        return _this;
    }
    return CompoundStatement;
}(Statement));
exports.CompoundStatement = CompoundStatement;
var IfStatement = /** @class */ (function (_super) {
    __extends(IfStatement, _super);
    function IfStatement(node, condition, onTrue, onFalse) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.condition = condition;
        _this.onTrue = onTrue;
        _this.onFalse = onFalse;
        return _this;
    }
    return IfStatement;
}(Statement));
exports.IfStatement = IfStatement;
var ReturnStatement = /** @class */ (function (_super) {
    __extends(ReturnStatement, _super);
    function ReturnStatement(node, condition) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.condition = condition;
        return _this;
    }
    return ReturnStatement;
}(Statement));
exports.ReturnStatement = ReturnStatement;
var ContinueStatement = /** @class */ (function (_super) {
    __extends(ContinueStatement, _super);
    function ContinueStatement(node) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        return _this;
    }
    return ContinueStatement;
}(Statement));
exports.ContinueStatement = ContinueStatement;
var BreakStatement = /** @class */ (function (_super) {
    __extends(BreakStatement, _super);
    function BreakStatement(node) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        return _this;
    }
    return BreakStatement;
}(Statement));
exports.BreakStatement = BreakStatement;
var ExprStatement = /** @class */ (function (_super) {
    __extends(ExprStatement, _super);
    function ExprStatement(node, expr) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.expr = expr;
        return _this;
    }
    return ExprStatement;
}(Statement));
exports.ExprStatement = ExprStatement;
var ForStatement = /** @class */ (function (_super) {
    __extends(ForStatement, _super);
    function ForStatement(node, identifier, array, loop) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.identifier = identifier;
        _this.array = array;
        _this.loop = loop;
        return _this;
    }
    return ForStatement;
}(Statement));
exports.ForStatement = ForStatement;
var DoStatement = /** @class */ (function (_super) {
    __extends(DoStatement, _super);
    function DoStatement(node, condition, body) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.condition = condition;
        _this.body = body;
        return _this;
    }
    return DoStatement;
}(Statement));
exports.DoStatement = DoStatement;
var WhileStatement = /** @class */ (function (_super) {
    __extends(WhileStatement, _super);
    function WhileStatement(node, condition, body) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.condition = condition;
        _this.body = body;
        return _this;
    }
    return WhileStatement;
}(Statement));
exports.WhileStatement = WhileStatement;
var VarDeclStatement = /** @class */ (function (_super) {
    __extends(VarDeclStatement, _super);
    function VarDeclStatement(node, vars) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.vars = vars;
        return _this;
    }
    return VarDeclStatement;
}(Statement));
exports.VarDeclStatement = VarDeclStatement;
var EmptyStatement = /** @class */ (function (_super) {
    __extends(EmptyStatement, _super);
    function EmptyStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmptyStatement;
}(Statement));
exports.EmptyStatement = EmptyStatement;
//============================================================
// Functions 
function createStatement(node) {
    if (node.statement)
        return node.statement;
    switch (node.name) {
        case 'emptyStatement':
            return new EmptyStatement(node);
        case 'compoundStatement':
            return new CompoundStatement(node, node.children.map(createStatement));
        case 'ifStatement':
            // TODO: I need to rotate the else statement. We should only have one!  
            return new IfStatement(node, heron_expr_1.createExpr(node.children[0]), createStatement(node.children[1]), node.children.length > 2 ? createStatement(node.children[2]) : new EmptyStatement(null));
        case 'returnStatement':
            return new ReturnStatement(node, node.children.length > 0 ? heron_expr_1.createExpr(node.children[0]) : null);
        case 'continueStatement':
            return new ContinueStatement(node);
        case 'breakStatement':
            return new BreakStatement(node);
        case 'forLoop':
            return new ForStatement(node, node.children[0].allText, heron_expr_1.createExpr(node.children[1]), createStatement(node.children[2]));
        case 'doLoop':
            return new DoStatement(node, heron_expr_1.createExpr(node.children[1]), createStatement(node.children[0]));
        case 'whileLoop':
            return new WhileStatement(node, heron_expr_1.createExpr(node.children[0]), createStatement(node.children[1]));
        case 'varDeclStatement':
            return new VarDeclStatement(node, node.children[0].children.map(function (n) { return n.def; }));
        case 'exprStatement':
            return new ExprStatement(node, heron_expr_1.createExpr(node.children[0]));
    }
}
exports.createStatement = createStatement;
//# sourceMappingURL=heron-statement.js.map