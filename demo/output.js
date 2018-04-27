// Generated using Heron on Thu Apr 26 2018 08:16:33 GMT-0400 (Eastern Daylight Time)
var heronMain = (function () {
function arrayFromJavaScript(xs) {
  return xs;
}

function toMutable(xs) {
  return xs;
}

function int(x) { return Math.round(x); }
function float(x) { return x; }
function float2(u, v) { return [u, v]; }
function float3(x, y, z) { return [x, y, z]; }
function float4(x, y, z, w) { return [x, y, z, w]; }
function u(v) { return v[0]; }
function v(v) { return v[1]; }
function x(v) { return v[0]; }
function y(v) { return v[1]; }
function z(v) { return v[2]; }
function w(v) { return v[3]; }
function xyz(v) { return v; }
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
function array(count, at) { var r = []; for (var i=0; i < count; ++i) r.push(at(i)); return r; }
function mutable(x) { return x; }
function immutable(xs) { return xs; }
function push(xs, x) { return (xs.push(x), xs); };
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
  (op_add_842 // [!'@225.(Func '@225 '@225 '@225) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_add_842 // [!'@226.(Func '@226 '@226 '@226) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@196.(Func '@196 '@196 '@196) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@197.(Func '@197 '@197 '@197) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_div_908 // [!'@262.(Func '@262 '@262 '@262) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_div_908 // [!'@263.(Func '@263 '@263 '@263) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@644.(Func '@644 '@644 '@644) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@645.(Func '@645 '@645 '@645) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_add_842 // [!'@221.(Func '@221 '@221 '@221) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842 // [!'@222.(Func '@222 '@222 '@222) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842 // [!'@223.(Func '@223 '@223 '@223) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@192.(Func '@192 '@192 '@192) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@193.(Func '@193 '@193 '@193) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@194.(Func '@194 '@194 '@194) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_div_908 // [!'@258.(Func '@258 '@258 '@258) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908 // [!'@259.(Func '@259 '@259 '@259) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908 // [!'@260.(Func '@260 '@260 '@260) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@640.(Func '@640 '@640 '@640) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@641.(Func '@641 '@641 '@641) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@642.(Func '@642 '@642 '@642) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
// (Func (Array T0) (ArrayBuilder T0))
const mutable_1760 = mutable;
// (Func (ArrayBuilder T0) T0 (ArrayBuilder T0))
const push_1789 = push;
// (Func (ArrayBuilder T0) Int T0 (ArrayBuilder T0))
const set_1824 = set;
// (Func (ArrayBuilder T0) (Array T0))
const immutable_1847 = immutable;
// (Func Float3 (Array Float))
function array_1875(v)
{
  return arrayFromJavaScript([x_134 // (Func Float3 Float)
    (v // Float3
    ) // Float
    ,y_149 // (Func Float3 Float)
    (v // Float3
    ) // Float
    ,z_164 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ]) // (Array Float)
  ;
}
// (Func (Array Float) Float3)
function float3_1906(xs)
{
  return float3_119 // [(Func Float Float Float Float3) | !'@23!'@24.(Func '@23 '@24)]
  (op_obr_cbr_2073 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,0 // Int
    ) // Float
    ,op_obr_cbr_2073 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,1 // Int
    ) // Float
    ,op_obr_cbr_2073 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,2 // Int
    ) // Float
  ) // Float3
  ;
}
// (Func (ArrayBuilder T0) (Array T0) (ArrayBuilder T0))
function pushMany_1959(xs, ys)
{
  for (let i0=0; i0 < ys // !'@658.(Array '@658)
  .length; ++i0)
  {
    const y = ys // !'@658.(Array '@658)
    [i0];
    {
      xs = push_1789 // !'@658.(Func (ArrayBuilder '@658) '@658 (ArrayBuilder '@658))
      (xs // !'@658.(ArrayBuilder '@658)
        ,y // '@658
      ) // !'@658.(ArrayBuilder '@658)
       // !'@658.(ArrayBuilder '@658)
      ;
    }
  }
  return xs // !'@658.(ArrayBuilder '@658)
  ;
}
// (Func (Array T0) (Array T0))
function reify_1990(xs)
{
  return immutable_1847 // !'@1434.(Func (ArrayBuilder '@1434) (Array '@1434))
  (mutable_1760 // !'@1434.(Func (Array '@1434) (ArrayBuilder '@1434))
    (xs // !'@1434.(Array '@1434)
    ) // !'@1434.(ArrayBuilder '@1434)
  ) // !'@1434.(Array '@1434)
  ;
}
// (Func Int Int (Array Int))
function op_dot_dot_2038(from, upto)
{
  return array_1691 // [!'@229.(Func Int (Func Int '@229) (Array '@229)) | (Func Float3 (Array Float))]
  (op_sub_754 // [!'@227.(Func '@227 '@227 '@227) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (upto // Int
      ,from // Int
    ) // Int
    ,(i) => op_add_732 // [!'@228.(Func '@228 '@228 '@228) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (i // Int
      ,from // Int
    ) // Int
     // (Func Int Int)
  ) // (Array Int)
  ;
}
// (Func (Array T0) Int T0)
function op_obr_cbr_2073(xs, i)
{
  return at_1737 // !'@11.(Func !'@11.(Array '@11) Int '@11)
  (xs // !'@11.(Array '@11)
    ,i // Int
  ) // '@11
  ;
}
// (Func T0 T1)
const print_2094 = print;
// (Func Bool T0)
const assert_2106 = assert;
// (Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh)
const mesh_2151 = mesh;
// (Func Mesh (Array Float))
const vertexBuffer_2169 = vertexBuffer;
// (Func Mesh (Array Int))
const indexBuffer_2187 = indexBuffer;
// (Func Mesh (Array Float))
const uvBuffer_2205 = uvBuffer;
// (Func Mesh (Array Float))
const colorBuffer_2223 = colorBuffer;
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
  (op_obr_cbr_2073 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,0 // Int
    ) // Float
    ,op_obr_cbr_2073 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,1 // Int
    ) // Float
    ,op_obr_cbr_2073 // (Func (Array Float) Int Float)
    (xs // (Array Float)
      ,2 // Int
    ) // Float
  ) // Float3
  ;
}
// (Func Float3 (Array Float))
function array_176(v)
{
  return arrayFromJavaScript([x_134 // (Func Float3 Float)
    (v // Float3
    ) // Float
    ,y_149 // (Func Float3 Float)
    (v // Float3
    ) // Float
    ,z_164 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ]) // (Array Float)
  ;
}
// (Func Float3 Float)
function sumComponents_206(v)
{
  return op_add_842 // [!'@803.(Func '@803 '@803 '@803) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_842 // [!'@802.(Func '@802 '@802 '@802) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mul_1385 // [!'@805.(Func '@805 '@805 '@805) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_1320 // [!'@807.(Func '@807 '@807 '@807) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_1320 // [!'@812.(Func '@812 '@812 '@812) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float)
function normal_328(v)
{
  return op_div_590 // [!'@1345.(Func '@1345 '@1345 '@1345) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@545.(Func '@545 '@545 '@545) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@543.(Func '@543 '@543 '@543) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (y_149 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@544.(Func '@544 '@544 '@544) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@548.(Func '@548 '@548 '@548) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@546.(Func '@546 '@546 '@546) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,x_134 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@547.(Func '@547 '@547 '@547) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@551.(Func '@551 '@551 '@551) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@549.(Func '@549 '@549 '@549) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@550.(Func '@550 '@550 '@550) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_sub_542 // [!'@1433.(Func '@1433 '@1433 '@1433) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,op_mul_886 // [!'@1432.(Func '@1432 '@1432 '@1432) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_566 // [!'@1431.(Func '@1431 '@1431 '@1431) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_add_842 // [!'@1114.(Func '@1114 '@1114 '@1114) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1112.(Func '@1112 '@1112 '@1112) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,op_sub_864 // [!'@1111.(Func '@1111 '@1111 '@1111) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,x // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1113.(Func '@1113 '@1113 '@1113) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return arrayFromJavaScript([x // '@1577
  ]) // !'@1577.(Array '@1577)
  ;
}
// (Func (Array T0) (Func T0 T1) (Array T1))
function map_53(xs, f)
{
  return array_1691 // [!'@142.(Func Int (Func Int '@142) (Array '@142)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@137.(Array '@137) Int)
    (xs // !'@137.(Array '@137)
    ) // Int
    ,(i) => f // !'@137!'@141.(Func '@137 '@141)
    (op_obr_cbr_2073 // !'@137.(Func !'@137.(Array '@137) Int '@137)
      (xs // !'@137.(Array '@137)
        ,i // Int
      ) // '@137
    ) // '@141
     // !'@141.(Func Int '@141)
  ) // !'@141.(Array '@141)
  ;
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_1691 // [!'@1332.(Func Int (Func Int '@1332) (Array '@1332)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1327.(Array '@1327) Int)
    (xs // !'@1327.(Array '@1327)
    ) // Int
    ,(i) => f // !'@1327!'@1331.(Func '@1327 Int '@1331)
    (op_obr_cbr_2073 // !'@1327.(Func !'@1327.(Array '@1327) Int '@1327)
      (xs // !'@1327.(Array '@1327)
        ,i // Int
      ) // '@1327
      ,i // Int
    ) // '@1331
     // !'@1331.(Func Int '@1331)
  ) // !'@1331.(Array '@1331)
  ;
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_1691 // [!'@1320.(Func Int (Func Int '@1320) (Array '@1320)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1319.(Array '@1319) Int)
    (xs // !'@1319.(Array '@1319)
    ) // Int
    ,f // !'@1318.(Func Int '@1318)
  ) // !'@1318.(Array '@1318)
  ;
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_710 // !'@1164.(Func '@1164 '@1164 Bool)
  (x // '@1164
    ,y // '@1164
  ) // Bool
   ? x // '@1164
   : y // '@1164
   // '@1164
  ;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_662 // !'@1189.(Func '@1189 '@1189 Bool)
  (x // '@1189
    ,y // '@1189
  ) // Bool
   ? x // '@1189
   : y // '@1189
   // '@1189
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1487.(Array '@1487) Int)
    (xs // !'@1487.(Array '@1487)
    ) // Int
    ,count_1711 // (Func !'@1487.(Array '@1487) Int)
    (ys // !'@1487.(Array '@1487)
    ) // Int
  ) // Bool
   ? xs // !'@1487.(Array '@1487)
   : ys // !'@1487.(Array '@1487)
   // !'@1487.(Array '@1487)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_662 // (Func Int Int Bool)
  (count_1711 // (Func !'@1121.(Array '@1121) Int)
    (xs // !'@1121.(Array '@1121)
    ) // Int
    ,count_1711 // (Func !'@1121.(Array '@1121) Int)
    (ys // !'@1121.(Array '@1121)
    ) // Int
  ) // Bool
   ? xs // !'@1121.(Array '@1121)
   : ys // !'@1121.(Array '@1121)
   // !'@1121.(Array '@1121)
  ;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@831.(Array '@831) Int)
    (xs // !'@831.(Array '@831)
    ) // Int
    ,0 // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53 // !'@1475.(Func (Array Int) (Func Int '@1475) (Array '@1475))
  (indices // (Array Int)
    ,(i) => at_1737 // !'@1475.(Func !'@1475.(Array '@1475) Int '@1475)
    (xs // !'@1475.(Array '@1475)
      ,i // Int
    ) // '@1475
     // !'@1475.(Func Int '@1475)
  ) // !'@1475.(Array '@1475)
  ;
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_2038 // (Func Int Int (Array Int))
  (0 // Int
    ,count_1711 // (Func !'@230.(Array '@230) Int)
    (xs // !'@230.(Array '@230)
    ) // Int
  ) // (Array Int)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function zip_372(xs, ys, f)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1618.(Array '@1618) Int)
    (xs // !'@1618.(Array '@1618)
    ) // Int
    ,count_1711 // (Func !'@1611.(Array '@1611) Int)
    (ys // !'@1611.(Array '@1611)
    ) // Int
  ) // Bool
   ? mapWithIndex_92 // !'@1618!'@1615.(Func (Array '@1618) (Func '@1618 Int '@1615) (Array '@1615))
  (xs // !'@1618.(Array '@1618)
    ,(x, i) => f // !'@1618!'@1611!'@1615.(Func '@1618 '@1611 '@1615)
    (x // '@1618
      ,op_obr_cbr_2073 // !'@1611.(Func !'@1611.(Array '@1611) Int '@1611)
      (ys // !'@1611.(Array '@1611)
        ,i // Int
      ) // '@1611
    ) // '@1615
     // !'@1618!'@1615.(Func '@1618 Int '@1615)
  ) // !'@1615.(Array '@1615)
   : mapWithIndex_92 // !'@1611!'@1615.(Func (Array '@1611) (Func '@1611 Int '@1615) (Array '@1615))
  (ys // !'@1611.(Array '@1611)
    ,(y, i) => f // !'@1618!'@1611!'@1615.(Func '@1618 '@1611 '@1615)
    (op_obr_cbr_2073 // !'@1618.(Func !'@1618.(Array '@1618) Int '@1618)
      (xs // !'@1618.(Array '@1618)
        ,i // Int
      ) // '@1618
      ,y // '@1611
    ) // '@1615
     // !'@1611!'@1615.(Func '@1611 Int '@1615)
  ) // !'@1615.(Array '@1615)
   // !'@1615.(Array '@1615)
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1918 // !'@326.(Func (Array '@326) Bool (Func Bool '@326 Bool) Bool)
  (xs // !'@326.(Array '@326)
    ,true // Bool
    ,(prev, x) => op_amp_amp_1585 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@326.(Func '@326 Bool)
      (x // '@326
      ) // Bool
    ) // Bool
     // !'@326.(Func Bool '@326 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1918 // !'@339.(Func (Array '@339) Bool (Func Bool '@339 Bool) Bool)
  (xs // !'@339.(Array '@339)
    ,false // Bool
    ,(prev, x) => op_bar_bar_1607 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@339.(Func '@339 Bool)
      (x // '@339
      ) // Bool
    ) // Bool
     // !'@339.(Func Bool '@339 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Array T1) Bool)
function eq_469(xs, ys)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@837.(Array '@837) Int)
    (xs // !'@837.(Array '@837)
    ) // Int
    ,count_1711 // (Func !'@838.(Array '@838) Int)
    (ys // !'@838.(Array '@838)
    ) // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_537(xs, p)
{
  let ys = mutable_1760 // !'@851.(Func (Array '@851) (ArrayBuilder '@851))
  (xs // !'@851.(Array '@851)
  ) // !'@851.(ArrayBuilder '@851)
  ;
  let i = 0 // Int
  ;
  for (let i1=0; i1 < xs // !'@851.(Array '@851)
  .length; ++i1)
  {
    const x = xs // !'@851.(Array '@851)
    [i1];
    {
      if (p // !'@851.(Func '@851 Bool)
        (x // '@851
        ) // Bool
      )
      {
        ys = set_1824 // !'@851.(Func (ArrayBuilder '@851) Int '@851 (ArrayBuilder '@851))
        (ys // !'@851.(ArrayBuilder '@851)
          ,i++ // Int
          ,x // '@851
        ) // !'@851.(ArrayBuilder '@851)
         // !'@851.(ArrayBuilder '@851)
        ;
      }
      else
      { }
    }
  }
  return take_967 // [!'@863.(Func (Array '@863) Int (Array '@863)) | !'@864.(Func (Array '@864) Int Int (Array '@864))]
  (immutable_1847 // !'@851.(Func (ArrayBuilder '@851) (Array '@851))
    (ys // !'@851.(ArrayBuilder '@851)
    ) // !'@851.(Array '@851)
    ,i // Int
  ) // !'@851.(Array '@851)
  ;
}
// (Func T0 Int (Array T0))
function repeat_566(x, n)
{
  return map_53 // !'@1391.(Func (Array Int) (Func Int '@1391) (Array '@1391))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => x // '@1391
     // !'@1391.(Func Int '@1391)
  ) // !'@1391.(Array '@1391)
  ;
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_662(xs, op)
{
  if (empty_245 // (Func !'@1407.(Array '@1407) Bool)
    (xs // !'@1407.(Array '@1407)
    ) // Bool
  )
  {
    return xs // !'@1407.(Array '@1407)
    ;
  }
  else
  { }
  let ys = mutable_1760 // !'@1407.(Func (Array '@1407) (ArrayBuilder '@1407))
  (repeat_566 // !'@1407.(Func '@1407 Int (Array '@1407))
    (op_obr_cbr_2073 // !'@1407.(Func !'@1407.(Array '@1407) Int '@1407)
      (xs // !'@1407.(Array '@1407)
        ,0 // Int
      ) // '@1407
      ,count_1711 // (Func !'@1407.(Array '@1407) Int)
      (xs // !'@1407.(Array '@1407)
      ) // Int
    ) // !'@1407.(Array '@1407)
  ) // !'@1407.(ArrayBuilder '@1407)
  ;
  for (let i2=0; i2 < op_dot_dot_2038 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1407.(Array '@1407) Int)
      (ys // !'@1407.(ArrayBuilder '@1407)
      ) // Int
    ) // (Array Int)
  .length; ++i2)
  {
    const i = op_dot_dot_2038 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1407.(Array '@1407) Int)
      (ys // !'@1407.(ArrayBuilder '@1407)
      ) // Int
    ) // (Array Int)
    [i2];
    {
      ys = set_1824 // !'@1407.(Func (ArrayBuilder '@1407) Int '@1407 (ArrayBuilder '@1407))
      (ys // !'@1407.(ArrayBuilder '@1407)
        ,i // Int
        ,op // !'@1407.(Func '@1407 '@1407 '@1407)
        (op_obr_cbr_2073 // !'@1407.(Func !'@1407.(Array '@1407) Int '@1407)
          (xs // !'@1407.(Array '@1407)
            ,i // Int
          ) // '@1407
          ,op_obr_cbr_2073 // !'@1407.(Func !'@1407.(Array '@1407) Int '@1407)
          (ys // !'@1407.(ArrayBuilder '@1407)
            ,op_sub_754 // [!'@1409.(Func '@1409 '@1409 '@1409) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (i // Int
              ,1 // Int
            ) // Int
          ) // '@1407
        ) // '@1407
      ) // !'@1407.(ArrayBuilder '@1407)
       // !'@1407.(ArrayBuilder '@1407)
      ;
    }
  }
  return immutable_1847 // !'@1407.(Func (ArrayBuilder '@1407) (Array '@1407))
  (ys // !'@1407.(ArrayBuilder '@1407)
  ) // !'@1407.(Array '@1407)
  ;
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_720(xs)
{
  return map_53 // !'@298.(Func (Array Int) (Func Int '@298) (Array '@298))
  (indices_292 // (Func !'@298.(Array '@298) (Array Int))
    (xs // !'@298.(Array '@298)
    ) // (Array Int)
    ,(i) => op_gt_638 // (Func Int Int Bool)
    (i // Int
      ,0 // Int
    ) // Bool
     ? op_sub_542 // [!'@312.(Func '@312 '@312 '@312) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2073 // !'@298.(Func !'@298.(Array '@298) Int '@298)
      (xs // !'@298.(Array '@298)
        ,i // Int
      ) // '@298
      ,op_obr_cbr_2073 // !'@298.(Func !'@298.(Array '@298) Int '@298)
      (xs // !'@298.(Array '@298)
        ,op_sub_754 // [!'@311.(Func '@311 '@311 '@311) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
      ) // '@298
    ) // '@298
     : op_obr_cbr_2073 // !'@298.(Func !'@298.(Array '@298) Int '@298)
    (xs // !'@298.(Array '@298)
      ,i // Int
    ) // '@298
     // '@298
     // !'@298.(Func Int '@298)
  ) // !'@298.(Array '@298)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function slice_758(xs, from, to)
{
  return map_53 // !'@480.(Func (Array Int) (Func Int '@480) (Array '@480))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (from // Int
      ,to // Int
    ) // (Array Int)
    ,(i) => at_1737 // !'@480.(Func !'@480.(Array '@480) Int '@480)
    (xs // !'@480.(Array '@480)
      ,i // Int
    ) // '@480
     // !'@480.(Func Int '@480)
  ) // !'@480.(Array '@480)
  ;
}
// (Func (Array T0) Int (Array T0))
function stride_805(xs, n)
{
  return map_53 // !'@1546.(Func (Array Int) (Func Int '@1546) (Array '@1546))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1551.(Func '@1551 '@1551 '@1551) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1546.(Array '@1546) Int)
        (xs // !'@1546.(Array '@1546)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1546.(Func !'@1546.(Array '@1546) Int '@1546)
    (xs // !'@1546.(Array '@1546)
      ,op_mul_776 // [!'@1552.(Func '@1552 '@1552 '@1552) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@1546
     // !'@1546.(Func Int '@1546)
  ) // !'@1546.(Array '@1546)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function stride_860(xs, from, n)
{
  return map_53 // !'@1530.(Func (Array Int) (Func Int '@1530) (Array '@1530))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1536.(Func '@1536 '@1536 '@1536) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1530.(Array '@1530) Int)
        (xs // !'@1530.(Array '@1530)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1530.(Func !'@1530.(Array '@1530) Int '@1530)
    (xs // !'@1530.(Array '@1530)
      ,op_add_732 // [!'@1538.(Func '@1538 '@1538 '@1538) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (from // Int
        ,op_mul_776 // [!'@1537.(Func '@1537 '@1537 '@1537) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,n // Int
        ) // Int
      ) // Int
    ) // '@1530
     // !'@1530.(Func Int '@1530)
  ) // !'@1530.(Array '@1530)
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_896(xs, n)
{
  return map_53 // !'@1562.(Func (Array Int) (Func Int (Array '@1562)) (Array (Array '@1562)))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => stride_860 // [!'@1563.(Func (Array '@1563) Int (Array '@1563)) | !'@1564.(Func (Array '@1564) Int Int (Array '@1564))]
    (xs // !'@1562.(Array '@1562)
      ,i // Int
      ,n // Int
    ) // !'@1562.(Array '@1562)
     // !'@1562.(Func Int (Array '@1562))
  ) // (Array !'@1562.(Array '@1562))
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_947(xs, n)
{
  return map_53 // !'@1502.(Func (Array Int) (Func Int (Array '@1502)) (Array (Array '@1502)))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => slice_758 // !'@1502.(Func (Array '@1502) Int Int (Array '@1502))
    (xs // !'@1502.(Array '@1502)
      ,op_mul_776 // [!'@1506.(Func '@1506 '@1506 '@1506) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
      ,op_mul_776 // [!'@1508.(Func '@1508 '@1508 '@1508) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_add_732 // [!'@1507.(Func '@1507 '@1507 '@1507) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
        ,n // Int
      ) // Int
    ) // !'@1502.(Array '@1502)
     // !'@1502.(Func Int (Array '@1502))
  ) // (Array !'@1502.(Array '@1502))
  ;
}
// (Func (Array T0) Int (Array T0))
function take_967(xs, n)
{
  return slice_758 // !'@481.(Func (Array '@481) Int Int (Array '@481))
  (xs // !'@481.(Array '@481)
    ,0 // Int
    ,n // Int
  ) // !'@481.(Array '@481)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function take_994(xs, i, n)
{
  return take_967 // [!'@500.(Func (Array '@500) Int (Array '@500)) | !'@501!'@502!'@503!'@504.(Func '@501 '@502 '@503 '@504)]
  (skip_1023 // !'@499.(Func (Array '@499) Int (Array '@499))
    (xs // !'@499.(Array '@499)
      ,i // Int
    ) // !'@499.(Array '@499)
    ,n // Int
  ) // !'@499.(Array '@499)
  ;
}
// (Func (Array T0) Int (Array T0))
function skip_1023(xs, n)
{
  return slice_758 // !'@497.(Func (Array '@497) Int Int (Array '@497))
  (xs // !'@497.(Array '@497)
    ,n // Int
    ,op_sub_754 // [!'@498.(Func '@498 '@498 '@498) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@497.(Array '@497) Int)
      (xs // !'@497.(Array '@497)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@497.(Array '@497)
  ;
}
// (Func (Array T0) Int (Array T0))
function drop_1050(xs, n)
{
  return take_967 // [!'@821.(Func (Array '@821) Int (Array '@821)) | !'@822.(Func (Array '@822) Int Int (Array '@822))]
  (xs // !'@819.(Array '@819)
    ,op_sub_754 // [!'@820.(Func '@820 '@820 '@820) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@819.(Array '@819) Int)
      (xs // !'@819.(Array '@819)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@819.(Array '@819)
  ;
}
// (Func (Array T0) Int (Array T0))
function last_1077(xs, n)
{
  return skip_1023 // !'@1093.(Func (Array '@1093) Int (Array '@1093))
  (xs // !'@1093.(Array '@1093)
    ,op_sub_754 // [!'@1094.(Func '@1094 '@1094 '@1094) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1093.(Array '@1093) Int)
      (xs // !'@1093.(Array '@1093)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@1093.(Array '@1093)
  ;
}
// (Func (Array T0) T1 (Array T0))
function reverse_1121(xs, n)
{
  return map_53 // !'@1455.(Func (Array Int) (Func Int '@1455) (Array '@1455))
  (indices_292 // (Func !'@1455.(Array '@1455) (Array Int))
    (xs // !'@1455.(Array '@1455)
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1455.(Func !'@1455.(Array '@1455) Int '@1455)
    (xs // !'@1455.(Array '@1455)
      ,op_sub_754 // [!'@1463.(Func '@1463 '@1463 '@1463) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1462.(Func '@1462 '@1462 '@1462) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func !'@1455.(Array '@1455) Int)
          (xs // !'@1455.(Array '@1455)
          ) // Int
          ,1 // Int
        ) // Int
        ,i // Int
      ) // Int
    ) // '@1455
     // !'@1455.(Func Int '@1455)
  ) // !'@1455.(Array '@1455)
  ;
}
// (Func Int (Func Int T0) (Array T0))
function gen_1145(cnt, f)
{
  return map_53 // !'@393.(Func (Array Int) (Func Int '@393) (Array '@393))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,cnt // Int
    ) // (Array Int)
    ,f // !'@393.(Func Int '@393)
  ) // !'@393.(Array '@393)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1213(xs, ys)
{
  return gen_1145 // !'@396.(Func Int (Func Int '@396) (Array '@396))
  (op_add_732 // [!'@410.(Func '@410 '@410 '@410) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@396.(Array '@396) Int)
      (xs // !'@396.(Array '@396)
      ) // Int
      ,count_1711 // (Func !'@396.(Array '@396) Int)
      (ys // !'@396.(Array '@396)
      ) // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,count_1711 // (Func !'@396.(Array '@396) Int)
      (xs // !'@396.(Array '@396)
      ) // Int
    ) // Bool
     ? op_obr_cbr_2073 // !'@396.(Func !'@396.(Array '@396) Int '@396)
    (xs // !'@396.(Array '@396)
      ,i // Int
    ) // '@396
     : op_obr_cbr_2073 // !'@396.(Func !'@396.(Array '@396) Int '@396)
    (ys // !'@396.(Array '@396)
      ,op_sub_754 // [!'@411.(Func '@411 '@411 '@411) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,count_1711 // (Func !'@396.(Array '@396) Int)
        (xs // !'@396.(Array '@396)
        ) // Int
      ) // Int
    ) // '@396
     // '@396
     // !'@396.(Func Int '@396)
  ) // !'@396.(Array '@396)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function cut_1275(xs, from, n)
{
  return gen_1145 // !'@558.(Func Int (Func Int '@558) (Array '@558))
  (op_sub_754 // [!'@565.(Func '@565 '@565 '@565) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@558.(Array '@558) Int)
      (xs // !'@558.(Array '@558)
      ) // Int
      ,n // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,from // Int
    ) // Bool
     ? op_obr_cbr_2073 // !'@558.(Func !'@558.(Array '@558) Int '@558)
    (xs // !'@558.(Array '@558)
      ,i // Int
    ) // '@558
     : op_obr_cbr_2073 // !'@558.(Func !'@558.(Array '@558) Int '@558)
    (xs // !'@558.(Array '@558)
      ,op_add_732 // [!'@566.(Func '@566 '@566 '@566) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@558
     // '@558
     // !'@558.(Func Int '@558)
  ) // !'@558.(Array '@558)
  ;
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1312(xs, from, ys)
{
  return concat_1213 // !'@1517.(Func (Array '@1517) (Array '@1517) (Array '@1517))
  (concat_1213 // !'@1517.(Func (Array '@1517) (Array '@1517) (Array '@1517))
    (take_967 // [!'@1520.(Func (Array '@1520) Int (Array '@1520)) | !'@1521.(Func (Array '@1521) Int Int (Array '@1521))]
      (xs // !'@1517.(Array '@1517)
        ,from // Int
      ) // !'@1517.(Array '@1517)
      ,ys // !'@1517.(Array '@1517)
    ) // !'@1517.(Array '@1517)
    ,skip_1023 // !'@1517.(Func (Array '@1517) Int (Array '@1517))
    (xs // !'@1517.(Array '@1517)
      ,from // Int
    ) // !'@1517.(Array '@1517)
  ) // !'@1517.(Array '@1517)
  ;
}
// (Func (Array Float) Float)
function sum_1330(xs)
{
  return reduce_1918 // (Func (Array Float) Float (Func Float Float Float) Float)
  (xs // (Array Float)
    ,0 // Float
    ,op_add_842 // [!'@369.(Func '@369 '@369 '@369) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Float
  ;
}
// (Func (Array Float) Float)
function product_1348(xs)
{
  return reduce_1918 // (Func (Array Float) Float (Func Float Float Float) Float)
  (xs // (Array Float)
    ,1 // Float
    ,op_mul_886 // [!'@1418.(Func '@1418 '@1418 '@1418) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Float
  ;
}
// (Func (Array Float) Float)
function average_1373(xs)
{
  return op_div_908 // [!'@373.(Func '@373 '@373 '@373) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return reduce_1918 // !'@1177.(Func (Array '@1177) '@1177 (Func '@1177 '@1177 '@1177) '@1177)
  (xs // !'@1177.(Array '@1177)
    ,op_obr_cbr_2073 // !'@1177.(Func !'@1177.(Array '@1177) Int '@1177)
    (xs // !'@1177.(Array '@1177)
      ,0 // Int
    ) // '@1177
    ,min_140 // [!'@1180.(Func '@1180 '@1180 '@1180) | !'@1181!'@1182.(Func '@1181 '@1182)]
  ) // '@1180
  ;
}
// (Func (Array T0) T0)
function max_1417(xs)
{
  return reduce_1918 // !'@1198.(Func (Array '@1198) '@1198 (Func '@1198 '@1198 '@1198) '@1198)
  (xs // !'@1198.(Array '@1198)
    ,op_obr_cbr_2073 // !'@1198.(Func !'@1198.(Array '@1198) Int '@1198)
    (xs // !'@1198.(Array '@1198)
      ,0 // Int
    ) // '@1198
    ,max_165 // [!'@1201.(Func '@1201 '@1201 '@1201) | !'@1202!'@1203.(Func '@1202 '@1203)]
  ) // '@1201
  ;
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1483(xs, i, j)
{
  let tmp = op_obr_cbr_2073 // !'@1238.(Func !'@1238.(Array '@1238) Int '@1238)
  (xs // !'@1238.(ArrayBuilder '@1238)
    ,i // Int
  ) // '@1238
  ;
  xs = set_1824 // !'@1238.(Func (ArrayBuilder '@1238) Int '@1238 (ArrayBuilder '@1238))
  (xs // !'@1238.(Array '@1238)
    ,i // Int
    ,op_obr_cbr_2073 // !'@1238.(Func !'@1238.(Array '@1238) Int '@1238)
    (xs // !'@1238.(Array '@1238)
      ,j // Int
    ) // '@1238
  ) // !'@1238.(ArrayBuilder '@1238)
   // !'@1238.(ArrayBuilder '@1238)
  ;
  xs = set_1824 // !'@1238.(Func (ArrayBuilder '@1238) Int '@1238 (ArrayBuilder '@1238))
  (xs // !'@1238.(ArrayBuilder '@1238)
    ,j // Int
    ,tmp // '@1238
  ) // !'@1238.(ArrayBuilder '@1238)
   // !'@1238.(ArrayBuilder '@1238)
  ;
  return xs // !'@1238.(ArrayBuilder '@1238)
  ;
}
// (Func (Array T0) Int Int Int)
function partition_1598(a, lo, hi)
{
  let p = op_obr_cbr_2073 // !'@1226.(Func !'@1226.(Array '@1226) Int '@1226)
  (a // !'@1226.(Array '@1226)
    ,lo // Int
  ) // '@1226
  ;
  let i = op_sub_754 // [!'@1243.(Func '@1243 '@1243 '@1243) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (lo // Int
    ,1 // Int
  ) // Int
  ;
  let j = op_add_732 // [!'@1244.(Func '@1244 '@1244 '@1244) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    while (op_lt_686 // !'@1226.(Func '@1226 '@1226 Bool)
      (op_obr_cbr_2073 // !'@1226.(Func !'@1226.(Array '@1226) Int '@1226)
        (a // !'@1226.(Array '@1226)
          ,i // Int
        ) // '@1226
        ,p // '@1226
      ) // Bool
    )
    do
    {
      j-- // Int
      ;
    }
    while (op_gt_638 // !'@1226.(Func '@1226 '@1226 Bool)
      (op_obr_cbr_2073 // !'@1226.(Func !'@1226.(Array '@1226) Int '@1226)
        (a // !'@1226.(Array '@1226)
          ,j // Int
        ) // '@1226
        ,p // '@1226
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
    swapElements_1483 // !'@1226.(Func (ArrayBuilder '@1226) Int Int (ArrayBuilder '@1226))
    (a // !'@1226.(Array '@1226)
      ,i // Int
      ,j // Int
    ) // !'@1226.(ArrayBuilder '@1226)
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
    let p = partition_1598 // (Func !'@1245.(Array '@1245) Int Int Int)
    (a // !'@1245.(Array '@1245)
      ,lo // Int
      ,hi // Int
    ) // Int
    ;
    qsort_1667 // !'@1249.(Func !'@1245.(Array '@1245) Int Int '@1249)
    (a // !'@1245.(Array '@1245)
      ,lo // Int
      ,p // Int
    ) // '@1249
    ;
    qsort_1667 // !'@1253.(Func !'@1245.(Array '@1245) Int Int '@1253)
    (a // !'@1245.(Array '@1245)
      ,op_add_732 // [!'@1255.(Func '@1255 '@1255 '@1255) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (p // Int
        ,1 // Int
      ) // Int
      ,hi // Int
    ) // '@1253
    ;
  }
  else
  { }
  return a // !'@1245.(Array '@1245)
  ;
}
// (Func (Array T0) (Array T0))
function sort_1697(xs)
{
  return immutable_1847 // !'@1257.(Func (ArrayBuilder '@1257) (Array '@1257))
  (qsort_1667 // !'@1257.(Func (Array '@1257) Int Int (Array '@1257))
    (mutable_1760 // !'@1257.(Func (Array '@1257) (ArrayBuilder '@1257))
      (xs // !'@1257.(Array '@1257)
      ) // !'@1257.(ArrayBuilder '@1257)
      ,0 // Int
      ,op_sub_754 // [!'@1260.(Func '@1260 '@1260 '@1260) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1257.(Array '@1257) Int)
        (xs // !'@1257.(Array '@1257)
        ) // Int
        ,1 // Int
      ) // Int
    ) // !'@1257.(Array '@1257)
  ) // !'@1257.(Array '@1257)
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
  (op_mod_820 // [!'@1290.(Func '@1290 '@1290 '@1290) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1289.(Func '@1289 '@1289 '@1289) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
    ,0 // Int
  ) // Bool
   ? op_obr_cbr_2073 // (Func (Array Int) Int Int)
  (ys // (Array Int)
    ,op_div_798 // [!'@1292.(Func '@1292 '@1292 '@1292) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1291.(Func '@1291 '@1291 '@1291) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
  ) // Int
   : op_add_732 // [!'@1297.(Func '@1297 '@1297 '@1297) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (ys // (Array Int)
      ,op_div_798 // [!'@1294.(Func '@1294 '@1294 '@1294) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1293.(Func '@1293 '@1293 '@1293) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func (Array Int) Int)
          (ys // (Array Int)
          ) // Int
          ,2 // Int
        ) // Int
        ,2 // Int
      ) // Int
    ) // Int
    ,op_div_798 // [!'@1296.(Func '@1296 '@1296 '@1296) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2073 // (Func (Array Int) Int Int)
      (ys // (Array Int)
        ,op_div_798 // [!'@1295.(Func '@1295 '@1295 '@1295) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_obr_cbr_2073 // !'@1100.(Func !'@1100.(Array '@1100) Int '@1100)
  (xs // !'@1100.(Array '@1100)
    ,op_sub_754 // [!'@1101.(Func '@1101 '@1101 '@1101) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@1100.(Array '@1100) Int)
      (xs // !'@1100.(Array '@1100)
      ) // Int
      ,1 // Int
    ) // Int
  ) // '@1100
  ;
}
// (Func (Array T0) T0)
function first_1866(xs)
{
  return op_obr_cbr_2073 // !'@868.(Func !'@868.(Array '@868) Int '@868)
  (xs // !'@868.(Array '@868)
    ,0 // Int
  ) // '@868
  ;
}
// (Func (Array T0) (Array T0))
function tail_1881(xs)
{
  return skip_1023 // !'@1569.(Func (Array '@1569) Int (Array '@1569))
  (xs // !'@1569.(Array '@1569)
    ,1 // Int
  ) // !'@1569.(Array '@1569)
  ;
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1918(xs, acc, f)
{
  for (let i3=0; i3 < xs // !'@321.(Array '@321)
  .length; ++i3)
  {
    const x = xs // !'@321.(Array '@321)
    [i3];
    {
      acc = f // !'@322!'@321.(Func '@322 '@321 '@322)
      (acc // '@322
        ,x // '@321
      ) // '@322
       // '@322
      ;
    }
  }
  return acc // '@322
  ;
}
// (Func (Array (Array T0)) (Array T0))
function flatten_1935(xs)
{
  return reduce_1918 // !'@385.(Func (Array (Array '@385)) (Array '@385) (Func (Array '@385) (Array '@385) (Array '@385)) (Array '@385))
  (xs // (Array !'@385.(Array '@385))
    ,arrayFromJavaScript([]) // !'@385.(Array '@385)
    ,concat_1213 // !'@385.(Func (Array '@385) (Array '@385) (Array '@385))
  ) // !'@385.(Array '@385)
  ;
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T1))
function flatMap_1957(xs, f)
{
  return flatten_1935 // !'@413.(Func (Array (Array '@413)) (Array '@413))
  (map_53 // !'@414!'@413.(Func (Array '@414) (Func '@414 (Array '@413)) (Array (Array '@413)))
    (xs // !'@414.(Array '@414)
      ,f // !'@414!'@413.(Func '@414 (Array '@413))
    ) // (Array !'@413.(Array '@413))
  ) // !'@413.(Array '@413)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function cartesianProduct_2000(xs, ys, f)
{
  const r = [];
  for (let i=0; i < xs.length; ++i) 
    for (let j=0; j < ys.length; ++j)
      r.push(f(xs[i], ys[j]));
  return arrayFromJavaScript(r);

  /*
  return flatMap_1957 // !'@418!'@424.(Func (Array '@418) (Func '@418 (Array '@424)) (Array '@424))
  (xs // !'@418.(Array '@418)
    ,(x) => map_53 // !'@422!'@424.(Func (Array '@422) (Func '@422 '@424) (Array '@424))
    (ys // !'@422.(Array '@422)
      ,(y) => f // !'@418!'@422!'@424.(Func '@418 '@422 '@424)
      (x // '@418
        ,y // '@422
      ) // '@424
       // !'@422!'@424.(Func '@422 '@424)
    ) // !'@424.(Array '@424)
     // !'@418!'@424.(Func '@418 (Array '@424))
  ) // !'@424.(Array '@424)
  ;*/
}
// (Func (Array T0) T1 (Array T1))
function setAll_2024(xs, x)
{
  return map_53 // !'@145!'@121.(Func (Array '@145) (Func '@145 '@121) (Array '@121))
  (xs // !'@145.(Array '@145)
    ,(_) => x // '@121
     // !'@145!'@121.(Func '@145 '@121)
  ) // !'@121.(Array '@121)
  ;
}
// Module heron:geometry.mesh:0.1
// file input\geometry-mesh.heron
// imports heron:std.array:0.1
// imports heron:geometry.vector:0.1
// Mesh
const tetrahedron = mesh_62 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
(arrayFromJavaScript([1 // Int
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
  ]) // (Array Float)
  ,arrayFromJavaScript([2 // Int
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
  ]) // (Array Int)
) // Mesh
;
// Mesh
const cube = mesh_62 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
(arrayFromJavaScript([op_negate_1659 // (Func Float Float)
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
  ]) // (Array Float)
  ,arrayFromJavaScript([0 // Int
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
  ]) // (Array Int)
) // Mesh
;
// Mesh
const octahedron = mesh_62 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
(arrayFromJavaScript([1 // Int
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
  ]) // (Array Float)
  ,arrayFromJavaScript([0 // Int
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
  ]) // (Array Int)
) // Mesh
;
// Mesh
const dodecahedron = ((t) => ((r) => mesh_62 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
    (arrayFromJavaScript([op_negate_1659 // (Func Float Float)
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
      ]) // (Array Float)
      ,arrayFromJavaScript([3 // Int
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
      ]) // (Array Int)
    ) // Mesh
    )(op_div_590 // [!'@267.(Func '@267 '@267 '@267) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (1 // Int
      ,t // Float
    ) // Float
  )
   // Mesh
  )(op_div_590 // [!'@241.(Func '@241 '@241 '@241) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@264.(Func '@264 '@264 '@264) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
const icosahedron = ((t) => mesh_62 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
  (arrayFromJavaScript([op_negate_1659 // (Func Float Float)
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
    ]) // (Array Float)
    ,arrayFromJavaScript([0 // Int
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
    ]) // (Array Int)
  ) // Mesh
  )(op_div_590 // [!'@273.(Func '@273 '@273 '@273) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@274.(Func '@274 '@274 '@274) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
// (Func (Array Float) Mesh)
function mesh_36(vertexBuffer)
{
  return mesh_62 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | !'@232!'@233.(Func '@232 '@233) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
  (vertexBuffer // (Array Float)
    ,indices_292 // (Func (Array Float) (Array Int))
    (vertexBuffer // (Array Float)
    ) // (Array Int)
  ) // Mesh
  ;
}
// (Func (Array Float) (Array Int) Mesh)
function mesh_62(vertexBuffer, indexBuffer)
{
  return mesh_93 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | !'@160!'@161.(Func '@160 '@161) | !'@162!'@163!'@164.(Func '@162 '@163 '@164) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
  (vertexBuffer // (Array Float)
    ,indexBuffer // (Array Int)
    ,setAll_2024 // (Func (Array Float) Float (Array Float))
    (vertexBuffer // (Array Float)
      ,0 // Float
    ) // (Array Float)
  ) // Mesh
  ;
}
// (Func (Array Float) (Array Int) (Array Float) Mesh)
function mesh_93(vertexBuffer, indexBuffer, uvBuffer)
{
  return mesh_2151 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | !'@149!'@150.(Func '@149 '@150) | !'@151!'@152!'@153.(Func '@151 '@152 '@153) | !'@154!'@155!'@156!'@157.(Func '@154 '@155 '@156 '@157)]
  (vertexBuffer // (Array Float)
    ,indexBuffer // (Array Int)
    ,uvBuffer // (Array Float)
    ,setAll_2024 // (Func (Array Float) Float (Array Float))
    (vertexBuffer // (Array Float)
      ,0 // Float
    ) // (Array Float)
  ) // Mesh
  ;
}
// (Func (Array T0) Int Bool Bool (Array Int))
function quadStripToMeshIndices_1043(vertices, rows, connectRows, connectCols)
{
  let cols = op_div_798 // [!'@676.(Func '@676 '@676 '@676) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func !'@606.(Array '@606) Int)
    (vertices // !'@606.(Array '@606)
    ) // Int
    ,rows // Int
  ) // Int
  ;
  let nr = connectRows // Bool
   ? rows // Int
   : op_sub_754 // [!'@677.(Func '@677 '@677 '@677) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (rows // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let nc = connectCols // Bool
   ? cols // Int
   : op_sub_754 // [!'@678.(Func '@678 '@678 '@678) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (cols // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let indices = mutable_1760 // (Func (Array Int) (ArrayBuilder Int))
  (arrayFromJavaScript([]) // (Array Int)
  ) // (ArrayBuilder Int)
  ;
  for (let i4=0; i4 < op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,nr // Int
    ) // (Array Int)
  .length; ++i4)
  {
    const row = op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,nr // Int
    ) // (Array Int)
    [i4];
    {
      for (let i5=0; i5 < op_dot_dot_2038 // (Func Int Int (Array Int))
        (0 // Int
          ,nc // Int
        ) // (Array Int)
      .length; ++i5)
      {
        const col = op_dot_dot_2038 // (Func Int Int (Array Int))
        (0 // Int
          ,nc // Int
        ) // (Array Int)
        [i5];
        {
          let a = op_add_732 // [!'@680.(Func '@680 '@680 '@680) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@679.(Func '@679 '@679 '@679) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let b = op_add_732 // [!'@684.(Func '@684 '@684 '@684) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@682.(Func '@682 '@682 '@682) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@681.(Func '@681 '@681 '@681) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@683.(Func '@683 '@683 '@683) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let c = op_add_732 // [!'@690.(Func '@690 '@690 '@690) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@686.(Func '@686 '@686 '@686) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@685.(Func '@685 '@685 '@685) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@689.(Func '@689 '@689 '@689) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@688.(Func '@688 '@688 '@688) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@687.(Func '@687 '@687 '@687) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let d = op_add_732 // [!'@694.(Func '@694 '@694 '@694) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@693.(Func '@693 '@693 '@693) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@692.(Func '@692 '@692 '@692) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@691.(Func '@691 '@691 '@691) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          indices = pushMany_1959 // (Func (ArrayBuilder Int) (Array Int) (ArrayBuilder Int))
          (indices // (ArrayBuilder Int)
            ,arrayFromJavaScript([a // Int
              ,b // Int
              ,d // Int
            ]) // (Array Int)
          ) // (ArrayBuilder Int)
           // (ArrayBuilder Int)
          ;
          indices = pushMany_1959 // (Func (ArrayBuilder Int) (Array Int) (ArrayBuilder Int))
          (indices // (ArrayBuilder Int)
            ,arrayFromJavaScript([b // Int
              ,c // Int
              ,d // Int
            ]) // (Array Int)
          ) // (ArrayBuilder Int)
           // (ArrayBuilder Int)
          ;
        }
      }
    }
  }
  return immutable_1847 // (Func (ArrayBuilder Int) (Array Int))
  (indices // (ArrayBuilder Int)
  ) // (Array Int)
  ;
}
// (Func (Array Float3) (Array Float))
function toVertexBuffer_1078(xs)
{
  var r=[];
  for (var i=0; i < xs.length; ++i) {
    var x = xs[i];
    r.push(x[0], x[1], x[2]);    
  }
  return r;
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
  return op_add_518 // [!'@1448.(Func '@1448 '@1448 '@1448) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (from // '@1443
    ,op_mul_566 // [!'@1447.(Func '@1447 '@1447 '@1447) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // '@1443
      ,length // '@1443
    ) // '@1443
  ) // '@1443
  ;
}
// (Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh)
function meshFromUV_1383(f, uCount, vCount, uStart, vStart, uLength, vLength, uJoin, vJoin)
{
  let uMax = uJoin // Bool
   ? float_41 // (Func Int Float)
  (uCount // Int
  ) // Float
   : float_41 // (Func Int Float)
  (op_sub_754 // [!'@696.(Func '@696 '@696 '@696) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_754 // [!'@697.(Func '@697 '@697 '@697) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (vCount // Int
      ,1 // Int
    ) // Int
  ) // Float
   // Float
  ;
  let uvs = cartesianProduct_2000 // (Func (Array Float) (Array Float) (Func Float Float Float3) (Array Float3))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,uCount // Int
    ) // (Array Int)
    ,op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,vCount // Int
    ) // (Array Int)
    ,(u, v) => vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
    (op_add_842 // [!'@700.(Func '@700 '@700 '@700) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@699.(Func '@699 '@699 '@699) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@698.(Func '@698 '@698 '@698) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,uMax // Float
          ) // Float
          ,uLength // Float
        ) // Float
        ,uStart // Float
      ) // Float
      ,op_add_842 // [!'@703.(Func '@703 '@703 '@703) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@702.(Func '@702 '@702 '@702) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@701.(Func '@701 '@701 '@701) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  let indices = quadStripToMeshIndices_1043 // (Func (Array Float3) Int Bool Bool (Array Int))
  (points // (Array Float3)
    ,vCount // Int
    ,uJoin // Bool
    ,vJoin // Bool
  ) // (Array Int)
  ;
  return mesh_93 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
  (toVertexBuffer_1078 // (Func (Array Float3) (Array Float))
    (points // (Array Float3)
    ) // (Array Float)
    ,indices // (Array Int)
    ,toVertexBuffer_1078 // (Func (Array Float3) (Array Float))
    (uvs // (Array Float3)
    ) // (Array Float)
  ) // Mesh
  ;
}
// (Func (Func Float Float Float3) Int Mesh)
function meshFromUV_1404(f, segments)
{
  return meshFromUV_1437 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | !'@728!'@729!'@730.(Func '@728 '@729 '@730) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (f // (Func Float Float Float3)
    ,segments // Int
    ,true // Bool
  ) // Mesh
  ;
}
// (Func (Func Float Float Float3) Int Bool Mesh)
function meshFromUV_1437(f, segments, join)
{
  return meshFromUV_1383 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | !'@721!'@722!'@723.(Func '@721 '@722 '@723) | !'@724!'@725!'@726!'@727.(Func '@724 '@725 '@726 '@727)]
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
function spherePoint_1537(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@902.(Func '@902 '@902 '@902) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (cos_353 // (Func Float Float)
        (op_mul_886 // [!'@899.(Func '@899 '@899 '@899) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mul_886 // [!'@898.(Func '@898 '@898 '@898) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (u // Float
              ,2 // Float
            ) // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@901.(Func '@901 '@901 '@901) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@900.(Func '@900 '@900 '@900) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@904.(Func '@904 '@904 '@904) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@903.(Func '@903 '@903 '@903) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@909.(Func '@909 '@909 '@909) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (op_mul_886 // [!'@906.(Func '@906 '@906 '@906) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@905.(Func '@905 '@905 '@905) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@908.(Func '@908 '@908 '@908) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@907.(Func '@907 '@907 '@907) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function sphere_1554(segments)
{
  return meshFromUV_1404 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (spherePoint_1537 // (Func Float Float Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function sphere_1565()
{
  return sphere_1554 // [(Func Int Mesh) | !'@912.(Func '@912)]
  (32 // Int
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function cylinderPoint_1613(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (sin_449 // (Func Float Float)
    (op_mul_886 // [!'@739.(Func '@739 '@739 '@739) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@738.(Func '@738 '@738 '@738) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,v // Float
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@741.(Func '@741 '@741 '@741) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@740.(Func '@740 '@740 '@740) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function cylinder_1630(segments)
{
  return meshFromUV_1404 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (cylinderPoint_1613 // (Func Float Float Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function cylinder_1641()
{
  return cylinder_1630 // [(Func Int Mesh) | !'@743.(Func '@743)]
  (32 // Int
  ) // Mesh
  ;
}
// (Func Float Float Int Mesh)
function torus_1681(r1, r2, segments)
{
  return meshFromUV_1404 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  ((u, v) => torusPoint_1811 // (Func Float Float Float Float Float3)
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
function torusPoint_1811(u, v, r1, r2)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@948.(Func '@948 '@948 '@948) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@945.(Func '@945 '@945 '@945) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@944.(Func '@944 '@944 '@944) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_886 // [!'@943.(Func '@943 '@943 '@943) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_886 // [!'@942.(Func '@942 '@942 '@942) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,2 // Float
              ) // Float
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,cos_353 // (Func Float Float)
      (op_mul_886 // [!'@947.(Func '@947 '@947 '@947) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@946.(Func '@946 '@946 '@946) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@955.(Func '@955 '@955 '@955) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@952.(Func '@952 '@952 '@952) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@951.(Func '@951 '@951 '@951) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_886 // [!'@950.(Func '@950 '@950 '@950) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_886 // [!'@949.(Func '@949 '@949 '@949) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Float
                ,2 // Float
              ) // Float
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@954.(Func '@954 '@954 '@954) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@953.(Func '@953 '@953 '@953) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@958.(Func '@958 '@958 '@958) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (r2 // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@957.(Func '@957 '@957 '@957) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@956.(Func '@956 '@956 '@956) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function torus_1824()
{
  return torus_1681 // [(Func Float Float Int Mesh) | !'@961.(Func '@961)]
  (2 // Int
    ,0.5 // Float
    ,32 // Int
  ) // Mesh
  ;
}
// (Func Mesh Int)
function vertexCount_1845(mesh)
{
  return op_div_798 // [!'@463.(Func '@463 '@463 '@463) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func (Array Float) Int)
    (vertexBuffer_2169 // (Func Mesh (Array Float))
      (mesh // Mesh
      ) // (Array Float)
    ) // Int
    ,3 // Int
  ) // Int
  ;
}
// (Func Mesh Int)
function faceCount_1866(mesh)
{
  return op_div_798 // [!'@847.(Func '@847 '@847 '@847) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func (Array Int) Int)
    (indexBuffer_2187 // (Func Mesh (Array Int))
      (mesh // Mesh
      ) // (Array Int)
    ) // Int
    ,3 // Int
  ) // Int
  ;
}
// (Func Mesh Int Float3)
function vertex_1896(mesh, i)
{
  return vector_151 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (take_994 // [!'@774.(Func (Array '@774) Int (Array '@774)) | !'@775.(Func (Array '@775) Int Int (Array '@775))]
    (vertexBuffer_2169 // (Func Mesh (Array Float))
      (mesh // Mesh
      ) // (Array Float)
      ,op_mul_776 // [!'@773.(Func '@773 '@773 '@773) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,3 // Int
      ) // Int
      ,3 // Int
    ) // (Array Float)
  ) // Float3
  ;
}
// (Func Mesh Int Float3)
function vertexColor_1926(mesh, i)
{
  return vector_151 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (take_994 // [!'@1590.(Func (Array '@1590) Int (Array '@1590)) | !'@1591.(Func (Array '@1591) Int Int (Array '@1591))]
    (colorBuffer_2223 // (Func Mesh (Array Float))
      (mesh // Mesh
      ) // (Array Float)
      ,op_mul_776 // [!'@1589.(Func '@1589 '@1589 '@1589) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,3 // Int
      ) // Int
      ,3 // Int
    ) // (Array Float)
  ) // Float3
  ;
}
// (Func Mesh Int Float3)
function vertexUV_1956(mesh, i)
{
  return vector_151 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (take_994 // [!'@508.(Func (Array '@508) Int (Array '@508)) | !'@509.(Func (Array '@509) Int Int (Array '@509))]
    (uvBuffer_2205 // (Func Mesh (Array Float))
      (mesh // Mesh
      ) // (Array Float)
      ,op_mul_776 // [!'@507.(Func '@507 '@507 '@507) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,3 // Int
      ) // Int
      ,3 // Int
    ) // (Array Float)
  ) // Float3
  ;
}
// (Func Mesh (Array Float3))
function vertexColors_1985(mesh)
{
  return array_1691 // [!'@1597.(Func Int (Func Int '@1597) (Array '@1597)) | (Func Float3 (Array Float)) | (Func Float3 (Array Float))]
  (vertexCount_1845 // (Func Mesh Int)
    (mesh // Mesh
    ) // Int
    ,(i) => vertexColor_1926 // (Func Mesh Int Float3)
    (mesh // Mesh
      ,i // Int
    ) // Float3
     // (Func Int Float3)
  ) // (Array Float3)
  ;
}
// (Func Mesh (Array Float3))
function vertexUVs_2014(mesh)
{
  return array_1691 // [!'@510.(Func Int (Func Int '@510) (Array '@510)) | (Func Float3 (Array Float)) | (Func Float3 (Array Float))]
  (vertexCount_1845 // (Func Mesh Int)
    (mesh // Mesh
    ) // Int
    ,(i) => vertexUV_1956 // (Func Mesh Int Float3)
    (mesh // Mesh
      ,i // Int
    ) // Float3
     // (Func Int Float3)
  ) // (Array Float3)
  ;
}
// (Func Mesh (Array Float3))
function vertices_2044(mesh)
{
  return array_1691 // [!'@776.(Func Int (Func Int '@776) (Array '@776)) | (Func Float3 (Array Float)) | (Func Float3 (Array Float))]
  (vertexCount_1845 // (Func Mesh Int)
    (mesh // Mesh
    ) // Int
    ,(i) => vertex_1896 // (Func Mesh Int Float3)
    (mesh // Mesh
      ,i // Int
    ) // Float3
     // (Func Int Float3)
  ) // (Array Float3)
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertices_2080(m, points)
{
  return mesh_2151 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
  (toVertexBuffer_1078 // (Func (Array Float3) (Array Float))
    (points // (Array Float3)
    ) // (Array Float)
    ,indexBuffer_2187 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvBuffer_2205 // (Func Mesh (Array Float))
    (m // Mesh
    ) // (Array Float)
    ,colorBuffer_2223 // (Func Mesh (Array Float))
    (m // Mesh
    ) // (Array Float)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertexColors_2116(m, colors)
{
  return mesh_2151 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
  (vertexBuffer_2169 // (Func Mesh (Array Float))
    (m // Mesh
    ) // (Array Float)
    ,indexBuffer_2187 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,uvBuffer_2205 // (Func Mesh (Array Float))
    (m // Mesh
    ) // (Array Float)
    ,toVertexBuffer_1078 // (Func (Array Float3) (Array Float))
    (colors // (Array Float3)
    ) // (Array Float)
  ) // Mesh
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertexUVs_2152(m, uvs)
{
  return mesh_2151 // [(Func (Array Float) (Array Int) (Array Float) (Array Float) Mesh) | (Func (Array Float) Mesh) | (Func (Array Float) (Array Int) Mesh) | (Func (Array Float) (Array Int) (Array Float) Mesh)]
  (vertexBuffer_2169 // (Func Mesh (Array Float))
    (m // Mesh
    ) // (Array Float)
    ,indexBuffer_2187 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
    ,toVertexBuffer_1078 // (Func (Array Float3) (Array Float))
    (uvs // (Array Float3)
    ) // (Array Float)
    ,colorBuffer_2223 // (Func Mesh (Array Float))
    (m // Mesh
    ) // (Array Float)
  ) // Mesh
  ;
}
// (Func Mesh (Func Float3 Float3) Mesh)
function transform_2179(m, f)
{
  return setVertices_2080 // (Func Mesh (Array Float3) Mesh)
  (m // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (vertices_2044 // (Func Mesh (Array Float3))
      (m // Mesh
      ) // (Array Float3)
      ,f // (Func Float3 Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function translate_2208(m, amount)
{
  return transform_2179 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_add_1255 // [!'@787.(Func '@787 '@787 '@787) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function scale_2237(m, amount)
{
  return transform_2179 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_mul_1385 // [!'@780.(Func '@780 '@780 '@780) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function kleinPoint_2567(a, b)
{
  let u = op_mul_886 // [!'@1005.(Func '@1005 '@1005 '@1005) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1004.(Func '@1004 '@1004 '@1004) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,pi // Float
    ) // Float
    ,2 // Float
  ) // Float
  ;
  let v = op_mul_886 // [!'@1007.(Func '@1007 '@1007 '@1007) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1006.(Func '@1006 '@1006 '@1006) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    x = op_add_842 // [!'@1016.(Func '@1016 '@1016 '@1016) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1010.(Func '@1010 '@1010 '@1010) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1008.(Func '@1008 '@1008 '@1008) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (3 // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,op_add_842 // [!'@1009.(Func '@1009 '@1009 '@1009) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (1 // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1015.(Func '@1015 '@1015 '@1015) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1014.(Func '@1014 '@1014 '@1014) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1013.(Func '@1013 '@1013 '@1013) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (2 // Float
            ,op_sub_864 // [!'@1012.(Func '@1012 '@1012 '@1012) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (1 // Float
              ,op_div_908 // [!'@1011.(Func '@1011 '@1011 '@1011) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    z = op_sub_864 // [!'@1023.(Func '@1023 '@1023 '@1023) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1017.(Func '@1017 '@1017 '@1017) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_negate_1659 // (Func Float Float)
        (8 // Float
        ) // Float
        ,sin_449 // (Func Float Float)
        (u // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1022.(Func '@1022 '@1022 '@1022) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1021.(Func '@1021 '@1021 '@1021) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@1020.(Func '@1020 '@1020 '@1020) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (2 // Float
            ,op_sub_864 // [!'@1019.(Func '@1019 '@1019 '@1019) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (1 // Float
              ,op_div_908 // [!'@1018.(Func '@1018 '@1018 '@1018) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    x = op_add_842 // [!'@1032.(Func '@1032 '@1032 '@1032) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@1026.(Func '@1026 '@1026 '@1026) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1024.(Func '@1024 '@1024 '@1024) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (3 // Float
          ,cos_353 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
        ,op_add_842 // [!'@1025.(Func '@1025 '@1025 '@1025) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (1 // Float
          ,sin_449 // (Func Float Float)
          (u // Float
          ) // Float
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@1031.(Func '@1031 '@1031 '@1031) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@1029.(Func '@1029 '@1029 '@1029) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (2 // Float
          ,op_sub_864 // [!'@1028.(Func '@1028 '@1028 '@1028) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (1 // Float
            ,op_div_908 // [!'@1027.(Func '@1027 '@1027 '@1027) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (cos_353 // (Func Float Float)
              (u // Float
              ) // Float
              ,2 // Float
            ) // Float
          ) // Float
        ) // Float
        ,cos_353 // (Func Float Float)
        (op_add_842 // [!'@1030.(Func '@1030 '@1030 '@1030) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
     // Float
    ;
    z = op_mul_886 // [!'@1033.(Func '@1033 '@1033 '@1033) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  y = op_mul_886 // [!'@1037.(Func '@1037 '@1037 '@1037) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1036.(Func '@1036 '@1036 '@1036) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (2 // Float
      ) // Float
      ,op_sub_864 // [!'@1035.(Func '@1035 '@1035 '@1035) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,op_div_908 // [!'@1034.(Func '@1034 '@1034 '@1034) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_div_908 // [!'@1038.(Func '@1038 '@1038 '@1038) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x // Float
      ,4 // Float
    ) // Float
    ,op_div_908 // [!'@1039.(Func '@1039 '@1039 '@1039) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y // Float
      ,4 // Float
    ) // Float
    ,op_div_908 // [!'@1040.(Func '@1040 '@1040 '@1040) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (z // Float
      ,4 // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function klein_2581()
{
  return meshFromUV_1437 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (kleinPoint_2567 // (Func Float Float Float3)
    ,32 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function planeXYPoint_2602(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (u // Float
    ,v // Float
    ,0 // Int
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeXZPoint_2623(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (u // Float
    ,0 // Int
    ,v // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeYZPoint_2644(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (0 // Int
    ,u // Float
    ,v // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeYXPoint_2665(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (v // Float
    ,u // Float
    ,0 // Int
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeZXPoint_2686(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (v // Float
    ,0 // Int
    ,u // Float
  ) // Float3
  ;
}
// (Func Float Float Float3)
function planeZYPoint_2707(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (0 // Int
    ,v // Float
    ,u // Float
  ) // Float3
  ;
}
// (Func Mesh)
function plane_2721()
{
  return meshFromUV_1437 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (planeXYPoint_2602 // (Func Float Float Float3)
    ,16 // Int
    ,false // Bool
  ) // Mesh
  ;
}
// (Func Float Float Float3)
function mobiusPoint_2837(a, b)
{
  let u = op_sub_864 // [!'@1062.(Func '@1062 '@1062 '@1062) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (a // Float
    ,0.5 // Float
  ) // Float
  ;
  let v = op_mul_886 // [!'@1064.(Func '@1064 '@1064 '@1064) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@1063.(Func '@1063 '@1063 '@1063) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (b // Float
      ,2 // Float
    ) // Float
    ,pi // Float
  ) // Float
  ;
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@1068.(Func '@1068 '@1068 '@1068) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (cos_353 // (Func Float Float)
      (v // Float
      ) // Float
      ,op_add_518 // [!'@1067.(Func '@1067 '@1067 '@1067) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (2 // Int
        ,op_mul_886 // [!'@1066.(Func '@1066 '@1066 '@1066) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,cos_353 // (Func Float Float)
          (op_div_590 // [!'@1065.(Func '@1065 '@1065 '@1065) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (v // Float
              ,2 // Int
            ) // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1072.(Func '@1072 '@1072 '@1072) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (v // Float
      ) // Float
      ,op_add_518 // [!'@1071.(Func '@1071 '@1071 '@1071) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (2 // Int
        ,op_mul_886 // [!'@1070.(Func '@1070 '@1070 '@1070) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Float
          ,cos_353 // (Func Float Float)
          (op_div_590 // [!'@1069.(Func '@1069 '@1069 '@1069) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (v // Float
              ,2 // Int
            ) // Float
          ) // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1074.(Func '@1074 '@1074 '@1074) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (u // Float
      ,sin_449 // (Func Float Float)
      (op_div_590 // [!'@1073.(Func '@1073 '@1073 '@1073) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Int
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function mobius_2851()
{
  return meshFromUV_1437 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Bool Bool Mesh) | (Func (Func Float Float Float3) Int Mesh) | (Func (Func Float Float Float3) Int Bool Mesh)]
  (mobiusPoint_2837 // (Func Float Float Float3)
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
  simpleArrayTest_439 // !'@1312.(Func '@1312)
  () // '@1312
  ;
  return geometryTest_665 // (Func (Array (Func Float Float Float Float Mesh)))
  () // (Array (Func Float Float Float Float Mesh))
  ;
}
// (Func T0)
function simpleArrayTest_439()
{
  let xs = arrayFromJavaScript([1 // Int
    ,11 // Int
    ,3 // Int
  ]) // (Array Int)
  ;
  print_2094 // !'@1130.(Func Str '@1130)
  ("'Expect [1, 11, 3]'" // Str
  ) // '@1130
  ;
  print_2094 // !'@1132.(Func (Array Int) '@1132)
  (xs // (Array Int)
  ) // '@1132
  ;
  print_2094 // !'@1134.(Func Str '@1134)
  ("'Expect 1, 11, 3'" // Str
  ) // '@1134
  ;
  for (let i6=0; i6 < xs // (Array Int)
  .length; ++i6)
  {
    const x = xs // (Array Int)
    [i6];
    {
      print_2094 // !'@1137.(Func Int '@1137)
      (x // Int
      ) // '@1137
      ;
    }
  }
  print_2094 // !'@1139.(Func Str '@1139)
  ("'Expect 1'" // Str
  ) // '@1139
  ;
  print_2094 // !'@1141.(Func Int '@1141)
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (xs // (Array Int)
      ,0 // Int
    ) // Int
  ) // '@1141
  ;
  print_2094 // !'@1144.(Func Str '@1144)
  ("'Expect 3'" // Str
  ) // '@1144
  ;
  print_2094 // !'@1146.(Func Int '@1146)
  (count_1711 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1146
  ;
  print_2094 // !'@1149.(Func Str '@1149)
  ("'Expect 1'" // Str
  ) // '@1149
  ;
  print_2094 // !'@1151.(Func Int '@1151)
  (first_1866 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1151
  ;
  print_2094 // !'@1154.(Func Str '@1154)
  ("'Expect 3'" // Str
  ) // '@1154
  ;
  print_2094 // !'@1156.(Func Int '@1156)
  (last_1851 // [!'@1306.(Func (Array '@1306) Int (Array '@1306)) | !'@1307.(Func !'@1307.(Array '@1307) '@1307)]
    (xs // (Array Int)
    ) // Int
  ) // '@1156
  ;
  print_2094 // !'@1160.(Func Str '@1160)
  ("'Expect 1'" // Str
  ) // '@1160
  ;
  print_2094 // !'@1162.(Func Int '@1162)
  (min_1395 // [!'@1308.(Func '@1308 '@1308 '@1308) | !'@1309.(Func !'@1309.(Array '@1309) '@1309)]
    (xs // (Array Int)
    ) // Int
  ) // '@1162
  ;
  print_2094 // !'@1185.(Func Str '@1185)
  ("'Expect 11'" // Str
  ) // '@1185
  ;
  print_2094 // !'@1187.(Func Int '@1187)
  (max_1417 // [!'@1310.(Func '@1310 '@1310 '@1310) | !'@1311.(Func !'@1311.(Array '@1311) '@1311)]
    (xs // (Array Int)
    ) // Int
  ) // '@1187
  ;
  let ys = mutable_1760 // (Func (Array Int) (ArrayBuilder Int))
  (xs // (Array Int)
  ) // (ArrayBuilder Int)
  ;
  ys = set_1824 // (Func (ArrayBuilder Int) Int Int (ArrayBuilder Int))
  (ys // (ArrayBuilder Int)
    ,1 // Int
    ,5 // Int
  ) // (ArrayBuilder Int)
   // (ArrayBuilder Int)
  ;
  print_2094 // !'@1208.(Func Str '@1208)
  ("'Expect 5'" // Str
  ) // '@1208
  ;
  print_2094 // !'@1210.(Func Int '@1210)
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (ys // (ArrayBuilder Int)
      ,1 // Int
    ) // Int
  ) // '@1210
  ;
  print_2094 // !'@1213.(Func Str '@1213)
  ("'Expect 1, 3, 11'" // Str
  ) // '@1213
  ;
  let zs = sort_1697 // (Func (Array Int) (Array Int))
  (xs // (Array Int)
  ) // (Array Int)
  ;
  for (let i7=0; i7 < zs // (Array Int)
  .length; ++i7)
  {
    const z = zs // (Array Int)
    [i7];
    {
      print_2094 // !'@1264.(Func Int '@1264)
      (z // Int
      ) // '@1264
      ;
    }
  }
  print_2094 // !'@1266.(Func Str '@1266)
  ("'Expect 3'" // Str
  ) // '@1266
  ;
  print_2094 // !'@1268.(Func Int '@1268)
  (median_1797 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1268
  ;
  print_2094 // !'@1299.(Func Str '@1299)
  ("'Expect 15'" // Str
  ) // '@1299
  ;
  print_2094 // !'@1301.(Func Float '@1301)
  (sum_1330 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1301
  ;
  print_2094 // !'@1303.(Func Str '@1303)
  ("'Expect 5'" // Str
  ) // '@1303
  ;
  print_2094 // !'@1305.(Func Float '@1305)
  (average_1373 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1305
  ;
}
// (Func Mesh Mesh)
function colorGeometry_559(g)
{
  return setVertexColors_2116 // (Func Mesh (Array Float3) Mesh)
  (g // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (vertexUVs_2014 // (Func Mesh (Array Float3))
      (g // Mesh
      ) // (Array Float3)
      ,(v) => vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
      (op_add_842 // [!'@524.(Func '@524 '@524 '@524) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@523.(Func '@523 '@523 '@523) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (sin_449 // (Func Float Float)
            (op_mul_886 // [!'@522.(Func '@522 '@522 '@522) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_mul_886 // [!'@521.(Func '@521 '@521 '@521) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
        ,op_add_842 // [!'@528.(Func '@528 '@528 '@528) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@527.(Func '@527 '@527 '@527) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (cos_353 // (Func Float Float)
            (op_mul_886 // [!'@526.(Func '@526 '@526 '@526) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_mul_886 // [!'@525.(Func '@525 '@525 '@525) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (scale_2237 // (Func Mesh Float3 Mesh)
    (translate_2208 // (Func Mesh Float3 Mesh)
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
  return arrayFromJavaScript([demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
    (sphere_1565 // [(Func Int Mesh) | (Func Mesh)]
      () // Mesh
    ) // (Func Float Float Float Float Mesh)
    ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
    (cylinder_1641 // [(Func Int Mesh) | (Func Mesh)]
      () // Mesh
    ) // (Func Float Float Float Float Mesh)
    ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
    (torus_1824 // [(Func Float Float Int Mesh) | (Func Mesh)]
      () // Mesh
    ) // (Func Float Float Float Float Mesh)
    ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
    (klein_2581 // (Func Mesh)
      () // Mesh
    ) // (Func Float Float Float Float Mesh)
    ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
    (plane_2721 // (Func Mesh)
      () // Mesh
    ) // (Func Float Float Float Float Mesh)
    ,demoGeometry_610 // (Func Mesh (Func Float Float Float Float Mesh))
    (mobius_2851 // (Func Mesh)
      () // Mesh
    ) // (Func Float Float Float Float Mesh)
  ]) // (Array (Func Float Float Float Float Mesh))
  ;
}

return main_39;
})();
