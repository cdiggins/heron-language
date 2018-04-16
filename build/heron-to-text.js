"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_builder_1 = require("./code-builder");
// Given an AST, will generate a text representation of the code as Heron code
// that has been marked up with the analysis results. 
function heronToText(ast) {
    var v = new HeronToTextVisitor();
    var cb = new code_builder_1.CodeBuilder();
    var now = new Date();
    cb.pushLine('// Generated on ' + now.toDateString() + ' ' + now.toTimeString());
    v.visitNode(ast, cb);
    return cb.lines.join('');
}
exports.heronToText = heronToText;
function outputDetails(node, state) {
    /*
    if (node.scope)
        state.pushLine('// scope ' + node.scope);
    if (node.ref)
        state.pushLine('// reference ' + node.ref);
    if (node.def)
        state.pushLine('// definition ' + node.def);
    if (node.expr)
        state.pushLine('// expression ' + node.expr.constructor['name'] + ' ' + node.expr);
    if (node.type)
        state.pushLine('// type ' + node.type);
    */
    if (node.expr)
        state.pushLine('// expression type ' + node.expr.type);
    if (node.def)
        state.pushLine('// definition type ' + node.def.type);
}
// A visitor class for generating Heron code. 
var HeronToTextVisitor = /** @class */ (function () {
    function HeronToTextVisitor() {
    }
    HeronToTextVisitor.prototype.visitNode = function (ast, state) {
        outputDetails(ast, state);
        var fnName = 'visit_' + ast.name;
        if (fnName in this)
            this[fnName](ast, state);
        else
            this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visitChildren = function (ast, state) {
        for (var _i = 0, _a = ast.children; _i < _a.length; _i++) {
            var child = _a[_i];
            this.visitNode(child, state);
        }
    };
    HeronToTextVisitor.prototype.visitChildrenDelimited = function (ast, state, delim) {
        for (var i = 0; i < ast.children.length; ++i) {
            if (i > 0)
                state.push(delim);
            this.visitNode(ast.children[i], state);
        }
    };
    HeronToTextVisitor.prototype.visit_additiveOp = function (ast, state) {
        state.push(" " + ast.allText + " ");
    };
    HeronToTextVisitor.prototype.visit_arrayExpr = function (ast, state) {
        state.push('[');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(']');
    };
    HeronToTextVisitor.prototype.visit_arrayIndex = function (ast, state) {
        state.push('[');
        this.visitChildren(ast, state);
        state.push(']');
    };
    HeronToTextVisitor.prototype.visit_assignmentOp = function (ast, state) {
        state.push(" " + ast.allText + " ");
    };
    HeronToTextVisitor.prototype.visit_bool = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_breakStatement = function (ast, state) {
        state.pushLine("break;");
    };
    HeronToTextVisitor.prototype.visit_compoundStatement = function (ast, state) {
        state.pushLine("{");
        this.visitChildren(ast, state);
        state.pushLine("}");
    };
    HeronToTextVisitor.prototype.visit_conditionalExprRight = function (ast, state) {
        state.push(' ? ');
        this.visitNode(ast.children[0], state);
        this.visitNode(ast.children[1], state);
    };
    HeronToTextVisitor.prototype.visit_continueStatement = function (ast, state) {
        state.push('continue;');
    };
    HeronToTextVisitor.prototype.visit_doLoop = function (ast, state) {
        state.pushLine('do');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_doubleQuotedStringContents = function (ast, state) {
        state.push('"');
        state.push(ast.allText);
        state.push('"');
    };
    HeronToTextVisitor.prototype.visit_elseStatement = function (ast, state) {
        state.pushLine('else');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_emptyStatement = function (ast, state) {
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_equalityOp = function (ast, state) {
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_exprStatement = function (ast, state) {
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_fieldSelect = function (ast, state) {
        state.push('.');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_forLoop = function (ast, state) {
        state.push('for (');
        this.visitNode(ast.children[0], state);
        state.push(' in ');
        this.visitNode(ast.children[1], state);
        state.pushLine(')');
        this.visitNode(ast.children[2], state);
    };
    HeronToTextVisitor.prototype.visit_funCall = function (ast, state) {
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_funcDef = function (ast, state) {
        state.pushLine('');
        state.pushLine('/**');
        state.pushLine(ast.allText);
        state.pushLine('*/');
        outputDetails(ast, state);
        state.push('function ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_funcName = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_funcParam = function (ast, state) {
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' : ');
            this.visitNode(ast.children[1], state);
        }
    };
    HeronToTextVisitor.prototype.visit_funcParamName = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_funcParams = function (ast, state) {
        state.push('(');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_funcSig = function (ast, state) {
        this.visitChildren(ast, state);
        state.pushLine('');
    };
    HeronToTextVisitor.prototype.visit_genericConstraint = function (ast, state) {
        state.push(' : ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_genericParams = function (ast, state) {
        if (ast.children.length > 0) {
            // Put a space because in case of 'op<' 
            state.push(' <');
            this.visitChildrenDelimited(ast, state, ', ');
            state.push('>');
        }
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_identifier = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_ifCond = function (ast, state) {
        state.push('if (');
        this.visitChildren(ast, state);
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_intrinsicDef = function (ast, state) {
        state.push('intrinsic ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_lambdaArg = function (ast, state) {
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(': ');
            this.visitNode(ast.children[1], state);
        }
    };
    HeronToTextVisitor.prototype.visit_lambdaArgs = function (ast, state) {
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_lambdaBody = function (ast, state) {
        state.push(' => ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_langDecl = function (ast, state) {
        state.push('language ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_langVer = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_logicalAndOp = function (ast, state) {
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_logicalOrOp = function (ast, state) {
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_logicalXOrOp = function (ast, state) {
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_loopCond = function (ast, state) {
        state.push('while (');
        this.visitChildren(ast, state);
        state.pushLine(')');
    };
    HeronToTextVisitor.prototype.visit_moduleBody = function (ast, state) {
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    };
    HeronToTextVisitor.prototype.visit_moduleName = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_multiplicativeOp = function (ast, state) {
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_number = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_objectExpr = function (ast, state) {
        state.push('{ ');
        this.visitChildren(ast, state);
        state.push(' }');
    };
    HeronToTextVisitor.prototype.visit_objectField = function (ast, state) {
        this.visitNode(ast.children[0], state);
        state.push(' = ');
        this.visitNode(ast.children[1], state);
        state.push('; ');
    };
    HeronToTextVisitor.prototype.visit_opName = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_parenExpr = function (ast, state) {
        state.push('(');
        this.visitChildren(ast, state);
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_postDecOp = function (ast, state) {
        this.visitChildren(ast, state);
        state.push('--');
    };
    HeronToTextVisitor.prototype.visit_postIncOp = function (ast, state) {
        this.visitChildren(ast, state);
        state.push('++');
    };
    HeronToTextVisitor.prototype.visit_prefixOp = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_rangeExpr = function (ast, state) {
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' .. ');
            this.visitNode(ast.children[0], state);
        }
    };
    HeronToTextVisitor.prototype.visit_recCompoundStatement = function (ast, state) {
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    };
    HeronToTextVisitor.prototype.visit_relationalOp = function (ast, state) {
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_returnStatement = function (ast, state) {
        state.push('return ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_returnType = function (ast, state) {
        state.push(' : ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_singleQuotedStringContents = function (ast, state) {
        state.push("'" + ast.allText + "'");
    };
    HeronToTextVisitor.prototype.visit_typeName = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_typeParamList = function (ast, state) {
        if (ast.children.length == 0)
            return;
        state.push('<');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push('>');
    };
    HeronToTextVisitor.prototype.visit_urn = function (ast, state) {
        this.visitChildrenDelimited(ast, state, ':');
    };
    HeronToTextVisitor.prototype.visit_urnPart = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_varName = function (ast, state) {
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_varDeclStatement = function (ast, state) {
        state.push('var ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_varInitialization = function (ast, state) {
        state.push(' = ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_whileLoop = function (ast, state) {
        state.push('while (');
        this.visitNode(ast.children[0], state);
        state.pushLine(')');
        this.visitChildren(ast, state);
        this.visitNode(ast.children[1], state);
    };
    return HeronToTextVisitor;
}());
//# sourceMappingURL=heron-to-text.js.map