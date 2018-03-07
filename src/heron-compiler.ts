import { Myna } from "myna-parser/myna";
import { Scope, Module, VarDef, VarUsage, Package } from "./heron-name-analysis";
import { Type } from "type-inference/type-system";
import { preprocessAst } from "./heron-ast-rewrite";
import { computeTypes } from "./heron-type-analysis";
import { parseHeron, heronGrammar } from "./heron-parser";
import { heronToText } from "./heron-to-text";

const g = heronGrammar;

// Get some details about the language implementation environment 
declare var require; 
let fs = require('fs');
let path = require('path');
let nodePackage = JSON.parse(fs.readFileSync('package.json','utf8'));
let ver = nodePackage.version; 
let flavor = 'std';
let ext = '.heron';

// After processing and transforming the nodes in the AST tree they 
// are extended with the following new properties. 
// This is not a JavaScript class: you don't have a typeof.
export class HeronAstNode extends Myna.AstNode 
{
    // After any transform, the previous version of the node is stored here
    original?: Myna.AstNode;

    // A pointer to the parent node 
    parent?: Myna.AstNode;

    // If this node is a new name definition, the definition is stored here
    varDef?: VarDef;

    // If this node is a symbol, information about what variable it is stored here
    varUsage?: VarUsage;

    // If this node is the beginning of a scope, information about the scope is stored here. 
    scope?: Scope;

    // If this node has a type, it is stored here 
    type?: Type;

    // The nodes named "module" have an instance of a Module class 
    module?: Module;

    // Used to uniquely identify each node 
    id: number;

    // The children are also of type HeronAstNode
    children: HeronAstNode[];
}

// Module resolution
export const moduleFolder = path.join('.', 'inputs');
export const defaultModules = ['intrinsics'];
export const modules: HeronAstNode[] = [];

//================================================================
// Main functions 

export function createPackage(moduleNames: string[]): Package {
    const pkg = new Package();
    loadDefaultModules(pkg);
    for (let m of moduleNames) 
        parseModule(m, false, pkg);
    pkg.resolveLinks();        
    return pkg;
}

//================================================================

export function scanAllModules() {
    const path = moduleFolder + defaultModules;
    const files = fs.readdirSync(path);
    throw new Error("Not finished yet");
}

export function moduleNameToPath(f: string): string {
    return path.join(moduleFolder, f + ext);
}

export function parseModule(moduleName: string, builtIn: boolean, pkg: Package) {
    let modulePath = moduleNameToPath(moduleName);
    parseFile(modulePath, builtIn, pkg);
}

export function loadDefaultModules(pkg: Package) {    
    for (let moduleName of defaultModules) 
        parseModule(moduleName, true, pkg);
}

export function parseFile(f: string, builtIn: boolean, pkg: Package): HeronAstNode {
    let outputFile = f.substring(0, f.lastIndexOf('.')) + '.output.heron';
    let code = fs.readFileSync(f, 'utf-8');
    let mynaAst = parseHeron(code, g.file);     
    let ast = toHeronAst(mynaAst, pkg, builtIn, f);
    return ast;
}

// Convert a generic Myna AST tree into a proper Heron AST. 
export function toHeronAst(ast: Myna.AstNode, pkg: Package, builtIn: boolean, filePath: string): HeronAstNode {
    // Perform pre-processing
    ast = preprocessAst(ast);

    // Adding the file to the package, does a name analysis.
    pkg.addFile(ast, builtIn, filePath);

    // All expressions are assigned types (WIP)
    computeTypes(ast); 

    // Type-cast the node.
    return ast as HeronAstNode;
}