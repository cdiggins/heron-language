// Generated on Tue Apr 03 2018 00:47:35 GMT-0400 (Eastern Daylight Time)

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
