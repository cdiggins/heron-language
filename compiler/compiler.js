var Heron;
(function (Heron) {
    /* The main entry point for compiling a Heron source string. */
    function compile(source) {
        var result = CST.parse(source);
        return (result !== undefined) ? 'correct' : 'wrong';
    }
    Heron.compile = compile;
    /* CST = Concrete Syntax Tree */
    var CST;
    (function (CST) {
        /* The main entry point for parsing a Heron source string. */
        function parse(source) {
            var program = sequence('program', [
                optionalWhitespace,
                endOfString,
            ]);
            return program(source, 0);
        }
        CST.parse = parse;
        function literal(token) {
            return function (source, start) {
                if (source.substr(start, token.length) === token) {
                    return {
                        type: token,
                        source: source,
                        start: start,
                        end: start + token.length,
                    };
                }
            };
        }
        /* Literals for basic type names. */
        var float = literal('float');
        var float2 = literal('float2');
        var float3 = literal('float3');
        var float4 = literal('float4');
        var int = literal('int');
        var int2 = literal('int2');
        var int3 = literal('int3');
        var int4 = literal('int4');
        var bool = literal('bool');
        var bool2 = literal('bool2');
        var bool3 = literal('bool3');
        var bool4 = literal('bool4');
        var mat2 = literal('mat2');
        var mat3 = literal('mat3');
        var mat4 = literal('mat4');
        function assertion(type, test) {
            return function (source, start) {
                if (test(source, start)) {
                    return {
                        type: type,
                        source: source,
                        start: start,
                        end: start,
                    };
                }
            };
        }
        /* A rule for matching the end of the source string. */
        var endOfString = assertion('eos', function (source, start) { return start === source.length; });
        function sequence(type, rules) {
            return function (source, start) {
                var result = {
                    type: type,
                    source: source,
                    start: start,
                    end: start,
                    nodes: [],
                };
                for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                    var rule = rules_1[_i];
                    var subnode = rule(source, result.end);
                    if (subnode === undefined) {
                        return;
                    }
                    result.nodes.push(subnode);
                    result.end = subnode.end;
                }
                return result;
            };
        }
        var whitespace = function (source, start) {
            var end = start;
            while (end < source.length) {
                if (' \t\v\f\r\n'.indexOf(source[end]) !== -1) {
                    end++;
                    continue;
                }
                if (source.substr(end, 2) === '//') {
                    var cr = source.indexOf('\r', end + 2);
                    var lf = source.indexOf('\n', end + 2);
                    end = Math.min((cr !== -1) ? cr : source.length, (lf !== -1) ? lf : source.length);
                    continue;
                }
                if (source.substr(end, 2) === '/*') {
                    var ss = source.indexOf('*/', end + 2);
                    end = (ss !== -1) ? ss + 2 : source.length;
                    continue;
                }
                break;
            }
            if (end > start) {
                return {
                    type: 'ws',
                    source: source,
                    start: start,
                    end: end,
                };
            }
        };
        function optional(type, rule) {
            return function (source, start) {
                var subnode = rule(source, start);
                return {
                    type: type,
                    source: source,
                    start: start,
                    end: (subnode !== undefined) ? subnode.end : start,
                    node: subnode,
                };
            };
        }
        var optionalWhitespace = optional('ows', whitespace);
        var blaEos = sequence('blaeos', [
            literal('bla'),
            endOfString,
        ]);
    })(CST || (CST = {}));
})(Heron || (Heron = {}));
