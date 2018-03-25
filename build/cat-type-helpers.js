/**
 * This code came from type-system.ts.
//============================================================
// Top level type operations
// - Composition
// - Quotation

// Returns the function type that results by composing two function types
export function composeFunctions(f:PolyType, g:PolyType) : PolyType {
    if (!isFunctionType(f)) throw new Error("Expected a function type for f");
    if (!isFunctionType(g)) throw new Error("Expected a function type for g");
    
    f = f.freshVariableNames(0) as PolyType;
    g = g.freshVariableNames(1) as PolyType;

    if (trace) {
        console.log("f: " + f);
        console.log("g: " + g);
    }

    const inF = functionInput(f);
    const outF = functionOutput(f);
    const inG = functionInput(g);
    const outG = functionOutput(g);

    const e = new TypeResolver();
    e.unifyTypes(outF, inG);
    const input = e.getUnifiedType(inF, [], {});
    const output = e.getUnifiedType(outG, [], {});

    const r = functionType(input, output);
    if (trace) {
        console.log(e.state);
        console.log("Intermediate result: " + r)
    }

    // Recompute parameters.
    r.computeParameters();
    if (trace) {
        console.log("Final result: " + r);
    }
    r = normalizeVarNames(r) as PolyType;
    return r;
}

// Composes a chain of functions
export function composeFunctionChain(fxns:PolyType[]) : PolyType {
    if (fxns.length == 0)
        return idFunction();
    let t = fxns[0];
    for (let i=1; i < fxns.length; ++i)
        t = composeFunctions(t, fxns[i]);
    return t;
}

// Composes a chain of functions in reverse. Should give the same result
export function composeFunctionChainReverse(fxns:PolyType[]) : PolyType {
    if (fxns.length == 0)
        return idFunction();
    let t = fxns[fxns.length - 1];
    for (let i=fxns.length-2; i >= 0; --i)
        t = composeFunctions(fxns[i], t);
    return t;
}

// Creates a function type that generates the given type.
// If given no type returns the empty quotation.
export function quotation(x: Type) : PolyType {
    const row = typeVariable('_');
    x = freshParameterNames(x);
    const r = functionType(row, x ? polyType([x, row]) : row);
    r.computeParameters();
    r = normalizeVarNames(r) as PolyType;
    return r;
}

// Returns the type of the id function
export function idFunction() : PolyType {
    return quotation(null);
}

//================================================================
// Pretty type formatting.

function flattenFunctionIO(t: Type): Type[] {
    if (t instanceof PolyType) {
        return [t.types[0], ...flattenFunctionIO(t.types[1])];
    }
    else {
        return [t];
    }
}

function functionInputToString(t: Type): string {
    return flattenFunctionIO(functionInput(t)).map(typeToString).join(' ')
}

function functionOutputToString(t: Type): string {
    return flattenFunctionIO(functionOutput(t)).map(typeToString).join(' ')
}

export function typeToString(t: Type): string {
    if (isFunctionType(t)) {
        return "(" + functionInputToString(t) + " -> " + functionOutputToString(t) + ")";
    }
    else if (t instanceof TypeVariable) {
        return t.name;
    }
    else if (t instanceof TypeConstant) {
        return t.name;
    }
    else if (t instanceof PolyType) {
        return "[" + t.types.map(typeToString).join(' ') + "]";
    }
}

*/ 
//# sourceMappingURL=cat-type-helpers.js.map