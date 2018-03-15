import { Myna } from "myna-parser/myna";
import { HeronAstNode, isExpr, validateNode, throwError, preprocessAst, visitAst } from "./heron-ast-rewrite";
import { Type } from "type-inference/type-system";
import { Def, createDef } from "./heron-defs";
import { Ref, RefType } from "./heron-refs";
import { Scope } from "./heron-scope";
import { createExpr } from "./heron-expr";
import { computeType } from "./heron-types";
import { NameAnalyzer } from "./heron-name-analysis";

// A package is a compiled system. It contains a set of modules in different source files. 
export class Package 
{
    modules: Module[] = [];
    scope: Scope = new Scope(null);
    scopes: Scope[] = [this.scope];
    files: SourceFile[] = [];

    get defs(): Def[] {
        return this.scope.allDefs();
    }
    
    get refs(): Ref[] {
        return this.scope.allRefs();
    }
    
    // When done adding files call "processModules" to sort the dependencies 
    addFile(node: HeronAstNode, intrinsic: boolean, filePath: string) {        
        validateNode(node, 'file');
        let langVerNode = validateNode(node.children[0], 'langVer');
        let langVer = this.parseURN(langVerNode);
        //if (langVer.length != 3) throwError(langVerNode, "Expected three component to language version URN: name, flavor, and version")
        let file = new SourceFile(node, intrinsic, filePath, langVerNode.allText);
        this.files.push(file);

        let moduleNode = validateNode(node.children[1], 'module');
        let moduleNameNode = validateNode(moduleNode.children[0], 'moduleName');
        let moduleBodyNode = validateNode(moduleNode.children[1], 'moduleBody');
        let moduleNameURN = this.parseModuleName(moduleNameNode);
        let importNodes = moduleBodyNode.children.filter(c => c.name === 'importStatement');
        let importURNs = importNodes.map(n => this.parseModuleName(n.children[0]));
        let module = new Module(moduleNode, moduleNameURN, file, importURNs);
        this.modules.push(module);
    }

    // Given a URN 
    parseURN(node: HeronAstNode): string[] {
        return node.children.map(c => c.allText);
    }

    // Extract the URN for a module name from the node
    parseModuleName(node: HeronAstNode): string {
        validateNode(node, 'moduleName');
       return node.allText;
    }

    // Load the definitions of a modules
    loadModuleDefs(module: Module) {
        let moduleBody = validateNode(module.node.children[1], 'moduleBody');
        for (let c of moduleBody.children)
            if (c.def)
                this.addDef(c.def);        
    }

    // Load the definitions from the various dependent modules 
    loadModuleDependencies(module: Module) {
        for (let imp of module.imports) {
            let impMod = this.getModule(imp);
            if (!impMod)
                throwError(module.node, "Could not find imported module " + imp);
            this.loadModuleDefs(impMod);
        }
    }

    // Called once all of the files have been added. 
    processModules() 
    {        
        // Order modules, so that dependencies are resolved correctly. 
        // A module cannot have a cyclical dependency
        this.sortModuleDependencies();
        
        // The visitor will be used for adding scopes and references
        let nameAnalyzer = new NameAnalyzer();

        // Iterate over the modules, pre-process their trees and create definitions. 
        for (let m of this.modules) 
        {
            let ast = m.node;

            // Perform pre-processing
            preprocessAst(ast, m.file);

            // Create definitions 
            visitAst(ast, createDef);
        }

        // Firt load all intrinsic definitions into the global scope
        for (let m of this.modules) 
            if (m.file.intrinsic)
                this.loadModuleDefs(m);                
                
        // Analyze names for each module.
        let moduleScopes = {};
        for (let m of this.modules) 
        {
            this.pushScope(m.node);
            this.loadModuleDependencies(m);
            this.loadModuleDefs(m);                
            nameAnalyzer.visitNode(m.node, this);            
            this.popScope();
        }

        // Compute expressions and types 
        for (let m of this.modules) {
            let ast = m.node;

            // Create expressions, and add them to the nodes
            visitAst(ast, createExpr);

            // assign types to expressions and definitions
            visitAst(ast, computeType); 
        }        
    }

    // Resolves links and assures that the language 
    sortModuleDependencies() {
        let queue=[...this.modules];
        let result: Module[] =[];        

        let tmp = [];
        for (let m of queue) 
        {            
            if (m.file.intrinsic)
            {
                if (m.imports.length > 0)
                    throwError(m.node, "Intrinsic modules should not have imports");
                result.push(m);
            }
            else 
            {
                tmp.push(m);
            }
        }
        queue = tmp;

        // Local function (recursive)
        function process(next: string) {
            // Check if already processed
            if (result.some(m => m.name === next))
                return;

            // Look for the module in the queue
            let i=queue.length;
            while (--i >= 0) 
                if (queue[i].name === next)
                    break;  
            if (i < 0) throw new Error("Could not find module named: " + next);
            let m=queue[i];

            // First process imported modules
            for (let importName of m.imports)
                process(importName);

            // Remove from queue 
            queue.splice(i, 1);

            // Add to the result
            result.push(m);            
        }

        while (queue.length > 0) 
            process(queue[0].name);    

        // We have no sorted the modules according to their dependencies.
        this.modules = result;
    }

    // Scans for modules
    getModule(name: string) {
        for (let m of this.modules)
            if (m.name === name) 
                return m;
        throw new Error("Module not found " + name);
    }
    
    //=============================================
    // These functions are used by the visitor to incrementally build the package  

    pushScope(node: HeronAstNode): Scope {
        let scope = new Scope(node);
        scope.id = this.scopes.length;
        this.scopes.push(scope);
        this.scope.children.push(scope);
        scope.parent = this.scope;
        return this.scope = scope;
   }

    popScope() {
        this.scope = this.scope.parent;
    }

    findDefs(name: string): Def[] {
        return this.scope.findDefs(name);
    }

    addDef(def: Def) {
        if (def && this.scope.defs.indexOf(def) < 0)
            this.scope.defs.push(def);
    }

    addRef(name: string, node: HeronAstNode, refType: RefType) {
        let ref = new Ref(node, name, this.scope, refType, this.findDefs(name));
        this.scope.refs.push(ref);
    }
}

// Wraps a source file 
export class SourceFile 
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly intrinsic: boolean, 
        public readonly filePath: string,
        public readonly lang: string,
    )
    { node.file = this; }
}

// Represents the definition of a module
export class Module
{
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string, 
        public readonly file: SourceFile,
        public readonly imports: string[],
    )
    { }      
}
