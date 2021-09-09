#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uSpeed;
uniform vec2 uMouseVert;

attribute vec2 aTranslation;
attribute float aTimeOffset;

varying vec2 vUv;
varying vec3 vPos;
varying float vProgress;
varying float vWave;


// float lerp(float a, float b, float amount) {
//    return a + (b - a) * amount;
// }

void main() {
   vUv = uv;
   vec3 pos = position;

   float dx = pos.x;
   float dy = pos.y;
   float freq = sqrt(dx*dx + dy*dy);
   float amp = 0.1;
   float angle = -uTime*2.+freq*6.0;
   pos.z += -sin(angle * 5.)*amp*.25;



   vPos = pos;

   vec4 mv = modelViewMatrix * vec4(pos, 1.);

   mv.xyz += normalize(vec3(0.0,-amp * freq * cos(angle),1.0));
   mv.z += sin(mv.x * 5. + (uTime * 5.)) * .1;
   mv.z += sin(mv.y * 5. + (uTime * 5.)) * .1;

   mv.z += sin(mv.z * mv.x * -uMouseVert.x);
   mv.z += sin(mv.z * mv.y * -uMouseVert.y);

   vWave = mv.z;

   // mv.z * uMouseVert;

   vec4 viewPosition = viewMatrix * mv;
   vec4 projectedPosition = projectionMatrix * viewPosition;

   gl_Position = projectedPosition;
}