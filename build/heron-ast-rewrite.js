"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var myna_1 = require("myna-parser/myna");
// After processing and transforming the nodes in the AST tree they 
// are extended with the following new properties. 
// This is not a JavaScript class: you don't have a typeof.
var HeronAstNode = /** @class */ (function (_super) {
    __extends(HeronAstNode, _super);
    function HeronAstNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HeronAstNode;
}(myna_1.Myna.AstNode));
exports.HeronAstNode = HeronAstNode;
var g = myna_1.Myna.grammars['heron'];
;
function throwError(node, msg) {
    if (msg === void 0) { msg = ''; }
    throw new Error(msg + (msg ? "\n" : "") + parseLocation(node));
}
exports.throwError = throwError;
// TODO: fix a bug. This doesn't work. 
function getFile(node) {
    if (!node)
        return '';
    return node.file ? node.file.filePath : getFile(node.parent);
}
exports.getFile = getFile;
function parseLocation(node) {
    if (node.original)
        return parseLocation(node.original);
    var loc = new myna_1.Myna.ParseLocation(node.input, node.start);
    return loc.toString() + '\n' + 'in file ' + getFile(node);
}
exports.parseLocation = parseLocation;
function opSymbolToString(sym) {
    switch (sym) {
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
exports.opSymbolToString = opSymbolToString;
function makeNode(rule, src, text) {
    var children = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        children[_i - 3] = arguments[_i];
    }
    var result = rule.node.apply(rule, [text].concat(children));
    result.original = src;
    return result;
}
exports.makeNode = makeNode;
function opToString(op) {
    var r = "op";
    for (var i = 0; i < op.length; ++i)
        r = r + "_" + opSymbolToString(op[i]);
    return r;
}
exports.opToString = opToString;
function isSymbolChar(c) {
    if (c.length != 1)
        return false;
    var code = c.charCodeAt(0);
    return (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123) && // lower alpha (a-z)
        !(code == 95)); // underscore
}
exports.isSymbolChar = isSymbolChar;
// An identifier might start with a "op" and be followed by funny symbols
// to indicate the name of an operator (e.g. for function overloading) 
function identifierToString(id) {
    if (id.indexOf("op") == 0 && id.length > 2 && isSymbolChar(id[2]))
        return opToString(id.substr(2));
    else
        return id;
}
exports.identifierToString = identifierToString;
// Applies a transform function to each member of the AST to create a new one
function mapAst(node, f) {
    node.children = node.children ? node.children.map(function (c) { return mapAst(c, f); }) : null;
    var r = f(node);
    // Store a back pointer to the original AST 
    if (r != node)
        r.original = node;
    return r;
}
exports.mapAst = mapAst;
// Creates a function call node given a function name, and some arguments 
function funCall(src, fxnName) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var fxn = makeNode(g.varName, src, fxnName);
    var fxnCallArgs = makeNode.apply(void 0, [g.funCall, src, ''].concat(args));
    return makeNode(g.postfixExpr, src, '', fxn, fxnCallArgs);
}
exports.funCall = funCall;
// Creates an assignment  given a function name, and some arguments 
function assignment(src, lValue, rValue) {
    var op = makeNode(g.assignmentOp, src, '=');
    var rValue2 = makeNode(g.assignmentExprRight, src, '', op, rValue);
    return makeNode(g.assignmentExpr, src, '=', lValue, rValue2);
}
exports.assignment = assignment;
// Given a binary operator, a left operand and a right operand, creates a new AstNode 
function opToFunCall(src, op, left, right) {
    return funCall(src, "op" + op, left, right);
}
exports.opToFunCall = opToFunCall;
function isFunCall(node) {
    return node && node.name !== 'postfixExpr' && node.children[1].name == 'funCall';
}
exports.isFunCall = isFunCall;
function isFieldSelect(node) {
    return node && node.name !== 'postfixExpr' && node.children[1].name == 'fieldSelect';
}
exports.isFieldSelect = isFieldSelect;
function isMethodCall(node) {
    return isFunCall(node) && isFieldSelect(node.children[0]);
}
exports.isMethodCall = isMethodCall;
function isExpr(node) {
    switch (node.name) {
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
exports.isExpr = isExpr;
// Transform x.f(y) => f(x, y)
function methodToFunction(node) {
    if (node.name === 'postfixExpr') {
        if (node.children.length != 2)
            throw new Error("Expected the postfix expression to have exactly two children at this point: probably forgot to pre-process");
        if (node.children[1].name === 'funCall') {
            if (node.children[0].name === 'postfixExpr') {
                if (node.children[0].children[1].name === 'fieldSelect') {
                    var fn = node.children[0].children[1].children[0].allText;
                    var _this = node.children[0].children[0];
                    var args = node.children[1].children;
                    return funCall.apply(void 0, [node, fn, _this].concat(args));
                }
            }
        }
    }
    return node;
}
exports.methodToFunction = methodToFunction;
// Converts x.a => a(x)
function fieldSelectToFunction(node) {
    if (node.name === 'postfixExpr') {
        if (node.children[1].name === 'fieldSelect') {
            var fieldName = node.children[1].children[0].allText;
            return funCall(node, fieldName, node.children[0]);
        }
    }
    return node;
}
exports.fieldSelectToFunction = fieldSelectToFunction;
/* TODO: finish the postfix increment/decrement.
export function rewritePostfixIncAndDec(node: HeronAstNode): HeronAstNode {
    if (node.name !== 'postfixExpr') return node;
    let op = '';
    if (node.children[1].name === 'postIncOp')
        op = 'op-';
    else
        || node.children[1].name === 'postDecOp') {
        let op = node.children[1].allText.substr(1);
        for (let )
    }
}
*/
// Any of the special assignment operations are going to be mapped to a simple assignment 
// x += 2 => x = x + 2;
function rewriteAssignment(node) {
    if (node.name !== 'assignmentExpr')
        return node;
    if (node.children.length !== 2)
        throw new Error('Assignment expressions should have two children');
    var left = node.children[0];
    var right = validateNode(node.children[1], 'assignmentExprRight');
    var op = validateNode(right.children[0], 'assignmentOp').allText;
    if (op === '=')
        return node;
    var newOp = 'op' + op.substr(1);
    var func = funCall(node, op, left, right.children[1]);
    return assignment(node, left, right.children[1]);
}
exports.rewriteAssignment = rewriteAssignment;
function isArrayIndexingExpr(node) {
    if (node.name !== 'postfixExpr')
        return false;
    if (node.children.length !== 2)
        throw new Error('Expected two children for a postfix expression');
    return (node.children[1].name === 'arrayIndex');
}
exports.isArrayIndexingExpr = isArrayIndexingExpr;
// Converts array indexing assignment to function calls
// xs[i] = x => xs = set(xs, i, x);
function arrayIndexAssignmentToFunction(node) {
    if (node.name !== 'assignmentExpr')
        return node;
    if (node.children.length !== 2)
        throw new Error('Expected two children for a postfix expression');
    var lvalue = node.children[0];
    var rvalue = node.children[1];
    if (isArrayIndexingExpr(lvalue)) {
        // xs[i] = x is valid
        // f()[i] = x is not, because it won't do anything. 
        var array = lvalue.children[0];
        if (array.name !== 'varName')
            throw new Error("Can only assign to an array index which is bound to a variable");
        var arrayIndex = lvalue.children[1].children[0];
        var call = funCall(node, 'set', array, arrayIndex, rvalue.children[1]);
        var assign = assignment(node, array, call);
        return assign;
    }
    return node;
}
exports.arrayIndexAssignmentToFunction = arrayIndexAssignmentToFunction;
// Converts array indexing to function calls
// xs[i] = op[](xs, i)
function arrayIndexToFunction(node) {
    if (node.name === 'postfixExpr') {
        if (node.children.length !== 2)
            throw new Error('Expected two children for a postfix expression');
        if (node.children[1].name === 'arrayIndex') {
            var arrayIndex = node.children[1].children[0];
            return funCall(node, 'op[]', node.children[0], arrayIndex);
        }
    }
    return node;
}
exports.arrayIndexToFunction = arrayIndexToFunction;
// Converts binary operators to function calls
function opToFunction(node) {
    // We are only going to handle certain cases
    switch (node.name) {
        case 'prefixExpr': {
            var r = node.children[node.children.length - 1];
            for (var i = node.children.length - 2; i >= 0; --i) {
                var opName = '';
                switch (node.children[i].allText) {
                    case '++': break;
                    case '--': break;
                    case '-':
                        opName = 'op_negate';
                        break;
                    case '!':
                        opName = 'op_not';
                        break;
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
    var left = node.children[0];
    var right = node.children[1];
    // In the binary operator cases there is always two nodes on the right side.
    // The first is the operator, and the second is the rvalue.
    if (right.children.length != 2)
        throw new Error("Expected two children of the right");
    var op = right.children[0].allText;
    return opToFunCall(node, op, left, right.children[1]);
}
exports.opToFunction = opToFunction;
// Some expressions are parsed as a list of expression. 
// (a [op b].*) 
// We want to make sure these expressions always have two children. 
// (a op b op c op d) => (((a op b) op c) op d)
// (a op b) => (a op b)
// (a) => a 
function exprListToPair(node) {
    // We are only going to handle certain cases
    switch (node.name) {
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
        var right = node.children[node.children.length - 1];
        for (var i = node.children.length - 2; i >= 0; --i) {
            var left = node.children[i];
            right = makeNode(node.rule, node, '', left, right);
        }
        return right;
    }
    else {
        // More than two, we are going to shift things to the left-side
        var left = node.children[0];
        for (var i = 1; i < node.children.length; ++i) {
            var right = node.children[i];
            left = makeNode(node.rule, node, '', left, right);
        }
        return left;
    }
}
exports.exprListToPair = exprListToPair;
function wrapInCompoundStatement(node) {
    if (!node)
        return makeNode(g.compoundStatement, null, "");
    if (node.name === 'compoundStatement')
        return node;
    return makeNode(g.compoundStatement, node, "", node);
}
exports.wrapInCompoundStatement = wrapInCompoundStatement;
// Checks that a node has a name 
function validateNode(node) {
    var names = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        names[_i - 1] = arguments[_i];
    }
    if (names.indexOf(node.name) < 0)
        throwError(node, 'Did not expect ' + node.name);
    return node;
}
exports.validateNode = validateNode;
// Calls a function on every node in the AST passing the AST node and it's child
function visitAstWithParent(node, parent, f) {
    node.children.forEach(function (c) { return visitAstWithParent(c, node, f); });
    f(node, parent);
}
exports.visitAstWithParent = visitAstWithParent;
// Calls a function on every node in the AST passing the AST node and it's child
function visitAst(node, f) {
    if (!node)
        return;
    node.children.forEach(function (c) { return visitAst(c, f); });
    f(node);
}
exports.visitAst = visitAst;
// Visits every node creating a pointer to its parent 
function setParentPointers(node) {
    visitAstWithParent(node, null, function (c, p) { return c.parent = p; });
}
exports.setParentPointers = setParentPointers;
// Performs some pre-processing of the AST to make it easier to work with
// Many expressions are converted into function calls.
// Also parent back pointers are added along with ids to the nodes. 
function preprocessAst(node, file) {
    // We have to set parent pointers on the original tree 
    setParentPointers(node);
    // Set pointers to the file
    visitAst(node, function (n) { return n.file = file; });
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
    visitAst(node, function (n) { return n.file = file; });
    // Assign unique ids, for convenience and looks up. 
    var id = 0;
    visitAst(node, function (node) { return node['id'] = id++; });
    return node;
}
exports.preprocessAst = preprocessAst;
//# sourceMappingURL=heron-ast-rewrite.js.map