// Variable usage 
// - Declaration
// - Usage 
// - function calls

import { Myna as m } from "myna-parser";

import { heronGrammar, parseHeron } from './heron-parser';

const g = heronGrammar;
const grammarName = "heron";

function createAstVisitorFunction(rule, lines) {
    lines.push("    visit_" + rule.name + "(ast, state) {");
    lines.push("        // " + rule.astRuleDefn());
    lines.push("        this.visitChildren(ast, state);");
    lines.push("    }")
}

function createAstVisitor() {
    var lines = [
        "class " + grammarName + "Visitor",
        "{",
        "    visitNode(ast, state) {",
        "        const fnName = 'visit_' + ast.name;",
        "        if (fnName in this)",
        "            this[fnName](ast, state);",
        "        else",
        "            this.visitChildren(ast, state);",
        "    }",        
        "    visitChildren(ast, state) {",
        "        for (let child of ast.children)",
        "            this.visitNode(child, state);",
        "    }"        
        ];
    var rules = m.grammarAstRules(grammarName);
    for (var r of rules)
        createAstVisitorFunction(r, lines);    
    lines.push("}");

    return lines.join("\n");
}

const output = createAstVisitor();
console.log(output);


declare const process;
process.exit();