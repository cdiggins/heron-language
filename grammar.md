# Heron Grammar

The following is a formal description of the Heron grammar as Parsing Expression Grammar (PEG).

```
Debugging with legacy protocol because Node.js v6.11.0 was detected.
'C:\Program Files\nodejs\node.exe' --nolazy --debug-brk=13885 tools\gen-grammar.js 
Debugger listening on [::]:13885
heron.additiveExpr <- (heron.additiveExprLeft heron.additiveExprRight*)
heron.additiveExprLeft <- (heron.multiplicativeExprLeft heron.multiplicativeExprRight*)
heron.additiveExprRight <- (heron.ws (heron.additiveOp (heron.ws ((heron.additiveExprLeft / <predicate>) heron.ws))))
heron.additiveOp <- (("+" / "-") !"=")
heron.arrayExpr <- (heron.ws ("[" (heron.ws (((heron.expr ("," (heron.ws heron.expr))*)? / <predicate>) (heron.ws (("]" / <predicate>) heron.ws))))))
heron.arrayIndex <- (heron.ws ("[" (heron.ws (heron.expr (heron.ws (("]" / <predicate>) heron.ws))))))
heron.assignmentExpr <- (heron.assignmentExprLeft heron.assignmentExprRight*)
heron.assignmentExprLeft <- (heron.conditionalExprLeft heron.conditionalExprRight*)
heron.assignmentExprRight <- (heron.ws (heron.assignmentOp (heron.ws ((heron.assignmentExprLeft / <predicate>) heron.ws))))
heron.assignmentOp <- (("+=" / ("-=" / ("*=" / ("/=" / ("%=" / "="))))) !"=")
heron.bool <- (("true" !core.identifierNext) / ("false" !core.identifierNext))
heron.breakStatement <- (heron.ws (("break" !core.identifierNext) (heron.ws ((heron.eos / <predicate>) heron.ws))))
heron.comment <- ((heron.fullComment / heron.lineComment) core.ws)+
heron.compoundStatement <- (heron.ws ("{" (heron.ws ((heron.recStatement* / <predicate>) (heron.ws (("}" / <predicate>) heron.ws))))))
heron.conditionalExpr <- (heron.conditionalExprLeft heron.conditionalExprRight*)
heron.conditionalExprLeft <- (heron.rangeExprLeft heron.rangeExprRight?)
heron.conditionalExprRight <- (heron.ws ("?" (heron.ws ((heron.conditionalExprLeft / <predicate>) (heron.ws ((":" / <predicate>) (heron.ws ((heron.conditionalExprLeft / <predicate>) heron.ws))))))))
heron.continueStatement <- (heron.ws (("continue" !core.identifierNext) (heron.ws ((heron.eos / <predicate>) heron.ws))))
heron.doLoop <- (heron.ws (("do" !core.identifierNext) (heron.ws (heron.recStatement (heron.ws ((("while" !core.identifierNext) / <predicate>) (heron.ws ((heron.loopCond / <predicate>) heron.ws))))))))
heron.doubleQuote <- ("\"" (heron.doubleQuotedStringContents "\""))
heron.doubleQuotedStringContents <- (!"\"" heron.stringLiteralChar)*
heron.elseStatement <- (heron.ws (("else" !core.identifierNext) (heron.ws (heron.recStatement heron.ws))))
heron.emptyStatement <- ";"
heron.eos <- ";"
heron.equalityExpr <- (heron.equalityExprLeft heron.equalityExprRight*)
heron.equalityExprLeft <- (heron.relationalExprLeft heron.relationalExprRight*)
heron.equalityExprRight <- (heron.ws (heron.equalityOp (heron.ws ((heron.equalityExprLeft / <predicate>) heron.ws))))
heron.equalityOp <- ("==" / "!=")
heron.escapeChar <- advanceIf(['\"\\bfnrtv])
heron.escapedLiteralChar <- (advanceIf([\\]) heron.escapeChar)
heron.exponent <- (advanceIf([eE]) (heron.plusOrMinus? core.digits))
heron.expr <- <delay>
heron.exprStatement <- ((heron.expr heron.ws) heron.eos)
heron.fieldSelect <- ("." heron.identifier)
heron.file <- (heron.langDecl? heron.module)
heron.forLoop <- (heron.ws (("for" !core.identifierNext) (heron.ws (("(" / <predicate>) (heron.ws ((("var" !core.identifierNext) / <predicate>) (heron.ws ((heron.identifier / <predicate>) (heron.ws ((("in" !core.identifierNext) / <predicate>) (heron.ws (heron.expr (heron.ws ((")" / <predicate>) (heron.ws (heron.recStatement heron.ws))))))))))))))))
heron.fraction <- ("." (!"." core.digit*))
heron.fullComment <- ("/*" ((advanceIf(!"*/")* "*/") / <predicate>))
heron.funCall <- (heron.ws ("(" (heron.ws (((heron.expr ("," (heron.ws heron.expr))*)? / <predicate>) (heron.ws ((")" / <predicate>) heron.ws))))))
heron.funcBody <- (heron.funcBodyStatement / heron.funcBodyExpr)
heron.funcBodyExpr <- (heron.ws ("=" (heron.ws (heron.expr (heron.ws ((";" / <predicate>) heron.ws))))))
heron.funcBodyStatement <- <delay>
heron.funcDef <- (heron.ws (("function" !core.identifierNext) (heron.ws ((heron.funcName / <predicate>) (heron.ws ((heron.funcParams / <predicate>) (heron.ws ((heron.funcBody / <predicate>) heron.ws))))))))
heron.funcName <- (heron.opName / core.identifier)
heron.funcParam <- (heron.funcParamName heron.funcParamType?)
heron.funcParamName <- (heron.opName / core.identifier)
heron.funcParamType <- (heron.ws (":" (heron.ws ((heron.typeExpr / <predicate>) heron.ws))))
heron.funcParams <- (heron.ws ("(" (heron.ws (((heron.funcParam ("," (heron.ws heron.funcParam))*)? / <predicate>) (heron.ws ((")" / <predicate>) heron.ws))))))
heron.identifier <- (heron.opName / core.identifier)
heron.ifCond <- (heron.ws ("(" (heron.ws (heron.expr (heron.ws ((")" / <predicate>) heron.ws))))))
heron.ifStatement <- (heron.ws (("if" !core.identifierNext) (heron.ws ((heron.ifCond / <predicate>) (heron.ws (heron.recStatement (heron.ws ((heron.elseStatement* / <predicate>) heron.ws))))))))
heron.lambdaArg <- (heron.identifier heron.funcParamType?)
heron.lambdaArgs <- (heron.lambdaArgsNoParen / heron.lambdaArgsWithParen)
heron.lambdaArgsNoParen <- (heron.opName / core.identifier)
heron.lambdaArgsWithParen <- ("(" (heron.ws ((heron.lambdaArg ("," (heron.ws heron.lambdaArg))*)? (")" heron.ws))))
heron.lambdaBody <- (heron.recCompoundStatement / heron.expr)
heron.lambdaExpr <- (heron.lambdaArgs (heron.ws ("=>" (heron.ws ((heron.lambdaBody / <predicate>) heron.ws)))))
heron.langDecl <- (heron.ws (("language" !core.identifierNext) (heron.ws ((heron.langVer / <predicate>) (heron.ws ((heron.eos / <predicate>) heron.ws))))))
heron.langVer <- (heron.urnPart (heron.urnDiv heron.urnPart)*)
heron.leafExpr <- ((heron.varExpr / (heron.objectExpr / (heron.lambdaExpr / (heron.parenExpr / (heron.arrayExpr / (heron.literal / heron.identifier)))))) heron.ws)
heron.lineComment <- ("//" heron.untilEol)
heron.literal <- (heron.number / (heron.bool / heron.string))
heron.logicalAndExpr <- (heron.logicalAndExprLeft heron.logicalAndExprRight*)
heron.logicalAndExprLeft <- (heron.equalityExprLeft heron.equalityExprRight*)
heron.logicalAndExprRight <- (heron.ws (heron.logicalAndOp (heron.ws ((heron.logicalAndExprLeft / <predicate>) heron.ws))))
heron.logicalAndOp <- "&&"
heron.logicalOrExpr <- (heron.logicalOrExprLeft heron.logicalOrExprRight*)
heron.logicalOrExprLeft <- (heron.logicalXOrExprLeft heron.logicalXOrExprRight*)
heron.logicalOrExprRight <- (heron.ws (heron.logicalOrOp (heron.ws ((heron.logicalOrExprLeft / <predicate>) heron.ws))))
heron.logicalOrOp <- "||"
heron.logicalXOrExpr <- (heron.logicalXOrExprLeft heron.logicalXOrExprRight*)
heron.logicalXOrExprLeft <- (heron.logicalAndExprLeft heron.logicalAndExprRight*)
heron.logicalXOrExprRight <- (heron.ws (heron.logicalXOrOp (heron.ws ((heron.logicalXOrExprLeft / <predicate>) heron.ws))))
heron.logicalXOrOp <- "^^"
heron.loopCond <- (heron.ws ("(" (heron.ws (heron.expr (heron.ws ((")" / <predicate>) heron.ws))))))
heron.module <- (heron.ws (("module" !core.identifierNext) (heron.ws ((heron.moduleName / <predicate>) (heron.ws (("{" / <predicate>) (heron.ws ((heron.moduleBody / <predicate>) (heron.ws (("}" / <predicate>) heron.ws))))))))))
heron.moduleBody <- heron.statement*
heron.moduleName <- (heron.urnPart (heron.urnDiv heron.urnPart)*)
heron.multiplicativeExpr <- (heron.multiplicativeExprLeft heron.multiplicativeExprRight*)
heron.multiplicativeExprLeft <- (heron.prefixOp* heron.postfixExpr)
heron.multiplicativeExprRight <- (heron.ws (heron.multiplicativeOp (heron.ws ((heron.multiplicativeExprLeft / <predicate>) heron.ws))))
heron.multiplicativeOp <- (("*" / ("/" / "%")) !"=")
heron.number <- (heron.plusOrMinus? (core.integer (heron.fraction? heron.exponent?)))
heron.objectExpr <- (heron.ws ("{" (heron.ws ((heron.objectField* / <predicate>) (heron.ws (("}" / <predicate>) heron.ws))))))
heron.objectField <- (heron.ws (heron.identifier (heron.ws (("=" / <predicate>) (heron.ws (heron.expr (heron.ws ((";" / <predicate>) heron.ws))))))))
heron.opName <- ("op" heron.opSymbol+)
heron.opSymbol <- advanceIf([<>=+-*/%^|&$!])
heron.parenExpr <- (heron.ws ("(" (heron.ws (heron.expr (heron.ws ((")" / <predicate>) heron.ws))))))
heron.plusOrMinus <- advanceIf([+-])
heron.postDecOp <- "--"
heron.postIncOp <- "++"
heron.postfixExpr <- (heron.leafExpr heron.postfixOp*)
heron.postfixOp <- ((heron.funCall / (heron.arrayIndex / (heron.fieldSelect / (heron.postIncOp / heron.postDecOp)))) heron.ws)
heron.prefixExpr <- (heron.prefixOp* heron.postfixExpr)
heron.prefixOp <- (("++" / ("--" / ("+" / ("-" / "!")))) !"=")
heron.rangeExpr <- (heron.rangeExprLeft heron.rangeExprRight?)
heron.rangeExprLeft <- (heron.logicalOrExprLeft heron.logicalOrExprRight*)
heron.rangeExprRight <- (heron.ws (".." (heron.ws ((heron.rangeExprLeft / <predicate>) heron.ws))))
heron.recCompoundStatement <- <delay>
heron.recStatement <- <delay>
heron.recType <- <delay>
heron.relationalExpr <- (heron.relationalExprLeft heron.relationalExprRight*)
heron.relationalExprLeft <- (heron.additiveExprLeft heron.additiveExprRight*)
heron.relationalExprRight <- (heron.ws (heron.relationalOp (heron.ws ((heron.relationalExprLeft / <predicate>) heron.ws))))
heron.relationalOp <- ("<=" / (">=" / ("<" / ">")))
heron.returnStatement <- (heron.ws (("return" !core.identifierNext) (heron.ws ((heron.expr? / <predicate>) (heron.ws ((heron.eos / <predicate>) heron.ws))))))
heron.singleQuote <- ("'" (heron.singleQuotedStringContents "'"))
heron.singleQuotedStringContents <- (!"'" heron.stringLiteralChar)*
heron.statement <- ((heron.emptyStatement / (heron.compoundStatement / (heron.ifStatement / (heron.returnStatement / (heron.continueStatement / (heron.breakStatement / (heron.forLoop / (heron.doLoop / (heron.whileLoop / (heron.varDeclStatement / (heron.funcDef / heron.exprStatement))))))))))) heron.ws)
heron.string <- (heron.doubleQuote / heron.singleQuote)
heron.stringLiteralChar <- (advanceIf(![\\\r  \n\\]) / heron.escapedLiteralChar)
heron.typeExpr <- (heron.typeName heron.typeParamList?)
heron.typeName <- (heron.opName / core.identifier)
heron.typeParam <- <delay>
heron.typeParamList <- (heron.ws ("<" (heron.ws (((heron.typeParam ("," (heron.ws heron.typeParam))*)? / <predicate>) (heron.ws ((">" / <predicate>) heron.ws))))))
heron.untilEol <- (advanceIf(!(core.end / core.newLine))* advanceIf(!core.end))
heron.urn <- (heron.urnPart (heron.urnDiv heron.urnPart)*)
heron.urnDiv <- ":"
heron.urnPart <- advanceIf((core.atAlphaNumeric / [.-]))*
heron.varDecl <- (heron.varNameDecl heron.varInitialization)
heron.varDeclStatement <- (heron.ws (("var" !core.identifierNext) (heron.ws ((heron.varDecls / <predicate>) (heron.ws ((heron.eos / <predicate>) heron.ws))))))
heron.varDecls <- (heron.varDecl (heron.ws ("," (heron.ws ((heron.varDecl / <predicate>) heron.ws))))*)
heron.varExpr <- (heron.ws (("var" !core.identifierNext) (heron.ws ((heron.varDecls / <predicate>) (heron.ws ((("in" !core.identifierNext) / <predicate>) (heron.ws (heron.expr heron.ws))))))))
heron.varInitialization <- (heron.ws ("=" (heron.ws (heron.expr heron.ws))))
heron.varNameDecl <- (heron.opName / core.identifier)
heron.whileLoop <- (heron.ws (("while" !core.identifierNext) (heron.ws ((heron.loopCond / <predicate>) (heron.ws (heron.recStatement heron.ws))))))
heron.ws <- (heron.comment / core.ws)
```