# Heron Specification 1.0.0-alpha.1

## AST Schema

This is the schema of the abstract syntax tree (AST) created when
when parsing Heron with the [Myna parser](https://github.com/cdiggins/myna-parser)
prior to any transformations

```
additiveExpr <- seq(additiveExprLeft,additiveExprRight[0,Infinity])
additiveExprLeft <- multiplicativeExpr
additiveExprRight <- seq(additiveOp,additiveExprLeft)
additiveOp <- additiveOp
arrayExpr <- seq(expr,expr[0,Infinity])[0,1]
arrayIndex <- expr
assignmentExpr <- seq(assignmentExprLeft,assignmentExprRight[0,Infinity])
assignmentExprLeft <- conditionalExpr
assignmentExprRight <- seq(assignmentOp,assignmentExprLeft)
assignmentOp <- assignmentOp
bool <- bool
breakStatement <- breakStatement
compoundStatement <- recStatement[0,Infinity]
conditionalExpr <- seq(conditionalExprLeft,conditionalExprRight[0,Infinity])
conditionalExprLeft <- rangeExpr
conditionalExprRight <- seq(conditionalExprLeft,conditionalExprLeft)
continueStatement <- continueStatement
doLoop <- seq(recStatement,loopCond)
doubleQuotedStringContents <- stringLiteralChar[0,Infinity]
elseStatement <- recStatement
emptyStatement <- emptyStatement
equalityExpr <- seq(equalityExprLeft,equalityExprRight[0,Infinity])
equalityExprLeft <- relationalExpr
equalityExprRight <- seq(equalityOp,equalityExprLeft)
equalityOp <- equalityOp
exprStatement <- expr
fieldSelect <- identifier
file <- seq(langDecl[0,1],moduleName,moduleBody)
forLoop <- seq(identifier,expr,recStatement)
funCall <- seq(expr,expr[0,Infinity])[0,1]
funcBody <- choice(funcBodyStatement,funcBodyExpr)
funcBodyExpr <- expr
funcBodyStatement <- recCompoundStatement
funcDef <- seq(funcName,genericParams,funcParams,funcBody)
funcName <- identifier
funcParam <- seq(funcParamName,typeExpr[0,1])
funcParamName <- identifier
funcParams <- seq(funcParam,funcParam[0,Infinity])[0,1]
genericConstraint <- typeExpr
genericParam <- seq(identifier,genericConstraint[0,1])
genericParams <- seq(genericParam,genericParam[0,Infinity])[0,1][0,1]
identifier <- opName
ifCond <- expr
ifStatement <- seq(ifCond,recStatement,elseStatement[0,Infinity])
intrinsicDef <- seq(funcName,genericParams,funcParams)
lambdaArg <- seq(identifier,typeExpr[0,1])
lambdaArgs <- choice(lambdaArgsNoParen,lambdaArgsWithParen)
lambdaArgsNoParen <- identifier
lambdaArgsWithParen <- seq(lambdaArg,lambdaArg[0,Infinity])[0,1]
lambdaBody <- choice(recCompoundStatement,expr)
lambdaExpr <- seq(lambdaArgs,lambdaBody)
langDecl <- langVer
langVer <- urn
leafExpr <- choice(varExpr,objectExpr,lambdaExpr,parenExpr,arrayExpr,number,bool,string,identifier)
logicalAndExpr <- seq(logicalAndExprLeft,logicalAndExprRight[0,Infinity])
logicalAndExprLeft <- equalityExpr
logicalAndExprRight <- seq(logicalAndOp,logicalAndExprLeft)
logicalAndOp <- logicalAndOp
logicalOrExpr <- seq(logicalOrExprLeft,logicalOrExprRight[0,Infinity])
logicalOrExprLeft <- logicalXOrExpr
logicalOrExprRight <- seq(logicalOrOp,logicalOrExprLeft)
logicalOrOp <- logicalOrOp
logicalXOrExpr <- seq(logicalXOrExprLeft,logicalXOrExprRight[0,Infinity])
logicalXOrExprLeft <- logicalAndExpr
logicalXOrExprRight <- seq(logicalXOrOp,logicalXOrExprLeft)
logicalXOrOp <- logicalXOrOp
loopCond <- expr
moduleBody <- statement[0,Infinity]
moduleName <- urn
multiplicativeExpr <- seq(multiplicativeExprLeft,multiplicativeExprRight[0,Infinity])
multiplicativeExprLeft <- prefixExpr
multiplicativeExprRight <- seq(multiplicativeOp,multiplicativeExprLeft)
multiplicativeOp <- multiplicativeOp
number <- number
objectExpr <- objectField[0,Infinity]
objectField <- seq(identifier,expr)
opName <- opName
parenExpr <- expr
postDecOp <- postDecOp
postIncOp <- postIncOp  
postfixExpr <- seq(leafExpr,choice(funCall,arrayIndex,fieldSelect,postIncOp,postDecOp)[0,Infinity])
prefixExpr <- seq(prefixOp[0,Infinity],postfixExpr)
prefixOp <- prefixOp
rangeExpr <- seq(rangeExprLeft,rangeExprRight[0,1])
rangeExprLeft <- logicalOrExpr
rangeExprRight <- rangeExprLeft
recCompoundStatement <- 
relationalExpr <- seq(relationalExprLeft,relationalExprRight[0,Infinity])
relationalExprLeft <- additiveExpr
relationalExprRight <- seq(relationalOp,relationalExprLeft)
relationalOp <- relationalOp
returnStatement <- expr[0,1]
singleQuotedStringContents <- stringLiteralChar[0,Infinity]
statement <- choice(emptyStatement,compoundStatement,ifStatement,returnStatement,continueStatement,breakStatement,forLoop,doLoop,whileLoop,varDeclStatement,funcDef,intrinsicDef,exprStatement)
string <- choice(doubleQuotedStringContents,singleQuotedStringContents)
stringLiteralChar <- stringLiteralChar
typeExpr <- seq(typeName,typeParamList[0,1])
typeName <- identifier
typeParam <- recType
typeParamList <- seq(typeParam,typeParam[0,Infinity])[0,1]
urn <- seq(urnPart,urnPart[0,Infinity])
urnPart <- urnPart
varDecl <- seq(varNameDecl,varInitialization)
varDeclStatement <- varDecls
varDecls <- seq(varDecl,varDecl[0,Infinity])
varExpr <- seq(varDecls,expr)
varInitialization <- expr
varNameDecl <- identifier
whileLoop <- seq(loopCond,recStatement)
```

## PEG Grammar

This is the full grammar for Heron in PEG form. 
Alternatively you can view the [source code for the parser](https://github.com/cdiggins/heron-language/blob/master/src/heron-parser.ts)

```
heron.additiveExpr <- AstRule((heron.additiveExprLeft heron.additiveExprRight*))
heron.additiveExprLeft <- AstRule(heron.multiplicativeExpr)
heron.additiveExprRight <- AstRule((heron.ws (heron.additiveOp (heron.ws ((heron.additiveExprLeft / <predicate>) heron.ws)))))
heron.additiveOp <- AstRule((("+" / "-") !"="))
heron.arrayExpr <- AstRule((heron.ws ("[" (heron.ws (((heron.expr ("," (heron.ws heron.expr))*)? / <predicate>) (heron.ws (("]" / <predicate>) heron.ws)))))))
heron.arrayIndex <- AstRule((heron.ws ("[" (heron.ws (heron.expr (heron.ws (("]" / <predicate>) heron.ws)))))))
heron.asType <- (heron.ws (("as" !core.identifierNext) (heron.ws ((heron.typeExpr / <predicate>) heron.ws))))
heron.assignmentExpr <- AstRule((heron.assignmentExprLeft heron.assignmentExprRight*))
heron.assignmentExprLeft <- AstRule(heron.conditionalExpr)
heron.assignmentExprRight <- AstRule((heron.ws (heron.assignmentOp (heron.ws ((heron.assignmentExprLeft / <predicate>) heron.ws)))))
heron.assignmentOp <- AstRule((("+=" / ("-=" / ("*=" / ("/=" / ("%=" / "="))))) !"="))
heron.bool <- AstRule((("true" !core.identifierNext) / ("false" !core.identifierNext)))
heron.breakStatement <- AstRule((heron.ws (("break" !core.identifierNext) (heron.ws ((heron.eos / <predicate>) heron.ws)))))
heron.comment <- ((heron.fullComment / heron.lineComment) core.ws)+
heron.compoundStatement <- AstRule((heron.ws ("{" (heron.ws ((heron.recStatement* / <predicate>) (heron.ws (("}" / <predicate>) heron.ws)))))))
heron.conditionalExpr <- AstRule((heron.conditionalExprLeft heron.conditionalExprRight*))
heron.conditionalExprLeft <- AstRule(heron.rangeExpr)
heron.conditionalExprRight <- AstRule((heron.ws ("?" (heron.ws ((heron.conditionalExprLeft / <predicate>) (heron.ws ((":" / <predicate>) (heron.ws ((heron.conditionalExprLeft / <predicate>) heron.ws)))))))))
heron.continueStatement <- AstRule((heron.ws (("continue" !core.identifierNext) (heron.ws ((heron.eos / <predicate>) heron.ws)))))
heron.doLoop <- AstRule((heron.ws (("do" !core.identifierNext) (heron.ws (heron.recStatement (heron.ws ((("while" !core.identifierNext) / <predicate>) (heron.ws ((heron.loopCond / <predicate>) heron.ws)))))))))
heron.doubleQuote <- ("\"" (heron.doubleQuotedStringContents "\""))
heron.doubleQuotedStringContents <- AstRule((!"\"" heron.stringLiteralChar)*)
heron.elseStatement <- AstRule((heron.ws (("else" !core.identifierNext) (heron.ws (heron.recStatement heron.ws)))))
heron.emptyStatement <- AstRule(heron.eos)
heron.eos <- ";"
heron.equalityExpr <- AstRule((heron.equalityExprLeft heron.equalityExprRight*))
heron.equalityExprLeft <- AstRule(heron.relationalExpr)
heron.equalityExprRight <- AstRule((heron.ws (heron.equalityOp (heron.ws ((heron.equalityExprLeft / <predicate>) heron.ws)))))
heron.equalityOp <- AstRule(("==" / "!="))
heron.escapeChar <- advanceIf(['\"\\bfnrtv])
heron.escapedLiteralChar <- (advanceIf([\\]) heron.escapeChar)
heron.exponent <- (advanceIf([eE]) (heron.plusOrMinus? core.digits))
heron.expr <- <delay>
heron.exprStatement <- AstRule(((heron.expr heron.ws) heron.eos))
heron.fieldSelect <- AstRule(("." heron.identifier))
heron.file <- AstRule((heron.langDecl? heron.module))
heron.forLoop <- AstRule((heron.ws (("for" !core.identifierNext) (heron.ws (("(" / <predicate>) (heron.ws ((("var" !core.identifierNext) / <predicate>) (heron.ws ((heron.identifier / <predicate>) (heron.ws ((("in" !core.identifierNext) / <predicate>) (heron.ws (heron.expr (heron.ws ((")" / <predicate>) (heron.ws (heron.recStatement heron.ws)))))))))))))))))
heron.fraction <- ("." (!"." core.digit*))
heron.fullComment <- ("/*" ((advanceIf(!"*/")* "*/") / <predicate>))
heron.funCall <- AstRule((heron.ws ("(" (heron.ws (((heron.expr ("," (heron.ws heron.expr))*)? / <predicate>) (heron.ws ((")" / <predicate>) heron.ws)))))))
heron.funcBody <- AstRule((heron.funcBodyStatement / heron.funcBodyExpr))
heron.funcBodyExpr <- AstRule((heron.ws ("=" (heron.ws (heron.expr (heron.ws ((";" / <predicate>) heron.ws)))))))
heron.funcBodyStatement <- AstRule(heron.recCompoundStatement)
heron.funcDef <- AstRule((heron.ws (("function" !core.identifierNext) (heron.ws ((heron.funcName / <predicate>) (heron.ws ((heron.genericParams / <predicate>) (heron.ws ((heron.funcParams / <predicate>) (heron.ws ((heron.funcBody / <predicate>) heron.ws)))))))))))
heron.funcName <- AstRule(heron.identifier)
heron.funcParam <- AstRule((heron.funcParamName heron.funcParamType?))
heron.funcParamName <- AstRule(heron.identifier)
heron.funcParamType <- (heron.ws (":" (heron.ws ((heron.typeExpr / <predicate>) heron.ws))))
heron.funcParams <- AstRule((heron.ws ("(" (heron.ws (((heron.funcParam ("," (heron.ws heron.funcParam))*)? / <predicate>) (heron.ws ((")" / <predicate>) heron.ws)))))))
heron.genericConstraint <- AstRule((heron.ws (":" (heron.ws ((heron.typeExpr / <predicate>) heron.ws)))))
heron.genericParam <- AstRule((heron.identifier heron.genericConstraint?))
heron.genericParams <- AstRule((heron.ws ("<" (heron.ws (((heron.genericParam ("," (heron.ws heron.genericParam))*)? / <predicate>) (heron.ws ((">" / <predicate>) heron.ws))))))?)
heron.identifier <- AstRule((heron.opName / core.identifier))
heron.ifCond <- AstRule((heron.ws ("(" (heron.ws (heron.expr (heron.ws ((")" / <predicate>) heron.ws)))))))
heron.ifStatement <- AstRule((heron.ws (("if" !core.identifierNext) (heron.ws ((heron.ifCond / <predicate>) (heron.ws (heron.recStatement (heron.ws ((heron.elseStatement* / <predicate>) heron.ws)))))))))
heron.intrinsicDef <- AstRule((heron.ws (("intrinsic" !core.identifierNext) (heron.ws ((heron.funcName / <predicate>) (heron.ws ((heron.genericParams / <predicate>) (heron.ws ((heron.funcParams / <predicate>) (heron.ws ((";" / <predicate>) heron.ws)))))))))))
heron.lambdaArg <- AstRule((heron.identifier heron.funcParamType?))
heron.lambdaArgs <- AstRule((heron.lambdaArgsNoParen / heron.lambdaArgsWithParen))
heron.lambdaArgsNoParen <- AstRule(heron.identifier)
heron.lambdaArgsWithParen <- AstRule(("(" (heron.ws ((heron.lambdaArg ("," (heron.ws heron.lambdaArg))*)? (")" heron.ws)))))
heron.lambdaBody <- AstRule((heron.recCompoundStatement / heron.expr))
heron.lambdaExpr <- AstRule((heron.lambdaArgs (heron.ws ("=>" (heron.ws ((heron.lambdaBody / <predicate>) heron.ws))))))
heron.langDecl <- AstRule((heron.ws (("language" !core.identifierNext) (heron.ws ((heron.langVer / <predicate>) (heron.ws ((heron.eos / <predicate>) heron.ws)))))))
heron.langVer <- AstRule(heron.urn)
heron.leafExpr <- AstRule(((heron.varExpr / (heron.objectExpr / (heron.lambdaExpr / (heron.parenExpr / (heron.arrayExpr / (heron.literal / heron.identifier)))))) heron.ws))
heron.lineComment <- ("//" heron.untilEol)
heron.literal <- (heron.number / (heron.bool / heron.string))
heron.logicalAndExpr <- AstRule((heron.logicalAndExprLeft heron.logicalAndExprRight*))
heron.logicalAndExprLeft <- AstRule(heron.equalityExpr)
heron.logicalAndExprRight <- AstRule((heron.ws (heron.logicalAndOp (heron.ws ((heron.logicalAndExprLeft / <predicate>) heron.ws)))))
heron.logicalAndOp <- AstRule("&&")
heron.logicalOrExpr <- AstRule((heron.logicalOrExprLeft heron.logicalOrExprRight*))
heron.logicalOrExprLeft <- AstRule(heron.logicalXOrExpr)
heron.logicalOrExprRight <- AstRule((heron.ws (heron.logicalOrOp (heron.ws ((heron.logicalOrExprLeft / <predicate>) heron.ws)))))
heron.logicalOrOp <- AstRule("||")
heron.logicalXOrExpr <- AstRule((heron.logicalXOrExprLeft heron.logicalXOrExprRight*))
heron.logicalXOrExprLeft <- AstRule(heron.logicalAndExpr)
heron.logicalXOrExprRight <- AstRule((heron.ws (heron.logicalXOrOp (heron.ws ((heron.logicalXOrExprLeft / <predicate>) heron.ws)))))
heron.logicalXOrOp <- AstRule("^^")
heron.loopCond <- AstRule((heron.ws ("(" (heron.ws (heron.expr (heron.ws ((")" / <predicate>) heron.ws)))))))
heron.module <- (heron.ws (("module" !core.identifierNext) (heron.ws ((heron.moduleName / <predicate>) (heron.ws (("{" / <predicate>) (heron.ws ((heron.moduleBody / <predicate>) (heron.ws (("}" / <predicate>) heron.ws))))))))))
heron.moduleBody <- AstRule(heron.statement*)
heron.moduleName <- AstRule(heron.urn)
heron.multiplicativeExpr <- AstRule((heron.multiplicativeExprLeft heron.multiplicativeExprRight*))
heron.multiplicativeExprLeft <- AstRule(heron.prefixExpr)
heron.multiplicativeExprRight <- AstRule((heron.ws (heron.multiplicativeOp (heron.ws ((heron.multiplicativeExprLeft / <predicate>) heron.ws)))))
heron.multiplicativeOp <- AstRule((("*" / ("/" / "%")) !"="))
heron.number <- AstRule((heron.plusOrMinus? (core.integer (heron.fraction? heron.exponent?))))
heron.objectExpr <- AstRule((heron.ws ("{" (heron.ws ((heron.objectField* / <predicate>) (heron.ws (("}" / <predicate>) heron.ws)))))))
heron.objectField <- AstRule((heron.ws (heron.identifier (heron.ws (("=" / <predicate>) (heron.ws (heron.expr (heron.ws ((";" / <predicate>) heron.ws)))))))))
heron.opName <- AstRule(("op" heron.opSymbol+))
heron.opSymbol <- advanceIf([<>=+-*/%^|&$!])
heron.parenExpr <- AstRule((heron.ws ("(" (heron.ws (heron.expr (heron.ws ((")" / <predicate>) heron.ws)))))))
heron.plusOrMinus <- advanceIf([+-])
heron.postDecOp <- AstRule("--")
heron.postIncOp <- AstRule("++")
heron.postfixExpr <- AstRule((heron.leafExpr heron.postfixOp*))
heron.postfixOp <- ((heron.funCall / (heron.arrayIndex / (heron.fieldSelect / (heron.postIncOp / heron.postDecOp)))) heron.ws)
heron.prefixExpr <- AstRule((heron.prefixOp* heron.postfixExpr))
heron.prefixOp <- AstRule((("++" / ("--" / ("+" / ("-" / "!")))) !"="))
heron.rangeExpr <- AstRule((heron.rangeExprLeft heron.rangeExprRight?))
heron.rangeExprLeft <- AstRule(heron.logicalOrExpr)
heron.rangeExprRight <- AstRule((heron.ws (".." (heron.ws ((heron.rangeExprLeft / <predicate>) heron.ws)))))
heron.recCompoundStatement <- AstRule(<delay>)
heron.recStatement <- <delay>
heron.recType <- <delay>
heron.relationalExpr <- AstRule((heron.relationalExprLeft heron.relationalExprRight*))
heron.relationalExprLeft <- AstRule(heron.additiveExpr)
heron.relationalExprRight <- AstRule((heron.ws (heron.relationalOp (heron.ws ((heron.relationalExprLeft / <predicate>) heron.ws)))))
heron.relationalOp <- AstRule(("<=" / (">=" / ("<" / ">"))))
heron.returnStatement <- AstRule((heron.ws (("return" !core.identifierNext) (heron.ws ((heron.expr? / <predicate>) (heron.ws ((heron.eos / <predicate>) heron.ws)))))))
heron.singleQuote <- ("'" (heron.singleQuotedStringContents "'"))
heron.singleQuotedStringContents <- AstRule((!"'" heron.stringLiteralChar)*)
heron.statement <- AstRule(((heron.emptyStatement / (heron.compoundStatement / (heron.ifStatement / (heron.returnStatement / (heron.continueStatement / (heron.breakStatement / (heron.forLoop / (heron.doLoop / (heron.whileLoop / (heron.varDeclStatement / (heron.funcDef / (heron.intrinsicDef / heron.exprStatement)))))))))))) heron.ws))
heron.string <- AstRule((heron.doubleQuote / heron.singleQuote))
heron.stringLiteralChar <- AstRule((advanceIf(![\\\r  \n\\]) / heron.escapedLiteralChar))
heron.typeExpr <- AstRule((heron.typeName heron.typeParamList?))
heron.typeName <- AstRule(heron.identifier)
heron.typeParam <- AstRule(heron.recType)
heron.typeParamList <- AstRule((heron.ws ("<" (heron.ws (((heron.typeParam ("," (heron.ws heron.typeParam))*)? / <predicate>) (heron.ws ((">" / <predicate>) heron.ws)))))))
heron.untilEol <- (advanceIf(!(core.end / core.newLine))* advanceIf(!core.end))
heron.urn <- AstRule((heron.urnPart (heron.urnDiv heron.urnPart)*))
heron.urnDiv <- ":"
heron.urnPart <- AstRule(advanceIf((core.atAlphaNumeric / [.-]))*)
heron.varDecl <- AstRule((heron.varNameDecl heron.varInitialization))
heron.varDeclStatement <- AstRule((heron.ws (("var" !core.identifierNext) (heron.ws ((heron.varDecls / <predicate>) (heron.ws ((heron.eos / <predicate>) heron.ws)))))))
heron.varDecls <- AstRule((heron.varDecl (heron.ws ("," (heron.ws ((heron.varDecl / <predicate>) heron.ws))))*))
heron.varExpr <- AstRule((heron.ws (("var" !core.identifierNext) (heron.ws ((heron.varDecls / <predicate>) (heron.ws ((("in" !core.identifierNext) / <predicate>) (heron.ws (heron.expr heron.ws)))))))))
heron.varInitialization <- AstRule((heron.ws ("=" (heron.ws (heron.expr heron.ws)))))
heron.varNameDecl <- AstRule(heron.identifier)
heron.whileLoop <- AstRule((heron.ws (("while" !core.identifierNext) (heron.ws ((heron.loopCond / <predicate>) (heron.ws (heron.recStatement heron.ws)))))))
heron.ws <- (heron.comment / core.ws)
```