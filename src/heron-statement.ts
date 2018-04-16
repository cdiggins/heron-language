import { VarDef } from "./heron-defs";
import { throwError, HeronAstNode, wrapInCompoundStatement } from "./heron-ast-rewrite";
import { Expr, createExpr } from "./heron-expr";
import { Type } from "./type-system";

export class Statement {
    constructor(
        public readonly node: HeronAstNode, 
    )
    { node.statement = this; }

    // Added as a post-process step. 
    type: Type;
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
        public readonly onTrue: CompoundStatement,
        public readonly onFalse: CompoundStatement,
    )
    { 
        super(node); 
        if (!condition) 
            throwError(node, "Missing expression condition");
        if (onFalse instanceof CompoundStatement && onFalse.statements[1] === this)
            throw new Error("Recursion error");
    }
}

export class ReturnStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly expr: Expr,
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
        public readonly loop: CompoundStatement,
    )
    { super(node); }
}

export class DoStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly condition: Expr,
        public readonly body: CompoundStatement,
    )
    { super(node); }
}

export class WhileStatement extends Statement {
    constructor(
        public readonly node: HeronAstNode, 
        public readonly condition: Expr,
        public readonly body: CompoundStatement,
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

export function createCompoundStatement(node: HeronAstNode): CompoundStatement {
    return createStatement(wrapInCompoundStatement(node)) as CompoundStatement;
}

export function createStatement(node: HeronAstNode): Statement {
    if (node.statement)
        return node.statement;

    switch (node.name) {
        case 'emptyStatement':
            return new EmptyStatement(node);
        case 'compoundStatement':
            return new CompoundStatement(node, node.children.map(createStatement));
        case 'ifStatement':
            return new IfStatement(node, 
                createExpr(node.children[0]), 
                createCompoundStatement(node.children[1]), 
                createCompoundStatement(node.children[2]));
        case 'returnStatement':
            return new ReturnStatement(node,
                node.children.length > 0 ? createExpr(node.children[0]) : null);
        case 'continueStatement':
            return new ContinueStatement(node);
        case 'breakStatement':
            return new BreakStatement(node);
        case 'forLoop':
            return new ForStatement(node, node.children[0].allText, 
                createExpr(node.children[1]), createCompoundStatement(node.children[2]));
        case 'doLoop':
            return new DoStatement(node, 
                createExpr(node.children[1]), createCompoundStatement(node.children[0]));
        case 'whileLoop': 
            return new WhileStatement(node, 
                createExpr(node.children[0]), createCompoundStatement(node.children[1]));
        case 'varDeclStatement':            
            return new VarDeclStatement(node, node.children[0].children.map(n => n.def as VarDef));
        case 'exprStatement':
            return new ExprStatement(node, createExpr(node.children[0]));
    }
}

// Returns true if a statement is a loop break statemnt
export function isLoopBreak(st: Statement): boolean {
    return st instanceof ReturnStatement || st instanceof BreakStatement;
}

// Returns the last statement in a compound statement group
export function lastStatement(st: CompoundStatement): Statement {
    if (st.statements.length === 0)
        return null;
    return st.statements[st.statements.length - 1];
}

export function hasLoopBreak(st: Statement): boolean {
    if (isLoopBreak(st)) 
        return true;

    if (st instanceof CompoundStatement) {
        return st.statements.some(hasLoopBreak);
    }
    else if (st instanceof IfStatement) {
        return hasLoopBreak(st.onTrue) || hasLoopBreak(st.onFalse);
    }

    return false; 
}

// Put If statements into tail position of a loop 
export function rewriteIfStatements(node: HeronAstNode) {
    throw new Error("This can create recursion error");
    /*
    let st = node.statement;
    if (!st) return;
    if (st instanceof CompoundStatement) {
        for (var i=st.statements.length-2; i >= 0; --i) {
            let c = st.statements[i];
            if (c instanceof IfStatement) {
                if (!isLoopBreak(lastStatement(c.onTrue)))
                    c.onTrue.statements.push(...st.statements.slice(i));
                if (!isLoopBreak(lastStatement(c.onFalse)))
                    c.onFalse.statements.push(...st.statements.slice(i));

                // Delete the statements after the current 
                st.statements.splice(i+1, st.statements.length - i - 1);
            }
            else if (st instanceof BreakStatement) {
                // Delete the statements after the current 
                st.statements.splice(i+1, st.statements.length - i - 1);
            }
        }
        // Check the algorithm 
        for (var i=0; i < st.statements.length - 1; ++i) {
            if (st.statements[i] instanceof IfStatement) 
                throw new Error("Internal error: found an If statement in a compound statement that was not in tail position");
        }
    }
    */
}


