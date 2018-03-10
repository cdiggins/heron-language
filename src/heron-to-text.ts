import { CodeBuilder } from "./code-builder";
import { Scope } from "./heron-scope-analysis";
import { HeronAstNode, isExpr } from "./heron-ast-rewrite";
import { Ref } from "./heron-refs";

// Given an AST, will generate a text representation of the code as Heron code
// that has been marked up with the analysis results. 
export function heronToText(ast: HeronAstNode): string {
    let v = new HeronToTextVisitor();
    let cb = new CodeBuilder();    
    let now = new Date();
    cb.pushLine('// Generated on ' + now.toDateString() + ' ' + now.toTimeString());
    v.visitNode(ast, cb);
    return cb.lines.join('');
}

function outputDetails(node: HeronAstNode, state: CodeBuilder) {
    if (node.scope) 
        state.pushLine('// scope ' + node.scope);
    if (node.ref) 
        state.pushLine('// reference ' + node.ref);
    if (node.def) 
        state.pushLine('// definition ' + node.def);    
    if (node.expr) 
        state.pushLine('// expression ' + node.expr.constructor['name'] + ' ' + node.expr);
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
        // seq(funcName,genericParams,funcParams)
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
    visit_genericParams(ast: HeronAstNode, state: CodeBuilder) {
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
    visit_logicalAndOp(ast: HeronAstNode, state: CodeBuilder) {
        // logicalAndOp
        state.push(' ' + ast.allText + ' ');
    }
    visit_logicalOrOp(ast: HeronAstNode, state: CodeBuilder) {
        // logicalOrOp
        state.push(' ' + ast.allText + ' ');
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
    visit_recCompoundStatement(ast: HeronAstNode, state: CodeBuilder) {
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
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
    visit_returnType(ast: HeronAstNode, state: CodeBuilder) {
        // TypeExpr
        state.push(' : ');
        this.visitChildren(ast, state);
    }
    visit_singleQuotedStringContents(ast: HeronAstNode, state: CodeBuilder) {
        // stringLiteralChar[0,Infinity]
        state.push("'" + ast.allText + "'");
    }
    visit_typeName(ast: HeronAstNode, state: CodeBuilder) {
        // identifier
        state.push(ast.allText);
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
    visit_varName(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_varDeclStatement(ast: HeronAstNode, state: CodeBuilder) {
        // varDecls
        state.push('var ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_varInitialization(ast: HeronAstNode, state: CodeBuilder) {
        // expr
        state.push(' = ');
        this.visitChildren(ast, state);
    }
    visit_whileLoop(ast: HeronAstNode, state: CodeBuilder) {
        // seq(loopCond,recStatement)
        state.push('while (');
        this.visitNode(ast.children[0], state);
        state.pushLine(')')
        this.visitChildren(ast, state);
        this.visitNode(ast.children[1], state);
    }
}
