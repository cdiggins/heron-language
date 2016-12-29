// Myna Parsing Library
// Copyright (c) 2016 Christopher Diggins
// Usage permitted under terms of MIT License

module Myna
{
    // A lookup table of all grammars registered with Myna 
    export let grammars = {}

    // Generates a new ID for rules 
    let _nextId = 0;
    function genId() { 
        return _nextId++;
    }

    // This is used to store (memoize) parses and rules. 
    // When a rule is started it is associated with the value "true", afterwards it is either 
    // a parse-node, or null  
    let _cache = {};

    // This is the input text 
    let input = "";

    // Clears the internal cache: should be called whenever a new parsing session is started  
    export function initialize(text:string) {
        _cache = {};
        input = text; 
    }

    // A node may have zero length, and may have child nodes.
    // Any successful parse will return a ParseNode. 
    export class ParseNode
    {
        children: ParseNode[];
        constructor(public start:number, public end:number)
        { }
        get contents() {
            return input.slice(this.start, this.end);
        } 
    }

    // A Rule is both a rule in the PEG grammar and a parser. The parse function takes  
    // a particular parse location (in either a string, or array of tokens) and will return eith a  
    // ParseNode if the rule is succefully matched or null otherwise. The input argument 
    // is never modified, and only in rare cases does a Rule maintain internal state (see Re rule).
    export class Rule
    {
        // Identifies individual rule
        name:string = "";

        // Internal unique identifier
        id:number = genId();

        // Identifies types of rules.  
        type:string = "";

        // Indicates whether generated nodes should be added to the abstract syntax tree
        // Generally speaking this will be true, unless the rule  
        skip:boolean = true;

        // Note: child-rules are exposed as a public field
        constructor(public rules:Rule[]) {            
        }

        // Default implementation returns true or creates a node, depending on the 'genNode'
        parseImplementation(index:number, parent:ParseNode):number { 
            throw "Not implemented, this function is supposed to be overridden";           
        }        

        // Calls the derived class parser if necessary, but first looks up whether this rule has already 
        // been tested against this spot in the input. This is the memoization step used by the PEG PackRat
        // parsing technique, and reduces the complexity of the algorithm to O(N).    
        parse(index:number, node:ParseNode):ParseNode { 
            let result = null;

            // Check if we create a node or not for this rule.  
            let child = this.skip ? node : new ParseNode(index, index);
            let end = this.parseImplementation(index, child);

            // Check that parsing is successful
            if (end !== null) {
                // The child node and the parent node are finished at the same index 
                child.end = end;
                node.end = end;
                // If not skipping, we add the child node to the parent node.  
                if (!this.skip) {
                    // Create the array only if we need to.
                    if (node.children === undefined)
                        node.children = new Array<ParseNode>();
                    node.children.push(child);
                }
                // Either way the result is the node                
                result = node;
            }             
            
            // Finished!
            return result;                              
        }

        // Defines the type of rules. Used for defining new rule types as combinators. 
        setType(typeName:string) : Rule {
            this.type = typeName;
            return this;
        }

        // Sets the name of the rule. 
        setName(name:string) : Rule {
            this.name = name;
            return this;            
        }

        // Returns a default string representation of the rule's definition  
        get definition() : string {
            return "_" + this.type + "_";
        }

        //  Returns the name or the definition if the name is not present
        get nameOrDefinition() : string {
            return this.name ? this.name : this.definition;
        }

        // Returns a string representation of the rule in the PEG format   
        toString() : string {
            return this.name + " \t<- " + this.definition;
        }

        // Extensions to support method/property chaining a.k.a. fluent syntax
        get opt() : Rule {  return opt(this); }
        get star() : Rule { return star(this); }
        get plus() : Rule { return plus(this); }
        get not() : Rule { return not(this); }
        andThen(r:RuleType) : Rule { return seq(this, r); }
        andThenAt(r:RuleType) : Rule { return this.andThen(at(r)); }
        andThenNot(r:RuleType) : Rule { return this.andThen(not(r)); }
        or(r:RuleType) : Rule { return choice(this, r); } 
        repeatUntil(r:RuleType) : Rule { return repeatWhileNot(this, r); }
        repeatUntilPast(r:RuleType) : Rule { return repeatUntilPast(this, r); }        
        repeat(count:number) { return repeat(this, count); }
        bounded(min:number, max:number) { return bounded(this, min, max); }        
    }

    // These are the core Rule classes of Myna. Normally you would not use theses directly but use the factory methods
    // If you fork this code, think twice before adding new classes here. Maybe you can implement your new Rule
    // in terms of functions or other low-level rules. Then you can be happy knowing that the same code is being 
    // re-used and tested all the time.  

    // Matches a series of rules in order. Succeeds only if all sub-rules succeed. 
    export class Sequence extends Rule 
    {
        type = "sequence";

        constructor(rules:Rule[]) { super(rules); }

        parseImplementation(index:number, node:ParseNode): number {
            for (let r of this.rules) {
                let child = r.parse(index, node);
                if (child === null) return null;
                index = child.end;
            }
            return index;
        }

        // Returns a string representing the definition of the rule 
        get definition() : string {
            return "(" + this.rules.map(r => r.nameOrDefinition).join(" ") + ")";
        }
    }
    
    // Tries to match each rule in order until one succeeds. Succeeds if any of the sub-rules succeed. 
    export class Choice extends Rule
    {
        type = "choice";

        constructor(rules:Rule[]) { super(rules); }

        parseImplementation(index:number, node:ParseNode): number {
            for (let r of this.rules) {
                let child = r.parse(index, node);
                if (child == null) continue;
                return child.end;
            }
            return null;
        }        

        // Returns a string representing the definition of the rule 
        get definition() : string {
            return "(" + this.rules.map(r => r.nameOrDefinition).join(" / ") + ")";
        }
    }

    // Returns true only if the child rule fails to match.
    export class Not extends Rule
    {
        type = "not";

        constructor(rule:Rule) { super([rule]); }

        parseImplementation(index:number, node:ParseNode): number {
            if (this.rules[0].parse(index, node) != null) 
                return null;
            return index;
        }

        get definition() : string {
            return "!" + this.rules[0].nameOrDefinition;
        }
    }   

    // Returns true only if the child rule matches, but does not advance the parser
    export class And extends Rule
    {
        type = "and";

        constructor(rule:Rule) { super([rule]); }

        parseImplementation(index:number, node:ParseNode): number {
            if (this.rules[0].parse(index, node) == null) 
                return null;
            return index;
        }

        get definition() : string {
            return "&" + this.rules[0].nameOrDefinition;
        }
    }   

    // A generalization of several other rules such as star (0+), plus (1+), opt(0 or 1),   
    export class BoundedRule extends Rule 
    {    
        type = "bounded";

        constructor(rule:Rule, public min:number=0, public max:number=Number.MAX_VALUE) { super([rule]); }

        parseImplementation(index:number, node:ParseNode): number {
            let child = this.rules[0].parse(index, node); 
            let i = 0;
            while (child != null && i < this.max) {
                i++;                
                index = child.end;
                child = this.rules[0].parse(index, node); 
            }
            if (i < this.min)
                return null;
            return index;
        }

        get definition() : string {
            return this.rules[0].nameOrDefinition + "{" + this.min + "," + this.max + "}";
        }
    }

    // Matches a rule 0 or 1 times  
    export class Optional extends BoundedRule
    {
        type = "optional";
        constructor(rule:Rule) { super(rule, 0, 1); }
        get definition() : string {
            return this.rules[0].nameOrDefinition + "?";
        }
    }   

    // Greedily matches a given rule zero or more times.  
    export class Star extends BoundedRule
    {
        type = "star";
        constructor(rule:Rule) { super(rule); }
        get definition() : string {
            return this.rules[0].nameOrDefinition + "*";
        }
    }

    // Greedily matches a given rule one or more times.  
    export class Plus extends BoundedRule
    {
        type = "plus";
        constructor(rule:Rule) { super(rule, 1); }
        get definition() : string {
            return this.rules[0].nameOrDefinition + "+";
        }
    }

    // Returns true if at the end of the input
    export class End extends Rule
    {
        type = "end";
        constructor() { super([]); }
        parseImplementation(index:number, node:ParseNode): number {
            return index >= text.length ? index : null;
        }
        get definition() : string {
            return "$";
        }        
    }

    // Advances the parser by one token, but returns false if at the end. 
    export class Any extends Rule
    {
        type = "any";
        constructor() { super([]); }
        parseImplementation(index:number, node:ParseNode): number {            
            return index >= text.length ? null : index++;
        }
        get definition() : string {
            return ".";
        }        
    }

    // Uses a lookup table to decide whether the value is true or not.   
    export class Lookup extends Rule
    {
        type = "lookup";
        constructor(public lookup:any, public neg:boolean) { super([]); }        
        parseImplementation(index:number, node:ParseNode): number {
            if (index >= input.length) return null;
            let tkn = input[index];
            let hasTkn = tkn in this.lookup;
            let success = this.neg ? !hasTkn : hasTkn;  
            if (!success) return null;
            return index + 1;
        }
        get definition() : string {
            return this.lookup;
        }
    }

    // Advance the token and returns true if the token is in the given range.    
    export class Range extends Rule
    {
        type = "range";
        constructor(public min:string, public max:string) { super([]); }        
        parseImplementation(index:number, node:ParseNode): number {
            if (index >= input.length) return null;
            let tkn = input[index];
            if (tkn < this.min || tkn > this.max) return null;
            return index + 1;
        }
        get definition() : string {
            return "[" + this.min + " .. " + this.max + "]";
        }
    }

    // Used to match a string in the input string. 
    export class Text extends Rule
    {
        type = "text";
        constructor(public text:string) { super([]); }
        parseImplementation(index:number, node:ParseNode): number {
            if (index >= input.length) return null;
            let start = index;
            let end = index + this.text.length;
            // TODO: optimize by not creating a copy of memory, just advance two pointers 
            let substring = input.slice(start, end);
            if (substring !== this.text) return null; 
            return index + this.text.length;
        }
        get definition() : string {
            return "'" + this.text +  "'";
        }
    }

    // Creates a zero-length node, and executes some action during parsing. 
    // Grammars that embed actions give programmers headaches so i suggest avoiding this 
    // unless you want to throw an exception or do some logging. 
    export class Action extends Rule 
    {
        type = "action";
        constructor(public fn:(index:number)=>void) { super([]); }        
        parseImplementation(index:number, node:ParseNode): number {
            this.fn(index);
            return index;
        }
    } 

    // Creates a rule that is defined from a function that generates the rule. 
    // This allows two rules to have a cyclic relation. 
    export class Delay extends Rule 
    {
        type = "delay";
        constructor(public fn:()=>Rule) { super([]); }        
        parseImplementation(index:number, node:ParseNode): number {
            return this.fn().parse(index, node).end;
        }
        get definition() : string {
            return this.fn().definition;
        }
    } 

    // The are function that create rules, usually in terms of other rules. 
    // The low-level rules are atEnd, advance, re, and text.  
    // These functions take a "RuleType" argument, which can be a Rule, string or regular expression.

    // For convenience we enable strings and regular expressions to be used interchangably with Rules in the combinators.
    export type RuleType = Rule | string | RegExp | Function;

    // Given a RuleType returns an instance of a Rule.
    export function RuleTypeToRule(rule:RuleType) : Rule {
        if (rule instanceof Rule) return rule;
        if (typeof(rule) == "string") return new Text(rule);
        if (rule == undefined || rule == null) throw "undefined";
        throw "Internal error: not a rule type " + rule;
    } 

    // Matches a series of rules in order, and succeeds if they all do
    export function seq(...rules:RuleType[]) {
        return new Sequence(rules.map(RuleTypeToRule));
    }

    // Tries to match each rule in order, and succeeds if one does 
    export function choice(...rules:RuleType[]) : Choice {
        return new Choice(rules.map(RuleTypeToRule));
    }        

    // Enables Rules to be defined in terms of variables that are defined later on. This 
    // enables cyclic rule definitions.  
    export function delay(fxn:()=>RuleType) { return new Delay(() => RuleTypeToRule(fxn())); }

    // Terminal rules 
    export let end = new End();
    export let any = new Any();
    export let all = any.star;    
    export function text(text:string) { return new Text(text); }
    export function range(min:string, max:string) { return new Range(min, max); }
    export function set(chars:string, neg:boolean=false) { let d={}; for (let c of chars) d[c] = c; return new Lookup(d, neg); };    
    export function negSet(chars:string) { return set(chars, true); };    

    // Basic rule operators (combinators).
    export function not(rule:RuleType)  { return new Not(RuleTypeToRule(rule)); };
    export function star(rule:RuleType)  { return new Star(RuleTypeToRule(rule)); };
    export function bounded(rule:RuleType, min:number, max:number) { return new BoundedRule(RuleTypeToRule(rule), min, max); }
    export function repeat(rule:RuleType, count:number) { return bounded(rule, count, count); }
    export function opt(rule:RuleType)  { return new Optional(RuleTypeToRule(rule)); };
    export function at(rule:RuleType)  { return new And(RuleTypeToRule(rule)); };
    export function plus(rule:RuleType)  { return new Plus(RuleTypeToRule(rule)); }

    // Advanced rule operators (combinator)
    export function delimitedList(rule:RuleType, delimiter:RuleType) { return opt(seq(rule, star(seq(delimiter, rule)))).setType("delimitedList"); }
    export function except(condition:RuleType, rule:RuleType) { return seq(not(condition), rule).setType("except"); }        
    export function repeatWhileNot(body:RuleType, condition:RuleType) { return star(except(condition, body)).setType("whileNot"); }
    export function repeatUntilPast(body:RuleType, condition:RuleType) { return seq(repeatWhileNot(body, condition), condition).setType("repeatUntilPast"); }
    export function anyCharExcept(rule:RuleType) { return except(rule, any).setType("anyCharExcept"); }    
    export function advanceWhileNot(rule:RuleType) { return star(anyCharExcept(rule)).setType("advanceWhileNot"); }
    export function advanceUntilPast(rule:RuleType) { return seq(advanceWhileNot(rule), rule).setType("advanceUntilPast"); }

    // Actions  
    export function action(fn:(index:number)=>void) { return new Action(fn); }
    export function err(msg:string = "parsing error") { return action(p=> { throw(msg); }).setType("err"); }
    export function log(msg:string = "") { return action(p=> { console.log(msg); }).setType("log"); }
        
    // Guards
    export function assert(rule:RuleType, msg:string="Expected rule to match") { return choice(rule, err(msg)).setType("assert"); }
    export function assertNot(rule:RuleType, msg:string="Expected rule to not match") { return choice(not(rule), err(msg)).setType("assertNot"); }
    export function ifThenAssert(condition:RuleType, body:RuleType) { return seq(condition, assert(body)).setType("ifThenAssert"); }
    export function guardedSeq(condition:RuleType, ...rules:RuleType[]) { return ifThenAssert(condition, seq(...rules)).setType("guardedSeq"); }
    export function assertAtEnd() { return assert(end).setName("assertAtEnd"); }
    
    // The following are predefined common rules and additional combinators   
    export let alphaLowerChar   = range('a','z').setName("alphaLowerChar");
    export let alphaUpperChar   = range('A','Z').setName("alphaUpperChar");
    export let alphaChar        = choice(alphaLowerChar, alphaUpperChar).setName("alphaChar");
    export let digit            = range('0', '9').setName("numericChar");
    export let digitNonZero     = range('1', '9').setName("digitNonZero");
    export let integer          = choice('0', seq(digitNonZero, digit.star)).setName("integer");
    export let hexDigit         = choice(digit,range('a','f'), range('A','F')).setName("hexDigit");
    export let binaryDigit      = choice('0','1').setName("binaryDigit");
    export let octalDigit       = range('0','7').setName("octalDigit");
    export let alphaNumericChar = choice(alphaChar, digit).setName("alphaNumericChar");
    export let underscore       = text("_").setName("underscore");
    export let identifierFirst  = choice(alphaChar, underscore).setName("identifierFirstChar");
    export let identifierNext   = choice(alphaNumericChar, underscore).setName("identifierNextChar");     
    export let identifier       = seq(identifierFirst, identifierNext.star).setName("identifier");     
    export let hyphen           = text("-").setName("hyphen");
    export let crlf             = text("\r\n");
    export let newLine          = choice(crlf, "\n");          
    export let space            = text(" ");
    export let tab              = text("\t");
    export let ws               = set(" \t\r\n");
        
    // A complete identifier, with no other letters 
    export function keyword(text:string) { return seq(text, not(identifierNext)); }

    // Common guarded sequences. If first part of sequence passes, the rest must as well.
    // A failure in one of these is usually "catastrophic" meaning that we don't want the parser to continue.
    export function parenthesized(rule:RuleType) { return guardedSeq("(", rule, ")"); }
    export function braced(rule:RuleType) { return guardedSeq("{", rule, "}"); }
    export function bracketed(rule:RuleType) { return guardedSeq("[", rule, "]"); }
    export function doubleQuoted(rule:RuleType) { return guardedSeq("\"", rule, "\""); }
    export function singleQuoted(rule:RuleType) { return guardedSeq("'", rule, "'"); }
    export function tag(rule:RuleType) { return guardedSeq("<", rule, ">"); }

    // Common types of delimited lists 
    export function commaDelimited(rule:RuleType) { return delimitedList(rule, ","); }
    export function semiColonDelimited(rule:RuleType) { return delimitedList(rule, ";"); }
    export function colonDelimited(rule:RuleType) { return delimitedList(rule, ":"); }
    export function doubleColonDelimited(rule:RuleType) { return delimitedList(rule, "::"); }
    export function dotDelimited(rule:RuleType) { return delimitedList(rule, "."); }
    export function tabDelimited(rule:RuleType) { return delimitedList(rule, "\t"); }
    export function newLineDelimited(rule:RuleType) { return delimitedList(rule, newLine); }

    // The following are helper functions for grammar objects. A grammar is a loosely defined concept.
    // It is any JavaScript object where one or more member fields are instances of the Rule class.    

    // Returns all properties of an object that correspond to Rules 
    export function grammarRules(g:any)
    {
        return Object
            .keys(g)
            .map(k => g[k])
            .filter(v => v instanceof Rule)
    }

    // Returns the representation using the standard PEG notation 
    export function grammarToString(g:any) 
    {
        return grammarRules(g)
            .map(r => r.toString())
            .join('\n');
    }

    // Initializes a grammar object by setting names for all of the rules,
    // assuring that nodes are created for each rule, and stores the grammar
    // in the Myna.grammars object 
    export function registerGrammar(name:string, g:any) 
    {
        for (let k in g) {
            if (g[k] instanceof Rule) {
                g[k].setName(k);
                g[k].skip = false;
            }
        }
        this.grammars[name] = g;
    }

    // Global parse function. 

    // Given a rule and input string will generate an abstract syntax tree (AST). 
    // This will also clear any previously cached results. 
    export function parse(r : Rule, s : string) 
    {
        initialize(s);
        var parent = new ParseNode(0, 0);        
        var result = r.parse(0, parent);
        if (result.end != s.length) {
            throw "Did not parse the full content of the file";
        }
        return result;
    }
}
