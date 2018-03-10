// This module provides support for dealing with reference. 
// A reference is a name (identifier) that refers to a definition.
// There can be more than one definitions (for examples when dealing with overloaded functions)

import { Myna } from "myna-parser/myna";
import { Def } from "./heron-defs";
import { Scope } from "./heron-scope-analysis";
import { throwError, HeronAstNode } from "./heron-ast-rewrite";

// The kind of the reference
export enum RefType { 
    var, type
}

// A reference to one or more definitions.
export class Ref 
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly scope: Scope,
        public readonly refType: RefType,
        public readonly defs: Def[])
    { 
        node['ref'] = this;
        if (defs.length === 0)
            throwError(node, 'No definition found for ' + name);
    }

    get refTypeString() {
        switch (this.refType)
        {
            //case RefType.arg: return 'arg';
            //case RefType.fun: return 'fun';
            //case RefType.lvalue: return 'lval';
            //case RefType.rvalue: return 'rval';
            case RefType.type: return 'type';
            case RefType.var: return 'var';
        }
        throwError(this.node, "Not a handled usage type");
    }

    toString(): string {
        return this.name + '_' + this.node['id'] + ':' + this.node.name + ':' + this.refTypeString + '[' + this.defs.join(', ') + ']';
    }
}