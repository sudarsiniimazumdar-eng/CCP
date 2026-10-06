import * as THREE from 'three';
import { SHELF_CONFIG } from '../data/projects.js';

/**
 * Enhanced Curiosity Cabinet with Interactive Pull-Out Drawers & Props
 */
export function createCabinet() {
  const cabinetGroup = new THREE.Group();
  cabinetGroup.name = 'Cabinet_Environment';

  const { cabinetHeight, cabinetWidth, cabinetDepth } = SHELF_CONFIG;
  const woodThickness = 0.16;

  // Materials
  const stoneArchMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a312a,
    roughness: 0.95,
    metalness: 0.05
  });

  const darkWalnutMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f1612,
    roughness: 0.78,
    metalness: 0.08
  });

  const innerWoodMaterial = new THREE.MeshStandardMaterial({
    color: 0x160f0c,
    roughness: 0.88,
    metalness: 0.04
  });

  const backboardMaterial = new THREE.MeshStandardMaterial({
    color: 0x100b08,
    roughness: 0.92,
    metalness: 0.02
  });

  const tarnishedBrassMaterial = new THREE.MeshStandardMaterial({
    color: 0xb5843a,
    roughness: 0.42,
    metalness: 0.82
  });

  const verdigrisCopperMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d6b58,
    roughness: 0.65,
    metalness: 0.6
  });

  const parchmentPaperMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5d4bc,
    roughness: 0.85,
    metalness: 0.0
  });

  const waxCandleMaterial = new THREE.MeshStandardMaterial({
    color: 0xded2be,
    roughness: 0.5,
    metalness: 0.05,
    transparent: true,
    opacity: 0.92
  });

  const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
  const driedBotanicalMaterial = new THREE.MeshStandardMaterial({ color: 0x48523b, roughness: 0.9, metalness: 0.0 });
  const leatherRedMaterial = new THREE.MeshStandardMaterial({ color: 0x4a1815, roughness: 0.7, metalness: 0.1 });
  const leatherGreenMaterial = new THREE.MeshStandardMaterial({ color: 0x1b2e22, roughness: 0.75, metalness: 0.1 });
  const skullBoneMaterial = new THREE.MeshStandardMaterial({ color: 0xd9cebd, roughness: 0.8, metalness: 0.05 });

  // 1. Backing Board
  const backGeo = new THREE.BoxGeometry(cabinetWidth, cabinetHeight, 0.12);
  const backMesh = new THREE.Mesh(backGeo, backboardMaterial);
  backMesh.position.set(0, 0, -cabinetDepth / 2);
  backMesh.receiveShadow = true;
  cabinetGroup.add(backMesh);

  // 2. Stone Archway Crown
  const stoneArchTop = new THREE.Mesh(
    new THREE.BoxGeometry(cabinetWidth + 0.4, 0.55, cabinetDepth + 0.2),
    stoneArchMaterial
  );
  stoneArchTop.position.set(0, cabinetHeight / 2 - 0.2, 0.05);
  stoneArchTop.castShadow = true;
  stoneArchTop.receiveShadow = true;
  cabinetGroup.add(stoneArchTop);

  const keystone = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.65, cabinetDepth + 0.28),
    stoneArchMaterial
  );
  keystone.position.set(0, cabinetHeight / 2 - 0.22, 0.1);
  cabinetGroup.add(keystone);

  // 3. Heavy Walnut Outer Frame
  const leftFrame = new THREE.Mesh(new THREE.BoxGeometry(woodThickness, cabinetHeight, cabinetDepth), darkWalnutMaterial);
  leftFrame.position.set(-cabinetWidth / 2 + woodThickness / 2, 0, 0);
  leftFrame.receiveShadow = true;
  cabinetGroup.add(leftFrame);

  const rightFrame = new THREE.Mesh(new THREE.BoxGeometry(woodThickness, cabinetHeight, cabinetDepth), darkWalnutMaterial);
  rightFrame.position.set(cabinetWidth / 2 - woodThickness / 2, 0, 0);
  rightFrame.receiveShadow = true;
  cabinetGroup.add(rightFrame);

  const bottomPlinth = new THREE.Mesh(new THREE.BoxGeometry(cabinetWidth + 0.3, 0.45, cabinetDepth + 0.15), darkWalnutMaterial);
  bottomPlinth.position.set(0, -cabinetHeight / 2 + 0.22, 0.05);
  bottomPlinth.receiveShadow = true;
  cabinetGroup.add(bottomPlinth);

  // 4. Main Shelves
  const shelfYPositions = [1.2, -0.75, -2.35];

  const shelf0 = new THREE.Mesh(new THREE.BoxGeometry(cabinetWidth - woodThickness * 2, 0.12, cabinetDepth), darkWalnutMaterial);
  shelf0.position.set(0, shelfYPositions[0], 0);
  shelf0.receiveShadow = true;
  cabinetGroup.add(shelf0);

  const shelf1 = new THREE.Mesh(new THREE.BoxGeometry(cabinetWidth - woodThickness * 2, 0.12, cabinetDepth), darkWalnutMaterial);
  shelf1.position.set(0, shelfYPositions[1], 0);
  shelf1.receiveShadow = true;
  cabinetGroup.add(shelf1);

  const shelf2 = new THREE.Mesh(new THREE.BoxGeometry(cabinetWidth - woodThickness * 2, 0.16, cabinetDepth + 0.12), darkWalnutMaterial);
  shelf2.position.set(0, shelfYPositions[2], 0.06);
  shelf2.receiveShadow = true;
  cabinetGroup.add(shelf2);

  // Brass Edge Mouldings
  [shelf0, shelf1, shelf2].forEach(shelf => {
    const trim = new THREE.Mesh(new THREE.BoxGeometry(cabinetWidth - woodThickness * 2, 0.035, 0.035), tarnishedBrassMaterial);
    trim.position.set(0, shelf.position.y + 0.045, cabinetDepth / 2 + 0.02);
    cabinetGroup.add(trim);
  });

  // 5. Arched Pigeonholes
  createArchedPigeonholes(cabinetGroup, {
    yLevel: shelfYPositions[0] + 0.06,
    height: 1.85,
    width: cabinetWidth - woodThickness * 2,
    depth: cabinetDepth * 0.85,
    material: innerWoodMaterial,
    brassMaterial: tarnishedBrassMaterial
  });

  // 6. Asymmetrical Partition Dividers on Middle Shelf
  const divMid1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.85, cabinetDepth * 0.9), innerWoodMaterial);
  divMid1.position.set(-1.8, 0.18, 0);
  cabinetGroup.add(divMid1);

  const divMid2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.85, cabinetDepth * 0.9), innerWoodMaterial);
  divMid2.position.set(1.8, 0.18, 0);
  cabinetGroup.add(divMid2);

  const subShelf = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.08, cabinetDepth * 0.8), innerWoodMaterial);
  subShelf.position.set(2.65, 0.15, 0);
  cabinetGroup.add(subShelf);

  // 7. Interactive Pull-Out Apothecary Drawers
  const drawerGroups = createInteractiveDrawers(cabinetGroup, {
    cabinetWidth,
    woodThickness,
    cabinetDepth,
    darkWalnutMaterial,
    innerWoodMaterial,
    tarnishedBrassMaterial,
    parchmentPaperMaterial
  });

  // 8. Curiosity Props
  addApothecaryProps(cabinetGroup, {
    shelfYPositions,
    waxCandleMaterial,
    flameMaterial,
    skullBoneMaterial,
    leatherRedMaterial,
    leatherGreenMaterial,
    parchmentPaperMaterial,
    tarnishedBrassMaterial,
    driedBotanicalMaterial,
    verdigrisCopperMaterial
  });

  cabinetGroup.userData = {
    shelfYPositions,
    getShelfY: (shelfIndex) => shelfYPositions[shelfIndex] + 0.06,
    drawers: drawerGroups
  };

  return cabinetGroup;
}

function createArchedPigeonholes(group, { yLevel, height, width, depth, material, brassMaterial }) {
  const archCount = 3;
  const colWidth = width / archCount;

  for (let i = 0; i <= archCount; i++) {
    const xPos = -width / 2 + i * colWidth;
    const divider = new THREE.Mesh(new THREE.BoxGeometry(0.08, height, depth), material);
    divider.position.set(xPos, yLevel + height / 2, 0);
    group.add(divider);
  }

  for (let i = 0; i < archCount; i++) {
    const xCenter = -width / 2 + (i + 0.5) * colWidth;
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(colWidth - 0.04, 0.22, depth * 0.95), material);
    archTop.position.set(xCenter, yLevel + height - 0.11, 0);
    group.add(archTop);

    const stud = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), brassMaterial);
    stud.position.set(xCenter, yLevel + height - 0.11, depth / 2 + 0.02);
    group.add(stud);
  }
}

/**
 * Creates 6 Modular Interactive Pull-Out Drawers
 */
function createInteractiveDrawers(cabinetGroup, { cabinetWidth, woodThickness, cabinetDepth, darkWalnutMaterial, innerWoodMaterial, tarnishedBrassMaterial, parchmentPaperMaterial }) {
  const drawerCount = 6;
  const drawerWidth = (cabinetWidth - woodThickness * 2 - 0.3) / drawerCount;
  const drawerHeight = 0.88;
  const drawerY = -2.95;
  const drawerGroups = [];

  const drawerData = [
    { id: 'drawer-sketches', label: 'I. SKETCHES', title: 'Early Process Sketches', content: 'Archived physical pencil ideations, ergonomic mockups, and early prototype scribbles.' },
    { id: 'drawer-materials', label: 'II. MATERIALS', title: 'Material Swatches & LCA', content: 'Polymer degradation samples, stamped brass chips, and comparative carbon emission indexes.' },
    { id: 'drawer-inquiries', label: 'III. INQUIRIES', title: 'Philosophy & Essays', content: 'Notes on architectural absence, negative space psychology, and sensory ritual design.' },
    { id: 'drawer-experiments', label: 'IV. SPECIMENS', title: 'Failed Prototypes', content: 'A cabinet of glorious failures: 3D prints, broken casts, and lessons from physical testing.' },
    { id: 'drawer-blueprints', label: 'V. BLUEPRINTS', title: 'Service Blueprints', content: 'Public transit touchpoint maps, behavioral journey charts, and clinic interaction playbooks.' },
    { id: 'drawer-ephemera', label: 'VI. ARCHIVE', title: 'Curator Log & Contact', content: 'Personal manifesto, contact channels, resume transcript, and bibliography.' }
  ];

  for (let i = 0; i < drawerCount; i++) {
    const xPos = - (cabinetWidth / 2) + woodThickness + drawerWidth * (i + 0.5) + 0.15;
    const dData = drawerData[i];

    const drawerGroup = new THREE.Group();
    drawerGroup.name = `Drawer_${dData.id}`;
    drawerGroup.position.set(xPos, drawerY, cabinetDepth / 2 - 0.04);

    // Front Face
    const frontFace = new THREE.Mesh(new THREE.BoxGeometry(drawerWidth - 0.06, drawerHeight, 0.08), darkWalnutMaterial);
    frontFace.position.set(0, 0, 0);
    drawerGroup.add(frontFace);

    // Drawer Cavity Box (Internal box sliding out)
    const cavityDepth = cabinetDepth * 0.75;
    const cavityBottom = new THREE.Mesh(new THREE.BoxGeometry(drawerWidth - 0.12, 0.04, cavityDepth), innerWoodMaterial);
    cavityBottom.position.set(0, -drawerHeight / 2 + 0.04, -cavityDepth / 2);
    drawerGroup.add(cavityBottom);

    const cavityLeft = new THREE.Mesh(new THREE.BoxGeometry(0.04, drawerHeight * 0.6, cavityDepth), innerWoodMaterial);
    cavityLeft.position.set(-(drawerWidth - 0.12) / 2, -0.1, -cavityDepth / 2);
    drawerGroup.add(cavityLeft);

    const cavityRight = new THREE.Mesh(new THREE.BoxGeometry(0.04, drawerHeight * 0.6, cavityDepth), innerWoodMaterial);
    cavityRight.position.set((drawerWidth - 0.12) / 2, -0.1, -cavityDepth / 2);
    drawerGroup.add(cavityRight);

    // Internal Parchment Sheets inside drawer
    const paperSheet = new THREE.Mesh(new THREE.PlaneGeometry(drawerWidth * 0.65, cavityDepth * 0.65), parchmentPaperMaterial);
    paperSheet.rotation.x = -Math.PI / 2;
    paperSheet.position.set(0, -drawerHeight / 2 + 0.065, -cavityDepth * 0.45);
    drawerGroup.add(paperSheet);

    // Brass Label Frame Plate on front
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.2, 0.02), tarnishedBrassMaterial);
    plate.position.set(0, 0.12, 0.05);
    drawerGroup.add(plate);

    // Stained Paper Label
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.13), parchmentPaperMaterial);
    paper.position.set(0, 0.12, 0.065);
    drawerGroup.add(paper);

    // Brass Cup Pull Ring
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.018, 12, 24), tarnishedBrassMaterial);
    handle.position.set(0, -0.14, 0.07);
    drawerGroup.add(handle);

    // User Data for interactive management
    drawerGroup.userData = {
      isInteractive: true,
      type: 'drawer',
      drawerData: dData,
      basePosition: drawerGroup.position.clone(),
      isOpen: false,
      openZOffset: 0.65 // Pull distance
    };

    cabinetGroup.add(drawerGroup);
    drawerGroups.push(drawerGroup);
  }

  return drawerGroups;
}

function addApothecaryProps(group, { shelfYPositions, waxCandleMaterial, flameMaterial, skullBoneMaterial, leatherRedMaterial, leatherGreenMaterial, parchmentPaperMaterial, tarnishedBrassMaterial, driedBotanicalMaterial, verdigrisCopperMaterial }) {
  const createCandle = (x, y, z, h = 0.45) => {
    const candleGroup = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.075, h, 16), waxCandleMaterial);
    body.position.y = h / 2;
    candleGroup.add(body);

    const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.06, 8), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    wick.position.y = h + 0.03;
    candleGroup.add(wick);

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.09, 12), flameMaterial);
    flame.position.y = h + 0.075;
    candleGroup.add(flame);

    const candleLight = new THREE.PointLight(0xff8e3b, 0.85, 3.5, 2.0);
    candleLight.position.y = h + 0.1;
    candleGroup.add(candleLight);

    candleGroup.position.set(x, y, z);
    return candleGroup;
  };

  group.add(createCandle(-3.1, shelfYPositions[1] + 0.06, 0.25, 0.48));
  group.add(createCandle(3.0, shelfYPositions[0] + 0.06, 0.2, 0.38));

  // Alchemical Skull
  const skullGroup = new THREE.Group();
  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), skullBoneMaterial);
  cranium.scale.set(1, 1.1, 1.15);
  cranium.position.y = 0.24;
  const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.2), skullBoneMaterial);
  jaw.position.set(0, 0.08, 0.1);
  skullGroup.add(cranium);
  skullGroup.add(jaw);
  skullGroup.position.set(-3.1, shelfYPositions[0] + 0.06, 0.2);
  skullGroup.rotation.y = 0.4;
  group.add(skullGroup);

  // Stacked Leather Books
  const book1 = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.14, 0.65), leatherRedMaterial);
  book1.position.set(2.65, 0.22, 0.08);
  book1.rotation.y = 0.08;
  group.add(book1);

  const book2 = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.12, 0.58), leatherGreenMaterial);
  book2.position.set(2.62, 0.35, 0.09);
  book2.rotation.y = -0.12;
  group.add(book2);

  // Hanging Herb Bundles
  const createHerbBundle = (x, y, z) => {
    const bundleGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.035, 0.55, 8), driedBotanicalMaterial);
      stem.position.set((Math.random() - 0.5) * 0.08, -0.25, (Math.random() - 0.5) * 0.08);
      stem.rotation.z = (Math.random() - 0.5) * 0.3;
      bundleGroup.add(stem);
    }
    bundleGroup.position.set(x, y, z);
    return bundleGroup;
  };

  group.add(createHerbBundle(-1.8, 2.9, 0.2));
  group.add(createHerbBundle(1.8, 2.9, 0.2));

  // Rolled Parchment Scroll
  const scroll = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.68, 16), parchmentPaperMaterial);
  scroll.rotation.z = Math.PI / 2;
  scroll.rotation.y = 0.2;
  scroll.position.set(-2.55, shelfYPositions[1] + 0.12, 0.15);
  group.add(scroll);

  // Antique Copper Alembic
  const alembic = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 0.26, 24), verdigrisCopperMaterial);
  alembic.position.set(3.0, shelfYPositions[1] + 0.14, 0.1);
  group.add(alembic);
}
