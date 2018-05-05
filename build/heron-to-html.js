"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myna_parser_1 = require("myna-parser");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_parser_1 = require("./heron-parser");
var myna_1 = require("myna-parser/myna");
var heron_compiler_1 = require("./heron-compiler");
var type_system_1 = require("./type-system");
var heron_types_1 = require("./heron-types");
var heronKeywords = [
    'var', 'in', 'for', 'while', 'do', 'if', 'else', 'continue', 'return', 'type', 'import', 'function', 'intrinsic', 'type', 'module', 'language'
];
// This grammar is used for tokenizing text content not explicitly represented 
// by nodes in the Heron AST for syntax coloring
var nodeLookup = {};
var fs = require('fs');
var path = require('path');
var TokenGrammar = /** @class */ (function () {
    function TokenGrammar() {
        this.fullComment = heron_parser_1.g.fullComment.ast;
        this.lineComment = heron_parser_1.g.lineComment.ast;
        this.keyword = myna_parser_1.Myna.keywords.apply(myna_parser_1.Myna, heronKeywords).ast;
        this.blankSpace = heron_parser_1.g.blankSpace.ast;
        this.operator = heron_parser_1.g.opSymbol.oneOrMore.ast;
        this.delimiter = myna_parser_1.Myna.char('{}();,').oneOrMore.ast;
        this.unknown = myna_parser_1.Myna.advance.ast;
        this.token = myna_parser_1.Myna.choice(this.fullComment, this.lineComment, this.keyword, this.delimiter, this.blankSpace, this.operator);
        this.plainText = myna_parser_1.Myna.advance.ast;
        this.tokens = myna_parser_1.Myna.choice(this.token, this.plainText).zeroOrMore;
    }
    return TokenGrammar;
}());
;
var tokenGrammar = new TokenGrammar();
myna_1.Myna.registerGrammar("heronTokens", tokenGrammar, tokenGrammar.tokens);
var parser = myna_1.Myna.parsers['heronTokens'];
function span(className, contents) {
    return "<span class=\"" + className + "\">" + contents + "</span>";
}
function div(className, contents) {
    return "<div class=\"" + className + "\">" + contents + "</div>";
}
function visitToken(node, lines) {
    var content = toHtml(node.allText);
    switch (node.name) {
        case "blankSpace":
        case "unknown":
        case "plainText":
            lines.push(content);
            break;
        case "lineComment":
            lines.push(span(node.name, content.trim()));
            break;
        case "fullComment":
        case "delimiter":
        default:
            lines.push(span(node.name, content));
            break;
    }
}
function textTokenizer(text, lines) {
    var ast = parser(text);
    for (var _i = 0, _a = ast.children; _i < _a.length; _i++) {
        var c = _a[_i];
        visitToken(c, lines);
    }
}
function toHtml(text) {
    return text.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function nodeToHtml(source, node, parent, lastPos, lines) {
    if (!node)
        return lastPos;
    if (node.input !== source)
        return lastPos;
    if (node.start < lastPos)
        throw new Error("Internal error: backing up on input. Should not be possible");
    // If we are starting this node after the last one ended, we have some plain text to tokenize
    if (node.start > lastPos)
        textTokenizer(source.substr(lastPos, node.start - lastPos), lines);
    // Check for leaf nodes
    switch (node.name) {
        case "string":
        case "number":
        case "bool":
        case "typename":
        case "identifier":
        case "langVer":
        case "moduleName":
        case "funcParamName":
        case "funcName":
        case "varName":
        case "varNameDecl":
            lines.push(span(node.name, toHtml(node.allText)));
            return node.end;
    }
    var closeSpan = false;
    switch (node.name) {
        case "emptyStatement":
        case "compoundStatement":
        case "ifStatement":
        case "returnStatement":
        case "continueStatement":
        case "breakStatement":
        case "forLoop":
        case "doLoop":
        case "whileLoop":
        case "varDeclStatement":
        //case "funcDef":
        //case "intrinsicDef":
        //case "typeDef":  
        //case "importStatement":
        case "exprStatement":
            lines.push("<span class='statement'>");
            closeSpan = true;
            break;
    }
    // Check for the special case of a functionDef
    var node2 = nodeLookup[node.start];
    if (node.name === 'funcDef' && node2 && node2.def) {
        var t = toHeronTypeString(type_system_1.alphabetizeVarNames(node2.def.type));
        t = toHtml(t);
        lines.push('<span class="functionDef">');
        lines.push("<span class=\"functionType\">" + t + "</span>");
        closeSpan = true;
    }
    // A non-leaf node. Iterate over children.
    // If a child starts after the currentPos, it will add the necessary tokens
    var curPos = node.start;
    for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var c = _a[_i];
        curPos = nodeToHtml(source, c, node, curPos, lines);
    }
    if (closeSpan)
        lines.push("</span>");
    // If we have to add some padding leaf nodes, we will do that here.
    if (curPos < node.end)
        textTokenizer(source.substr(curPos, node.end - curPos), lines);
    return node.end;
}
exports.nodeToHtml = nodeToHtml;
function heronNodeToHtml(node) {
    var lines = [];
    var input = node.input;
    var r = nodeToHtml(input, node, null, 0, lines);
    if (r !== input.length)
        throw new Error("Did not parse to the end");
    return lines.join("");
}
exports.heronNodeToHtml = heronNodeToHtml;
function heronModuleToHtml(module) {
    // This creates an unmodified parse tree. 
    var ast = heron_compiler_1.parseFile(module.file.filePath);
    // Visit the modified tree, adding to the lookup table every modified node (if corresponding to the new position)
    heron_ast_rewrite_1.visitAst(module.node, function (n) {
        if (!n.original && n.input === ast.input)
            nodeLookup[n.start] = n;
    });
    return heronNodeToHtml(ast);
}
exports.heronModuleToHtml = heronModuleToHtml;
function heronPackageToHtml(pkg) {
    for (var _i = 0, _a = pkg.modules; _i < _a.length; _i++) {
        var m_1 = _a[_i];
        var html = heronModuleToHtml(m_1);
        //const fileName = path.join('src-html', m.file.filePath + ".html");
        var fileName = m_1.file.filePath.replace('.heron', '.html').replace('input', 'source-browser');
        var url = 'https://github.com/cdiggins/heron-language/tree/master/input/' + path.basename(m_1.file.filePath);
        var fileContents = makeHtml(m_1.name, html, url);
        fs.writeFileSync(fileName, fileContents);
    }
}
exports.heronPackageToHtml = heronPackageToHtml;
function toHeronTypeString(t) {
    if (t instanceof heron_types_1.FunctionSet) {
        throw new Error("Function sets not supported");
    }
    else if (t instanceof type_system_1.PolyType) {
        var first = t.types[0];
        if (type_system_1.isTypeConstant(first, "Func")) {
            var args = heron_types_1.getFuncArgTypes(t);
            var ret = heron_types_1.getFuncReturnType(t);
            return "(" + args.map(toHeronTypeString).join(" ") + " -> " + toHeronTypeString(ret) + ")";
        }
        else {
            return first.toString() + "<" + t.types.slice(1).map(toHeronTypeString).join(", ") + ">";
        }
    }
    else if (t instanceof type_system_1.TypeVariable || typeof (t) === 'string') {
        return "'" + t;
    }
    else {
        return t.toString();
    }
}
exports.toHeronTypeString = toHeronTypeString;
function makeHtml(name, html, url) {
    return "<html><head><title>" + name + "</title>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"styles.css\">\n<link href=\"https://fonts.googleapis.com/css?family=Inconsolata\" rel=\"stylesheet\">\n</head>\n<body>\n<script>\n    var typeVis = true;\n\n    function changeClass(from, to) {\n        for (const e of document.getElementsByClassName(from)) {\n            className = e.getAttribute(\"class\").replace(from, to);            \n            e.setAttribute(\"class\", className);\n        }\n    }\n\n    function toggleTypeVis() {\n        if (typeVis) \n            changeClass(\"hideTypes\", \"showTypes\");\n        else \n            changeClass(\"showTypes\", \"hideTypes\");\n        typeVis = !typeVis;\n        return false;\n    }\n</script>\n<div class=\"code hideTypes\">\n<span class='gitHubLink'><a href=\"" + url + "\">View source on GitHub</a> | <a href=\"https://cdiggins.github.io/heron-language\">See Demo</a> | <a href=\"javascript:toggleTypeVis()\">Toggle Types</a> </span>\n" + html + "\n</div>\n</body>\n</html>";
}
//# sourceMappingURL=heron-to-html.js.map