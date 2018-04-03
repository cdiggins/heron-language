import { Myna } from "myna-parser/myna";
import { Type, TypeResolver } from "./type-system";
import { preprocessAst, visitAst, HeronAstNode } from "./heron-ast-rewrite";
import { parseHeron, heronGrammar } from "./heron-parser";
import { heronToText } from "./heron-to-text";
import { Def, createDef } from "./heron-defs";
import { Ref } from "./heron-refs";
import { Expr, createExpr } from "./heron-expr";
import { Package } from "./heron-package";
import { computeFuncType, typeStrategy } from "./heron-types";
import { toJavaScript } from "./heron-to-js";

const g = heronGrammar;

// Get some details about the language implementation environment 
declare var require; 
const fs = require('fs');
const path = require('path');
const nodePackage = JSON.parse(fs.readFileSync('package.json','utf8'));
const ver = nodePackage.version; 
const flavor = 'std';
const ext = '.heron';

// Module resolution
export const moduleFolder = path.join('.', 'inputs');
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
    for (const f of pkg.allFuncDefs) {
        const t = computeFuncType(f);
        if (f.body) {
            console.log(f.toString());
            console.log(" : " + t);
        }
    }

    return pkg;
}

export function addModuleToPackage(name: string, intrinsic: boolean, pkg: Package) {
    const modulePath = moduleNameToPath(name);
    const ast = parseFile(modulePath);
    pkg.addFile(ast, intrinsic, modulePath);
}

export function moduleNameToPath(f: string): string {
    return path.join(moduleFolder, f + ext);
}

export function parseModule(moduleName: string): HeronAstNode {
    const modulePath = moduleNameToPath(moduleName);
    return parseFile(modulePath);
}

export function parseFile(f: string): HeronAstNode {
    const outputFile = f.substring(0, f.lastIndexOf('.')) + '.output.heron';
    const code = fs.readFileSync(f, 'utf-8');
    const ast = parseHeron(code, g.file);     
    return ast;
}
