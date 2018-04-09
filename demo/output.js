// Generated using Heron on Mon Apr 09 2018 08:05:28 GMT-0400 (Eastern Daylight Time)
var heronMain = (function () {

function newImmutableArray(count, at) {
    return {
      count, at
    }
}
  
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

function toImmutable(xs) {
    xs.count = xs.array.length;
    return xs;
}

const int = Math.round;
const float = function (x) { return x; };
const float2 = function (x, y) { return ({ x: x, y: y }); };
const float3 = function (x, y, z) { return ({ x: x, y: y, z: z }); };
const float4 = function (x, y, z, w) { return ({ x: x, y: y, z: z, w: w }); };
const x = function (v) { return v.x; };
const y = function (v) { return v.y; };
const z = function (v) { return v.z; };
const w = function (v) { return v.w; };
const abs = Math.abs;
const acos = Math.acos;
const asin = Math.asin;
const atan = Math.atan;
const atan2 = Math.atan2;
const ceil = Math.ceil;
const clamp = function (x, min, max) { return x < min ? min : x > max ? max : x; };
const cos = Math.cos;
const exp = Math.exp;
const floor = Math.floor;
const log = Math.log;
const pow = Math.pow;
const round = Math.round;
const sin = Math.sin;
const sign = function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
const sqrt = Math.sqrt;
const tan = Math.tan;
const op_add = function (x, y) { return x + y; };
const op_sub = function (x, y) { return x - y; };
const op_mul = function (x, y) { return x * y; };
const op_div = function (x, y) { return x / y; };
const op_mod = function (x, y) { return x % y; };
const op_gt = function (x, y) { return x > y; };
const op_gt_eq = function (x, y) { return x >= y; };
const op_lt = function (x, y) { return x < y; };
const op_lt_eq = function (x, y) { return x <= y; };
const op_not_eq = function (x, y) { return x !== y; };
const op_eq_eq = function (x, y) { return x === y; };
const op_amp_amp = function (x, y) { return x && y; };
const op_bar_bar = function (x, y) { return x || y; };
const op_hat_hat = function (x, y) { return !!(x ^ y); };
const op_not = function (x) { return !x; };
const op_negate = function (x) { return -x; };
const count = function (xs) { return xs.count; };
const at = function (xs, i) { return xs.at(i); };
const array = newImmutableArray;
const mutable = toMutable;
const immutable = toImmutable;
const push = function (xs, x) { return (xs.array.push(x), xs); };
const set = function (xs, i, x) { return (xs.array[i] = x, xs); };
const print = console.log;
const assert = function (condition) { if (!condition)
        throw new Error("assertion failed"); };
const mesh = function (vertexBuffer, indexBuffer) { return ({ vertexBuffer: vertexBuffer, indexBuffer: indexBuffer }); };
const vertexBuffer = function (mesh) { return mesh.vertexBuffer; };
const indexBuffer = function (mesh) { return mesh.indexBuffer; };
// Module heron:intrinsics:0.1
// file input\intrinsics.heron
const pi = 3.141592653589793;
const e = 2.718281828459045;
// (Func Int Float)
const float_41 = float;
// (Func Float Float Float2)
const float2_62 = float2;
// (Func Float2 Float)
const x_77 = x;
// (Func Float2 Float)
const y_92 = y;
// (Func Float Float Float Float3)
const float3_119 = float3;
// (Func Float3 Float)
const z_134 = z;
// (Func Float Float Float Float Float4)
const float4_167 = float4;
// (Func Float4 Float)
const w_182 = w;
// (Func Float Float)
const abs_197 = abs;
// (Func Float Float)
const acos_212 = acos;
// (Func Float Float)
const asin_227 = asin;
// (Func Float Float)
const atan_242 = atan;
// (Func Float Float Float)
const atan2_263 = atan2;
// (Func Float Float)
const ceil_278 = ceil;
// (Func Float Float Float Float)
const clamp_305 = clamp;
// (Func Float Float)
const cos_320 = cos;
// (Func Float Float)
const exp_335 = exp;
// (Func Float Float)
const floor_350 = floor;
// (Func Float Float)
const log_365 = log;
// (Func Float Float Float)
const pow_386 = pow;
// (Func Float Float)
const round_401 = round;
// (Func Float Float)
const sin_416 = sin;
// (Func Float Float)
const sign_431 = sign;
// (Func Float Float)
const sqrt_446 = sqrt;
// (Func Float Float)
const tan_461 = tan;
// (Func T0 T0 T0)
const op_add_485 = op_add;
// (Func T0 T0 T0)
const op_sub_509 = op_sub;
// (Func T0 T0 T0)
const op_mul_533 = op_mul;
// (Func T0 T0 T0)
const op_div_557 = op_div;
// (Func T0 T0 T0)
const op_mod_581 = op_mod;
// (Func T0 T0 Bool)
const op_gt_605 = op_gt;
// (Func T0 T0 Bool)
const op_gt_eq_629 = op_gt_eq;
// (Func T0 T0 Bool)
const op_lt_653 = op_lt;
// (Func T0 T0 Bool)
const op_lt_eq_677 = op_lt_eq;
// (Func T0 T0 Bool)
const op_not_eq_701 = op_not_eq;
// (Func T0 T0 Bool)
const op_eq_eq_725 = op_eq_eq;
// (Func Bool Bool Bool)
const op_amp_amp_747 = op_amp_amp;
// (Func Bool Bool Bool)
const op_bar_bar_769 = op_bar_bar;
// (Func Bool Bool Bool)
const op_hat_hat_791 = op_hat_hat;
// (Func Bool Bool)
const op_not_806 = op_not;
// (Func Float Float)
const op_negate_821 = op_negate;
// (Func Int (Func Int T0) (Array T0))
const array_853 = array;
// (Func (Array T0) Int)
const count_873 = count;
// (Func (Array T0) Int T0)
const at_899 = at;
// (Func (Array T0) (ArrayBuilder T0))
const mutable_922 = mutable;
// (Func (ArrayBuilder T0) T0 (ArrayBuilder T0))
const push_951 = push;
// (Func (ArrayBuilder T0) Int T0 (ArrayBuilder T0))
const set_986 = set;
// (Func (ArrayBuilder T0) (Array T0))
const immutable_1009 = immutable;
// (Func Float2 (Array Float))
function array_1032(v)
{
  return arrayFromJavaScript([x_77(v),y_92(v)]);
}
// (Func Float3 (Array Float))
function array_1060(v)
{
  return arrayFromJavaScript([x_77(v),y_92(v),z_134(v)]);
}
// (Func Float4 (Array Float))
function array_1093(v)
{
  return arrayFromJavaScript([x_77(v),y_92(v),z_134(v),w_182(v)]);
}
// (Func (Array Float) Float2)
function float2_1118(xs)
{
  return float2_62(op_obr_cbr_1322(xs,0),op_obr_cbr_1322(xs,1));
}
// (Func (Array Float) Float3)
function float3_1149(xs)
{
  return float3_119(op_obr_cbr_1322(xs,0),op_obr_cbr_1322(xs,1),op_obr_cbr_1322(xs,2));
}
// (Func (Array Float) Float4)
function float4_1186(xs)
{
  return float4_167(op_obr_cbr_1322(xs,0),op_obr_cbr_1322(xs,1),op_obr_cbr_1322(xs,2),op_obr_cbr_1322(xs,3));
}
// (Func (ArrayBuilder T0) (Array T0) (ArrayBuilder T0))
function pushMany_1239(xs, ys)
{
  for (let i0=0; i0 < ys.count; ++i0)
  {
    const y = ys.at(i0);
    {
      xs = push_951(xs,y);
    }
  }
  return xs;
}
// (Func Int Int (Array Int))
function op_dot_dot_1287(from, upto)
{
  return array_853(op_sub_509(upto,from),(i) => op_add_485(i,from));
}
// (Func (Array T0) Int T0)
function op_obr_cbr_1322(xs, i)
{
  return at_899(xs,i);
}
// (Func T0 T1)
const print_1343 = print;
// (Func Bool T0)
const assert_1355 = assert;
// (Func (Array Float) (Array Int) Mesh)
const mesh_1382 = mesh;
// (Func Mesh (Array Float))
const vertexBuffer_1400 = vertexBuffer;
// (Func Mesh (Array Int))
const indexBuffer_1418 = indexBuffer;
// Module heron:geometry.vector:0.1
// file input\geometry-vector3.heron
const origin = vector_98(0,0,0);
const ones = vector_98(1,1,1);
const xaxis = vector_98(1,0,0);
const yaxis = vector_98(0,1,0);
const zaxis = vector_98(0,0,1);
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
// (Func Float3 Float3)
function vector_148(v)
{
  return vector_98(x_77(v),y_92(v),z_134(v));
}
// (Func (Array Float) Float3)
function vector_179(xs)
{
  return vector_98(op_obr_cbr_1322(xs,0),op_obr_cbr_1322(xs,1),op_obr_cbr_1322(xs,2));
}
// (Func Float3 (Array Float))
function array_204(v)
{
  return arrayFromJavaScript([x_77(v),y_92(v),z_134(v)]);
}
// (Func Float3 Float)
function sum_234(v)
{
  return op_add_485(op_add_485(x_77(v),y_92(v)),z_134(v));
}
// (Func Float3 Float3 Float)
function dot_257(a, b)
{
  return sum_234(op_mul_533(a,b));
}
// (Func Float3 Float)
function length_275(v)
{
  return sqrt_446(length2_291(v));
}
// (Func Float3 Float)
function length2_291(v)
{
  return dot_257(v,v);
}
// (Func Float3 Float3 Float)
function distance_314(a, b)
{
  return length_275(op_sub_509(a,b));
}
// (Func Float3 Float3 Float)
function distance2_337(a, b)
{
  return length2_291(op_sub_509(a,b));
}
// (Func Float3 Float)
function normal_356(v)
{
  return op_div_557(v,length_275(v));
}
// (Func Float3 Float3 Float3)
function cross_459(a, b)
{
  return vector_98(op_sub_509(op_mul_533(y_92(a),z_134(b)),op_mul_533(z_134(a),y_92(b))),op_sub_509(op_mul_533(z_134(a),x_77(b)),op_mul_533(x_77(a),z_134(b))),op_sub_509(op_mul_533(x_77(a),y_92(b)),op_mul_533(y_92(a),x_77(b))));
}
// (Func Float3 Float3 Float)
function reflect_494(v, n)
{
  return op_sub_509(v,op_mul_533(op_mul_533(n,dot_257(v,n)),2));
}
// (Func Float Float Float Float)
function lerp_531(a, b, x)
{
  return op_add_485(op_mul_533(a,op_sub_509(1,x)),op_mul_533(b,x));
}
// (Func Float3 Float3)
function negate_568(v)
{
  return vector_98(op_negate_821(x_77(v)),op_negate_821(y_92(v)),op_negate_821(z_134(v)));
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
  return array_853(count_873(xs),(i) => f(op_obr_cbr_1322(xs,i)));
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_853(count_873(xs),(i) => f(op_obr_cbr_1322(xs,i),i));
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_853(count_873(xs),f);
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_677(x,y) ? x : y;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_629(x,y) ? x : y;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_677(count_873(xs),count_873(ys)) ? xs : ys;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_629(count_873(xs),count_873(ys)) ? xs : ys;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_725(count_873(xs),0);
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53(indices,(i) => at_899(xs,i));
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_1287(0,count_873(xs));
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function zip_372(xs, ys, f)
{
  return op_lt_eq_677(count_873(xs),count_873(ys)) ? mapWithIndex_92(xs,(x, i) => f(x,op_obr_cbr_1322(ys,i))) : mapWithIndex_92(ys,(y, i) => f(op_obr_cbr_1322(xs,i),y));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1823(xs,true,(prev, x) => op_amp_amp_747(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1823(xs,false,(prev, x) => op_bar_bar_769(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Int)
function count_485(xs, p)
{
  return reduce_1823(xs,0,(prev, x) => p(x) ? op_add_485(prev,1) : prev);
}
// (Func (Array T0) (Array T1) Bool)
function eq_510(xs, ys)
{
  return op_eq_eq_725(count_873(xs),count_873(ys));
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_578(xs, p)
{
  let ys = mutable_922(xs);
  let i = 0;
  for (let i1=0; i1 < xs.count; ++i1)
  {
    const x = xs.at(i1);
    {
      if (p(x))
      {
        ys = set_986(ys,i++,x);
      }
      else
      { }
    }
  }
  return take_917(immutable_1009(ys),i);
}
// (Func T0 Int (Array T0))
function repeat_607(x, n)
{
  return map_53(op_dot_dot_1287(0,n),(i) => x);
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_703(xs, op)
{
  if (empty_245(xs))
  {
    return xs;
  }
  else
  { }
  let ys = mutable_922(repeat_607(op_obr_cbr_1322(xs,0),count_873(xs)));
  for (let i2=0; i2 < op_dot_dot_1287(1,count_873(ys)).count; ++i2)
  {
    const i = op_dot_dot_1287(1,count_873(ys)).at(i2);
    {
      ys = set_986(ys,i,op(op_obr_cbr_1322(xs,i),op_obr_cbr_1322(ys,op_sub_509(i,1))));
    }
  }
  return immutable_1009(ys);
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_761(xs)
{
  return map_53(indices_292(xs),(i) => op_gt_605(i,0) ? op_sub_509(op_obr_cbr_1322(xs,i),op_obr_cbr_1322(xs,op_sub_509(i,1))) : op_obr_cbr_1322(xs,i));
}
// (Func (Array T0) Int Int (Array T0))
function slice_799(xs, from, to)
{
  return map_53(op_dot_dot_1287(from,to),(i) => at_899(xs,i));
}
// (Func (Array T0) Int (Array T0))
function stride_846(xs, n)
{
  return map_53(op_dot_dot_1287(0,op_div_557(count_873(xs),n)),(i) => op_obr_cbr_1322(xs,op_mul_533(i,n)));
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_897(xs, n)
{
  return map_53(op_dot_dot_1287(0,n),(i) => slice_799(xs,op_mul_533(i,n),op_mul_533(op_add_485(i,1),n)));
}
// (Func (Array T0) Int (Array T0))
function take_917(xs, n)
{
  return slice_799(xs,0,n);
}
// (Func (Array T0) Int (Array T1))
function skip_946(xs, n)
{
  return slice_799(xs,n,op_sub_509(count_873(xs),n));
}
// (Func (Array T0) Int (Array T1))
function dropSuffix_973(xs, n)
{
  return take_917(xs,op_sub_509(count_873(xs),n));
}
// (Func (Array T0) Int (Array T1))
function suffix_1000(xs, n)
{
  return skip_946(xs,op_sub_509(count_873(xs),n));
}
// (Func (Array T0) T1 (Array T0))
function reverse_1044(xs, n)
{
  return map_53(indices_292(xs),(i) => op_obr_cbr_1322(xs,op_sub_509(op_sub_509(count_873(xs),1),i)));
}
// (Func Int (Func Int T0) (Array T0))
function gen_1068(cnt, f)
{
  return map_53(op_dot_dot_1287(0,cnt),f);
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1136(xs, ys)
{
  return gen_1068(op_add_485(count_873(xs),count_873(ys)),(i) => op_lt_653(i,count_873(xs)) ? op_obr_cbr_1322(xs,i) : op_obr_cbr_1322(ys,op_sub_509(i,count_873(xs))));
}
// (Func (Array T0) Int Int (Array T0))
function cut_1198(xs, from, n)
{
  return gen_1068(op_sub_509(count_873(xs),n),(i) => op_lt_653(i,from) ? op_obr_cbr_1322(xs,i) : op_obr_cbr_1322(xs,op_add_485(i,n)));
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1235(xs, from, ys)
{
  return concat_1136(concat_1136(take_917(xs,from),ys),skip_946(xs,from));
}
// (Func (Array Int) Int)
function sum_1253(xs)
{
  return reduce_1823(xs,0,op_add_485);
}
// (Func (Array Int) Int)
function product_1271(xs)
{
  return reduce_1823(xs,1,op_mul_533);
}
// (Func (Array Int) Int)
function average_1293(xs)
{
  return op_div_557(sum_1253(xs),count_873(xs));
}
// (Func (Array T0) T0)
function min_1315(xs)
{
  return reduce_1823(xs,op_obr_cbr_1322(xs,0),min_140);
}
// (Func (Array T0) T0)
function max_1337(xs)
{
  return reduce_1823(xs,op_obr_cbr_1322(xs,0),max_165);
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1403(xs, i, j)
{
  let tmp = op_obr_cbr_1322(xs,i);
  xs = set_986(xs,i,op_obr_cbr_1322(xs,j));
  xs = set_986(xs,j,tmp);
  return xs;
}
// (Func (ArrayBuilder T0) Int Int Int)
function partition_1518(a, lo, hi)
{
  let p = op_obr_cbr_1322(a,lo);
  let i = op_sub_509(lo,1);
  let j = op_add_485(hi,1);
  while (true)
  {
    do
    {
      i++;
    }
    while (op_lt_653(op_obr_cbr_1322(a,i),p))
    do
    {
      j--;
    }
    while (op_gt_605(op_obr_cbr_1322(a,j),p))
    if (op_gt_eq_629(i,j))
    {
      return j;
    }
    else
    { }
    swapElements_1403(a,i,j);
  }
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function qsort_1587(a, lo, hi)
{
  if (op_lt_653(lo,hi))
  {
    let p = partition_1518(a,lo,hi);
    qsort_1587(a,lo,p);
    qsort_1587(a,op_add_485(p,1),hi);
  }
  else
  { }
  return a;
}
// (Func (Array T0) (Array T0))
function sort_1617(xs)
{
  return immutable_1009(qsort_1587(mutable_922(xs),0,op_sub_509(count_873(xs),1)));
}
// (Func (Array Int) Int)
function median_1717(xs)
{
  let ys = sort_1617(xs);
  return op_eq_eq_725(op_mod_581(op_sub_509(count_873(ys),1),2),0) ? op_obr_cbr_1322(ys,op_div_557(op_sub_509(count_873(ys),1),2)) : op_add_485(op_obr_cbr_1322(ys,op_div_557(op_sub_509(count_873(ys),2),2)),op_div_557(op_obr_cbr_1322(ys,op_div_557(count_873(ys),2)),2));
}
// (Func (Array T0) Int Bool)
function inRange_1748(xs, n)
{
  return op_amp_amp_747(op_gt_eq_629(n,0),op_lt_653(n,count_873(xs)));
}
// (Func (Array T0) T1)
function last_1771(xs)
{
  return op_obr_cbr_1322(xs,op_sub_509(count_873(xs),1));
}
// (Func (Array T0) T0)
function first_1786(xs)
{
  return op_obr_cbr_1322(xs,0);
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1823(xs, acc, f)
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
// (Func (Array (Array T0)) (Array T1))
function flatten_1840(xs)
{
  return reduce_1823(xs,arrayFromJavaScript([]),concat_1136);
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T2))
function flatMap_1862(xs, f)
{
  return flatten_1840(map_53(xs,f));
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T3))
function cartesianProduct_1905(xs, ys, f)
{
  return flatMap_1862(xs,(x) => map_53(ys,(y) => f(x,y)));
}
// Module heron:geometry.mesh:0.1
// file input\geometry-mesh.heron
// imports heron:std.array:0.1
// imports heron:geometry.vector:0.1
// (Func Mesh)
function tetrahedron_70()
{
  return mesh_1382(arrayFromJavaScript([1,1,1,op_negate_821(1),op_negate_821(1),1,op_negate_821(1),1,op_negate_821(1),1,op_negate_821(1),op_negate_821(1)]),arrayFromJavaScript([2,1,0,0,3,2,1,3,0,2,3,1]));
}
// (Func Mesh)
function cube_178()
{
  return mesh_1382(arrayFromJavaScript([op_negate_821(1),op_negate_821(1),1,1,op_negate_821(1),1,1,1,1,op_negate_821(1),1,1,op_negate_821(1),op_negate_821(1),op_negate_821(1),1,op_negate_821(1),op_negate_821(1),1,1,op_negate_821(1),op_negate_821(1),1,op_negate_821(1)]),arrayFromJavaScript([0,1,2,2,3,0,1,5,6,6,2,1,7,6,5,5,4,7,4,0,3,3,7,4,4,5,1,1,0,4,3,2,6,6,7,3]));
}
// (Func Mesh)
function octahedron_241()
{
  return mesh_1382(arrayFromJavaScript([1,0,0,op_negate_821(1),0,0,0,1,0,0,op_negate_821(1),0,0,0,1,0,0,op_negate_821(1)]),arrayFromJavaScript([0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2]));
}
// (Func Mesh)
function dodecahedron_547()
{
  return ((t) => ((r) => mesh_1382(arrayFromJavaScript([op_negate_821(1),op_negate_821(1),op_negate_821(1),op_negate_821(1),op_negate_821(1),1,op_negate_821(1),1,op_negate_821(1),op_negate_821(1),1,1,1,op_negate_821(1),op_negate_821(1),1,op_negate_821(1),1,1,1,op_negate_821(1),1,1,1,0,op_negate_821(r),op_negate_821(t),0,op_negate_821(r),t,0,r,op_negate_821(t),0,r,t,op_negate_821(r),op_negate_821(t),0,op_negate_821(r),t,0,r,op_negate_821(t),0,r,t,0,op_negate_821(t),0,op_negate_821(r),t,0,op_negate_821(r),op_negate_821(t),0,r,t,0,r]),arrayFromJavaScript([3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9])))(op_div_557(1,t))
  )(op_div_557(op_add_485(1,sqrt_446(5)),2))
  ;
}
// (Func Mesh)
function icosahedron_722()
{
  return ((t) => mesh_1382(arrayFromJavaScript([op_negate_821(1),t,0,1,t,0,op_negate_821(1),op_negate_821(t),0,1,op_negate_821(t),0,0,op_negate_821(1),t,0,1,t,0,op_negate_821(1),op_negate_821(t),0,1,op_negate_821(t),t,0,op_negate_821(1),t,0,1,op_negate_821(t),0,op_negate_821(1),op_negate_821(t),0,1]),arrayFromJavaScript([0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1])))(op_div_557(op_add_485(1,sqrt_446(5)),2))
  ;
}
// (Func (Array T0) Int Bool Bool (Array Int))
function quadStripToMeshIndices_971(vertices, rows, connectRows, connectCols)
{
  let cols = op_div_557(count_873(vertices),rows);
  let nr = connectRows ? rows : op_sub_509(rows,1);
  let nc = connectCols ? cols : op_sub_509(cols,1);
  let indices = mutable_922(arrayFromJavaScript([]));
  for (let i4=0; i4 < op_dot_dot_1287(0,nr).count; ++i4)
  {
    const row = op_dot_dot_1287(0,nr).at(i4);
    {
      for (let i5=0; i5 < op_dot_dot_1287(0,nc).count; ++i5)
      {
        const col = op_dot_dot_1287(0,nc).at(i5);
        {
          let a = op_add_485(col,op_mul_533(row,cols));
          let b = op_add_485(op_mod_581(op_add_485(col,1),cols),op_mul_533(row,cols));
          let c = op_add_485(op_mod_581(op_add_485(col,1),cols),op_mul_533(op_mod_581(op_add_485(row,1),rows),cols));
          let d = op_add_485(col,op_mul_533(op_mod_581(op_add_485(row,1),rows),cols));
          indices = pushMany_1239(indices,arrayFromJavaScript([a,b,d]));
          indices = pushMany_1239(indices,arrayFromJavaScript([b,c,d]));
        }
      }
    }
  }
  return immutable_1009(indices);
}
// (Func (Array Float3) (Array T0))
function vectorsToVertexBuffer_1006(xs)
{
  return flatMap_1862(xs,(v) => arrayFromJavaScript([x_77(v),y_92(v),z_134(v)]));
}
// (Func Float2 Float3)
function vector_1071(uv)
{
  return float3_119(op_mul_533(op_negate_821(cos_320(x_77(uv))),sin_416(y_92(uv))),cos_320(x_77(uv)),op_mul_533(sin_416(x_77(uv)),sin_416(y_92(uv))));
}
// (Func T0 T0 T0 T0)
function rescale_1099(v, from, length)
{
  return op_add_485(from,op_mul_533(v,length));
}
// (Func (Func Float Float T0) Int Int Float Float Float Float Mesh)
function meshFromUV_1227(f, uCount, vCount, uStart, vStart, uLength, vLength)
{
  let points = cartesianProduct_1905(op_dot_dot_1287(0,vCount),op_dot_dot_1287(0,vCount),(u, v) => f(op_add_485(op_mul_533(op_div_557(u,float_41(uCount)),uLength),uStart),op_add_485(op_mul_533(op_div_557(v,float_41(vCount)),vLength),vStart)));
  let indices = quadStripToMeshIndices_971(points,vCount,true,true);
  return mesh_1382(vectorsToVertexBuffer_1006(points),indices);
}
// (Func (Func Float Float T0) Int Mesh)
function meshFromUV_1253(f, segments)
{
  return meshFromUV_1227(f,segments,segments,0,0,1,1);
}
// (Func Int Int Float3)
function spherePoint_1353(u, v)
{
  return vector_98(op_mul_533(op_negate_821(cos_320(op_mul_533(op_mul_533(u,2),pi))),sin_416(op_mul_533(op_mul_533(v,2),pi))),cos_320(op_mul_533(op_mul_533(v,2),pi)),op_mul_533(sin_416(op_mul_533(op_mul_533(u,2),pi)),sin_416(op_mul_533(op_mul_533(v,2),pi))));
}
// (Func Int Mesh)
function sphere_1370(segments)
{
  return meshFromUV_1253(spherePoint_1353,segments);
}
// (Func Mesh)
function sphere_1381()
{
  return sphere_1370(32);
}
// (Func Int Float Float3)
function cylinderPoint_1429(u, v)
{
  return vector_98(sin_416(op_mul_533(op_mul_533(u,2),pi)),v,cos_320(op_mul_533(op_mul_533(u,2),pi)));
}
// (Func Int Mesh)
function cylinder_1446(segments)
{
  return meshFromUV_1253(cylinderPoint_1429,segments);
}
// (Func Mesh)
function cylinder_1457()
{
  return cylinder_1446(32);
}
// (Func Float Float Int Mesh)
function torus_1497(r1, r2, segments)
{
  return meshFromUV_1253((u, v) => torusPoint_1627(u,v,r1,r2),segments);
}
// (Func Int Int Float Float Float3)
function torusPoint_1627(u, v, r1, r2)
{
  return vector_98(op_mul_533(op_add_485(r1,op_mul_533(r2,cos_320(op_mul_533(op_mul_533(v,2),pi)))),cos_320(op_mul_533(op_mul_533(u,2),pi))),op_mul_533(op_add_485(r1,op_mul_533(r2,cos_320(op_mul_533(op_mul_533(v,2),pi)))),sin_416(op_mul_533(op_mul_533(u,2),pi))),op_mul_533(r2,sin_416(op_mul_533(op_mul_533(v,2),pi))));
}
// (Func Mesh)
function torus_1640()
{
  return torus_1497(10,2,32);
}
// Module heron:tests:0.1
// file input\test.heron
// imports heron:std.array:0.1
// imports heron:geometry.mesh:0.1
// (Func (Array Mesh))
function main_33()
{
  simpleArrayTest_433();
  return geometryTest_472();
}
// (Func T0)
function simpleArrayTest_433()
{
  let xs = arrayFromJavaScript([1,11,3]);
  print_1343("'Expect [1, 11, 3]'");
  print_1343(xs);
  print_1343("'Expect 1, 11, 3'");
  for (let i6=0; i6 < xs.count; ++i6)
  {
    const x = xs.at(i6);
    {
      print_1343(x);
    }
  }
  print_1343("'Expect 1'");
  print_1343(op_obr_cbr_1322(xs,0));
  print_1343("'Expect 3'");
  print_1343(count_873(xs));
  print_1343("'Expect 1'");
  print_1343(first_1786(xs));
  print_1343("'Expect 3'");
  print_1343(last_1771(xs));
  print_1343("'Expect 1'");
  print_1343(min_1315(xs));
  print_1343("'Expect 11'");
  print_1343(max_1337(xs));
  let ys = mutable_922(xs);
  ys = set_986(ys,1,5);
  print_1343("'Expect 5'");
  print_1343(op_obr_cbr_1322(ys,1));
  print_1343("'Expect 1, 3, 11'");
  let zs = sort_1617(xs);
  for (let i7=0; i7 < zs.count; ++i7)
  {
    const z = zs.at(i7);
    {
      print_1343(z);
    }
  }
  print_1343("'Expect 3'");
  print_1343(median_1717(xs));
  print_1343("'Expect 15'");
  print_1343(sum_1253(xs));
  print_1343("'Expect 5'");
  print_1343(average_1293(xs));
}
// (Func (Array Mesh))
function geometryTest_472()
{
  return arrayFromJavaScript([tetrahedron_70(),cube_178(),octahedron_241(),dodecahedron_547(),icosahedron_722(),sphere_1381(),cylinder_1457(),torus_1640()]);
}

return main_33;
})();
