// A Type Inference Algorithm that provides support for full inference 
// of non-recursive higher rank polymorphic types.
//
// Copyright 2017 by Christopher Diggins 
// Licensed under the MIT License

// Turn on for debugging purposes
export var trace = false;
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
// Classes that represent kinds of types  

// Base class of a type: either a TypeArray, TypeVariable, or TypeConstant
export class Type { 
    // All type varible referenced somewhere by the type, or the type itself if it is a TypeVariable.
    typeVars : TypeVariable[] = [];            
    
    clone(newTypes:ITypeLookup) : Type {
        throw new Error("Clone must be overridden in derived class");
    }
}

// A collection of a fixed number of types can be used to represent function types or tuple types. 
// A list of types is usually encoded as a nested set of type pairs (TypeArrays with two elements).
// If a TypeArray has Type parameters, quantified unbound type variables, it is considered a "PolyType".
// Binding type variables is done through the clone function 
export class TypeArray extends Type
{
    constructor(
        public types : Type[], computeParameters:boolean)
    { 
        super(); 

        // Compute all referenced types 
        for (var t of types) 
            this.typeVars = this.typeVars.concat(t.typeVars);       
            
        // Given just a type with type variables the sete of type parameters 
        // can be inferred based on where they occur in the type tree
        if (computeParameters)
            this.computeParameters();
    }

    // A helper function to copy a parameter list 
    cloneParameters(dest:TypeArray, from:TypeVariable[], newTypes:ITypeLookup) {
        var params = [];
        for (var tv of from) {
            var param = newTypes[tv.name];
            if (param == undefined)
                throw new Error("Could not find type parameter: " + tv.name);
            params.push(param);
        }
        dest.typeParameterVars = params;
    }

    // Returns a copy of the type array, substituting type variables using the lookup table.        
    clone(newTypes:ITypeLookup) : TypeArray {
        var r = new TypeArray(this.types.map(t => t.clone(newTypes)), false);
        this.cloneParameters(r, this.typeParameterVars, newTypes);
        return r;
    }

    freshVariableNames(id:number) : TypeArray {
        var newTypes:ITypeLookup = {};
        for (var t of descendantTypes(this))
            if (t instanceof TypeVariable)
                newTypes[t.name] = newTypeVar();
        return this.clone(newTypes);
    }
        
    // Returns a copy of the type array creating new parameter names. 
    freshParameterNames() : TypeArray {
        // Create a lookup table for the type parameters with new names 
        var newTypes:ITypeLookup = {};
        for (var tp of this.typeParameterNames)
            newTypes[tp] = newTypeVar();
        
        // Clone all of the types.             
        var types = this.types.map(t => t.clone(newTypes));

        // Recursively call "freshParameterNames" on child type arrays as needed. 
        types = types.map(t => t instanceof TypeArray ? t.freshParameterNames() : t);
        var r = new TypeArray(types, false);

        // Now recreate the type parameter list
        this.cloneParameters(r, this.typeParameterVars, newTypes);
        
        return r;
    }

    // A list of the parameter names (without repetition)
    get typeParameterNames() : string[] {
        return uniqueStrings(this.typeParameterVars.map(tv => tv.name)).sort();
    }
        
    // Infer which type variables are actually type parameters (universally quantified) 
    // based on their position. Mutates in place.
    computeParameters() : TypeArray {
        this.typeParameterVars = [];

        // Recursively compute the parameters for base types
        this.types.forEach(t => { if (t instanceof TypeArray) t.computeParameters(); });

        for (var i=0; i < this.types.length; ++i) {
            var child = this.types[i];

            // Individual type variables are part of this scheme 
            if (child instanceof TypeVariable) 
                _reassignAllTypeVars(child.name, this);
            else 
            if (child instanceof TypeArray) {
                // Get the vars of the child type. 
                // If any of them show up in multiple child arrays, then they 
                // are part of the parent's child 
                for (var childVar of child.typeVars)
                    if (_isTypeVarUsedElsewhere(this, childVar.name, i))
                        _reassignAllTypeVars(childVar.name, this);                
            }
        }

        // Implementation validation step:
        // Assure that the type scheme variables are all in the typeVars 
        for (var v of this.typeParameterVars) {
            var i = this.typeVars.indexOf(v);
            if (i < 0) 
                throw new Error("Internal error: type scheme references a variable that is not marked as referenced by the type variable")
        }

        return this;
    }

    // The type variables that are bound to this TypeArray. 
    // Always a subset of typeVars. This could have the same type variable repeated twice. 
    typeParameterVars : TypeVariable[] = [];        

    // Provides a user friendly representation of the type scheme (list of type parameters)
    get typeParametersToString() : string {
        return this.isPolyType 
            ? "!" + this.typeParameterNames.join("!") + "."
            : "";
    }

    // Returns true if there is at least one type parameter associated with this type array
    get isPolyType() : boolean {
        return this.typeParameterVars.length > 0;
    }

    //  A user friendly name 
    toString() : string { 
        return this.typeParametersToString + "(" + this.types.join(' ') + ")"; 
    }
}

// A type variable is used for generics (e.g. T0, TR). 
// The type variable must belong to a type scheme of a polytype. This is like a "scope" for type variables.
// Computing the type schema is done in an external function.
export class TypeVariable extends Type
{
    constructor(
        public name : string) 
    {   
        super(); 
        this.typeVars.push(this);
    }

    clone(newTypes:ITypeLookup) : Type {
        return this.name in newTypes 
            ? newTypes[this.name] as TypeVariable
            : newTypes[this.name] = new TypeVariable(this.name);
    }
    
    toString() : string { 
        return this.name;
    }
}

// A type constant is a fixed type (e.g. int, function). Also called a MonoType.
export class TypeConstant extends Type
{
    constructor(
        public name : string)
    { super(); }

    toString() : string { 
        return this.name;
    }

    clone(newTypes:ITypeLookup) : TypeConstant {
        return new TypeConstant(this.name);
    }        
}

//============================================================================
// Helper classes and interfaces 

// A type unifier is a mapping from a type variable to a best-fit type
export class TypeUnifier
{
    constructor(
        public name:string,
        public unifier:Type)
    { }
}

// Given a type variable name finds the type set
export interface ITypeUnifierLookup {
    [typeVarName:string] : TypeUnifier;
}

// Associates variable names with type expressions 
export interface ITypeLookup {
    [varName:string] : Type;
}

//=======================================================================
// Various functions

// This is helper function helps determine whether a type variable should belong 
export function _isTypeVarUsedElsewhere(t:TypeArray, varName:string, pos:number) : boolean {
    for (var i=0; i < t.types.length; ++i) 
        if (i != pos && t.types[i].typeVars.some(v => v.name == varName))
            return true;
    return false;
}

// Associate the variable with a new type scheme. Removing it from the previous varScheme 
export function _reassignVarScheme(v:TypeVariable, t:TypeArray) {
    // Remove the variable from all other type schemes below the given one. 
    for (var x of descendantTypes(t)) 
        if (x instanceof TypeArray) 
            x.typeParameterVars = x.typeParameterVars.filter(vd => vd.name != v.name);
    t.typeParameterVars.push(v);
}
    
// Associate all variables of the given name in the TypeArray with the TypeArray's scheme
export function _reassignAllTypeVars(varName:string, t:TypeArray) {
    t.typeVars.filter(v => v.name == varName).forEach(v => _reassignVarScheme(v, t));
}

export function replaceVarWithType(root:TypeArray, v:TypeVariable, r:Type) {
    // TODO: look for the variable in t. That would be recursive.
    if (root instanceof TypeArray) {
        // If we are replacing a "type parameter"
        root.typeParameterVars = root.typeParameterVars.filter(pv => !isTypeVariable(pv, v.name));
        for (var i=0; i < root.types.length; ++i) {
            const t = root.types[i];
            if (isTypeVariable(t, v.name))
                root.types[i] = freshParameterNames(r);
            else 
            if (t instanceof TypeArray) 
                replaceVarWithType(t, v, r);
        }
    }
}
    
//================================================
// A classes used to implement unification.

// Use this class to unify types that are constrained together.
export class Unifier
{
    // Given a type variable name find the unifier. Multiple type variables will map to the same unifier 
    unifiers : ITypeUnifierLookup = {};

    // Unify both types, returning the most specific type possible. 
    // When a type variable is unified with something the new unifier is stored. 
    // Note: TypeFunctions and TypePairs ar handled as TypeArrays
    // * Constants are preferred over lists and variables
    // * Lists are preferred over variables
    // * Given two variables, the first one is chosen. 
    unifyTypes(t1:Type, t2:Type, depth:number=0) : Type {            
        if (!t1 || !t2) 
        {
            throw new Error("Missing type expression");
        }
        if (t1 === t2)
        {
            return t1;
        }
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
                return sumType([t1, t2]);
            else 
                return t1;
        }
        else if (t1 instanceof TypeConstant || t2 instanceof TypeConstant)
        {
            return sumType([t1, t2]);
        }
        else if (t1 instanceof TypeArray && t2 instanceof TypeArray)
        {             
            if (isSumType(t1) || isSumType(t2)) {
                return sumType([t1, t2]);
            }
            
            return this._unifyLists(t1, t2, depth+1);
        }
        throw new Error("Internal error, unexpected code path: " + t1 + " and " + t2);
    }
        
    // Debug function that dumps prints out a representation of the engine state. 
    get state() : string {
        var results = [];
        for (var k in this.unifiers) {
            var u = this.unifiers[k];
            var t = u.unifier;
            results.push(`type unifier for ${ k }, unifier name ${ u.name }, unifying type ${t}`);
        }
        return results.join('\n');
    }             

    // Replaces all variables in a type expression with the unified version
    // The previousVars variable allows detection of cyclical references
    getUnifiedType(expr:Type, previousVars:string[], unifiedVars:any) : Type {
        if (expr instanceof TypeConstant)
            return expr;
        else if (expr instanceof TypeVariable) {
            // If we encountered the type variable previously, it meant that there is a recursive relation
            for (var i=0; i < previousVars.length; ++i) 
                if (previousVars[i] == expr.name) 
                    return recursiveType(i);
            var u = this.unifiers[expr.name];
            if (!u)
                return expr;
            // If the unifier is a type variable, we are done. 
            else if (u.unifier instanceof TypeVariable)
                return u.unifier;
            else if (u.unifier instanceof TypeConstant)
                return u.unifier;
            else if (u.unifier instanceof TypeArray) {
                // TODO: this logic has to move into the unification step. 
                if (u.name in unifiedVars) {
                    // We have already seen this unified var before
                    var u2 = u.unifier.freshParameterNames();
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
        else if (expr instanceof TypeArray) {
            var types = expr.types.map(t => this.getUnifiedType(t, previousVars, unifiedVars));
            var r = new TypeArray(types, false);
            return r;
        }
        else
            throw new Error("Unrecognized kind of type expression " + expr);
    }

    // Choose one of two unifiers, or continue the unification process if necessary
    _chooseBestUnifier(t1:Type, t2:Type, depth:number) : Type {
        var r:Type;
        if (t1 instanceof TypeVariable && t2 instanceof TypeVariable)
            r = t1;
        else if (t1 instanceof TypeVariable)
            r = t2;
        else if (t2 instanceof TypeVariable)
            r = t1;
        else 
            r = this.unifyTypes(t1, t2, depth+1);
        //if (trace) console.log(`Chose type for unification ${r} between ${t1} and ${t2} at depth ${depth}`)
        return r;
    }

    // Unifying lists involves unifying each element
    _unifyLists(list1:TypeArray, list2:TypeArray, depth:number) : TypeArray {
        if (list1.types.length != list2.types.length) 
            throw new Error("Cannot unify differently sized lists: " + list1 + " and " + list2);
        var rtypes : Type[] = [];
        for (var i=0; i < list1.types.length; ++i)
            rtypes.push(this.unifyTypes(list1.types[i], list2.types[i], depth));
        // We just return the first list for now. 
        return list1; 
    }

    // All unifiers that refer to varName as the unifier are pointed to the new unifier 
    _updateVariableUnifiers(varName:string, u:TypeUnifier) {            
        for (var x in this.unifiers) {
            var t = this.unifiers[x].unifier;
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
        if (replace instanceof TypeArray)
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
        else if (target instanceof TypeArray) {
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
        var r : TypeUnifier[] = [];
        for (var k in this.unifiers) 
            r.push(this.unifiers[k]);
        return r;
    }

    // Update all unifiers once I am making a replacement 
    _updateAllUnifiers(a:string, t:Type) 
    {
        for (var tu of this._allUnifiers)
            tu.unifier = this._replaceVarWithType(tu.unifier, a, t);
    }   
                
    // Computes the best unifier between the current unifier and the new variable.        
    // Updates all unifiers which point to a (or to t if t is a TypeVar) to use the new type. 
    _updateUnifier(a:TypeVariable, t:Type, depth:number) : Type {            
        var u = this._getOrCreateUnifier(a);          
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
        return typeArray([types[0], rowPolymorphicList(types.slice(1))]);
}

// Creates a row-polymorphic function type: adding the implicit row variable 
export function rowPolymorphicFunction(inputs:Type[], outputs:Type[]) : TypeArray {
    var row = typeVariable('_');
    inputs.push(row); 
    outputs.push(row);
    return functionType(rowPolymorphicList(inputs), rowPolymorphicList(outputs));
}

// Creates a type array from an array of types
export function typeArray(types:Type[]) : TypeArray {        
    return new TypeArray(types, true);
}

// Creates a type constant 
export function typeConstant(name:string) : TypeConstant {
    return new TypeConstant(name);
}

// Creates a type variable
export function typeVariable(name:string) : TypeVariable {
    return new TypeVariable(name);
}

// Creates a function type, as a special kind of a TypeArray 
export function functionType(input: Type, output: Type) : TypeArray {
    return typeArray([input, typeConstant('->'), output]);    
}    

// Creates a sum type. If any of the types in the array are a sumType, it is flattened.  
export function sumType(types: Type[]) : TypeArray {
    let r: Type[] = [];
    for (let t of types) 
        if (isSumType(t)) 
            r.push(...sumTypeOptions(t));
        else
            r.push(t);
    return typeArray([typeConstant('|'), typeArray(r)]);    
}    

// Creates an array type, as a special kind of TypeArray
export function arrayType(element:Type) : TypeArray {
    return typeArray([element, typeConstant('[]')]);    
}

// Creates a list type, as a special kind of TypeArray
export function listType(element:Type) : TypeArray {
    return typeArray([element, typeConstant('*')]);    
}

// Creates a recursive type, as a special kind of TypeArray. The numberical value 
// refers to the depth of the recursion: how many TypeArrays you have to go up 
// to find the recurison base case. 
export function recursiveType(depth:Number) : TypeArray {
    return typeArray([typeConstant('rec'), typeConstant(depth.toString())]);    
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
export function isTypeArray(t:Type, name:string) : boolean {
    return t instanceof TypeArray && t.types.length == 2 && isTypeConstant(t.types[1], '[]');
}

// Returns true iff the type is a TypeArary representing a function type
export function isFunctionType(t:Type) : boolean {        
    return t instanceof TypeArray && t.types.length == 3 && isTypeConstant(t.types[1], '->');
}

// Returns true iff the type is a TypeArary representing a sum type
export function isSumType(t:Type) : boolean {        
    return t instanceof TypeArray && t.types.length == 2 && isTypeConstant(t.types[0], '|');
}

export function sumTypeOptions(t:Type): Type[] {
    if (!isSumType(t)) throw new Error("Expected a sum type");
    return ((t as TypeArray).types[1] as TypeArray).types; 
} 

// Returns the input types (argument types) of a TypeArray representing a function type
export function functionInput(t:Type) : Type {        
    if (!isFunctionType(t)) throw new Error("Expected a function type");
    return (t as TypeArray).types[0];
}

// Returns the output types (return types) of a TypeArray representing a function type
export function functionOutput(t:Type) : Type {        
    if (!isFunctionType(t)) throw new Error("Expected a function type");
    return (t as TypeArray).types[2];
}

// Returns all types contained in this type
export function descendantTypes(t:Type, r:Type[] = []) : Type[] {
    r.push(t);
    if (t instanceof TypeArray) 
        t.types.forEach(t2 => descendantTypes(t2, r));
    return r;
}

// Returns true if the type is a polytype
export function isPolyType(t:Type) {
    return t instanceof TypeArray && t.typeParameterVars.length > 0;
}

// Returns true if the type is a function that generates a polytype.
export function generatesPolytypes(t:Type) : boolean {
    if (!isFunctionType(t)) 
        return false;
    return descendantTypes(functionOutput(t)).some(isPolyType);
}

// Global function for fresh variable names
export function freshVariableNames(t:Type, id:number) : Type {
    return (t instanceof TypeArray) ? t.freshVariableNames(id) : t;
}
    
// Global function for fresh parameter names
export function freshParameterNames(t:Type) : Type {
    return (t instanceof TypeArray) ? t.freshParameterNames() : t;
}

export function computeParameters(t:Type) : Type {
    return (t instanceof TypeArray) ? t.computeParameters() : t;
}
    
//========================================================
// Variable name functions

// Rename all type variables os that they follow T0..TN according to the order the show in the tree. 
export function normalizeVarNames(t:Type) : Type {
    var names = {};
    var count = 0;
    for (var dt of descendantTypes(t)) 
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
    var names = {};
    var count = 0;
    for (var dt of descendantTypes(t)) 
        if (dt instanceof TypeVariable) 
            if (!(dt.name in names))
                names[dt.name] = typeVariable(numberToLetters(count++));
    return t.clone(names);
}

// Compares whether two types are the same after normalizing the type variables. 
export function areTypesSame(t1:Type, t2:Type) {
    var s1 = normalizeVarNames(t1).toString();
    var s2 = normalizeVarNames(t2).toString();
    return s1 === s2;
}

export function variableOccursOnInput(varName:string, type:TypeArray) {
    for (var t of descendantTypes(type)) {
        if (isFunctionType(t)) {
            var input = functionInput(type);            
            if (variableOccurs(varName, input)) {
                return true;
            }
        }
    }
}

// Returns true if and only if the type is valid 
export function isValid(type:Type) {
    for (var t of descendantTypes(type)) {
        if (isTypeConstant(t, "rec")) {
            return false;
        }
        else if (t instanceof TypeArray) {
            if (isFunctionType(t)) 
                for (var p of t.typeParameterNames)
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
export function composeFunctions(f:TypeArray, g:TypeArray) : TypeArray {
    if (!isFunctionType(f)) throw new Error("Expected a function type for f");
    if (!isFunctionType(g)) throw new Error("Expected a function type for g");
    
    f = f.freshVariableNames(0) as TypeArray;
    g = g.freshVariableNames(1) as TypeArray;

    if (trace) {
        console.log("f: " + f);
        console.log("g: " + g);
    }

    var inF = functionInput(f);
    var outF = functionOutput(f);
    var inG = functionInput(g);
    var outG = functionOutput(g);

    var e = new Unifier();
    e.unifyTypes(outF, inG);
    var input = e.getUnifiedType(inF, [], {});
    var output = e.getUnifiedType(outG, [], {});

    var r = functionType(input, output);
    if (trace) {
        console.log(e.state);
        console.log("Intermediate result: " + r)
    }

    // Recompute parameters.
    r.computeParameters();
    if (trace) {
        console.log("Final result: " + r);
    }
    r = normalizeVarNames(r) as TypeArray;
    return r;        
}

// Composes a chain of functions
export function composeFunctionChain(fxns:TypeArray[]) : TypeArray {
    if (fxns.length == 0)
        return idFunction();                
    let t = fxns[0];
    for (let i=1; i < fxns.length; ++i) 
        t = composeFunctions(t, fxns[i]);
    return t;
}

// Composes a chain of functions in reverse. Should give the same result 
export function composeFunctionChainReverse(fxns:TypeArray[]) : TypeArray {
    if (fxns.length == 0)
        return idFunction();                
    let t = fxns[fxns.length - 1];
    for (let i=fxns.length-2; i >= 0; --i) 
        t = composeFunctions(fxns[i], t);
    return t;
}

// Creates a function type that generates the given type.
// If given no type returns the empty quotation.
export function quotation(x: Type) : TypeArray {
    const row = typeVariable('_');
    x = freshParameterNames(x);
    var r = functionType(row, x ? typeArray([x, row]) : row);
    r.computeParameters();
    r = normalizeVarNames(r) as TypeArray;
    return r;
}

// Returns the type of the id function 
export function idFunction() : TypeArray {
    return quotation(null);
}

//=====================================================================
// General purpose utility functions

// Returns only the uniquely named strings
export function uniqueStrings(xs:string[]) : string[] {
    var r = {};
    for (var x of xs)
        r[x] = true;
    return Object.keys(r);
}

//================================================================
// Pretty type formatting. 

function flattenFunctionIO(t: Type): Type[] {
    if (t instanceof TypeArray) {
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
    else if (t instanceof TypeArray) {
        return "[" + t.types.map(typeToString).join(' ') + "]";
    }
}
