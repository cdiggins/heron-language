
# History of Heron 

### Why throw away a good name?

This is technically the third incarnation of the programming language Heron, but only a handful of people will remember the older versions. The last time I announced a programming language named Heron was in 2010. Previous incarnations were intended as general purpose languages whereas Heron is now much more focused in scope and purpose. However, much of the original philosophy and intention is present in the language so I've decided to stick to the name. 

The first large public announcement of the original Heron language was in 2006 https://developers.slashdot.org/story/04/12/08/1944233/introducing-the-heron-programming-language. That implementation was a Heron to C++ translator. It's primary contribution was a more advanced meta-programming system for C++ and a more regular syntax. At that time the another systems language was being developed by Walter Bright called D, which had similar design goals. 

Heron underwent several modifications and extensions and was revived in 2010 http://www.artima.com/weblogs/viewpost.jsp?thread=284558 with many new features. Achilleas Margaritas described the differences as "this new Heron seems to be a very different beast. It seems to be an enterprise-friendly application language like Java and C#, rather than a system/application one like C and C++.". This reflected my new found interest in C#, and the idea of code and diagrams being closely related. 

After finishing a working implementation of the new version of Heron, I realized that I had created a general purpose programming language that had no tool support, no community, and no libraries. Convincing any professional software developer to use Heron as opposed to an entrenched general purpose languages (C++, Java, C#, Scala, etc.) was going to be effectively impossible. I decided at that point to put Heron on ice and focus on other things.  

After spending several years working with 3D and animation software, including designing a visual programming language for 3D processing (Max Creation Graph), I've realized that there is a real need for an easy to use yet efficient programming language, which can target multiple platforms. Therefore I decided to reincarnate Heron as a programming language that specializes in efficient array and numerical processing, but that has the look and feel of JavaScript. 

I've found it to be a very pleasant experience writing libraries in Heron for array, numerical, 2D, and 3D processing. I hope you enjoy it as well, and I'd appreciate your feedback on how I can make it better!

## Postscript: May 7th 2023

It has been five years since I have contributed to Heron. After releasing a v0.1 version of Heron that had
a very powerful type-inference system and a syntax which I found agreeable, I realized that the next steps of 
getting people to use the language would be virtually insurmountable. 

How do you convince people to use a new language with extremely limited tooling, no libraries, and 
the only advantage is a nicer syntax with less type annotations? People already had enough languages 
to choose from, and type-safety with simpler syntax wasn't a strong enough motivator. 

In the last few years I moved back to primarily C# development in the realm of real-time 3D graphics. 
I developed numerous libraries and software using a primarily functional style of programming. 
Pure functional programming in C# works surprisingly well for real-time 3D graphics processing, it 
can produce very robust and relatively efficient code. 

However there were still limitations: the C# compiler still does not do a particularly good job of optimizing 
functional code, C# cannot be run efficiently in the browser, and writing numerical code in a pure functional
style requires a ton of boilerplate. 

This inspired me to develop a language that would allow me to write my algorithms and data-structures in a C# 
style language while targetting multiple languages and platforms, with less boilerplate, and that could 
be easily optimized. 

This [new programming language is called Plato](https://github.com/cdiggins/plato) and it borrows many of the ideas 
and design goals of Heron. It is a more ambitious project with more features and is being built with the aim of 
bootstrapping itself. 
