// Generated on Tue Apr 03 2018 00:47:35 GMT-0400 (Eastern Daylight Time)

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
{
var ys = mutable_905(xs);
var i = 0;
return take_917(array_992(ys),i);
}
}
// (Func T0 Int (Array T0))
function repeat_607(x, n)
{
return map_53(op_dot_dot_1217(0,n),(i) => x);
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_703(xs, op)
{
{
if (
empty_245(xs))
{
return xs;
}
else
{
}
var ys = mutable_905(repeat_607(op_obr_cbr_1252(xs,0),count_856(xs)));
return array_992(ys);
}
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
{
var pivot = op_obr_cbr_1252(a,lo);
var i = op_sub_492(lo,1);
var j = op_add_468(hi,1);
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
if (
op_gt_eq_612(i,j))
{
return a;
}
else
{
}
var tmp = op_obr_cbr_1252(a,i);
a = set_969(a,i,op_obr_cbr_1252(a,j));
a = set_969(a,j,tmp);
}
return a;
}
}
// (Func (ArrayBuilder Int) Int Int (ArrayBuilder Int))
function qsort_1583(a, lo, hi)
{
{
if (
op_lt_636(lo,hi))
{
var p = op_obr_cbr_1252(a,lo);
a = partition_1491(a,lo,hi);
a = qsort_1583(a,lo,p);
a = qsort_1583(a,op_add_468(p,1),hi);
}
else
{
}
return a;
}
}
// (Func (Array Int) (Array Int))
function sort_1613(xs)
{
return array_992(qsort_1583(mutable_905(xs),0,op_sub_492(count_856(xs),1)));
}
// (Func (Array Int) Int)
function median_1706(xs)
{
{
var ys = sort_1613(xs);
return op_eq_eq_708(op_mod_564(count_856(ys),2),0) ? op_obr_cbr_1252(ys,op_div_540(count_856(ys),2)) : op_add_468(op_obr_cbr_1252(ys,op_sub_492(op_div_540(count_856(ys),2),1)),op_div_540(op_obr_cbr_1252(ys,op_add_468(op_div_540(count_856(ys),2),1)),2));
}
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
{
return acc;
}
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
