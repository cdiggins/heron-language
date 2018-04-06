// Generated using Heron on Thu Apr 05 2018 23:31:45 GMT-0400 (Eastern Daylight Time)


function ImmutableArray(count, at) {
    this.count = count;
    this.at = at;
}

function toImmutable(xs) {
    return new ImmutableArray(xs);
}
  
function toMutable(xs) {
    const count = xs.count;
    const array = []; 
    for (let i=0; i < count; ++i)
      array.push(xs.at(i));
    return arrayFromJavaScript(array);
}

function arrayFromJavaScript(xs) {
  return {
    array: xs,
    count: xs.length,
    at: (i) => xs[i],
  }
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
const gen = toImmutable;
const count = function (xs) { return xs.count; };
const at = function (xs, i) { return xs.at(i); };
const mutable = toMutable;
const push = function (xs, x) { return (xs.array.push(x), xs); };
const set = function (xs, i, x) { return (xs.array[i] = x, xs); };
const array = function (xs) { return xs; };
const print = console.log;
const assert = function (condition) { if (!condition)
        throw new Error("assertion failed"); };// Module heron:intrinsics:0.1
// file input\intrinsics.heron
// (Func Float Float Float2)
const float2_45 = float2;
// (Func Float2 Float)
const x_60 = x;
// (Func Float2 Float)
const y_75 = y;
// (Func Float Float Float Float3)
const float3_102 = float3;
// (Func Float3 Float)
const z_117 = z;
// (Func Float Float Float Float Float4)
const float4_150 = float4;
// (Func Float4 Float)
const w_165 = w;
// (Func Float Float)
const abs_180 = abs;
// (Func Float Float)
const acos_195 = acos;
// (Func Float Float)
const asin_210 = asin;
// (Func Float Float)
const atan_225 = atan;
// (Func Float Float Float)
const atan2_246 = atan2;
// (Func Float Float)
const ceil_261 = ceil;
// (Func Float Float Float Float)
const clamp_288 = clamp;
// (Func Float Float)
const cos_303 = cos;
// (Func Float Float)
const exp_318 = exp;
// (Func Float Float)
const floor_333 = floor;
// (Func Float Float)
const log_348 = log;
// (Func Float Float Float)
const pow_369 = pow;
// (Func Float Float)
const round_384 = round;
// (Func Float Float)
const sin_399 = sin;
// (Func Float Float)
const sign_414 = sign;
// (Func Float Float)
const sqrt_429 = sqrt;
// (Func Float Float)
const tan_444 = tan;
// (Func T0 T0 T0)
const op_add_468 = op_add;
// (Func T0 T0 T0)
const op_sub_492 = op_sub;
// (Func T0 T0 T0)
const op_mul_516 = op_mul;
// (Func T0 T0 T0)
const op_div_540 = op_div;
// (Func T0 T0 T0)
const op_mod_564 = op_mod;
// (Func T0 T0 Bool)
const op_gt_588 = op_gt;
// (Func T0 T0 Bool)
const op_gt_eq_612 = op_gt_eq;
// (Func T0 T0 Bool)
const op_lt_636 = op_lt;
// (Func T0 T0 Bool)
const op_lt_eq_660 = op_lt_eq;
// (Func T0 T0 Bool)
const op_not_eq_684 = op_not_eq;
// (Func T0 T0 Bool)
const op_eq_eq_708 = op_eq_eq;
// (Func Bool Bool Bool)
const op_amp_amp_730 = op_amp_amp;
// (Func Bool Bool Bool)
const op_bar_bar_752 = op_bar_bar;
// (Func Bool Bool Bool)
const op_hat_hat_774 = op_hat_hat;
// (Func Bool Bool)
const op_not_789 = op_not;
// (Func Float Float)
const op_negate_804 = op_negate;
// (Func Int (Func Int T0) (Array T0))
const array_836 = array;
// (Func (Array T0) Int)
const count_856 = count;
// (Func (Array T0) Int T0)
const at_882 = at;
// (Func (Array T0) (ArrayBuilder T0))
const mutable_905 = mutable;
// (Func (ArrayBuilder T0) T0 (ArrayBuilder T0))
const push_934 = push;
// (Func (ArrayBuilder T0) Int T0 (ArrayBuilder T0))
const set_969 = set;
// (Func (ArrayBuilder T0) (Array T0))
const array_992 = array;
// (Func Float2 (Array Float))
function array_1015(v)
{
  return arrayFromJavaScript([x_60(v),y_75(v)]);
}
// (Func Float3 (Array Float))
function array_1043(v)
{
  return arrayFromJavaScript([x_60(v),y_75(v),z_117(v)]);
}
// (Func Float4 (Array Float))
function array_1076(v)
{
  return arrayFromJavaScript([x_60(v),y_75(v),z_117(v),w_165(v)]);
}
// (Func (Array Float) Float2)
function float2_1101(xs)
{
  return float2_45(op_obr_cbr_1252(xs,0),op_obr_cbr_1252(xs,1));
}
// (Func (Array Float) Float3)
function float3_1132(xs)
{
  return float3_102(op_obr_cbr_1252(xs,0),op_obr_cbr_1252(xs,1),op_obr_cbr_1252(xs,2));
}
// (Func (Array Float) Float4)
function float4_1169(xs)
{
  return float4_150(op_obr_cbr_1252(xs,0),op_obr_cbr_1252(xs,1),op_obr_cbr_1252(xs,2),op_obr_cbr_1252(xs,3));
}
// (Func Int Int (Array Int))
function op_dot_dot_1217(from, upto)
{
  return array_836(op_sub_492(upto,from),(i) => op_add_468(i,upto));
}
// (Func (Array T0) Int T0)
function op_obr_cbr_1252(xs, i)
{
  return at_882(xs,i);
}
// (Func T0 T1)
const print_1273 = print;
// (Func Bool T0)
const assert_1285 = assert;
// Module heron:geometry.vector:0.1
// file input\geometry-vector3.heron
// (Func Float Float Float Float3)
function vector_98(x, y, z)
{
  return float3_102(x,y,z);
}
// (Func Float Float3)
function vector_120(x)
{
  return vector_98(x,x,x);
}
// (Func Float3 Float3)
function vector_148(v)
{
  return vector_98(x_60(v),y_75(v),z_117(v));
}
// (Func (Array Float) Float3)
function vector_179(xs)
{
  return vector_98(op_obr_cbr_1252(xs,0),op_obr_cbr_1252(xs,1),op_obr_cbr_1252(xs,2));
}
// (Func Float3 (Array Float))
function array_204(v)
{
  return arrayFromJavaScript([x_60(v),y_75(v),z_117(v)]);
}
// (Func Float3 Float)
function sum_234(v)
{
  return op_add_468(op_add_468(x_60(v),y_75(v)),z_117(v));
}
// (Func Float3 Float3 Float)
function dot_257(a, b)
{
  return sum_234(op_mul_516(a,b));
}
// (Func Float3 Float)
function length_275(v)
{
  return sqrt_429(length2_291(v));
}
// (Func Float3 Float)
function length2_291(v)
{
  return dot_257(v,v);
}
// (Func Float3 Float3 Float)
function distance_314(a, b)
{
  return length_275(op_sub_492(a,b));
}
// (Func Float3 Float3 Float)
function distance2_337(a, b)
{
  return length2_291(op_sub_492(a,b));
}
// (Func Float3 Float)
function normal_356(v)
{
  return op_div_540(v,length_275(v));
}
// (Func Float3 Float3 Float3)
function cross_459(a, b)
{
  return vector_98(op_sub_492(op_mul_516(y_75(a),z_117(b)),op_mul_516(z_117(a),y_75(b))),op_sub_492(op_mul_516(z_117(a),x_60(b)),op_mul_516(x_60(a),z_117(b))),op_sub_492(op_mul_516(x_60(a),y_75(b)),op_mul_516(y_75(a),x_60(b))));
}
// (Func Float3 Float3 Float)
function reflect_494(v, n)
{
  return op_sub_492(v,op_mul_516(op_mul_516(n,dot_257(v,n)),2));
}
// (Func Float Float Float Float)
function lerp_531(a, b, x)
{
  return op_add_468(op_mul_516(a,op_sub_492(1,x)),op_mul_516(b,x));
}
// (Func Float3 Float3)
function negate_568(v)
{
  return vector_98(op_negate_804(x_60(v)),op_negate_804(y_75(v)),op_negate_804(z_117(v)));
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
  return array_836(count_856(xs),(i) => f(op_obr_cbr_1252(xs,i)));
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_836(count_856(xs),(i) => f(op_obr_cbr_1252(xs,i),i));
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_836(count_856(xs),f);
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_660(x,y) ? x : y;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_612(x,y) ? x : y;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_660(count_856(xs),count_856(ys)) ? xs : ys;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_612(count_856(xs),count_856(ys)) ? xs : ys;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_708(count_856(xs),0);
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53(indices,(i) => at_882(xs,i));
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_1217(0,count_856(xs));
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T2))
function zip_372(xs, ys, f)
{
  return op_lt_eq_660(count_856(xs),count_856(ys)) ? mapWithIndex_92(xs,(x, i) => f(x,op_obr_cbr_1252(ys,i))) : mapWithIndex_92(ys,(y, i) => f(op_obr_cbr_1252(xs,i),y));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1823(xs,true,(prev, x) => op_amp_amp_730(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1823(xs,false,(prev, x) => op_bar_bar_752(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Int)
function count_485(xs, p)
{
  return reduce_1823(xs,0,(prev, x) => p(x) ? op_add_468(prev,1) : prev);
}
// (Func (Array T0) (Array T1) Bool)
function eq_510(xs, ys)
{
  return op_eq_eq_708(count_856(xs),count_856(ys));
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_578(xs, p)
{
  let ys = mutable_905(xs);
  let i = 0;
  for (let i0=0; i0 < xs.count; ++i0)
  {
    const x = xs.at(i0);
    {
      if (p(x))
      {
        ys = set_969(ys,i++,x);
      }
      else
      { }
    }
  }
  return take_917(array_992(ys),i);
}
// (Func T0 Int (Array T0))
function repeat_607(x, n)
{
  return map_53(op_dot_dot_1217(0,n),(i) => x);
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
  let ys = mutable_905(repeat_607(op_obr_cbr_1252(xs,0),count_856(xs)));
  for (let i1=0; i1 < op_dot_dot_1217(1,count_856(ys)).count; ++i1)
  {
    const i = op_dot_dot_1217(1,count_856(ys)).at(i1);
    {
      ys = set_969(ys,i,op(op_obr_cbr_1252(xs,i),op_obr_cbr_1252(ys,op_sub_492(i,1))));
    }
  }
  return array_992(ys);
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_761(xs)
{
  return map_53(indices_292(xs),(i) => op_gt_588(i,0) ? op_sub_492(op_obr_cbr_1252(xs,i),op_obr_cbr_1252(xs,op_sub_492(i,1))) : op_obr_cbr_1252(xs,i));
}
// (Func (Array T0) Int Int (Array T0))
function slice_799(xs, from, to)
{
  return map_53(op_dot_dot_1217(from,to),(i) => at_882(xs,i));
}
// (Func (Array T0) Int (Array T0))
function stride_846(xs, n)
{
  return map_53(op_dot_dot_1217(0,op_div_540(count_856(xs),n)),(i) => op_obr_cbr_1252(xs,op_mul_516(i,n)));
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_897(xs, n)
{
  return map_53(op_dot_dot_1217(0,n),(i) => slice_799(xs,op_mul_516(i,n),op_mul_516(op_add_468(i,1),n)));
}
// (Func (Array T0) Int (Array T0))
function take_917(xs, n)
{
  return slice_799(xs,0,n);
}
// (Func (Array T0) Int (Array T1))
function skip_946(xs, n)
{
  return slice_799(xs,n,op_sub_492(count_856(xs),n));
}
// (Func (Array T0) Int (Array T1))
function dropSuffix_973(xs, n)
{
  return take_917(xs,op_sub_492(count_856(xs),n));
}
// (Func (Array T0) Int (Array T1))
function suffix_1000(xs, n)
{
  return skip_946(xs,op_sub_492(count_856(xs),n));
}
// (Func (Array T0) T1 (Array T0))
function reverse_1044(xs, n)
{
  return map_53(indices_292(xs),(i) => op_obr_cbr_1252(xs,op_sub_492(op_sub_492(count_856(xs),1),i)));
}
// (Func Int (Func Int T0) (Array T0))
function gen_1068(cnt, f)
{
  return map_53(op_dot_dot_1217(0,cnt),f);
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1136(xs, ys)
{
  return gen_1068(op_add_468(count_856(xs),count_856(ys)),(i) => op_lt_636(i,count_856(xs)) ? op_obr_cbr_1252(xs,i) : op_obr_cbr_1252(ys,op_sub_492(i,count_856(xs))));
}
// (Func (Array T0) Int Int (Array T0))
function cut_1198(xs, from, n)
{
  return gen_1068(op_sub_492(count_856(xs),n),(i) => op_lt_636(i,from) ? op_obr_cbr_1252(xs,i) : op_obr_cbr_1252(xs,op_add_468(i,n)));
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1235(xs, from, ys)
{
  return concat_1136(concat_1136(take_917(xs,from),ys),skip_946(xs,from));
}
// (Func (Array Int) Int)
function sum_1253(xs)
{
  return reduce_1823(xs,0,op_add_468);
}
// (Func (Array Int) Int)
function product_1271(xs)
{
  return reduce_1823(xs,1,op_mul_516);
}
// (Func (Array Int) Int)
function average_1293(xs)
{
  return op_div_540(sum_1253(xs),count_856(xs));
}
// (Func (Array T0) T0)
function min_1315(xs)
{
  return reduce_1823(xs,op_obr_cbr_1252(xs,0),min_140);
}
// (Func (Array T0) T0)
function max_1337(xs)
{
  return reduce_1823(xs,op_obr_cbr_1252(xs,0),max_165);
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1403(xs, i, j)
{
  let tmp = op_obr_cbr_1252(xs,i);
  xs = set_969(xs,i,op_obr_cbr_1252(xs,j));
  xs = set_969(xs,j,tmp);
  return xs;
}
// (Func (ArrayBuilder T0) Int Int Int)
function partition_1518(a, lo, hi)
{
  let p = op_obr_cbr_1252(a,lo);
  let i = op_sub_492(lo,1);
  let j = op_add_468(hi,1);
  while (true)
  {
    do
    {
      i++;
    }
    while (op_lt_636(op_obr_cbr_1252(a,i),p))
    do
    {
      j--;
    }
    while (op_gt_588(op_obr_cbr_1252(a,j),p))
    if (op_gt_eq_612(i,j))
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
  if (op_lt_636(lo,hi))
  {
    let p = partition_1518(a,lo,hi);
    qsort_1587(a,lo,p);
    qsort_1587(a,op_add_468(p,1),hi);
  }
  else
  { }
  return a;
}
// (Func (Array T0) (Array T0))
function sort_1617(xs)
{
  return array_992(qsort_1587(mutable_905(xs),0,op_sub_492(count_856(xs),1)));
}
// (Func (Array Int) Int)
function median_1717(xs)
{
  let ys = sort_1617(xs);
  return op_eq_eq_708(op_mod_564(op_sub_492(count_856(ys),1),2),0) ? op_obr_cbr_1252(ys,op_div_540(op_sub_492(count_856(ys),1),2)) : op_add_468(op_obr_cbr_1252(ys,op_div_540(op_sub_492(count_856(ys),2),2)),op_div_540(op_obr_cbr_1252(ys,op_div_540(count_856(ys),2)),2));
}
// (Func (Array T0) Int Bool)
function inRange_1748(xs, n)
{
  return op_amp_amp_730(op_gt_eq_612(n,0),op_lt_636(n,count_856(xs)));
}
// (Func (Array T0) T1)
function last_1771(xs)
{
  return op_obr_cbr_1252(xs,op_sub_492(count_856(xs),1));
}
// (Func (Array T0) T0)
function first_1786(xs)
{
  return op_obr_cbr_1252(xs,0);
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1823(xs, acc, f)
{
  for (let i2=0; i2 < xs.count; ++i2)
  {
    const x = xs.at(i2);
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
// Module heron:tests:0.1
// file input\test.heron
// imports heron:std.array:0.1
// (Func T0)
function main_22()
{
  simpleTest_422();
}
// (Func T0)
function simpleTest_422()
{
  let xs = arrayFromJavaScript([1,11,3]);
  print_1273("'Expect [1, 11, 3]'");
  print_1273(xs);
  print_1273("'Expect 1, 11, 3'");
  for (let i3=0; i3 < xs.count; ++i3)
  {
    const x = xs.at(i3);
    {
      print_1273(x);
    }
  }
  print_1273("'Expect 1'");
  print_1273(op_obr_cbr_1252(xs,0));
  print_1273("'Expect 3'");
  print_1273(count_856(xs));
  print_1273("'Expect 1'");
  print_1273(first_1786(xs));
  print_1273("'Expect 3'");
  print_1273(last_1771(xs));
  print_1273("'Expect 1'");
  print_1273(min_1315(xs));
  print_1273("'Expect 11'");
  print_1273(max_1337(xs));
  let ys = mutable_905(xs);
  ys = set_969(ys,1,5);
  print_1273("'Expect 5'");
  print_1273(op_obr_cbr_1252(ys,1));
  print_1273("'Expect 1, 3, 11'");
  let zs = sort_1617(xs);
  for (let i4=0; i4 < zs.count; ++i4)
  {
    const z = zs.at(i4);
    {
      print_1273(z);
    }
  }
  print_1273("'Expect 3'");
  print_1273(median_1717(xs));
  print_1273("'Expect 15'");
  print_1273(sum_1253(xs));
  print_1273("'Expect 5'");
  print_1273(average_1293(xs));
}

main_22();
process.exit();
