import { Myna } from "myna-parser/myna";

const g = Myna.grammars['heron'];

export function opSymbolToString(sym: string): string {
    switch (sym)
    {
        case "<": return "lt";
        case ">": return "gt";
        case "=": return "eq";
        case "+": return "add";
        case "-": return "sub";
        case "*": return "mul";
        case "/": return "div";
        case "%": return "mod";
        case "^": return "hat";
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

// An identifier might start with a "op" and be followed by funny symbols
// to indicate the name of an operator (e.g. for function overloading) 
export function identifierToString(id: string) {
    if (id.indexOf("op") == 0 && id.length > 2 && isSymbolChar(id[2]))
        return opToString(id.substr(2));
    else    
        return id;
}

// Applies a transform function to each member of the AST to create a new one
export function mapAst(ast: Myna.AstNode, f: (_: Myna.AstNode) => Myna.AstNode): Myna.AstNode {
    ast.children = ast.children.map(c => mapAst(c, f));
    let r = f(ast);
    // Store a back pointer to the original AST 
    if (r != ast)
        r['original'] = ast;
    return r;
}

// Creates a function call node given a function name, and some arguments 
export function funCall(fxnName: string, ...args) : Myna.AstNode {
    let fxn = g.leafExpr.node('', g.identifier.node(fxnName));
    let fxnCall = g.funCall.node('', ...args);
    return g.postfixExpr.node('', fxn, fxnCall);
}

// Given a binary operator, a left operand and a right operand, creates a new AstNode 
export function opToFunCall(op: string, left: Myna.AstNode, right: Myna.AstNode) {
    return funCall(opToString(op), left, right);
}

export function isFunCall(ast: Myna.AstNode): boolean {
    return ast && ast.name !== 'postfixExpr' && ast.children[1].name == 'funCall'; 
}

export function isFieldSelect(ast: Myna.AstNode): boolean {
    return ast && ast.name !== 'postfixExpr' && ast.children[1].name == 'fieldSelect'; 
}

export function isMethodCall(ast: Myna.AstNode): boolean {
    return isFunCall(ast) && isFieldSelect(ast.children[0]);
}

export function isExpr(ast: Myna.AstNode): boolean {
    switch (ast.name)
    {
    case "postfixExpr":
    case "objectExpr":
    case "lambdaExpr":
    case "varExpr":
    case "arrayExpr":
    case "bool":
    case "number":
    case "string":
    case "prefixExpr":
    case "conditionalExpr":
    case "literal":
    case "leafExpr":
    case "parenExpr":
    case "expr":
    case "recExpr":
        return true;
    case "multiplicativeExpr":
    case "additiveExpr":
    case "relationalExpr":
    case "equalityExpr":
    case "rangeExpr":            
        throw new Error("Unsupported expression found: pre-processing was not performed: " + ast.name);
    default:
        return false;
    }
}

// Transform x.f(y) => f(x, y)
export function methodToFunction(ast: Myna.AstNode): Myna.AstNode {
    if (ast.name === 'postfixExpr') {
        if (ast.children.length != 2)
            throw new Error("Expected the postfix expression to have exactly two children at this point: probably forgot to pre-process");
        
        if (ast.children[1].name === 'funCall') {
            if (ast.children[0].name === 'postfixExpr') {
                if (ast.children[0].children[1].name === 'fieldSelect') {
                    let fn = ast.children[0].children[1].children[0].allText;
                    let _this = ast.children[0].children[0];
                    let args = ast.children[1].children;
                    return funCall(fn, _this, ...args);                    
                }
            }
        }
    }
    return ast;
}

// Converts x.a => a(x)
export function fieldSelectToFunction(ast: Myna.AstNode): Myna.AstNode {    
    if (ast.name === 'postfixExpr') {
        if (ast.children[1].name === 'fieldSelect') {
            let fieldName = ast.children[1].children[0].allText;
            return funCall(fieldName, ast.children[0]);
        }
    }
    return ast;
}

// Converts array indexing to function calls
// xs[i] = op_at(xs, i)
export function arrayIndexToFunction(ast: Myna.AstNode): Myna.AstNode {    
    if (ast.name === 'postfixExpr') {
        if (ast.children[1].name === 'arrayIndex') {
            let arrayIndex = ast.children[1].children[0];
            return funCall('op_at', ast.children[0], arrayIndex)
        }
    }
    return ast;
}
    
// Converts binary operators to function calls
export function opToFunction(ast: Myna.AstNode): Myna.AstNode {    
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
export function exprListToPair(ast: Myna.AstNode): Myna.AstNode {
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

// Calls a function on every node in the AST passing the AST node and it's child
export function visitAstWithParent(ast: Myna.AstNode, parent: Myna.AstNode, f:((child:Myna.AstNode, parent:Myna.AstNode)=>void)) {    
    ast.children.forEach(c => visitAstWithParent(c, ast, f));
    f(ast, parent);
}

// Calls a function on every node in the AST passing the AST node and it's child
export function visitAst(ast: Myna.AstNode, f:((_:Myna.AstNode)=>void)) {    
    ast.children.forEach(c => visitAst(c, f));
    f(ast);
}

// Adds back pointers to AST nodes
function createParentPointers(ast: Myna.AstNode) {
    visitAstWithParent(ast, null, (c, p) => c['parent'] = p);
}

// Assigns unique ids to every AST node in the tree 
function assignIds(ast: Myna.AstNode, idGen = { id: 0 }) {
    visitAst(ast, node => node['id'] = idGen.id++);
}

// Performs some pre-processing of the AST to make it easier to work with
// Many expressions are converted into function calls.
// Also parent back pointers are added along with ids to the nodes. 
export function preprocessAst(ast: Myna.AstNode) {
    // The order of transforms matters. Particularly we need to do 
    // Method to function before doing fieldSelectToFunctions
    ast = mapAst(ast, exprListToPair);
    ast = mapAst(ast, methodToFunction);
    ast = mapAst(ast, fieldSelectToFunction);
    ast = mapAst(ast, arrayIndexToFunction);
    ast = mapAst(ast, opToFunction);
 
    // Some operations later on are easier if we have a parent pointer  
    createParentPointers(ast);

    // Assigns unique ids, for convenience and looks up. 
    assignIds(ast);

    return ast;
}
