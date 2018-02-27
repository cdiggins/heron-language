# Why Heron

Heron is a programming language that strives for simplicity, safety, and code reuse. Heron supports multiple compilation targets, with the first implementation focusing on JavaScript. 

Heron is inspired by JavaScript, Python, Scala, Haskell, and C#. 

Heron contrasts with languages with significantly more complex syntax like Rust, C++, C#, F#, TypeScript, etc. in order to keep the language easy to learn, and as effective.  

Heron is a type-inferred language, and focuses on efficient array processing. Heron supports generics and higher-order functions. Heron emphasizes the use of immutable data structures. 

## Some Features 

Range operator a..b
Slice operator: xs[0:10]
Stride operator: xs[0:100:2] 
Arrow functions: 
Type inference of polymorphic functions 
All functions can be called using traditional function f(a, b) or invoked as method on first argument a.f(b)
Structural subtyping 
Operator overloading
Object literals


## Features Omitted 

Type declarations are not required. 
No difference between var, const, and let (just var)
No explicit memory management
No visibility management
No classes 

## Heron to JavaScript

One of the use cases of Heron is as a better JavaScript: 

1. Better management of module dependencies, via URNs
2. Better const management
3. Optimization of numerical array handling (via compiling to TypedArrays)
4. Restricted syntax 
5. Fewer gotachas 
6. Better performance
7. Static analysis 
8. Type inference 

Languages and technologies in this space:
1. Flow
1. Dart
1. TypeScript
1. CoffeeScript
1. Elm

## Heron for 3D Programming  

Heron is particularly well-suited to programming 3D applications because it is very strong at array and numerical processing. 

## Multi-Target

A huge advantage of Heron is the write-once run anywhere philosophy. Heron code can just as easily target JavaScript or C++. 

## Open and Simple Implementation: No Stinking LLVM

Many languages have very large and complex toolchains (e.g. based on LLVM), whereas the primary Heron implementation is written in TypeScript and can run on any browser.

The implementation was intended to be easy enough that any computer science university student should be able to fork and start playing with the language implementation. 

This is related to the principle that programming language success is connected in large part to tooling. 

## The Module System 

One of the most important features of a programming language is the the ecosystem of libraries. This is conncted to the module system supported or encouraged by the language. 

## Specification over Implementation 

A philosophy of Heron is that the language specification is more important than an implementation. Many languages are stunted in growth because they are dependent on implementations (e.g. Perl, Python).   

## Immutability for the Win

The software development community at large is starting to appreciate the strength of the pure functional programming approach which emphasizes immutable data structures. We are seeing an increasing uptake of pure functional programming paradigms in JavaScript applications and elsewhere. 

Heron is a language that makes it easy to write immutable code, and makes it very hard to have side effects. 
  
## WASM Targetted Languages

https://github.com/appcypher/awesome-wasm-langs

## Languages for Array Processing

https://github.com/grame-cncm/faust

## Rant

1. Proper module systems
1. Full type inference 
1. Languages that aren't their implementation 
1. Removing the dependency on LLVM
1. Multiple targets: not just  JVM or LLVM or .NET or CLI or ....
1. Tools that are accessible to people
1. Simple syntax: stop making 
1. Breaking some patterns
1. Watching what JavaScript is doing well 
1. Breaking free from the evils of Mutation 
1. Features that we don't need
1. Comparing Rust with Go

## Paper Ideas
 
Onward: the next genertion of languages 
SLE: implementing a language in TypeScript
Onward: the tyranny of syntax
Onward: The false dichotomy of "dynamic" verus "non-dynamic" 
Onward: The end of "object oriented programming" 
Onward: On designing a language, doing one thing and doing it well
SLE: the importance of module systems
SLE: what makes languages popular 
SLE: the importance of an ecosystem for a language 
SLE: the importance of syntax and parsing 
SLE: build times
SLE: the importance of the REPL

//==

The module 

"language:flavor:version:organization:library-name:version"

heron:std:1.0.0:cdiggins:geometry:0.14.0

//==

Heron is a new programming language designed with array processing in mind, making it well suited for performing computations in 2D and 3D graphics. 

Heron is a multi-platform language that allows a user to target different platforms such as desktop, mobile, browsers, GPU, or embedded devices. 

Heron ships with a large and well-tested library for 3D graphics. 

The salient features of Heron are: 
1. Simple and concise syntax
1. Short learning curve 
1. Support for pure functional programming
1. Advanced module system
1. Multiple platforms and targets 

//==


Compared to JavaScript

1. More succint 
2. Simpler syntax (more regular, fewer symbols, easier to read) 
3. Simpler semantics 
3. Safer (emphasizes immutability, type-safety)
4. Better performance (compiled, optimized, inline, partial evaluation) 
5. less memory (optimizer, immutability => shared data structures)
6. Future proofing of code (should always run correctly if source module can be found)
7. Easier to write translators, analyzers, compilers, and interpreters 

Subjective 

1. Easier to read, write, learn, understand, predict, debug, refactor, and reuse 

Disadvantages 

1. Less flexibility 
1. Some old-school coding approaches (chaotic mutable state everywhere) have to be abandoned in favor of more functional approach: input -> output. This is balanced hopefully with a very succint and easy to read syntax, without too many symbols, and lots of easy to read example libraries. 

Random fun features:

1. No let/const, just var (but means let)
1. No this
1. No prototypes
1. Types are optional (inferred)
1. Data structures are immutable 
1. Range operator ".."
1. Only one kind of for loop: "for x in xs" (no "of" no redundant )
1. Functions can be called as if methods on the first argument (like C# extension methods)
1. Two types of arrays: immutable (default) and mutable 
1. Module and imports are part of language
1. No worries about "export" or visibility: everything public 
1. Explicit versions of modules in import statement
1. Every file specifies language version used to author language (future proof your code)
1. 'var in' allows expressions to be expressed as vars.
1. function = expr syntax for shorter function definitions
1. Always 'strict' 
1. Foreign function interface for targetting different platforms 

Compared to TypeScript 

1. Much simpler type system
2. For everything else see JavaScript.

Compared to C++

1. See JavaScript 
1. Performance should be nearly equivalent: it can be compiled to efficient C++ code 

Compared to other languages:

Generally speaking it is a "better" language, but it is more restricted to specific problem domains. We have left out recursive data-structures. This is a big omission, that makes it harder to implement things like trees and massive object oriented class hiearchies with state.

Philosophy

1. Code reuse
1. Safety
1. Simplicity  
1. Write once - run anywhere 
1. Open implementation 
1. Compilers should work harder for the programmers
1. Object oriented programming is dead 

Areas of specialty

1. 3D graphics
1. 2D graphics
1. image processing 
1. point-cloud processing
1. sound processing
1. statistics 
1. data analysis
1. data visualization
1. physics
1. genetics 
1. astronomy 
1. chemistry 
1. string processing
1. database back-end
1. file processing
1. animation
1. motion graphics 
1. data cleaning
1. pattern recognition
1. machine learning
1. animation
1. simulation
1. cfd (vis/sim)
1. cryptography
1. music
1. art
1. rendering
1. procedural architecture


## Ideas for Algorithms
https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html
https://docs.gimp.org/en/plug-in-convmatrix.html
https://threejs.org/examples/#webgl_animation_cloth
https://threejs.org/examples/#webgl_effects_stereo

Animated camera
MPEG encoding
Integration
Curve fitting
Torus
Heat map
Curvature
UV Density 
Voronoi
CSG
Cloth simulation
Multi-fractal
Terrain
Water 
Snow
Fog
Foam 
Bubbles
Lofting 
Fractals
Dna
Draw the HIV virus
Physics
Catmull clark
Intesection 
Convex hull
Anti-aliasing
Image filters
Noise algorithms
Plants
Hilbert curve
L-System
Voxelization
Poissonian
Ray-casting
Edge smoothing
Simplification

//==

https://github.com/mrdoob/three.js/blob/master/examples/js/objects/Water.js

//==

Type switch?? 

match (f.args.type) {
    (Array, Number) -> vector3$Array;
    (Array, Array) -> vector3$Array$Array;
}

https://fsharpforfunandprofit.com/posts/match-expression/
https://tour.golang.org/methods/16 

//==

"as" 

    intrinsic abs(x: Num): Num;
    intrinsic acos(x: Num): Num;
    intrinsic asin(x: Num): Num
    intrinsic atan(x: Num): Num;
    intrinsic atan2(y: Num, x: Num): Num;
    intrinsic ceil(x: Num, y: Num): Num;
    intrinsic ceil(x: Num): Num;
    intrinsic clamp(x: Num, min: Num, max: Num): Num;
    intrinsic cos(x: Num): Num;
    intrinsic exp(x: Num): Num;
    intrinsic floor(x: Num): Num;
    intrinsic log(x: Num): Num;
    intrinsic max(x: Num, y: Num): Num;
    intrinsic min(x: Num, y: Num): Num;
    intrinsic near(x: Num, y: Num, e: Num): Num;
    intrinsic pow(x: Num, y: Num): Num;
    intrinsic round(x: Num): Num;
    intrinsic sin(x: Num): Num;
    intrinsic sign(x: Num): Num;
    intrinsic sqrt(x: Num): Num;
    intrinsic tan(x: Num): Num;    

    intrinsic op+(x: Num, y: Num): Num;
    intrinsic op-(x: Num, y: Num): Num;
    intrinsic op*(x: Num, y: Num): Num;
    intrinsic op/(x: Num, y: Num): Num;
    intrinsic op%(x: Num, y: Num): Num;

    intrinsic op>(x: Num, y: Num): Bool;
    intrinsic op>=(x: Num, y: Num): Bool;
    intrinsic op<(x: Num, y: Num): Bool;
    intrinsic op<=(x: Num, y: Num): Bool;
    intrinsic op!=(x: Num, y: Num): Bool;
    intrinsic op==(x: Num, y: Num): Bool;

    //==

    TODO: 
