# Heron Programming Language

[![DeepScan grade](https://deepscan.io/api/projects/2208/branches/12139/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2208&bid=12139)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/564c6796b20d4945ae86bd064eabfcb0)](https://www.codacy.com/app/cdiggins/heron-language?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cdiggins/heron-language&amp;utm_campaign=Badge_Grade)

See a demo of 3D geometry in thre browser at: [https://cdiggins.github.io/heron-language](https://cdiggins.github.io/heron-language)

Heron is a small cross-platform language designed for ease of use, performance, and safety with a JavaScript like syntax. Heron emphasizes pure functional programming code, but looks like a traditional imperative or object-oriented code. 

## Heron Design Goals

Heron is intended as a language for expressing libraries of algorithms, that can be reused within other languages as opposed to a language for writing full applications. 

Heron is a fully statically typed language that does not require type annotations in most cases (it supports type inference), so it looks and feels like a dynamic language, with the potential efficiency, safety, and tooling of a compiled language. 

The Heron design is influenced most heavily by JavaScript, Haskell, C#, Scala, GLSL, and Scheme, but other languages play a role as well. Heron has a powerful module system built into the language, and a language versioning scheme for maintaining backwards compatibility while the language evolves. 

Current development on Heron is focused on numerical array processing, such as required in sound and image processing, and data visualization in 2D and 3D. The reference implementation generates JavaScript, but a C++ generator is planned as well.

Heron is built on the principle of emphasizing functional programming, immutable data structures, and type safety while minimizing complexity.

## Implementation

The v0.1 implementation of Heron is written in TypeScript and generates JavaScript. A Heron to C++ compiler is being planned. 

The language implementation is quite small and simple compared to  other strongly typed languages. 
 
Please [reach out to me](mailto:cdiggins@gmail.com) if you have a use case for Heron in other contexts and perhaps we can work together. 

# Files and Modules

```
language heron:std:0.1;

module heron:intrinsics:0.1
{
    function main() {
        print("Hello world");
    }
}
```

At the top of every Heron source code file is a language version statement. This is intended to facilitate backwards compatibility and smooth language evolution. The language version statement has the form `language name:dialect:version;`. The language name is always `heron` and for now the only supported dialect is the `std`. The current language version is `0.1`.

All code must be defined within a named module. In Heron v0.1 files can contain only one module. 

Like the language version statement module names have three parts separated by colon character (e.g. `organization:project:version`). The first part is the organization name, the second is the project/library name, and the third is the version identifier. A module name part can be a combination of letters, numbers, hypen, underscore, or dot characters.
 
## Top Level Forms

At the top-level scope of a module the following definitions are allowed: 

* Functions
* Intrinsic  
* Variables
* Imports
* Types 

### Function Definitions

Heron supports named functions and anonymous functions. Both function forms support either expressions as bodies or 

```
// Named function with statement body
function sum(xs) {
    var result = 0;
    for (var x in xs)
        result += x;
    return result;
}

// Anonymous function with statement body
var sum = (xs) => {
    var result = 0;
    for (var x in xs)
        result += x;
    return result;        
}

// Named function with expression body
function sum(xs) = 
    xs.reduce(0, op+);

// Anonymous function with expression body
var sum = (xs) => 
    xs.reduce(0, op+);
```

#### Function Overloads

Unlike JavaScript and TypeScript Heron allows the same name to be used for multiple functions. Like other strongly typed language, multiple functions may have the same name if they differ by the inferred type signature. 

When multiple function can be chosen from a single name, the function with the type parameter that best matches the types of the expressions is chosen. If there is ambiguity, the most general type is chosen. This means that if you have an overloaded set of fucntions with ambiguity (like `op+`) then at least one function should have a generic implementation.   

#### Operator Overloads 

Most binary operators can be overloaded. The Heron compiler maps operator calls to functions that have the letters `op` before the operator symbol (e.g. `op+`, `op<=`, `op..` etc.). This allows operators to be passed as function arguments. For several examples of operator definitions see the `intrinsics.heron` file. 

### Intrinsics 

An intrinsic is a primitive function that the compiler has built-in knowledge of. Intrinsics usually have type annotations provided, otherwise the most generic type signature is assumed (e.g. `Func<T0, T1, TR>`).

The module named `heron:intrinsics:0.1` is implicitly loaded in every file of a project, without having to be explicitly imported. 

### Module Variable Declarations 

Variables declared at the module level cannot be rebinded. Apart from that module variables are the same as regular variables.

### Imports 

Import statements can occur anywhere, but affect the whole module. All definitions from the imported module are resolved as if they were declared within the importing module level scope. 

Imported modules must have the same or lesser language version than the importing module. (e.g. Heron 2.3.2 can import Heron 2.2.4 but not Heron 2.5.0). Version 1.0.0 and above of Heron is not guaranteed to be backwards compatible with pre-1.0.0 versions of Heron. 

## Statements

Heron has the following statements:

* Variable declarations
* While statements
* Do/while statements
* For statement
* Compound Statement
* If statement 
* Empty statement 

### For Statements

The for loop in Heron is similar to a for-each statement in many languages, or the for-of statement in JavaScript. 

`for (var x in 0..100) print(x);`

A singled named variable is assigned each value of the array expression in order. In the above example the range operator is used to create am array of values from 0 to 99 inclusively. 

## Expressions

Heron has the following expression forms: 

* Binary arithmetical operators `+ - * / %`
* Binary comparison operators `< > <= >= == !=`
* Boolean operators `&& || ^^`
* Array indexing: access `xs[i]` and assignment `xs[i] = x`
* Postfix increment and decrement `++ --`
* Ternary conditional operator `?:`
* Lambda expression `(args) => body`
* Regular function call: `f(arg0, arg1, ..., argN)`
* Method call syntax `arg0.f(arg1, ..., argN)`
* Propery syntax `arg0.f`
* Variable binding expression `var name in expr`
* Assignment `= += = *= /= %=`

## Function Calls and Object Oriented Syntax

Heron is explicitly not an object oriented language, but supports a dot syntax enabling method and property chaining.

In Heron every function is a static function (there is no implicit `this` variable) but you can also call any function using a dot syntax, with the first argument on the left of the function. If the the function is a unary function (has only one argument) then when using dot syntax the parentheses are omitted, giving it the appearance of a computed property. 

```
function sqr(x) = x * x;
function multiply(x, y) = x * y;

// The following two are equivalent and print 36
print(sqr(6)); 
print(6.sqr); 

// The following two are equivalent and print 42
print(multiply(6, 7));
print(6.multiply(7))

// The following is a compilation error, it would be equivalent to writing `sqr(6)()`
print(6.sqr())
```

# The Heron Type System 

Heron is a strongly typed programming language. This means that all variables have a type that is determined at compile-time. 

## Type Inference 

Variable types are deduced from the types of the expressions assigned to them. Function argument types are deduced from how the arguments are used within the function: the mosts specific type satisfying all constraints (i.e. the usage) is assigned.   

## Supported Types 

Heron v0.1 supports the following types:

```
    Float
    Float2
    Float3
    Float4
    Int
    Bool
    Array<T>
    ArrayBuilder<T>
    Func<T0, T1, ..., TN, R>
    Mesh
```

These are declared in the intrinsics module, but in v0.1 new types can't' be added without adding support in the compiler.

## Type Casts

The following casts happen implicitly:

```
    Float <- Int
    Float2 <- Float
    Float3 <- Float, Float2
    Float4 <- Float, Float2, Float3    
```

## Arrays

Arrays cannot be modified: you cannot assign new values or add or remove values. You can only do that with an `ArrayBuilder` instance which can be constructed from an `Array`. 

Arrays support two basic operations:  

```
    intrinsic count<T>(xs: Array<T>): Int;
    intrinsic at<T>(xs: Array<T>, i: Int): T;     
``` 

The basic array constructor takes the number of items in the array and a function that generates values in the array for each index: 

```
    intrinsic array<T>(n: Int, f: Func<Int, T>): Array<T>;
```

The range operator is defined as follows:

```
    function op.. (from: Int, upto: Int): Array<Int>
        = array(upto - from, (i) => i + from);
```

In the default implementation is a rich set of arrays operations defined as a library. See the [source code](input/array.heron) for the implementations of different functions.

### Common Immutable Array Operations

There most used building block operations used when processing arrays: 

```
    map(xs: Array<T>, f: Func<T, U>): Array<U>;
    filter(xs: Array<T>, f: Func<T, Bool>): Array<T>;
    reduce(xs: Array<T>, U init, Func<T, U, U> f): U;
    zip(xs: Array<T>, ys: Array<U>, f: Func<T, U, V>): Array<V>;
    slice(xs: Array<T>, from: Int, to: Int): Array<T>;
```

## ArrayBuilder 

An array builder is another immutable data type that allows the user to set values on an array using familiar indexing assignment syntax, and supports adding elements to the end of the array. 

An `ArrayBuilder` supports the same operations as an `Array` with additional operations:

```
    push<T>(xs: ArrayBuilder<T>, x: T): ArrayBuilder<T>;
    set<T>(xs: ArrayBuilder<T>, i: Int, x: T): ArrayBuilder<T>;
```

Note that "setting" or "pushing" onto an `ArrayBuilder` instance, creates a new instance: it does not affect the original.

An `ArrayBuilder` supports an index assignment syntax:

```
    xs[i] = 42
```

Which is rewritten by the compiler as:

```
    xs = xs.set(i, 42);
```

An `ArrayBuilder` can be constructed from an `Array` as follows:

```
    intrinsic mutable<T>(xs: Array<T>): ArrayBuilder<T>;
```

Example of using `ArrayBuilder`:

```
    var xs = [1,2,3].mutable
    xs[0] = 5;
    print(xs[0]); // 5

    xs = xs.setAt(0, -1);
    print(xs[0]); // -1

    xs.setAt(0, 3); 
    print(xs[0]); // Still -1
    
    xs = xs.push(9);
    print(xs.count); // 4
```

### QuickSort: An ArrayBuilder Example

The following is an example of a quick-sort algorithm written using the `ArrayBuilder` 

```
    function partition(a, lo, hi) {
        var p = a[lo];
        var i = lo - 1;
        var j = hi + 1;
        while (true) {
            do { i++; } while (a[i] < p);
            do { j--; } while (a[j] > p);
            if (i >= j) return j;
            swapElements(a, i, j);
        }
    }

    function qsort(a, lo, hi) {
        if (lo < hi) {
            var p = partition(a, lo, hi);
            qsort(a, lo, p);
            qsort(a, p+1, hi);
        }
        return a;
    }

    function sort(xs) 
        = xs.mutable.qsort(0, xs.count-1).immutable;    
```    

# Appendices

* [A comparison of Heron to JavaScript / TypeScript](comparison.md)
* [A brief history of the Heron language](history.md)
