
namespace Heron {
    /* The main entry point for compiling a Heron source string. */
    export function compile(source: string): string {
        let result = CST.parse(source);
        return (result !== undefined) ? 'correct' : 'wrong';
    }
    /* CST = Concrete Syntax Tree */
    namespace CST {
        /* The main entry point for parsing a Heron source string. */
        export function parse(source: string): Node {
            let program = sequence('program', [
                    optionalWhitespace,
                    endOfString,
            ]);
            return program(source, 0);
        }
        /* A parsing rule is a function which takes a source string
           and a starting index into that string, and either
           succeeds at parsing, in which case it returns a T, or
           fails at parsing, in which case in returns nothing.
           It should have no side effects (except maybe caching).
           Usually T is a subtype of Node. */
        interface Rule<T> {
            (source: string, start: number): (T | undefined);
        }
        /* A generic return value for a parsing rule.
           Usually a subtype will be returned. */
        interface Node {
            type: string; // what kind of node is this?
            source: string; // reference to the whole source code
            start: number; // the starting position in source
            end: number; // just past the ending position in source
        }
        /* A rule for parsing literal tokens. */
        interface Literal extends Node {}
        function literal(token: string): Rule<Literal> {
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
        const float = literal('float');
        const float2 = literal('float2');
        const float3 = literal('float3');
        const float4 = literal('float4');
        const int = literal('int');
        const int2 = literal('int2');
        const int3 = literal('int3');
        const int4 = literal('int4');
        const bool = literal('bool');
        const bool2 = literal('bool2');
        const bool3 = literal('bool3');
        const bool4 = literal('bool4');
        const mat2 = literal('mat2');
        const mat3 = literal('mat3');
        const mat4 = literal('mat4');
        /* An assertion is a zero-length node which indicates that
           a certain condition is met at a location in the source. */
        interface Assertion extends Node {}
        function assertion(type: string, test: Rule<boolean>): Rule<Assertion> {
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
        const endOfString = assertion('eos',
                (source, start) => start === source.length)
        /* Given a sequence of rules, we can chain them to produce
           a rule which succeeds if all parts succeed, one after the
           other, at consecutive points in the source string. Each
           of the subrules generates a subnode, which is kept in the
           'nodes' array.
           We can use const enums to maintain a mapping between
           field names for a sequence node and indices into the
           nodes array. */
        interface Sequence extends Node {
            nodes: Node[];
        }
        function sequence(type: string, rules: Rule<Node>[]): Rule<Sequence> {
            return function (source, start) {
                let result: Sequence = {
                    type: type,
                    source: source,
                    start: start,
                    end: start, // modified later
                    nodes: [], // modified later
                };
                for (let rule of rules) {
                    let subnode = rule(source, result.end);
                    if (subnode === undefined) { return; }
                    result.nodes.push(subnode);
                    result.end = subnode.end;
                }
                return result;
            };
        }
        /* Whitespace nodes, which (currently) include comments.
           We don't allow empty whitespace nodes; if a grammar
           rule calls for optional whitespace, use the
           optionalWhitespace rule instead. */
        interface Whitespace extends Node {}
        const whitespace: Rule<Whitespace> = function (source, start) {
            let end = start;
            while (end < source.length) {
                if (' \t\v\f\r\n'.indexOf(source[end]) !== -1) {
                    end++;
                    continue;
                }
                if (source.substr(end, 2) === '//') {
                    let cr = source.indexOf('\r', end+2);
                    let lf = source.indexOf('\n', end+2);
                    end = Math.min(
                            (cr !== -1) ? cr : source.length,
                            (lf !== -1) ? lf : source.length,
                    );
                    continue;
                }
                if (source.substr(end, 2) === '/*') {
                    let ss = source.indexOf('*/', end+2);
                    end = (ss !== -1) ? ss+2 : source.length;
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
        }
        /* The grammar can have optional elements, which could
           be present or absent, without making the parsing fail.
           Regardless of whether this element is found, we wrap
           the result in an Optional node. */
        interface Optional extends Node {
            node?: Node;
        }
        function optional(type: string, rule: Rule<Node>): Rule<Optional> {
            return function (source, start) {
                let subnode = rule(source, start);
                return {
                    type: type,
                    source: source,
                    start: start,
                    end: (subnode !== undefined) ? subnode.end : start,
                    node: subnode,
                };
            };
        }
        const optionalWhitespace = optional('ows', whitespace);
        const enum BlaEos {
            bla,
            eos,
        }
        const blaEos = sequence('blaeos', [
            literal('bla'),
            endOfString,
        ]);
    }
}

