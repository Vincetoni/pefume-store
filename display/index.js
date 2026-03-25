import * as THREE from 'https://esm.sh/three@0.183.2';
import { GLTFLoader } from 'https://esm.sh/three@0.183.2/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'https://esm.sh/gsap@3.14.2';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.14.2/ScrollTrigger';
import Lenis from 'https://esm.sh/lenis@1.3.20';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // =====================
  // PRODUCT DATA ARRAY
  // =====================
  const products = [
    {
      id: 0,
      name: "flower-pef",
      price: "$500",
      theme: "flower",
      description: "A delicate floral symphony with notes of jasmine, rose, and white musk. Inspired by blooming gardens at dawn.",
      introTitle: "FLORAL ESSENCE",
      introDesc: "A delicate floral symphony with jasmine, rose, and white musk. Scroll to enter the garden.",
      header1: "Blooming Presence",
      header2: "Petals That Linger",
      tooltip1Title: "Garden Opening",
      tooltip1Desc: "Fresh jasmine and rose open softly, then settle into a smooth white musk glow that feels like morning dew.",
      tooltip2Title: "Floral Trail",
      tooltip2Desc: "Sandalwood and vanilla create a warm trail that stays refined on skin and leaves a memorable garden signature.",
      outroText: "Leave A Floral Signature",
      modelPath: "./flower_perfume.glb",
      backgroundEffect: "flowers",
      colors: {
        accent: "#e8b4b8",
        bg: "#faf8f5",
        text: "#2d2420"
      }
    },
    {
      id: 1,
      name: "romantic-pef",
      price: "$650",
      theme: "romantic",
      description: "An enchanting blend of rose petals, pink pepper, and amber. For moments of passion and romance.",
      introTitle: "ROMANTIC AURA",
      introDesc: "An enchanting blend of rose petals, pink pepper, and amber. Scroll to ignite the passion.",
      header1: "Crafted For Romance",
      header2: "Love That Lingers",
      tooltip1Title: "Passion Opening",
      tooltip1Desc: "Pink pepper and rose petals open boldly, then settle into a smooth amber glow that feels like first love.",
      tooltip2Title: "Desire Trail",
      tooltip2Desc: "Musk and vanilla create a sensual trail that stays intimate on skin and leaves a memorable romantic signature.",
      outroText: "Leave A Passionate Signature",
      modelPath: "./romantic_perfume.glb",
      backgroundEffect: "hearts",
      colors: {
        accent: "#d4789c",
        bg: "#fdf2f4",
        text: "#4a2c3a"
      }
    },
    {
      id: 2,
      name: "ocean-pef",
      price: "$580",
      theme: "ocean",
      description: "A refreshing marine escape with sea salt, bergamot, and driftwood. Inspired by coastal horizons.",
      introTitle: "OCEAN BREEZE",
      introDesc: "A refreshing marine escape with sea salt, bergamot, and driftwood. Scroll to feel the waves.",
      header1: "Crafted For Freedom",
      header2: "Waves That Linger",
      tooltip1Title: "Coastal Opening",
      tooltip1Desc: "Sea salt and bergamot open briskly, then settle into a smooth driftwood glow that feels like ocean spray.",
      tooltip2Title: "Marine Trail",
      tooltip2Desc: "Ambergris and cedar create a fresh trail that stays clean on skin and leaves a memorable coastal signature.",
      outroText: "Leave A Coastal Signature",
      modelPath: "./ocean_perfume.glb",
      backgroundEffect: "bubbles",
      colors: {
        accent: "#4a90a4",
        bg: "#f0f4f8",
        text: "#1a2a3a"
      }
    },
    {
      id: 3,
      name: "forest-pef",
      price: "$620",
      theme: "forest",
      description: "An earthy woodland journey with pine, moss, and sandalwood. Inspired by ancient forests.",
      introTitle: "FOREST DEPTH",
      introDesc: "An earthy woodland journey with pine, moss, and sandalwood. Scroll to enter the woods.",
      header1: "Crafted For Nature",
      header2: "Woods That Linger",
      tooltip1Title: "Woodland Opening",
      tooltip1Desc: "Pine and bergamot open freshly, then settle into a smooth moss glow that feels like forest air.",
      tooltip2Title: "Earthy Trail",
      tooltip2Desc: "Sandalwood and vetiver create a grounding trail that stays natural on skin and leaves a memorable woodland signature.",
      outroText: "Leave A Natural Signature",
      modelPath: "./forest_perfume.glb",
      backgroundEffect: "leaves",
      colors: {
        accent: "#6b8e6b",
        bg: "#f5f7f4",
        text: "#1e2a1e"
      }
    }
  ];

  let currentProductIndex = 0;

  // =====================
  // DOM ELEMENTS
  // =====================
  const modelRoot = document.querySelector('.model-container');
  const productSection = document.getElementById('productSection');
  const backgroundEffects = document.getElementById('backgroundEffects');
  
  // Get all dynamic elements
  const elements = {
    productsName: document.getElementById('productsName'),
    productsDes: document.getElementById('productsDes'),
    productsPrice: document.getElementById('productsPrice'),
    introTitle: document.getElementById('introTitle'),
    introDesc: document.getElementById('introDesc'),
    header1Text: document.getElementById('header1Text'),
    header2Text: document.getElementById('header2Text'),
    tooltip1Title: document.getElementById('tooltip1Title'),
    tooltip1Desc: document.getElementById('tooltip1Desc'),
    tooltip2Title: document.getElementById('tooltip2Title'),
    tooltip2Desc: document.getElementById('tooltip2Desc'),
    outroText: document.getElementById('outroText'),
    currentProductNum: document.getElementById('currentProductNum'),
    totalProducts: document.getElementById('totalProducts')
  };

  // Set total products
  elements.totalProducts.textContent = products.length;

  // =====================
  // MOBILE DETECTION
  // =====================
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // =====================
  // LENIS SMOOTH SCROLL
  // =====================
  const lenis = new Lenis({ 
    smoothWheel: true,
    lerp: 0.1,
    wheelMultiplier: 0.8
  });
  
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // =====================
  // THREE.JS SETUP
  // =====================
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
  });

  let model;
  let modelSize;
  let modelCenter;
  let particleSystem;

  // Mobile-optimized stage state
  const stageState = {
    domX: isMobile ? 0 : 14,
    domY: isMobile ? 5 : -8,
    domScale: isMobile ? 0.6 : 0.76,
    modelOffsetX: isMobile ? 0 : 0.16,
    modelOffsetY: isMobile ? -0.1 : 0.04,
    rotX: isMobile ? 0.05 : 0.08,
    rotY: isMobile ? -0.15 : -0.25,
    rotZ: isMobile ? -0.1 : -0.18,
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

  // Mobile-optimized renderer settings
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  modelRoot.appendChild(renderer.domElement);

  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, isMobile ? 1.0 : 1.2);
  keyLight.position.set(2.5, 4, 4);
  keyLight.castShadow = !isMobile;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xf6dcc2, 0.55);
  fillLight.position.set(-3, 1.8, -2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xd2b38b, 0.4);
  rimLight.position.set(0, 2.5, -4);
  scene.add(rimLight);

  // =====================
  // BACKGROUND EFFECTS SYSTEM
  // =====================
  function createParticleTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (type === 'flowers') {
      // Draw simple flower shape
      ctx.fillStyle = '#e8b4b8';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5;
        const x = 32 + Math.cos(angle) * 20;
        const y = 32 + Math.sin(angle) * 20;
        ctx.moveTo(32, 32);
        ctx.lineTo(x, y);
        ctx.arc(x, y, 8, 0, Math.PI * 2);
      }
      ctx.fill();
    } else if (type === 'hearts') {
      // Draw heart shape
      ctx.fillStyle = '#d4789c';
      ctx.beginPath();
      ctx.moveTo(32, 20);
      ctx.bezierCurveTo(32, 15, 20, 5, 10, 15);
      ctx.bezierCurveTo(0, 25, 32, 55, 32, 55);
      ctx.bezierCurveTo(32, 55, 64, 25, 54, 15);
      ctx.bezierCurveTo(44, 5, 32, 15, 32, 20);
      ctx.fill();
    } else if (type === 'bubbles') {
      // Draw bubble
      const gradient = ctx.createRadialGradient(20, 20, 0, 32, 32, 30);
      gradient.addColorStop(0, 'rgba(74, 144, 164, 0.8)');
      gradient.addColorStop(1, 'rgba(74, 144, 164, 0.2)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'leaves') {
      // Draw leaf
      ctx.fillStyle = '#6b8e6b';
      ctx.beginPath();
      ctx.ellipse(32, 32, 12, 24, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  function createBackgroundEffect(type) {
    // Clear existing particles
    if (particleSystem) {
      scene.remove(particleSystem);
      particleSystem.geometry.dispose();
      particleSystem.material.dispose();
    }

    const particleCount = isMobile ? 30 : 60;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const rotations = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = Math.random() * 10 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: -Math.random() * 0.03 - 0.01,
        z: (Math.random() - 0.5) * 0.02
      });
      
      rotations.push(Math.random() * Math.PI * 2);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.3 : 0.5,
      map: createParticleTexture(type),
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(geometry, material);
    particleSystem.userData = { velocities, rotations };
    scene.add(particleSystem);

    // Hide HTML background effects
    backgroundEffects.style.display = 'none';
  }

  function updateParticles() {
    if (!particleSystem) return;
    
    const positions = particleSystem.geometry.attributes.position.array;
    const { velocities } = particleSystem.userData;
    
    for (let i = 0; i < velocities.length; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;
      
      // Reset if below screen
      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 8;
        positions[i * 3] = (Math.random() - 0.5) * 15;
      }
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.rotation.y += 0.001;
  }

  // =====================
  // PRODUCT UPDATE FUNCTION
  // =====================
  function updateProductDisplay(index) {
    const product = products[index];
    
    // Update text content with animation
    gsap.to([elements.productsName, elements.productsDes, elements.productsPrice], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        elements.productsName.textContent = product.name;
        elements.productsDes.textContent = product.description;
        elements.productsPrice.textContent = product.price;
        elements.currentProductNum.textContent = index + 1;
        
        // Update theme
        productSection.setAttribute('data-theme', product.theme);
        
        // Update other sections
        elements.introTitle.textContent = product.introTitle;
        elements.introDesc.textContent = product.introDesc;
        elements.header1Text.textContent = product.header1;
        elements.header2Text.textContent = product.header2;
        elements.tooltip1Title.textContent = product.tooltip1Title;
        elements.tooltip1Desc.textContent = product.tooltip1Desc;
        elements.tooltip2Title.textContent = product.tooltip2Title;
        elements.tooltip2Desc.textContent = product.tooltip2Desc;
        elements.outroText.textContent = product.outroText;
        
        // Update background effect
        createBackgroundEffect(product.backgroundEffect);
        
        gsap.to([elements.productsName, elements.productsDes, elements.productsPrice], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1
        });
      }
    });

    // Load new 3D model
    loadModel(product.modelPath);
  }

  // =====================
  // 3D MODEL LOADING
  // =====================
  function loadModel(path) {
    // Remove existing model
    if (model) {
      scene.remove(model);
      model.traverse((node) => {
        if (node.isMesh) {
          node.geometry.dispose();
          if (node.material) node.material.dispose();
        }
      });
    }

    new GLTFLoader().load(
      path,
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
        stageState.cameraZ = largestAxis * (isMobile ? 1.8 : 1.32);

        scene.add(model);
        
        // Animate model entry
        gsap.fromTo(model.scale, 
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.7)" }
        );
      },
      undefined,
      (error) => {
        console.error('Failed to load model:', error);
        // Create fallback geometry
        const geometry = new THREE.CylinderGeometry(0.5, 0.8, 2, 32);
        const material = new THREE.MeshStandardMaterial({ 
          color: products[currentProductIndex].colors.accent,
          metalness: 0.3,
          roughness: 0.4
        });
        model = new THREE.Mesh(geometry, material);
        modelSize = new THREE.Vector3(1, 2, 1);
        modelCenter = new THREE.Vector3(0, 0, 0);
        stageState.cameraZ = 5;
        scene.add(model);
      }
    );
  }

  // =====================
  // NAVIGATION HANDLERS
  // =====================
  document.getElementById('rightArrowSwitcher').addEventListener('click', () => {
    currentProductIndex = (currentProductIndex + 1) % products.length;
    updateProductDisplay(currentProductIndex);
  });

  document.getElementById('leftArrowSwitcher').addEventListener('click', () => {
    currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
    updateProductDisplay(currentProductIndex);
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  productSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  productSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next product
        currentProductIndex = (currentProductIndex + 1) % products.length;
      } else {
        // Swipe right - previous product
        currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
      }
      updateProductDisplay(currentProductIndex);
    }
  }

  // =====================
  // RESIZE HANDLER
  // =====================
  function resizeRenderer() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    
    // Update mobile state
    const newIsMobile = width <= 768;
    if (newIsMobile !== isMobile) {
      // Adjust stage state for mobile/desktop transition
      stageState.domX = newIsMobile ? 0 : 14;
      stageState.domY = newIsMobile ? 5 : -8;
      stageState.domScale = newIsMobile ? 0.6 : 0.76;
      stageState.cameraZ = model ? Math.max(modelSize.x, modelSize.y, modelSize.z) * (newIsMobile ? 1.8 : 1.32) : 8;
    }
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

  // =====================
  // SCROLL ANIMATIONS
  // =====================
  gsap.set('.header-1', { yPercent: 30, opacity: 0 });
  gsap.set('.header-2', { yPercent: 30, opacity: 0 });
  gsap.set('.tooltip .icon ion-icon', { yPercent: 110, opacity: 0 });
  gsap.set('.tooltip .divider', { scaleX: 0 });
  gsap.set(modelRoot, {
    xPercent: stageState.domX,
    yPercent: stageState.domY,
    scale: stageState.domScale,
    opacity: 1,
  });

  // Intro scroll animation
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
    domScale: isMobile ? 0.75 : 0.94,
    modelOffsetX: 0,
    modelOffsetY: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    ease: 'none',
    onUpdate: updateModelStage,
  });

  // Product overview scroll
  ScrollTrigger.create({
    trigger: '.product-overview',
    start: 'top top',
    end: '+=220%',
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: ({ progress }) => {
      const header1Progress = gsap.utils.clamp(0, 1, progress / 0.2);
      gsap.set('.header-1', {
        yPercent: 30 - header1Progress * 30,
        opacity: header1Progress,
      });

      const header2Progress = gsap.utils.clamp(0, 1, (progress - 0.4) / 0.16);
      gsap.set('.header-2', {
        yPercent: 30 - header2Progress * 30,
        opacity: header2Progress,
      });

      tooltipConfigs.forEach((config) => {
        setTooltipState(config, progress >= config.revealAt);
      });

      stageState.scrollSpin = Math.PI * 1.8 * progress;
      updateModelStage();
    },
  });

  // Outro scroll animation
  gsap.timeline({
    scrollTrigger: {
      trigger: '.outro',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  }).to(stageState, {
    domX: isMobile ? 0 : 14,
    domY: isMobile ? 5 : -8,
    domScale: isMobile ? 0.6 : 0.76,
    modelOffsetX: isMobile ? 0 : 0.16,
    modelOffsetY: isMobile ? -0.1 : 0.04,
    rotX: isMobile ? 0.05 : 0.08,
    rotZ: isMobile ? -0.1 : -0.18,
    ease: 'none',
    onUpdate: updateModelStage,
  });

  // =====================
  // ANIMATION LOOP
  // =====================
  let animationId;
  let isVisible = true;

  function animate() {
    if (!isVisible) return;
    
    updateModelStage();
    updateParticles();

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
    animationId = requestAnimationFrame(animate);
  }

  // Visibility handling for performance
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible) {
      animate();
    } else {
      cancelAnimationFrame(animationId);
    }
  });

  // =====================
  // INITIALIZATION
  // =====================
  resizeRenderer();
  animate();
  
  // Load initial product
  updateProductDisplay(0);

  window.addEventListener('resize', () => {
    resizeRenderer();
    ScrollTrigger.refresh();
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
    lenis.destroy();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
});