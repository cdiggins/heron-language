# Heron v2 Specification (Beta)

This is a specification for version 2 of Heron. 

## Heron Primitive Types

The following are the built-in types for Heron

- float
- float2
- float3
- float4
- int 
- int2
- int3
- int4
- bool
- bool2
- bool3
- bool4
- float2x2
- float3x3
- float4x4

## Operators

() + - ! * / % < > <= >= == != && ||

## Comments

// 
/* */

## Control Flow Statements

if 
else
for
return 
break
continue
while

## Differences from the GLSL ES used in WebGL

* Type names are different 
* Functions don't have to be pre-declared. 
* Functions and variables can have the same namess. 
* Loops may be "non-constant" 
* There is no-preprocessor
* Functions with no arguments do not use "void"
* rgba and stpq are not supported on vectors 
* 1.0f is valid
