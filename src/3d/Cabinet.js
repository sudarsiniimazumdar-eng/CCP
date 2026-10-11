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
    color: 0x221711, // Smoked antique dark walnut
    roughness: 0.82,
    metalness: 0.03
  });

  const antiqueCarvedWoodMaterial = new THREE.MeshStandardMaterial({
    map: materialTex,
    color: 0x301d14, // Hand-waxed warm aged mahogany
    roughness: 0.72,
    metalness: 0.04
  });

  const velvetLinerMaterial = new THREE.MeshStandardMaterial({
    color: 0x121b15, // Deep muted forest velvet
    roughness: 0.96,
    metalness: 0.01
  });

  const innerCavityMaterial = new THREE.MeshStandardMaterial({
    color: 0x0e0806,
    roughness: 0.96,
    metalness: 0.01
  });

  const tarnishedBrassMaterial = new THREE.MeshStandardMaterial({
    color: 0x9e8052, // Muted tactile aged brass
    roughness: 0.44,
    metalness: 0.82
  });

  const ironHardwareMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d2b29,
    roughness: 0.68,
    metalness: 0.72
  });

  const casterRubberMaterial = new THREE.MeshStandardMaterial({
    color: 0x18191a,
    roughness: 0.88,
    metalness: 0.05
  });

  const clocheGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.95,
    opacity: 1,
    transparent: true,
    roughness: 0.05,
    ior: 1.515,
    thickness: 0.35,
    clearcoat: 0.9,
    clearcoatRoughness: 0.04
  });

  const crystalSpecimenMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x5e3d6b,
    transmission: 0.65,
    roughness: 0.18,
    ior: 1.54,
    thickness: 0.6,
    transparent: true,
    opacity: 0.92
  });

  const grimoirePageMaterial = new THREE.MeshStandardMaterial({
    map: typographyTex,
    roughness: 0.82,
    metalness: 0.0
  });

  const leatherRedMaterial = new THREE.MeshStandardMaterial({ color: 0x3a1917, roughness: 0.76, metalness: 0.06 });
  const leatherGreenMaterial = new THREE.MeshStandardMaterial({ color: 0x17241b, roughness: 0.78, metalness: 0.06 });
  const leatherBrownMaterial = new THREE.MeshStandardMaterial({ color: 0x2d1c12, roughness: 0.82, metalness: 0.06 });
  const skullBoneMaterial = new THREE.MeshStandardMaterial({ color: 0xd2c7b5, roughness: 0.82, metalness: 0.02 });
  const waxCandleMaterial = new THREE.MeshPhysicalMaterial({ color: 0xdfd8cb, roughness: 0.52, transmission: 0.25, transparent: true, opacity: 0.96 });
  const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xf5a442 });
  const driedHerbMaterial = new THREE.MeshStandardMaterial({ color: 0x48523c, roughness: 0.95, metalness: 0.0 });
  const twineCordMaterial = new THREE.MeshStandardMaterial({ color: 0x827360, roughness: 0.92, metalness: 0.0 });

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

  // 2. LAYER 1: Open relic shelves
  createStackedDrawerBank(cabinetGroup, {
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

  return cabinetGroup;
}

function createEngravedProjectsLabel() {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 150;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '600 74px Georgia, serif';
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(35, 22, 13, 0.9)';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetY = 2;
  ctx.strokeText('PROJECTS', canvas.width / 2, canvas.height / 2);
  const gold = ctx.createLinearGradient(0, 34, 0, 116);
  gold.addColorStop(0, '#fff0b0');
  gold.addColorStop(0.28, '#f0cf78');
  gold.addColorStop(0.62, '#c7943f');
  gold.addColorStop(1, '#f6dda0');
  ctx.fillStyle = gold;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.72)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetY = 1;
  ctx.fillText('PROJECTS', canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const engraving = new THREE.Mesh(
    new THREE.PlaneGeometry(1.35, 0.225),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false })
  );
  engraving.name = 'Engraved_PROJECTS';
  return engraving;
}

/**
 * Open Apothecary Shelf Unit — replaces the closed drawer bank.
 * Adds specimen jars, skulls and small vials as shelf curiosities.
 */
function createStackedDrawerBank(group, { cartY, cartThickness, darkWalnutMaterial, antiqueCarvedWoodMaterial, innerCavityMaterial, tarnishedBrassMaterial, ironHardwareMaterial }) {
  const startY = cartY + cartThickness / 2;

  // --- Open Shelf Housing (same outer footprint as old drawer bank) ---
  const shelfCaseDepth = 2.0;
  const shelfCaseWidth = 3.3;
  const shelfCaseHeight = 1.8;

  // Back panel
  const backPanel = new THREE.Mesh(
    new THREE.BoxGeometry(shelfCaseWidth, shelfCaseHeight, 0.1),
    darkWalnutMaterial
  );
  backPanel.position.set(0, startY + 0.9, -(shelfCaseDepth / 2) + 0.05);
  group.add(backPanel);

  // Side panels (left & right)
  [-1, 1].forEach(side => {
    const sidePanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, shelfCaseHeight, shelfCaseDepth),
      darkWalnutMaterial
    );
    sidePanel.position.set(side * (shelfCaseWidth / 2), startY + 0.9, 0);
    group.add(sidePanel);
  });

  // Top cap moulding
  const topCap = new THREE.Mesh(
    new THREE.BoxGeometry(shelfCaseWidth + 0.2, 0.12, shelfCaseDepth + 0.1),
    antiqueCarvedWoodMaterial
  );
  topCap.position.set(0, startY + 1.86, 0);
  group.add(topCap);

  // Two horizontal shelves dividing the unit into 3 tiers
  const shelfY1 = startY + 1.05; // upper shelf
  const shelfY2 = startY + 0.42; // lower shelf

  [shelfY1, shelfY2].forEach(sy => {
    const shelf = new THREE.Mesh(
      new THREE.BoxGeometry(shelfCaseWidth - 0.12, 0.08, shelfCaseDepth),
      antiqueCarvedWoodMaterial
    );
    shelf.position.set(0, sy, 0);
    group.add(shelf);
  });

  // Floor of the case
  const caseFloor = new THREE.Mesh(
    new THREE.BoxGeometry(shelfCaseWidth - 0.12, 0.07, shelfCaseDepth),
    antiqueCarvedWoodMaterial
  );
  caseFloor.position.set(0, startY + 0.035, 0);
  group.add(caseFloor);

  // --- Curiosities: Specimen Jars, Skulls & Vials ---
  // Materials
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8d8c8, transmission: 0.82, roughness: 0.08, ior: 1.48,
    transparent: true, opacity: 0.92, thickness: 0.3
  });
  const herbFillMat = new THREE.MeshStandardMaterial({ color: 0x3a4a2e, roughness: 0.95 });
  const darkOrganicMat = new THREE.MeshStandardMaterial({ color: 0x2a2218, roughness: 0.92 });
  const boneWhiteMat = new THREE.MeshStandardMaterial({ color: 0xcfc4a8, roughness: 0.82 });
  const corkMat = new THREE.MeshStandardMaterial({ color: 0x7a5c3c, roughness: 0.88 });

  // Helper: wide-mouth specimen jar (like apothecary ref image)
  const addSpecimenJar = (x, y, z, fillMat, jarScale = 1.0) => {
    const jar = new THREE.Group();
    // Jar body — wide cylinder
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12 * jarScale, 0.11 * jarScale, 0.28 * jarScale, 20), glassMat);
    body.position.y = 0.14 * jarScale;
    jar.add(body);
    // Fill
    const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.105 * jarScale, 0.095 * jarScale, 0.20 * jarScale, 16), fillMat);
    fill.position.y = 0.10 * jarScale;
    jar.add(fill);
    // Glass lid
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.125 * jarScale, 0.125 * jarScale, 0.045 * jarScale, 20), glassMat);
    lid.position.y = 0.295 * jarScale;
    jar.add(lid);
    const lidKnob = new THREE.Mesh(new THREE.SphereGeometry(0.03 * jarScale, 12, 8), glassMat);
    lidKnob.position.y = 0.33 * jarScale;
    jar.add(lidKnob);
    jar.position.set(x, y, z);
    group.add(jar);
  };

  // Helper: small corked vial
  const addCorkedVial = (x, y, z, liquidColor) => {
    const vial = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.22, 14), glassMat);
    body.position.y = 0.11;
    vial.add(body);
    const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.028, 0.15, 12),
      new THREE.MeshStandardMaterial({ color: liquidColor, roughness: 0.4 }));
    liquid.position.y = 0.08;
    vial.add(liquid);
    const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.042, 0.06, 12), corkMat);
    cork.position.y = 0.25;
    vial.add(cork);
    vial.position.set(x, y, z);
    group.add(vial);
  };

  // Helper: anatomically realistic skull
  const addSkull = (x, y, z, rotY = 0) => {
    const skull = new THREE.Group();
    skull.scale.setScalar(0.82);

    const boneMat = new THREE.MeshStandardMaterial({ color: 0xc8bd9e, roughness: 0.78, metalness: 0.0 });
    const darkBoneMat = new THREE.MeshStandardMaterial({ color: 0x9e9278, roughness: 0.85, metalness: 0.0 });
    const voidMat = new THREE.MeshStandardMaterial({ color: 0x080604, roughness: 1.0 });
    const toothMat = new THREE.MeshStandardMaterial({ color: 0xd8d0b8, roughness: 0.65, metalness: 0.0 });

    // --- Cranium (braincase) ---
    // Main oval dome
    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.115, 20, 16), boneMat);
    cranium.scale.set(1.0, 1.12, 1.22);
    cranium.position.y = 0.185;
    skull.add(cranium);

    // Temporal bulge (sides of cranium, slightly wider)
    [-1, 1].forEach(side => {
      const temporal = new THREE.Mesh(new THREE.SphereGeometry(0.068, 12, 10), boneMat);
      temporal.scale.set(0.6, 0.72, 0.9);
      temporal.position.set(side * 0.108, 0.175, 0.01);
      skull.add(temporal);
    });

    // Occipital protuberance (back of skull)
    const occipital = new THREE.Mesh(new THREE.SphereGeometry(0.072, 12, 10), boneMat);
    occipital.scale.set(0.95, 0.7, 0.55);
    occipital.position.set(0, 0.145, -0.11);
    skull.add(occipital);

    // Frontal bone (forehead, slightly flatter)
    const frontal = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 10), boneMat);
    frontal.scale.set(0.9, 0.65, 0.55);
    frontal.position.set(0, 0.255, 0.075);
    skull.add(frontal);

    // --- Zygomatic arches (cheekbones) ---
    [-1, 1].forEach(side => {
      const zygo = new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.06, 6, 12), boneMat);
      zygo.rotation.z = Math.PI / 2;
      zygo.position.set(side * 0.112, 0.138, 0.065);
      skull.add(zygo);
    });

    // --- Eye sockets (supraorbital ridge + socket void) ---
    [-1, 1].forEach(side => {
      // Socket void — black hollow
      const socket = new THREE.Mesh(new THREE.SphereGeometry(0.033, 10, 8), voidMat);
      socket.scale.set(1.15, 0.88, 0.55);
      socket.position.set(side * 0.058, 0.195, 0.098);
      skull.add(socket);

      // Supraorbital ridge (brow ridge above socket)
      const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.045, 6, 10), darkBoneMat);
      brow.rotation.z = Math.PI / 2;
      brow.position.set(side * 0.058, 0.222, 0.094);
      skull.add(brow);
    });

    // --- Nasal cavity ---
    const nasalVoid = new THREE.Mesh(new THREE.SphereGeometry(0.024, 10, 8), voidMat);
    nasalVoid.scale.set(0.72, 1.0, 0.45);
    nasalVoid.position.set(0, 0.162, 0.108);
    skull.add(nasalVoid);

    // Nasal bone bridge
    const nasalBone = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.032, 0.028), darkBoneMat);
    nasalBone.position.set(0, 0.182, 0.102);
    skull.add(nasalBone);

    // --- Maxilla (upper jaw) ---
    const maxilla = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.042, 0.088), boneMat);
    maxilla.position.set(0, 0.105, 0.072);
    skull.add(maxilla);

    // Upper teeth row (6 simplified rectangular teeth)
    for (let t = -2; t <= 2; t++) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.022, 0.014), toothMat);
      tooth.position.set(t * 0.019, 0.088, 0.108);
      skull.add(tooth);
    }

    // --- Mandible (lower jaw, slightly angled open) ---
    const mandible = new THREE.Mesh(new THREE.BoxGeometry(0.128, 0.038, 0.082), darkBoneMat);
    mandible.position.set(0, 0.052, 0.068);
    mandible.rotation.x = 0.18; // slightly open
    skull.add(mandible);

    // Lower teeth row
    for (let t = -2; t <= 2; t++) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.018, 0.013), toothMat);
      tooth.position.set(t * 0.018, 0.040, 0.095);
      skull.add(tooth);
    }

    // Mandible rami (vertical sides of jaw)
    [-1, 1].forEach(side => {
      const ramus = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.065, 0.018), darkBoneMat);
      ramus.position.set(side * 0.055, 0.082, 0.022);
      skull.add(ramus);
    });

    skull.position.set(x, y, z);
    skull.rotation.y = rotY;
    group.add(skull);
  };

  // --- Upper shelf tier (shelfY1 surface) ---
  const upperSurface = shelfY1 + 0.04;
  // Left: tall apothecary jar with dried herbs
  addSpecimenJar(-1.1, upperSurface, 0.1, herbFillMat, 1.0);
  // Left-centre: small skull
  addSkull(-0.52, upperSurface, 0.15, 0.3);
  // Centre-left: medium jar with dark organic matter
  addSpecimenJar(-0.08, upperSurface, 0.2, darkOrganicMat, 0.85);
  // Centre: cluster of 3 small vials
  addCorkedVial(0.45, upperSurface, 0.25, 0x4a3820);
  addCorkedVial(0.58, upperSurface, 0.18, 0x2e3a28);
  addCorkedVial(0.52, upperSurface, 0.05, 0x5a3015);
  // Right: jar with herbs
  addSpecimenJar(1.1, upperSurface, 0.12, herbFillMat, 0.95);

  // --- Lower shelf tier (shelfY2 surface) ---
  const lowerSurface = shelfY2 + 0.04;
  // Left: skull leaning slightly
  addSkull(-1.1, lowerSurface, 0.2, -0.4);
  // Left-centre: wide jar
  addSpecimenJar(-0.55, lowerSurface, 0.25, darkOrganicMat, 1.1);
  // Centre: small jar with seeds
  addSpecimenJar(0.05, lowerSurface, 0.3, new THREE.MeshStandardMaterial({ color: 0x4a3a22, roughness: 0.9 }), 0.78);
  // Right-centre: 2 vials
  addCorkedVial(0.62, lowerSurface, 0.22, 0x3a5040);
  addCorkedVial(0.75, lowerSurface, 0.08, 0x6a3820);
  // Right: skull
  addSkull(1.1, lowerSurface, 0.18, 0.5);

  // --- Bottom floor (case floor surface) ---
  const floorSurface = startY + 0.07;
  addSpecimenJar(-0.9, floorSurface, 0.3, herbFillMat, 1.2);
  addSpecimenJar(0.8, floorSurface, 0.35, darkOrganicMat, 0.9);
  addCorkedVial(-0.2, floorSurface, 0.4, 0x2e4030);
  addCorkedVial(0.1, floorSurface, 0.3, 0x4a2e18);

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

  // Engraved title centered high on the front cornice, above its carved dentils.
  const projectsEngraving = createEngravedProjectsLabel();
  projectsEngraving.position.set(0, startY + 1.83, 0.9);
  group.add(projectsEngraving);

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
