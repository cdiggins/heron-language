import {HeronAstNode } from "./heron-ast-rewrite";
import { parseHeron, heronGrammar } from "./heron-parser";
import { Package } from "./heron-package";
import { computeFuncType, computeVarType } from "./heron-types";

const g = heronGrammar;

// Get some details about the language implementation environment 
declare var require: any; 
const fs = require('fs');
const path = require('path');

// TODO: use or throw out.
//const nodePackage = JSON.parse(fs.readFileSync('package.json','utf8'));
//const ver = nodePackage.version; 
//const flavor = 'std';

const ext = '.heron';

// Module resolution
export const moduleFolder = path.join('.', 'input');
export const outputFolder = path.join('.', 'output');
export const intrinsicModules = ['intrinsics'];
export const modules: HeronAstNode[] = [];

//================================================================
// Main functions 

export function createPackage(moduleNames: string[]): Package {
    const pkg = new Package();

    // Load the intrinsic (built-in) modules
    for (const name of intrinsicModules) 
        addModuleToPackage(name, true, pkg);

    // Load the specified modules (any order)    
    for (const name of moduleNames) 
        addModuleToPackage(name, false, pkg);

    // The package is doing the heavy lifting 
    pkg.processModules();
    
    // Compute types 
    for (const v of pkg.allVarDefs) {
        computeVarType(v);
    }

    // Compute types 
    for (const f of pkg.allFuncDefs) {
        computeFuncType(f);
    }

    return pkg;
}

export function addModuleToPackage(name: string, intrinsic: boolean, pkg: Package) {
    const modulePath = moduleNameToPath(name);
    const ast = parseFile(modulePath);
    if (ast)
        pkg.addFile(ast, intrinsic, modulePath);
}

export function moduleNameToPath(f: string): string {
    return path.join(moduleFolder, f + ext);
}

export function parseModule(moduleName: string): HeronAstNode|null {
    const modulePath = moduleNameToPath(moduleName);
    return parseFile(modulePath);
}

export function parseFile(f: string): HeronAstNode|null {
    try 
    {
        const code = fs.readFileSync(f, 'utf-8');
        const ast = parseHeron(code, g.file);     
        return ast;
    } 
    catch (e) 
    {
        console.log("An error occurred while parsing " + f);
        console.log(e.message);
        return null;
    }
}
