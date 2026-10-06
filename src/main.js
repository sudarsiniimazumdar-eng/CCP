import { SceneManager } from './3d/SceneManager.js';
import { UIManager } from './ui/UIManager.js';

/**
 * Main Application Bootstrap
 */
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('webgl-container');
  let sceneManager = null;
  let uiManager = null;

  // Initialize UI Manager
  uiManager = new UIManager({
    onResetCabinet: () => {
      if (sceneManager) sceneManager.resetView();
    },
    onSelectProjectFrom2D: (projectId) => {
      if (sceneManager) sceneManager.selectProjectById(projectId);
    }
  });

  // Initialize 3D Scene Manager
  try {
    sceneManager = new SceneManager(
      container,
      // onSelect Bottle Callback
      (project) => {
        uiManager.openProjectPreview(project);
      },
      // onHover Object Callback
      (userData, screenX, screenY, visible) => {
        uiManager.updateTooltip(userData, screenX, screenY, visible);
      },
      // onOpen Drawer Callback
      (drawerData, isOpen) => {
        uiManager.openDrawerModal(drawerData, isOpen);
      }
    );

    // Initial load fade-out
    setTimeout(() => {
      uiManager.hideLoadingScreen();
    }, 450);

  } catch (error) {
    console.error('Failed to initialize 3D Scene:', error);
    const loaderStatus = document.querySelector('.loader-status');
    if (loaderStatus) {
      loaderStatus.innerHTML = `
        <span>Initialization error: ${error.message || error}</span>
        <br/><br/>
        <button id="fallback-catalogue-btn" class="cta-button" style="margin-top: 1rem; max-width: 280px;">Open Catalogue View →</button>
      `;
      document.getElementById('fallback-catalogue-btn')?.addEventListener('click', () => {
        uiManager.hideLoadingScreen();
        uiManager.openCatalogueOverlay();
      });
    }
  }
});
