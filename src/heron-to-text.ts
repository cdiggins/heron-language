import { CodeBuilder } from "./code-builder";

// Given an AST, will generate a text representation of the code
export function heronToText(ast): string {
    let v = new HeronToTextVisitor();
    let cb = new CodeBuilder();
    v.visitNode(ast, cb);
    return cb.lines.join('');
}

class HeronToTextVisitor
{
    visitNode(ast, state) {
        const fnName = 'visit_' + ast.name;
        if (fnName in this)
            this[fnName](ast, state);
        else
            this.visitChildren(ast, state);
    }
    visitChildren(ast, state) {
        for (let child of ast.children)
            this.visitNode(child, state);
    }
    visitChildrenDelimited(ast, state, delim) {
        for (let i=0; i < ast.children.length; ++i) {
            if (i > 0)
                state.push(delim);
            this.visitNode(ast.children[i], state);
        }
    }
    visit_additiveExpr(ast, state) {
        // seq(additiveExprLeft,additiveExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_additiveExprLeft(ast, state) {
        // multiplicativeExpr
        this.visitChildren(ast, state);
    }
    visit_additiveExprRight(ast, state) {
        // seq(additiveOp,additiveExprLeft)
        this.visitChildren(ast, state);
    }
    visit_additiveOp(ast, state) {
        // additiveOp
        state.push(" " + ast.allText + " ");
    }
    visit_arrayExpr(ast, state) {
        // seq(expr,expr[0,Infinity])[0,1]
        state.push('[');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(']');
    }
    visit_arrayIndex(ast, state) {
        // expr
        state.push('[');
        this.visitChildren(ast, state);
        state.push(']');
    }
    visit_assignmentExpr(ast, state) {
        // seq(assignmentExprLeft,assignmentExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_assignmentExprLeft(ast, state) {
        // conditionalExpr
        this.visitChildren(ast, state);
    }
    visit_assignmentExprRight(ast, state) {
        // seq(assignmentOp,assignmentExprLeft)
        this.visitChildren(ast, state);
    }
    visit_assignmentOp(ast, state) {
        // assignmentOp
        state.push(" " + ast.allText + " ")
    }
    visit_bool(ast, state) {
        // bool
        state.push(ast.allText);
    }
    visit_breakStatement(ast, state) {
        // breakStatement
        state.pushLine("break;")
    }
    visit_compoundStatement(ast, state) {
        // recStatement[0,Infinity]
        state.pushLine("{");
        this.visitChildren(ast, state);
        state.pushLine("}");
    }
    visit_conditionalExpr(ast, state) {
        // seq(conditionalExprLeft,conditionalExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_conditionalExprLeft(ast, state) {
        // rangeExpr
        this.visitChildren(ast, state);
    }
    visit_conditionalExprRight(ast, state) {
        // seq(conditionalExprLeft,conditionalExprLeft)
        state.push(' ? ');
        this.visitNode(ast.children[0], state);
        this.visitNode(ast.children[1], state);
    }
    visit_continueStatement(ast, state) {
        // continueStatement
        state.push('continue;');
    }
    visit_doLoop(ast, state) {        
        // seq(recStatement,loopCond)
        state.pushLine('do');
        this.visitChildren(ast, state);
    }
    visit_doubleQuotedStringContents(ast, state) {
        // stringLiteralChar[0,Infinity]
        state.push('"');
        state.push(ast.allText);
        state.push('"');
    }
    visit_elseStatement(ast, state) {
        // recStatement
        state.pushLine('else');
        this.visitChildren(ast, state);
    }
    visit_emptyStatement(ast, state) {
        // emptyStatement
        state.pushLine(';');
    }
    visit_equalityExpr(ast, state) {
        // seq(equalityExprLeft,equalityExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_equalityExprLeft(ast, state) {
        // relationalExpr
        this.visitChildren(ast, state);
    }
    visit_equalityExprRight(ast, state) {
        // seq(equalityOp,equalityExprLeft)
        this.visitChildren(ast, state);
    }
    visit_equalityOp(ast, state) {
        // equalityOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_exprStatement(ast, state) {
        // expr
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_fieldSelect(ast, state) {
        // identifier
        state.push('.');
        this.visitChildren(ast, state);
    }
    visit_file(ast, state) {
        // seq(langDecl[0,1],moduleName,moduleBody)
        this.visitChildren(ast, state);
    }
    visit_forLoop(ast, state) {
        // seq(identifier,expr,recStatement)
        state.push('for (');
        this.visitNode(ast.children[0], state);
        state.push(' in ');
        this.visitNode(ast.children[1], state);
        state.pushLine(')');
        this.visitNode(ast.children[2], state);
    }
    visit_funCall(ast, state) {
        // seq(expr,expr[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    }
    visit_funcBody(ast, state) {
        // choice(funcBodyStatement,funcBodyExpr)
        this.visitChildren(ast, state);
    }
    visit_funcBodyExpr(ast, state) {
        // expr
        state.push(' = ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_funcBodyStatement(ast, state) {
        // recCompoundStatement
        this.visitChildren(ast, state);
    }
    visit_funcDef(ast, state) {
        // seq(funcSig,funcBody)
        state.push('function ');
        this.visitChildren(ast, state);
    }
    visit_funcName(ast, state) {
        // identifier
        state.push(ast.allText);
    }
    visit_funcParam(ast, state) {
        // seq(funcParamName,typeExpr[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' : ');
            this.visitNode(ast.children[1], state);
        }
    }
    visit_funcParamName(ast, state) {
        // identifier
        state.push(ast.allText);
    }
    visit_funcParams(ast, state) {
        // seq(funcParam,funcParam[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(')');
    }
    visit_funcSig(ast, state) {
        // seq(funcName,genericsParams,funcParams)
        this.visitChildren(ast, state);
        state.pushLine('');
    }
    visit_genericConstraint(ast, state) {
        // typeExpr
        state.push(' : ');
        this.visitChildren(ast, state);
    }
    visit_genericParam(ast, state) {
        // seq(identifier,genericConstraint[0,1])
        this.visitChildren(ast, state);
    }
    visit_genericsParams(ast, state) {
        // seq(genericParam,genericParam[0,Infinity])[0,1][0,1]
        if (ast.children.length > 0) {
            // Put a space in case of 'op' 
            state.push(' <');
            this.visitChildrenDelimited(ast, state, ', ');
            state.push('>');
        }
        this.visitChildren(ast, state);
    }
    visit_identifier(ast, state) {
        // opName
        state.push(ast.allText);
    }
    visit_ifCond(ast, state) {
        // expr
        state.push('if (');
        this.visitChildren(ast, state);
        state.push(')');
    }
    visit_ifStatement(ast, state) {
        // seq(ifCond,recStatement,elseStatement[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_intrinsicDef(ast, state) {
        // funcSig
        state.push('intrinsic ')
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_lambdaArg(ast, state) {
        // seq(identifier,typeExpr[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(': ');
            this.visitNode(ast.children[1], state);
        }
    }
    visit_lambdaArgs(ast, state) {
        // choice(lambdaArgsNoParen,lambdaArgsWithParen)
        this.visitChildren(ast, state);
    }
    visit_lambdaArgsNoParen(ast, state) {
        // identifier
        this.visitChildren(ast, state);
    }
    visit_lambdaArgsWithParen(ast, state) {
        // seq(lambdaArg,lambdaArg[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    }
    visit_lambdaBody(ast, state) {
        // choice(recCompoundStatement,expr)
        state.push(' => ');
        this.visitChildren(ast, state);
    }
    visit_lambdaExpr(ast, state) {
        // seq(lambdaArgs,lambdaBody)
        this.visitChildren(ast, state);
    }
    visit_langDecl(ast, state) {
        // langVer
        state.push('language ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_langVer(ast, state) {
        // urn
        state.push(ast.allText);
    }
    visit_leafExpr(ast, state) {
        // choice(varExpr,objectExpr,lambdaExpr,parenExpr,arrayExpr,number,bool,string,identifier)
        this.visitChildren(ast, state);
    }
    visit_logicalAndExpr(ast, state) {
        // seq(logicalAndExprLeft,logicalAndExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_logicalAndExprLeft(ast, state) {
        // equalityExpr
        this.visitChildren(ast, state);
    }
    visit_logicalAndExprRight(ast, state) {
        // seq(logicalAndOp,logicalAndExprLeft)
        this.visitChildren(ast, state);
    }
    visit_logicalAndOp(ast, state) {
        // logicalAndOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_logicalOrExpr(ast, state) {
        // seq(logicalOrExprLeft,logicalOrExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_logicalOrExprLeft(ast, state) {
        // logicalXOrExpr
        this.visitChildren(ast, state);
    }
    visit_logicalOrExprRight(ast, state) {
        // seq(logicalOrOp,logicalOrExprLeft)
        this.visitChildren(ast, state);
    }
    visit_logicalOrOp(ast, state) {
        // logicalOrOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_logicalXOrExpr(ast, state) {
        // seq(logicalXOrExprLeft,logicalXOrExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_logicalXOrExprLeft(ast, state) {
        // logicalAndExpr
        this.visitChildren(ast, state);
    }
    visit_logicalXOrExprRight(ast, state) {
        // seq(logicalXOrOp,logicalXOrExprLeft)
        this.visitChildren(ast, state);
    }
    visit_logicalXOrOp(ast, state) {
        // logicalXOrOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_loopCond(ast, state) {
        state.push('while (');
        this.visitChildren(ast, state);
        state.pushLine(')');
    }
    visit_moduleBody(ast, state) {
        // statement[0,Infinity]
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    }
    visit_moduleName(ast, state) {
        // urn
        state.push(ast.allText);
    }
    visit_multiplicativeExpr(ast, state) {
        // seq(multiplicativeExprLeft,multiplicativeExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_multiplicativeExprLeft(ast, state) {
        // prefixExpr
        this.visitChildren(ast, state);
    }
    visit_multiplicativeExprRight(ast, state) {
        // seq(multiplicativeOp,multiplicativeExprLeft)
        this.visitChildren(ast, state);
    }
    visit_multiplicativeOp(ast, state) {
        // multiplicativeOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_number(ast, state) {
        // number
        state.push(ast.allText);
    }
    visit_objectExpr(ast, state) {
        // objectField[0,Infinity]
        state.push('{ ')
        this.visitChildren(ast, state);
        state.push(' }');
    }
    visit_objectField(ast, state) {
        // seq(identifier,expr)
        this.visitNode(ast.children[0], state);
        state.push(' = ');
        this.visitNode(ast.children[1], state);
        state.push('; ')
    }
    visit_opName(ast, state) {
        // opName
        state.push(ast.allText);
    }
    visit_parenExpr(ast, state) {
        // expr
        state.push('(');
        this.visitChildren(ast, state);
        state.push(')');
    }
    visit_postDecOp(ast, state) {
        // postDecOp
        this.visitChildren(ast, state);
        state.push('--')
    }
    visit_postIncOp(ast, state) {
        // postIncOp
        this.visitChildren(ast, state);
        state.push('++')
    }
    visit_postfixExpr(ast, state) {
        // seq(leafExpr,choice(funCall,arrayIndex,fieldSelect,postIncOp,postDecOp)[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_prefixExpr(ast, state) {
        // seq(prefixOp[0,Infinity],postfixExpr)
        this.visitChildren(ast, state);
    }
    visit_prefixOp(ast, state) {
        // prefixOp
        state.push(ast.allText);
    }
    visit_rangeExpr(ast, state) {
        // seq(rangeExprLeft,rangeExprRight[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' .. ');            
            this.visitNode(ast.children[0], state);
        }
    }
    visit_rangeExprLeft(ast, state) {
        // logicalOrExpr
        this.visitChildren(ast, state);
    }
    visit_rangeExprRight(ast, state) {
        // rangeExprLeft
        this.visitChildren(ast, state);
    }
    visit_recCompoundStatement(ast, state) {
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    }
    visit_relationalExpr(ast, state) {
        // seq(relationalExprLeft,relationalExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_relationalExprLeft(ast, state) {
        // additiveExpr
        this.visitChildren(ast, state);
    }
    visit_relationalExprRight(ast, state) {
        // seq(relationalOp,relationalExprLeft)
        this.visitChildren(ast, state);
    }
    visit_relationalOp(ast, state) {
        // relationalOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_returnStatement(ast, state) {
        // expr[0,1]
        state.push('return ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_singleQuotedStringContents(ast, state) {
        // stringLiteralChar[0,Infinity]
        state.push("'" + ast.allText + "'");
    }
    visit_statement(ast, state) {
        // choice(emptyStatement,compoundStatement,ifStatement,returnStatement,continueStatement,breakStatement,forLoop,doLoop,whileLoop,varDeclStatement,funcDef,intrinsicDef,exprStatement)
        this.visitChildren(ast, state);
    }
    visit_string(ast, state) {
        // choice(doubleQuotedStringContents,singleQuotedStringContents)
        this.visitChildren(ast, state);
    }
    visit_stringLiteralChar(ast, state) {
        // stringLiteralChar
        this.visitChildren(ast, state);
    }
    visit_typeExpr(ast, state) {
        // seq(typeName,typeParamList[0,1])
        this.visitChildren(ast, state);
    }
    visit_typeName(ast, state) {
        // identifier
        state.push(ast.allText);
    }
    visit_typeParam(ast, state) {
        // recType
        this.visitChildren(ast, state);
    }
    visit_typeParamList(ast, state) {
        // seq(typeParam,typeParam[0,Infinity])[0,1]
        if (ast.children.length == 0) return;
        state.push('<');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push('>');
    }
    visit_urn(ast, state) {
        // seq(urnPart,urnPart[0,Infinity])        
        this.visitChildrenDelimited(ast, state, ':');
    }
    visit_urnPart(ast, state) {
        // urnPart
        state.push(ast.allText);
    }
    visit_varDecl(ast, state) {
        // seq(varNameDecl,varInitialization)
        this.visitChildren(ast, state);
    }
    visit_varDeclStatement(ast, state) {
        // varDecls
        state.push('var ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_varDecls(ast, state) {
        // seq(varDecl,varDecl[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_varExpr(ast, state) {
        // seq(varDecls,expr)
        this.visitChildren(ast, state);
    }
    visit_varInitialization(ast, state) {
        // expr
        state.push(' = ');
        this.visitChildren(ast, state);
    }
    visit_varNameDecl(ast, state) {
        // identifier
        this.visitChildren(ast, state);
    }
    visit_whileLoop(ast, state) {
        // seq(loopCond,recStatement)
        this.visitChildren(ast, state);
    }
}
