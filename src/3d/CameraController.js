import * as THREE from 'three';
import gsapModule from 'gsap';

const gsap = (typeof window !== 'undefined' && window.gsap) ? window.gsap : (gsapModule?.gsap || gsapModule);

/**
 * GSAP-Powered Camera Controller with Dynamic Responsive Framing
 * Calculates precise optical bounds for desktop, tablets, and tall portrait mobile screens.
 */
export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    // Default Overview Camera coordinates
    this.defaultPos = new THREE.Vector3(0, 0, 8.0);
    this.defaultTarget = new THREE.Vector3(0, 0, 0);

    // Current animation targets
    this.targetPos = this.defaultPos.clone();
    this.lookAtTarget = this.defaultTarget.clone();

    // Mouse & Gyro parallax offsets
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isInspecting = false;
    this.currentTimeline = null;

    this.initParallaxListeners();
  }

  initParallaxListeners() {
    window.addEventListener('mousemove', (e) => {
      if (this.isInspecting) return;
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.7;
      this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    });

    // Mobile device orientation (subtle gyroscope tilt if supported)
    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', (e) => {
        if (this.isInspecting || e.gamma === null) return;
        // Clamp tilt angle
        const gamma = Math.max(-25, Math.min(25, e.gamma)); // Left/Right
        const beta = Math.max(10, Math.min(60, e.beta));     // Forward/Back
        this.mouse.targetX = (gamma / 25) * 0.4;
        this.mouse.targetY = -((beta - 35) / 25) * 0.25;
      }, { passive: true });
    }
  }

  /**
   * Smoothly focus camera on a selected 3D bottle object.
   * Desktop: Offsets camera so bottle sits in left half while preview drawer opens on right.
   * Mobile: Offsets camera so bottle sits in upper half above the bottom sheet.
   */
  focusOnBottle(bottleGroup, isMobile = false) {
    this.isInspecting = true;

    if (this.currentTimeline) this.currentTimeline.kill();

    const worldPos = new THREE.Vector3();
    bottleGroup.getWorldPosition(worldPos);

    let targetFocus;
    let targetCameraPos;

    if (isMobile) {
      // Focus slightly below center so bottle floats in the upper 40% viewport
      targetFocus = new THREE.Vector3(worldPos.x, worldPos.y - 0.25, worldPos.z);
      targetCameraPos = new THREE.Vector3(
        worldPos.x,
        worldPos.y + 0.15,
        worldPos.z + 2.9
      );
    } else {
      // Focus centered, offset camera to right
      targetFocus = new THREE.Vector3(worldPos.x, worldPos.y + 0.65, worldPos.z);
      targetCameraPos = new THREE.Vector3(
        worldPos.x + 0.72,
        worldPos.y + 0.65,
        worldPos.z + 2.5
      );
    }

    this.currentTimeline = gsap.timeline({ defaults: { duration: 1.3, ease: 'power3.inOut' } });

    this.currentTimeline.to(this.camera.position, {
      x: targetCameraPos.x,
      y: targetCameraPos.y,
      z: targetCameraPos.z,
    }, 0);

    this.currentTimeline.to(this.lookAtTarget, {
      x: targetFocus.x,
      y: targetFocus.y,
      z: targetFocus.z,
      onUpdate: () => {
        this.camera.lookAt(this.lookAtTarget);
      }
    }, 0);
  }

  /**
   * Reset camera back to Full Cabinet Overview
   */
  resetToOverview(duration = 1.2) {
    this.isInspecting = false;

    if (this.currentTimeline) this.currentTimeline.kill();

    this.currentTimeline = gsap.timeline({ defaults: { duration, ease: 'power3.inOut' } });

    this.currentTimeline.to(this.camera.position, {
      x: this.defaultPos.x,
      y: this.defaultPos.y,
      z: this.defaultPos.z,
    }, 0);

    this.currentTimeline.to(this.lookAtTarget, {
      x: this.defaultTarget.x,
      y: this.defaultTarget.y,
      z: this.defaultTarget.z,
      onUpdate: () => {
        this.camera.lookAt(this.lookAtTarget);
      }
    }, 0);
  }

  /**
   * Per-frame update for smooth mouse/gyro parallax
   */
  update() {
    if (!this.isInspecting) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      this.camera.position.x = this.defaultPos.x + this.mouse.x;
      this.camera.position.y = this.defaultPos.y + this.mouse.y;
      this.camera.lookAt(this.lookAtTarget);
    }
  }

  /**
   * Responsive resize calculation: computes exact bounding distance to guarantee full cabinet visibility
   */
  onResize(width, height) {
    const aspect = width / height;
    this.camera.aspect = aspect;

    const cabinetWidth = 8.4;
    const cabinetHeight = 7.6;

    if (aspect < 1.0) {
      // Portrait mobile & narrow tablet
      this.camera.fov = 62;
      const fovRad = (this.camera.fov * Math.PI) / 180;
      
      const distFromHeight = (cabinetHeight / 2) / Math.tan(fovRad / 2);
      const distFromWidth = (cabinetWidth / 2) / (Math.tan(fovRad / 2) * aspect);
      
      this.defaultPos.z = Math.max(distFromHeight, distFromWidth) * 1.06;
      this.defaultPos.y = 0.15;
      this.defaultTarget.set(0, 0.1, 0);
    } else {
      // Landscape Desktop
      this.camera.fov = 50;
      this.defaultPos.z = 8.0;
      this.defaultPos.y = 0;
      this.defaultTarget.set(0, 0, 0);
    }

    if (!this.isInspecting) {
      this.camera.position.z = this.defaultPos.z;
      this.camera.position.y = this.defaultPos.y;
    }

    this.camera.updateProjectionMatrix();
  }
}
