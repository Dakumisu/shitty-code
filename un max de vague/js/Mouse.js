import * as THREE from 'three'

class Mouse {
   constructor(opt) {
      this.camera = opt.camera

      this.mouse = new THREE.Vector2()
      this.mouseMask = new THREE.Vector2()
      this.mouseMapped = new THREE.Vector3()
      this.testPos = new THREE.Vector3()
      this.offset = new THREE.Vector3()

      this.mouseUpdate()
   }

   mouseUpdate() {
      document.querySelector('canvas').addEventListener("mousemove", (e) => {
         this.mouseMask.x = e.clientX / window.innerWidth
         this.mouseMask.y = 1 - e.clientY / window.innerHeight

         this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
         this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1

         this.mouseMapped.x = this.mapCursor(this.mouse.x, -1, 1, -this.viewSize().width / 2, this.viewSize().width / 2)
         this.mouseMapped.y = this.mapCursor(this.mouse.y, -1, 1, -this.viewSize().height / 2, this.viewSize().height / 2)
         this.mouseMapped.z = 1.5

      })
   }

   viewSize() {
      let cameraZ = this.camera.position.z
      let distance = cameraZ - 0
      let aspect = this.camera.aspect

      let vFov = this.camera.fov * Math.PI / 180
      let height = 2 * Math.tan(vFov / 2) * distance
      let width = height * aspect

      return { width, height, vFov }
   }

   mapCursor(mousePos, in_min, in_max, out_min, out_max) {
      return ((mousePos - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
   }
}

export default Mouse