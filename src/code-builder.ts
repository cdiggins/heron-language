//=====================================
// Helper class for constructing pretty printerd code 
// this is passed as a "state" object to visitors

function count(s: string, sub: string) {
    return s.split(sub).length - 1;
}

export class CodeBuilder 
{
    lines: string[] = [];
    indent: number = 0;
    get indentString() {
        let r = '';
        for (let i=0; i < this.indent; ++i)
            r += '  ';
        return r;
    }
    pushLine(s: string = '') {
        this.lines.push(s + '\n');
        this.lines.push(this.indentString);
    }
    push(s: string) {
        this.indent += count(s, '{') - count(s, '}');
        this.lines.push(s);
    }
    toString(): string {
        return this.lines.join('');
    }
}
