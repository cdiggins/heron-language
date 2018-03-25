"use strict";
// Inspired by: 
// https://github.com/burg/glsl-simulator/blob/master/src/glsl.pegjs
// https://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
Object.defineProperty(exports, "__esModule", { value: true });
var myna_parser_1 = require("myna-parser");
// Defines a Myna grammar for parsing Cat expressions that support the introduction and usage of scoped variables. 
var g = new function () {
    var _this = this;
    // Helpers
    this.eos = myna_parser_1.Myna.text(";");
    this.untilEol = myna_parser_1.Myna.advanceWhileNot(myna_parser_1.Myna.end.or(myna_parser_1.Myna.newLine)).then(myna_parser_1.Myna.advanceUnless(myna_parser_1.Myna.end));
    // Comments and whitespace 
    this.fullComment = myna_parser_1.Myna.guardedSeq("/*", myna_parser_1.Myna.advanceUntilPast("*/"));
    this.lineComment = myna_parser_1.Myna.seq("//", this.untilEol);
    this.comment = this.fullComment.or(this.lineComment).ws.oneOrMore.setName("heron", "comment");
    this.ws = this.comment.or(myna_parser_1.Myna.ws).setName("heron", "ws");
    // Helper for whitespace delimited sequences that must start with a specific value
    function guardedWsDelimSeq() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        var tmp = [_this.ws];
        for (var i = 0; i < rules.length; ++i) {
            var r = rules[i];
            if (i > 0)
                r = myna_parser_1.Myna.assert(r).setName("heron", r.name);
            tmp.push(r, _this.ws);
        }
        return myna_parser_1.Myna.seq.apply(myna_parser_1.Myna, tmp);
    }
    function commaDelimited(rule) {
        return rule.then(myna_parser_1.Myna.seq(",", _this.ws, rule).zeroOrMore).opt;
    }
    function noAst(rule) {
        var r = rule.copy;
        r._createAstNode = false;
        return r;
    }
    // Recursive definition of an expression
    this.expr = myna_parser_1.Myna.delay(function () { return _this.assignmentExpr; }).setName("heron", "expr");
    // Recursive definition of a statement
    this.recStatement = myna_parser_1.Myna.delay(function () { return _this.statement; }).setName("heron", "recStatement");
    // Recursive definition of a compoudn statement
    this.recCompoundStatement = myna_parser_1.Myna.delay(function () { return _this.compoundStatement; }).setName("heron", "recCompoundStatement");
    // Literals
    this.fraction = myna_parser_1.Myna.seq(".", myna_parser_1.Myna.not("."), myna_parser_1.Myna.digit.zeroOrMore);
    this.plusOrMinus = myna_parser_1.Myna.char("+-");
    this.exponent = myna_parser_1.Myna.seq(myna_parser_1.Myna.char("eE"), this.plusOrMinus.opt, myna_parser_1.Myna.digits);
    this.bool = myna_parser_1.Myna.keywords("true", "false").ast;
    this.number = myna_parser_1.Myna.seq(myna_parser_1.Myna.integer, this.fraction.opt, this.exponent.opt, myna_parser_1.Myna.opt("f")).ast;
    // Strings rules
    this.escapeChar = myna_parser_1.Myna.char('\'"\\bfnrtv');
    this.escapedLiteralChar = myna_parser_1.Myna.char('\\').then(this.escapeChar);
    this.stringLiteralChar = myna_parser_1.Myna.notChar("\u005C\u000D\u2028\u2029\u000A\\").or(this.escapedLiteralChar).ast;
    this.doubleQuotedStringContents = myna_parser_1.Myna.not('"').then(this.stringLiteralChar).zeroOrMore.ast;
    this.singleQuotedStringContents = myna_parser_1.Myna.not("'").then(this.stringLiteralChar).zeroOrMore.ast;
    this.doubleQuote = myna_parser_1.Myna.seq('"', this.doubleQuotedStringContents, '"');
    this.singleQuote = myna_parser_1.Myna.seq("'", this.singleQuotedStringContents, "'");
    this.string = this.doubleQuote.or(this.singleQuote).ast;
    // Literals 
    this.literal = myna_parser_1.Myna.choice(this.number, this.bool, this.string).setName("heron", "literal");
    // Operators 
    this.relationalOp = myna_parser_1.Myna.choice.apply(myna_parser_1.Myna, "<= >= < >".split(" ")).ast;
    this.equalityOp = myna_parser_1.Myna.choice.apply(myna_parser_1.Myna, "== !=".split(" ")).ast;
    this.prefixOp = myna_parser_1.Myna.choice.apply(myna_parser_1.Myna, "++ -- - !".split(" ")).thenNot('=').ast;
    this.postIncOp = myna_parser_1.Myna.text('++').ast;
    this.postDecOp = myna_parser_1.Myna.text('--').ast;
    this.assignmentOp = myna_parser_1.Myna.choice.apply(myna_parser_1.Myna, "+= -= *= /= %= =".split(" ")).thenNot('=').ast;
    this.additiveOp = myna_parser_1.Myna.choice.apply(myna_parser_1.Myna, "+ -".split(" ")).thenNot('=').ast;
    this.multiplicativeOp = myna_parser_1.Myna.choice.apply(myna_parser_1.Myna, "* / %".split(" ")).thenNot('=').ast;
    this.logicalAndOp = myna_parser_1.Myna.text('&&').ast;
    this.logicalOrOp = myna_parser_1.Myna.text('||').ast;
    this.logicalXOrOp = myna_parser_1.Myna.text('^^').ast;
    this.rangeOp = myna_parser_1.Myna.text('..').ast;
    // Identifiers including special operator indicators 
    this.opSymbol = myna_parser_1.Myna.char('<>=+-*/%^|&$!.[]');
    this.opName = myna_parser_1.Myna.seq("op", this.opSymbol.oneOrMore).ast;
    this.identifier = myna_parser_1.Myna.choice(this.opName, myna_parser_1.Myna.identifier).ast;
    // Urns are used for the language definition and the module name 
    this.urnPart = myna_parser_1.Myna.alphaNumeric.or(myna_parser_1.Myna.char('.-')).zeroOrMore.ast;
    this.urnDiv = myna_parser_1.Myna.choice(':');
    this.urn = this.urnPart.then(this.urnDiv.then(this.urnPart).zeroOrMore).ast;
    this.langVer = this.urn.ast;
    this.moduleName = this.urn.ast;
    // Type information 
    this.recType = myna_parser_1.Myna.delay(function () { return _this.typeExpr; });
    this.typeParam = this.recType;
    this.typeParamList = guardedWsDelimSeq('<', commaDelimited(this.typeParam), '>');
    this.typeName = this.identifier.ast;
    this.typeExpr = this.typeName.then(this.typeParamList.opt).ast;
    // Postfix expressions
    this.funCall = guardedWsDelimSeq("(", commaDelimited(this.expr), ")").ast;
    // TODO: consider this if we want to add syntactic support for slices and strides 
    //this.arrayStride = guardedWsDelimSeq(":", this.expr).ast;
    //this.arraySlice = guardedWsDelimSeq(":", this.expr, this.arrayStride.opt).ast;
    //this.arrayIndex = guardedWsDelimSeq("[", this.expr, this.arraySlice.opt, "]").ast;
    this.arrayIndex = guardedWsDelimSeq("[", this.expr, "]").ast;
    this.fieldSelect = myna_parser_1.Myna.seq(".", this.identifier).ast;
    this.asType = guardedWsDelimSeq(myna_parser_1.Myna.keyword("as"), this.typeExpr);
    this.postfixOp = myna_parser_1.Myna.choice(this.funCall, this.arrayIndex, this.fieldSelect, this.postIncOp, this.postDecOp).then(this.ws);
    // Some of the leaf expressions 
    this.arrayExpr = guardedWsDelimSeq("[", commaDelimited(this.expr), "]").ast;
    this.parenExpr = guardedWsDelimSeq("(", this.expr, ")").ast;
    this.objectField = guardedWsDelimSeq(this.identifier, "=", this.expr, ";").ast;
    this.objectExpr = guardedWsDelimSeq("{", this.objectField.zeroOrMore, "}").ast;
    this.varName = this.identifier.ast;
    // The "var x = y in x * x" expression form or also part of "varDeclStatement"
    this.varNameDecl = this.identifier.ast;
    this.varInitialization = guardedWsDelimSeq("=", this.expr);
    this.varDecl = myna_parser_1.Myna.seq(this.varNameDecl, this.varInitialization).ast;
    this.varDecls = myna_parser_1.Myna.seq(this.varDecl, guardedWsDelimSeq(",", this.varDecl).zeroOrMore).ast;
    this.varExpr = guardedWsDelimSeq(myna_parser_1.Myna.keyword("var"), this.varDecls, myna_parser_1.Myna.keyword("in"), this.expr).ast;
    // Generic parameters 
    this.genericConstraint = guardedWsDelimSeq(':', this.typeExpr).ast;
    this.genericParam = this.identifier.then(this.genericConstraint.opt).ast;
    this.genericParams = guardedWsDelimSeq('<', commaDelimited(this.genericParam), '>').opt.ast;
    // Function definition
    this.funcName = this.identifier.ast;
    this.funcParamName = this.identifier.ast;
    this.funcParamType = guardedWsDelimSeq(':', this.typeExpr);
    this.funcParam = this.funcParamName.then(this.funcParamType.opt).ast;
    this.funcParams = guardedWsDelimSeq("(", commaDelimited(this.funcParam), ")").ast;
    this.funcBodyStatement = this.recCompoundStatement;
    this.funcBodyExpr = guardedWsDelimSeq('=', this.expr, ';');
    this.funcBody = myna_parser_1.Myna.choice(this.funcBodyStatement, this.funcBodyExpr);
    this.returnType = guardedWsDelimSeq(':', this.typeExpr);
    this.funcSig = guardedWsDelimSeq(this.funcName, this.genericParams, this.funcParams, this.returnType.opt).ast;
    this.funcDef = guardedWsDelimSeq(myna_parser_1.Myna.keyword("function"), this.funcSig, this.funcBody).ast;
    this.intrinsicDef = guardedWsDelimSeq(myna_parser_1.Myna.keyword("intrinsic"), this.funcSig, ';').ast;
    // Lambda expression 
    this.lambdaArg = this.identifier.then(this.funcParamType.opt).ast;
    this.lambdaArgNoType = this.identifier.ast;
    this.lambdaBody = this.recCompoundStatement.or(this.expr).ast;
    this.lambdaArgsWithParen = myna_parser_1.Myna.seq("(", this.ws, commaDelimited(this.lambdaArg), ")", this.ws);
    this.lambdaArgs = myna_parser_1.Myna.choice(this.lambdaArgNoType, this.lambdaArgsWithParen).ast;
    this.lambdaExpr = myna_parser_1.Myna.seq(this.lambdaArgs, guardedWsDelimSeq("=>", this.lambdaBody)).ast;
    // Leaf expressions (unary expressions)
    this.leafExpr = myna_parser_1.Myna.choice(this.varExpr, this.objectExpr, this.lambdaExpr, this.parenExpr, this.arrayExpr, this.literal, this.varName).then(this.ws).ast;
    // Binary expressions 
    this.postfixExpr = this.leafExpr.then(this.postfixOp.zeroOrMore).ast;
    this.prefixExpr = this.prefixOp.zeroOrMore.then(this.postfixExpr).ast;
    this.multiplicativeExprLeft = this.prefixExpr.ast;
    this.multiplicativeExprRight = guardedWsDelimSeq(this.multiplicativeOp, this.multiplicativeExprLeft).ast;
    this.multiplicativeExpr = this.multiplicativeExprLeft.then(this.multiplicativeExprRight.zeroOrMore).ast;
    this.additiveExprLeft = this.multiplicativeExpr.ast;
    this.additiveExprRight = guardedWsDelimSeq(this.additiveOp, this.additiveExprLeft).ast;
    this.additiveExpr = this.additiveExprLeft.then(this.additiveExprRight.zeroOrMore).ast;
    this.relationalExprLeft = this.additiveExpr.ast;
    this.relationalExprRight = guardedWsDelimSeq(this.relationalOp, this.relationalExprLeft).ast;
    this.relationalExpr = this.relationalExprLeft.then(this.relationalExprRight.zeroOrMore).ast;
    this.equalityExprLeft = this.relationalExpr.ast;
    this.equalityExprRight = guardedWsDelimSeq(this.equalityOp, this.equalityExprLeft).ast;
    this.equalityExpr = this.equalityExprLeft.then(this.equalityExprRight.zeroOrMore).ast;
    this.logicalAndExprLeft = this.equalityExpr.ast;
    this.logicalAndExprRight = guardedWsDelimSeq(this.logicalAndOp, this.logicalAndExprLeft).ast;
    this.logicalAndExpr = this.logicalAndExprLeft.then(this.logicalAndExprRight.zeroOrMore).ast;
    this.logicalXOrExprLeft = this.logicalAndExpr.ast;
    this.logicalXOrExprRight = guardedWsDelimSeq(this.logicalXOrOp, this.logicalXOrExprLeft).ast;
    this.logicalXOrExpr = this.logicalXOrExprLeft.then(this.logicalXOrExprRight.zeroOrMore).ast;
    this.logicalOrExprLeft = this.logicalXOrExpr.ast;
    this.logicalOrExprRight = guardedWsDelimSeq(this.logicalOrOp, this.logicalOrExprLeft).ast;
    this.logicalOrExpr = this.logicalOrExprLeft.then(this.logicalOrExprRight.zeroOrMore).ast;
    this.rangeExprLeft = this.logicalOrExpr.ast;
    this.rangeExprRight = guardedWsDelimSeq(this.rangeOp, this.rangeExprLeft).ast;
    this.rangeExpr = this.rangeExprLeft.then(this.rangeExprRight.opt).ast;
    this.conditionalExprLeft = this.rangeExpr.ast;
    this.conditionalExprRight = guardedWsDelimSeq("?", this.conditionalExprLeft, ":", this.conditionalExprLeft).ast;
    this.conditionalExpr = this.conditionalExprLeft.then(this.conditionalExprRight.zeroOrMore).ast;
    this.assignmentExprLeft = this.conditionalExpr.ast;
    this.assignmentExprRight = guardedWsDelimSeq(this.assignmentOp, this.assignmentExprLeft).ast;
    this.assignmentExpr = this.assignmentExprLeft.then(this.assignmentExprRight.zeroOrMore).ast;
    // Statements 
    this.exprStatement = this.expr.then(this.ws).then(this.eos).ast;
    this.varDeclStatement = guardedWsDelimSeq(myna_parser_1.Myna.keyword("var"), this.varDecls, this.eos).ast;
    this.loopCond = guardedWsDelimSeq("(", this.expr, ")").ast;
    this.forLoop = guardedWsDelimSeq(myna_parser_1.Myna.keyword("for"), "(", myna_parser_1.Myna.keyword("var"), this.identifier, myna_parser_1.Myna.keyword("in"), this.expr, ")", this.recStatement).ast;
    this.whileLoop = guardedWsDelimSeq(myna_parser_1.Myna.keyword("while"), this.loopCond, this.recStatement).ast;
    this.doLoop = guardedWsDelimSeq(myna_parser_1.Myna.keyword("do"), this.recStatement, myna_parser_1.Myna.keyword("while"), this.loopCond).ast;
    this.elseStatement = guardedWsDelimSeq(myna_parser_1.Myna.keyword("else"), this.recStatement).ast;
    this.ifCond = guardedWsDelimSeq("(", this.expr, ")").ast;
    this.ifStatement = guardedWsDelimSeq(myna_parser_1.Myna.keyword("if"), this.ifCond, this.recStatement, this.elseStatement.opt).ast;
    this.compoundStatement = guardedWsDelimSeq("{", this.recStatement.zeroOrMore, "}").ast;
    this.breakStatement = guardedWsDelimSeq(myna_parser_1.Myna.keyword("break"), this.eos).ast;
    this.continueStatement = guardedWsDelimSeq(myna_parser_1.Myna.keyword("continue"), this.eos).ast;
    this.returnStatement = guardedWsDelimSeq(myna_parser_1.Myna.keyword("return"), this.expr.opt, this.eos).ast;
    this.emptyStatement = this.eos.ast;
    this.typeDef = guardedWsDelimSeq(myna_parser_1.Myna.keyword("type"), this.identifier, this.eos).ast;
    this.importStatement = guardedWsDelimSeq(myna_parser_1.Myna.keyword("import"), this.moduleName, this.eos).ast;
    this.statement = myna_parser_1.Myna.choice(this.emptyStatement, this.compoundStatement, this.ifStatement, this.returnStatement, this.continueStatement, this.breakStatement, this.forLoop, this.doLoop, this.whileLoop, this.varDeclStatement, this.funcDef, this.intrinsicDef, this.typeDef, this.importStatement, this.exprStatement).then(this.ws);
    // Tope level declarations
    this.langDecl = guardedWsDelimSeq(myna_parser_1.Myna.keyword("language"), this.langVer, this.eos);
    this.moduleBody = this.statement.zeroOrMore.ast;
    this.module = guardedWsDelimSeq(myna_parser_1.Myna.keyword('module'), this.moduleName, '{', this.moduleBody, '}').ast;
    this.file = this.langDecl.opt.then(this.module).ast;
};
// Register the grammar, providing a name and the default parse rule
myna_parser_1.Myna.registerGrammar('heron', g, g.file);
exports.heronGrammar = myna_parser_1.Myna.grammars['heron'];
exports.heronParser = myna_parser_1.Myna.parsers['heron'];
function parseHeron(s, r) {
    if (r === void 0) { r = exports.heronGrammar.file; }
    var ast = r.parse(s);
    if (ast.end != s.length)
        throw new Error("Whole input was not parsed");
    return ast;
}
exports.parseHeron = parseHeron;
//# sourceMappingURL=heron-parser.js.map