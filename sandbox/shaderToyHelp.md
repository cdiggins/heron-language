Umbra Specification 

//==

List of Supported Types 

float
float2
float3
float4
int 
int2
int3
int4
bool
bool2
bool3
bool4
float2x2
float3x3
float4x4

//==

Operators: () + - ! * / % < > <= >= == != && ||

//==

Comments: // /* */

//==

Control flow statements

if 
else
for
return 
break
continue
while

//== 

Differences from the GLSL ES used in WebGL

* Type names are different 
* Functions don't have to be pre-declared. 
* Functions and variables can have the same namess. 
* Loops may be "non-constant" 
* There is no-preprocessor
* Functions with no arguments do not use "void"
* rgba and stpq are not supported on vectors 
* 1.0f is valid

//==

GPU functions versus CPU functions

When code is executed 

//== 

Program structure.

* module 
* function
* 

//==

Version 1 Limitations: 

Loops in GPU code can only run for 1024 iterations. 

//==

struct

//==



Language:

Types: void bool int float vec2 vec3 vec4 bvec2 bvec3 bvec4 ivec2 ivec3 ivec4 mat2 mat3 mat4 sampler2D
Function Parameter Qualifiers: [none], in, out, inout
Global Variable Qualifiers: const

Output: vec4 fragColor
Input: vec2 fragCoord

Built-in Functions:

type radians (type degrees)
type degrees (type radians)
type sin (type angle)
type cos (type angle)
type tan (type angle)
type asin (type x)
type acos (type x)
type atan (type y, type x)
type atan (type y_over_x)
type pow (type x, type y)
type exp (type x)
type log (type x)
type exp2 (type x)
type log2 (type x)
type sqrt (type x)
type inversesqrt (type x)
type abs (type x)
type sign (type x)
type floor (type x)
type ceil (type x)
type fract (type x)
type mod (type x, float y)
type mod (type x, type y)
type min (type x, type y)
type min (type x, float y)
type max (type x, type y)
type max (type x, float y)
type clamp (type x, type minV, type maxV)
type clamp (type x, float minV, float maxV)
type mix (type x, type y, type a)
type mix (type x, type y, float a)
type step (type edge, type x)
type step (float edge, type x)
type smoothstep (type a, type b, type x)
type smoothstep (float a, float b, type x)
mat matrixCompMult (mat x, mat y)
float length (type x)
float distance (type p0, type p1)
float dot (type x, type y)
vec3 cross (vec3 x, vec3 y)
type normalize (type x)
type faceforward (type N, type I, type Nref)
type reflect (type I, type N)
type refract (type I, type N,float eta)
bvec lessThan(vec x, vec y)
bvec lessThan(ivec x, ivec y)
bvec lessThanEqual(vec x, vec y)
bvec lessThanEqual(ivec x, ivec y)
bvec greaterThan(vec x, vec y)
bvec greaterThan(ivec x, ivec y)
bvec greaterThanEqual(vec x, vec y)
bvec greaterThanEqual(ivec x, ivec y)
bvec equal(vec x, vec y)
bvec equal(ivec x, ivec y)
bvec equal(bvec x, bvec y)
bvec notEqual(vec x, vec y)
bvec notEqual(ivec x, ivec y)
bvec notEqual(bvec x, bvec y)
bool any(bvec x)
bool all(bvec x)
bvec not(bvec x)

//==

vec4 texture2D(sampler2D sampler, vec2 coord )
vec4 texture2D(sampler2D sampler, vec2 coord, float bias)
vec4 textureCube(samplerCube sampler, vec3 coord)
vec4 texture2DProj(sampler2D sampler, vec3 coord )
vec4 texture2DProj(sampler2D sampler, vec3 coord, float bias)
vec4 texture2DProj(sampler2D sampler, vec4 coord)
vec4 texture2DProj(sampler2D sampler, vec4 coord, float bias)
vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod)
vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod)
vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy)

vec4 textureCubeGradEXT(samplerCube sampler, vec3 P, vec3 dPdx, vec3 dPdy)
type dFdx( type x ), dFdy( type x )
type fwidth( type p )

How-to

Use structs: struct myDataType { float occlusion; vec3 color; }; myDataType myData = myDataType(0.7, vec3(1.0, 2.0, 3.0));
Initialize arrays: arrays cannot be initialized in WebGL.
Do conversions: int a = 3; float b = float(a);
Do component swizzling: vec4 a = vec4(1.0,2.0,3.0,4.0); vec4 b = a.zyyw;
Access matrix components: mat4 m; m[1] = vec4(2.0); m[0][0] = 1.0; m[2][3] = 2.0;

Be careful!

the f suffix for floating pont numbers: 1.0f is illegal in GLSL. You must use 1.0
saturate(): saturate(x) doesn't exist in GLSL. Use clamp(x,0.0,1.0) instead
pow/sqrt: please don't feed sqrt() and pow() with negative numbers. Add an abs() or max(0.0,) to the argument
mod: please don't do mod(x,0.0). This is undefined in some platforms
variables: initialize your variables! Don't assume they'll be set to zero by default
functions: don't call your functions the same as some of your variables

Shadertoy Inputs

vec3	iResolution	image	The viewport resolution (z is pixel aspect ratio, usually 1.0)
float	iGlobalTime	image/sound	Current time in seconds
float	iTimeDelta	image	Time it takes to render a frame, in seconds
int	iFrame	image	Current frame
float	iFrameRate	image	Number of frames rendered per second
float	iChannelTime[4]	image	Time for channel (if video or sound), in seconds
vec3	iChannelResolution[4]	image/sound	Input texture resolution for each channel
vec4	iMouse	image	xy = current pixel coords (if LMB is down). zw = click pixel
sampler2D	iChannel{i}	image/sound	Sampler for input textures i
vec4	iDate	image/sound	Year, month, day, time in seconds in .xyzw
float	iSampleRate	image/sound	The sound sample rate (typically 44100)

Shadertoy Outputs

For image shaders, fragColor is used as output channel. It is not, for now, mandatory but recommended to leave the alpha channel to 1.0.

For sound shaders, the mainSound() function returns a vec2 containing the left and right (stereo) sound channel wave data. 

//==

Specification: 

1f /2f =>


//==

vec4 texture2D(sampler2D sampler, vec2 coord )
vec4 texture2D(sampler2D sampler, vec2 coord, float bias)
vec4 textureCube(samplerCube sampler, vec3 coord)
vec4 texture2DProj(sampler2D sampler, vec3 coord )
vec4 texture2DProj(sampler2D sampler, vec3 coord, float bias)
vec4 texture2DProj(sampler2D sampler, vec4 coord)
vec4 texture2DProj(sampler2D sampler, vec4 coord, float bias)
vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod)
vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod)
vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy)

//==

vec4 array2d.sample(vec2 coord )
vec4 array2d.sample(vec2 coord, float bias)
vec4 array3d.sample( vec3 coord)
vec4 array2d.sample(vec2 coord )
vec4 array2d.sample(vec2 coord, float bias)
vec4 samplerCube.sample( coord)

//

texture2D (sampler2D) // 2D readonly array
texture3D (sampler3D) // 3D readonly array

//==

sample
sampleBias
sampleLevelOfDetail
project
projectGradient

//==

vec4 texture2DProj(sampler2D sampler, vec3 coord )
vec4 texture2DProj(sampler2D sampler, vec3 coord, float bias)
vec4 texture2DProj(sampler2D sampler, vec4 coord)
vec4 texture2DProj(sampler2D sampler, vec4 coord, float bias)
vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod)
vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod)
vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy)

//==

Umbra Specification 

//==

List of Supported Types 

float
float2
float3
float4
int 
int2
int3
int4
bool
bool2
bool3
bool4
float2x2
float3x3
float4x4

//==

Operators: () + - ! * / % < > <= >= == != && ||

//==

Comments: // /* */

//==

Control flow statements

if 
else
for
return 
break
continue
while

//== 

Differences from the GLSL ES used in WebGL

* Type names are different 
* Functions don't have to be pre-declared. 
* Functions and variables can have the same namess. 
* Loops may be "non-constant" 
* There is no-preprocessor
* Functions with no arguments do not use "void"
* rgba and stpq are not supported on vectors 
* 1.0f is valid

//==

GPU functions versus CPU functions

When code is executed 

//== 

Program structure.

* module 
* function
* 

//==

Version 1 Limitations: 

Loops in GPU code can only run for 1024 iterations. 

//==

struct

//==



Language:

Types: void bool int float vec2 vec3 vec4 bvec2 bvec3 bvec4 ivec2 ivec3 ivec4 mat2 mat3 mat4 sampler2D
Function Parameter Qualifiers: [none], in, out, inout
Global Variable Qualifiers: const

Output: vec4 fragColor
Input: vec2 fragCoord

Built-in Functions:

type radians (type degrees)
type degrees (type radians)
type sin (type angle)
type cos (type angle)
type tan (type angle)
type asin (type x)
type acos (type x)
type atan (type y, type x)
type atan (type y_over_x)
type pow (type x, type y)
type exp (type x)
type log (type x)
type exp2 (type x)
type log2 (type x)
type sqrt (type x)
type inversesqrt (type x)
type abs (type x)
type sign (type x)
type floor (type x)
type ceil (type x)
type fract (type x)
type mod (type x, float y)
type mod (type x, type y)
type min (type x, type y)
type min (type x, float y)
type max (type x, type y)
type max (type x, float y)
type clamp (type x, type minV, type maxV)
type clamp (type x, float minV, float maxV)
type mix (type x, type y, type a)
type mix (type x, type y, float a)
type step (type edge, type x)
type step (float edge, type x)
type smoothstep (type a, type b, type x)
type smoothstep (float a, float b, type x)
mat matrixCompMult (mat x, mat y)
float length (type x)
float distance (type p0, type p1)
float dot (type x, type y)
vec3 cross (vec3 x, vec3 y)
type normalize (type x)
type faceforward (type N, type I, type Nref)
type reflect (type I, type N)
type refract (type I, type N,float eta)
bvec lessThan(vec x, vec y)
bvec lessThan(ivec x, ivec y)
bvec lessThanEqual(vec x, vec y)
bvec lessThanEqual(ivec x, ivec y)
bvec greaterThan(vec x, vec y)
bvec greaterThan(ivec x, ivec y)
bvec greaterThanEqual(vec x, vec y)
bvec greaterThanEqual(ivec x, ivec y)
bvec equal(vec x, vec y)
bvec equal(ivec x, ivec y)
bvec equal(bvec x, bvec y)
bvec notEqual(vec x, vec y)
bvec notEqual(ivec x, ivec y)
bvec notEqual(bvec x, bvec y)
bool any(bvec x)
bool all(bvec x)
bvec not(bvec x)

//==

vec4 texture2D(sampler2D sampler, vec2 coord )
vec4 texture2D(sampler2D sampler, vec2 coord, float bias)
vec4 textureCube(samplerCube sampler, vec3 coord)
vec4 texture2DProj(sampler2D sampler, vec3 coord )
vec4 texture2DProj(sampler2D sampler, vec3 coord, float bias)
vec4 texture2DProj(sampler2D sampler, vec4 coord)
vec4 texture2DProj(sampler2D sampler, vec4 coord, float bias)
vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod)
vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod)
vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy)

vec4 textureCubeGradEXT(samplerCube sampler, vec3 P, vec3 dPdx, vec3 dPdy)
type dFdx( type x ), dFdy( type x )
type fwidth( type p )

How-to

Use structs: struct myDataType { float occlusion; vec3 color; }; myDataType myData = myDataType(0.7, vec3(1.0, 2.0, 3.0));
Initialize arrays: arrays cannot be initialized in WebGL.
Do conversions: int a = 3; float b = float(a);
Do component swizzling: vec4 a = vec4(1.0,2.0,3.0,4.0); vec4 b = a.zyyw;
Access matrix components: mat4 m; m[1] = vec4(2.0); m[0][0] = 1.0; m[2][3] = 2.0;

Be careful!

the f suffix for floating pont numbers: 1.0f is illegal in GLSL. You must use 1.0
saturate(): saturate(x) doesn't exist in GLSL. Use clamp(x,0.0,1.0) instead
pow/sqrt: please don't feed sqrt() and pow() with negative numbers. Add an abs() or max(0.0,) to the argument
mod: please don't do mod(x,0.0). This is undefined in some platforms
variables: initialize your variables! Don't assume they'll be set to zero by default
functions: don't call your functions the same as some of your variables

Shadertoy Inputs

vec3	iResolution	image	The viewport resolution (z is pixel aspect ratio, usually 1.0)
float	iGlobalTime	image/sound	Current time in seconds
float	iTimeDelta	image	Time it takes to render a frame, in seconds
int	iFrame	image	Current frame
float	iFrameRate	image	Number of frames rendered per second
float	iChannelTime[4]	image	Time for channel (if video or sound), in seconds
vec3	iChannelResolution[4]	image/sound	Input texture resolution for each channel
vec4	iMouse	image	xy = current pixel coords (if LMB is down). zw = click pixel
sampler2D	iChannel{i}	image/sound	Sampler for input textures i
vec4	iDate	image/sound	Year, month, day, time in seconds in .xyzw
float	iSampleRate	image/sound	The sound sample rate (typically 44100)

Shadertoy Outputs

For image shaders, fragColor is used as output channel. It is not, for now, mandatory but recommended to leave the alpha channel to 1.0.

For sound shaders, the mainSound() function returns a vec2 containing the left and right (stereo) sound channel wave data. 

//==

Specification: 

1f /2f =>


//==

vec4 texture2D(sampler2D sampler, vec2 coord )
vec4 texture2D(sampler2D sampler, vec2 coord, float bias)
vec4 textureCube(samplerCube sampler, vec3 coord)
vec4 texture2DProj(sampler2D sampler, vec3 coord )
vec4 texture2DProj(sampler2D sampler, vec3 coord, float bias)
vec4 texture2DProj(sampler2D sampler, vec4 coord)
vec4 texture2DProj(sampler2D sampler, vec4 coord, float bias)
vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod)
vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod)
vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy)

//==

vec4 array2d.sample(vec2 coord )
vec4 array2d.sample(vec2 coord, float bias)
vec4 array3d.sample( vec3 coord)
vec4 array2d.sample(vec2 coord )
vec4 array2d.sample(vec2 coord, float bias)
vec4 samplerCube.sample( coord)

//

texture2D (sampler2D) // 2D readonly array
texture3D (sampler3D) // 3D readonly array

//==

sample
sampleBias
sampleLevelOfDetail
project
projectGradient

//==

vec4 texture2DProj(sampler2D sampler, vec3 coord )
vec4 texture2DProj(sampler2D sampler, vec3 coord, float bias)
vec4 texture2DProj(sampler2D sampler, vec4 coord)
vec4 texture2DProj(sampler2D sampler, vec4 coord, float bias)
vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod)
vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod)
vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod)
vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy)
vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy)

//==


