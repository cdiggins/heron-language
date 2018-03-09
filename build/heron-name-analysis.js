"use strict";
// TODO: if a var usage is a function, what are the arguments!
// TODO: maybe I should be updating the Ast tree with extra information. 
// - adding tags to indicate whether the expression is a func arg etc. 
// - or maybe  
Object.defineProperty(exports, "__esModule", { value: true });
var heron_defs_1 = require("./heron-defs");
var heron_refs_1 = require("./heron-refs");
function typeToString(node) {
    return node ? node.allText : 'Any';
}
exports.typeToString = typeToString;
// A scope contains unique name declarations. Scopes are arranaged in a tree. 
var Scope = /** @class */ (function () {
    function Scope(node) {
        this.node = node;
        this.id = 0;
        this.refs = [];
        this.defs = [];
        this.children = [];
        if (node)
            node['scope'] = this;
    }
    // We can find multiple defs at the same level (e.g. functions)
    Scope.prototype.findDefs = function (name) {
        var r = [];
        for (var _i = 0, _a = this.defs; _i < _a.length; _i++) {
            var d = _a[_i];
            if (d.name === name)
                r.push(d);
        }
        if (r.length > 0)
            return r;
        return this.parent
            ? this.parent.findDefs(name)
            : [];
    };
    Scope.prototype.allDefs = function (r) {
        if (r === void 0) { r = []; }
        r.push.apply(r, this.defs);
        this.children.forEach(function (c) { return c.allDefs(r); });
        return r;
    };
    Scope.prototype.allRefs = function (r) {
        if (r === void 0) { r = []; }
        r.push.apply(r, this.refs);
        this.children.forEach(function (c) { return c.allRefs(r); });
        return r;
    };
    Scope.prototype.allScopes = function (r) {
        if (r === void 0) { r = []; }
        r.push(this);
        this.children.forEach(function (c) { return c.allScopes(r); });
        return r;
    };
    Scope.prototype.toString = function () {
        if (!this.node)
            return "__global__";
        return nodeId(this.node);
    };
    return Scope;
}());
exports.Scope = Scope;
// Wraps a source file 
var SourceFile = /** @class */ (function () {
    function SourceFile(filePath, node) {
        this.filePath = filePath;
        this.node = node;
    }
    return SourceFile;
}());
exports.SourceFile = SourceFile;
// A package is a compiled system. It contains a set of modules. 
// This is built incrementally by a visitor and stores all scopes, usages, and defs that are found. 
var Package = /** @class */ (function () {
    function Package() {
        this.modules = [];
        this.scope = new Scope(null);
        this.scopes = [this.scope];
        this.usages = [];
        this.defs = [];
        this.files = [];
    }
    // When done calling analyzeFile on all files, call "resolveLinks"
    Package.prototype.addFile = function (ast, isBuiltIn, filePath) {
        if (ast.name !== 'file') {
            throw new Error('Not a file');
        }
        var visitor = new AstVisitor();
        for (var _i = 0, _a = ast.children; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.name !== 'module')
                continue;
            // Built in modules have their names added to the global scope
            if (!isBuiltIn)
                this.pushScope(ast);
            var modName = ast.children[0].allText;
            var module = new heron_defs_1.ModuleDef(ast, modName);
            ast['module'] = module;
            this.modules.push(module);
            visitor.visitNode(ast, this);
            // Built in modules have their names added to the global scope
            if (!isBuiltIn)
                this.popScope();
        }
        this.files.push(new SourceFile(filePath, ast));
    };
    // Find what possible definitions each var usage could have.
    Package.prototype.resolveLinks = function () {
        for (var _i = 0, _a = this.usages; _i < _a.length; _i++) {
            var u = _a[_i];
            u.defs = u.scope.findDefs(u.name);
        }
    };
    // Scans for modules
    Package.prototype.getModule = function (name) {
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.name === name)
                return m;
        }
        throw new Error("Module not found " + name);
    };
    //=============================================
    // These functions are used by the visitor to incrementally build the package  
    Package.prototype.pushScope = function (ast) {
        var tmp = new Scope(ast);
        tmp.id = this.scopes.length;
        this.scopes.push(tmp);
        this.scope.children.push(tmp);
        tmp.parent = this.scope;
        this.scope = tmp;
    };
    Package.prototype.popScope = function () {
        this.scope = this.scope.parent;
    };
    Package.prototype.findDefs = function (name) {
        return this.scope.findDefs(name);
    };
    Package.prototype.addDef = function (def) {
        this.scope.defs.push(def);
        this.defs.push(def);
    };
    Package.prototype.addVarUsage = function (name, node, usageType) {
        var usage = new heron_refs_1.Ref(name, this.scope, node, usageType);
        this.scope.refs.push(usage);
        this.usages.push(usage);
    };
    return Package;
}());
exports.Package = Package;
// Used for visiting nodes in the Heron AST looking for name defintions, usages, and scopes.
var AstVisitor = /** @class */ (function () {
    function AstVisitor() {
    }
    // Visitor helper functions
    AstVisitor.prototype.visitNode = function (ast, state) {
        var fnName = 'visit_' + ast.name;
        if (fnName in this)
            this[fnName](ast, state);
        else
            this.visitChildren(ast, state);
    };
    AstVisitor.prototype.visitChildren = function (ast, state) {
        for (var _i = 0, _a = ast.children; _i < _a.length; _i++) {
            var child = _a[_i];
            this.visitNode(child, state);
        }
    };
    // Particular node visitors 
    AstVisitor.prototype.visit_compoundStatement = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_funcDef = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_intrinsicDef = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_typeName = function (ast, state) {
        state.addVarUsage(ast.allText, ast, heron_refs_1.RefType.type);
    };
    AstVisitor.prototype.visit_lambdaArg = function (ast, state) {
        this.visitChildren(ast, state);
    };
    AstVisitor.prototype.visit_lambdaBody = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_lambdaExpr = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_leafExpr = function (ast, state) {
        var child = ast.children[0];
        if (child.name === 'identifier') {
            state.addVarUsage(child.allText, ast, getUsageType(child));
        }
        else {
            this.visitChildren(ast, state);
        }
    };
    AstVisitor.prototype.visit_recCompoundStatement = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_varExpr = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    return AstVisitor;
}());
function nodeId(ast) {
    return ast ? ast.name + '_' + ast['id'] : '';
}
exports.nodeId = nodeId;
exports.scopeType = ['funcDef', 'instrinsicDef', 'module', 'varExpr', 'compoundStatement'];
exports.nodeTypes = ['lambdaArg', 'funcDef', 'funcParamName', 'varDecl', 'typeDecl', 'intrinsicDef', 'genericParam', 'typeName', 'leafExpr', 'typeDef'];
function isValidNodeType(s) {
    return exports.nodeTypes.indexOf(s) >= 0;
}
function isValidScopeType(s) {
    return exports.scopeType.indexOf(s) >= 0;
}
// Returns true if the identifier is used as a function call. 
// A variable could still be a function, only a proper type analysis will tell.
function getUsageType(ast) {
    if (!ast || ast.name !== 'identifier')
        throw new Error("Expected an identifier");
    var expr = identExpr(ast);
    if (isFun(expr))
        return heron_refs_1.RefType.fun;
    if (isFunArg(expr))
        return heron_refs_1.RefType.arg;
    var p = expr['parent'];
    if (p.name == 'assignmentExpr') {
        if (p.children.length !== 2)
            throw new Error("Assignment expressions should have exactly two children");
        if (p.children[0] === p)
            return heron_refs_1.RefType.lvalue;
        if (p.children[1] === p)
            return heron_refs_1.RefType.rvalue;
        throw new Error("Node is not a child of its parent");
    }
    throw new Error("Identifier used in an unrecognized expression context: " + p.name + " " + p.allText);
}
function identExpr(ast) {
    if (!ast || ast.name !== 'identifier')
        throw new Error("Expected an identifier");
    ast = ast['parent'];
    if (!ast || ast.name !== 'leafExpr')
        return null;
    return ast;
}
// Returns whether an expression is a function that is called 
function isFun(ast) {
    if (!ast || ast.name !== 'leafExpr')
        return false;
    ast = ast['parent'];
    if (!ast || ast.name !== 'postfixExpr')
        return false;
    if (ast.children.length !== 2)
        throw new Error("Postfix expressions should be pre-processed to only have two children");
    return ast.children[1].name == 'funCall';
}
// Get all of the function arguments associated with a call.
function isFunArg(ast) {
    if (!ast || ast.name !== 'leafExpr')
        return false;
    ast = ast['parent'];
    if (!ast || ast.name !== 'funCall')
        return false;
    return true;
}
// Get all of the function arguments associated with a call.
function getFunArgs(ast) {
    if (!ast || ast.name !== 'leafExpr')
        return [];
    ast = ast['parent'];
    if (!ast || ast.name !== 'postfixExpr')
        return [];
    if (ast.children.length !== 2)
        throw new Error("Postfix expressions should be pre-processed to only have two children");
    var r = ast.children[1].children;
}
//# sourceMappingURL=heron-name-analysis.js.map