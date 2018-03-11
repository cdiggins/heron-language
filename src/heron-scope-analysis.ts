import { Myna } from "myna-parser/myna";
import { HeronAstNode, isExpr, validateNode, throwError } from "./heron-ast-rewrite";
import { Type } from "type-inference/type-system";
import { Def } from "./heron-defs";
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

export function nodeId(node: HeronAstNode): string {    
    return node ? node.name + '_' + node['id'] : '';
}

export const scopeType = ['funcDef', 'instrinsicDef', 'module', 'varExpr', 'compoundStatement'];

function isValidScopeType(s: string): boolean {
    return scopeType.indexOf(s) >= 0;
}
