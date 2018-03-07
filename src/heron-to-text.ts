import { CodeBuilder } from "./code-builder";
import { HeronAstNode } from "./heron-compiler";
import { Scope, VarDef, VarUsage } from "./heron-name-analysis";
import { isExpr } from "./heron-ast-rewrite";

// Given an AST, will generate a text representation of the code as Heron code
// that has been marked up with the analysis results. 
export function heronToText(ast: HeronAstNode): string {
    let v = new HeronToTextVisitor();
    let cb = new CodeBuilder();
    v.visitNode(ast, cb);
    return cb.lines.join('');
}

function isFunc(node: HeronAstNode) {
    return node && (node.name === "funcDef" || node.name === "intrinsicDef");
}

function varUsageDetails(varUsage: VarUsage): string {
    return '// var usage ' + varUsage + ' defined at ' + '[' + varUsage.defs.join(', ') + ']';
}

function outputDetails(node: HeronAstNode, state: CodeBuilder) {
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
    if (isExpr(node)) {
    //    state.push(' /* ' + node.name + ':' + (node.type || '?') + ' */ ');
    }
}

// A visitor class for generating Heron code. 
class HeronToTextVisitor
{
    visitNode(ast: HeronAstNode, state: CodeBuilder) {
        outputDetails(ast, state);
        const fnName = 'visit_' + ast.name;
        if (fnName in this)
            this[fnName](ast, state);
        else
            this.visitChildren(ast, state);
    }
    visitChildren(ast: HeronAstNode, state: CodeBuilder) {
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
    visit_additiveExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(additiveExprLeft,additiveExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_additiveExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // multiplicativeExpr
        this.visitChildren(ast, state);
    }
    visit_additiveExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(additiveOp,additiveExprLeft)
        this.visitChildren(ast, state);
    }
    visit_additiveOp(ast: HeronAstNode, state: CodeBuilder) {
        // additiveOp
        state.push(" " + ast.allText + " ");
    }
    visit_arrayExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(expr,expr[0,Infinity])[0,1]
        state.push('[');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(']');
    }
    visit_arrayIndex(ast: HeronAstNode, state: CodeBuilder) {
        // expr
        state.push('[');
        this.visitChildren(ast, state);
        state.push(']');
    }
    visit_assignmentExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(assignmentExprLeft,assignmentExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_assignmentExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // conditionalExpr
        this.visitChildren(ast, state);
    }
    visit_assignmentExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(assignmentOp,assignmentExprLeft)
        this.visitChildren(ast, state);
    }
    visit_assignmentOp(ast: HeronAstNode, state: CodeBuilder) {
        // assignmentOp
        state.push(" " + ast.allText + " ")
    }
    visit_bool(ast: HeronAstNode, state: CodeBuilder) {
        // bool
        state.push(ast.allText);
    }
    visit_breakStatement(ast: HeronAstNode, state: CodeBuilder) {
        // breakStatement
        state.pushLine("break;")
    }
    visit_compoundStatement(ast: HeronAstNode, state: CodeBuilder) {
        // recStatement[0,Infinity]
        state.pushLine("{");
        this.visitChildren(ast, state);
        state.pushLine("}");
    }
    visit_conditionalExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(conditionalExprLeft,conditionalExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_conditionalExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // rangeExpr
        this.visitChildren(ast, state);
    }
    visit_conditionalExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(conditionalExprLeft,conditionalExprLeft)
        state.push(' ? ');
        this.visitNode(ast.children[0], state);
        this.visitNode(ast.children[1], state);
    }
    visit_continueStatement(ast: HeronAstNode, state: CodeBuilder) {
        // continueStatement
        state.push('continue;');
    }
    visit_doLoop(ast: HeronAstNode, state: CodeBuilder) {        
        // seq(recStatement,loopCond)
        state.pushLine('do');
        this.visitChildren(ast, state);
    }
    visit_doubleQuotedStringContents(ast: HeronAstNode, state: CodeBuilder) {
        // stringLiteralChar[0,Infinity]
        state.push('"');
        state.push(ast.allText);
        state.push('"');
    }
    visit_elseStatement(ast: HeronAstNode, state: CodeBuilder) {
        // recStatement
        state.pushLine('else');
        this.visitChildren(ast, state);
    }
    visit_emptyStatement(ast: HeronAstNode, state: CodeBuilder) {
        // emptyStatement
        state.pushLine(';');
    }
    visit_equalityExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(equalityExprLeft,equalityExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_equalityExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // relationalExpr
        this.visitChildren(ast, state);
    }
    visit_equalityExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(equalityOp,equalityExprLeft)
        this.visitChildren(ast, state);
    }
    visit_equalityOp(ast: HeronAstNode, state: CodeBuilder) {
        // equalityOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_exprStatement(ast: HeronAstNode, state: CodeBuilder) {
        // expr
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_fieldSelect(ast: HeronAstNode, state: CodeBuilder) {
        // identifier
        state.push('.');
        this.visitChildren(ast, state);
    }
    visit_file(ast: HeronAstNode, state: CodeBuilder) {
        // seq(langDecl[0,1],moduleName,moduleBody)
        this.visitChildren(ast, state);
    }
    visit_forLoop(ast: HeronAstNode, state: CodeBuilder) {
        // seq(identifier,expr,recStatement)
        state.push('for (');
        this.visitNode(ast.children[0], state);
        state.push(' in ');
        this.visitNode(ast.children[1], state);
        state.pushLine(')');
        this.visitNode(ast.children[2], state);
    }
    visit_funCall(ast: HeronAstNode, state: CodeBuilder) {
        // seq(expr,expr[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    }
    visit_funcBody(ast: HeronAstNode, state: CodeBuilder) {
        // choice(funcBodyStatement,funcBodyExpr)
        this.visitChildren(ast, state);
    }
    visit_funcBodyExpr(ast: HeronAstNode, state: CodeBuilder) {
        // expr
        state.push(' = ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_funcBodyStatement(ast: HeronAstNode, state: CodeBuilder) {
        // recCompoundStatement
        this.visitChildren(ast, state);
    }
    visit_funcDef(ast: HeronAstNode, state: CodeBuilder) {
        // seq(funcSig,funcBody)
        state.pushLine('');
        state.pushLine('/**');
        state.pushLine(ast.allText);
        state.pushLine('*/');
        outputDetails(ast, state);
        state.push('function ');
        this.visitChildren(ast, state);
    }
    visit_funcName(ast: HeronAstNode, state: CodeBuilder) {
        // identifier
        state.push(ast.allText);
    }
    visit_funcParam(ast: HeronAstNode, state: CodeBuilder) {
        // seq(funcParamName,typeExpr[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' : ');
            this.visitNode(ast.children[1], state);
        }
    }
    visit_funcParamName(ast: HeronAstNode, state: CodeBuilder) {
        // identifier
        state.push(ast.allText);
    }
    visit_funcParams(ast: HeronAstNode, state: CodeBuilder) {
        // seq(funcParam,funcParam[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(')');
    }
    visit_funcSig(ast: HeronAstNode, state: CodeBuilder) {
        // seq(funcName,genericsParams,funcParams)
        this.visitChildren(ast, state);
        state.pushLine('');
    }
    visit_genericConstraint(ast: HeronAstNode, state: CodeBuilder) {
        // typeExpr
        state.push(' : ');
        this.visitChildren(ast, state);
    }
    visit_genericParam(ast: HeronAstNode, state: CodeBuilder) {
        // seq(identifier,genericConstraint[0,1])
        this.visitChildren(ast, state);
    }
    visit_genericsParams(ast: HeronAstNode, state: CodeBuilder) {
        // seq(genericParam,genericParam[0,Infinity])[0,1][0,1]
        if (ast.children.length > 0) {
            // Put a space in case of 'op' 
            state.push(' <');
            this.visitChildrenDelimited(ast, state, ', ');
            state.push('>');
        }
        this.visitChildren(ast, state);
    }
    visit_identifier(ast: HeronAstNode, state: CodeBuilder) {
        // opName
        state.push(ast.allText);
    }
    visit_ifCond(ast: HeronAstNode, state: CodeBuilder) {
        // expr
        state.push('if (');
        this.visitChildren(ast, state);
        state.push(')');
    }
    visit_ifStatement(ast: HeronAstNode, state: CodeBuilder) {
        // seq(ifCond,recStatement,elseStatement[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_intrinsicDef(ast: HeronAstNode, state: CodeBuilder) {
        // funcSig
        state.push('intrinsic ')
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_lambdaArg(ast: HeronAstNode, state: CodeBuilder) {
        // seq(identifier,typeExpr[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(': ');
            this.visitNode(ast.children[1], state);
        }
    }
    visit_lambdaArgs(ast: HeronAstNode, state: CodeBuilder) {
        // choice(lambdaArgsNoParen,lambdaArgsWithParen)
        this.visitChildren(ast, state);
    }
    visit_lambdaArgsNoParen(ast: HeronAstNode, state: CodeBuilder) {
        // identifier
        this.visitChildren(ast, state);
    }
    visit_lambdaArgsWithParen(ast: HeronAstNode, state: CodeBuilder) {
        // seq(lambdaArg,lambdaArg[0,Infinity])[0,1]
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    }
    visit_lambdaBody(ast: HeronAstNode, state: CodeBuilder) {
        // choice(recCompoundStatement,expr)
        state.push(' => ');
        this.visitChildren(ast, state);
    }
    visit_lambdaExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(lambdaArgs,lambdaBody)
        this.visitChildren(ast, state);
    }
    visit_langDecl(ast: HeronAstNode, state: CodeBuilder) {
        // langVer
        state.push('language ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_langVer(ast: HeronAstNode, state: CodeBuilder) {
        // urn
        state.push(ast.allText);
    }
    visit_leafExpr(ast: HeronAstNode, state: CodeBuilder) {
        // choice(varExpr,objectExpr,lambdaExpr,parenExpr,arrayExpr,number,bool,string,identifier)
        this.visitChildren(ast, state);
    }
    visit_logicalAndExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(logicalAndExprLeft,logicalAndExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_logicalAndExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // equalityExpr
        this.visitChildren(ast, state);
    }
    visit_logicalAndExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(logicalAndOp,logicalAndExprLeft)
        this.visitChildren(ast, state);
    }
    visit_logicalAndOp(ast: HeronAstNode, state: CodeBuilder) {
        // logicalAndOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_logicalOrExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(logicalOrExprLeft,logicalOrExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_logicalOrExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // logicalXOrExpr
        this.visitChildren(ast, state);
    }
    visit_logicalOrExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(logicalOrOp,logicalOrExprLeft)
        this.visitChildren(ast, state);
    }
    visit_logicalOrOp(ast: HeronAstNode, state: CodeBuilder) {
        // logicalOrOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_logicalXOrExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(logicalXOrExprLeft,logicalXOrExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_logicalXOrExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // logicalAndExpr
        this.visitChildren(ast, state);
    }
    visit_logicalXOrExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(logicalXOrOp,logicalXOrExprLeft)
        this.visitChildren(ast, state);
    }
    visit_logicalXOrOp(ast: HeronAstNode, state: CodeBuilder) {
        // logicalXOrOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_loopCond(ast: HeronAstNode, state: CodeBuilder) {
        state.push('while (');
        this.visitChildren(ast, state);
        state.pushLine(')');
    }
    visit_moduleBody(ast: HeronAstNode, state: CodeBuilder) {
        // statement[0,Infinity]
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    }
    visit_moduleName(ast: HeronAstNode, state: CodeBuilder) {
        // urn
        state.push(ast.allText);
    }
    visit_multiplicativeExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(multiplicativeExprLeft,multiplicativeExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_multiplicativeExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // prefixExpr
        this.visitChildren(ast, state);
    }
    visit_multiplicativeExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(multiplicativeOp,multiplicativeExprLeft)
        this.visitChildren(ast, state);
    }
    visit_multiplicativeOp(ast: HeronAstNode, state: CodeBuilder) {
        // multiplicativeOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_number(ast: HeronAstNode, state: CodeBuilder) {
        // number
        state.push(ast.allText);
    }
    visit_objectExpr(ast: HeronAstNode, state: CodeBuilder) {
        // objectField[0,Infinity]
        state.push('{ ')
        this.visitChildren(ast, state);
        state.push(' }');
    }
    visit_objectField(ast: HeronAstNode, state: CodeBuilder) {
        // seq(identifier,expr)
        this.visitNode(ast.children[0], state);
        state.push(' = ');
        this.visitNode(ast.children[1], state);
        state.push('; ')
    }
    visit_opName(ast: HeronAstNode, state: CodeBuilder) {
        // opName
        state.push(ast.allText);
    }
    visit_parenExpr(ast: HeronAstNode, state: CodeBuilder) {
        // expr
        state.push('(');
        this.visitChildren(ast, state);
        state.push(')');
    }
    visit_postDecOp(ast: HeronAstNode, state: CodeBuilder) {
        // postDecOp
        this.visitChildren(ast, state);
        state.push('--')
    }
    visit_postIncOp(ast: HeronAstNode, state: CodeBuilder) {
        // postIncOp
        this.visitChildren(ast, state);
        state.push('++')
    }
    visit_postfixExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(leafExpr,choice(funCall,arrayIndex,fieldSelect,postIncOp,postDecOp)[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_prefixExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(prefixOp[0,Infinity],postfixExpr)
        this.visitChildren(ast, state);
    }
    visit_prefixOp(ast: HeronAstNode, state: CodeBuilder) {
        // prefixOp
        state.push(ast.allText);
    }
    visit_rangeExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(rangeExprLeft,rangeExprRight[0,1])
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' .. ');            
            this.visitNode(ast.children[0], state);
        }
    }
    visit_rangeExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // logicalOrExpr
        this.visitChildren(ast, state);
    }
    visit_rangeExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // rangeExprLeft
        this.visitChildren(ast, state);
    }
    visit_recCompoundStatement(ast: HeronAstNode, state: CodeBuilder) {
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    }
    visit_relationalExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(relationalExprLeft,relationalExprRight[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_relationalExprLeft(ast: HeronAstNode, state: CodeBuilder) {
        // additiveExpr
        this.visitChildren(ast, state);
    }
    visit_relationalExprRight(ast: HeronAstNode, state: CodeBuilder) {
        // seq(relationalOp,relationalExprLeft)
        this.visitChildren(ast, state);
    }
    visit_relationalOp(ast: HeronAstNode, state: CodeBuilder) {
        // relationalOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_returnStatement(ast: HeronAstNode, state: CodeBuilder) {
        // expr[0,1]
        state.push('return ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_singleQuotedStringContents(ast: HeronAstNode, state: CodeBuilder) {
        // stringLiteralChar[0,Infinity]
        state.push("'" + ast.allText + "'");
    }
    visit_statement(ast: HeronAstNode, state: CodeBuilder) {
        // choice(emptyStatement,compoundStatement,ifStatement,returnStatement,continueStatement,breakStatement,forLoop,doLoop,whileLoop,varDeclStatement,funcDef,intrinsicDef,exprStatement)
        this.visitChildren(ast, state);
    }
    visit_string(ast: HeronAstNode, state: CodeBuilder) {
        // choice(doubleQuotedStringContents,singleQuotedStringContents)
        this.visitChildren(ast, state);
    }
    visit_stringLiteralChar(ast: HeronAstNode, state: CodeBuilder) {
        // stringLiteralChar
        this.visitChildren(ast, state);
    }
    visit_typeExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(typeName,typeParamList[0,1])
        this.visitChildren(ast, state);
    }
    visit_typeName(ast: HeronAstNode, state: CodeBuilder) {
        // identifier
        state.push(ast.allText);
    }
    visit_typeParam(ast: HeronAstNode, state: CodeBuilder) {
        // recType
        this.visitChildren(ast, state);
    }
    visit_typeParamList(ast: HeronAstNode, state: CodeBuilder) {
        // seq(typeParam,typeParam[0,Infinity])[0,1]
        if (ast.children.length == 0) return;
        state.push('<');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push('>');
    }
    visit_urn(ast: HeronAstNode, state: CodeBuilder) {
        // seq(urnPart,urnPart[0,Infinity])        
        this.visitChildrenDelimited(ast, state, ':');
    }
    visit_urnPart(ast: HeronAstNode, state: CodeBuilder) {
        // urnPart
        state.push(ast.allText);
    }
    visit_varDecl(ast: HeronAstNode, state: CodeBuilder) {
        // seq(varNameDecl,varInitialization)
        this.visitChildren(ast, state);
    }
    visit_varDeclStatement(ast: HeronAstNode, state: CodeBuilder) {
        // varDecls
        state.push('var ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_varDecls(ast: HeronAstNode, state: CodeBuilder) {
        // seq(varDecl,varDecl[0,Infinity])
        this.visitChildren(ast, state);
    }
    visit_varExpr(ast: HeronAstNode, state: CodeBuilder) {
        // seq(varDecls,expr)
        this.visitChildren(ast, state);
    }
    visit_varInitialization(ast: HeronAstNode, state: CodeBuilder) {
        // expr
        state.push(' = ');
        this.visitChildren(ast, state);
    }
    visit_varNameDecl(ast: HeronAstNode, state: CodeBuilder) {
        // identifier
        this.visitChildren(ast, state);
    }
    visit_whileLoop(ast: HeronAstNode, state: CodeBuilder) {
        // seq(loopCond,recStatement)
        this.visitChildren(ast, state);
    }
}
