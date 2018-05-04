import { Myna } from "myna-parser/myna";
import { Def } from "./heron-defs";
import { Ref } from "./heron-refs";
import { Type } from "./type-system";
import { Expr } from "./heron-expr";
import { SourceFile } from "./heron-package";
import { Statement } from "./heron-statement";
import { Scope } from "./heron-name-analysis";

// After processing and transforming the nodes in the AST tree they 
// are extended with the following new properties. 
// This is not a JavaScript class: you don't have a typeof.
export class HeronAstNode extends Myna.AstNode 
{
    // Used to uniquely identify each node 
    id: number = -1;

    // The children are also of type HeronAstNode. 
    children: HeronAstNode[] = this.children as HeronAstNode[];

    // A pointer to the parent node 
    parent?: HeronAstNode;

    // After any transform, the previous version of the node is stored here
    original?: HeronAstNode;

    // If this node is a new name definition, the definition is stored here
    def?: Def;

    // If this node is a symbol, information about what variable it is stored here
    ref?: Ref;

    // If this node is the beginning of a scope, information about the scope is stored here. 
    scope?: Scope;

    // If this node has a type, it is stored here 
    type?: Type;

    // If this node is an expression, additional information is stored here.
    expr?: Expr;

    // If this node is a statement, additional information about the statement is stored here.
    statement?: Statement;

    // If this is a source file, this contains the file path and more. 
    file?: SourceFile;
}

const g: any = (Myna.grammars as any)['heron'];

export function throwError(node: HeronAstNode, msg:string = '') {    
    throw new Error(msg + (msg ? "\n" : "") + parseLocation(node));
}

// TODO: fix a bug. This doesn't work. 
export function getFile(node?: HeronAstNode): string {
    if (!node) return '';
    return node.file ? node.file.filePath : getFile(node.parent);
}

export function parseLocation(node: HeronAstNode): string {
    if (node.original)
        return parseLocation(node.original);
    let loc = new Myna.ParseLocation(node.input, node.start);
    return loc.toString() + '\n' + 'in file ' + getFile(node);
}

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
        case "[": return "obr";
        case "]": return "cbr";
        default: throw new Error("Not a symbol: " + sym);
    }
}

export function makeNode(rule: Myna.Rule, src: HeronAstNode|null, text: string, ...children:HeronAstNode[]): HeronAstNode {
    let result = rule.node(text, ...children) as HeronAstNode;
    if (src) 
        result.original = src;
    return result;
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
export function mapAst(node: HeronAstNode, f: (_: HeronAstNode) => HeronAstNode): HeronAstNode {    
    if (node.children)
        node.children = node.children.map(c => mapAst(c, f));
    let r = f(node);
    // Store a back pointer to the original AST 
    if (r != node)
        r.original = node;    
    return r;
}

// Creates a function call node given a function name, and some arguments 
export function funCall(src: HeronAstNode, fxnName: string, ...args: HeronAstNode[]) : HeronAstNode {
    let fxn = makeNode(g.varName, src, fxnName);
    let fxnCallArgs = makeNode(g.funCall, src, '', ...args);
    return makeNode(g.postfixExpr, src, '', fxn, fxnCallArgs);
}

// Creates an assignment  given a function name, and some arguments 
export function assignment(src: HeronAstNode, lValue: HeronAstNode, rValue: HeronAstNode) : HeronAstNode {
    let op = makeNode(g.assignmentOp, src, '=');
    let rValue2 = makeNode(g.assignmentExprRight, src, '', op, rValue);
    return makeNode(g.assignmentExpr, src, '=', lValue, rValue2);
}

// Given a binary operator, a left operand and a right operand, creates a new AstNode 
export function opToFunCall(src: HeronAstNode, op: string, left: HeronAstNode, right: HeronAstNode) {
    return funCall(src, "op" + op, left, right);
}

export function isFunCall(node: HeronAstNode): boolean {
    return node && node.name !== 'postfixExpr' && node.children[1].name == 'funCall'; 
}

export function isFieldSelect(node: HeronAstNode): boolean {
    return node && node.name !== 'postfixExpr' && node.children[1].name == 'fieldSelect'; 
}

export function isMethodCall(node: HeronAstNode): boolean {
    return isFunCall(node) && isFieldSelect(node.children[0]);
}

export function isExpr(node: HeronAstNode): boolean {
    switch (node.name)
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
    case "varName":
    case "parenExpr":
    case "expr":
    case "recExpr":
        return true;
    case "multiplicativeExpr":
    case "additiveExpr":
    case "relationalExpr":
    case "equalityExpr":
    case "rangeExpr":            
        throw new Error("Unsupported expression found: pre-processing was not performed: " + node.name);
    default:
        return false;
    }
}

// Transform x.f(y) => f(x, y)
export function methodToFunction(node: HeronAstNode): HeronAstNode {
    if (node.name === 'postfixExpr') {
        if (node.children.length != 2)
            throw new Error("Expected the postfix expression to have exactly two children at this point: probably forgot to pre-process");
        
        if (node.children[1].name === 'funCall') {
            if (node.children[0].name === 'postfixExpr') {
                if (node.children[0].children[1].name === 'fieldSelect') {
                    let fn = node.children[0].children[1].children[0].allText;
                    let _this = node.children[0].children[0];
                    let args = node.children[1].children;
                    return funCall(node, fn, _this, ...args);                    
                }
            }
        }
    }
    return node;
}

// Converts x.a => a(x)
export function fieldSelectToFunction(node: HeronAstNode): HeronAstNode {    
    if (node.name === 'postfixExpr') {
        if (node.children[1].name === 'fieldSelect') {
            let fieldName = node.children[1].children[0].allText;
            return funCall(node, fieldName, node.children[0]);
        }
    }
    return node;
}


// Any of the special assignment operations are going to be mapped to a simple assignment 
// x += 2 => x = x + 2;
export function rewriteAssignment(node: HeronAstNode): HeronAstNode {
    if (node.name !== 'assignmentExpr') return node;
    if (node.children.length !== 2) throw new Error('Assignment expressions should have two children');
    let left = node.children[0];
    let right = validateNode(node.children[1], 'assignmentExprRight');    
    let op = validateNode(right.children[0], 'assignmentOp').allText;
    if (op === '=') return node;
    return assignment(node, left, right.children[1]);
}

export function isArrayIndexingExpr(node: HeronAstNode): boolean {
    if (node.name !== 'postfixExpr') return false;
    if (node.children.length !== 2)
        throw new Error('Expected two children for a postfix expression');
    return (node.children[1].name === 'arrayIndex');
}

// Converts array indexing assignment to function calls
// xs[i] = x => xs = set(xs, i, x);
export function arrayIndexAssignmentToFunction(node: HeronAstNode): HeronAstNode {    
    if (node.name !== 'assignmentExpr') 
        return node;
    if (node.children.length !== 2)
        throw new Error('Expected two children for a postfix expression');
    let lvalue = node.children[0];
    let rvalue = node.children[1];
    if (isArrayIndexingExpr(lvalue)) {
        // xs[i] = x is valid
        // f()[i] = x is not, because it won't do anything. 
        let array = lvalue.children[0];
        if (array.name !== 'varName')
            throw new Error("Can only assign to an array index which is bound to a variable");
        let arrayIndex = lvalue.children[1].children[0];
        let call = funCall(node, 'set', array, arrayIndex, rvalue.children[1]);
        let assign = assignment(node, array, call);
        return assign;
    }
    return node;
}
    

// Converts array indexing to function calls
// xs[i] = op[](xs, i)
export function arrayIndexToFunction(node: HeronAstNode): HeronAstNode {    
    if (node.name === 'postfixExpr') {
        if (node.children.length !== 2)
            throw new Error('Expected two children for a postfix expression');
        if (node.children[1].name === 'arrayIndex') {
            let arrayIndex = node.children[1].children[0];
            return funCall(node, 'op[]', node.children[0], arrayIndex)
        }
    }
    return node;
}
    
// Converts binary operators to function calls
export function opToFunction(node: HeronAstNode): HeronAstNode {    
    // We are only going to handle certain cases
    switch (node.name)
    {    
        case 'prefixExpr': {
            let r = node.children[node.children.length-1];
            for (let i=node.children.length-2; i >= 0; --i) {
                let opName = '';
                switch (node.children[i].allText) {
                    case '++': break;
                    case '--': break;
                    case '-': opName = 'op_negate'; break;
                    case '!': opName = 'op_not'; break;
                    default: throw new Error('Unrecognized prefix operator ' + node.children[i].allText);
                }
                r = funCall(node, opName, r);
            }
            return r;
        }
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
            return node;
    }

    if (node.children.length != 2)
        throw new Error("Expected exactly two children");

    let left = node.children[0];
    let right = node.children[1];

    // In the binary operator cases there is always two nodes on the right side.
    // The first is the operator, and the second is the rvalue.
    if (right.children.length != 2)
        throw new Error("Expected two children of the right");
    let op = right.children[0].allText;                    
    return opToFunCall(node, op, left, right.children[1]);
}

// Some expressions are parsed as a list of expression. 
// (a [op b].*) 
// We want to make sure these expressions always have two children. 
// (a op b op c op d) => (((a op b) op c) op d)
// (a op b) => (a op b)
// (a) => a 
export function exprListToPair(node: HeronAstNode): HeronAstNode {
    // We are only going to handle certain cases
    switch (node.name)
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
        case 'literal':
        case 'recExpr':
        case 'leafExpr':
        case 'expr':        
            {
                if (node.children.length != 1)
                    throw new Error("Exepcted exactly one child");
                return node.children[0];
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
            return node;
    }

    // Check there is at least one child
    if (node.children.length == 0)
        throw new Error("Expected at least one child");

    // If there is only one child: we just return that child 
    if (node.children.length == 1) 
        return node.children[0];

    // there are two already: we are done 
    if (node.children.length == 2)
        return node;

    // We are shifting left (in the case of most operations)
    // Or are shifting right in the case of prefix expr 
    if (node.name === 'prefixExpr') {
        // More than two, we are going to shift things to the left-side
        let right = node.children[node.children.length - 1];
        for (let i=node.children.length-2; i >= 0; --i)
        {   
            let left = node.children[i];
            right = makeNode(node.rule, node, '', left, right) as HeronAstNode;
        }
        return right;
    }
    else {
        // More than two, we are going to shift things to the left-side
        let left = node.children[0];
        for (let i=1; i < node.children.length; ++i)
        {   
            let right = node.children[i];
            left = makeNode(node.rule, node, '', left, right) as HeronAstNode;
        }
        return left;
    }
}

export function wrapInCompoundStatement(node: HeronAstNode): HeronAstNode {
    if (!node) 
        return makeNode(g.compoundStatement, null, "");

    if (node.name === 'compoundStatement') return node;
    return makeNode(g.compoundStatement, node, "", node);
}

// Checks that a node has a name 
export function validateNode(node: HeronAstNode, ...names: string[]): HeronAstNode {
    if (names.indexOf(node.name) < 0)
        throwError(node, 'Did not expect ' + node.name);
    return node;
}

// Calls a function on every node in the AST passing the AST node and it's child
export function visitAstWithParent(node: HeronAstNode, parent: HeronAstNode|null, f:((child:HeronAstNode, parent:HeronAstNode|null)=>void)) {    
    node.children.forEach(c => visitAstWithParent(c, node, f));
    f(node, parent);
}

// Calls a function on every node in the AST passing the AST node and it's child
export function visitAst(node: HeronAstNode, f:((_:HeronAstNode)=>void)) {    
    if (!node) return;
    node.children.forEach(c => visitAst(c, f));
    f(node);
}

// Visits every node creating a pointer to its parent 
export function setParentPointers(node: HeronAstNode) {
    visitAstWithParent(node, null, (c, p) => p ? c.parent = p : p);
}

// Performs some pre-processing of the AST to make it easier to work with
// Many expressions are converted into function calls.
// Also parent back pointers are added along with ids to the nodes. 
export function preprocessAst(node: HeronAstNode, file: SourceFile) 
{
    // We have to set parent pointers on the original tree 
    setParentPointers(node);

    // Set pointers to the file
    visitAst(node, n => n.file = file);

    // The order of transforms matters. Particularly we need to do 
    // Method to function before doing fieldSelectToFunctions
    node = mapAst(node, exprListToPair);
    node = mapAst(node, arrayIndexAssignmentToFunction);
    node = mapAst(node, rewriteAssignment);
    node = mapAst(node, methodToFunction);
    node = mapAst(node, fieldSelectToFunction);
    node = mapAst(node, arrayIndexToFunction);
    node = mapAst(node, opToFunction);

    // The tree has been transformed, and new nodes have been added
    // so we have to recompute parent pointers, and the file pointers 
    setParentPointers(node);
    visitAst(node, n => n.file = file);

    // Assign unique ids, for convenience and looks up. 
    let id = 0;
    visitAst(node, node => node['id'] = id++);

    return node;
}
