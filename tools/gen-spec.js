"use strict";

const Myna = require("myna-parser");
const g = require('../build/heron-parser').heronGrammar;
const fs = require('fs');

const m = Myna.Myna;
const pkg = JSON.parse(fs.readFileSync('./package.json', "utf8"));
const version = pkg.version;
const schema = m.astSchemaToString('heron'); 
const grammar = m.grammarToString('heron');

const contents = 
[
    '# Heron Specification ' + version,
    '',    
    '## AST Schema',
    '',    
    'This is the schema of the abstract syntax tree (AST) created when',
    'when parsing Heron with the [Myna parser](https://github.com/cdiggins/myna-parser)',
    'prior to any transformations',
    '',    
    '```',
    schema,
    '```',
    '',    
    '## PEG Grammar',
    '',    
    'This is the full grammar for Heron in PEG form. ',
    'Alternatively you can view the [source code for the parser](https://github.com/cdiggins/heron-language/blob/master/src/heron-parser.ts)',
    '',    
    '```',
    grammar,
    '```'
].join('\n');
 
fs.writeFileSync('./spec.md', contents); 
 
process.exit();
