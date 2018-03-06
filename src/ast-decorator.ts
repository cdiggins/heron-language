import { Myna } from "myna-parser/myna";

// Assigns an id to every node, and puts it in an array.
// This allows us to uniqely identify nodes.
class AstLookup {
    nodes: Myna.AstNode[];

    constructor(ast: Myna.AstNode) {
        visitAst(ast, (n) => {
            n['index'] = this.nodes.length;
            this.nodes.push(n);
        });
    }
}

// Calls a function on every node in the AST
function visitAst(ast: Myna.AstNode, f:((_:Myna.AstNode)=>void)) {    
    ast.children.forEach(c => visitAst(c, f));
    f(ast);
}