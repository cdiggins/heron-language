precision highp float;

#define M_PI 3.1415926535897932384626433832795
varying vec2 fragCoord;
uniform float iGlobalTime;
uniform vec3 iResolution;

void main(void) {
	const float period = 0.8;
	vec2 textCoord = fragCoord / iResolution.xy;
	
	float line = (iResolution.x * (0.5 - textCoord.s)) * sin(0.8 + (iGlobalTime / 30.0));
	line -= (iResolution.y * (0.5 - textCoord.t)) * cos(0.8+ (iGlobalTime / 30.0));
	line += (60.0 * sin(iGlobalTime / 5.0) * sin (iResolution.x * textCoord.s / 401.0)) * (sin(iGlobalTime / 3.5) * sin (iResolution.x * textCoord.s / 77.0));
	line += (60.0 * sin(iGlobalTime / 3.01) * sin (iResolution.x * textCoord.s / 501.0)) * (sin(iGlobalTime / 4.0) * sin (iResolution.x * textCoord.s / 53.0));
	float sine = sin(line / period);
	float cycle = (1.0 + sine) / 2.0;
	if (mod((line - (period * 1.5 * M_PI)) / (period * 2.0 * M_PI), 4.0) < 3.0) {
		cycle = 0.0;
	}

	vec4 colour = (cycle * vec4(0.6, 0.6, 0.6, 1.0)) + ((1.0 - cycle) * vec4(0.9, 0.9, 0.9, 1.0));
	gl_FragColor = colour;
}
