import { CodeBuilder } from "./code-builder";
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
    if (node.type) 
        state.pushLine('// type ' + node.type);
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
        state.push(" " + ast.allText + " ");
    }
    visit_arrayExpr(ast: HeronAstNode, state: CodeBuilder) {
        state.push('[');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(']');
    }
    visit_arrayIndex(ast: HeronAstNode, state: CodeBuilder) {
        state.push('[');
        this.visitChildren(ast, state);
        state.push(']');
    }
    visit_assignmentOp(ast: HeronAstNode, state: CodeBuilder) {
        state.push(" " + ast.allText + " ")
    }
    visit_bool(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_breakStatement(ast: HeronAstNode, state: CodeBuilder) {
        state.pushLine("break;")
    }
    visit_compoundStatement(ast: HeronAstNode, state: CodeBuilder) {        // recStatement[0,Infinity]
        state.pushLine("{");
        this.visitChildren(ast, state);
        state.pushLine("}");
    }
    visit_conditionalExprRight(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' ? ');
        this.visitNode(ast.children[0], state);
        this.visitNode(ast.children[1], state);
    }
    visit_continueStatement(ast: HeronAstNode, state: CodeBuilder) {
        state.push('continue;');
    }
    visit_doLoop(ast: HeronAstNode, state: CodeBuilder) {        
        state.pushLine('do');
        this.visitChildren(ast, state);
    }
    visit_doubleQuotedStringContents(ast: HeronAstNode, state: CodeBuilder) {
        state.push('"');
        state.push(ast.allText);
        state.push('"');
    }
    visit_elseStatement(ast: HeronAstNode, state: CodeBuilder) {
        state.pushLine('else');
        this.visitChildren(ast, state);
    }
    visit_emptyStatement(ast: HeronAstNode, state: CodeBuilder) {
        state.pushLine(';');
    }
    visit_equalityOp(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' ' + ast.allText + ' ');
    }
    visit_exprStatement(ast: HeronAstNode, state: CodeBuilder) {
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_fieldSelect(ast: HeronAstNode, state: CodeBuilder) {
        state.push('.');
        this.visitChildren(ast, state);
    }
    visit_forLoop(ast: HeronAstNode, state: CodeBuilder) {
        state.push('for (');
        this.visitNode(ast.children[0], state);
        state.push(' in ');
        this.visitNode(ast.children[1], state);
        state.pushLine(')');
        this.visitNode(ast.children[2], state);
    }
    visit_funCall(ast: HeronAstNode, state: CodeBuilder) {
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    }
    visit_funcDef(ast: HeronAstNode, state: CodeBuilder) {
        state.pushLine('');
        state.pushLine('/**');
        state.pushLine(ast.allText);
        state.pushLine('*/');
        outputDetails(ast, state);
        state.push('function ');
        this.visitChildren(ast, state);
    }
    visit_funcName(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_funcParam(ast: HeronAstNode, state: CodeBuilder) {
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(' : ');
            this.visitNode(ast.children[1], state);
        }
    }
    visit_funcParamName(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_funcParams(ast: HeronAstNode, state: CodeBuilder) {
        state.push('(');
        this.visitChildrenDelimited(ast, state, ", ");
        state.push(')');
    }
    visit_funcSig(ast: HeronAstNode, state: CodeBuilder) {
        this.visitChildren(ast, state);
        state.pushLine('');
    }
    visit_genericConstraint(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' : ');
        this.visitChildren(ast, state);
    }
    visit_genericParams(ast: HeronAstNode, state: CodeBuilder) {
        if (ast.children.length > 0) {
            // Put a space because in case of 'op<' 
            state.push(' <');
            this.visitChildrenDelimited(ast, state, ', ');
            state.push('>');
        }
        this.visitChildren(ast, state);
    }
    visit_identifier(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_ifCond(ast: HeronAstNode, state: CodeBuilder) {
        state.push('if (');
        this.visitChildren(ast, state);
        state.push(')');
    }
    visit_intrinsicDef(ast: HeronAstNode, state: CodeBuilder) {
        state.push('intrinsic ')
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_lambdaArg(ast: HeronAstNode, state: CodeBuilder) {
        this.visitNode(ast.children[0], state);
        if (ast.children.length > 1) {
            state.push(': ');
            this.visitNode(ast.children[1], state);
        }
    }
    visit_lambdaArgs(ast: HeronAstNode, state: CodeBuilder) {
        state.push('(');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push(')');
    }
    visit_lambdaBody(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' => ');
        this.visitChildren(ast, state);
    }
    visit_langDecl(ast: HeronAstNode, state: CodeBuilder) {
        state.push('language ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_langVer(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_logicalAndOp(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' ' + ast.allText + ' ');
    }
    visit_logicalOrOp(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' ' + ast.allText + ' ');
    }
    visit_logicalXOrOp(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' ' + ast.allText + ' ');
    }
    visit_loopCond(ast: HeronAstNode, state: CodeBuilder) {
        state.push('while (');
        this.visitChildren(ast, state);
        state.pushLine(')');
    }
    visit_moduleBody(ast: HeronAstNode, state: CodeBuilder) {
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.pushLine('}');
    }
    visit_moduleName(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_multiplicativeOp(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' ' + ast.allText + ' ');
    }
    visit_number(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_objectExpr(ast: HeronAstNode, state: CodeBuilder) {
        state.push('{ ')
        this.visitChildren(ast, state);
        state.push(' }');
    }
    visit_objectField(ast: HeronAstNode, state: CodeBuilder) {
        this.visitNode(ast.children[0], state);
        state.push(' = ');
        this.visitNode(ast.children[1], state);
        state.push('; ')
    }
    visit_opName(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_parenExpr(ast: HeronAstNode, state: CodeBuilder) {
        state.push('(');
        this.visitChildren(ast, state);
        state.push(')');
    }
    visit_postDecOp(ast: HeronAstNode, state: CodeBuilder) {
        this.visitChildren(ast, state);
        state.push('--')
    }
    visit_postIncOp(ast: HeronAstNode, state: CodeBuilder) {
        this.visitChildren(ast, state);
        state.push('++')
    }
    visit_prefixOp(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_rangeExpr(ast: HeronAstNode, state: CodeBuilder) {
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
        state.push(' ' + ast.allText + ' ');
    }
    visit_returnStatement(ast: HeronAstNode, state: CodeBuilder) {
        state.push('return ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_returnType(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' : ');
        this.visitChildren(ast, state);
    }
    visit_singleQuotedStringContents(ast: HeronAstNode, state: CodeBuilder) {
        state.push("'" + ast.allText + "'");
    }
    visit_typeName(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_typeParamList(ast: HeronAstNode, state: CodeBuilder) {
        if (ast.children.length == 0) return;
        state.push('<');
        this.visitChildrenDelimited(ast, state, ', ');
        state.push('>');
    }
    visit_urn(ast: HeronAstNode, state: CodeBuilder) {
        this.visitChildrenDelimited(ast, state, ':');
    }
    visit_urnPart(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_varName(ast: HeronAstNode, state: CodeBuilder) {
        state.push(ast.allText);
    }
    visit_varDeclStatement(ast: HeronAstNode, state: CodeBuilder) {
        state.push('var ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_varInitialization(ast: HeronAstNode, state: CodeBuilder) {
        state.push(' = ');
        this.visitChildren(ast, state);
    }
    visit_whileLoop(ast: HeronAstNode, state: CodeBuilder) {
        state.push('while (');
        this.visitNode(ast.children[0], state);
        state.pushLine(')')
        this.visitChildren(ast, state);
        this.visitNode(ast.children[1], state);
    }
}
