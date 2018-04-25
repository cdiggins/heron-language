// Generated using Heron on Wed Apr 25 2018 08:38:21 GMT-0400 (Eastern Daylight Time)
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
  (op_mul_886 // [!'@373.(Func '@373 '@373 '@373) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@374.(Func '@374 '@374 '@374) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@475.(Func '@475 '@475 '@475) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float2
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float2
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@476.(Func '@476 '@476 '@476) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mul_886 // [!'@369.(Func '@369 '@369 '@369) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@370.(Func '@370 '@370 '@370) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@371.(Func '@371 '@371 '@371) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mod_930 // [!'@471.(Func '@471 '@471 '@471) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (x_134 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,x_134 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@472.(Func '@472 '@472 '@472) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (y_149 // (Func Float3 Float)
      (a // Float3
      ) // Float
      ,y_149 // (Func Float3 Float)
      (b // Float3
      ) // Float
    ) // Float
    ,op_mod_930 // [!'@473.(Func '@473 '@473 '@473) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  for (let i0=0; i0 < ys // !'@489.(Array '@489)
  .count; ++i0)
  {
    const y = ys // !'@489.(Array '@489)
    .at(i0);
    {
      xs = push_1789 // !'@489.(Func (ArrayBuilder '@489) '@489 (ArrayBuilder '@489))
      (xs // !'@489.(ArrayBuilder '@489)
        ,y // '@489
      ) // !'@489.(ArrayBuilder '@489)
       // !'@489.(ArrayBuilder '@489)
      ;
    }
  }
  return xs // !'@489.(ArrayBuilder '@489)
  ;
}
// (Func (Array T0) (Array T0))
function reify_1990(xs)
{
  return immutable_1847 // !'@1168.(Func (ArrayBuilder '@1168) (Array '@1168))
  (mutable_1760 // !'@1168.(Func (Array '@1168) (ArrayBuilder '@1168))
    (xs // !'@1168.(Array '@1168)
    ) // !'@1168.(ArrayBuilder '@1168)
  ) // !'@1168.(Array '@1168)
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
  return op_div_590 // [!'@1094.(Func '@1094 '@1094 '@1094) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_sub_864 // [!'@384.(Func '@384 '@384 '@384) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@382.(Func '@382 '@382 '@382) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (y_149 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@383.(Func '@383 '@383 '@383) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@387.(Func '@387 '@387 '@387) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@385.(Func '@385 '@385 '@385) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (z_164 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,x_134 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@386.(Func '@386 '@386 '@386) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,z_164 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
    ) // Float
    ,op_sub_864 // [!'@390.(Func '@390 '@390 '@390) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_886 // [!'@388.(Func '@388 '@388 '@388) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (x_134 // (Func Float3 Float)
        (a // Float3
        ) // Float
        ,y_149 // (Func Float3 Float)
        (b // Float3
        ) // Float
      ) // Float
      ,op_mul_886 // [!'@389.(Func '@389 '@389 '@389) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_sub_542 // [!'@1167.(Func '@1167 '@1167 '@1167) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (v // Float3
    ,op_mul_886 // [!'@1166.(Func '@1166 '@1166 '@1166) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_mul_566 // [!'@1165.(Func '@1165 '@1165 '@1165) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_add_842 // [!'@863.(Func '@863 '@863 '@863) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_mul_886 // [!'@861.(Func '@861 '@861 '@861) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (a // Float
      ,op_sub_864 // [!'@860.(Func '@860 '@860 '@860) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (1 // Float
        ,x // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@862.(Func '@862 '@862 '@862) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return arrayFromJavaScript([x // '@1313
  ]) // !'@1313.(Array '@1313)
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
  return array_1691 // [!'@1081.(Func Int (Func Int '@1081) (Array '@1081)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1076.(Array '@1076) Int)
    (xs // !'@1076.(Array '@1076)
    ) // Int
    ,(i) => f // !'@1076!'@1080.(Func '@1076 Int '@1080)
    (op_obr_cbr_2073 // !'@1076.(Func !'@1076.(Array '@1076) Int '@1076)
      (xs // !'@1076.(Array '@1076)
        ,i // Int
      ) // '@1076
      ,i // Int
    ) // '@1080
     // !'@1080.(Func Int '@1080)
  ) // !'@1080.(Array '@1080)
  ;
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_1691 // [!'@1069.(Func Int (Func Int '@1069) (Array '@1069)) | (Func Float3 (Array Float))]
  (count_1711 // (Func !'@1068.(Array '@1068) Int)
    (xs // !'@1068.(Array '@1068)
    ) // Int
    ,f // !'@1067.(Func Int '@1067)
  ) // !'@1067.(Array '@1067)
  ;
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_710 // !'@913.(Func '@913 '@913 Bool)
  (x // '@913
    ,y // '@913
  ) // Bool
   ? x // '@913
   : y // '@913
   // '@913
  ;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_662 // !'@938.(Func '@938 '@938 Bool)
  (x // '@938
    ,y // '@938
  ) // Bool
   ? x // '@938
   : y // '@938
   // '@938
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_710 // (Func Int Int Bool)
  (count_1711 // (Func !'@1223.(Array '@1223) Int)
    (xs // !'@1223.(Array '@1223)
    ) // Int
    ,count_1711 // (Func !'@1223.(Array '@1223) Int)
    (ys // !'@1223.(Array '@1223)
    ) // Int
  ) // Bool
   ? xs // !'@1223.(Array '@1223)
   : ys // !'@1223.(Array '@1223)
   // !'@1223.(Array '@1223)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_662 // (Func Int Int Bool)
  (count_1711 // (Func !'@870.(Array '@870) Int)
    (xs // !'@870.(Array '@870)
    ) // Int
    ,count_1711 // (Func !'@870.(Array '@870) Int)
    (ys // !'@870.(Array '@870)
    ) // Int
  ) // Bool
   ? xs // !'@870.(Array '@870)
   : ys // !'@870.(Array '@870)
   // !'@870.(Array '@870)
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
  return map_53 // !'@1216.(Func (Array Int) (Func Int '@1216) (Array '@1216))
  (indices // (Array Int)
    ,(i) => at_1737 // !'@1216.(Func !'@1216.(Array '@1216) Int '@1216)
    (xs // !'@1216.(Array '@1216)
      ,i // Int
    ) // '@1216
     // !'@1216.(Func Int '@1216)
  ) // !'@1216.(Array '@1216)
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
  (count_1711 // (Func !'@1339.(Array '@1339) Int)
    (xs // !'@1339.(Array '@1339)
    ) // Int
    ,count_1711 // (Func !'@1332.(Array '@1332) Int)
    (ys // !'@1332.(Array '@1332)
    ) // Int
  ) // Bool
   ? mapWithIndex_92 // !'@1339!'@1336.(Func (Array '@1339) (Func '@1339 Int '@1336) (Array '@1336))
  (xs // !'@1339.(Array '@1339)
    ,(x, i) => f // !'@1339!'@1332!'@1336.(Func '@1339 '@1332 '@1336)
    (x // '@1339
      ,op_obr_cbr_2073 // !'@1332.(Func !'@1332.(Array '@1332) Int '@1332)
      (ys // !'@1332.(Array '@1332)
        ,i // Int
      ) // '@1332
    ) // '@1336
     // !'@1339!'@1336.(Func '@1339 Int '@1336)
  ) // !'@1336.(Array '@1336)
   : mapWithIndex_92 // !'@1332!'@1336.(Func (Array '@1332) (Func '@1332 Int '@1336) (Array '@1336))
  (ys // !'@1332.(Array '@1332)
    ,(y, i) => f // !'@1339!'@1332!'@1336.(Func '@1339 '@1332 '@1336)
    (op_obr_cbr_2073 // !'@1339.(Func !'@1339.(Array '@1339) Int '@1339)
      (xs // !'@1339.(Array '@1339)
        ,i // Int
      ) // '@1339
      ,y // '@1332
    ) // '@1336
     // !'@1332!'@1336.(Func '@1332 Int '@1336)
  ) // !'@1336.(Array '@1336)
   // !'@1336.(Array '@1336)
  ;
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1918 // !'@232.(Func (Array '@232) Bool (Func Bool '@232 Bool) Bool)
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
  return reduce_1918 // !'@245.(Func (Array '@245) Bool (Func Bool '@245 Bool) Bool)
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
  return map_53 // !'@1125.(Func (Array Int) (Func Int '@1125) (Array '@1125))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => x // '@1125
     // !'@1125.(Func Int '@1125)
  ) // !'@1125.(Array '@1125)
  ;
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_662(xs, op)
{
  if (empty_245 // (Func !'@1141.(Array '@1141) Bool)
    (xs // !'@1141.(Array '@1141)
    ) // Bool
  )
  {
    return xs // !'@1141.(Array '@1141)
    ;
  }
  else
  { }
  let ys = mutable_1760 // !'@1141.(Func (Array '@1141) (ArrayBuilder '@1141))
  (repeat_566 // !'@1141.(Func '@1141 Int (Array '@1141))
    (op_obr_cbr_2073 // !'@1141.(Func !'@1141.(Array '@1141) Int '@1141)
      (xs // !'@1141.(Array '@1141)
        ,0 // Int
      ) // '@1141
      ,count_1711 // (Func !'@1141.(Array '@1141) Int)
      (xs // !'@1141.(Array '@1141)
      ) // Int
    ) // !'@1141.(Array '@1141)
  ) // !'@1141.(ArrayBuilder '@1141)
  ;
  for (let i2=0; i2 < op_dot_dot_2038 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1141.(Array '@1141) Int)
      (ys // !'@1141.(ArrayBuilder '@1141)
      ) // Int
    ) // (Array Int)
  .count; ++i2)
  {
    const i = op_dot_dot_2038 // (Func Int Int (Array Int))
    (1 // Int
      ,count_1711 // (Func !'@1141.(Array '@1141) Int)
      (ys // !'@1141.(ArrayBuilder '@1141)
      ) // Int
    ) // (Array Int)
    .at(i2);
    {
      ys = set_1824 // !'@1141.(Func (ArrayBuilder '@1141) Int '@1141 (ArrayBuilder '@1141))
      (ys // !'@1141.(ArrayBuilder '@1141)
        ,i // Int
        ,op // !'@1141.(Func '@1141 '@1141 '@1141)
        (op_obr_cbr_2073 // !'@1141.(Func !'@1141.(Array '@1141) Int '@1141)
          (xs // !'@1141.(Array '@1141)
            ,i // Int
          ) // '@1141
          ,op_obr_cbr_2073 // !'@1141.(Func !'@1141.(Array '@1141) Int '@1141)
          (ys // !'@1141.(ArrayBuilder '@1141)
            ,op_sub_754 // [!'@1143.(Func '@1143 '@1143 '@1143) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (i // Int
              ,1 // Int
            ) // Int
          ) // '@1141
        ) // '@1141
      ) // !'@1141.(ArrayBuilder '@1141)
       // !'@1141.(ArrayBuilder '@1141)
      ;
    }
  }
  return immutable_1847 // !'@1141.(Func (ArrayBuilder '@1141) (Array '@1141))
  (ys // !'@1141.(ArrayBuilder '@1141)
  ) // !'@1141.(Array '@1141)
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
  return map_53 // !'@1282.(Func (Array Int) (Func Int '@1282) (Array '@1282))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1287.(Func '@1287 '@1287 '@1287) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1282.(Array '@1282) Int)
        (xs // !'@1282.(Array '@1282)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1282.(Func !'@1282.(Array '@1282) Int '@1282)
    (xs // !'@1282.(Array '@1282)
      ,op_mul_776 // [!'@1288.(Func '@1288 '@1288 '@1288) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@1282
     // !'@1282.(Func Int '@1282)
  ) // !'@1282.(Array '@1282)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function stride_860(xs, from, n)
{
  return map_53 // !'@1266.(Func (Array Int) (Func Int '@1266) (Array '@1266))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,op_div_798 // [!'@1272.(Func '@1272 '@1272 '@1272) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1266.(Array '@1266) Int)
        (xs // !'@1266.(Array '@1266)
        ) // Int
        ,n // Int
      ) // Int
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1266.(Func !'@1266.(Array '@1266) Int '@1266)
    (xs // !'@1266.(Array '@1266)
      ,op_add_732 // [!'@1274.(Func '@1274 '@1274 '@1274) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (from // Int
        ,op_mul_776 // [!'@1273.(Func '@1273 '@1273 '@1273) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,n // Int
        ) // Int
      ) // Int
    ) // '@1266
     // !'@1266.(Func Int '@1266)
  ) // !'@1266.(Array '@1266)
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_896(xs, n)
{
  return map_53 // !'@1298.(Func (Array Int) (Func Int (Array '@1298)) (Array (Array '@1298)))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => stride_860 // [!'@1299.(Func (Array '@1299) Int (Array '@1299)) | !'@1300.(Func (Array '@1300) Int Int (Array '@1300))]
    (xs // !'@1298.(Array '@1298)
      ,i // Int
      ,n // Int
    ) // !'@1298.(Array '@1298)
     // !'@1298.(Func Int (Array '@1298))
  ) // (Array !'@1298.(Array '@1298))
  ;
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_947(xs, n)
{
  return map_53 // !'@1238.(Func (Array Int) (Func Int (Array '@1238)) (Array (Array '@1238)))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,n // Int
    ) // (Array Int)
    ,(i) => slice_758 // !'@1238.(Func (Array '@1238) Int Int (Array '@1238))
    (xs // !'@1238.(Array '@1238)
      ,op_mul_776 // [!'@1242.(Func '@1242 '@1242 '@1242) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
      ,op_mul_776 // [!'@1244.(Func '@1244 '@1244 '@1244) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_add_732 // [!'@1243.(Func '@1243 '@1243 '@1243) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (i // Int
          ,1 // Int
        ) // Int
        ,n // Int
      ) // Int
    ) // !'@1238.(Array '@1238)
     // !'@1238.(Func Int (Array '@1238))
  ) // (Array !'@1238.(Array '@1238))
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
  return skip_1023 // !'@842.(Func (Array '@842) Int (Array '@842))
  (xs // !'@842.(Array '@842)
    ,op_sub_754 // [!'@843.(Func '@843 '@843 '@843) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@842.(Array '@842) Int)
      (xs // !'@842.(Array '@842)
      ) // Int
      ,n // Int
    ) // Int
  ) // !'@842.(Array '@842)
  ;
}
// (Func (Array T0) T1 (Array T0))
function reverse_1121(xs, n)
{
  return map_53 // !'@1189.(Func (Array Int) (Func Int '@1189) (Array '@1189))
  (indices_292 // (Func !'@1189.(Array '@1189) (Array Int))
    (xs // !'@1189.(Array '@1189)
    ) // (Array Int)
    ,(i) => op_obr_cbr_2073 // !'@1189.(Func !'@1189.(Array '@1189) Int '@1189)
    (xs // !'@1189.(Array '@1189)
      ,op_sub_754 // [!'@1197.(Func '@1197 '@1197 '@1197) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1196.(Func '@1196 '@1196 '@1196) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func !'@1189.(Array '@1189) Int)
          (xs // !'@1189.(Array '@1189)
          ) // Int
          ,1 // Int
        ) // Int
        ,i // Int
      ) // Int
    ) // '@1189
     // !'@1189.(Func Int '@1189)
  ) // !'@1189.(Array '@1189)
  ;
}
// (Func Int (Func Int T0) (Array T0))
function gen_1145(cnt, f)
{
  return map_53 // !'@299.(Func (Array Int) (Func Int '@299) (Array '@299))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,cnt // Int
    ) // (Array Int)
    ,f // !'@299.(Func Int '@299)
  ) // !'@299.(Array '@299)
  ;
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1213(xs, ys)
{
  return gen_1145 // !'@302.(Func Int (Func Int '@302) (Array '@302))
  (op_add_732 // [!'@316.(Func '@316 '@316 '@316) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@302.(Array '@302) Int)
      (xs // !'@302.(Array '@302)
      ) // Int
      ,count_1711 // (Func !'@302.(Array '@302) Int)
      (ys // !'@302.(Array '@302)
      ) // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,count_1711 // (Func !'@302.(Array '@302) Int)
      (xs // !'@302.(Array '@302)
      ) // Int
    ) // Bool
     ? op_obr_cbr_2073 // !'@302.(Func !'@302.(Array '@302) Int '@302)
    (xs // !'@302.(Array '@302)
      ,i // Int
    ) // '@302
     : op_obr_cbr_2073 // !'@302.(Func !'@302.(Array '@302) Int '@302)
    (ys // !'@302.(Array '@302)
      ,op_sub_754 // [!'@317.(Func '@317 '@317 '@317) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,count_1711 // (Func !'@302.(Array '@302) Int)
        (xs // !'@302.(Array '@302)
        ) // Int
      ) // Int
    ) // '@302
     // '@302
     // !'@302.(Func Int '@302)
  ) // !'@302.(Array '@302)
  ;
}
// (Func (Array T0) Int Int (Array T0))
function cut_1275(xs, from, n)
{
  return gen_1145 // !'@397.(Func Int (Func Int '@397) (Array '@397))
  (op_sub_754 // [!'@404.(Func '@404 '@404 '@404) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@397.(Array '@397) Int)
      (xs // !'@397.(Array '@397)
      ) // Int
      ,n // Int
    ) // Int
    ,(i) => op_lt_686 // (Func Int Int Bool)
    (i // Int
      ,from // Int
    ) // Bool
     ? op_obr_cbr_2073 // !'@397.(Func !'@397.(Array '@397) Int '@397)
    (xs // !'@397.(Array '@397)
      ,i // Int
    ) // '@397
     : op_obr_cbr_2073 // !'@397.(Func !'@397.(Array '@397) Int '@397)
    (xs // !'@397.(Array '@397)
      ,op_add_732 // [!'@405.(Func '@405 '@405 '@405) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (i // Int
        ,n // Int
      ) // Int
    ) // '@397
     // '@397
     // !'@397.(Func Int '@397)
  ) // !'@397.(Array '@397)
  ;
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1312(xs, from, ys)
{
  return concat_1213 // !'@1253.(Func (Array '@1253) (Array '@1253) (Array '@1253))
  (concat_1213 // !'@1253.(Func (Array '@1253) (Array '@1253) (Array '@1253))
    (take_967 // [!'@1256.(Func (Array '@1256) Int (Array '@1256)) | !'@1257.(Func (Array '@1257) Int Int (Array '@1257))]
      (xs // !'@1253.(Array '@1253)
        ,from // Int
      ) // !'@1253.(Array '@1253)
      ,ys // !'@1253.(Array '@1253)
    ) // !'@1253.(Array '@1253)
    ,skip_1023 // !'@1253.(Func (Array '@1253) Int (Array '@1253))
    (xs // !'@1253.(Array '@1253)
      ,from // Int
    ) // !'@1253.(Array '@1253)
  ) // !'@1253.(Array '@1253)
  ;
}
// (Func (Array Float) Float)
function sum_1330(xs)
{
  return reduce_1918 // (Func (Array Float) Float (Func Float Float Float) Float)
  (xs // (Array Float)
    ,0 // Float
    ,op_add_842 // [!'@275.(Func '@275 '@275 '@275) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Float
  ;
}
// (Func (Array Float) Float)
function product_1348(xs)
{
  return reduce_1918 // (Func (Array Float) Float (Func Float Float Float) Float)
  (xs // (Array Float)
    ,1 // Float
    ,op_mul_886 // [!'@1152.(Func '@1152 '@1152 '@1152) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  ) // Float
  ;
}
// (Func (Array Float) Float)
function average_1373(xs)
{
  return op_div_908 // [!'@279.(Func '@279 '@279 '@279) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return reduce_1918 // !'@926.(Func (Array '@926) '@926 (Func '@926 '@926 '@926) '@926)
  (xs // !'@926.(Array '@926)
    ,op_obr_cbr_2073 // !'@926.(Func !'@926.(Array '@926) Int '@926)
    (xs // !'@926.(Array '@926)
      ,0 // Int
    ) // '@926
    ,min_140 // [!'@929.(Func '@929 '@929 '@929) | !'@930!'@931.(Func '@930 '@931)]
  ) // '@929
  ;
}
// (Func (Array T0) T0)
function max_1417(xs)
{
  return reduce_1918 // !'@947.(Func (Array '@947) '@947 (Func '@947 '@947 '@947) '@947)
  (xs // !'@947.(Array '@947)
    ,op_obr_cbr_2073 // !'@947.(Func !'@947.(Array '@947) Int '@947)
    (xs // !'@947.(Array '@947)
      ,0 // Int
    ) // '@947
    ,max_165 // [!'@950.(Func '@950 '@950 '@950) | !'@951!'@952.(Func '@951 '@952)]
  ) // '@950
  ;
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1483(xs, i, j)
{
  let tmp = op_obr_cbr_2073 // !'@987.(Func !'@987.(Array '@987) Int '@987)
  (xs // !'@987.(ArrayBuilder '@987)
    ,i // Int
  ) // '@987
  ;
  xs = set_1824 // !'@987.(Func (ArrayBuilder '@987) Int '@987 (ArrayBuilder '@987))
  (xs // !'@987.(Array '@987)
    ,i // Int
    ,op_obr_cbr_2073 // !'@987.(Func !'@987.(Array '@987) Int '@987)
    (xs // !'@987.(Array '@987)
      ,j // Int
    ) // '@987
  ) // !'@987.(ArrayBuilder '@987)
   // !'@987.(ArrayBuilder '@987)
  ;
  xs = set_1824 // !'@987.(Func (ArrayBuilder '@987) Int '@987 (ArrayBuilder '@987))
  (xs // !'@987.(ArrayBuilder '@987)
    ,j // Int
    ,tmp // '@987
  ) // !'@987.(ArrayBuilder '@987)
   // !'@987.(ArrayBuilder '@987)
  ;
  return xs // !'@987.(ArrayBuilder '@987)
  ;
}
// (Func (Array T0) Int Int Int)
function partition_1598(a, lo, hi)
{
  let p = op_obr_cbr_2073 // !'@975.(Func !'@975.(Array '@975) Int '@975)
  (a // !'@975.(Array '@975)
    ,lo // Int
  ) // '@975
  ;
  let i = op_sub_754 // [!'@992.(Func '@992 '@992 '@992) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (lo // Int
    ,1 // Int
  ) // Int
  ;
  let j = op_add_732 // [!'@993.(Func '@993 '@993 '@993) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    while (op_lt_686 // !'@975.(Func '@975 '@975 Bool)
      (op_obr_cbr_2073 // !'@975.(Func !'@975.(Array '@975) Int '@975)
        (a // !'@975.(Array '@975)
          ,i // Int
        ) // '@975
        ,p // '@975
      ) // Bool
    )
    do
    {
      j-- // Int
      ;
    }
    while (op_gt_638 // !'@975.(Func '@975 '@975 Bool)
      (op_obr_cbr_2073 // !'@975.(Func !'@975.(Array '@975) Int '@975)
        (a // !'@975.(Array '@975)
          ,j // Int
        ) // '@975
        ,p // '@975
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
    swapElements_1483 // !'@975.(Func (ArrayBuilder '@975) Int Int (ArrayBuilder '@975))
    (a // !'@975.(Array '@975)
      ,i // Int
      ,j // Int
    ) // !'@975.(ArrayBuilder '@975)
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
    let p = partition_1598 // (Func !'@994.(Array '@994) Int Int Int)
    (a // !'@994.(Array '@994)
      ,lo // Int
      ,hi // Int
    ) // Int
    ;
    qsort_1667 // !'@998.(Func !'@994.(Array '@994) Int Int '@998)
    (a // !'@994.(Array '@994)
      ,lo // Int
      ,p // Int
    ) // '@998
    ;
    qsort_1667 // !'@1002.(Func !'@994.(Array '@994) Int Int '@1002)
    (a // !'@994.(Array '@994)
      ,op_add_732 // [!'@1004.(Func '@1004 '@1004 '@1004) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (p // Int
        ,1 // Int
      ) // Int
      ,hi // Int
    ) // '@1002
    ;
  }
  else
  { }
  return a // !'@994.(Array '@994)
  ;
}
// (Func (Array T0) (Array T0))
function sort_1697(xs)
{
  return immutable_1847 // !'@1006.(Func (ArrayBuilder '@1006) (Array '@1006))
  (qsort_1667 // !'@1006.(Func (Array '@1006) Int Int (Array '@1006))
    (mutable_1760 // !'@1006.(Func (Array '@1006) (ArrayBuilder '@1006))
      (xs // !'@1006.(Array '@1006)
      ) // !'@1006.(ArrayBuilder '@1006)
      ,0 // Int
      ,op_sub_754 // [!'@1009.(Func '@1009 '@1009 '@1009) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func !'@1006.(Array '@1006) Int)
        (xs // !'@1006.(Array '@1006)
        ) // Int
        ,1 // Int
      ) // Int
    ) // !'@1006.(Array '@1006)
  ) // !'@1006.(Array '@1006)
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
  (op_mod_820 // [!'@1039.(Func '@1039 '@1039 '@1039) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1038.(Func '@1038 '@1038 '@1038) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,op_div_798 // [!'@1041.(Func '@1041 '@1041 '@1041) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_sub_754 // [!'@1040.(Func '@1040 '@1040 '@1040) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (count_1711 // (Func (Array Int) Int)
        (ys // (Array Int)
        ) // Int
        ,1 // Int
      ) // Int
      ,2 // Int
    ) // Int
  ) // Int
   : op_add_732 // [!'@1046.(Func '@1046 '@1046 '@1046) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (ys // (Array Int)
      ,op_div_798 // [!'@1043.(Func '@1043 '@1043 '@1043) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_sub_754 // [!'@1042.(Func '@1042 '@1042 '@1042) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (count_1711 // (Func (Array Int) Int)
          (ys // (Array Int)
          ) // Int
          ,2 // Int
        ) // Int
        ,2 // Int
      ) // Int
    ) // Int
    ,op_div_798 // [!'@1045.(Func '@1045 '@1045 '@1045) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_obr_cbr_2073 // (Func (Array Int) Int Int)
      (ys // (Array Int)
        ,op_div_798 // [!'@1044.(Func '@1044 '@1044 '@1044) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
      ,count_1711 // (Func !'@834.(Array '@834) Int)
      (xs // !'@834.(Array '@834)
      ) // Int
    ) // Bool
  ) // Bool
  ;
}
// (Func (Array T0) T0)
function last_1851(xs)
{
  return op_obr_cbr_2073 // !'@849.(Func !'@849.(Array '@849) Int '@849)
  (xs // !'@849.(Array '@849)
    ,op_sub_754 // [!'@850.(Func '@850 '@850 '@850) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (count_1711 // (Func !'@849.(Array '@849) Int)
      (xs // !'@849.(Array '@849)
      ) // Int
      ,1 // Int
    ) // Int
  ) // '@849
  ;
}
// (Func (Array T0) T0)
function first_1866(xs)
{
  return op_obr_cbr_2073 // !'@687.(Func !'@687.(Array '@687) Int '@687)
  (xs // !'@687.(Array '@687)
    ,0 // Int
  ) // '@687
  ;
}
// (Func (Array T0) (Array T0))
function tail_1881(xs)
{
  return skip_1023 // !'@1305.(Func (Array '@1305) Int (Array '@1305))
  (xs // !'@1305.(Array '@1305)
    ,1 // Int
  ) // !'@1305.(Array '@1305)
  ;
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1918(xs, acc, f)
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
function flatten_1935(xs)
{
  return reduce_1918 // !'@291.(Func (Array (Array '@291)) (Array '@291) (Func (Array '@291) (Array '@291) (Array '@291)) (Array '@291))
  (xs // (Array !'@291.(Array '@291))
    ,arrayFromJavaScript([]) // !'@291.(Array '@291)
    ,concat_1213 // !'@291.(Func (Array '@291) (Array '@291) (Array '@291))
  ) // !'@291.(Array '@291)
  ;
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T1))
function flatMap_1957(xs, f)
{
  return flatten_1935 // !'@319.(Func (Array (Array '@319)) (Array '@319))
  (map_53 // !'@320!'@319.(Func (Array '@320) (Func '@320 (Array '@319)) (Array (Array '@319)))
    (xs // !'@320.(Array '@320)
      ,f // !'@320!'@319.(Func '@320 (Array '@319))
    ) // (Array !'@319.(Array '@319))
  ) // !'@319.(Array '@319)
  ;
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function cartesianProduct_2000(xs, ys, f)
{
  return flatMap_1957 // !'@324!'@330.(Func (Array '@324) (Func '@324 (Array '@330)) (Array '@330))
  (xs // !'@324.(Array '@324)
    ,(x) => map_53 // !'@328!'@330.(Func (Array '@328) (Func '@328 '@330) (Array '@330))
    (ys // !'@328.(Array '@328)
      ,(y) => f // !'@324!'@328!'@330.(Func '@324 '@328 '@330)
      (x // '@324
        ,y // '@328
      ) // '@330
       // !'@328!'@330.(Func '@328 '@330)
    ) // !'@330.(Array '@330)
     // !'@324!'@330.(Func '@324 (Array '@330))
  ) // !'@330.(Array '@330)
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
  let cols = op_div_798 // [!'@507.(Func '@507 '@507 '@507) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (count_1711 // (Func !'@437.(Array '@437) Int)
    (vertices // !'@437.(Array '@437)
    ) // Int
    ,rows // Int
  ) // Int
  ;
  let nr = connectRows // Bool
   ? rows // Int
   : op_sub_754 // [!'@508.(Func '@508 '@508 '@508) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (rows // Int
    ,1 // Int
  ) // Int
   // Int
  ;
  let nc = connectCols // Bool
   ? cols // Int
   : op_sub_754 // [!'@509.(Func '@509 '@509 '@509) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
          let a = op_add_732 // [!'@511.(Func '@511 '@511 '@511) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@510.(Func '@510 '@510 '@510) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let b = op_add_732 // [!'@515.(Func '@515 '@515 '@515) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@513.(Func '@513 '@513 '@513) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@512.(Func '@512 '@512 '@512) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@514.(Func '@514 '@514 '@514) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (row // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let c = op_add_732 // [!'@521.(Func '@521 '@521 '@521) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mod_820 // [!'@517.(Func '@517 '@517 '@517) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_add_732 // [!'@516.(Func '@516 '@516 '@516) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (col // Int
                ,1 // Int
              ) // Int
              ,cols // Int
            ) // Int
            ,op_mul_776 // [!'@520.(Func '@520 '@520 '@520) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@519.(Func '@519 '@519 '@519) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@518.(Func '@518 '@518 '@518) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
                (row // Int
                  ,1 // Int
                ) // Int
                ,rows // Int
              ) // Int
              ,cols // Int
            ) // Int
          ) // Int
          ;
          let d = op_add_732 // [!'@525.(Func '@525 '@525 '@525) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (col // Int
            ,op_mul_776 // [!'@524.(Func '@524 '@524 '@524) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mod_820 // [!'@523.(Func '@523 '@523 '@523) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (op_add_732 // [!'@522.(Func '@522 '@522 '@522) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return flatMap_1957 // (Func (Array Float3) (Func Float3 (Array Float)) (Array Float))
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
  (op_mul_886 // [!'@558.(Func '@558 '@558 '@558) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,op_mul_886 // [!'@559.(Func '@559 '@559 '@559) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return op_add_518 // [!'@1182.(Func '@1182 '@1182 '@1182) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
  (from // '@1177
    ,op_mul_566 // [!'@1181.(Func '@1181 '@1181 '@1181) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (v // '@1177
      ,length // '@1177
    ) // '@1177
  ) // '@1177
  ;
}
// (Func (Func Float Float Float3) Int Int Float Float Float Float Mesh)
function meshFromUV_1221(f, uCount, vCount, uStart, vStart, uLength, vLength)
{
  let points = cartesianProduct_2000 // (Func (Array Float) (Array Float) (Func Float Float Float3) (Array Float3))
  (op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,uCount // Int
    ) // (Array Int)
    ,op_dot_dot_2038 // (Func Int Int (Array Int))
    (0 // Int
      ,vCount // Int
    ) // (Array Int)
    ,(u, v) => f // (Func Float Float Float3)
    (op_add_842 // [!'@536.(Func '@536 '@536 '@536) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@535.(Func '@535 '@535 '@535) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@534.(Func '@534 '@534 '@534) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,float_41 // (Func Int Float)
            (uCount // Int
            ) // Float
          ) // Float
          ,uLength // Float
        ) // Float
        ,uStart // Float
      ) // Float
      ,op_add_842 // [!'@539.(Func '@539 '@539 '@539) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@538.(Func '@538 '@538 '@538) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_div_908 // [!'@537.(Func '@537 '@537 '@537) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return meshFromUV_1221 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Mesh) | !'@546!'@547!'@548.(Func '@546 '@547 '@548)]
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
// (Func Float Float Float3)
function spherePoint_1347(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (op_mul_886 // [!'@764.(Func '@764 '@764 '@764) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_negate_1659 // (Func Float Float)
      (cos_353 // (Func Float Float)
        (op_mul_886 // [!'@761.(Func '@761 '@761 '@761) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (op_mul_886 // [!'@760.(Func '@760 '@760 '@760) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (u // Float
              ,2 // Float
            ) // Float
            ,pi // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@763.(Func '@763 '@763 '@763) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@762.(Func '@762 '@762 '@762) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (v // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,cos_353 // (Func Float Float)
    (op_mul_886 // [!'@766.(Func '@766 '@766 '@766) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_886 // [!'@765.(Func '@765 '@765 '@765) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (v // Float
          ,2 // Float
        ) // Float
        ,pi // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@771.(Func '@771 '@771 '@771) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (sin_449 // (Func Float Float)
      (op_mul_886 // [!'@768.(Func '@768 '@768 '@768) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@767.(Func '@767 '@767 '@767) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Float
            ,2 // Float
          ) // Float
          ,pi // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_886 // [!'@770.(Func '@770 '@770 '@770) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_886 // [!'@769.(Func '@769 '@769 '@769) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
function sphere_1364(segments)
{
  return meshFromUV_1247 // [(Func (Func Float Float Float3) Int Int Float Float Float Float Mesh) | (Func (Func Float Float Float3) Int Mesh)]
  (spherePoint_1347 // (Func Float Float Float3)
    ,segments // Int
  ) // Mesh
  ;
}
// (Func Mesh)
function sphere_1375()
{
  return sphere_1364 // [(Func Int Mesh) | !'@774.(Func '@774)]
  (32 // Int
  ) // Mesh
  ;
}
// (Func Int Float Float3)
function cylinderPoint_1423(u, v)
{
  return vector_98 // [(Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3) | (Func Float2 Float3)]
  (sin_449 // (Func Float Float)
    (op_mul_566 // [!'@565.(Func '@565 '@565 '@565) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_776 // [!'@564.(Func '@564 '@564 '@564) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (u // Int
          ,2 // Int
        ) // Int
        ,pi // Float
      ) // Float
    ) // Float
    ,v // Float
    ,cos_353 // (Func Float Float)
    (op_mul_566 // [!'@567.(Func '@567 '@567 '@567) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (op_mul_776 // [!'@566.(Func '@566 '@566 '@566) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (op_mul_886 // [!'@810.(Func '@810 '@810 '@810) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@807.(Func '@807 '@807 '@807) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@806.(Func '@806 '@806 '@806) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_566 // [!'@805.(Func '@805 '@805 '@805) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_776 // [!'@804.(Func '@804 '@804 '@804) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Int
                ,2 // Int
              ) // Int
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,cos_353 // (Func Float Float)
      (op_mul_566 // [!'@809.(Func '@809 '@809 '@809) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@808.(Func '@808 '@808 '@808) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@817.(Func '@817 '@817 '@817) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (op_add_842 // [!'@814.(Func '@814 '@814 '@814) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
      (r1 // Float
        ,op_mul_886 // [!'@813.(Func '@813 '@813 '@813) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (r2 // Float
          ,cos_353 // (Func Float Float)
          (op_mul_566 // [!'@812.(Func '@812 '@812 '@812) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
            (op_mul_776 // [!'@811.(Func '@811 '@811 '@811) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
              (v // Int
                ,2 // Int
              ) // Int
              ,pi // Float
            ) // Float
          ) // Float
        ) // Float
      ) // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566 // [!'@816.(Func '@816 '@816 '@816) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@815.(Func '@815 '@815 '@815) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
          (u // Int
            ,2 // Int
          ) // Int
          ,pi // Float
        ) // Float
      ) // Float
    ) // Float
    ,op_mul_886 // [!'@820.(Func '@820 '@820 '@820) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
    (r2 // Float
      ,sin_449 // (Func Float Float)
      (op_mul_566 // [!'@819.(Func '@819 '@819 '@819) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
        (op_mul_776 // [!'@818.(Func '@818 '@818 '@818) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return torus_1491 // [(Func Float Float Int Mesh) | !'@823.(Func '@823)]
  (10 // Int
    ,2 // Int
    ,32 // Int
  ) // Mesh
  ;
}
// (Func Mesh Int)
function vertexCount_1655(mesh)
{
  return op_div_798 // [!'@726.(Func '@726 '@726 '@726) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  (take_994 // [!'@736.(Func (Array '@736) Int (Array '@736)) | !'@737.(Func (Array '@737) Int Int (Array '@737))]
    (vertexBuffer_2151 // (Func Mesh (Array Float))
      (mesh // Mesh
      ) // (Array Float)
      ,op_mul_776 // [!'@735.(Func '@735 '@735 '@735) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  return array_1691 // [!'@738.(Func Int (Func Int '@738) (Array '@738)) | (Func Float3 (Array Float)) | (Func Float3 (Array Float))]
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
    ,(v) => op_add_1255 // [!'@742.(Func '@742 '@742 '@742) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
    ,(v) => op_mul_1385 // [!'@1208.(Func '@1208 '@1208 '@1208) | (Func Int Int Int) | (Func Float Float Float) | (Func Float2 Float2 Float2) | (Func Float3 Float3 Float3)]
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
  simpleArrayTest_439 // !'@1061.(Func '@1061)
  () // '@1061
  ;
  return geometryTest_503 // (Func (Array (Func Float Float Float Mesh)))
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
  print_2094 // !'@879.(Func Str '@879)
  ("'Expect [1, 11, 3]'" // Str
  ) // '@879
  ;
  print_2094 // !'@881.(Func (Array Int) '@881)
  (xs // (Array Int)
  ) // '@881
  ;
  print_2094 // !'@883.(Func Str '@883)
  ("'Expect 1, 11, 3'" // Str
  ) // '@883
  ;
  for (let i6=0; i6 < xs // (Array Int)
  .count; ++i6)
  {
    const x = xs // (Array Int)
    .at(i6);
    {
      print_2094 // !'@886.(Func Int '@886)
      (x // Int
      ) // '@886
      ;
    }
  }
  print_2094 // !'@888.(Func Str '@888)
  ("'Expect 1'" // Str
  ) // '@888
  ;
  print_2094 // !'@890.(Func Int '@890)
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (xs // (Array Int)
      ,0 // Int
    ) // Int
  ) // '@890
  ;
  print_2094 // !'@893.(Func Str '@893)
  ("'Expect 3'" // Str
  ) // '@893
  ;
  print_2094 // !'@895.(Func Int '@895)
  (count_1711 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@895
  ;
  print_2094 // !'@898.(Func Str '@898)
  ("'Expect 1'" // Str
  ) // '@898
  ;
  print_2094 // !'@900.(Func Int '@900)
  (first_1866 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@900
  ;
  print_2094 // !'@903.(Func Str '@903)
  ("'Expect 3'" // Str
  ) // '@903
  ;
  print_2094 // !'@905.(Func Int '@905)
  (last_1851 // [!'@1055.(Func (Array '@1055) Int (Array '@1055)) | !'@1056.(Func !'@1056.(Array '@1056) '@1056)]
    (xs // (Array Int)
    ) // Int
  ) // '@905
  ;
  print_2094 // !'@909.(Func Str '@909)
  ("'Expect 1'" // Str
  ) // '@909
  ;
  print_2094 // !'@911.(Func Int '@911)
  (min_1395 // [!'@1057.(Func '@1057 '@1057 '@1057) | !'@1058.(Func !'@1058.(Array '@1058) '@1058)]
    (xs // (Array Int)
    ) // Int
  ) // '@911
  ;
  print_2094 // !'@934.(Func Str '@934)
  ("'Expect 11'" // Str
  ) // '@934
  ;
  print_2094 // !'@936.(Func Int '@936)
  (max_1417 // [!'@1059.(Func '@1059 '@1059 '@1059) | !'@1060.(Func !'@1060.(Array '@1060) '@1060)]
    (xs // (Array Int)
    ) // Int
  ) // '@936
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
  print_2094 // !'@957.(Func Str '@957)
  ("'Expect 5'" // Str
  ) // '@957
  ;
  print_2094 // !'@959.(Func Int '@959)
  (op_obr_cbr_2073 // (Func (Array Int) Int Int)
    (ys // (ArrayBuilder Int)
      ,1 // Int
    ) // Int
  ) // '@959
  ;
  print_2094 // !'@962.(Func Str '@962)
  ("'Expect 1, 3, 11'" // Str
  ) // '@962
  ;
  let zs = sort_1697 // (Func (Array Int) (Array Int))
  (xs // (Array Int)
  ) // (Array Int)
  ;
  for (let i7=0; i7 < zs // (Array Int)
  .count; ++i7)
  {
    const z = zs // (Array Int)
    .at(i7);
    {
      print_2094 // !'@1013.(Func Int '@1013)
      (z // Int
      ) // '@1013
      ;
    }
  }
  print_2094 // !'@1015.(Func Str '@1015)
  ("'Expect 3'" // Str
  ) // '@1015
  ;
  print_2094 // !'@1017.(Func Int '@1017)
  (median_1797 // (Func (Array Int) Int)
    (xs // (Array Int)
    ) // Int
  ) // '@1017
  ;
  print_2094 // !'@1048.(Func Str '@1048)
  ("'Expect 15'" // Str
  ) // '@1048
  ;
  print_2094 // !'@1050.(Func Float '@1050)
  (sum_1330 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1050
  ;
  print_2094 // !'@1052.(Func Str '@1052)
  ("'Expect 5'" // Str
  ) // '@1052
  ;
  print_2094 // !'@1054.(Func Float '@1054)
  (average_1373 // (Func (Array Float) Float)
    (xs // (Array Int)
    ) // Float
  ) // '@1054
  ;
}
// (Func Mesh (Func Float Float Float Mesh))
function testMoveGeometry_472(g)
{
  return (offX, offY, offZ) => translate_1818 // (Func Mesh Float3 Mesh)
  (g // Mesh
    ,vector_98 // [(Func Float2 Float3) | (Func Float Float Float Float3) | (Func Float Float3) | (Func (Array Float) Float3)]
    (offX // Float
      ,offY // Float
      ,offZ // Float
    ) // Float3
  ) // Mesh
   // (Func Float Float Float Mesh)
  ;
}
// (Func (Array (Func Float Float Float Mesh)))
function geometryTest_503()
{
  return arrayFromJavaScript([testMoveGeometry_472 // (Func Mesh (Func Float Float Float Mesh))
    (sphere_1375 // [(Func Int Mesh) | (Func Mesh)]
      () // Mesh
    ) // (Func Float Float Float Mesh)
    ,testMoveGeometry_472 // (Func Mesh (Func Float Float Float Mesh))
    (cylinder_1451 // [(Func Int Mesh) | (Func Mesh)]
      () // Mesh
    ) // (Func Float Float Float Mesh)
    ,testMoveGeometry_472 // (Func Mesh (Func Float Float Float Mesh))
    (torus_1634 // [(Func Float Float Int Mesh) | (Func Mesh)]
      () // Mesh
    ) // (Func Float Float Float Mesh)
  ]) // (Array (Func Float Float Float Mesh))
  ;
}

return main_39;
})();
