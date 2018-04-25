function arrayFromJavaScript(xs) {
  return {
      count: xs.length,
      array: xs,
      at: (i) => xs[i]
  }
}

function toMutable(xs) {
  const count = xs.count;
  const array = []; 
  for (let i=0; i < count; ++i)
      array.push(xs.at(i));
  return arrayFromJavaScript(array);
}

function int(x) { return Math.round(x); }
function float(x) { return x; }
function float2(u, v) { return ({ u: u, v: v }); }
function float3(x, y, z) { return ({ x: x, y: y, z: z }); }
function float4(x, y, z, w) { return ({ x: x, y: y, z: z, w: w }); }
function u(v) { return v.u; }
function v(v) { return v.v; }
function x(v) { return v.x; }
function y(v) { return v.y; }
function z(v) { return v.z; }
function w(v) { return v.w; }
function xyz(v) { return float3(v.x, v.y, v.z); }
function abs(x) { return Math.abs(x); }
function acos(x) { return Math.acos(x); }
function asin(x) { return Math.asin(x); }
function atan(x) { return Math.atan(x); }
function atan2(y, x) { return Math.atan2(y, x); }
function ceil(x) { return Math.ceil(x); }
function cos(x) { return Math.cos(x); }
function exp(x) { return Math.exp(x); }
function floor(x) { return Math.floor(x); }
function log(x) { return Math.log(x); }
function pow(x, y) { return Math.pow(x, y); }
function round(x) { return Math.round(x); }
function sin(x) { return Math.sin(x); }
function sqrt(x) { return Math.sqrt(x); }
function tan(x) { return Math.tan(x); }
function clamp(x, min, max) { return x < min ? min : x > max ? max : x; };
function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
function op_add(x, y) { return x + y; };
function op_sub(x, y) { return x - y; };
function op_mul(x, y) { return x * y; };
function op_div(x, y) { return x / y; };
function op_mod(x, y) { return x % y; };
function op_gt(x, y) { return x > y; };
function op_gt_eq(x, y) { return x >= y; };
function op_lt(x, y) { return x < y; };
function op_lt_eq(x, y) { return x <= y; };
function op_not_eq(x, y) { return x !== y; };
function op_eq_eq(x, y) { return x === y; };
function op_amp_amp(x, y) { return x && y; };
function op_bar_bar(x, y) { return x || y; };
function op_hat_hat(x, y) { return !!(x ^ y); };
function op_not(x) { return !x; };
function op_negate(x) { return -x; };
function count(xs) { return xs.count; };
function at(xs, i) { return xs.at(i); };
function array(count, at) { return { count, at }; }
function mutable(x) { return toMutable(x); }
function immutable(xs) { return array(xs.array.length, xs.at); }
function push(xs, x) { return (xs.array.push(x), xs); };
function set(xs, i, x) { return (xs.array[i] = x, xs); };
function print(x) { return console.log(x); }
function assert(condition) { if (!condition) throw new Error("assertion failed"); };
function mesh(vertexBuffer, indexBuffer) { return ({ vertexBuffer: vertexBuffer, indexBuffer: indexBuffer }); };
function vertexBuffer(mesh) { return mesh.vertexBuffer; };
function indexBuffer(mesh) { return mesh.indexBuffer; };
