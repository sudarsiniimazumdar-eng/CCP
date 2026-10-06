import * as THREE from 'three';
import { createCabinet } from './Cabinet.js';
import { createPerfumeBottle } from './BottleFactory.js';
import { CameraController } from './CameraController.js';
import { InteractionManager } from './InteractionManager.js';
import { PROJECTS_DATA } from '../data/projects.js';

/**
 * Master 3D Scene Manager with Drag-to-Rotate, Drawers & Atmospheric Ambient Particles
 */
export class SceneManager {
  constructor(containerElement, onSelectCallback, onHoverCallback, onDrawerCallback) {
    this.container = containerElement;
    this.onSelect = onSelectCallback;
    this.onHover = onHoverCallback;
    this.onDrawer = onDrawerCallback;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cameraController = null;
    this.interactionManager = null;
    this.cabinet = null;
    this.bottles = [];
    this.dustParticles = null;

    this.clock = new THREE.Clock();
    this.animationFrameId = null;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c0908);
    this.scene.fog = new THREE.FogExp2(0x0c0908, 0.035);

    // 2. Camera
    const isMobile = width < 768;
    const initialFov = isMobile ? 65 : 50;
    this.camera = new THREE.PerspectiveCamera(initialFov, width / height, 0.1, 50);
    this.camera.position.set(0, 0, isMobile ? 9.8 : 7.8);

    // 3. WebGL Renderer with graceful fallback
    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false
      });
    } catch (e) {
      console.warn('Primary WebGL context failed, trying standard context...', e);
      this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    }

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // 4. Reddish Amber Lighting Setup
    this.setupLighting();

    // 5. Build Asymmetrical Antique Cabinet with Interactive Drawers
    this.cabinet = createCabinet();
    this.scene.add(this.cabinet);

    // 6. Camera Controller
    this.cameraController = new CameraController(this.camera, this.renderer.domElement);
    this.cameraController.onResize(width, height);

    // 7. Interaction Manager (Raycasting, Drag-to-Rotate, Drawers)
    this.interactionManager = new InteractionManager(
      this.camera,
      this.scene,
      this.renderer.domElement,
      (project, bottleObj) => this.handleBottleSelected(project, bottleObj),
      (userData, x, y, visible) => this.onHover(userData, x, y, visible),
      (drawerData, isOpen) => this.onDrawer(drawerData, isOpen)
    );

    // Register Cabinet Drawers with Raycaster
    if (this.cabinet.userData.drawers) {
      this.cabinet.userData.drawers.forEach(dGroup => {
        this.interactionManager.registerInteractiveObject(dGroup);
      });
    }

    // 8. Populate Perfume Bottles
    this.populateBottles();

    // 9. Floating Dust Particles
    this.setupDustParticles();

    // 10. Event Listeners
    window.addEventListener('resize', () => this.onResize());

    // 11. Start Loop
    this.animate();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x2d1f18, 0.75);
    this.scene.add(ambientLight);

    // Main Reddish-Amber Sunlight Shaft
    const amberShaftLight = new THREE.DirectionalLight(0xff7836, 1.7);
    amberShaftLight.position.set(-4.5, 5.5, 4.5);
    amberShaftLight.castShadow = true;
    amberShaftLight.shadow.mapSize.width = 1024;
    amberShaftLight.shadow.mapSize.height = 1024;
    amberShaftLight.shadow.camera.near = 0.5;
    amberShaftLight.shadow.camera.far = 20;
    amberShaftLight.shadow.bias = -0.001;
    this.scene.add(amberShaftLight);

    // Warm Terracotta Rim Light
    const rimLight = new THREE.DirectionalLight(0xd47a3f, 1.15);
    rimLight.position.set(5.5, 2.5, 2.5);
    this.scene.add(rimLight);

    // Candle point lights inside upper & lower bays
    const upperCandle = new THREE.PointLight(0xff9843, 1.2, 7.5, 1.8);
    upperCandle.position.set(-0.5, 1.8, 1.2);
    this.scene.add(upperCandle);

    const lowerGlow = new THREE.PointLight(0xe86c2e, 0.9, 6.5, 2.0);
    lowerGlow.position.set(1.0, -0.6, 1.0);
    this.scene.add(lowerGlow);
  }

  setupDustParticles() {
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = Math.random() * 3 + 0.2;
      speeds[i] = Math.random() * 0.2 + 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffb870,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.dustParticles = new THREE.Points(geometry, material);
    this.dustParticles.userData = { speeds };
    this.scene.add(this.dustParticles);
  }

  populateBottles() {
    PROJECTS_DATA.forEach(project => {
      const shelfIndex = project.placement.shelf;
      const shelfY = this.cabinet.userData.getShelfY(shelfIndex);
      
      const bottleGroup = createPerfumeBottle(project, shelfY);
      this.scene.add(bottleGroup);
      this.bottles.push(bottleGroup);
      
      this.interactionManager.registerInteractiveObject(bottleGroup);
    });
  }

  handleBottleSelected(project, bottleGroup) {
    const isMobile = window.innerWidth < 768;
    this.cameraController.focusOnBottle(bottleGroup, isMobile);
    if (this.onSelect) {
      this.onSelect(project);
    }
  }

  resetView() {
    this.interactionManager.deselectCurrentObject();
    this.interactionManager.closeAllDrawers();
    this.cameraController.resetToOverview();
  }

  selectProjectById(projectId) {
    this.interactionManager.selectProjectById(projectId);
  }

  onResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.cameraController.onResize(width, height);
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    this.cameraController.update();
    this.interactionManager.update();

    // Drift dust particles gently
    if (this.dustParticles) {
      const positions = this.dustParticles.geometry.attributes.position.array;
      const speeds = this.dustParticles.userData.speeds;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime * 0.5 + i) * 0.002 - speeds[i] * 0.003;
        positions[i * 3] += Math.cos(elapsedTime * 0.3 + i) * 0.0015;

        if (positions[i * 3 + 1] < -3.5) positions[i * 3 + 1] = 3.5;
        if (positions[i * 3] < -4.0) positions[i * 3] = 4.0;
        if (positions[i * 3] > 4.0) positions[i * 3] = -4.0;
      }
      this.dustParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Subtle resting breathing on bottles when not being dragged/inspected
    this.bottles.forEach((bottle, i) => {
      if (bottle !== this.interactionManager.selectedObject && bottle !== this.interactionManager.hoveredObject) {
        bottle.position.y = bottle.userData.basePosition.y + Math.sin(elapsedTime * 1.5 + i) * 0.006;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', () => this.onResize());
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}
