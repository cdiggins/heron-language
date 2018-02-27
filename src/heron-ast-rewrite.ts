import { Myna } from "myna-parser/myna";

const g = Myna.grammars['heron'];

export function opSymbolToString(sym: string): string {
    switch (sym)
    {
        case "<": return "lt";
        case ">": return "gt";
        case "=": return "eq";
        case "+": return "pls";
        case "-": return "min";
        case "*": return "mul";
        case "/": return "div";
        case "%": return "mod";
        case "^": return "car";
        case "|": return "bar";
        case "&": return "amp";
        case "$": return "dol";
        case "!": return "not";
        case ".": return "dot";
        default: throw new Error("Not a symbol: " + sym);
    }
}
export function opToString(op: string) {
    let r = "op";
    for (let i=0; i < op.length; ++i)
        r = r + "_" + opSymbolToString(op[i]);
    return r;
}

export function isSymbolChar(c: string) : Boolean {
    if (c.length != 1) return false;
    const code = c.charCodeAt(0);
    return (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123) && // lower alpha (a-z)
        !(code == 95)); // underscore
}

export function identifierToString(id: string) {
    if (id.indexOf("op") == 0 && id.length > 2 && isSymbolChar(id[2]))
        return opToString(id.substr(2));
    else    
        return id;
}

// Creates a function call node given a function name, and some arguments 
export function funCall(fxnName: string, ...args) : Myna.AstNode {
    let fxn = g.identifier.node(fxnName);
    let fxnCall = g.funCall.node('', ...args);
    return g.postfixExpr.node('', fxn, fxnCall);
}

// Given a binary operator, a left operand and a right operand, creates a new AstNode 
export function opToFunCall(op: string, left: Myna.AstNode, right: Myna.AstNode) {
    return funCall(opToString(op), left, right);
}

// Converts binary operators to function calls
function binaryOpToFunction(ast: Myna.AstNode): Myna.AstNode {
    // Apply to all children.
    ast.children = ast.children.map(binaryOpToFunction);

    // We are only going to handle certain cases
    switch (ast.name)
    {    
        case 'rangeExpr':
        case 'logicalOrExpr':
        case 'logicalXOrExpr':
        case 'logicalAndExpr':
        case 'equalityExpr':
        case 'relationalExpr':
        case 'additiveExpr':
        case 'multiplicativeExpr':
            break;
        default: 
            return ast;
    }

    if (ast.children.length != 2)
        throw new Error("Expected exactly two children");

    let left = ast.children[0];
    let right = ast.children[1];
    if (right.children.length != 2)
        throw new Error("Expected two children of 2");
    let op = right.children[0].allText;                    
    return opToFunCall(op, left, right.children[1]);
}

// Some expressions are parsed as a list of expression. 
// (a [op b].*) 
// We want to make sure these expressions always have two children. 
// (a op b op c op d) => (((a op b) op c) op d)
// (a op b) => (a op b)
// (a) => a 
function exprListToPair(ast: Myna.AstNode): Myna.AstNode {
    ast.children = ast.children.map(exprListToPair);

    // We are only going to handle certain cases
    switch (ast.name)
    {    
        case 'assignmentExprLeft':
        case 'conditionalExprLeft':
        case 'rangeExprLeft':
        case 'logicalOrExprLeft':
        case 'logicalXOrExprLeft':
        case 'logicalAndExprLeft':
        case 'equalityExprLeft':
        case 'relationalExprLeft':
        case 'additiveExprLeft':
        case 'multiplicativeExprLeft':        
            {
                if (ast.children.length != 1)
                    throw new Error("Exepcted exactly one child");
                return ast.children[0];
            }
        case 'assignmentExpr':
        case 'conditionalExpr':
        case 'rangeExpr':
        case 'logicalOrExpr':
        case 'logicalXOrExpr':
        case 'logicalAndExpr':
        case 'equalityExpr':
        case 'relationalExpr':
        case 'additiveExpr':
        case 'multiplicativeExpr':
        case 'postfixExpr':
        case 'prefixExpr':
            break;
        default: 
            return ast;
    }

    // Check there is at least one child
    if (ast.children.length == 0)
        throw new Error("Expected at least one child");

    // If there is only one child: we just return that child 
    if (ast.children.length == 1) 
        return ast.children[0];

    // there are two already: we are done 
    if (ast.children.length == 2)
        return ast;

    // We are shifting left (in the case of most operations)
    // Or are shifting right in the case of prefix expr 
    if (ast.name === 'prefixExpr') {
        // More than two, we are going to shift things to the left-side
        let right = ast.children[ast.children.length - 1];
        for (let i=ast.children.length-2; i >= 0; --i)
        {   
            let left = ast.children[i];
            right = ast.rule.node('', left, right);
        }
        return right;
    }
    else {
        // More than two, we are going to shift things to the left-side
        let left = ast.children[0];
        for (let i=1; i < ast.children.length; ++i)
        {   
            let right = ast.children[i];
            left = ast.rule.node('', left, right);
        }
        return left;
    }
}

// Performs some pre-processing of the AST to make it easier to work with
// Binary operators are converted to function calls. 
// Binary expression chains are converted to nodes with two children
export function transformAst(ast: Myna.AstNode) {
    //console.log("Before transform");
    //console.log(ast.toString())    
    ast = exprListToPair(ast);
    
    //console.log("After transform");
    //console.log(ast.toString())
    
    //console.log("As function");
    ast = binaryOpToFunction(ast);
    return ast;
}
