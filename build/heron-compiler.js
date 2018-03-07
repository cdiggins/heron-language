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
var heron_name_analysis_1 = require("./heron-name-analysis");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_type_analysis_1 = require("./heron-type-analysis");
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
// Convert a generic Myna AST tree into a proper Heron AST. 
function toHeronAst(ast) {
    // Perform pre-processing
    ast = heron_ast_rewrite_1.preprocessAst(ast);
    // The name analyzer stores all of the scopes, varUsages, and varDefs. 
    var nameAnalyzer = heron_name_analysis_1.analyzeHeronNames(ast);
    // All expressions are assigned types (WIP)
    heron_type_analysis_1.computeTypes(ast);
    // Type-cast the node.
    return ast;
}
exports.toHeronAst = toHeronAst;
//# sourceMappingURL=heron-compiler.js.map