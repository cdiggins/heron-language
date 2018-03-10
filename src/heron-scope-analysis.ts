// This module is used for computing scopes and resolving 
// references to definitions. A name means different things depending on 
// the scope. Scopes are managed in a Package, which represents the 
// entire set of compiled source code. 

import { Myna } from "myna-parser/myna";
import { HeronAstNode, isExpr, validateNode, throwError } from "./heron-ast-rewrite";
import { Type } from "type-inference/type-system";
import { ModuleDef, Def } from "./heron-defs";
import { Ref, RefType } from "./heron-refs";

// A scope contains unique name declarations. Scopes are arranaged in a tree. 
export class Scope 
{
    id: number = 0;
    refs: Ref[] = [];
    defs: Def[] = [];
    children: Scope[] = [];
    parent: Scope;
    
    constructor(public readonly node: HeronAstNode) {
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
        public readonly node: HeronAstNode
    )
    { }
}

// A package is a compiled system. It contains a set of modules. 
// This is built incrementally by a visitor and stores all scopes, definitions, 
// and references that are found. 
export class Package 
{
    modules: ModuleDef[] = [];
    scope: Scope = new Scope(null);
    scopes: Scope[] = [this.scope];
    refs: Ref[] = [];
    defs: Def[] = [];
    files: SourceFile[] = [];

    // When done calling analyzeFile on all files, call "resolveLinks"
    addFile(node: HeronAstNode, isBuiltIn: boolean, filePath: string) {
        if (node.name !== 'file')
            throwError(node, 'Not a file');
        node['file'] = filePath;

        let visitor = new AstVisitor();
        for (var node of node.children) {
            if (node.name !== 'module')
                continue;
            
            // Built in modules have their names added to the global scope
            if (!isBuiltIn) 
                this.pushScope(node);
            const modName = node.children[0].allText;
            const module = new ModuleDef(node, modName);
            this.modules.push(module);
            visitor.visitNode(node, this);

            // Built in modules have their names added to the global scope
            if (!isBuiltIn) 
                this.popScope();
        }
        this.files.push(new SourceFile(filePath, node));
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

    pushScope(node) {
        let scope = new Scope(node);
        scope.id = this.scopes.length;
        this.scopes.push(scope);
        this.scope.children.push(scope);
        scope.parent = this.scope;
        this.scope = scope;
   }

    popScope() {
        this.scope = this.scope.parent;
    }

    findDefs(name: string): Def[] {
        return this.scope.findDefs(name);
    }

    addDef(def: Def) {
        if (!def)
            throw new Error('Missing def as function argument to addDef');

        // We need to avoid double adding a def. 
        // This can happen because modules pre-scan their children for all definitions, 
        // so that they are present for each function. 
        if (this.defs.indexOf(def) < 0) {
            this.scope.defs.push(def);
            this.defs.push(def);
        }
    }

    addRef(name: string, node: HeronAstNode, refType: RefType) {
        let ref = new Ref(node, name, this.scope, refType, this.findDefs(name));
        this.scope.refs.push(ref);
        this.refs.push(ref);
    }
}

// Used for visiting nodes in the Heron node looking for name defintions, usages, and scopes.
class AstVisitor
{
    // Visitor helper functions
    visitNode(node: HeronAstNode, state: Package) {
        if (node['def'])
            state.addDef(node['def']);
        const fnName = 'visit_' + node.name;
        if (fnName in this)
            this[fnName](node, state);
        else 
            this.visitChildren(node, state);        
    }
    visitChildren(node: HeronAstNode, state: Package) {
        for (let child of node.children)
            this.visitNode(child, state);
    }

    // Particular node visitors 
    visit_compoundStatement(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_funcDef(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_intrinsicDef(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_typeName(node: HeronAstNode, state: Package) {
        state.addRef(node.allText, node, RefType.type);
    }
    visit_lambdaBody(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_lambdaExpr(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_module(node: HeronAstNode, state: Package) {
        // All definitions at the module level, are available to all others.
        for (let c of node.children[1].children)
            if (c['def'])
                state.addDef(c['def']);
        this.visitChildren(node, state);
    }
    visit_recCompoundStatement(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_varExpr(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_varName(node: HeronAstNode, state: Package) {
        state.addRef(node.allText, node, RefType.var);
    }
}

export function nodeId(node: HeronAstNode): string {    
    return node ? node.name + '_' + node['id'] : '';
}

export const scopeType = ['funcDef', 'instrinsicDef', 'module', 'varExpr', 'compoundStatement'];

function isValidScopeType(s: string): boolean {
    return scopeType.indexOf(s) >= 0;
}
