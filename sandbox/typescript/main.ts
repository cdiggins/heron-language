// Copyright (c) 2016 Christopher Diggins
// Usage permitted under terms of MIT License

namespace Rhetoric
{
    // TODO: come up with a better id generation scheme
    let _nextId = 0;
    function genId() { 
        return _nextId++;
    }

    // This is used to memorize parses and rules 
    let _cache = {};

    // Set to false if you want to turn off caching. This will slow down the parser, but consume less memory. 
    let _useCache = false;
    
    // Clears the internal cache: should be called whenever a new parsing session is started  
    export function Initialize() {
        _cache = {};
    }        

    // A ParseIndex represents a location in the input token stream or character stream.
    // It has three fields: end, input, index.  
    export class ParseIndex
    {
        end:number;
        constructor(public input:any, public index:number=0) { 
            this.end = input.length;
        }
        isText() : boolean {
            return typeof(this.input) == "string";
        }
        getToken() : string {
            return this.input[this.index];
        }
        getText() : string {
            return this.input as string; 
        }
        advance(amount:number) : ParseIndex { 
            return new ParseIndex(this.input, this.index+amount);
        }
        atEnd() : boolean {
            return this.index >= this.end;
        }
    }

    // A node may have zero length, and may have child nodes.
    // A successful parse function will return a ParseNode. 
    export class ParseNode
    {
        rule:Rule;
        children: ParseNode[] = new Array<ParseNode>();
        parent: ParseNode;
        start: ParseIndex;
        end: ParseIndex;
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

        // Indicates whether nodes should be created for this rule or not
        skip:boolean = true;

        // Note: child-rules are exposed as a public field
        constructor(public rules:Rule[]) {            
        }

        // Generates a hash code for this rule at a particular index
        genHashCode(index:number) : string {
            return this.name + this.id + "_" + index;
        }

        // Default implementation returns true or creates a node, depending on the 'genNode'
        parseImplementation(index:ParseIndex):ParseNode { 
            throw "Not implemented, this function is supposed to be overridden";           
        }        

        // Calls the derived class parser if necessary, but first looks up whether this rule has already 
        // been tested against this spot in the input. This is the memoization step used by the PEG PackRat
        // parsing technique, and reduces the complexity of the algorithm to O(N).    
        parse(index:ParseIndex):ParseNode { 
            if (_useCache) {
                var hash = this.genHashCode(index.index);
                if (!(hash in _cache))
                    _cache[hash] = this.parseImplementation(index);
                return _cache[hash];
            }
            else {
                return this.parseImplementation(index);
            }                  
        }

        // Creates a default node for this rule
        createNode(index:ParseIndex):ParseNode {
            let node = new ParseNode();
            node.rule = this;
            node.start = index;
            node.end = index;
            return node;
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

        // When called, the Parse node is created and kept.
        astNode(name:string = "") : Rule {
            if (name != "") this.name = name;
            this.skip = false;
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
    }
}

// These are the core Rule classes of Rhetoric. These should not be used directly, instead use the functions that
// generate instances of these rules instead, they provide additional help and convenience. 
// If you fork this code, think twice before adding new classes here. Maybe you can implement your new Rule
// in terms of functions or other low-level rules. Then you can be happy knowing that the same code is being 
// re-used and tested all the time.  
namespace Rhetoric 
{
    // Matches a series of rules in order. Succeeds only if all sub-rules succeed. 
    export class Sequence extends Rule 
    {
        type = "sequence";

        constructor(rules:Rule[]) { super(rules); }

        parseImplementation(index:ParseIndex): ParseNode {
            let node = super.createNode(index);
            for (let r of this.rules) {
                let child = r.parse(index);
                if (child == null) return null;
                index = child.end;
                if (!r.skip) 
                    node.children.push(child);
                child.parent = node;                
                node.end = index;
            }
            return node;
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

        parseImplementation(index:ParseIndex): ParseNode {
            let node = super.createNode(index);
            for (let r of this.rules) {
                let child = r.parse(index);
                if (child == null) continue;
                child.parent = node;
                if (!r.skip)                
                    node.children.push(child);
                node.end = index;
                return child;
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

        parseImplementation(index:ParseIndex): ParseNode {
            let node = super.createNode(index);
            if (this.rules[0].parse(index) != null) 
                return null;
            return node;
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

        parseImplementation(index:ParseIndex): ParseNode {
            let node = super.createNode(index);
            if (this.rules[0].parse(index) == null) 
                return null;
            return node;
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

        parseImplementation(index:ParseIndex): ParseNode {
            let node = super.createNode(index);
            let child = this.rules[0].parse(index); 
            let i = 0;
            while (child != null && i < this.max) {
                i++;                
                if (!this.rules[0].skip)  
                    node.children.push(child);
                index = child.end;
                node.end = index;
                child = this.rules[0].parse(index); 
            }
            if (i < this.min)
                return null;
            return node;
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
        parseImplementation(index:ParseIndex): ParseNode {
            let node = super.createNode(index);
            return index.atEnd() ? node : null;
        }
        get definition() : string {
            return "$";
        }        
    }

    // Advances the parser by one token, but returns false if at the end. 
    export class Advance extends Rule
    {
        type = "advance";
        constructor() { super([]); }
        parseImplementation(index:ParseIndex): ParseNode {            
            if (index.atEnd()) return null;
            let node = super.createNode(index);            
            node.end = index.advance(1);
            return node;
        }        
    }

    // Applies a regular expression to the input string, or against the current token. 
    export class Re extends Rule
    {
        type = "regex";

        constructor(public regex:RegExp) { super([]); }

        parseImplementation(index:ParseIndex): ParseNode {
            let node = super.createNode(index);
            if (index.isText()) { 
                this.regex.lastIndex = index.index;
                let matchResults = this.regex.exec(index.getText());
                if (matchResults == null) return null;
                if (matchResults.index != index.index) return null;
                let match = matchResults[0];
                node.end = index.advance(match.length);
            }
            else {
                // We just match the regular expression against the token 
                this.regex.lastIndex = 0;
                let token = index.getToken();
                let matchResults = this.regex.exec(token);
                if (matchResults == null) return null;
                if (matchResults.index != token.length) return null;
                node.end = index.advance(1);                
            }
            return node;
        }

        get definition() : string {
            return "/" + this.regex.source + "/";
        }
    }

    // Used to match a string in the input string. 
    // If the input is a series of tokens, it will match the text of the current token.  
    export class Text extends Rule
    {
        type = "text";

        constructor(public text:string) { super([]); }

        parseImplementation(index:ParseIndex): ParseNode {
            let node = super.createNode(index);
            let start = index.index;
            let end = index.index + this.text.length;
            if (index.isText()) {
                let substring = index.getText().slice(start, end);
                if (substring !== this.text) return null; 
                node.end = index.advance(this.text.length);
            }
            else {
                if (index.getToken() !== this.text) return null;
                node.end = index.advance(1);
            }
            return node;
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

        constructor(public fn:(index:ParseIndex)=>void) { super([]); }        

        parseImplementation(index:ParseIndex): ParseNode {
            this.fn(index);
            return super.createNode(index);
        }
    } 

    // Creates a rule that is defined from a function that generates the rule. 
    // This allows two rules to have a cyclic relation. 
    export class Delay extends Rule 
    {
        type = "delay";

        constructor(public fn:()=>Rule) { super([]); }        

        parseImplementation(index:ParseIndex): ParseNode {
            return this.fn().parse(index);
        }

        get definition() : string {
            return this.fn().definition;
        }
    } 
}

// The are function that create rules, usually in terms of other rules. 
// The low-level rules are atEnd, advance, re, and text.  
// These functions take a "RuleType" argument, which can be a string or regular expression.
// This simplifies parsing. 
namespace Rhetoric
{
    // For convenience we enable strings and regular expressions to be used interchangably with Rules in the combinators.
    export type RuleType = Rule | string | RegExp | Function;

    // Given a RuleType returns an instance of a Rule.
    export function RuleTypeToRule(rule:RuleType) : Rule {
        if (rule instanceof Rule) return rule;
        if (rule instanceof RegExp) return new Re(rule);
        if (typeof(rule) == "string") return new Text(rule);
        if (rule == undefined || rule == null) throw "undefined rule";
        throw "Unhandled rule type";
    } 

    export function seq(...rules:RuleType[]) {
        //if (rules.length >= 2 && rules[0] instanceof Seq) 
        //    return new Seq((rules[0] as Seq).rules.concat(rules.slice(1)));
        return new Sequence(rules.map(RuleTypeToRule));
    }

    export function choice(...rules:RuleType[]) : Choice {
        //if (rules.length >= 2 && rules[0] instanceof Choice) 
        //    return new Choice((rules[0] as Choice).rules.concat(rules.slice(1)));
        return new Choice(rules.map(RuleTypeToRule));
    }        

    // Enables Rules to be defined in terms of variables that are defined later on. This 
    // enables cyclic rule definitions.  
    export function delay(fxn:()=>RuleType) { return new Delay(() => RuleTypeToRule(fxn())); }

    // Terminal rules 
    export let end = new End();
    export let advance = new Advance();    
    export function re(re:RegExp) { return new Re(re); }
    export function text(text:string) { return new Text(text); }    

    // Basic rule operators (combinators)
    export function not(rule:RuleType)  { return new Not(RuleTypeToRule(rule)); };
    export function star(rule:RuleType)  { return new Star(RuleTypeToRule(rule)); };
    export function bounded(rule:RuleType, min:number, max:number) { return new BoundedRule(RuleTypeToRule(rule), min, max); }
    export function repeat(rule:RuleType, count:number) { return bounded(rule, count, count); }
    export function opt(rule:RuleType)  { return new Optional(RuleTypeToRule(rule)); };
    export function at(rule:RuleType)  { return new And(RuleTypeToRule(rule)); };
    export function plus(rule:RuleType)  { return new Plus(RuleTypeToRule(rule)); }

    // Advanced rule operators (combinator)
    export function delimitedList(rule:RuleType, delimiter:RuleType) { return seq(rule, star(seq(delimiter, rule))).setType("delimitedList"); }
    export function except(condition:RuleType, rule:RuleType) { return seq(not(condition), rule).setType("except"); }        
    export function repeatWhileNot(body:RuleType, condition:RuleType) { return star(except(condition, body)).setType("whileNot"); }
    export function repeatUntilPast(body:RuleType, condition:RuleType) { return seq(repeatWhileNot(body, condition), body).setType("repeatUntilPast"); }
    export function anyCharExcept(rule:RuleType) { return except(rule, advance).setType("advanceUnless"); }    
    export function advanceWhileNot(rule:RuleType) { return star(anyCharExcept(rule)).setType("advanceWhileNot"); }
    export function advanceUntilPast(rule:RuleType) { return seq(advanceWhileNot(rule), rule).setType("advanceUntilPast"); }

    // Actions  
    export function err(msg:string = "parsing error") { return new Action(p=> { throw(msg); }).setType("err"); }
    export function log(msg:string = "") { return new Action(p=> { console.log(msg); }).setType("log"); }
        
    // Guards
    export function assert(rule:RuleType) { return choice(rule, err("Expected rule: " + rule.toString())).setType("assert"); }
    export function assertNot(rule:RuleType) { return choice(not(rule), err("Rule should not have matched: " + rule.toString())).setType("assert"); }
    export function ifThenAssert(condition:RuleType, body:RuleType) { return seq(condition, assert(body)).setType("ifThenAssert"); }
    export function guardedSeq(condition:RuleType, ...rules:RuleType[]) { return ifThenAssert(condition, seq(...rules)).setType("guardedSeq"); }
    export function assertAtEnd() { return assert(end).setName("assertAtEnd"); }
    
    export function tokenize(text:string, ...tokens:RuleType[]) : ParseNode {
        let rule = star(choice(...tokens));
        let result = rule.parse(new ParseIndex(text));
        if (result == null) 
            return result;
        if (!result.end.atEnd())
            throw "Did not reach the end of the input stream";
        return result;
    }
}

// The following are predefined common rules and combinators  
namespace Rhetoric
{    
    // Notice the usage of regular expressions in each of these, instead of building from lower-level parser.
    // This is to improve performance.
    export let all = star(advance).setName("all");
    export let alphaLowerChar = re(/[a-z]/).setName("alphaLowerChar");
    export let alphaUpperChar = re(/[A-Z]/).setName("alphaUpperChar");
    export let alphaChar = re(/[a-zA-Z]/).setName("alphaChar");
    export let digit = re(/[0-9]/).setName("numericChar");
    export let digitNonZero = re(/[1-9]/).setName("digitNonZero");
    export let integer = re(/0|[1..9]\d*/).setName("integer");
    export let hexDigit = re(/[0..9a-fA-F]/).setName("hexDigit");
    export let binaryDigit = re(/[01]/).setName("binaryDigit");
    export let octalDigit = re(/[0..7]/).setName("octalDigit");
    export let alphaNumericChar = re(/[a-zA-Z0-9]/).setName("alphaNumericChar");
    export let identifierFirstChar = re(/[_a-zA-Z]/).setName("identifierFirstChar");
    export let identifierNextChar = re(/[_a-zA-Z0-9]/).setName("identifierNextChar");     
    export let identifier = re(/[_a-zA-Z][_a-zA-Z0-9]*/).setName("identifier");     
    export let hyphen = text("-").setName("hyphen");
    export let underscore = text("_").setName("underscore");
    export let number = re(/[+-]?\d+(\.\d+)?([eE][-+]?\d+)?/).setName("number"); 
    export let lineComment = re(/\/\/.*$/).setName("lineComment"); 
    export let fullComment = re(/\/\*[\s\S]*\*\//m).setName("fullComment"); 
    export let stringLiteral = re(/"(\\"|[^"])*"/m).setName("stringLiteral");  
    export let wsChar = re(/\s/).setName("wsChar"); 
    export let ws = re(/\s+/).setName("ws"); 
    export let notWsChar = re(/\S/).setName("notWsChar");
    export let anyChar = re(/[\s\S]/).setName("anyChar");
    export function keyword(text:string) { return seq(text, not(identifierNextChar)); }

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
    export function dotDelimited(rule:RuleType) { return delimitedList(rule, "."); }
    export function tabDelimited(rule:RuleType) { return delimitedList(rule, "\t"); }
}

// The following functions are helper functions for grammars 
namespace Rhetoric
{
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
}
