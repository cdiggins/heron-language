"use strict";
// TODO: if a var usage is a function, what are the arguments!
// TODO: maybe I should be updating the Ast tree with extra information. 
// - adding tags to indicate whether the expression is a func arg etc. 
// - or maybe  
Object.defineProperty(exports, "__esModule", { value: true });
function analyzeHeronNames(ast) {
    var analyzer = new NameAnalyzer();
    var visitor = new AstVisitor();
    visitor.visitNode(ast, analyzer);
    analyzer.resolveUsageDefs();
    return analyzer;
}
exports.analyzeHeronNames = analyzeHeronNames;
var VarUsageType;
(function (VarUsageType) {
    VarUsageType[VarUsageType["fun"] = 0] = "fun";
    VarUsageType[VarUsageType["var"] = 1] = "var";
    VarUsageType[VarUsageType["type"] = 2] = "type";
    VarUsageType[VarUsageType["arg"] = 3] = "arg";
    VarUsageType[VarUsageType["lvalue"] = 4] = "lvalue";
    VarUsageType[VarUsageType["rvalue"] = 5] = "rvalue";
})(VarUsageType || (VarUsageType = {}));
// A usage of a name. 
var VarUsage = /** @class */ (function () {
    function VarUsage(name, scope, node, usageType) {
        this.name = name;
        this.scope = scope;
        this.node = node;
        this.usageType = usageType;
        // This value is set manually
        this.defs = [];
        if (!isValidNodeType(node.name))
            throw new Error("Not a valid node type: " + node.name);
    }
    VarUsage.prototype.toString = function () {
        return this.name + '_' + this.node['id'] + ':' + this.usageType.toString();
    };
    return VarUsage;
}());
exports.VarUsage = VarUsage;
;
// The definition of a variable
var VarDef = /** @class */ (function () {
    function VarDef(name, scope, node) {
        this.name = name;
        this.scope = scope;
        this.node = node;
        this.usages = [];
        if (!isValidNodeType(this.node.name))
            throw new Error("Invalid node type: " + this.node.name);
    }
    Object.defineProperty(VarDef.prototype, "args", {
        get: function () {
            return (this.node.name === 'funcDef')
                ? this.node.children[1].children
                : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VarDef.prototype, "argTypes", {
        get: function () {
            return this.args.map(function (p) { return p.children.length == 2 ? p.children[1].allText : "Any"; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VarDef.prototype, "scopedName", {
        get: function () {
            return this.name + '_' + this.scope.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VarDef.prototype, "decoratedName", {
        get: function () {
            var r = this.scopedName;
            if (this.args.length > 0)
                r += '$' + this.argTypes.join('$');
            return r;
        },
        enumerable: true,
        configurable: true
    });
    return VarDef;
}());
exports.VarDef = VarDef;
// A scope contains unique name declarations. Scopes are arranaged in a tree. 
var Scope = /** @class */ (function () {
    function Scope() {
        this.id = 0;
        this.usages = [];
        this.defs = [];
        this.children = [];
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
    Scope.prototype.allUsages = function (r) {
        if (r === void 0) { r = []; }
        r.push.apply(r, this.usages);
        this.children.forEach(function (c) { return c.allUsages(r); });
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
// This is passed to the visitor and stores all scopes.  
var NameAnalyzer = /** @class */ (function () {
    function NameAnalyzer() {
        this.scope = new Scope();
        this.scopes = [this.scope];
        this.usages = [];
        this.defs = [];
    }
    NameAnalyzer.prototype.pushScope = function (ast) {
        var tmp = new Scope();
        tmp.id = this.scopes.length;
        this.scopes.push(tmp);
        this.scope.children.push(tmp);
        tmp.parent = this.scope;
        tmp.node = ast;
        this.scope = tmp;
    };
    NameAnalyzer.prototype.popScope = function () {
        this.scope = this.scope.parent;
    };
    NameAnalyzer.prototype.findDefs = function (name) {
        return this.scope.findDefs(name);
    };
    NameAnalyzer.prototype.addVarDef = function (name, node) {
        var vd = new VarDef(name, this.scope, node);
        this.scope.defs.push(vd);
        this.defs.push(vd);
    };
    NameAnalyzer.prototype.addVarUsage = function (name, node, usageType) {
        var usage = new VarUsage(name, this.scope, node, usageType);
        this.scope.usages.push(usage);
        this.usages.push(usage);
    };
    NameAnalyzer.prototype.resolveUsageDefs = function () {
        for (var _i = 0, _a = this.usages; _i < _a.length; _i++) {
            var u = _a[_i];
            u.defs = u.scope.findDefs(u.name);
        }
    };
    return NameAnalyzer;
}());
exports.NameAnalyzer = NameAnalyzer;
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
    AstVisitor.prototype.visit_genericParam = function (ast, state) {
        var paramName = ast.children[0].allText;
        state.addVarDef(paramName, ast);
    };
    AstVisitor.prototype.visit_funcDef = function (ast, state) {
        var funcSig = ast.children[0];
        var funcName = funcSig.children[0];
        state.addVarDef(funcName.allText, ast);
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_intriniscDef = function (ast, state) {
        var funcSig = ast.children[0];
        var funcName = funcSig.children[0];
        state.addVarDef(funcName.allText, ast);
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_funcParamName = function (ast, state) {
        state.addVarDef(ast.allText, ast);
    };
    AstVisitor.prototype.visit_typeName = function (ast, state) {
        state.addVarUsage(ast.allText, ast, VarUsageType.type);
    };
    AstVisitor.prototype.visit_lambdaArg = function (ast, state) {
        state.addVarDef(ast.allText, ast);
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
    };
    AstVisitor.prototype.visit_module = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_recCompoundStatement = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_varDecl = function (ast, state) {
        state.addVarDef(ast.children[0].allText, ast);
        this.visitChildren(ast, state);
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
exports.nodeTypes = ['lambdaArg', 'funcDef', 'funcParamName', 'varDecl', 'typeDecl', 'intrinsicDef', 'genericParam', 'typeName', 'leafExpr'];
function isValidNodeType(s) {
    return exports.nodeTypes.indexOf(s) >= 0;
}
function isValidScopeType(s) {
    return exports.scopeType.indexOf(s) >= 0;
}
function varDefByType(vds) {
    var r = {};
    for (var _i = 0, vds_1 = vds; _i < vds_1.length; _i++) {
        var vd = vds_1[_i];
        var type = vd.node.name;
        if (!isValidNodeType(type))
            throw new Error("Not a valid node type " + type);
        (r[type] || (r[type] = [])).push(vd);
    }
    return r;
}
// Returns true if the identifier is used as a function call. 
// A variable could still be a function, only a proper type analysis will tell.
function getUsageType(ast) {
    if (!ast || ast.name !== 'identifier')
        throw new Error("Expected an identifier");
    var expr = identExpr(ast);
    if (isFun(expr))
        return VarUsageType.fun;
    if (isFunArg(expr))
        return VarUsageType.arg;
    var p = expr['parent'];
    if (p.name == 'assignmentExpr') {
        if (p.children.length !== 2)
            throw new Error("Assignment expressions should have exactly two children");
        if (p.children[0] === p)
            return VarUsageType.lvalue;
        if (p.children[1] === p)
            return VarUsageType.rvalue;
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