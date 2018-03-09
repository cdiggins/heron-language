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
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
// This is a definition of a name. It could be a function, variable, type
var Def = /** @class */ (function () {
    function Def(node, name, type) {
        this.node = node;
        this.name = name;
        this.type = type;
    }
    return Def;
}());
exports.Def = Def;
// Represents the definition of a function 
var FuncDef = /** @class */ (function (_super) {
    __extends(FuncDef, _super);
    function FuncDef(node, name, type, params, genericParams) {
        var _this = _super.call(this, node, name, type) || this;
        _this.node = node;
        _this.name = name;
        _this.type = type;
        _this.params = params;
        _this.genericParams = genericParams;
        return _this;
    }
    return FuncDef;
}(Def));
exports.FuncDef = FuncDef;
// Represent a parameter to a function or a lambda expression 
var FuncParamDef = /** @class */ (function (_super) {
    __extends(FuncParamDef, _super);
    function FuncParamDef(node, name, type) {
        var _this = _super.call(this, node, name, type) || this;
        _this.node = node;
        _this.name = name;
        _this.type = type;
        return _this;
    }
    return FuncParamDef;
}(Def));
exports.FuncParamDef = FuncParamDef;
// Represents the definition of a variable
var VarDef = /** @class */ (function (_super) {
    __extends(VarDef, _super);
    function VarDef(node, name, expr) {
        var _this = _super.call(this, node, name, expr) || this;
        _this.node = node;
        _this.name = name;
        _this.expr = expr;
        return _this;
    }
    return VarDef;
}(Def));
exports.VarDef = VarDef;
// Represents the definition of a type 
var TypeDef = /** @class */ (function (_super) {
    __extends(TypeDef, _super);
    function TypeDef(node, name) {
        var _this = _super.call(this, node, name, 'type') || this;
        _this.node = node;
        _this.name = name;
        return _this;
    }
    return TypeDef;
}(Def));
exports.TypeDef = TypeDef;
// Represents the definition of a generic type parameter 
var TypeParamDef = /** @class */ (function (_super) {
    __extends(TypeParamDef, _super);
    function TypeParamDef(node, name, constraint) {
        var _this = _super.call(this, node, name, 'type') || this;
        _this.node = node;
        _this.name = name;
        _this.constraint = constraint;
        return _this;
    }
    return TypeParamDef;
}(Def));
exports.TypeParamDef = TypeParamDef;
// Represents the definition of a module
var ModuleDef = /** @class */ (function (_super) {
    __extends(ModuleDef, _super);
    function ModuleDef(node, name) {
        var _this = _super.call(this, node, name, null) || this;
        _this.node = node;
        _this.name = name;
        return _this;
    }
    return ModuleDef;
}(Def));
exports.ModuleDef = ModuleDef;
//==========================================================================================
// Exported functions
function createDefs(ast) {
    heron_ast_rewrite_1.visitAst(ast, createDef);
}
exports.createDefs = createDefs;
function createDef(node) {
    // NOTE: typeParamDef and funcParamDef are created by the funcDef    
    switch (node.name) {
        case "funcDef":
            return createFuncDef(node);
        case "intrinsicDef":
            return createFuncDef(node);
        case "typeDef":
            return createTypeDef(node);
        case "varDecl":
            return createVarDef(node);
    }
    return null;
}
exports.createDef = createDef;
//==========================================================================================
function validateNode(node) {
    var names = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        names[_i - 1] = arguments[_i];
    }
    if (names.indexOf(node.name) < 0)
        throw new Error('Did not expect ' + node.name);
    return node;
}
function addDef(node, def) {
    node['def'] = def;
    return def;
}
function createTypeParam(node) {
    validateNode(node, 'genericParam');
    var name = node.children[0].allText;
    var constraint = node.children.length > 1 ? node.children[1] : null;
    return addDef(node, new TypeParamDef(node, name, constraint));
}
function createFuncDef(node) {
    validateNode(node, 'funcDef', 'intrinsicDef');
    var sig = validateNode(node.children[0], 'funcSig');
    var name = sig.children[0].allText;
    var genericParamsNodes = validateNode(sig.children[1], 'genericParams');
    var genericParams = genericParamsNodes.children.map(createTypeParam);
    var params = validateNode(sig.children[2], 'funcParams').children.map(createFuncParamDef);
    var retType = (sig.children.length > 2) ? sig.children[3] : null;
    return addDef(node, new FuncDef(node, name, retType, params, genericParams));
}
function createFuncParamDef(node) {
    validateNode(node, 'funcParam');
    var name = node.children[0].allText;
    var type = (node.children.length > 1) ? node.children[1] : null;
    return addDef(node, new FuncParamDef(node, name, type));
}
function createVarDef(node) {
    validateNode(node, 'varDecl');
    var name = validateNode(node.children[0], 'varNameDecl');
    var init = validateNode(node.children[1], 'varInitialization');
    return addDef(node, new VarDef(node, name.allText, init.children[0]));
}
function createTypeDef(node) {
    validateNode(node, 'typeDef');
    var name = node.children[0].allText;
    return addDef(node, new TypeDef(node, name));
}
// STEP1: create the defs
// STEP2: create the refs ... 
// STEP3: figure out the expression ...
// STEP4: figure out the types ...
//# sourceMappingURL=heron-defs.js.map