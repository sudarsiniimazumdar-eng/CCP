import { PROJECTS_DATA, PORTFOLIO_SECTIONS } from '../data/projects.js';

/**
 * 2D DOM UI Layer Controller (Phase 2)
 * Manages preview drawer, full project case study modal, catalogue overlay,
 * section modals (Skills, Process, Ideas, About, Contact), and accessibility controls.
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

    // Full Case Study Modal Elements
    this.projectModal = document.getElementById('project-modal');
    this.modalProjectNumber = document.getElementById('modal-project-number');
    this.modalProjectCategory = document.getElementById('modal-project-category');
    this.modalProjectTitle = document.getElementById('modal-project-title');
    this.modalProjectTagline = document.getElementById('modal-project-tagline');
    this.modalProjectStats = document.getElementById('modal-project-stats');
    this.modalProjectProblem = document.getElementById('modal-project-problem');
    this.modalProjectDid = document.getElementById('modal-project-did');
    this.modalProjectMade = document.getElementById('modal-project-made');
    this.modalProjectMatters = document.getElementById('modal-project-matters');
    this.modalProjectDesc = document.getElementById('modal-project-desc');
    this.modalProjectChallenge = document.getElementById('modal-project-challenge');
    this.modalProjectProcess = document.getElementById('modal-project-process');
    this.modalProjectInsights = document.getElementById('modal-project-insights');
    this.modalProjectOutcomes = document.getElementById('modal-project-outcomes');
    this.modalProjectTags = document.getElementById('modal-project-tags');
    this.modalProjectClose = document.getElementById('modal-project-close');
    this.modalReturnCabinet = document.getElementById('modal-return-cabinet');
    this.modalPrevBtn = document.getElementById('modal-prev-btn');
    this.modalNextBtn = document.getElementById('modal-next-btn');

    // 3D Hover Tooltip
    this.tooltipEl = document.getElementById('hover-tooltip');
    this.tooltipNumberEl = document.getElementById('tooltip-number');
    this.tooltipTitleEl = document.getElementById('tooltip-title');
    this.tooltipCategoryEl = document.getElementById('tooltip-category');

    // Drag-to-Rotate Inspection Cue Badge
    this.rotateCueEl = document.getElementById('rotate-cue');

    this.modalExternalLink = document.getElementById('modal-external-link');

    // 2D Catalogue Overlay
    this.catalogueOverlay = document.getElementById('catalogue-overlay');
    this.catalogueGrid = document.getElementById('catalogue-grid');
    this.catalogueCloseBtn = document.getElementById('catalogue-close-btn');

    // Section Modals
    this.skillsModal = document.getElementById('skills-modal');
    this.skillsContent = document.getElementById('skills-content');
    this.skillsCloseBtn = document.getElementById('skills-close-btn');
    this.skillsReturnBtn = document.getElementById('skills-return-btn');

    this.processModal = document.getElementById('process-modal');
    this.processContent = document.getElementById('process-content');
    this.processCloseBtn = document.getElementById('process-close-btn');
    this.processReturnBtn = document.getElementById('process-return-btn');

    this.ideasModal = document.getElementById('ideas-modal');
    this.ideasContent = document.getElementById('ideas-content');
    this.ideasCloseBtn = document.getElementById('ideas-close-btn');
    this.ideasReturnBtn = document.getElementById('ideas-return-btn');

    this.infoModal = document.getElementById('info-modal');
    this.aboutContent = document.getElementById('about-content');
    this.infoModalClose = document.getElementById('info-modal-close');
    this.aboutReturnBtn = document.getElementById('about-return-btn');

    this.contactModal = document.getElementById('contact-modal');
    this.contactContent = document.getElementById('contact-content');
    this.contactCloseBtn = document.getElementById('contact-close-btn');
    this.contactReturnBtn = document.getElementById('contact-return-btn');

    // Navigation Buttons
    this.navCabinetBtn = document.getElementById('nav-cabinet');
    this.navCatalogueBtn = document.getElementById('nav-catalogue');
    this.navSkillsBtn = document.getElementById('nav-skills');
    this.navProcessBtn = document.getElementById('nav-process');
    this.navIdeasBtn = document.getElementById('nav-ideas');
    this.navAboutBtn = document.getElementById('nav-about');
    this.navContactBtn = document.getElementById('nav-contact');

    this.interactionHint = document.getElementById('interaction-hint');
    this.loadingScreen = document.getElementById('loading-screen');

    this.currentActiveProject = null;
    this.dialogReturnFocus = new WeakMap();
    if (document.body.classList.contains('mode-recruiter')) {
      if (this.aboutReturnBtn) this.aboutReturnBtn.textContent = 'Return to Projects';
      if (this.contactReturnBtn) this.contactReturnBtn.textContent = 'Return to Projects';
    }

    this.init();
  }

  init() {
    this.setupListeners();
    this.renderCatalogueGrid();
    this.populateSectionContents();
  }

  setupListeners() {
    // Project Preview Drawer Controls
    this.drawerCloseBtn?.addEventListener('click', () => this.closePreviewDrawer());
    this.drawerBackBtn?.addEventListener('click', () => this.closePreviewDrawer());

    // Click "View Case Study ↗" opens in new tab; fallback to modal if needed
    this.drawerCtaBtn?.addEventListener('click', (e) => {
      if (this.currentActiveProject && this.currentActiveProject.caseStudyUrl) {
        // Allow standard anchor new tab navigation
        return;
      }
      e.preventDefault();
      if (this.currentActiveProject) {
        this.openProjectModal(this.currentActiveProject);
      }
    });

    // Full Case Study Modal Controls
    this.modalProjectClose?.addEventListener('click', () => this.closeProjectModal());
    this.modalReturnCabinet?.addEventListener('click', () => {
      this.closeProjectModal();
      this.closePreviewDrawer();
    });

    this.modalPrevBtn?.addEventListener('click', () => this.navigateAdjacentProject(-1));
    this.modalNextBtn?.addEventListener('click', () => this.navigateAdjacentProject(1));

    // Navigation Buttons
    this.navCabinetBtn?.addEventListener('click', () => {
      this.closeAllModals();
      this.closePreviewDrawer();
      this.setActiveNav('cabinet');
    });

    this.navCatalogueBtn?.addEventListener('click', () => {
      this.closeAllModals();
      this.openCatalogueOverlay();
      this.setActiveNav('catalogue');
    });

    this.catalogueCloseBtn?.addEventListener('click', () => {
      this.closeCatalogueOverlay();
      this.setActiveNav('cabinet');
    });

    this.navSkillsBtn?.addEventListener('click', () => {
      this.closeAllModals();
      this.openModal(this.skillsModal);
      this.setActiveNav('skills');
    });

    this.navProcessBtn?.addEventListener('click', () => {
      this.closeAllModals();
      this.openModal(this.processModal);
      this.setActiveNav('process');
    });

    this.navIdeasBtn?.addEventListener('click', () => {
      this.closeAllModals();
      this.openModal(this.ideasModal);
      this.setActiveNav('ideas');
    });

    this.navAboutBtn?.addEventListener('click', () => {
      this.closeAllModals();
      this.openModal(this.infoModal);
      this.setActiveNav('about');
    });

    this.navContactBtn?.addEventListener('click', () => {
      this.closeAllModals();
      this.openModal(this.contactModal);
      this.setActiveNav('contact');
    });

    // Section Modal Return / Close buttons
    [
      { btn: this.skillsCloseBtn, modal: this.skillsModal },
      { btn: this.skillsReturnBtn, modal: this.skillsModal },
      { btn: this.processCloseBtn, modal: this.processModal },
      { btn: this.processReturnBtn, modal: this.processModal },
      { btn: this.ideasCloseBtn, modal: this.ideasModal },
      { btn: this.ideasReturnBtn, modal: this.ideasModal },
      { btn: this.infoModalClose, modal: this.infoModal },
      { btn: this.aboutReturnBtn, modal: this.infoModal },
      { btn: this.contactCloseBtn, modal: this.contactModal },
      { btn: this.contactReturnBtn, modal: this.contactModal }
    ].forEach(({ btn, modal }) => {
      btn?.addEventListener('click', () => {
        this.returnFromSectionModal(modal);
      });
    });

    // Backdrop Click handlers
    [this.infoModal, this.skillsModal, this.processModal, this.ideasModal, this.contactModal].forEach(modal => {
      modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.returnFromSectionModal(modal);
        }
      });
    });

    // Global ESC Key Handler
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.projectModal?.classList.contains('open')) {
          this.closeProjectModal();
        } else if (this.skillsModal?.classList.contains('open')) {
          this.returnFromSectionModal(this.skillsModal);
        } else if (this.processModal?.classList.contains('open')) {
          this.returnFromSectionModal(this.processModal);
        } else if (this.ideasModal?.classList.contains('open')) {
          this.returnFromSectionModal(this.ideasModal);
        } else if (this.infoModal?.classList.contains('open')) {
          this.returnFromSectionModal(this.infoModal);
        } else if (this.contactModal?.classList.contains('open')) {
          this.returnFromSectionModal(this.contactModal);
        } else if (this.catalogueOverlay?.classList.contains('open')) {
          this.closeCatalogueOverlay();
          this.setActiveNav('cabinet');
        } else if (this.drawerEl?.classList.contains('open')) {
          this.closePreviewDrawer();
        }
      }

      if (e.key === 'Tab') this.trapDialogFocus(e);
    });
  }

  setActiveNav(viewName) {
    this.navCabinetBtn?.classList.toggle('active', viewName === 'cabinet');
    this.navCatalogueBtn?.classList.toggle('active', viewName === 'catalogue');
    this.navSkillsBtn?.classList.toggle('active', viewName === 'skills');
    this.navProcessBtn?.classList.toggle('active', viewName === 'process');
    this.navIdeasBtn?.classList.toggle('active', viewName === 'ideas');
    this.navAboutBtn?.classList.toggle('active', viewName === 'about');
    this.navContactBtn?.classList.toggle('active', viewName === 'contact');
  }

  openModal(modalEl) {
    this.openDialog(modalEl);
  }

  openDialog(modalEl, opener = document.activeElement) {
    if (!modalEl) return;
    this.dialogReturnFocus.set(modalEl, opener instanceof HTMLElement ? opener : null);
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    const focusable = this.getDialogFocusableElements(modalEl);
    (focusable[0] || modalEl).focus();
  }

  closeDialog(modalEl, restoreFocus = true) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    const opener = this.dialogReturnFocus.get(modalEl);
    this.dialogReturnFocus.delete(modalEl);
    if (restoreFocus && opener?.isConnected && opener.getClientRects().length > 0 && !opener.closest('[aria-hidden="true"]')) {
      opener.focus();
    } else if (restoreFocus) {
      const canvas = document.querySelector('#webgl-container canvas');
      (canvas?.getClientRects().length ? canvas : this.navCatalogueBtn)?.focus();
    }
  }

  closeModal(modalEl, restoreFocus = true) {
    this.closeDialog(modalEl, restoreFocus);
  }

  returnFromSectionModal(modalEl) {
    if (document.body.classList.contains('mode-recruiter')) {
      this.closeModal(modalEl, false);
      this.openCatalogueOverlay();
      this.setActiveNav('catalogue');
      this.navCatalogueBtn?.focus();
      return;
    }

    this.closeModal(modalEl);
    this.setActiveNav('cabinet');
  }

  getDialogFocusableElements(dialogEl) {
    return [...dialogEl.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(element => element.getClientRects().length > 0);
  }

  trapDialogFocus(event) {
    const openDialogs = [...document.querySelectorAll('[role="dialog"].open')];
    const dialogEl = openDialogs[openDialogs.length - 1];
    if (!dialogEl) return;
    const focusable = this.getDialogFocusableElements(dialogEl);
    if (!focusable.length) {
      event.preventDefault();
      dialogEl.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !dialogEl.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialogEl.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  closeAllModals() {
    [
      this.projectModal,
      this.catalogueOverlay,
      this.skillsModal,
      this.processModal,
      this.ideasModal,
      this.infoModal,
      this.contactModal
    ].forEach(m => this.closeDialog(m, false));
  }

  populateSectionContents() {
    // Skills
    if (this.skillsContent) {
      const skills = PORTFOLIO_SECTIONS.skills;
      this.skillsContent.innerHTML = `
        <p class="section-intro">${skills.subtitle}</p>
        <div class="skills-grid">
          ${skills.categories.map(cat => `
            <div class="skills-category-card">
              <h4 class="category-heading">${cat.name}</h4>
              <ul class="skills-list">
                ${cat.items.map(item => `<li>✦ ${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Process
    if (this.processContent) {
      const process = PORTFOLIO_SECTIONS.process;
      this.processContent.innerHTML = `
        <p class="section-intro">${process.subtitle}</p>
        <div class="process-steps">
          ${process.steps.map(step => `
            <div class="process-step-card">
              <span class="step-num">${step.num}</span>
              <div>
                <h4 class="step-name">${step.name}</h4>
                <p class="step-desc">${step.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Ideas
    if (this.ideasContent) {
      const ideas = PORTFOLIO_SECTIONS.ideas;
      this.ideasContent.innerHTML = `
        <p class="section-intro">${ideas.subtitle}</p>
        <div class="ideas-list">
          ${ideas.essays.map(essay => `
            <article class="idea-card">
              <span class="idea-date">${essay.date}</span>
              <h4 class="idea-title">${essay.title}</h4>
              <p class="idea-excerpt">${essay.excerpt}</p>
            </article>
          `).join('')}
        </div>
      `;
    }

    // About
    if (this.aboutContent) {
      const about = PORTFOLIO_SECTIONS.about;
      this.aboutContent.innerHTML = `
        <p class="section-intro">${about.subtitle}</p>
        <p class="info-body-text">${about.bio}</p>
        <div class="about-focus-block">
          <h3 class="about-focus-title">Areas I’m interested in</h3>
          <ul class="about-focus-list">${about.interests.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <p class="info-body-text about-direction">${about.direction}</p>
      `;
    }

    // Contact
    if (this.contactContent) {
      const contact = PORTFOLIO_SECTIONS.contact;
      this.contactContent.innerHTML = `
        <p class="section-intro">${contact.subtitle}</p>
        <div class="contact-card-box">
          <p class="contact-location">🏛️ ${contact.location}</p>
          <div class="contact-links-list">
            ${contact.channels.map(ch => `
              <a href="${ch.href}" target="_blank" rel="noopener noreferrer" class="contact-link-row">
                <span class="ch-label">${ch.label}</span>
                <span class="ch-val">${ch.value} →</span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  renderCatalogueGrid() {
    if (!this.catalogueGrid) return;
    this.catalogueGrid.innerHTML = '';

    // 1. Featured Section Header (4 Main Projects)
    const featuredGroup = document.createElement('div');
    featuredGroup.className = 'catalogue-section-group';
    featuredGroup.innerHTML = `
      <div class="catalogue-section-header">
        <span class="catalogue-badge-gold">✦ PRIMARY WORKS · FULL DOCUMENTATION</span>
        <h3 class="catalogue-section-title">Featured Case Studies</h3>
        <p class="catalogue-section-desc">Selected projects spanning research, product design, physical computing, and service systems.</p>
      </div>
      <div class="catalogue-subgrid featured-grid"></div>
    `;
    const featuredGrid = featuredGroup.querySelector('.featured-grid');

    // 2. Secondary & Supporting Systems
    const supportingGroup = document.createElement('div');
    supportingGroup.className = 'catalogue-section-group';
    supportingGroup.innerHTML = `
      <div class="catalogue-section-header" style="margin-top: 3.5rem;">
        <span class="catalogue-badge-subtle">SUPPORTING WORKS · SYSTEMS &amp; WRITING</span>
        <h3 class="catalogue-section-title">Secondary Inquiries &amp; Field Studies</h3>
        <p class="catalogue-section-desc">Targeted explorations across digital body-doubling, cloud-automated sensory archives, design anthropology, and academic writing.</p>
      </div>
      <div class="catalogue-subgrid supporting-grid"></div>
    `;
    const supportingGrid = supportingGroup.querySelector('.supporting-grid');

    // 3. Material & Method Explorations
    const explorationsGroup = document.createElement('div');
    explorationsGroup.className = 'catalogue-section-group';
    explorationsGroup.innerHTML = `
      <div class="catalogue-section-header" style="margin-top: 3.5rem;">
        <span class="catalogue-badge-subtle">METHOD &amp; MATERIAL EXPERIMENTS</span>
        <h3 class="catalogue-section-title">Quantitative LCA &amp; Sculptural Studies</h3>
        <p class="catalogue-section-desc">Hands-on Life Cycle Assessment modeling and Japanese Wabi-Sabi cement casting explorations.</p>
      </div>
      <div class="catalogue-subgrid explorations-grid"></div>
    `;
    const explorationsGrid = explorationsGroup.querySelector('.explorations-grid');

    PROJECTS_DATA.forEach(project => {
      const card = document.createElement('div');
      card.className = `catalogue-card ${project.isMain ? 'featured-card' : ''}`;
      
      const badgeHtml = project.isMain
        ? `<span class="card-featured-badge">✦ FEATURED</span>`
        : `<span class="card-regular-badge">SPECIMEN</span>`;

      card.innerHTML = `
        <div class="card-top-content">
          <div class="card-header-meta">
            <span class="card-number">${project.placement?.labelNumber || 'N° 01'}</span>
            ${badgeHtml}
          </div>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-cat">${project.category} · ${project.year}</p>
          <p class="card-summary">${project.summary}</p>
        </div>

        <div class="card-bottom-content">
          <div class="card-tags-list">
            ${(project.tags || []).slice(0, 3).map(t => `<span class="card-mini-tag">${t}</span>`).join('')}
          </div>
          <div class="card-actions-row">
            <button type="button" class="card-btn-inspect" title="Inspect specimen bottle in 3D cabinet">
              Inspect in 3D →
            </button>
            <a href="${project.caseStudyUrl}" target="_blank" rel="noopener noreferrer" class="card-btn-casestudy" title="Open complete case study report in a new tab">
              View Case Study ↗
            </a>
          </div>
        </div>
      `;

      // Clicking "Inspect in 3D" button
      const inspectBtn = card.querySelector('.card-btn-inspect');
      inspectBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeCatalogueOverlay();
        this.setActiveNav('cabinet');
        if (this.onSelectProjectFrom2D) {
          this.onSelectProjectFrom2D(project.id);
        }
      });

      // Clicking the card body outside the external link also focuses in 3D
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-btn-casestudy')) {
          // Native link opens in new tab cleanly
          return;
        }
        if (document.body.classList.contains('mode-recruiter')) return;
        this.closeCatalogueOverlay();
        this.setActiveNav('cabinet');
        if (this.onSelectProjectFrom2D) {
          this.onSelectProjectFrom2D(project.id);
        }
      });

      if (project.isMain) {
        featuredGrid.appendChild(card);
      } else if (project.id === 'sand-dunes' || project.id === 'learning-lca') {
        explorationsGrid.appendChild(card);
      } else {
        supportingGrid.appendChild(card);
      }
    });

    this.catalogueGrid.appendChild(featuredGroup);
    this.catalogueGrid.appendChild(supportingGroup);
    this.catalogueGrid.appendChild(explorationsGroup);
  }

  openCatalogueOverlay() {
    this.catalogueOverlay?.classList.add('open');
    this.catalogueOverlay?.setAttribute('aria-hidden', 'false');
    const firstControl = this.getDialogFocusableElements(this.catalogueOverlay)[0];
    firstControl?.focus();
  }

  closeCatalogueOverlay() {
    this.catalogueOverlay?.classList.remove('open');
    this.catalogueOverlay?.setAttribute('aria-hidden', 'true');
    if (this.navCatalogueBtn?.getClientRects().length) this.navCatalogueBtn.focus();
  }

  /**
   * Project Preview Drawer
   */
  openProjectPreview(project) {
    this.openPreviewDrawer(project);
  }

  openPreviewDrawer(project) {
    this.currentActiveProject = project;

    if (this.drawerNumberEl) this.drawerNumberEl.innerText = project.placement.labelNumber || 'N° 01';
    if (this.drawerTitleEl) this.drawerTitleEl.innerText = project.title;
    if (this.drawerCategoryEl) this.drawerCategoryEl.innerText = `${project.category} · ${project.year}`;
    if (this.drawerTaglineEl) this.drawerTaglineEl.innerText = project.tagline;
    if (this.drawerSummaryEl) this.drawerSummaryEl.innerText = project.summary;

    if (this.drawerStatsEl && project.stats) {
      this.drawerStatsEl.innerHTML = project.stats.map(s => `
        <div class="drawer-stat-item">
          <span class="stat-label">${s.label}</span>
          <span class="stat-value">${s.value}</span>
        </div>
      `).join('');
    }

    if (this.drawerTagsEl && project.tags) {
      this.drawerTagsEl.innerHTML = project.tags.map(t => `<span class="drawer-tag">${t}</span>`).join('');
    }

    if (this.drawerCtaBtn && project.caseStudyUrl) {
      this.drawerCtaBtn.href = project.caseStudyUrl;
      this.drawerCtaBtn.setAttribute('target', '_blank');
      this.drawerCtaBtn.setAttribute('rel', 'noopener noreferrer');
    }

    this.openDialog(this.drawerEl);

    if (this.rotateCueEl) this.rotateCueEl.classList.add('visible');
    if (this.interactionHint) this.interactionHint.style.opacity = '0';
  }

  closePreviewDrawer() {
    this.closeDialog(this.drawerEl);

    if (this.rotateCueEl) this.rotateCueEl.classList.remove('visible');
    if (this.interactionHint) this.interactionHint.style.opacity = '1';

    if (this.onResetCabinet) {
      this.onResetCabinet();
    }
  }

  /**
   * Full Case Study Modal
   */
  openProjectModal(project) {
    this.currentActiveProject = project;

    if (this.modalProjectNumber) this.modalProjectNumber.innerText = project.placement.labelNumber || 'N° 01';
    if (this.modalProjectCategory) this.modalProjectCategory.innerText = `${project.category} · ${project.year}`;
    if (this.modalProjectTitle) this.modalProjectTitle.innerText = project.title;
    if (this.modalProjectTagline) this.modalProjectTagline.innerText = project.tagline;

    if (this.modalProjectStats && project.stats) {
      this.modalProjectStats.innerHTML = project.stats.map(s => `
        <div class="project-modal-stat-item">
          <span class="stat-label">${s.label}</span>
          <span class="stat-value">${s.value}</span>
        </div>
      `).join('');
    }

    if (this.modalProjectProblem) this.modalProjectProblem.innerText = project.problem || project.challenge || '';
    if (this.modalProjectDid) this.modalProjectDid.innerText = project.whatIDid || project.process || '';
    if (this.modalProjectMade) this.modalProjectMade.innerText = project.whatIMade || project.description || '';
    if (this.modalProjectMatters) this.modalProjectMatters.innerText = project.whyItMatters || project.outcomes || '';
    if (this.modalProjectDesc) this.modalProjectDesc.innerText = project.description || '';
    if (this.modalProjectChallenge) this.modalProjectChallenge.innerText = project.challenge || '';
    if (this.modalProjectProcess) this.modalProjectProcess.innerText = project.process || '';
    if (this.modalProjectInsights) this.modalProjectInsights.innerText = project.insights || '';
    if (this.modalProjectOutcomes) this.modalProjectOutcomes.innerText = project.outcomes || '';

    if (this.modalProjectTags && project.tags) {
      this.modalProjectTags.innerHTML = project.tags.map(t => `<span class="drawer-tag">${t}</span>`).join('');
    }

    if (this.modalExternalLink && project.caseStudyUrl) {
      this.modalExternalLink.href = project.caseStudyUrl;
      this.modalExternalLink.setAttribute('target', '_blank');
      this.modalExternalLink.setAttribute('rel', 'noopener noreferrer');
    }

    this.openDialog(this.projectModal);
  }

  closeProjectModal() {
    this.closeDialog(this.projectModal);
  }

  navigateAdjacentProject(direction) {
    if (!this.currentActiveProject) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === this.currentActiveProject.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = PROJECTS_DATA.length - 1;
    if (nextIndex >= PROJECTS_DATA.length) nextIndex = 0;

    const nextProject = PROJECTS_DATA[nextIndex];
    this.openProjectModal(nextProject);

    // Also update 3D camera focus to this project
    if (this.onSelectProjectFrom2D) {
      this.onSelectProjectFrom2D(nextProject.id);
    }
  }

  /**
   * 3D Hover Tooltip
   */
  updateTooltip(userData, clientX, clientY, visible) {
    if (!this.tooltipEl) return;

    if (!visible || !userData) {
      this.tooltipEl.classList.remove('visible');
      this.tooltipEl.setAttribute('aria-hidden', 'true');
      return;
    }

    if (userData.type === 'bottle' && userData.project) {
      const p = userData.project;
      if (this.tooltipNumberEl) this.tooltipNumberEl.innerText = p.category;
      if (this.tooltipTitleEl) this.tooltipTitleEl.innerText = p.title;
      if (this.tooltipCategoryEl) this.tooltipCategoryEl.innerText = `${p.category} · ${p.year}`;
      this.tooltipEl.classList.add('visible');
      this.tooltipEl.setAttribute('aria-hidden', 'false');
    } else {
      this.tooltipEl.classList.remove('visible');
      this.tooltipEl.setAttribute('aria-hidden', 'true');
      return;
    }

    if (this.tooltipCategoryEl) this.tooltipCategoryEl.innerText = 'Apothecary Archive';

    const padding = 14;
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width || 336;
    const tooltipHeight = tooltipRect.height || 96;
    let posX = clientX + padding;
    let posY = clientY - tooltipHeight - padding;

    if (posX + tooltipWidth > window.innerWidth - 8) posX = clientX - tooltipWidth - padding;
    if (posY < 8) posY = clientY + padding;
    posX = Math.max(8, Math.min(posX, window.innerWidth - tooltipWidth - 8));
    posY = Math.max(8, Math.min(posY, window.innerHeight - tooltipHeight - 8));

    this.tooltipEl.style.left = `${posX}px`;
    this.tooltipEl.style.top = `${posY}px`;
  }

  hideLoadingScreen() {
    if (!this.loadingScreen) return;
    this.loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
    }, 700);
  }
}
