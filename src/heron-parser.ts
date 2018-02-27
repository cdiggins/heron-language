// Inspired by: 
// https://github.com/burg/glsl-simulator/blob/master/src/glsl.pegjs
// https://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf

import { Myna as m } from "myna-parser";

// Defines a Myna grammar for parsing Cat expressions that support the introduction and usage of scoped variables. 
const g = new function() {
    var _this = this;

    // Helpers
    this.eos            = m.text(";");
    this.untilEol       = m.advanceWhileNot(m.end.or(m.newLine)).then(m.advanceUnless(m.end));
 
    // Comments and whitespace 
    this.fullComment    = m.guardedSeq("/*", m.advanceUntilPast("*/"));
    this.lineComment    = m.seq("//", this.untilEol);
    this.comment        = this.fullComment.or(this.lineComment).ws.oneOrMore.setName("heron", "comment");
    this.ws             = this.comment.or(m.ws).setName("heron", "ws");    

    // Helper for whitespace delimited sequences that must start with a specific value
    function guardedWsDelimSeq(...rules): m.Rule {
        let tmp = [_this.ws];
        for (let i=0; i < rules.length; ++i) {
            let r = rules[i];
            if (i > 0) r = m.assert(r).setName("heron", r.name);
            tmp.push(r, _this.ws);
        }
        return m.seq(...tmp);
    }

    function commaDelimited(rule: m.RuleType): m.Rule {
        return rule.then(m.seq(",", _this.ws, rule).zeroOrMore).opt;
    }

    function noAst(rule: m.Rule): m.Rule {
        let r = rule.copy;
        r._createAstNode = false;
        return r;
    }
    
    // Recursive definition of an expression
    this.expr = m.delay(function() {
        return _this.assignmentExpr;
    }).setName("heron", "expr");

    // Recursive definition of a statement
    this.recStatement = m.delay(function() {
        return _this.statement;
    }).setName("heron", "recStatement");

    // Literals
    this.fraction       = m.seq(".", m.not("."),  m.digit.zeroOrMore);    
    this.plusOrMinus    = m.char("+-");
    this.exponent       = m.seq(m.char("eE"), this.plusOrMinus.opt, m.digits); 
    this.bool           = m.keywords("true", "false").ast;
    this.number         = m.seq(this.plusOrMinus.opt, m.integer, this.fraction.opt, this.exponent.opt).ast;   

    // Strings rules
    this.escapeChar = m.char('\'"\\bfnrtv');    
    this.escapedLiteralChar = m.char('\\').then(this.escapeChar);    
    this.stringLiteralChar = m.notChar("\u005C\u000D\u2028\u2029\u000A\\").or(this.escapedLiteralChar).ast;
    this.doubleQuotedStringContents = m.not('"').then(this.stringLiteralChar).zeroOrMore.ast;
    this.singleQuotedStringContents = m.not("'").then(this.stringLiteralChar).zeroOrMore.ast;
    this.doubleQuote = m.seq('"', this.doubleQuotedStringContents, '"');
    this.singleQuote = m.seq("'", this.singleQuotedStringContents, "'");
    this.string = this.doubleQuote.or(this.singleQuote).ast;
    
    // Literals 
    this.literal        = m.choice(this.number, this.bool, this.string).setName("heron", "literal")

    // Operators 
    this.relationalOp       = m.choice(..."<= >= < >".split(" ")).ast;
    this.equalityOp         = m.choice(..."== !=".split(" ")).ast;
    this.prefixOp           = m.choice(..."++ -- + - !".split(" ")).thenNot('=').ast;
    this.postIncOp          = m.text('++').ast;
    this.postDecOp          = m.text('--').ast;
    this.assignmentOp       = m.choice(..."+= -= *= /= %= =".split(" ")).thenNot('=').ast;
    this.additiveOp         = m.choice(..."+ -".split(" ")).thenNot('=').ast;
    this.multiplicativeOp   = m.choice(..."* / %".split(" ")).thenNot('=').ast;
    this.logicalAndOp       = m.text('&&').ast;
    this.logicalOrOp        = m.text('||').ast;
    this.logicalXOrOp       = m.text('^^').ast;
    
    // Identifiers including special operator indicators 
    this.opSymbol       = m.char('<>=+-*/%^|&$!');
    this.opName         = m.seq("op", this.opSymbol.oneOrMore).ast;
    this.identifier     = m.choice(this.opName, m.identifier).ast;

    // Type information 
    this.recType = m.delay(() => _this.type);
    this.typeParam = this.recType.ast;
    this.typeParamList = guardedWsDelimSeq('<', commaDelimited(this.typeParam), '>').ast;
    this.typeName = this.identifier.ast;
    this.typeExpr = this.typeName.then(this.typeParamList.opt).ast;
    
    // Postfix expressions
    this.funCall = guardedWsDelimSeq("(", commaDelimited(this.expr), ")").ast;
    // TODO: consider this if we want to add syntactic support for slices and strides 
    //this.arrayStride = guardedWsDelimSeq(":", this.expr).ast;
    //this.arraySlice = guardedWsDelimSeq(":", this.expr, this.arrayStride.opt).ast;
    //this.arrayIndex = guardedWsDelimSeq("[", this.expr, this.arraySlice.opt, "]").ast;
    this.arrayIndex = guardedWsDelimSeq("[", this.expr, "]").ast;
    this.fieldSelect = m.seq(".", this.identifier).ast;
    this.asType = guardedWsDelimSeq(m.keyword("as"), this.typeExpr);
    this.postfixOp = m.choice(this.funCall, this.arrayIndex, this.fieldSelect, this.postIncOp, this.postDecOp).then(this.ws);

    // Expressions of different precedences 
    this.arrayExpr = guardedWsDelimSeq("[", commaDelimited(this.expr), "]").ast;
    this.parenExpr = guardedWsDelimSeq("(", this.expr, ")").ast;
    this.objectField = guardedWsDelimSeq(this.identifier, "=", this.expr, ";").ast;
    this.objectExpr = guardedWsDelimSeq("{", this.objectField.zeroOrMore, "}").ast;

    // The "var x = y in x * x" expression form or also part of "varDeclStatement"
    this.varNameDecl = this.identifier.ast;
    this.varInitialization = guardedWsDelimSeq("=", this.expr).ast;
    this.varDecl = m.seq(this.varNameDecl, this.varInitialization).ast;
    this.varDecls = m.seq(this.varDecl, guardedWsDelimSeq(",", this.varDecl).zeroOrMore).ast;
    this.varExpr = guardedWsDelimSeq(m.keyword("var"), this.varDecls, m.keyword("in"), this.expr).ast;

    // Generic parameters 
    this.genericConstraint = guardedWsDelimSeq(':', this.typeExpr).ast;
    this.genericParam = this.identifier.then(this.genericConstraint.opt).ast;
    this.genericsParams = guardedWsDelimSeq('<', commaDelimited(this.genericParam), '>').opt.ast;

    // Function definition
    this.funcName = this.identifier.ast;
    this.funcParamName = this.identifier.ast;
    this.funcParamType = guardedWsDelimSeq(':', this.typeExpr);
    this.funcParam = this.funcParamName.then(this.funcParamType.opt).ast;
    this.funcParams = guardedWsDelimSeq("(", commaDelimited(this.funcParam), ")").ast;
    this.recCompoundStatement = m.delay(() => _this.compoundStatement).ast;
    this.funcBodyStatement = this.recCompoundStatement.ast;
    this.funcBodyExpr = guardedWsDelimSeq('=', this.expr, ';').ast;
    this.funcBody = m.choice(this.funcBodyStatement, this.funcBodyExpr).ast;
    this.funcDef = guardedWsDelimSeq(m.keyword("function"), this.funcName, this.genericsParams, this.funcParams, this.funcBody).ast;
    this.intrinsicDef = guardedWsDelimSeq(m.keyword("intrinsic"), this.funcName, this.genericsParams, this.funcParams, ';').ast;

    // Lambda expression 
    this.lambdaArg = this.identifier.then(this.funcParamType.opt).ast;
    this.lambdaBody = this.recCompoundStatement.or(this.expr).ast;
    this.lambdaArgsNoParen = this.identifier.ast;
    this.lambdaArgsWithParen = m.seq("(", this.ws, commaDelimited(this.lambdaArg), ")", this.ws).ast;
    this.lambdaArgs = m.choice(this.lambdaArgsNoParen, this.lambdaArgsWithParen).ast;
    this.lambdaExpr = m.seq(this.lambdaArgs, guardedWsDelimSeq("=>", this.lambdaBody)).ast;
     
    // Leaf expressions (unary expressions)
    this.leafExpr = m.choice(this.varExpr, this.objectExpr, this.lambdaExpr, this.parenExpr, this.arrayExpr, this.literal, this.identifier).then(this.ws).ast;
    
    // Binary expressions 
    this.postfixExpr = this.leafExpr.then(this.postfixOp.zeroOrMore).ast
    this.prefixExpr = this.prefixOp.zeroOrMore.then(this.postfixExpr).ast;
    this.multiplicativeExprLeft = this.prefixExpr.ast;
    this.multiplicativeExprRight = guardedWsDelimSeq(this.multiplicativeOp, this.multiplicativeExprLeft).ast
    this.multiplicativeExpr = this.multiplicativeExprLeft.then(this.multiplicativeExprRight.zeroOrMore).ast;
    this.additiveExprLeft = this.multiplicativeExpr.ast;
    this.additiveExprRight = guardedWsDelimSeq(this.additiveOp, this.additiveExprLeft).ast        
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
    this.logicalOrExprRight = guardedWsDelimSeq(this.logicalOrOp,  this.logicalOrExprLeft).ast;
    this.logicalOrExpr = this.logicalOrExprLeft.then(this.logicalOrExprRight.zeroOrMore).ast;
    this.rangeExprLeft = this.logicalOrExpr.ast;
    this.rangeExprRight = guardedWsDelimSeq("..",  this.rangeExprLeft).ast;
    this.rangeExpr = this.rangeExprLeft.then(this.rangeExprRight.opt).ast;
    this.conditionalExprLeft = this.rangeExpr.ast;
    this.conditionalExprRight = guardedWsDelimSeq("?", this.conditionalExprLeft, ":", this.conditionalExprLeft).ast;
    this.conditionalExpr = this.conditionalExprLeft.then(this.conditionalExprRight.zeroOrMore).ast;
    this.assignmentExprLeft = this.conditionalExpr.ast;
    this.assignmentExprRight = guardedWsDelimSeq(this.assignmentOp, this.assignmentExprLeft).ast;
    this.assignmentExpr = this.assignmentExprLeft.then(this.assignmentExprRight.zeroOrMore).ast;

    // Statements 
    this.exprStatement = this.expr.then(this.ws).then(this.eos).ast;
    this.varDeclStatement = guardedWsDelimSeq(m.keyword("var"), this.varDecls, this.eos).ast;        
    this.loopCond = guardedWsDelimSeq("(", this.expr, ")").ast;
    this.forLoop = guardedWsDelimSeq(m.keyword("for"), "(", m.keyword("var"), this.identifier, m.keyword("in"), this.expr, ")", this.recStatement).ast;
    this.whileLoop = guardedWsDelimSeq(m.keyword("while"), this.loopCond, this.recStatement).ast;
    this.doLoop = guardedWsDelimSeq(m.keyword("do"), this.recStatement, m.keyword("while"), this.loopCond).ast;
    this.elseStatement = guardedWsDelimSeq(m.keyword("else"), this.recStatement).ast;
    this.ifCond = guardedWsDelimSeq("(", this.expr, ")").ast;
    this.ifStatement = guardedWsDelimSeq(m.keyword("if"), this.ifCond, this.recStatement, this.elseStatement.zeroOrMore).ast;
    this.compoundStatement = guardedWsDelimSeq("{", this.recStatement.zeroOrMore, "}").ast;
    this.breakStatement = guardedWsDelimSeq(m.keyword("break"), this.eos).ast;
    this.continueStatement = guardedWsDelimSeq(m.keyword("continue"), this.eos).ast;
    this.returnStatement = guardedWsDelimSeq(m.keyword("return"), this.expr.opt, this.eos).ast;
    this.emptyStatement = this.eos.ast;

    //this.typeDef = guardedWsDelimSeq('=', this.typeExpr);
    //this.typeDecl = guardedWsDelimSeq(m.keyword("type"), this.identifier, this.typeDef.opt).ast;

    this.statement = m.choice(
        this.emptyStatement,
        this.compoundStatement,
        this.ifStatement,
        this.returnStatement, 
        this.continueStatement, 
        this.breakStatement, 
        this.forLoop, 
        this.doLoop, 
        this.whileLoop, 
        this.varDeclStatement,
        this.funcDef,
        this.intrinsicDef,    
        this.exprStatement,
    ).then(this.ws).ast;

    // Urns are used for the language definition and the module name 
    this.urnPart = m.alphaNumeric.or(m.char('.-')).zeroOrMore.ast;
    this.urnDiv = m.choice(':')
    this.urn = this.urnPart.then(this.urnDiv.then(this.urnPart).zeroOrMore).ast;
    this.moduleName = this.urn.ast;
    this.langVer = this.urn.ast;

    // Tope level declarations
    this.langDecl = guardedWsDelimSeq(m.keyword("language"), this.langVer, this.eos).ast;
    this.moduleBody = this.statement.zeroOrMore.ast;
    this.module = guardedWsDelimSeq(m.keyword('module'), this.moduleName, '{', this.moduleBody, '}');
    this.file = this.langDecl.opt.then(this.module).ast;
};

// Register the grammar, providing a name and the default parse rule
m.registerGrammar('heron', g, g.file);

export const heronGrammar = m.grammars['heron'];
export const heronParser  = m.parsers['heron'];

export function parseHeron(s: string, r: m.Rule = heronGrammar.file) : m.AstNode {
    var ast =  r.parse(s);
    if (ast.end != s.length)
        throw new Error("Whole input was not parsed");        
    return ast;
}
