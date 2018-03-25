"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Trait = /** @class */ (function () {
    function Trait(type) {
        this.type = type;
        this.funcs = [];
    }
    return Trait;
}());
exports.Trait = Trait;
function getTraits(pkg) {
    var lookup = {};
    for (var _i = 0, _a = pkg.allFuncDefs; _i < _a.length; _i++) {
        var def = _a[_i];
        if (!def.body)
            for (var _b = 0, _c = def.params.filter(function (p) { return p.type; }).map(function (p) { return p.type.toString(); }); _b < _c.length; _b++) {
                var p = _c[_b];
                (lookup[p] || (lookup[p] = new Trait(p))).funcs.push(def);
            }
    }
    var traits = [];
    for (var k in lookup)
        traits.push(lookup[k]);
    return traits;
}
exports.getTraits = getTraits;
//# sourceMappingURL=heron-traits.js.map