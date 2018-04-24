// Generated using Heron on Tue Apr 24 2018 13:38:02 GMT-0400 (Eastern Daylight Time)
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
  (op_add_842 // [!'@92.(Func '@92 '@92 '@92) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_add_842 // [!'@93.(Func '@93 '@93 '@93) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@195.(Func '@195 '@195 '@195) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@196.(Func '@196 '@196 '@196) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mul_886 // [!'@371.(Func '@371 '@371 '@371) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@372.(Func '@372 '@372 '@372) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_div_908 // [!'@65.(Func '@65 '@65 '@65) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_div_908 // [!'@66.(Func '@66 '@66 '@66) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@474.(Func '@474 '@474 '@474) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@475.(Func '@475 '@475 '@475) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_add_842 // [!'@88.(Func '@88 '@88 '@88) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842 // [!'@89.(Func '@89 '@89 '@89) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_add_842 // [!'@90.(Func '@90 '@90 '@90) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@191.(Func '@191 '@191 '@191) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@192.(Func '@192 '@192 '@192) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@193.(Func '@193 '@193 '@193) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mul_886 // [!'@367.(Func '@367 '@367 '@367) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@368.(Func '@368 '@368 '@368) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@369.(Func '@369 '@369 '@369) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_div_908 // [!'@61.(Func '@61 '@61 '@61) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908 // [!'@62.(Func '@62 '@62 '@62) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_div_908 // [!'@63.(Func '@63 '@63 '@63) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@470.(Func '@470 '@470 '@470) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@471.(Func '@471 '@471 '@471) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@472.(Func '@472 '@472 '@472) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return float3_119 // [(Func Float Float Float Float3) | !'@50!'@51.(Func '@50 '@51)]
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
  for (let i0=0; i0 < ys // !'@488.(Array '@488)
  .count; ++i0)
  {
    const y = ys // !'@488.(Array '@488)
    .at(i0);
    {
      xs = push_1789 // !'@488.(Func (ArrayBuilder '@488) '@488 (ArrayBuilder '@488))
      (xs // !'@488.(ArrayBuilder '@488)
        ,y // '@488
      ) // !'@488.(ArrayBuilder '@488)
       // !'@488.(ArrayBuilder '@488)
      ;
    }
  }
  return xs // !'@488.(ArrayBuilder '@488)
  ;
}
// (Func (Array T0) (Array T0))
function reify_1990(xs)
{
  return immutable_1847 // !'@1117.(Func (ArrayBuilder '@1117) (Array '@1117))
  (mutable_1760 // !'@1117.(Func (Array '@1117) (ArrayBuilder '@1117))
    (xs // !'@1117.(Array '@1117)
    ) // !'@1117.(ArrayBuilder '@1117)
  ) // !'@1117.(Array '@1117)
  ;
}
// (Func Int Int (Array Int))
function op_dot_dot_2038(from, upto)
{
  return array_1691 // [!'@202.(Func Int (Func Int '@202) (Array '@202)) | (Func Float3 (Array Float))]
  (op_sub_754 // [!'@200.(Func '@200 '@200 '@200) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (upto // Int
      ,from // Int
    ) // Int
    ,(i) => op_add_732 // [!'@201.(Func '@201 '@201 '@201) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return vector_98 // [(Func Float Float Float Float3) | !'@127.(Func Float '@127) | (Func (Array Float) Float3)]
  (x // Float
    ,x // Float
    ,x // Float
  ) // Float3
  ;
}
// (Func (Array Float) Float3)
function vector_151(xs)
{
  return vector_98 // [(Func Float Float Float Float3) | !'@124.(Func Float '@124) | !'@125!'@126.(Func '@125 '@126)]
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
  return op_add_842 // [!'@585.(Func '@585 '@585 '@585) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_842 // [!'@584.(Func '@584 '@584 '@584) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mul_1385 // [!'@587.(Func '@587 '@587 '@587) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_1320 // [!'@589.(Func '@589 '@589 '@589) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_1320 // [!'@594.(Func '@594 '@594 '@594) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float3
      ,b // Float3
    ) // Float3
  ) // Float
  ;
}
// (Func Float3 Float)
function normal_328(v)
{
  return op_div_590 // [!'@1043.(Func '@1043 '@1043 '@1043) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@382.(Func '@382 '@382 '@382) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@380.(Func '@380 '@380 '@380) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (y_149 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@381.(Func '@381 '@381 '@381) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@385.(Func '@385 '@385 '@385) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@383.(Func '@383 '@383 '@383) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,x_134 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@384.(Func '@384 '@384 '@384) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@388.(Func '@388 '@388 '@388) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@386.(Func '@386 '@386 '@386) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@387.(Func '@387 '@387 '@387) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_sub_542 // [!'@1116.(Func '@1116 '@1116 '@1116) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,op_mul_886 // [!'@1115.(Func '@1115 '@1115 '@1115) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_566 // [!'@1114.(Func '@1114 '@1114 '@1114) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_add_842 // [!'@812.(Func '@812 '@812 '@812) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@810.(Func '@810 '@810 '@810) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,op_sub_864 // [!'@809.(Func '@809 '@809 '@809) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,x // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@811.(Func '@811 '@811 '@811) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return arrayFromJavaScript([x // '@1307
  ]) // !'@1307.(Array '@1307)
  ;
}
// (Func (Array T0) (Func T0 T1) (Array T1))
function map_53(xs, f)
{
  return array_1691 // [!'@161.(Func Int (Func Int '@161) (Array '@161)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@156.(Array '@156) Int)
    (xs // !'@156.(Array '@156)
    ) // Int
    ,(i) => f // !'@156!'@160.(Func '@156 '@160)
    (op_obr_cbr_2073 // !'@156.(Func !'@156.(Array '@156) Int '@156)
      (xs // !'@156.(Array '@156)
        ,i // Int
      ) // '@156
    ) // '@160
     // !'@160.(Func Int '@160)
  ) // !'@160.(Array '@160)
  ;
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_1691 // [!'@1030.(Func Int (Func Int '@1030) (Array '@1030)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1025.(Array '@1025) Int)
    (xs // !'@1025.(Array '@1025)
    ) // Int
    ,(i) => f // !'@1025!'@1029.(Func '@1025 Int '@1029)
    (op_obr_cbr_2073 // !'@1025.(Func !'@1025.(Array '@1025) Int '@1025)
      (xs // !'@1025.(Array '@1025)
        ,i // Int
      ) // '@1025
      ,i // Int
    ) // '@1029
     // !'@1029.(Func Int '@1029)
  ) // !'@1029.(Array '@1029)
  ;
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_1691 // [!'@1018.(Func Int (Func Int '@1018) (Array '@1018)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1017.(Array '@1017) Int)
    (xs // !'@1017.(Array '@1017)
    ) // Int
    ,f // !'@1016.(Func Int '@1016)
  ) // !'@1016.(Array '@1016)
  ;
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_710 // !'@862.(Func '@862 '@862 Bool)
  (x // '@862
    ,y // '@862
  ) // Bool
   ? x // '@862
   : y // '@862
   // '@862
  ;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_662 // !'@887.(Func '@887 '@887 Bool)
  (x // '@887
    ,y // '@887
  ) // Bool
   ? x // '@887
   : y // '@887
   // '@887
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1172.(Array '@1172) Int)
    (xs // !'@1172.(Array '@1172)
    ) // Int
    ,count_1711 // (Func !'@1172.(Array '@1172) Int)
    (ys // !'@1172.(Array '@1172)
    ) // Int
  ) // Bool
   ? xs // !'@1172.(Array '@1172)
   : ys // !'@1172.(Array '@1172)
   // !'@1172.(Array '@1172)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_662 // (Func Int Int Bool)
  (count_1711 // (Func !'@819.(Array '@819) Int)
    (xs // !'@819.(Array '@819)
    ) // Int
    ,count_1711 // (Func !'@819.(Array '@819) Int)
    (ys // !'@819.(Array '@819)
    ) // Int
  ) // Bool
   ? xs // !'@819.(Array '@819)
   : ys // !'@819.(Array '@819)
   // !'@819.(Array '@819)
  ;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@648.(Array '@648) Int)
    (xs // !'@648.(Array '@648)
    ) // Int
    ,0 // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53 // !'@1165.(Func (Array Int) (Func Int '@1165) (Array '@1165))
  (indices // (Array Int)
    ,(i) => at_1737 // !'@1165.(Func !'@1165.(Array '@1165) Int '@1165)
    (xs // !'@1165.(Array '@1165)
      ,i // Int
    ) // '@1165
     // !'@1165.(Func Int '@1165)
  ) // !'@1165.(Array '@1165)
  ;
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_2038 // (Func Int Int (Array Int))
  (0 // Int
    ,count_1711 // (Func !'@203.(Array '@203) Int)
    (xs // !'@203.(Array '@203)
    ) // Int
  ) // (Array Int)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function zip_372(xs, ys, f)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1333.(Array '@1333) Int)
    (xs // !'@1333.(Array '@1333)
    ) // Int
    ,count_1711 // (Func !'@1326.(Array '@1326) Int)
    (ys // !'@1326.(Array '@1326)
    ) // Int
  ) // Bool
   ? mapWithIndex_92 // !'@1333!'@1330.(Func (Array '@1333) (Func '@1333 Int '@1330) (Array '@1330))
  (xs // !'@1333.(Array '@1333)
    ,(x, i) => f // !'@1333!'@1326!'@1330.(Func '@1333 '@1326 '@1330)
    (x // '@1333
      ,op_obr_cbr_2073 // !'@1326.(Func !'@1326.(Array '@1326) Int '@1326)
      (ys // !'@1326.(Array '@1326)
        ,i // Int
      ) // '@1326
    ) // '@1330
     // !'@1333!'@1330.(Func '@1333 Int '@1330)
  ) // !'@1330.(Array '@1330)
   : mapWithIndex_92 // !'@1326!'@1330.(Func (Array '@1326) (Func '@1326 Int '@1330) (Array '@1330))
  (ys // !'@1326.(Array '@1326)
    ,(y, i) => f // !'@1333!'@1326!'@1330.(Func '@1333 '@1326 '@1330)
    (op_obr_cbr_2073 // !'@1333.(Func !'@1333.(Array '@1333) Int '@1333)
      (xs // !'@1333.(Array '@1333)
        ,i // Int
      ) // '@1333
      ,y // '@1326
    ) // '@1330
     // !'@1326!'@1330.(Func '@1326 Int '@1330)
  ) // !'@1330.(Array '@1330)
   // !'@1330.(Array '@1330)
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1900 // !'@232.(Func (Array '@232) Bool (Func Bool '@232 Bool) Bool)
  (xs // !'@232.(Array '@232)
    ,true // Bool
    ,(prev, x) => op_amp_amp_1585 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@232.(Func '@232 Bool)
      (x // '@232
      ) // Bool
    ) // Bool
     // !'@232.(Func Bool '@232 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1900 // !'@245.(Func (Array '@245) Bool (Func Bool '@245 Bool) Bool)
  (xs // !'@245.(Array '@245)
    ,false // Bool
    ,(prev, x) => op_bar_bar_1607 // (Func Bool Bool Bool)
    (prev // Bool
      ,p // !'@245.(Func '@245 Bool)
      (x // '@245
      ) // Bool
    ) // Bool
     // !'@245.(Func Bool '@245 Bool)
  ) // Bool
  ;
}
// (Func (Array T0) (Array T1) Bool)
function eq_469(xs, ys)
{
  return op_eq_eq_1563 // (Func Int Int Bool)
  (count_1711 // (Func !'@654.(Array '@654) Int)
    (xs // !'@654.(Array '@654)
    ) // Int
    ,count_1711 // (Func !'@655.(Array '@655) Int)
    (ys // !'@655.(Array '@655)
    ) // Int
  ) // Bool
  ;
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_537(xs, p)
{
  let ys = mutable_1760 // !'@670.(Func (Array '@670) (ArrayBuilder '@670))
  (xs // !'@670.(Array '@670)
  ) // !'@670.(ArrayBuilder '@670)
  ;
  let i = 0 // Int
  ;
  for (let i1=0; i1 < xs // !'@670.(Array '@670)
  .count; ++i1)
  {
    const x = xs // !'@670.(Array '@670)
    .at(i1);
    {
      if (p // !'@670.(Func '@670 Bool)
        (x // '@670
        ) // Bool
      )
      {
        ys = set_1824 // !'@670.(Func (ArrayBuilder '@670) Int '@670 (ArrayBuilder '@670))
        (ys // !'@670.(ArrayBuilder '@670)
          ,i++ // Int
          ,x // '@670
        ) // !'@670.(ArrayBuilder '@670)
         // !'@670.(ArrayBuilder '@670)
        ;
      }
      else
      { }
    }
  }
  return take_967 // [!'@682.(Func (Array '@682) Int (Array '@682)) | !'@683.(Func (Array '@683) Int Int (Array '@683))]
  (immutable_1847 // !'@670.(Func (ArrayBuilder '@670) (Array '@670))
    (ys // !'@670.(ArrayBuilder '@670)
    ) // !'@670.(Array '@670)
    ,i // Int
  ) // !'@670.(Array '@670)
  ;
}
// (Func T0 Int (Array T0))
function repeat_566(x, n)
{
  return map_53 // !'@1074.(Func (Array Int) (Func Int '@1074) (Array '@1074))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => x // '@1074
     // !'@1074.(Func Int '@1074)
  ) // !'@1074.(Array '@1074)
  ;
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_662(xs, op)
{
  if (empty_245 // (Func !'@1090.(Array '@1090) Bool)
    (xs // !'@1090.(Array '@1090)
    ) // Bool
  )
  {
    return xs // !'@1090.(Array '@1090)
    ;
  }
  else
  { }
  let ys = mutable_1760 // !'@1090.(Func (Array '@1090) (ArrayBuilder '@1090))
  (repeat_566 // !'@1090.(Func '@1090 Int (Array '@1090))
    (op_obr_cbr_2073 // !'@1090.(Func !'@1090.(Array '@1090) Int '@1090)
      (xs // !'@1090.(Array '@1090)
        ,0 // Int
      ) // '@1090
      ,count_1711 // (Func !'@1090.(Array '@1090) Int)
      (xs // !'@1090.(Array '@1090)
      ) // Int
    ) // !'@1090.(Array '@1090)
  ) // !'@1090.(ArrayBuilder '@1090)
  ;
  for (let i2=0; i2 < op_dot_dot_2038 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1090.(Array '@1090) Int)
      (ys // !'@1090.(ArrayBuilder '@1090)
      ) // Int
    ) // (Array Int)
  .count; ++i2)
  {
    const i = op_dot_dot_2038 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1090.(Array '@1090) Int)
      (ys // !'@1090.(ArrayBuilder '@1090)
      ) // Int
    ) // (Array Int)
    .at(i2);
    {
      ys = set_1824 // !'@1090.(Func (ArrayBuilder '@1090) Int '@1090 (ArrayBuilder '@1090))
      (ys // !'@1090.(ArrayBuilder '@1090)
        ,i // Int
        ,op // !'@1090.(Func '@1090 '@1090 '@1090)
        (op_obr_cbr_2073 // !'@1090.(Func !'@1090.(Array '@1090) Int '@1090)
          (xs // !'@1090.(Array '@1090)
            ,i // Int
          ) // '@1090
          ,op_obr_cbr_2073 // !'@1090.(Func !'@1090.(Array '@1090) Int '@1090)
          (ys // !'@1090.(ArrayBuilder '@1090)
            ,op_sub_754 // [!'@1092.(Func '@1092 '@1092 '@1092) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (i // Int
              ,1 // Int
            ) // Int
          ) // '@1090
        ) // '@1090
      ) // !'@1090.(ArrayBuilder '@1090)
       // !'@1090.(ArrayBuilder '@1090)
      ;
    }
  }
  return immutable_1847 // !'@1090.(Func (ArrayBuilder '@1090) (Array '@1090))
  (ys // !'@1090.(ArrayBuilder '@1090)
  ) // !'@1090.(Array '@1090)
  ;
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_720(xs)
{
  return map_53 // !'@204.(Func (Array Int) (Func Int '@204) (Array '@204))
  (indices_292 // (Func !'@204.(Array '@204) (Array Int))
    (xs // !'@204.(Array '@204)
    ) // (Array Int)
    ,(i) => op_gt_638 // (Func Int Int Bool)
    (i // Int
      ,0 // Int
    ) // Bool
     ? op_sub_542 // [!'@218.(Func '@218 '@218 '@218) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2073 // !'@204.(Func !'@204.(Array '@204) Int '@204)
      (xs // !'@204.(Array '@204)
        ,i // Int
      ) // '@204
      ,op_obr_cbr_2073 // !'@204.(Func !'@204.(Array '@204) Int '@204)
      (xs // !'@204.(Array '@204)
        ,op_sub_754 // [!'@217.(Func '@217 '@217 '@217) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
      ) // '@204
    ) // '@204
     : op_obr_cbr_2073 // !'@204.(Func !'@204.(Array '@204) Int '@204)
    (xs // !'@204.(Array '@204)
      ,i // Int
    ) // '@204
     // '@204
     // !'@204.(Func Int '@204)
  ) // !'@204.(Array '@204)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function slice_758(xs, from, to)
{
  return map_53 // !'@609.(Func (Array Int) (Func Int '@609) (Array '@609))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (from // Int
      ,to // Int
    ) // (Array Int)
    ,(i) => at_1737 // !'@609.(Func !'@609.(Array '@609) Int '@609)
    (xs // !'@609.(Array '@609)
      ,i // Int
    ) // '@609
     // !'@609.(Func Int '@609)
  ) // !'@609.(Array '@609)
  ;
}
// (Func (Array T0) Int (Array T0))
function stride_805(xs, n)
{
  return map_53 // !'@1231.(Func (Array Int) (Func Int '@1231) (Array '@1231))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1236.(Func '@1236 '@1236 '@1236) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1231.(Array '@1231) Int)
        (xs // !'@1231.(Array '@1231)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1231.(Func !'@1231.(Array '@1231) Int '@1231)
    (xs // !'@1231.(Array '@1231)
      ,op_mul_776 // [!'@1237.(Func '@1237 '@1237 '@1237) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@1231
     // !'@1231.(Func Int '@1231)
  ) // !'@1231.(Array '@1231)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function stride_860(xs, from, n)
{
  return map_53 // !'@1215.(Func (Array Int) (Func Int '@1215) (Array '@1215))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1221.(Func '@1221 '@1221 '@1221) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1215.(Array '@1215) Int)
        (xs // !'@1215.(Array '@1215)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1215.(Func !'@1215.(Array '@1215) Int '@1215)
    (xs // !'@1215.(Array '@1215)
      ,op_add_732 // [!'@1223.(Func '@1223 '@1223 '@1223) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (from // Int
        ,op_mul_776 // [!'@1222.(Func '@1222 '@1222 '@1222) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,n // Int
        ) // Int
      ) // Int
    ) // '@1215
     // !'@1215.(Func Int '@1215)
  ) // !'@1215.(Array '@1215)
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_896(xs, n)
{
  return map_53 // !'@1247.(Func (Array Int) (Func Int (Array '@1247)) (Array (Array '@1247)))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => stride_860 // [!'@1248.(Func (Array '@1248) Int (Array '@1248)) | !'@1249.(Func (Array '@1249) Int Int (Array '@1249))]
    (xs // !'@1247.(Array '@1247)
      ,i // Int
      ,n // Int
    ) // !'@1247.(Array '@1247)
     // !'@1247.(Func Int (Array '@1247))
  ) // (Array !'@1247.(Array '@1247))
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_947(xs, n)
{
  return map_53 // !'@1187.(Func (Array Int) (Func Int (Array '@1187)) (Array (Array '@1187)))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => slice_758 // !'@1187.(Func (Array '@1187) Int Int (Array '@1187))
    (xs // !'@1187.(Array '@1187)
      ,op_mul_776 // [!'@1191.(Func '@1191 '@1191 '@1191) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
      ,op_mul_776 // [!'@1193.(Func '@1193 '@1193 '@1193) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_add_732 // [!'@1192.(Func '@1192 '@1192 '@1192) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
        ,n // Int
      ) // Int
    ) // !'@1187.(Array '@1187)
     // !'@1187.(Func Int (Array '@1187))
  ) // (Array !'@1187.(Array '@1187))
  ;
}
// (Func (Array T0) Int (Array T0))
function take_967(xs, n)
{
  return slice_758 // !'@610.(Func (Array '@610) Int Int (Array '@610))
  (xs // !'@610.(Array '@610)
    ,0 // Int
    ,n // Int
  ) // !'@610.(Array '@610)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function take_994(xs, i, n)
{
  return take_967 // [!'@629.(Func (Array '@629) Int (Array '@629)) | !'@630!'@631!'@632!'@633.(Func '@630 '@631 '@632 '@633)]
  (skip_1023 // !'@628.(Func (Array '@628) Int (Array '@628))
    (xs // !'@628.(Array '@628)
      ,i // Int
    ) // !'@628.(Array '@628)
    ,n // Int
  ) // !'@628.(Array '@628)
  ;
}
// (Func (Array T0) Int (Array T0))
function skip_1023(xs, n)
{
  return slice_758 // !'@626.(Func (Array '@626) Int Int (Array '@626))
  (xs // !'@626.(Array '@626)
    ,n // Int
    ,op_sub_754 // [!'@627.(Func '@627 '@627 '@627) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@626.(Array '@626) Int)
      (xs // !'@626.(Array '@626)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@626.(Array '@626)
  ;
}
// (Func (Array T0) Int (Array T0))
function drop_1050(xs, n)
{
  return take_967 // [!'@638.(Func (Array '@638) Int (Array '@638)) | !'@639.(Func (Array '@639) Int Int (Array '@639))]
  (xs // !'@636.(Array '@636)
    ,op_sub_754 // [!'@637.(Func '@637 '@637 '@637) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@636.(Array '@636) Int)
      (xs // !'@636.(Array '@636)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@636.(Array '@636)
  ;
}
// (Func (Array T0) Int (Array T0))
function last_1077(xs, n)
{
  return skip_1023 // !'@798.(Func (Array '@798) Int (Array '@798))
  (xs // !'@798.(Array '@798)
    ,op_sub_754 // [!'@799.(Func '@799 '@799 '@799) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@798.(Array '@798) Int)
      (xs // !'@798.(Array '@798)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@798.(Array '@798)
  ;
}
// (Func (Array T0) T1 (Array T0))
function reverse_1121(xs, n)
{
  return map_53 // !'@1138.(Func (Array Int) (Func Int '@1138) (Array '@1138))
  (indices_292 // (Func !'@1138.(Array '@1138) (Array Int))
    (xs // !'@1138.(Array '@1138)
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1138.(Func !'@1138.(Array '@1138) Int '@1138)
    (xs // !'@1138.(Array '@1138)
      ,op_sub_754 // [!'@1146.(Func '@1146 '@1146 '@1146) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1145.(Func '@1145 '@1145 '@1145) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func !'@1138.(Array '@1138) Int)
          (xs // !'@1138.(Array '@1138)
          ) // Int
          ,1 // Int
        ) // Int
        ,i // Int
      ) // Int
    ) // '@1138
     // !'@1138.(Func Int '@1138)
  ) // !'@1138.(Array '@1138)
  ;
}
// (Func Int (Func Int T0) (Array T0))
function gen_1145(cnt, f)
{
  return map_53 // !'@297.(Func (Array Int) (Func Int '@297) (Array '@297))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,cnt // Int
    ) // (Array Int)
    ,f // !'@297.(Func Int '@297)
  ) // !'@297.(Array '@297)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1213(xs, ys)
{
  return gen_1145 // !'@300.(Func Int (Func Int '@300) (Array '@300))
  (op_add_732 // [!'@314.(Func '@314 '@314 '@314) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@300.(Array '@300) Int)
      (xs // !'@300.(Array '@300)
      ) // Int
      ,count_1711 // (Func !'@300.(Array '@300) Int)
      (ys // !'@300.(Array '@300)
      ) // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,count_1711 // (Func !'@300.(Array '@300) Int)
      (xs // !'@300.(Array '@300)
      ) // Int
    ) // Bool
     ? op_obr_cbr_2073 // !'@300.(Func !'@300.(Array '@300) Int '@300)
    (xs // !'@300.(Array '@300)
      ,i // Int
    ) // '@300
     : op_obr_cbr_2073 // !'@300.(Func !'@300.(Array '@300) Int '@300)
    (ys // !'@300.(Array '@300)
      ,op_sub_754 // [!'@315.(Func '@315 '@315 '@315) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,count_1711 // (Func !'@300.(Array '@300) Int)
        (xs // !'@300.(Array '@300)
        ) // Int
      ) // Int
    ) // '@300
     // '@300
     // !'@300.(Func Int '@300)
  ) // !'@300.(Array '@300)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function cut_1275(xs, from, n)
{
  return gen_1145 // !'@395.(Func Int (Func Int '@395) (Array '@395))
  (op_sub_754 // [!'@402.(Func '@402 '@402 '@402) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@395.(Array '@395) Int)
      (xs // !'@395.(Array '@395)
      ) // Int
      ,n // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,from // Int
    ) // Bool
     ? op_obr_cbr_2073 // !'@395.(Func !'@395.(Array '@395) Int '@395)
    (xs // !'@395.(Array '@395)
      ,i // Int
    ) // '@395
     : op_obr_cbr_2073 // !'@395.(Func !'@395.(Array '@395) Int '@395)
    (xs // !'@395.(Array '@395)
      ,op_add_732 // [!'@403.(Func '@403 '@403 '@403) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@395
     // '@395
     // !'@395.(Func Int '@395)
  ) // !'@395.(Array '@395)
  ;
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1312(xs, from, ys)
{
  return concat_1213 // !'@1202.(Func (Array '@1202) (Array '@1202) (Array '@1202))
  (concat_1213 // !'@1202.(Func (Array '@1202) (Array '@1202) (Array '@1202))
    (take_967 // [!'@1205.(Func (Array '@1205) Int (Array '@1205)) | !'@1206.(Func (Array '@1206) Int Int (Array '@1206))]
      (xs // !'@1202.(Array '@1202)
        ,from // Int
      ) // !'@1202.(Array '@1202)
      ,ys // !'@1202.(Array '@1202)
    ) // !'@1202.(Array '@1202)
    ,skip_1023 // !'@1202.(Func (Array '@1202) Int (Array '@1202))
    (xs // !'@1202.(Array '@1202)
      ,from // Int
    ) // !'@1202.(Array '@1202)
  ) // !'@1202.(Array '@1202)
  ;
}
// (Func (Array Int) Int)
function sum_1330(xs)
{
  return reduce_1900 // (Func (Array Int) Int (Func Int Int Int) Int)
  (xs // (Array Int)
    ,0 // Int
    ,op_add_732 // [!'@275.(Func '@275 '@275 '@275) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Int
  ;
}
// (Func (Array Int) Int)
function product_1348(xs)
{
  return reduce_1900 // (Func (Array Int) Int (Func Int Int Int) Int)
  (xs // (Array Int)
    ,1 // Int
    ,op_mul_776 // [!'@1101.(Func '@1101 '@1101 '@1101) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Int
  ;
}
// (Func (Array Int) Int)
function average_1370(xs)
{
  return op_div_798 // [!'@277.(Func '@277 '@277 '@277) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (sum_1330 // (Func (Array Int) Int)
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
  return reduce_1900 // !'@875.(Func (Array '@875) '@875 (Func '@875 '@875 '@875) '@875)
  (xs // !'@875.(Array '@875)
    ,op_obr_cbr_2073 // !'@875.(Func !'@875.(Array '@875) Int '@875)
    (xs // !'@875.(Array '@875)
      ,0 // Int
    ) // '@875
    ,min_140 // [!'@878.(Func '@878 '@878 '@878) | !'@879!'@880.(Func '@879 '@880)]
  ) // '@878
  ;
}
// (Func (Array T0) T0)
function max_1414(xs)
{
  return reduce_1900 // !'@896.(Func (Array '@896) '@896 (Func '@896 '@896 '@896) '@896)
  (xs // !'@896.(Array '@896)
    ,op_obr_cbr_2073 // !'@896.(Func !'@896.(Array '@896) Int '@896)
    (xs // !'@896.(Array '@896)
      ,0 // Int
    ) // '@896
    ,max_165 // [!'@899.(Func '@899 '@899 '@899) | !'@900!'@901.(Func '@900 '@901)]
  ) // '@899
  ;
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1480(xs, i, j)
{
  let tmp = op_obr_cbr_2073 // !'@936.(Func !'@936.(Array '@936) Int '@936)
  (xs // !'@936.(ArrayBuilder '@936)
    ,i // Int
  ) // '@936
  ;
  xs = set_1824 // !'@936.(Func (ArrayBuilder '@936) Int '@936 (ArrayBuilder '@936))
  (xs // !'@936.(Array '@936)
    ,i // Int
    ,op_obr_cbr_2073 // !'@936.(Func !'@936.(Array '@936) Int '@936)
    (xs // !'@936.(Array '@936)
      ,j // Int
    ) // '@936
  ) // !'@936.(ArrayBuilder '@936)
   // !'@936.(ArrayBuilder '@936)
  ;
  xs = set_1824 // !'@936.(Func (ArrayBuilder '@936) Int '@936 (ArrayBuilder '@936))
  (xs // !'@936.(ArrayBuilder '@936)
    ,j // Int
    ,tmp // '@936
  ) // !'@936.(ArrayBuilder '@936)
   // !'@936.(ArrayBuilder '@936)
  ;
  return xs // !'@936.(ArrayBuilder '@936)
  ;
}
// (Func (Array T0) Int Int Int)
function partition_1595(a, lo, hi)
{
  let p = op_obr_cbr_2073 // !'@924.(Func !'@924.(Array '@924) Int '@924)
  (a // !'@924.(Array '@924)
    ,lo // Int
  ) // '@924
  ;
  let i = op_sub_754 // [!'@941.(Func '@941 '@941 '@941) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (lo // Int
    ,1 // Int
  ) // Int
  ;
  let j = op_add_732 // [!'@942.(Func '@942 '@942 '@942) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    while (op_lt_686 // !'@924.(Func '@924 '@924 Bool)
      (op_obr_cbr_2073 // !'@924.(Func !'@924.(Array '@924) Int '@924)
        (a // !'@924.(Array '@924)
          ,i // Int
        ) // '@924
        ,p // '@924
      ) // Bool
    )
    do
    {
      j-- // Int
      ;
    }
    while (op_gt_638 // !'@924.(Func '@924 '@924 Bool)
      (op_obr_cbr_2073 // !'@924.(Func !'@924.(Array '@924) Int '@924)
        (a // !'@924.(Array '@924)
          ,j // Int
        ) // '@924
        ,p // '@924
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
    swapElements_1480 // !'@924.(Func (ArrayBuilder '@924) Int Int (ArrayBuilder '@924))
    (a // !'@924.(Array '@924)
      ,i // Int
      ,j // Int
    ) // !'@924.(ArrayBuilder '@924)
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
    let p = partition_1595 // (Func !'@943.(Array '@943) Int Int Int)
    (a // !'@943.(Array '@943)
      ,lo // Int
      ,hi // Int
    ) // Int
    ;
    qsort_1664 // !'@947.(Func !'@943.(Array '@943) Int Int '@947)
    (a // !'@943.(Array '@943)
      ,lo // Int
      ,p // Int
    ) // '@947
    ;
    qsort_1664 // !'@951.(Func !'@943.(Array '@943) Int Int '@951)
    (a // !'@943.(Array '@943)
      ,op_add_732 // [!'@953.(Func '@953 '@953 '@953) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (p // Int
        ,1 // Int
      ) // Int
      ,hi // Int
    ) // '@951
    ;
  }
  else
  { }
  return a // !'@943.(Array '@943)
  ;
}
// (Func (Array T0) (Array T0))
function sort_1694(xs)
{
  return immutable_1847 // !'@955.(Func (ArrayBuilder '@955) (Array '@955))
  (qsort_1664 // !'@955.(Func (Array '@955) Int Int (Array '@955))
    (mutable_1760 // !'@955.(Func (Array '@955) (ArrayBuilder '@955))
      (xs // !'@955.(Array '@955)
      ) // !'@955.(ArrayBuilder '@955)
      ,0 // Int
      ,op_sub_754 // [!'@958.(Func '@958 '@958 '@958) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@955.(Array '@955) Int)
        (xs // !'@955.(Array '@955)
        ) // Int
        ,1 // Int
      ) // Int
    ) // !'@955.(Array '@955)
  ) // !'@955.(Array '@955)
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
  (op_mod_820 // [!'@988.(Func '@988 '@988 '@988) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@987.(Func '@987 '@987 '@987) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,op_div_798 // [!'@990.(Func '@990 '@990 '@990) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@989.(Func '@989 '@989 '@989) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
  ) // Int
   : op_add_732 // [!'@995.(Func '@995 '@995 '@995) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (ys // (Array Int)
      ,op_div_798 // [!'@992.(Func '@992 '@992 '@992) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@991.(Func '@991 '@991 '@991) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func (Array Int) Int)
          (ys // (Array Int)
          ) // Int
          ,2 // Int
        ) // Int
        ,2 // Int
      ) // Int
    ) // Int
    ,op_div_798 // [!'@994.(Func '@994 '@994 '@994) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2073 // (Func (Array Int) Int Int)
      (ys // (Array Int)
        ,op_div_798 // [!'@993.(Func '@993 '@993 '@993) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function inRange_1825(xs, n)
{
  return op_amp_amp_1585 // (Func Bool Bool Bool)
  (op_gt_eq_662 // (Func Int Int Bool)
    (n // Int
      ,0 // Int
    ) // Bool
    ,op_lt_686 // (Func Int Int Bool)
    (n // Int
      ,count_1711 // (Func !'@783.(Array '@783) Int)
      (xs // !'@783.(Array '@783)
      ) // Int
    ) // Bool
  ) // Bool
  ;
}
// (Func (Array T0) T0)
function last_1848(xs)
{
  return op_obr_cbr_2073 // !'@790.(Func !'@790.(Array '@790) Int '@790)
  (xs // !'@790.(Array '@790)
    ,op_sub_754 // [!'@791.(Func '@791 '@791 '@791) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@790.(Array '@790) Int)
      (xs // !'@790.(Array '@790)
      ) // Int
      ,1 // Int
    ) // Int
  ) // '@790
  ;
}
// (Func (Array T0) T0)
function first_1863(xs)
{
  return op_obr_cbr_2073 // !'@687.(Func !'@687.(Array '@687) Int '@687)
  (xs // !'@687.(Array '@687)
    ,0 // Int
  ) // '@687
  ;
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1900(xs, acc, f)
{
  for (let i3=0; i3 < xs // !'@227.(Array '@227)
  .count; ++i3)
  {
    const x = xs // !'@227.(Array '@227)
    .at(i3);
    {
      acc = f // !'@228!'@227.(Func '@228 '@227 '@228)
      (acc // '@228
        ,x // '@227
      ) // '@228
       // '@228
      ;
    }
  }
  return acc // '@228
  ;
}
// (Func (Array (Array T0)) (Array T0))
function flatten_1917(xs)
{
  return reduce_1900 // !'@289.(Func (Array (Array '@289)) (Array '@289) (Func (Array '@289) (Array '@289) (Array '@289)) (Array '@289))
  (xs // (Array !'@289.(Array '@289))
    ,arrayFromJavaScript([]) // !'@289.(Array '@289)
    ,concat_1213 // !'@289.(Func (Array '@289) (Array '@289) (Array '@289))
  ) // !'@289.(Array '@289)
  ;
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T1))
function flatMap_1939(xs, f)
{
  return flatten_1917 // !'@317.(Func (Array (Array '@317)) (Array '@317))
  (map_53 // !'@318!'@317.(Func (Array '@318) (Func '@318 (Array '@317)) (Array (Array '@317)))
    (xs // !'@318.(Array '@318)
      ,f // !'@318!'@317.(Func '@318 (Array '@317))
    ) // (Array !'@317.(Array '@317))
  ) // !'@317.(Array '@317)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function cartesianProduct_1982(xs, ys, f)
{
  return flatMap_1939 // !'@322!'@328.(Func (Array '@322) (Func '@322 (Array '@328)) (Array '@328))
  (xs // !'@322.(Array '@322)
    ,(x) => map_53 // !'@326!'@328.(Func (Array '@326) (Func '@326 '@328) (Array '@328))
    (ys // !'@326.(Array '@326)
      ,(y) => f // !'@322!'@326!'@328.(Func '@322 '@326 '@328)
      (x // '@322
        ,y // '@326
      ) // '@328
       // !'@326!'@328.(Func '@326 '@328)
    ) // !'@328.(Array '@328)
     // !'@322!'@328.(Func '@322 (Array '@328))
  ) // !'@328.(Array '@328)
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
    )(op_div_590 // [!'@96.(Func '@96 '@96 '@96) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (1 // Int
      ,t // Float
    ) // Float
  )
   // Mesh
  )(op_div_590 // [!'@13.(Func '@13 '@13 '@13) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@71.(Func '@71 '@71 '@71) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  )(op_div_590 // [!'@101.(Func '@101 '@101 '@101) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_add_518 // [!'@102.(Func '@102 '@102 '@102) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  let cols = op_div_798 // [!'@506.(Func '@506 '@506 '@506) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func !'@436.(Array '@436) Int)
    (vertices // !'@436.(Array '@436)
    ) // Int
    ,rows // Int
  ) // Int
  ;
  let nr = connectRows // Bool
   ? rows // Int
   : op_sub_754 // [!'@507.(Func '@507 '@507 '@507) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (rows // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let nc = connectCols // Bool
   ? cols // Int
   : op_sub_754 // [!'@508.(Func '@508 '@508 '@508) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
          let a = op_add_732 // [!'@510.(Func '@510 '@510 '@510) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@509.(Func '@509 '@509 '@509) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let b = op_add_732 // [!'@514.(Func '@514 '@514 '@514) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@512.(Func '@512 '@512 '@512) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@511.(Func '@511 '@511 '@511) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@513.(Func '@513 '@513 '@513) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let c = op_add_732 // [!'@520.(Func '@520 '@520 '@520) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@516.(Func '@516 '@516 '@516) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@515.(Func '@515 '@515 '@515) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@519.(Func '@519 '@519 '@519) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@518.(Func '@518 '@518 '@518) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@517.(Func '@517 '@517 '@517) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let d = op_add_732 // [!'@524.(Func '@524 '@524 '@524) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@523.(Func '@523 '@523 '@523) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@522.(Func '@522 '@522 '@522) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@521.(Func '@521 '@521 '@521) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return float3_119 // [(Func Float Float Float Float3) | (Func (Array Float) Float3)]
  (op_mul_886 // [!'@557.(Func '@557 '@557 '@557) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,op_mul_886 // [!'@558.(Func '@558 '@558 '@558) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function rescale_1094(v, from, length)
{
  return op_add_518 // [!'@1131.(Func '@1131 '@1131 '@1131) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (from // '@1126
    ,op_mul_566 // [!'@1130.(Func '@1130 '@1130 '@1130) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // '@1126
      ,length // '@1126
    ) // '@1126
  ) // '@1126
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
    (op_add_842 // [!'@535.(Func '@535 '@535 '@535) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@534.(Func '@534 '@534 '@534) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@533.(Func '@533 '@533 '@533) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,float_41 // (Func Int Float)
            (uCount // Int
            ) // Float
          ) // Float
          ,uLength // Float
        ) // Float
        ,uStart // Float
      ) // Float
      ,op_add_842 // [!'@538.(Func '@538 '@538 '@538) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@537.(Func '@537 '@537 '@537) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@536.(Func '@536 '@536 '@536) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
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
  return meshFromUV_1221 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Mesh) | !'@545!'@546!'@547.(Func '@545 '@546 '@547)]
  (f // (Func Float Float Float3)
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
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@762.(Func '@762 '@762 '@762) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (cos_353 // (Func Float Float)
        (op_mul_566 // [!'@759.(Func '@759 '@759 '@759) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mul_776 // [!'@758.(Func '@758 '@758 '@758) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (u // Int
              ,2 // Int
            ) // Int
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566 // [!'@761.(Func '@761 '@761 '@761) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@760.(Func '@760 '@760 '@760) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,cos_353 // (Func Float Float)
    (op_mul_566 // [!'@764.(Func '@764 '@764 '@764) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_776 // [!'@763.(Func '@763 '@763 '@763) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Int
          ,2 // Int
        ) // Int
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@769.(Func '@769 '@769 '@769) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (op_mul_566 // [!'@766.(Func '@766 '@766 '@766) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@765.(Func '@765 '@765 '@765) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566 // [!'@768.(Func '@768 '@768 '@768) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@767.(Func '@767 '@767 '@767) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Int
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
  return meshFromUV_1247 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Mesh) | (Func (Func Float Float Float3) Int Mesh)]
  (spherePoint_1347 // (Func Int Int Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function sphere_1375()
{
  return sphere_1364 // [(Func Int Mesh) | !'@772.(Func '@772)]
  (32 // Int
  ) // Mesh
  ;
}
// (Func Int Float Float3)
function cylinderPoint_1423(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (sin_449 // (Func Float Float)
    (op_mul_566 // [!'@564.(Func '@564 '@564 '@564) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_776 // [!'@563.(Func '@563 '@563 '@563) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Int
          ,2 // Int
        ) // Int
        ,pi // Float
      ) // Float
    ) // Float
    ,v // Float
    ,cos_353 // (Func Float Float)
    (op_mul_566 // [!'@566.(Func '@566 '@566 '@566) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_776 // [!'@565.(Func '@565 '@565 '@565) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Int
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
  return meshFromUV_1247 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Mesh) | (Func (Func Float Float Float3) Int Mesh)]
  (cylinderPoint_1423 // (Func Int Float Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function cylinder_1451()
{
  return cylinder_1440 // [(Func Int Mesh) | !'@569.(Func '@569)]
  (32 // Int
  ) // Mesh
  ;
}
// (Func Float Float Int Mesh)
function torus_1491(r1, r2, segments)
{
  return meshFromUV_1247 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Mesh) | (Func (Func Float Float Float3) Int Mesh)]
  ((u, v) => torusPoint_1621 // (Func Int Int Float Float Float3)
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
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@1292.(Func '@1292 '@1292 '@1292) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@1289.(Func '@1289 '@1289 '@1289) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@1288.(Func '@1288 '@1288 '@1288) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_566 // [!'@1287.(Func '@1287 '@1287 '@1287) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_776 // [!'@1286.(Func '@1286 '@1286 '@1286) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Int
                ,2 // Int
              ) // Int
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,cos_353 // (Func Float Float)
      (op_mul_566 // [!'@1291.(Func '@1291 '@1291 '@1291) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@1290.(Func '@1290 '@1290 '@1290) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1299.(Func '@1299 '@1299 '@1299) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@1296.(Func '@1296 '@1296 '@1296) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@1295.(Func '@1295 '@1295 '@1295) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_566 // [!'@1294.(Func '@1294 '@1294 '@1294) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_776 // [!'@1293.(Func '@1293 '@1293 '@1293) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Int
                ,2 // Int
              ) // Int
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566 // [!'@1298.(Func '@1298 '@1298 '@1298) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@1297.(Func '@1297 '@1297 '@1297) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@1302.(Func '@1302 '@1302 '@1302) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (r2 // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566 // [!'@1301.(Func '@1301 '@1301 '@1301) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@1300.(Func '@1300 '@1300 '@1300) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Int
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
  return torus_1491 // [(Func Float Float Int Mesh) | !'@1304.(Func '@1304)]
  (10 // Int
    ,2 // Int
    ,32 // Int
  ) // Mesh
  ;
}
// (Func Mesh Int)
function vertexCount_1655(mesh)
{
  return op_div_798 // [!'@724.(Func '@724 '@724 '@724) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func (Array Float) Int)
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
  return op_div_798 // [!'@666.(Func '@666 '@666 '@666) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func (Array Int) Int)
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
  return vector_151 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (take_994 // [!'@734.(Func (Array '@734) Int (Array '@734)) | !'@735.(Func (Array '@735) Int Int (Array '@735))]
    (vertexBuffer_2151 // (Func Mesh (Array Float))
      (mesh // Mesh
      ) // (Array Float)
      ,op_mul_776 // [!'@733.(Func '@733 '@733 '@733) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
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
  return array_1691 // [!'@736.(Func Int (Func Int '@736) (Array '@736)) | (Func Float3 (Array Float)) | (Func Float3 (Array Float))]
  (vertexCount_1655 // (Func Mesh Int)
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
    ,(v) => op_add_1255 // [!'@740.(Func '@740 '@740 '@740) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
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
    ,(v) => op_mul_1385 // [!'@1157.(Func '@1157 '@1157 '@1157) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // Float3
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
  simpleArrayTest_439 // !'@1010.(Func '@1010)
  () // '@1010
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
  print_2094 // !'@828.(Func Str '@828)
  ("'Expect [1, 11, 3]'" // Str
  ) // '@828
  ;
  print_2094 // !'@830.(Func (Array Int) '@830)
  (xs // (Array Int)
  ) // '@830
  ;
  print_2094 // !'@832.(Func Str '@832)
  ("'Expect 1, 11, 3'" // Str
  ) // '@832
  ;
  for (let i6=0; i6 < xs // (Array Int)
  .count; ++i6)
  {
    const x = xs // (Array Int)
    .at(i6);
    {
      print_2094 // !'@835.(Func Int '@835)
      (x // Int
      ) // '@835
      ;
    }
  }
  print_2094 // !'@837.(Func Str '@837)
  ("'Expect 1'" // Str
  ) // '@837
  ;
  print_2094 // !'@839.(Func Int '@839)
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (xs // (Array Int)
      ,0 // Int
    ) // Int
  ) // '@839
  ;
  print_2094 // !'@842.(Func Str '@842)
  ("'Expect 3'" // Str
  ) // '@842
  ;
  print_2094 // !'@844.(Func Int '@844)
  (count_1711 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@844
  ;
  print_2094 // !'@847.(Func Str '@847)
  ("'Expect 1'" // Str
  ) // '@847
  ;
  print_2094 // !'@849.(Func Int '@849)
  (first_1863 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@849
  ;
  print_2094 // !'@852.(Func Str '@852)
  ("'Expect 3'" // Str
  ) // '@852
  ;
  print_2094 // !'@854.(Func Int '@854)
  (last_1848 // [!'@1004.(Func (Array '@1004) Int (Array '@1004)) | !'@1005.(Func !'@1005.(Array '@1005) '@1005)]
    (xs // (Array Int)
    ) // Int
  ) // '@854
  ;
  print_2094 // !'@858.(Func Str '@858)
  ("'Expect 1'" // Str
  ) // '@858
  ;
  print_2094 // !'@860.(Func Int '@860)
  (min_1392 // [!'@1006.(Func '@1006 '@1006 '@1006) | !'@1007.(Func !'@1007.(Array '@1007) '@1007)]
    (xs // (Array Int)
    ) // Int
  ) // '@860
  ;
  print_2094 // !'@883.(Func Str '@883)
  ("'Expect 11'" // Str
  ) // '@883
  ;
  print_2094 // !'@885.(Func Int '@885)
  (max_1414 // [!'@1008.(Func '@1008 '@1008 '@1008) | !'@1009.(Func !'@1009.(Array '@1009) '@1009)]
    (xs // (Array Int)
    ) // Int
  ) // '@885
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
  print_2094 // !'@906.(Func Str '@906)
  ("'Expect 5'" // Str
  ) // '@906
  ;
  print_2094 // !'@908.(Func Int '@908)
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (ys // (ArrayBuilder Int)
      ,1 // Int
    ) // Int
  ) // '@908
  ;
  print_2094 // !'@911.(Func Str '@911)
  ("'Expect 1, 3, 11'" // Str
  ) // '@911
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
      print_2094 // !'@962.(Func Int '@962)
      (z // Int
      ) // '@962
      ;
    }
  }
  print_2094 // !'@964.(Func Str '@964)
  ("'Expect 3'" // Str
  ) // '@964
  ;
  print_2094 // !'@966.(Func Int '@966)
  (median_1794 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@966
  ;
  print_2094 // !'@997.(Func Str '@997)
  ("'Expect 15'" // Str
  ) // '@997
  ;
  print_2094 // !'@999.(Func Int '@999)
  (sum_1330 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@999
  ;
  print_2094 // !'@1001.(Func Str '@1001)
  ("'Expect 5'" // Str
  ) // '@1001
  ;
  print_2094 // !'@1003.(Func Int '@1003)
  (average_1370 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1003
  ;
}
// (Func Float Float Float Mesh)
function testSphere_481(offX, offY, offZ)
{
  let offset = vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
  (offX // Float
    ,offY // Float
    ,offZ // Float
  ) // Float3
  ;
  return translate_1818 // (Func Mesh Float3 Mesh)
  (sphere_1364 // [(Func Int Mesh) | (Func Mesh)]
    (32 // Int
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
