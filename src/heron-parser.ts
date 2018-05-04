import { Myna as m } from "myna-parser";
import { HeronAstNode } from "./heron-ast-rewrite";

// Defines a Myna grammar for parsing Cat expressions that support the introduction and usage of scoped variables. 
export const g = new function() {
    var _this = this;

    // Helpers
    this.eos            = m.text(";");
    this.untilEol       = m.advanceWhileNot(m.end.or(m.newLine)).then(m.advanceUnless(m.end));
 
    // Comments and whitespace 
    this.fullComment    = m.guardedSeq("/*", m.advanceUntilPast("*/"));
    this.lineComment    = m.seq("//", this.untilEol);
    this.comment        = this.fullComment.or(this.lineComment);
    this.blankSpace     = m.atWs.advance.oneOrMore;
    this.ws             = this.comment.or(this.blankSpace).zeroOrMore;

    // Helper for whitespace delimited sequences that must start with a specific value
    function guardedWsDelimSeq(...rules): m.Rule {
        let tmp = [_this.ws];
        for (let i=0; i < rules.length; ++i) {
            let r = rules[i];
            // TODO: I shouldn't have to setName on the assert rule
            if (i > 0) r = m.assert(r).setName("heron", r.name);
            tmp.push(r, _this.ws);
        }
        return m.seq(...tmp);
    }

    function commaDelimited(rule: m.RuleType): m.Rule {
        return rule.then(m.seq(",", _this.ws, rule).zeroOrMore).opt;
    }

    // Recursive definition of an expression
    this.expr = m.delay(() => _this.assignmentExpr).setName("heron", "expr");

    // Recursive definition of a statement
    this.recStatement = m.delay(() => _this.statement).setName("heron", "recStatement");

    // Recursive definition of a compoudn statement
    this.recCompoundStatement = m.delay(() => _this.compoundStatement).setName("heron", "recCompoundStatement");

    // Literals
    this.fraction       = m.seq(".", m.not("."),  m.digit.zeroOrMore);    
    this.plusOrMinus    = m.char("+-");
    this.exponent       = m.seq(m.char("eE"), this.plusOrMinus.opt, m.digits); 
    this.bool           = m.keywords("true", "false").ast;
    this.number         = m.seq(m.integer, this.fraction.opt, this.exponent.opt, m.opt("f")).ast;   

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
    this.prefixOp           = m.choice(..."++ -- - !".split(" ")).thenNot('=').ast;
    this.postIncOp          = m.text('++').ast;
    this.postDecOp          = m.text('--').ast;
    this.assignmentOp       = m.choice(..."+= -= *= /= %= =".split(" ")).thenNot('=').ast;
    this.additiveOp         = m.choice(..."+ -".split(" ")).thenNot('=').ast;
    this.multiplicativeOp   = m.choice(..."* / %".split(" ")).thenNot('=').ast;
    this.logicalAndOp       = m.text('&&').ast;
    this.logicalOrOp        = m.text('||').ast;
    this.logicalXOrOp       = m.text('^^').ast;
    this.rangeOp            = m.text('..').ast;
    
    // Identifiers including special operator indicators 
    this.opSymbol       = m.char('<>=+-*/%^|&$!.[]');
    this.opName         = m.seq("op", this.opSymbol.oneOrMore).ast;
    this.identifier     = m.choice(this.opName, m.identifier).ast;

    // Urns are used for the language definition and the module name 
    this.urnPart        = m.alphaNumeric.or(m.char('.-')).zeroOrMore.ast;
    this.urnDiv         = m.choice(':')
    this.urn            = this.urnPart.then(this.urnDiv.then(this.urnPart).zeroOrMore).ast;
    this.langVer        = this.urn.ast;
    this.moduleName     = this.urn.ast;

    // Type information 
    this.recType        = m.delay(() => _this.typeExpr);
    this.typeParam      = this.recType;
    this.typeParamList  = guardedWsDelimSeq('<', commaDelimited(this.typeParam), '>');
    this.typeName       = this.identifier.ast;
    this.typeExpr       = this.typeName.then(this.typeParamList.opt).ast;
    
    // Postfix expressions
    this.funCall        = guardedWsDelimSeq("(", commaDelimited(this.expr), ")").ast;
    // TODO: consider this if we want to add syntactic support for slices and strides 
    //this.arrayStride = guardedWsDelimSeq(":", this.expr).ast;
    //this.arraySlice = guardedWsDelimSeq(":", this.expr, this.arrayStride.opt).ast;
    //this.arrayIndex = guardedWsDelimSeq("[", this.expr, this.arraySlice.opt, "]").ast;
    this.arrayIndex     = guardedWsDelimSeq("[", this.expr, "]").ast;
    this.fieldSelect    = m.seq(".", this.identifier).ast;
    this.asType         = guardedWsDelimSeq(m.keyword("as"), this.typeExpr);
    this.postfixOp      = m.choice(this.funCall, this.arrayIndex, this.fieldSelect, this.postIncOp, this.postDecOp).then(this.ws);

    // Some of the leaf expressions 
    this.arrayExpr      = guardedWsDelimSeq("[", commaDelimited(this.expr), "]").ast;
    this.parenExpr      = guardedWsDelimSeq("(", this.expr, ")").ast;
    this.objectField    = guardedWsDelimSeq(this.identifier, "=", this.expr, ";").ast;
    this.objectExpr     = guardedWsDelimSeq("{", this.objectField.zeroOrMore, "}").ast;
    this.varName        = this.identifier.ast;

    // The "var x = y in x * x" expression form or also part of "varDeclStatement"
    this.varNameDecl        = this.identifier.ast;
    this.varInitialization  = guardedWsDelimSeq("=", this.expr);
    this.varDecl            = m.seq(this.varNameDecl, this.varInitialization).ast;
    this.varDecls           = m.seq(this.varDecl, guardedWsDelimSeq(",", this.varDecl).zeroOrMore).ast;
    this.varExpr            = guardedWsDelimSeq(m.keyword("var"), this.varDecls, m.keyword("in"), this.expr).ast;

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
    this.funcBody = m.choice(this.funcBodyStatement, this.funcBodyExpr); 
    this.returnType = guardedWsDelimSeq(':', this.typeExpr);
    this.funcSig = guardedWsDelimSeq(this.funcName, this.genericParams, this.funcParams, this.returnType.opt).ast;
    this.funcDef = guardedWsDelimSeq(m.keyword("function"), this.funcSig, this.funcBody).ast;
    this.intrinsicDef = guardedWsDelimSeq(m.keyword("intrinsic"), this.funcSig, ';').ast;

    // Lambda expression 
    this.lambdaArg = this.identifier.then(this.funcParamType.opt).ast;
    this.lambdaArgNoType = this.identifier.ast;
    this.lambdaBody = this.recCompoundStatement.or(this.expr).ast;
    this.lambdaArgsWithParen = m.seq("(", this.ws, commaDelimited(this.lambdaArg), ")", this.ws);
    this.lambdaArgs = m.choice(this.lambdaArgNoType, this.lambdaArgsWithParen).ast;
    this.lambdaExpr = m.seq(this.lambdaArgs, guardedWsDelimSeq("=>", this.lambdaBody)).ast;
     
    // Leaf expressions (unary expressions)
    this.leafExpr = m.choice(this.varExpr, this.objectExpr, this.lambdaExpr, this.parenExpr, this.arrayExpr, this.literal, this.varName).then(this.ws).ast;
    
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
    this.rangeExprRight = guardedWsDelimSeq(this.rangeOp,  this.rangeExprLeft).ast;
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
    this.loopCond = guardedWsDelimSeq("(", this.expr, ")");
    this.forLoop = guardedWsDelimSeq(m.keyword("for"), "(", m.keyword("var"), this.identifier, m.keyword("in"), this.expr, ")", this.recStatement).ast;
    this.whileLoop = guardedWsDelimSeq(m.keyword("while"), this.loopCond, this.recStatement).ast;
    this.doLoop = guardedWsDelimSeq(m.keyword("do"), this.recStatement, m.keyword("while"), this.loopCond).ast;
    this.elseStatement = guardedWsDelimSeq(m.keyword("else"), this.recStatement);
    this.ifCond = guardedWsDelimSeq("(", this.expr, ")");
    this.ifStatement = guardedWsDelimSeq(m.keyword("if"), this.ifCond, this.recStatement, this.elseStatement.opt).ast;
    this.compoundStatement = guardedWsDelimSeq("{", this.recStatement.zeroOrMore, "}").ast;
    this.breakStatement = guardedWsDelimSeq(m.keyword("break"), this.eos).ast;
    this.continueStatement = guardedWsDelimSeq(m.keyword("continue"), this.eos).ast;
    this.returnStatement = guardedWsDelimSeq(m.keyword("return"), this.expr.opt, this.eos).ast;
    this.emptyStatement = this.eos.ast;
    this.typeDef = guardedWsDelimSeq(m.keyword("type"), this.identifier, this.eos).ast;
    this.importStatement = guardedWsDelimSeq(m.keyword("import"), this.moduleName, this.eos).ast;

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
        this.typeDef,    
        this.importStatement,
        this.exprStatement,
    ).then(this.ws);

    // Tope level declarations
    this.langDecl = guardedWsDelimSeq(m.keyword("language"), this.langVer, this.eos);
    this.moduleBody = this.statement.zeroOrMore.ast;
    this.module = guardedWsDelimSeq(m.keyword('module'), this.moduleName, '{', this.moduleBody, '}').ast;
    this.file = this.langDecl.opt.then(this.module).ast;
};

// Register the grammar, providing a name and the default parse rule
m.registerGrammar('heron', g, g.file);

export const heronGrammar = m.grammars['heron'];
export const heronParser  = m.parsers['heron'];

export function parseHeron(s: string, r: m.Rule = heronGrammar.file) : HeronAstNode {
    var ast =  r.parse(s);
    if (ast.end != s.length)
        throw new Error("Whole input was not parsed");        
    return ast as HeronAstNode;
}
