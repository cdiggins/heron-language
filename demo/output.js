// Generated using Heron on Sat May 05 2018 00:14:00 GMT-0400 (Eastern Daylight Time)
var heronMain = (function () {
function op_dot_dot(from, to) { const r=[]; for (let i=from; i < to; ++i) r.push(i); return r; }
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
function count(xs) { return xs.length; };
function at(xs, i) { return xs[i]; };
function array(count, at) { const r=[]; for (let i=0; i < count; ++i) r.push(at(i)); return r; }
function mutable(xs) { return xs; }
function immutable(xs) { return xs; }
function push(xs, x) { return (xs.push(x), xs); };
function pushMany(xs, ys) { return (xs.push(...ys), xs); };
function set(xs, i, x) { return (xs[i] = x, xs); };
function print(x) { return console.log(x); }
function assert(condition) { if (!condition) throw new Error("assertion failed"); };
function mesh(vertexBuffer, indexBuffer, uvBuffer, colorBuffer) { return ({ vertexBuffer, indexBuffer, uvBuffer, colorBuffer }); };
function vertexBuffer(mesh) { return mesh.vertexBuffer; };
function indexBuffer(mesh) { return mesh.indexBuffer; };
function colorBuffer(mesh) { return mesh.colorBuffer; };
function uvBuffer(mesh) { return mesh.uvBuffer; };
// Module heron:intrinsics:0.1
// file input\intrinsics.heron
// Float
const pi = 3.141592653589793 // Float
;
// Float
const e = 2.718281828459045 // Float
;
// (Func Int Float)
const float_41 = float;
// (Func Float Float Float2)
const float2_62 = float2;
// (Func Float2 Float)
const u_77 = u;
// (Func Float2 Float)
const v_92 = v;
// (Func Float Float Float Float3)
const float3_119 = float3;
// (Func Float3 Float)
const x_134 = x;
// (Func Float3 Float)
const y_149 = y;
// (Func Float3 Float)
const z_164 = z;
// (Func Float3 Float Float4)
const float4_185 = float4;
// (Func Float4 Float3)
const xyz_200 = xyz;
// (Func Float4 Float)
const w_215 = w;
// (Func Float Float)
const abs_230 = abs;
// (Func Float Float)
const acos_245 = acos;
// (Func Float Float)
const asin_260 = asin;
// (Func Float Float)
const atan_275 = atan;
// (Func Float Float Float)
const atan2_296 = atan2;
// (Func Float Float)
const ceil_311 = ceil;
// (Func Float Float Float Float)
const clamp_338 = clamp;
// (Func Float Float)
const cos_353 = cos;
// (Func Float Float)
const exp_368 = exp;
// (Func Float Float)
const floor_383 = floor;
// (Func Float Float)
const log_398 = log;
// (Func Float Float Float)
const pow_419 = pow;
// (Func Float Float)
const round_434 = round;
// (Func Float Float)
const sin_449 = sin;
// (Func Float Float)
const sign_464 = sign;
// (Func Float Float)
const sqrt_479 = sqrt;
// (Func Float Float)
const tan_494 = tan;
// (Func T0 T0 T0)
const op_add_518 = op_add;
// (Func T0 T0 T0)
const op_sub_542 = op_sub;
// (Func T0 T0 T0)
const op_mul_566 = op_mul;
// (Func T0 T0 T0)
const op_div_590 = op_div;
// (Func T0 T0 T0)
const op_mod_614 = op_mod;
// (Func T0 T0 Bool)
const op_gt_638 = op_gt;
// (Func T0 T0 Bool)
const op_gt_eq_662 = op_gt_eq;
// (Func T0 T0 Bool)
const op_lt_686 = op_lt;
// (Func T0 T0 Bool)
const op_lt_eq_710 = op_lt_eq;
// (Func Int Int Int)
const op_add_732 = op_add;
// (Func Int Int Int)
const op_sub_754 = op_sub;
// (Func Int Int Int)
const op_mul_776 = op_mul;
// (Func Int Int Int)
const op_div_798 = op_div;
// (Func Int Int Int)
const op_mod_820 = op_mod;
// (Func Float Float Float)
const op_add_842 = op_add;
// (Func Float Float Float)
const op_sub_864 = op_sub;
// (Func Float Float Float)
const op_mul_886 = op_mul;
// (Func Float Float Float)
const op_div_908 = op_div;
// (Func Float Float Float)
const op_mod_930 = op_mod;
// (Func Float2 Float2 Float2)
function op_add_982(a, b)
{
  return float2_62 // (Func Float Float Float2)
  (op_add_842 // [!'@270.(Func '@270 '@270 '@270) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_add_842 // [!'@271.(Func '@271 '@271 '@271) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
  ) // Float2
  ;
}
// (Func Float2 Float2 Float2)
function op_sub_1034(a, b)
{
  return float2_62 // (Func Float Float Float2)
  (op_sub_864 // [!'@365.(Func '@365 '@365 '@365) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@366.(Func '@366 '@366 '@366) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
  ) // Float2
  ;
}
// (Func Float2 Float2 Float2)
function op_mul_1086(a, b)
{
  return float2_62 // (Func Float Float Float2)
  (op_mul_886 // [!'@59.(Func '@59 '@59 '@59) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@60.(Func '@60 '@60 '@60) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
  ) // Float2
  ;
}
// (Func Float2 Float2 Float2)
function op_div_1138(a, b)
{
  return float2_62 // (Func Float Float Float2)
  (op_div_908 // [!'@237.(Func '@237 '@237 '@237) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_div_908 // [!'@238.(Func '@238 '@238 '@238) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
  ) // Float2
  ;
}
// (Func Float2 Float2 Float2)
function op_mod_1190(a, b)
{
  return float2_62 // (Func Float Float Float2)
  (op_mod_930 // [!'@640.(Func '@640 '@640 '@640) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@641.(Func '@641 '@641 '@641) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
  ) // Float2
  ;
}
// (Func Float3 Float3 Float3)
function op_add_1255(a, b)
{
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (op_add_842 // [!'@266.(Func '@266 '@266 '@266) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842 // [!'@267.(Func '@267 '@267 '@267) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842 // [!'@268.(Func '@268 '@268 '@268) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z_164 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,z_164 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Float3 Float3 Float3)
function op_sub_1320(a, b)
{
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (op_sub_864 // [!'@361.(Func '@361 '@361 '@361) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@362.(Func '@362 '@362 '@362) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@363.(Func '@363 '@363 '@363) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z_164 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,z_164 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Float3 Float3 Float3)
function op_mul_1385(a, b)
{
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (op_mul_886 // [!'@55.(Func '@55 '@55 '@55) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@56.(Func '@56 '@56 '@56) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@57.(Func '@57 '@57 '@57) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z_164 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,z_164 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Float3 Float3 Float3)
function op_div_1450(a, b)
{
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (op_div_908 // [!'@233.(Func '@233 '@233 '@233) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908 // [!'@234.(Func '@234 '@234 '@234) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908 // [!'@235.(Func '@235 '@235 '@235) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z_164 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,z_164 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Float3 Float3 Float3)
function op_mod_1515(a, b)
{
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (op_mod_930 // [!'@636.(Func '@636 '@636 '@636) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@637.(Func '@637 '@637 '@637) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@638.(Func '@638 '@638 '@638) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z_164 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,z_164 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func T0 T0 Bool)
const op_not_eq_1539 = op_not_eq;
// (Func T0 T0 Bool)
const op_eq_eq_1563 = op_eq_eq;
// (Func Bool Bool Bool)
const op_amp_amp_1585 = op_amp_amp;
// (Func Bool Bool Bool)
const op_bar_bar_1607 = op_bar_bar;
// (Func Bool Bool Bool)
const op_hat_hat_1629 = op_hat_hat;
// (Func Bool Bool)
const op_not_1644 = op_not;
// (Func Float Float)
const op_negate_1659 = op_negate;
// (Func Int (Func Int T0) (Array T0))
const array_1691 = array;
// (Func (Array T0) Int)
const count_1711 = count;
// (Func (Array T0) Int T0)
const at_1737 = at;
// (Func Int Int (Array Int))
const op_dot_dot_1762 = op_dot_dot;
// (Func (Array T0) (ArrayBuilder T0))
const mutable_1785 = mutable;
// (Func (ArrayBuilder T0) T0 (ArrayBuilder T0))
const push_1814 = push;
// (Func (ArrayBuilder T0) (Array T0) (ArrayBuilder T0))
const pushMany_1846 = pushMany;
// (Func (ArrayBuilder T0) Int T0 (ArrayBuilder T0))
const set_1881 = set;
// (Func (ArrayBuilder T0) (Array T0))
const immutable_1904 = immutable;
// (Func Float3 (Array Float))
function array_1932(v)
{
  return [x_134 // (Func Float3 Float)
  (v // Float3
  ) // Float
  ,y_149 // (Func Float3 Float)
  (v // Float3
  ) // Float
  ,z_164 // (Func Float3 Float)
  (v // Float3
  ) // Float
  ] // (Array Float)
  ;
}
// (Func (Array Float) Float3)
function float3_1963(xs)
{
  return float3_119 // [(Func Float Float Float Float3) | !'@23!'@24.(Func '@23 '@24)]
  (op_obr_cbr_2029 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,0 // Int
    ) // Float
    ,op_obr_cbr_2029 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,1 // Int
    ) // Float
    ,op_obr_cbr_2029 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,2 // Int
    ) // Float
  ) // Float3
  ;
}
// (Func (Array T0) (Array T0))
function reify_1994(xs)
{
  return immutable_1904 // !'@1470.(Func (ArrayBuilder '@1470) (Array '@1470))
  (mutable_1785 // !'@1470.(Func (Array '@1470) (ArrayBuilder '@1470))
    (xs // !'@1470.(Array '@1470)
    ) // !'@1470.(ArrayBuilder '@1470)
  ) // !'@1470.(Array '@1470)
  ;
}
// (Func (Array T0) Int T0)
function op_obr_cbr_2029(xs, i)
{
  return at_1737 // !'@11.(Func !'@11.(Array '@11) Int '@11)
  (xs // !'@11.(Array '@11)
    ,i // Int
  ) // '@11
  ;
}
// (Func T0 T1)
const print_2050 = print;
// (Func Bool T0)
const assert_2062 = assert;
// (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)
const mesh_2107 = mesh;
// (Func Mesh (Array Float3))
const vertexBuffer_2125 = vertexBuffer;
// (Func Mesh (Array Int))
const indexBuffer_2143 = indexBuffer;
// (Func Mesh (Array Float3))
const uvBuffer_2161 = uvBuffer;
// (Func Mesh (Array Float3))
const colorBuffer_2179 = colorBuffer;
// Module heron:geometry.vector:0.1
// file input\geometry-vector3.heron
// Float3
const origin = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
(0 // Int
  ,0 // Int
  ,0 // Int
) // Float3
;
// Float3
const ones = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
(1 // Int
  ,1 // Int
  ,1 // Int
) // Float3
;
// Float3
const xaxis = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
(1 // Int
  ,0 // Int
  ,0 // Int
) // Float3
;
// Float3
const yaxis = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
(0 // Int
  ,1 // Int
  ,0 // Int
) // Float3
;
// Float3
const zaxis = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
(0 // Int
  ,0 // Int
  ,1 // Int
) // Float3
;
// (Func Float Float Float Float3)
function vector_98(x, y, z)
{
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (x // Float
    ,y // Float
    ,z // Float
  ) // Float3
  ;
}
// (Func Float Float3)
function vector_120(x)
{
  return vector_98 // [(Func Float Float Float Float3) | !'@88.(Func Float '@88) | (Func (Array Float) Float3)]
  (x // Float
    ,x // Float
    ,x // Float
  ) // Float3
  ;
}
// (Func (Array Float) Float3)
function vector_151(xs)
{
  return vector_98 // [(Func Float Float Float Float3) | !'@85.(Func Float '@85) | !'@86!'@87.(Func '@86 '@87)]
  (op_obr_cbr_2029 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,0 // Int
    ) // Float
    ,op_obr_cbr_2029 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,1 // Int
    ) // Float
    ,op_obr_cbr_2029 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,2 // Int
    ) // Float
  ) // Float3
  ;
}
// (Func Float3 (Array Float))
function array_176(v)
{
  return [x_134 // (Func Float3 Float)
  (v // Float3
  ) // Float
  ,y_149 // (Func Float3 Float)
  (v // Float3
  ) // Float
  ,z_164 // (Func Float3 Float)
  (v // Float3
  ) // Float
  ] // (Array Float)
  ;
}
// (Func Float3 Float)
function sumComponents_206(v)
{
  return op_add_842 // [!'@789.(Func '@789 '@789 '@789) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_842 // [!'@788.(Func '@788 '@788 '@788) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (v // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (v // Float3
      ) // Float
    ) // Float
    ,z_164 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ) // Float
  ;
}
// (Func Float3 Float3 Float)
function dot_229(a, b)
{
  return sumComponents_206 // (Func Float3 Float)
  (op_mul_1385 // [!'@791.(Func '@791 '@791 '@791) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float)
function length_247(v)
{
  return sqrt_479 // (Func Float Float)
  (length2_263 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ) // Float
  ;
}
// (Func Float3 Float)
function length2_263(v)
{
  return dot_229 // (Func Float3 Float3 Float)
  (v // Float3
    ,v // Float3
  ) // Float
  ;
}
// (Func Float3 Float3 Float)
function distance_286(a, b)
{
  return length_247 // (Func Float3 Float)
  (op_sub_1320 // [!'@793.(Func '@793 '@793 '@793) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float3 Float)
function distance2_309(a, b)
{
  return length2_263 // (Func Float3 Float)
  (op_sub_1320 // [!'@798.(Func '@798 '@798 '@798) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float)
function normal_328(v)
{
  return op_div_590 // [!'@1381.(Func '@1381 '@1381 '@1381) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,length_247 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ) // Float
  ;
}
// (Func Float3 Float3 Float3)
function cross_431(a, b)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
  (op_sub_864 // [!'@544.(Func '@544 '@544 '@544) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@542.(Func '@542 '@542 '@542) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (y_149 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@543.(Func '@543 '@543 '@543) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@547.(Func '@547 '@547 '@547) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@545.(Func '@545 '@545 '@545) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,x_134 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@546.(Func '@546 '@546 '@546) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@550.(Func '@550 '@550 '@550) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@548.(Func '@548 '@548 '@548) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@549.(Func '@549 '@549 '@549) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (y_149 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,x_134 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Float3 Float3 Float)
function reflect_466(v, n)
{
  return op_sub_542 // [!'@1469.(Func '@1469 '@1469 '@1469) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,op_mul_886 // [!'@1468.(Func '@1468 '@1468 '@1468) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_566 // [!'@1467.(Func '@1467 '@1467 '@1467) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (n // Float3
        ,dot_229 // (Func Float3 Float3 Float)
        (v // Float3
          ,n // Float3
        ) // Float
      ) // Float
      ,2 // Float
    ) // Float
  ) // Float
  ;
}
// (Func Float Float Float Float)
function lerp_503(a, b, x)
{
  return op_add_842 // [!'@1147.(Func '@1147 '@1147 '@1147) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1145.(Func '@1145 '@1145 '@1145) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,op_sub_864 // [!'@1144.(Func '@1144 '@1144 '@1144) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,x // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1146.(Func '@1146 '@1146 '@1146) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (b // Float
      ,x // Float
    ) // Float
  ) // Float
  ;
}
// (Func Float3 Float3)
function negate_540(v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
  (op_negate_1659 // (Func Float Float)
    (x_134 // (Func Float3 Float)
      (v // Float3
      ) // Float
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (y_149 // (Func Float3 Float)
      (v // Float3
      ) // Float
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (z_164 // (Func Float3 Float)
      (v // Float3
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// Module heron:std.array:0.1
// file input\array.heron
// (Func T0 (Array T0))
function unit_16(x)
{
  return [x // '@1619
  ] // !'@1619.(Array '@1619)
  ;
}
// (Func (Array T0) (Func T0 T1) (Array T1))
function map_53(xs, f)
{
  return array_1691 // [!'@156.(Func Int (Func Int '@156) (Array '@156)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@151.(Array '@151) Int)
    (xs // !'@151.(Array '@151)
    ) // Int
    ,(i) => f // !'@151!'@155.(Func '@151 '@155)
    (op_obr_cbr_2029 // !'@151.(Func !'@151.(Array '@151) Int '@151)
      (xs // !'@151.(Array '@151)
        ,i // Int
      ) // '@151
    ) // '@155
     // !'@155.(Func Int '@155)
  ) // !'@155.(Array '@155)
  ;
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_1691 // [!'@1365.(Func Int (Func Int '@1365) (Array '@1365)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1360.(Array '@1360) Int)
    (xs // !'@1360.(Array '@1360)
    ) // Int
    ,(i) => f // !'@1360!'@1364.(Func '@1360 Int '@1364)
    (op_obr_cbr_2029 // !'@1360.(Func !'@1360.(Array '@1360) Int '@1360)
      (xs // !'@1360.(Array '@1360)
        ,i // Int
      ) // '@1360
      ,i // Int
    ) // '@1364
     // !'@1364.(Func Int '@1364)
  ) // !'@1364.(Array '@1364)
  ;
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_1691 // [!'@1353.(Func Int (Func Int '@1353) (Array '@1353)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1352.(Array '@1352) Int)
    (xs // !'@1352.(Array '@1352)
    ) // Int
    ,f // !'@1351.(Func Int '@1351)
  ) // !'@1351.(Array '@1351)
  ;
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_710 // !'@1197.(Func '@1197 '@1197 Bool)
  (x // '@1197
    ,y // '@1197
  ) // Bool
   ? x // '@1197
   : y // '@1197
   // '@1197
  ;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_662 // !'@1222.(Func '@1222 '@1222 Bool)
  (x // '@1222
    ,y // '@1222
  ) // Bool
   ? x // '@1222
   : y // '@1222
   // '@1222
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1529.(Array '@1529) Int)
    (xs // !'@1529.(Array '@1529)
    ) // Int
    ,count_1711 // (Func !'@1529.(Array '@1529) Int)
    (ys // !'@1529.(Array '@1529)
    ) // Int
  ) // Bool
   ? xs // !'@1529.(Array '@1529)
   : ys // !'@1529.(Array '@1529)
   // !'@1529.(Array '@1529)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_662 // (Func Int Int Bool)
  (count_1711 // (Func !'@1154.(Array '@1154) Int)
    (xs // !'@1154.(Array '@1154)
    ) // Int
    ,count_1711 // (Func !'@1154.(Array '@1154) Int)
    (ys // !'@1154.(Array '@1154)
    ) // Int
  ) // Bool
   ? xs // !'@1154.(Array '@1154)
   : ys // !'@1154.(Array '@1154)
   // !'@1154.(Array '@1154)
  ;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@852.(Array '@852) Int)
    (xs // !'@852.(Array '@852)
    ) // Int
    ,0 // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53 // !'@1511.(Func (Array Int) (Func Int '@1511) (Array '@1511))
  (indices // (Array Int)
    ,(i) => at_1737 // !'@1511.(Func !'@1511.(Array '@1511) Int '@1511)
    (xs // !'@1511.(Array '@1511)
      ,i // Int
    ) // '@1511
     // !'@1511.(Func Int '@1511)
  ) // !'@1511.(Array '@1511)
  ;
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_1762 // (Func Int Int (Array Int))
  (0 // Int
    ,count_1711 // (Func !'@198.(Array '@198) Int)
    (xs // !'@198.(Array '@198)
    ) // Int
  ) // (Array Int)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function zip_372(xs, ys, f)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1648.(Array '@1648) Int)
    (xs // !'@1648.(Array '@1648)
    ) // Int
    ,count_1711 // (Func !'@1641.(Array '@1641) Int)
    (ys // !'@1641.(Array '@1641)
    ) // Int
  ) // Bool
   ? mapWithIndex_92 // !'@1648!'@1645.(Func (Array '@1648) (Func '@1648 Int '@1645) (Array '@1645))
  (xs // !'@1648.(Array '@1648)
    ,(x, i) => f // !'@1648!'@1641!'@1645.(Func '@1648 '@1641 '@1645)
    (x // '@1648
      ,op_obr_cbr_2029 // !'@1641.(Func !'@1641.(Array '@1641) Int '@1641)
      (ys // !'@1641.(Array '@1641)
        ,i // Int
      ) // '@1641
    ) // '@1645
     // !'@1648!'@1645.(Func '@1648 Int '@1645)
  ) // !'@1645.(Array '@1645)
   : mapWithIndex_92 // !'@1641!'@1645.(Func (Array '@1641) (Func '@1641 Int '@1645) (Array '@1645))
  (ys // !'@1641.(Array '@1641)
    ,(y, i) => f // !'@1648!'@1641!'@1645.(Func '@1648 '@1641 '@1645)
    (op_obr_cbr_2029 // !'@1648.(Func !'@1648.(Array '@1648) Int '@1648)
      (xs // !'@1648.(Array '@1648)
        ,i // Int
      ) // '@1648
      ,y // '@1641
    ) // '@1645
     // !'@1641!'@1645.(Func '@1641 Int '@1645)
  ) // !'@1645.(Array '@1645)
   // !'@1645.(Array '@1645)
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1918 // !'@385.(Func (Array '@385) Bool (Func Bool '@385 Bool) Bool)
  (xs // !'@385.(Array '@385)
    ,true // Bool
    ,(prev, x) => op_amp_amp_1585 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@385.(Func '@385 Bool)
      (x // '@385
      ) // Bool
    ) // Bool
     // !'@385.(Func Bool '@385 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1918 // !'@398.(Func (Array '@398) Bool (Func Bool '@398 Bool) Bool)
  (xs // !'@398.(Array '@398)
    ,false // Bool
    ,(prev, x) => op_bar_bar_1607 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@398.(Func '@398 Bool)
      (x // '@398
      ) // Bool
    ) // Bool
     // !'@398.(Func Bool '@398 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Array T1) Bool)
function eq_469(xs, ys)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@858.(Array '@858) Int)
    (xs // !'@858.(Array '@858)
    ) // Int
    ,count_1711 // (Func !'@859.(Array '@859) Int)
    (ys // !'@859.(Array '@859)
    ) // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_537(xs, p)
{
  let ys = mutable_1785 // !'@872.(Func (Array '@872) (ArrayBuilder '@872))
  (xs // !'@872.(Array '@872)
  ) // !'@872.(ArrayBuilder '@872)
  ;
  let i = 0 // Int
  ;
  for (let i0=0; i0 < xs // !'@872.(Array '@872)
  .length; ++i0)
  {
    const x = xs // !'@872.(Array '@872)
    [i0];
    {
      if (p // !'@872.(Func '@872 Bool)
        (x // '@872
        ) // Bool
      )
      {
        ys = set_1881 // !'@872.(Func (ArrayBuilder '@872) Int '@872 (ArrayBuilder '@872))
        (ys // !'@872.(ArrayBuilder '@872)
          ,i++ // Int
          ,x // '@872
        ) // !'@872.(ArrayBuilder '@872)
         // !'@872.(ArrayBuilder '@872)
        ;
      }
      else
      { }
    }
  }
  return take_967 // [!'@884.(Func (Array '@884) Int (Array '@884)) | !'@885.(Func (Array '@885) Int Int (Array '@885))]
  (immutable_1904 // !'@872.(Func (ArrayBuilder '@872) (Array '@872))
    (ys // !'@872.(ArrayBuilder '@872)
    ) // !'@872.(Array '@872)
    ,i // Int
  ) // !'@872.(Array '@872)
  ;
}
// (Func T0 Int (Array T0))
function repeat_566(x, n)
{
  return map_53 // !'@1427.(Func (Array Int) (Func Int '@1427) (Array '@1427))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => x // '@1427
     // !'@1427.(Func Int '@1427)
  ) // !'@1427.(Array '@1427)
  ;
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_662(xs, op)
{
  if (empty_245 // (Func !'@1443.(Array '@1443) Bool)
    (xs // !'@1443.(Array '@1443)
    ) // Bool
  )
  {
    return xs // !'@1443.(Array '@1443)
    ;
  }
  else
  { }
  let ys = mutable_1785 // !'@1443.(Func (Array '@1443) (ArrayBuilder '@1443))
  (repeat_566 // !'@1443.(Func '@1443 Int (Array '@1443))
    (op_obr_cbr_2029 // !'@1443.(Func !'@1443.(Array '@1443) Int '@1443)
      (xs // !'@1443.(Array '@1443)
        ,0 // Int
      ) // '@1443
      ,count_1711 // (Func !'@1443.(Array '@1443) Int)
      (xs // !'@1443.(Array '@1443)
      ) // Int
    ) // !'@1443.(Array '@1443)
  ) // !'@1443.(ArrayBuilder '@1443)
  ;
  for (let i1=0; i1 < op_dot_dot_1762 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1443.(Array '@1443) Int)
      (ys // !'@1443.(ArrayBuilder '@1443)
      ) // Int
    ) // (Array Int)
  .length; ++i1)
  {
    const i = op_dot_dot_1762 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1443.(Array '@1443) Int)
      (ys // !'@1443.(ArrayBuilder '@1443)
      ) // Int
    ) // (Array Int)
    [i1];
    {
      ys = set_1881 // !'@1443.(Func (ArrayBuilder '@1443) Int '@1443 (ArrayBuilder '@1443))
      (ys // !'@1443.(ArrayBuilder '@1443)
        ,i // Int
        ,op // !'@1443.(Func '@1443 '@1443 '@1443)
        (op_obr_cbr_2029 // !'@1443.(Func !'@1443.(Array '@1443) Int '@1443)
          (xs // !'@1443.(Array '@1443)
            ,i // Int
          ) // '@1443
          ,op_obr_cbr_2029 // !'@1443.(Func !'@1443.(Array '@1443) Int '@1443)
          (ys // !'@1443.(ArrayBuilder '@1443)
            ,op_sub_754 // [!'@1445.(Func '@1445 '@1445 '@1445) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (i // Int
              ,1 // Int
            ) // Int
          ) // '@1443
        ) // '@1443
      ) // !'@1443.(ArrayBuilder '@1443)
       // !'@1443.(ArrayBuilder '@1443)
      ;
    }
  }
  return immutable_1904 // !'@1443.(Func (ArrayBuilder '@1443) (Array '@1443))
  (ys // !'@1443.(ArrayBuilder '@1443)
  ) // !'@1443.(Array '@1443)
  ;
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_720(xs)
{
  return map_53 // !'@331.(Func (Array Int) (Func Int '@331) (Array '@331))
  (indices_292 // (Func !'@331.(Array '@331) (Array Int))
    (xs // !'@331.(Array '@331)
    ) // (Array Int)
    ,(i) => op_gt_638 // (Func Int Int Bool)
    (i // Int
      ,0 // Int
    ) // Bool
     ? op_sub_542 // [!'@371.(Func '@371 '@371 '@371) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2029 // !'@331.(Func !'@331.(Array '@331) Int '@331)
      (xs // !'@331.(Array '@331)
        ,i // Int
      ) // '@331
      ,op_obr_cbr_2029 // !'@331.(Func !'@331.(Array '@331) Int '@331)
      (xs // !'@331.(Array '@331)
        ,op_sub_754 // [!'@370.(Func '@370 '@370 '@370) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
      ) // '@331
    ) // '@331
     : op_obr_cbr_2029 // !'@331.(Func !'@331.(Array '@331) Int '@331)
    (xs // !'@331.(Array '@331)
      ,i // Int
    ) // '@331
     // '@331
     // !'@331.(Func Int '@331)
  ) // !'@331.(Array '@331)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function slice_758(xs, from, to)
{
  return map_53 // !'@813.(Func (Array Int) (Func Int '@813) (Array '@813))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (from // Int
      ,to // Int
    ) // (Array Int)
    ,(i) => at_1737 // !'@813.(Func !'@813.(Array '@813) Int '@813)
    (xs // !'@813.(Array '@813)
      ,i // Int
    ) // '@813
     // !'@813.(Func Int '@813)
  ) // !'@813.(Array '@813)
  ;
}
// (Func (Array T0) Int (Array T0))
function stride_805(xs, n)
{
  return map_53 // !'@1571.(Func (Array Int) (Func Int '@1571) (Array '@1571))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1576.(Func '@1576 '@1576 '@1576) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1571.(Array '@1571) Int)
        (xs // !'@1571.(Array '@1571)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1571.(Func !'@1571.(Array '@1571) Int '@1571)
    (xs // !'@1571.(Array '@1571)
      ,op_mul_776 // [!'@1577.(Func '@1577 '@1577 '@1577) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@1571
     // !'@1571.(Func Int '@1571)
  ) // !'@1571.(Array '@1571)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function stride_860(xs, from, n)
{
  return map_53 // !'@1586.(Func (Array Int) (Func Int '@1586) (Array '@1586))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1592.(Func '@1592 '@1592 '@1592) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1586.(Array '@1586) Int)
        (xs // !'@1586.(Array '@1586)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1586.(Func !'@1586.(Array '@1586) Int '@1586)
    (xs // !'@1586.(Array '@1586)
      ,op_add_732 // [!'@1594.(Func '@1594 '@1594 '@1594) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (from // Int
        ,op_mul_776 // [!'@1593.(Func '@1593 '@1593 '@1593) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,n // Int
        ) // Int
      ) // Int
    ) // '@1586
     // !'@1586.(Func Int '@1586)
  ) // !'@1586.(Array '@1586)
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_896(xs, n)
{
  return map_53 // !'@1604.(Func (Array Int) (Func Int (Array '@1604)) (Array (Array '@1604)))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => stride_860 // [!'@1605.(Func (Array '@1605) Int (Array '@1605)) | !'@1606.(Func (Array '@1606) Int Int (Array '@1606))]
    (xs // !'@1604.(Array '@1604)
      ,i // Int
      ,n // Int
    ) // !'@1604.(Array '@1604)
     // !'@1604.(Func Int (Array '@1604))
  ) // (Array !'@1604.(Array '@1604))
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_947(xs, n)
{
  return map_53 // !'@1544.(Func (Array Int) (Func Int (Array '@1544)) (Array (Array '@1544)))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => slice_758 // !'@1544.(Func (Array '@1544) Int Int (Array '@1544))
    (xs // !'@1544.(Array '@1544)
      ,op_mul_776 // [!'@1548.(Func '@1548 '@1548 '@1548) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
      ,op_mul_776 // [!'@1550.(Func '@1550 '@1550 '@1550) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_add_732 // [!'@1549.(Func '@1549 '@1549 '@1549) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
        ,n // Int
      ) // Int
    ) // !'@1544.(Array '@1544)
     // !'@1544.(Func Int (Array '@1544))
  ) // (Array !'@1544.(Array '@1544))
  ;
}
// (Func (Array T0) Int (Array T0))
function take_967(xs, n)
{
  return slice_758 // !'@814.(Func (Array '@814) Int Int (Array '@814))
  (xs // !'@814.(Array '@814)
    ,0 // Int
    ,n // Int
  ) // !'@814.(Array '@814)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function take_994(xs, i, n)
{
  return take_967 // [!'@833.(Func (Array '@833) Int (Array '@833)) | !'@834!'@835!'@836!'@837.(Func '@834 '@835 '@836 '@837)]
  (skip_1023 // !'@832.(Func (Array '@832) Int (Array '@832))
    (xs // !'@832.(Array '@832)
      ,i // Int
    ) // !'@832.(Array '@832)
    ,n // Int
  ) // !'@832.(Array '@832)
  ;
}
// (Func (Array T0) Int (Array T0))
function skip_1023(xs, n)
{
  return slice_758 // !'@830.(Func (Array '@830) Int Int (Array '@830))
  (xs // !'@830.(Array '@830)
    ,n // Int
    ,op_sub_754 // [!'@831.(Func '@831 '@831 '@831) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@830.(Array '@830) Int)
      (xs // !'@830.(Array '@830)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@830.(Array '@830)
  ;
}
// (Func (Array T0) Int (Array T0))
function drop_1050(xs, n)
{
  return take_967 // [!'@842.(Func (Array '@842) Int (Array '@842)) | !'@843.(Func (Array '@843) Int Int (Array '@843))]
  (xs // !'@840.(Array '@840)
    ,op_sub_754 // [!'@841.(Func '@841 '@841 '@841) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@840.(Array '@840) Int)
      (xs // !'@840.(Array '@840)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@840.(Array '@840)
  ;
}
// (Func (Array T0) Int (Array T0))
function last_1077(xs, n)
{
  return skip_1023 // !'@1133.(Func (Array '@1133) Int (Array '@1133))
  (xs // !'@1133.(Array '@1133)
    ,op_sub_754 // [!'@1134.(Func '@1134 '@1134 '@1134) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1133.(Array '@1133) Int)
      (xs // !'@1133.(Array '@1133)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@1133.(Array '@1133)
  ;
}
// (Func (Array T0) T1 (Array T0))
function reverse_1121(xs, n)
{
  return map_53 // !'@1491.(Func (Array Int) (Func Int '@1491) (Array '@1491))
  (indices_292 // (Func !'@1491.(Array '@1491) (Array Int))
    (xs // !'@1491.(Array '@1491)
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1491.(Func !'@1491.(Array '@1491) Int '@1491)
    (xs // !'@1491.(Array '@1491)
      ,op_sub_754 // [!'@1499.(Func '@1499 '@1499 '@1499) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1498.(Func '@1498 '@1498 '@1498) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func !'@1491.(Array '@1491) Int)
          (xs // !'@1491.(Array '@1491)
          ) // Int
          ,1 // Int
        ) // Int
        ,i // Int
      ) // Int
    ) // '@1491
     // !'@1491.(Func Int '@1491)
  ) // !'@1491.(Array '@1491)
  ;
}
// (Func Int (Func Int T0) (Array T0))
function gen_1145(cnt, f)
{
  return map_53 // !'@509.(Func (Array Int) (Func Int '@509) (Array '@509))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,cnt // Int
    ) // (Array Int)
    ,f // !'@509.(Func Int '@509)
  ) // !'@509.(Array '@509)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1213(xs, ys)
{
  return gen_1145 // !'@512.(Func Int (Func Int '@512) (Array '@512))
  (op_add_732 // [!'@526.(Func '@526 '@526 '@526) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@512.(Array '@512) Int)
      (xs // !'@512.(Array '@512)
      ) // Int
      ,count_1711 // (Func !'@512.(Array '@512) Int)
      (ys // !'@512.(Array '@512)
      ) // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,count_1711 // (Func !'@512.(Array '@512) Int)
      (xs // !'@512.(Array '@512)
      ) // Int
    ) // Bool
     ? op_obr_cbr_2029 // !'@512.(Func !'@512.(Array '@512) Int '@512)
    (xs // !'@512.(Array '@512)
      ,i // Int
    ) // '@512
     : op_obr_cbr_2029 // !'@512.(Func !'@512.(Array '@512) Int '@512)
    (ys // !'@512.(Array '@512)
      ,op_sub_754 // [!'@527.(Func '@527 '@527 '@527) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,count_1711 // (Func !'@512.(Array '@512) Int)
        (xs // !'@512.(Array '@512)
        ) // Int
      ) // Int
    ) // '@512
     // '@512
     // !'@512.(Func Int '@512)
  ) // !'@512.(Array '@512)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function cut_1275(xs, from, n)
{
  return gen_1145 // !'@557.(Func Int (Func Int '@557) (Array '@557))
  (op_sub_754 // [!'@564.(Func '@564 '@564 '@564) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@557.(Array '@557) Int)
      (xs // !'@557.(Array '@557)
      ) // Int
      ,n // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,from // Int
    ) // Bool
     ? op_obr_cbr_2029 // !'@557.(Func !'@557.(Array '@557) Int '@557)
    (xs // !'@557.(Array '@557)
      ,i // Int
    ) // '@557
     : op_obr_cbr_2029 // !'@557.(Func !'@557.(Array '@557) Int '@557)
    (xs // !'@557.(Array '@557)
      ,op_add_732 // [!'@565.(Func '@565 '@565 '@565) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@557
     // '@557
     // !'@557.(Func Int '@557)
  ) // !'@557.(Array '@557)
  ;
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1312(xs, from, ys)
{
  return concat_1213 // !'@1559.(Func (Array '@1559) (Array '@1559) (Array '@1559))
  (concat_1213 // !'@1559.(Func (Array '@1559) (Array '@1559) (Array '@1559))
    (take_967 // [!'@1562.(Func (Array '@1562) Int (Array '@1562)) | !'@1563.(Func (Array '@1563) Int Int (Array '@1563))]
      (xs // !'@1559.(Array '@1559)
        ,from // Int
      ) // !'@1559.(Array '@1559)
      ,ys // !'@1559.(Array '@1559)
    ) // !'@1559.(Array '@1559)
    ,skip_1023 // !'@1559.(Func (Array '@1559) Int (Array '@1559))
    (xs // !'@1559.(Array '@1559)
      ,from // Int
    ) // !'@1559.(Array '@1559)
  ) // !'@1559.(Array '@1559)
  ;
}
// (Func (Array Float) Float)
function sum_1330(xs)
{
  return reduce_1918 // (Func (Array Float) Float (Func Float Float Float) Float)
  (xs // (Array Float)
    ,0 // Float
    ,op_add_842 // [!'@428.(Func '@428 '@428 '@428) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Float
  ;
}
// (Func (Array Float) Float)
function product_1348(xs)
{
  return reduce_1918 // (Func (Array Float) Float (Func Float Float Float) Float)
  (xs // (Array Float)
    ,1 // Float
    ,op_mul_886 // [!'@1454.(Func '@1454 '@1454 '@1454) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Float
  ;
}
// (Func (Array Float) Float)
function average_1373(xs)
{
  return op_div_908 // [!'@432.(Func '@432 '@432 '@432) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (sum_1330 // (Func (Array Float) Float)
    (xs // (Array Float)
    ) // Float
    ,float_41 // (Func Int Float)
    (count_1711 // (Func (Array Float) Int)
      (xs // (Array Float)
      ) // Int
    ) // Float
  ) // Float
  ;
}
// (Func (Array T0) T0)
function min_1395(xs)
{
  return reduce_1918 // !'@1210.(Func (Array '@1210) '@1210 (Func '@1210 '@1210 '@1210) '@1210)
  (xs // !'@1210.(Array '@1210)
    ,op_obr_cbr_2029 // !'@1210.(Func !'@1210.(Array '@1210) Int '@1210)
    (xs // !'@1210.(Array '@1210)
      ,0 // Int
    ) // '@1210
    ,min_140 // [!'@1213.(Func '@1213 '@1213 '@1213) | !'@1214!'@1215.(Func '@1214 '@1215)]
  ) // '@1213
  ;
}
// (Func (Array T0) T0)
function max_1417(xs)
{
  return reduce_1918 // !'@1231.(Func (Array '@1231) '@1231 (Func '@1231 '@1231 '@1231) '@1231)
  (xs // !'@1231.(Array '@1231)
    ,op_obr_cbr_2029 // !'@1231.(Func !'@1231.(Array '@1231) Int '@1231)
    (xs // !'@1231.(Array '@1231)
      ,0 // Int
    ) // '@1231
    ,max_165 // [!'@1234.(Func '@1234 '@1234 '@1234) | !'@1235!'@1236.(Func '@1235 '@1236)]
  ) // '@1234
  ;
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1483(xs, i, j)
{
  let tmp = op_obr_cbr_2029 // !'@1271.(Func !'@1271.(Array '@1271) Int '@1271)
  (xs // !'@1271.(ArrayBuilder '@1271)
    ,i // Int
  ) // '@1271
  ;
  xs = set_1881 // !'@1271.(Func (ArrayBuilder '@1271) Int '@1271 (ArrayBuilder '@1271))
  (xs // !'@1271.(Array '@1271)
    ,i // Int
    ,op_obr_cbr_2029 // !'@1271.(Func !'@1271.(Array '@1271) Int '@1271)
    (xs // !'@1271.(Array '@1271)
      ,j // Int
    ) // '@1271
  ) // !'@1271.(ArrayBuilder '@1271)
   // !'@1271.(ArrayBuilder '@1271)
  ;
  xs = set_1881 // !'@1271.(Func (ArrayBuilder '@1271) Int '@1271 (ArrayBuilder '@1271))
  (xs // !'@1271.(ArrayBuilder '@1271)
    ,j // Int
    ,tmp // '@1271
  ) // !'@1271.(ArrayBuilder '@1271)
   // !'@1271.(ArrayBuilder '@1271)
  ;
  return xs // !'@1271.(ArrayBuilder '@1271)
  ;
}
// (Func (Array T0) Int Int Int)
function partition_1598(a, lo, hi)
{
  let p = op_obr_cbr_2029 // !'@1259.(Func !'@1259.(Array '@1259) Int '@1259)
  (a // !'@1259.(Array '@1259)
    ,lo // Int
  ) // '@1259
  ;
  let i = op_sub_754 // [!'@1276.(Func '@1276 '@1276 '@1276) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (lo // Int
    ,1 // Int
  ) // Int
  ;
  let j = op_add_732 // [!'@1277.(Func '@1277 '@1277 '@1277) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (hi // Int
    ,1 // Int
  ) // Int
  ;
  while (true // Bool
  )
  {
    do
    {
      i++ // Int
      ;
    }
    while (op_lt_686 // !'@1259.(Func '@1259 '@1259 Bool)
      (op_obr_cbr_2029 // !'@1259.(Func !'@1259.(Array '@1259) Int '@1259)
        (a // !'@1259.(Array '@1259)
          ,i // Int
        ) // '@1259
        ,p // '@1259
      ) // Bool
    )
    do
    {
      j-- // Int
      ;
    }
    while (op_gt_638 // !'@1259.(Func '@1259 '@1259 Bool)
      (op_obr_cbr_2029 // !'@1259.(Func !'@1259.(Array '@1259) Int '@1259)
        (a // !'@1259.(Array '@1259)
          ,j // Int
        ) // '@1259
        ,p // '@1259
      ) // Bool
    )
    if (op_gt_eq_662 // (Func Int Int Bool)
      (i // Int
        ,j // Int
      ) // Bool
    )
    {
      return j // Int
      ;
    }
    else
    { }
    swapElements_1483 // !'@1259.(Func (ArrayBuilder '@1259) Int Int (ArrayBuilder '@1259))
    (a // !'@1259.(Array '@1259)
      ,i // Int
      ,j // Int
    ) // !'@1259.(ArrayBuilder '@1259)
    ;
  }
}
// (Func (Array T0) Int Int (Array T0))
function qsort_1667(a, lo, hi)
{
  if (op_lt_686 // (Func Int Int Bool)
    (lo // Int
      ,hi // Int
    ) // Bool
  )
  {
    let p = partition_1598 // (Func !'@1278.(Array '@1278) Int Int Int)
    (a // !'@1278.(Array '@1278)
      ,lo // Int
      ,hi // Int
    ) // Int
    ;
    qsort_1667 // !'@1282.(Func !'@1278.(Array '@1278) Int Int '@1282)
    (a // !'@1278.(Array '@1278)
      ,lo // Int
      ,p // Int
    ) // '@1282
    ;
    qsort_1667 // !'@1286.(Func !'@1278.(Array '@1278) Int Int '@1286)
    (a // !'@1278.(Array '@1278)
      ,op_add_732 // [!'@1288.(Func '@1288 '@1288 '@1288) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (p // Int
        ,1 // Int
      ) // Int
      ,hi // Int
    ) // '@1286
    ;
  }
  else
  { }
  return a // !'@1278.(Array '@1278)
  ;
}
// (Func (Array T0) (Array T0))
function sort_1697(xs)
{
  return immutable_1904 // !'@1290.(Func (ArrayBuilder '@1290) (Array '@1290))
  (qsort_1667 // !'@1290.(Func (Array '@1290) Int Int (Array '@1290))
    (mutable_1785 // !'@1290.(Func (Array '@1290) (ArrayBuilder '@1290))
      (xs // !'@1290.(Array '@1290)
      ) // !'@1290.(ArrayBuilder '@1290)
      ,0 // Int
      ,op_sub_754 // [!'@1293.(Func '@1293 '@1293 '@1293) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1290.(Array '@1290) Int)
        (xs // !'@1290.(Array '@1290)
        ) // Int
        ,1 // Int
      ) // Int
    ) // !'@1290.(Array '@1290)
  ) // !'@1290.(Array '@1290)
  ;
}
// (Func (Array Int) Int)
function median_1797(xs)
{
  let ys = sort_1697 // (Func (Array Int) (Array Int))
  (xs // (Array Int)
  ) // (Array Int)
  ;
  return op_eq_eq_1563 // (Func Int Int Bool)
  (op_mod_820 // [!'@1323.(Func '@1323 '@1323 '@1323) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1322.(Func '@1322 '@1322 '@1322) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
    ,0 // Int
  ) // Bool
   ? op_obr_cbr_2029 // (Func (Array Int) Int Int)
  (ys // (Array Int)
    ,op_div_798 // [!'@1325.(Func '@1325 '@1325 '@1325) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1324.(Func '@1324 '@1324 '@1324) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
  ) // Int
   : op_add_732 // [!'@1330.(Func '@1330 '@1330 '@1330) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (ys // (Array Int)
      ,op_div_798 // [!'@1327.(Func '@1327 '@1327 '@1327) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1326.(Func '@1326 '@1326 '@1326) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func (Array Int) Int)
          (ys // (Array Int)
          ) // Int
          ,2 // Int
        ) // Int
        ,2 // Int
      ) // Int
    ) // Int
    ,op_div_798 // [!'@1329.(Func '@1329 '@1329 '@1329) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2029 // (Func (Array Int) Int Int)
      (ys // (Array Int)
        ,op_div_798 // [!'@1328.(Func '@1328 '@1328 '@1328) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func (Array Int) Int)
          (ys // (Array Int)
          ) // Int
          ,2 // Int
        ) // Int
      ) // Int
      ,2 // Int
    ) // Int
  ) // Int
   // Int
  ;
}
// (Func (Array T0) Int Bool)
function inRange_1828(xs, n)
{
  return op_amp_amp_1585 // (Func Bool Bool Bool)
  (op_gt_eq_662 // (Func Int Int Bool)
    (n // Int
      ,0 // Int
    ) // Bool
    ,op_lt_686 // (Func Int Int Bool)
    (n // Int
      ,count_1711 // (Func !'@1118.(Array '@1118) Int)
      (xs // !'@1118.(Array '@1118)
      ) // Int
    ) // Bool
  ) // Bool
  ;
}
// (Func (Array T0) T0)
function last_1851(xs)
{
  return op_obr_cbr_2029 // !'@1125.(Func !'@1125.(Array '@1125) Int '@1125)
  (xs // !'@1125.(Array '@1125)
    ,op_sub_754 // [!'@1126.(Func '@1126 '@1126 '@1126) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1125.(Array '@1125) Int)
      (xs // !'@1125.(Array '@1125)
      ) // Int
      ,1 // Int
    ) // Int
  ) // '@1125
  ;
}
// (Func (Array T0) T0)
function first_1866(xs)
{
  return op_obr_cbr_2029 // !'@889.(Func !'@889.(Array '@889) Int '@889)
  (xs // !'@889.(Array '@889)
    ,0 // Int
  ) // '@889
  ;
}
// (Func (Array T0) (Array T0))
function tail_1881(xs)
{
  return skip_1023 // !'@1611.(Func (Array '@1611) Int (Array '@1611))
  (xs // !'@1611.(Array '@1611)
    ,1 // Int
  ) // !'@1611.(Array '@1611)
  ;
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1918(xs, acc, f)
{
  for (let i2=0; i2 < xs // !'@380.(Array '@380)
  .length; ++i2)
  {
    const x = xs // !'@380.(Array '@380)
    [i2];
    {
      acc = f // !'@381!'@380.(Func '@381 '@380 '@381)
      (acc // '@381
        ,x // '@380
      ) // '@381
       // '@381
      ;
    }
  }
  return acc // '@381
  ;
}
// (Func (Array (Array T0)) (Array T0))
function flatten_1935(xs)
{
  return reduce_1918 // !'@898.(Func (Array (Array '@898)) (Array '@898) (Func (Array '@898) (Array '@898) (Array '@898)) (Array '@898))
  (xs // (Array !'@898.(Array '@898))
    ,[] // !'@898.(Array '@898)
    ,concat_1213 // !'@898.(Func (Array '@898) (Array '@898) (Array '@898))
  ) // !'@898.(Array '@898)
  ;
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T1))
function flatMap_1957(xs, f)
{
  return flatten_1935 // !'@900.(Func (Array (Array '@900)) (Array '@900))
  (map_53 // !'@901!'@900.(Func (Array '@901) (Func '@901 (Array '@900)) (Array (Array '@900)))
    (xs // !'@901.(Array '@901)
      ,f // !'@901!'@900.(Func '@901 (Array '@900))
    ) // (Array !'@900.(Array '@900))
  ) // !'@900.(Array '@900)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function cartesianProduct_2010(xs, ys, f)
{
  let r = mutable_1785 // !'@449.(Func (Array '@449) (ArrayBuilder '@449))
  ([] // !'@449.(Array '@449)
  ) // !'@449.(ArrayBuilder '@449)
  ;
  for (let i3=0; i3 < xs // !'@442.(Array '@442)
  .length; ++i3)
  {
    const x = xs // !'@442.(Array '@442)
    [i3];
    {
      for (let i4=0; i4 < ys // !'@443.(Array '@443)
      .length; ++i4)
      {
        const y = ys // !'@443.(Array '@443)
        [i4];
        {
          push_1814 // !'@449.(Func (ArrayBuilder '@449) '@449 (ArrayBuilder '@449))
          (r // !'@449.(ArrayBuilder '@449)
            ,f // !'@442!'@443!'@449.(Func '@442 '@443 '@449)
            (x // '@442
              ,y // '@443
            ) // '@449
          ) // !'@449.(ArrayBuilder '@449)
          ;
        }
      }
    }
  }
  return immutable_1904 // !'@449.(Func (ArrayBuilder '@449) (Array '@449))
  (r // !'@449.(ArrayBuilder '@449)
  ) // !'@449.(Array '@449)
  ;
}
// (Func (Array T0) T1 (Array T1))
function setAll_2034(xs, x)
{
  return map_53 // !'@159!'@135.(Func (Array '@159) (Func '@159 '@135) (Array '@135))
  (xs // !'@159.(Array '@159)
    ,(_) => x // '@135
     // !'@159!'@135.(Func '@159 '@135)
  ) // !'@135.(Array '@135)
  ;
}
// Module heron:geometry.mesh:0.1
// file input\geometry-mesh.heron
// imports heron:std.array:0.1
// imports heron:geometry.vector:0.1
// Mesh
const tetrahedron = mesh_81 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@315!'@316!'@317.(Func '@315 '@316 '@317) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
(toVectors_1936 // (Func (Array Float) (Array Float3))
  ([1 // Int
    ,1 // Int
    ,1 // Int
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ,1 // Int
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ,1 // Int
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ,1 // Int
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ] // (Array Float)
  ) // (Array Float3)
  ,[2 // Int
  ,1 // Int
  ,0 // Int
  ,0 // Int
  ,3 // Int
  ,2 // Int
  ,1 // Int
  ,3 // Int
  ,0 // Int
  ,2 // Int
  ,3 // Int
  ,1 // Int
  ] // (Array Int)
) // Mesh
;
// Mesh
const cube = mesh_81 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@205!'@206!'@207.(Func '@205 '@206 '@207) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
(toVectors_1936 // (Func (Array Float) (Array Float3))
  ([op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,1 // Float
    ,1 // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,1 // Float
    ,1 // Float
    ,1 // Float
    ,1 // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,1 // Float
    ,1 // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,1 // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,1 // Float
    ,1 // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ,1 // Float
    ,op_negate_1659 // (Func Float Float)
    (1 // Float
    ) // Float
    ] // (Array Float)
  ) // (Array Float3)
  ,[0 // Int
  ,1 // Int
  ,2 // Int
  ,2 // Int
  ,3 // Int
  ,0 // Int
  ,1 // Int
  ,5 // Int
  ,6 // Int
  ,6 // Int
  ,2 // Int
  ,1 // Int
  ,7 // Int
  ,6 // Int
  ,5 // Int
  ,5 // Int
  ,4 // Int
  ,7 // Int
  ,4 // Int
  ,0 // Int
  ,3 // Int
  ,3 // Int
  ,7 // Int
  ,4 // Int
  ,4 // Int
  ,5 // Int
  ,1 // Int
  ,1 // Int
  ,0 // Int
  ,4 // Int
  ,3 // Int
  ,2 // Int
  ,6 // Int
  ,6 // Int
  ,7 // Int
  ,3 // Int
  ] // (Array Int)
) // Mesh
;
// Mesh
const octahedron = mesh_81 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@306!'@307!'@308.(Func '@306 '@307 '@308) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
(toVectors_1936 // (Func (Array Float) (Array Float3))
  ([1 // Int
    ,0 // Int
    ,0 // Int
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ,0 // Int
    ,0 // Int
    ,0 // Int
    ,1 // Int
    ,0 // Int
    ,0 // Int
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ,0 // Int
    ,0 // Int
    ,0 // Int
    ,1 // Int
    ,0 // Int
    ,0 // Int
    ,op_negate_1659 // (Func Float Float)
    (1 // Int
    ) // Float
    ] // (Array Float)
  ) // (Array Float3)
  ,[0 // Int
  ,2 // Int
  ,4 // Int
  ,0 // Int
  ,4 // Int
  ,3 // Int
  ,0 // Int
  ,3 // Int
  ,5 // Int
  ,0 // Int
  ,5 // Int
  ,2 // Int
  ,1 // Int
  ,2 // Int
  ,5 // Int
  ,1 // Int
  ,5 // Int
  ,3 // Int
  ,1 // Int
  ,3 // Int
  ,4 // Int
  ,1 // Int
  ,4 // Int
  ,2 // Int
  ] // (Array Int)
) // Mesh
;
// Mesh
const dodecahedron = ((t) => ((r) => mesh_81 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@290!'@291!'@292.(Func '@290 '@291 '@292) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
    (toVectors_1936 // (Func (Array Float) (Array Float3))
      ([op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,1 // Int
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,1 // Int
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,1 // Int
        ,1 // Int
        ,1 // Int
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,1 // Int
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,1 // Int
        ,1 // Int
        ,1 // Int
        ,op_negate_1659 // (Func Float Float)
        (1 // Int
        ) // Float
        ,1 // Int
        ,1 // Int
        ,1 // Int
        ,0 // Int
        ,op_negate_1659 // (Func Float Float)
        (r // Float
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (t // Float
        ) // Float
        ,0 // Int
        ,op_negate_1659 // (Func Float Float)
        (r // Float
        ) // Float
        ,t // Float
        ,0 // Int
        ,r // Float
        ,op_negate_1659 // (Func Float Float)
        (t // Float
        ) // Float
        ,0 // Int
        ,r // Float
        ,t // Float
        ,op_negate_1659 // (Func Float Float)
        (r // Float
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (t // Float
        ) // Float
        ,0 // Int
        ,op_negate_1659 // (Func Float Float)
        (r // Float
        ) // Float
        ,t // Float
        ,0 // Int
        ,r // Float
        ,op_negate_1659 // (Func Float Float)
        (t // Float
        ) // Float
        ,0 // Int
        ,r // Float
        ,t // Float
        ,0 // Int
        ,op_negate_1659 // (Func Float Float)
        (t // Float
        ) // Float
        ,0 // Int
        ,op_negate_1659 // (Func Float Float)
        (r // Float
        ) // Float
        ,t // Float
        ,0 // Int
        ,op_negate_1659 // (Func Float Float)
        (r // Float
        ) // Float
        ,op_negate_1659 // (Func Float Float)
        (t // Float
        ) // Float
        ,0 // Int
        ,r // Float
        ,t // Float
        ,0 // Int
        ,r // Float
        ] // (Array Float)
      ) // (Array Float3)
      ,[3 // Int
      ,11 // Int
      ,7 // Int
      ,3 // Int
      ,7 // Int
      ,15 // Int
      ,3 // Int
      ,15 // Int
      ,13 // Int
      ,7 // Int
      ,19 // Int
      ,17 // Int
      ,7 // Int
      ,17 // Int
      ,6 // Int
      ,7 // Int
      ,6 // Int
      ,15 // Int
      ,17 // Int
      ,4 // Int
      ,8 // Int
      ,17 // Int
      ,8 // Int
      ,10 // Int
      ,17 // Int
      ,10 // Int
      ,6 // Int
      ,8 // Int
      ,0 // Int
      ,16 // Int
      ,8 // Int
      ,16 // Int
      ,2 // Int
      ,8 // Int
      ,2 // Int
      ,10 // Int
      ,0 // Int
      ,12 // Int
      ,1 // Int
      ,0 // Int
      ,1 // Int
      ,18 // Int
      ,0 // Int
      ,18 // Int
      ,16 // Int
      ,6 // Int
      ,10 // Int
      ,2 // Int
      ,6 // Int
      ,2 // Int
      ,13 // Int
      ,6 // Int
      ,13 // Int
      ,15 // Int
      ,2 // Int
      ,16 // Int
      ,18 // Int
      ,2 // Int
      ,18 // Int
      ,3 // Int
      ,2 // Int
      ,3 // Int
      ,13 // Int
      ,18 // Int
      ,1 // Int
      ,9 // Int
      ,18 // Int
      ,9 // Int
      ,11 // Int
      ,18 // Int
      ,11 // Int
      ,3 // Int
      ,4 // Int
      ,14 // Int
      ,12 // Int
      ,4 // Int
      ,12 // Int
      ,0 // Int
      ,4 // Int
      ,0 // Int
      ,8 // Int
      ,11 // Int
      ,9 // Int
      ,5 // Int
      ,11 // Int
      ,5 // Int
      ,19 // Int
      ,11 // Int
      ,19 // Int
      ,7 // Int
      ,19 // Int
      ,5 // Int
      ,14 // Int
      ,19 // Int
      ,14 // Int
      ,4 // Int
      ,19 // Int
      ,4 // Int
      ,17 // Int
      ,1 // Int
      ,12 // Int
      ,14 // Int
      ,1 // Int
      ,14 // Int
      ,5 // Int
      ,1 // Int
      ,5 // Int
      ,9 // Int
      ] // (Array Int)
    ) // Mesh
    )(op_div_590 // [!'@289.(Func '@289 '@289 '@289) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (1 // Int
      ,t // Float
    ) // Float
  )
   // Mesh
  )(op_div_590 // [!'@285.(Func '@285 '@285 '@285) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@286.(Func '@286 '@286 '@286) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (1 // Int
      ,sqrt_479 // (Func Float Float)
      (5 // Int
      ) // Float
    ) // Float
    ,2 // Int
  ) // Float
)
 // Mesh
;
// Mesh
const icosahedron = ((t) => mesh_81 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@300!'@301!'@302.(Func '@300 '@301 '@302) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
  (toVectors_1936 // (Func (Array Float) (Array Float3))
    ([op_negate_1659 // (Func Float Float)
      (1 // Int
      ) // Float
      ,t // Float
      ,0 // Int
      ,1 // Int
      ,t // Float
      ,0 // Int
      ,op_negate_1659 // (Func Float Float)
      (1 // Int
      ) // Float
      ,op_negate_1659 // (Func Float Float)
      (t // Float
      ) // Float
      ,0 // Int
      ,1 // Int
      ,op_negate_1659 // (Func Float Float)
      (t // Float
      ) // Float
      ,0 // Int
      ,0 // Int
      ,op_negate_1659 // (Func Float Float)
      (1 // Int
      ) // Float
      ,t // Float
      ,0 // Int
      ,1 // Int
      ,t // Float
      ,0 // Int
      ,op_negate_1659 // (Func Float Float)
      (1 // Int
      ) // Float
      ,op_negate_1659 // (Func Float Float)
      (t // Float
      ) // Float
      ,0 // Int
      ,1 // Int
      ,op_negate_1659 // (Func Float Float)
      (t // Float
      ) // Float
      ,t // Float
      ,0 // Int
      ,op_negate_1659 // (Func Float Float)
      (1 // Int
      ) // Float
      ,t // Float
      ,0 // Int
      ,1 // Int
      ,op_negate_1659 // (Func Float Float)
      (t // Float
      ) // Float
      ,0 // Int
      ,op_negate_1659 // (Func Float Float)
      (1 // Int
      ) // Float
      ,op_negate_1659 // (Func Float Float)
      (t // Float
      ) // Float
      ,0 // Int
      ,1 // Int
      ] // (Array Float)
    ) // (Array Float3)
    ,[0 // Int
    ,11 // Int
    ,5 // Int
    ,0 // Int
    ,5 // Int
    ,1 // Int
    ,0 // Int
    ,1 // Int
    ,7 // Int
    ,0 // Int
    ,7 // Int
    ,10 // Int
    ,0 // Int
    ,10 // Int
    ,11 // Int
    ,1 // Int
    ,5 // Int
    ,9 // Int
    ,5 // Int
    ,11 // Int
    ,4 // Int
    ,11 // Int
    ,10 // Int
    ,2 // Int
    ,10 // Int
    ,7 // Int
    ,6 // Int
    ,7 // Int
    ,1 // Int
    ,8 // Int
    ,3 // Int
    ,9 // Int
    ,4 // Int
    ,3 // Int
    ,4 // Int
    ,2 // Int
    ,3 // Int
    ,2 // Int
    ,6 // Int
    ,3 // Int
    ,6 // Int
    ,8 // Int
    ,3 // Int
    ,8 // Int
    ,9 // Int
    ,4 // Int
    ,9 // Int
    ,5 // Int
    ,2 // Int
    ,4 // Int
    ,11 // Int
    ,6 // Int
    ,2 // Int
    ,10 // Int
    ,8 // Int
    ,6 // Int
    ,7 // Int
    ,9 // Int
    ,8 // Int
    ,1 // Int
    ] // (Array Int)
  ) // Mesh
  )(op_div_590 // [!'@298.(Func '@298 '@298 '@298) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@299.(Func '@299 '@299 '@299) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (1 // Int
      ,sqrt_479 // (Func Float Float)
      (5 // Int
      ) // Float
    ) // Float
    ,2 // Int
  ) // Float
)
 // Mesh
;
// (Func (Array Float3) Mesh)
function mesh_36(vertexBuffer)
{
  return mesh_81 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | !'@200!'@201.(Func '@200 '@201) | !'@202!'@203!'@204.(Func '@202 '@203 '@204) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
  (vertexBuffer // (Array Float3)
    ,indices_292 // (Func (Array Float3) (Array Int))
    (vertexBuffer // (Array Float3)
    ) // (Array Int)
  ) // Mesh
  ;
}
// (Func T0 T1 T2)
function mesh_54(vertexBuffer, indexBuffer)
{
  return mesh_36 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | !'@185!'@186.(Func '@185 '@186) | !'@187!'@188!'@189.(Func '@187 '@188 '@189) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
  (vertexBuffer // '@99
  ) // '@103
  ;
}
// (Func (Array Float3) (Array Int) Mesh)
function mesh_81(vertexBuffer, indexBuffer)
{
  return mesh_113 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | !'@177!'@178.(Func '@177 '@178) | !'@179!'@180!'@181.(Func '@179 '@180 '@181) | !'@182!'@183!'@184.(Func '@182 '@183 '@184) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
  (vertexBuffer // (Array Float3)
    ,indexBuffer // (Array Int)
    ,setAll_2034 // (Func (Array Float3) Float3 (Array Float3))
    (vertexBuffer // (Array Float3)
      ,origin // Float3
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func (Array Float3) (Array Int) (Array Float3) Mesh)
function mesh_113(vertexBuffer, indexBuffer, uvBuffer)
{
  return mesh_2107 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | !'@163!'@164.(Func '@163 '@164) | !'@165!'@166!'@167.(Func '@165 '@166 '@167) | !'@168!'@169!'@170.(Func '@168 '@169 '@170) | !'@171!'@172!'@173!'@174.(Func '@171 '@172 '@173 '@174)]
  (vertexBuffer // (Array Float3)
    ,indexBuffer // (Array Int)
    ,uvBuffer // (Array Float3)
    ,setAll_2034 // (Func (Array Float3) Float3 (Array Float3))
    (vertexBuffer // (Array Float3)
      ,origin // Float3
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func (Array T0) Int Bool Bool (Array Int))
function quadStripToMeshIndices_1078(vertices, rows, connectRows, connectCols)
{
  let cols = op_div_798 // [!'@663.(Func '@663 '@663 '@663) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func !'@605.(Array '@605) Int)
    (vertices // !'@605.(Array '@605)
    ) // Int
    ,rows // Int
  ) // Int
  ;
  let nr = connectRows // Bool
   ? rows // Int
   : op_sub_754 // [!'@664.(Func '@664 '@664 '@664) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (rows // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let nc = connectCols // Bool
   ? cols // Int
   : op_sub_754 // [!'@665.(Func '@665 '@665 '@665) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (cols // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let indices = mutable_1785 // (Func (Array Int) (ArrayBuilder Int))
  ([] // (Array Int)
  ) // (ArrayBuilder Int)
  ;
  for (let i5=0; i5 < op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,nr // Int
    ) // (Array Int)
  .length; ++i5)
  {
    const row = op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,nr // Int
    ) // (Array Int)
    [i5];
    {
      for (let i6=0; i6 < op_dot_dot_1762 // (Func Int Int (Array Int))
        (0 // Int
          ,nc // Int
        ) // (Array Int)
      .length; ++i6)
      {
        const col = op_dot_dot_1762 // (Func Int Int (Array Int))
        (0 // Int
          ,nc // Int
        ) // (Array Int)
        [i6];
        {
          let a = op_add_732 // [!'@667.(Func '@667 '@667 '@667) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@666.(Func '@666 '@666 '@666) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let b = op_add_732 // [!'@671.(Func '@671 '@671 '@671) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@669.(Func '@669 '@669 '@669) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@668.(Func '@668 '@668 '@668) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@670.(Func '@670 '@670 '@670) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let c = op_add_732 // [!'@677.(Func '@677 '@677 '@677) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@673.(Func '@673 '@673 '@673) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@672.(Func '@672 '@672 '@672) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@676.(Func '@676 '@676 '@676) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@675.(Func '@675 '@675 '@675) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@674.(Func '@674 '@674 '@674) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let d = op_add_732 // [!'@681.(Func '@681 '@681 '@681) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@680.(Func '@680 '@680 '@680) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@679.(Func '@679 '@679 '@679) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@678.(Func '@678 '@678 '@678) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          indices = pushMany_1846 // (Func (ArrayBuilder Int) (Array Int) (ArrayBuilder Int))
          (indices // (ArrayBuilder Int)
            ,[a // Int
            ,b // Int
            ,d // Int
            ] // (Array Int)
          ) // (ArrayBuilder Int)
           // (ArrayBuilder Int)
          ;
          indices = pushMany_1846 // (Func (ArrayBuilder Int) (Array Int) (ArrayBuilder Int))
          (indices // (ArrayBuilder Int)
            ,[b // Int
            ,c // Int
            ,d // Int
            ] // (Array Int)
          ) // (ArrayBuilder Int)
           // (ArrayBuilder Int)
          ;
        }
      }
    }
  }
  return immutable_1904 // (Func (ArrayBuilder Int) (Array Int))
  (indices // (ArrayBuilder Int)
  ) // (Array Int)
  ;
}
// (Func Float2 Float3)
function vector_1143(uv)
{
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (op_mul_886 // [!'@68.(Func '@68 '@68 '@68) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (cos_353 // (Func Float Float)
        (x_134 // (Func Float3 Float)
          (uv // Float2
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (y_149 // (Func Float3 Float)
        (uv // Float2
        ) // Float
      ) // Float
    ) // Float
    ,cos_353 // (Func Float Float)
    (x_134 // (Func Float3 Float)
      (uv // Float2
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@69.(Func '@69 '@69 '@69) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (x_134 // (Func Float3 Float)
        (uv // Float2
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (y_149 // (Func Float3 Float)
        (uv // Float2
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func T0 T0 T0 T0)
function rescale_1171(v, from, length)
{
  return op_add_518 // [!'@1484.(Func '@1484 '@1484 '@1484) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (from // '@1479
    ,op_mul_566 // [!'@1483.(Func '@1483 '@1483 '@1483) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // '@1479
      ,length // '@1479
    ) // '@1479
  ) // '@1479
  ;
}
// (Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh)
function meshFromUV_1377(f, uCount, vCount, uStart, vStart, uLength, vLength, uJoin, vJoin)
{
  let uMax = uJoin // Bool
   ? float_41 // (Func Int Float)
  (uCount // Int
  ) // Float
   : float_41 // (Func Int Float)
  (op_sub_754 // [!'@686.(Func '@686 '@686 '@686) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (uCount // Int
      ,1 // Int
    ) // Int
  ) // Float
   // Float
  ;
  let vMax = vJoin // Bool
   ? float_41 // (Func Int Float)
  (vCount // Int
  ) // Float
   : float_41 // (Func Int Float)
  (op_sub_754 // [!'@687.(Func '@687 '@687 '@687) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (vCount // Int
      ,1 // Int
    ) // Int
  ) // Float
   // Float
  ;
  let uvs = cartesianProduct_2010 // (Func (Array Float) (Array Float) (Func Float Float Float3) (Array Float3))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,uCount // Int
    ) // (Array Int)
    ,op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,vCount // Int
    ) // (Array Int)
    ,(u, v) => vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
    (op_add_842 // [!'@690.(Func '@690 '@690 '@690) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@689.(Func '@689 '@689 '@689) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@688.(Func '@688 '@688 '@688) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,uMax // Float
          ) // Float
          ,uLength // Float
        ) // Float
        ,uStart // Float
      ) // Float
      ,op_add_842 // [!'@693.(Func '@693 '@693 '@693) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@692.(Func '@692 '@692 '@692) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@691.(Func '@691 '@691 '@691) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,vMax // Float
          ) // Float
          ,vLength // Float
        ) // Float
        ,vStart // Float
      ) // Float
      ,0 // Int
    ) // Float3
     // (Func Float Float Float3)
  ) // (Array Float3)
  ;
  let points = map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
  (uvs // (Array Float3)
    ,(uvw) => f // (Func Float Float Float3)
    (x_134 // (Func Float3 Float)
      (uvw // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (uvw // Float3
      ) // Float
    ) // Float3
     // (Func Float3 Float3)
  ) // (Array Float3)
  ;
  let indices = quadStripToMeshIndices_1078 // (Func (Array Float3) Int Bool Bool (Array Int))
  (points // (Array Float3)
    ,vCount // Int
    ,uJoin // Bool
    ,vJoin // Bool
  ) // (Array Int)
  ;
  return mesh_113 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@694!'@695!'@696.(Func '@694 '@695 '@696) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
  (points // (Array Float3)
    ,indices // (Array Int)
    ,uvs // (Array Float3)
  ) // Mesh
  ;
}
// (Func (Func Float Float Float3) Int Mesh)
function meshFromUV_1398(f, segments)
{
  return meshFromUV_1431 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | !'@721!'@722!'@723.(Func '@721 '@722 '@723) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (f // (Func Float Float Float3)
    ,segments // Int
    ,true // Bool
  ) // Mesh
  ;
}
// (Func (Func Float Float Float3) Int Bool Mesh)
function meshFromUV_1431(f, segments, join)
{
  return meshFromUV_1377 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | !'@714!'@715!'@716.(Func '@714 '@715 '@716) | !'@717!'@718!'@719!'@720.(Func '@717 '@718 '@719 '@720)]
  (f // (Func Float Float Float3)
    ,segments // Int
    ,segments // Int
    ,0 // Float
    ,0 // Float
    ,1 // Float
    ,1 // Float
    ,join // Bool
    ,join // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function spherePoint_1531(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@935.(Func '@935 '@935 '@935) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (cos_353 // (Func Float Float)
        (op_mul_886 // [!'@932.(Func '@932 '@932 '@932) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mul_886 // [!'@931.(Func '@931 '@931 '@931) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (u // Float
              ,2 // Float
            ) // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@934.(Func '@934 '@934 '@934) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@933.(Func '@933 '@933 '@933) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@937.(Func '@937 '@937 '@937) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@936.(Func '@936 '@936 '@936) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@942.(Func '@942 '@942 '@942) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (op_mul_886 // [!'@939.(Func '@939 '@939 '@939) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@938.(Func '@938 '@938 '@938) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@941.(Func '@941 '@941 '@941) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@940.(Func '@940 '@940 '@940) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Int Mesh)
function sphere_1548(segments)
{
  return meshFromUV_1398 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (spherePoint_1531 // (Func Float Float Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function sphere_1559()
{
  return sphere_1548 // [(Func Int Mesh) | !'@945.(Func '@945)]
  (32 // Int
  ) // Mesh
  ;
}
// (Func Float Int Float3)
function cylinderPoint_1611(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (sin_449 // (Func Float Float)
    (op_mul_886 // [!'@733.(Func '@733 '@733 '@733) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@732.(Func '@732 '@732 '@732) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_776 // [!'@734.(Func '@734 '@734 '@734) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Int
      ,2 // Int
    ) // Int
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@736.(Func '@736 '@736 '@736) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@735.(Func '@735 '@735 '@735) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Int Mesh)
function cylinder_1628(segments)
{
  return meshFromUV_1398 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (cylinderPoint_1611 // (Func Float Int Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function cylinder_1639()
{
  return cylinder_1628 // [(Func Int Mesh) | !'@738.(Func '@738)]
  (16 // Int
  ) // Mesh
  ;
}
// (Func Float Float Int Mesh)
function torus_1679(r1, r2, segments)
{
  return meshFromUV_1398 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  ((u, v) => torusPoint_1809 // (Func Float Float Float Float Float3)
    (u // Float
      ,v // Float
      ,r1 // Float
      ,r2 // Float
    ) // Float3
     // (Func Float Float Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Float Float Float Float Float3)
function torusPoint_1809(u, v, r1, r2)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@981.(Func '@981 '@981 '@981) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@978.(Func '@978 '@978 '@978) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@977.(Func '@977 '@977 '@977) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_886 // [!'@976.(Func '@976 '@976 '@976) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_886 // [!'@975.(Func '@975 '@975 '@975) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,2 // Float
              ) // Float
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,cos_353 // (Func Float Float)
      (op_mul_886 // [!'@980.(Func '@980 '@980 '@980) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@979.(Func '@979 '@979 '@979) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@988.(Func '@988 '@988 '@988) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@985.(Func '@985 '@985 '@985) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@984.(Func '@984 '@984 '@984) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_886 // [!'@983.(Func '@983 '@983 '@983) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_886 // [!'@982.(Func '@982 '@982 '@982) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,2 // Float
              ) // Float
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@987.(Func '@987 '@987 '@987) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@986.(Func '@986 '@986 '@986) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@991.(Func '@991 '@991 '@991) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (r2 // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@990.(Func '@990 '@990 '@990) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@989.(Func '@989 '@989 '@989) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function torus_1822()
{
  return torus_1679 // [(Func Float Float Int Mesh) | !'@994.(Func '@994)]
  (2 // Int
    ,0.5 // Float
    ,32 // Int
  ) // Mesh
  ;
}
// (Func Mesh Int)
function vertexCount_1839(mesh)
{
  return count_1711 // (Func (Array Float3) Int)
  (vertexBuffer_2125 // (Func Mesh (Array Float3))
    (mesh // Mesh
    ) // (Array Float3)
  ) // Int
  ;
}
// (Func Mesh Int)
function faceCount_1860(mesh)
{
  return op_div_798 // [!'@868.(Func '@868 '@868 '@868) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func (Array Int) Int)
    (indexBuffer_2143 // (Func Mesh (Array Int))
      (mesh // Mesh
      ) // (Array Int)
    ) // Int
    ,3 // Int
  ) // Int
  ;
}
// (Func (Array Float) (Array Float3))
function toVectors_1936(xs)
{
  return map_53 // (Func (Array Int) (Func Int Float3) (Array Float3))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@276.(Func '@276 '@276 '@276) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Float) Int)
        (xs // (Array Float)
        ) // Int
        ,3 // Int
      ) // Int
    ) // (Array Int)
    ,(i) => vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
    (op_obr_cbr_2029 // (Func (Array Float) Int Float)
      (xs // (Array Float)
        ,op_mul_776 // [!'@277.(Func '@277 '@277 '@277) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,3 // Int
        ) // Int
      ) // Float
      ,op_obr_cbr_2029 // (Func (Array Float) Int Float)
      (xs // (Array Float)
        ,op_add_732 // [!'@279.(Func '@279 '@279 '@279) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@278.(Func '@278 '@278 '@278) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (i // Int
            ,3 // Int
          ) // Int
          ,1 // Int
        ) // Int
      ) // Float
      ,op_obr_cbr_2029 // (Func (Array Float) Int Float)
      (xs // (Array Float)
        ,op_add_732 // [!'@281.(Func '@281 '@281 '@281) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@280.(Func '@280 '@280 '@280) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (i // Int
            ,3 // Int
          ) // Int
          ,2 // Int
        ) // Int
      ) // Float
    ) // Float3
     // (Func Int Float3)
  ) // (Array Float3)
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertices_1969(m, points)
{
  return mesh_2107 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@758!'@759!'@760.(Func '@758 '@759 '@760) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
  (points // (Array Float3)
    ,indexBuffer_2143 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvBuffer_2161 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,colorBuffer_2179 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertexColors_2002(m, colors)
{
  return mesh_2107 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@479!'@480!'@481.(Func '@479 '@480 '@481) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
  (vertexBuffer_2125 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,indexBuffer_2143 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvBuffer_2161 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,colors // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertexUVs_2035(m, uvs)
{
  return mesh_2107 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@1522!'@1523!'@1524.(Func '@1522 '@1523 '@1524) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh)]
  (vertexBuffer_2125 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,indexBuffer_2143 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvs // (Array Float3)
    ,colorBuffer_2179 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Func Float3 Float3) Mesh)
function transform_2062(m, f)
{
  return setVertices_1969 // (Func Mesh (Array Float3) Mesh)
  (m // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (vertexBuffer_2125 // (Func Mesh (Array Float3))
      (m // Mesh
      ) // (Array Float3)
      ,f // (Func Float3 Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function translate_2091(m, amount)
{
  return transform_2062 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_add_1255 // [!'@773.(Func '@773 '@773 '@773) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function scale_2120(m, amount)
{
  return transform_2062 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_mul_1385 // [!'@766.(Func '@766 '@766 '@766) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function kleinPoint_2450(a, b)
{
  let u = op_mul_886 // [!'@1038.(Func '@1038 '@1038 '@1038) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1037.(Func '@1037 '@1037 '@1037) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,pi // Float
    ) // Float
    ,2 // Float
  ) // Float
  ;
  let v = op_mul_886 // [!'@1040.(Func '@1040 '@1040 '@1040) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1039.(Func '@1039 '@1039 '@1039) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (b // Float
      ,pi // Float
    ) // Float
    ,2 // Float
  ) // Float
  ;
  let x = 0 // Float
  ;
  let y = 0 // Float
  ;
  let z = 0 // Float
  ;
  if (op_lt_686 // (Func Float Float Bool)
    (u // Float
      ,pi // Float
    ) // Bool
  )
  {
    x = op_add_842 // [!'@1049.(Func '@1049 '@1049 '@1049) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1043.(Func '@1043 '@1043 '@1043) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1041.(Func '@1041 '@1041 '@1041) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (3 // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,op_add_842 // [!'@1042.(Func '@1042 '@1042 '@1042) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (1 // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1048.(Func '@1048 '@1048 '@1048) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1047.(Func '@1047 '@1047 '@1047) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1046.(Func '@1046 '@1046 '@1046) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (2 // Float
            ,op_sub_864 // [!'@1045.(Func '@1045 '@1045 '@1045) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (1 // Float
              ,op_div_908 // [!'@1044.(Func '@1044 '@1044 '@1044) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (cos_353 // (Func Float Float)
                (u // Float
                ) // Float
                ,2 // Float
              ) // Float
            ) // Float
          ) // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,cos_353 // (Func Float Float)
        (v // Float
        ) // Float
      ) // Float
    ) // Float
     // Float
    ;
    z = op_sub_864 // [!'@1056.(Func '@1056 '@1056 '@1056) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1050.(Func '@1050 '@1050 '@1050) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_negate_1659 // (Func Float Float)
        (8 // Float
        ) // Float
        ,sin_449 // (Func Float Float)
        (u // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1055.(Func '@1055 '@1055 '@1055) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1054.(Func '@1054 '@1054 '@1054) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1053.(Func '@1053 '@1053 '@1053) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (2 // Float
            ,op_sub_864 // [!'@1052.(Func '@1052 '@1052 '@1052) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (1 // Float
              ,op_div_908 // [!'@1051.(Func '@1051 '@1051 '@1051) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (cos_353 // (Func Float Float)
                (u // Float
                ) // Float
                ,2 // Float
              ) // Float
            ) // Float
          ) // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,cos_353 // (Func Float Float)
        (v // Float
        ) // Float
      ) // Float
    ) // Float
     // Float
    ;
  }
  else
  {
    x = op_add_842 // [!'@1065.(Func '@1065 '@1065 '@1065) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1059.(Func '@1059 '@1059 '@1059) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1057.(Func '@1057 '@1057 '@1057) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (3 // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,op_add_842 // [!'@1058.(Func '@1058 '@1058 '@1058) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (1 // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1064.(Func '@1064 '@1064 '@1064) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1062.(Func '@1062 '@1062 '@1062) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (2 // Float
          ,op_sub_864 // [!'@1061.(Func '@1061 '@1061 '@1061) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (1 // Float
            ,op_div_908 // [!'@1060.(Func '@1060 '@1060 '@1060) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (cos_353 // (Func Float Float)
              (u // Float
              ) // Float
              ,2 // Float
            ) // Float
          ) // Float
        ) // Float
        ,cos_353 // (Func Float Float)
        (op_add_842 // [!'@1063.(Func '@1063 '@1063 '@1063) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
     // Float
    ;
    z = op_mul_886 // [!'@1066.(Func '@1066 '@1066 '@1066) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (8 // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (u // Float
      ) // Float
    ) // Float
     // Float
    ;
  }
  y = op_mul_886 // [!'@1070.(Func '@1070 '@1070 '@1070) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1069.(Func '@1069 '@1069 '@1069) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (2 // Float
      ) // Float
      ,op_sub_864 // [!'@1068.(Func '@1068 '@1068 '@1068) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,op_div_908 // [!'@1067.(Func '@1067 '@1067 '@1067) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (cos_353 // (Func Float Float)
          (u // Float
          ) // Float
          ,2 // Float
        ) // Float
      ) // Float
    ) // Float
    ,sin_449 // (Func Float Float)
    (v // Float
    ) // Float
  ) // Float
   // Float
  ;
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_div_908 // [!'@1071.(Func '@1071 '@1071 '@1071) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x // Float
      ,4 // Float
    ) // Float
    ,op_div_908 // [!'@1072.(Func '@1072 '@1072 '@1072) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y // Float
      ,4 // Float
    ) // Float
    ,op_div_908 // [!'@1073.(Func '@1073 '@1073 '@1073) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z // Float
      ,4 // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function klein_2464()
{
  return meshFromUV_1431 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (kleinPoint_2450 // (Func Float Float Float3)
    ,32 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function planeXYPoint_2485(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (u // Float
    ,v // Float
    ,0 // Int
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeXZPoint_2506(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (u // Float
    ,0 // Int
    ,v // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeYZPoint_2527(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (0 // Int
    ,u // Float
    ,v // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeYXPoint_2548(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (v // Float
    ,u // Float
    ,0 // Int
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeZXPoint_2569(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (v // Float
    ,0 // Int
    ,u // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeZYPoint_2590(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (0 // Int
    ,v // Float
    ,u // Float
  ) // Float3
  ;
}
// (Func Mesh)
function plane_2604()
{
  return meshFromUV_1431 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (planeXYPoint_2485 // (Func Float Float Float3)
    ,16 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function mobiusPoint_2720(a, b)
{
  let u = op_sub_864 // [!'@1095.(Func '@1095 '@1095 '@1095) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (a // Float
    ,0.5 // Float
  ) // Float
  ;
  let v = op_mul_886 // [!'@1097.(Func '@1097 '@1097 '@1097) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1096.(Func '@1096 '@1096 '@1096) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (b // Float
      ,2 // Float
    ) // Float
    ,pi // Float
  ) // Float
  ;
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@1101.(Func '@1101 '@1101 '@1101) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (cos_353 // (Func Float Float)
      (v // Float
      ) // Float
      ,op_add_518 // [!'@1100.(Func '@1100 '@1100 '@1100) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (2 // Int
        ,op_mul_886 // [!'@1099.(Func '@1099 '@1099 '@1099) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,cos_353 // (Func Float Float)
          (op_div_590 // [!'@1098.(Func '@1098 '@1098 '@1098) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (v // Float
              ,2 // Int
            ) // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1105.(Func '@1105 '@1105 '@1105) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (v // Float
      ) // Float
      ,op_add_518 // [!'@1104.(Func '@1104 '@1104 '@1104) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (2 // Int
        ,op_mul_886 // [!'@1103.(Func '@1103 '@1103 '@1103) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,cos_353 // (Func Float Float)
          (op_div_590 // [!'@1102.(Func '@1102 '@1102 '@1102) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (v // Float
              ,2 // Int
            ) // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1107.(Func '@1107 '@1107 '@1107) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (u // Float
      ,sin_449 // (Func Float Float)
      (op_div_590 // [!'@1106.(Func '@1106 '@1106 '@1106) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Int
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function mobius_2734()
{
  return meshFromUV_1431 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (mobiusPoint_2720 // (Func Float Float Float3)
    ,20 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// Module heron:tests:0.1
// file input\test.heron
// imports heron:std.array:0.1
// imports heron:geometry.mesh:0.1
// imports heron:geometry.vector:0.1
// Float3
const red = vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
(1 // Int
  ,0 // Int
  ,0 // Int
) // Float3
;
// Float3
const green = vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
(0 // Int
  ,1 // Int
  ,0 // Int
) // Float3
;
// Float3
const blue = vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
(0 // Int
  ,0 // Int
  ,1 // Int
) // Float3
;
// (Func (Array (Func Float Float Float Float Mesh)))
function main_39()
{
  simpleArrayTest_439 // !'@1345.(Func '@1345)
  () // '@1345
  ;
  return geometryTest_665 // (Func (Array (Func Float Float Float Float Mesh)))
  () // (Array (Func Float Float Float Float Mesh))
  ;
}
// (Func T0)
function simpleArrayTest_439()
{
  let xs = [1 // Int
  ,11 // Int
  ,3 // Int
  ] // (Array Int)
  ;
  print_2050 // !'@1163.(Func Str '@1163)
  ("'Expect [1, 11, 3]'" // Str
  ) // '@1163
  ;
  print_2050 // !'@1165.(Func (Array Int) '@1165)
  (xs // (Array Int)
  ) // '@1165
  ;
  print_2050 // !'@1167.(Func Str '@1167)
  ("'Expect 1, 11, 3'" // Str
  ) // '@1167
  ;
  for (let i7=0; i7 < xs // (Array Int)
  .length; ++i7)
  {
    const x = xs // (Array Int)
    [i7];
    {
      print_2050 // !'@1170.(Func Int '@1170)
      (x // Int
      ) // '@1170
      ;
    }
  }
  print_2050 // !'@1172.(Func Str '@1172)
  ("'Expect 1'" // Str
  ) // '@1172
  ;
  print_2050 // !'@1174.(Func Int '@1174)
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (xs // (Array Int)
      ,0 // Int
    ) // Int
  ) // '@1174
  ;
  print_2050 // !'@1177.(Func Str '@1177)
  ("'Expect 3'" // Str
  ) // '@1177
  ;
  print_2050 // !'@1179.(Func Int '@1179)
  (count_1711 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1179
  ;
  print_2050 // !'@1182.(Func Str '@1182)
  ("'Expect 1'" // Str
  ) // '@1182
  ;
  print_2050 // !'@1184.(Func Int '@1184)
  (first_1866 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1184
  ;
  print_2050 // !'@1187.(Func Str '@1187)
  ("'Expect 3'" // Str
  ) // '@1187
  ;
  print_2050 // !'@1189.(Func Int '@1189)
  (last_1851 // [!'@1339.(Func (Array '@1339) Int (Array '@1339)) | !'@1340.(Func !'@1340.(Array '@1340) '@1340)]
    (xs // (Array Int)
    ) // Int
  ) // '@1189
  ;
  print_2050 // !'@1193.(Func Str '@1193)
  ("'Expect 1'" // Str
  ) // '@1193
  ;
  print_2050 // !'@1195.(Func Int '@1195)
  (min_1395 // [!'@1341.(Func '@1341 '@1341 '@1341) | !'@1342.(Func !'@1342.(Array '@1342) '@1342)]
    (xs // (Array Int)
    ) // Int
  ) // '@1195
  ;
  print_2050 // !'@1218.(Func Str '@1218)
  ("'Expect 11'" // Str
  ) // '@1218
  ;
  print_2050 // !'@1220.(Func Int '@1220)
  (max_1417 // [!'@1343.(Func '@1343 '@1343 '@1343) | !'@1344.(Func !'@1344.(Array '@1344) '@1344)]
    (xs // (Array Int)
    ) // Int
  ) // '@1220
  ;
  let ys = mutable_1785 // (Func (Array Int) (ArrayBuilder Int))
  (xs // (Array Int)
  ) // (ArrayBuilder Int)
  ;
  ys = set_1881 // (Func (ArrayBuilder Int) Int Int (ArrayBuilder Int))
  (ys // (ArrayBuilder Int)
    ,1 // Int
    ,5 // Int
  ) // (ArrayBuilder Int)
   // (ArrayBuilder Int)
  ;
  print_2050 // !'@1241.(Func Str '@1241)
  ("'Expect 5'" // Str
  ) // '@1241
  ;
  print_2050 // !'@1243.(Func Int '@1243)
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (ys // (ArrayBuilder Int)
      ,1 // Int
    ) // Int
  ) // '@1243
  ;
  print_2050 // !'@1246.(Func Str '@1246)
  ("'Expect 1, 3, 11'" // Str
  ) // '@1246
  ;
  let zs = sort_1697 // (Func (Array Int) (Array Int))
  (xs // (Array Int)
  ) // (Array Int)
  ;
  for (let i8=0; i8 < zs // (Array Int)
  .length; ++i8)
  {
    const z = zs // (Array Int)
    [i8];
    {
      print_2050 // !'@1297.(Func Int '@1297)
      (z // Int
      ) // '@1297
      ;
    }
  }
  print_2050 // !'@1299.(Func Str '@1299)
  ("'Expect 3'" // Str
  ) // '@1299
  ;
  print_2050 // !'@1301.(Func Int '@1301)
  (median_1797 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1301
  ;
  print_2050 // !'@1332.(Func Str '@1332)
  ("'Expect 15'" // Str
  ) // '@1332
  ;
  print_2050 // !'@1334.(Func Float '@1334)
  (sum_1330 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1334
  ;
  print_2050 // !'@1336.(Func Str '@1336)
  ("'Expect 5'" // Str
  ) // '@1336
  ;
  print_2050 // !'@1338.(Func Float '@1338)
  (average_1373 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1338
  ;
}
// (Func Mesh Mesh)
function colorGeometry_559(g)
{
  return setVertexColors_2002 // (Func Mesh (Array Float3) Mesh)
  (g // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (uvBuffer_2161 // (Func Mesh (Array Float3))
      (g // Mesh
      ) // (Array Float3)
      ,(v) => vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
      (op_add_842 // [!'@497.(Func '@497 '@497 '@497) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@496.(Func '@496 '@496 '@496) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (sin_449 // (Func Float Float)
            (op_mul_886 // [!'@495.(Func '@495 '@495 '@495) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_mul_886 // [!'@494.(Func '@494 '@494 '@494) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (x_134 // (Func Float3 Float)
                  (v // Float3
                  ) // Float
                  ,pi // Float
                ) // Float
                ,4 // Float
              ) // Float
            ) // Float
            ,2 // Float
          ) // Float
          ,0.5 // Float
        ) // Float
        ,0 // Int
        ,op_add_842 // [!'@501.(Func '@501 '@501 '@501) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@500.(Func '@500 '@500 '@500) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (cos_353 // (Func Float Float)
            (op_mul_886 // [!'@499.(Func '@499 '@499 '@499) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_mul_886 // [!'@498.(Func '@498 '@498 '@498) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (y_149 // (Func Float3 Float)
                  (v // Float3
                  ) // Float
                  ,pi // Float
                ) // Float
                ,4 // Float
              ) // Float
            ) // Float
            ,2 // Float
          ) // Float
          ,0.5 // Float
        ) // Float
      ) // Float3
       // (Func Float3 Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Func Float Float Float Float Mesh))
function demoGeometry_610(g)
{
  return (offX, offY, offZ, scl) => colorGeometry_559 // (Func Mesh Mesh)
  (scale_2120 // (Func Mesh Float3 Mesh)
    (translate_2091 // (Func Mesh Float3 Mesh)
      (g // Mesh
        ,vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
        (offX // Float
          ,offY // Float
          ,offZ // Float
        ) // Float3
      ) // Mesh
      ,vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
      (scl // Float
        ,scl // Float
        ,scl // Float
      ) // Float3
    ) // Mesh
  ) // Mesh
   // (Func Float Float Float Float Mesh)
  ;
}
// (Func (Array (Func Float Float Float Float Mesh)))
function geometryTest_665()
{
  return [demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
  (sphere_1559 // [(Func Int Mesh) | (Func Mesh)]
    () // Mesh
  ) // (Func Float Float Float Float Mesh)
  ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
  (cylinder_1639 // [(Func Int Mesh) | (Func Mesh)]
    () // Mesh
  ) // (Func Float Float Float Float Mesh)
  ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
  (torus_1822 // [(Func Float Float Int Mesh) | (Func Mesh)]
    () // Mesh
  ) // (Func Float Float Float Float Mesh)
  ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
  (klein_2464 // (Func Mesh)
    () // Mesh
  ) // (Func Float Float Float Float Mesh)
  ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
  (plane_2604 // (Func Mesh)
    () // Mesh
  ) // (Func Float Float Float Float Mesh)
  ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
  (mobius_2734 // (Func Mesh)
    () // Mesh
  ) // (Func Float Float Float Float Mesh)
  ] // (Array (Func Float Float Float Float Mesh))
  ;
}

return main_39;
})();
