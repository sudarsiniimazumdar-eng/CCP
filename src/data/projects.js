/**
 * Central Portfolio Project Data & 3D Cabinet Placements
 * 
 * Each project contains:
 * - Metadata (title, category, tagline, year, placeholder descriptions)
 * - 3D Cabinet Placement & Appearance (shelf, slot, bottle archetype, color tint, label text)
 */

export const PROJECTS_DATA = [
  {
    id: 'architect-of-nothing',
    title: 'Architect of Nothing',
    category: 'Spatial Design & Philosophy',
    year: '2025',
    tagline: 'An exploration of empty space, pause, and intentional absence in structural environments.',
    summary: 'A conceptual study exploring how negative space shapes human psychology, ritual, and focus in domestic architecture.',
    description: 'Project description placeholder. Detailed case study regarding spatial rhythm, minimal intervention, and experiential architecture will be added here.',
    tags: ['Spatial Concept', 'Research', 'Philosophy', 'Form Studies'],
    stats: [
      { label: 'Scale', value: '1:20 Prototype' },
      { label: 'Duration', value: '8 Weeks' },
      { label: 'Medium', value: 'Physical & Digital' }
    ],
    // 3D Cabinet Configuration
    placement: {
      shelf: 0, // Top shelf (index 0)
      slot: -1.8, // X position offset on shelf
      bottleVariant: 'arch', // Tall arched silhouette
      liquidColor: '#d6a362', // Warm honey amber
      capType: 'brass-tall',
      labelNumber: 'N° 01'
    }
  },
  {
    id: 'prosthetics-bmvss',
    title: 'Prosthetics / BMVSS',
    category: 'Industrial & Healthcare Design',
    year: '2024',
    tagline: 'Human-centered biomechanical design for affordable, adaptive mobility.',
    summary: 'Redesigning low-cost lower-limb socket attachments with modular breathability, tactile comfort, and intuitive fitting.',
    description: 'Project description placeholder. Explores ergonomic load distribution, rural clinic fabrication constraints, and patient dignity through functional aesthetics.',
    tags: ['Healthcare', 'Biomechanics', 'Ergonomics', 'Field Research'],
    stats: [
      { label: 'Focus', value: 'Lower-Limb Socket' },
      { label: 'Collaboration', value: 'BMVSS Clinic' },
      { label: 'Impact', value: 'High Accessibility' }
    ],
    placement: {
      shelf: 0, // Top shelf
      slot: 0, // Center
      bottleVariant: 'apothecary', // Cylindrical apothecary glass
      liquidColor: '#5c7a68', // Muted sage/forest
      capType: 'cork',
      labelNumber: 'N° 02'
    }
  },
  {
    id: 'lca-hair-clips',
    title: 'LCA — Plastic vs Metal Clips',
    category: 'Sustainability & Material Science',
    year: '2024',
    tagline: 'Life Cycle Assessment analyzing circularity tradeoffs in everyday consumer hardware.',
    summary: 'A quantitative comparative cradle-to-grave study comparing virgin polymers, recycled thermoplastics, and stamped brass/steel hair clips.',
    description: 'Project description placeholder. Comprehensive breakdown of carbon emissions, repairability indices, and end-of-life microplastic dispersal trajectories.',
    tags: ['Life Cycle Assessment', 'Circularity', 'Materials', 'Data Modeling'],
    stats: [
      { label: 'Methodology', value: 'ISO 14040/44' },
      { label: 'Metric', value: 'CO2e & Eutrophication' },
      { label: 'Outcome', value: 'Material Roadmap' }
    ],
    placement: {
      shelf: 0, // Top shelf
      slot: 1.8, // Right
      bottleVariant: 'faceted', // Geometric faceted luxury bottle
      liquidColor: '#9b5b52', // Terracotta / dried rose
      capType: 'brass-faceted',
      labelNumber: 'N° 03'
    }
  },
  {
    id: 'service-design-positive-exp',
    title: 'Service Design / Positive Exp',
    category: 'Service Systems & CX',
    year: '2025',
    tagline: 'Transforming anxiety-inducing institutional touchpoints into supportive human rituals.',
    summary: 'A service architecture blueprint redesigning urban public transit assistance desks and emotional reassurance pathways.',
    description: 'Project description placeholder. Covers journey mapping, stakeholder orchestration, physical cue design, and staff empowerment protocols.',
    tags: ['Service Design', 'Journey Mapping', 'Touchpoints', 'Behavioral Design'],
    stats: [
      { label: 'Domain', value: 'Public Infrastructure' },
      { label: 'Outputs', value: 'Blueprint & Playbook' },
      { label: 'Testing', value: 'Live Pilot' }
    ],
    placement: {
      shelf: 1, // Middle shelf (index 1)
      slot: -1.2, // Left
      bottleVariant: 'flask', // Minimalist square flask
      liquidColor: '#3d5a80', // Deep ink slate blue
      capType: 'wood-block',
      labelNumber: 'N° 04'
    }
  },
  {
    id: 'speculative-artifacts',
    title: 'Future Artefacts & Curiosities',
    category: 'Speculative Design',
    year: '2025',
    tagline: 'Investigating tangible interfaces and nostalgic rituals in post-screen futures.',
    summary: 'A collection of conceptual sensory devices exploring tactile memory preservation and digital calm.',
    description: 'Project description placeholder. An ongoing experiment combining archaic physical mechanisms with subtle ambient computation.',
    tags: ['Speculative', 'Tangible UI', 'Sensory Rituals', 'Prototypes'],
    stats: [
      { label: 'Phase', value: 'Experimental' },
      { label: 'Format', value: 'Interactive Props' },
      { label: 'Theme', value: 'Post-Digital' }
    ],
    placement: {
      shelf: 1, // Middle shelf
      slot: 1.2, // Right
      bottleVariant: 'atomizer', // Spherical vintage bulb bottle
      liquidColor: '#b08968', // Antique cedar / smoke
      capType: 'gold-bulb',
      labelNumber: 'N° 05'
    }
  }
];

export const SHELF_CONFIG = {
  shelfCount: 3,
  shelfWidth: 7.2,
  shelfDepth: 1.6,
  shelfSpacing: 2.2, // vertical distance between shelves
  cabinetHeight: 7.0,
  cabinetWidth: 7.8,
  cabinetDepth: 1.8
};
