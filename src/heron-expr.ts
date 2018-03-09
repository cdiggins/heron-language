import { Myna } from "myna-parser/myna";
import { Type } from "type-inference/build/type-system";
import { Types } from "./heron-types";
import { FuncDef, TypeDef, VarDef } from "./heron-defs";

// Expressions are either: named function sets, anonymous functions, function calls, variables, or literals.
// In order to work out the type we need to work out the type of the things it depends on first. 
// This can be done by creating a graph, OR by simply computing type by pulling on the thread. 
export class Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly type: Type
    )
    { }
}

// A named reference to a function can resolve to multiple functions, so we talk in terms of function sets.
// The type of a function set is the union of the types of each function definition it has  
export class FuncSet extends Expr {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly type: Type, 
        public readonly defs: FuncDef[],
    )
    { super(node, type); }
}

// An anonymous function, also known as a lambda.
export class AnonFunc extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly type: Type, 
        public readonly params: Myna.AstNode[],
    )
    { super(node, type); }
}

// A variable is a name  
export class Var extends Expr {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly type: Type, 
        public readonly value: Expr,
        public readonly def: VarDef,
    )
    { super(node, type); }
}

// The different kinds of literals like boolean, number, ints, arrays, objects, and more. 
export class Literal<T> extends Expr {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly type: Type, 
        public readonly value: T,
    )
    { super(node, type); }
}

// An array literal expression
export class ArrayLiteral extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly vals: Expr[],
    )
    { super(node, Types.ArrayType); }    
}

// An object literal expression
export class ObjectLiteral extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly names: string[],
        public readonly vals: Expr[],
    )
    { super(node, Types.createObjectType(names)); }    
}

// Type expressions 
export class TypeExpr extends Expr {    
    constructor(
        public readonly node: Myna.AstNode,
        public readonly def: TypeDef, 
    )
    { super(node, Types.TypeType); }
}

// Function call expressions
export class FunCall extends Expr {
    constructor(
        public readonly node: Myna.AstNode,
        public readonly type: Type, 
        public readonly func: Expr,
        public readonly args: Expr[],
        )
    { super(node, type); }
}
