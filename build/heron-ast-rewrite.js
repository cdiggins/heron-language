"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myna_1 = require("myna-parser/myna");
var g = myna_1.Myna.grammars['heron'];
;
function throwError(node, msg) {
    if (msg === void 0) { msg = ''; }
    throw new Error(msg + (msg ? "\n" : "") + parseLocation(node));
}
exports.throwError = throwError;
function getFile(node) {
    if (!node)
        return '';
    return node['file'] ? node['file'] : getFile(node['parent']);
}
exports.getFile = getFile;
function parseLocation(node) {
    if (node['node'])
        return parseLocation(node['node']);
    if (node['original'])
        return parseLocation(node['original']);
    if (node instanceof myna_1.Myna.AstNode) {
        var loc = new myna_1.Myna.ParseLocation(node.input, node.start);
        return loc.toString() + '\n' + 'in file ' + getFile(node);
    }
    throw new Error('Unexpected node: ' + node);
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
function mapAst(ast, f) {
    ast.children = ast.children.map(function (c) { return mapAst(c, f); });
    var r = f(ast);
    // Store a back pointer to the original AST 
    if (r != ast)
        r['original'] = ast;
    return r;
}
exports.mapAst = mapAst;
// Creates a function call node given a function name, and some arguments 
function funCall(fxnName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var fxn = g.varName.node(fxnName);
    var fxnCallArgs = (_a = g.funCall).node.apply(_a, [''].concat(args));
    return g.postfixExpr.node('', fxn, fxnCallArgs);
    var _a;
}
exports.funCall = funCall;
// Given a binary operator, a left operand and a right operand, creates a new AstNode 
function opToFunCall(op, left, right) {
    return funCall("op" + op, left, right);
}
exports.opToFunCall = opToFunCall;
function isFunCall(ast) {
    return ast && ast.name !== 'postfixExpr' && ast.children[1].name == 'funCall';
}
exports.isFunCall = isFunCall;
function isFieldSelect(ast) {
    return ast && ast.name !== 'postfixExpr' && ast.children[1].name == 'fieldSelect';
}
exports.isFieldSelect = isFieldSelect;
function isMethodCall(ast) {
    return isFunCall(ast) && isFieldSelect(ast.children[0]);
}
exports.isMethodCall = isMethodCall;
function isExpr(ast) {
    switch (ast.name) {
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
            throw new Error("Unsupported expression found: pre-processing was not performed: " + ast.name);
        default:
            return false;
    }
}
exports.isExpr = isExpr;
// Transform x.f(y) => f(x, y)
function methodToFunction(ast) {
    if (ast.name === 'postfixExpr') {
        if (ast.children.length != 2)
            throw new Error("Expected the postfix expression to have exactly two children at this point: probably forgot to pre-process");
        if (ast.children[1].name === 'funCall') {
            if (ast.children[0].name === 'postfixExpr') {
                if (ast.children[0].children[1].name === 'fieldSelect') {
                    var fn = ast.children[0].children[1].children[0].allText;
                    var _this = ast.children[0].children[0];
                    var args = ast.children[1].children;
                    return funCall.apply(void 0, [fn, _this].concat(args));
                }
            }
        }
    }
    return ast;
}
exports.methodToFunction = methodToFunction;
// Converts x.a => a(x)
function fieldSelectToFunction(ast) {
    if (ast.name === 'postfixExpr') {
        if (ast.children[1].name === 'fieldSelect') {
            var fieldName = ast.children[1].children[0].allText;
            return funCall(fieldName, ast.children[0]);
        }
    }
    return ast;
}
exports.fieldSelectToFunction = fieldSelectToFunction;
// Converts array indexing to function calls
// xs[i] = op_at(xs, i)
function arrayIndexToFunction(ast) {
    if (ast.name === 'postfixExpr') {
        if (ast.children[1].name === 'arrayIndex') {
            var arrayIndex = ast.children[1].children[0];
            return funCall('op_at', ast.children[0], arrayIndex);
        }
    }
    return ast;
}
exports.arrayIndexToFunction = arrayIndexToFunction;
// Converts binary operators to function calls
function opToFunction(ast) {
    // We are only going to handle certain cases
    switch (ast.name) {
        case 'prefixExpr': {
            var r = ast.children[ast.children.length - 1];
            for (var i = ast.children.length - 2; i >= 0; --i) {
                var opName = '';
                switch (ast.children[i].allText) {
                    case '++':
                        opName = 'op_preinc';
                        break;
                    case '--':
                        opName = 'op_predec';
                        break;
                    case '-':
                        opName = 'op_negate';
                        break;
                    case '!':
                        opName = 'op_not';
                        break;
                    default: throw new Error('Unrecognized prefix operator ' + ast.children[i].allText);
                }
                r = funCall(opName, r);
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
            return ast;
    }
    if (ast.children.length != 2)
        throw new Error("Expected exactly two children");
    var left = ast.children[0];
    var right = ast.children[1];
    if (right.children.length != 2)
        throw new Error("Expected two children of 2");
    var op = right.children[0].allText;
    return opToFunCall(op, left, right.children[1]);
}
exports.opToFunction = opToFunction;
// Some expressions are parsed as a list of expression. 
// (a [op b].*) 
// We want to make sure these expressions always have two children. 
// (a op b op c op d) => (((a op b) op c) op d)
// (a op b) => (a op b)
// (a) => a 
function exprListToPair(ast) {
    // We are only going to handle certain cases
    switch (ast.name) {
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
        var right = ast.children[ast.children.length - 1];
        for (var i = ast.children.length - 2; i >= 0; --i) {
            var left = ast.children[i];
            right = ast.rule.node('', left, right);
        }
        return right;
    }
    else {
        // More than two, we are going to shift things to the left-side
        var left = ast.children[0];
        for (var i = 1; i < ast.children.length; ++i) {
            var right = ast.children[i];
            left = ast.rule.node('', left, right);
        }
        return left;
    }
}
exports.exprListToPair = exprListToPair;
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
function visitAstWithParent(ast, parent, f) {
    ast.children.forEach(function (c) { return visitAstWithParent(c, ast, f); });
    f(ast, parent);
}
exports.visitAstWithParent = visitAstWithParent;
// Calls a function on every node in the AST passing the AST node and it's child
function visitAst(ast, f) {
    ast.children.forEach(function (c) { return visitAst(c, f); });
    f(ast);
}
exports.visitAst = visitAst;
// Performs some pre-processing of the AST to make it easier to work with
// Many expressions are converted into function calls.
// Also parent back pointers are added along with ids to the nodes. 
function preprocessAst(ast) {
    // The order of transforms matters. Particularly we need to do 
    // Method to function before doing fieldSelectToFunctions
    ast = mapAst(ast, exprListToPair);
    ast = mapAst(ast, methodToFunction);
    ast = mapAst(ast, fieldSelectToFunction);
    ast = mapAst(ast, arrayIndexToFunction);
    ast = mapAst(ast, opToFunction);
    // Some operations later on are easier if we have a parent pointer  
    visitAstWithParent(ast, null, function (c, p) { return c['parent'] = p; });
    // Assign unique ids, for convenience and looks up. 
    var id = 0;
    visitAst(ast, function (node) { return node['id'] = id++; });
    return ast;
}
exports.preprocessAst = preprocessAst;
//# sourceMappingURL=heron-ast-rewrite.js.map