// Generated using Heron on Tue Apr 24 2018 12:53:05 GMT-0400 (Eastern Daylight Time)
var heronMain = (function () {
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
function float2(x, y) { return ({ x: x, y: y }); }
function float3(x, y, z) { return ({ x: x, y: y, z: z }); }
function float4(x, y, z, w) { return ({ x: x, y: y, z: z, w: w }); }
function x(v) { return v.x; }
function y(v) { return v.y; }
function z(v) { return v.z; }
function w(v) { return v.w; }
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
  (op_add_842(x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_add_842(y_149 // (Func Float3 Float)
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
  (op_sub_864(x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_sub_864(y_149 // (Func Float3 Float)
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
  (op_mul_886(x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mul_886(y_149 // (Func Float3 Float)
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
  (op_div_908(x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_div_908(y_149 // (Func Float3 Float)
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
  (op_mod_930(x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mod_930(y_149 // (Func Float3 Float)
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
  return float3_119(op_add_842(x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842(y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842(z_164 // (Func Float3 Float)
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
  return float3_119(op_sub_864(x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864(y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864(z_164 // (Func Float3 Float)
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
  return float3_119(op_mul_886(x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886(y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886(z_164 // (Func Float3 Float)
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
  return float3_119(op_div_908(x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908(y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908(z_164 // (Func Float3 Float)
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
  return float3_119(op_mod_930(x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930(y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930(z_164 // (Func Float3 Float)
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
  return float3_119(op_obr_cbr_2073 // (Func (Array Float) Int Float)
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
  for (let i0=0; i0 < ys // !'@436.(Array '@436)
  .count; ++i0)
  {
    const y = ys // !'@436.(Array '@436)
    .at(i0);
    {
      xs = push_1789 // !'@436.(Func (ArrayBuilder '@436) '@436 (ArrayBuilder '@436))
      (xs // !'@436.(ArrayBuilder '@436)
        ,y // '@436
      ) // !'@436.(ArrayBuilder '@436)
       // !'@436.(ArrayBuilder '@436)
      ;
    }
  }
  return xs // !'@436.(ArrayBuilder '@436)
  ;
}
// (Func (Array T0) (Array T0))
function reify_1990(xs)
{
  return immutable_1847 // !'@955.(Func (ArrayBuilder '@955) (Array '@955))
  (mutable_1760 // !'@955.(Func (Array '@955) (ArrayBuilder '@955))
    (xs // !'@955.(Array '@955)
    ) // !'@955.(ArrayBuilder '@955)
  ) // !'@955.(Array '@955)
  ;
}
// (Func Int Int (Array Int))
function op_dot_dot_2038(from, upto)
{
  return array_1691(op_sub_754(upto // Int
      ,from // Int
    ) // Int
    ,(i) => op_add_732(i // Int
      ,from // Int
    ) // Int
     // (Func Int Int)
  ) // (Array Int)
  ;
}
// (Func (Array T0) Int T0)
function op_obr_cbr_2073(xs, i)
{
  return at_1737 // !'@38.(Func !'@38.(Array '@38) Int '@38)
  (xs // !'@38.(Array '@38)
    ,i // Int
  ) // '@38
  ;
}
// (Func T0 T1)
const print_2094 = print;
// (Func Bool T0)
const assert_2106 = assert;
// (Func (Array Float) (Array Int) Mesh)
const mesh_2133 = mesh;
// (Func Mesh (Array Float))
const vertexBuffer_2151 = vertexBuffer;
// (Func Mesh (Array Int))
const indexBuffer_2169 = indexBuffer;
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
  return float3_119(x // Float
    ,y // Float
    ,z // Float
  ) // Float3
  ;
}
// (Func Float Float3)
function vector_120(x)
{
  return vector_98(x // Float
    ,x // Float
    ,x // Float
  ) // Float3
  ;
}
// (Func (Array Float) Float3)
function vector_151(xs)
{
  return vector_98(op_obr_cbr_2073 // (Func (Array Float) Int Float)
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
  return op_add_842(op_add_842(x_134 // (Func Float3 Float)
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
  (op_mul_566(a // Float3
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
  (op_sub_542(a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float3 Float)
function distance2_309(a, b)
{
  return length2_263 // (Func Float3 Float)
  (op_sub_542(a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float)
function normal_328(v)
{
  return op_div_908(v // Float3
    ,length_247 // (Func Float3 Float)
    (v // Float3
    ) // Float
  ) // Float
  ;
}
// (Func Float3 Float3 Float3)
function cross_431(a, b)
{
  return vector_98(op_sub_864(op_mul_886(y_149 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886(z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864(op_mul_886(z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,x_134 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886(x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864(op_mul_886(x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886(y_149 // (Func Float3 Float)
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
  return op_sub_864(v // Float3
    ,op_mul_886(op_mul_886(n // Float3
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
  return op_add_842(op_mul_886(a // Float
      ,op_sub_864(1 // Float
        ,x // Float
      ) // Float
    ) // Float
    ,op_mul_886(b // Float
      ,x // Float
    ) // Float
  ) // Float
  ;
}
// (Func Float3 Float3)
function negate_540(v)
{
  return vector_98(op_negate_1659 // (Func Float Float)
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
  return arrayFromJavaScript([x // '@1110
  ]) // !'@1110.(Array '@1110)
  ;
}
// (Func (Array T0) (Func T0 T1) (Array T1))
function map_53(xs, f)
{
  return array_1691(count_1711 // (Func !'@140.(Array '@140) Int)
    (xs // !'@140.(Array '@140)
    ) // Int
    ,(i) => f // !'@140!'@144.(Func '@140 '@144)
    (op_obr_cbr_2073 // !'@140.(Func !'@140.(Array '@140) Int '@140)
      (xs // !'@140.(Array '@140)
        ,i // Int
      ) // '@140
    ) // '@144
     // !'@144.(Func Int '@144)
  ) // !'@144.(Array '@144)
  ;
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_1691(count_1711 // (Func !'@870.(Array '@870) Int)
    (xs // !'@870.(Array '@870)
    ) // Int
    ,(i) => f // !'@870!'@874.(Func '@870 Int '@874)
    (op_obr_cbr_2073 // !'@870.(Func !'@870.(Array '@870) Int '@870)
      (xs // !'@870.(Array '@870)
        ,i // Int
      ) // '@870
      ,i // Int
    ) // '@874
     // !'@874.(Func Int '@874)
  ) // !'@874.(Array '@874)
  ;
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_1691(count_1711 // (Func !'@863.(Array '@863) Int)
    (xs // !'@863.(Array '@863)
    ) // Int
    ,f // !'@862.(Func Int '@862)
  ) // !'@862.(Array '@862)
  ;
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_710 // !'@733.(Func '@733 '@733 Bool)
  (x // '@733
    ,y // '@733
  ) // Bool
   ? x // '@733
   : y // '@733
   // '@733
  ;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_662 // !'@755.(Func '@755 '@755 Bool)
  (x // '@755
    ,y // '@755
  ) // Bool
   ? x // '@755
   : y // '@755
   // '@755
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1005.(Array '@1005) Int)
    (xs // !'@1005.(Array '@1005)
    ) // Int
    ,count_1711 // (Func !'@1005.(Array '@1005) Int)
    (ys // !'@1005.(Array '@1005)
    ) // Int
  ) // Bool
   ? xs // !'@1005.(Array '@1005)
   : ys // !'@1005.(Array '@1005)
   // !'@1005.(Array '@1005)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_662 // (Func Int Int Bool)
  (count_1711 // (Func !'@690.(Array '@690) Int)
    (xs // !'@690.(Array '@690)
    ) // Int
    ,count_1711 // (Func !'@690.(Array '@690) Int)
    (ys // !'@690.(Array '@690)
    ) // Int
  ) // Bool
   ? xs // !'@690.(Array '@690)
   : ys // !'@690.(Array '@690)
   // !'@690.(Array '@690)
  ;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@547.(Array '@547) Int)
    (xs // !'@547.(Array '@547)
    ) // Int
    ,0 // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53 // !'@998.(Func (Array Int) (Func Int '@998) (Array '@998))
  (indices // (Array Int)
    ,(i) => at_1737 // !'@998.(Func !'@998.(Array '@998) Int '@998)
    (xs // !'@998.(Array '@998)
      ,i // Int
    ) // '@998
     // !'@998.(Func Int '@998)
  ) // !'@998.(Array '@998)
  ;
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_2038 // (Func Int Int (Array Int))
  (0 // Int
    ,count_1711 // (Func !'@178.(Array '@178) Int)
    (xs // !'@178.(Array '@178)
    ) // Int
  ) // (Array Int)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function zip_372(xs, ys, f)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1136.(Array '@1136) Int)
    (xs // !'@1136.(Array '@1136)
    ) // Int
    ,count_1711 // (Func !'@1129.(Array '@1129) Int)
    (ys // !'@1129.(Array '@1129)
    ) // Int
  ) // Bool
   ? mapWithIndex_92 // !'@1136!'@1133.(Func (Array '@1136) (Func '@1136 Int '@1133) (Array '@1133))
  (xs // !'@1136.(Array '@1136)
    ,(x, i) => f // !'@1136!'@1129!'@1133.(Func '@1136 '@1129 '@1133)
    (x // '@1136
      ,op_obr_cbr_2073 // !'@1129.(Func !'@1129.(Array '@1129) Int '@1129)
      (ys // !'@1129.(Array '@1129)
        ,i // Int
      ) // '@1129
    ) // '@1133
     // !'@1136!'@1133.(Func '@1136 Int '@1133)
  ) // !'@1133.(Array '@1133)
   : mapWithIndex_92 // !'@1129!'@1133.(Func (Array '@1129) (Func '@1129 Int '@1133) (Array '@1133))
  (ys // !'@1129.(Array '@1129)
    ,(y, i) => f // !'@1136!'@1129!'@1133.(Func '@1136 '@1129 '@1133)
    (op_obr_cbr_2073 // !'@1136.(Func !'@1136.(Array '@1136) Int '@1136)
      (xs // !'@1136.(Array '@1136)
        ,i // Int
      ) // '@1136
      ,y // '@1129
    ) // '@1133
     // !'@1129!'@1133.(Func '@1129 Int '@1133)
  ) // !'@1133.(Array '@1133)
   // !'@1133.(Array '@1133)
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1900 // !'@205.(Func (Array '@205) Bool (Func Bool '@205 Bool) Bool)
  (xs // !'@205.(Array '@205)
    ,true // Bool
    ,(prev, x) => op_amp_amp_1585 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@205.(Func '@205 Bool)
      (x // '@205
      ) // Bool
    ) // Bool
     // !'@205.(Func Bool '@205 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1900 // !'@218.(Func (Array '@218) Bool (Func Bool '@218 Bool) Bool)
  (xs // !'@218.(Array '@218)
    ,false // Bool
    ,(prev, x) => op_bar_bar_1607 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@218.(Func '@218 Bool)
      (x // '@218
      ) // Bool
    ) // Bool
     // !'@218.(Func Bool '@218 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Array T1) Bool)
function eq_469(xs, ys)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@553.(Array '@553) Int)
    (xs // !'@553.(Array '@553)
    ) // Int
    ,count_1711 // (Func !'@554.(Array '@554) Int)
    (ys // !'@554.(Array '@554)
    ) // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_537(xs, p)
{
  let ys = mutable_1760 // !'@568.(Func (Array '@568) (ArrayBuilder '@568))
  (xs // !'@568.(Array '@568)
  ) // !'@568.(ArrayBuilder '@568)
  ;
  let i = 0 // Int
  ;
  for (let i1=0; i1 < xs // !'@568.(Array '@568)
  .count; ++i1)
  {
    const x = xs // !'@568.(Array '@568)
    .at(i1);
    {
      if (p // !'@568.(Func '@568 Bool)
        (x // '@568
        ) // Bool
      )
      {
        ys = set_1824 // !'@568.(Func (ArrayBuilder '@568) Int '@568 (ArrayBuilder '@568))
        (ys // !'@568.(ArrayBuilder '@568)
          ,i // Int
          ++ // Int
          ,x // '@568
        ) // !'@568.(ArrayBuilder '@568)
         // !'@568.(ArrayBuilder '@568)
        ;
      }
      else
      { }
    }
  }
  return take_967(immutable_1847 // !'@568.(Func (ArrayBuilder '@568) (Array '@568))
    (ys // !'@568.(ArrayBuilder '@568)
    ) // !'@568.(Array '@568)
    ,i // Int
  ) // !'@568.(Array '@568)
  ;
}
// (Func T0 Int (Array T0))
function repeat_566(x, n)
{
  return map_53 // !'@917.(Func (Array Int) (Func Int '@917) (Array '@917))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => x // '@917
     // !'@917.(Func Int '@917)
  ) // !'@917.(Array '@917)
  ;
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_662(xs, op)
{
  if (empty_245 // (Func !'@933.(Array '@933) Bool)
    (xs // !'@933.(Array '@933)
    ) // Bool
  )
  {
    return xs // !'@933.(Array '@933)
    ;
  }
  else
  { }
  let ys = mutable_1760 // !'@933.(Func (Array '@933) (ArrayBuilder '@933))
  (repeat_566 // !'@933.(Func '@933 Int (Array '@933))
    (op_obr_cbr_2073 // !'@933.(Func !'@933.(Array '@933) Int '@933)
      (xs // !'@933.(Array '@933)
        ,0 // Int
      ) // '@933
      ,count_1711 // (Func !'@933.(Array '@933) Int)
      (xs // !'@933.(Array '@933)
      ) // Int
    ) // !'@933.(Array '@933)
  ) // !'@933.(ArrayBuilder '@933)
  ;
  for (let i2=0; i2 < op_dot_dot_2038 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@933.(Array '@933) Int)
      (ys // !'@933.(ArrayBuilder '@933)
      ) // Int
    ) // (Array Int)
  .count; ++i2)
  {
    const i = op_dot_dot_2038 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@933.(Array '@933) Int)
      (ys // !'@933.(ArrayBuilder '@933)
      ) // Int
    ) // (Array Int)
    .at(i2);
    {
      ys = set_1824 // !'@933.(Func (ArrayBuilder '@933) Int '@933 (ArrayBuilder '@933))
      (ys // !'@933.(ArrayBuilder '@933)
        ,i // Int
        ,op // !'@933.(Func '@933 '@933 '@933)
        (op_obr_cbr_2073 // !'@933.(Func !'@933.(Array '@933) Int '@933)
          (xs // !'@933.(Array '@933)
            ,i // Int
          ) // '@933
          ,op_obr_cbr_2073 // !'@933.(Func !'@933.(Array '@933) Int '@933)
          (ys // !'@933.(ArrayBuilder '@933)
            ,op_sub_754(i // Int
              ,1 // Int
            ) // Int
          ) // '@933
        ) // '@933
      ) // !'@933.(ArrayBuilder '@933)
       // !'@933.(ArrayBuilder '@933)
      ;
    }
  }
  return immutable_1847 // !'@933.(Func (ArrayBuilder '@933) (Array '@933))
  (ys // !'@933.(ArrayBuilder '@933)
  ) // !'@933.(Array '@933)
  ;
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_720(xs)
{
  return map_53 // !'@179.(Func (Array Int) (Func Int '@179) (Array '@179))
  (indices_292 // (Func !'@179.(Array '@179) (Array Int))
    (xs // !'@179.(Array '@179)
    ) // (Array Int)
    ,(i) => op_gt_638 // (Func Int Int Bool)
    (i // Int
      ,0 // Int
    ) // Bool
     ? op_sub_542(op_obr_cbr_2073 // !'@179.(Func !'@179.(Array '@179) Int '@179)
      (xs // !'@179.(Array '@179)
        ,i // Int
      ) // '@179
      ,op_obr_cbr_2073 // !'@179.(Func !'@179.(Array '@179) Int '@179)
      (xs // !'@179.(Array '@179)
        ,op_sub_754(i // Int
          ,1 // Int
        ) // Int
      ) // '@179
    ) // '@179
     : op_obr_cbr_2073 // !'@179.(Func !'@179.(Array '@179) Int '@179)
    (xs // !'@179.(Array '@179)
      ,i // Int
    ) // '@179
     // '@179
     // !'@179.(Func Int '@179)
  ) // !'@179.(Array '@179)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function slice_758(xs, from, to)
{
  return map_53 // !'@517.(Func (Array Int) (Func Int '@517) (Array '@517))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (from // Int
      ,to // Int
    ) // (Array Int)
    ,(i) => at_1737 // !'@517.(Func !'@517.(Array '@517) Int '@517)
    (xs // !'@517.(Array '@517)
      ,i // Int
    ) // '@517
     // !'@517.(Func Int '@517)
  ) // !'@517.(Array '@517)
  ;
}
// (Func (Array T0) Int (Array T0))
function stride_805(xs, n)
{
  return map_53 // !'@1056.(Func (Array Int) (Func Int '@1056) (Array '@1056))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798(count_1711 // (Func !'@1056.(Array '@1056) Int)
        (xs // !'@1056.(Array '@1056)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1056.(Func !'@1056.(Array '@1056) Int '@1056)
    (xs // !'@1056.(Array '@1056)
      ,op_mul_776(i // Int
        ,n // Int
      ) // Int
    ) // '@1056
     // !'@1056.(Func Int '@1056)
  ) // !'@1056.(Array '@1056)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function stride_860(xs, from, n)
{
  return map_53 // !'@1043.(Func (Array Int) (Func Int '@1043) (Array '@1043))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798(count_1711 // (Func !'@1043.(Array '@1043) Int)
        (xs // !'@1043.(Array '@1043)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1043.(Func !'@1043.(Array '@1043) Int '@1043)
    (xs // !'@1043.(Array '@1043)
      ,op_add_732(from // Int
        ,op_mul_776(i // Int
          ,n // Int
        ) // Int
      ) // Int
    ) // '@1043
     // !'@1043.(Func Int '@1043)
  ) // !'@1043.(Array '@1043)
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_896(xs, n)
{
  return map_53 // !'@1070.(Func (Array Int) (Func Int (Array '@1070)) (Array (Array '@1070)))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => stride_860(xs // !'@1070.(Array '@1070)
      ,i // Int
      ,n // Int
    ) // !'@1070.(Array '@1070)
     // !'@1070.(Func Int (Array '@1070))
  ) // (Array !'@1070.(Array '@1070))
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_947(xs, n)
{
  return map_53 // !'@1020.(Func (Array Int) (Func Int (Array '@1020)) (Array (Array '@1020)))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => slice_758 // !'@1020.(Func (Array '@1020) Int Int (Array '@1020))
    (xs // !'@1020.(Array '@1020)
      ,op_mul_776(i // Int
        ,n // Int
      ) // Int
      ,op_mul_776(op_add_732(i // Int
          ,1 // Int
        ) // Int
        ,n // Int
      ) // Int
    ) // !'@1020.(Array '@1020)
     // !'@1020.(Func Int (Array '@1020))
  ) // (Array !'@1020.(Array '@1020))
  ;
}
// (Func (Array T0) Int (Array T0))
function take_967(xs, n)
{
  return slice_758 // !'@518.(Func (Array '@518) Int Int (Array '@518))
  (xs // !'@518.(Array '@518)
    ,0 // Int
    ,n // Int
  ) // !'@518.(Array '@518)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function take_994(xs, i, n)
{
  return take_967(skip_1023 // !'@535.(Func (Array '@535) Int (Array '@535))
    (xs // !'@535.(Array '@535)
      ,i // Int
    ) // !'@535.(Array '@535)
    ,n // Int
  ) // !'@535.(Array '@535)
  ;
}
// (Func (Array T0) Int (Array T0))
function skip_1023(xs, n)
{
  return slice_758 // !'@534.(Func (Array '@534) Int Int (Array '@534))
  (xs // !'@534.(Array '@534)
    ,n // Int
    ,op_sub_754(count_1711 // (Func !'@534.(Array '@534) Int)
      (xs // !'@534.(Array '@534)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@534.(Array '@534)
  ;
}
// (Func (Array T0) Int (Array T0))
function drop_1050(xs, n)
{
  return take_967(xs // !'@538.(Array '@538)
    ,op_sub_754(count_1711 // (Func !'@538.(Array '@538) Int)
      (xs // !'@538.(Array '@538)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@538.(Array '@538)
  ;
}
// (Func (Array T0) Int (Array T0))
function last_1077(xs, n)
{
  return skip_1023 // !'@674.(Func (Array '@674) Int (Array '@674))
  (xs // !'@674.(Array '@674)
    ,op_sub_754(count_1711 // (Func !'@674.(Array '@674) Int)
      (xs // !'@674.(Array '@674)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@674.(Array '@674)
  ;
}
// (Func (Array T0) T1 (Array T0))
function reverse_1121(xs, n)
{
  return map_53 // !'@974.(Func (Array Int) (Func Int '@974) (Array '@974))
  (indices_292 // (Func !'@974.(Array '@974) (Array Int))
    (xs // !'@974.(Array '@974)
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@974.(Func !'@974.(Array '@974) Int '@974)
    (xs // !'@974.(Array '@974)
      ,op_sub_754(op_sub_754(count_1711 // (Func !'@974.(Array '@974) Int)
          (xs // !'@974.(Array '@974)
          ) // Int
          ,1 // Int
        ) // Int
        ,i // Int
      ) // Int
    ) // '@974
     // !'@974.(Func Int '@974)
  ) // !'@974.(Array '@974)
  ;
}
// (Func Int (Func Int T0) (Array T0))
function gen_1145(cnt, f)
{
  return map_53 // !'@268.(Func (Array Int) (Func Int '@268) (Array '@268))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,cnt // Int
    ) // (Array Int)
    ,f // !'@268.(Func Int '@268)
  ) // !'@268.(Array '@268)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1213(xs, ys)
{
  return gen_1145 // !'@271.(Func Int (Func Int '@271) (Array '@271))
  (op_add_732(count_1711 // (Func !'@271.(Array '@271) Int)
      (xs // !'@271.(Array '@271)
      ) // Int
      ,count_1711 // (Func !'@271.(Array '@271) Int)
      (ys // !'@271.(Array '@271)
      ) // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,count_1711 // (Func !'@271.(Array '@271) Int)
      (xs // !'@271.(Array '@271)
      ) // Int
    ) // Bool
     ? op_obr_cbr_2073 // !'@271.(Func !'@271.(Array '@271) Int '@271)
    (xs // !'@271.(Array '@271)
      ,i // Int
    ) // '@271
     : op_obr_cbr_2073 // !'@271.(Func !'@271.(Array '@271) Int '@271)
    (ys // !'@271.(Array '@271)
      ,op_sub_754(i // Int
        ,count_1711 // (Func !'@271.(Array '@271) Int)
        (xs // !'@271.(Array '@271)
        ) // Int
      ) // Int
    ) // '@271
     // '@271
     // !'@271.(Func Int '@271)
  ) // !'@271.(Array '@271)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function cut_1275(xs, from, n)
{
  return gen_1145 // !'@350.(Func Int (Func Int '@350) (Array '@350))
  (op_sub_754(count_1711 // (Func !'@350.(Array '@350) Int)
      (xs // !'@350.(Array '@350)
      ) // Int
      ,n // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,from // Int
    ) // Bool
     ? op_obr_cbr_2073 // !'@350.(Func !'@350.(Array '@350) Int '@350)
    (xs // !'@350.(Array '@350)
      ,i // Int
    ) // '@350
     : op_obr_cbr_2073 // !'@350.(Func !'@350.(Array '@350) Int '@350)
    (xs // !'@350.(Array '@350)
      ,op_add_732(i // Int
        ,n // Int
      ) // Int
    ) // '@350
     // '@350
     // !'@350.(Func Int '@350)
  ) // !'@350.(Array '@350)
  ;
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1312(xs, from, ys)
{
  return concat_1213 // !'@1032.(Func (Array '@1032) (Array '@1032) (Array '@1032))
  (concat_1213 // !'@1032.(Func (Array '@1032) (Array '@1032) (Array '@1032))
    (take_967(xs // !'@1032.(Array '@1032)
        ,from // Int
      ) // !'@1032.(Array '@1032)
      ,ys // !'@1032.(Array '@1032)
    ) // !'@1032.(Array '@1032)
    ,skip_1023 // !'@1032.(Func (Array '@1032) Int (Array '@1032))
    (xs // !'@1032.(Array '@1032)
      ,from // Int
    ) // !'@1032.(Array '@1032)
  ) // !'@1032.(Array '@1032)
  ;
}
// (Func (Array Int) Int)
function sum_1330(xs)
{
  return reduce_1900 // (Func (Array Int) Int (Func Int Int Int) Int)
  (xs // (Array Int)
    ,0 // Int
    ,op_add_518) // Int
  ;
}
// (Func (Array Int) Int)
function product_1348(xs)
{
  return reduce_1900 // (Func (Array Int) Int (Func Int Int Int) Int)
  (xs // (Array Int)
    ,1 // Int
    ,op_mul_566) // Int
  ;
}
// (Func (Array Int) Int)
function average_1370(xs)
{
  return op_div_798(sum_1330 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
    ,count_1711 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // Int
  ;
}
// (Func (Array T0) T0)
function min_1392(xs)
{
  return reduce_1900 // !'@746.(Func (Array '@746) '@746 (Func '@746 '@746 '@746) '@746)
  (xs // !'@746.(Array '@746)
    ,op_obr_cbr_2073 // !'@746.(Func !'@746.(Array '@746) Int '@746)
    (xs // !'@746.(Array '@746)
      ,0 // Int
    ) // '@746
    ,min_140) // '@746
  ;
}
// (Func (Array T0) T0)
function max_1414(xs)
{
  return reduce_1900 // !'@764.(Func (Array '@764) '@764 (Func '@764 '@764 '@764) '@764)
  (xs // !'@764.(Array '@764)
    ,op_obr_cbr_2073 // !'@764.(Func !'@764.(Array '@764) Int '@764)
    (xs // !'@764.(Array '@764)
      ,0 // Int
    ) // '@764
    ,max_165) // '@764
  ;
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1480(xs, i, j)
{
  let tmp = op_obr_cbr_2073 // !'@801.(Func !'@801.(Array '@801) Int '@801)
  (xs // !'@801.(ArrayBuilder '@801)
    ,i // Int
  ) // '@801
  ;
  xs = set_1824 // !'@801.(Func (ArrayBuilder '@801) Int '@801 (ArrayBuilder '@801))
  (xs // !'@801.(Array '@801)
    ,i // Int
    ,op_obr_cbr_2073 // !'@801.(Func !'@801.(Array '@801) Int '@801)
    (xs // !'@801.(Array '@801)
      ,j // Int
    ) // '@801
  ) // !'@801.(ArrayBuilder '@801)
   // !'@801.(ArrayBuilder '@801)
  ;
  xs = set_1824 // !'@801.(Func (ArrayBuilder '@801) Int '@801 (ArrayBuilder '@801))
  (xs // !'@801.(ArrayBuilder '@801)
    ,j // Int
    ,tmp // '@801
  ) // !'@801.(ArrayBuilder '@801)
   // !'@801.(ArrayBuilder '@801)
  ;
  return xs // !'@801.(ArrayBuilder '@801)
  ;
}
// (Func (Array T0) Int Int Int)
function partition_1595(a, lo, hi)
{
  let p = op_obr_cbr_2073 // !'@789.(Func !'@789.(Array '@789) Int '@789)
  (a // !'@789.(Array '@789)
    ,lo // Int
  ) // '@789
  ;
  let i = op_sub_754(lo // Int
    ,1 // Int
  ) // Int
  ;
  let j = op_add_732(hi // Int
    ,1 // Int
  ) // Int
  ;
  while (true // Bool
  )
  {
    do
    {
      i // Int
      ++ // Int
      ;
    }
    while (op_lt_686 // !'@789.(Func '@789 '@789 Bool)
      (op_obr_cbr_2073 // !'@789.(Func !'@789.(Array '@789) Int '@789)
        (a // !'@789.(Array '@789)
          ,i // Int
        ) // '@789
        ,p // '@789
      ) // Bool
    )
    do
    {
      j // Int
      -- // Int
      ;
    }
    while (op_gt_638 // !'@789.(Func '@789 '@789 Bool)
      (op_obr_cbr_2073 // !'@789.(Func !'@789.(Array '@789) Int '@789)
        (a // !'@789.(Array '@789)
          ,j // Int
        ) // '@789
        ,p // '@789
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
    swapElements_1480 // !'@789.(Func (ArrayBuilder '@789) Int Int (ArrayBuilder '@789))
    (a // !'@789.(Array '@789)
      ,i // Int
      ,j // Int
    ) // !'@789.(ArrayBuilder '@789)
    ;
  }
}
// (Func (Array T0) Int Int (Array T0))
function qsort_1664(a, lo, hi)
{
  if (op_lt_686 // (Func Int Int Bool)
    (lo // Int
      ,hi // Int
    ) // Bool
  )
  {
    let p = partition_1595 // (Func !'@806.(Array '@806) Int Int Int)
    (a // !'@806.(Array '@806)
      ,lo // Int
      ,hi // Int
    ) // Int
    ;
    qsort_1664 // !'@810.(Func !'@806.(Array '@806) Int Int '@810)
    (a // !'@806.(Array '@806)
      ,lo // Int
      ,p // Int
    ) // '@810
    ;
    qsort_1664 // !'@814.(Func !'@806.(Array '@806) Int Int '@814)
    (a // !'@806.(Array '@806)
      ,op_add_732(p // Int
        ,1 // Int
      ) // Int
      ,hi // Int
    ) // '@814
    ;
  }
  else
  { }
  return a // !'@806.(Array '@806)
  ;
}
// (Func (Array T0) (Array T0))
function sort_1694(xs)
{
  return immutable_1847 // !'@817.(Func (ArrayBuilder '@817) (Array '@817))
  (qsort_1664 // !'@817.(Func (Array '@817) Int Int (Array '@817))
    (mutable_1760 // !'@817.(Func (Array '@817) (ArrayBuilder '@817))
      (xs // !'@817.(Array '@817)
      ) // !'@817.(ArrayBuilder '@817)
      ,0 // Int
      ,op_sub_754(count_1711 // (Func !'@817.(Array '@817) Int)
        (xs // !'@817.(Array '@817)
        ) // Int
        ,1 // Int
      ) // Int
    ) // !'@817.(Array '@817)
  ) // !'@817.(Array '@817)
  ;
}
// (Func (Array Int) Int)
function median_1794(xs)
{
  let ys = sort_1694 // (Func (Array Int) (Array Int))
  (xs // (Array Int)
  ) // (Array Int)
  ;
  return op_eq_eq_1563 // (Func Int Int Bool)
  (op_mod_820(op_sub_754(count_1711 // (Func (Array Int) Int)
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
    ,op_div_798(op_sub_754(count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
  ) // Int
   : op_add_732(op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (ys // (Array Int)
      ,op_div_798(op_sub_754(count_1711 // (Func (Array Int) Int)
          (ys // (Array Int)
          ) // Int
          ,2 // Int
        ) // Int
        ,2 // Int
      ) // Int
    ) // Int
    ,op_div_798(op_obr_cbr_2073 // (Func (Array Int) Int Int)
      (ys // (Array Int)
        ,op_div_798(count_1711 // (Func (Array Int) Int)
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
function inRange_1825(xs, n)
{
  return op_amp_amp_1585 // (Func Bool Bool Bool)
  (op_gt_eq_662 // (Func Int Int Bool)
    (n // Int
      ,0 // Int
    ) // Bool
    ,op_lt_686 // (Func Int Int Bool)
    (n // Int
      ,count_1711 // (Func !'@660.(Array '@660) Int)
      (xs // !'@660.(Array '@660)
      ) // Int
    ) // Bool
  ) // Bool
  ;
}
// (Func (Array T0) T0)
function last_1848(xs)
{
  return op_obr_cbr_2073 // !'@667.(Func !'@667.(Array '@667) Int '@667)
  (xs // !'@667.(Array '@667)
    ,op_sub_754(count_1711 // (Func !'@667.(Array '@667) Int)
      (xs // !'@667.(Array '@667)
      ) // Int
      ,1 // Int
    ) // Int
  ) // '@667
  ;
}
// (Func (Array T0) T0)
function first_1863(xs)
{
  return op_obr_cbr_2073 // !'@583.(Func !'@583.(Array '@583) Int '@583)
  (xs // !'@583.(Array '@583)
    ,0 // Int
  ) // '@583
  ;
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1900(xs, acc, f)
{
  for (let i3=0; i3 < xs // !'@200.(Array '@200)
  .count; ++i3)
  {
    const x = xs // !'@200.(Array '@200)
    .at(i3);
    {
      acc = f // !'@201!'@200.(Func '@201 '@200 '@201)
      (acc // '@201
        ,x // '@200
      ) // '@201
       // '@201
      ;
    }
  }
  return acc // '@201
  ;
}
// (Func (Array (Array T0)) (Array T0))
function flatten_1917(xs)
{
  return reduce_1900 // !'@260.(Func (Array (Array '@260)) (Array '@260) (Func (Array '@260) (Array '@260) (Array '@260)) (Array '@260))
  (xs // (Array !'@260.(Array '@260))
    ,arrayFromJavaScript([]) // !'@260.(Array '@260)
    ,concat_1213 // !'@260.(Func (Array '@260) (Array '@260) (Array '@260))
  ) // !'@260.(Array '@260)
  ;
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T1))
function flatMap_1939(xs, f)
{
  return flatten_1917 // !'@286.(Func (Array (Array '@286)) (Array '@286))
  (map_53 // !'@287!'@286.(Func (Array '@287) (Func '@287 (Array '@286)) (Array (Array '@286)))
    (xs // !'@287.(Array '@287)
      ,f // !'@287!'@286.(Func '@287 (Array '@286))
    ) // (Array !'@286.(Array '@286))
  ) // !'@286.(Array '@286)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function cartesianProduct_1982(xs, ys, f)
{
  return flatMap_1939 // !'@291!'@297.(Func (Array '@291) (Func '@291 (Array '@297)) (Array '@297))
  (xs // !'@291.(Array '@291)
    ,(x) => map_53 // !'@295!'@297.(Func (Array '@295) (Func '@295 '@297) (Array '@297))
    (ys // !'@295.(Array '@295)
      ,(y) => f // !'@291!'@295!'@297.(Func '@291 '@295 '@297)
      (x // '@291
        ,y // '@295
      ) // '@297
       // !'@295!'@297.(Func '@295 '@297)
    ) // !'@297.(Array '@297)
     // !'@291!'@297.(Func '@291 (Array '@297))
  ) // !'@297.(Array '@297)
  ;
}
// Module heron:geometry.mesh:0.1
// file input\geometry-mesh.heron
// imports heron:std.array:0.1
// imports heron:geometry.vector:0.1
// Mesh
const tetrahedron = mesh_2133 // (Func (Array Float) (Array Int) Mesh)
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
const cube = mesh_2133 // (Func (Array Float) (Array Int) Mesh)
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
const octahedron = mesh_2133 // (Func (Array Float) (Array Int) Mesh)
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
const dodecahedron = ((t) => ((r) => mesh_2133 // (Func (Array Float) (Array Int) Mesh)
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
    )(op_div_590 // [!'@84.(Func '@84 '@84 '@84) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (1 // Int
      ,t // Float
    ) // Float
  )
   // Mesh
  )(op_div_590 // [!'@13.(Func '@13 '@13 '@13) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@64.(Func '@64 '@64 '@64) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
const icosahedron = ((t) => mesh_2133 // (Func (Array Float) (Array Int) Mesh)
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
  )(op_div_590 // [!'@89.(Func '@89 '@89 '@89) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@90.(Func '@90 '@90 '@90) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
// (Func (Array T0) Int Bool Bool (Array Int))
function quadStripToMeshIndices_966(vertices, rows, connectRows, connectCols)
{
  let cols = op_div_798(count_1711 // (Func !'@389.(Array '@389) Int)
    (vertices // !'@389.(Array '@389)
    ) // Int
    ,rows // Int
  ) // Int
  ;
  let nr = connectRows // Bool
   ? rows // Int
   : op_sub_754(rows // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let nc = connectCols // Bool
   ? cols // Int
   : op_sub_754(cols // Int
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
  .count; ++i4)
  {
    const row = op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,nr // Int
    ) // (Array Int)
    .at(i4);
    {
      for (let i5=0; i5 < op_dot_dot_2038 // (Func Int Int (Array Int))
        (0 // Int
          ,nc // Int
        ) // (Array Int)
      .count; ++i5)
      {
        const col = op_dot_dot_2038 // (Func Int Int (Array Int))
        (0 // Int
          ,nc // Int
        ) // (Array Int)
        .at(i5);
        {
          let a = op_add_732(col // Int
            ,op_mul_776(row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let b = op_add_732(op_mod_820(op_add_732(col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776(row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let c = op_add_732(op_mod_820(op_add_732(col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776(op_mod_820(op_add_732(row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let d = op_add_732(col // Int
            ,op_mul_776(op_mod_820(op_add_732(row // Int
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
function toVertexBuffer_1001(xs)
{
  return flatMap_1939 // (Func (Array Float3) (Func Float3 (Array Float)) (Array Float))
  (xs // (Array Float3)
    ,(v) => arrayFromJavaScript([x_134 // (Func Float3 Float)
      (v // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (v // Float3
      ) // Float
      ,z_164 // (Func Float3 Float)
      (v // Float3
      ) // Float
    ]) // (Array Float)
     // (Func Float3 (Array Float))
  ) // (Array Float)
  ;
}
// (Func Float2 Float3)
function vector_1066(uv)
{
  return float3_119(op_mul_886(op_negate_1659 // (Func Float Float)
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
    ,op_mul_886(sin_449 // (Func Float Float)
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
function rescale_1094(v, from, length)
{
  return op_add_518(from // '@964
    ,op_mul_566(v // '@964
      ,length // '@964
    ) // '@964
  ) // '@964
  ;
}
// (Func (Func Float Float Float3) Int Int Float Float Float Float Mesh)
function meshFromUV_1221(f, uCount, vCount, uStart, vStart, uLength, vLength)
{
  let points = cartesianProduct_1982 // (Func (Array Float) (Array Float) (Func Float Float Float3) (Array Float3))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,uCount // Int
    ) // (Array Int)
    ,op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,vCount // Int
    ) // (Array Int)
    ,(u, v) => f // (Func Float Float Float3)
    (op_add_842(op_mul_886(op_div_908(u // Float
            ,float_41 // (Func Int Float)
            (uCount // Int
            ) // Float
          ) // Float
          ,uLength // Float
        ) // Float
        ,uStart // Float
      ) // Float
      ,op_add_842(op_mul_886(op_div_908(v // Float
            ,float_41 // (Func Int Float)
            (vCount // Int
            ) // Float
          ) // Float
          ,vLength // Float
        ) // Float
        ,vStart // Float
      ) // Float
    ) // Float3
     // (Func Float Float Float3)
  ) // (Array Float3)
  ;
  let indices = quadStripToMeshIndices_966 // (Func (Array Float3) Int Bool Bool (Array Int))
  (points // (Array Float3)
    ,vCount // Int
    ,true // Bool
    ,true // Bool
  ) // (Array Int)
  ;
  return mesh_2133 // (Func (Array Float) (Array Int) Mesh)
  (toVertexBuffer_1001 // (Func (Array Float3) (Array Float))
    (points // (Array Float3)
    ) // (Array Float)
    ,indices // (Array Int)
  ) // Mesh
  ;
}
// (Func (Func Float Float Float3) Int Mesh)
function meshFromUV_1247(f, segments)
{
  return meshFromUV_1221(f // (Func Float Float Float3)
    ,segments // Int
    ,segments // Int
    ,0 // Int
    ,0 // Int
    ,1 // Int
    ,1 // Int
  ) // Mesh
  ;
}
// (Func Int Int Float3)
function spherePoint_1347(u, v)
{
  return vector_98(op_mul_886(op_negate_1659 // (Func Float Float)
      (cos_353 // (Func Float Float)
        (op_mul_566(op_mul_776(u // Int
              ,2 // Int
            ) // Int
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566(op_mul_776(v // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,cos_353 // (Func Float Float)
    (op_mul_566(op_mul_776(v // Int
          ,2 // Int
        ) // Int
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_886(sin_449 // (Func Float Float)
      (op_mul_566(op_mul_776(u // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566(op_mul_776(v // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Int Mesh)
function sphere_1364(segments)
{
  return meshFromUV_1247(spherePoint_1347 // (Func Int Int Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function sphere_1375()
{
  return sphere_1364(32 // Int
  ) // Mesh
  ;
}
// (Func Int Float Float3)
function cylinderPoint_1423(u, v)
{
  return vector_98(sin_449 // (Func Float Float)
    (op_mul_566(op_mul_776(u // Int
          ,2 // Int
        ) // Int
        ,pi // Float
      ) // Float
    ) // Float
    ,v // Float
    ,cos_353 // (Func Float Float)
    (op_mul_566(op_mul_776(u // Int
          ,2 // Int
        ) // Int
        ,pi // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Int Mesh)
function cylinder_1440(segments)
{
  return meshFromUV_1247(cylinderPoint_1423 // (Func Int Float Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function cylinder_1451()
{
  return cylinder_1440(32 // Int
  ) // Mesh
  ;
}
// (Func Float Float Int Mesh)
function torus_1491(r1, r2, segments)
{
  return meshFromUV_1247((u, v) => torusPoint_1621 // (Func Int Int Float Float Float3)
    (u // Int
      ,v // Int
      ,r1 // Float
      ,r2 // Float
    ) // Float3
     // (Func Int Int Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Int Int Float Float Float3)
function torusPoint_1621(u, v, r1, r2)
{
  return vector_98(op_mul_886(op_add_842(r1 // Float
        ,op_mul_886(r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_566(op_mul_776(v // Int
                ,2 // Int
              ) // Int
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,cos_353 // (Func Float Float)
      (op_mul_566(op_mul_776(u // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886(op_add_842(r1 // Float
        ,op_mul_886(r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_566(op_mul_776(v // Int
                ,2 // Int
              ) // Int
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566(op_mul_776(u // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886(r2 // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566(op_mul_776(v // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
  ) // Float3
  ;
}
// (Func Mesh)
function torus_1634()
{
  return torus_1491(10 // Int
    ,2 // Int
    ,32 // Int
  ) // Mesh
  ;
}
// (Func Mesh Int)
function vertexCount_1655(mesh)
{
  return op_div_798(count_1711 // (Func (Array Float) Int)
    (vertexBuffer_2151 // (Func Mesh (Array Float))
      (mesh // Mesh
      ) // (Array Float)
    ) // Int
    ,3 // Int
  ) // Int
  ;
}
// (Func Mesh Int)
function faceCount_1676(mesh)
{
  return op_div_798(count_1711 // (Func (Array Int) Int)
    (indexBuffer_2169 // (Func Mesh (Array Int))
      (mesh // Mesh
      ) // (Array Int)
    ) // Int
    ,3 // Int
  ) // Int
  ;
}
// (Func Mesh Int Float3)
function vertex_1706(mesh, i)
{
  return vector_151(take_994(vertexBuffer_2151 // (Func Mesh (Array Float))
      (mesh // Mesh
      ) // (Array Float)
      ,op_mul_776(i // Int
        ,3 // Int
      ) // Int
      ,3 // Int
    ) // (Array Float)
  ) // Float3
  ;
}
// (Func Mesh (Array Float3))
function vertices_1736(mesh)
{
  return array_1691(vertexCount_1655 // (Func Mesh Int)
    (mesh // Mesh
    ) // Int
    ,(i) => vertex_1706 // (Func Mesh Int Float3)
    (mesh // Mesh
      ,i // Int
    ) // Float3
     // (Func Int Float3)
  ) // (Array Float3)
  ;
}
// (Func Mesh (Array Float3) Mesh)
function setVertices_1762(m, points)
{
  return mesh_2133 // (Func (Array Float) (Array Int) Mesh)
  (toVertexBuffer_1001 // (Func (Array Float3) (Array Float))
    (points // (Array Float3)
    ) // (Array Float)
    ,indexBuffer_2169 // (Func Mesh (Array Int))
    (m // Mesh
    ) // (Array Int)
  ) // Mesh
  ;
}
// (Func Mesh (Func Float3 Float3) Mesh)
function transform_1789(m, f)
{
  return setVertices_1762 // (Func Mesh (Array Float3) Mesh)
  (m // Mesh
    ,map_53 // (Func (Array Float3) (Func Float3 Float3) (Array Float3))
    (vertices_1736 // (Func Mesh (Array Float3))
      (m // Mesh
      ) // (Array Float3)
      ,f // (Func Float3 Float3)
    ) // (Array Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function translate_1818(m, amount)
{
  return transform_1789 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_add_518(v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// (Func Mesh Float3 Mesh)
function scale_1847(m, amount)
{
  return transform_1789 // (Func Mesh (Func Float3 Float3) Mesh)
  (m // Mesh
    ,(v) => op_mul_566(v // Float3
      ,amount // Float3
    ) // Float3
     // (Func Float3 Float3)
  ) // Mesh
  ;
}
// Module heron:tests:0.1
// file input\test.heron
// imports heron:std.array:0.1
// imports heron:geometry.mesh:0.1
// imports heron:geometry.vector:0.1
// (Func (Array (Func Float Float Float Mesh)))
function main_39()
{
  simpleArrayTest_439 // !'@856.(Func '@856)
  () // '@856
  ;
  return geometryTest_490 // (Func (Array (Func Float Float Float Mesh)))
  () // (Array (Func Float Float Float Mesh))
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
  print_2094 // !'@699.(Func Str '@699)
  ("'Expect [1, 11, 3]'" // Str
  ) // '@699
  ;
  print_2094 // !'@701.(Func (Array Int) '@701)
  (xs // (Array Int)
  ) // '@701
  ;
  print_2094 // !'@703.(Func Str '@703)
  ("'Expect 1, 11, 3'" // Str
  ) // '@703
  ;
  for (let i6=0; i6 < xs // (Array Int)
  .count; ++i6)
  {
    const x = xs // (Array Int)
    .at(i6);
    {
      print_2094 // !'@706.(Func Int '@706)
      (x // Int
      ) // '@706
      ;
    }
  }
  print_2094 // !'@708.(Func Str '@708)
  ("'Expect 1'" // Str
  ) // '@708
  ;
  print_2094 // !'@710.(Func Int '@710)
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (xs // (Array Int)
      ,0 // Int
    ) // Int
  ) // '@710
  ;
  print_2094 // !'@713.(Func Str '@713)
  ("'Expect 3'" // Str
  ) // '@713
  ;
  print_2094 // !'@715.(Func Int '@715)
  (count_1711 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@715
  ;
  print_2094 // !'@718.(Func Str '@718)
  ("'Expect 1'" // Str
  ) // '@718
  ;
  print_2094 // !'@720.(Func Int '@720)
  (first_1863 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@720
  ;
  print_2094 // !'@723.(Func Str '@723)
  ("'Expect 3'" // Str
  ) // '@723
  ;
  print_2094 // !'@725.(Func Int '@725)
  (last_1848(xs // (Array Int)
    ) // Int
  ) // '@725
  ;
  print_2094 // !'@729.(Func Str '@729)
  ("'Expect 1'" // Str
  ) // '@729
  ;
  print_2094 // !'@731.(Func Int '@731)
  (min_1392(xs // (Array Int)
    ) // Int
  ) // '@731
  ;
  print_2094 // !'@751.(Func Str '@751)
  ("'Expect 11'" // Str
  ) // '@751
  ;
  print_2094 // !'@753.(Func Int '@753)
  (max_1414(xs // (Array Int)
    ) // Int
  ) // '@753
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
  print_2094 // !'@771.(Func Str '@771)
  ("'Expect 5'" // Str
  ) // '@771
  ;
  print_2094 // !'@773.(Func Int '@773)
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (ys // (ArrayBuilder Int)
      ,1 // Int
    ) // Int
  ) // '@773
  ;
  print_2094 // !'@776.(Func Str '@776)
  ("'Expect 1, 3, 11'" // Str
  ) // '@776
  ;
  let zs = sort_1694 // (Func (Array Int) (Array Int))
  (xs // (Array Int)
  ) // (Array Int)
  ;
  for (let i7=0; i7 < zs // (Array Int)
  .count; ++i7)
  {
    const z = zs // (Array Int)
    .at(i7);
    {
      print_2094 // !'@823.(Func Int '@823)
      (z // Int
      ) // '@823
      ;
    }
  }
  print_2094 // !'@825.(Func Str '@825)
  ("'Expect 3'" // Str
  ) // '@825
  ;
  print_2094 // !'@827.(Func Int '@827)
  (median_1794 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@827
  ;
  print_2094 // !'@849.(Func Str '@849)
  ("'Expect 15'" // Str
  ) // '@849
  ;
  print_2094 // !'@851.(Func Int '@851)
  (sum_1330 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@851
  ;
  print_2094 // !'@853.(Func Str '@853)
  ("'Expect 5'" // Str
  ) // '@853
  ;
  print_2094 // !'@855.(Func Int '@855)
  (average_1370 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@855
  ;
}
// (Func Float Float Float Mesh)
function testSphere_481(offX, offY, offZ)
{
  let offset = vector_98(offX // Float
    ,offY // Float
    ,offZ // Float
  ) // Float3
  ;
  return translate_1818 // (Func Mesh Float3 Mesh)
  (sphere_1364(32 // Int
    ) // Mesh
    ,offset // Float3
  ) // Mesh
  ;
}
// (Func (Array (Func Float Float Float Mesh)))
function geometryTest_490()
{
  return arrayFromJavaScript([testSphere_481 // (Func Float Float Float Mesh)
  ]) // (Array (Func Float Float Float Mesh))
  ;
}

return main_39;
})();
