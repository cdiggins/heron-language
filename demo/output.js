// Generated using Heron on Mon May 07 2018 21:40:53 GMT-0400 (Eastern Daylight Time)
var heron = (function () {
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
function mesh(vertexBuffer, indexBuffer, uvBuffer, colorBuffer, normalBuffer) { return ({ vertexBuffer, indexBuffer, uvBuffer, colorBuffer, normalBuffer }); };
function vertexBuffer(mesh) { return mesh.vertexBuffer; };
function indexBuffer(mesh) { return mesh.indexBuffer; };
function colorBuffer(mesh) { return mesh.colorBuffer; };
function uvBuffer(mesh) { return mesh.uvBuffer; };
function normalBuffer(mesh) { return mesh.normalBuffer; }
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
  (op_add_842 // [!'@210.(Func '@210 '@210 '@210) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_add_842 // [!'@211.(Func '@211 '@211 '@211) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@272.(Func '@272 '@272 '@272) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@273.(Func '@273 '@273 '@273) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mul_886 // [!'@240.(Func '@240 '@240 '@240) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@241.(Func '@241 '@241 '@241) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_div_908 // [!'@162.(Func '@162 '@162 '@162) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_div_908 // [!'@163.(Func '@163 '@163 '@163) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@855.(Func '@855 '@855 '@855) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@856.(Func '@856 '@856 '@856) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_add_842 // [!'@206.(Func '@206 '@206 '@206) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842 // [!'@207.(Func '@207 '@207 '@207) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842 // [!'@208.(Func '@208 '@208 '@208) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@268.(Func '@268 '@268 '@268) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@269.(Func '@269 '@269 '@269) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@270.(Func '@270 '@270 '@270) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mul_886 // [!'@236.(Func '@236 '@236 '@236) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@237.(Func '@237 '@237 '@237) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@238.(Func '@238 '@238 '@238) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_div_908 // [!'@158.(Func '@158 '@158 '@158) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908 // [!'@159.(Func '@159 '@159 '@159) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908 // [!'@160.(Func '@160 '@160 '@160) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@851.(Func '@851 '@851 '@851) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@852.(Func '@852 '@852 '@852) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@853.(Func '@853 '@853 '@853) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return float3_119 // [(Func Float Float Float Float3) | !'@118!'@119.(Func '@118 '@119)]
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
  return immutable_1904 // !'@1710.(Func (ArrayBuilder '@1710) (Array '@1710))
  (mutable_1785 // !'@1710.(Func (Array '@1710) (ArrayBuilder '@1710))
    (xs // !'@1710.(Array '@1710)
    ) // !'@1710.(ArrayBuilder '@1710)
  ) // !'@1710.(Array '@1710)
  ;
}
// (Func (Array T0) Int T0)
function op_obr_cbr_2029(xs, i)
{
  return at_1737 // !'@83.(Func !'@83.(Array '@83) Int '@83)
  (xs // !'@83.(Array '@83)
    ,i // Int
  ) // '@83
  ;
}
// (Func T0 T1)
const print_2050 = print;
// (Func Bool T0)
const assert_2062 = assert;
// (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh)
const mesh_2116 = mesh;
// (Func Mesh (Array Float3))
const vertexBuffer_2134 = vertexBuffer;
// (Func Mesh (Array Int))
const indexBuffer_2152 = indexBuffer;
// (Func Mesh (Array Float3))
const uvBuffer_2170 = uvBuffer;
// (Func Mesh (Array Float3))
const colorBuffer_2188 = colorBuffer;
// (Func Mesh (Array Float3))
const normalBuffer_2206 = normalBuffer;
// Module heron:geometry.vector:0.1
// file input\geometry-vector3.heron
// Float3
const origin = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3)]
(0 // Int
  ,0 // Int
  ,0 // Int
) // Float3
;
// Float3
const ones = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3)]
(1 // Int
  ,1 // Int
  ,1 // Int
) // Float3
;
// Float3
const xaxis = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3)]
(1 // Int
  ,0 // Int
  ,0 // Int
) // Float3
;
// Float3
const yaxis = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3)]
(0 // Int
  ,1 // Int
  ,0 // Int
) // Float3
;
// Float3
const zaxis = vector_98 // [(Func Float Float Float Float3) | (Func Float Float3)]
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
  return vector_98 // [(Func Float Float Float Float3) | !'@123.(Func Float '@123)]
  (x // Float
    ,x // Float
    ,x // Float
  ) // Float3
  ;
}
// (Func Float3 (Array Float))
function array_145(v)
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
function sumComponents_175(v)
{
  return op_add_842 // [!'@214.(Func '@214 '@214 '@214) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_842 // [!'@213.(Func '@213 '@213 '@213) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function dot_198(a, b)
{
  return sumComponents_175 // (Func Float3 Float)
  (op_mul_1385 // [!'@242.(Func '@242 '@242 '@242) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float)
function length_216(v)
{
  return sqrt_479 // (Func Float Float)
  (length2_232 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ) // Float
  ;
}
// (Func Float3 Float)
function length2_232(v)
{
  return dot_198 // (Func Float3 Float3 Float)
  (v // Float3
    ,v // Float3
  ) // Float
  ;
}
// (Func Float3 Float3 Float)
function distance_255(a, b)
{
  return length_216 // (Func Float3 Float)
  (op_sub_1320 // [!'@960.(Func '@960 '@960 '@960) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float3 Float)
function distance2_278(a, b)
{
  return length2_232 // (Func Float3 Float)
  (op_sub_1320 // [!'@965.(Func '@965 '@965 '@965) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float3)
function normal_300(v)
{
  return op_div_1450 // [!'@243.(Func '@243 '@243 '@243) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,vector_120 // [(Func Float Float Float Float3) | (Func Float Float3)]
    (length_216 // (Func Float3 Float)
      (v // Float3
      ) // Float
    ) // Float3
  ) // Float3
  ;
}
// (Func Float3 Float3 Float3)
function cross_403(a, b)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3)]
  (op_sub_864 // [!'@284.(Func '@284 '@284 '@284) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@282.(Func '@282 '@282 '@282) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (y_149 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@283.(Func '@283 '@283 '@283) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@287.(Func '@287 '@287 '@287) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@285.(Func '@285 '@285 '@285) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,x_134 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@286.(Func '@286 '@286 '@286) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@290.(Func '@290 '@290 '@290) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@288.(Func '@288 '@288 '@288) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@289.(Func '@289 '@289 '@289) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function reflect_438(v, n)
{
  return op_sub_542 // [!'@1709.(Func '@1709 '@1709 '@1709) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,op_mul_886 // [!'@1708.(Func '@1708 '@1708 '@1708) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_566 // [!'@1707.(Func '@1707 '@1707 '@1707) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (n // Float3
        ,dot_198 // (Func Float3 Float3 Float)
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
function lerp_475(a, b, x)
{
  return op_add_842 // [!'@1193.(Func '@1193 '@1193 '@1193) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1191.(Func '@1191 '@1191 '@1191) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,op_sub_864 // [!'@1190.(Func '@1190 '@1190 '@1190) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,x // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1192.(Func '@1192 '@1192 '@1192) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (b // Float
      ,x // Float
    ) // Float
  ) // Float
  ;
}
// (Func Float3 Float3)
function negate_512(v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3)]
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
  return [x // '@1867
  ] // !'@1867.(Array '@1867)
  ;
}
// (Func (Array T0) (Func T0 T1) (Array T1))
function map_53(xs, f)
{
  return array_1691 // [!'@94.(Func Int (Func Int '@94) (Array '@94)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@80.(Array '@80) Int)
    (xs // !'@80.(Array '@80)
    ) // Int
    ,(i) => f // !'@80!'@93.(Func '@80 '@93)
    (op_obr_cbr_2029 // !'@80.(Func !'@80.(Array '@80) Int '@80)
      (xs // !'@80.(Array '@80)
        ,i // Int
      ) // '@80
    ) // '@93
     // !'@93.(Func Int '@93)
  ) // !'@93.(Array '@93)
  ;
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_1691 // [!'@383.(Func Int (Func Int '@383) (Array '@383)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@378.(Array '@378) Int)
    (xs // !'@378.(Array '@378)
    ) // Int
    ,(i) => f // !'@378!'@382.(Func '@378 Int '@382)
    (op_obr_cbr_2029 // !'@378.(Func !'@378.(Array '@378) Int '@378)
      (xs // !'@378.(Array '@378)
        ,i // Int
      ) // '@378
      ,i // Int
    ) // '@382
     // !'@382.(Func Int '@382)
  ) // !'@382.(Array '@382)
  ;
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_1691 // [!'@1438.(Func Int (Func Int '@1438) (Array '@1438)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1437.(Array '@1437) Int)
    (xs // !'@1437.(Array '@1437)
    ) // Int
    ,f // !'@1436.(Func Int '@1436)
  ) // !'@1436.(Array '@1436)
  ;
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_710 // !'@1243.(Func '@1243 '@1243 Bool)
  (x // '@1243
    ,y // '@1243
  ) // Bool
   ? x // '@1243
   : y // '@1243
   // '@1243
  ;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_662 // !'@1264.(Func '@1264 '@1264 Bool)
  (x // '@1264
    ,y // '@1264
  ) // Bool
   ? x // '@1264
   : y // '@1264
   // '@1264
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1776.(Array '@1776) Int)
    (xs // !'@1776.(Array '@1776)
    ) // Int
    ,count_1711 // (Func !'@1776.(Array '@1776) Int)
    (ys // !'@1776.(Array '@1776)
    ) // Int
  ) // Bool
   ? xs // !'@1776.(Array '@1776)
   : ys // !'@1776.(Array '@1776)
   // !'@1776.(Array '@1776)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_662 // (Func Int Int Bool)
  (count_1711 // (Func !'@1200.(Array '@1200) Int)
    (xs // !'@1200.(Array '@1200)
    ) // Int
    ,count_1711 // (Func !'@1200.(Array '@1200) Int)
    (ys // !'@1200.(Array '@1200)
    ) // Int
  ) // Bool
   ? xs // !'@1200.(Array '@1200)
   : ys // !'@1200.(Array '@1200)
   // !'@1200.(Array '@1200)
  ;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@1019.(Array '@1019) Int)
    (xs // !'@1019.(Array '@1019)
    ) // Int
    ,0 // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53 // !'@1751.(Func (Array Int) (Func Int '@1751) (Array '@1751))
  (indices // (Array Int)
    ,(i) => at_1737 // !'@1751.(Func !'@1751.(Array '@1751) Int '@1751)
    (xs // !'@1751.(Array '@1751)
      ,i // Int
    ) // '@1751
     // !'@1751.(Func Int '@1751)
  ) // !'@1751.(Array '@1751)
  ;
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_1762 // (Func Int Int (Array Int))
  (0 // Int
    ,count_1711 // (Func !'@488.(Array '@488) Int)
    (xs // !'@488.(Array '@488)
    ) // Int
  ) // (Array Int)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function zip_372(xs, ys, f)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@393.(Array '@393) Int)
    (xs // !'@393.(Array '@393)
    ) // Int
    ,count_1711 // (Func !'@386.(Array '@386) Int)
    (ys // !'@386.(Array '@386)
    ) // Int
  ) // Bool
   ? mapWithIndex_92 // !'@393!'@390.(Func (Array '@393) (Func '@393 Int '@390) (Array '@390))
  (xs // !'@393.(Array '@393)
    ,(x, i) => f // !'@393!'@386!'@390.(Func '@393 '@386 '@390)
    (x // '@393
      ,op_obr_cbr_2029 // !'@386.(Func !'@386.(Array '@386) Int '@386)
      (ys // !'@386.(Array '@386)
        ,i // Int
      ) // '@386
    ) // '@390
     // !'@393!'@390.(Func '@393 Int '@390)
  ) // !'@390.(Array '@390)
   : mapWithIndex_92 // !'@386!'@390.(Func (Array '@386) (Func '@386 Int '@390) (Array '@390))
  (ys // !'@386.(Array '@386)
    ,(y, i) => f // !'@393!'@386!'@390.(Func '@393 '@386 '@390)
    (op_obr_cbr_2029 // !'@393.(Func !'@393.(Array '@393) Int '@393)
      (xs // !'@393.(Array '@393)
        ,i // Int
      ) // '@393
      ,y // '@386
    ) // '@390
     // !'@386!'@390.(Func '@386 Int '@390)
  ) // !'@390.(Array '@390)
   // !'@390.(Array '@390)
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1918 // !'@593.(Func (Array '@593) Bool (Func Bool '@593 Bool) Bool)
  (xs // !'@593.(Array '@593)
    ,true // Bool
    ,(prev, x) => op_amp_amp_1585 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@593.(Func '@593 Bool)
      (x // '@593
      ) // Bool
    ) // Bool
     // !'@593.(Func Bool '@593 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1918 // !'@606.(Func (Array '@606) Bool (Func Bool '@606 Bool) Bool)
  (xs // !'@606.(Array '@606)
    ,false // Bool
    ,(prev, x) => op_bar_bar_1607 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@606.(Func '@606 Bool)
      (x // '@606
      ) // Bool
    ) // Bool
     // !'@606.(Func Bool '@606 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Array T1) Bool)
function eq_469(xs, ys)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@1025.(Array '@1025) Int)
    (xs // !'@1025.(Array '@1025)
    ) // Int
    ,count_1711 // (Func !'@1026.(Array '@1026) Int)
    (ys // !'@1026.(Array '@1026)
    ) // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_537(xs, p)
{
  let ys = mutable_1785 // !'@1040.(Func (Array '@1040) (ArrayBuilder '@1040))
  (xs // !'@1040.(Array '@1040)
  ) // !'@1040.(ArrayBuilder '@1040)
  ;
  let i = 0 // Int
  ;
  for (let i0=0; i0 < xs // !'@1040.(Array '@1040)
  .length; ++i0)
  {
    const x = xs // !'@1040.(Array '@1040)
    [i0];
    {
      if (p // !'@1040.(Func '@1040 Bool)
        (x // '@1040
        ) // Bool
      )
      {
        ys = set_1881 // !'@1040.(Func (ArrayBuilder '@1040) Int '@1040 (ArrayBuilder '@1040))
        (ys // !'@1040.(ArrayBuilder '@1040)
          ,i++ // Int
          ,x // '@1040
        ) // !'@1040.(ArrayBuilder '@1040)
         // !'@1040.(ArrayBuilder '@1040)
        ;
      }
      else
      { }
    }
  }
  return take_967 // [!'@1047.(Func (Array '@1047) Int (Array '@1047)) | !'@1048.(Func (Array '@1048) Int Int (Array '@1048))]
  (immutable_1904 // !'@1040.(Func (ArrayBuilder '@1040) (Array '@1040))
    (ys // !'@1040.(ArrayBuilder '@1040)
    ) // !'@1040.(Array '@1040)
    ,i // Int
  ) // !'@1040.(Array '@1040)
  ;
}
// (Func T0 Int (Array T0))
function repeat_566(x, n)
{
  return map_53 // !'@57.(Func (Array Int) (Func Int '@57) (Array '@57))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => x // '@57
     // !'@57.(Func Int '@57)
  ) // !'@57.(Array '@57)
  ;
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_662(xs, op)
{
  if (empty_245 // (Func !'@1594.(Array '@1594) Bool)
    (xs // !'@1594.(Array '@1594)
    ) // Bool
  )
  {
    return xs // !'@1594.(Array '@1594)
    ;
  }
  else
  { }
  let ys = mutable_1785 // !'@1594.(Func (Array '@1594) (ArrayBuilder '@1594))
  (repeat_566 // !'@1594.(Func '@1594 Int (Array '@1594))
    (op_obr_cbr_2029 // !'@1594.(Func !'@1594.(Array '@1594) Int '@1594)
      (xs // !'@1594.(Array '@1594)
        ,0 // Int
      ) // '@1594
      ,count_1711 // (Func !'@1594.(Array '@1594) Int)
      (xs // !'@1594.(Array '@1594)
      ) // Int
    ) // !'@1594.(Array '@1594)
  ) // !'@1594.(ArrayBuilder '@1594)
  ;
  for (let i1=0; i1 < op_dot_dot_1762 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1594.(Array '@1594) Int)
      (ys // !'@1594.(ArrayBuilder '@1594)
      ) // Int
    ) // (Array Int)
  .length; ++i1)
  {
    const i = op_dot_dot_1762 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1594.(Array '@1594) Int)
      (ys // !'@1594.(ArrayBuilder '@1594)
      ) // Int
    ) // (Array Int)
    [i1];
    {
      ys = set_1881 // !'@1594.(Func (ArrayBuilder '@1594) Int '@1594 (ArrayBuilder '@1594))
      (ys // !'@1594.(ArrayBuilder '@1594)
        ,i // Int
        ,op // !'@1594.(Func '@1594 '@1594 '@1594)
        (op_obr_cbr_2029 // !'@1594.(Func !'@1594.(Array '@1594) Int '@1594)
          (xs // !'@1594.(Array '@1594)
            ,i // Int
          ) // '@1594
          ,op_obr_cbr_2029 // !'@1594.(Func !'@1594.(Array '@1594) Int '@1594)
          (ys // !'@1594.(ArrayBuilder '@1594)
            ,op_sub_754 // [!'@1596.(Func '@1596 '@1596 '@1596) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (i // Int
              ,1 // Int
            ) // Int
          ) // '@1594
        ) // '@1594
      ) // !'@1594.(ArrayBuilder '@1594)
       // !'@1594.(ArrayBuilder '@1594)
      ;
    }
  }
  return immutable_1904 // !'@1594.(Func (ArrayBuilder '@1594) (Array '@1594))
  (ys // !'@1594.(ArrayBuilder '@1594)
  ) // !'@1594.(Array '@1594)
  ;
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_720(xs)
{
  return map_53 // !'@565.(Func (Array Int) (Func Int '@565) (Array '@565))
  (indices_292 // (Func !'@565.(Array '@565) (Array Int))
    (xs // !'@565.(Array '@565)
    ) // (Array Int)
    ,(i) => op_gt_638 // (Func Int Int Bool)
    (i // Int
      ,0 // Int
    ) // Bool
     ? op_sub_542 // [!'@579.(Func '@579 '@579 '@579) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2029 // !'@565.(Func !'@565.(Array '@565) Int '@565)
      (xs // !'@565.(Array '@565)
        ,i // Int
      ) // '@565
      ,op_obr_cbr_2029 // !'@565.(Func !'@565.(Array '@565) Int '@565)
      (xs // !'@565.(Array '@565)
        ,op_sub_754 // [!'@578.(Func '@578 '@578 '@578) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
      ) // '@565
    ) // '@565
     : op_obr_cbr_2029 // !'@565.(Func !'@565.(Array '@565) Int '@565)
    (xs // !'@565.(Array '@565)
      ,i // Int
    ) // '@565
     // '@565
     // !'@565.(Func Int '@565)
  ) // !'@565.(Array '@565)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function slice_758(xs, from, to)
{
  return map_53 // !'@980.(Func (Array Int) (Func Int '@980) (Array '@980))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (from // Int
      ,to // Int
    ) // (Array Int)
    ,(i) => at_1737 // !'@980.(Func !'@980.(Array '@980) Int '@980)
    (xs // !'@980.(Array '@980)
      ,i // Int
    ) // '@980
     // !'@980.(Func Int '@980)
  ) // !'@980.(Array '@980)
  ;
}
// (Func (Array T0) Int (Array T0))
function stride_805(xs, n)
{
  return map_53 // !'@1819.(Func (Array Int) (Func Int '@1819) (Array '@1819))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1824.(Func '@1824 '@1824 '@1824) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1819.(Array '@1819) Int)
        (xs // !'@1819.(Array '@1819)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1819.(Func !'@1819.(Array '@1819) Int '@1819)
    (xs // !'@1819.(Array '@1819)
      ,op_mul_776 // [!'@1825.(Func '@1825 '@1825 '@1825) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@1819
     // !'@1819.(Func Int '@1819)
  ) // !'@1819.(Array '@1819)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function stride_860(xs, from, n)
{
  return map_53 // !'@1834.(Func (Array Int) (Func Int '@1834) (Array '@1834))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1840.(Func '@1840 '@1840 '@1840) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1834.(Array '@1834) Int)
        (xs // !'@1834.(Array '@1834)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1834.(Func !'@1834.(Array '@1834) Int '@1834)
    (xs // !'@1834.(Array '@1834)
      ,op_add_732 // [!'@1842.(Func '@1842 '@1842 '@1842) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (from // Int
        ,op_mul_776 // [!'@1841.(Func '@1841 '@1841 '@1841) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,n // Int
        ) // Int
      ) // Int
    ) // '@1834
     // !'@1834.(Func Int '@1834)
  ) // !'@1834.(Array '@1834)
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_896(xs, n)
{
  return map_53 // !'@1852.(Func (Array Int) (Func Int (Array '@1852)) (Array (Array '@1852)))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => stride_860 // [!'@1853.(Func (Array '@1853) Int (Array '@1853)) | !'@1854.(Func (Array '@1854) Int Int (Array '@1854))]
    (xs // !'@1852.(Array '@1852)
      ,i // Int
      ,n // Int
    ) // !'@1852.(Array '@1852)
     // !'@1852.(Func Int (Array '@1852))
  ) // (Array !'@1852.(Array '@1852))
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_947(xs, n)
{
  return map_53 // !'@1792.(Func (Array Int) (Func Int (Array '@1792)) (Array (Array '@1792)))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => slice_758 // !'@1792.(Func (Array '@1792) Int Int (Array '@1792))
    (xs // !'@1792.(Array '@1792)
      ,op_mul_776 // [!'@1796.(Func '@1796 '@1796 '@1796) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
      ,op_mul_776 // [!'@1798.(Func '@1798 '@1798 '@1798) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_add_732 // [!'@1797.(Func '@1797 '@1797 '@1797) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
        ,n // Int
      ) // Int
    ) // !'@1792.(Array '@1792)
     // !'@1792.(Func Int (Array '@1792))
  ) // (Array !'@1792.(Array '@1792))
  ;
}
// (Func (Array T0) Int (Array T0))
function take_967(xs, n)
{
  return slice_758 // !'@981.(Func (Array '@981) Int Int (Array '@981))
  (xs // !'@981.(Array '@981)
    ,0 // Int
    ,n // Int
  ) // !'@981.(Array '@981)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function take_994(xs, i, n)
{
  return take_967 // [!'@1000.(Func (Array '@1000) Int (Array '@1000)) | !'@1001!'@1002!'@1003!'@1004.(Func '@1001 '@1002 '@1003 '@1004)]
  (skip_1023 // !'@999.(Func (Array '@999) Int (Array '@999))
    (xs // !'@999.(Array '@999)
      ,i // Int
    ) // !'@999.(Array '@999)
    ,n // Int
  ) // !'@999.(Array '@999)
  ;
}
// (Func (Array T0) Int (Array T0))
function skip_1023(xs, n)
{
  return slice_758 // !'@997.(Func (Array '@997) Int Int (Array '@997))
  (xs // !'@997.(Array '@997)
    ,n // Int
    ,op_sub_754 // [!'@998.(Func '@998 '@998 '@998) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@997.(Array '@997) Int)
      (xs // !'@997.(Array '@997)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@997.(Array '@997)
  ;
}
// (Func (Array T0) Int (Array T0))
function drop_1050(xs, n)
{
  return take_967 // [!'@1009.(Func (Array '@1009) Int (Array '@1009)) | !'@1010.(Func (Array '@1010) Int Int (Array '@1010))]
  (xs // !'@1007.(Array '@1007)
    ,op_sub_754 // [!'@1008.(Func '@1008 '@1008 '@1008) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1007.(Array '@1007) Int)
      (xs // !'@1007.(Array '@1007)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@1007.(Array '@1007)
  ;
}
// (Func (Array T0) Int (Array T0))
function last_1077(xs, n)
{
  return skip_1023 // !'@1172.(Func (Array '@1172) Int (Array '@1172))
  (xs // !'@1172.(Array '@1172)
    ,op_sub_754 // [!'@1173.(Func '@1173 '@1173 '@1173) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1172.(Array '@1172) Int)
      (xs // !'@1172.(Array '@1172)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@1172.(Array '@1172)
  ;
}
// (Func (Array T0) T1 (Array T0))
function reverse_1121(xs, n)
{
  return map_53 // !'@1731.(Func (Array Int) (Func Int '@1731) (Array '@1731))
  (indices_292 // (Func !'@1731.(Array '@1731) (Array Int))
    (xs // !'@1731.(Array '@1731)
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1731.(Func !'@1731.(Array '@1731) Int '@1731)
    (xs // !'@1731.(Array '@1731)
      ,op_sub_754 // [!'@1739.(Func '@1739 '@1739 '@1739) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1738.(Func '@1738 '@1738 '@1738) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func !'@1731.(Array '@1731) Int)
          (xs // !'@1731.(Array '@1731)
          ) // Int
          ,1 // Int
        ) // Int
        ,i // Int
      ) // Int
    ) // '@1731
     // !'@1731.(Func Int '@1731)
  ) // !'@1731.(Array '@1731)
  ;
}
// (Func Int (Func Int T0) (Array T0))
function gen_1145(cnt, f)
{
  return map_53 // !'@729.(Func (Array Int) (Func Int '@729) (Array '@729))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,cnt // Int
    ) // (Array Int)
    ,f // !'@729.(Func Int '@729)
  ) // !'@729.(Array '@729)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1213(xs, ys)
{
  return gen_1145 // !'@732.(Func Int (Func Int '@732) (Array '@732))
  (op_add_732 // [!'@746.(Func '@746 '@746 '@746) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@732.(Array '@732) Int)
      (xs // !'@732.(Array '@732)
      ) // Int
      ,count_1711 // (Func !'@732.(Array '@732) Int)
      (ys // !'@732.(Array '@732)
      ) // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,count_1711 // (Func !'@732.(Array '@732) Int)
      (xs // !'@732.(Array '@732)
      ) // Int
    ) // Bool
     ? op_obr_cbr_2029 // !'@732.(Func !'@732.(Array '@732) Int '@732)
    (xs // !'@732.(Array '@732)
      ,i // Int
    ) // '@732
     : op_obr_cbr_2029 // !'@732.(Func !'@732.(Array '@732) Int '@732)
    (ys // !'@732.(Array '@732)
      ,op_sub_754 // [!'@747.(Func '@747 '@747 '@747) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,count_1711 // (Func !'@732.(Array '@732) Int)
        (xs // !'@732.(Array '@732)
        ) // Int
      ) // Int
    ) // '@732
     // '@732
     // !'@732.(Func Int '@732)
  ) // !'@732.(Array '@732)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function cut_1275(xs, from, n)
{
  return gen_1145 // !'@756.(Func Int (Func Int '@756) (Array '@756))
  (op_sub_754 // [!'@763.(Func '@763 '@763 '@763) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@756.(Array '@756) Int)
      (xs // !'@756.(Array '@756)
      ) // Int
      ,n // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,from // Int
    ) // Bool
     ? op_obr_cbr_2029 // !'@756.(Func !'@756.(Array '@756) Int '@756)
    (xs // !'@756.(Array '@756)
      ,i // Int
    ) // '@756
     : op_obr_cbr_2029 // !'@756.(Func !'@756.(Array '@756) Int '@756)
    (xs // !'@756.(Array '@756)
      ,op_add_732 // [!'@764.(Func '@764 '@764 '@764) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@756
     // '@756
     // !'@756.(Func Int '@756)
  ) // !'@756.(Array '@756)
  ;
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1312(xs, from, ys)
{
  return concat_1213 // !'@1807.(Func (Array '@1807) (Array '@1807) (Array '@1807))
  (concat_1213 // !'@1807.(Func (Array '@1807) (Array '@1807) (Array '@1807))
    (take_967 // [!'@1810.(Func (Array '@1810) Int (Array '@1810)) | !'@1811.(Func (Array '@1811) Int Int (Array '@1811))]
      (xs // !'@1807.(Array '@1807)
        ,from // Int
      ) // !'@1807.(Array '@1807)
      ,ys // !'@1807.(Array '@1807)
    ) // !'@1807.(Array '@1807)
    ,skip_1023 // !'@1807.(Func (Array '@1807) Int (Array '@1807))
    (xs // !'@1807.(Array '@1807)
      ,from // Int
    ) // !'@1807.(Array '@1807)
  ) // !'@1807.(Array '@1807)
  ;
}
// (Func (Array Float) Float)
function sum_1330(xs)
{
  return reduce_1918 // (Func (Array Float) Float (Func Float Float Float) Float)
  (xs // (Array Float)
    ,0 // Float
    ,op_add_842 // [!'@658.(Func '@658 '@658 '@658) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Float
  ;
}
// (Func (Array Float) Float)
function product_1348(xs)
{
  return reduce_1918 // (Func (Array Float) Float (Func Float Float Float) Float)
  (xs // (Array Float)
    ,1 // Float
    ,op_mul_886 // [!'@1694.(Func '@1694 '@1694 '@1694) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Float
  ;
}
// (Func (Array Float) Float)
function average_1373(xs)
{
  return op_div_908 // [!'@660.(Func '@660 '@660 '@660) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return reduce_1918 // !'@1252.(Func (Array '@1252) '@1252 (Func '@1252 '@1252 '@1252) '@1252)
  (xs // !'@1252.(Array '@1252)
    ,op_obr_cbr_2029 // !'@1252.(Func !'@1252.(Array '@1252) Int '@1252)
    (xs // !'@1252.(Array '@1252)
      ,0 // Int
    ) // '@1252
    ,min_140 // [!'@1255.(Func '@1255 '@1255 '@1255) | !'@1256!'@1257.(Func '@1256 '@1257)]
  ) // '@1255
  ;
}
// (Func (Array T0) T0)
function max_1417(xs)
{
  return reduce_1918 // !'@1273.(Func (Array '@1273) '@1273 (Func '@1273 '@1273 '@1273) '@1273)
  (xs // !'@1273.(Array '@1273)
    ,op_obr_cbr_2029 // !'@1273.(Func !'@1273.(Array '@1273) Int '@1273)
    (xs // !'@1273.(Array '@1273)
      ,0 // Int
    ) // '@1273
    ,max_165 // [!'@1276.(Func '@1276 '@1276 '@1276) | !'@1277!'@1278.(Func '@1277 '@1278)]
  ) // '@1276
  ;
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1483(xs, i, j)
{
  let tmp = op_obr_cbr_2029 // !'@1313.(Func !'@1313.(Array '@1313) Int '@1313)
  (xs // !'@1313.(ArrayBuilder '@1313)
    ,i // Int
  ) // '@1313
  ;
  xs = set_1881 // !'@1313.(Func (ArrayBuilder '@1313) Int '@1313 (ArrayBuilder '@1313))
  (xs // !'@1313.(Array '@1313)
    ,i // Int
    ,op_obr_cbr_2029 // !'@1313.(Func !'@1313.(Array '@1313) Int '@1313)
    (xs // !'@1313.(Array '@1313)
      ,j // Int
    ) // '@1313
  ) // !'@1313.(ArrayBuilder '@1313)
   // !'@1313.(ArrayBuilder '@1313)
  ;
  xs = set_1881 // !'@1313.(Func (ArrayBuilder '@1313) Int '@1313 (ArrayBuilder '@1313))
  (xs // !'@1313.(ArrayBuilder '@1313)
    ,j // Int
    ,tmp // '@1313
  ) // !'@1313.(ArrayBuilder '@1313)
   // !'@1313.(ArrayBuilder '@1313)
  ;
  return xs // !'@1313.(ArrayBuilder '@1313)
  ;
}
// (Func (Array T0) Int Int Int)
function partition_1598(a, lo, hi)
{
  let p = op_obr_cbr_2029 // !'@1301.(Func !'@1301.(Array '@1301) Int '@1301)
  (a // !'@1301.(Array '@1301)
    ,lo // Int
  ) // '@1301
  ;
  let i = op_sub_754 // [!'@1318.(Func '@1318 '@1318 '@1318) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (lo // Int
    ,1 // Int
  ) // Int
  ;
  let j = op_add_732 // [!'@1319.(Func '@1319 '@1319 '@1319) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    while (op_lt_686 // !'@1301.(Func '@1301 '@1301 Bool)
      (op_obr_cbr_2029 // !'@1301.(Func !'@1301.(Array '@1301) Int '@1301)
        (a // !'@1301.(Array '@1301)
          ,i // Int
        ) // '@1301
        ,p // '@1301
      ) // Bool
    )
    do
    {
      j-- // Int
      ;
    }
    while (op_gt_638 // !'@1301.(Func '@1301 '@1301 Bool)
      (op_obr_cbr_2029 // !'@1301.(Func !'@1301.(Array '@1301) Int '@1301)
        (a // !'@1301.(Array '@1301)
          ,j // Int
        ) // '@1301
        ,p // '@1301
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
    swapElements_1483 // !'@1301.(Func (ArrayBuilder '@1301) Int Int (ArrayBuilder '@1301))
    (a // !'@1301.(Array '@1301)
      ,i // Int
      ,j // Int
    ) // !'@1301.(ArrayBuilder '@1301)
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
    let p = partition_1598 // (Func !'@1320.(Array '@1320) Int Int Int)
    (a // !'@1320.(Array '@1320)
      ,lo // Int
      ,hi // Int
    ) // Int
    ;
    qsort_1667 // !'@1324.(Func !'@1320.(Array '@1320) Int Int '@1324)
    (a // !'@1320.(Array '@1320)
      ,lo // Int
      ,p // Int
    ) // '@1324
    ;
    qsort_1667 // !'@1328.(Func !'@1320.(Array '@1320) Int Int '@1328)
    (a // !'@1320.(Array '@1320)
      ,op_add_732 // [!'@1330.(Func '@1330 '@1330 '@1330) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (p // Int
        ,1 // Int
      ) // Int
      ,hi // Int
    ) // '@1328
    ;
  }
  else
  { }
  return a // !'@1320.(Array '@1320)
  ;
}
// (Func (Array T0) (Array T0))
function sort_1697(xs)
{
  return immutable_1904 // !'@1332.(Func (ArrayBuilder '@1332) (Array '@1332))
  (qsort_1667 // !'@1332.(Func (Array '@1332) Int Int (Array '@1332))
    (mutable_1785 // !'@1332.(Func (Array '@1332) (ArrayBuilder '@1332))
      (xs // !'@1332.(Array '@1332)
      ) // !'@1332.(ArrayBuilder '@1332)
      ,0 // Int
      ,op_sub_754 // [!'@1335.(Func '@1335 '@1335 '@1335) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1332.(Array '@1332) Int)
        (xs // !'@1332.(Array '@1332)
        ) // Int
        ,1 // Int
      ) // Int
    ) // !'@1332.(Array '@1332)
  ) // !'@1332.(Array '@1332)
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
  (op_mod_820 // [!'@1365.(Func '@1365 '@1365 '@1365) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1364.(Func '@1364 '@1364 '@1364) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,op_div_798 // [!'@1367.(Func '@1367 '@1367 '@1367) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1366.(Func '@1366 '@1366 '@1366) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
  ) // Int
   : op_add_732 // [!'@1372.(Func '@1372 '@1372 '@1372) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (ys // (Array Int)
      ,op_div_798 // [!'@1369.(Func '@1369 '@1369 '@1369) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1368.(Func '@1368 '@1368 '@1368) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func (Array Int) Int)
          (ys // (Array Int)
          ) // Int
          ,2 // Int
        ) // Int
        ,2 // Int
      ) // Int
    ) // Int
    ,op_div_798 // [!'@1371.(Func '@1371 '@1371 '@1371) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2029 // (Func (Array Int) Int Int)
      (ys // (Array Int)
        ,op_div_798 // [!'@1370.(Func '@1370 '@1370 '@1370) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
      ,count_1711 // (Func !'@1085.(Array '@1085) Int)
      (xs // !'@1085.(Array '@1085)
      ) // Int
    ) // Bool
  ) // Bool
  ;
}
// (Func (Array T0) T0)
function last_1851(xs)
{
  return op_obr_cbr_2029 // !'@1179.(Func !'@1179.(Array '@1179) Int '@1179)
  (xs // !'@1179.(Array '@1179)
    ,op_sub_754 // [!'@1180.(Func '@1180 '@1180 '@1180) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1179.(Array '@1179) Int)
      (xs // !'@1179.(Array '@1179)
      ) // Int
      ,1 // Int
    ) // Int
  ) // '@1179
  ;
}
// (Func (Array T0) T0)
function first_1866(xs)
{
  return op_obr_cbr_2029 // !'@1052.(Func !'@1052.(Array '@1052) Int '@1052)
  (xs // !'@1052.(Array '@1052)
    ,0 // Int
  ) // '@1052
  ;
}
// (Func (Array T0) (Array T0))
function tail_1881(xs)
{
  return skip_1023 // !'@1859.(Func (Array '@1859) Int (Array '@1859))
  (xs // !'@1859.(Array '@1859)
    ,1 // Int
  ) // !'@1859.(Array '@1859)
  ;
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1918(xs, acc, f)
{
  for (let i2=0; i2 < xs // !'@588.(Array '@588)
  .length; ++i2)
  {
    const x = xs // !'@588.(Array '@588)
    [i2];
    {
      acc = f // !'@589!'@588.(Func '@589 '@588 '@589)
      (acc // '@589
        ,x // '@588
      ) // '@589
       // '@589
      ;
    }
  }
  return acc // '@589
  ;
}
// (Func (Array (Array T0)) (Array T0))
function flatten_1935(xs)
{
  return reduce_1918 // !'@1061.(Func (Array (Array '@1061)) (Array '@1061) (Func (Array '@1061) (Array '@1061) (Array '@1061)) (Array '@1061))
  (xs // (Array !'@1061.(Array '@1061))
    ,[] // !'@1061.(Array '@1061)
    ,concat_1213 // !'@1061.(Func (Array '@1061) (Array '@1061) (Array '@1061))
  ) // !'@1061.(Array '@1061)
  ;
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T1))
function flatMap_1957(xs, f)
{
  return flatten_1935 // !'@1063.(Func (Array (Array '@1063)) (Array '@1063))
  (map_53 // !'@1064!'@1063.(Func (Array '@1064) (Func '@1064 (Array '@1063)) (Array (Array '@1063)))
    (xs // !'@1064.(Array '@1064)
      ,f // !'@1064!'@1063.(Func '@1064 (Array '@1063))
    ) // (Array !'@1063.(Array '@1063))
  ) // !'@1063.(Array '@1063)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function cartesianProduct_2010(xs, ys, f)
{
  let r = mutable_1785 // !'@674.(Func (Array '@674) (ArrayBuilder '@674))
  ([] // !'@674.(Array '@674)
  ) // !'@674.(ArrayBuilder '@674)
  ;
  for (let i3=0; i3 < xs // !'@667.(Array '@667)
  .length; ++i3)
  {
    const x = xs // !'@667.(Array '@667)
    [i3];
    {
      for (let i4=0; i4 < ys // !'@668.(Array '@668)
      .length; ++i4)
      {
        const y = ys // !'@668.(Array '@668)
        [i4];
        {
          push_1814 // !'@674.(Func (ArrayBuilder '@674) '@674 (ArrayBuilder '@674))
          (r // !'@674.(ArrayBuilder '@674)
            ,f // !'@667!'@668!'@674.(Func '@667 '@668 '@674)
            (x // '@667
              ,y // '@668
            ) // '@674
          ) // !'@674.(ArrayBuilder '@674)
          ;
        }
      }
    }
  }
  return immutable_1904 // !'@674.(Func (ArrayBuilder '@674) (Array '@674))
  (r // !'@674.(ArrayBuilder '@674)
  ) // !'@674.(Array '@674)
  ;
}
// (Func (Array T0) T1 (Array T1))
function setAll_2034(xs, x)
{
  return map_53 // !'@1759!'@1755.(Func (Array '@1759) (Func '@1759 '@1755) (Array '@1755))
  (xs // !'@1759.(Array '@1759)
    ,(_) => x // '@1755
     // !'@1759!'@1755.(Func '@1759 '@1755)
  ) // !'@1755.(Array '@1755)
  ;
}
// Module heron:geometry.mesh:0.1
// file input\geometry-mesh.heron
// imports heron:std.array:0.1
// imports heron:geometry.vector:0.1
// Mesh
const tetrahedron = mesh_80 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@549!'@550!'@551.(Func '@549 '@550 '@551) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
(toVectors_2241 // (Func (Array Float) (Array Float3))
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
const cube = mesh_80 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@495!'@496!'@497.(Func '@495 '@496 '@497) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
(toVectors_2241 // (Func (Array Float) (Array Float3))
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
const octahedron = mesh_80 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@541!'@542!'@543.(Func '@541 '@542 '@543) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
(toVectors_2241 // (Func (Array Float) (Array Float3))
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
const dodecahedron = ((t) => ((r) => mesh_80 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@526!'@527!'@528.(Func '@526 '@527 '@528) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
    (toVectors_2241 // (Func (Array Float) (Array Float3))
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
    )(op_div_590 // [!'@525.(Func '@525 '@525 '@525) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (1 // Int
      ,t // Float
    ) // Float
  )
   // Mesh
  )(op_div_590 // [!'@523.(Func '@523 '@523 '@523) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@524.(Func '@524 '@524 '@524) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
const icosahedron = ((t) => mesh_80 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@535!'@536!'@537.(Func '@535 '@536 '@537) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
  (toVectors_2241 // (Func (Array Float) (Array Float3))
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
  )(op_div_590 // [!'@533.(Func '@533 '@533 '@533) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@534.(Func '@534 '@534 '@534) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return mesh_80 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | !'@490!'@491.(Func '@490 '@491) | !'@492!'@493!'@494.(Func '@492 '@493 '@494) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
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
  return mesh_36 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | !'@478!'@479.(Func '@478 '@479) | !'@480!'@481!'@482.(Func '@480 '@481 '@482) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
  (vertexBuffer // '@11
  ) // '@15
  ;
}
// (Func (Array Float3) (Array Int) Mesh)
function mesh_80(vertexBuffer, indexBuffer)
{
  return mesh_111 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | !'@470!'@471.(Func '@470 '@471) | !'@472!'@473!'@474.(Func '@472 '@473 '@474) | !'@475!'@476!'@477.(Func '@475 '@476 '@477) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
  (vertexBuffer // (Array Float3)
    ,indexBuffer // (Array Int)
    ,repeat_566 // (Func Float3 Int (Array Float3))
    (origin // Float3
      ,0 // Int
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func (Array Float3) (Array Int) (Array Float3) Mesh)
function mesh_111(vertexBuffer, indexBuffer, uvBuffer)
{
  return mesh_150 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | !'@457!'@458.(Func '@457 '@458) | !'@459!'@460!'@461.(Func '@459 '@460 '@461) | !'@462!'@463!'@464.(Func '@462 '@463 '@464) | !'@465!'@466!'@467!'@468.(Func '@465 '@466 '@467 '@468) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
  (vertexBuffer // (Array Float3)
    ,indexBuffer // (Array Int)
    ,uvBuffer // (Array Float3)
    ,repeat_566 // (Func Float3 Int (Array Float3))
    (origin // Float3
      ,0 // Int
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)
function mesh_150(vertexBuffer, indexBuffer, uvBuffer, colorBuffer)
{
  return computeVertexNormals_3317 // (Func Mesh Mesh)
  (mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | !'@439!'@440.(Func '@439 '@440) | !'@441!'@442!'@443.(Func '@441 '@442 '@443) | !'@444!'@445!'@446.(Func '@444 '@445 '@446) | !'@447!'@448!'@449!'@450.(Func '@447 '@448 '@449 '@450) | !'@451!'@452!'@453!'@454!'@455.(Func '@451 '@452 '@453 '@454 '@455)]
    (vertexBuffer // (Array Float3)
      ,indexBuffer // (Array Int)
      ,uvBuffer // (Array Float3)
      ,colorBuffer // (Array Float3)
      ,repeat_566 // (Func Float3 Int (Array Float3))
      (origin // Float3
        ,0 // Int
      ) // (Array Float3)
    ) // Mesh
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertices_188(m, points)
{
  return mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@1497!'@1498!'@1499.(Func '@1497 '@1498 '@1499) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
  (points // (Array Float3)
    ,indexBuffer_2152 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvBuffer_2170 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,colorBuffer_2188 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,normalBuffer_2206 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertexColors_226(m, colors)
{
  return mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@699!'@700!'@701.(Func '@699 '@700 '@701) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
  (vertexBuffer_2134 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,indexBuffer_2152 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvBuffer_2170 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,colors // (Array Float3)
    ,normalBuffer_2206 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertexUVs_264(m, uvs)
{
  return mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@1769!'@1770!'@1771.(Func '@1769 '@1770 '@1771) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
  (vertexBuffer_2134 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,indexBuffer_2152 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvs // (Array Float3)
    ,colorBuffer_2188 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,normalBuffer_2206 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertexNormals_302(m, normals)
{
  return mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | !'@346!'@347.(Func '@346 '@347) | !'@348!'@349!'@350.(Func '@348 '@349 '@350) | !'@351!'@352!'@353.(Func '@351 '@352 '@353) | !'@354!'@355!'@356!'@357.(Func '@354 '@355 '@356 '@357) | !'@358!'@359!'@360!'@361!'@362.(Func '@358 '@359 '@360 '@361 '@362)]
  (vertexBuffer_2134 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,indexBuffer_2152 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvBuffer_2170 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,colorBuffer_2188 // (Func Mesh (Array Float3))
    (m // Mesh
    ) // (Array Float3)
    ,normals // (Array Float3)
  ) // Mesh
  ;
}
// (Func (Array T0) Int Bool Bool (Array Int))
function quadStripToMeshIndices_1267(vertices, rows, connectRows, connectCols)
{
  let cols = op_div_798 // [!'@878.(Func '@878 '@878 '@878) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func !'@820.(Array '@820) Int)
    (vertices // !'@820.(Array '@820)
    ) // Int
    ,rows // Int
  ) // Int
  ;
  let nr = connectRows // Bool
   ? rows // Int
   : op_sub_754 // [!'@879.(Func '@879 '@879 '@879) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (rows // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let nc = connectCols // Bool
   ? cols // Int
   : op_sub_754 // [!'@880.(Func '@880 '@880 '@880) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
          let a = op_add_732 // [!'@882.(Func '@882 '@882 '@882) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@881.(Func '@881 '@881 '@881) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let b = op_add_732 // [!'@886.(Func '@886 '@886 '@886) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@884.(Func '@884 '@884 '@884) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@883.(Func '@883 '@883 '@883) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@885.(Func '@885 '@885 '@885) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let c = op_add_732 // [!'@892.(Func '@892 '@892 '@892) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@888.(Func '@888 '@888 '@888) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@887.(Func '@887 '@887 '@887) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@891.(Func '@891 '@891 '@891) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@890.(Func '@890 '@890 '@890) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@889.(Func '@889 '@889 '@889) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let d = op_add_732 // [!'@896.(Func '@896 '@896 '@896) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@895.(Func '@895 '@895 '@895) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@894.(Func '@894 '@894 '@894) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@893.(Func '@893 '@893 '@893) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function vector_1332(uv)
{
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (op_mul_886 // [!'@414.(Func '@414 '@414 '@414) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,op_mul_886 // [!'@415.(Func '@415 '@415 '@415) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function rescale_1360(v, from, length)
{
  return op_add_518 // [!'@1724.(Func '@1724 '@1724 '@1724) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (from // '@1719
    ,op_mul_566 // [!'@1723.(Func '@1723 '@1723 '@1723) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // '@1719
      ,length // '@1719
    ) // '@1719
  ) // '@1719
  ;
}
// (Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh)
function meshFromUV_1605(f, uCount, vCount, uStart, vStart, uLength, vLength, uJoin, vJoin)
{
  let uMax = uJoin // Bool
   ? float_41 // (Func Int Float)
  (uCount // Int
  ) // Float
   : float_41 // (Func Int Float)
  (op_sub_754 // [!'@902.(Func '@902 '@902 '@902) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_754 // [!'@903.(Func '@903 '@903 '@903) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,(u, v) => vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
    (op_add_842 // [!'@906.(Func '@906 '@906 '@906) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@905.(Func '@905 '@905 '@905) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@904.(Func '@904 '@904 '@904) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,uMax // Float
          ) // Float
          ,uLength // Float
        ) // Float
        ,uStart // Float
      ) // Float
      ,op_add_842 // [!'@909.(Func '@909 '@909 '@909) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@908.(Func '@908 '@908 '@908) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@907.(Func '@907 '@907 '@907) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  let normals = map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
  (uvs // (Array Float3)
    ,(uvw) => normalFromUV_2114 // (Func Float Float (Func Float Float Float3) Float3)
    (x_134 // (Func Float3 Float)
      (uvw // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (uvw // Float3
      ) // Float
      ,f // (Func Float Float Float3)
    ) // Float3
     // (Func Float3 Float3)
  ) // (Array Float3)
  ;
  let indices = quadStripToMeshIndices_1267 // (Func (Array Float3) Int Bool Bool (Array Int))
  (points // (Array Float3)
    ,vCount // Int
    ,uJoin // Bool
    ,vJoin // Bool
  ) // (Array Int)
  ;
  return mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@910!'@911!'@912.(Func '@910 '@911 '@912) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
  (points // (Array Float3)
    ,indices // (Array Int)
    ,uvs // (Array Float3)
    ,repeat_566 // (Func Float3 Int (Array Float3))
    (origin // Float3
      ,0 // Int
    ) // (Array Float3)
    ,normals // (Array Float3)
  ) // Mesh
  ;
}
// (Func (Func Float Float Float3) Int Mesh)
function meshFromUV_1626(f, segments)
{
  return meshFromUV_1659 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | !'@937!'@938!'@939.(Func '@937 '@938 '@939) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (f // (Func Float Float Float3)
    ,segments // Int
    ,true // Bool
  ) // Mesh
  ;
}
// (Func (Func Float Float Float3) Int Bool Mesh)
function meshFromUV_1659(f, segments, join)
{
  return meshFromUV_1605 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | !'@930!'@931!'@932.(Func '@930 '@931 '@932) | !'@933!'@934!'@935!'@936.(Func '@933 '@934 '@935 '@936)]
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
function spherePoint_1759(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@1621.(Func '@1621 '@1621 '@1621) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (cos_353 // (Func Float Float)
        (op_mul_886 // [!'@1618.(Func '@1618 '@1618 '@1618) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mul_886 // [!'@1617.(Func '@1617 '@1617 '@1617) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (u // Float
              ,2 // Float
            ) // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1620.(Func '@1620 '@1620 '@1620) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1619.(Func '@1619 '@1619 '@1619) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@1623.(Func '@1623 '@1623 '@1623) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1622.(Func '@1622 '@1622 '@1622) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1628.(Func '@1628 '@1628 '@1628) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1625.(Func '@1625 '@1625 '@1625) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1624.(Func '@1624 '@1624 '@1624) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1627.(Func '@1627 '@1627 '@1627) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1626.(Func '@1626 '@1626 '@1626) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function sphere_1776(segments)
{
  return meshFromUV_1626 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (spherePoint_1759 // (Func Float Float Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function sphere_1787()
{
  return sphere_1776 // [(Func Int Mesh) | !'@1631.(Func '@1631)]
  (32 // Int
  ) // Mesh
  ;
}
// (Func Float Int Float3)
function cylinderPoint_1839(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (sin_449 // (Func Float Float)
    (op_mul_886 // [!'@949.(Func '@949 '@949 '@949) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@948.(Func '@948 '@948 '@948) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_776 // [!'@950.(Func '@950 '@950 '@950) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Int
      ,2 // Int
    ) // Int
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@952.(Func '@952 '@952 '@952) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@951.(Func '@951 '@951 '@951) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function cylinder_1856(segments)
{
  return meshFromUV_1626 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (cylinderPoint_1839 // (Func Float Int Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function cylinder_1867()
{
  return cylinder_1856 // [(Func Int Mesh) | !'@955.(Func '@955)]
  (16 // Int
  ) // Mesh
  ;
}
// (Func Float Float Int Mesh)
function torus_1907(r1, r2, segments)
{
  return meshFromUV_1626 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  ((u, v) => torusPoint_2037 // (Func Float Float Float Float Float3)
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
function torusPoint_2037(u, v, r1, r2)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@1667.(Func '@1667 '@1667 '@1667) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@1664.(Func '@1664 '@1664 '@1664) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@1663.(Func '@1663 '@1663 '@1663) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_886 // [!'@1662.(Func '@1662 '@1662 '@1662) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_886 // [!'@1661.(Func '@1661 '@1661 '@1661) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,2 // Float
              ) // Float
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,cos_353 // (Func Float Float)
      (op_mul_886 // [!'@1666.(Func '@1666 '@1666 '@1666) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1665.(Func '@1665 '@1665 '@1665) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1674.(Func '@1674 '@1674 '@1674) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@1671.(Func '@1671 '@1671 '@1671) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@1670.(Func '@1670 '@1670 '@1670) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_886 // [!'@1669.(Func '@1669 '@1669 '@1669) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_886 // [!'@1668.(Func '@1668 '@1668 '@1668) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,2 // Float
              ) // Float
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1673.(Func '@1673 '@1673 '@1673) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1672.(Func '@1672 '@1672 '@1672) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1677.(Func '@1677 '@1677 '@1677) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (r2 // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1676.(Func '@1676 '@1676 '@1676) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1675.(Func '@1675 '@1675 '@1675) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
// (Func Float Float (Func Float Float Float3) Float3)
function normalFromUV_2114(u, v, f)
{
  return ((eps) => ((p) => normal_300 // (Func Float3 Float3)
      (cross_403 // (Func Float3 Float3 Float3)
        (op_sub_1320 // [!'@811.(Func '@811 '@811 '@811) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (f // (Func Float Float Float3)
            (op_add_842 // [!'@810.(Func '@810 '@810 '@810) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (u // Float
                ,eps // Float
              ) // Float
              ,v // Float
            ) // Float3
            ,p // Float3
          ) // Float3
          ,op_sub_1320 // [!'@813.(Func '@813 '@813 '@813) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (f // (Func Float Float Float3)
            (u // Float
              ,op_add_842 // [!'@812.(Func '@812 '@812 '@812) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,eps // Float
              ) // Float
            ) // Float3
            ,p // Float3
          ) // Float3
        ) // Float3
      ) // Float3
      )(f // (Func Float Float Float3)
      (u // Float
        ,v // Float
      ) // Float3
    )
     // Float3
    )(0.0001 // Float
  )
   // Float3
  ;
}
// (Func Mesh)
function torus_2127()
{
  return torus_1907 // [(Func Float Float Int Mesh) | !'@1680.(Func '@1680)]
  (2 // Int
    ,0.5 // Float
    ,32 // Int
  ) // Mesh
  ;
}
// (Func Mesh Int)
function vertexCount_2144(mesh)
{
  return count_1711 // (Func (Array Float3) Int)
  (vertexBuffer_2134 // (Func Mesh (Array Float3))
    (mesh // Mesh
    ) // (Array Float3)
  ) // Int
  ;
}
// (Func Mesh Int)
function faceCount_2165(mesh)
{
  return op_div_798 // [!'@167.(Func '@167 '@167 '@167) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func (Array Int) Int)
    (indexBuffer_2152 // (Func Mesh (Array Int))
      (mesh // Mesh
      ) // (Array Int)
    ) // Int
    ,3 // Int
  ) // Int
  ;
}
// (Func (Array Float) (Array Float3))
function toVectors_2241(xs)
{
  return map_53 // (Func (Array Int) (Func Int Float3) (Array Float3))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@514.(Func '@514 '@514 '@514) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Float) Int)
        (xs // (Array Float)
        ) // Int
        ,3 // Int
      ) // Int
    ) // (Array Int)
    ,(i) => vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
    (op_obr_cbr_2029 // (Func (Array Float) Int Float)
      (xs // (Array Float)
        ,op_mul_776 // [!'@515.(Func '@515 '@515 '@515) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,3 // Int
        ) // Int
      ) // Float
      ,op_obr_cbr_2029 // (Func (Array Float) Int Float)
      (xs // (Array Float)
        ,op_add_732 // [!'@517.(Func '@517 '@517 '@517) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@516.(Func '@516 '@516 '@516) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (i // Int
            ,3 // Int
          ) // Int
          ,1 // Int
        ) // Int
      ) // Float
      ,op_obr_cbr_2029 // (Func (Array Float) Int Float)
      (xs // (Array Float)
        ,op_add_732 // [!'@519.(Func '@519 '@519 '@519) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@518.(Func '@518 '@518 '@518) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
// (Func Mesh (Func Float3 Float3) Mesh)
function transform_2268(m, f)
{
  return setVertices_188 // (Func Mesh (Array Float3) Mesh)
  (m // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (vertexBuffer_2134 // (Func Mesh (Array Float3))
      (m // Mesh
      ) // (Array Float3)
      ,f // (Func Float3 Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function translate_2297(m, amount)
{
  return transform_2268 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_add_1255 // [!'@1515.(Func '@1515 '@1515 '@1515) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function translate_2338(m, vectors)
{
  return setVertices_188 // (Func Mesh (Array Float3) Mesh)
  (m // Mesh
    ,zip_372 // (Func (Array Float3) (Array Float3) (Func Float3 Float3 Float3) (Array Float3))
    (vertexBuffer_2134 // (Func Mesh (Array Float3))
      (m // Mesh
      ) // (Array Float3)
      ,vectors // (Array Float3)
      ,(p, v) => op_add_1255 // [!'@1526.(Func '@1526 '@1526 '@1526) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (p // Float3
        ,v // Float3
      ) // Float3
       // (Func Float3 Float3 Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function scale_2367(m, amount)
{
  return transform_2268 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_mul_1385 // [!'@1505.(Func '@1505 '@1505 '@1505) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function kleinPoint_2697(a, b)
{
  let u = op_mul_886 // [!'@1131.(Func '@1131 '@1131 '@1131) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1130.(Func '@1130 '@1130 '@1130) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,pi // Float
    ) // Float
    ,2 // Float
  ) // Float
  ;
  let v = op_mul_886 // [!'@1133.(Func '@1133 '@1133 '@1133) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1132.(Func '@1132 '@1132 '@1132) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    x = op_add_842 // [!'@1142.(Func '@1142 '@1142 '@1142) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1136.(Func '@1136 '@1136 '@1136) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1134.(Func '@1134 '@1134 '@1134) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (3 // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,op_add_842 // [!'@1135.(Func '@1135 '@1135 '@1135) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (1 // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1141.(Func '@1141 '@1141 '@1141) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1140.(Func '@1140 '@1140 '@1140) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1139.(Func '@1139 '@1139 '@1139) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (2 // Float
            ,op_sub_864 // [!'@1138.(Func '@1138 '@1138 '@1138) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (1 // Float
              ,op_div_908 // [!'@1137.(Func '@1137 '@1137 '@1137) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    z = op_sub_864 // [!'@1149.(Func '@1149 '@1149 '@1149) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1143.(Func '@1143 '@1143 '@1143) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_negate_1659 // (Func Float Float)
        (8 // Float
        ) // Float
        ,sin_449 // (Func Float Float)
        (u // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1148.(Func '@1148 '@1148 '@1148) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1147.(Func '@1147 '@1147 '@1147) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1146.(Func '@1146 '@1146 '@1146) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (2 // Float
            ,op_sub_864 // [!'@1145.(Func '@1145 '@1145 '@1145) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (1 // Float
              ,op_div_908 // [!'@1144.(Func '@1144 '@1144 '@1144) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    x = op_add_842 // [!'@1158.(Func '@1158 '@1158 '@1158) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1152.(Func '@1152 '@1152 '@1152) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1150.(Func '@1150 '@1150 '@1150) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (3 // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,op_add_842 // [!'@1151.(Func '@1151 '@1151 '@1151) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (1 // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1157.(Func '@1157 '@1157 '@1157) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1155.(Func '@1155 '@1155 '@1155) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (2 // Float
          ,op_sub_864 // [!'@1154.(Func '@1154 '@1154 '@1154) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (1 // Float
            ,op_div_908 // [!'@1153.(Func '@1153 '@1153 '@1153) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (cos_353 // (Func Float Float)
              (u // Float
              ) // Float
              ,2 // Float
            ) // Float
          ) // Float
        ) // Float
        ,cos_353 // (Func Float Float)
        (op_add_842 // [!'@1156.(Func '@1156 '@1156 '@1156) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
     // Float
    ;
    z = op_mul_886 // [!'@1159.(Func '@1159 '@1159 '@1159) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  y = op_mul_886 // [!'@1163.(Func '@1163 '@1163 '@1163) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1162.(Func '@1162 '@1162 '@1162) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (2 // Float
      ) // Float
      ,op_sub_864 // [!'@1161.(Func '@1161 '@1161 '@1161) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,op_div_908 // [!'@1160.(Func '@1160 '@1160 '@1160) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (op_div_908 // [!'@1164.(Func '@1164 '@1164 '@1164) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x // Float
      ,4 // Float
    ) // Float
    ,op_div_908 // [!'@1165.(Func '@1165 '@1165 '@1165) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y // Float
      ,4 // Float
    ) // Float
    ,op_div_908 // [!'@1166.(Func '@1166 '@1166 '@1166) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z // Float
      ,4 // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function klein_2711()
{
  return meshFromUV_1659 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (kleinPoint_2697 // (Func Float Float Float3)
    ,32 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function planeXYPoint_2732(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (u // Float
    ,v // Float
    ,0 // Int
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeXZPoint_2753(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (u // Float
    ,0 // Int
    ,v // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeYZPoint_2774(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (0 // Int
    ,u // Float
    ,v // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeYXPoint_2795(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (v // Float
    ,u // Float
    ,0 // Int
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeZXPoint_2816(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (v // Float
    ,0 // Int
    ,u // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeZYPoint_2837(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (0 // Int
    ,v // Float
    ,u // Float
  ) // Float3
  ;
}
// (Func Mesh)
function plane_2851()
{
  return meshFromUV_1659 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (planeXYPoint_2732 // (Func Float Float Float3)
    ,16 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function mobiusPoint_2967(a, b)
{
  let u = op_sub_864 // [!'@1467.(Func '@1467 '@1467 '@1467) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (a // Float
    ,0.5 // Float
  ) // Float
  ;
  let v = op_mul_886 // [!'@1469.(Func '@1469 '@1469 '@1469) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1468.(Func '@1468 '@1468 '@1468) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (b // Float
      ,2 // Float
    ) // Float
    ,pi // Float
  ) // Float
  ;
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@1473.(Func '@1473 '@1473 '@1473) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (cos_353 // (Func Float Float)
      (v // Float
      ) // Float
      ,op_add_518 // [!'@1472.(Func '@1472 '@1472 '@1472) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (2 // Int
        ,op_mul_886 // [!'@1471.(Func '@1471 '@1471 '@1471) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,cos_353 // (Func Float Float)
          (op_div_590 // [!'@1470.(Func '@1470 '@1470 '@1470) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (v // Float
              ,2 // Int
            ) // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1477.(Func '@1477 '@1477 '@1477) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (v // Float
      ) // Float
      ,op_add_518 // [!'@1476.(Func '@1476 '@1476 '@1476) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (2 // Int
        ,op_mul_886 // [!'@1475.(Func '@1475 '@1475 '@1475) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,cos_353 // (Func Float Float)
          (op_div_590 // [!'@1474.(Func '@1474 '@1474 '@1474) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (v // Float
              ,2 // Int
            ) // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1479.(Func '@1479 '@1479 '@1479) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (u // Float
      ,sin_449 // (Func Float Float)
      (op_div_590 // [!'@1478.(Func '@1478 '@1478 '@1478) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Int
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function mobius_2981()
{
  return meshFromUV_1659 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (mobiusPoint_2967 // (Func Float Float Float3)
    ,20 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Mesh Int Int Float3)
function facePoint_3023(mesh, f, i)
{
  return op_obr_cbr_2029 // (Func (Array Float3) Int Float3)
  (vertexBuffer_2134 // (Func Mesh (Array Float3))
    (mesh // Mesh
    ) // (Array Float3)
    ,op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (indexBuffer_2152 // (Func Mesh (Array Int))
      (mesh // Mesh
      ) // (Array Int)
      ,op_add_732 // [!'@304.(Func '@304 '@304 '@304) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_776 // [!'@303.(Func '@303 '@303 '@303) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (f // Int
          ,3 // Int
        ) // Int
        ,i // Int
      ) // Int
    ) // Int
  ) // Float3
  ;
}
// (Func Mesh Int Float3)
function faceNormal_3056(mesh, f)
{
  return normal_300 // (Func Float3 Float3)
  (cross_403 // (Func Float3 Float3 Float3)
    (faceSide1_3087 // (Func Mesh Int Float3)
      (mesh // Mesh
        ,f // Int
      ) // Float3
      ,faceSide2_3118 // (Func Mesh Int Float3)
      (mesh // Mesh
        ,f // Int
      ) // Float3
    ) // Float3
  ) // Float3
  ;
}
// (Func Mesh Int Float3)
function faceSide1_3087(mesh, f)
{
  return op_sub_1320 // [!'@305.(Func '@305 '@305 '@305) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (facePoint_3023 // (Func Mesh Int Int Float3)
    (mesh // Mesh
      ,f // Int
      ,1 // Int
    ) // Float3
    ,facePoint_3023 // (Func Mesh Int Int Float3)
    (mesh // Mesh
      ,f // Int
      ,0 // Int
    ) // Float3
  ) // Float3
  ;
}
// (Func Mesh Int Float3)
function faceSide2_3118(mesh, f)
{
  return op_sub_1320 // [!'@310.(Func '@310 '@310 '@310) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (facePoint_3023 // (Func Mesh Int Int Float3)
    (mesh // Mesh
      ,f // Int
      ,2 // Int
    ) // Float3
    ,facePoint_3023 // (Func Mesh Int Int Float3)
    (mesh // Mesh
      ,f // Int
      ,0 // Int
    ) // Float3
  ) // Float3
  ;
}
// (Func Mesh (Array Float3))
function faceNormals_3152(mesh)
{
  return map_53 // (Func (Array Int) (Func Int Float3) (Array Float3))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,faceCount_2165 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Int)
    ,(i) => faceNormal_3056 // (Func Mesh Int Float3)
    (mesh // Mesh
      ,i // Int
    ) // Float3
     // (Func Int Float3)
  ) // (Array Float3)
  ;
}
// (Func Mesh Mesh)
function computeVertexNormals_3317(mesh)
{
  let sums = mutable_1785 // (Func (Array Float3) (ArrayBuilder Float3))
  (repeat_566 // (Func Float3 Int (Array Float3))
    (origin // Float3
      ,vertexCount_2144 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Float3)
  ) // (ArrayBuilder Float3)
  ;
  let counts = mutable_1785 // (Func (Array Int) (ArrayBuilder Int))
  (repeat_566 // (Func Int Int (Array Int))
    (0 // Int
      ,vertexCount_2144 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Int)
  ) // (ArrayBuilder Int)
  ;
  for (let i7=0; i7 < op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,faceCount_2165 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Int)
  .length; ++i7)
  {
    const f = op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,faceCount_2165 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Int)
    [i7];
    {
      let normal = faceNormal_3056 // (Func Mesh Int Float3)
      (mesh // Mesh
        ,f // Int
      ) // Float3
      ;
      for (let i8=0; i8 < op_dot_dot_1762 // (Func Int Int (Array Int))
        (0 // Int
          ,3 // Int
        ) // (Array Int)
      .length; ++i8)
      {
        const i = op_dot_dot_1762 // (Func Int Int (Array Int))
        (0 // Int
          ,3 // Int
        ) // (Array Int)
        [i8];
        {
          let index = op_obr_cbr_2029 // (Func (Array Int) Int Int)
          (indexBuffer_2152 // (Func Mesh (Array Int))
            (mesh // Mesh
            ) // (Array Int)
            ,op_add_732 // [!'@419.(Func '@419 '@419 '@419) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_776 // [!'@418.(Func '@418 '@418 '@418) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (f // Int
                ,3 // Int
              ) // Int
              ,i // Int
            ) // Int
          ) // Int
          ;
          sums = set_1881 // (Func (ArrayBuilder Float3) Int Float3 (ArrayBuilder Float3))
          (sums // (ArrayBuilder Float3)
            ,index // Int
            ,normal // Float3
          ) // (ArrayBuilder Float3)
           // (ArrayBuilder Float3)
          ;
          counts = set_1881 // (Func (ArrayBuilder Int) Int Int (ArrayBuilder Int))
          (counts // (ArrayBuilder Int)
            ,index // Int
            ,1 // Int
          ) // (ArrayBuilder Int)
           // (ArrayBuilder Int)
          ;
        }
      }
    }
  }
  return setVertexNormals_302 // (Func Mesh (Array Float3) Mesh)
  (mesh // Mesh
    ,zip_372 // (Func (Array Float3) (Array Int) (Func Float3 Int Float3) (Array Float3))
    (sums // (ArrayBuilder Float3)
      ,counts // (ArrayBuilder Int)
      ,(a, b) => op_div_1450 // [!'@420.(Func '@420 '@420 '@420) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (a // Float3
        ,vector_120 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
        (float_41 // (Func Int Float)
          (b // Int
          ) // Float
        ) // Float3
      ) // Float3
       // (Func Float3 Int Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Float3 Float3 Float3 Float3)
function applyRotation_3368(pos, rotXYZ, rotW)
{
  return op_add_1255 // [!'@624.(Func '@624 '@624 '@624) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (pos // Float3
    ,op_mul_1385 // [!'@623.(Func '@623 '@623 '@623) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (vector_120 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
      (2 // Float
      ) // Float3
      ,cross_403 // (Func Float3 Float3 Float3)
      (rotXYZ // Float3
        ,op_add_1255 // [!'@622.(Func '@622 '@622 '@622) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (cross_403 // (Func Float3 Float3 Float3)
          (rotXYZ // Float3
            ,pos // Float3
          ) // Float3
          ,op_mul_1385 // [!'@621.(Func '@621 '@621 '@621) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (rotW // Float3
            ,pos // Float3
          ) // Float3
        ) // Float3
      ) // Float3
    ) // Float3
  ) // Float3
  ;
}
// (Func Float3 Float3 Float3 Float3 Float3 Float3)
function applyTRS_3409(pos, trans, rotXYZ, rotW, scale)
{
  return op_add_1255 // [!'@634.(Func '@634 '@634 '@634) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (applyRotation_3368 // (Func Float3 Float3 Float3 Float3)
    (op_mul_1385 // [!'@633.(Func '@633 '@633 '@633) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (pos // Float3
        ,scale // Float3
      ) // Float3
      ,rotXYZ // Float3
      ,rotW // Float3
    ) // Float3
    ,trans // Float3
  ) // Float3
  ;
}
// Module heron:tests:0.1
// file input\test.heron
// imports heron:std.array:0.1
// imports heron:geometry.mesh:0.1
// imports heron:geometry.vector:0.1
// (Func T0)
function main_39()
{
  simpleArrayTest_439 // !'@1387.(Func '@1387)
  () // '@1387
  ;
  simpleVectorTest_802 // !'@1429.(Func '@1429)
  () // '@1429
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
  print_2050 // !'@1209.(Func Str '@1209)
  ("'Expect [1, 11, 3]'" // Str
  ) // '@1209
  ;
  print_2050 // !'@1211.(Func (Array Int) '@1211)
  (xs // (Array Int)
  ) // '@1211
  ;
  print_2050 // !'@1213.(Func Str '@1213)
  ("'Expect 1, 11, 3'" // Str
  ) // '@1213
  ;
  for (let i9=0; i9 < xs // (Array Int)
  .length; ++i9)
  {
    const x = xs // (Array Int)
    [i9];
    {
      print_2050 // !'@1216.(Func Int '@1216)
      (x // Int
      ) // '@1216
      ;
    }
  }
  print_2050 // !'@1218.(Func Str '@1218)
  ("'Expect 1'" // Str
  ) // '@1218
  ;
  print_2050 // !'@1220.(Func Int '@1220)
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (xs // (Array Int)
      ,0 // Int
    ) // Int
  ) // '@1220
  ;
  print_2050 // !'@1223.(Func Str '@1223)
  ("'Expect 3'" // Str
  ) // '@1223
  ;
  print_2050 // !'@1225.(Func Int '@1225)
  (count_1711 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1225
  ;
  print_2050 // !'@1228.(Func Str '@1228)
  ("'Expect 1'" // Str
  ) // '@1228
  ;
  print_2050 // !'@1230.(Func Int '@1230)
  (first_1866 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1230
  ;
  print_2050 // !'@1233.(Func Str '@1233)
  ("'Expect 3'" // Str
  ) // '@1233
  ;
  print_2050 // !'@1235.(Func Int '@1235)
  (last_1851 // [!'@1381.(Func (Array '@1381) Int (Array '@1381)) | !'@1382.(Func !'@1382.(Array '@1382) '@1382)]
    (xs // (Array Int)
    ) // Int
  ) // '@1235
  ;
  print_2050 // !'@1239.(Func Str '@1239)
  ("'Expect 1'" // Str
  ) // '@1239
  ;
  print_2050 // !'@1241.(Func Int '@1241)
  (min_1395 // [!'@1383.(Func '@1383 '@1383 '@1383) | !'@1384.(Func !'@1384.(Array '@1384) '@1384)]
    (xs // (Array Int)
    ) // Int
  ) // '@1241
  ;
  print_2050 // !'@1260.(Func Str '@1260)
  ("'Expect 11'" // Str
  ) // '@1260
  ;
  print_2050 // !'@1262.(Func Int '@1262)
  (max_1417 // [!'@1385.(Func '@1385 '@1385 '@1385) | !'@1386.(Func !'@1386.(Array '@1386) '@1386)]
    (xs // (Array Int)
    ) // Int
  ) // '@1262
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
  print_2050 // !'@1283.(Func Str '@1283)
  ("'Expect 5'" // Str
  ) // '@1283
  ;
  print_2050 // !'@1285.(Func Int '@1285)
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (ys // (ArrayBuilder Int)
      ,1 // Int
    ) // Int
  ) // '@1285
  ;
  print_2050 // !'@1288.(Func Str '@1288)
  ("'Expect 1, 3, 11'" // Str
  ) // '@1288
  ;
  let zs = sort_1697 // (Func (Array Int) (Array Int))
  (xs // (Array Int)
  ) // (Array Int)
  ;
  for (let i10=0; i10 < zs // (Array Int)
  .length; ++i10)
  {
    const z = zs // (Array Int)
    [i10];
    {
      print_2050 // !'@1339.(Func Int '@1339)
      (z // Int
      ) // '@1339
      ;
    }
  }
  print_2050 // !'@1341.(Func Str '@1341)
  ("'Expect 3'" // Str
  ) // '@1341
  ;
  print_2050 // !'@1343.(Func Int '@1343)
  (median_1797 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1343
  ;
  print_2050 // !'@1374.(Func Str '@1374)
  ("'Expect 15'" // Str
  ) // '@1374
  ;
  print_2050 // !'@1376.(Func Float '@1376)
  (sum_1330 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1376
  ;
  print_2050 // !'@1378.(Func Str '@1378)
  ("'Expect 5'" // Str
  ) // '@1378
  ;
  print_2050 // !'@1380.(Func Float '@1380)
  (average_1373 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1380
  ;
}
// (Func Float3 T0)
function printVector_477(v)
{
  let xs = [x_134 // (Func Float3 Float)
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
  print_2050 // !'@1687.(Func (Array Float) '@1687)
  (xs // (Array Float)
  ) // '@1687
  ;
}
// (Func T0)
function simpleVectorTest_802()
{
  let v = vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3)]
  (4 // Int
    ,3 // Int
    ,0 // Int
  ) // Float3
  ;
  print_2050 // !'@1390.(Func Str '@1390)
  ("'Expect 5'" // Str
  ) // '@1390
  ;
  print_2050 // !'@1392.(Func Float '@1392)
  (length_216 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ) // '@1392
  ;
  print_2050 // !'@1394.(Func Str '@1394)
  ("'Expect [4, 3, 0]'" // Str
  ) // '@1394
  ;
  print_2050 // !'@1396.(Func Float3 '@1396)
  (v // Float3
  ) // '@1396
  ;
  let v1 = vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3)]
  (1 // Int
    ,0 // Int
    ,0 // Int
  ) // Float3
  ;
  let v2 = vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3)]
  (0 // Int
    ,1 // Int
    ,0 // Int
  ) // Float3
  ;
  print_2050 // !'@1398.(Func Str '@1398)
  ("'Expect [0,0,1]'" // Str
  ) // '@1398
  ;
  print_2050 // !'@1400.(Func Float3 '@1400)
  (cross_403 // (Func Float3 Float3 Float3)
    (v1 // Float3
      ,v2 // Float3
    ) // Float3
  ) // '@1400
  ;
  print_2050 // !'@1402.(Func Str '@1402)
  ("'Expect [1,1,0]'" // Str
  ) // '@1402
  ;
  let v3 = op_add_1255 // [!'@1425.(Func '@1425 '@1425 '@1425) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v1 // Float3
    ,v2 // Float3
  ) // Float3
  ;
  print_2050 // !'@1405.(Func Float3 '@1405)
  (v3 // Float3
  ) // '@1405
  ;
  print_2050 // !'@1407.(Func Str '@1407)
  ("'Expect [1,0,0]'" // Str
  ) // '@1407
  ;
  let v4 = op_sub_1320 // [!'@1426.(Func '@1426 '@1426 '@1426) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v3 // Float3
    ,v2 // Float3
  ) // Float3
  ;
  print_2050 // !'@1410.(Func Float3 '@1410)
  (v4 // Float3
  ) // '@1410
  ;
  print_2050 // !'@1412.(Func Str '@1412)
  ("'Expect [20,15,0]'" // Str
  ) // '@1412
  ;
  let v5 = op_mul_1385 // [!'@1427.(Func '@1427 '@1427 '@1427) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,vector_120 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3)]
    (5 // Float
    ) // Float3
  ) // Float3
  ;
  print_2050 // !'@1415.(Func Float3 '@1415)
  (v5 // Float3
  ) // '@1415
  ;
  print_2050 // !'@1417.(Func Str '@1417)
  ("'Expect [1,1,0]'" // Str
  ) // '@1417
  ;
  print_2050 // !'@1419.(Func Float3 '@1419)
  (op_add_1255 // [!'@1428.(Func '@1428 '@1428 '@1428) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v1 // Float3
      ,v2 // Float3
    ) // Float3
  ) // '@1419
  ;
  print_2050 // !'@1422.(Func Str '@1422)
  ("'Expect [0.8, 0.6, 0]'" // Str
  ) // '@1422
  ;
  print_2050 // !'@1424.(Func Float3 '@1424)
  (normal_300 // (Func Float3 Float3)
    (v // Float3
    ) // Float3
  ) // '@1424
  ;
}
// (Func Mesh Float Mesh)
function colorModifier_897(g, amount)
{
  return setVertexColors_226 // (Func Mesh (Array Float3) Mesh)
  (g // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (uvBuffer_2170 // (Func Mesh (Array Float3))
      (g // Mesh
      ) // (Array Float3)
      ,(v) => vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3)]
      (op_add_842 // [!'@717.(Func '@717 '@717 '@717) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@716.(Func '@716 '@716 '@716) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (sin_449 // (Func Float Float)
            (op_mul_886 // [!'@715.(Func '@715 '@715 '@715) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_mul_886 // [!'@714.(Func '@714 '@714 '@714) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
        ,sin_449 // (Func Float Float)
        (amount // Float
        ) // Float
        ,op_add_842 // [!'@721.(Func '@721 '@721 '@721) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@720.(Func '@720 '@720 '@720) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (cos_353 // (Func Float Float)
            (op_mul_886 // [!'@719.(Func '@719 '@719 '@719) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_mul_886 // [!'@718.(Func '@718 '@718 '@718) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
// (Func Mesh Float Mesh)
function pushModifer_940(g, amount)
{
  return translate_2338 // [(Func Mesh Float3 Mesh) | (Func Mesh (Array Float3) Mesh)]
  (g // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (normalBuffer_2206 // (Func Mesh (Array Float3))
      (g // Mesh
      ) // (Array Float3)
      ,(n) => op_mul_1385 // [!'@1532.(Func '@1532 '@1532 '@1532) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (n // Float3
        ,vector_120 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3)]
        (amount // Float
        ) // Float3
      ) // Float3
       // (Func Float3 Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float Mesh)
function scaleModifier_965(g, amount)
{
  return scale_2367 // (Func Mesh Float3 Mesh)
  (g // Mesh
    ,vector_120 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3)]
    (amount // Float
    ) // Float3
  ) // Mesh
  ;
}
// (Func (Array (Func Mesh Float Mesh)))
function modifiers_978()
{
  return [scaleModifier_965 // (Func Mesh Float Mesh)
  ,pushModifer_940 // (Func Mesh Float Mesh)
  ,colorModifier_897 // (Func Mesh Float Mesh)
  ] // (Array (Func Mesh Float Mesh))
  ;
}
// (Func (Array Mesh))
function primitives_1019()
{
  return [sphere_1787 // [(Func Int Mesh) | (Func Mesh)]
  () // Mesh
  ,cylinder_1867 // [(Func Int Mesh) | (Func Mesh)]
  () // Mesh
  ,torus_2127 // [(Func Float Float Int Mesh) | (Func Mesh)]
  () // Mesh
  ,klein_2711 // (Func Mesh)
  () // Mesh
  ,plane_2851 // (Func Mesh)
  () // Mesh
  ,mobius_2981 // (Func Mesh)
  () // Mesh
  ,tetrahedron // Mesh
  ,cube // Mesh
  ,octahedron // Mesh
  ,dodecahedron // Mesh
  ,icosahedron // Mesh
  ] // (Array Mesh)
  ;
}

return {main : main_39,
simpleArrayTest : simpleArrayTest_439,
printVector : printVector_477,
simpleVectorTest : simpleVectorTest_802,
colorModifier : colorModifier_897,
pushModifer : pushModifer_940,
scaleModifier : scaleModifier_965,
modifiers : modifiers_978,
primitives : primitives_1019,
};
})();
heron.main()