## Heron Compared to TypeScript / JavaScript

Heron most closely resembles a subset of the JavaScript language. It has a type system that is more restricted than TypeScript, but the type-inference system is more aggressive. Heron also has no concept of classes or prototypes.  

A longer list of differences between Heron and TypeScript/JavaScript:

* only primitive types, generic types (including array and function), and type variables 
* no object literals
* no `this` keyword
* functions can be called using dot notation on the first argument
* functions can be ovoverloaded (two functions can have the same name if the inferred types are different)
* operators can be overloaded
* operators can be passed as functions 
* `var` statements are equivalent to `let` statements in TypeScript/JavaScript
* no `const` statements
* module level variables cannot be modified
* variable types are inferred
* parameter and return types of functions are inferred 
* variables have to always be initialized
* variable binding expression allows variable declarations to be used as expressions
* arrays are immutable
* modifying arrays can only be done with `ArrayBuilder`
* each `ArrayBuilder` modification creates a new array 
* only supports a `for..in` loop form which is the same as `for..of` loop in JavaScript
* a built-in range operator `from..to` generates an array of contiguous values (exclusive upper bound)
* arrays do not necessarily allocate memory, e.g. 0..100000000, has O(1) memory consumption
* module names are URN's with the version number encoded in it 
* all files specify the version of the language 
* all definitions must be in a module
* variables cannot be reassigned to objects of a different type
* no `async` or `await` support
* no operators spread support 
* no class or interface definitions
* anonymous functions use a *fat arrow* syntax
* Separation betwen integers (`Int`) and floating point numbers (`Float`)
* Support for two, three, and four dimensional numerical types like in GLSL (`Float2`, `Float3`, `Float4`). 
* Semicolons are required as statement terminators.
* No statement labels
* No comma operator
* No switch statement
