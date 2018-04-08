export const library = 
`

function ImmutableArray(count, at) {
    this.count = count;
    this.at = at;
}

function toImmutable(xs) {
    return new ImmutableArray(xs);
}
  
function toMutable(xs) {
    const count = xs.count;
    const array = []; 
    for (let i=0; i < count; ++i)
      array.push(xs.at(i));
    return arrayFromJavaScript(array);
}

function arrayFromJavaScript(xs) {
  return {
    array: xs,
    count: xs.length,
    at: (i) => xs[i],
  }
}
`;

export const intrinsics = 
{
    int: 'Math.round',
    float: (x) => x,
    float2: (x, y) => ({ x, y }),
    float3: (x, y, z) => ({x, y, z}),
    float4: (x, y, z, w) => ({x, y, z, w}),
    x: (v) => v.x,
    y: (v) => v.y,
    z: (v) => v.z,
    w: (v) => v.w,
    abs: 'Math.abs',
    acos: 'Math.acos',
    asin: 'Math.asin',
    atan: 'Math.atan',
    atan2: 'Math.atan2',
    ceil: 'Math.ceil',
    clamp: (x, min, max) => x < min ? min : x > max ? max : x,
    cos: 'Math.cos',
    exp: 'Math.exp',
    floor: 'Math.floor',
    log: 'Math.log',
    pow: 'Math.pow',
    round: 'Math.round',
    sin: 'Math.sin',
    sign: (x) => x > 0 ? 1 : x < 0 ? -1 : 0,
    sqrt: 'Math.sqrt',
    tan: 'Math.tan',
    op_add: (x, y) => x + y,
    op_sub: (x, y) => x - y,
    op_mul: (x, y) => x * y,
    op_div: (x, y) => x / y,
    op_mod: (x, y) => x % y,
    op_gt: (x, y) => x > y,
    op_gt_eq: (x, y) => x >= y,
    op_lt: (x, y) => x < y,
    op_lt_eq: (x, y) => x <= y, 
    op_not_eq: (x, y) => x !== y,
    op_eq_eq: (x, y) => x === y,
    op_amp_amp: (x, y) => x && y,
    op_bar_bar: (x, y) => x || y,
    op_hat_hat: (x, y) => !!(x ^ y),
    op_not: (x) => !x,
    op_negate: (x) => -x,
    gen: 'toImmutable', 
    count: (xs) => xs.count,
    at: (xs, i) => xs.at(i),
    mutable: 'toMutable',
    push: (xs, x) => (xs.array.push(x), xs),
    set: (xs, i, x) => (xs.array[i] = x, xs),
    array: (xs) => xs, 
    print: 'console.log',
    assert: (condition) => { if (!condition) throw new Error("assertion failed"); },
    mesh: (vertexBuffer, indexBuffer) => ({ vertexBuffer, indexBuffer }),
    vertexBuffer: (mesh) => mesh.vertexBuffer,
    indexBuffer: (mesh) => mesh.indexBuffer,
};
