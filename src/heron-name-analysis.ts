import { Myna } from "myna-parser/myna";

// The whole point of this module is to wander around the AST looking for 
// what names are used where, and what functions are called on what values, etc. 
// The first thing I need to do with it though is to tell me, how many different 
// versions of a function is there. This is because right now we can't have multiple
// functions with the same number of arguments. 

interface Lookup<T> {
    [name: string]: T;
}

class VarUsage {
    node: Myna.AstNode;
    def: VarDef;
    name: string;
}

class VarDef {
    node: Myna.AstNode;
    name: string;
}

class Scope {
    node: Myna.AstNode;
    usages: VarUsage[];
    defs: Lookup<VarDef>;
    children: Scope[] = [];
    parent: Scope;

    findDef(name: string): VarDef {
        if (name in this.defs) 
            return this.defs[name];
        if (parent == null)
            return null;
        return this.parent.findDef(name);
    }
}

class State {
    curScope: Scope;

    pushScope(ast) {
        let tmp = new Scope();
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
        if (name in this.curScope.defs)
            throw new Error("Rdefining variable " + name);
        this.curScope.defs[name]
    }

    addVarUsage(name: string, node: Myna.AstNode) {
        let usage = new VarUsage();
        usage.name = name;
        usage.node = node;
        usage.def = this.findDef(name);
    }
}

class HeronVisitor
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

    visit_fieldSelect(ast, state) {
        state.addVarUsage(ast.allText, state);
        this.visitChildren(ast, state);
    }
    visit_funcDef(ast, state) {
        state.pushScope();
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_funcName(ast, state) {
        state.addVarDef(ast.allText, ast);
        this.visitChildren(ast, state);
    }
    visit_funcParam(ast, state) {
        state.addVarDef(ast.allText, ast);
        this.visitChildren(ast, state);
    }
    visit_identifier(ast, state) {
        state.addVarUsage(ast.allText, ast);
        this.visitChildren(ast, state);
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
    visit_moduleName(ast, state) {
        state.addVarDef(ast.allText, ast);
        this.visitChildren(ast, state);
    }
    visit_recCompoundStatement(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_statement(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_topLevelStatement(ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_varDecl(ast, state) {
        state.addVarDef(ast.children[0].allText, ast);
        this.visitChildren(ast, state);
    }
}
