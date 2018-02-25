 The following are some very interesting insights by Mathieu. 
 
  The file 'compiler.html' is a very bare-bones interface, but it works. By far the hardest part here was figuring out how to get the 'compile' button to actually call the code generated by TypeScript, because the Javascript ecosystem is a confusing mess, as far as I can tell.

 - In particular, if we wanted to use proper ECMAScript 6 (aka ES 2015) modules to package the code (which would be nice), we would have to use one of several possible module loaders, which work with one of several existing packaging standards. I believe the only effect of this would be:

1. Add some tools and dependencies and steps to the TypeScript -> Javascript compilation process.
2. Add a few hundred kilobytes of 'require.js' or some other module loader so that we can load a handful of kilobytes of actual code.

My tentative conclusion is that probably things will be much nicer and settled down in a few years.

 - The file 'compiler.js' is just the transpiled version of 'compiler.ts', which is the TypeScript source with all the code. This is generated simply by running 'tsc' (the TypeScript compiler) on 'compiler.ts'.
 - In fact, you don't even need to specify any options when running 'tsc', because there's a configuration file 'tsconfig.json', and the compiler is smart enough to find all the source .ts files.
 - After some fighting with TypeScript, I think we now have a reasonable framework for writing the parser for Heron source code. It's reasonably easy to directly code the PEG-style combinators in TypeScript, and the current set of types in 'compiler.ts' will catch basic coding errors.
 - As a first pass, I decided to make a CST (Concrete Syntax Tree) parser, where every node is associated to a substring of the source code, and every character of the source code appears in the CST. I suspect that going forward, this would allow for some nice error reporting to be added, among other benefits. Also, this would be the right thing to feed into a linter eventually.
 - After the first pass, a simple tree-walker could convert that into an AST, where we get rid of, e.g., the whitespace nodes and so on. Probably the AST nodes should have a backlink to the relevant CST node, again for future error reporting.
 - Once we have a Heron AST, we would need a few tree traversals to get bindings for the identifiers, modules and imports, discover which function should become the mainImage function, etc., and slowly transform the Heron AST into a WebGL AST.
1 - Finally we'll need a WebGL pretty-printer.