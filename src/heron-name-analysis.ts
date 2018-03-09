// TODO: if a var usage is a function, what are the arguments!
// TODO: maybe I should be updating the Ast tree with extra information. 
// - adding tags to indicate whether the expression is a func arg etc. 
// - or maybe  

import { Myna } from "myna-parser/myna";
import { HeronAstNode } from "./heron-compiler";
import { isExpr } from "./heron-ast-rewrite";
import { Type } from "type-inference/type-system";
import { ModuleDef, Def } from "./heron-defs";
import { Ref, RefType } from "./heron-refs";

export function typeToString(node: Myna.AstNode) {
    return node ? node.allText : 'Any';
}

// A scope contains unique name declarations. Scopes are arranaged in a tree. 
export class Scope 
{
    id: number = 0;
    refs: Ref[] = [];
    defs: Def[] = [];
    children: Scope[] = [];
    parent: Scope;
    
    constructor(public readonly node: Myna.AstNode) {
        if (node)
            node['scope'] = this;
    }

    // We can find multiple defs at the same level (e.g. functions)
    findDefs(name: string): Def[] {
        let r = [];
        for (var d of this.defs)
            if (d.name === name)
                r.push(d);
        if (r.length > 0)
            return r;
        return this.parent 
            ? this.parent.findDefs(name) 
            : [];
    }

    allDefs(r: Def[] = []): Def[] {
        r.push(...this.defs);
        this.children.forEach(c => c.allDefs(r));
        return r;
    }

    allRefs(r: Ref[] = []): Ref[] {
        r.push(...this.refs);
        this.children.forEach(c => c.allRefs(r));
        return r;
    }

    allScopes(r: Scope[] = []): Scope[] {
        r.push(this);
        this.children.forEach(c => c.allScopes(r));
        return r;
    }

    toString(): string { 
        if (!this.node)
            return "__global__";
        return nodeId(this.node);
    }
}

// Wraps a source file 
export class SourceFile 
{
    constructor(
        public readonly filePath: string,
        public readonly node: Myna.AstNode
    )
    { }
}

// A package is a compiled system. It contains a set of modules. 
// This is built incrementally by a visitor and stores all scopes, usages, and defs that are found. 
export class Package 
{
    modules: ModuleDef[] = [];
    scope: Scope = new Scope(null);
    scopes: Scope[] = [this.scope];
    usages: Ref[] = [];
    defs: Def[] = [];
    files: SourceFile[] = [];

    // When done calling analyzeFile on all files, call "resolveLinks"
    addFile(ast: Myna.AstNode, isBuiltIn: boolean, filePath: string) {
        if (ast.name !== 'file') {
            throw new Error('Not a file');
        }
        var visitor = new AstVisitor();
        for (var node of ast.children) {
            if (node.name !== 'module')
                continue;
            
            // Built in modules have their names added to the global scope
            if (!isBuiltIn) 
                this.pushScope(ast);
            const modName = ast.children[0].allText;
            const module = new ModuleDef(ast, modName);
            ast['module'] = module;
            this.modules.push(module);
            visitor.visitNode(ast, this);

            // Built in modules have their names added to the global scope
            if (!isBuiltIn) 
                this.popScope();
        }
        this.files.push(new SourceFile(filePath, ast));
    }

    // Find what possible definitions each var usage could have.
    resolveLinks() {
        for (let u of this.usages) 
            u.defs = u.scope.findDefs(u.name);
    }

    // Scans for modules
    getModule(name: string) {
        for (let m of this.modules)
            if (m.name === name) 
                return m;
        throw new Error("Module not found " + name);
    }
    
    //=============================================
    // These functions are used by the visitor to incrementally build the package  

    pushScope(ast) {
        let tmp = new Scope(ast);
        tmp.id = this.scopes.length;
        this.scopes.push(tmp);
        this.scope.children.push(tmp);
        tmp.parent = this.scope;
        this.scope = tmp;
    }

    popScope() {
        this.scope = this.scope.parent;
    }

    findDefs(name: string): Def[] {
        return this.scope.findDefs(name);
    }

    addDef(def: Def) {
        this.scope.defs.push(def);
        this.defs.push(def);
    }

    addVarUsage(name: string, node: Myna.AstNode, usageType: RefType) {
        let usage = new Ref(name, this.scope, node, usageType);
        this.scope.refs.push(usage);
        this.usages.push(usage);
    }
}

// Used for visiting nodes in the Heron AST looking for name defintions, usages, and scopes.
class AstVisitor
{
    // Visitor helper functions
    visitNode(ast: Myna.AstNode, state: Package) {
        const fnName = 'visit_' + ast.name;
        if (fnName in this)
            this[fnName](ast, state);
        else
            this.visitChildren(ast, state);
    }
    visitChildren(ast: Myna.AstNode, state: Package) {
        for (let child of ast.children)
            this.visitNode(child, state);
    }

    // Particular node visitors 
    visit_compoundStatement(ast: Myna.AstNode, state: Package) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_funcDef(ast: Myna.AstNode, state: Package) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_intrinsicDef(ast: Myna.AstNode, state: Package) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_typeName(ast: Myna.AstNode, state: Package) {
        state.addVarUsage(ast.allText, ast, RefType.type);
    }
    visit_lambdaArg(ast: Myna.AstNode, state: Package) {
        this.visitChildren(ast, state);
    }
    visit_lambdaBody(ast: Myna.AstNode, state: Package) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_lambdaExpr(ast: Myna.AstNode, state: Package) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_leafExpr(ast: Myna.AstNode, state: Package) {
        const child = ast.children[0];
        if (child.name === 'identifier') {
            state.addVarUsage(child.allText, ast, getUsageType(child));
        }
        else {
            this.visitChildren(ast, state);
        }
    }
    visit_recCompoundStatement(ast: Myna.AstNode, state: Package) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_varExpr(ast: Myna.AstNode, state: Package) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
}

export function nodeId(ast: Myna.AstNode): string {    
    return ast ? ast.name + '_' + ast['id'] : '';
}

export const scopeType = ['funcDef', 'instrinsicDef', 'module', 'varExpr', 'compoundStatement'];
export const nodeTypes = ['lambdaArg', 'funcDef', 'funcParamName', 'varDecl', 'typeDecl', 'intrinsicDef', 'genericParam', 'typeName', 'leafExpr', 'typeDef'];

function isValidNodeType(s: string): boolean {
    return nodeTypes.indexOf(s) >= 0;
}

function isValidScopeType(s: string): boolean {
    return scopeType.indexOf(s) >= 0;
}

// Returns true if the identifier is used as a function call. 
// A variable could still be a function, only a proper type analysis will tell.
function getUsageType(ast: Myna.AstNode): RefType {
    if (!ast || ast.name !== 'identifier') throw new Error("Expected an identifier");
    let expr = identExpr(ast);
    if (isFun(expr)) 
        return RefType.fun;
    if (isFunArg(expr))
        return RefType.arg;
    let p = expr['parent']
    if (p.name == 'assignmentExpr') {
        if (p.children.length !== 2)
            throw new Error("Assignment expressions should have exactly two children");
        if (p.children[0] === p)
            return RefType.lvalue;
        if (p.children[1] === p)
            return RefType.rvalue;
        throw new Error("Node is not a child of its parent");
    }
    throw new Error("Identifier used in an unrecognized expression context: " + p.name + " " + p.allText);
}

function identExpr(ast: Myna.AstNode): Myna.AstNode {
    if (!ast || ast.name !== 'identifier') throw new Error("Expected an identifier");
    ast = ast['parent'];
    if (!ast || ast.name !== 'leafExpr') return null;
    return ast;
}

// Returns whether an expression is a function that is called 
function isFun(ast: Myna.AstNode): boolean {
    if (!ast || ast.name !== 'leafExpr') return false;
    ast = ast['parent'];
    if (!ast || ast.name !== 'postfixExpr') return false;
    if (ast.children.length !== 2) throw new Error("Postfix expressions should be pre-processed to only have two children");
    return ast.children[1].name == 'funCall';
}

// Get all of the function arguments associated with a call.
function isFunArg(ast: Myna.AstNode): boolean {
    if (!ast || ast.name !== 'leafExpr') return false;
    ast = ast['parent'];
    if (!ast || ast.name !== 'funCall') return false;
    return true;
}

// Get all of the function arguments associated with a call.
function getFunArgs(ast: Myna.AstNode): Myna.AstNode[] {
    if (!ast || ast.name !== 'leafExpr') return [];
    ast = ast['parent'];
    if (!ast || ast.name !== 'postfixExpr') return [];
    if (ast.children.length !== 2) throw new Error("Postfix expressions should be pre-processed to only have two children");
    let r = ast.children[1].children;
}