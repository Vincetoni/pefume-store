import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from './node_modules/gsap/index.js';
import { ScrollTrigger } from './node_modules/gsap/ScrollTrigger.js';
import Lenis from './node_modules/lenis/dist/lenis.mjs';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const modelRoot = document.querySelector('.model-container');

  // Lenis drives the page scroll, and ScrollTrigger listens to the same updates.
  const lenis = new Lenis({ smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Keep the text visible from the start. Only secondary details animate.
  gsap.set('.header-2 ', { yPercent: 30, opacity: 0 });
  gsap.set('.tooltip .icon ion-icon', { yPercent: 110, opacity: 0 });
  gsap.set('.tooltip .divider', { scaleX: 0 });
  gsap.set(modelRoot, {
    xPercent: 14,
    yPercent: -8,
    scale: 0.76,
    opacity: 1,
  });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  let model;
  let modelSize;
  let modelCenter;

  // These values define where the bottle sits on screen and how it is framed.
  const stageState = {
    domX: 14,
    domY: -8,
    domScale: 0.76,
    modelOffsetX: 0.16,
    modelOffsetY: 0.04,
    rotX: 0.08,
    rotY: -0.25,
    rotZ: -0.18,
    cameraZ: 8,
    scrollSpin: 0,
  };

  const tooltipConfigs = [
    {
      revealAt: 0.3,
      icon: '.tooltip:nth-child(1) .icon ion-icon',
      divider: '.tooltip:nth-child(1) .divider',
      visible: false,
    },
    {
      revealAt: 0.52,
      icon: '.tooltip:nth-child(2) .icon ion-icon',
      divider: '.tooltip:nth-child(2) .divider',
      visible: false,
    },
  ];

  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  modelRoot.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.95));

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(2.5, 4, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xf6dcc2, 0.55);
  fillLight.position.set(-3, 1.8, -2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xd2b38b, 0.4);
  rimLight.position.set(0, 2.5, -4);
  scene.add(rimLight);

  function resizeRenderer() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function updateModelStage() {
    gsap.set(modelRoot, {
      xPercent: stageState.domX,
      yPercent: stageState.domY,
      scale: stageState.domScale,
      opacity: 1,
    });
  }

  function setTooltipState(config, visible) {
    if (config.visible === visible) return;
    config.visible = visible;

    gsap.to(config.icon, {
      yPercent: visible ? 0 : 110,
      opacity: visible ? 1 : 0,
      duration: visible ? 0.7 : 0.3,
      ease: visible ? 'power3.out' : 'power2.in',
      overwrite: true,
    });

    gsap.to(config.divider, {
      scaleX: visible ? 1 : 0,
      duration: visible ? 0.7 : 0.3,
      ease: 'power3.out',
      overwrite: true,
    });
  }

  new GLTFLoader().load(
    './axe_evil_eye.glb',
    (gltf) => {
      model = gltf.scene;

      model.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material.metalness = 0.08;
          node.material.roughness = 0.84;
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      modelSize = box.getSize(new THREE.Vector3());
      modelCenter = box.getCenter(new THREE.Vector3());

      const largestAxis = Math.max(modelSize.x, modelSize.y, modelSize.z);
      stageState.cameraZ = largestAxis * 1.32;

      scene.add(model);
    },
    undefined,
    (error) => {
      console.error('Failed to load model:', error);
    }
  );

  // Intro: bottle moves from the side into the center.
  gsap.timeline({
    scrollTrigger: {
      trigger: '.intro',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  }).to(stageState, {
    domX: 0,
    domY: 0,
    domScale: 0.94,
    modelOffsetX: 0,
    modelOffsetY: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    ease: 'none',
    onUpdate: updateModelStage,
  });

  // Product overview: keep the bottle centered and rotating behind visible text.
  ScrollTrigger.create({
    trigger: '.product-overview',
    start: 'top top',
    end: '+=220%',
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: ({ progress }) => {
      const secondHeaderProgress = gsap.utils.clamp(0, 1, (progress - 0.4) / 0.16);

      gsap.set('.header-2', {
        yPercent: 30 - secondHeaderProgress * 30,
        opacity: secondHeaderProgress,
      });

      tooltipConfigs.forEach((config) => {
        setTooltipState(config, progress >= config.revealAt);
      });

      stageState.scrollSpin = Math.PI * 1.8 * progress;
      updateModelStage();
    },
  });

  // Outro: move the bottle back out using the same composition as the intro start.
  gsap.timeline({
    scrollTrigger: {
      trigger: '.outro',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  }).to(stageState, {
    domX: 14,
    domY: -8,
    domScale: 0.76,
    modelOffsetX: 0.16,
    modelOffsetY: 0.04,
    rotX: 0.08,
    rotZ: -0.18,
    ease: 'none',
    onUpdate: updateModelStage,
  });

  function animate() {
    updateModelStage();

    if (model && modelSize && modelCenter) {
      model.position.set(
        -modelCenter.x + modelSize.x * stageState.modelOffsetX,
        -modelCenter.y + modelSize.y * stageState.modelOffsetY,
        -modelCenter.z
      );
      model.rotation.set(
        stageState.rotX,
        stageState.rotY + stageState.scrollSpin,
        stageState.rotZ
      );
      camera.position.set(0, 0, stageState.cameraZ);
      camera.lookAt(0, 0, 0);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  resizeRenderer();
  animate();

  window.addEventListener('resize', () => {
    resizeRenderer();
    ScrollTrigger.refresh();
  });
});
