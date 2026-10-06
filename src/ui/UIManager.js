import { PROJECTS_DATA } from '../data/projects.js';

/**
 * 2D DOM UI Layer Controller
 * Manages tactile slide-in preview drawers, conventional 2D catalogue, drawer archive sheets, and 3D tooltips.
 */
export class UIManager {
  constructor({ onResetCabinet, onSelectProjectFrom2D }) {
    this.onResetCabinet = onResetCabinet;
    this.onSelectProjectFrom2D = onSelectProjectFrom2D;

    // Project Preview Drawer Elements
    this.drawerEl = document.getElementById('project-drawer');
    this.drawerNumberEl = document.getElementById('drawer-number');
    this.drawerTitleEl = document.getElementById('drawer-title');
    this.drawerCategoryEl = document.getElementById('drawer-category');
    this.drawerTaglineEl = document.getElementById('drawer-tagline');
    this.drawerSummaryEl = document.getElementById('drawer-summary');
    this.drawerTagsEl = document.getElementById('drawer-tags');
    this.drawerStatsEl = document.getElementById('drawer-stats');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');
    this.drawerBackBtn = document.getElementById('drawer-back-btn');
    this.drawerCtaBtn = document.getElementById('drawer-cta-btn');

    // 3D Hover Tooltip
    this.tooltipEl = document.getElementById('hover-tooltip');
    this.tooltipNumberEl = document.getElementById('tooltip-number');
    this.tooltipTitleEl = document.getElementById('tooltip-title');
    this.tooltipCategoryEl = document.getElementById('tooltip-category');

    // Drag-to-Rotate Inspection Cue Badge
    this.rotateCueEl = document.getElementById('rotate-cue');

    // Apothecary Drawer Specimen Modal
    this.drawerModalEl = document.getElementById('drawer-modal');
    this.drawerModalLabelEl = document.getElementById('drawer-modal-label');
    this.drawerModalTitleEl = document.getElementById('drawer-modal-title');
    this.drawerModalContentEl = document.getElementById('drawer-modal-content');
    this.drawerModalCloseBtn = document.getElementById('drawer-modal-close');

    // 2D Catalogue Overlay
    this.catalogueOverlay = document.getElementById('catalogue-overlay');
    this.catalogueGrid = document.getElementById('catalogue-grid');

    // Info Modal
    this.infoModal = document.getElementById('info-modal');
    this.infoModalClose = document.getElementById('info-modal-close');

    // Nav Buttons
    this.navCabinetBtn = document.getElementById('nav-cabinet');
    this.navCatalogueBtn = document.getElementById('nav-catalogue');
    this.navAboutBtn = document.getElementById('nav-about');

    this.interactionHint = document.getElementById('interaction-hint');
    this.loadingScreen = document.getElementById('loading-screen');

    this.currentActiveProjectId = null;

    this.init();
  }

  init() {
    this.setupListeners();
    this.renderCatalogueGrid();
  }

  setupListeners() {
    this.drawerCloseBtn?.addEventListener('click', () => this.closePreviewDrawer());
    this.drawerBackBtn?.addEventListener('click', () => this.closePreviewDrawer());

    this.drawerCtaBtn?.addEventListener('click', () => {
      alert(`[Apothecary Archive]\nFull preserved case study for "${this.drawerTitleEl.innerText}" will be loaded in Phase 3.`);
    });

    this.drawerModalCloseBtn?.addEventListener('click', () => {
      this.closeDrawerModal();
    });

    this.navCabinetBtn?.addEventListener('click', () => {
      this.closeCatalogueOverlay();
      this.closePreviewDrawer();
      this.closeDrawerModal();
      this.setActiveNav('cabinet');
    });

    this.navCatalogueBtn?.addEventListener('click', () => {
      this.openCatalogueOverlay();
      this.setActiveNav('catalogue');
    });

    this.navAboutBtn?.addEventListener('click', () => {
      this.openInfoModal();
    });

    this.infoModalClose?.addEventListener('click', () => {
      this.closeInfoModal();
    });

    this.infoModal?.addEventListener('click', (e) => {
      if (e.target === this.infoModal) this.closeInfoModal();
    });

    this.drawerModalEl?.addEventListener('click', (e) => {
      if (e.target === this.drawerModalEl) this.closeDrawerModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.drawerModalEl?.classList.contains('open')) {
          this.closeDrawerModal();
        } else if (this.infoModal?.classList.contains('open')) {
          this.closeInfoModal();
        } else if (this.catalogueOverlay?.classList.contains('open')) {
          this.closeCatalogueOverlay();
          this.setActiveNav('cabinet');
        } else if (this.drawerEl?.classList.contains('open')) {
          this.closePreviewDrawer();
        }
      }
    });
  }

  setActiveNav(viewName) {
    this.navCabinetBtn?.classList.toggle('active', viewName === 'cabinet');
    this.navCatalogueBtn?.classList.toggle('active', viewName === 'catalogue');
  }

  renderCatalogueGrid() {
    if (!this.catalogueGrid) return;
    this.catalogueGrid.innerHTML = '';

    PROJECTS_DATA.forEach(project => {
      const card = document.createElement('div');
      card.className = 'catalogue-card';
      card.innerHTML = `
        <div>
          <span class="card-number">${project.placement.labelNumber}</span>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-cat">${project.category} · ${project.year}</p>
        </div>
        <p class="card-summary">${project.summary}</p>
        <div class="card-action">
          <span>Inspect Elixir in Cabinet</span>
          <span>→</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.closeCatalogueOverlay();
        this.setActiveNav('cabinet');
        if (this.onSelectProjectFrom2D) {
          this.onSelectProjectFrom2D(project.id);
        }
      });

      this.catalogueGrid.appendChild(card);
    });
  }

  /**
   * Hover Tooltip Updates
   */
  updateTooltip(userData, screenX, screenY, visible) {
    if (!this.tooltipEl) return;

    if (!visible || !userData) {
      this.tooltipEl.classList.remove('visible');
      return;
    }

    if (userData.type === 'bottle') {
      const project = userData.projectData;
      this.tooltipNumberEl.innerText = project.placement.labelNumber || 'N° 01';
      this.tooltipTitleEl.innerText = project.title;
      this.tooltipCategoryEl.innerText = project.category;
    } else if (userData.type === 'drawer') {
      const dData = userData.drawerData;
      this.tooltipNumberEl.innerText = dData.label;
      this.tooltipTitleEl.innerText = dData.title;
      this.tooltipCategoryEl.innerText = 'Pull to inspect drawer archive';
    }

    const clampedX = Math.min(Math.max(screenX, 120), window.innerWidth - 120);
    const clampedY = Math.max(screenY, 80);

    this.tooltipEl.style.left = `${clampedX}px`;
    this.tooltipEl.style.top = `${clampedY}px`;
    this.tooltipEl.classList.add('visible');
  }

  /**
   * Open Bottle Preview Drawer & Enable Rotate Cue
   */
  openProjectPreview(project) {
    this.currentActiveProjectId = project.id;

    this.drawerNumberEl.innerText = project.placement.labelNumber;
    this.drawerTitleEl.innerText = project.title;
    this.drawerCategoryEl.innerText = `${project.category} · ${project.year}`;
    this.drawerTaglineEl.innerText = project.tagline;
    this.drawerSummaryEl.innerText = project.summary;

    this.drawerTagsEl.innerHTML = '';
    project.tags?.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag-badge';
      span.innerText = tag;
      this.drawerTagsEl.appendChild(span);
    });

    this.drawerStatsEl.innerHTML = '';
    project.stats?.forEach(stat => {
      const statDiv = document.createElement('div');
      statDiv.className = 'stat-item';
      statDiv.innerHTML = `
        <span class="stat-label">${stat.label}</span>
        <span class="stat-value">${stat.value}</span>
      `;
      this.drawerStatsEl.appendChild(statDiv);
    });

    this.interactionHint?.classList.add('hidden');
    this.rotateCueEl?.classList.add('visible');
    this.drawerEl?.classList.add('open');
  }

  closePreviewDrawer() {
    this.drawerEl?.classList.remove('open');
    this.rotateCueEl?.classList.remove('visible');
    this.currentActiveProjectId = null;
    this.interactionHint?.classList.remove('hidden');

    if (this.onResetCabinet) {
      this.onResetCabinet();
    }
  }

  /**
   * Handle Drawer Open / Close
   */
  openDrawerModal(drawerData, isOpen) {
    if (!isOpen) {
      this.closeDrawerModal();
      return;
    }

    if (this.drawerModalLabelEl) this.drawerModalLabelEl.innerText = drawerData.label;
    if (this.drawerModalTitleEl) this.drawerModalTitleEl.innerText = drawerData.title;
    if (this.drawerModalContentEl) this.drawerModalContentEl.innerText = drawerData.content;

    this.drawerModalEl?.classList.add('open');
    this.interactionHint?.classList.add('hidden');
  }

  closeDrawerModal() {
    this.drawerModalEl?.classList.remove('open');
    if (!this.drawerEl?.classList.contains('open')) {
      this.interactionHint?.classList.remove('hidden');
    }
    if (this.onResetCabinet) {
      this.onResetCabinet();
    }
  }

  openCatalogueOverlay() {
    this.catalogueOverlay?.classList.add('open');
    this.interactionHint?.classList.add('hidden');
  }

  closeCatalogueOverlay() {
    this.catalogueOverlay?.classList.remove('open');
    if (!this.drawerEl?.classList.contains('open')) {
      this.interactionHint?.classList.remove('hidden');
    }
  }

  openInfoModal() {
    this.infoModal?.classList.add('open');
  }

  closeInfoModal() {
    this.infoModal?.classList.remove('open');
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        if (this.loadingScreen) this.loadingScreen.style.display = 'none';
      }, 750);
    }
  }
}
