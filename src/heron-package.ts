import { Myna } from "myna-parser/myna";
import { HeronAstNode, isExpr, validateNode, throwError, preprocessAst, visitAst } from "./heron-ast-rewrite";
import { Type } from "type-inference/type-system";
import { Def, createDef } from "./heron-defs";
import { Ref, RefType } from "./heron-refs";
import { Scope } from "./heron-scope-analysis";
import { createExpr } from "./heron-expr";
import { computeType } from "./heron-types";

// A package is a compiled system. It contains a set of modules in different source files. 
export class Package 
{
    modules: Module[] = [];
    scope: Scope = new Scope(null);
    scopes: Scope[] = [this.scope];
    refs: Ref[] = [];
    defs: Def[] = [];
    files: SourceFile[] = [];
    
    // When done adding files call "processModules" to sort the dependencies 
    addFile(node: HeronAstNode, intrinsic: boolean, filePath: string) {        
        validateNode(node, 'file');
        let langVerNode = validateNode(node.children[0], 'langVerURN');
        let langVer = this.parseURN(langVerNode);
        if (langVer.length != 3)
            throwError(langVerNode, "Expected three component to language version URN: name, flavor, and version")
        let file = new SourceFile(node, intrinsic, filePath, langVerNode.allText);

        let moduleNode = validateNode(node.children[1], 'module');
        let moduleNameNode = validateNode(moduleNode.children[0], 'moduleName');
        let moduleBodyNode = validateNode(moduleNode.children[1], 'moduleBody');
        let moduleNameURN = this.parseModuleName(moduleNameNode);
        let importNodes = moduleBodyNode.children.filter(c => c.name === 'import');
        let importURNs = importNodes.map(this.parseModuleName);
        let module = new Module(moduleNode, moduleNameURN, file, importURNs);
        this.files.push(file);
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

    // Called once all of the files have been added. 
    processModules() 
    {        
        // Order modules, so that dependencies are resolved correctly. 
        // A module cannot have a cyclical dependency
        this.sortModuleDependencies();
        
        // The visitor will be used for adding scopes and references
        let visitor = new AstVisitor();

        // Iterate over the modules (they are now sorted)
        for (let m of this.modules) 
        {
            let ast = m.node;

            // Perform pre-processing
            preprocessAst(ast);

            // Create definitions 
            visitAst(ast, createDef);

            // Add scopes and references
            if (!m.file.intrinsic)
                this.pushScope(m.node);
            visitor.visitNode(m.node, this);
            if (!m.file.intrinsic)
                this.popScope();

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

    pushScope(node) {
        let scope = new Scope(node);
        scope.id = this.scopes.length;
        this.scopes.push(scope);
        this.scope.children.push(scope);
        scope.parent = this.scope;
        this.scope = scope;
   }

    popScope() {
        this.scope = this.scope.parent;
    }

    findDefs(name: string): Def[] {
        return this.scope.findDefs(name);
    }

    addDef(def: Def) {
        if (!def)
            throw new Error('Missing def as function argument to addDef');

        // We need to avoid double adding a def. 
        // This can happen because modules pre-scan their children for all definitions, 
        // so that they are present for each function. 
        if (this.defs.indexOf(def) < 0) {
            this.scope.defs.push(def);
            this.defs.push(def);
        }
    }

    addRef(name: string, node: HeronAstNode, refType: RefType) {
        let ref = new Ref(node, name, this.scope, refType, this.findDefs(name));
        this.scope.refs.push(ref);
        this.refs.push(ref);
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

// Used for visiting nodes in the Heron node looking for name defintions, usages, and scopes.
class AstVisitor
{
    // Visitor helper functions
    visitNode(node: HeronAstNode, state: Package) {
        if (node['def'])
            state.addDef(node['def']);
        const fnName = 'visit_' + node.name;
        if (fnName in this)
            this[fnName](node, state);
        else 
            this.visitChildren(node, state);        
    }
    visitChildren(node: HeronAstNode, state: Package) {
        for (let child of node.children)
            this.visitNode(child, state);
    }

    // Particular node visitors 
    visit_compoundStatement(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_funcDef(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_intrinsicDef(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_typeName(node: HeronAstNode, state: Package) {
        state.addRef(node.allText, node, RefType.type);
    }
    visit_lambdaBody(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_lambdaExpr(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_module(node: HeronAstNode, state: Package) {
        // All definitions at the module level, are available to all others.
        for (let c of node.children[1].children)
            if (c['def'])
                state.addDef(c['def']);
        this.visitChildren(node, state);
    }
    visit_recCompoundStatement(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_varExpr(node: HeronAstNode, state: Package) {
        state.pushScope(node);
        this.visitChildren(node, state);
        state.popScope();
    }
    visit_varName(node: HeronAstNode, state: Package) {
        state.addRef(node.allText, node, RefType.var);
    }
}
