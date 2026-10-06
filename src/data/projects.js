/**
 * Central Portfolio Project Data & Organized 3D Shelf Placements
 * Perfectly aligned with the Victorian Curiosity Cabinet display vitrines
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
    // Middle Shelf Center - Main Tall Arch Decanter
    placement: {
      position: { x: 0, y: -0.35, z: 0.35 },
      rotation: { x: 0, y: 0, z: 0 },
      bottleVariant: 'arch', // Tall Victorian decanter
      liquidColor: '#d6a362', // Honey amber
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
    // Middle Shelf Left - Herbal Apothecary Flacon with Twine
    placement: {
      position: { x: -0.9, y: -0.35, z: 0.25 },
      rotation: { x: 0, y: 0.15, z: 0 },
      bottleVariant: 'apothecary', // Herbal apothecary flacon with twine wrap
      liquidColor: '#3d5c45', // Muted forest sage
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
    // Upper Shelf Left - Hexagonal Faceted Ruby Elixir
    placement: {
      position: { x: -0.65, y: 1.35, z: 0.15 },
      rotation: { x: 0, y: 0.1, z: 0 },
      bottleVariant: 'faceted', // Hexagonal potion decanter with brass spire
      liquidColor: '#963d32', // Deep ruby red elixir
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
    // Middle Shelf Right - Rectangular Slate Ink Flask
    placement: {
      position: { x: 0.9, y: -0.35, z: 0.25 },
      rotation: { x: 0, y: -0.15, z: 0 },
      bottleVariant: 'flask', // Rectangular flask with charred wood cap
      liquidColor: '#2b3d52', // Deep midnight slate ink
      labelNumber: 'N° 04'
    }
  },
  {
    id: 'speculative-artifacts',
    title: 'Future Artefacts & Curiosities',
    category: 'Speculative Design & Worldbuilding',
    year: '2025',
    tagline: 'Diegetic prototypes excavating rituals, memory storage, and post-digital relics.',
    summary: 'A taxonomy of fictional memory capsules and acoustic urns designed for an era of decentralized personal archives.',
    description: 'Project description placeholder. Investigates emotional attachment to ephemeral digital media through tangible alchemical vessels.',
    tags: ['Speculative', 'Worldbuilding', 'Physical Computing', 'Material Fiction'],
    stats: [
      { label: 'Artefacts', value: '4 Relic Vessels' },
      { label: 'Exhibition', value: 'Future Archeology' },
      { label: 'Theme', value: 'Memory Preservation' }
    ],
    // Upper Shelf Right - Celestial Sphere Vial with Brass Rings
    placement: {
      position: { x: 0.65, y: 1.35, z: 0.15 },
      rotation: { x: 0, y: -0.1, z: 0 },
      bottleVariant: 'sphere', // Spherical vial in brass armillary cradle
      liquidColor: '#6a3875', // Luminous amethyst elixir
      labelNumber: 'N° 05'
    }
  }
];

export const SHELF_CONFIG = {
  totalShelves: 3,
  cabinetDimensions: {
    width: 3.6,
    height: 6.8,
    depth: 2.4
  }
};
