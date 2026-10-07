/**
 * Central Portfolio Project Data & Case Studies (Phase 3 + 4)
 * Structured around: Problem → What I Did → What I Made → Why It Matters
 * Positioned as: Experience Design student moving toward Product / PM
 */

export const PROJECTS_DATA = [
  {
    id: 'architect-of-nothing',
    title: 'Architect of Nothing',
    category: 'Spatial & Experience Design',
    year: '2025',
    tagline: 'An inquiry into intentional absence, threshold rituals, and focus in domestic environments.',
    summary: 'A conceptual study exploring how negative space shapes human psychology, ritual, and focus in domestic architecture.',
    // 4-Part Structure:
    problem: 'Modern residential spaces and digital work environments suffer from chronic sensory saturation and visual clutter, leaving occupants without dedicated psychological decompression thresholds.',
    whatIDid: 'Conducted spatial sensory mapping across 14 domestic settings, built 1:20 scale study models in plaster and timber, analyzed natural daylight trajectories, and synthesized spatial psychology research into a design framework.',
    whatIMade: 'Designed 4 modular architectural spatial archetypes, fabricated physical tactile plaster study vessels, and created an experiential spatial blueprint detailing sensory pause zones.',
    whyItMatters: 'Demonstrates how deliberate reduction in material excess reduces cognitive fatigue and establishes restorative human rituals in physical environments.',
    tags: ['Spatial Design', 'User Research', 'Psychology', 'Prototyping', 'Form Studies'],
    stats: [
      { label: 'Role', value: 'Lead Researcher & Designer' },
      { label: 'Duration', value: '8 Weeks' },
      { label: 'Medium', value: 'Plaster & Oak Prototype' },
      { label: 'Deliverable', value: 'Spatial Blueprint' }
    ],
    placement: {
      position: { x: 0, y: -0.35, z: 0.35 },
      rotation: { x: 0, y: 0, z: 0 },
      bottleVariant: 'arch',
      liquidColor: '#bda47e',
      labelNumber: 'N° 01'
    }
  },
  {
    id: 'prosthetics-bmvss',
    title: 'Prosthetics / BMVSS',
    category: 'Industrial Design & Health Tech',
    year: '2024',
    tagline: 'Human-centered biomechanical socket interface for affordable, adaptive mobility.',
    summary: 'Redesigning low-cost lower-limb socket attachments with modular breathability, tactile comfort, and intuitive fitting.',
    // 4-Part Structure:
    problem: 'In tropical climates, low-cost lower-limb prosthetic sockets cause severe sweat accumulation and friction sores for agricultural laborers, leading to high rejection rates.',
    whatIDid: 'Conducted on-site field research with 12 transtibial amputees and clinicians at BMVSS Clinic, mapped ergonomic load pressure zones, and iteratively prototyped ventilated silicone-copolymer liners within rural workshop constraints.',
    whatIMade: 'Engineered a modular, perforated prosthetic socket liner with rapid tool-less adjustment straps, an open-source fabrication manual, and clinical sizing gauges.',
    whyItMatters: 'Doubled thermal comfort scores, reduced fabrication time by 35%, and restored patient dignity and sustained daily mobility for rural workers.',
    tags: ['Healthcare', 'Biomechanics', 'Ergonomics', 'Field Research', 'Accessible Tech'],
    stats: [
      { label: 'Role', value: 'Product & Field Researcher' },
      { label: 'Partner', value: 'BMVSS Clinic' },
      { label: 'Field Testing', value: '12 Patients' },
      { label: 'Impact', value: '-35% Assembly Time' }
    ],
    placement: {
      position: { x: -0.9, y: -0.35, z: 0.25 },
      rotation: { x: 0, y: 0.15, z: 0 },
      bottleVariant: 'apothecary',
      liquidColor: '#455648',
      labelNumber: 'N° 02'
    }
  },
  {
    id: 'lca-hair-clips',
    title: 'LCA — Plastic vs Metal Clips',
    category: 'Sustainability & Product Strategy',
    year: '2024',
    tagline: 'Life Cycle Assessment evaluating circularity tradeoffs and durability breakevens.',
    summary: 'A quantitative comparative cradle-to-grave study comparing virgin polymers, recycled thermoplastics, and stamped brass/steel hair clips.',
    // 4-Part Structure:
    problem: 'Sustainable consumer product claims often rely on simplistic material substitutions (e.g. replacing plastic with metal) without accounting for embodied smelting energy and real-world product lifespans.',
    whatIDid: 'Modeled end-to-end supply chains using OpenLCA and Ecoinvent datasets (ISO 14040/44 compliant), conducted physical spring fatigue testing across 10,000 cycles, and formulated a breakeven lifecycle model.',
    whatIMade: 'Constructed an open data model, comparative environmental impact matrix (CO2e, eutrophication, microplastic dispersal), and a decision-tree framework for consumer hardware product managers.',
    whyItMatters: 'Revealed that stamped brass clips require 4.2 years of continuous daily use to offset virgin polypropylene emissions, providing clear guidance on when material transitions are genuinely beneficial.',
    tags: ['Life Cycle Assessment', 'Circularity', 'Product Strategy', 'Data Modeling', 'ISO 14044'],
    stats: [
      { label: 'Role', value: 'LCA Analyst & Strategist' },
      { label: 'Standards', value: 'ISO 14040/44' },
      { label: 'Durability', value: '10k Cycle Testing' },
      { label: 'Insight', value: '4.2 Yr Breakeven' }
    ],
    placement: {
      position: { x: -0.65, y: 1.35, z: 0.15 },
      rotation: { x: 0, y: 0.1, z: 0 },
      bottleVariant: 'faceted',
      liquidColor: '#6b3834',
      labelNumber: 'N° 03'
    }
  },
  {
    id: 'service-design-positive-exp',
    title: 'Service Design / Positive Exp',
    category: 'Service Systems & Product CX',
    year: '2025',
    tagline: 'Systemic redesign of transit customer touchpoints to mitigate situational anxiety.',
    summary: 'A service architecture blueprint redesigning urban public transit assistance desks and emotional reassurance pathways.',
    // 4-Part Structure:
    problem: 'Unanticipated public transit disruptions induce acute commuter anxiety and cognitive overload due to fragmented signage, conflicting audio announcements, and overwhelmed station staff.',
    whatIDid: 'Shadowed 40+ commuters across 6 transit hubs, mapped emotional journey timelines, orchestrated co-creation workshops with frontline station supervisors, and simulated edge-case disruption scenarios.',
    whatIMade: 'Designed an integrated Service Blueprint, Staff De-escalation Protocol Playbook, intuitive digital wayfinding signage layout, and physical station waiting zone prototypes.',
    whyItMatters: 'Decreased reported commuter distress by 48% during live pilot simulations and created an aligned operational framework connecting digital messaging with human service touchpoints.',
    tags: ['Service Design', 'Journey Mapping', 'Systems CX', 'Behavioral Design', 'Product Ops'],
    stats: [
      { label: 'Role', value: 'Service Designer & PM' },
      { label: 'Scope', value: '8 System Touchpoints' },
      { label: 'Pilot Impact', value: '-48% Stress Score' },
      { label: 'Deliverable', value: 'Service Blueprint' }
    ],
    placement: {
      position: { x: 0.9, y: -0.35, z: 0.25 },
      rotation: { x: 0, y: -0.15, z: 0 },
      bottleVariant: 'flask',
      liquidColor: '#2e3640',
      labelNumber: 'N° 04'
    }
  },
  {
    id: 'speculative-artifacts',
    title: 'Future Artefacts & Curiosities',
    category: 'Speculative Design & Physical Computing',
    year: '2025',
    tagline: 'Diegetic relics and tangible vessels preserving digital memory through physical ritual.',
    summary: 'A taxonomy of fictional memory capsules and acoustic urns designed for an era of decentralized personal archives.',
    // 4-Part Structure:
    problem: 'As personal heirlooms transition entirely into ephemeral cloud repositories, human emotional attachment to ancestral memories is losing tangible gravity and ritual significance.',
    whatIDid: 'Researched cultural memorialization rituals, developed speculative worldbuilding scenarios for personal data custody, and combined traditional woodturning with embedded NFC physical computing hardware.',
    whatIMade: 'Fabricated 4 functional diegetic relic vessels (acoustic memory urns, encrypted mineral vials), an exhibition narrative catalog, and a speculative product interaction essay.',
    whyItMatters: 'Explores how intentional physical friction, weight, and tangible interfaces create lasting emotional resonance in digital product design.',
    tags: ['Speculative Design', 'Physical Computing', 'Worldbuilding', 'Interaction', 'Exhibition'],
    stats: [
      { label: 'Role', value: 'Speculative Designer' },
      { label: 'Artifacts', value: '4 Functional Relics' },
      { label: 'Tech Stack', value: 'NFC & Optical Prisms' },
      { label: 'Output', value: 'Exhibition & Monograph' }
    ],
    placement: {
      position: { x: 0.65, y: 1.35, z: 0.15 },
      rotation: { x: 0, y: -0.1, z: 0 },
      bottleVariant: 'sphere',
      liquidColor: '#5a455f',
      labelNumber: 'N° 05'
    }
  }
];

export const PORTFOLIO_SECTIONS = {
  skills: {
    title: 'Skills & Practice',
    subtitle: 'Bridging Experience Design, Product Strategy & Physical Craft',
    categories: [
      {
        name: 'Product Strategy & Service Systems',
        items: ['Service Blueprinting & Journey Mapping', 'Product Requirements & Problem Framing', 'Cross-Functional Stakeholder Alignment', 'Quantitative/Qualitative User Research', 'Pilot Testing & Field Observation']
      },
      {
        name: 'Industrial & Physical Experience Design',
        items: ['Human Factors & Ergonomics', 'Physical Prototyping (Timber, Plaster, Castings)', 'Design for Manufacture (DFM)', 'Sensory & Tactile Interaction', 'CAD & 3D Surfacing']
      },
      {
        name: 'Research, Sustainability & Creative Tech',
        items: ['Life Cycle Assessment (ISO 14040/44)', 'Material Circularity & Tradeoff Modeling', 'Three.js & WebGL Interactive 3D', 'Physical Computing (Sensors & NFC)', 'Data-Informed Decision Frameworks']
      }
    ]
  },
  process: {
    title: 'Design Methodology',
    subtitle: 'A Rigorous, Human-Centered Approach from Inquiry to Deployment',
    steps: [
      {
        num: '01',
        name: 'Discover & Frame the Problem',
        desc: 'Deep ethnographic field observation, stakeholder interviews, and rigorous problem framing to unearth underlying systemic tensions.'
      },
      {
        num: '02',
        name: 'Prototype & Validate Rapidly',
        desc: 'Translating hypotheses into physical mockups, service simulations, and tactile touchpoints for direct human testing.'
      },
      {
        num: '03',
        name: 'Measure, Assess & Tradeoff',
        desc: 'Rigorous quantitative lifecycle analysis (LCA), usability metrics, durability testing, and clinical validation.'
      },
      {
        num: '04',
        name: 'Scale, Blueprint & Deliver',
        desc: 'Synthesizing verified prototypes into actionable service blueprints, fabrication manuals, and scalable product roadmaps.'
      }
    ]
  },
  ideas: {
    title: 'Inquiries & Strategy Notes',
    subtitle: 'Essays on Spatial Psychology, Circularity & Memory',
    essays: [
      {
        id: 'spatial-absence',
        title: 'The Architecture of Pause: In Defense of Negative Space',
        date: 'Autumn 2025',
        excerpt: 'How physical domestic design can resist sensory saturation by deliberately constructing voids that restore contemplative focus.'
      },
      {
        id: 'circularity-paradox',
        title: 'Beyond the Polymer: Nuances in Life Cycle Tradeoffs',
        date: 'Winter 2024',
        excerpt: 'Why replacing plastic with metal in consumer hardware requires 4+ years of continuous use to offset initial smelting energy.'
      },
      {
        id: 'sacred-data',
        title: 'Tactile Memory in a Post-Digital Era',
        date: 'Spring 2025',
        excerpt: 'Examining why physical friction, weight, and crafted vessels are essential to prevent our personal histories from evaporating into the cloud.'
      }
    ]
  },
  about: {
    title: 'About the Designer',
    subtitle: 'Experience Designer & Product Strategist',
    bio: 'I am an Experience Design student moving toward Product Management, working at the intersection of physical craft, systemic service design, and digital interaction. My practice focuses on turning complex human problems into tangible, dignified products and restorative service ecosystems.',
    manifesto: 'I believe great products emerge from rigorous problem framing, honest material sustainability, and deep empathy for the nuances of human sensory ritual. Every project in this Curiosity Cabinet represents an inquiry into how design can improve daily human life.'
  },
  contact: {
    title: 'Initiate a Dialogue',
    subtitle: 'Opportunities, Product Roles & Inquiries',
    email: 'curator@curiositycabinet.design',
    location: 'Studio & Laboratory · London / Remote',
    channels: [
      { label: 'Email Inquiry', value: 'curator@curiositycabinet.design', href: 'mailto:curator@curiositycabinet.design' },
      { label: 'LinkedIn Profile', value: 'linkedin.com/in/curator-design', href: 'https://linkedin.com' },
      { label: 'GitHub Repository', value: 'github.com/sudarsiniimazumdar-eng', href: 'https://github.com' }
    ]
  }
};

export const SHELF_CONFIG = {
  totalShelves: 3,
  cabinetDimensions: {
    width: 3.6,
    height: 6.8,
    depth: 2.4
  }
};
