// TODO: if a var usage is a function, what are the arguments!
// TODO: maybe I should be updating the Ast tree with extra information. 
// - adding tags to indicate whether the expression is a func arg etc. 
// - or maybe  

import { Myna } from "myna-parser/myna";
import { HeronAstNode } from "./heron-compiler";

enum VarUsageType { 
    fun, var, type, arg, lvalue, rvalue
}

// Represents a module of Heron code  
export class Module 
{
    imports: Module[] = [];

    constructor(
        public readonly name: string,
        public readonly node: Myna.AstNode)
    { 
    }

    get scope(): Scope {
        return this.node['scope'];
    }    
}

// A usage of a name. 
export class VarUsage {
    // This value is set manually
    defs: VarDef[] = []; 
    
    constructor(
        public name: string,
        public scope: Scope,
        public node: Myna.AstNode,
        public usageType: VarUsageType)
    { 
        if (!isValidNodeType(node.name))
            throw new Error("Not a valid node type: " + node.name);
        node['varUsage'] = this;
    }

    get usageTypeString() {
        switch (this.usageType)
        {
            case VarUsageType.arg: return 'arg';
            case VarUsageType.fun: return 'fun';
            case VarUsageType.lvalue: return 'lval';
            case VarUsageType.rvalue: return 'rval';
            case VarUsageType.type: return 'type';
            case VarUsageType.var: return 'var';
        }
        return '';
    }

    toString(): string {
        return this.name + '_' + this.node['id'] + ':' + this.node.name + ':' + this.usageTypeString;
    }
}

interface VarDefByType { [nodeType:string]: VarDef };

// The definition of a variable
export class VarDef {
    constructor(
        public name: string,
        public scope: Scope,
        public node: Myna.AstNode)
    { 
        if (!isValidNodeType(this.node.name))
            throw new Error("Invalid node type: " + this.node.name);
        node['varDef'] = this;
    }

    usages: VarUsage[] = [];

    get args(): Myna.AstNode[] {
        return (this.node.name === 'funcDef')
            ? this.node.children[1].children
            : [];        
    }

    get argTypes(): string[] {
        return this.args.map(p => p.children.length == 2 ? p.children[1].allText : "Any");
    }

    get scopedName(): string {
        return this.name + '_' + this.scope.id;
    }

    get decoratedName(): string {
        let r = this.scopedName;
        if (this.args.length > 0) 
            r += '$' + this.argTypes.join('$');
        return r;
    }

    toString(): string {
        return this.decoratedName;
    }
}

// A scope contains unique name declarations. Scopes are arranaged in a tree. 
export class Scope 
{
    id: number = 0;
    usages: VarUsage[] = [];
    defs: VarDef[] = [];
    children: Scope[] = [];
    parent: Scope;
    
    constructor(public readonly node: Myna.AstNode) {
        if (node)
            node['scope'] = this;
    }

    // We can find multiple defs at the same level (e.g. functions)
    findDefs(name: string): VarDef[] {
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

    allDefs(r: VarDef[] = []): VarDef[] {
        r.push(...this.defs);
        this.children.forEach(c => c.allDefs(r));
        return r;
    }

    allUsages(r: VarUsage[] = []): VarUsage[] {
        r.push(...this.usages);
        this.children.forEach(c => c.allUsages(r));
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
    modules: Module[] = [];
    scope: Scope = new Scope(null);
    scopes: Scope[] = [this.scope];
    usages: VarUsage[] = [];
    defs: VarDef[] = [];
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
            const module = new Module(modName, ast);
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

    findDefs(name: string): VarDef[] {
        return this.scope.findDefs(name);
    }

    addVarDef(name: string, node: Myna.AstNode) {
        let vd = new VarDef(name, this.scope, node);
        this.scope.defs.push(vd);
        this.defs.push(vd);
    }

    addVarUsage(name: string, node: Myna.AstNode, usageType: VarUsageType) {
        let usage = new VarUsage(name, this.scope, node, usageType);
        this.scope.usages.push(usage);
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
    visit_genericParam(ast: Myna.AstNode, state: Package) {
        let paramName = ast.children[0].allText;
        state.addVarDef(paramName, ast);        
    }
    visit_funcDef(ast: Myna.AstNode, state: Package) {
        let funcSig = ast.children[0];
        let funcName = funcSig.children[0];
        state.addVarDef(funcName.allText, ast);
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_intriniscDef(ast: Myna.AstNode, state: Package) {
        let funcSig = ast.children[0];
        let funcName = funcSig.children[0];
        state.addVarDef(funcName.allText, ast);
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    }
    visit_funcParamName(ast: Myna.AstNode, state: Package) {
        state.addVarDef(ast.allText, ast);
    }
    visit_typeName(ast: Myna.AstNode, state: Package) {
        state.addVarUsage(ast.allText, ast, VarUsageType.type);
    }
    visit_lambdaArg(ast: Myna.AstNode, state: Package) {
        state.addVarDef(ast.allText, ast);
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
    visit_varDecl(ast: Myna.AstNode, state: Package) {
        state.addVarDef(ast.children[0].allText, ast);
        this.visitChildren(ast, state);
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
export const nodeTypes = ['lambdaArg', 'funcDef', 'funcParamName', 'varDecl', 'typeDecl', 'intrinsicDef', 'genericParam', 'typeName', 'leafExpr'];

function isValidNodeType(s: string): boolean {
    return nodeTypes.indexOf(s) >= 0;
}

function isValidScopeType(s: string): boolean {
    return scopeType.indexOf(s) >= 0;
}

function varDefByType(vds: VarDef[]) : VarDefByType { 
    let r = {};
    for (var vd of vds) {
        const type = vd.node.name;
        if (!isValidNodeType(type))
            throw new Error("Not a valid node type " + type);
        (r[type] || (r[type] = [])).push(vd);
    }
    return r;
}

// Returns true if the identifier is used as a function call. 
// A variable could still be a function, only a proper type analysis will tell.
function getUsageType(ast: Myna.AstNode): VarUsageType {
    if (!ast || ast.name !== 'identifier') throw new Error("Expected an identifier");
    let expr = identExpr(ast);
    if (isFun(expr)) 
        return VarUsageType.fun;
    if (isFunArg(expr))
        return VarUsageType.arg;
    let p = expr['parent']
    if (p.name == 'assignmentExpr') {
        if (p.children.length !== 2)
            throw new Error("Assignment expressions should have exactly two children");
        if (p.children[0] === p)
            return VarUsageType.lvalue;
        if (p.children[1] === p)
            return VarUsageType.rvalue;
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