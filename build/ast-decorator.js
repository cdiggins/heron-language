"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Assigns an id to every node, and puts it in an array.
// This allows us to uniqely identify nodes.
var AstLookup = /** @class */ (function () {
    function AstLookup(ast) {
        var _this = this;
        visitAst(ast, function (n) {
            n['index'] = _this.nodes.length;
            _this.nodes.push(n);
        });
    }
    return AstLookup;
}());
// Calls a function on every node in the AST
function visitAst(ast, f) {
    ast.children.forEach(function (c) { return visitAst(c, f); });
    f(ast);
}
//# sourceMappingURL=ast-decorator.js.map