/**
 * Master Portfolio Project Data & Case Studies
 * Extracted directly from official documentation (Source of Truth)
 * 
 * 4 MAIN / FEATURED PROJECTS:
 * 1. V. POCKET — Assistive Prosthetic Add-On & Emergency Kit
 * 2. Urban End-of-Life & Death Care Service Design — Funeral / Service Design
 * 3. Focus Dial — Zoom Fatigue / Tangible Interaction
 * 4. Architect of Nothing — Critical Design / Physical Computing
 * 
 * 6 SECONDARY & SUPPORTING WORKS:
 * 5. Momentum Buddy — Productivity & Body-Doubling Application
 * 6. Research Translation — "Am I really here or just my silhouette...?"
 * 7. The Smell Library — Multisensory Memory Installation
 * 8. Bidar Vishwakarma Wooden Door Technology Field Study
 * 9. Sand Dunes — Material Form & Light/Shadow Study
 * 10. Learning-by-Making LCA — Polypropylene vs. Steel Hair Clip
 */

export const PROJECTS_DATA = [
  // =========================================================================
  // 1. MAIN PROJECT: V. POCKET
  // =========================================================================
  {
    id: 'v-pocket',
    isMain: true,
    title: 'V. POCKET',
    shortTitle: 'V. POCKET',
    category: 'Assistive Product Design / Physical UX',
    type: 'Physical Product / Wearable System',
    year: 'Academic Studio',
    role: 'Lead Designer (Individual Course A2 Submission)',
    team: 'Individual Project',
    tagline: 'A subtle, wearable quick-fix toolkit designed to restore immediate dignity when assistive prosthetics fail on the go.',
    summary: 'A compact 3-in-1 emergency add-on pouch that addresses prosthetic socket slippage, grip challenges, and sudden mechanical failures in daily transit across urban and rural India.',
    caseStudyUrl: 'case-studies/v-pocket.html',

    // Process & Design Story
    problem: 'Persons with disabilities in India face daily mechanical breakdowns, socket loosening from sweat, and a fragmented repair ecosystem. Formal repair centers require long travel and high costs, forcing reliance on precarious temporary jugaad fixes that strip independence.',
    whatIDid: 'Conducted ecosystem mapping, stakeholder analysis, and AI-assisted qualitative persona synthesis across 6 distinct user archetypes. Brainstormed 30+ concepts, compared 4 divergent systems, and discarded bulky multi-tools in favor of rapid comfort stabilization.',
    whatIMade: 'Designed V. POCKET: a weather-resistant physical pouch attachable to leg, belt, or wrist via magnetic latch. Houses an Inflatable Air Pocket, Expandable Silicone Grip Ring, and Emergency Tension Strap, accompanied by an illustrated non-verbal user onboarding manual.',
    whyItMatters: 'Proves how prioritizing human dignity and eliminating cognitive friction over complex tooling creates immediate, life-stabilizing assistive interventions.',
    
    tags: ['Assistive Tech', 'Inclusive Design', 'Physical UX', 'Systems Mapping', 'Ergonomics'],
    stats: [
      { label: 'Role', value: 'Lead Designer' },
      { label: 'System', value: '3-in-1 Add-On' },
      { label: 'Personas', value: '6 Mapped Archetypes' },
      { label: 'Status', value: 'Full Case Study' }
    ],
    placement: {
      position: { x: -0.95, y: -0.35, z: 0.28 },
      rotation: { x: 0, y: 0.15, z: 0 },
      bottleVariant: 'apothecary',
      liquidColor: '#3a4f41',
      labelNumber: 'N° 01'
    }
  },

  // =========================================================================
  // 2. MAIN PROJECT: URBAN END-OF-LIFE & DEATH CARE SERVICE DESIGN
  // =========================================================================
  {
    id: 'urban-death-care',
    isMain: true,
    title: 'Urban End-of-Life & Death Care Service Design',
    shortTitle: 'Urban Death Care',
    category: 'Systems & Service Design / Thanatotechnology',
    type: 'Service Design / Experience Strategy',
    year: '2026',
    date: 'Academic Year 2026 (MA Experience Design)',
    duration: 'Multi-stage studio project across 3 modules (A1, A2, A3)',
    role: 'Co-Lead Service Designer & Researcher',
    team: 'Collaborative with Moulik Nanda',
    tagline: 'Reimagining the heavy logistics of urban Indian grief through an invisible, multi-stage end-of-life service ecosystem.',
    summary: 'A 4-phase service architecture addressing the chaotic "Golden Hour" of bereavement in urban India—combining crisis coordination, standardized ritual kits, eco-disposition, and automated death certification.',
    caseStudyUrl: 'case-studies/urban-death-care.html',

    problem: '8.66 million annual deaths occur in urban India, where nuclear families lack traditional community safety nets. Bereaved families endure 50+ chaotic phone calls, predatory tipping (₹1,000–₹3,000) at crematoriums, and opaque registration during acute grief. Organized services capture under 1% of the market.',
    whatIDid: 'Synthesized 15 academic papers on thanatology and mortality data; surveyed 35 respondents, interviewed 7 bereaved families, conducted field observation at Hebbal Crematorium, and interviewed service founders. Created Meta-Matrix coding, 4 personas, and an Idea Matrix of 100+ ideas.',
    whatIMade: 'Architected a 4-phase ecosystem: Pre-Death Legacy Planning, Point of Crisis "Funeral Buddy" AI coordination & standardized Samagri Box delivery, Post-Death Promession (-196°C freeze-drying) & municipal Form 4A automation, and Legacy Care Packages with sensory memory preservation.',
    whyItMatters: 'Demonstrates deep research rigor in a taboo domain, replacing intrusive B2C commercialization with an empathetic, invisible "Logistical Buffer" that protects family autonomy.',

    tags: ['Service Design', 'Systems Thinking', 'Thanatotechnology', 'Experience Strategy', 'Field Ethnography'],
    stats: [
      { label: 'Role', value: 'Co-Lead Service Designer' },
      { label: 'Research', value: '15 Papers · 35 Surveys · Fieldwork' },
      { label: 'Architecture', value: '4-Phase Ecosystem' },
      { label: 'Status', value: 'Full Case Study' }
    ],
    placement: {
      position: { x: -0.32, y: -0.35, z: 0.35 },
      rotation: { x: 0, y: 0.05, z: 0 },
      bottleVariant: 'arch',
      liquidColor: '#8a6e4b',
      labelNumber: 'N° 02'
    }
  },

  // =========================================================================
  // 3. MAIN PROJECT: FOCUS DIAL
  // =========================================================================
  {
    id: 'focus-dial',
    isMain: true,
    title: 'Focus Dial & Prompt Controller',
    shortTitle: 'Focus Dial',
    category: 'Tangible Interaction / Cognitive Ergonomics',
    type: 'Behavioral Hardware / Micro-Controller Prototyping',
    year: 'Academic Project',
    date: 'October 19 – November 12',
    duration: 'Approximately 4 Weeks',
    role: 'Individual Designer & Developer',
    team: 'Individual Project',
    tagline: 'A physical USB desk interface that breaks Zoom fatigue by reframing passive video calls into intentional cognitive sessions.',
    summary: 'A circular 3D-printed desktop USB controller powered by Arduino and custom C++ firmware that uses tactile button triggers and psychological nudges to combat virtual meeting burnout.',
    caseStudyUrl: 'case-studies/focus-dial.html',

    problem: 'Sustained video conferencing induces severe cognitive, emotional, and physiological depletion ("Zoom fatigue") from continuous mirror self-monitoring, hyper-gaze, and back-to-back scheduling blur. Existing interventions focus on passive camera rules rather than psychological triggers.',
    whatIDid: 'Grounded the interaction in Habit Discontinuity and Flow Theory. Designed CAD iterations progressing from elongated controllers to a circular puck. Abandoned fragile mechanical rotary wiring and soldered a custom button PCB with debounced C++ edge detection.',
    whatIMade: 'Built a functional circular 3D-printed desktop USB controller running custom embedded C++ firmware: Button A (Active Participation: short press for 5 contribution prompts, long press for 1 random prompt) and Button B (Active Listening: short press for 5 synthesis prompts, long press for 1 random prompt).',
    whyItMatters: 'Proves how tangible physical computing artifacts can interrupt automated software habits and improve workplace mental ergonomics.',

    tags: ['Tangible UX', 'Arduino & C++', 'Behavior Design', 'Cognitive Ergonomics', '3D Printing'],
    stats: [
      { label: 'Role', value: 'Designer & C++ Dev' },
      { label: 'Hardware', value: 'Arduino Uno + Custom PCB' },
      { label: 'Framework', value: 'Habit Discontinuity & Flow' },
      { label: 'Status', value: 'Full Case Study' }
    ],
    placement: {
      position: { x: 0.32, y: -0.35, z: 0.35 },
      rotation: { x: 0, y: -0.05, z: 0 },
      bottleVariant: 'flask',
      liquidColor: '#4a3b32',
      labelNumber: 'N° 03'
    }
  },

  // =========================================================================
  // 4. MAIN PROJECT: ARCHITECT OF NOTHING
  // =========================================================================
  {
    id: 'architect-of-nothing',
    isMain: true,
    title: 'Architect of Nothing',
    shortTitle: 'Architect of Nothing',
    category: 'Critical Design / Physical Computing',
    type: 'Interactive Narrative Game / Embedded Hardware',
    year: 'Year 2 MA',
    date: 'MA Experience Design Year 2 (Academic Submission)',
    role: 'Individual Creator (Concept, Hardware, Software, Narrative, Assembly)',
    team: 'Individual Project',
    tagline: 'A deconstructed physical game console that quietly measures and manipulates your choices while you play.',
    summary: 'A functional ESP32-powered physical game console mounted in an open framed layout that uses branching narrative mechanics on a 1.8" TFT display to critique system conformity and human agency.',
    caseStudyUrl: 'case-studies/architect-of-nothing.html',

    problem: 'Modern socio-technical systems subtly manipulate individual autonomy and enforce conformity under the guise of choice and progress. Protocols govern human behavior invisibly.',
    whatIDid: 'Grounded concept in Alexander Galloway\'s Protocol Theory and historical Luddism. Coded ESP32 firmware with non-blocking audio, custom SPI TFT text-wrapping, and branching psychological scoring. When 3D-printed casing tolerances failed, adapted the installation into an open deconstructed framed display.',
    whatIMade: 'Constructed an open, framed physical game console with ESP32, 1.8" ST7735 SPI TFT screen, physical tactile switches, custom sound routines, and hand-drawn parchment instruction cards exhibited publicly at an MA gallery showcase.',
    whyItMatters: 'Demonstrates full-stack physical computing mastery, honest adaptive pivoting under fabrication failure, and a mature critique of algorithmic control.',

    tags: ['Physical Computing', 'ESP32 & C++', 'Critical Design', 'Protocol Theory', 'Interactive Narrative'],
    stats: [
      { label: 'Role', value: 'Solo Creator' },
      { label: 'Tech Stack', value: 'ESP32 · ST7735 TFT · C++' },
      { label: 'Exhibition', value: 'Gallery Playtesting' },
      { label: 'Status', value: 'Full Case Study' }
    ],
    placement: {
      position: { x: 0.95, y: -0.35, z: 0.28 },
      rotation: { x: 0, y: -0.15, z: 0 },
      bottleVariant: 'faceted',
      liquidColor: '#2b394a',
      labelNumber: 'N° 04'
    }
  },

  // =========================================================================
  // 5. SUPPORTING PROJECT: MOMENTUM BUDDY
  // =========================================================================
  {
    id: 'momentum-buddy',
    isMain: false,
    title: 'Momentum Buddy',
    shortTitle: 'Momentum Buddy',
    category: 'Mobile UX / Behavioral Product Design',
    type: 'Behavioral Habit Design / Digital Product',
    year: 'Academic Project',
    date: 'Academic Project (MA Experience Design)',
    role: 'Individual Product Designer',
    team: 'Individual Project',
    tagline: 'Replacing cold calendar notifications with human peer accountability and privacy-first co-working sessions.',
    summary: 'A mobile UX concept utilizing body-doubling, mutual deadline pairing, and voice-note reminders to break the guilt-procrastination cycle for solo workers.',
    caseStudyUrl: 'case-studies/momentum-buddy.html',

    problem: 'Traditional productivity apps act as cold, passive reminders easily ignored, triggering a guilt-procrastination cycle for students and remote workers.',
    whatIDid: 'Conducted qualitative interviews, iteratively refined questionnaires to eliminate response bias, developed empathy maps, and tested hand-drawn paper prototypes on phone-shaped test frames during an academic Open House.',
    whatIMade: 'Architected 3 core pillars: 1-on-1 Buddy Matching by domain/workload, Momentum Workspace with privacy-first Ghibli video filters, and the "Human Calendar" replacing automated push alerts with friend voice nudges.',
    whyItMatters: 'Exhibits end-to-end digital UX architecture, task flow modeling, and low-fidelity validation of social habit design.',

    tags: ['UX/UI Design', 'Body Doubling', 'Behavior Change', 'Paper Prototyping', 'User Flows'],
    stats: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Testing', value: 'Open House Playtest' },
      { label: 'Prototype', value: 'Hand-Drawn Paper Flows' },
      { label: 'Status', value: 'Supporting Study' }
    ],
    placement: {
      position: { x: -0.85, y: 1.35, z: 0.18 },
      rotation: { x: 0, y: 0.12, z: 0 },
      bottleVariant: 'sphere',
      liquidColor: '#5c433b',
      labelNumber: 'N° 05'
    }
  },

  // =========================================================================
  // 6. SUPPORTING PROJECT: THE SMELL LIBRARY
  // =========================================================================
  {
    id: 'the-smell-library',
    isMain: false,
    title: 'The Smell Library',
    shortTitle: 'The Smell Library',
    category: 'Multisensory Installation / Cloud Automation',
    type: 'Experiential Design / Automated Database Architecture',
    year: '2026',
    date: 'December 2025 – February 2026',
    duration: 'Approximately 2–3 Months',
    role: 'Co-Creator & System Designer',
    team: 'With Alatinanda Sethi · Mentors: Dr. Dyutiman Mukhopadhyay & Ujjwal Agarwal',
    tagline: 'A multisensory installation that triggers forgotten memories through 36 scents and automated voice archives.',
    summary: 'A physical wooden chest housing 36 QR-tagged essential oil vials backed by an automated Microsoft Power Automate cloud pipeline archiving crowd-sourced oral memories in real time.',
    caseStudyUrl: 'case-studies/the-smell-library.html',

    problem: 'Digital and social media focus exclusively on sight and sound, neglecting olfactory perception—the sense most intimately connected to deep emotional memory recall.',
    whatIDid: 'Curated 36 scents across 8 emotional families. When manual audio file management failed during live gallery trials, engineered an automated backend pipeline connecting QR codes, MS Forms, Power Automate JSON parsing, and OneDrive folder routing.',
    whatIMade: 'Designed a physical crafted wooden chest with 36 QR-tagged scent bottles, a 4x2 ft infographic process poster, and an active gallery listening station tested live at MAHE-SMI gallery.',
    whyItMatters: 'Connects tactile, non-visual sensory touchpoints directly to cloud automation workflows, proving technical system architecture in public installations.',

    tags: ['Multisensory Design', 'Power Automate', 'Cloud Architecture', 'Memory Design', 'Installation'],
    stats: [
      { label: 'Role', value: 'Co-Creator & System Designer' },
      { label: 'Taxonomy', value: '36 Essences · 8 Families' },
      { label: 'Pipeline', value: 'MS Forms → Power Automate → Cloud' },
      { label: 'Status', value: 'Supporting Study' }
    ],
    placement: {
      position: { x: -0.3, y: 1.35, z: 0.18 },
      rotation: { x: 0, y: 0.06, z: 0 },
      bottleVariant: 'apothecary',
      liquidColor: '#2e483d',
      labelNumber: 'N° 06'
    }
  },

  // =========================================================================
  // 7. SUPPORTING PROJECT: RESEARCH TRANSLATION ESSAY
  // =========================================================================
  {
    id: 'research-translation',
    isMain: false,
    title: 'Research Translation: Zoom Fatigue Essay',
    shortTitle: 'Research Translation',
    category: 'Creative Writing / Research Communication',
    type: 'Design Writing / Autoethnographic Synthesis',
    year: 'Year 1 MA',
    date: 'MA Experience Design Year 1 (A3 Writing Workshop)',
    role: 'Author & Lead Researcher',
    team: 'Individual Project',
    tagline: 'Translating dense cognitive ergonomics research into an autoethnographic story about digital exhaustion.',
    summary: 'An autoethnographic story paired with a color-coded academic mapping system to translate 9 empirical peer-reviewed studies on Zoom fatigue into compelling human prose.',
    caseStudyUrl: 'case-studies/research-translation.html',

    problem: 'Empirical UX research and cognitive science data often remain trapped in impenetrable academic prose, preventing designers and general users from visceral understanding.',
    whatIDid: 'Synthesized 9 peer-reviewed papers on video-mediated communication (Fauville, Shockley, Kalakoski, Patel). Developed an autoethnographic first-person narrative recounting a relentless morning of online calls.',
    whatIMade: 'Authored "Am I really here or just my silhouette...?": a dual-stream publication where narrative beats color-code directly into a parallel bibliographic margin explaining real-time cognitive mechanisms.',
    whyItMatters: 'Highlights an exceptional ability to distill complex academic literature and communicate UX research with literary clarity and scientific rigor.',

    tags: ['Creative Writing', 'Research Communication', 'Autoethnography', 'Cognitive Ergonomics', 'Publishing'],
    stats: [
      { label: 'Role', value: 'Author & Researcher' },
      { label: 'Synthesis', value: '9 Peer-Reviewed Studies' },
      { label: 'Format', value: 'Dual-Stream Publication' },
      { label: 'Status', value: 'Supporting Study' }
    ],
    placement: {
      position: { x: 0.3, y: 1.35, z: 0.18 },
      rotation: { x: 0, y: -0.06, z: 0 },
      bottleVariant: 'flask',
      liquidColor: '#433b5c',
      labelNumber: 'N° 07'
    }
  },

  // =========================================================================
  // 8. SUPPORTING PROJECT: BIDAR CRAFT TECHNOLOGY FIELD STUDY
  // =========================================================================
  {
    id: 'bidar-craft-study',
    isMain: false,
    title: 'Bidar Craft Technology Field Study',
    shortTitle: 'Bidar Craft Study',
    category: 'Design Anthropology / Craft Research',
    type: 'Material Intelligence / Field Reflection',
    year: '2025',
    date: 'October 2025 (Academic Field Study)',
    role: 'Individual Researcher & Writer',
    team: 'Individual Project',
    tagline: 'Unpacking 100-year-old climate-adaptive wooden door joinery to redefine what "technology" really means.',
    summary: 'An ethnographic design reflection in Bidar analyzing traditional zero-nail Vishwakarma joinery as an enduring, climate-adaptive material intelligence.',
    caseStudyUrl: 'case-studies/bidar-craft-study.html',

    problem: 'Modern culture reduces "technology" strictly to microchips and software, erasing centuries of accumulated material intelligence and climate-adaptive craft joinery.',
    whatIDid: 'Conducted ethnographic field interviews with local residents and Vishwakarma wood artisans in Bidar, Karnataka. Analyzed structural survival differences between 100-year-old traditional doors and 40-year-old rotting modern doors.',
    whatIMade: 'Authored an analytical reflection examining tapered tongue-and-hole interlocking joinery locked with wooden pegs, documenting how gravity and humidity expansion preserve structural integrity without nails.',
    whyItMatters: 'Demonstrates deep ethnographic curiosity and foundational principles for sustainable, zero-fastener physical product disassembly.',

    tags: ['Craft Research', 'Field Study', 'Material Intelligence', 'Design Anthropology', 'Ethnography'],
    stats: [
      { label: 'Role', value: 'Field Researcher' },
      { label: 'Artifact', value: '100-Yr Vishwakarma Doors' },
      { label: 'Mechanism', value: 'Zero-Nail Interlocking Peg' },
      { label: 'Status', value: 'Supporting Study' }
    ],
    placement: {
      position: { x: 0.85, y: 1.35, z: 0.18 },
      rotation: { x: 0, y: -0.12, z: 0 },
      bottleVariant: 'arch',
      liquidColor: '#634b35',
      labelNumber: 'N° 08'
    }
  },

  // =========================================================================
  // 9. EXPLORATION: SAND DUNES
  // =========================================================================
  {
    id: 'sand-dunes',
    isMain: false,
    title: 'Sand Dunes: Material & Light Study',
    shortTitle: 'Sand Dunes',
    category: 'Material Exploration / Form & Light Study',
    type: 'Conceptual Sculpture / Form Exploration',
    year: 'Exploration',
    role: 'Individual Maker',
    team: 'Individual Project',
    tagline: 'Abstract cement forms that capture the shifting movement of natural erosion through light and shadow.',
    summary: 'Sculpted abstract cement terrain exploring Japanese aesthetic principles (Wabi-Sabi, Ma) through the dynamic interaction of surface geometry and directional light.',
    caseStudyUrl: 'case-studies/sand-dunes.html',

    problem: 'How can simple, static material forms evoke changing sensory experiences through the interaction of light, shadow, and negative space without literal imitation?',
    whatIDid: 'Studied Japanese concepts of Wabi-Sabi and Ma (negative space). Pivoted away from realistic sand ripples to minimal undulating planes that allow raking light to simulate fluid movement.',
    whatIMade: 'Hand-sculpted and cast Portland cement terrain specimens with varied surface textures, evaluated under shifting directional light angles.',
    whyItMatters: 'Exhibits acute tactile aesthetic sensitivity, spatial composition, and foundational form studies for architectural wall systems.',

    tags: ['Material Study', 'Wabi-Sabi', 'Form Exploration', 'Cement Casting', 'Sculpture'],
    stats: [
      { label: 'Role', value: 'Individual Maker' },
      { label: 'Medium', value: 'Cast Concrete / Cement' },
      { label: 'Philosophy', value: 'Wabi-Sabi & Ma' },
      { label: 'Status', value: 'Material Study' }
    ],
    placement: {
      position: { x: -0.5, y: 2.85, z: 0.12 },
      rotation: { x: 0, y: 0.08, z: 0 },
      bottleVariant: 'faceted',
      liquidColor: '#7a7265',
      labelNumber: 'N° 09'
    }
  },

  // =========================================================================
  // 10. EXPLORATION: QUANTITATIVE LCA
  // =========================================================================
  {
    id: 'learning-lca',
    isMain: false,
    title: 'Quantitative LCA: Plastic vs. Steel Hair Clip',
    shortTitle: 'Learning LCA',
    category: 'Sustainable Design / Environmental Assessment',
    type: 'Quantitative LCA / Hands-on Modeling',
    year: 'Exploration',
    role: 'Individual Researcher / Analyst',
    team: 'Individual Project',
    tagline: 'Building a hands-on Life Cycle Assessment from scratch to calculate the true carbon footprint of daily objects.',
    summary: 'A self-built comparative LCA model comparing polypropylene and steel hair clips (119.0 g vs. 29.8 g CO₂e) to learn carbon hotspot modeling, boundary setting, and sensitivity analysis.',
    caseStudyUrl: 'case-studies/learning-lca.html',

    problem: 'Sustainable consumer claims often make simplistic material substitutions without understanding embodied smelting energy, finishing chemistry, or real-world replacement rates.',
    whatIDid: 'Defined functional units per ISO 14040/44, mapped cradle-to-grave system boundaries, collected emission factors, built a spreadsheet calculation workbook, and executed sensitivity testing on lifespan and electroplating.',
    whatIMade: 'Completed comparative Life Cycle Inventory (LCI) workbook model calculating 119.0 g CO₂e (plastic) vs. 29.8 g CO₂e (steel) and authored a sensitivity analysis report demonstrating how durability assumptions can invert conclusions.',
    whyItMatters: 'Demonstrates quantitative analytical capability, rigorous sustainability literacy, and the ability to evaluate material trade-offs for physical hardware.',

    tags: ['Life Cycle Assessment', 'Circularity', 'Carbon Accounting', 'Sensitivity Analysis', 'Material Strategy'],
    stats: [
      { label: 'Role', value: 'LCA Analyst' },
      { label: 'Baseline', value: '119.0g vs 29.8g CO₂e' },
      { label: 'Standard', value: 'ISO 14040/44 Framework' },
      { label: 'Status', value: 'Quantitative Study' }
    ],
    placement: {
      position: { x: 0.5, y: 2.85, z: 0.12 },
      rotation: { x: 0, y: -0.08, z: 0 },
      bottleVariant: 'sphere',
      liquidColor: '#3d5248',
      labelNumber: 'N° 10'
    }
  }
];

export const PORTFOLIO_SECTIONS = {
  skills: {
    title: 'Skills & Practice',
    subtitle: 'Bridging Experience Design, Product Strategy, Physical Computing & Craft',
    categories: [
      {
        name: 'Product Strategy & Service Systems',
        items: [
          'Service Blueprinting & Journey Architecture',
          'Product Requirements & Problem Framing',
          'Cross-Functional Stakeholder Alignment',
          'Thanatotechnology & Public Health Systems',
          'Quantitative / Qualitative User Research'
        ]
      },
      {
        name: 'Physical Computing, Hardware & Prototyping',
        items: [
          'Embedded C++ / Arduino & ESP32 Microcontrollers',
          'Circuit Schematics & Custom PCB Soldering',
          'SPI TFT Display & Non-Blocking State Machines',
          'Low-Fidelity Paper Prototyping & Form Studies',
          '3D Printing (PLA/Resin) & Material Casting'
        ]
      },
      {
        name: 'Research, Sustainability & Systemic Analysis',
        items: [
          'Quantitative Life Cycle Assessment (ISO 14040/44)',
          'Ecosystem & Multi-Stakeholder Mapping',
          'Design Anthropology & Ethnographic Fieldwork',
          'No-Code Cloud Logic (Power Automate / MS Forms)',
          'Autoethnographic Writing & Research Translation'
        ]
      }
    ]
  },
  process: {
    title: 'Design Methodology',
    subtitle: 'A Rigorous, Evidence-Driven Approach from Inquiry to Deployment',
    steps: [
      {
        num: '01',
        name: 'Systemic Inquiry & Problem Framing',
        desc: 'Deep ethnographic field observation, literature synthesis, and ecosystem mapping to unearth underlying systemic tensions.'
      },
      {
        num: '02',
        name: 'Rapid Prototyping & Tangible Testing',
        desc: 'Translating hypotheses into physical hardware, paper mockups, and service simulations for direct human validation.'
      },
      {
        num: '03',
        name: 'Honest Pivots & Constraint Adaptation',
        desc: 'Embracing fabrication limits, discarding overcomplicated mechanisms, and pivoting directly in response to user feedback.'
      },
      {
        num: '04',
        name: 'System Blueprinting & Scalable Strategy',
        desc: 'Synthesizing verified prototypes into actionable service blueprints, cloud workflows, and evidence-driven case studies.'
      }
    ]
  },
  ideas: {
    title: 'Inquiries & Strategy Notes',
    subtitle: 'Essays on Tacit Technology, Protocol Theory & Sensory Memory',
    essays: [
      {
        id: 'tacit-technology',
        title: 'Technology Beyond the Silicon: 100-Year Joinery in Bidar',
        date: 'Autumn 2025',
        excerpt: 'Why 100-year-old climate-adaptive wooden door joinery proves that technology lives in artisan hands rather than cloud servers.'
      },
      {
        id: 'invisible-protocols',
        title: 'Protocols as Hidden Architecture: Galloway & Critical Making',
        date: 'Winter 2025',
        excerpt: 'How modern software rules disguise authority as technical necessity, and why physical deconstruction exposes the machinery of control.'
      },
      {
        id: 'sensory-mourning',
        title: 'The Logistical Buffer: Designing for the Golden Hour of Grief',
        date: 'Spring 2026',
        excerpt: 'Why bereaved families reject cold corporate apps, demanding instead an invisible service infrastructure that protects dignity.'
      }
    ]
  },
  about: {
    title: 'About Me',
    subtitle: 'Experience Design · Product Thinking',
    bio: 'I am pursuing an M.A. in Experience Design at Srishti Manipal Institute of Art, Design and Technology in Bangalore. My earlier studies were in B.Sc. Clinical Psychology at Amity University, Mumbai.',
    interests: ['Research', 'Ideation', 'Systems thinking', 'Strategy', 'Experience design', 'Product thinking'],
    direction: 'I am working toward product-management-oriented roles, bringing a design and research foundation to how I understand people, products, and the systems around them.'
  },
  contact: {
    title: 'Initiate a Dialogue',
    subtitle: 'Product Roles, Systemic Inquiries & Collaboration',
    email: 'sudarsiniimazumdar@gmail.com',
    location: 'Bengaluru / Remote',
    channels: [
      { label: 'Email Inquiry', value: 'sudarsiniimazumdar@gmail.com', href: 'mailto:sudarsiniimazumdar@gmail.com' },
      { label: 'GitHub Repository', value: 'github.com/sudarsiniimazumdar-eng', href: 'https://github.com/sudarsiniimazumdar-eng' },
      { label: 'Curiosity Cabinet Archive', value: 'Interactive 3D Portfolio', href: '#' }
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
