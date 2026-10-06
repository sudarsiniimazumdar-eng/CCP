import * as THREE from 'three';
import gsapModule from 'gsap';

const gsap = (typeof window !== 'undefined' && window.gsap) ? window.gsap : (gsapModule?.gsap || gsapModule);

/**
 * Advanced 360° Spherical Orbit & Inspection Camera Controller
 * Allows free 360° orbital navigation around the curiosity sculpture in Overview Mode,
 * and seamless cinematic focus transitions during Inspection Mode.
 */
export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    // Spherical coordinates for 360° cabinet orbit
    this.spherical = {
      radius: 8.2,
      theta: 0.15, // Horizontal orbit angle (radians)
      phi: Math.PI / 2 - 0.05 // Vertical inclination angle
    };
    this.targetSpherical = { ...this.spherical };
    this.orbitVelocity = { theta: 0, phi: 0 };
    this.targetLookAt = new THREE.Vector3(0, 0.2, 0);
    this.currentLookAt = new THREE.Vector3(0, 0.2, 0);

    // Parallax & state
    this.mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isInspecting = false;
    this.isOrbiting = false;
    this.currentTimeline = null;

    this.initListeners();
  }

  initListeners() {
    window.addEventListener('mousemove', (e) => {
      if (this.isInspecting || this.isOrbiting) return;
      this.mouseParallax.targetX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      this.mouseParallax.targetY = -(e.clientY / window.innerHeight - 0.5) * 0.25;
    });

    // Mobile gyroscope
    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', (e) => {
        if (this.isInspecting || this.isOrbiting || e.gamma === null) return;
        const gamma = Math.max(-25, Math.min(25, e.gamma));
        const beta = Math.max(15, Math.min(65, e.beta));
        this.mouseParallax.targetX = (gamma / 25) * 0.3;
        this.mouseParallax.targetY = -((beta - 40) / 25) * 0.2;
      }, { passive: true });
    }
  }

  /**
   * Apply drag delta to orbit around the cabinet
   */
  addOrbitDelta(deltaX, deltaY) {
    if (this.isInspecting) return;
    this.isOrbiting = true;

    // Horizontal 360° spin
    this.orbitVelocity.theta = -deltaX * 0.006;
    // Vertical tilt clamped between 0.35 and 1.35 radians
    this.orbitVelocity.phi = -deltaY * 0.005;

    this.spherical.theta += this.orbitVelocity.theta;
    this.spherical.phi = Math.max(0.35, Math.min(1.35, this.spherical.phi + this.orbitVelocity.phi));
  }

  endOrbitDrag() {
    this.isOrbiting = false;
  }

  /**
   * Smoothly focus camera on a selected bottle in 3D space
   */
  focusOnBottle(bottleGroup, isMobile = false) {
    this.isInspecting = true;

    if (this.currentTimeline) this.currentTimeline.kill();

    const worldPos = new THREE.Vector3();
    bottleGroup.getWorldPosition(worldPos);

    // Calculate normal vector pointing out from the bottle based on its orientation
    const normal = new THREE.Vector3(0, 0, 1).applyEuler(bottleGroup.rotation);
    if (normal.lengthSq() < 0.1) normal.set(0, 0, 1);
    normal.normalize();

    let targetFocus;
    let targetCameraPos;

    if (isMobile) {
      targetFocus = new THREE.Vector3(worldPos.x, worldPos.y - 0.2, worldPos.z);
      targetCameraPos = new THREE.Vector3()
        .copy(worldPos)
        .addScaledVector(normal, 2.6)
        .add(new THREE.Vector3(0, 0.15, 0));
    } else {
      targetFocus = new THREE.Vector3(worldPos.x, worldPos.y + 0.5, worldPos.z);
      // Offset camera to right of line of sight so bottle sits on left
      const rightVector = new THREE.Vector3(-normal.z, 0, normal.x).normalize();
      targetCameraPos = new THREE.Vector3()
        .copy(worldPos)
        .addScaledVector(normal, 2.4)
        .addScaledVector(rightVector, 0.65)
        .add(new THREE.Vector3(0, 0.5, 0));
    }

    this.currentTimeline = gsap.timeline({ defaults: { duration: 1.35, ease: 'power3.inOut' } });

    this.currentTimeline.to(this.camera.position, {
      x: targetCameraPos.x,
      y: targetCameraPos.y,
      z: targetCameraPos.z,
    }, 0);

    this.currentTimeline.to(this.currentLookAt, {
      x: targetFocus.x,
      y: targetFocus.y,
      z: targetFocus.z,
      onUpdate: () => {
        this.camera.lookAt(this.currentLookAt);
      }
    }, 0);
  }

  /**
   * Reset camera back to 360° Overview Orbit
   */
  resetToOverview(duration = 1.25) {
    this.isInspecting = false;

    if (this.currentTimeline) this.currentTimeline.kill();

    // Compute target Cartesian coordinates from spherical orbit
    const targetX = this.spherical.radius * Math.sin(this.spherical.phi) * Math.sin(this.spherical.theta);
    const targetY = this.spherical.radius * Math.cos(this.spherical.phi);
    const targetZ = this.spherical.radius * Math.sin(this.spherical.phi) * Math.cos(this.spherical.theta);

    this.currentTimeline = gsap.timeline({ defaults: { duration, ease: 'power3.inOut' } });

    this.currentTimeline.to(this.camera.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
    }, 0);

    this.currentTimeline.to(this.currentLookAt, {
      x: this.targetLookAt.x,
      y: this.targetLookAt.y,
      z: this.targetLookAt.z,
      onUpdate: () => {
        this.camera.lookAt(this.currentLookAt);
      }
    }, 0);
  }

  /**
   * Per-frame update for 360° spherical orbit & damping
   */
  update() {
    if (!this.isInspecting) {
      // Damping on orbit velocity
      if (!this.isOrbiting) {
        this.orbitVelocity.theta *= 0.92;
        this.orbitVelocity.phi *= 0.92;
        this.spherical.theta += this.orbitVelocity.theta;
        this.spherical.phi = Math.max(0.35, Math.min(1.35, this.spherical.phi + this.orbitVelocity.phi));

        // Smooth parallax
        this.mouseParallax.x += (this.mouseParallax.targetX - this.mouseParallax.x) * 0.05;
        this.mouseParallax.y += (this.mouseParallax.targetY - this.mouseParallax.y) * 0.05;
      }

      // Convert spherical coordinates to Cartesian camera position
      const sinPhi = Math.sin(this.spherical.phi);
      const cosPhi = Math.cos(this.spherical.phi);
      const sinTheta = Math.sin(this.spherical.theta + this.mouseParallax.x);
      const cosTheta = Math.cos(this.spherical.theta + this.mouseParallax.x);

      this.camera.position.x = this.spherical.radius * sinPhi * sinTheta;
      this.camera.position.y = this.spherical.radius * cosPhi + this.mouseParallax.y;
      this.camera.position.z = this.spherical.radius * sinPhi * cosTheta;

      this.camera.lookAt(this.currentLookAt);
    }
  }

  onResize(width, height) {
    const aspect = width / height;
    this.camera.aspect = aspect;

    if (aspect < 1.0) {
      // Mobile portrait
      this.camera.fov = 58;
      this.spherical.radius = 9.4;
      this.targetLookAt.set(0, 0.1, 0);
    } else {
      // Desktop
      this.camera.fov = 50;
      this.spherical.radius = 8.2;
      this.targetLookAt.set(0, 0.2, 0);
    }

    this.camera.updateProjectionMatrix();
  }
}
