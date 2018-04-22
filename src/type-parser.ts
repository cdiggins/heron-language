import { Type, typeConstant, typeVariable, polyType } from "./type-system";
import { Myna as m } from "myna-parser"

// Defines syntax parsers for type expression, the lambda calculus, and Cat 
function registerGrammars() 
{
    // A simple grammar for parsing type expressions
    class TypeGrammar 
    {
        typeExprRec    = m.delay(() => this.typeExpr);        
        typeList       = m.guardedSeq('(', m.ws, this.typeExprRec.ws.zeroOrMore, ')').ast;
        typeVar        = m.guardedSeq("'", m.identifier).ast;
        typeConstant   = m.identifier.or(m.digits).or("->").or("*").or("[]").ast;
        typeExpr       = m.choice(this.typeList, this.typeVar, this.typeConstant).ast;        
    }
    const typeGrammar = new TypeGrammar();      
    m.registerGrammar('type', typeGrammar, typeGrammar.typeExpr);    
    
}

registerGrammars();

export const typeParser  = m.parsers['type'];

export function parseType(input:string) : Type|null {
    var ast = typeParser(input);
    if (ast.end != input.length) 
        throw new Error("Only part of input was consumed");
    return astToType(ast);
}

function astToType(ast: any) : Type|null {
    if (!ast)
        return null;
    switch (ast.name)
    {
        case "typeVar":
            return typeVariable(ast.allText.substr(1));
        case "typeConstant":
            return typeConstant(ast.allText);
        case "typeList":
            return polyType(ast.children.map(astToType));
        case "typeExpr":
            if (ast.children.length != 1) 
                throw new Error("Expected only one child of node, not " + ast.children.length);
            return astToType(ast.children[0]);
        default:    
            throw new Error("Unrecognized type expression: " + ast.name);
    }
}

