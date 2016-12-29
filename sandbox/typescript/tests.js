"use strict";

function testParse(myna, rule, text, shouldFail)  {    
    if (shouldFail == undefined) shouldFail = false;
    let startTime = performance.now();
    let node = undefined;
    let err = undefined;    
    try {        
        node = myna.parse(rule, text);
    }
    catch (e) {
        err = e;
    }
    let elapsed = performance.now() - startTime;

    return {
        name : rule.name + ": " + text,
        description : node == null ? "null" : node.end.index + "/" + text.length,
        negative : shouldFail,
        success : (node == null ? false : node.end.index == text.length) ^ shouldFail,
        error : err,
        elapsed : elapsed,
        node : node,
        match : node == null ? null : node.contents, 
        ruleDescr : rule.type + ": " + rule.toString(),
        rule : rule        
    };
}

function testRule(myna, rule, passStrings, failStrings) 
{
    if (failStrings == undefined) failStrings = [];
    let passResults = passStrings.map(
        function (tkn) { 
            return testParse(myna, rule, tkn, false); 
        });
    let failResults = failStrings.map(
        function (tkn) { 
            return testParse(myna, rule, tkn, true); 
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

function coreTests(m) {
    return [
        [m.end, [""], ["a", " a", "a "]],
        [m.any, ["a", "Z", "9", "."], ["", " a"]],
        [m.set("ab").star, ["", "a", "aabbaa"], ["c", "abc"]],
        [m.text("ab"), ["ab"], ["abc"]],
        [m.seq(m.not("ab"), m.all), ["ba", "aab"], ["ab"]],
        [m.star("a"), ["", "a","aa", "aaa"], ["b", "aab"]],
        [m.plus("a"), ["a","aa", "aaa"], ["", "b", "aab"]],
        [m.star("ab"), ["","ab","ababab"], ["aab", "b"]],
        [m.bounded("ab", 1, 2), ["ab", "abab"], ["", "ababab"]],
        [m.repeat("a", 3), ["aaa"], ["aa", "aaaa"]],
        [m.opt("ab"), ["", "ab"], ["abc"]],
        [m.seq(m.opt("a"), "b"), ["b", "ab"], ["a", "bb", "aab", "abb"]],
        [m.at("ab"), [], ["ab"]],
        [m.delimitedList("a", ","), ["", "a", "a,a", "a,a,a"], ["a,", ",a", ",", "aa", "aa,aa"]],
        [m.except("a", m.any), ["b", "c"], ["", "a"]],
        [m.seq("a", "b"), ["ab"], ["abb", "", "aab", "ba"]],
        [m.choice("a", "b"), ["a", "b"], ["ab", "", "c", "ba"]],
        [m.seq(m.plus("a"), m.plus("b")), ["aab", "ab", "abb", "aaabb"], ["", "aa", "ba", "bb"]],
        [m.anyCharExcept("a"), ["b","c"], ["a", ""]],
        [m.seq(m.repeatWhileNot("a", "b"), "b"), ["aaab", "b"], ["abb", "bb"]],
        [m.repeatUntilPast("a", "b"), ["aaab", "b"], ["abb", "bb"]],
        [m.seq(m.advanceWhileNot("z"), "z"), ["aaaaz", "z", "abcz"], ["za", "abc", ""]],
        [m.err("testing error"), [], ["", "a", "abc"]],
        [m.log("testing log"), [""], ["a", "abc"]],
        [m.assert("a"), ["a"], ["b"]],
        [m.seq(m.assertNot("b"), "a"), ["a"], ["b"]],
        [m.seq("a", m.assertAtEnd()), ["a"], ["", "ab", "b"]],
        [m.keyword("abc"), ["abc"], ["ab", "abcd", "ABC", "abc "]],
        [m.parenthesized("a"), ["(a)"], ["()", "a", ""]],         
    ];
}

/*
    let identifierTokens = [ "a", "_", "abc", "a_B", "_abc", "ABC_", "a0123", "A9Z", "qwertyuiopasdfghjklzxcvbnm" ];
    //let numberTokens = [ "1", "1.23", "+123", "-123", "1", "1.23e+45", "1.23e-45", "1.23E+45", "1.23E-45", "1.23E45", "1.23e45" ];
    //let numberNotTokens = [ ".1", "1.2.3", "+1+23", "-12-3", "1.23e+e45", "1.23e-4.5", "12E3E45" ];
    let newline = "\n";
    let space = " ";
    let tab = "\t";
    let wsTokens = [ space, tab, newline, space + space, tab + tab, newline + newline, space + tab + newline, space + tab + newline ];
        //[m.identifier, identifierTokens, [].concat(numberTokens, wsTokens)],
        //[m.ws, wsTokens, [].concat(numberTokens, identifierTokens)],
*/

function csvTests(m) {
    let cg = new CsvGrammar(m);
    let records = [
            'Stock Name,Country of Listing,Ticker,Margin Rate,Go Short?,Limited Risk Premium',
            '2 Ergo Group Plc,UK,RGO.L,25%,Yes,1.00%',
            '"Bankrate, Inc.",USA,RATE.O,25%,No,0.30%'];
    let file = records.join("\n");        
    return [
        [cg.textdata, ['a', '?', ' ', ';', '\t', '9', '.'], [',', '\n', '\r', '"']],
        [cg.nonescaped, ['', 'Aa', 'a a', '.', ' 3.4 ', " 'abc'def "], ['"abc"', '\n', 'abc\rdef', 'bc,de']],
        [cg.field, ['Stock Name', '"Bankrate, Inc."', '0.30%', '', '"a""b"'], ['"', 'abc,', ',', ',abc', 'ab,cd']],
        [cg.record, records, []],
        [cg.file, [file], []],
    ];
}

function jsonTests(m) {
    let jg = new JsonGrammar(m);
    return [
        // JsonGrammar tests
        [jg.bool, ["true", "false"], ["TRUE", "0", "fal"]],
        [jg.null, ["null"], ["", "NULL", "nul"]],
        [jg.number,  [ '0', '100', '123.456', '0.34e-42', '-43', '+43', '43', "+100", "-0"], ["abc", "1+2", "e+2", "01", "-"]],
        [jg.string, ['""', '"a"', '"\t"', '"\\t"','"\\""', '"\\\\"',  '\"AB cd\"'], ['"', '"ab', 'abc', 'ab"', '"ab""', '"\\"'  ]],
        
        // TODO: add tokenization capabilities 
        //[jg.array, ['[]', '[ 1 ]','[1,2, 3]', '[true,"4.3", 1.23e4]', '[[[],[], []]'], ['[', ']', '[1],2', '3,4','']]
    ];
}

function runTests(m, inputs) {
    return inputs.map(
        function (input) { 
            return testRule(m, input[0], input[1], input[2]); 
        }); 
}

function runAllTests(myna) {
    // Get all the tests and concatenate them together 
    let tests = [].concat(
        coreTests(myna),
        jsonTests(myna),
        csvTests(myna));
   
    // Validate tests 
    for (let t of tests) {
        if (t.length != 3 || t[0] === undefined) {
            throw new Exception("Each test must have a rule, an array of passing strings, and an array of failing strings");
        }
    }
    
    return runTests(myna, tests);
}


