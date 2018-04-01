"use strict";
// A Type Inference Algorithm that provides support for full inference 
// of non-recursive higher rank polymorphic types.
//
// Copyright 2017 by Christopher Diggins 
// Licensed under the MIT License
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var trace = false;
/** Turn on debug tracing */
function setTrace(b) {
    trace = b;
}
exports.setTrace = setTrace;
;
/** Called when the type unfiication process fails.  */
var TypeUnificationError = /** @class */ (function (_super) {
    __extends(TypeUnificationError, _super);
    function TypeUnificationError(u, a, b, msg) {
        if (msg === void 0) { msg = ""; }
        var _this = _super.call(this, "Unification failed between type " + a + " and " + b + " " + msg) || this;
        _this.u = u;
        _this.a = a;
        _this.b = b;
        _this.msg = msg;
        return _this;
    }
    return TypeUnificationError;
}(Error));
exports.TypeUnificationError = TypeUnificationError;
//=========================================
// Classes that represent kinds of types  
/** Base class of a type: either a PolyType, TypeVariable, or TypeConstant */
var Type = /** @class */ (function () {
    function Type() {
    }
    return Type;
}());
exports.Type = Type;
/** A collection of a fixed number of types can be used to represent function types or tuple types.
 * A list of types is usually encoded as a nested set of type pairs (PolyTypes with two elements).
 * The scheme is a list of universally quantified variables.
 */
var PolyType = /** @class */ (function (_super) {
    __extends(PolyType, _super);
    function PolyType(types) {
        var _this = _super.call(this) || this;
        _this.types = types;
        // Type schemes have to be manually computed. 
        _this.scheme = {};
        return _this;
    }
    Object.defineProperty(PolyType.prototype, "_str", {
        get: function () {
            return this.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolyType.prototype, "typeSchemeString", {
        get: function () {
            var r = values(this.scheme).join("!");
            return r ? "!" + r + "." : r;
        },
        enumerable: true,
        configurable: true
    });
    PolyType.prototype.toString = function () {
        return this.typeSchemeString + "(" + this.types.join(" ") + ")";
    };
    return PolyType;
}(Type));
exports.PolyType = PolyType;
/** A MonoType is either a Type variable or a type constant: not a PolyType. */
var MonoType = /** @class */ (function (_super) {
    __extends(MonoType, _super);
    function MonoType(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return MonoType;
}(Type));
exports.MonoType = MonoType;
/** A type variable is used for generics (e.g. T0, TR).
 * The type variable must belong to a type scheme of a polytype. This is like a "scope" for type variables.
 * Computing the type schema is done in an external function.
 */
var TypeVariable = /** @class */ (function (_super) {
    __extends(TypeVariable, _super);
    function TypeVariable(name) {
        return _super.call(this, name) || this;
    }
    TypeVariable.prototype.toString = function () { return "'" + this.name; };
    return TypeVariable;
}(MonoType));
exports.TypeVariable = TypeVariable;
/** A type constant is a fixed type (e.g. int, function). . */
var TypeConstant = /** @class */ (function (_super) {
    __extends(TypeConstant, _super);
    function TypeConstant(name) {
        return _super.call(this, name) || this;
    }
    TypeConstant.prototype.toString = function () { return this.name; };
    return TypeConstant;
}(MonoType));
exports.TypeConstant = TypeConstant;
/** Find a unified type. */
var TypeResolver = /** @class */ (function () {
    /** The consumer of the class has to provide a startegy for choosing the best unifier
     * when the unifier encounters different type constants. Examples strategies are:
     * - throw an error.
     * - see if one is a sub-type of another
     * - look for an appropriate type-cast
     * This is a great place to add logging as well, to have insights into the unification process.
     */
    function TypeResolver(typeStrategy) {
        this.typeStrategy = typeStrategy;
        /* Given a type variable name find the unifier. Multiple type variables will map to the same unifier. */
        this.unifiers = {};
    }
    /** Unify both types, returning the most specific type possible.
     * When a type variable is unified with something the new unifier is stored.
     * - Constants are preferred over lists and variables
     * - Lists are preferred over variables
     * - Given two variables, the first one is chosen.
     * - given two different constants, the unifier uses the provided strategy
     */
    TypeResolver.prototype.unifyTypes = function (t1, t2, depth) {
        if (depth === void 0) { depth = 0; }
        if (!t1 || !t2)
            throw new Error("Missing type expression");
        if (t1 === t2)
            return t1;
        if (t1 instanceof TypeVariable) {
            return this._updateUnifier(t1, t2, depth);
        }
        else if (t2 instanceof TypeVariable) {
            return this._updateUnifier(t2, t1, depth);
        }
        else if (t1 instanceof TypeConstant && t2 instanceof TypeConstant) {
            if (t1.name != t2.name)
                return this.typeStrategy.chooseConstant(t1, t2);
            return t1;
        }
        else if (t1 instanceof TypeConstant || t2 instanceof TypeConstant) {
            throw new TypeUnificationError(this, t1, t2);
        }
        else if (t1 instanceof PolyType && t2 instanceof PolyType) {
            return this._unifyLists(t1, t2, depth + 1);
        }
        assert(false, "unexpected code path: " + t1 + " and " + t2);
    };
    Object.defineProperty(TypeResolver.prototype, "state", {
        /** Debug function that dumps prints out a representation of the engine state. */
        get: function () {
            var results = [];
            for (var k in this.unifiers) {
                var u = this.unifiers[k];
                results.push("type unifier for " + k + " is type " + u);
            }
            return results.join('\n');
        },
        enumerable: true,
        configurable: true
    });
    /** Given a type variable, will return the unifier for it. */
    TypeResolver.prototype.getUnifier = function (v) {
        return (v.name in this.unifiers)
            ? freshParameterNames(this.unifiers[v.name])
            : v;
    };
    /** Returns a unified version of the type.
     * TODO: check for and handle recursion.
    */
    TypeResolver.prototype.getUnifiedType = function (expr, seenVars, depth) {
        var _this = this;
        if (seenVars === void 0) { seenVars = {}; }
        if (depth === void 0) { depth = 0; }
        if (expr instanceof TypeConstant)
            return expr;
        else if (expr instanceof TypeVariable) {
            if (expr.name in seenVars)
                return recursiveType(depth - seenVars[expr.name]);
            seenVars = __assign({}, seenVars, (_a = {}, _a[expr.name] = depth, _a));
            if (expr.name in this.unifiers) {
                var u = this.unifiers[expr.name];
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
            return clone(expr, function (v) { return _this.getUnifiedType(v, seenVars, depth); });
        }
        var _a;
    };
    /** Choose one of two unifiers, or continue the unification process if necessary */
    TypeResolver.prototype._chooseBestUnifier = function (t1, t2) {
        if (t1 instanceof TypeVariable && t2 instanceof TypeVariable) {
            return t1;
        }
        else if (t1 instanceof TypeVariable) {
            return t2;
        }
        else if (t2 instanceof TypeVariable) {
            return t1;
        }
        else if (t1 instanceof TypeConstant && t2 instanceof TypeConstant) {
            if (t1.name != t2.name)
                return this.typeStrategy.chooseConstant(t1, t2);
            return t1;
        }
        else if (t1 instanceof TypeConstant || t2 instanceof TypeConstant) {
            throw new TypeUnificationError(this, t1, t2);
        }
        else if (t1 instanceof PolyType && t2 instanceof PolyType) {
            var best = this._chooseBestUnifier(t1.types[0], t2.types[0]);
            return (best === t1.types[0]) ? t1 : t2;
        }
        assert(false, "unexpected code path: " + t1 + " and " + t2);
    };
    /** Unifying lists involves unifying each element. */
    TypeResolver.prototype._unifyLists = function (list1, list2, depth) {
        if (list1.types.length != list2.types.length)
            throw new Error("Cannot unify differently sized lists: " + list1 + " and " + list2);
        var rtypes = [];
        for (var i = 0; i < list1.types.length; ++i)
            rtypes.push(this.unifyTypes(list1.types[i], list2.types[i], depth));
        // TODO: this might not doing the correct thing w.r.t. schameas. 
        // Both lists have their own scheme. I know that the types are effcecitvely equivalent.
        // By keeping just one, I know that it is has its computed schem kept intact. 
        return list1;
    };
    /** All unifiers that refer to varName as the unifier are pointed to the new unifier. */
    TypeResolver.prototype._updateVariableUnifiers = function (t, u) {
        if (!(t instanceof TypeVariable))
            return;
        var name = t.name;
        for (var x in this.unifiers)
            if (isTypeVariable(this.unifiers[x], name))
                this.unifiers[x] = u;
        this.unifiers[name] = u;
    };
    /**
     * Computes the best unifier between the current unifier and the new variable.
     * Updates all unifiers which point to a (or to t if t is a TypeVar) to use the new type.
     */
    TypeResolver.prototype._updateUnifier = function (a, t, depth) {
        var u = this._getOrCreateUnifier(a);
        var v = (t instanceof TypeVariable) ? this._getOrCreateUnifier(t) : t;
        // Choise the best unifier 
        var best = this._chooseBestUnifier(u, v);
        // Each of these is potentially a type variable, and should point to the new best unifier    
        this._updateVariableUnifiers(a, best);
        this._updateVariableUnifiers(t, best);
        this._updateVariableUnifiers(u, best);
        this._updateVariableUnifiers(v, best);
        return best;
    };
    /** Returns the type unifier for a type variable, creating it if it doesn't exist. */
    TypeResolver.prototype._getOrCreateUnifier = function (t) {
        return this.unifiers[t.name] || (this.unifiers[t.name] = t);
    };
    return TypeResolver;
}());
exports.TypeResolver = TypeResolver;
//======================================================================================
// Helper functions 
/** Creates a type list as nested pairs ("cons" cells ala lisp).
 *  The last type is assumed to be a row variable. */
function rowPolymorphicList(types) {
    if (types.length == 0)
        throw new Error("Expected a type list with at least one type variable");
    else if (types.length == 1) {
        if (types[0] instanceof TypeVariable)
            return types[0];
        else
            throw new Error("Expected a row variable in the final position");
    }
    else
        return polyType([types[0], rowPolymorphicList(types.slice(1))]);
}
exports.rowPolymorphicList = rowPolymorphicList;
// Creates a row-polymorphic function type: adding the implicit row variable 
function rowPolymorphicFunction(inputs, outputs) {
    var row = typeVariable('_');
    inputs.push(row);
    outputs.push(row);
    return functionType(rowPolymorphicList(inputs), rowPolymorphicList(outputs));
}
exports.rowPolymorphicFunction = rowPolymorphicFunction;
/** Creates a poly type, and computes the type scheme. */
function polyType(types) {
    var r = new PolyType(types);
    computeScheme(r);
    return r;
}
exports.polyType = polyType;
/** Creates a type constant */
function typeConstant(name) {
    return new TypeConstant(name);
}
exports.typeConstant = typeConstant;
/** Creates the named type variable. */
function typeVariable(name) {
    return new TypeVariable(name);
}
exports.typeVariable = typeVariable;
/** Creates a N<->M function type, as a special kind of a PolyType */
function functionType(input, output) {
    return polyType([input, typeConstant('->'), output]);
}
exports.functionType = functionType;
/** Creates an array type, as a special kind of PolyType. */
function arrayType(element) {
    return polyType([element, typeConstant('[]')]);
}
exports.arrayType = arrayType;
/** Creates a list type, as a special kind of PolyType */
function listType(element) {
    return polyType([element, typeConstant('*')]);
}
exports.listType = listType;
/** Creates a recursive type. The numberical value
 * refers to the depth of the recursion: how many PolyTypes you have to go up
 * to find the recursion base case. This is a TypeConstant,
 * because the unification strategy can handles these cases specially.
 * TODO: provide access in the unifier so that
 */
function recursiveType(depth) {
    return typeConstant('_rec_' + depth.toString());
}
exports.recursiveType = recursiveType;
/** Returns true if and only if the type is a type constant with the specified name */
function isTypeConstant(t, name) {
    return t instanceof TypeConstant && t.name === name;
}
exports.isTypeConstant = isTypeConstant;
/** Returns true if and only if the type is a type constant with the specified name */
function isTypeVariable(t, name) {
    return t instanceof TypeVariable && t.name === name;
}
exports.isTypeVariable = isTypeVariable;
/** Returns true if any of the contained types have the specified name*/
function variableOccurs(type, name) {
    return containedTypes(type).some(function (t) { return isTypeVariable(t, name); });
}
exports.variableOccurs = variableOccurs;
/** Returns all types contained in this type. */
function containedTypes(t, r) {
    if (r === void 0) { r = []; }
    r.push(t);
    if (t instanceof PolyType)
        t.types.forEach(function (t2) { return containedTypes(t2, r); });
    return r;
}
exports.containedTypes = containedTypes;
/** Returns all of the type variables contained in this type without repetition. */
function typeVars(t) {
    return toTypeLookup(filterType(containedTypes(t), TypeVariable));
}
exports.typeVars = typeVars;
/** Returns type variables that are in the scheme. */
function typeVarsInScheme(t) {
    return toTypeLookup(values(t.scheme));
}
exports.typeVarsInScheme = typeVarsInScheme;
//========================================================
// Variable name functions
/** Rename all type variables os that they follow T0..TN according to the order the show in the tree. */
function normalizeType(t) {
    var indices = lookupToIndices(typeVars(t));
    return clone(t, function (v) { return "T" + indices[v.name]; });
}
exports.normalizeType = normalizeType;
/** Provides unique names for the type scheme types only.*/
function freshVariableNames(t) {
    var lookup = map(typeVars(t), newTypeVar);
    return clone(t, function (v) { return lookup[v.name]; });
}
exports.freshVariableNames = freshVariableNames;
/** Provides unique names for the type scheme types only.*/
function freshParameterNames(t) {
    if (t instanceof MonoType) {
        return t;
    }
    else if (t instanceof PolyType) {
        var lookup_1 = map(t.scheme, newTypeVar);
        var types = t.types.map(freshParameterNames);
        var r = new PolyType(types);
        // This should work, because we don't change anything that would affect the scheme. 
        r.scheme = t.scheme;
        // Now cloning will change all variable names, giving them fresh names, 
        return clone(r, function (v) { return lookup_1[v.name] ? lookup_1[v.name] : v; });
    }
}
exports.freshParameterNames = freshParameterNames;
/** Converts a number to a letter from 'a' to 'z', 'aa' to 'zz', etc. */
function numberToLetters(n) {
    var letterA = "a".charCodeAt(0);
    var letter = String.fromCharCode(letterA + n % 26);
    return n > 26
        ? numberToLetters(n / 26) + letter
        : letter;
}
exports.numberToLetters = numberToLetters;
/** Rename all type variables so that they are alphabetical in the order they occur in the tree */
function alphabetizeVarNames(t) {
    var indices = lookupToIndices(typeVars(t));
    return clone(t, function (v) { return numberToLetters(indices[v.name]); });
}
exports.alphabetizeVarNames = alphabetizeVarNames;
/** Compares whether two types are the same by normalizing the type variables and comparing the strings. */
function compareTypes(t1, t2) {
    var s1 = normalizeType(t1).toString();
    var s2 = normalizeType(t2).toString();
    return s1 === s2;
}
exports.compareTypes = compareTypes;
//================================================
// Helper functions
/** Given a variable name remapping function creates new types.  */
function clone(t, remapper) {
    if (t instanceof TypeVariable) {
        return remapper(t);
    }
    else if (t instanceof TypeConstant) {
        return t;
    }
    else if (t instanceof PolyType) {
        var types = t.types.map(function (x) { return clone(x, remapper); });
        return polyType(types);
    }
    throw new Error("Not a recognized type: " + t);
}
exports.clone = clone;
/** Used for generating new names */
var typeId = 0;
/** Returns a new uniqely named type variable. */
function newTypeVar() {
    return typeVariable("@" + typeId++);
}
exports.newTypeVar = newTypeVar;
/** An internal function for computing type schemes. */
function _isTypeVarUsedElsewhere(types, varName, pos) {
    return types.some(function (v, i) { return i != pos && variableOccurs(types[i], varName); });
}
/** Associate the variable with a new type scheme. Removing it from the previous type scheme */
function _reassignVarScheme(typeVar, t) {
    for (var _i = 0, _a = containedTypes(t); _i < _a.length; _i++) {
        var x = _a[_i];
        if (x instanceof PolyType && typeVar.name in x.scheme)
            delete (x.scheme[typeVar.name]);
    }
    t.scheme[typeVar.name] = typeVar;
}
exports._reassignVarScheme = _reassignVarScheme;
/**
 * Computes the proper type-scheme for a PolyType. This is different than the Hindly-Milner type system.
 * In HM all type variables are universally quantified at the top-level, but this approach
 * allows us to figure out exactly where the quanitfication happens.  */
function computeScheme(t) {
    // Recursively compute the parameters for base types
    for (var _i = 0, _a = t.types; _i < _a.length; _i++) {
        var x = _a[_i];
        if (x instanceof PolyType)
            computeScheme(x);
    }
    for (var i = 0; i < t.types.length; ++i) {
        var child = t.types[i];
        // Individual type variables are part of this scheme 
        if (child instanceof TypeVariable)
            t.scheme[child.name] = child;
        else if (child instanceof PolyType) {
            for (var _b = 0, _c = values(typeVars(child)); _b < _c.length; _b++) {
                var childVar = _c[_b];
                if (_isTypeVarUsedElsewhere(child.types, childVar.name, i))
                    _reassignVarScheme(childVar, t);
            }
        }
    }
    return t;
}
exports.computeScheme = computeScheme;
//===============================================================
// Generic helper functions
/** Returns the keys of any object.  */
function keys(obj) {
    return Object.keys(obj);
}
exports.keys = keys;
/** Returns the values of any object.  */
function values(obj) {
    return keys(obj).map(function (k) { return obj[k]; });
}
exports.values = values;
/** Given an array of values creates a lookup.  */
function toLookup(vals, keyFunc, valFunc) {
    if (valFunc === void 0) { valFunc = exports.identity; }
    var r = {};
    var i = 0;
    for (var _i = 0, vals_1 = vals; _i < vals_1.length; _i++) {
        var v = vals_1[_i];
        r[keyFunc(v)] = valFunc(v, i++);
    }
    return r;
}
exports.toLookup = toLookup;
/** Creates a type lookup.  */
function toTypeLookup(vals) {
    return toLookup(vals, function (v) { return v.name; }, function (_) { return _; });
}
exports.toTypeLookup = toTypeLookup;
/** Given a lookup table converts it into a key to number table. */
function lookupToIndices(lookup) {
    return toLookup(keys(lookup), function (k) { return k; }, function (k, i) { return i; });
}
exports.lookupToIndices = lookupToIndices;
/** Things that should never happen. This is used primarily to catch refactoring errors,
 * and to help the reader understand the code. */
function assert(condition, msg) {
    if (!condition)
        throw new Error("Internal error: " + msg);
}
exports.assert = assert;
/** Creates a unique string list. */
function uniqueStrings(xs) {
    return keys(toLookup(xs, exports.identity));
}
exports.uniqueStrings = uniqueStrings;
/** Given an array of values, filters it according to the given type. */
function filterType(vals, className) {
    return vals.filter(function (v) { return v instanceof className; }).map(function (v) { return v; });
}
exports.filterType = filterType;
/** The function that takes a value and returns it. */
exports.identity = function (_) { return _; };
/** Returns a lookup function from a lookup table. */
function lookupFunction(lookup) {
    return function (_) { return lookup[_]; };
}
exports.lookupFunction = lookupFunction;
/** Given a lookup, creates a new transform that remaps all of the values.   */
function map(lookup, f) {
    return toLookup(keys(lookup), exports.identity, f);
}
exports.map = map;
//# sourceMappingURL=type-system.js.map