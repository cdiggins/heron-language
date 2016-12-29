"use strict";

// Exports the grammar for CSV (comma separated values)
// See https://tools.ietf.org/html/rfc4180
// Note: in the grammar described in RFC4180, it is impossible to determine via a parser whether 
// the first row is a header or not.
// Also note that the TEXTDATA given in the RFC is woefully incomplete. 
// We clearly need a proper standard for CSV formats    
// Because this grammar is computed at run-time, it can support tab delimited data by passing in "\t" 
// to the constructor as the delimiter.  
function CsvGrammar(myna, delimiter=',')  
{
    let m           = myna;

    this.textdata   = m.negSet('\n\r"' + delimiter);
    this.escaped    = m.doubleQuoted(m.choice(this.textdata, delimiter,  '\n', '\r', '""').star);
    this.nonescaped = this.textdata.star;
    this.field      = m.choice(this.nonescaped, this.nonescaped);
    this.record     = m.commaDelimited(this.field);
    this.file       = m.newLineDelimited(this.record);        
    //this.token      = m.choice(this.field, delimiter, m.newLine);
    
    m.registerGrammar("csv", this);    
    
    // Skip creating nodes for these rule to simplify tree construction
    // Has to be done after grammar registration because grammar registration sets the "skip" flag to false.   
    this.field.skip = true;
    this.textdata.skip = true;  
}