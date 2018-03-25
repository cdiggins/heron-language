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
// Name generation 

// Used for generating new names 
let id=0;

// Returns a new type variable.
export function newTypeVar() : TypeVariable {
    return typeVariable("$" + id++);
}

//=========================================
// Helper interfaces 

/** Generic lookup type. */
export interface Lookup<T> { [_:string]:T };

/** Given a type variable name finds the type set */
export interface TypeUnifiers extends Lookup<TypeUnifier> { }

/** Associates type names with type expressions */
export interface Types extends Lookup<Type> { } 

/** Associates type variables names with type expressions */
export interface TypeSchema extends Lookup<TypeVariable> { }

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
 * The schama is a list of universally quantified variables. 
 */
export class PolyType extends Type
{
    constructor(
        public readonly types: Type[], 
        public readonly schema: TypeSchema)
    { 
        super(); 
    }

    typeSchemaString(): string {
        const r = values(this.schema).join("!");
        return r ?  "!" + r + "." : r;
    }

    toString(): string {
        return this.typeSchemaString + "(" + this.types.join(" ") + ")";
    }
}

/** A MonoType is either a Type variable or a type constant: not a PolyType. */
export class MonoType extends Type 
{ 
    constructor(public readonly name : string) { super(); }
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

//============================================================================
// Helper classes and interfaces 

/** A type unifier is a best-fit type. It has a name, which is the original variable name. */ 
export class TypeUnifier
{
    constructor(
        public readonly name:string,
        public readonly unifier:Type)
    { }
}

//=======================================================================
// Various functions

/** This is helper function helps determine whether a type variable should belong */
export function _isTypeVarUsedElsewhere(t:PolyType, varName:string, pos:number) : boolean {
    for (const i=0; i < t.types.length; ++i) 
        if (i != pos && t.types[i].typeVars.some(v => v.name == varName))
            return true;
    return false;
}
    
//================================================
// A classes used to implement unification.

/** Find a unified type. */
export class TypeResolver
{
    /* Given a type variable name find the unifier. Multiple type variables will map to the same unifier. */
    readonly unifiers : TypeUnifiers = {};

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
            let r = this._updateUnifier(t1, t2, depth);
            this._updateAllUnifiers(t1.name, t2);
            return r;
        }
        else if (t2 instanceof TypeVariable) 
        {
            let r = this._updateUnifier(t2, t1, depth);
            this._updateAllUnifiers(t2.name, t1);
            return r;
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
            const t = u.unifier;
            results.push(`type unifier for ${ k }, unifier name ${ u.name }, unifying type ${t}`);
        }
        return results.join('\n');
    }             

    // Replaces all variables in a type expression with the unified version
    // The previousVars variable allows detection of cyclical references
    getUnifiedType(expr:Type, previousVars:string[] = [], unifiedVars:any = {}) : Type {
        if (expr instanceof TypeConstant)
            return expr;
        else if (expr instanceof TypeVariable) {
            // If we encountered the type variable previously, it meant that there is a recursive relation
            for (const i=0; i < previousVars.length; ++i) 
                if (previousVars[i] == expr.name) 
                    return recursiveType(i);
            const u = this.unifiers[expr.name];
            if (!u)
                return expr;
            // If the unifier is a type variable, we are done. 
            else if (u.unifier instanceof TypeVariable)
                return u.unifier;
            else if (u.unifier instanceof TypeConstant)
                return u.unifier;
            else if (u.unifier instanceof PolyType) {
                // TODO: this logic has to move into the unification step. 
                if (u.name in unifiedVars) {
                    // We have already seen this unified const before
                    const u2 = u.unifier.freshParameterNames();
                    return this.getUnifiedType(u2, [expr.name].concat(previousVars), unifiedVars);
                }
                else {
                    unifiedVars[u.name] = 0;
                    return this.getUnifiedType(u.unifier, [expr.name].concat(previousVars), unifiedVars);      
                }
            }
            else 
                throw new Error("Unhandled kind of type " + expr);
        }
        else if (expr instanceof PolyType) {
            const types = expr.types.map(t => this.getUnifiedType(t, previousVars, unifiedVars));
            const r = new PolyType(types, false);
            return r;
        }
        else
            throw new Error("Unrecognized kind of type expression " + expr);
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

    // Unifying lists involves unifying each element
    _unifyLists(list1:PolyType, list2:PolyType, depth:number) : PolyType {
        if (list1.types.length != list2.types.length) 
            throw new Error("Cannot unify differently sized lists: " + list1 + " and " + list2);
        const rtypes : Type[] = [];
        for (const i=0; i < list1.types.length; ++i)
            rtypes.push(this.unifyTypes(list1.types[i], list2.types[i], depth));
        // We just return the first list for now. 
        return list1; 
    }

    // All unifiers that refer to varName as the unifier are pointed to the new unifier 
    _updateVariableUnifiers(varName:string, u:TypeUnifier) {            
        for (const x in this.unifiers) {
            const t = this.unifiers[x].unifier;
            if (t instanceof TypeVariable) 
                if (t.name == varName)
                    this.unifiers[x] = u;
        }
    }    
    
    // Go through a type and replace all instances of a variable with the new type
    // unless the new type is a variable. 
    _replaceVarWithType(target:Type, varName:string, replace:Type) : Type {            
        //if (trace) console.log("Replacing variable " + varName + " in target  " + target + " with " + replace);

        // Just leave it as is. 
        // Replacing a variable with a variable is kind of meaningless.
        if (replace instanceof TypeVariable)
            return target;

        // Create new parameter names as needed 
        if (replace instanceof PolyType)
        {
            if (replace.isPolyType) {
                // Get some new parameters for the poly type
                replace = freshParameterNames(replace);
            }
        }
        
        // Look at the target type and decide what to do. 
        if (target instanceof TypeVariable) {
            if (target.name == varName)
                return replace;
            else    
                return target;
        }
        else if (target instanceof TypeConstant) {
            return target;
        }
        else if (target instanceof PolyType) {
            // TODO?: look at the parameters. Am I replacing a parameter? If so, throw it out. 
            // BUT!!: I don't think I have to do this step, because at the end the type will be constructed correctly.
            return target.clone({varName:replace});
        }
        else {
            throw new Error("Unrecognized kind of type " + target);
        }
    }

    // Returns all of the unifiers as an array 
    get _allUnifiers() : TypeUnifier[] {
        const r : TypeUnifier[] = [];
        for (const k in this.unifiers) 
            r.push(this.unifiers[k]);
        return r;
    }

    // Update all unifiers once I am making a replacement 
    _updateAllUnifiers(a:string, t:Type) 
    {
        for (const tu of this._allUnifiers)
            tu.unifier = this._replaceVarWithType(tu.unifier, a, t);
    }   
                
    // Computes the best unifier between the current unifier and the new variable.        
    // Updates all unifiers which point to a (or to t if t is a TypeVar) to use the new type. 
    _updateUnifier(a:TypeVariable, t:Type, depth:number) : Type {            
        const u = this._getOrCreateUnifier(a);          
        if (t instanceof TypeVariable) 
            t = this._getOrCreateUnifier(t).unifier;

        u.unifier = this._chooseBestUnifier(u.unifier, t, depth);
        this._updateVariableUnifiers(a.name, u);
        if (t instanceof TypeVariable) 
            this._updateVariableUnifiers(t.name, u);
            
        return u.unifier;            
    }

    // Gets or creates a type unifiers for a type variables
    _getOrCreateUnifier(t : TypeVariable) : TypeUnifier {
        if (!(t.name in this.unifiers))
            return this.unifiers[t.name] = new TypeUnifier(t.name, t);
        else 
            return this.unifiers[t.name];
    }
}

//======================================================================================
// Helper functions 

// Creates a type list as nested pairs ("cons" cells ala lisp). 
// The last type is assumed to be a row variable. 
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

// Creates a type array from an array of types
export function polyType(types:Type[]) : PolyType {        
    return new PolyType(types, true);
}

// Creates a type constant 
export function typeConstant(name:string) : TypeConstant {
    return new TypeConstant(name);
}

// Creates a type variable
export function typeVariable(name:string) : TypeVariable {
    return new TypeVariable(name);
}

// Creates a function type, as a special kind of a PolyType 
export function functionType(input: Type, output: Type) : PolyType {
    return polyType([input, typeConstant('->'), output]);    
}    

// Creates a sum type. If any of the types in the array are a sumType, it is flattened.  
export function sumType(types: Type[]) : PolyType {
    let r: Type[] = [];
    for (let t of types) 
        if (isSumType(t)) 
            r.push(...sumTypeOptions(t));
        else
            r.push(t);
    return polyType([typeConstant('|'), polyType(r)]);    
}    

// Creates an array type, as a special kind of PolyType
export function arrayType(element:Type) : PolyType {
    return polyType([element, typeConstant('[]')]);    
}

// Creates a list type, as a special kind of PolyType
export function listType(element:Type) : PolyType {
    return polyType([element, typeConstant('*')]);    
}

// Creates a recursive type, as a special kind of PolyType. The numberical value 
// refers to the depth of the recursion: how many PolyTypes you have to go up 
// to find the recurison base case. 
export function recursiveType(depth:Number) : PolyType {
    return polyType([typeConstant('rec'), typeConstant(depth.toString())]);    
}

// Returns true if and only if the type is a type constant with the specified name
export function isTypeConstant(t:Type, name:string) : boolean {
    return t instanceof TypeConstant && t.name === name;
}

// Returns true if and only if the type is a type constant with the specified name
export function isTypeVariable(t:Type, name:string) : boolean {
    return t instanceof TypeVariable && t.name === name;
}

// Returns true if any of the types are the type variable
export function variableOccurs(name:string, type:Type) : boolean {
    return descendantTypes(type).some(t => isTypeVariable(t, name));
}

// Returns true if and only if the type is a type constant with the specified name
export function isPolyType(t:Type, name:string) : boolean {
    return t instanceof PolyType && t.types.length == 2 && isTypeConstant(t.types[1], '[]');
}

// Returns true iff the type is a TypeArary representing a function type
export function isFunctionType(t:Type) : boolean {        
    return t instanceof PolyType && t.types.length == 3 && isTypeConstant(t.types[1], '->');
}

// Returns true iff the type is a TypeArary representing a sum type
export function isSumType(t:Type) : boolean {        
    return t instanceof PolyType && t.types.length == 2 && isTypeConstant(t.types[0], '|');
}

export function sumTypeOptions(t:Type): Type[] {
    if (!isSumType(t)) throw new Error("Expected a sum type");
    return ((t as PolyType).types[1] as PolyType).types; 
} 

// Returns the input types (argument types) of a PolyType representing a function type
export function functionInput(t:Type) : Type {        
    if (!isFunctionType(t)) throw new Error("Expected a function type");
    return (t as PolyType).types[0];
}

// Returns the output types (return types) of a PolyType representing a function type
export function functionOutput(t:Type) : Type {        
    if (!isFunctionType(t)) throw new Error("Expected a function type");
    return (t as PolyType).types[2];
}

// Returns all types contained in this type
export function descendantTypes(t:Type, r:Type[] = []) : Type[] {
    r.push(t);
    if (t instanceof PolyType) 
        t.types.forEach(t2 => descendantTypes(t2, r));
    return r;
}

// Returns true if the type is a polytype
export function isPolyType(t:Type) {
    return t instanceof PolyType && t.typeParameterVars.length > 0;
}

// Returns true if the type is a function that generates a polytype.
export function generatesPolytypes(t:Type) : boolean {
    if (!isFunctionType(t)) 
        return false;
    return descendantTypes(functionOutput(t)).some(isPolyType);
}

// Global function for fresh variable names
export function freshVariableNames(t:Type, id:number) : Type {
    return (t instanceof PolyType) ? t.freshVariableNames(id) : t;
}
    
// Global function for fresh parameter names
export function freshParameterNames(t:Type) : Type {
    return (t instanceof PolyType) ? t.freshParameterNames() : t;
}

export function computeParameters(t:Type) : Type {
    return (t instanceof PolyType) ? t.computeParameters() : t;
}
    
//========================================================
// Variable name functions

// Rename all type variables os that they follow T0..TN according to the order the show in the tree. 
export function normalizeVarNames(t:Type) : Type {
    const names = {};
    const count = 0;
    for (const dt of descendantTypes(t)) 
        if (dt instanceof TypeVariable) 
            if (!(dt.name in names))
                names[dt.name] = typeVariable("t" + count++);
    return t.clone(names);
}

// Converts a number to a letter from 'a' to 'z'.
function numberToLetters(n:number) : string {
    return String.fromCharCode(97 + n);
}

// Rename all type variables so that they are alphabetical in the order they occur in the tree
export function alphabetizeVarNames(t:Type) : Type {
    const names = {};
    const count = 0;
    for (const dt of descendantTypes(t)) 
        if (dt instanceof TypeVariable) 
            if (!(dt.name in names))
                names[dt.name] = typeVariable(numberToLetters(count++));
    return t.clone(names);
}

// Compares whether two types are the same after normalizing the type variables. 
export function areTypesSame(t1:Type, t2:Type) {
    const s1 = normalizeVarNames(t1).toString();
    const s2 = normalizeVarNames(t2).toString();
    return s1 === s2;
}

export function variableOccursOnInput(varName:string, type:PolyType) {
    for (const t of descendantTypes(type)) {
        if (isFunctionType(t)) {
            const input = functionInput(type);            
            if (variableOccurs(varName, input)) {
                return true;
            }
        }
    }
}

// Returns true if and only if the type is valid 
export function isValid(type:Type) {
    for (const t of descendantTypes(type)) {
        if (isTypeConstant(t, "rec")) {
            return false;
        }
        else if (t instanceof PolyType) {
            if (isFunctionType(t)) 
                for (const p of t.typeParameterNames)
                    if (!variableOccursOnInput(p, t))
                        return false;                
        }
    }
    return true;
}

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

//================================================
// Helper functions

/** Given a variable name remapping function creates new types.  */
export function clone(t: Type, remapper: (_: string) => string) : Type {
    if (t instanceof TypeVariable) {
        return new TypeVariable(remapper(t.name));
    }
    else if (t instanceof TypeConstant) {
        return t;
    }
    else if (t instanceof PolyType) {
        const schema: TypeSchema = {};
        for (let k of keys(t.schema))
            schema[remapper(k)] = clone(t.schema[k], remapper) as TypeVariable;
        const types = t.types.map(x => clone(x, remapper));
    }
} 

/** Returns the keys of any object.  */
export function keys(obj: any): string[] {
    return Object.keys(obj);
}

/** Returns the values of any object.  */
export function values(obj: any): any[] {
    return keys(obj).map(k => obj[k]);
}

/** Given an array of values creates a lookup.  */
export function toLookup<T>(vals: T[], nameFunc: (_:T) => string): Lookup<T> {
    const r: Lookup<T> = {};
    for (const v of vals) 
        r[nameFunc(v)] = v;
    return r;
}

/** Creates a type lookup.  */
export function toTypeLookup<T extends MonoType>(vals: T[]): Lookup<T> {
    return toLookup(vals, v => v.name);
}

/** Things that should never happen. This is used primarily to catch refactoring errors, 
 * and to help the reader understand the code. 
*/
export function assert(condition: boolean, msg: string) {
    if (!condition) throw new Error("Internal error: " + msg);
}

/** Creates a unique string list. */
export function uniqueStrings(xs:string[]) : string[] {
    return keys(toLookup(xs, _ => _));    
}
