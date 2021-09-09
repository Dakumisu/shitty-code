import * as THREE from 'three'
import vertex from '../glsl/vertex.vert'
import fragment from '../glsl/fragment.frag'
import texture from '../evan.jpeg'

class Sheeesh {
   constructor(opt) {
      this.scene = opt.scene
      this.mouse = opt.mouse

      console.log(this.mouse)
      
      this.init()
   }
   
   init() {
      const sheeeshTexture = new THREE.TextureLoader().load(texture)
      console.log(sheeeshTexture)

      this.planeGeo = new THREE.PlaneBufferGeometry(1,1, 20, 20)
      this.planeMaterial = new THREE.ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value: 0 },
            uTexture: { value: sheeeshTexture },
            uMouseFrag: { value: this.mouse.mouseMask },
            uMouseVert: { value: this.mouse.mouse },
            uAspect: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uPixelRatio: { value: window.devicePixelRatio },
         },
         side: THREE.DoubleSide,
         transparent: true,
         depthTest: false,
         depthWrite: false
      })

      this.planeMesh = new THREE.Mesh(this.planeGeo, this.planeMaterial)
      this.planeMesh.frustumCulled = false
      this.planeMesh.position.set(0, 0, -2)

      this.scene.add(this.planeMesh)
   }

   resize() {
      window.addEventListener('resize', () => {
         this.planeMaterial.uniforms.uAspect.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
         this.planeMaterial.uniforms.uPixelRatio.value = window.devicePixelRatio
      })
   }
}

export default Sheeesh