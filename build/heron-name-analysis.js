"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function analyzeHeronNames(ast) {
    var scopes = new NameAnalyzer();
    var visitor = new AstVisitor();
    visitor.visitNode(ast, scopes);
    return scopes;
}
exports.analyzeHeronNames = analyzeHeronNames;
// A usage of a name. 
var VarUsage = /** @class */ (function () {
    function VarUsage(name, scope, node, def) {
        this.name = name;
        this.scope = scope;
        this.node = node;
        this.def = def;
        if (def)
            def.usages.push(this);
    }
    return VarUsage;
}());
exports.VarUsage = VarUsage;
// The definition of a variable
var VarDef = /** @class */ (function () {
    function VarDef(name, scope, node) {
        this.name = name;
        this.scope = scope;
        this.node = node;
        this.usages = [];
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
    Object.defineProperty(VarDef.prototype, "decoratedName", {
        get: function () {
            if (this.args.length > 0)
                return this.name + '$' + this.argTypes.join('$');
            else
                return this.name;
        },
        enumerable: true,
        configurable: true
    });
    return VarDef;
}());
exports.VarDef = VarDef;
// A scope. Scopes create a tree. 
var Scope = /** @class */ (function () {
    function Scope() {
        this.id = 0;
        this.usages = [];
        this.defs = [];
        this.children = [];
    }
    Scope.prototype.findDef = function (name) {
        for (var _i = 0, _a = this.defs; _i < _a.length; _i++) {
            var d = _a[_i];
            if (d.name === name)
                return d;
        }
        return this.parent
            ? this.parent.findDef(name)
            : null;
    };
    return Scope;
}());
exports.Scope = Scope;
// This is passed to the visitor and stores all scopes.  
var NameAnalyzer = /** @class */ (function () {
    function NameAnalyzer() {
        this.curScope = new Scope();
        this.scopes = [this.curScope];
        this.unknownVars = [];
    }
    NameAnalyzer.prototype.pushScope = function (ast) {
        var tmp = new Scope();
        tmp.id = this.scopes.length;
        this.scopes.push(tmp);
        this.curScope.children.push(tmp);
        tmp.parent = this.curScope;
        tmp.node = ast;
        this.curScope = tmp;
    };
    NameAnalyzer.prototype.popScope = function () {
        this.curScope = this.curScope.parent;
    };
    NameAnalyzer.prototype.findDef = function (name) {
        return this.curScope.findDef(name);
    };
    NameAnalyzer.prototype.addVarDef = function (name, node) {
        var vd = new VarDef(name, this.curScope, node);
        this.curScope.defs.push(vd);
    };
    NameAnalyzer.prototype.addVarUsage = function (name, node) {
        var usage = new VarUsage(name, this.curScope, node, this.findDef(name));
        this.curScope.usages.push(usage);
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
        var funcName = ast.children[0];
        state.addVarDef(funcName.allText, ast);
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_intriniscDef = function (ast, state) {
        var funcName = ast.children[0];
        state.addVarDef(funcName.allText, ast);
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope();
    };
    AstVisitor.prototype.visit_funcParamName = function (ast, state) {
        state.addVarDef(ast.allText, ast);
    };
    AstVisitor.prototype.visit_typeName = function (ast, state) {
        state.addVarUsage(ast.allText, ast);
    };
    AstVisitor.prototype.visit_lambdaArg = function (ast, state) {
        // TODO: when types are introduced, we will have to update this
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
        if (child.name === 'identifier')
            state.addVarUsage(child.allText, ast);
    };
    AstVisitor.prototype.visit_module = function (ast, state) {
        state.pushScope(ast);
        this.visitChildren(ast, state);
        state.popScope(ast);
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
//# sourceMappingURL=heron-name-analysis.js.map