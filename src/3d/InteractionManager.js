import * as THREE from 'three';
import gsapModule from 'gsap';

const gsap = (typeof window !== 'undefined' && window.gsap) ? window.gsap : (gsapModule?.gsap || gsapModule);

/**
 * Advanced 3D Interaction Engine
 * Handles:
 * 1. Overview Mode: 360° Drag-to-Orbit around the entire assemblage cabinet sculpture.
 * 2. Inspection Mode: 360° Drag-to-Rotate on the active focused bottle.
 * 3. Raycasting: Hover elevation, tooltips, click selection on bottles & drawers.
 */
export class InteractionManager {
  constructor(camera, scene, domElement, cameraController, onSelectBottle, onHoverObject, onOpenDrawer) {
    this.camera = camera;
    this.scene = scene;
    this.domElement = domElement;
    this.cameraController = cameraController;
    this.onSelectBottle = onSelectBottle;
    this.onHoverObject = onHoverObject;
    this.onOpenDrawer = onOpenDrawer;

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
    // Mouse
    this.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.domElement.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));

    // Touch Support
    this.domElement.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.onPointerDown({ clientX: touch.clientX, clientY: touch.clientY, pointerType: 'touch' });
      }
    }, { passive: true });

    this.domElement.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.onPointerMove({ clientX: touch.clientX, clientY: touch.clientY, pointerType: 'touch' });
      }
    }, { passive: true });

    this.domElement.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0] || { clientX: this.previousPointerPos.x, clientY: this.previousPointerPos.y };
      this.onPointerUp({ clientX: touch.clientX, clientY: touch.clientY, pointerType: 'touch' });
    }, { passive: true });
  }

  onPointerDown(event) {
    if (!this.isEnabled) return;

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

    if (this.cameraController) {
      this.cameraController.endOrbitDrag();
    }

    // If it was a click/tap (not a long drag), perform raycast selection
    if (!this.isDragging && elapsed < 350 && moveDist < 12) {
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
      gsap.to(objectGroup.position, {
        y: basePos.y + 0.15,
        duration: 0.35,
        ease: 'power2.out'
      });
    } else if (type === 'drawer') {
      if (!objectGroup.userData.isOpen) {
        gsap.to(objectGroup.position, {
          z: objectGroup.userData.basePosition.z + 0.08,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }

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

        gsap.to(obj.position, {
          x: basePos.x,
          y: basePos.y,
          z: basePos.z,
          duration: 0.45,
          ease: 'power2.inOut'
        });

        gsap.to(obj.rotation, {
          x: baseRot.x,
          y: baseRot.y,
          z: baseRot.z,
          duration: 0.45,
          ease: 'power2.inOut'
        });
      } else if (type === 'drawer') {
        if (!obj.userData.isOpen) {
          gsap.to(obj.position, {
            z: basePos.z,
            duration: 0.3,
            ease: 'power2.inOut'
          });
        }
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
      } else if (hitGroup.userData.type === 'drawer') {
        this.toggleDrawer(hitGroup);
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
    gsap.to(bottleGroup.position, {
      y: basePos.y + 0.18,
      duration: 0.9,
      ease: 'power3.out'
    });

    if (this.onSelectBottle) {
      this.onSelectBottle(bottleGroup.userData.projectData, bottleGroup);
    }
  }

  toggleDrawer(drawerGroup) {
    const dData = drawerGroup.userData;
    dData.isOpen = !dData.isOpen;

    const targetZ = dData.isOpen ? dData.basePosition.z + dData.openZOffset : dData.basePosition.z;

    gsap.killTweensOf(drawerGroup.position);
    gsap.to(drawerGroup.position, {
      z: targetZ,
      duration: 0.7,
      ease: 'power2.inOut'
    });

    if (this.onOpenDrawer) {
      this.onOpenDrawer(dData.drawerData, dData.isOpen);
    }
  }

  closeAllDrawers() {
    this.interactiveObjects.forEach(group => {
      if (group.userData.type === 'drawer' && group.userData.isOpen) {
        group.userData.isOpen = false;
        gsap.to(group.position, {
          z: group.userData.basePosition.z,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      }
    });
  }

  deselectCurrentObject() {
    if (this.selectedObject) {
      const obj = this.selectedObject;
      const basePos = obj.userData.basePosition;
      const baseRot = obj.userData.baseRotation;
      
      gsap.killTweensOf(obj.position);
      gsap.killTweensOf(obj.rotation);

      gsap.to(obj.position, {
        x: basePos.x,
        y: basePos.y,
        z: basePos.z,
        duration: 0.8,
        ease: 'power3.inOut'
      });

      gsap.to(obj.rotation, {
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
