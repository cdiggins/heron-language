# Heron Programming Language

Heron is an open-source programming language that is intended to simplify numerical processing on the GPU. It does this by compiling to a combination of JavaScript and GLSL. The Heron syntax resembles TypeScript, and should be easy to learn for anyone familiar with C style programming language.  

## History

This is technically the third incarnation of the Heron language. The new Heron is a very different language from previous incarnations which were general purpose languages. 

The first large public announcement of the original heron langauge was in 2006 https://developers.slashdot.org/story/04/12/08/1944233/introducing-the-heron-programming-language. That implementation was a Heron to C++ translator. It's primary contribution was a more advanced meta-programming system for C++ and a more regular synbtax.  

Heron underwent several modifications and extensions and was revived in 2010 http://www.artima.com/weblogs/viewpost.jsp?thread=284558 with many new features. Achilleas Margaritas described the differences as "this new Heron seems to be a very different beast. It seems to be an enterprise-friendly application language like Java and C#, rather than a system/application one like C and C++."

After announcing the new version of Heron, it dawned on me that I had created a general purpose programming language that had no tool support, no community, and no libraries. Convincing any software developer to use Heron as opposed to one of the more entrenched general purpose languages (C++, Java, C#, Scala, etc.) was going to be effectively impossible.   

I decided at that point to put Heron on ice. 

Fast forward to October 2016, when I realized that general purpose GPU programming could now be done in reach for anybody with a web-browser. The catch was that you had to know JavaScript, GLSL, and WebGL. This isn't a particularly hard problem but it did keep it out of reach for most programmers. I decided then that a programming language which helped bridge JavaScript and GLSL could be extremely useful. Rather than invent an entirely new syntax and come up with a new name, I decide to breathe new life into the Heron project.

I hope you enjoy the language! 





