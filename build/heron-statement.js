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
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
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
        if (!condition)
            heron_ast_rewrite_1.throwError(node, "Missing expression condition");
        if (onFalse instanceof CompoundStatement && onFalse.statements[1] === _this)
            throw new Error("Recursion error");
        return _this;
    }
    return IfStatement;
}(Statement));
exports.IfStatement = IfStatement;
var ReturnStatement = /** @class */ (function (_super) {
    __extends(ReturnStatement, _super);
    function ReturnStatement(node, expr) {
        var _this = _super.call(this, node) || this;
        _this.node = node;
        _this.expr = expr;
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
function createCompoundStatement(node) {
    return createStatement(heron_ast_rewrite_1.wrapInCompoundStatement(node));
}
exports.createCompoundStatement = createCompoundStatement;
function createStatement(node) {
    if (node.statement)
        return node.statement;
    switch (node.name) {
        case 'emptyStatement':
            return new EmptyStatement(node);
        case 'compoundStatement':
            return new CompoundStatement(node, node.children.map(createStatement));
        case 'ifStatement':
            return new IfStatement(node, heron_expr_1.createExpr(node.children[0]), createCompoundStatement(node.children[1]), createCompoundStatement(node.children[2]));
        case 'returnStatement':
            return new ReturnStatement(node, node.children.length > 0 ? heron_expr_1.createExpr(node.children[0]) : null);
        case 'continueStatement':
            return new ContinueStatement(node);
        case 'breakStatement':
            return new BreakStatement(node);
        case 'forLoop':
            return new ForStatement(node, node.children[0].allText, heron_expr_1.createExpr(node.children[1]), createCompoundStatement(node.children[2]));
        case 'doLoop':
            return new DoStatement(node, heron_expr_1.createExpr(node.children[1]), createCompoundStatement(node.children[0]));
        case 'whileLoop':
            return new WhileStatement(node, heron_expr_1.createExpr(node.children[0]), createCompoundStatement(node.children[1]));
        case 'varDeclStatement':
            return new VarDeclStatement(node, node.children[0].children.map(function (n) { return n.def; }));
        case 'exprStatement':
            return new ExprStatement(node, heron_expr_1.createExpr(node.children[0]));
    }
}
exports.createStatement = createStatement;
// Returns true if a statement is a loop break statemnt
function isLoopBreak(st) {
    return st instanceof ReturnStatement || st instanceof BreakStatement;
}
exports.isLoopBreak = isLoopBreak;
// Returns the last statement in a compound statement group
function lastStatement(st) {
    if (st.statements.length === 0)
        return null;
    return st.statements[st.statements.length - 1];
}
exports.lastStatement = lastStatement;
function hasLoopBreak(st) {
    if (isLoopBreak(st))
        return true;
    if (st instanceof CompoundStatement) {
        return st.statements.some(hasLoopBreak);
    }
    else if (st instanceof IfStatement) {
        return hasLoopBreak(st.onTrue) || hasLoopBreak(st.onFalse);
    }
    return false;
}
exports.hasLoopBreak = hasLoopBreak;
// Put If statements into tail position of a loop 
function rewriteIfStatements(node) {
    throw new Error("This can create recursion error");
    /*
    let st = node.statement;
    if (!st) return;
    if (st instanceof CompoundStatement) {
        for (var i=st.statements.length-2; i >= 0; --i) {
            let c = st.statements[i];
            if (c instanceof IfStatement) {
                if (!isLoopBreak(lastStatement(c.onTrue)))
                    c.onTrue.statements.push(...st.statements.slice(i));
                if (!isLoopBreak(lastStatement(c.onFalse)))
                    c.onFalse.statements.push(...st.statements.slice(i));

                // Delete the statements after the current
                st.statements.splice(i+1, st.statements.length - i - 1);
            }
            else if (st instanceof BreakStatement) {
                // Delete the statements after the current
                st.statements.splice(i+1, st.statements.length - i - 1);
            }
        }
        // Check the algorithm
        for (var i=0; i < st.statements.length - 1; ++i) {
            if (st.statements[i] instanceof IfStatement)
                throw new Error("Internal error: found an If statement in a compound statement that was not in tail position");
        }
    }
    */
}
exports.rewriteIfStatements = rewriteIfStatements;
//# sourceMappingURL=heron-statement.js.map