import { Myna } from "myna-parser/myna";
import { FuncDef, TypeDef, VarDef, FuncParamDef, createFuncParamDef, getDef, Def } from "./heron-defs";
import { validateNode, visitAst, throwError, HeronAstNode } from "./heron-ast-rewrite";
import { Ref } from "./heron-refs";
import { Expr, createExpr } from "./heron-expr";

export class Statement {
    constructor(
        public readonly node: HeronAstNode, 
    )
    { node.statement = this; }
}

export class CompoundStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly statements: Statement[]
    )
    { super(node); }
}

export class IfStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly condition: Expr,
        public readonly onTrue: Statement,
        public readonly onFalse: Statement,
    )
    { super(node); }
}

export class ReturnStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly condition: Expr,
    )
    { super(node); }
}

export class ContinueStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
    )
    { super(node); }
}

export class BreakStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
    )
    { super(node); }
}

export class ExprStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode,
        public readonly expr: Expr,
    )
    { super(node); }    
}

export class ForStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly identifier: string,
        public readonly array: Expr,
        public readonly loop: Statement,
    )
    { super(node); }
}

export class DoStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly condition: Expr,
        public readonly body: Statement,
    )
    { super(node); }
}

export class WhileStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly condition: Expr,
        public readonly body: Statement,
    )
    { super(node); }
}

export class VarDeclStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly vars: VarDef[],
    )
    { super(node); }
}

export class EmptyStatement extends Statement {    
}

//============================================================
// Functions 

export function createStatement(node: HeronAstNode): Statement {
    if (node.statement)
        return node.statement;

    switch (node.name) {
        case 'emptyStatement':
            return new EmptyStatement(node);
        case 'compoundStatement':
            return new CompoundStatement(node, node.children.map(createStatement));
        case 'ifStatement':
            // TODO: I need to rotate the else statement. We should only have one!  
            return new IfStatement(node, 
                createExpr(node.children[0]), 
                createStatement(node.children[1]), 
                node.children.length > 2 ? createStatement(node.children[2]) : new EmptyStatement(null));
        case 'returnStatement':
            return new ReturnStatement(node,
                node.children.length > 0 ? createExpr(node.children[0]) : null);
        case 'continueStatement':
            return new ContinueStatement(node);
        case 'breakStatement':
            return new BreakStatement(node);
        case 'forLoop':
            return new ForStatement(node, node.children[0].allText, 
                createExpr(node.children[1]), createStatement(node.children[2]));
        case 'doLoop':
            return new DoStatement(node, 
                createExpr(node.children[1]), createStatement(node.children[0]));
        case 'whileLoop': 
            return new WhileStatement(node, 
                createExpr(node.children[0]), createStatement(node.children[1]));
        case 'varDeclStatement':            
            return new VarDeclStatement(node, node.children[0].children.map(n => n.def as VarDef));
        case 'exprStatement':
            return new ExprStatement(node, createExpr(node.children[0]));
    }
}

