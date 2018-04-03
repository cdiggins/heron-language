// Generated on Tue Apr 03 2018 00:47:35 GMT-0400 (Eastern Daylight Time)

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
