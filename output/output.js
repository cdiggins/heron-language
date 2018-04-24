// Generated using Heron on Tue Apr 24 2018 00:04:55 GMT-0400 (Eastern Daylight Time)
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
const pi = 3.141592653589793;
const e = 2.718281828459045;
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
  return float2_62(op_add_842(x_134(a),x_134(b)),op_add_842(y_149(a),y_149(b)));
}
// (Func Float2 Float2 Float2)
function op_sub_1034(a, b)
{
  return float2_62(op_sub_864(x_134(a),x_134(b)),op_sub_864(y_149(a),y_149(b)));
}
// (Func Float2 Float2 Float2)
function op_mul_1086(a, b)
{
  return float2_62(op_mul_886(x_134(a),x_134(b)),op_mul_886(y_149(a),y_149(b)));
}
// (Func Float2 Float2 Float2)
function op_div_1138(a, b)
{
  return float2_62(op_div_908(x_134(a),x_134(b)),op_div_908(y_149(a),y_149(b)));
}
// (Func Float2 Float2 Float2)
function op_mod_1190(a, b)
{
  return float2_62(op_mod_930(x_134(a),x_134(b)),op_mod_930(y_149(a),y_149(b)));
}
// (Func Float3 Float3 Float3)
function op_add_1255(a, b)
{
  return float3_119(op_add_842(x_134(a),x_134(b)),op_add_842(y_149(a),y_149(b)),op_add_842(z_164(a),z_164(b)));
}
// (Func Float3 Float3 Float3)
function op_sub_1320(a, b)
{
  return float3_119(op_sub_864(x_134(a),x_134(b)),op_sub_864(y_149(a),y_149(b)),op_sub_864(z_164(a),z_164(b)));
}
// (Func Float3 Float3 Float3)
function op_mul_1385(a, b)
{
  return float3_119(op_mul_886(x_134(a),x_134(b)),op_mul_886(y_149(a),y_149(b)),op_mul_886(z_164(a),z_164(b)));
}
// (Func Float3 Float3 Float3)
function op_div_1450(a, b)
{
  return float3_119(op_div_908(x_134(a),x_134(b)),op_div_908(y_149(a),y_149(b)),op_div_908(z_164(a),z_164(b)));
}
// (Func Float3 Float3 Float3)
function op_mod_1515(a, b)
{
  return float3_119(op_mod_930(x_134(a),x_134(b)),op_mod_930(y_149(a),y_149(b)),op_mod_930(z_164(a),z_164(b)));
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
  return arrayFromJavaScript([x_134(v),y_149(v),z_164(v)]);
}
// (Func (Array Float) Float3)
function float3_1906(xs)
{
  return float3_119(op_obr_cbr_2073(xs,0),op_obr_cbr_2073(xs,1),op_obr_cbr_2073(xs,2));
}
// (Func (ArrayBuilder T0) (Array T0) (ArrayBuilder T0))
function pushMany_1959(xs, ys)
{
  for (let i0=0; i0 < ys.count; ++i0)
  {
    const y = ys.at(i0);
    {
      xs = push_1789(xs,y);
    }
  }
  return xs;
}
// (Func (Array T0) (Array T0))
function reify_1990(xs)
{
  return immutable_1847(mutable_1760(xs));
}
// (Func Int Int (Array Int))
function op_dot_dot_2038(from, upto)
{
  return array_1691(op_sub_754(upto,from),(i) => op_add_732(i,from));
}
// (Func (Array T0) Int T0)
function op_obr_cbr_2073(xs, i)
{
  return at_1737(xs,i);
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
const origin = _UNRESOLVED_(0,0,0);
const ones = _UNRESOLVED_(1,1,1);
const xaxis = _UNRESOLVED_(1,0,0);
const yaxis = _UNRESOLVED_(0,1,0);
const zaxis = _UNRESOLVED_(0,0,1);
// (Func Float Float Float Float3)
function vector_98(x, y, z)
{
  return float3_119(x,y,z);
}
// (Func Float Float3)
function vector_120(x)
{
  return vector_98(x,x,x);
}
// (Func (Array Float) Float3)
function vector_151(xs)
{
  return vector_98(op_obr_cbr_2073(xs,0),op_obr_cbr_2073(xs,1),op_obr_cbr_2073(xs,2));
}
// (Func Float3 (Array Float))
function array_176(v)
{
  return arrayFromJavaScript([x_134(v),y_149(v),z_164(v)]);
}
// (Func Float3 Float)
function sumComponents_206(v)
{
  return op_add_842(op_add_842(x_134(v),y_149(v)),z_164(v));
}
// (Func Float3 Float3 Float)
function dot_229(a, b)
{
  return sumComponents_206(op_mul_566(a,b));
}
// (Func Float3 Float)
function length_247(v)
{
  return sqrt_479(length2_263(v));
}
// (Func Float3 Float)
function length2_263(v)
{
  return dot_229(v,v);
}
// (Func Float3 Float3 Float)
function distance_286(a, b)
{
  return length_247(op_sub_542(a,b));
}
// (Func Float3 Float3 Float)
function distance2_309(a, b)
{
  return length2_263(op_sub_542(a,b));
}
// (Func Float3 Float)
function normal_328(v)
{
  return op_div_908(v,length_247(v));
}
// (Func Float3 Float3 Float3)
function cross_431(a, b)
{
  return vector_98(op_sub_864(op_mul_886(y_149(a),z_164(b)),op_mul_886(z_164(a),y_149(b))),op_sub_864(op_mul_886(z_164(a),x_134(b)),op_mul_886(x_134(a),z_164(b))),op_sub_864(op_mul_886(x_134(a),y_149(b)),op_mul_886(y_149(a),x_134(b))));
}
// (Func Float3 Float3 Float)
function reflect_466(v, n)
{
  return op_sub_864(v,op_mul_886(op_mul_886(n,dot_229(v,n)),2));
}
// (Func Float Float Float Float)
function lerp_503(a, b, x)
{
  return op_add_842(op_mul_886(a,op_sub_864(1,x)),op_mul_886(b,x));
}
// (Func Float3 Float3)
function negate_540(v)
{
  return vector_98(op_negate_1659(x_134(v)),op_negate_1659(y_149(v)),op_negate_1659(z_164(v)));
}
// Module heron:std.array:0.1
// file input\array.heron
// (Func T0 (Array T0))
function unit_16(x)
{
  return arrayFromJavaScript([x]);
}
// (Func (Array T0) (Func T0 T1) (Array T1))
function map_53(xs, f)
{
  return array_1691(count_1711(xs),(i) => f(op_obr_cbr_2073(xs,i)));
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_1691(count_1711(xs),(i) => f(op_obr_cbr_2073(xs,i),i));
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_1691(count_1711(xs),f);
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_710(x,y) ? x : y;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_662(x,y) ? x : y;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_710(count_1711(xs),count_1711(ys)) ? xs : ys;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_662(count_1711(xs),count_1711(ys)) ? xs : ys;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_1563(count_1711(xs),0);
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53(indices,(i) => at_1737(xs,i));
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_2038(0,count_1711(xs));
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function zip_372(xs, ys, f)
{
  return op_lt_eq_710(count_1711(xs),count_1711(ys)) ? mapWithIndex_92(xs,(x, i) => f(x,op_obr_cbr_2073(ys,i))) : mapWithIndex_92(ys,(y, i) => f(op_obr_cbr_2073(xs,i),y));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1900(xs,true,(prev, x) => op_amp_amp_1585(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1900(xs,false,(prev, x) => op_bar_bar_1607(prev,p(x)));
}
// (Func (Array T0) (Array T1) Bool)
function eq_469(xs, ys)
{
  return op_eq_eq_1563(count_1711(xs),count_1711(ys));
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_537(xs, p)
{
  let ys = mutable_1760(xs);
  let i = 0;
  for (let i1=0; i1 < xs.count; ++i1)
  {
    const x = xs.at(i1);
    {
      if (p(x))
      {
        ys = set_1824(ys,i++,x);
      }
      else
      { }
    }
  }
  return take_967(immutable_1847(ys),i);
}
// (Func T0 Int (Array T0))
function repeat_566(x, n)
{
  return map_53(op_dot_dot_2038(0,n),(i) => x);
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_662(xs, op)
{
  if (empty_245(xs))
  {
    return xs;
  }
  else
  { }
  let ys = mutable_1760(repeat_566(op_obr_cbr_2073(xs,0),count_1711(xs)));
  for (let i2=0; i2 < op_dot_dot_2038(1,count_1711(ys)).count; ++i2)
  {
    const i = op_dot_dot_2038(1,count_1711(ys)).at(i2);
    {
      ys = set_1824(ys,i,op(op_obr_cbr_2073(xs,i),op_obr_cbr_2073(ys,op_sub_754(i,1))));
    }
  }
  return immutable_1847(ys);
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_720(xs)
{
  return map_53(indices_292(xs),(i) => op_gt_638(i,0) ? op_sub_542(op_obr_cbr_2073(xs,i),op_obr_cbr_2073(xs,op_sub_754(i,1))) : op_obr_cbr_2073(xs,i));
}
// (Func (Array T0) Int Int (Array T0))
function slice_758(xs, from, to)
{
  return map_53(op_dot_dot_2038(from,to),(i) => at_1737(xs,i));
}
// (Func (Array T0) Int (Array T0))
function stride_805(xs, n)
{
  return map_53(op_dot_dot_2038(0,op_div_798(count_1711(xs),n)),(i) => op_obr_cbr_2073(xs,op_mul_776(i,n)));
}
// (Func (Array T0) Int Int (Array T0))
function stride_860(xs, from, n)
{
  return map_53(op_dot_dot_2038(0,op_div_798(count_1711(xs),n)),(i) => op_obr_cbr_2073(xs,op_add_732(from,op_mul_776(i,n))));
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_896(xs, n)
{
  return map_53(op_dot_dot_2038(0,n),(i) => stride_860(xs,i,n));
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_947(xs, n)
{
  return map_53(op_dot_dot_2038(0,n),(i) => slice_758(xs,op_mul_776(i,n),op_mul_776(op_add_732(i,1),n)));
}
// (Func (Array T0) Int (Array T0))
function take_967(xs, n)
{
  return slice_758(xs,0,n);
}
// (Func (Array T0) Int Int (Array T0))
function take_994(xs, i, n)
{
  return take_967(skip_1023(xs,i),n);
}
// (Func (Array T0) Int (Array T0))
function skip_1023(xs, n)
{
  return slice_758(xs,n,op_sub_754(count_1711(xs),n));
}
// (Func (Array T0) Int (Array T0))
function drop_1050(xs, n)
{
  return take_967(xs,op_sub_754(count_1711(xs),n));
}
// (Func (Array T0) Int (Array T0))
function last_1077(xs, n)
{
  return skip_1023(xs,op_sub_754(count_1711(xs),n));
}
// (Func (Array T0) T1 (Array T0))
function reverse_1121(xs, n)
{
  return map_53(indices_292(xs),(i) => op_obr_cbr_2073(xs,op_sub_754(op_sub_754(count_1711(xs),1),i)));
}
// (Func Int (Func Int T0) (Array T0))
function gen_1145(cnt, f)
{
  return map_53(op_dot_dot_2038(0,cnt),f);
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1213(xs, ys)
{
  return gen_1145(op_add_732(count_1711(xs),count_1711(ys)),(i) => op_lt_686(i,count_1711(xs)) ? op_obr_cbr_2073(xs,i) : op_obr_cbr_2073(ys,op_sub_754(i,count_1711(xs))));
}
// (Func (Array T0) Int Int (Array T0))
function cut_1275(xs, from, n)
{
  return gen_1145(op_sub_754(count_1711(xs),n),(i) => op_lt_686(i,from) ? op_obr_cbr_2073(xs,i) : op_obr_cbr_2073(xs,op_add_732(i,n)));
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1312(xs, from, ys)
{
  return concat_1213(concat_1213(take_967(xs,from),ys),skip_1023(xs,from));
}
// (Func (Array Int) Int)
function sum_1330(xs)
{
  return reduce_1900(xs,0,op_add_518);
}
// (Func (Array Int) Int)
function product_1348(xs)
{
  return reduce_1900(xs,1,op_mul_566);
}
// (Func (Array Int) Int)
function average_1370(xs)
{
  return op_div_798(sum_1330(xs),count_1711(xs));
}
// (Func (Array T0) T0)
function min_1392(xs)
{
  return reduce_1900(xs,op_obr_cbr_2073(xs,0),min_140);
}
// (Func (Array T0) T0)
function max_1414(xs)
{
  return reduce_1900(xs,op_obr_cbr_2073(xs,0),max_165);
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1480(xs, i, j)
{
  let tmp = op_obr_cbr_2073(xs,i);
  xs = set_1824(xs,i,op_obr_cbr_2073(xs,j));
  xs = set_1824(xs,j,tmp);
  return xs;
}
// (Func (Array T0) Int Int Int)
function partition_1595(a, lo, hi)
{
  let p = op_obr_cbr_2073(a,lo);
  let i = op_sub_754(lo,1);
  let j = op_add_732(hi,1);
  while (true)
  {
    do
    {
      i++;
    }
    while (op_lt_686(op_obr_cbr_2073(a,i),p))
    do
    {
      j--;
    }
    while (op_gt_638(op_obr_cbr_2073(a,j),p))
    if (op_gt_eq_662(i,j))
    {
      return j;
    }
    else
    { }
    swapElements_1480(a,i,j);
  }
}
// (Func (Array T0) Int Int (Array T0))
function qsort_1664(a, lo, hi)
{
  if (op_lt_686(lo,hi))
  {
    let p = partition_1595(a,lo,hi);
    qsort_1664(a,lo,p);
    qsort_1664(a,op_add_732(p,1),hi);
  }
  else
  { }
  return a;
}
// (Func (Array T0) (Array T0))
function sort_1694(xs)
{
  return immutable_1847(qsort_1664(mutable_1760(xs),0,op_sub_754(count_1711(xs),1)));
}
// (Func (Array Int) Int)
function median_1794(xs)
{
  let ys = sort_1694(xs);
  return op_eq_eq_1563(op_mod_820(op_sub_754(count_1711(ys),1),2),0) ? op_obr_cbr_2073(ys,op_div_798(op_sub_754(count_1711(ys),1),2)) : op_add_732(op_obr_cbr_2073(ys,op_div_798(op_sub_754(count_1711(ys),2),2)),op_div_798(op_obr_cbr_2073(ys,op_div_798(count_1711(ys),2)),2));
}
// (Func (Array T0) Int Bool)
function inRange_1825(xs, n)
{
  return op_amp_amp_1585(op_gt_eq_662(n,0),op_lt_686(n,count_1711(xs)));
}
// (Func (Array T0) T0)
function last_1848(xs)
{
  return op_obr_cbr_2073(xs,op_sub_754(count_1711(xs),1));
}
// (Func (Array T0) T0)
function first_1863(xs)
{
  return op_obr_cbr_2073(xs,0);
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1900(xs, acc, f)
{
  for (let i3=0; i3 < xs.count; ++i3)
  {
    const x = xs.at(i3);
    {
      acc = f(acc,x);
    }
  }
  return acc;
}
// (Func (Array (Array T0)) (Array T0))
function flatten_1917(xs)
{
  return reduce_1900(xs,arrayFromJavaScript([]),concat_1213);
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T1))
function flatMap_1939(xs, f)
{
  return flatten_1917(map_53(xs,f));
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function cartesianProduct_1982(xs, ys, f)
{
  return flatMap_1939(xs,(x) => map_53(ys,(y) => f(x,y)));
}
// Module heron:geometry.mesh:0.1
// file input\geometry-mesh.heron
// imports heron:std.array:0.1
// imports heron:geometry.vector:0.1
const tetrahedron = mesh_2133(arrayFromJavaScript([1,1,1,op_negate_1659(1),op_negate_1659(1),1,op_negate_1659(1),1,op_negate_1659(1),1,op_negate_1659(1),op_negate_1659(1)]),arrayFromJavaScript([2,1,0,0,3,2,1,3,0,2,3,1]));
const cube = mesh_2133(arrayFromJavaScript([op_negate_1659(1),op_negate_1659(1),1,1,op_negate_1659(1),1,1,1,1,op_negate_1659(1),1,1,op_negate_1659(1),op_negate_1659(1),op_negate_1659(1),1,op_negate_1659(1),op_negate_1659(1),1,1,op_negate_1659(1),op_negate_1659(1),1,op_negate_1659(1)]),arrayFromJavaScript([0,1,2,2,3,0,1,5,6,6,2,1,7,6,5,5,4,7,4,0,3,3,7,4,4,5,1,1,0,4,3,2,6,6,7,3]));
const octahedron = mesh_2133(arrayFromJavaScript([1,0,0,op_negate_1659(1),0,0,0,1,0,0,op_negate_1659(1),0,0,0,1,0,0,op_negate_1659(1)]),arrayFromJavaScript([0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2]));
const dodecahedron = ((t) => ((r) => mesh_2133(arrayFromJavaScript([op_negate_1659(1),op_negate_1659(1),op_negate_1659(1),op_negate_1659(1),op_negate_1659(1),1,op_negate_1659(1),1,op_negate_1659(1),op_negate_1659(1),1,1,1,op_negate_1659(1),op_negate_1659(1),1,op_negate_1659(1),1,1,1,op_negate_1659(1),1,1,1,0,op_negate_1659(r),op_negate_1659(t),0,op_negate_1659(r),t,0,r,op_negate_1659(t),0,r,t,op_negate_1659(r),op_negate_1659(t),0,op_negate_1659(r),t,0,r,op_negate_1659(t),0,r,t,0,op_negate_1659(t),0,op_negate_1659(r),t,0,op_negate_1659(r),op_negate_1659(t),0,r,t,0,r]),arrayFromJavaScript([3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9])))(_UNRESOLVED_(1,t))
)(_UNRESOLVED_(_UNRESOLVED_(1,sqrt_479(5)),2))
;
const icosahedron = ((t) => mesh_2133(arrayFromJavaScript([op_negate_1659(1),t,0,1,t,0,op_negate_1659(1),op_negate_1659(t),0,1,op_negate_1659(t),0,0,op_negate_1659(1),t,0,1,t,0,op_negate_1659(1),op_negate_1659(t),0,1,op_negate_1659(t),t,0,op_negate_1659(1),t,0,1,op_negate_1659(t),0,op_negate_1659(1),op_negate_1659(t),0,1]),arrayFromJavaScript([0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1])))(_UNRESOLVED_(_UNRESOLVED_(1,sqrt_479(5)),2))
;
// (Func (Array T0) Int Bool Bool (Array Int))
function quadStripToMeshIndices_966(vertices, rows, connectRows, connectCols)
{
  let cols = op_div_798(count_1711(vertices),rows);
  let nr = connectRows ? rows : op_sub_754(rows,1);
  let nc = connectCols ? cols : op_sub_754(cols,1);
  let indices = mutable_1760(arrayFromJavaScript([]));
  for (let i4=0; i4 < op_dot_dot_2038(0,nr).count; ++i4)
  {
    const row = op_dot_dot_2038(0,nr).at(i4);
    {
      for (let i5=0; i5 < op_dot_dot_2038(0,nc).count; ++i5)
      {
        const col = op_dot_dot_2038(0,nc).at(i5);
        {
          let a = op_add_732(col,op_mul_776(row,cols));
          let b = op_add_732(op_mod_820(op_add_732(col,1),cols),op_mul_776(row,cols));
          let c = op_add_732(op_mod_820(op_add_732(col,1),cols),op_mul_776(op_mod_820(op_add_732(row,1),rows),cols));
          let d = op_add_732(col,op_mul_776(op_mod_820(op_add_732(row,1),rows),cols));
          indices = pushMany_1959(indices,arrayFromJavaScript([a,b,d]));
          indices = pushMany_1959(indices,arrayFromJavaScript([b,c,d]));
        }
      }
    }
  }
  return immutable_1847(indices);
}
// (Func (Array Float3) (Array Float))
function toVertexBuffer_1001(xs)
{
  return flatMap_1939(xs,(v) => arrayFromJavaScript([x_134(v),y_149(v),z_164(v)]));
}
// (Func Float2 Float3)
function vector_1066(uv)
{
  return float3_119(op_mul_886(op_negate_1659(cos_353(x_134(uv))),sin_449(y_149(uv))),cos_353(x_134(uv)),op_mul_886(sin_449(x_134(uv)),sin_449(y_149(uv))));
}
// (Func T0 T0 T0 T0)
function rescale_1094(v, from, length)
{
  return op_add_518(from,op_mul_566(v,length));
}
// (Func (Func Float Float Float3) Int Int Float Float Float Float Mesh)
function meshFromUV_1221(f, uCount, vCount, uStart, vStart, uLength, vLength)
{
  let points = cartesianProduct_1982(op_dot_dot_2038(0,uCount),op_dot_dot_2038(0,vCount),(u, v) => f(op_add_842(op_mul_886(op_div_908(u,float_41(uCount)),uLength),uStart),op_add_842(op_mul_886(op_div_908(v,float_41(vCount)),vLength),vStart)));
  let indices = quadStripToMeshIndices_966(points,vCount,true,true);
  return mesh_2133(toVertexBuffer_1001(points),indices);
}
// (Func (Func Float Float Float3) Int Mesh)
function meshFromUV_1247(f, segments)
{
  return meshFromUV_1221(f,segments,segments,0,0,1,1);
}
// (Func Int Int Float3)
function spherePoint_1347(u, v)
{
  return vector_98(op_mul_886(op_negate_1659(cos_353(op_mul_566(op_mul_776(u,2),pi))),sin_449(op_mul_566(op_mul_776(v,2),pi))),cos_353(op_mul_566(op_mul_776(v,2),pi)),op_mul_886(sin_449(op_mul_566(op_mul_776(u,2),pi)),sin_449(op_mul_566(op_mul_776(v,2),pi))));
}
// (Func Int Mesh)
function sphere_1364(segments)
{
  return meshFromUV_1247(spherePoint_1347,segments);
}
// (Func Mesh)
function sphere_1375()
{
  return sphere_1364(32);
}
// (Func Int Float Float3)
function cylinderPoint_1423(u, v)
{
  return vector_98(sin_449(op_mul_566(op_mul_776(u,2),pi)),v,cos_353(op_mul_566(op_mul_776(u,2),pi)));
}
// (Func Int Mesh)
function cylinder_1440(segments)
{
  return meshFromUV_1247(cylinderPoint_1423,segments);
}
// (Func Mesh)
function cylinder_1451()
{
  return cylinder_1440(32);
}
// (Func Float Float Int Mesh)
function torus_1491(r1, r2, segments)
{
  return meshFromUV_1247((u, v) => torusPoint_1621(u,v,r1,r2),segments);
}
// (Func Int Int Float Float Float3)
function torusPoint_1621(u, v, r1, r2)
{
  return vector_98(op_mul_886(op_add_842(r1,op_mul_886(r2,cos_353(op_mul_566(op_mul_776(v,2),pi)))),cos_353(op_mul_566(op_mul_776(u,2),pi))),op_mul_886(op_add_842(r1,op_mul_886(r2,cos_353(op_mul_566(op_mul_776(v,2),pi)))),sin_449(op_mul_566(op_mul_776(u,2),pi))),op_mul_886(r2,sin_449(op_mul_566(op_mul_776(v,2),pi))));
}
// (Func Mesh)
function torus_1634()
{
  return torus_1491(10,2,32);
}
// (Func Mesh Int)
function vertexCount_1655(mesh)
{
  return op_div_798(count_1711(vertexBuffer_2151(mesh)),3);
}
// (Func Mesh Int)
function faceCount_1676(mesh)
{
  return op_div_798(count_1711(indexBuffer_2169(mesh)),3);
}
// (Func Mesh Int Float3)
function vertex_1706(mesh, i)
{
  return vector_151(take_994(vertexBuffer_2151(mesh),op_mul_776(i,3),3));
}
// (Func Mesh (Array Float3))
function vertices_1736(mesh)
{
  return array_1691(vertexCount_1655(mesh),(i) => vertex_1706(mesh,i));
}
// (Func Mesh (Array Float3) Mesh)
function setVertices_1762(m, points)
{
  return mesh_2133(toVertexBuffer_1001(points),indexBuffer_2169(m));
}
// (Func Mesh (Func Float3 Float3) Mesh)
function transform_1789(m, f)
{
  return setVertices_1762(m,map_53(vertices_1736(m),f));
}
// (Func Mesh Float3 Mesh)
function translate_1818(m, amount)
{
  return transform_1789(m,(v) => op_add_518(v,amount));
}
// (Func Mesh Float3 Mesh)
function scale_1847(m, amount)
{
  return transform_1789(m,(v) => op_mul_566(v,amount));
}
// Module heron:tests:0.1
// file input\test.heron
// imports heron:std.array:0.1
// imports heron:geometry.mesh:0.1
// imports heron:geometry.vector:0.1
// (Func (Array (Func Float Float Float Mesh)))
function main_39()
{
  simpleArrayTest_439();
  return geometryTest_490();
}
// (Func T0)
function simpleArrayTest_439()
{
  let xs = arrayFromJavaScript([1,11,3]);
  print_2094("'Expect [1, 11, 3]'");
  print_2094(xs);
  print_2094("'Expect 1, 11, 3'");
  for (let i6=0; i6 < xs.count; ++i6)
  {
    const x = xs.at(i6);
    {
      print_2094(x);
    }
  }
  print_2094("'Expect 1'");
  print_2094(op_obr_cbr_2073(xs,0));
  print_2094("'Expect 3'");
  print_2094(count_1711(xs));
  print_2094("'Expect 1'");
  print_2094(first_1863(xs));
  print_2094("'Expect 3'");
  print_2094(last_1848(xs));
  print_2094("'Expect 1'");
  print_2094(min_1392(xs));
  print_2094("'Expect 11'");
  print_2094(max_1414(xs));
  let ys = mutable_1760(xs);
  ys = set_1824(ys,1,5);
  print_2094("'Expect 5'");
  print_2094(op_obr_cbr_2073(ys,1));
  print_2094("'Expect 1, 3, 11'");
  let zs = sort_1694(xs);
  for (let i7=0; i7 < zs.count; ++i7)
  {
    const z = zs.at(i7);
    {
      print_2094(z);
    }
  }
  print_2094("'Expect 3'");
  print_2094(median_1794(xs));
  print_2094("'Expect 15'");
  print_2094(sum_1330(xs));
  print_2094("'Expect 5'");
  print_2094(average_1370(xs));
}
// (Func Float Float Float Mesh)
function testSphere_481(offX, offY, offZ)
{
  let offset = vector_98(offX,offY,offZ);
  return translate_1818(sphere_1364(32),offset);
}
// (Func (Array (Func Float Float Float Mesh)))
function geometryTest_490()
{
  return arrayFromJavaScript([testSphere_481]);
}

return main_39;
})();
