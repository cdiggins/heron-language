"use strict";

// Exports the grammar for Json
// See http://www.json.org
function JsonGrammar(myna)  
{
    let m = myna;    

    // Helper rules. These are local variables, and do not create nodes in the parse tree.  
    let escapedChar    = m.seq('\\', m.set('\\/bfnrt"'));
    let escapedUnicode = m.seq('\\u', m.hexDigit.repeat(4));        
    let quoteChar      = m.choice(escapedChar, escapedUnicode, m.anyCharExcept('"'));
    let fraction       = m.seq(".", m.digit.star);    
    let plusOrMinus    = m.set("+-");
    let exponent       = m.seq(m.set("eE"), plusOrMinus.opt, m.digit.plus); 

    // Using a lazy evaluation rule to allow recursive rule definitions  
    let _this = this; 
    this.value = m.delay(function() { 
        return m.choice(_this.string, _this.number, _this.object, _this.array, _this.bool, _this.null); 
    });

    // These rules are part of the grammar, and as a result create nodes in the abstract syntax tree 
    this.string         = m.doubleQuoted(quoteChar.star);
    this.null           = m.keyword("null");
    this.bool           = m.choice(m.keyword("true"), m.keyword("false"));
    this.number         = m.seq(plusOrMinus.opt, m.integer, fraction.opt, exponent.opt);  
    this.array          = m.bracketed(m.commaDelimited(this.value));
    this.pair           = m.seq(this.string, ":", this.value);
    this.object         = m.braced(m.semiColonDelimited(this.pair));

    // We register the grammar, which does some initialization and stores the grammar in the Myna grammar table 
    m.registerGrammar("json", this);    
};