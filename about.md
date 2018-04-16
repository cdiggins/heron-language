# About Heron

Code reuse requires:
1. Code is easy to read and validate
1. Code is generic: works for different 
1. Dependencies are explicit and easily managed 
1. Code is strongly typed
1. Code is robust 
1. Functions can be passed as argument 
1. Syntax is regular and easily parsed
1. Semantics are simple and 

Strong static type systems are critical for the efficient creation of software that is reusable, efficient, and secure.  

The problem is that language with non-trivial type systems have a steep learning curve, and make the code arguably harder to read. 

I was initially inspired by the psuedo-code used in the (An Introduction to Algorithms and Data Structure)[https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844] by Cormen, Leiserson, Rivest, and Stein. 

Later on I was inspired by the simplicity and elegance of Python. 

Then I learned Scala. That was pretty cool! 

But Scala was hard to use: why does it not infer the types I write? Read this 1000 page manual, and get a degree in computer science.

Many people get work done in Python and JavaScript. 

But they are both severely limited languages: terrible performance, lots of gotchas, quickly gets complicated, easy to use naively, hard to use well. 

In a production setting you want code to be easily predictable and reliable. 

> Note: these are amazon affiliate links throughout the documentation. If you purchase any books through these links it provides me with a small financial recompensation. You can think of this as a way to make a donation, and getting something in exchange. In otherwords Amazon is my kickstarter until I take the time to make a compelling pitch. 

I really like to write computer programs, but I really hate dealing with tools that are badly designed. Many programming languages force programmers to make choices or deal with problem that they shouldn't have to.

My vision for a language was that:
1. memory management is automatic
1. syntax was simple and consistent
1. it looks and feels like mathematical notation
1. static typing 
1. it makes immutable programming easy 

Object oriented programming sucks. 

JavaScript makes me mad. 

C++ makes me mad. 

C# doesn't make very mad, but the fact that other people can't write good C# code makes me sad. 

Lisp and Scheme are cool, but then I can't read it when other people write it. The syntax is too far from math, or most other languages. 

Static types are a necessity, but introduce complexity 

 


### Swift

Heron also syntactically has a lot in common with Swift, which is also a language which resembles a strongly typed version of JavaScript. Some of the differences are:

* Heron does not require type annotations on functions, whereas Swift does
* The [Swift implementation](https://github.com/apple/swift) is considerably more complex than Heron 
* Heron does not support classes
* The current implementation of Heron does not support the definition of new types
* Heron types are immutable 
* Swift cannot be run in the browser 

Heron syntax is very similar to JavaScript, except that the `$` is not a valid character in program element names.  


## Imports 

Module im

Modules always implicitly import a module called `intrinsics.heron`, with the same version as the language.  

Importing a module automatically exposes all top-level module 

# Features of the Language 

## Type Inference

Heron's standout feature is the fact that even though it is statically typed, types are inferred in more scenarios than many other languages. This means that the language looks and behaves like a dynamic language in many casess.    

## Immutable Programming Support 

Many developers are discovering that using immutable data structures, and functions without side-effects (a.k.a referentially transparent or *pure* functions), is an excellent way to accelerate software development. 

Immutable programming reduce the number of errors in code, and facilitates code refactoring.  

## Arrays are Immutable 

In Heron arrays are abstract data types understood by the compiler. An array is a data-type that provides two functions:
1. `count(xs: Array<T>): Int`
2. `at(xs: Array<T>, n: Int): T`

## Array Builders are Immutable too

An array builder is a special data type allows the user to set values on an array using familiar indexing assignment syntax, and supports adding elements to the end of the array. 

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

The array index assigment expression (e.g. `xs[n] = x`) is actually syntactic sugar for a call to the `setAt` function and an assignment operation (e.g. `xs = xs.setAt(n, x)`).

## 

## Function Bodies as Expressions

Heron named and anonymous functions can have bodies that are either expressions or statement. 

## Lambdas (Anonymous Functions)

Heron supports lambdas using a similar "fat arrow" syntax as used in JavaScript, TypeScript, C#, and other languages. 


## Optional Type Annotation 

In Heron the types of a function argument, the return type of a function, and variable declarations are all optional. 

## Generic Types

Heron supports generic types.    



## Only one kind of variable definition 

There is no `let` or `const` keyword in Heron. The `var` keyword declares a variable. A variable name can be bound (assigned) another value. 

## No This Keyword

Object oriented programming is at odds with immutable and functional programming styles. You can write code that looks like object oriented code (e.g. using fluent or method chaining syntax) but don't have to deal with subtle traps that arrive from the contextual interpretation of `this`. 

## Dot Notation on all Operators 

The familiar dot notation afforded by many object oriented languages is provided in Heron on any 

## Operator Overloading

JavaScript is missing a useful feature of being able to define operators on numerical types beyond simple numbers. 

## Insignificant Whitespace

Languages like Python that give syntactic meaning to whitespace, are prone to errors when refactoring (read cutting and pasting) code from different spaces.  

## Function Overloading 

Like other strongly typed language, multiple functions may have the same name if they differ by the inferred type signature. 

When multiple function can be chosen from a single name, the function with the type parameter that best matches the types of the expressions is chosen. If there is ambiguity, the most general type is chosen. This means that if you have an overloaded set of fucntions with ambiguity (like `op+`) then at least one function should have a generic implementation.  


 
## The Motivations for Heron 

Heron was born out of a desire to make programmers more productive, and to increase chances that algorithms could be easily reused. 

