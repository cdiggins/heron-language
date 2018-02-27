import { Myna } from "myna-parser/myna";

export function analyzeHeronNames(ast: Myna.AstNode): NameAnalyzer {
    var scopes = new NameAnalyzer();
    var visitor = new AstVisitor();
    visitor.visitNode(ast, scopes);
    return scopes;
}

export interface Lookup<T> {
    [name: string]: T;
}

// A usage of a name. 
export class VarUsage {

    constructor(
        public name: string,
        public scope: Scope,
        public node: Myna.AstNode,
        public def: VarDef)
    { 
        if (def)
            def.usages.push(this);
    }
}

export type NameType = 'lambdaArg' | 'funcDef' | 'funcParam' | 'varDecl' | 'typeDecl' | 'intrinsicDef' | 'genericParam';

// The definition of a variable
export class VarDef {
    constructor(
        public name: string,
        public scope: Scope,
        public node: Myna.AstNode)
    { }

    usages: VarUsage[] = [];

    get args(): Myna.AstNode[] {
        return (this.node.name === 'funcDef')
            ? this.node.children[1].children
            : [];        
    }

    get argTypes(): string[] {
        return this.args.map(p => p.children.length == 2 ? p.children[1].allText : "Any");
    }

    get decoratedName(): string {
        if (this.args.length > 0) 
            return this.name + '$' + this.argTypes.join('$');
        else 
            return this.name;
    }
}

// A scope. Scopes create a tree. 
export class Scope 
{
    id: number = 0;
    node: Myna.AstNode;
    usages: VarUsage[] = [];
    defs: VarDef[] = [];
    children: Scope[] = [];
    parent: Scope;
    
    findDef(name: string): VarDef {
        for (var d of this.defs)
            if (d.name === name)
                return d;
        return this.parent 
            ? this.parent.findDef(name) 
            : null;
    }
}

// This is passed to the visitor and stores all scopes.  
export class NameAnalyzer {
    curScope: Scope = new Scope();
    scopes: Scope[] = [this.curScope];
    unknownVars: VarUsage[] = [];

    pushScope(ast) {
        let tmp = new Scope();
        tmp.id = this.scopes.length;
        this.scopes.push(tmp);
        this.curScope.children.push(tmp);
        tmp.parent = this.curScope;
        tmp.node = ast;
        this.curScope = tmp;
    }

    popScope() {
        this.curScope = this.curScope.parent;
    }

    findDef(name: string): VarDef {
        return this.curScope.findDef(name);
    }

    addVarDef(name: string, node: Myna.AstNode) {
        let vd = new VarDef(name, this.curScope, node);
        this.curScope.defs.push(vd);
    }

    addVarUsage(name: string, node: Myna.AstNode) {
        let usage = new VarUsage(name, this.curScope, node, this.findDef(name));
        this.curScope.usages.push(usage);
    }
}

// Used for visiting nodes in the Heron AST looking for name defintions, usages, and scopes.
class AstVisitor
{
    // Visitor helper functions
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

    // Particular node visitors 
    visit_compoundStatement(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_genericParam(ast, state) {
        let paramName = ast.children[0].allText;
        state.addVarDef(paramName, ast);        
    }
    visit_funcDef(ast, state) {
        let funcName = ast.children[0];
        state.addVarDef(funcName.allText, ast);
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_intriniscDef(ast, state) {
        let funcName = ast.children[0];
        state.addVarDef(funcName.allText, ast);
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_funcParamName(ast, state) {
        state.addVarDef(ast.allText, ast);
    }
    visit_typeName(ast, state) {
        state.addVarUsage(ast.allText, ast);
    }
    visit_lambdaArg(ast, state) {
        // TODO: when types are introduced, we will have to update this
        state.addVarDef(ast.allText, ast);
        this.visitChildren(ast, state);
    }
    visit_lambdaBody(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_lambdaExpr(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_leafExpr(ast, state) {
        const child = ast.children[0];
        if (child.name === 'identifier') 
            state.addVarUsage(child.allText, ast);
    }
    visit_module(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope(ast);
    }
    visit_recCompoundStatement(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_varDecl(ast, state) {
        state.addVarDef(ast.children[0].allText, ast);
        this.visitChildren(ast, state);
    }
    visit_varExpr(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
}