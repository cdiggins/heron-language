
// See JSON.org
function JsonGrammar()  
{
    let r = Rhetoric;
    let self = this;

    // Helper rules: AST nodes for these rules are discarded
    this.escapedChar = /\\["\\/bfnrt]/;
    this.escapedUnicode = r.seq('\\u', r.repeat(r.hexDigit, 4));        
    this.quoteChar = r.choice(this.escapedChar, this.escapedUnicode, r.assertNot('\\'), r.anyCharExcept('"'));
    this.fraction = /[.]\d*/;
    this.exponent = /[eE][+-]?\d*/;
    this.plusOrMinus = /[+-]/;

    // These rule is recursive so it has to be defined in terms of a function that is evaluated lazily 
    this.value = r.delay(function() { return r.choice(self.string, self.number, self.object, self.array, self.bool, self.null); }).astNode("value");

    // These rules create nodes in the abstract syntax tree 
    this.string = r.doubleQuoted(r.star(this.quoteChar)).astNode("string");
    this.null = r.keyword("null").astNode("null");
    this.bool = r.choice(r.keyword("true"), r.keyword("false")).astNode("bool");
    this.number = r.seq(r.opt(this.plusOrMinus), r.integer, r.opt(this.fraction), r.opt(this.exponent)).astNode("number");  
    this.array = r.bracketed(r.commaDelimited(this.value)).astNode("array");
    this.pair = r.seq(this.string, ":", this.value).astNode("pair");
    this.object = r.braced(r.semiColonDelimited(this.pair)).astNode("object");

    // Rules for tokenization 
    this.symbol = /[{}:,[\]]/;
    this.token = r.choice(this.symbol, r.identifier, this.number, this.bool, this.string, r.ws).setName("token");    
}

