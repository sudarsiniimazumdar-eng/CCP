import { UIManager } from './ui/UIManager.js';

/**
 * Main Application Bootstrap
 */
window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('webgl-container');
  const requestedMode = new URLSearchParams(window.location.search).get('mode');
  const mode = ['gamified', 'recruiter'].includes(requestedMode) ? requestedMode : null;
  if (mode) document.body.classList.add(`mode-${mode}`);
  if (!mode) return;

  let sceneManager = null;
  let uiManager = null;

  const showProjectsFallback = (message) => {
    const loader = document.getElementById('loading-screen');
    const loaderStatus = document.querySelector('.loader-status');
    if (loader) {
      loader.style.display = 'flex';
      loader.classList.remove('fade-out');
    }
    if (!loaderStatus) return;

    const messageEl = document.createElement('span');
    messageEl.textContent = message;
    const button = document.createElement('button');
    button.id = 'fallback-catalogue-btn';
    button.className = 'cta-button';
    button.innerHTML = 'Open Projects <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h7l2 2h9v12H3z"/><path d="M3 10h18"/></svg>';
    button.style.marginTop = '1rem';
    button.style.maxWidth = '280px';
    button.addEventListener('click', () => {
      uiManager.hideLoadingScreen();
      uiManager.openCatalogueOverlay();
    });
    loaderStatus.replaceChildren(messageEl, document.createElement('br'), document.createElement('br'), button);
    button.focus();
  };

  // Initialize UI Manager
  uiManager = new UIManager({
    onResetCabinet: () => {
      if (sceneManager) sceneManager.resetView();
    },
    onSelectProjectFrom2D: (projectId) => {
      if (sceneManager) sceneManager.selectProjectById(projectId);
    }
  });

  if (mode === 'recruiter') {
    uiManager.openCatalogueOverlay();
    uiManager.setActiveNav('catalogue');
    uiManager.hideLoadingScreen();
    return;
  }

  // Initialize 3D Scene Manager only for the immersive portfolio mode.
  try {
    const { SceneManager } = await import('./3d/SceneManager.js');
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
      () => {
        sceneManager?.dispose();
        sceneManager = null;
        showProjectsFallback('The 3D view is unavailable. You can still browse all projects and case studies.');
      }
    );

    // Initial load fade-out
    setTimeout(() => {
      uiManager.hideLoadingScreen();
    }, 450);

  } catch (error) {
    console.error('Failed to initialize 3D Scene:', error);
    showProjectsFallback('The 3D view could not start. You can still browse all projects and case studies.');
  }
});
