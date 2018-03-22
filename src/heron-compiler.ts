import { Myna } from "myna-parser/myna";
import { Type } from "./type-system";
import { preprocessAst, visitAst, HeronAstNode } from "./heron-ast-rewrite";
import { parseHeron, heronGrammar } from "./heron-parser";
import { heronToText } from "./heron-to-text";
import { Def, createDef } from "./heron-defs";
import { Ref } from "./heron-refs";
import { Expr, createExpr } from "./heron-expr";
import { Package } from "./heron-package";

const g = heronGrammar;

// Get some details about the language implementation environment 
declare var require; 
let fs = require('fs');
let path = require('path');
let nodePackage = JSON.parse(fs.readFileSync('package.json','utf8'));
let ver = nodePackage.version; 
let flavor = 'std';
let ext = '.heron';

// Module resolution
export const moduleFolder = path.join('.', 'inputs');
export const intrinsicModules = ['intrinsics'];
export const modules: HeronAstNode[] = [];

//================================================================
// Main functions 

export function createPackage(moduleNames: string[]): Package {
    const pkg = new Package();

    // Load the intrinsic (built-in) modules
    for (let name of intrinsicModules) 
        addModuleToPackage(name, true, pkg);

    // Load the specified modules (any order)    
    for (let name of moduleNames) 
        addModuleToPackage(name, false, pkg);

    // The package is doing the heavy lifting 
    pkg.processModules();
    
    for (let sf of pkg.files) {
        let outputPath = sf.filePath.substr(0, sf.filePath.lastIndexOf('.')) + '.output.heron';
        let text = heronToText(sf.node as HeronAstNode);
        fs.writeFileSync(outputPath, text);
    }
    return pkg;
}

export function addModuleToPackage(name: string, intrinsic: boolean, pkg: Package) {
    let modulePath = moduleNameToPath(name);
    let ast = parseFile(modulePath);
    pkg.addFile(ast, intrinsic, modulePath);
}

export function moduleNameToPath(f: string): string {
    return path.join(moduleFolder, f + ext);
}

export function parseModule(moduleName: string): HeronAstNode {
    let modulePath = moduleNameToPath(moduleName);
    return parseFile(modulePath);
}

export function parseFile(f: string): HeronAstNode {
    let outputFile = f.substring(0, f.lastIndexOf('.')) + '.output.heron';
    let code = fs.readFileSync(f, 'utf-8');
    let ast = parseHeron(code, g.file);     
    return ast;
}
