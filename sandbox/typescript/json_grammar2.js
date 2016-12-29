"use strict";

// Exports the grammar for Json
function JsonGrammar(myna)  
{
    let m = myna;
    let self = this;

    // Helper rules: AST nodes for these rules are discarded
    this.escapedChar = /\\["\\/bfnrt]/;
    this.escapedUnicode = m.seq('\\u', m.repeat(m.hexDigit, 4));        
    this.quoteChar = m.choice(this.escapedChar, this.escapedUnicode, m.assertNot('\\'), m.anyCharExcept('"'));
    this.fraction = /[.]\d+/;
    this.exponent = /[eE][+-]?\d+/;
    this.plusOrMinus = /[+-]/;

    // These rule is recursive so it has to be defined in terms of a function that is evaluated lazily 
    this.value = m.delay(function() { return m.choice(self.string, self.number, self.object, self.array, self.bool, self.null); }).astNode("value");

    // These rules create nodes in the abstract syntax tree 
    this.string = m.doubleQuoted(m.star(this.quoteChar)).astNode("string");
    this.null = m.keyword("null").astNode("null");
    this.bool = m.choice(m.keyword("true"), m.keyword("false")).astNode("bool");
    this.number = m.seq(m.opt(this.plusOrMinus), m.integer, m.opt(this.fraction), m.opt(this.exponent)).astNode("number");  
    this.array = m.bracketed(m.commaDelimited(this.value)).astNode("array");
    this.pair = m.seq(this.string, ":", this.value).astNode("pair");
    this.object = m.braced(m.semiColonDelimited(this.pair)).astNode("object");

    // Rules for tokenization 
    this.symbol = /[{}:,[\]]/;
    this.token = m.choice(this.symbol, m.identifier, this.number, this.bool, this.string, m.ws).setName("token");    
};