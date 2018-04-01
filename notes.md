# Notes 

* Walk through the code, find all of of the matching functions, all of their types and all of the types of the variables. 
* I think I need to define a function to find the types for a function a parameter, or a function 
return type. 
* These things will happen: BUT they aren't going to be fancy. 
* The old types module needs to be removed. 
* The concept of scoping and name analysis is less important than ever. It seems I need to do that from the evaluator. 

---

* I need the list of all functions called on each argument. 
    * This will give me the various interfaces/traits that are present. 
    * It will have to happen during the name analysis step. 

* I want to find if something is a function argument. This means that it is part of a function call.

-- 

NOTE: everything boils down to a core set of primitives. 

-- 

The theory is that there is a primitive set of intrinsics that we care about, and that from these 
we can define new types. 

1) I am trying to infer traits. It seems possible, and perhaps unnecessarily hard. 
2) If I was to just go ahead and define the traits wouldn't it be easier? 

BUGL: right now there are lambdas that arenot referncing things. 

So, I could allow new traits to be defined? There is nothing wrong with this. It is definitely 
possible, and probably easier than trying to infer them? 

Especially if we know at the bottom there are traits. 

So it is like an interface, but not explicitily defined. 


    interface IArray<T> {
        at(this, index: Int): T;
        count(this): Int;
    }

    interface ICompare {
        compare(this, this): Int;
    }

    interface ICompareTo<T> {
        compare(this, T): Int;
    }

    interface IEquals {
        equals(this, this): Bool;
    }

    interface IEqualsTo<T> {
        equals(this, T): Bool;
    }

    interface IMappable<T> {
        map(this, f:Func<T, T>): this;
    }

    interface ISet<T> {
        contains(this, T: item): Boolean;
        union(this, this): this;
        intersection(this, this): this;        
    }

This is all looking a lot like Go, and suspiciously like a static version of Self. 

Of course, none of these ideas are new. 

What I am trying to do is make it statically typed, and inferred! 

Which I am damn close to getting to work.

Right now the challenge is trying to figure out, what are the types? 

The type of a function depends on the types of the functions it uses. 

Which sometimes might depend on the types passed to it. BUT it shouldn't matter.

I'm not crazy about resolving types at instantiation time. However, if I have to, maybe I will. 

What I don't like is that I just say, I have these base types, and then it won't work for new types. 

HOWEVER: this is a feature for a later version. 

Though, at the very least I would like the "Array" to work with generics. 

The fact that Go doesn't support this just seems to be lack of experience and knowledge by the  language design team. They might not think it is importatn because they don't know how to use it or how to implement it. Kind of mean, but probably true. 

//==

Where can an object reference count be increment:

1. When captured as a closure 
1. When added to an array (and object when we support it)
    * Via "set"
    * Via array syntax

What objects need reference counts? 
    * Arrays 
    * Functions (maybe?)
    * Object (when supported)

Random thought: the types of optimizations that are relevant:
    1. No intermediate structures.
    1. Loop fusion
    1. Minimize the creation of lambda functions

//==

Heron is not an object-oriented language. 
Heron is closest to Go in terms of philosophy and design.
Heron does not support concurrency.
Heron is designed to support efficient processing of arrays of values using a simle syntax. 

//==

Right now I am doing VERY well. There are lots of things happening.

So: I need a type. For that I need to know what functions are being called.
To do that I need to do some evaluation. 

What function is called, depends on the type of the arguments. 

The type of the arguments depends on what functions are being called? 

This seems too circular. 

//==

When evaluating, my "scope" does not find functions. This is becacuse the functions are not
loaded into the scope. This scope is not the same as the other scope.

Perhaps if I called it "env" (of type Environment) it would help. 

Note that names should always have references, so I can find that first. 

//== 

So one of the things I need to do is work out the types of all of the referenced functions. 
To do this, it is nice to figure out what functions the thing calls.

I'm not saure how I can do this without doing the symboilic evaluation. Seems kind of important. 

To know what the return type is, I need to know what the return type is. 

I can guess a little bit at the type based on a couple of things. Like I can just look at how 
each parameter is used ... once I drill down to the lowest level, I am kind of finished. 

So what I am saying is that I think I can work out the type for everything based purely on how 
each function parameter is used. 

This is what my little analysis showed I think. 

//==

TODO: combine eval and other stuff. 

Eval will be useful with the current test code to figure out the tests.

//==

1. Functions are always returning "any"
1. I have some voids. 
1. Unions of unions are not getting flattened.
1. Type signatures are very ugly.
1. I am not doing type inference: I shouldn't use "Any". Instead a function type should be "T0, T1, T2, R" => 
1. I am not getting the type of the result variable. 
1. It seems that more things could be expressed as functions, for example the control structures.
1. What about closures: it would be nice if their types were handled. 
1. What about analysis of what is "shared" and what isnt.
1. I need a wrapper around the Type system. It is a bit too raw as it currently stands, BUT I do know that it works. 
1. If I have multiple functions: how do I choose one? Can I do it based on the type of the arguments? YES! So I need a function to compute that. 
1. I need my function arguments to have their index insdie of it. 
1. Do I need to convert from types to HeronTypes? Probably: if I want to use the type inference engine.
1. I don't think I need the union.
1. Using "constants" might not be necessary? 

//==

* If a lambda expression was the same as a func def, some of my job would be easier. 
* I see no reason not to do that. 
* One possibility is to create a funcDef once I encounter a lambda expression.
* THe other possibility is to convert func def bodies into lambdas. 

//==

* I need to update how funcs are encoded. It is inconsistent from the old to new method.
* I need to change how unions are unified. I can't use the present system. 
* 


/** Converts a type variable to a constant: A => `A  */ 
export function typeVarToConstant(t: Type, vars: Lookup<TypeVariable>): Type {
    if (t instanceof TypeVariable) {
        vars[t.name] = t;
        return typeConstant('`' + t.name);
    }
}

/** Assuming a type has been converted using typeVarToConstant, 
 * this will put convert typeConstants back to variables  */
export function typeConstantToVar(t: Type, vars: Lookup<TypeVariable>): Type {
    if (t instanceof TypeConstant) {
        if (t.name && t.name[0] === '`') 
        {
            const varName = t.name.slice(1);
            if (varName in vars)
                return vars[varName];
        }
    }
    return t;
}

//==

I see that "vector(xs :any): any" isn't working. 

> filter type is wrong. 

It really should figure out that 
A) the function is a boolean.
B) the end result is the same type as the input function

Doesn't seem to do any type unification whatsoever. 

> Flatten is wrong

> First is horribly wrong.

It doesn't even know an argument is an array.

Slice. Doesn't know that the two inputs are ints.
It is the basis of this whole thing.  

//==

So when resolving this stuff, ONE problem is that 
in some cases we are dealing with functions that could be anything. 

I need the system to choose the best function before I get into unification. 

. . . 

So interestingly: "min" is defined twice. Shouldn't happen. 

//==

Right now the problem is figuring out which function is which. 

I get a funcset, only once I infer the types can I figure out which one is being called. 

Maybe I can figure it out anyway. 

//==

2018-03-30
I ran into an interesting problem today, the "at" function was overloaded with two similar
function types. Would have been nice to  catch it earlier. 

qsort is inferred to have a type of IArray, which makes sense. 
However, we really know it has a type of ArrayBuilder. 

At least I think we know that, right? 

//==

So the problem is that there are N functions:
One of them wants an ArrayBuilder, i have an array: BUT it is possibly an ArrayBuilder. 

This is because an ArrayBuilder **is an** Array 

So when trying to match up functions, I could choose that one as a possibility. 

The problem I am currently facing though is that `qsort` has the wrong type: 
it returns an Array when it should return an ArrayBuilder.

I think this is because Array functions are called, 

Nope. It is because something is broken. Partition should only work on ArrayBuilder. 

//==

When you encounter a list, one of them might be better than another.

You look at the first type: you ask ... 

//==

Some problems:
Slice
Slices
Zip 

These folks have generics where they shouldn't.
But they do return the right type a lot. 

//==

I need to be able to find the functions now. In order to do this, I think having a
"Val" makes sense 

There is an issue, where some functions are generating new variables .. .

//==

    function zip(xs, ys, f) 
        = xs.count <= ys.count 
            ? xs.map((x, i) => f(x, ys[i]))
            : ys.map((y, i) => f(xs[i], y));

So the thing is that there is a lambda expression: 
* It has its own unifier, BUT, the unifier also is relevant to the containing function as well. 
* In FACT, there should probably be only one. 

So does the system work?

Not sure: I should be creating new Type unifiers.

//==

So one question: where are these 'T coming from? I need everyone to use new types.

It could be parsed? 

I need to make sure ALL type varaibles are different. Then things might start to work.

However: I need to make sure I also give a new TypeEvaluator ...

Should I rename the type resolver to a TypeEvaluator. 

"I don't know maybe get a kitten"

https://code.visualstudio.com/docs/extensionAPI/extension-points

//==

The return value of the functions isn't properly reserved. 

This is apparent when looking at "map" 

I need to fix ... 