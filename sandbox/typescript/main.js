// Copyright (c) 2016 Christopher Diggins
// Usage permitted under terms of MIT License
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rhetoric;
(function (Rhetoric) {
    // TODO: come up with a better id generation scheme
    var _nextId = 0;
    function genId() {
        return _nextId++;
    }
    // This is used to memorize parses and rules 
    var _cache = {};
    // Set to false if you want to turn off caching. This will slow down the parser, but consume less memory. 
    var _useCache = false;
    // Clears the internal cache: should be called whenever a new parsing session is started  
    function Initialize() {
        _cache = {};
    }
    Rhetoric.Initialize = Initialize;
    // A ParseIndex represents a location in the input token stream or character stream.
    // It has three fields: end, input, index.  
    var ParseIndex = (function () {
        function ParseIndex(input, index) {
            if (index === void 0) { index = 0; }
            this.input = input;
            this.index = index;
            this.end = input.length;
        }
        ParseIndex.prototype.isText = function () {
            return typeof (this.input) == "string";
        };
        ParseIndex.prototype.getToken = function () {
            return this.input[this.index];
        };
        ParseIndex.prototype.getText = function () {
            return this.input;
        };
        ParseIndex.prototype.advance = function (amount) {
            return new ParseIndex(this.input, this.index + amount);
        };
        ParseIndex.prototype.atEnd = function () {
            return this.index >= this.end;
        };
        return ParseIndex;
    }());
    Rhetoric.ParseIndex = ParseIndex;
    // A node may have zero length, and may have child nodes.
    // A successful parse function will return a ParseNode. 
    var ParseNode = (function () {
        function ParseNode() {
            this.children = new Array();
        }
        return ParseNode;
    }());
    Rhetoric.ParseNode = ParseNode;
    // A Rule is both a rule in the PEG grammar and a parser. The parse function takes  
    // a particular parse location (in either a string, or array of tokens) and will return eith a  
    // ParseNode if the rule is succefully matched or null otherwise. The input argument 
    // is never modified, and only in rare cases does a Rule maintain internal state (see Re rule).
    var Rule = (function () {
        // Note: child-rules are exposed as a public field
        function Rule(rules) {
            this.rules = rules;
            // Identifies individual rule
            this.name = "";
            // Internal unique identifier
            this.id = genId();
            // Identifies types of rules.  
            this.type = "";
            // Indicates whether nodes should be created for this rule or not
            this.skip = true;
        }
        // Generates a hash code for this rule at a particular index
        Rule.prototype.genHashCode = function (index) {
            return this.name + this.id + "_" + index;
        };
        // Default implementation returns true or creates a node, depending on the 'genNode'
        Rule.prototype.parseImplementation = function (index) {
            throw "Not implemented, this function is supposed to be overridden";
        };
        // Calls the derived class parser if necessary, but first looks up whether this rule has already 
        // been tested against this spot in the input. This is the memoization step used by the PEG PackRat
        // parsing technique, and reduces the complexity of the algorithm to O(N).    
        Rule.prototype.parse = function (index) {
            if (_useCache) {
                var hash = this.genHashCode(index.index);
                if (!(hash in _cache))
                    _cache[hash] = this.parseImplementation(index);
                return _cache[hash];
            }
            else {
                return this.parseImplementation(index);
            }
        };
        // Creates a default node for this rule
        Rule.prototype.createNode = function (index) {
            var node = new ParseNode();
            node.rule = this;
            node.start = index;
            node.end = index;
            return node;
        };
        // Defines the type of rules. Used for defining new rule types as combinators. 
        Rule.prototype.setType = function (typeName) {
            this.type = typeName;
            return this;
        };
        // Sets the name of the rule. 
        Rule.prototype.setName = function (name) {
            this.name = name;
            return this;
        };
        // When called, the Parse node is created and kept.
        Rule.prototype.astNode = function (name) {
            if (name === void 0) { name = ""; }
            if (name != "")
                this.name = name;
            this.skip = false;
            return this;
        };
        Object.defineProperty(Rule.prototype, "definition", {
            // Returns a default string representation of the rule's definition  
            get: function () {
                return "_" + this.type + "_";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rule.prototype, "nameOrDefinition", {
            //  Returns the name or the definition if the name is not present
            get: function () {
                return this.name ? this.name : this.definition;
            },
            enumerable: true,
            configurable: true
        });
        // Returns a string representation of the rule in the PEG format   
        Rule.prototype.toString = function () {
            return this.name + " \t<- " + this.definition;
        };
        return Rule;
    }());
    Rhetoric.Rule = Rule;
})(Rhetoric || (Rhetoric = {}));
// These are the core Rule classes of Rhetoric. These should not be used directly, instead use the functions that
// generate instances of these rules instead, they provide additional help and convenience. 
// If you fork this code, think twice before adding new classes here. Maybe you can implement your new Rule
// in terms of functions or other low-level rules. Then you can be happy knowing that the same code is being 
// re-used and tested all the time.  
var Rhetoric;
(function (Rhetoric) {
    // Matches a series of rules in order. Succeeds only if all sub-rules succeed. 
    var Sequence = (function (_super) {
        __extends(Sequence, _super);
        function Sequence(rules) {
            _super.call(this, rules);
            this.type = "sequence";
        }
        Sequence.prototype.parseImplementation = function (index) {
            var node = _super.prototype.createNode.call(this, index);
            for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
                var r = _a[_i];
                var child = r.parse(index);
                if (child == null)
                    return null;
                index = child.end;
                if (!r.skip)
                    node.children.push(child);
                child.parent = node;
                node.end = index;
            }
            return node;
        };
        Object.defineProperty(Sequence.prototype, "definition", {
            // Returns a string representing the definition of the rule 
            get: function () {
                return "(" + this.rules.map(function (r) { return r.nameOrDefinition; }).join(" ") + ")";
            },
            enumerable: true,
            configurable: true
        });
        return Sequence;
    }(Rhetoric.Rule));
    Rhetoric.Sequence = Sequence;
    // Tries to match each rule in order until one succeeds. Succeeds if any of the sub-rules succeed. 
    var Choice = (function (_super) {
        __extends(Choice, _super);
        function Choice(rules) {
            _super.call(this, rules);
            this.type = "choice";
        }
        Choice.prototype.parseImplementation = function (index) {
            var node = _super.prototype.createNode.call(this, index);
            for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
                var r = _a[_i];
                var child = r.parse(index);
                if (child == null)
                    continue;
                child.parent = node;
                if (!r.skip)
                    node.children.push(child);
                node.end = index;
                return child;
            }
            return null;
        };
        Object.defineProperty(Choice.prototype, "definition", {
            // Returns a string representing the definition of the rule 
            get: function () {
                return "(" + this.rules.map(function (r) { return r.nameOrDefinition; }).join(" / ") + ")";
            },
            enumerable: true,
            configurable: true
        });
        return Choice;
    }(Rhetoric.Rule));
    Rhetoric.Choice = Choice;
    // Returns true only if the child rule fails to match.
    var Not = (function (_super) {
        __extends(Not, _super);
        function Not(rule) {
            _super.call(this, [rule]);
            this.type = "not";
        }
        Not.prototype.parseImplementation = function (index) {
            var node = _super.prototype.createNode.call(this, index);
            if (this.rules[0].parse(index) != null)
                return null;
            return node;
        };
        Object.defineProperty(Not.prototype, "definition", {
            get: function () {
                return "!" + this.rules[0].nameOrDefinition;
            },
            enumerable: true,
            configurable: true
        });
        return Not;
    }(Rhetoric.Rule));
    Rhetoric.Not = Not;
    // Returns true only if the child rule matches, but does not advance the parser
    var And = (function (_super) {
        __extends(And, _super);
        function And(rule) {
            _super.call(this, [rule]);
            this.type = "and";
        }
        And.prototype.parseImplementation = function (index) {
            var node = _super.prototype.createNode.call(this, index);
            if (this.rules[0].parse(index) == null)
                return null;
            return node;
        };
        Object.defineProperty(And.prototype, "definition", {
            get: function () {
                return "&" + this.rules[0].nameOrDefinition;
            },
            enumerable: true,
            configurable: true
        });
        return And;
    }(Rhetoric.Rule));
    Rhetoric.And = And;
    // A generalization of several other rules such as star (0+), plus (1+), opt(0 or 1),   
    var BoundedRule = (function (_super) {
        __extends(BoundedRule, _super);
        function BoundedRule(rule, min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = Number.MAX_VALUE; }
            _super.call(this, [rule]);
            this.min = min;
            this.max = max;
            this.type = "bounded";
        }
        BoundedRule.prototype.parseImplementation = function (index) {
            var node = _super.prototype.createNode.call(this, index);
            var child = this.rules[0].parse(index);
            var i = 0;
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
        };
        Object.defineProperty(BoundedRule.prototype, "definition", {
            get: function () {
                return this.rules[0].nameOrDefinition + "{" + this.min + "," + this.max + "}";
            },
            enumerable: true,
            configurable: true
        });
        return BoundedRule;
    }(Rhetoric.Rule));
    Rhetoric.BoundedRule = BoundedRule;
    // Matches a rule 0 or 1 times  
    var Optional = (function (_super) {
        __extends(Optional, _super);
        function Optional(rule) {
            _super.call(this, rule, 0, 1);
            this.type = "optional";
        }
        Object.defineProperty(Optional.prototype, "definition", {
            get: function () {
                return this.rules[0].nameOrDefinition + "?";
            },
            enumerable: true,
            configurable: true
        });
        return Optional;
    }(BoundedRule));
    Rhetoric.Optional = Optional;
    // Greedily matches a given rule zero or more times.  
    var Star = (function (_super) {
        __extends(Star, _super);
        function Star(rule) {
            _super.call(this, rule);
            this.type = "star";
        }
        Object.defineProperty(Star.prototype, "definition", {
            get: function () {
                return this.rules[0].nameOrDefinition + "*";
            },
            enumerable: true,
            configurable: true
        });
        return Star;
    }(BoundedRule));
    Rhetoric.Star = Star;
    // Greedily matches a given rule one or more times.  
    var Plus = (function (_super) {
        __extends(Plus, _super);
        function Plus(rule) {
            _super.call(this, rule, 1);
            this.type = "plus";
        }
        Object.defineProperty(Plus.prototype, "definition", {
            get: function () {
                return this.rules[0].nameOrDefinition + "+";
            },
            enumerable: true,
            configurable: true
        });
        return Plus;
    }(BoundedRule));
    Rhetoric.Plus = Plus;
    // Returns true if at the end of the input
    var End = (function (_super) {
        __extends(End, _super);
        function End() {
            _super.call(this, []);
            this.type = "end";
        }
        End.prototype.parseImplementation = function (index) {
            var node = _super.prototype.createNode.call(this, index);
            return index.atEnd() ? node : null;
        };
        Object.defineProperty(End.prototype, "definition", {
            get: function () {
                return "$";
            },
            enumerable: true,
            configurable: true
        });
        return End;
    }(Rhetoric.Rule));
    Rhetoric.End = End;
    // Advances the parser by one token, but returns false if at the end. 
    var Advance = (function (_super) {
        __extends(Advance, _super);
        function Advance() {
            _super.call(this, []);
            this.type = "advance";
        }
        Advance.prototype.parseImplementation = function (index) {
            if (index.atEnd())
                return null;
            var node = _super.prototype.createNode.call(this, index);
            node.end = index.advance(1);
            return node;
        };
        return Advance;
    }(Rhetoric.Rule));
    Rhetoric.Advance = Advance;
    // Applies a regular expression to the input string, or against the current token. 
    var Re = (function (_super) {
        __extends(Re, _super);
        function Re(regex) {
            _super.call(this, []);
            this.regex = regex;
            this.type = "regex";
        }
        Re.prototype.parseImplementation = function (index) {
            var node = _super.prototype.createNode.call(this, index);
            if (index.isText()) {
                this.regex.lastIndex = index.index;
                var matchResults = this.regex.exec(index.getText());
                if (matchResults == null)
                    return null;
                if (matchResults.index != index.index)
                    return null;
                var match = matchResults[0];
                node.end = index.advance(match.length);
            }
            else {
                // We just match the regular expression against the token 
                this.regex.lastIndex = 0;
                var token = index.getToken();
                var matchResults = this.regex.exec(token);
                if (matchResults == null)
                    return null;
                if (matchResults.index != token.length)
                    return null;
                node.end = index.advance(1);
            }
            return node;
        };
        Object.defineProperty(Re.prototype, "definition", {
            get: function () {
                return "/" + this.regex.source + "/";
            },
            enumerable: true,
            configurable: true
        });
        return Re;
    }(Rhetoric.Rule));
    Rhetoric.Re = Re;
    // Used to match a string in the input string. 
    // If the input is a series of tokens, it will match the text of the current token.  
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(text) {
            _super.call(this, []);
            this.text = text;
            this.type = "text";
        }
        Text.prototype.parseImplementation = function (index) {
            var node = _super.prototype.createNode.call(this, index);
            var start = index.index;
            var end = index.index + this.text.length;
            if (index.isText()) {
                var substring = index.getText().slice(start, end);
                if (substring !== this.text)
                    return null;
                node.end = index.advance(this.text.length);
            }
            else {
                if (index.getToken() !== this.text)
                    return null;
                node.end = index.advance(1);
            }
            return node;
        };
        Object.defineProperty(Text.prototype, "definition", {
            get: function () {
                return "'" + this.text + "'";
            },
            enumerable: true,
            configurable: true
        });
        return Text;
    }(Rhetoric.Rule));
    Rhetoric.Text = Text;
    // Creates a zero-length node, and executes some action during parsing. 
    // Grammars that embed actions give programmers headaches so i suggest avoiding this 
    // unless you want to throw an exception or do some logging. 
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action(fn) {
            _super.call(this, []);
            this.fn = fn;
            this.type = "action";
        }
        Action.prototype.parseImplementation = function (index) {
            this.fn(index);
            return _super.prototype.createNode.call(this, index);
        };
        return Action;
    }(Rhetoric.Rule));
    Rhetoric.Action = Action;
    // Creates a rule that is defined from a function that generates the rule. 
    // This allows two rules to have a cyclic relation. 
    var Delay = (function (_super) {
        __extends(Delay, _super);
        function Delay(fn) {
            _super.call(this, []);
            this.fn = fn;
            this.type = "delay";
        }
        Delay.prototype.parseImplementation = function (index) {
            return this.fn().parse(index);
        };
        Object.defineProperty(Delay.prototype, "definition", {
            get: function () {
                return this.fn().definition;
            },
            enumerable: true,
            configurable: true
        });
        return Delay;
    }(Rhetoric.Rule));
    Rhetoric.Delay = Delay;
})(Rhetoric || (Rhetoric = {}));
// The are function that create rules, usually in terms of other rules. 
// The low-level rules are atEnd, advance, re, and text.  
// These functions take a "RuleType" argument, which can be a string or regular expression.
// This simplifies parsing. 
var Rhetoric;
(function (Rhetoric) {
    // Given a RuleType returns an instance of a Rule.
    function RuleTypeToRule(rule) {
        if (rule instanceof Rhetoric.Rule)
            return rule;
        if (rule instanceof RegExp)
            return new Rhetoric.Re(rule);
        if (typeof (rule) == "string")
            return new Rhetoric.Text(rule);
        if (rule == undefined || rule == null)
            throw "undefined rule";
        throw "Unhandled rule type";
    }
    Rhetoric.RuleTypeToRule = RuleTypeToRule;
    function seq() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i - 0] = arguments[_i];
        }
        //if (rules.length >= 2 && rules[0] instanceof Seq) 
        //    return new Seq((rules[0] as Seq).rules.concat(rules.slice(1)));
        return new Rhetoric.Sequence(rules.map(RuleTypeToRule));
    }
    Rhetoric.seq = seq;
    function choice() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i - 0] = arguments[_i];
        }
        //if (rules.length >= 2 && rules[0] instanceof Choice) 
        //    return new Choice((rules[0] as Choice).rules.concat(rules.slice(1)));
        return new Rhetoric.Choice(rules.map(RuleTypeToRule));
    }
    Rhetoric.choice = choice;
    // Enables Rules to be defined in terms of variables that are defined later on. This 
    // enables cyclic rule definitions.  
    function delay(fxn) { return new Rhetoric.Delay(function () { return RuleTypeToRule(fxn()); }); }
    Rhetoric.delay = delay;
    // Terminal rules 
    Rhetoric.end = new Rhetoric.End();
    Rhetoric.advance = new Rhetoric.Advance();
    function re(re) { return new Rhetoric.Re(re); }
    Rhetoric.re = re;
    function text(text) { return new Rhetoric.Text(text); }
    Rhetoric.text = text;
    // Basic rule operators (combinators)
    function not(rule) { return new Rhetoric.Not(RuleTypeToRule(rule)); }
    Rhetoric.not = not;
    ;
    function star(rule) { return new Rhetoric.Star(RuleTypeToRule(rule)); }
    Rhetoric.star = star;
    ;
    function bounded(rule, min, max) { return new Rhetoric.BoundedRule(RuleTypeToRule(rule), min, max); }
    Rhetoric.bounded = bounded;
    function repeat(rule, count) { return bounded(rule, count, count); }
    Rhetoric.repeat = repeat;
    function opt(rule) { return new Rhetoric.Optional(RuleTypeToRule(rule)); }
    Rhetoric.opt = opt;
    ;
    function at(rule) { return new Rhetoric.And(RuleTypeToRule(rule)); }
    Rhetoric.at = at;
    ;
    function plus(rule) { return new Rhetoric.Plus(RuleTypeToRule(rule)); }
    Rhetoric.plus = plus;
    // Advanced rule operators (combinator)
    function delimitedList(rule, delimiter) { return seq(rule, star(seq(delimiter, rule))).setType("delimitedList"); }
    Rhetoric.delimitedList = delimitedList;
    function except(condition, rule) { return seq(not(condition), rule).setType("except"); }
    Rhetoric.except = except;
    function repeatWhileNot(body, condition) { return star(except(condition, body)).setType("whileNot"); }
    Rhetoric.repeatWhileNot = repeatWhileNot;
    function repeatUntilPast(body, condition) { return seq(repeatWhileNot(body, condition), body).setType("repeatUntilPast"); }
    Rhetoric.repeatUntilPast = repeatUntilPast;
    function anyCharExcept(rule) { return except(rule, Rhetoric.advance).setType("advanceUnless"); }
    Rhetoric.anyCharExcept = anyCharExcept;
    function advanceWhileNot(rule) { return star(anyCharExcept(rule)).setType("advanceWhileNot"); }
    Rhetoric.advanceWhileNot = advanceWhileNot;
    function advanceUntilPast(rule) { return seq(advanceWhileNot(rule), rule).setType("advanceUntilPast"); }
    Rhetoric.advanceUntilPast = advanceUntilPast;
    // Actions  
    function err(msg) {
        if (msg === void 0) { msg = "parsing error"; }
        return new Rhetoric.Action(function (p) { throw (msg); }).setType("err");
    }
    Rhetoric.err = err;
    function log(msg) {
        if (msg === void 0) { msg = ""; }
        return new Rhetoric.Action(function (p) { console.log(msg); }).setType("log");
    }
    Rhetoric.log = log;
    // Guards
    function assert(rule) { return choice(rule, err("Expected rule: " + rule.toString())).setType("assert"); }
    Rhetoric.assert = assert;
    function assertNot(rule) { return choice(not(rule), err("Rule should not have matched: " + rule.toString())).setType("assert"); }
    Rhetoric.assertNot = assertNot;
    function ifThenAssert(condition, body) { return seq(condition, assert(body)).setType("ifThenAssert"); }
    Rhetoric.ifThenAssert = ifThenAssert;
    function guardedSeq(condition) {
        var rules = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rules[_i - 1] = arguments[_i];
        }
        return ifThenAssert(condition, seq.apply(void 0, rules)).setType("guardedSeq");
    }
    Rhetoric.guardedSeq = guardedSeq;
    function assertAtEnd() { return assert(Rhetoric.end).setName("assertAtEnd"); }
    Rhetoric.assertAtEnd = assertAtEnd;
    function tokenize(text) {
        var tokens = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tokens[_i - 1] = arguments[_i];
        }
        var rule = star(choice.apply(void 0, tokens));
        var result = rule.parse(new Rhetoric.ParseIndex(text));
        if (result == null)
            return result;
        if (!result.end.atEnd())
            throw "Did not reach the end of the input stream";
        return result;
    }
    Rhetoric.tokenize = tokenize;
})(Rhetoric || (Rhetoric = {}));
// The following are predefined common rules and combinators  
var Rhetoric;
(function (Rhetoric) {
    // Notice the usage of regular expressions in each of these, instead of building from lower-level parser.
    // This is to improve performance.
    Rhetoric.all = Rhetoric.star(Rhetoric.advance).setName("all");
    Rhetoric.alphaLowerChar = Rhetoric.re(/[a-z]/).setName("alphaLowerChar");
    Rhetoric.alphaUpperChar = Rhetoric.re(/[A-Z]/).setName("alphaUpperChar");
    Rhetoric.alphaChar = Rhetoric.re(/[a-zA-Z]/).setName("alphaChar");
    Rhetoric.digit = Rhetoric.re(/[0-9]/).setName("numericChar");
    Rhetoric.digitNonZero = Rhetoric.re(/[1-9]/).setName("digitNonZero");
    Rhetoric.integer = Rhetoric.re(/0|[1..9]\d*/).setName("integer");
    Rhetoric.hexDigit = Rhetoric.re(/[0..9a-fA-F]/).setName("hexDigit");
    Rhetoric.binaryDigit = Rhetoric.re(/[01]/).setName("binaryDigit");
    Rhetoric.octalDigit = Rhetoric.re(/[0..7]/).setName("octalDigit");
    Rhetoric.alphaNumericChar = Rhetoric.re(/[a-zA-Z0-9]/).setName("alphaNumericChar");
    Rhetoric.identifierFirstChar = Rhetoric.re(/[_a-zA-Z]/).setName("identifierFirstChar");
    Rhetoric.identifierNextChar = Rhetoric.re(/[_a-zA-Z0-9]/).setName("identifierNextChar");
    Rhetoric.identifier = Rhetoric.re(/[_a-zA-Z][_a-zA-Z0-9]*/).setName("identifier");
    Rhetoric.hyphen = Rhetoric.text("-").setName("hyphen");
    Rhetoric.underscore = Rhetoric.text("_").setName("underscore");
    Rhetoric.number = Rhetoric.re(/[+-]?\d+(\.\d+)?([eE][-+]?\d+)?/).setName("number");
    Rhetoric.lineComment = Rhetoric.re(/\/\/.*$/).setName("lineComment");
    Rhetoric.fullComment = Rhetoric.re(/\/\*[\s\S]*\*\//m).setName("fullComment");
    Rhetoric.stringLiteral = Rhetoric.re(/"(\\"|[^"])*"/m).setName("stringLiteral");
    Rhetoric.wsChar = Rhetoric.re(/\s/).setName("wsChar");
    Rhetoric.ws = Rhetoric.re(/\s+/).setName("ws");
    Rhetoric.notWsChar = Rhetoric.re(/\S/).setName("notWsChar");
    Rhetoric.anyChar = Rhetoric.re(/[\s\S]/).setName("anyChar");
    function keyword(text) { return Rhetoric.seq(text, Rhetoric.not(Rhetoric.identifierNextChar)); }
    Rhetoric.keyword = keyword;
    // Common guarded sequences. If first part of sequence passes, the rest must as well.
    // A failure in one of these is usually "catastrophic" meaning that we don't want the parser to continue.
    function parenthesized(rule) { return Rhetoric.guardedSeq("(", rule, ")"); }
    Rhetoric.parenthesized = parenthesized;
    function braced(rule) { return Rhetoric.guardedSeq("{", rule, "}"); }
    Rhetoric.braced = braced;
    function bracketed(rule) { return Rhetoric.guardedSeq("[", rule, "]"); }
    Rhetoric.bracketed = bracketed;
    function doubleQuoted(rule) { return Rhetoric.guardedSeq("\"", rule, "\""); }
    Rhetoric.doubleQuoted = doubleQuoted;
    function singleQuoted(rule) { return Rhetoric.guardedSeq("'", rule, "'"); }
    Rhetoric.singleQuoted = singleQuoted;
    function tag(rule) { return Rhetoric.guardedSeq("<", rule, ">"); }
    Rhetoric.tag = tag;
    // Common types of delimited lists 
    function commaDelimited(rule) { return Rhetoric.delimitedList(rule, ","); }
    Rhetoric.commaDelimited = commaDelimited;
    function semiColonDelimited(rule) { return Rhetoric.delimitedList(rule, ";"); }
    Rhetoric.semiColonDelimited = semiColonDelimited;
    function dotDelimited(rule) { return Rhetoric.delimitedList(rule, "."); }
    Rhetoric.dotDelimited = dotDelimited;
    function tabDelimited(rule) { return Rhetoric.delimitedList(rule, "\t"); }
    Rhetoric.tabDelimited = tabDelimited;
})(Rhetoric || (Rhetoric = {}));
// The following functions are helper functions for grammars 
var Rhetoric;
(function (Rhetoric) {
    // Returns all properties of an object that correspond to Rules 
    function grammarRules(g) {
        return Object
            .keys(g)
            .map(function (k) { return g[k]; })
            .filter(function (v) { return v instanceof Rhetoric.Rule; });
    }
    Rhetoric.grammarRules = grammarRules;
    // Returns the representation using the standard PEG notation 
    function grammarToString(g) {
        return grammarRules(g)
            .map(function (r) { return r.toString(); })
            .join('\n');
    }
    Rhetoric.grammarToString = grammarToString;
})(Rhetoric || (Rhetoric = {}));
//# sourceMappingURL=main.js.map