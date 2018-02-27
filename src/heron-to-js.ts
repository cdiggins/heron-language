import { Myna } from "myna-parser/myna";
import { transformAst, identifierToString } from "./heron-ast-rewrite";
import { analyzeHeronNames, NameAnalyzer } from "./heron-name-analysis";

//=====================================
// Main entry function 

// It is assumed that the AST is transformed
export function heronToJs(ast) {
    var na = analyzeHeronNames(ast);
    mergeMultipleDefs(ast, na);
    let js = new HeronToJs();
    let cb = new CodeBuilder();
    js.visitNode(ast, cb);
    return cb;
}

//=====================================
// Helper functions 

export function generateAccessor(ast, state) {
    const name = ast.children[0].allText;
    state.pushLine("function " + name + "(obj) { return obj." + name + "; }");
}

export function generateAccessors(ast, state) {
    const objs = findAllNodesNamed(ast, "objectExpr");
    for (var obj of objs) 
        for (var field of obj.children) 
            generateAccessor(field, state);
}

export function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

export function sortyBy(xs, f) {
    return [...xs].sort(function(a,b) {return (f(a) > f(b)) ? 1 : ((f(b) > f(a)) ? -1 : 0);});
}

export function mergeMultipleDefs(ast, nameAnalysis: NameAnalyzer) {
    var funcDefs = [];
    for (var scope of nameAnalysis.scopes) 
        for (var def of scope.defs) 
            if (def.node.name === 'funcDef') 
                funcDefs.push(def);
    var grps = groupBy(funcDefs, x => x.name);
    for (var grp in grps) 
    {
        console.log(grp + ": " + grps[grp].map(op => op.decoratedName));
    }
}

export function findAllNodes(ast:Myna.AstNode, f:(_:Myna.AstNode)=>boolean, r:Myna.AstNode[]=[]): Myna.AstNode[] {
    if (f(ast))
        r.push(ast);
    ast.children.forEach(c => findAllNodes(c, f, r));
    return r;
}

export function findAllNodesNamed(ast:Myna.AstNode, name: string) : Myna.AstNode[] {
    return findAllNodes(ast, node => node.name === name);
}

//=====================================
// Helper class for constructing code 

class CodeBuilder {
    lines: string[] = [];
    indent: number = 0;
    get indentString() {
        let r = '';
        for (let i=0; i < this.indent; ++i)
            r += '  ';
        return r;
    }
    pushLine(s: string = '') {
        this.lines.push(s + '\n');
        this.lines.push(this.indentString);
    }
    push(s: string) {
        this.lines.push(s);
    }
    toString(): string {
        return this.lines.join('');
    }
}

//=====================================
// A class for generating JavaScript code from a transformed Heron AST

class HeronToJs
{
    // Helper functions 
    delimited(astNodes, state, delim) {
        for (let i=0; i < astNodes.length; ++i) {
            if (i > 0) 
                state.push(delim);
            this.visitNode(astNodes[i], state);
        }
    }    
    visitNode(ast, state) {
        const fnName = 'visit_' + ast.name;
        if (fnName in this)
            this[fnName](ast, state);
        else
            this.visitChildren(ast, state);
    }
    visitChildren(ast, state) {
        if (!ast.children)
            return;
        for (let child of ast.children)
            this.visitNode(child, state);
    }
    
    // Individual node visiting functions
    visit_bool(ast, state) {
        // bool
        state.push(' ' + ast.allText + ' ');
        this.visitChildren(ast, state);
    }
    visit_breakStatement(ast, state) {
        // breakStatement
        state.pushLine('break;')
        this.visitChildren(ast, state);
    }
    visit_compoundStatement(ast, state) {
        // recStatement[0,Infinity]
        state.indent++;
        state.pushLine('{');
        this.visitChildren(ast, state);
        state.indent--;
        if (state.lines[state.lines.length-1].trim() === '') {
            state.lines.pop();
            state.pushLine();
        }
        state.pushLine('}');
    }
    visit_continueStatement(ast, state) {
        // continueStatement
        state.pushLine('continue;');
    }
    visit_doLoop(ast, state) {
        // seq(recStatement,loopCond)
        state.pushLine('do');
        this.visitNode(ast.children[0], state);
        state.push('while (');
        this.visitNode(ast.children[1], state);
        state.pushLine(')')
    }
    visit_elseStatement(ast, state) {
        // recStatement
        state.pushLine("else");
        this.visitChildren(ast, state);
    }
    visit_emptyStatement(ast, state) {
        // emptyStatement
        state.pushLine(";");
    }
    visit_exprStatement(ast, state) {
        // expr
        this.visitChildren(ast, state);
        state.pushLine(";");
    }
    visit_forLoop(ast, state) {
        // seq(identifier,expr,recStatement)
        this.visitChildren(ast, state);
    }
    visit_funcBody(ast, state) {
        this.visitChildren(ast, state);
    }
    visit_funcBodyExpr(ast, state) {
        state.pushLine('{');
        state.push('return ');
        this.visitChildren(ast, state);
        state.pushLine(';');
        state.pushLine('}');
    }
    visit_funcBodyStatement(ast, state) {
        this.visitChildren(ast, state);
    }    
    visit_funcDef(ast, state) {
        // seq(funcName,funcParams,compoundStatement)
        state.push("function ");
        state.push(identifierToString(ast.children[0].allText));
        this.visitNode(ast.children[1], state);
        state.pushLine();
        this.visitNode(ast.children[2], state);
    }
    visit_funcName(ast, state) {
        // funcName
        this.visitChildren(ast, state);
    }
    visit_funcParam(ast, state) {
        // funcParam
        this.visitChildren(ast, state);
    }
    visit_funcParams(ast, state) {
        // funcParam[0, Infinity]
        state.push("(");
        this.delimited(ast.children, state, ", ");
        state.push(")");
    }
    visit_funcParamName(ast, state) {
        // funcParamName
        state.push(ast.allText);
    }
    visit_genericParam(ast, state) {
        // Don't visit children for now. 
    }
    visit_genericParams(ast, state) {
        // genericParam[0, Infinity]
        this.visitChildren(ast, state);
    }
    visit_identifier(ast, state) {
        // identifier
        state.push(identifierToString(ast.allText));
    }
    visit_ifCond(ast, state) {
        // expr
        this.visitChildren(ast, state);
    }
    visit_ifStatement(ast, state) {
        // seq(ifCond,recStatement,elseStatement[0,Infinity])
        state.push("if (");
        this.visitNode(ast.children[0], state);
        state.pushLine(")");
        this.visitNode(ast.children[1], state);
        for (let i=2; i < ast.children.length; ++i)
            this.visitNode(ast.children[i], state);
    }
    visit_loopCond(ast, state) {
        // expr
        this.visitChildren(ast, state);
    }
    visit_moduleBody(ast, state) {
        // statement[0, infinity]
        state.pushLine('{');
        generateAccessors(ast, state);
        this.visitChildren(ast, state);
        state.pushLine('}');
    }
    visit_moduleName(ast, state) {
        // seq(identifier,identifier[0,Infinity])
        state.push(ast.allText);
    }
    visit_module(ast, state) {
        state.pushLine('module ');
        this.visitChildren(ast, state);
    }
    visit_recCompoundStatement(ast, state) {
        // recCompoundStatement
        this.visitChildren(ast, state);
    }
    visit_returnStatement(ast, state) {
        // expr[0,1]
        state.push('return ');
        this.visitChildren(ast, state);
        state.pushLine(';');
    }
    visit_statement(ast, state) {
        // choice(emptyStatement,compoundStatement,ifStatement,returnStatement,continueStatement,breakStatement,forLoop,doLoop,whileLoop,varDecl,exprStatement,funcDef)
        this.visitChildren(ast, state);
    }
    visit_varDecl(ast, state) {
        // seq(identifier,varInitialization)
        state.push("let ");
        state.push(ast.children[0].allText);
        state.push(' = ');
        this.visitNode(ast.children[1], state);
        state.pushLine(';');
    }
    visit_varDeclStatement(ast, state) {
        // varDecls
        let vds = ast.children[0];
        if (vds.name !== "varDecls") throw new Error("Expected varDecls as children");
        for (let vd of vds) {
            state.push("let ");
            state.push(vd.children[0].allText);
            state.push(' = ');
            this.visitNode(vd.children[1], state);
            state.pushLine(';');
        }        
    }
    visit_whileLoop(ast, state) {
        // seq(loopCond,recStatement)
        state.push("while (");
        this.visitNode(ast.children[0], state);
        state.pushLine(")");
        this.visitNode(ast.children[1], state);        
    }

    //== 
    // Expressions

    visit_arrayExpr(ast, state) {
        // seq(expr,expr[0,Infinity])[0,1]
        state.push('$.array(');
        this.delimited(ast.children, state, ", ");
        state.push(')');
    }
    visit_arrayIndex(ast, state) {
        // expr 
        this.visitChildren(ast, state);
    }
    visit_assignmentExpr(ast, state) {
        this.visitNode(ast.children[0], state);
        state.push(' = ');
        this.visitNode(ast.children[1], state);
    }
    visit_conditionalExpr(ast, state) {
        if (ast.children.length != 2)
            throw new Error("Expected two children for a conditional expression");        
        this.visitChildren(ast, state);
    }
    visit_conditionalExprRight(ast, state) {
        state.push(' ? ');
        this.visitNode(ast.children[0], state);
        state.push(' : ');
        this.visitNode(ast.children[1], state);
    }
    visit_funCall(ast, state) {
        // seq(expr,expr[0,Infinity])[0,1]
        this.delimited(ast.children, state, ", ");
    }    
    visit_lambdaArg(ast, state) {
        // identifier
        this.visitChildren(ast, state);
    }
    visit_lambdaArgs(ast, state) {
        // choice(lambdaArgsNoParen,lambdaArgsWithParen)
        state.push("(");
        this.visitNode(ast.children[0], state);
        state.push(")");
    }
    visit_lambdaArgsNoParen(ast, state) {
        // identifier
        state.push(ast.allText);
    }
    visit_lambdaArgsWithParen(ast, state) {
        // seq(lambdaArg,lambdaArg[0,Infinity])[0,1]
        this.delimited(ast.children, state, ", ");
    }
    visit_lambdaBody(ast, state) {
        // choice(recCompoundStatement,expr)
        this.visitChildren(ast, state);
    }
    visit_lambdaExpr(ast, state) {
        // seq(lambdaArgs,lambdaBody)
        this.visitNode(ast.children[0], state);
        state.push(" => ");
        this.visitNode(ast.children[1], state);
    }
    visit_leafExpr(ast, state) {
        // choice(lambdaExpr,parenExpr,arrayExpr,number,bool,string,identifier)
        this.visitChildren(ast, state);
    }
    visit_number(ast, state) {
        // number
        state.push(ast.allText);
    }    
    visit_objectExpr(ast, state) {
        state.push(' { ');
        this.delimited(ast.children, state, ", ");
        state.push(' } ');
    }
    visit_objectField(ast, state) {
        // identifier, expr
        this.visitNode(ast.children[0], state);
        state.push(' : ');
        this.visitNode(ast.children[1], state);
    }
    visit_parenExpr(ast, state) {
        // expr
        state.push('(');
        this.visitChildren(ast, state);
        state.push(')');
    }
    visit_postfixExpr(ast, state) {        
        // seq(leafExpr, postfixOp[0,Infinity])
        if (ast.children.length == 1) {
            this.visitNode(ast.children[0], state);
            return;
        }

        if (ast.children.length != 2)
            throw new Error("Expected two children for a postfix expression");
        
        let astFirst = ast.children[0];
        let astLast = ast.children[1];
        switch (astLast.name)
        {
            case "fieldSelect":
                // Field selects are transformed into function calls. 
                state.push(astLast.children[0].allText);
                state.push("(");
                this.visitNode(astFirst, state);
                state.push(")");
                break;
             case "funCall":
                state.push("(");
                this.visitNode(astFirst, state);
                state.push(")(");
                this.visitNode(astLast, state);
                state.push(")");
                break;
            case "arrayIndex":
                state.push("$.at((");
                this.visitNode(astFirst, state);
                state.push("), ");
                this.visitNode(astLast, state);
                state.push(")");
                break;
            case "postIncOp":
                state.push("(");
                this.visitNode(astFirst, state);
                state.push(")++");
                break;
            case "postDecOp":
                state.push("(");
                this.visitNode(astFirst, state);
                state.push(")--");
                break;
            default:
                throw new Error("Unrecognized child node type: " + astLast.name);
        }
    }
    visit_prefixExpr(ast, state) {
        this.visitChildren(ast, state);
    }
    visit_prefixOp(ast, state) {
        state.push(ast.allText);
    }
    visit_rangeExpr(ast, state) {
        if (ast.children.length != 2) throw new Error("Range expression should have two children");
        state.push("$.range(");
        this.visitNode(ast.children[0], state);
        state.push(", ");
        this.visitNode(ast.children[1], state);
        state.push(")");
    }    
    visit_string(ast, state) {
        // choice(doubleQuotedStringContents,singleQuotedStringContents)
        state.push(ast.allText);
    }    
    // This is a classic transformation from Lisp/Scheme of a "let" form into a 
    // lambda-expression with immediate application. What is gives us is the ability 
    // is to use variable declarations in an expression.
    // (let ((x y)) expr) => ((lambda (x) expr)(y))
    // Heron is not pretentious about it though, and just uses familiar syntax:
    // (var x = y in expr)
    visit_varExpr(ast, state) {
        let vds = ast.children[0];
        if (vds.name !== "varDecls") throw new Error("Expected varDecls as children");
        state.push("(function(");        
        for (let i=0; i < vds.children.length; ++i) {
            if (i > 0) state.push(", ");
            let vd = vds.children[i];
            state.push(vd.children[0].allText);
        }        
        state.push(") { return ");
        this.visitNode(ast.children[1], state);
        state.push("; })(");
        for (let i=0; i < vds.children.length; ++i) {
            if (i > 0) state.push(", ");
            let vd = vds.children[i];
            this.visitNode(vd.children[1], state);
        }        
        state.push(")");
    }    
}
