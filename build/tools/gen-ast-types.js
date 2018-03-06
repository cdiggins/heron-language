// Returns a string that describes the AST nodes created by this rule.
// Will throw an exception if this is not a valid AST rule (this.isAstRule != true)
astRuleDefn(inSeq, boolean = false, inChoice, boolean = false);
string;
{
    var rules = this.rules.filter(function (r) { return r.createsAstNode; });
    if (!rules.length)
        return this.name;
    if (rules.length == 1) {
        var result = rules[0].astRuleNameOrDefn(inSeq, inChoice);
        if (this instanceof Quantified)
            result += "[" + this.min + "," + this.max + "]";
        return result;
    }
    if (this instanceof Sequence) {
        var tmp = rules.map(function (r) { return r.astRuleNameOrDefn(true, false); }).join(",");
        if (inSeq)
            return tmp;
        return "seq(" + tmp + ")";
    }
    if (this instanceof Choice) {
        var tmp = rules.map(function (r) { return r.astRuleNameOrDefn(false, true); }).join(",");
        if (inChoice)
            return tmp;
        return "choice(" + tmp + ")";
    }
    throw new Error("Internal error: not a valid AST rule");
}
//# sourceMappingURL=gen-ast-types.js.map