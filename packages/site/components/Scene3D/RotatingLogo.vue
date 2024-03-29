<template>
  <canvas ref="sceneDom" class="w-full" width="100" height="100"></canvas>
</template>

<script lang="ts" setup>
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const props = defineProps<{
  done: boolean
}>();

const sceneDom: Ref<HTMLCanvasElement | null> = ref(null);

onMounted(() => {
  if (sceneDom.value === null) { return; }

  const sceneDomSize = sceneDom.value.getBoundingClientRect(); 

  window.addEventListener('resize', (_) => {
    camera.aspect = sceneDomSize.width / sceneDomSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sceneDomSize.width, sceneDomSize.height, true);
  }, false)

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, 
    sceneDomSize.width / sceneDomSize.height,
    0.1,
    10
  );

  const clock = new THREE.Clock();
  const interval = 1 / 1;

  const renderer = new THREE.WebGLRenderer({
    canvas: sceneDom.value,
    alpha: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(sceneDomSize.width, sceneDomSize.height);

  const loader = new SVGLoader();
  const logo = new THREE.Group();
  loader.load(
    '/svg/logo_simple.svg',
    function (data: any) {
      const paths = data.paths;

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(0xff0000),
          linewidth: 1,
        });

        const shapes = SVGLoader.createShapes(path);

        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j];

          const geometryIntermediate = new THREE.ExtrudeGeometry(shape, {
            depth: 0.25,
            bevelEnabled: false,
          });

          const geometry = new THREE.EdgesGeometry(geometryIntermediate);
          const mesh = new THREE.LineSegments(geometry, material);

          logo.add(mesh);
        }
      }

      logo.translateX(-0.5);
      logo.translateY(0.5);
      logo.translateZ(0.125);

      logo.scale.set(0.01, 0.01, 1);
      logo.setRotationFromEuler(new THREE.Euler(Math.PI, 0.0, 0.0));

      logo.translateX(0.042);

      scene.add(logo);
    },
  )

  camera.position.z = 2;
  camera.lookAt(0, 0, 0);

  const pivot = new THREE.Group();
  pivot.add(camera);
  scene.add(pivot);

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);

    if (props.done) {
      renderer.dispose();
      return;
    }

    time += clock.getDelta();
    if (time > interval) {
      pivot.rotation.y = (pivot.rotation.y + (Math.PI / 6)) % (Math.PI * 2);
      time = time % interval;
    }

    renderer.render(scene, camera);
  }

  animate();
});
</script>
