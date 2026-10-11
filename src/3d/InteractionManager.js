import * as THREE from 'three';
import { gsap } from 'gsap';

const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
const animateTo = (target, properties) => {
  if (!prefersReducedMotion) return gsap.to(target, properties);
  gsap.killTweensOf(target);
  Object.entries(properties).forEach(([key, value]) => {
    if (typeof value === 'number') target[key] = value;
  });
  properties.onUpdate?.();
};

/**
 * Advanced 3D Interaction Engine
 * Handles:
 * 1. Overview Mode: 360° Drag-to-Orbit around the entire assemblage cabinet sculpture.
 * 2. Inspection Mode: 360° Drag-to-Rotate on the active focused bottle.
 * 3. Raycasting: Bottle hover previews and click selection.
 */
export class InteractionManager {
  constructor(camera, scene, domElement, cameraController, onSelectBottle, onHoverObject) {
    this.camera = camera;
    this.scene = scene;
    this.domElement = domElement;
    this.cameraController = cameraController;
    this.onSelectBottle = onSelectBottle;
    this.onHoverObject = onHoverObject;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2(-999, -999);
    this.interactiveObjects = [];
    
    this.hoveredObject = null;
    this.selectedObject = null;
    this.isEnabled = true;

    // Pointer Drag Tracking
    this.isPointerDown = false;
    this.isDragging = false;
    this.dragStartPos = { x: 0, y: 0 };
    this.dragStartTime = 0;
    this.previousPointerPos = { x: 0, y: 0 };
    this.bottleRotationVelocity = { x: 0, y: 0 };

    this.initEvents();
  }

  registerInteractiveObject(objectGroup) {
    this.interactiveObjects.push(objectGroup);
  }

  initEvents() {
    // Pointer Events cover mouse, pen, and touch without duplicate legacy touch handlers.
    this.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.domElement.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.domElement.addEventListener('pointercancel', (e) => this.onPointerUp(e));
    this.domElement.addEventListener('keydown', (e) => this.onCanvasKeyDown(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
  }

  onCanvasKeyDown(event) {
    if (!this.isEnabled || event.altKey || event.ctrlKey || event.metaKey) return;
    const orbitStep = 32;
    const orbit = {
      ArrowLeft: [-orbitStep, 0],
      ArrowRight: [orbitStep, 0],
      ArrowUp: [0, -orbitStep],
      ArrowDown: [0, orbitStep]
    }[event.key];

    if (orbit) {
      event.preventDefault();
      this.cameraController?.addOrbitDelta(...orbit);
      this.cameraController?.endOrbitDrag();
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.deselectCurrentObject();
      this.cameraController?.resetToOverview();
      return;
    }

    const bottleGroups = this.interactiveObjects.filter(group => group.userData?.type === 'bottle');
    const projectIndex = event.key === '0' ? 9 : Number(event.key) - 1;
    if (Number.isInteger(projectIndex) && projectIndex >= 0 && projectIndex < bottleGroups.length) {
      event.preventDefault();
      this.selectBottle(bottleGroups[projectIndex]);
    }
  }

  onPointerDown(event) {
    if (!this.isEnabled) return;

    this.domElement.focus({ preventScroll: true });
    if (event.pointerId !== undefined) this.domElement.setPointerCapture?.(event.pointerId);

    this.isPointerDown = true;
    this.isDragging = false;
    this.dragStartPos = { x: event.clientX, y: event.clientY };
    this.previousPointerPos = { x: event.clientX, y: event.clientY };
    this.dragStartTime = Date.now();

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (this.selectedObject) {
      this.domElement.style.cursor = 'grabbing';
    }
  }

  onPointerMove(event) {
    if (!this.isEnabled) return;

    const currentPos = { x: event.clientX, y: event.clientY };
    const deltaX = currentPos.x - this.previousPointerPos.x;
    const deltaY = currentPos.y - this.previousPointerPos.y;
    const moveDist = Math.hypot(currentPos.x - this.dragStartPos.x, currentPos.y - this.dragStartPos.y);

    if (this.isPointerDown && moveDist > 6) {
      this.isDragging = true;
    }

    if (this.isDragging) {
      if (this.selectedObject && this.selectedObject.userData.type === 'bottle') {
        // Mode A: Inspection Mode -> Spin individual bottle in 360°
        this.bottleRotationVelocity.y = deltaX * 0.009;
        this.bottleRotationVelocity.x = deltaY * 0.007;

        this.selectedObject.rotation.y += this.bottleRotationVelocity.y;
        this.selectedObject.rotation.x = Math.max(-0.45, Math.min(0.45, this.selectedObject.rotation.x + this.bottleRotationVelocity.x));
      } else {
        // Mode B: Overview Mode -> 360° Orbit around the entire assemblage cabinet!
        if (this.cameraController) {
          this.cameraController.addOrbitDelta(deltaX, deltaY);
        }
        this.domElement.style.cursor = 'grabbing';
      }

      this.previousPointerPos = { x: currentPos.x, y: currentPos.y };
      return;
    }

    this.previousPointerPos = { x: currentPos.x, y: currentPos.y };
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.checkHover(event.clientX, event.clientY);
  }

  onPointerUp(event) {
    if (!this.isPointerDown) return;

    const elapsed = Date.now() - this.dragStartTime;
    const moveDist = Math.hypot(
      (event.clientX || this.previousPointerPos.x) - this.dragStartPos.x,
      (event.clientY || this.previousPointerPos.y) - this.dragStartPos.y
    );

    this.isPointerDown = false;
    if (prefersReducedMotion) {
      this.bottleRotationVelocity.x = 0;
      this.bottleRotationVelocity.y = 0;
    }

    if (this.cameraController) {
      this.cameraController.endOrbitDrag();
    }

    // If it was a click/tap (not a long drag), perform raycast selection
    if (event.type !== 'pointercancel' && !this.isDragging && elapsed < 350 && moveDist < 12) {
      this.performRaycastClick();
    }

    this.isDragging = false;
    if (this.selectedObject) {
      this.domElement.style.cursor = 'grab';
    } else {
      this.domElement.style.cursor = 'default';
    }
  }

  checkHover(screenX, screenY) {
    if (this.selectedObject || this.isDragging || this.isPointerDown) return;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    
    const candidateMeshes = [];
    this.interactiveObjects.forEach(group => {
      group.traverse(child => {
        if (child.isMesh) {
          child.userData.parentGroup = group;
          candidateMeshes.push(child);
        }
      });
    });

    const intersects = this.raycaster.intersectObjects(candidateMeshes, false);

    if (intersects.length > 0) {
      const hitGroup = intersects[0].object.userData.parentGroup || intersects[0].object;
      
      if (this.hoveredObject !== hitGroup) {
        this.onHoverExit();
        this.onHoverEnter(hitGroup, screenX, screenY);
      } else if (this.hoveredObject) {
        if (this.onHoverObject) {
          this.onHoverObject(this.hoveredObject.userData, screenX, screenY, true);
        }
      }
    } else {
      if (this.hoveredObject) {
        this.onHoverExit();
      }
    }
  }

  onHoverEnter(objectGroup, screenX, screenY) {
    this.hoveredObject = objectGroup;
    this.domElement.style.cursor = 'pointer';

    const type = objectGroup.userData.type;

    if (type === 'bottle') {
      const basePos = objectGroup.userData.basePosition;
      gsap.killTweensOf(objectGroup.position);
      gsap.killTweensOf(objectGroup.rotation);

      // Lift bottle off shelf
      animateTo(objectGroup.position, {
        y: basePos.y + 0.15,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
    // wallframe — cursor already set to pointer above, no 3D animation needed

    if (this.onHoverObject) {
      this.onHoverObject(objectGroup.userData, screenX, screenY, true);
    }
  }

  onHoverExit() {
    if (!this.hoveredObject) return;
    
    const obj = this.hoveredObject;
    this.hoveredObject = null;
    this.domElement.style.cursor = 'default';

    if (this.selectedObject !== obj) {
      const type = obj.userData.type;
      const basePos = obj.userData.basePosition;
      const baseRot = obj.userData.baseRotation;

      if (type === 'bottle') {
        gsap.killTweensOf(obj.position);
        gsap.killTweensOf(obj.rotation);

        animateTo(obj.position, {
          x: basePos.x,
          y: basePos.y,
          z: basePos.z,
          duration: 0.45,
          ease: 'power2.inOut'
        });

        animateTo(obj.rotation, {
          x: baseRot.x,
          y: baseRot.y,
          z: baseRot.z,
          duration: 0.45,
          ease: 'power2.inOut'
        });
      }
    }

    if (this.onHoverObject) {
      this.onHoverObject(null, 0, 0, false);
    }
  }

  performRaycastClick() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const candidateMeshes = [];
    this.interactiveObjects.forEach(group => {
      group.traverse(child => {
        if (child.isMesh) {
          child.userData.parentGroup = group;
          candidateMeshes.push(child);
        }
      });
    });

    const intersects = this.raycaster.intersectObjects(candidateMeshes, false);

    if (intersects.length > 0) {
      const hitGroup = intersects[0].object.userData.parentGroup || intersects[0].object;
      
      if (hitGroup.userData.type === 'bottle') {
        this.selectBottle(hitGroup);
      }
    }
  }

  selectBottle(bottleGroup) {
    this.onHoverExit();
    this.selectedObject = bottleGroup;
    this.domElement.style.cursor = 'grab';

    const basePos = bottleGroup.userData.basePosition;
    gsap.killTweensOf(bottleGroup.position);
    gsap.killTweensOf(bottleGroup.rotation);

    // Lift and bring slightly forward for inspection
    animateTo(bottleGroup.position, {
      y: basePos.y + 0.18,
      duration: 0.9,
      ease: 'power3.out'
    });

    if (this.onSelectBottle) {
      this.onSelectBottle(bottleGroup.userData.projectData, bottleGroup);
    }
  }

  deselectCurrentObject() {
    if (this.selectedObject) {
      const obj = this.selectedObject;
      const basePos = obj.userData.basePosition;
      const baseRot = obj.userData.baseRotation;
      
      gsap.killTweensOf(obj.position);
      gsap.killTweensOf(obj.rotation);

      animateTo(obj.position, {
        x: basePos.x,
        y: basePos.y,
        z: basePos.z,
        duration: 0.8,
        ease: 'power3.inOut'
      });

      animateTo(obj.rotation, {
        x: baseRot.x,
        y: baseRot.y,
        z: baseRot.z,
        duration: 0.8,
        ease: 'power3.inOut'
      });

      this.selectedObject = null;
      this.domElement.style.cursor = 'default';
    }
  }

  update() {
    if (!this.isDragging && this.selectedObject && this.selectedObject.userData.type === 'bottle') {
      this.bottleRotationVelocity.x *= 0.92;
      this.bottleRotationVelocity.y *= 0.92;

      if (Math.abs(this.bottleRotationVelocity.x) > 0.0001 || Math.abs(this.bottleRotationVelocity.y) > 0.0001) {
        this.selectedObject.rotation.y += this.bottleRotationVelocity.y;
        this.selectedObject.rotation.x = Math.max(-0.45, Math.min(0.45, this.selectedObject.rotation.x + this.bottleRotationVelocity.x));
      }
    }
  }

  selectProjectById(projectId) {
    const targetGroup = this.interactiveObjects.find(
      obj => obj.userData?.type === 'bottle' && obj.userData?.projectData?.id === projectId
    );
    if (targetGroup) {
      this.selectBottle(targetGroup);
    }
  }
}
