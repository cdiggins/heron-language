import { Myna as m } from "myna-parser";
import { HeronAstNode, visitAst } from "./heron-ast-rewrite";
import { g } from "./heron-parser";
import { Myna } from "myna-parser/myna";
import { Module, Package } from "./heron-package";
import { parseFile } from "./heron-compiler";
import { Lookup, normalizeType } from "./type-system";

const heronKeywords = [
    'var', 'in', 'for', 'while', 'do', 'if', 'else', 'continue', 'return', 'type', 'import', 'function', 'intrinsic', 'type', 'module', 'language'
];

// This grammar is used for tokenizing text content not explicitly represented 
// by nodes in the Heron AST for syntax coloring

const nodeLookup: Lookup<HeronAstNode> = {};

class TokenGrammar 
{
    fullComment = g.fullComment.ast;
    lineComment = g.lineComment.ast;
    keyword = m.keywords(...heronKeywords).ast;
    blankSpace = g.blankSpace.ast;
    operator = g.opSymbol.oneOrMore.ast;
    delimiter = m.char('{}();,').oneOrMore.ast;
    unknown = m.advance.ast;    
    token = m.choice(this.fullComment, this.lineComment, this.keyword, this.delimiter, this.blankSpace, this.operator);
    plainText = m.advance.ast;
    tokens = m.choice(this.token, this.plainText).zeroOrMore;
};

const tokenGrammar = new TokenGrammar();
Myna.registerGrammar("heronTokens", tokenGrammar, tokenGrammar.tokens);
const parser = Myna.parsers['heronTokens'];


function span(className: string, contents: string): string {
    return `<span class="${className}">${contents}</span>`;
}

function div(className: string, contents: string): string {
    return `<div class="${className}">${contents}</div>`;
}

function visitToken(node: Myna.AstNode, lines: string[]) {
    const content = toHtml(node.allText);
    switch (node.name)
    {
        case "blankSpace":
        case "unknown":
        case "plainText":
            lines.push(content);
            break;
        case "lineComment":
        case "fullComment":
        case "delimiter":
        default:
            lines.push(span(node.name, content));
            break;
    }
}

function textTokenizer(text: string, lines: string[]) {
    const ast = parser(text);
    for (const c of ast.children)
        visitToken(c, lines);
} 

function toHtml(text: string): string {
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}

export function nodeToHtml(source: string, node: HeronAstNode, parent: HeronAstNode, lastPos: number, lines: string[]): number {
    const node2 = nodeLookup[node.start];
    if (node.name === 'funcDef' && node2 && node2.def) {
        const t = normalizeType(node2.def.type).toString();
        lines.push('<span class="functionDef">');
        lines.push(`<span class="functionType">${t}</span>`);
        const r = baseNodeToHtml(source, node, parent, lastPos, lines);
        lines.push('</span>');
        return r;
    }
    else {
        return baseNodeToHtml(source, node, parent, lastPos, lines);        
    }
}

export function baseNodeToHtml(source: string, node: HeronAstNode, parent: HeronAstNode, lastPos: number, lines: string[]): number {
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

    // A non-leaf node. Iterate over children.
    // If a child starts after the currentPos, it will add the necessary tokens
    let curPos = node.start;
    for (const c of node.children)                 
        curPos = nodeToHtml(source, c, node, curPos, lines);
    
    // If we have to add some padding leaf nodes, we will do that here.
    if (curPos < node.end)
        textTokenizer(source.substr(curPos, node.end - curPos), lines);
    return node.end;
}

export function heronNodeToHtml(node: HeronAstNode): string {
    const lines = [];
    const input = node.input;
    lines.push('<div class="code hideTypes">');
    lines.push('<span class="button">Toggle Types</span>')
    const r = nodeToHtml(input, node, null, 0, lines)
    if (r !== input.length)
        throw new Error("Did not parse to the end");
    lines.push('</div>');
    return lines.join("");
}

export function heronModuleToHtml(module: Module): string {
    // This creates an unmodified parse tree. 
    const ast = parseFile(module.file.filePath);
    
    // Visit the modified tree, adding to the lookup table every modified node (if corresponding to the new position)
    visitAst(module.node, n => {
        if (!n.original && n.input === ast.input)
            nodeLookup[n.start] = n;
    });

    return heronNodeToHtml(ast);
}

export function writeHeronModuleToHtml(pkg: Package)
{
    for (const m of pkg.modules) {
        const html = heronModuleToHtml(m);
        //const fileName = path.join('src-html', m.file.filePath + ".html");
        const fileName = m.file.filePath.replace('.heron', '.html').replace('input', 'output');
        const fileContents = header + html + "<body></html>";
        fs.writeFileSync(fileName, fileContents);
    }
}

const header = '
`<html><head><title>${m.name}</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    </head>
    <body>