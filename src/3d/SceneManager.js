import * as THREE from 'three';
import { createCabinet } from './Cabinet.js';
import { createApothecaryRoom } from './RoomEnvironment.js';
import { createPerfumeBottle } from './BottleFactory.js';
import { CameraController } from './CameraController.js';
import { InteractionManager } from './InteractionManager.js';
import { PROJECTS_DATA } from '../data/projects.js';

/**
 * Master 3D Scene Manager with Atmospheric Victorian Apothecary Room & Cozy Amber Lighting
 * Directly matches the reference image:
 * - Full room background with rustic floor, Persian rug, library shelves, stained glass, staircase & mezzanine
 * - Warm hanging Moroccan/teardrop glass lanterns with glowing illumination
 * - Cleanly organized bottle displays on open shelves with zero clipping
 * - 360° interactive orbit & bottle inspection
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
    this.room = null;
    this.bottles = [];
    this.dustParticles = null;

    this.clock = new THREE.Clock();
    this.animationFrameId = null;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Cozy Antique Chamber Scene & Atmospheric Warm Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0d0907);
    this.scene.fog = new THREE.FogExp2(0x0d0907, 0.032);

    // 2. Camera
    const isMobile = width < 768;
    const initialFov = isMobile ? 56 : 48;
    this.camera = new THREE.PerspectiveCamera(initialFov, width / height, 0.1, 65);

    // 3. WebGL Renderer
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
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // 4. Victorian Apothecary Room Background (Floor, Persian Rug, Shelves, Stained Glass, Stairs)
    this.room = createApothecaryRoom();
    this.scene.add(this.room);

    // 5. Build Organized Victorian Curiosity Cabinet
    this.cabinet = createCabinet();
    this.scene.add(this.cabinet);

    // 6. Authentic Cozy Victorian Lighting (Matching Reference Photo)
    this.setupApothecaryLighting();

    // 7. Camera Controller (360° Spherical Orbit)
    this.cameraController = new CameraController(this.camera, this.renderer.domElement);
    this.cameraController.onResize(width, height);

    // 8. Interaction Manager (360° Drag Orbit + Inspection Spin + Raycasting)
    this.interactionManager = new InteractionManager(
      this.camera,
      this.scene,
      this.renderer.domElement,
      this.cameraController,
      (project, bottleObj) => this.handleBottleSelected(project, bottleObj),
      (userData, x, y, visible) => this.onHover(userData, x, y, visible),
      (drawerData, isOpen) => this.onDrawer(drawerData, isOpen)
    );

    // Register Drawers with Raycaster
    if (this.cabinet.userData.drawers) {
      this.cabinet.userData.drawers.forEach(dGroup => {
        this.interactionManager.registerInteractiveObject(dGroup);
      });
    }

    // 9. Populate Cleanly Organized Perfume Bottles on Open Shelves
    this.populateBottles();

    // 10. Golden Floating Dust Particles Drifting in the Warm Light
    this.setupDustParticles();

    // 11. Event Listeners
    window.addEventListener('resize', () => this.onResize());

    // 12. Start Loop
    this.animate();
  }

  setupApothecaryLighting() {
    // A. Warm Room Ambient Base (Rich dark umber shadow foundation)
    const ambientLight = new THREE.AmbientLight(0x382216, 0.9);
    this.scene.add(ambientLight);

    // B. Dramatic Reddish-Amber Sunlight Beam (slanted ray from loft window matching lighting.jpg)
    const sunbeamLight = new THREE.DirectionalLight(0xff9438, 2.3);
    sunbeamLight.position.set(-5.5, 9.5, 4.0);
    sunbeamLight.castShadow = true;
    sunbeamLight.shadow.mapSize.width = 2048;
    sunbeamLight.shadow.mapSize.height = 2048;
    sunbeamLight.shadow.camera.near = 0.5;
    sunbeamLight.shadow.camera.far = 32;
    sunbeamLight.shadow.bias = -0.0006;
    this.scene.add(sunbeamLight);

    // C. Soft Warm Front Key Light for Bottles & Glass Refraction
    const frontKey = new THREE.DirectionalLight(0xffaa48, 1.15);
    frontKey.position.set(2.0, 3.5, 6.0);
    this.scene.add(frontKey);

    // D. Warm Backlight / Rim for Glass Silhouettes & Wood Contours
    const backRim = new THREE.DirectionalLight(0xff7722, 1.1);
    backRim.position.set(-3.5, 3.0, -4.5);
    this.scene.add(backRim);

    // E. Dedicated Shelf Vitrine Point Lights (Gentle warm interior glow on bottles)
    const midShelfGlow = new THREE.PointLight(0xffa843, 1.2, 4.5, 1.8);
    midShelfGlow.position.set(0, 0.4, 0.6);
    this.scene.add(midShelfGlow);

    const upperShelfGlow = new THREE.PointLight(0xff9030, 1.0, 4.0, 1.8);
    upperShelfGlow.position.set(0, 2.1, 0.4);
    this.scene.add(upperShelfGlow);

    // F. Stained Glass Window Subtle Jewel Glow on Left Wall
    const stainedGlassLight = new THREE.PointLight(0x5c7cfa, 0.85, 7.5, 2.0);
    stainedGlassLight.position.set(-7.5, 0.5, -1.8);
    this.scene.add(stainedGlassLight);
  }

  setupDustParticles() {
    const particleCount = 160;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10.0;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10.0;
      speeds[i] = Math.random() * 0.18 + 0.08;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffd28a, // Luminous golden motes
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.dustParticles = new THREE.Points(geometry, material);
    this.dustParticles.userData = { speeds };
    this.scene.add(this.dustParticles);
  }

  populateBottles() {
    PROJECTS_DATA.forEach(project => {
      const bottleGroup = createPerfumeBottle(project);
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

    // Drift golden dust particles
    if (this.dustParticles) {
      const positions = this.dustParticles.geometry.attributes.position.array;
      const speeds = this.dustParticles.userData.speeds;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime * 0.35 + i) * 0.0018 - speeds[i] * 0.0025;
        positions[i * 3] += Math.cos(elapsedTime * 0.25 + i) * 0.0012;

        if (positions[i * 3 + 1] < -3.8) positions[i * 3 + 1] = 4.2;
        if (positions[i * 3] < -5.0) positions[i * 3] = 5.0;
        if (positions[i * 3] > 5.0) positions[i * 3] = -5.0;
      }
      this.dustParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Dynamic cozy candle flame & lantern light flickering
    if (this.room && this.room.userData.lanternLights) {
      this.room.userData.lanternLights.forEach((light, i) => {
        light.intensity = 1.3 + Math.sin(elapsedTime * 4.0 + i * 1.7) * 0.15 + (Math.random() - 0.5) * 0.05;
      });
    }

    const candleLight = this.cabinet.getObjectByName('Candle_Light');
    if (candleLight) {
      candleLight.intensity = 0.85 + Math.sin(elapsedTime * 8.0) * 0.12 + (Math.random() - 0.5) * 0.08;
    }

    const candleFlame = this.cabinet.getObjectByName('Candle_Flame');
    if (candleFlame) {
      candleFlame.scale.y = 1.0 + Math.sin(elapsedTime * 9.0) * 0.15;
      candleFlame.scale.x = 1.0 + Math.cos(elapsedTime * 7.0) * 0.1;
    }

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
