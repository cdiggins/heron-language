# Heron Programming Language

Heron is a small cross-platform language being designed for ease of use, performance, and safety with a JavaScript like syntax.

Heron is a fully statically typed language that does not require type annotations in the majority of cases, so it looks and feels like a dynamic language, with the *potential* efficiency, safety, and tooling of a compiled language. 

The Heron design is influenced most heavily by JavaScript, Haskell, C#, Scala, GLSL, and Scheme, but other languages play a role as well. Heron has a powerful module system built into the language, and a forward thinking language versioning scheme for maintaining backwards compatibility while the language evolves. 

Current development on Heron is focused on numerical array processing, such as required in sound and image processing, and data visualization in 2D and 3D. The reference implementation generates JavaScript, but a C++ generator is planned as well.

Heron is built on the principle of emphasizing functional programming, immutable data structures, and type safety while minimizing complexity.

> *"I'm still trying to figure this magic out"* 
> -- Stephen Taylor

## Ancient History

This is technically the third incarnation of a programming language Heron, but no one is going to remember the older versions. Last time I announced a programming language named Heron was 8 years ago. The new Heron is quiate a different language from previous incarnations which were intended as general purpose languages, largely in part to my growth and evolution as a programmer. 

The first large public announcement of the original Heron language was in 2006 https://developers.slashdot.org/story/04/12/08/1944233/introducing-the-heron-programming-language. That implementation was a Heron to C++ translator. It's primary contribution was a more advanced meta-programming system for C++ and a more regular synbtax.  

Heron underwent several modifications and extensions and was revived in 2010 http://www.artima.com/weblogs/viewpost.jsp?thread=284558 with many new features. Achilleas Margaritas described the differences as "this new Heron seems to be a very different beast. It seems to be an enterprise-friendly application language like Java and C#, rather than a system/application one like C and C++."

After finishing a working implementation of the new version of Heron, I realized that I had created a general purpose programming language that had no tool support, no community, and no libraries. Convincing any professional software developer to use Heron as opposed to an entrenched general purpose languages (C++, Java, C#, Scala, etc.) was going to be effectively impossible. I decided at that point to put Heron on ice and focus on other things.  

After spending several years working with 3D and animation software, including designing a visual programming language for 3D processing (Max Creation Graph), I've realized that there is a real need for an easy to use yet efficient programming language, which can target different platforms. There I've decided to reincarnate Heron as a programming language that specializes in array and numerical processing. 

I've found it to be a very pleasant experience writing libraries in Heron for array, numerical, 2D, and 3D processing. I hope you enjoy it as well, and I'd appreciate your feedback on how I can make it better!