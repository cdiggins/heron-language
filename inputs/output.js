// Generated using Heron on Tue Apr 03 2018 01:19:06 GMT-0400 (Eastern Daylight Time)
// Module heron:intrinsics:0.1
// file inputs\intrinsics.heron
// (Func Float Float Float2)
function float2_45(x, y)
{
  // INTRINSIC
}
// (Func Float2 Float)
function x_60(v)
{
  // INTRINSIC
}
// (Func Float2 Float)
function y_75(v)
{
  // INTRINSIC
}
// (Func Float Float Float Float3)
function float3_102(x, y, z)
{
  // INTRINSIC
}
// (Func Float3 Float)
function z_117(v)
{
  // INTRINSIC
}
// (Func Float Float Float Float Float4)
function float4_150(x, y, z, w)
{
  // INTRINSIC
}
// (Func Float4 Float)
function w_165(v)
{
  // INTRINSIC
}
// (Func Float Float)
function abs_180(x)
{
  // INTRINSIC
}
// (Func Float Float)
function acos_195(x)
{
  // INTRINSIC
}
// (Func Float Float)
function asin_210(x)
{
  // INTRINSIC
}
// (Func Float Float)
function atan_225(x)
{
  // INTRINSIC
}
// (Func Float Float Float)
function atan2_246(y, x)
{
  // INTRINSIC
}
// (Func Float Float)
function ceil_261(x)
{
  // INTRINSIC
}
// (Func Float Float Float Float)
function clamp_288(x, min, max)
{
  // INTRINSIC
}
// (Func Float Float)
function cos_303(x)
{
  // INTRINSIC
}
// (Func Float Float)
function exp_318(x)
{
  // INTRINSIC
}
// (Func Float Float)
function floor_333(x)
{
  // INTRINSIC
}
// (Func Float Float)
function log_348(x)
{
  // INTRINSIC
}
// (Func Float Float Float)
function pow_369(x, y)
{
  // INTRINSIC
}
// (Func Float Float)
function round_384(x)
{
  // INTRINSIC
}
// (Func Float Float)
function sin_399(x)
{
  // INTRINSIC
}
// (Func Float Float)
function sign_414(x)
{
  // INTRINSIC
}
// (Func Float Float)
function sqrt_429(x)
{
  // INTRINSIC
}
// (Func Float Float)
function tan_444(x)
{
  // INTRINSIC
}
// (Func T0 T0 T0)
function op_add_468(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 T0)
function op_sub_492(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 T0)
function op_mul_516(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 T0)
function op_div_540(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 T0)
function op_mod_564(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 Bool)
function op_gt_588(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 Bool)
function op_gt_eq_612(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 Bool)
function op_lt_636(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 Bool)
function op_lt_eq_660(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 Bool)
function op_not_eq_684(x, y)
{
  // INTRINSIC
}
// (Func T0 T0 Bool)
function op_eq_eq_708(x, y)
{
  // INTRINSIC
}
// (Func Bool Bool Bool)
function op_amp_amp_730(x, y)
{
  // INTRINSIC
}
// (Func Bool Bool Bool)
function op_bar_bar_752(x, y)
{
  // INTRINSIC
}
// (Func Bool Bool Bool)
function op_hat_hat_774(x, y)
{
  // INTRINSIC
}
// (Func Bool Bool)
function op_not_789(x)
{
  // INTRINSIC
}
// (Func Float Float)
function op_negate_804(x)
{
  // INTRINSIC
}
// (Func Int (Func Int T0) (Array T0))
function array_836(n, f)
{
  // INTRINSIC
}
// (Func (Array T0) Int)
function count_856(xs)
{
  // INTRINSIC
}
// (Func (Array T0) Int T0)
function at_882(xs, i)
{
  // INTRINSIC
}
// (Func (Array T0) (ArrayBuilder T0))
function mutable_905(xs)
{
  // INTRINSIC
}
// (Func (ArrayBuilder T0) T0 (ArrayBuilder T0))
function push_934(xs, x)
{
  // INTRINSIC
}
// (Func (ArrayBuilder T0) Int T0 (ArrayBuilder T0))
function set_969(xs, i, x)
{
  // INTRINSIC
}
// (Func (ArrayBuilder T0) (Array T0))
function array_992(xs)
{
  // INTRINSIC
}
// (Func Float2 (Array Float))
function array_1015(v)
{
  return [x_60(v),y_75(v)];
}
// (Func Float3 (Array Float))
function array_1043(v)
{
  return [x_60(v),y_75(v),z_117(v)];
}
// (Func Float4 (Array Float))
function array_1076(v)
{
  return [x_60(v),y_75(v),z_117(v),w_165(v)];
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
function print_1273(x)
{
  // INTRINSIC
}
// (Func Bool T0)
function assert_1285(x)
{
  // INTRINSIC
}
// Module heron:geometry.vector:0.1
// file inputs\geometry-vector3.heron
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
// (Func Float2 Float3)
function vector_148(v)
{
  return vector_98(x_60(v),y_75(v),z_117(v));
}
// (Func (Array Float) Float3)
function vector_179(xs)
{
  return vector_98(op_obr_cbr_1252(xs,0),op_obr_cbr_1252(xs,1),op_obr_cbr_1252(xs,2));
}
// (Func Float2 (Array Float))
function array_204(v)
{
  return [x_60(v),y_75(v),z_117(v)];
}
// (Func Float2 Float)
function sum_234(v)
{
  return op_add_468(op_add_468(x_60(v),y_75(v)),z_117(v));
}
// (Func Float2 Float2 Float)
function dot_257(a, b)
{
  return sum_234(op_mul_516(a,b));
}
// (Func Float2 Float)
function length_275(v)
{
  return sqrt_429(length2_291(v));
}
// (Func Float2 Float)
function length2_291(v)
{
  return dot_257(v,v);
}
// (Func Float2 Float2 Float)
function distance_314(a, b)
{
  return length_275(op_sub_492(a,b));
}
// (Func Float2 Float2 Float)
function distance2_337(a, b)
{
  return length2_291(op_sub_492(a,b));
}
// (Func Float2 Float)
function normal_356(v)
{
  return op_div_540(v,length_275(v));
}
// (Func Float2 Float3 Float3)
function cross_459(a, b)
{
  return vector_98(op_sub_492(op_mul_516(y_75(a),z_117(b)),op_mul_516(z_117(a),y_75(b))),op_sub_492(op_mul_516(z_117(a),x_60(b)),op_mul_516(x_60(a),z_117(b))),op_sub_492(op_mul_516(x_60(a),y_75(b)),op_mul_516(y_75(a),x_60(b))));
}
// (Func Float2 Float2 Float)
function reflect_494(v, n)
{
  return op_sub_492(v,op_mul_516(op_mul_516(n,dot_257(v,n)),2));
}
// (Func Float Float Float Float)
function lerp_531(a, b, x)
{
  return op_add_468(op_mul_516(a,op_sub_492(1,x)),op_mul_516(b,x));
}
// (Func Float2 Float3)
function negate_568(v)
{
  return vector_98(op_negate_804(x_60(v)),op_negate_804(y_75(v)),op_negate_804(z_117(v)));
}
// Module heron:std.array:0.1
// file inputs\array.heron
// (Func T0 (Array T0))
function unit_16(x)
{
  return [x];
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
  return op_lt_eq_660(x,y) ? x : y;
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
  return reduce_1812(xs,true,(prev, x) => op_amp_amp_730(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1812(xs,false,(prev, x) => op_bar_bar_752(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Int)
function count_485(xs, p)
{
  return reduce_1812(xs,0,(prev, x) => p(x) ? op_add_468(prev,1) : prev);
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
  for (const x of xs)
  {
    if (p(x))
    {
      ys = set_969(ys,i++,x);
    }
    else
    { }
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
  for (const i of op_dot_dot_1217(1,count_856(ys)))
  {
    ys = set_969(ys,i,op(op_obr_cbr_1252(xs,i),op_obr_cbr_1252(ys,op_sub_492(i,1))));
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
  return reduce_1812(xs,0,op_add);
}
// (Func (Array Int) Int)
function product_1271(xs)
{
  return reduce_1812(xs,1,op_mul);
}
// (Func (Array Int) Int)
function average_1293(xs)
{
  return op_div_540(sum_1253(xs),count_856(xs));
}
// (Func (Array T0) T0)
function min_1315(xs)
{
  return reduce_1812(xs,op_obr_cbr_1252(xs,0),min);
}
// (Func (Array T0) T0)
function max_1337(xs)
{
  return reduce_1812(xs,op_obr_cbr_1252(xs,0),max);
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function partition_1491(a, lo, hi)
{
  let pivot = op_obr_cbr_1252(a,lo);
  let i = op_sub_492(lo,1);
  let j = op_add_468(hi,1);
  while (true)
  {
    do
    {
      i++;
    }
    while (op_lt_636(op_obr_cbr_1252(a,i),pivot))
    do
    {
      j--;
    }
    while (op_gt_588(op_obr_cbr_1252(a,j),pivot))
    if (op_gt_eq_612(i,j))
    {
      return a;
    }
    else
    { }
    let tmp = op_obr_cbr_1252(a,i);
    a = set_969(a,i,op_obr_cbr_1252(a,j));
    a = set_969(a,j,tmp);
  }
  return a;
}
// (Func (ArrayBuilder Int) Int Int (ArrayBuilder Int))
function qsort_1583(a, lo, hi)
{
  if (op_lt_636(lo,hi))
  {
    let p = op_obr_cbr_1252(a,lo);
    a = partition_1491(a,lo,hi);
    a = qsort_1583(a,lo,p);
    a = qsort_1583(a,op_add_468(p,1),hi);
  }
  else
  { }
  return a;
}
// (Func (Array Int) (Array Int))
function sort_1613(xs)
{
  return array_992(qsort_1583(mutable_905(xs),0,op_sub_492(count_856(xs),1)));
}
// (Func (Array Int) Int)
function median_1706(xs)
{
  let ys = sort_1613(xs);
  return op_eq_eq_708(op_mod_564(count_856(ys),2),0) ? op_obr_cbr_1252(ys,op_div_540(count_856(ys),2)) : op_add_468(op_obr_cbr_1252(ys,op_sub_492(op_div_540(count_856(ys),2),1)),op_div_540(op_obr_cbr_1252(ys,op_add_468(op_div_540(count_856(ys),2),1)),2));
}
// (Func (Array T0) Int Bool)
function inRange_1737(xs, n)
{
  return op_amp_amp_730(op_gt_eq_612(n,0),op_lt_636(n,count_856(xs)));
}
// (Func (Array T0) T1)
function last_1760(xs)
{
  return op_obr_cbr_1252(xs,op_sub_492(count_856(xs),1));
}
// (Func (Array T0) T0)
function first_1775(xs)
{
  return op_obr_cbr_1252(xs,0);
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1812(xs, acc, f)
{
  for (const x of xs)
  {
    acc = f(acc,x);
  }
  return acc;
}
// (Func (Array (Array T0)) (Array T1))
function flatten_1829(xs)
{
  return reduce_1812(xs,[],concat);
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T2))
function flatMap_1851(xs, f)
{
  return flatten_1829(map_53(xs,f));
}
// Module heron:tests:0.1
// file inputs\test.heron
// imports heron:std.array:0.1
// (Func T0)
function main_22()
{
  simpleTest_330();
}
// (Func T0)
function simpleTest_330()
{
  let xs = [1,11,3];
  print_1273("'Expect [1, 11, 3]'");
  print_1273(xs);
  print_1273("'Expect 1, 11, 3'");
  for (const x of xs)
  {
    print_1273(x);
  }
  print_1273("'Expect 1'");
  print_1273(op_obr_cbr_1252(xs,0));
  print_1273("'Expect 3'");
  print_1273(count_856(xs));
  print_1273("'Expect 1'");
  print_1273(first_1775(xs));
  print_1273("'Expect 3'");
  print_1273(last_1760(xs));
  print_1273("'Expect 1'");
  print_1273(min_1315(xs));
  print_1273("'Expect 11'");
  print_1273(max_1337(xs));
  print_1273("'Expect 3'");
  print_1273(median_1706(xs));
  print_1273("'Expect 15'");
  print_1273(sum_1253(xs));
  print_1273("'Expect 5'");
  print_1273(average_1293(xs));
}
