#define PI 3.1415926535897932384626433832795

// uniform float uTime;
uniform float uAlpha;
uniform vec2 uMouseFrag;
uniform vec3 uColor;
uniform vec2 uAspect;
uniform float uPixelRatio;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vPos;
varying float vProgress;
varying float vWave;

// vec4 rgb (vec4 inCol) {
//    return inCol/vec4(255.0);
// }

float circle(in vec2 st, in float radius) {
   vec2 dist = st - vec2(uMouseFrag);
   return 1. - smoothstep(0., radius + (radius * .5), dot(dist, dist) * 4.0);
}

void main() {
   vec2 uv = gl_FragCoord.xy/uAspect;
   uv /= uPixelRatio;

    float cursor = circle(uv, .1);

    vec4 texture = texture2D(uTexture, vUv);

    // texture.a += -.9 + cursor;

    // texture.z += cursor;
   //  texture.a += 2. + vWave * 2.;

   gl_FragColor = texture;
//    gl_FragColor = vec4(vec3(cursor), 1.);
}