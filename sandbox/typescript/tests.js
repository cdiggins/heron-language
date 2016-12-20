// TODO: test each of the rule operators one by one.
// Define basic rules. 
// TODO: test the tokenizer  
// TODO: add a parse function 
// TODO: start with basic words 

function testParse(rule, text, shouldFail = false) {    
    let startTime = performance.now();
    let node = undefined;
    let err = undefined;    
    try {
        node = rule.parse(new Rhetoric.ParseIndex(text));
    }
    catch (e) {
        err = e;
    }
    let elapsed = performance.now() - startTime;

    return {
        name : text,
        description : node == null ? "null" : node.end.index + "/" + text.length,
        negative : shouldFail,
        success : (node == null ? false : node.end.index == text.length) ^ shouldFail,
        error : err,
        elapsed : elapsed,
        node : node, 
        rule : rule.type + ": " + rule.toString(),        
    };
}

function testRule(rule, passStrings, failStrings=[]) {
    let passResults = passStrings.map(
        function (tkn) { 
            return testParse(rule, tkn); 
        });
    let failResults = failStrings.map(
        function (tkn) { 
            return testParse(rule, tkn, true); 
        });  
    return { 
        name: "Testing rule " + rule.name + " of type " + rule.type,
        results : [].concat(passResults, failResults)
    }; 
}

function simpleParserTests() {
    let input = "abc 123 def 456 ghi 789";
}

function oddNumberOfXGrammar() {
    let x = function() { return choice(seq("x", delay(x), "x"), "x"); }
    return x();
}


function testRules() {

    let r = Rhetoric;

    let identifierTokens = [ "a", "_", "abc", "a_B", "_abc", "ABC_", "a0123", "A9Z", "qwertyuiopasdfghjklzxcvbnm" ];
    let numberTokens = [ "1", "1.23", "+123", "-123", "1", "1.23e+45", "1.23e-45", "1.23E+45", "1.23E-45", "1.23E45", "1.23e45" ];
    let numberNotTokens = [ ".1", "1.2.3", "+1+23", "-12-3", "1.23e+e45", "1.23e-4.5", "12E3E45" ];
    let newline = "\n";
    let space = " ";
    let tab = "\t";
    let wsTokens = [ space, tab, newline, space + space, tab + tab, newline + newline, space + tab + newline, space + tab + newline ];

    let jsBools = [ 'true', 'false' ];
    let jsNulls = [ 'null' ];
    let jsNumbers = [ '0', '100', '123.456', '0.34e-42', '-43' ];
    let jsEscapedChar = [ '\\t', '\\b', '\\n', '\\r', '\\t' ];
    let jsEscapedUnicodeChar = [ '\\u4a0d' ];
    let jsStrings = [ '""', '"\t"', '"\\t"', '"\\""', '"abc\\"def"'];
    let jsArrays = [ '[]', '[true]', '[null,1,2,false,0.43,"ab\"c"]'];
    let jsObjects = [ '{}', '{ }', ' { } ', '{"":1}', '{a:[]}', '{" a ":0.45e+1}', '{"a":1,"b":"bb","c":true, "d"  :    false, "e": null}', '{a:{},b:{c:{d:42, e:3.4}}}'];

    var jg = new JsonGrammar();

    // TODO: test err, test log, test assert, test assertNot, test ifTHenAssert, test guaradedSeq        
    
    return [
        testRule(r.end, [""], ["a", " a", "a "]),
        testRule(r.advance, ["a", "Z", "9", "."], ["", " a"]),
        testRule(r.re(/[ab]*/), ["", "a", "aabbaa"], ["c", "abc"]),
        testRule(r.text("ab"), ["ab"], ["abc"]),
        testRule(r.seq(r.not("ab"), r.all), ["ba", "aab"], ["ab"]),
        testRule(r.star("a"), ["", "a","aa", "aaa"], ["b", "aab"]),
        testRule(r.plus("a"), ["a","aa", "aaa"], ["", "b", "aab"]),
        testRule(r.star("ab"), ["","ab","ababab"], ["aab", "b"]),
        testRule(r.bounded("ab", 1, 2), ["ab", "abab"], ["", "ababab"]),
        testRule(r.repeat("a", 3), ["aaa"], ["aa", "aaaa"]),
        testRule(r.opt("ab"), ["", "ab"], ["abc"]),
        testRule(r.at("ab"), [], ["ab"]),
        testRule(r.delimitedList("a", ","), ["", "a", "a,a", "a,a,a"], ["a,", ",a", ",", "aa", "aa,aa"]),
        testRule(r.except("a", r.advance), ["b", "c"], ["", "a"]),
        testRule(r.seq("a", "b"), ["ab"], ["abb", "", "aab", "ba"]),
        testRule(r.choice("a", "b"), ["a", "b"], ["ab", "", "c", "ba"]),
        testRule(r.seq(r.plus("a"), r.plus("b")), ["aab", "ab", "abb", "aaabb"], ["", "aa", "ba", "bb"]),
        testRule(r.anyCharExcept("a"), ["b","c"], ["a", ""]),
        testRule(r.seq(r.repeatWhileNot("a", "b"), "b"), ["aaab", "b"], ["abb", "bb"]),
        testRule(r.repeatUntilPast("a", "b"), ["aaab", "b"], ["abb", "bb"]),
        testRule(r.seq(r.advanceWhileNot("z"), "z"), ["aaaaz", "z", "abcz"], ["za", "abc", ""]),
        testRule(r.err("testing error"), [], ["", "a", "abc"]),
        testRule(r.log("testing log"), [""], ["a", "abc"]),
        testRule(r.seq(r.assert("a"), "a"), ["a"], ["b"]),
        testRule(r.seq(r.assertNot("b"), "a"), ["a"], ["b"]),
        testRule(r.seq("a", r.assertAtEnd()), ["a"], ["", "ab", "b"]),
        
        testRule(r.identifier, identifierTokens, [].concat(numberTokens, wsTokens)),
        testRule(r.number, numberTokens, [].concat(numberNotTokens, identifierTokens, wsTokens)),
        testRule(r.ws, wsTokens, [].concat(numberTokens, identifierTokens)),
        
        // JsonGrammar rules
        testRule(jg.bool, jsBools, [].concat(jsNulls, jsNumbers)),
        testRule(jg.null, jsNulls, [].concat(jsBools, jsNumbers)),
        testRule(jg.number, jsNumbers, [].concat(jsBools, jsNumbers)),
        //testRule(jg.string, jsStrings, true),
        //testRule(jg.array, jsArrays, true),
        //testRule(jg.object, jsObjects, true),
    ];
}

