"use strict";
//=====================================
// Helper class for constructing pretty printerd code 
// this is passed as a "state" object to visitors
Object.defineProperty(exports, "__esModule", { value: true });
function count(s, sub) {
    return s.split(sub).length - 1;
}
var CodeBuilder = /** @class */ (function () {
    function CodeBuilder() {
        this.lines = [];
        this.indent = 0;
    }
    Object.defineProperty(CodeBuilder.prototype, "indentString", {
        get: function () {
            var r = '';
            for (var i = 0; i < this.indent; ++i)
                r += '  ';
            return r;
        },
        enumerable: true,
        configurable: true
    });
    CodeBuilder.prototype.pushLine = function (s) {
        if (s === void 0) { s = ''; }
        this.push(s + '\n');
        this.lines.push(this.indentString);
    };
    CodeBuilder.prototype.push = function (s) {
        var indentDelta = count(s, '{') - count(s, '}');
        indentDelta += count(s, '(') - count(s, ')');
        this.indent += indentDelta;
        if (indentDelta < 0) {
            if (this.lines.length > 0) {
                var lastLine = this.lines[this.lines.length - 1].trim();
                if (lastLine.length === 0) {
                    this.lines.pop();
                    this.lines.push(this.indentString);
                }
            }
        }
        this.lines.push(s);
    };
    CodeBuilder.prototype.toString = function () {
        return this.lines.join('');
    };
    return CodeBuilder;
}());
exports.CodeBuilder = CodeBuilder;
//# sourceMappingURL=code-builder.js.map