import { Myna } from "myna-parser/myna";
import { HeronAstNode, isExpr, validateNode, throwError, preprocessAst, visitAst } from "./heron-ast-rewrite";
import { Type } from "./type-system";
import { Def, createDef, FuncDef } from "./heron-defs";
import { Ref } from "./heron-refs";
import { createExpr } from "./heron-expr";
import { Package } from "./heron-package";

/** 
 * Scope used for the purpose of name analysis creating ref/def chains.
 * A scope contains unique name declarations. Scopes are arranaged in a tree. 
 */
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

export function nodeId(node: HeronAstNode): string {    
    return node ? node.name + '_' + node['id'] : '';
}

export const scopeType = ['funcDef', 'instrinsicDef', 'module', 'varExpr', 'compoundStatement'];

function isValidScopeType(s: string): boolean {
    return scopeType.indexOf(s) >= 0;
}

// Used for visiting nodes in the Heron node looking for name defintions, usages, and scopes.
export class NameAnalyzer
{
    // Visitor helper functions
    visitNode(node: HeronAstNode, state: Package) {
        if (node.def)
            state.addDef(node.def);
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
    visit_forLoop(node: HeronAstNode, state: Package) {
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
        state.addRef(node.allText, node);
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
    visit_varExpr(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_varName(node: HeronAstNode, state: Package) {
        state.addRef(node.allText, node);
    }
}
