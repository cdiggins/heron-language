/*
class LiteralsClass {
    One = 'one';
    Two = 'two';
}

// A typed object with all of the fields in the literals class
type LiteralTypes = { [K in keyof LiteralsClass] : K; }

// All of the members of the Literals class as values
const Literals = new LiteralsClass() as LiteralTypes;

// Set the values of the object to be actual strings
//for (let k in Literals) Literals[k] = k;

// A type that represents union of all of the types
type LiteralType = K keyof LiteralsClass;

// A function for doing somethign
function doSomething(x: LiteralType) {
    console.log(x);
}

let x: typeof Literals.One;
x = 'one';
// x = 'Two'; // type failure

console.log("Expect One");
doSomething('One');

console.log("Expect Two");
doSomething(Literals.Two);

console.log("Expect One");
doSomething(x);

//doSomething('Three'); // Type Error

//type Literals = { [K in keyof LiteralKeywords]: K  }

// const x = new Literals();

//console.log(Literals.One)
*/
/*
namespace Literals {
    export const One = new Literal<'one'>();
    export const Two = new Literal<'two'>();
    export type TLiteral = typeof One | typeof Two;
}

function doSomething(lit: Literals.TLiteral) {
    console.log(lit.name);
}

doSomething(Literals.One);
*/
/*
type nodeTypes = 'funcDef' | 'funcSig' | 'funcParams' | 'funcParam';

type AstSeq<T i  string
> = { [K in T] }

class Ast {
    name: string;
}

class Seq<T0, T1, T2 = {}, T3 = {}> {
    T0.
}

class AstFuncSig {

}

class Choice<name extends string, T0, T1, T2 = {}, T3 = {}> {
    node: T0 & T1 & T2 & T3;
}
*/
/*
import { Myna } from "myna-parser/myna";

const lines: string[] = [];

export function upperCaseFirst(s: string) : string  {
    if (!s || s.length === 0) return s;
    return s[0].toUpperCase() + s.substr(1);7
}

export function astTypeName(r: Myna.Rule): string {
    if (!r.name || r.name.length === 0) throw new Error("Rule is missing a name " + r);
    return "Ast" + upperCaseFirst(r.name);
}

type NodeTypes = 'funcDef' | 'funcSig' | 'funcParam' | 'funcBody' | 'a' | 'b';

function createAstNode(node: Myna.AstNode) {
    switch (node.name) {
        case 'funcDef': return new AstFuncDef(node);
        case 'funcBody': return new AstFuncBody(node);
    }
}

class AstQuantifiedNode<Node> {
}

type Seq<T0, T1> = T0 & T1;

class AstFuncDef {
    funcDef: Myna.AstNode;
    children: Seq<
}

class AstNode {
    constructor(public readonly node: Myna.AstNode) { }
}

class AstNodeBase<T extends NodeTypes> extends AstNode {
    public name: T;
}

class AstFuncSig extends AstNodeBase<'funcSig'> {
}

class AstA extends AstNodeBase<'a'> { }
class AstB extends AstNodeBase<'b'> { }

class AstFuncBody extends AstNodeBase<'funcBody'> {
    choice = new AstChoice<AstA | AstB>(createAstNode(this.node.children[0]));
}

class AstChoice<T> {
    constructor(public node: T) {
    }
}


class AstFuncDef extends AstNodeBase<'funcDef'>
{
    funcSig = new AstFuncSig(this.node.children[0]);
    funcBody = new AstFuncBody(this.node.children[1]);
}

export function toType(r: Myna.Rule, inSeq:boolean=false, inChoice:boolean=false) : string {
    let rules = r.rules.filter(r => r.createsAstNode);
    if (!rules.length)
        return r.name;
    if (rules.length == 1) {
        var result = rules[0].astRuleNameOrDefn(inSeq, inChoice);7
        if (r instanceof Myna.Quantified)
            result += "[" + r.min + "," + r.max + "]";
        return result;
    }
    if (r instanceof Myna.Sequence) {
        var tmp = rules.map(r => r.astRuleNameOrDefn(true, false)).join(",");
        if (inSeq) return tmp;
        return "seq(" + tmp + ")";
    }

    if (r instanceof Myna.Choice) {
        var tmp = rules.map(r => r.astRuleNameOrDefn(false, true)).join(",");
        if (inChoice) return tmp;
        return "choice(" + tmp + ")";
    }
        
    throw new Error("Internal error: not a valid AST rule");
}
*/ 
//# sourceMappingURL=gen-ast-types.js.map