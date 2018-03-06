// Myna Parsing Library
// Copyright (c) 2016 Christopher Diggins
// Usage permitted under terms of MIT License
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Myna;
(function (Myna) {
    // A lookup table of all grammars registered with Myna 
    Myna.grammars = {};
    // Generates a new ID for rules 
    var _nextId = 0;
    function genId() {
        return _nextId++;
    }
    // This is used to store (memoize) parses and rules. 
    // When a rule is started it is associated with the value "true", afterwards it is either 
    // a parse-node, or null  
    var _cache = {};
    // This is the input text 
    var input = "";
    // Clears the internal cache: should be called whenever a new parsing session is started  
    function initialize(text) {
        _cache = {};
        input = text;
    }
    Myna.initialize = initialize;
    // A node may have zero length, and may have child nodes.
    // Any successful parse will return a ParseNode. 
    var ParseNode = /** @class */ (function () {
        function ParseNode(start, end) {
            this.start = start;
            this.end = end;
        }
        Object.defineProperty(ParseNode.prototype, "contents", {
            get: function () {
                return input.slice(this.start, this.end);
            },
            enumerable: true,
            configurable: true
        });
        return ParseNode;
    }());
    Myna.ParseNode = ParseNode;
    // A Rule is both a rule in the PEG grammar and a parser. The parse function takes  
    // a particular parse location (in either a string, or array of tokens) and will return eith a  
    // ParseNode if the rule is succefully matched or null otherwise. The input argument 
    // is never modified, and only in rare cases does a Rule maintain internal state (see Re rule).
    var Rule = /** @class */ (function () {
        // Note: child-rules are exposed as a public field
        function Rule(rules) {
            this.rules = rules;
            // Identifies individual rule
            this.name = "";
            // Internal unique identifier
            this.id = genId();
            // Identifies types of rules.  
            this.type = "";
            // Indicates whether generated nodes should be added to the abstract syntax tree
            // Generally speaking this will be true, unless the rule  
            this.skip = true;
        }
        // Default implementation returns true or creates a node, depending on the 'genNode'
        Rule.prototype.parseImplementation = function (index, parent) {
            throw "Not implemented, this function is supposed to be overridden";
        };
        // Calls the derived class parser if necessary, but first looks up whether this rule has already 
        // been tested against this spot in the input. This is the memoization step used by the PEG PackRat
        // parsing technique, and reduces the complexity of the algorithm to O(N).    
        Rule.prototype.parse = function (index, node) {
            var result = null;
            // Check if we create a node or not for this rule.  
            var child = this.skip ? node : new ParseNode(index, index);
            var end = this.parseImplementation(index, child);
            // Check that parsing is successful
            if (end !== null) {
                // The child node and the parent node are finished at the same index 
                child.end = end;
                node.end = end;
                // If not skipping, we add the child node to the parent node.  
                if (!this.skip) {
                    // Create the array only if we need to.
                    if (node.children === undefined)
                        node.children = new Array();
                    node.children.push(child);
                }
                // Either way the result is the node                
                result = node;
            }
            // Finished!
            return result;
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
        Object.defineProperty(Rule.prototype, "opt", {
            // Extensions to support method/property chaining a.k.a. fluent syntax
            get: function () { return opt(this); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rule.prototype, "star", {
            get: function () { return star(this); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rule.prototype, "plus", {
            get: function () { return plus(this); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rule.prototype, "not", {
            get: function () { return not(this); },
            enumerable: true,
            configurable: true
        });
        Rule.prototype.andThen = function (r) { return seq(this, r); };
        Rule.prototype.andThenAt = function (r) { return this.andThen(at(r)); };
        Rule.prototype.andThenNot = function (r) { return this.andThen(not(r)); };
        Rule.prototype.or = function (r) { return choice(this, r); };
        Rule.prototype.repeatUntil = function (r) { return repeatWhileNot(this, r); };
        Rule.prototype.repeatUntilPast = function (r) { return repeatUntilPast(this, r); };
        Rule.prototype.repeat = function (count) { return repeat(this, count); };
        Rule.prototype.bounded = function (min, max) { return bounded(this, min, max); };
        return Rule;
    }());
    Myna.Rule = Rule;
    // These are the core Rule classes of Myna. Normally you would not use theses directly but use the factory methods
    // If you fork this code, think twice before adding new classes here. Maybe you can implement your new Rule
    // in terms of functions or other low-level rules. Then you can be happy knowing that the same code is being 
    // re-used and tested all the time.  
    // Matches a series of rules in order. Succeeds only if all sub-rules succeed. 
    var Sequence = /** @class */ (function (_super) {
        __extends(Sequence, _super);
        function Sequence(rules) {
            var _this = _super.call(this, rules) || this;
            _this.type = "sequence";
            return _this;
        }
        Sequence.prototype.parseImplementation = function (index, node) {
            for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
                var r = _a[_i];
                var child = r.parse(index, node);
                if (child === null)
                    return null;
                index = child.end;
            }
            return index;
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
    }(Rule));
    Myna.Sequence = Sequence;
    // Tries to match each rule in order until one succeeds. Succeeds if any of the sub-rules succeed. 
    var Choice = /** @class */ (function (_super) {
        __extends(Choice, _super);
        function Choice(rules) {
            var _this = _super.call(this, rules) || this;
            _this.type = "choice";
            return _this;
        }
        Choice.prototype.parseImplementation = function (index, node) {
            for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
                var r = _a[_i];
                var child = r.parse(index, node);
                if (child == null)
                    continue;
                return child.end;
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
    }(Rule));
    Myna.Choice = Choice;
    // Returns true only if the child rule fails to match.
    var Not = /** @class */ (function (_super) {
        __extends(Not, _super);
        function Not(rule) {
            var _this = _super.call(this, [rule]) || this;
            _this.type = "not";
            return _this;
        }
        Not.prototype.parseImplementation = function (index, node) {
            if (this.rules[0].parse(index, node) != null)
                return null;
            return index;
        };
        Object.defineProperty(Not.prototype, "definition", {
            get: function () {
                return "!" + this.rules[0].nameOrDefinition;
            },
            enumerable: true,
            configurable: true
        });
        return Not;
    }(Rule));
    Myna.Not = Not;
    // Returns true only if the child rule matches, but does not advance the parser
    var And = /** @class */ (function (_super) {
        __extends(And, _super);
        function And(rule) {
            var _this = _super.call(this, [rule]) || this;
            _this.type = "and";
            return _this;
        }
        And.prototype.parseImplementation = function (index, node) {
            if (this.rules[0].parse(index, node) == null)
                return null;
            return index;
        };
        Object.defineProperty(And.prototype, "definition", {
            get: function () {
                return "&" + this.rules[0].nameOrDefinition;
            },
            enumerable: true,
            configurable: true
        });
        return And;
    }(Rule));
    Myna.And = And;
    // A generalization of several other rules such as star (0+), plus (1+), opt(0 or 1),   
    var BoundedRule = /** @class */ (function (_super) {
        __extends(BoundedRule, _super);
        function BoundedRule(rule, min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = Number.MAX_VALUE; }
            var _this = _super.call(this, [rule]) || this;
            _this.min = min;
            _this.max = max;
            _this.type = "bounded";
            return _this;
        }
        BoundedRule.prototype.parseImplementation = function (index, node) {
            var child = this.rules[0].parse(index, node);
            var i = 0;
            while (child != null && i < this.max) {
                i++;
                index = child.end;
                child = this.rules[0].parse(index, node);
            }
            if (i < this.min)
                return null;
            return index;
        };
        Object.defineProperty(BoundedRule.prototype, "definition", {
            get: function () {
                return this.rules[0].nameOrDefinition + "{" + this.min + "," + this.max + "}";
            },
            enumerable: true,
            configurable: true
        });
        return BoundedRule;
    }(Rule));
    Myna.BoundedRule = BoundedRule;
    // Matches a rule 0 or 1 times  
    var Optional = /** @class */ (function (_super) {
        __extends(Optional, _super);
        function Optional(rule) {
            var _this = _super.call(this, rule, 0, 1) || this;
            _this.type = "optional";
            return _this;
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
    Myna.Optional = Optional;
    // Greedily matches a given rule zero or more times.  
    var Star = /** @class */ (function (_super) {
        __extends(Star, _super);
        function Star(rule) {
            var _this = _super.call(this, rule) || this;
            _this.type = "star";
            return _this;
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
    Myna.Star = Star;
    // Greedily matches a given rule one or more times.  
    var Plus = /** @class */ (function (_super) {
        __extends(Plus, _super);
        function Plus(rule) {
            var _this = _super.call(this, rule, 1) || this;
            _this.type = "plus";
            return _this;
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
    Myna.Plus = Plus;
    // Returns true if at the end of the input
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        function End() {
            var _this = _super.call(this, []) || this;
            _this.type = "end";
            return _this;
        }
        End.prototype.parseImplementation = function (index, node) {
            return index >= text.length ? index : null;
        };
        Object.defineProperty(End.prototype, "definition", {
            get: function () {
                return "$";
            },
            enumerable: true,
            configurable: true
        });
        return End;
    }(Rule));
    Myna.End = End;
    // Advances the parser by one token, but returns false if at the end. 
    var Any = /** @class */ (function (_super) {
        __extends(Any, _super);
        function Any() {
            var _this = _super.call(this, []) || this;
            _this.type = "any";
            return _this;
        }
        Any.prototype.parseImplementation = function (index, node) {
            return index >= text.length ? null : index++;
        };
        Object.defineProperty(Any.prototype, "definition", {
            get: function () {
                return ".";
            },
            enumerable: true,
            configurable: true
        });
        return Any;
    }(Rule));
    Myna.Any = Any;
    // Uses a lookup table to decide whether the value is true or not.   
    var Lookup = /** @class */ (function (_super) {
        __extends(Lookup, _super);
        function Lookup(lookup, neg) {
            var _this = _super.call(this, []) || this;
            _this.lookup = lookup;
            _this.neg = neg;
            _this.type = "lookup";
            return _this;
        }
        Lookup.prototype.parseImplementation = function (index, node) {
            if (index >= input.length)
                return null;
            var tkn = input[index];
            var hasTkn = tkn in this.lookup;
            var success = this.neg ? !hasTkn : hasTkn;
            if (!success)
                return null;
            return index + 1;
        };
        Object.defineProperty(Lookup.prototype, "definition", {
            get: function () {
                return this.lookup;
            },
            enumerable: true,
            configurable: true
        });
        return Lookup;
    }(Rule));
    Myna.Lookup = Lookup;
    // Advance the token and returns true if the token is in the given range.    
    var Range = /** @class */ (function (_super) {
        __extends(Range, _super);
        function Range(min, max) {
            var _this = _super.call(this, []) || this;
            _this.min = min;
            _this.max = max;
            _this.type = "range";
            return _this;
        }
        Range.prototype.parseImplementation = function (index, node) {
            if (index >= input.length)
                return null;
            var tkn = input[index];
            if (tkn < this.min || tkn > this.max)
                return null;
            return index + 1;
        };
        Object.defineProperty(Range.prototype, "definition", {
            get: function () {
                return "[" + this.min + " .. " + this.max + "]";
            },
            enumerable: true,
            configurable: true
        });
        return Range;
    }(Rule));
    Myna.Range = Range;
    // Used to match a string in the input string. 
    var Text = /** @class */ (function (_super) {
        __extends(Text, _super);
        function Text(text) {
            var _this = _super.call(this, []) || this;
            _this.text = text;
            _this.type = "text";
            return _this;
        }
        Text.prototype.parseImplementation = function (index, node) {
            if (index >= input.length)
                return null;
            var start = index;
            var end = index + this.text.length;
            // TODO: optimize by not creating a copy of memory, just advance two pointers 
            var substring = input.slice(start, end);
            if (substring !== this.text)
                return null;
            return index + this.text.length;
        };
        Object.defineProperty(Text.prototype, "definition", {
            get: function () {
                return "'" + this.text + "'";
            },
            enumerable: true,
            configurable: true
        });
        return Text;
    }(Rule));
    Myna.Text = Text;
    // Creates a zero-length node, and executes some action during parsing. 
    // Grammars that embed actions give programmers headaches so i suggest avoiding this 
    // unless you want to throw an exception or do some logging. 
    var Action = /** @class */ (function (_super) {
        __extends(Action, _super);
        function Action(fn) {
            var _this = _super.call(this, []) || this;
            _this.fn = fn;
            _this.type = "action";
            return _this;
        }
        Action.prototype.parseImplementation = function (index, node) {
            this.fn(index);
            return index;
        };
        return Action;
    }(Rule));
    Myna.Action = Action;
    // Creates a rule that is defined from a function that generates the rule. 
    // This allows two rules to have a cyclic relation. 
    var Delay = /** @class */ (function (_super) {
        __extends(Delay, _super);
        function Delay(fn) {
            var _this = _super.call(this, []) || this;
            _this.fn = fn;
            _this.type = "delay";
            return _this;
        }
        Delay.prototype.parseImplementation = function (index, node) {
            return this.fn().parse(index, node).end;
        };
        Object.defineProperty(Delay.prototype, "definition", {
            get: function () {
                return this.fn().definition;
            },
            enumerable: true,
            configurable: true
        });
        return Delay;
    }(Rule));
    Myna.Delay = Delay;
    // Given a RuleType returns an instance of a Rule.
    function RuleTypeToRule(rule) {
        if (rule instanceof Rule)
            return rule;
        if (typeof (rule) == "string")
            return new Text(rule);
        if (rule == undefined || rule == null)
            throw "undefined";
        throw "Internal error: not a rule type " + rule;
    }
    Myna.RuleTypeToRule = RuleTypeToRule;
    // Matches a series of rules in order, and succeeds if they all do
    function seq() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        return new Sequence(rules.map(RuleTypeToRule));
    }
    Myna.seq = seq;
    // Tries to match each rule in order, and succeeds if one does 
    function choice() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        return new Choice(rules.map(RuleTypeToRule));
    }
    Myna.choice = choice;
    // Enables Rules to be defined in terms of variables that are defined later on. This 
    // enables cyclic rule definitions.  
    function delay(fxn) { return new Delay(function () { return RuleTypeToRule(fxn()); }); }
    Myna.delay = delay;
    // Terminal rules 
    Myna.end = new End();
    Myna.any = new Any();
    Myna.all = Myna.any.star;
    function text(text) { return new Text(text); }
    Myna.text = text;
    function range(min, max) { return new Range(min, max); }
    Myna.range = range;
    function set(chars, neg) {
        if (neg === void 0) { neg = false; }
        var d = {};
        for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
            var c = chars_1[_i];
            d[c] = c;
        }
        return new Lookup(d, neg);
    }
    Myna.set = set;
    ;
    function negSet(chars) { return set(chars, true); }
    Myna.negSet = negSet;
    ;
    // Basic rule operators (combinators).
    function not(rule) { return new Not(RuleTypeToRule(rule)); }
    Myna.not = not;
    ;
    function star(rule) { return new Star(RuleTypeToRule(rule)); }
    Myna.star = star;
    ;
    function bounded(rule, min, max) { return new BoundedRule(RuleTypeToRule(rule), min, max); }
    Myna.bounded = bounded;
    function repeat(rule, count) { return bounded(rule, count, count); }
    Myna.repeat = repeat;
    function opt(rule) { return new Optional(RuleTypeToRule(rule)); }
    Myna.opt = opt;
    ;
    function at(rule) { return new And(RuleTypeToRule(rule)); }
    Myna.at = at;
    ;
    function plus(rule) { return new Plus(RuleTypeToRule(rule)); }
    Myna.plus = plus;
    // Advanced rule operators (combinator)
    function delimitedList(rule, delimiter) { return opt(seq(rule, star(seq(delimiter, rule)))).setType("delimitedList"); }
    Myna.delimitedList = delimitedList;
    function except(condition, rule) { return seq(not(condition), rule).setType("except"); }
    Myna.except = except;
    function repeatWhileNot(body, condition) { return star(except(condition, body)).setType("whileNot"); }
    Myna.repeatWhileNot = repeatWhileNot;
    function repeatUntilPast(body, condition) { return seq(repeatWhileNot(body, condition), condition).setType("repeatUntilPast"); }
    Myna.repeatUntilPast = repeatUntilPast;
    function anyCharExcept(rule) { return except(rule, Myna.any).setType("anyCharExcept"); }
    Myna.anyCharExcept = anyCharExcept;
    function advanceWhileNot(rule) { return star(anyCharExcept(rule)).setType("advanceWhileNot"); }
    Myna.advanceWhileNot = advanceWhileNot;
    function advanceUntilPast(rule) { return seq(advanceWhileNot(rule), rule).setType("advanceUntilPast"); }
    Myna.advanceUntilPast = advanceUntilPast;
    // Actions  
    function action(fn) { return new Action(fn); }
    Myna.action = action;
    function err(msg) {
        if (msg === void 0) { msg = "parsing error"; }
        return action(function (p) { throw (msg); }).setType("err");
    }
    Myna.err = err;
    function log(msg) {
        if (msg === void 0) { msg = ""; }
        return action(function (p) { console.log(msg); }).setType("log");
    }
    Myna.log = log;
    // Guards
    function assert(rule, msg) {
        if (msg === void 0) { msg = "Expected rule to match"; }
        return choice(rule, err(msg)).setType("assert");
    }
    Myna.assert = assert;
    function assertNot(rule, msg) {
        if (msg === void 0) { msg = "Expected rule to not match"; }
        return choice(not(rule), err(msg)).setType("assertNot");
    }
    Myna.assertNot = assertNot;
    function ifThenAssert(condition, body) { return seq(condition, assert(body)).setType("ifThenAssert"); }
    Myna.ifThenAssert = ifThenAssert;
    function guardedSeq(condition) {
        var rules = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rules[_i - 1] = arguments[_i];
        }
        return ifThenAssert(condition, seq.apply(void 0, rules)).setType("guardedSeq");
    }
    Myna.guardedSeq = guardedSeq;
    function assertAtEnd() { return assert(Myna.end).setName("assertAtEnd"); }
    Myna.assertAtEnd = assertAtEnd;
    // The following are predefined common rules and additional combinators   
    Myna.alphaLowerChar = range('a', 'z').setName("alphaLowerChar");
    Myna.alphaUpperChar = range('A', 'Z').setName("alphaUpperChar");
    Myna.alphaChar = choice(Myna.alphaLowerChar, Myna.alphaUpperChar).setName("alphaChar");
    Myna.digit = range('0', '9').setName("numericChar");
    Myna.digitNonZero = range('1', '9').setName("digitNonZero");
    Myna.integer = choice('0', seq(Myna.digitNonZero, Myna.digit.star)).setName("integer");
    Myna.hexDigit = choice(Myna.digit, range('a', 'f'), range('A', 'F')).setName("hexDigit");
    Myna.binaryDigit = choice('0', '1').setName("binaryDigit");
    Myna.octalDigit = range('0', '7').setName("octalDigit");
    Myna.alphaNumericChar = choice(Myna.alphaChar, Myna.digit).setName("alphaNumericChar");
    Myna.underscore = text("_").setName("underscore");
    Myna.identifierFirst = choice(Myna.alphaChar, Myna.underscore).setName("identifierFirstChar");
    Myna.identifierNext = choice(Myna.alphaNumericChar, Myna.underscore).setName("identifierNextChar");
    Myna.identifier = seq(Myna.identifierFirst, Myna.identifierNext.star).setName("identifier");
    Myna.hyphen = text("-").setName("hyphen");
    Myna.crlf = text("\r\n");
    Myna.newLine = choice(Myna.crlf, "\n");
    Myna.space = text(" ");
    Myna.tab = text("\t");
    Myna.ws = set(" \t\r\n");
    // A complete identifier, with no other letters 
    function keyword(text) { return seq(text, not(Myna.identifierNext)); }
    Myna.keyword = keyword;
    // Common guarded sequences. If first part of sequence passes, the rest must as well.
    // A failure in one of these is usually "catastrophic" meaning that we don't want the parser to continue.
    function parenthesized(rule) { return guardedSeq("(", rule, ")"); }
    Myna.parenthesized = parenthesized;
    function braced(rule) { return guardedSeq("{", rule, "}"); }
    Myna.braced = braced;
    function bracketed(rule) { return guardedSeq("[", rule, "]"); }
    Myna.bracketed = bracketed;
    function doubleQuoted(rule) { return guardedSeq("\"", rule, "\""); }
    Myna.doubleQuoted = doubleQuoted;
    function singleQuoted(rule) { return guardedSeq("'", rule, "'"); }
    Myna.singleQuoted = singleQuoted;
    function tag(rule) { return guardedSeq("<", rule, ">"); }
    Myna.tag = tag;
    // Common types of delimited lists 
    function commaDelimited(rule) { return delimitedList(rule, ","); }
    Myna.commaDelimited = commaDelimited;
    function semiColonDelimited(rule) { return delimitedList(rule, ";"); }
    Myna.semiColonDelimited = semiColonDelimited;
    function colonDelimited(rule) { return delimitedList(rule, ":"); }
    Myna.colonDelimited = colonDelimited;
    function doubleColonDelimited(rule) { return delimitedList(rule, "::"); }
    Myna.doubleColonDelimited = doubleColonDelimited;
    function dotDelimited(rule) { return delimitedList(rule, "."); }
    Myna.dotDelimited = dotDelimited;
    function tabDelimited(rule) { return delimitedList(rule, "\t"); }
    Myna.tabDelimited = tabDelimited;
    function newLineDelimited(rule) { return delimitedList(rule, Myna.newLine); }
    Myna.newLineDelimited = newLineDelimited;
    // The following are helper functions for grammar objects. A grammar is a loosely defined concept.
    // It is any JavaScript object where one or more member fields are instances of the Rule class.    
    // Returns all properties of an object that correspond to Rules 
    function grammarRules(g) {
        return Object
            .keys(g)
            .map(function (k) { return g[k]; })
            .filter(function (v) { return v instanceof Rule; });
    }
    Myna.grammarRules = grammarRules;
    // Returns the representation using the standard PEG notation 
    function grammarToString(g) {
        return grammarRules(g)
            .map(function (r) { return r.toString(); })
            .join('\n');
    }
    Myna.grammarToString = grammarToString;
    // Initializes a grammar object by setting names for all of the rules,
    // assuring that nodes are created for each rule, and stores the grammar
    // in the Myna.grammars object 
    function registerGrammar(name, g) {
        for (var k in g) {
            if (g[k] instanceof Rule) {
                g[k].setName(k);
                g[k].skip = false;
            }
        }
        this.grammars[name] = g;
    }
    Myna.registerGrammar = registerGrammar;
    // Global parse function. 
    // Given a rule and input string will generate an abstract syntax tree (AST). 
    // This will also clear any previously cached results. 
    function parse(r, s) {
        initialize(s);
        var parent = new ParseNode(0, 0);
        var result = r.parse(0, parent);
        if (result.end != s.length) {
            throw "Did not parse the full content of the file";
        }
        return result;
    }
    Myna.parse = parse;
})(Myna || (Myna = {}));
//# sourceMappingURL=main.js.map