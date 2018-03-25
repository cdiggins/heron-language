"use strict";
// This module provides support for dealing with definitions.  
// A definition could be a function definition, parameter definition, variable definition, type definition. 
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
    function Def(node, name) {
        this.node = node;
        this.name = name;
        node.def = this;
    }
    Def.prototype.toString = function () {
        return this.name + '_' + this.constructor['name'] + this.node['id'];
    };
    return Def;
}());
exports.Def = Def;
function typeNodeToStr(node) {
    if (!node || !node.allText)
        return "any";
    return node.allText;
}
exports.typeNodeToStr = typeNodeToStr;
// Represents the definition of a function 
var FuncDef = /** @class */ (function (_super) {
    __extends(FuncDef, _super);
    function FuncDef(node, name, retTypeNode, params, genericParams, body) {
        var _this = _super.call(this, node, name) || this;
        _this.node = node;
        _this.name = name;
        _this.retTypeNode = retTypeNode;
        _this.params = params;
        _this.genericParams = genericParams;
        _this.body = body;
        return _this;
    }
    FuncDef.prototype.toString = function () {
        return this.name + "(" + this.params.join(", ") + ") : " + typeNodeToStr(this.retTypeNode);
    };
    return FuncDef;
}(Def));
exports.FuncDef = FuncDef;
// Represent a parameter to a function or a lambda expression 
var FuncParamDef = /** @class */ (function (_super) {
    __extends(FuncParamDef, _super);
    function FuncParamDef(node, name, typeNode) {
        var _this = _super.call(this, node, name) || this;
        _this.node = node;
        _this.name = name;
        _this.typeNode = typeNode;
        return _this;
    }
    FuncParamDef.prototype.toString = function () {
        return this.name + " : " + typeNodeToStr(this.typeNode);
    };
    return FuncParamDef;
}(Def));
exports.FuncParamDef = FuncParamDef;
// Represents the definition of a variable. 
var VarDef = /** @class */ (function (_super) {
    __extends(VarDef, _super);
    function VarDef(node, name, exprNode) {
        var _this = _super.call(this, node, name) || this;
        _this.node = node;
        _this.name = name;
        _this.exprNode = exprNode;
        return _this;
    }
    return VarDef;
}(Def));
exports.VarDef = VarDef;
// Represents the definition of a variable used in a for loop
// The type is not known, until the type of the expression is figured out.
// Unlike a VarDef the expression must be an array.
var ForLoopVarDef = /** @class */ (function (_super) {
    __extends(ForLoopVarDef, _super);
    function ForLoopVarDef(node, name, exprNode) {
        var _this = _super.call(this, node, name) || this;
        _this.node = node;
        _this.name = name;
        _this.exprNode = exprNode;
        return _this;
    }
    return ForLoopVarDef;
}(Def));
exports.ForLoopVarDef = ForLoopVarDef;
// Represents the definition of a type 
var TypeDef = /** @class */ (function (_super) {
    __extends(TypeDef, _super);
    function TypeDef(node, name) {
        var _this = _super.call(this, node, name) || this;
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
        var _this = _super.call(this, node, name) || this;
        _this.node = node;
        _this.name = name;
        _this.constraint = constraint;
        return _this;
    }
    return TypeParamDef;
}(Def));
exports.TypeParamDef = TypeParamDef;
//==========================================================================================
// Exported functions
function createDef(node) {
    // NOTE: typeParamDef and funcParamDef are created by the funcDef    
    switch (node.name) {
        case "funcDef":
        case "intrinsicDef":
            return createFuncDef(node);
        case "typeDef":
            return createTypeDef(node);
        case "forLoop":
            return createForLoopVarDef(node);
        case "varDecl":
            return createVarDef(node);
        case "lambdaArg":
        case "lambdaArgNoType":
            return createFuncParamDef(node);
    }
    return null;
}
exports.createDef = createDef;
//==========================================================================================
function createTypeParam(node) {
    heron_ast_rewrite_1.validateNode(node, 'genericParam');
    var name = node.children[0].allText;
    var constraint = node.children.length > 1 ? node.children[1] : null;
    return new TypeParamDef(node, name, constraint);
}
exports.createTypeParam = createTypeParam;
function createFuncDef(node) {
    heron_ast_rewrite_1.validateNode(node, 'funcDef', 'intrinsicDef');
    var sig = heron_ast_rewrite_1.validateNode(node.children[0], 'funcSig');
    var name = sig.children[0].allText;
    var genericParamsNodes = heron_ast_rewrite_1.validateNode(sig.children[1], 'genericParams');
    var genericParams = genericParamsNodes.children.map(createTypeParam);
    var params = heron_ast_rewrite_1.validateNode(sig.children[2], 'funcParams').children.map(createFuncParamDef);
    var retType = (sig.children.length > 2) ? sig.children[3] : null;
    var body = node.children.length > 1 ? node.children[1] : null;
    return new FuncDef(node, name, retType, params, genericParams, body);
}
exports.createFuncDef = createFuncDef;
function createFuncParamDef(node) {
    heron_ast_rewrite_1.validateNode(node, 'funcParam', 'lambdaArg', 'lambdaArgNoType');
    var name = node.children[0].allText;
    var type = (node.children.length > 1) ? node.children[1] : null;
    return new FuncParamDef(node, name, type);
}
exports.createFuncParamDef = createFuncParamDef;
function createVarDef(node) {
    heron_ast_rewrite_1.validateNode(node, 'varDecl');
    var name = heron_ast_rewrite_1.validateNode(node.children[0], 'varNameDecl');
    return new VarDef(node, name.allText, node.children[1]);
}
exports.createVarDef = createVarDef;
function createForLoopVarDef(node) {
    heron_ast_rewrite_1.validateNode(node, 'forLoop');
    var name = heron_ast_rewrite_1.validateNode(node.children[0], 'identifier');
    return new ForLoopVarDef(node, name.allText, node.children[1]);
}
exports.createForLoopVarDef = createForLoopVarDef;
function createTypeDef(node) {
    heron_ast_rewrite_1.validateNode(node, 'typeDef');
    var name = node.children[0].allText;
    return new TypeDef(node, name);
}
exports.createTypeDef = createTypeDef;
function getDef(node, typeName) {
    if (!node)
        throw new Error("Node is missing");
    var def = node.def;
    if (!def)
        heron_ast_rewrite_1.throwError(node, "No definition associated with node");
    if (def.constructor['name'] !== typeName)
        heron_ast_rewrite_1.throwError(node, "Incorrect definition type, expected " + typeName + " was " + def.constructor['name']);
    return def;
}
exports.getDef = getDef;
//# sourceMappingURL=heron-defs.js.map