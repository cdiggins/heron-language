"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_builder_1 = require("./code-builder");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
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
function isFunc(node) {
    return node && (node.name === "funcDef" || node.name === "intrinsicDef");
}
function varUsageDetails(varUsage) {
    return '// var usage ' + varUsage + ' defined at ' + '[' + varUsage.defs.join(', ') + ']';
}
function outputDetails(node, state) {
    if (node.scope) {
        state.pushLine('// scope ' + node.scope.toString());
        // TODO: push all of the variables used, push all of the defines made in the scope.
        // I want it all man!
    }
    if (node.varUsage) {
        state.pushLine(varUsageDetails(node.varUsage));
    }
    if (node.varDef) {
        state.pushLine('// var definition ' + node.varDef.toString());
    }
    if (node.funCall) {
        state.pushLine('// function call with ' + node.funCall.args.length + ' arguments');
    }
    if (node.funcDef) {
        state.pushLine('// function definition ' + node.funcDef.name + ' with ' + node.funcDef.params.length + ' parameters');
    }
    if (heron_ast_rewrite_1.isExpr(node)) {
        // state.push(' /* ' + node.name + ':' + (node.type || '?') + ' */ ');
    }
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
    HeronToTextVisitor.prototype.visit_additiveExpr = function (ast, state) {
        // seq(additiveExprLeft,additiveExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_additiveExprLeft = function (ast, state) {
        // multiplicativeExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_additiveExprRight = function (ast, state) {
        // seq(additiveOp,additiveExprLeft)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_additiveOp = function (ast, state) {
        // additiveOp
        state.push(" " + ast.allText + " ");
    };
    HeronToTextVisitor.prototype.visit_arrayExpr = function (ast, state) {
        // seq(expr,expr[0,Infinity])[0,1]
        state.push('[');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(']');
    };
    HeronToTextVisitor.prototype.visit_arrayIndex = function (ast, state) {
        // expr
        state.push('[');
        this.visitChildren(ast, state);
        state.push(']');
    };
    HeronToTextVisitor.prototype.visit_assignmentExpr = function (ast, state) {
        // seq(assignmentExprLeft,assignmentExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_assignmentExprLeft = function (ast, state) {
        // conditionalExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_assignmentExprRight = function (ast, state) {
        // seq(assignmentOp,assignmentExprLeft)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_assignmentOp = function (ast, state) {
        // assignmentOp
        state.push(" " + ast.allText + " ");
    };
    HeronToTextVisitor.prototype.visit_bool = function (ast, state) {
        // bool
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_breakStatement = function (ast, state) {
        // breakStatement
        state.pushLine("break;");
    };
    HeronToTextVisitor.prototype.visit_compoundStatement = function (ast, state) {
        // recStatement[0,Infinity]
        state.pushLine("{");
        this.visitChildren(ast, state);
        state.pushLine("}");
    };
    HeronToTextVisitor.prototype.visit_conditionalExpr = function (ast, state) {
        // seq(conditionalExprLeft,conditionalExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_conditionalExprLeft = function (ast, state) {
        // rangeExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_conditionalExprRight = function (ast, state) {
        // seq(conditionalExprLeft,conditionalExprLeft)
        state.push(' ? ');
        this.visitNode(ast.children[0], state);
        this.visitNode(ast.children[1], state);
    };
    HeronToTextVisitor.prototype.visit_continueStatement = function (ast, state) {
        // continueStatement
        state.push('continue;');
    };
    HeronToTextVisitor.prototype.visit_doLoop = function (ast, state) {
        // seq(recStatement,loopCond)
        state.pushLine('do');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_doubleQuotedStringContents = function (ast, state) {
        // stringLiteralChar[0,Infinity]
        state.push('"');
        state.push(ast.allText);
        state.push('"');
    };
    HeronToTextVisitor.prototype.visit_elseStatement = function (ast, state) {
        // recStatement
        state.pushLine('else');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_emptyStatement = function (ast, state) {
        // emptyStatement
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_equalityExpr = function (ast, state) {
        // seq(equalityExprLeft,equalityExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_equalityExprLeft = function (ast, state) {
        // relationalExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_equalityExprRight = function (ast, state) {
        // seq(equalityOp,equalityExprLeft)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_equalityOp = function (ast, state) {
        // equalityOp
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_exprStatement = function (ast, state) {
        // expr
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_fieldSelect = function (ast, state) {
        // identifier
        state.push('.');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_file = function (ast, state) {
        // seq(langDecl[0,1],moduleName,moduleBody)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_forLoop = function (ast, state) {
        // seq(identifier,expr,recStatement)
        state.push('for (');
        this.visitNode(ast.children[0], state);
        state.push(' in ');
        this.visitNode(ast.children[1], state);
        state.pushLine(')');
        this.visitNode(ast.children[2], state);
    };
    HeronToTextVisitor.prototype.visit_funCall = function (ast, state) {
        // seq(expr,expr[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_funcBody = function (ast, state) {
        // choice(funcBodyStatement,funcBodyExpr)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_funcBodyExpr = function (ast, state) {
        // expr
        state.push(' = ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_funcBodyStatement = function (ast, state) {
        // recCompoundStatement
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_funcDef = function (ast, state) {
        // seq(funcSig,funcBody)
        state.pushLine('');
        state.pushLine('/**');
        state.pushLine(ast.allText);
        state.pushLine('*/');
        outputDetails(ast, state);
        state.push('function ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_funcName = function (ast, state) {
        // identifier
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_funcParam = function (ast, state) {
        // seq(funcParamName,typeExpr[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' : ');
            this.visitNode(ast.children[1], state);
        }
    };
    HeronToTextVisitor.prototype.visit_funcParamName = function (ast, state) {
        // identifier
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_funcParams = function (ast, state) {
        // seq(funcParam,funcParam[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_funcSig = function (ast, state) {
        // seq(funcName,genericsParams,funcParams)
        this.visitChildren(ast, state);
        state.pushLine('');
    };
    HeronToTextVisitor.prototype.visit_genericConstraint = function (ast, state) {
        // typeExpr
        state.push(' : ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_genericParam = function (ast, state) {
        // seq(identifier,genericConstraint[0,1])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_genericsParams = function (ast, state) {
        // seq(genericParam,genericParam[0,Infinity])[0,1][0,1]
        if (ast.children.length > 0) {
            // Put a space in case of 'op' 
            state.push(' <');
            this.visitChildrenDelimited(ast, state, ', ');
            state.push('>');
        }
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_identifier = function (ast, state) {
        // opName
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_ifCond = function (ast, state) {
        // expr
        state.push('if (');
        this.visitChildren(ast, state);
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_ifStatement = function (ast, state) {
        // seq(ifCond,recStatement,elseStatement[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_intrinsicDef = function (ast, state) {
        // funcSig
        state.push('intrinsic ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_lambdaArg = function (ast, state) {
        // seq(identifier,typeExpr[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(': ');
            this.visitNode(ast.children[1], state);
        }
    };
    HeronToTextVisitor.prototype.visit_lambdaArgs = function (ast, state) {
        // choice(lambdaArgsNoParen,lambdaArgsWithParen)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_lambdaArgsNoParen = function (ast, state) {
        // identifier
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_lambdaArgsWithParen = function (ast, state) {
        // seq(lambdaArg,lambdaArg[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_lambdaBody = function (ast, state) {
        // choice(recCompoundStatement,expr)
        state.push(' => ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_lambdaExpr = function (ast, state) {
        // seq(lambdaArgs,lambdaBody)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_langDecl = function (ast, state) {
        // langVer
        state.push('language ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_langVer = function (ast, state) {
        // urn
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_leafExpr = function (ast, state) {
        // choice(varExpr,objectExpr,lambdaExpr,parenExpr,arrayExpr,number,bool,string,identifier)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalAndExpr = function (ast, state) {
        // seq(logicalAndExprLeft,logicalAndExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalAndExprLeft = function (ast, state) {
        // equalityExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalAndExprRight = function (ast, state) {
        // seq(logicalAndOp,logicalAndExprLeft)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalAndOp = function (ast, state) {
        // logicalAndOp
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_logicalOrExpr = function (ast, state) {
        // seq(logicalOrExprLeft,logicalOrExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalOrExprLeft = function (ast, state) {
        // logicalXOrExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalOrExprRight = function (ast, state) {
        // seq(logicalOrOp,logicalOrExprLeft)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalOrOp = function (ast, state) {
        // logicalOrOp
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_logicalXOrExpr = function (ast, state) {
        // seq(logicalXOrExprLeft,logicalXOrExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalXOrExprLeft = function (ast, state) {
        // logicalAndExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalXOrExprRight = function (ast, state) {
        // seq(logicalXOrOp,logicalXOrExprLeft)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_logicalXOrOp = function (ast, state) {
        // logicalXOrOp
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_loopCond = function (ast, state) {
        state.push('while (');
        this.visitChildren(ast, state);
        state.pushLine(')');
    };
    HeronToTextVisitor.prototype.visit_moduleBody = function (ast, state) {
        // statement[0,Infinity]
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    };
    HeronToTextVisitor.prototype.visit_moduleName = function (ast, state) {
        // urn
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_multiplicativeExpr = function (ast, state) {
        // seq(multiplicativeExprLeft,multiplicativeExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_multiplicativeExprLeft = function (ast, state) {
        // prefixExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_multiplicativeExprRight = function (ast, state) {
        // seq(multiplicativeOp,multiplicativeExprLeft)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_multiplicativeOp = function (ast, state) {
        // multiplicativeOp
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_number = function (ast, state) {
        // number
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_objectExpr = function (ast, state) {
        // objectField[0,Infinity]
        state.push('{ ');
        this.visitChildren(ast, state);
        state.push(' }');
    };
    HeronToTextVisitor.prototype.visit_objectField = function (ast, state) {
        // seq(identifier,expr)
        this.visitNode(ast.children[0], state);
        state.push(' = ');
        this.visitNode(ast.children[1], state);
        state.push('; ');
    };
    HeronToTextVisitor.prototype.visit_opName = function (ast, state) {
        // opName
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_parenExpr = function (ast, state) {
        // expr
        state.push('(');
        this.visitChildren(ast, state);
        state.push(')');
    };
    HeronToTextVisitor.prototype.visit_postDecOp = function (ast, state) {
        // postDecOp
        this.visitChildren(ast, state);
        state.push('--');
    };
    HeronToTextVisitor.prototype.visit_postIncOp = function (ast, state) {
        // postIncOp
        this.visitChildren(ast, state);
        state.push('++');
    };
    HeronToTextVisitor.prototype.visit_postfixExpr = function (ast, state) {
        // seq(leafExpr,choice(funCall,arrayIndex,fieldSelect,postIncOp,postDecOp)[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_prefixExpr = function (ast, state) {
        // seq(prefixOp[0,Infinity],postfixExpr)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_prefixOp = function (ast, state) {
        // prefixOp
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_rangeExpr = function (ast, state) {
        // seq(rangeExprLeft,rangeExprRight[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' .. ');
            this.visitNode(ast.children[0], state);
        }
    };
    HeronToTextVisitor.prototype.visit_rangeExprLeft = function (ast, state) {
        // logicalOrExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_rangeExprRight = function (ast, state) {
        // rangeExprLeft
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_recCompoundStatement = function (ast, state) {
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    };
    HeronToTextVisitor.prototype.visit_relationalExpr = function (ast, state) {
        // seq(relationalExprLeft,relationalExprRight[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_relationalExprLeft = function (ast, state) {
        // additiveExpr
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_relationalExprRight = function (ast, state) {
        // seq(relationalOp,relationalExprLeft)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_relationalOp = function (ast, state) {
        // relationalOp
        state.push(' ' + ast.allText + ' ');
    };
    HeronToTextVisitor.prototype.visit_returnStatement = function (ast, state) {
        // expr[0,1]
        state.push('return ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_returnType = function (ast, state) {
        // TypeExpr
        state.push(' : ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_singleQuotedStringContents = function (ast, state) {
        // stringLiteralChar[0,Infinity]
        state.push("'" + ast.allText + "'");
    };
    HeronToTextVisitor.prototype.visit_statement = function (ast, state) {
        // choice(emptyStatement,compoundStatement,ifStatement,returnStatement,continueStatement,breakStatement,forLoop,doLoop,whileLoop,varDeclStatement,funcDef,intrinsicDef,exprStatement)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_string = function (ast, state) {
        // choice(doubleQuotedStringContents,singleQuotedStringContents)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_stringLiteralChar = function (ast, state) {
        // stringLiteralChar
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_typeExpr = function (ast, state) {
        // seq(typeName,typeParamList[0,1])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_typeName = function (ast, state) {
        // identifier
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_typeParam = function (ast, state) {
        // recType
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_typeParamList = function (ast, state) {
        // seq(typeParam,typeParam[0,Infinity])[0,1]
        if (ast.children.length == 0)
            return;
        state.push('<');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push('>');
    };
    HeronToTextVisitor.prototype.visit_urn = function (ast, state) {
        // seq(urnPart,urnPart[0,Infinity])        
        this.visitChildrenDelimited(ast, state, ':');
    };
    HeronToTextVisitor.prototype.visit_urnPart = function (ast, state) {
        // urnPart
        state.push(ast.allText);
    };
    HeronToTextVisitor.prototype.visit_varDecl = function (ast, state) {
        // seq(varNameDecl,varInitialization)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_varDeclStatement = function (ast, state) {
        // varDecls
        state.push('var ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    };
    HeronToTextVisitor.prototype.visit_varDecls = function (ast, state) {
        // seq(varDecl,varDecl[0,Infinity])
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_varExpr = function (ast, state) {
        // seq(varDecls,expr)
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_varInitialization = function (ast, state) {
        // expr
        state.push(' = ');
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_varNameDecl = function (ast, state) {
        // identifier
        this.visitChildren(ast, state);
    };
    HeronToTextVisitor.prototype.visit_whileLoop = function (ast, state) {
        // seq(loopCond,recStatement)
        this.visitChildren(ast, state);
    };
    return HeronToTextVisitor;
}());
//# sourceMappingURL=heron-to-text.js.map