// This module provides support for dealing with reference. 
// A reference is a name (identifier) that refers to a definition.
// There can be more than one definitions (for examples when dealing with overloaded functions)

import { Myna } from "myna-parser/myna";
import { Def, VarDef, ForLoopVarDef, TypeDef, TypeParamDef, FuncDef, FuncParamDef } from "./heron-defs";
import { throwError, HeronAstNode } from "./heron-ast-rewrite";
import { Scope } from "./heron-name-analysis";

// A reference to one or more definitions.
export class Ref 
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly scope: Scope,
        public readonly defs: Def[])
    { 
        node.ref = this;
        if (defs.length === 0)
            throwError(node, 'No definition found for ' + name);
    }

    toString(): string {
        return this.name + '_' + this.node['id'] + ':' + this.node.name + '[' + this.defs.join(', ') + ']';
    }
}

export class VarRef extends Ref {
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly scope: Scope,
        public readonly def: VarDef)
    { 
        super(node, name, scope, [def]);
    }
}

export class ForLoopVarRef extends Ref {
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly scope: Scope,
        public readonly def: ForLoopVarDef)
    { 
        super(node, name, scope, [def]);
    }
}

export class FuncParamRef extends Ref {
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly scope: Scope,
        public readonly def: FuncParamDef)
    { 
        super(node, name, scope, [def]);
    }
}

export class TypeRef extends Ref {
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly scope: Scope,
        public readonly def: TypeDef)
    { 
        super(node, name, scope, [def]);
    }
}

export class TypeParamRef extends Ref {
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly scope: Scope,
        public readonly def: TypeParamDef)
    { 
        super(node, name, scope, [def]);
    }
}

export class FuncRef extends Ref {
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly scope: Scope,
        public readonly defs: FuncDef[])
    { 
        super(node, name, scope, defs);
    }    
}