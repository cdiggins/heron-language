// Generated using Heron on Mon May 07 2018 22:39:54 GMT-0400 (Eastern Daylight Time)
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
  (op_mod_930 // [!'@891.(Func '@891 '@891 '@891) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@892.(Func '@892 '@892 '@892) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@887.(Func '@887 '@887 '@887) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@888.(Func '@888 '@888 '@888) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@889.(Func '@889 '@889 '@889) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return immutable_1904 // !'@1741.(Func (ArrayBuilder '@1741) (Array '@1741))
  (mutable_1785 // !'@1741.(Func (Array '@1741) (ArrayBuilder '@1741))
    (xs // !'@1741.(Array '@1741)
    ) // !'@1741.(ArrayBuilder '@1741)
  ) // !'@1741.(Array '@1741)
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
  (op_sub_1320 // [!'@995.(Func '@995 '@995 '@995) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_1320 // [!'@1000.(Func '@1000 '@1000 '@1000) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_sub_542 // [!'@1740.(Func '@1740 '@1740 '@1740) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,op_mul_886 // [!'@1739.(Func '@1739 '@1739 '@1739) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_566 // [!'@1738.(Func '@1738 '@1738 '@1738) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_add_842 // [!'@1224.(Func '@1224 '@1224 '@1224) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1222.(Func '@1222 '@1222 '@1222) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,op_sub_864 // [!'@1221.(Func '@1221 '@1221 '@1221) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,x // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1223.(Func '@1223 '@1223 '@1223) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return [x // '@1899
  ] // !'@1899.(Array '@1899)
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
  return array_1691 // [!'@1469.(Func Int (Func Int '@1469) (Array '@1469)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1468.(Array '@1468) Int)
    (xs // !'@1468.(Array '@1468)
    ) // Int
    ,f // !'@1467.(Func Int '@1467)
  ) // !'@1467.(Array '@1467)
  ;
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_710 // !'@1274.(Func '@1274 '@1274 Bool)
  (x // '@1274
    ,y // '@1274
  ) // Bool
   ? x // '@1274
   : y // '@1274
   // '@1274
  ;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_662 // !'@1295.(Func '@1295 '@1295 Bool)
  (x // '@1295
    ,y // '@1295
  ) // Bool
   ? x // '@1295
   : y // '@1295
   // '@1295
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1807.(Array '@1807) Int)
    (xs // !'@1807.(Array '@1807)
    ) // Int
    ,count_1711 // (Func !'@1807.(Array '@1807) Int)
    (ys // !'@1807.(Array '@1807)
    ) // Int
  ) // Bool
   ? xs // !'@1807.(Array '@1807)
   : ys // !'@1807.(Array '@1807)
   // !'@1807.(Array '@1807)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_662 // (Func Int Int Bool)
  (count_1711 // (Func !'@1231.(Array '@1231) Int)
    (xs // !'@1231.(Array '@1231)
    ) // Int
    ,count_1711 // (Func !'@1231.(Array '@1231) Int)
    (ys // !'@1231.(Array '@1231)
    ) // Int
  ) // Bool
   ? xs // !'@1231.(Array '@1231)
   : ys // !'@1231.(Array '@1231)
   // !'@1231.(Array '@1231)
  ;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@1054.(Array '@1054) Int)
    (xs // !'@1054.(Array '@1054)
    ) // Int
    ,0 // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53 // !'@1782.(Func (Array Int) (Func Int '@1782) (Array '@1782))
  (indices // (Array Int)
    ,(i) => at_1737 // !'@1782.(Func !'@1782.(Array '@1782) Int '@1782)
    (xs // !'@1782.(Array '@1782)
      ,i // Int
    ) // '@1782
     // !'@1782.(Func Int '@1782)
  ) // !'@1782.(Array '@1782)
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
  (count_1711 // (Func !'@1060.(Array '@1060) Int)
    (xs // !'@1060.(Array '@1060)
    ) // Int
    ,count_1711 // (Func !'@1061.(Array '@1061) Int)
    (ys // !'@1061.(Array '@1061)
    ) // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_537(xs, p)
{
  let ys = mutable_1785 // !'@1075.(Func (Array '@1075) (ArrayBuilder '@1075))
  (xs // !'@1075.(Array '@1075)
  ) // !'@1075.(ArrayBuilder '@1075)
  ;
  let i = 0 // Int
  ;
  for (let i0=0; i0 < xs // !'@1075.(Array '@1075)
  .length; ++i0)
  {
    const x = xs // !'@1075.(Array '@1075)
    [i0];
    {
      if (p // !'@1075.(Func '@1075 Bool)
        (x // '@1075
        ) // Bool
      )
      {
        ys = set_1881 // !'@1075.(Func (ArrayBuilder '@1075) Int '@1075 (ArrayBuilder '@1075))
        (ys // !'@1075.(ArrayBuilder '@1075)
          ,i++ // Int
          ,x // '@1075
        ) // !'@1075.(ArrayBuilder '@1075)
         // !'@1075.(ArrayBuilder '@1075)
        ;
      }
      else
      { }
    }
  }
  return take_967 // [!'@1082.(Func (Array '@1082) Int (Array '@1082)) | !'@1083.(Func (Array '@1083) Int Int (Array '@1083))]
  (immutable_1904 // !'@1075.(Func (ArrayBuilder '@1075) (Array '@1075))
    (ys // !'@1075.(ArrayBuilder '@1075)
    ) // !'@1075.(Array '@1075)
    ,i // Int
  ) // !'@1075.(Array '@1075)
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
  if (empty_245 // (Func !'@1625.(Array '@1625) Bool)
    (xs // !'@1625.(Array '@1625)
    ) // Bool
  )
  {
    return xs // !'@1625.(Array '@1625)
    ;
  }
  else
  { }
  let ys = mutable_1785 // !'@1625.(Func (Array '@1625) (ArrayBuilder '@1625))
  (repeat_566 // !'@1625.(Func '@1625 Int (Array '@1625))
    (op_obr_cbr_2029 // !'@1625.(Func !'@1625.(Array '@1625) Int '@1625)
      (xs // !'@1625.(Array '@1625)
        ,0 // Int
      ) // '@1625
      ,count_1711 // (Func !'@1625.(Array '@1625) Int)
      (xs // !'@1625.(Array '@1625)
      ) // Int
    ) // !'@1625.(Array '@1625)
  ) // !'@1625.(ArrayBuilder '@1625)
  ;
  for (let i1=0; i1 < op_dot_dot_1762 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1625.(Array '@1625) Int)
      (ys // !'@1625.(ArrayBuilder '@1625)
      ) // Int
    ) // (Array Int)
  .length; ++i1)
  {
    const i = op_dot_dot_1762 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1625.(Array '@1625) Int)
      (ys // !'@1625.(ArrayBuilder '@1625)
      ) // Int
    ) // (Array Int)
    [i1];
    {
      ys = set_1881 // !'@1625.(Func (ArrayBuilder '@1625) Int '@1625 (ArrayBuilder '@1625))
      (ys // !'@1625.(ArrayBuilder '@1625)
        ,i // Int
        ,op // !'@1625.(Func '@1625 '@1625 '@1625)
        (op_obr_cbr_2029 // !'@1625.(Func !'@1625.(Array '@1625) Int '@1625)
          (xs // !'@1625.(Array '@1625)
            ,i // Int
          ) // '@1625
          ,op_obr_cbr_2029 // !'@1625.(Func !'@1625.(Array '@1625) Int '@1625)
          (ys // !'@1625.(ArrayBuilder '@1625)
            ,op_sub_754 // [!'@1627.(Func '@1627 '@1627 '@1627) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (i // Int
              ,1 // Int
            ) // Int
          ) // '@1625
        ) // '@1625
      ) // !'@1625.(ArrayBuilder '@1625)
       // !'@1625.(ArrayBuilder '@1625)
      ;
    }
  }
  return immutable_1904 // !'@1625.(Func (ArrayBuilder '@1625) (Array '@1625))
  (ys // !'@1625.(ArrayBuilder '@1625)
  ) // !'@1625.(Array '@1625)
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
  return map_53 // !'@1015.(Func (Array Int) (Func Int '@1015) (Array '@1015))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (from // Int
      ,to // Int
    ) // (Array Int)
    ,(i) => at_1737 // !'@1015.(Func !'@1015.(Array '@1015) Int '@1015)
    (xs // !'@1015.(Array '@1015)
      ,i // Int
    ) // '@1015
     // !'@1015.(Func Int '@1015)
  ) // !'@1015.(Array '@1015)
  ;
}
// (Func (Array T0) Int (Array T0))
function stride_805(xs, n)
{
  return map_53 // !'@1867.(Func (Array Int) (Func Int '@1867) (Array '@1867))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1872.(Func '@1872 '@1872 '@1872) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1867.(Array '@1867) Int)
        (xs // !'@1867.(Array '@1867)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1867.(Func !'@1867.(Array '@1867) Int '@1867)
    (xs // !'@1867.(Array '@1867)
      ,op_mul_776 // [!'@1873.(Func '@1873 '@1873 '@1873) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@1867
     // !'@1867.(Func Int '@1867)
  ) // !'@1867.(Array '@1867)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function stride_860(xs, from, n)
{
  return map_53 // !'@1851.(Func (Array Int) (Func Int '@1851) (Array '@1851))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1857.(Func '@1857 '@1857 '@1857) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1851.(Array '@1851) Int)
        (xs // !'@1851.(Array '@1851)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1851.(Func !'@1851.(Array '@1851) Int '@1851)
    (xs // !'@1851.(Array '@1851)
      ,op_add_732 // [!'@1859.(Func '@1859 '@1859 '@1859) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (from // Int
        ,op_mul_776 // [!'@1858.(Func '@1858 '@1858 '@1858) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,n // Int
        ) // Int
      ) // Int
    ) // '@1851
     // !'@1851.(Func Int '@1851)
  ) // !'@1851.(Array '@1851)
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_896(xs, n)
{
  return map_53 // !'@1883.(Func (Array Int) (Func Int (Array '@1883)) (Array (Array '@1883)))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => stride_860 // [!'@1884.(Func (Array '@1884) Int (Array '@1884)) | !'@1885.(Func (Array '@1885) Int Int (Array '@1885))]
    (xs // !'@1883.(Array '@1883)
      ,i // Int
      ,n // Int
    ) // !'@1883.(Array '@1883)
     // !'@1883.(Func Int (Array '@1883))
  ) // (Array !'@1883.(Array '@1883))
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_947(xs, n)
{
  return map_53 // !'@1823.(Func (Array Int) (Func Int (Array '@1823)) (Array (Array '@1823)))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => slice_758 // !'@1823.(Func (Array '@1823) Int Int (Array '@1823))
    (xs // !'@1823.(Array '@1823)
      ,op_mul_776 // [!'@1827.(Func '@1827 '@1827 '@1827) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
      ,op_mul_776 // [!'@1829.(Func '@1829 '@1829 '@1829) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_add_732 // [!'@1828.(Func '@1828 '@1828 '@1828) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
        ,n // Int
      ) // Int
    ) // !'@1823.(Array '@1823)
     // !'@1823.(Func Int (Array '@1823))
  ) // (Array !'@1823.(Array '@1823))
  ;
}
// (Func (Array T0) Int (Array T0))
function take_967(xs, n)
{
  return slice_758 // !'@1016.(Func (Array '@1016) Int Int (Array '@1016))
  (xs // !'@1016.(Array '@1016)
    ,0 // Int
    ,n // Int
  ) // !'@1016.(Array '@1016)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function take_994(xs, i, n)
{
  return take_967 // [!'@1035.(Func (Array '@1035) Int (Array '@1035)) | !'@1036!'@1037!'@1038!'@1039.(Func '@1036 '@1037 '@1038 '@1039)]
  (skip_1023 // !'@1034.(Func (Array '@1034) Int (Array '@1034))
    (xs // !'@1034.(Array '@1034)
      ,i // Int
    ) // !'@1034.(Array '@1034)
    ,n // Int
  ) // !'@1034.(Array '@1034)
  ;
}
// (Func (Array T0) Int (Array T0))
function skip_1023(xs, n)
{
  return slice_758 // !'@1032.(Func (Array '@1032) Int Int (Array '@1032))
  (xs // !'@1032.(Array '@1032)
    ,n // Int
    ,op_sub_754 // [!'@1033.(Func '@1033 '@1033 '@1033) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1032.(Array '@1032) Int)
      (xs // !'@1032.(Array '@1032)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@1032.(Array '@1032)
  ;
}
// (Func (Array T0) Int (Array T0))
function drop_1050(xs, n)
{
  return take_967 // [!'@1044.(Func (Array '@1044) Int (Array '@1044)) | !'@1045.(Func (Array '@1045) Int Int (Array '@1045))]
  (xs // !'@1042.(Array '@1042)
    ,op_sub_754 // [!'@1043.(Func '@1043 '@1043 '@1043) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1042.(Array '@1042) Int)
      (xs // !'@1042.(Array '@1042)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@1042.(Array '@1042)
  ;
}
// (Func (Array T0) Int (Array T0))
function last_1077(xs, n)
{
  return skip_1023 // !'@1210.(Func (Array '@1210) Int (Array '@1210))
  (xs // !'@1210.(Array '@1210)
    ,op_sub_754 // [!'@1211.(Func '@1211 '@1211 '@1211) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1210.(Array '@1210) Int)
      (xs // !'@1210.(Array '@1210)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@1210.(Array '@1210)
  ;
}
// (Func (Array T0) T1 (Array T0))
function reverse_1121(xs, n)
{
  return map_53 // !'@1762.(Func (Array Int) (Func Int '@1762) (Array '@1762))
  (indices_292 // (Func !'@1762.(Array '@1762) (Array Int))
    (xs // !'@1762.(Array '@1762)
    ) // (Array Int)
    ,(i) => op_obr_cbr_2029 // !'@1762.(Func !'@1762.(Array '@1762) Int '@1762)
    (xs // !'@1762.(Array '@1762)
      ,op_sub_754 // [!'@1770.(Func '@1770 '@1770 '@1770) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1769.(Func '@1769 '@1769 '@1769) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func !'@1762.(Array '@1762) Int)
          (xs // !'@1762.(Array '@1762)
          ) // Int
          ,1 // Int
        ) // Int
        ,i // Int
      ) // Int
    ) // '@1762
     // !'@1762.(Func Int '@1762)
  ) // !'@1762.(Array '@1762)
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
  return gen_1145 // !'@779.(Func Int (Func Int '@779) (Array '@779))
  (op_sub_754 // [!'@786.(Func '@786 '@786 '@786) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@779.(Array '@779) Int)
      (xs // !'@779.(Array '@779)
      ) // Int
      ,n // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,from // Int
    ) // Bool
     ? op_obr_cbr_2029 // !'@779.(Func !'@779.(Array '@779) Int '@779)
    (xs // !'@779.(Array '@779)
      ,i // Int
    ) // '@779
     : op_obr_cbr_2029 // !'@779.(Func !'@779.(Array '@779) Int '@779)
    (xs // !'@779.(Array '@779)
      ,op_add_732 // [!'@787.(Func '@787 '@787 '@787) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@779
     // '@779
     // !'@779.(Func Int '@779)
  ) // !'@779.(Array '@779)
  ;
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1312(xs, from, ys)
{
  return concat_1213 // !'@1838.(Func (Array '@1838) (Array '@1838) (Array '@1838))
  (concat_1213 // !'@1838.(Func (Array '@1838) (Array '@1838) (Array '@1838))
    (take_967 // [!'@1841.(Func (Array '@1841) Int (Array '@1841)) | !'@1842.(Func (Array '@1842) Int Int (Array '@1842))]
      (xs // !'@1838.(Array '@1838)
        ,from // Int
      ) // !'@1838.(Array '@1838)
      ,ys // !'@1838.(Array '@1838)
    ) // !'@1838.(Array '@1838)
    ,skip_1023 // !'@1838.(Func (Array '@1838) Int (Array '@1838))
    (xs // !'@1838.(Array '@1838)
      ,from // Int
    ) // !'@1838.(Array '@1838)
  ) // !'@1838.(Array '@1838)
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
    ,op_mul_886 // [!'@1725.(Func '@1725 '@1725 '@1725) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return reduce_1918 // !'@1283.(Func (Array '@1283) '@1283 (Func '@1283 '@1283 '@1283) '@1283)
  (xs // !'@1283.(Array '@1283)
    ,op_obr_cbr_2029 // !'@1283.(Func !'@1283.(Array '@1283) Int '@1283)
    (xs // !'@1283.(Array '@1283)
      ,0 // Int
    ) // '@1283
    ,min_140 // [!'@1286.(Func '@1286 '@1286 '@1286) | !'@1287!'@1288.(Func '@1287 '@1288)]
  ) // '@1286
  ;
}
// (Func (Array T0) T0)
function max_1417(xs)
{
  return reduce_1918 // !'@1304.(Func (Array '@1304) '@1304 (Func '@1304 '@1304 '@1304) '@1304)
  (xs // !'@1304.(Array '@1304)
    ,op_obr_cbr_2029 // !'@1304.(Func !'@1304.(Array '@1304) Int '@1304)
    (xs // !'@1304.(Array '@1304)
      ,0 // Int
    ) // '@1304
    ,max_165 // [!'@1307.(Func '@1307 '@1307 '@1307) | !'@1308!'@1309.(Func '@1308 '@1309)]
  ) // '@1307
  ;
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1483(xs, i, j)
{
  let tmp = op_obr_cbr_2029 // !'@1344.(Func !'@1344.(Array '@1344) Int '@1344)
  (xs // !'@1344.(ArrayBuilder '@1344)
    ,i // Int
  ) // '@1344
  ;
  xs = set_1881 // !'@1344.(Func (ArrayBuilder '@1344) Int '@1344 (ArrayBuilder '@1344))
  (xs // !'@1344.(Array '@1344)
    ,i // Int
    ,op_obr_cbr_2029 // !'@1344.(Func !'@1344.(Array '@1344) Int '@1344)
    (xs // !'@1344.(Array '@1344)
      ,j // Int
    ) // '@1344
  ) // !'@1344.(ArrayBuilder '@1344)
   // !'@1344.(ArrayBuilder '@1344)
  ;
  xs = set_1881 // !'@1344.(Func (ArrayBuilder '@1344) Int '@1344 (ArrayBuilder '@1344))
  (xs // !'@1344.(ArrayBuilder '@1344)
    ,j // Int
    ,tmp // '@1344
  ) // !'@1344.(ArrayBuilder '@1344)
   // !'@1344.(ArrayBuilder '@1344)
  ;
  return xs // !'@1344.(ArrayBuilder '@1344)
  ;
}
// (Func (Array T0) Int Int Int)
function partition_1598(a, lo, hi)
{
  let p = op_obr_cbr_2029 // !'@1332.(Func !'@1332.(Array '@1332) Int '@1332)
  (a // !'@1332.(Array '@1332)
    ,lo // Int
  ) // '@1332
  ;
  let i = op_sub_754 // [!'@1349.(Func '@1349 '@1349 '@1349) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (lo // Int
    ,1 // Int
  ) // Int
  ;
  let j = op_add_732 // [!'@1350.(Func '@1350 '@1350 '@1350) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    while (op_lt_686 // !'@1332.(Func '@1332 '@1332 Bool)
      (op_obr_cbr_2029 // !'@1332.(Func !'@1332.(Array '@1332) Int '@1332)
        (a // !'@1332.(Array '@1332)
          ,i // Int
        ) // '@1332
        ,p // '@1332
      ) // Bool
    )
    do
    {
      j-- // Int
      ;
    }
    while (op_gt_638 // !'@1332.(Func '@1332 '@1332 Bool)
      (op_obr_cbr_2029 // !'@1332.(Func !'@1332.(Array '@1332) Int '@1332)
        (a // !'@1332.(Array '@1332)
          ,j // Int
        ) // '@1332
        ,p // '@1332
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
    swapElements_1483 // !'@1332.(Func (ArrayBuilder '@1332) Int Int (ArrayBuilder '@1332))
    (a // !'@1332.(Array '@1332)
      ,i // Int
      ,j // Int
    ) // !'@1332.(ArrayBuilder '@1332)
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
    let p = partition_1598 // (Func !'@1351.(Array '@1351) Int Int Int)
    (a // !'@1351.(Array '@1351)
      ,lo // Int
      ,hi // Int
    ) // Int
    ;
    qsort_1667 // !'@1355.(Func !'@1351.(Array '@1351) Int Int '@1355)
    (a // !'@1351.(Array '@1351)
      ,lo // Int
      ,p // Int
    ) // '@1355
    ;
    qsort_1667 // !'@1359.(Func !'@1351.(Array '@1351) Int Int '@1359)
    (a // !'@1351.(Array '@1351)
      ,op_add_732 // [!'@1361.(Func '@1361 '@1361 '@1361) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (p // Int
        ,1 // Int
      ) // Int
      ,hi // Int
    ) // '@1359
    ;
  }
  else
  { }
  return a // !'@1351.(Array '@1351)
  ;
}
// (Func (Array T0) (Array T0))
function sort_1697(xs)
{
  return immutable_1904 // !'@1363.(Func (ArrayBuilder '@1363) (Array '@1363))
  (qsort_1667 // !'@1363.(Func (Array '@1363) Int Int (Array '@1363))
    (mutable_1785 // !'@1363.(Func (Array '@1363) (ArrayBuilder '@1363))
      (xs // !'@1363.(Array '@1363)
      ) // !'@1363.(ArrayBuilder '@1363)
      ,0 // Int
      ,op_sub_754 // [!'@1366.(Func '@1366 '@1366 '@1366) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1363.(Array '@1363) Int)
        (xs // !'@1363.(Array '@1363)
        ) // Int
        ,1 // Int
      ) // Int
    ) // !'@1363.(Array '@1363)
  ) // !'@1363.(Array '@1363)
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
  (op_mod_820 // [!'@1396.(Func '@1396 '@1396 '@1396) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1395.(Func '@1395 '@1395 '@1395) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,op_div_798 // [!'@1398.(Func '@1398 '@1398 '@1398) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1397.(Func '@1397 '@1397 '@1397) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
  ) // Int
   : op_add_732 // [!'@1403.(Func '@1403 '@1403 '@1403) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (ys // (Array Int)
      ,op_div_798 // [!'@1400.(Func '@1400 '@1400 '@1400) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1399.(Func '@1399 '@1399 '@1399) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func (Array Int) Int)
          (ys // (Array Int)
          ) // Int
          ,2 // Int
        ) // Int
        ,2 // Int
      ) // Int
    ) // Int
    ,op_div_798 // [!'@1402.(Func '@1402 '@1402 '@1402) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2029 // (Func (Array Int) Int Int)
      (ys // (Array Int)
        ,op_div_798 // [!'@1401.(Func '@1401 '@1401 '@1401) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
      ,count_1711 // (Func !'@1116.(Array '@1116) Int)
      (xs // !'@1116.(Array '@1116)
      ) // Int
    ) // Bool
  ) // Bool
  ;
}
// (Func (Array T0) T0)
function last_1851(xs)
{
  return op_obr_cbr_2029 // !'@1202.(Func !'@1202.(Array '@1202) Int '@1202)
  (xs // !'@1202.(Array '@1202)
    ,op_sub_754 // [!'@1203.(Func '@1203 '@1203 '@1203) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1202.(Array '@1202) Int)
      (xs // !'@1202.(Array '@1202)
      ) // Int
      ,1 // Int
    ) // Int
  ) // '@1202
  ;
}
// (Func (Array T0) T0)
function first_1866(xs)
{
  return op_obr_cbr_2029 // !'@1087.(Func !'@1087.(Array '@1087) Int '@1087)
  (xs // !'@1087.(Array '@1087)
    ,0 // Int
  ) // '@1087
  ;
}
// (Func (Array T0) (Array T0))
function tail_1881(xs)
{
  return skip_1023 // !'@1890.(Func (Array '@1890) Int (Array '@1890))
  (xs // !'@1890.(Array '@1890)
    ,1 // Int
  ) // !'@1890.(Array '@1890)
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
  return reduce_1918 // !'@1096.(Func (Array (Array '@1096)) (Array '@1096) (Func (Array '@1096) (Array '@1096) (Array '@1096)) (Array '@1096))
  (xs // (Array !'@1096.(Array '@1096))
    ,[] // !'@1096.(Array '@1096)
    ,concat_1213 // !'@1096.(Func (Array '@1096) (Array '@1096) (Array '@1096))
  ) // !'@1096.(Array '@1096)
  ;
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T1))
function flatMap_1957(xs, f)
{
  return flatten_1935 // !'@1098.(Func (Array (Array '@1098)) (Array '@1098))
  (map_53 // !'@1099!'@1098.(Func (Array '@1099) (Func '@1099 (Array '@1098)) (Array (Array '@1098)))
    (xs // !'@1099.(Array '@1099)
      ,f // !'@1099!'@1098.(Func '@1099 (Array '@1098))
    ) // (Array !'@1098.(Array '@1098))
  ) // !'@1098.(Array '@1098)
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
  return map_53 // !'@1790!'@1786.(Func (Array '@1790) (Func '@1790 '@1786) (Array '@1786))
  (xs // !'@1790.(Array '@1790)
    ,(_) => x // '@1786
     // !'@1790!'@1786.(Func '@1790 '@1786)
  ) // !'@1786.(Array '@1786)
  ;
}
// Module heron:geometry.mesh:0.1
// file input\geometry-mesh.heron
// imports heron:std.array:0.1
// imports heron:geometry.vector:0.1
// Mesh
const tetrahedron = mesh_80 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@549!'@550!'@551.(Func '@549 '@550 '@551) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
(toVectors_2385 // (Func (Array Float) (Array Float3))
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
(toVectors_2385 // (Func (Array Float) (Array Float3))
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
(toVectors_2385 // (Func (Array Float) (Array Float3))
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
    (toVectors_2385 // (Func (Array Float) (Array Float3))
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
  (toVectors_2385 // (Func (Array Float) (Array Float3))
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
  return computeVertexNormals_3465 // (Func Mesh Mesh)
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
  return mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@1528!'@1529!'@1530.(Func '@1528 '@1529 '@1530) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
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
  return mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@1800!'@1801!'@1802.(Func '@1800 '@1801 '@1802) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
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
  let cols = op_div_798 // [!'@914.(Func '@914 '@914 '@914) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func !'@856.(Array '@856) Int)
    (vertices // !'@856.(Array '@856)
    ) // Int
    ,rows // Int
  ) // Int
  ;
  let nr = connectRows // Bool
   ? rows // Int
   : op_sub_754 // [!'@915.(Func '@915 '@915 '@915) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (rows // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let nc = connectCols // Bool
   ? cols // Int
   : op_sub_754 // [!'@916.(Func '@916 '@916 '@916) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
          let a = op_add_732 // [!'@918.(Func '@918 '@918 '@918) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@917.(Func '@917 '@917 '@917) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let b = op_add_732 // [!'@922.(Func '@922 '@922 '@922) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@920.(Func '@920 '@920 '@920) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@919.(Func '@919 '@919 '@919) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@921.(Func '@921 '@921 '@921) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let c = op_add_732 // [!'@928.(Func '@928 '@928 '@928) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@924.(Func '@924 '@924 '@924) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@923.(Func '@923 '@923 '@923) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@927.(Func '@927 '@927 '@927) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@926.(Func '@926 '@926 '@926) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@925.(Func '@925 '@925 '@925) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let d = op_add_732 // [!'@932.(Func '@932 '@932 '@932) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@931.(Func '@931 '@931 '@931) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@930.(Func '@930 '@930 '@930) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@929.(Func '@929 '@929 '@929) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_add_518 // [!'@1755.(Func '@1755 '@1755 '@1755) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (from // '@1750
    ,op_mul_566 // [!'@1754.(Func '@1754 '@1754 '@1754) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // '@1750
      ,length // '@1750
    ) // '@1750
  ) // '@1750
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
  (op_sub_754 // [!'@938.(Func '@938 '@938 '@938) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_754 // [!'@939.(Func '@939 '@939 '@939) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    (op_add_842 // [!'@942.(Func '@942 '@942 '@942) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@941.(Func '@941 '@941 '@941) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@940.(Func '@940 '@940 '@940) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,uMax // Float
          ) // Float
          ,uLength // Float
        ) // Float
        ,uStart // Float
      ) // Float
      ,op_add_842 // [!'@945.(Func '@945 '@945 '@945) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@944.(Func '@944 '@944 '@944) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@943.(Func '@943 '@943 '@943) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,(uvw) => normalFromUV_2258 // (Func Float Float (Func Float Float Float3) Float3)
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
  return mesh_2116 // [(Func (Array Float3) (Array Int) (Array Float3) (Array Float3) (Array Float3) Mesh) | (Func (Array Float3) Mesh) | !'@946!'@947!'@948.(Func '@946 '@947 '@948) | (Func (Array Float3) (Array Int) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) Mesh) | (Func (Array Float3) (Array Int) (Array Float3) (Array Float3) Mesh)]
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
  return meshFromUV_1659 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | !'@973!'@974!'@975.(Func '@973 '@974 '@975) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (f // (Func Float Float Float3)
    ,segments // Int
    ,true // Bool
  ) // Mesh
  ;
}
// (Func (Func Float Float Float3) Int Bool Mesh)
function meshFromUV_1659(f, segments, join)
{
  return meshFromUV_1605 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | !'@966!'@967!'@968.(Func '@966 '@967 '@968) | !'@969!'@970!'@971!'@972.(Func '@969 '@970 '@971 '@972)]
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
  (op_mul_886 // [!'@1652.(Func '@1652 '@1652 '@1652) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (cos_353 // (Func Float Float)
        (op_mul_886 // [!'@1649.(Func '@1649 '@1649 '@1649) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mul_886 // [!'@1648.(Func '@1648 '@1648 '@1648) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (u // Float
              ,2 // Float
            ) // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1651.(Func '@1651 '@1651 '@1651) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1650.(Func '@1650 '@1650 '@1650) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@1654.(Func '@1654 '@1654 '@1654) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1653.(Func '@1653 '@1653 '@1653) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1659.(Func '@1659 '@1659 '@1659) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1656.(Func '@1656 '@1656 '@1656) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1655.(Func '@1655 '@1655 '@1655) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1658.(Func '@1658 '@1658 '@1658) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1657.(Func '@1657 '@1657 '@1657) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return sphere_1776 // [(Func Int Mesh) | !'@1662.(Func '@1662)]
  (32 // Int
  ) // Mesh
  ;
}
// (Func Float Int Float3)
function cylinderPoint_1839(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (sin_449 // (Func Float Float)
    (op_mul_886 // [!'@985.(Func '@985 '@985 '@985) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@984.(Func '@984 '@984 '@984) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_776 // [!'@986.(Func '@986 '@986 '@986) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Int
      ,2 // Int
    ) // Int
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@988.(Func '@988 '@988 '@988) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@987.(Func '@987 '@987 '@987) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return cylinder_1856 // [(Func Int Mesh) | !'@990.(Func '@990)]
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
  (op_mul_886 // [!'@1698.(Func '@1698 '@1698 '@1698) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@1695.(Func '@1695 '@1695 '@1695) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@1694.(Func '@1694 '@1694 '@1694) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_886 // [!'@1693.(Func '@1693 '@1693 '@1693) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_886 // [!'@1692.(Func '@1692 '@1692 '@1692) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,2 // Float
              ) // Float
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,cos_353 // (Func Float Float)
      (op_mul_886 // [!'@1697.(Func '@1697 '@1697 '@1697) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1696.(Func '@1696 '@1696 '@1696) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1705.(Func '@1705 '@1705 '@1705) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@1702.(Func '@1702 '@1702 '@1702) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@1701.(Func '@1701 '@1701 '@1701) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_886 // [!'@1700.(Func '@1700 '@1700 '@1700) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_886 // [!'@1699.(Func '@1699 '@1699 '@1699) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,2 // Float
              ) // Float
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1704.(Func '@1704 '@1704 '@1704) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1703.(Func '@1703 '@1703 '@1703) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1708.(Func '@1708 '@1708 '@1708) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (r2 // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@1707.(Func '@1707 '@1707 '@1707) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1706.(Func '@1706 '@1706 '@1706) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
// (Func Float T0 (Func Float T0 Float3) Float3 Float Float3)
function tangentFromUV_2113(u, v, f, p, eps)
{
  return op_gt_eq_662 // (Func Float Float Bool)
  (op_sub_864 // [!'@843.(Func '@843 '@843 '@843) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (u // Float
      ,eps // Float
    ) // Float
    ,0 // Int
  ) // Bool
   ? op_sub_1320 // [!'@845.(Func '@845 '@845 '@845) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (p // Float3
    ,f // !'@831.(Func Float '@831 Float3)
    (op_sub_864 // [!'@844.(Func '@844 '@844 '@844) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (u // Float
        ,eps // Float
      ) // Float
      ,v // '@831
    ) // Float3
  ) // Float3
   : op_sub_1320 // [!'@847.(Func '@847 '@847 '@847) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (f // !'@831.(Func Float '@831 Float3)
    (op_add_842 // [!'@846.(Func '@846 '@846 '@846) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (u // Float
        ,eps // Float
      ) // Float
      ,v // '@831
    ) // Float3
    ,p // Float3
  ) // Float3
   // Float3
  ;
}
// (Func T0 Float (Func T0 Float Float3) Float3 Float Float3)
function cotangentFromUV_2189(u, v, f, p, eps)
{
  return op_gt_eq_662 // (Func Float Float Bool)
  (op_sub_864 // [!'@766.(Func '@766 '@766 '@766) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float
      ,eps // Float
    ) // Float
    ,0 // Int
  ) // Bool
   ? op_sub_1320 // [!'@768.(Func '@768 '@768 '@768) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (p // Float3
    ,f // !'@749.(Func '@749 Float Float3)
    (u // '@749
      ,op_sub_864 // [!'@767.(Func '@767 '@767 '@767) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (v // Float
        ,eps // Float
      ) // Float
    ) // Float3
  ) // Float3
   : op_sub_1320 // [!'@770.(Func '@770 '@770 '@770) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (f // !'@749.(Func '@749 Float Float3)
    (u // '@749
      ,op_add_842 // [!'@769.(Func '@769 '@769 '@769) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (v // Float
        ,eps // Float
      ) // Float
    ) // Float3
    ,p // Float3
  ) // Float3
   // Float3
  ;
}
// (Func Float Float (Func Float Float Float3) Float3)
function normalFromUV_2258(u, v, f)
{
  return ((eps) => ((p) => normal_300 // (Func Float3 Float3)
      (cross_403 // (Func Float3 Float3 Float3)
        (tangentFromUV_2113 // (Func Float Float (Func Float Float Float3) Float3 Float Float3)
          (u // Float
            ,v // Float
            ,f // (Func Float Float Float3)
            ,p // Float3
            ,eps // Float
          ) // Float3
          ,cotangentFromUV_2189 // (Func Float Float (Func Float Float Float3) Float3 Float Float3)
          (u // Float
            ,v // Float
            ,f // (Func Float Float Float3)
            ,p // Float3
            ,eps // Float
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
function torus_2271()
{
  return torus_1907 // [(Func Float Float Int Mesh) | !'@1711.(Func '@1711)]
  (2 // Int
    ,0.5 // Float
    ,32 // Int
  ) // Mesh
  ;
}
// (Func Mesh Int)
function vertexCount_2288(mesh)
{
  return count_1711 // (Func (Array Float3) Int)
  (vertexBuffer_2134 // (Func Mesh (Array Float3))
    (mesh // Mesh
    ) // (Array Float3)
  ) // Int
  ;
}
// (Func Mesh Int)
function faceCount_2309(mesh)
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
function toVectors_2385(xs)
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
function transform_2412(m, f)
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
function translate_2441(m, amount)
{
  return transform_2412 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_add_1255 // [!'@1546.(Func '@1546 '@1546 '@1546) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function translate_2482(m, vectors)
{
  return setVertices_188 // (Func Mesh (Array Float3) Mesh)
  (m // Mesh
    ,zip_372 // (Func (Array Float3) (Array Float3) (Func Float3 Float3 Float3) (Array Float3))
    (vertexBuffer_2134 // (Func Mesh (Array Float3))
      (m // Mesh
      ) // (Array Float3)
      ,vectors // (Array Float3)
      ,(p, v) => op_add_1255 // [!'@1557.(Func '@1557 '@1557 '@1557) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (p // Float3
        ,v // Float3
      ) // Float3
       // (Func Float3 Float3 Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function scale_2511(m, amount)
{
  return transform_2412 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_mul_1385 // [!'@1536.(Func '@1536 '@1536 '@1536) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function kleinPoint_2841(a, b)
{
  let u = op_mul_886 // [!'@1162.(Func '@1162 '@1162 '@1162) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1161.(Func '@1161 '@1161 '@1161) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,pi // Float
    ) // Float
    ,2 // Float
  ) // Float
  ;
  let v = op_mul_886 // [!'@1164.(Func '@1164 '@1164 '@1164) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1163.(Func '@1163 '@1163 '@1163) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    x = op_add_842 // [!'@1173.(Func '@1173 '@1173 '@1173) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1167.(Func '@1167 '@1167 '@1167) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1165.(Func '@1165 '@1165 '@1165) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (3 // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,op_add_842 // [!'@1166.(Func '@1166 '@1166 '@1166) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (1 // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1172.(Func '@1172 '@1172 '@1172) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1171.(Func '@1171 '@1171 '@1171) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1170.(Func '@1170 '@1170 '@1170) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (2 // Float
            ,op_sub_864 // [!'@1169.(Func '@1169 '@1169 '@1169) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (1 // Float
              ,op_div_908 // [!'@1168.(Func '@1168 '@1168 '@1168) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    z = op_sub_864 // [!'@1180.(Func '@1180 '@1180 '@1180) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1174.(Func '@1174 '@1174 '@1174) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_negate_1659 // (Func Float Float)
        (8 // Float
        ) // Float
        ,sin_449 // (Func Float Float)
        (u // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1179.(Func '@1179 '@1179 '@1179) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1178.(Func '@1178 '@1178 '@1178) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1177.(Func '@1177 '@1177 '@1177) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (2 // Float
            ,op_sub_864 // [!'@1176.(Func '@1176 '@1176 '@1176) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (1 // Float
              ,op_div_908 // [!'@1175.(Func '@1175 '@1175 '@1175) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    x = op_add_842 // [!'@1189.(Func '@1189 '@1189 '@1189) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1183.(Func '@1183 '@1183 '@1183) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1181.(Func '@1181 '@1181 '@1181) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (3 // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,op_add_842 // [!'@1182.(Func '@1182 '@1182 '@1182) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (1 // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1188.(Func '@1188 '@1188 '@1188) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1186.(Func '@1186 '@1186 '@1186) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (2 // Float
          ,op_sub_864 // [!'@1185.(Func '@1185 '@1185 '@1185) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (1 // Float
            ,op_div_908 // [!'@1184.(Func '@1184 '@1184 '@1184) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (cos_353 // (Func Float Float)
              (u // Float
              ) // Float
              ,2 // Float
            ) // Float
          ) // Float
        ) // Float
        ,cos_353 // (Func Float Float)
        (op_add_842 // [!'@1187.(Func '@1187 '@1187 '@1187) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
     // Float
    ;
    z = op_mul_886 // [!'@1190.(Func '@1190 '@1190 '@1190) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  y = op_mul_886 // [!'@1194.(Func '@1194 '@1194 '@1194) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1193.(Func '@1193 '@1193 '@1193) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (2 // Float
      ) // Float
      ,op_sub_864 // [!'@1192.(Func '@1192 '@1192 '@1192) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,op_div_908 // [!'@1191.(Func '@1191 '@1191 '@1191) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_div_908 // [!'@1195.(Func '@1195 '@1195 '@1195) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x // Float
      ,4 // Float
    ) // Float
    ,op_div_908 // [!'@1196.(Func '@1196 '@1196 '@1196) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y // Float
      ,4 // Float
    ) // Float
    ,op_div_908 // [!'@1197.(Func '@1197 '@1197 '@1197) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z // Float
      ,4 // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function klein_2855()
{
  return meshFromUV_1659 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (kleinPoint_2841 // (Func Float Float Float3)
    ,32 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function planeXYPoint_2876(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (u // Float
    ,v // Float
    ,0 // Int
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeXZPoint_2897(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (u // Float
    ,0 // Int
    ,v // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeYZPoint_2918(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (0 // Int
    ,u // Float
    ,v // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeYXPoint_2939(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (v // Float
    ,u // Float
    ,0 // Int
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeZXPoint_2960(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (v // Float
    ,0 // Int
    ,u // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeZYPoint_2981(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (0 // Int
    ,v // Float
    ,u // Float
  ) // Float3
  ;
}
// (Func Mesh)
function plane_2995()
{
  return meshFromUV_1659 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (planeXYPoint_2876 // (Func Float Float Float3)
    ,16 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function mobiusPoint_3111(a, b)
{
  let u = op_sub_864 // [!'@1498.(Func '@1498 '@1498 '@1498) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (a // Float
    ,0.5 // Float
  ) // Float
  ;
  let v = op_mul_886 // [!'@1500.(Func '@1500 '@1500 '@1500) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1499.(Func '@1499 '@1499 '@1499) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (b // Float
      ,2 // Float
    ) // Float
    ,pi // Float
  ) // Float
  ;
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@1504.(Func '@1504 '@1504 '@1504) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (cos_353 // (Func Float Float)
      (v // Float
      ) // Float
      ,op_add_518 // [!'@1503.(Func '@1503 '@1503 '@1503) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (2 // Int
        ,op_mul_886 // [!'@1502.(Func '@1502 '@1502 '@1502) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,cos_353 // (Func Float Float)
          (op_div_590 // [!'@1501.(Func '@1501 '@1501 '@1501) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (v // Float
              ,2 // Int
            ) // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1508.(Func '@1508 '@1508 '@1508) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (v // Float
      ) // Float
      ,op_add_518 // [!'@1507.(Func '@1507 '@1507 '@1507) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (2 // Int
        ,op_mul_886 // [!'@1506.(Func '@1506 '@1506 '@1506) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,cos_353 // (Func Float Float)
          (op_div_590 // [!'@1505.(Func '@1505 '@1505 '@1505) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (v // Float
              ,2 // Int
            ) // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1510.(Func '@1510 '@1510 '@1510) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (u // Float
      ,sin_449 // (Func Float Float)
      (op_div_590 // [!'@1509.(Func '@1509 '@1509 '@1509) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Int
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function mobius_3125()
{
  return meshFromUV_1659 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (mobiusPoint_3111 // (Func Float Float Float3)
    ,20 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Mesh Int Int Float3)
function facePoint_3167(mesh, f, i)
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
function faceNormal_3200(mesh, f)
{
  return normal_300 // (Func Float3 Float3)
  (cross_403 // (Func Float3 Float3 Float3)
    (faceSide1_3231 // (Func Mesh Int Float3)
      (mesh // Mesh
        ,f // Int
      ) // Float3
      ,faceSide2_3262 // (Func Mesh Int Float3)
      (mesh // Mesh
        ,f // Int
      ) // Float3
    ) // Float3
  ) // Float3
  ;
}
// (Func Mesh Int Float3)
function faceSide1_3231(mesh, f)
{
  return op_sub_1320 // [!'@305.(Func '@305 '@305 '@305) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (facePoint_3167 // (Func Mesh Int Int Float3)
    (mesh // Mesh
      ,f // Int
      ,1 // Int
    ) // Float3
    ,facePoint_3167 // (Func Mesh Int Int Float3)
    (mesh // Mesh
      ,f // Int
      ,0 // Int
    ) // Float3
  ) // Float3
  ;
}
// (Func Mesh Int Float3)
function faceSide2_3262(mesh, f)
{
  return op_sub_1320 // [!'@310.(Func '@310 '@310 '@310) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (facePoint_3167 // (Func Mesh Int Int Float3)
    (mesh // Mesh
      ,f // Int
      ,2 // Int
    ) // Float3
    ,facePoint_3167 // (Func Mesh Int Int Float3)
    (mesh // Mesh
      ,f // Int
      ,0 // Int
    ) // Float3
  ) // Float3
  ;
}
// (Func Mesh (Array Float3))
function faceNormals_3296(mesh)
{
  return map_53 // (Func (Array Int) (Func Int Float3) (Array Float3))
  (op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,faceCount_2309 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Int)
    ,(i) => faceNormal_3200 // (Func Mesh Int Float3)
    (mesh // Mesh
      ,i // Int
    ) // Float3
     // (Func Int Float3)
  ) // (Array Float3)
  ;
}
// (Func Mesh Mesh)
function computeVertexNormals_3465(mesh)
{
  let sums = mutable_1785 // (Func (Array Float3) (ArrayBuilder Float3))
  (repeat_566 // (Func Float3 Int (Array Float3))
    (origin // Float3
      ,vertexCount_2288 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Float3)
  ) // (ArrayBuilder Float3)
  ;
  let counts = mutable_1785 // (Func (Array Int) (ArrayBuilder Int))
  (repeat_566 // (Func Int Int (Array Int))
    (0 // Int
      ,vertexCount_2288 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Int)
  ) // (ArrayBuilder Int)
  ;
  for (let i7=0; i7 < op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,faceCount_2309 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Int)
  .length; ++i7)
  {
    const f = op_dot_dot_1762 // (Func Int Int (Array Int))
    (0 // Int
      ,faceCount_2309 // (Func Mesh Int)
      (mesh // Mesh
      ) // Int
    ) // (Array Int)
    [i7];
    {
      let normal = faceNormal_3200 // (Func Mesh Int Float3)
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
      ,(a, b) => normal_300 // (Func Float3 Float3)
      (op_div_1450 // [!'@420.(Func '@420 '@420 '@420) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (a // Float3
          ,vector_120 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func Float2 Float3)]
          (float_41 // (Func Int Float)
            (b // Int
            ) // Float
          ) // Float3
        ) // Float3
      ) // Float3
       // (Func Float3 Int Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Float3 Float3 Float3 Float3)
function applyRotation_3516(pos, rotXYZ, rotW)
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
function applyTRS_3557(pos, trans, rotXYZ, rotW, scale)
{
  return op_add_1255 // [!'@634.(Func '@634 '@634 '@634) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (applyRotation_3516 // (Func Float3 Float3 Float3 Float3)
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
  simpleArrayTest_439 // !'@1418.(Func '@1418)
  () // '@1418
  ;
  simpleVectorTest_802 // !'@1460.(Func '@1460)
  () // '@1460
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
  print_2050 // !'@1240.(Func Str '@1240)
  ("'Expect [1, 11, 3]'" // Str
  ) // '@1240
  ;
  print_2050 // !'@1242.(Func (Array Int) '@1242)
  (xs // (Array Int)
  ) // '@1242
  ;
  print_2050 // !'@1244.(Func Str '@1244)
  ("'Expect 1, 11, 3'" // Str
  ) // '@1244
  ;
  for (let i9=0; i9 < xs // (Array Int)
  .length; ++i9)
  {
    const x = xs // (Array Int)
    [i9];
    {
      print_2050 // !'@1247.(Func Int '@1247)
      (x // Int
      ) // '@1247
      ;
    }
  }
  print_2050 // !'@1249.(Func Str '@1249)
  ("'Expect 1'" // Str
  ) // '@1249
  ;
  print_2050 // !'@1251.(Func Int '@1251)
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (xs // (Array Int)
      ,0 // Int
    ) // Int
  ) // '@1251
  ;
  print_2050 // !'@1254.(Func Str '@1254)
  ("'Expect 3'" // Str
  ) // '@1254
  ;
  print_2050 // !'@1256.(Func Int '@1256)
  (count_1711 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1256
  ;
  print_2050 // !'@1259.(Func Str '@1259)
  ("'Expect 1'" // Str
  ) // '@1259
  ;
  print_2050 // !'@1261.(Func Int '@1261)
  (first_1866 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1261
  ;
  print_2050 // !'@1264.(Func Str '@1264)
  ("'Expect 3'" // Str
  ) // '@1264
  ;
  print_2050 // !'@1266.(Func Int '@1266)
  (last_1851 // [!'@1412.(Func (Array '@1412) Int (Array '@1412)) | !'@1413.(Func !'@1413.(Array '@1413) '@1413)]
    (xs // (Array Int)
    ) // Int
  ) // '@1266
  ;
  print_2050 // !'@1270.(Func Str '@1270)
  ("'Expect 1'" // Str
  ) // '@1270
  ;
  print_2050 // !'@1272.(Func Int '@1272)
  (min_1395 // [!'@1414.(Func '@1414 '@1414 '@1414) | !'@1415.(Func !'@1415.(Array '@1415) '@1415)]
    (xs // (Array Int)
    ) // Int
  ) // '@1272
  ;
  print_2050 // !'@1291.(Func Str '@1291)
  ("'Expect 11'" // Str
  ) // '@1291
  ;
  print_2050 // !'@1293.(Func Int '@1293)
  (max_1417 // [!'@1416.(Func '@1416 '@1416 '@1416) | !'@1417.(Func !'@1417.(Array '@1417) '@1417)]
    (xs // (Array Int)
    ) // Int
  ) // '@1293
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
  print_2050 // !'@1314.(Func Str '@1314)
  ("'Expect 5'" // Str
  ) // '@1314
  ;
  print_2050 // !'@1316.(Func Int '@1316)
  (op_obr_cbr_2029 // (Func (Array Int) Int Int)
    (ys // (ArrayBuilder Int)
      ,1 // Int
    ) // Int
  ) // '@1316
  ;
  print_2050 // !'@1319.(Func Str '@1319)
  ("'Expect 1, 3, 11'" // Str
  ) // '@1319
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
      print_2050 // !'@1370.(Func Int '@1370)
      (z // Int
      ) // '@1370
      ;
    }
  }
  print_2050 // !'@1372.(Func Str '@1372)
  ("'Expect 3'" // Str
  ) // '@1372
  ;
  print_2050 // !'@1374.(Func Int '@1374)
  (median_1797 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1374
  ;
  print_2050 // !'@1405.(Func Str '@1405)
  ("'Expect 15'" // Str
  ) // '@1405
  ;
  print_2050 // !'@1407.(Func Float '@1407)
  (sum_1330 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1407
  ;
  print_2050 // !'@1409.(Func Str '@1409)
  ("'Expect 5'" // Str
  ) // '@1409
  ;
  print_2050 // !'@1411.(Func Float '@1411)
  (average_1373 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1411
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
  print_2050 // !'@1718.(Func (Array Float) '@1718)
  (xs // (Array Float)
  ) // '@1718
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
  print_2050 // !'@1421.(Func Str '@1421)
  ("'Expect 5'" // Str
  ) // '@1421
  ;
  print_2050 // !'@1423.(Func Float '@1423)
  (length_216 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ) // '@1423
  ;
  print_2050 // !'@1425.(Func Str '@1425)
  ("'Expect [4, 3, 0]'" // Str
  ) // '@1425
  ;
  print_2050 // !'@1427.(Func Float3 '@1427)
  (v // Float3
  ) // '@1427
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
  print_2050 // !'@1429.(Func Str '@1429)
  ("'Expect [0,0,1]'" // Str
  ) // '@1429
  ;
  print_2050 // !'@1431.(Func Float3 '@1431)
  (cross_403 // (Func Float3 Float3 Float3)
    (v1 // Float3
      ,v2 // Float3
    ) // Float3
  ) // '@1431
  ;
  print_2050 // !'@1433.(Func Str '@1433)
  ("'Expect [1,1,0]'" // Str
  ) // '@1433
  ;
  let v3 = op_add_1255 // [!'@1456.(Func '@1456 '@1456 '@1456) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v1 // Float3
    ,v2 // Float3
  ) // Float3
  ;
  print_2050 // !'@1436.(Func Float3 '@1436)
  (v3 // Float3
  ) // '@1436
  ;
  print_2050 // !'@1438.(Func Str '@1438)
  ("'Expect [1,0,0]'" // Str
  ) // '@1438
  ;
  let v4 = op_sub_1320 // [!'@1457.(Func '@1457 '@1457 '@1457) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v3 // Float3
    ,v2 // Float3
  ) // Float3
  ;
  print_2050 // !'@1441.(Func Float3 '@1441)
  (v4 // Float3
  ) // '@1441
  ;
  print_2050 // !'@1443.(Func Str '@1443)
  ("'Expect [20,15,0]'" // Str
  ) // '@1443
  ;
  let v5 = op_mul_1385 // [!'@1458.(Func '@1458 '@1458 '@1458) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,vector_120 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3)]
    (5 // Float
    ) // Float3
  ) // Float3
  ;
  print_2050 // !'@1446.(Func Float3 '@1446)
  (v5 // Float3
  ) // '@1446
  ;
  print_2050 // !'@1448.(Func Str '@1448)
  ("'Expect [1,1,0]'" // Str
  ) // '@1448
  ;
  print_2050 // !'@1450.(Func Float3 '@1450)
  (op_add_1255 // [!'@1459.(Func '@1459 '@1459 '@1459) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v1 // Float3
      ,v2 // Float3
    ) // Float3
  ) // '@1450
  ;
  print_2050 // !'@1453.(Func Str '@1453)
  ("'Expect [0.8, 0.6, 0]'" // Str
  ) // '@1453
  ;
  print_2050 // !'@1455.(Func Float3 '@1455)
  (normal_300 // (Func Float3 Float3)
    (v // Float3
    ) // Float3
  ) // '@1455
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
  return translate_2482 // [(Func Mesh Float3 Mesh) | (Func Mesh (Array Float3) Mesh)]
  (g // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (normalBuffer_2206 // (Func Mesh (Array Float3))
      (g // Mesh
      ) // (Array Float3)
      ,(n) => op_mul_1385 // [!'@1563.(Func '@1563 '@1563 '@1563) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return scale_2511 // (Func Mesh Float3 Mesh)
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
  ,torus_2271 // [(Func Float Float Int Mesh) | (Func Mesh)]
  () // Mesh
  ,klein_2855 // (Func Mesh)
  () // Mesh
  ,plane_2995 // (Func Mesh)
  () // Mesh
  ,mobius_3125 // (Func Mesh)
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