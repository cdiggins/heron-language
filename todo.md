## Some things to do

[] - Move the type-inference code back into its own repository (making sure to follow the Heron model, with the TS and the JS in the same place?)
[] - Add linter support 
[] - Turn on some errors
[x] - Get deepscan working 
[] - Get Deepscan badge
[] - Put the project into Travis CI
[] - Get a version of the project working in the browser 
[] - There is a problem with the parser not reporting error locations correctly
[] - Fix operator overloading problem. 
[] - Add a "transform" 
[] - Replace refs/defs
[] - Fix that a lot of stuff is just scattered everywhere (FuncDef??)
[] - Parameters should not have types, instead: get them from the function. 
[] - Type code should be simplified. 
[] - Start running linter 
[] - replace sumComponents with sum. For some reason, it is struggling to figure out the type of that.
[] - Output the AST: with types 
[] - 

Notes:

The following is incorrect. 

 
 so 

    else if (expr instanceof FunCall) {
            let func = this.getType(expr.func);
            const argTypes = expr.args.map(a => this.getType(a));

//==

Once I know the function type (assuming I do)

I can then refine the types of the arguments. 

Of course sometimes the types of the arguments, defines the function type, which then defines the types of the arguments.

This goes on a bit, but it isn't that complicated. 

The idea is simple: 
1. I know what function I am calling: therefore, I know the type of the lambda, specifically. 

A choose better function arg type. 

This really mostly happens at a call site. 

Let's say I know the types of the other arguments, then the lambda can possibly be inferred. 

I can phrase it this way: once I know the types of the arguments, can I refine the type of a lambda
any further.

RefineLambdaTypes. Works for me. 

//==

Not sure what to do.  

Computing function type for normal(v : any) : any
Type for normal(v : any) : any
 is (Func Float2 Float)

 Clearly wrong.999++

 
zip(xs : any, ys : any, f : any) : any
tests.ts:144
 : (Func (Array T0) (Array T1) (Func T2 T1 T3) (Array T3))

 //==

 So I need some specific tests in place:
 
1. Get the type of a function X. 
2. What is the process for getting the type? 

I can do different things to compute it. 

//==

It was working a short bit ago, and now it is screwed up again. 

//==

There is a problem because it is reusing variables tht it shouldn't. 

//==

Right now I think the biggest problem is "Float2". 

//==

Some problems:
* Transform
* Flatten
* Reduce
* Zip

It seems that when a call happens it doesn't really constrain all of the types? 

If a call has a specific type 

I may need to . . . 

Perfect example: 

all(xs : any, p : any) : any
 : (Func (Array T0) (Func T1 Bool) Bool)

//==

reduce -> big problem

The type of reduce is correct. 
What I see is that I am passing 

I need to track the actions of a specific function. 

"all". 

//==

When I make a function call, with a function that is an argument, I should unify it? 

* Map has type T => T, which is wrong.

I think the problem is the presence of `T` which is incorrect. It gets confused. Every function type has to have its type variables replaced. 

I see a problem where a lot of array operations are "Int" where they are actually number.

For example: "average"
The flatMap is correct. 
BUT flatten is incorrect.

We can see the problem with flatten right here: 

Unifying argument concat with !'@9.(Func (Array '@9) (Array '@9) (Array '@9)) and (Func '@93 '$1 '@93) is !'@9!'$3.(Func (Array '$3) (Array '@9) (Array '$3))

I think this goes right to the heart of the problem.

                    /*
                    // I can see this being something we want for arrays as well.
                    if (arg instanceof Lambda && exp instanceof PolyType) {
                        // Recompute the HeronType now based on the expected HeronType.
                        trace("funcType", "Getting an improved lambda type");
                        trace("funcType", "Original: " + arg.type);
                        trace("funcType", "Shape: " + exp);
                        arg.type = getLambdaType(arg, this.unifier, exp);
                        trace("funcType", "Updated: " + arg.type);                        
                        if (!arg.type)
                            throw new Error("Failed to get a recomputed lambda type");
                        argTypes[i] = arg.type;
                    }

                    // Unify again.
                    this.unify(arg.type, exp);
                    */

The problem right now comes to the fact that the right function is not known. 

1) Everybody is working out their type fine. At least functions are.
2) Possibly the expressions are as well. I should check that.
3) It is possible that the wrong function is being used temporarily, but is figured out afterwards. 

The issue really is that some things reference a function set, and when they do, we want to know which 
function it is they chose. 

A similar problem is going to arise when we try to figure out constants. 

Basically it is all an issue of abstract value. Every expression refers to a value. 

That abtsract value could be a: 
1. A number, string, function set, actual function, a type, a range, an array, a boolean, a 'type' value,   

Doing this I think is going to simplify things. 

The problem is that I have been kind of hacking stuff to get it to work. 

So how am I going to associate expressions with values? 

And what about defs? Well those are just types.

Note: the thing is that the compiler needs to track functions down as much as possible. It has to do some inlining. 

Multiple expressions might share the same value. So I need an abstract evaluator? 

The thing is that "assignment" is different than the values. Two things might have the same unified type, but they 
could also have different values. (X = Y), (X = A), (B = Y). 

Assignment is different than unification. Getting the value isi much different than getting the type. 

However, there is still an issue. Types get improved. 

I think I am going to have to make another pass of a function. I have all of the types at the end. 

Next, I need to figure out if each functionIndex is the best bet.

//==

average(xs) :: (Func (Array Int) Int)
cylinderPoint(u, v) :: (Func Int Float Float3)
eq(xs, ys) :: (Func (Array T0) (Array T1) Bool)

//==

Trailing commas kill the compiler with no user feedback!