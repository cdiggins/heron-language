/**
 * Heron Normal Form (HNF)
 *
 * An intermediate compiler representation for optimization, transformation, code-generation,
 * analysis, and evaluation.
 *
 * Expression ::=
 *   | Non-function (Bool, Int, Float, String, etc.)
 *   | Function
 *   | Function Set (Array of possible functions)
 *   | Closure (Function + Closure record)
 *   | Free variable (reference to entry in closure record)
 *   | Parameter (bound variable)
 *   | Function call (Function + Array of Expressions)
 *   | Condition ( Expression ? Expression : Expression )
 *
 * Other intermediate forms to look at:
 * * https://en.wikipedia.org/wiki/A-normal_form.
 * * https://en.wikipedia.org/wiki/Static_single_assignment_form
 * * https://en.wikipedia.org/wiki/Continuation-passing_style
 */
//# sourceMappingURL=heron-normal-form.js.map