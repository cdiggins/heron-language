import { Myna } from "myna-parser/myna";
import { HeronAstNode, isExpr, validateNode, throwError, preprocessAst, visitAst } from "./heron-ast-rewrite";
import { Type } from "type-inference/type-system";
import { Def, createDef } from "./heron-defs";
import { Ref, RefType } from "./heron-refs";
import { Scope } from "./heron-scope";
import { createExpr } from "./heron-expr";
import { computeType } from "./heron-types";
import { Package } from "./heron-package";

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
        state.addRef(node.allText, node, RefType.type);
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
    visit_recCompoundStatement(node: HeronAstNode, state: Package) {
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
        state.addRef(node.allText, node, RefType.var);
    }
}
