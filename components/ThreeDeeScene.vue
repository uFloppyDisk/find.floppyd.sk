<template>
  <canvas id="scene" class="absolute w-screen h-screen">
    
  </canvas>
</template>

<script lang="ts" setup>
import * as THREE from 'three';

if (process.browser) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  const clock = new THREE.Clock();
  const interval = 1 / 1;
  
  window.addEventListener('DOMContentLoaded', function () {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('scene'),
      alpha: true
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
  
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
  
    camera.position.z = 3;

    let delta = 0;

    function animate() {
      requestAnimationFrame( animate );
      delta += clock.getDelta();

      if (delta > interval) {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.1;

        delta = delta % interval;
      }

      renderer.render( scene, camera );
    }

    animate();
  }, false)
}
</script>
