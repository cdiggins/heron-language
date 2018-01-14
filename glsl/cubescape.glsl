// https://www.shadertoy.com/view/Msl3Rr

// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

//---------------------------------

//#define ANTIALIAS

float hash( float n ) { return fract(sin(n)*13.5453123); }

float maxcomp( in vec3 v ) { return max( max( v.x, v.y ), v.z ); }

float dbox( vec3 p, vec3 b, float r )
{
    return length(max(abs(p)-b,0.0))-r;
}

vec4 texcube( sampler2D sam, in vec3 p, in vec3 n )
{
	vec4 x = texture( sam, p.yz );
	vec4 y = texture( sam, p.zx );
	vec4 z = texture( sam, p.yx );
    vec3 a = abs(n);
	return (x*a.x + y*a.y + z*a.z) / (a.x + a.y + a.z);
}

//---------------------------------

float freqs[4];

vec3 mapH( in vec2 pos )
{
	vec2 fpos = fract( pos ); 
	vec2 ipos = floor( pos );
	
    float f = 0.0;	
	float id = hash( ipos.x + ipos.y*57.0 );
	f += freqs[0] * clamp(1.0 - abs(id-0.20)/0.30, 0.0, 1.0 );
	f += freqs[1] * clamp(1.0 - abs(id-0.40)/0.30, 0.0, 1.0 );
	f += freqs[2] * clamp(1.0 - abs(id-0.60)/0.30, 0.0, 1.0 );
	f += freqs[3] * clamp(1.0 - abs(id-0.80)/0.30, 0.0, 1.0 );

    f = pow( clamp( f, 0.0, 1.0 ), 2.0 );
    float h = 2.5*f;

    return vec3( h, id, f );
}

vec3 map( in vec3 pos )
{
	vec2  p = fract( pos.xz ); 
    vec3  m = mapH( pos.xz );
	float d = dbox( vec3(p.x-0.5,pos.y-0.5*m.x,p.y-0.5), vec3(0.3,m.x*0.5,0.3), 0.1 );
    return vec3( d, m.yz );
}

const float surface = 0.001;

vec3 trace( vec3 ro, in vec3 rd, in float tmin, in float tmax )
{
    ro += tmin*rd;
    
	vec2 pos = floor(ro.xz);
    vec3 rdi = 1.0/rd;
    vec3 rda = abs(rdi);
	vec2 rds = sign(rd.xz);
	vec2 dis = (pos-ro.xz+ 0.5 + rds*0.5) * rdi.xz;
	
	vec3 res = vec3( -1.0 );

    // traverse regular grid (in 2D)
	vec2 mm = vec2(0.0);
	for( int i=0; i<28; i++ ) 
	{
        vec3 cub = mapH( pos );

        #if 1
            vec2 pr = pos+0.5-ro.xz;
			vec2 mini = (pr-0.5*rds)*rdi.xz;
	        float s = max( mini.x, mini.y );
            if( (tmin+s)>tmax ) break;
        #endif
        
        
        // intersect box
		vec3  ce = vec3( pos.x+0.5, 0.5*cub.x, pos.y+0.5 );
        vec3  rb = vec3(0.3,cub.x*0.5,0.3);
        vec3  ra = rb + 0.12;
		vec3  rc = ro - ce;
        float tN = maxcomp( -rdi*rc - rda*ra );
        float tF = maxcomp( -rdi*rc + rda*ra );
        if( tN < tF )//&& tF > 0.0 )
        {
            // raymarch
            float s = tN;
            float h = 1.0;
            for( int j=0; j<24; j++ )
            {
                h = dbox( rc+s*rd, rb, 0.1 ); 
                s += h;
                if( s>tF ) break;
            }

            if( h < (surface*s*2.0) )
            {
                res = vec3( s, cub.yz );
                break; 
            }
            
		}

        // step to next cell		
		mm = step( dis.xy, dis.yx ); 
		dis += mm*rda.xz;
        pos += mm*rds;
	}

    res.x += tmin;
    
	return res;
}


float softshadow( in vec3 ro, in vec3 rd, in float mint, in float maxt, in float k )
{
    float res = 1.0;
    float t = mint;
    for( int i=0; i<50; i++ )
    {
        float h = map( ro + rd*t ).x;
        res = min( res, k*h/t );
        t += clamp( h, 0.05, 0.2 );
        if( res<0.001 || t>maxt ) break;
    }
    return clamp( res, 0.0, 1.0 );
}

vec3 calcNormal( in vec3 pos, in float t )
{
    vec2 e = vec2(1.0,-1.0)*surface*t;
    return normalize( e.xyy*map( pos + e.xyy ).x + 
					  e.yyx*map( pos + e.yyx ).x + 
					  e.yxy*map( pos + e.yxy ).x + 
					  e.xxx*map( pos + e.xxx ).x );
}

const vec3 light1 = vec3(  0.70, 0.52, -0.45 );
const vec3 light2 = vec3( -0.71, 0.000,  0.71 );
const vec3 lpos = vec3(0.0) + 6.0*light1;

vec2 boundingVlume( vec2 tminmax, in vec3 ro, in vec3 rd )
{
    float bp = 2.7;
    float tp = (bp-ro.y)/rd.y;
    if( tp>0.0 ) 
    {
        if( ro.y>bp ) tminmax.x = max( tminmax.x, tp );
        else          tminmax.y = min( tminmax.y, tp );
    }
    bp = 0.0;
    tp = (bp-ro.y)/rd.y;
    if( tp>0.0 ) 
    {
        if( ro.y>bp ) tminmax.y = min( tminmax.y, tp );
    }
    return tminmax;
}

vec3 doLighting( in vec3 col, in float ks,
                 in vec3 pos, in vec3 nor, in vec3 rd )
{
    vec3  ldif = pos - lpos;
    float llen = length( ldif );
    ldif /= llen;
	float con = dot(-light1,ldif);
	float occ = mix( clamp( pos.y/4.0, 0.0, 1.0 ), 1.0, max(0.0,nor.y) );
    vec2 sminmax = vec2(0.01, 5.0);
    //sminmax = boundingVlume( sminmax, pos, -ldif );
    float sha = softshadow( pos, -ldif, sminmax.x, sminmax.y, 32.0 );;
		
    float bb = smoothstep( 0.5, 0.8, con );
    float lkey = clamp( dot(nor,-ldif), 0.0, 1.0 );
	vec3  lkat = vec3(1.0);
          lkat *= vec3(bb*bb*0.6+0.4*bb,bb*0.5+0.5*bb*bb,bb).zyx;
          lkat /= 1.0+0.25*llen*llen;		
		  lkat *= 25.0;
          lkat *= sha;
    float lbac = clamp( 0.1 + 0.9*dot( light2, nor ), 0.0, 1.0 );
          lbac *= smoothstep( 0.0, 0.8, con );
		  lbac /= 1.0+0.2*llen*llen;		
		  lbac *= 4.0;
	float lamb = 1.0 - 0.5*nor.y;
          lamb *= 1.0-smoothstep( 10.0, 25.0, length(pos.xz) );
		  lamb *= 0.25 + 0.75*smoothstep( 0.0, 0.8, con );
		  lamb *= 0.25;
		
    vec3 lin  = 1.0*vec3(0.20,0.05,0.02)*lamb*occ;
         lin += 1.0*vec3(1.60,0.70,0.30)*lkey*lkat*(0.5+0.5*occ);
         lin += 1.0*vec3(0.70,0.20,0.08)*lbac*occ;
         lin *= vec3(1.3,1.1,1.0);

    col = col*lin;

    vec3 spe = vec3(1.0)*occ*lkat*pow( clamp(dot( reflect(rd,nor), -ldif  ),0.0,1.0), 4.0 );
	col += (0.5+0.5*ks)*0.5*spe*vec3(1.0,0.9,0.7);

    return col;
}

mat3 setLookAt( in vec3 ro, in vec3 ta, float cr )
{
	vec3  cw = normalize(ta-ro);
	vec3  cp = vec3(sin(cr), cos(cr),0.0);
	vec3  cu = normalize( cross(cw,cp) );
	vec3  cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

vec3 render( in vec3 ro, in vec3 rd )
{
    vec3 col = vec3( 0.0 );

    vec2 tminmax = vec2(0.0, 40.0 );

    tminmax = boundingVlume( tminmax, ro, rd );

    // raytrace
    vec3 res = trace( ro, rd, tminmax.x, tminmax.y );
    if( res.y > -0.5 )
    {
        float t = res.x;
        vec3 pos = ro + t*rd;
        vec3 nor = calcNormal( pos, t );

        // material	
        col = 0.5 + 0.5*cos( 6.2831*res.y + vec3(0.0, 0.4, 0.8) );
        vec3 ff = texcube( iChannel1, 0.1*vec3(pos.x,4.0*res.z-pos.y,pos.z), nor ).xyz;
        col *= ff.x;

        // lighting
        col = doLighting( col, ff.x, pos, nor, rd );
        col *= 1.0 - smoothstep( 20.0, 40.0, t );
    }
    return col;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	freqs[0] = texture( iChannel0, vec2( 0.01, 0.25 ) ).x;
	freqs[1] = texture( iChannel0, vec2( 0.07, 0.25 ) ).x;
	freqs[2] = texture( iChannel0, vec2( 0.15, 0.25 ) ).x;
	freqs[3] = texture( iChannel0, vec2( 0.30, 0.25 ) ).x;

    //-----------
    float time = 5.0 + 0.2*iGlobalTime + 20.0*iMouse.x/iResolution.x;

    vec3 tot = vec3(0.0);
    #ifdef ANTIALIAS
    for( int i=0; i<4; i++ )
    {
        vec2 off = vec2( mod(float(i),2.0), mod(float(i/2),2.0) )/2.0;
    #else
        vec2 off = vec2(0.0);
    #endif        
        vec2 xy = (-iResolution.xy+2.0*(fragCoord.xy+off)) / iResolution.y;

        // camera	
        vec3 ro = vec3( 8.5*cos(0.2+.33*time), 5.0+2.0*cos(0.1*time), 8.5*sin(0.1+0.37*time) );
        vec3 ta = vec3( -2.5+3.0*cos(1.2+.41*time), 0.0, 2.0+3.0*sin(2.0+0.38*time) );
        float roll = 0.2*sin(0.1*time);

        // camera tx
        mat3 ca = setLookAt( ro, ta, roll );
        vec3 rd = normalize( ca * vec3(xy.xy,1.75) );
        
        vec3 col = render( ro, rd );
        
        tot += pow( col, vec3(0.4545) );
    #ifdef ANTIALIAS
    }
	tot /= 4.0;
    #endif    
    
    // vigneting
	vec2 q = fragCoord.xy/iResolution.xy;
    tot *= 0.2 + 0.8*pow( 16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y), 0.1 );

    fragColor=vec4( tot, 1.0 );
}


void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )
{
	freqs[0] = texture( iChannel0, vec2( 0.01, 0.25 ) ).x;
	freqs[1] = texture( iChannel0, vec2( 0.07, 0.25 ) ).x;
	freqs[2] = texture( iChannel0, vec2( 0.15, 0.25 ) ).x;
	freqs[3] = texture( iChannel0, vec2( 0.30, 0.25 ) ).x;

    vec3 col = render( fragRayOri + vec3(0.0,4.0,0.0), fragRayDir );

    col += pow( col, vec3(0.4545) );

    fragColor = vec4( col, 1.0 );
}