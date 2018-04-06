"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intrinsics = {
    float2: function (x, y) { return ({ x: x, y: y }); },
    x: function (v) { return v.x; },
    y: function (v) { return v.y; },
    float3: function (x, y, z) { return ({ x: x, y: y, z: z }); },
    z: function (v) { return v.z; },
    float4: function (x, y, z, w) { return ({ x: x, y: y, z: z, w: w }); },
    w: function (v) { return v.w; },
    abs: Math.abs,
    acos: Math.acos,
    asin: Math.asin,
    atan: Math.atan,
    atan2: Math.atan2,
    ceil: Math.ceil,
    clamp: function (x, min, max) { return x < min ? min : x > max ? max : x; },
    cos: Math.cos,
    exp: Math.exp,
    floor: Math.floor,
    log: Math.log,
    pow: Math.pow,
    round: Math.round,
    sin: Math.sin,
    sign: function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; },
    sqrt: Math.sqrt,
    tan: Math.tan,
    op_add: function (x, y) { return x + y; },
    op_sub: function (x, y) { return x - y; },
    op_mul: function (x, y) { return x * y; },
    op_div: function (x, y) { return x / y; },
    op_mod: function (x, y) { return x % y; },
    op_gt: function (x, y) { return x > y; },
    op_gt_eq: function (x, y) { return x >= y; },
    op_lt: function (x, y) { return x < y; },
    op_lt_eq: function (x, y) { return x <= y; },
    op_not_eq: function (x, y) { return x !== y; },
    op_eq_eq: function (x, y) { return x === y; },
    op_amp_amp: function (x, y) { return x && y; },
    op_bar_bar: function (x, y) { return x || y; },
    op_hat_hat: function (x, y) { return !!(x ^ y); },
    op_not: function (x) { return !x; },
    op_negate: function (x) { return -x; },
    gen: function (count, at) { return ({ count: count, at: at }); },
    count: function (xs) { return xs.count; },
    at: function (xs) { return xs.at; },
    mutable: function (xs) {
        function MutableArray(count, at) {
            var _this = this;
            this.array = (new Array(count)).map(function (x, i) { return at(i); });
            this.count = count;
            this.at = function (i) { return _this.array[i]; };
        }
        return new MutableArray(xs.count, xs.at);
    },
    push: function (xs, x) { return (xs.array.push(x), xs); },
    set: function (xs, i, x) { return (xs.array[i] = x, x); },
    array: function (xs) { return xs; },
    print: function (x) { return console.log(x); },
    assert: function (condition) { if (!condition)
        throw new Error("assertion failed"); }
};
//# sourceMappingURL=heron-js-intrinsics.js.map