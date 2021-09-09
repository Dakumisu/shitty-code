import * as THREE from 'three'

import Control from './js/Control'
import Scene from './js/Scene'
import Mouse from './js/Mouse'
import Sheeesh from './js/Sheeesh'

const scene = new Scene({
    canvas: document.querySelector('.webgl')
})

const mouse = new Mouse({
    camera: scene.camera
})

const sheeesh = new Sheeesh({
    scene: scene.scene,
    mouse: mouse
})

// const control = new Control({
//     camera: scene.camera,
//     renderer: scene.renderer
// })

function raf() {
    const elapsedTime = scene.clock.getElapsedTime()

    sheeesh.planeMaterial.uniforms.uTime.value = elapsedTime

    scene.renderer.render(scene.scene, scene.camera)
    
    // Update controls
    // control.controls.update()
    window.requestAnimationFrame(raf)
}

raf()