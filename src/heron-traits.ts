import { Package } from "./heron-package";
import { FuncDef } from "./heron-defs";

export class Trait {
    constructor(
        public readonly type: string)
    { }
    funcs: FuncDef[] = [];
}

export function getTraits(pkg: Package): Trait[] {
    let lookup = {};
    for (const def of pkg.allFuncDefs) {
        if (!def.body)
            for (var p of def.params.filter(p => p.type).map(p => p.type.toString()))
                (lookup[p] || (lookup[p] = new Trait(p))).funcs.push(def);
    }
    let traits = [];
    for (var k in lookup)
        traits.push(lookup[k])
    return traits;
}
