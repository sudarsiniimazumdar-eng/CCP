import * as THREE from 'three';

/**
 * Highly Ornate Victorian / Gothic Curiosity Cabinet
 * Rich old-fashioned carpentry with carved arches, barley-twist spiral columns,
 * acanthus scroll bracket corbels, dentil moulding, and raised-panel drawers
 */
export function createCabinet() {
  const cabinetGroup = new THREE.Group();
  cabinetGroup.name = 'Curiosity_Cabinet_Assemblage';

  const textureLoader = new THREE.TextureLoader();
  const materialTex = textureLoader.load('./references_images/material.jpg');
  const typographyTex = textureLoader.load('./references_images/typography.jpg');
  materialTex.anisotropy = 8;
  typographyTex.anisotropy = 8;

  // --- Authentic Materials ---
  const darkWalnutMaterial = new THREE.MeshStandardMaterial({
    map: materialTex,
    color: 0x2e1c12, // Deep aged dark walnut
    roughness: 0.76,
    metalness: 0.08
  });

  const antiqueCarvedWoodMaterial = new THREE.MeshStandardMaterial({
    map: materialTex,
    color: 0x3d2417, // Hand-carved warm aged mahogany
    roughness: 0.65,
    metalness: 0.06
  });

  const velvetLinerMaterial = new THREE.MeshStandardMaterial({
    color: 0x142018, // Deep emerald velvet
    roughness: 0.95,
    metalness: 0.02
  });

  const innerCavityMaterial = new THREE.MeshStandardMaterial({
    color: 0x120a07,
    roughness: 0.94,
    metalness: 0.02
  });

  const tarnishedBrassMaterial = new THREE.MeshStandardMaterial({
    color: 0xc8963e,
    roughness: 0.35,
    metalness: 0.88
  });

  const ironHardwareMaterial = new THREE.MeshStandardMaterial({
    color: 0x383532,
    roughness: 0.6,
    metalness: 0.78
  });

  const casterRubberMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b1c1e,
    roughness: 0.85,
    metalness: 0.08
  });

  const clocheGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.92,
    opacity: 1,
    transparent: true,
    roughness: 0.08,
    ior: 1.52,
    metalness: 0.05
  });

  const crystalSpecimenMaterial = new THREE.MeshStandardMaterial({
    color: 0x9c27b0,
    emissive: 0x3a0a45,
    emissiveIntensity: 0.5,
    roughness: 0.15,
    metalness: 0.15
  });

  const grimoirePageMaterial = new THREE.MeshStandardMaterial({
    map: typographyTex,
    roughness: 0.85,
    metalness: 0.0
  });

  const leatherRedMaterial = new THREE.MeshStandardMaterial({ color: 0x4a1815, roughness: 0.7, metalness: 0.1 });
  const leatherGreenMaterial = new THREE.MeshStandardMaterial({ color: 0x182c1f, roughness: 0.75, metalness: 0.1 });
  const leatherBrownMaterial = new THREE.MeshStandardMaterial({ color: 0x3b2416, roughness: 0.8, metalness: 0.1 });
  const skullBoneMaterial = new THREE.MeshStandardMaterial({ color: 0xd9cebd, roughness: 0.8, metalness: 0.05 });
  const waxCandleMaterial = new THREE.MeshStandardMaterial({ color: 0xded2be, roughness: 0.5, metalness: 0.05, transparent: true, opacity: 0.92 });
  const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
  const driedHerbMaterial = new THREE.MeshStandardMaterial({ color: 0x556042, roughness: 0.95, metalness: 0.0 });
  const twineCordMaterial = new THREE.MeshStandardMaterial({ color: 0x8c785d, roughness: 0.9, metalness: 0.0 });

  // 1. BASE: Timber Dolly Cart with Heavy Chamfered Beams
  const cartWidth = 3.6;
  const cartDepth = 2.4;
  const cartThickness = 0.32;
  const cartY = -3.2;

  const cartBase = new THREE.Mesh(
    new THREE.BoxGeometry(cartWidth, cartThickness, cartDepth),
    antiqueCarvedWoodMaterial
  );
  cartBase.position.set(0, cartY, 0);
  cartBase.receiveShadow = true;
  cartBase.castShadow = true;
  cabinetGroup.add(cartBase);

  // Riveted Iron & Brass Corner Straps
  const createCartCorner = (x, z) => {
    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, cartThickness * 1.05, 0.25),
      tarnishedBrassMaterial
    );
    bracket.position.set(x, cartY, z);
    cabinetGroup.add(bracket);

    [-0.08, 0.08].forEach(ry => {
      const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), ironHardwareMaterial);
      rivet.position.set(x > 0 ? x + 0.13 : x - 0.13, cartY + ry, z > 0 ? z + 0.13 : z - 0.13);
      cabinetGroup.add(rivet);
    });
  };
  createCartCorner(-cartWidth / 2 + 0.12, -cartDepth / 2 + 0.12);
  createCartCorner(cartWidth / 2 - 0.12, -cartDepth / 2 + 0.12);
  createCartCorner(-cartWidth / 2 + 0.12, cartDepth / 2 - 0.12);
  createCartCorner(cartWidth / 2 - 0.12, cartDepth / 2 - 0.12);

  // 4 Caster Wheels
  const createCasterWheel = (x, z) => {
    const casterGroup = new THREE.Group();
    const fork = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.32, 0.2), ironHardwareMaterial);
    fork.position.y = -0.18;
    casterGroup.add(fork);

    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 24), casterRubberMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.y = -0.38;
    casterGroup.add(wheel);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.16, 16), tarnishedBrassMaterial);
    hub.rotation.z = Math.PI / 2;
    hub.position.y = -0.38;
    casterGroup.add(hub);

    casterGroup.position.set(x, cartY - cartThickness / 2, z);
    return casterGroup;
  };

  cabinetGroup.add(createCasterWheel(-cartWidth / 2 + 0.45, -cartDepth / 2 + 0.45));
  cabinetGroup.add(createCasterWheel(cartWidth / 2 - 0.45, -cartDepth / 2 + 0.45));
  cabinetGroup.add(createCasterWheel(-cartWidth / 2 + 0.45, cartDepth / 2 - 0.45));
  cabinetGroup.add(createCasterWheel(cartWidth / 2 - 0.45, cartDepth / 2 - 0.45));

  // 2. LAYER 1: Bank of 6 Raised-Panel Apothecary Drawers
  const drawerGroups = createStackedDrawerBank(cabinetGroup, {
    cartY,
    cartThickness,
    darkWalnutMaterial,
    antiqueCarvedWoodMaterial,
    innerCavityMaterial,
    tarnishedBrassMaterial,
    ironHardwareMaterial
  });

  // Hanging Keyring on the side
  const keyRingGroup = createHangingKeyRing(tarnishedBrassMaterial, ironHardwareMaterial);
  keyRingGroup.position.set(1.68, -2.1, 0.6);
  cabinetGroup.add(keyRingGroup);

  // 3. LAYER 2: Middle Open Vitrine with Gothic Arches, Barley-Twist Columns & Carved Corbels
  createMiddleDisplayVitrine(cabinetGroup, {
    darkWalnutMaterial,
    antiqueCarvedWoodMaterial,
    velvetLinerMaterial,
    tarnishedBrassMaterial,
    clocheGlassMaterial,
    crystalSpecimenMaterial,
    grimoirePageMaterial,
    leatherRedMaterial,
    leatherGreenMaterial,
    leatherBrownMaterial,
    driedHerbMaterial,
    twineCordMaterial
  });

  // 4. LAYER 3: Upper Showcase Tier with Carved Dentil Moulding, Crown Pediment & Hourglass
  createUpperShowcaseTier(cabinetGroup, {
    darkWalnutMaterial,
    antiqueCarvedWoodMaterial,
    velvetLinerMaterial,
    tarnishedBrassMaterial,
    clocheGlassMaterial,
    skullBoneMaterial,
    waxCandleMaterial,
    flameMaterial,
    leatherRedMaterial,
    leatherGreenMaterial,
    twineCordMaterial
  });

  cabinetGroup.userData = {
    drawers: drawerGroups
  };

  return cabinetGroup;
}

/**
 * Bank of 6 Raised-Panel Apothecary Drawers with Mitered Mouldings
 */
function createStackedDrawerBank(group, { cartY, cartThickness, darkWalnutMaterial, antiqueCarvedWoodMaterial, innerCavityMaterial, tarnishedBrassMaterial, ironHardwareMaterial }) {
  const drawerGroups = [];
  const startY = cartY + cartThickness / 2;

  // Outer Drawer Housing
  const baseBody = new THREE.Mesh(
    new THREE.BoxGeometry(3.3, 1.8, 2.2),
    darkWalnutMaterial
  );
  baseBody.position.set(0, startY + 0.9, 0);
  baseBody.receiveShadow = true;
  group.add(baseBody);

  // Carved Waist Moulding along top of drawer chest
  const waistMoulding = new THREE.Mesh(
    new THREE.BoxGeometry(3.5, 0.14, 2.38),
    antiqueCarvedWoodMaterial
  );
  waistMoulding.position.set(0, startY + 1.86, 0);
  group.add(waistMoulding);

  // 6 Interactive Drawers with Raised Beveled Panels
  const drawerData = [
    { id: 'drawer-sketches', label: 'I. SKETCHES', title: 'Early Process Sketches', content: 'Archived physical pencil ideations, ergonomic mockups, and early prototype scribbles.', x: -0.95, y: startY + 1.35, z: 1.12, w: 0.9, h: 0.45, openDist: 0.65 },
    { id: 'drawer-materials', label: 'II. MATERIALS', title: 'Material Swatches & LCA', content: 'Polymer degradation samples, stamped brass chips, and comparative carbon emission indexes.', x: 0, y: startY + 1.35, z: 1.12, w: 0.9, h: 0.45, openDist: 0.75 },
    { id: 'drawer-inquiries', label: 'III. INQUIRIES', title: 'Philosophy & Essays', content: 'Notes on architectural absence, negative space psychology, and sensory ritual design.', x: 0.95, y: startY + 1.35, z: 1.12, w: 0.9, h: 0.45, openDist: 0.55 },
    { id: 'drawer-experiments', label: 'IV. SPECIMENS', title: 'Failed Prototypes', content: 'A cabinet of glorious failures: 3D prints, broken casts, and lessons from physical testing.', x: -0.95, y: startY + 0.75, z: 1.12, w: 0.9, h: 0.45, openDist: 0.7 },
    { id: 'drawer-blueprints', label: 'V. BLUEPRINTS', title: 'Service Blueprints', content: 'Public transit touchpoint maps, behavioral journey charts, and clinic interaction playbooks.', x: 0, y: startY + 0.75, z: 1.12, w: 0.9, h: 0.45, openDist: 0.6 },
    { id: 'drawer-ephemera', label: 'VI. ARCHIVE', title: 'Curator Log & Contact', content: 'Personal manifesto, contact channels, resume transcript, and bibliography.', x: 0.95, y: startY + 0.75, z: 1.12, w: 0.9, h: 0.45, openDist: 0.8 }
  ];

  drawerData.forEach((d) => {
    const dGroup = new THREE.Group();
    dGroup.name = `Drawer_${d.id}`;
    dGroup.position.set(d.x, d.y, d.z);

    // Front Face Frame
    const front = new THREE.Mesh(new THREE.BoxGeometry(d.w - 0.05, d.h - 0.05, 0.08), darkWalnutMaterial);
    dGroup.add(front);

    // Carved Raised Beveled Field Panel on drawer front
    const raisedPanel = new THREE.Mesh(new THREE.BoxGeometry(d.w - 0.16, d.h - 0.16, 0.035), antiqueCarvedWoodMaterial);
    raisedPanel.position.set(0, 0, 0.045);
    dGroup.add(raisedPanel);

    // Inner sliding box cavity
    const boxDepth = 1.3;
    const boxBottom = new THREE.Mesh(new THREE.BoxGeometry(d.w - 0.1, 0.04, boxDepth), innerCavityMaterial);
    boxBottom.position.set(0, -d.h / 2 + 0.03, -boxDepth / 2);
    dGroup.add(boxBottom);

    const boxLeft = new THREE.Mesh(new THREE.BoxGeometry(0.03, d.h * 0.7, boxDepth), innerCavityMaterial);
    boxLeft.position.set(-(d.w - 0.1) / 2, -0.05, -boxDepth / 2);
    dGroup.add(boxLeft);

    const boxRight = new THREE.Mesh(new THREE.BoxGeometry(0.03, d.h * 0.7, boxDepth), innerCavityMaterial);
    boxRight.position.set((d.w - 0.1) / 2, -0.05, -boxDepth / 2);
    dGroup.add(boxRight);

    // Brass Label Frame
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.18, 0.02), tarnishedBrassMaterial);
    frame.position.set(0, 0.07, 0.065);
    dGroup.add(frame);

    // Brass Pull Ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.016, 12, 24), tarnishedBrassMaterial);
    ring.position.set(0, -0.09, 0.08);
    dGroup.add(ring);

    dGroup.userData = {
      isInteractive: true,
      type: 'drawer',
      drawerData: d,
      basePosition: dGroup.position.clone(),
      isOpen: false,
      openZOffset: d.openDist
    };

    group.add(dGroup);
    drawerGroups.push(dGroup);
  });

  return drawerGroups;
}

/**
 * Hanging Skeleton Key Ring
 */
function createHangingKeyRing(brassMat, ironMat) {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 12, 24), brassMat);
  ring.rotation.y = Math.PI / 2;
  group.add(ring);

  const hook = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 0.08), brassMat);
  hook.position.set(-0.02, 0.08, 0);
  group.add(hook);

  [-0.04, 0, 0.04].forEach((zOff, i) => {
    const key = new THREE.Group();
    key.position.set(0, -0.12, zOff);
    key.rotation.z = 0.1 + i * 0.08;

    const bow = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.008, 8, 16), ironMat);
    key.add(bow);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.28, 8), ironMat);
    stem.position.y = -0.14;
    key.add(stem);

    const bit = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.06, 0.04), ironMat);
    bit.position.set(0, -0.24, 0.02);
    key.add(bit);

    group.add(key);
  });

  return group;
}

/**
 * Creates a Barley-Twist Spiral Column
 */
function createBarleyTwistColumn(woodMat, brassMat, height = 2.0) {
  const colGroup = new THREE.Group();

  // Carved Square Pedestal Base
  const baseBox = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.28, 0.22), woodMat);
  baseBox.position.y = 0.14;
  colGroup.add(baseBox);

  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 12, 24), brassMat);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = 0.28;
  colGroup.add(baseRing);

  // Twisted Shaft using helical segments
  const shaftHeight = height - 0.6;
  const turns = 4;
  const segments = 28;
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const y = 0.32 + t * shaftHeight;
    const angle = t * Math.PI * 2 * turns;

    const bead1 = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), woodMat);
    bead1.position.set(Math.cos(angle) * 0.045, y, Math.sin(angle) * 0.045);
    colGroup.add(bead1);

    const bead2 = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), woodMat);
    bead2.position.set(Math.cos(angle + Math.PI) * 0.045, y, Math.sin(angle + Math.PI) * 0.045);
    colGroup.add(bead2);
  }

  // Corinthian / Classical Capital at Top
  const capRing = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 12, 24), brassMat);
  capRing.rotation.x = Math.PI / 2;
  capRing.position.y = height - 0.28;
  colGroup.add(capRing);

  const capBox = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.22), woodMat);
  capBox.position.y = height - 0.12;
  colGroup.add(capBox);

  return colGroup;
}

/**
 * Creates Carved Acanthus Scroll Bracket Corbel
 */
function createCarvedCorbel(woodMat) {
  const corbel = new THREE.Group();

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.38, 0.22), woodMat);
  body.position.set(0, -0.19, -0.11);
  corbel.add(body);

  // Top scroll volute
  const topScroll = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16), woodMat);
  topScroll.rotation.z = Math.PI / 2;
  topScroll.position.set(0, -0.08, 0);
  corbel.add(topScroll);

  // Bottom smaller scroll volute
  const botScroll = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.12, 16), woodMat);
  botScroll.rotation.z = Math.PI / 2;
  botScroll.position.set(0, -0.3, -0.06);
  corbel.add(botScroll);

  return corbel;
}

/**
 * Layer 2: Middle Open Vitrine with Gothic Arches & Barley-Twist Columns
 */
function createMiddleDisplayVitrine(group, { darkWalnutMaterial, antiqueCarvedWoodMaterial, velvetLinerMaterial, tarnishedBrassMaterial, clocheGlassMaterial, crystalSpecimenMaterial, grimoirePageMaterial, leatherRedMaterial, leatherGreenMaterial, leatherBrownMaterial, driedHerbMaterial, twineCordMaterial }) {
  // Backboard
  const backPanel = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.3, 0.1), darkWalnutMaterial);
  backPanel.position.set(0, 0.25, -0.85);
  backPanel.receiveShadow = true;
  group.add(backPanel);

  // Side Wall Panels
  const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.3, 1.8), darkWalnutMaterial);
  leftPanel.position.set(-1.6, 0.25, 0.05);
  group.add(leftPanel);

  const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.3, 1.8), darkWalnutMaterial);
  rightPanel.position.set(1.6, 0.25, 0.05);
  group.add(rightPanel);

  // Shelf Structure
  const mainShelf = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.12, 1.85), antiqueCarvedWoodMaterial);
  mainShelf.position.set(0, -0.41, 0.05);
  mainShelf.receiveShadow = true;
  group.add(mainShelf);

  // Carved Bracket Corbels supporting the main shelf
  [-1.4, -0.7, 0, 0.7, 1.4].forEach(cx => {
    const corbel = createCarvedCorbel(antiqueCarvedWoodMaterial);
    corbel.position.set(cx, -0.47, 0.9);
    group.add(corbel);
  });

  // Emerald Velvet Shelf Liner
  const velvetPad = new THREE.Mesh(new THREE.PlaneGeometry(3.15, 1.65), velvetLinerMaterial);
  velvetPad.rotation.x = -Math.PI / 2;
  velvetPad.position.set(0, -0.345, 0.05);
  velvetPad.receiveShadow = true;
  group.add(velvetPad);

  // Front Brass Gallery Rail
  const railFront = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 3.25, 16), tarnishedBrassMaterial);
  railFront.rotation.z = Math.PI / 2;
  railFront.position.set(0, -0.32, 0.95);
  group.add(railFront);

  [-1.5, -0.75, 0, 0.75, 1.5].forEach(rx => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 12), tarnishedBrassMaterial);
    post.position.set(rx, -0.36, 0.95);
    group.add(post);
  });

  // Barley-Twist Spiral Columns at front corners
  const colLeft = createBarleyTwistColumn(antiqueCarvedWoodMaterial, tarnishedBrassMaterial, 2.2);
  colLeft.position.set(-1.62, -0.9, 0.95);
  group.add(colLeft);

  const colRight = createBarleyTwistColumn(antiqueCarvedWoodMaterial, tarnishedBrassMaterial, 2.2);
  colRight.position.set(1.62, -0.9, 0.95);
  group.add(colRight);

  // Gothic / Romanesque Carved Arch Valance across front top of vitrine
  const archBeam = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.18, 0.12), antiqueCarvedWoodMaterial);
  archBeam.position.set(0, 1.3, 0.95);
  group.add(archBeam);

  // 3 Carved Gothic Arch Spandrels hanging below the beam
  [-1.0, 0, 1.0].forEach(ax => {
    const archCurve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 0.08, 24, 1, false, 0, Math.PI),
      antiqueCarvedWoodMaterial
    );
    archCurve.rotation.y = Math.PI / 2;
    archCurve.rotation.z = Math.PI;
    archCurve.position.set(ax, 1.25, 0.95);
    group.add(archCurve);

    // Carved Drop Pendant Finial between arches
    const dropPendant = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.16, 12), tarnishedBrassMaterial);
    dropPendant.rotation.x = Math.PI;
    dropPendant.position.set(ax, 0.95, 0.95);
    group.add(dropPendant);
  });

  // --- CURIOSITIES ON SIDE PERCHES ---
  // 1. Cloche Bell Jar with Amethyst Crystal Specimen (Left Perch)
  const clocheGroup = new THREE.Group();
  clocheGroup.position.set(-1.42, -0.35, -0.45);

  const clocheBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.05, 20), antiqueCarvedWoodMaterial);
  clocheGroup.add(clocheBase);

  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), crystalSpecimenMaterial);
  crystal.scale.set(0.8, 1.6, 0.8);
  crystal.position.y = 0.16;
  clocheGroup.add(crystal);

  const domeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.38, 24, 1, true), clocheGlassMaterial);
  domeBody.position.y = 0.22;
  clocheGroup.add(domeBody);

  const domeTop = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), clocheGlassMaterial);
  domeTop.position.y = 0.41;
  clocheGroup.add(domeTop);

  const domeFinial = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), tarnishedBrassMaterial);
  domeFinial.position.y = 0.62;
  clocheGroup.add(domeFinial);

  group.add(clocheGroup);

  // 2. Open Alchemical Grimoire (Right Perch)
  const grimoire = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.38), grimoirePageMaterial);
  grimoire.rotation.x = -Math.PI / 2 + 0.15;
  grimoire.rotation.z = -0.2;
  grimoire.position.set(1.35, -0.33, -0.35);
  group.add(grimoire);

  const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.6), leatherBrownMaterial);
  b1.position.set(1.35, -0.38, -0.35);
  b1.rotation.y = -0.2;
  group.add(b1);

  // 3. Dried Sage & Lavender Bundles
  const herbBundle = createHerbBundle(driedHerbMaterial, twineCordMaterial);
  herbBundle.position.set(-1.64, -0.45, 0.85);
  group.add(herbBundle);
}

/**
 * Creates upside-down dried herb bouquet bundle
 */
function createHerbBundle(herbMat, twineMat) {
  const group = new THREE.Group();

  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.01, 8, 16), twineMat);
  loop.rotation.y = Math.PI / 2;
  group.add(loop);

  for (let i = 0; i < 6; i++) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.015, 0.38, 6), herbMat);
    stem.position.set((Math.random() - 0.5) * 0.05, -0.2, (Math.random() - 0.5) * 0.05);
    stem.rotation.z = (Math.random() - 0.5) * 0.3;
    stem.rotation.x = (Math.random() - 0.5) * 0.3;
    group.add(stem);
  }

  return group;
}

/**
 * Layer 3: Upper Showcase Tier with Carved Dentil Mouldings & Pediment Arch
 */
function createUpperShowcaseTier(group, { darkWalnutMaterial, antiqueCarvedWoodMaterial, velvetLinerMaterial, tarnishedBrassMaterial, clocheGlassMaterial, skullBoneMaterial, waxCandleMaterial, flameMaterial, leatherRedMaterial, leatherGreenMaterial, twineCordMaterial }) {
  const startY = 1.35;

  // Upper Shelf
  const upperShelf = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.12, 1.6), antiqueCarvedWoodMaterial);
  upperShelf.position.set(0, startY - 0.06, -0.05);
  upperShelf.receiveShadow = true;
  group.add(upperShelf);

  // Upper Corbel Brackets
  [-1.4, -0.7, 0, 0.7, 1.4].forEach(cx => {
    const corbel = createCarvedCorbel(antiqueCarvedWoodMaterial);
    corbel.position.set(cx, startY - 0.12, 0.7);
    group.add(corbel);
  });

  // Velvet Liner
  const upperVelvet = new THREE.Mesh(new THREE.PlaneGeometry(3.15, 1.45), velvetLinerMaterial);
  upperVelvet.rotation.x = -Math.PI / 2;
  upperVelvet.position.set(0, startY + 0.005, -0.05);
  upperVelvet.receiveShadow = true;
  group.add(upperVelvet);

  // Upper Backboard
  const upperBack = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 0.1), darkWalnutMaterial);
  upperBack.position.set(0, startY + 0.9, -0.8);
  group.add(upperBack);

  // Carved Dentil Cornice Moulding along Top Header
  const crownHeader = new THREE.Mesh(new THREE.BoxGeometry(3.45, 0.22, 1.7), antiqueCarvedWoodMaterial);
  crownHeader.position.set(0, startY + 1.8, -0.05);
  group.add(crownHeader);

  // Row of Carved Dentil Teeth Blocks along Cornice
  for (let dx = -1.6; dx <= 1.6; dx += 0.16) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.06), antiqueCarvedWoodMaterial);
    tooth.position.set(dx, startY + 1.72, 0.82);
    group.add(tooth);
  }

  // Classical Scalloped Pediment Header
  const pediment = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.16, 32, 1, false, 0, Math.PI), antiqueCarvedWoodMaterial);
  pediment.rotation.z = Math.PI;
  pediment.rotation.y = Math.PI / 2;
  pediment.position.set(0, startY + 1.9, -0.05);
  group.add(pediment);

  // Brass Acroterion Center Crest Finial
  const brassFinial = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), tarnishedBrassMaterial);
  brassFinial.position.set(0, startY + 2.78, -0.05);
  group.add(brassFinial);

  [-0.85, 0.85].forEach(fx => {
    const sideFinial = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 12), tarnishedBrassMaterial);
    sideFinial.position.set(fx, startY + 2.0, -0.05);
    group.add(sideFinial);
  });

  // Upper Brass Gallery Rail
  const upperRail = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 3.2, 16), tarnishedBrassMaterial);
  upperRail.rotation.z = Math.PI / 2;
  upperRail.position.set(0, startY + 0.06, 0.72);
  group.add(upperRail);

  // --- CURIOSITIES ON UPPER TIER ---
  // 1. Skull on Left Perch
  const skullGroup = new THREE.Group();
  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), skullBoneMaterial);
  cranium.scale.set(1, 1.1, 1.15);
  cranium.position.y = 0.18;
  const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.1, 0.15), skullBoneMaterial);
  jaw.position.set(0, 0.06, 0.07);
  skullGroup.add(cranium);
  skullGroup.add(jaw);
  skullGroup.position.set(-1.35, startY, -0.2);
  skullGroup.rotation.y = 0.55;
  group.add(skullGroup);

  // 2. Brass Hourglass
  const hourglass = createHourglass(tarnishedBrassMaterial, clocheGlassMaterial);
  hourglass.position.set(-1.35, startY, 0.35);
  group.add(hourglass);

  // 3. Lit Candle Sconce
  const candleGroup = new THREE.Group();
  const candleBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.05, 16), tarnishedBrassMaterial);
  candleGroup.add(candleBase);

  const candleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.35, 16), waxCandleMaterial);
  candleBody.position.y = 0.2;
  candleGroup.add(candleBody);

  const drip1 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), waxCandleMaterial);
  drip1.position.set(0.04, 0.16, 0.02);
  candleGroup.add(drip1);
  const drip2 = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), waxCandleMaterial);
  drip2.position.set(-0.03, 0.08, 0.03);
  candleGroup.add(drip2);

  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.08, 12), flameMaterial);
  flame.name = 'Candle_Flame';
  flame.position.y = 0.42;
  candleGroup.add(flame);

  const candleLight = new THREE.PointLight(0xffaa33, 0.85, 3.2, 2.0);
  candleLight.name = 'Candle_Light';
  candleLight.position.y = 0.45;
  candleGroup.add(candleLight);

  candleGroup.position.set(1.35, startY, -0.2);
  group.add(candleGroup);

  // Stack of tomes
  const topB1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 0.55), leatherRedMaterial);
  topB1.position.set(1.35, startY + 0.045, 0.3);
  topB1.rotation.y = 0.1;
  group.add(topB1);

  const topB2 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 0.5), leatherGreenMaterial);
  topB2.position.set(1.35, startY + 0.13, 0.3);
  topB2.rotation.y = -0.15;
  group.add(topB2);
}

/**
 * Creates brass & glass hourglass with golden sand
 */
function createHourglass(brassMat, glassMat) {
  const group = new THREE.Group();

  const sandMat = new THREE.MeshStandardMaterial({
    color: 0xd4a359,
    roughness: 0.9,
    metalness: 0.1
  });

  const topPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16), brassMat);
  topPlate.position.y = 0.36;
  group.add(topPlate);

  const botPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16), brassMat);
  botPlate.position.y = 0.015;
  group.add(botPlate);

  for (let i = 0; i < 3; i++) {
    const ang = (i * Math.PI * 2) / 3;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.34, 8), brassMat);
    post.position.set(Math.cos(ang) * 0.09, 0.185, Math.sin(ang) * 0.09);
    group.add(post);
  }

  const topBulb = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.16, 16), glassMat);
  topBulb.rotation.x = Math.PI;
  topBulb.position.y = 0.26;
  group.add(topBulb);

  const botBulb = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.16, 16), glassMat);
  botBulb.position.y = 0.11;
  group.add(botBulb);

  const botSand = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.09, 14), sandMat);
  botSand.position.y = 0.075;
  group.add(botSand);

  return group;
}
