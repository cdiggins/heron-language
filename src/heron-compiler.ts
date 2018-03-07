import { Myna } from "myna-parser/myna";
import { Scope, VarDef, VarUsage, analyzeHeronNames } from "./heron-name-analysis";
import { Type } from "type-inference/type-system";
import { preprocessAst } from "./heron-ast-rewrite";
import { computeTypes } from "./heron-type-analysis";

// After processing and transforming the nodes in the AST tree they 
// are extended with the following new properties. 
// This is not a JavaScript class: you don't have a typeof.
export class HeronAstNode extends Myna.AstNode 
{
    // After any transform, the previous version of the node is stored here
    original?: Myna.AstNode;

    // A pointer to the parent node 
    parent?: Myna.AstNode;

    // If this node is a new name definition, the definition is stored here
    varDef?: VarDef;

    // If this node is a symbol, information about what variable it is stored here
    varUsage?: VarUsage;

    // If this node is the beginning of a scope, information about the scope is stored here. 
    scope?: Scope;

    // If this node has a type, it is stored here 
    type?: Type;

    // Used to uniquely identify each node 
    id: number;

    // The children are also of type HeronAstNode
    children: HeronAstNode[];
}

// Convert a generic Myna AST tree into a proper Heron AST. 
export function toHeronAst(ast: Myna.AstNode): HeronAstNode {
    // Perform pre-processing
    ast = preprocessAst(ast);

    // The name analyzer stores all of the scopes, varUsages, and varDefs. 
    let nameAnalyzer = analyzeHeronNames(ast);

    // All expressions are assigned types (WIP)
    computeTypes(ast); 

    // Type-cast the node.
    return ast as HeronAstNode;
}