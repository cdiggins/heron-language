// A Type Inference Algorithm that provides support for full inference 
// of non-recursive higher rank polymorphic types.
//
// Copyright 2017 by Christopher Diggins 
// Licensed under the MIT License

let trace = false;

/** Turn on debug tracing */
export function setTrace(b: boolean) {
    trace = b;
}

//=========================================
// Helper interfaces 

/** Generic lookup type. */
export interface Lookup<T> { [_:string]:T };

/** Associates type names with type expressions */
export interface Types extends Lookup<Type> { } 

/** Associates type variables names with type expressions. This is used 
 * for tracking which PolyType has the universal quantification.
 * In effect this is like the parameters to a function.  
 */
export interface TypeScheme extends Lookup<TypeVariable> { }

/** Called when the type unfiication process fails.  */
export class TypeUnificationError extends Error {
    constructor(
        public readonly u: TypeResolver, 
        public readonly a: Type, 
        public readonly b: Type, 
        public readonly msg: string = "") 
    {
        super("Unification failed between type " + a + " and " + b + " " + msg)
    }
}

//=========================================
// Classes that represent kinds of types  

/** Base class of a type: either a PolyType, TypeVariable, or TypeConstant */
export class Type {  }

/** A collection of a fixed number of types can be used to represent function types or tuple types. 
 * A list of types is usually encoded as a nested set of type pairs (PolyTypes with two elements).
 * The scheme is a list of universally quantified variables. 
 */
export class PolyType extends Type
{
    // Type schemes have to be manually computed. 
    public scheme: TypeScheme = {};

    constructor(
        public readonly types: Type[])
    { 
        super(); 
    }

    get typeSchemeString(): string {
        const r = values(this.scheme).join("!");
        return r ?  "!" + r + "." : r;
    }

    toString(): string {
        return this.typeSchemeString + "(" + this.types.join(" ") + ")";
    }
}

/** A MonoType is either a Type variable or a type constant: not a PolyType. */
export class MonoType extends Type 
{ 
    constructor(public readonly name : string) { super(); }
    get _str(): string { return this.toString(); }
}

/** A type variable is used for generics (e.g. T0, TR). 
 * The type variable must belong to a type scheme of a polytype. This is like a "scope" for type variables.
 * Computing the type schema is done in an external function.
 */
export class TypeVariable extends MonoType
{
    constructor(name : string) { super(name); }
    toString() : string { return "'" + this.name; }
}

/** A type constant is a fixed type (e.g. int, function). . */
export class TypeConstant extends MonoType
{
    constructor(name : string) { super(name); }
    toString() : string { return this.name;}
}

//================================================
// A classes used to implement unification.

/** Find a unified type. */
export class TypeResolver
{
    /* Given a type variable name find the unifier. Multiple type variables will map to the same unifier. */
    readonly unifiers : Lookup<Type> = {};

    /** The consumer of the class has to provide a startegy for choosing the best unifier 
     * when the unifier encounters different type constants. Examples strategies are: 
     * - throw an error. 
     * - see if one is a sub-type of another
     * - look for an appropriate type-cast
     * This is a great place to add logging as well, to have insights into the unification process. 
     */
    constructor(
        public readonly chooseTypeStrategy: (a: TypeConstant, b: TypeConstant) => TypeConstant)
    { }

    /** Unify both types, returning the most specific type possible. 
     * When a type variable is unified with something the new unifier is stored. 
     * - Constants are preferred over lists and variables
     * - Lists are preferred over variables
     * - Given two variables, the first one is chosen. 
     * - given two different constants, the unifier uses the provided strategy
     */
    unifyTypes(t1:Type, t2:Type, depth:number=0) : Type {            
        if (!t1 || !t2) 
            throw new Error("Missing type expression");
        if (t1 === t2)
            return t1;

        if (t1 instanceof TypeVariable) 
        {
            return this._updateUnifier(t1, t2, depth);
        }
        else if (t2 instanceof TypeVariable) 
        {
            return this._updateUnifier(t2, t1, depth);
        }
        else if (t1 instanceof TypeConstant && t2 instanceof TypeConstant)
        {
            if (t1.name != t2.name)            
                return this.chooseTypeStrategy(t1, t2);
            return t1;
        }
        else if (t1 instanceof TypeConstant || t2 instanceof TypeConstant)
        {
            throw new TypeUnificationError(this, t1, t2);
        }
        else if (t1 instanceof PolyType && t2 instanceof PolyType)
        {             
            return this._unifyLists(t1, t2, depth+1);
        }
        assert(false, "unexpected code path: " + t1 + " and " + t2);
    }
        
    /** Debug function that dumps prints out a representation of the engine state. */
    get state() : string {
        const results = [];
        for (const k in this.unifiers) {
            const u = this.unifiers[k];
            results.push(`type unifier for ${ k } is type ${u}`);
        }
        return results.join('\n');
    }             

    /** Given a type variable, will return the unifier for it. */
    getUnifier(v: TypeVariable) {
        return (v.name in this.unifiers)
            ? freshParameterNames(this.unifiers[v.name])
            : v;
    }

    /** Returns a unified version of the type. 
     * TODO: check for and handle recursion.     
    */
    getUnifiedType(expr:Type, seenVars: Lookup<number> = {}, depth=0) : Type {
        if (expr instanceof TypeConstant) 
            return expr;
        else if (expr instanceof TypeVariable) {
            if (expr.name in seenVars)
                return recursiveType(depth - seenVars[expr.name])
            seenVars = {...seenVars, [expr.name]: depth };
            if (expr.name in this.unifiers) {
                const u = this.unifiers[expr.name];
                if (u instanceof TypeVariable) 
                    return u;
                else if (u instanceof TypeConstant) 
                    return u;
                else if (u instanceof PolyType)
                    return this.getUnifiedType(u, seenVars, depth + 1);
            }
            else {
                return expr;
            }
        }
        else if (expr instanceof PolyType) {
            return clone(expr, v => this.getUnifiedType(v, seenVars, depth));
        }
    }

    /** Choose one of two unifiers, or continue the unification process if necessary */
    _chooseBestUnifier(t1:Type, t2:Type, depth:number) : Type {
        if (t1 instanceof TypeVariable && t2 instanceof TypeVariable)
            return t1;
        else if (t1 instanceof TypeVariable)
            return t2;
        else if (t2 instanceof TypeVariable)
            return t1;
        else 
            return this.unifyTypes(t1, t2, depth+1);
    }

    /** Unifying lists involves unifying each element. */
    _unifyLists(list1:PolyType, list2:PolyType, depth:number) : PolyType {
        if (list1.types.length != list2.types.length) 
            throw new Error("Cannot unify differently sized lists: " + list1 + " and " + list2);
        const rtypes : Type[] = [];
        for (let i=0; i < list1.types.length; ++i)
            rtypes.push(this.unifyTypes(list1.types[i], list2.types[i], depth));
        // TODO: this might not doing the correct thing w.r.t. schameas. 
        // Both lists have their own scheme. I know that the types are effcecitvely equivalent.
        // By keeping just one, I know that it is has its computed schem kept intact. 
        return list1;
    }

    /** All unifiers that refer to varName as the unifier are pointed to the new unifier. */ 
    _updateVariableUnifiers(t:Type, u:Type) {                    
        if (!(t instanceof TypeVariable))
            return;
        const name = t.name;
        for (const x in this.unifiers) 
            if (isTypeVariable(this.unifiers[x], name))
                this.unifiers[x] = u;
        this.unifiers[name] = u;
    }    
    
    /**
     * Computes the best unifier between the current unifier and the new variable.        
     * Updates all unifiers which point to a (or to t if t is a TypeVar) to use the new type.
     */ 
    _updateUnifier(a:TypeVariable, t:Type, depth:number) : Type {            
        const u = this._getOrCreateUnifier(a); 
        const v = (t instanceof TypeVariable) ? this._getOrCreateUnifier(t) : t;

        // Choise the best unifier 
        const best = this._chooseBestUnifier(u, v, depth);

        // Each of these is potentially a type variable, and should point to the new best unifier    
        this._updateVariableUnifiers(a, best);
        this._updateVariableUnifiers(t, best);
        this._updateVariableUnifiers(u, best);
        this._updateVariableUnifiers(v, best);
        
        return best;            
    }

    /** Returns the type unifier for a type variable, creating it if it doesn't exist. */
    _getOrCreateUnifier(t : TypeVariable) : Type {
        return this.unifiers[t.name] || (this.unifiers[t.name] = t);
    }
}

//======================================================================================
// Helper functions 

/** Creates a type list as nested pairs ("cons" cells ala lisp). 
 *  The last type is assumed to be a row variable. */
export function rowPolymorphicList(types:Type[]) : Type {        
    if (types.length == 0)
        throw new Error("Expected a type list with at least one type variable")
    else if (types.length == 1) {
        if (types[0] instanceof TypeVariable)
            return types[0];
        else
            throw new Error("Expected a row variable in the final position");
    }
    else 
        return polyType([types[0], rowPolymorphicList(types.slice(1))]);
}

// Creates a row-polymorphic function type: adding the implicit row variable 
export function rowPolymorphicFunction(inputs:Type[], outputs:Type[]) : PolyType {
    const row = typeVariable('_');
    inputs.push(row); 
    outputs.push(row);
    return functionType(rowPolymorphicList(inputs), rowPolymorphicList(outputs));
}

/** Creates a poly type, and computes the type scheme. */
export function polyType(types:Type[]) : PolyType {        
    const r = new PolyType(types);
    computeScheme(r);
    return r;
}

/** Creates a type constant */
export function typeConstant(name: string) : TypeConstant {
    return new TypeConstant(name);
}

/** Creates the named type variable. */
export function typeVariable(name: string) : TypeVariable {
    return new TypeVariable(name);
}

/** Creates a N<->M function type, as a special kind of a PolyType */
export function functionType(input: Type, output: Type) : PolyType {
    return polyType([input, typeConstant('->'), output]);    
}    

/** Creates an array type, as a special kind of PolyType. */
export function arrayType(element:Type) : PolyType {
    return polyType([element, typeConstant('[]')]);    
}

/** Creates a list type, as a special kind of PolyType */
export function listType(element:Type) : PolyType {
    return polyType([element, typeConstant('*')]);    
}

/** Creates a recursive type. The numberical value 
 * refers to the depth of the recursion: how many PolyTypes you have to go up 
 * to find the recursion base case. This is a TypeConstant, 
 * because the unification strategy can handles these cases specially. 
 * TODO: provide access in the unifier so that 
 */
export function recursiveType(depth:Number) : TypeConstant {
    return typeConstant('_rec_' + depth.toString());    
}

/** Returns true if and only if the type is a type constant with the specified name */
export function isTypeConstant(t:Type, name:string) : boolean {
    return t instanceof TypeConstant && t.name === name;
}

/** Returns true if and only if the type is a type constant with the specified name */
export function isTypeVariable(t:Type, name:string) : boolean {
    return t instanceof TypeVariable && t.name === name;
}

/** Returns true if any of the contained types have the specified name*/
export function variableOccurs(type:Type, name:string) : boolean {
    return containedTypes(type).some(t => isTypeVariable(t, name));
}

/** Returns all types contained in this type. */
export function containedTypes(t:Type, r:Type[] = []) : Type[] {
    r.push(t);
    if (t instanceof PolyType) 
        t.types.forEach(t2 => containedTypes(t2, r));
    return r;
}

/** Returns all of the type variables contained in this type without repetition. */
export function typeVars(t: Type): Lookup<TypeVariable> {
    return toTypeLookup(filterType(containedTypes(t), TypeVariable));
}

/** Returns type variables that are in the scheme. */
export function typeVarsInScheme(t: PolyType): Lookup<TypeVariable> {
    return toTypeLookup(values(t.scheme));
}
    
//========================================================
// Variable name functions

/** Rename all type variables os that they follow T0..TN according to the order the show in the tree. */
export function normalizeType(t:Type) : Type {
    const indices = lookupToIndices(typeVars(t));
    return clone(t, v => v.name + "T" + indices[v.name]);
}

/** Provides unique names for the type scheme types only.*/
export function freshVariableNames(t:Type) : Type {    
    const lookup = map(typeVars(t), newTypeVar);
    return clone(t, v => lookup[v.name]);
}

/** Provides unique names for the type scheme types only.*/
export function freshParameterNames(t:Type) : Type {    
    if (t instanceof MonoType) {
        return t;
    }
    else if (t instanceof PolyType) {
        const lookup = map(t.scheme, newTypeVar);
        const types = t.types.map(freshParameterNames);
        const r = new PolyType(types);
        // This should work, because we don't change anything that would affect the scheme. 
        r.scheme = t.scheme;
        // Now cloning will change all variable names, giving them fresh names, 
        return clone(r, v => lookup[v.name] ? lookup[v.name] : v);
    }
}
    
/** Converts a number to a letter from 'a' to 'z', 'aa' to 'zz', etc. */
export function numberToLetters(n:number) : string {
    const letterA = "a".charCodeAt(0);
    const letter = String.fromCharCode(letterA + n % 26);
    return n > 26 
        ? numberToLetters(n / 26) + letter 
        : letter;

}

/** Rename all type variables so that they are alphabetical in the order they occur in the tree */
export function alphabetizeVarNames(t:Type) : Type {
    const indices = lookupToIndices(typeVars(t));
    return clone(t, v => numberToLetters(indices[v.name]));
}

/** Compares whether two types are the same by normalizing the type variables and comparing the strings. */ 
export function compareTypes(t1:Type, t2:Type) {
    const s1 = normalizeType(t1).toString();
    const s2 = normalizeType(t2).toString();
    return s1 === s2;
}

//================================================
// Helper functions

/** Given a variable name remapping function creates new types.  */
export function clone(t: Type, remapper: (_: TypeVariable) => Type) : Type {
    if (t instanceof TypeVariable) {
        return remapper(t);
    }
    else if (t instanceof TypeConstant) {
        return t;
    }
    else if (t instanceof PolyType) {
        const types = t.types.map(x => clone(x, remapper));
        return polyType(types);
    }
    throw new Error("Not a recognized type: " + t);
} 

/** Used for generating new names */
let typeId=0;

/** Returns a new uniqely named type variable. */
export function newTypeVar() : TypeVariable {
    return typeVariable("@" + typeId++);
}

/** An internal function for computing type schemes. */
function _isTypeVarUsedElsewhere(types: Type[], varName:string, pos:number) : boolean {
    return types.some((v, i) => i != pos && variableOccurs(types[i], varName));
}

/** Associate the variable with a new type scheme. Removing it from the previous type scheme */
export function _reassignVarScheme(typeVar: TypeVariable, t:PolyType) {
    for (const x of containedTypes(t)) 
        if (x instanceof PolyType && typeVar.name in x.scheme) 
            delete(x.scheme[typeVar.name]);
    t.scheme[typeVar.name] = typeVar;
}
    
/** 
 * Computes the proper type-scheme for a PolyType. This is different than the Hindly-Milner type system.
 * In HM all type variables are universally quantified at the top-level, but this approach 
 * allows us to figure out exactly where the quanitfication happens.  */
export function computeScheme(t:  PolyType) {
    // Recursively compute the parameters for base types
    for (const x of t.types)
        if (x instanceof PolyType) 
            computeScheme(x);

    for (let i=0; i < t.types.length; ++i) {
        const child = t.types[i];

        // Individual type variables are part of this scheme 
        if (child instanceof TypeVariable) 
            t.scheme[child.name] = child;
        else 
        if (child instanceof PolyType) {
            for (const childVar of values(typeVars(child))) {
                if (_isTypeVarUsedElsewhere(child.types, childVar.name, i))
                    _reassignVarScheme(childVar, t);                
            }
        }
    }
    return t;
}

//===============================================================
// Generic helper functions

/** Returns the keys of any object.  */
export function keys(obj: any): string[] {
    return Object.keys(obj);
}

/** Returns the values of any object.  */
export function values(obj: any): any[] {
    return keys(obj).map(k => obj[k]);
}


/** Given an array of values creates a lookup.  */
export function toLookup<T, U>(vals: T[], keyFunc: (_:T) => string, valFunc: (_:T, i:number)=>U = identity): Lookup<U> {
    const r: Lookup<U> = {};
    let i = 0;
    for (const v of vals) 
        r[keyFunc(v)] = valFunc(v, i++);
    return r;
}

/** Creates a type lookup.  */
export function toTypeLookup<T extends MonoType>(vals: T[]): Lookup<T> {
    return toLookup(vals, v => v.name, _=>_);
}

/** Given a lookup table converts it into a key to number table. */
export function lookupToIndices<T>(lookup: Lookup<T>): Lookup<number> {
    return toLookup(keys(lookup), k => k, (k, i) => i);
}

/** Things that should never happen. This is used primarily to catch refactoring errors, 
 * and to help the reader understand the code. */
export function assert(condition: boolean, msg: string) {
    if (!condition) throw new Error("Internal error: " + msg);
}

/** Creates a unique string list. */
export function uniqueStrings(xs:string[]) : string[] {
    return keys(toLookup(xs, identity));    
}

/** Given an array of values, filters it according to the given type. */
export function filterType<T, U extends T>(vals: T[], className: any): U[] {
    return vals.filter(v => v instanceof className).map(v => v as U);
}

/** The function that takes a value and returns it. */
export const identity = _=>_;

/** Returns a lookup function from a lookup table. */
export function lookupFunction<T>(lookup: Lookup<T>): (_:string) => T {
    return _ => lookup[_];
}

/** Given a lookup, creates a new transform that remaps all of the values.   */
export function map<T,U>(lookup: Lookup<T>, f:(_:T, i: number)=>U) : Lookup<U> {
    return toLookup(keys(lookup), identity, f);
}