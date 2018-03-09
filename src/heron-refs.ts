import { Def } from "./heron-defs";
import { Myna } from "myna-parser/myna";

// The kind of the reference
export enum RefType { 
    fun, var, type, arg, lvalue, rvalue
}

// A reference to one or more definitions.
export class Ref 
{
    // This value is set manually
    defs: Def[] = []; 
    
    constructor(
        public name: string,
        public node: Myna.AstNode,
        public usageType: RefType)
    { 
        node['ref'] = this;
    }

    get usageTypeString() {
        switch (this.usageType)
        {
            case RefType.arg: return 'arg';
            case RefType.fun: return 'fun';
            case RefType.lvalue: return 'lval';
            case RefType.rvalue: return 'rval';
            case RefType.type: return 'type';
            case RefType.var: return 'var';
        }
        throw new Error("Not a handled usage type");
    }

    toString(): string {
        return this.name + '_' + this.node['id'] + ':' + this.node.name + ':' + this.usageTypeString;
    }
}

