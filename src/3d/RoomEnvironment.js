import * as THREE from 'three';
import frame01 from '../assets/photowall/frame-01.png';
import frame02 from '../assets/photowall/frame-02.png';
import frame03 from '../assets/photowall/frame-03.png';
import frame04 from '../assets/photowall/frame-04.png';
import frame05 from '../assets/photowall/frame-05.png';
import frame06 from '../assets/photowall/frame-06.png';
import frame07 from '../assets/photowall/frame-07.png';
import frame08 from '../assets/photowall/frame-08.png';
import frame09 from '../assets/photowall/frame-09.png';
import frame10 from '../assets/photowall/frame-10.png';
import frame11 from '../assets/photowall/frame-11.png';

/**
 * Procedural Antique Persian Carpet Generator
 */
function createPersianRugTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base background (Aged Deep Crimson / Wine Red)
  ctx.fillStyle = '#4a151b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Navy & Gold Border
  ctx.strokeStyle = '#c8963e';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  ctx.strokeStyle = '#1a2736';
  ctx.lineWidth = 40;
  ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

  ctx.strokeStyle = '#c8963e';
  ctx.lineWidth = 8;
  ctx.strokeRect(88, 88, canvas.width - 176, canvas.height - 176);

  // Inner Field Border
  ctx.strokeStyle = '#2b4c48';
  ctx.lineWidth = 24;
  ctx.strokeRect(108, 108, canvas.width - 216, canvas.height - 216);

  // Center Medallion
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.fillStyle = '#1e3338';
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI * 2) / 16;
    const r = i % 2 === 0 ? 220 : 160;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = '#b87d2b';
  ctx.beginPath();
  ctx.arc(cx, cy, 110, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f5e2b3';
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = '#5c1920';
  ctx.beginPath();
  ctx.arc(cx, cy, 55, 0, Math.PI * 2);
  ctx.fill();

  // Corner Floral Spandrels
  const drawCornerSpandrel = (x, y, rot) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = '#1f3835';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(160, 0);
    ctx.quadraticCurveTo(80, 80, 0, 160);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#c8963e';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  };
  drawCornerSpandrel(120, 120, 0);
  drawCornerSpandrel(canvas.width - 120, 120, Math.PI / 2);
  drawCornerSpandrel(canvas.width - 120, canvas.height - 120, Math.PI);
  drawCornerSpandrel(120, canvas.height - 120, -Math.PI / 2);

  // Field Motifs
  ctx.fillStyle = '#c8963e';
  for (let x = 160; x < canvas.width - 160; x += 90) {
    for (let y = 160; y < canvas.height - 160; y += 90) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist > 180 && dist < 320) {
        ctx.fillRect(x - 6, y - 6, 12, 12);
        ctx.fillStyle = '#e8d2a6';
        ctx.fillRect(x - 3, y - 3, 6, 6);
        ctx.fillStyle = '#c8963e';
      }
    }
  }

  // Woven fringe edges
  ctx.fillStyle = '#e5d9c5';
  for (let i = 20; i < canvas.width - 20; i += 8) {
    ctx.fillRect(i, 6, 4, 24);
    ctx.fillRect(i, canvas.height - 30, 4, 24);
  }

  ctx.fillStyle = 'rgba(25, 15, 10, 0.22)';
  for (let i = 0; i < 180; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, Math.random() * 40 + 10, Math.random() * 40 + 10);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Procedural Wooden Plank Texture
 */
function createWoodPlankTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#261b14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const plankWidth = 128;
  for (let x = 0; x < canvas.width; x += plankWidth) {
    const shade = Math.floor(Math.random() * 20 - 10);
    ctx.fillStyle = `rgb(${38 + shade}, ${27 + shade}, ${20 + shade})`;
    ctx.fillRect(x, 0, plankWidth, canvas.height);

    ctx.strokeStyle = 'rgba(15, 10, 7, 0.35)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      const gx = x + Math.random() * plankWidth;
      ctx.moveTo(gx, 0);
      ctx.bezierCurveTo(
        gx + (Math.random() - 0.5) * 20, canvas.height * 0.33,
        gx + (Math.random() - 0.5) * 20, canvas.height * 0.66,
        gx + (Math.random() - 0.5) * 20, canvas.height
      );
      ctx.stroke();
    }

    ctx.fillStyle = '#0a0604';
    ctx.fillRect(x + plankWidth - 3, 0, 3, canvas.height);
  }

  // Nail heads
  ctx.fillStyle = '#140e0a';
  for (let x = plankWidth / 2; x < canvas.width; x += plankWidth) {
    for (let y = 80; y < canvas.height; y += 240) {
      ctx.beginPath();
      ctx.arc(x - 20, y, 4, 0, Math.PI * 2);
      ctx.arc(x + 20, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Procedural Stained Glass Window Texture
 */
function createStainedGlassTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  const colors = [
    '#9b1d20', '#1f4e78', '#2e7d32', '#d4a317', '#6a1b9a',
    '#d84315', '#00838f', '#e65100', '#283593', '#4e342e'
  ];

  ctx.fillStyle = '#100b10';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cols = 6;
  const rows = 10;
  const pw = canvas.width / cols;
  const ph = canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = colors[(r * cols + c * 3 + (r % 2)) % colors.length];
      ctx.fillStyle = color;
      ctx.fillRect(c * pw + 4, r * ph + 4, pw - 8, ph - 8);

      const grad = ctx.createLinearGradient(c * pw, r * ph, (c + 1) * pw, (r + 1) * ph);
      grad.addColorStop(0, 'rgba(255, 248, 220, 0.3)');
      grad.addColorStop(0.38, 'rgba(255, 255, 255, 0.03)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.42)');
      ctx.fillStyle = grad;
      ctx.fillRect(c * pw + 4, r * ph + 4, pw - 8, ph - 8);

      ctx.strokeStyle = 'rgba(238, 219, 174, 0.24)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(c * pw + 7, r * ph + 7, pw - 14, ph - 14);
    }
  }

  // Rose window tracery and lead cames add a hand-assembled stained-glass look.
  const roseX = canvas.width / 2;
  const roseY = canvas.height * 0.22;
  const roseRadius = 116;
  ctx.strokeStyle = '#171215';
  ctx.lineWidth = 13;
  ctx.beginPath();
  ctx.arc(roseX, roseY, roseRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(roseX, roseY, roseRadius * 0.57, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(roseX + Math.cos(angle) * roseRadius * 0.18, roseY + Math.sin(angle) * roseRadius * 0.18);
    ctx.lineTo(roseX + Math.cos(angle) * roseRadius * 0.94, roseY + Math.sin(angle) * roseRadius * 0.94);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(196, 160, 91, 0.82)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(roseX, roseY, roseRadius * 0.52, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#171215';
  ctx.lineWidth = 11;
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath();
    ctx.moveTo(c * pw, 0);
    ctx.lineTo(c * pw, canvas.height);
    ctx.stroke();
  }
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * ph);
    ctx.lineTo(canvas.width, r * ph);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Constructs the MAXIMALIST Victorian Apothecary Curiosity Room
 * Incorporates all 5 reference image assets from REFERENCES.md:
 * - environment.jpg (large framed architectural oil painting)
 * - typography.jpg (framed antique calligraphy manuscripts & open desk folio)
 * - material.jpg (decaying parchment paper, dark grain wood panels)
 * - perfume_bottles.jpg (framed apothecary formula print)
 * - lighting.jpg (used for ambient mood & chiaroscuro tones)
 */
export function createApothecaryRoom() {
  const roomGroup = new THREE.Group();
  roomGroup.name = 'Maximalist_Apothecary_Room';

  const textureLoader = new THREE.TextureLoader();
  const environmentTex = textureLoader.load('./references_images/environment.jpg');
  const typographyTex = textureLoader.load('./references_images/typography.jpg');
  const materialTex = textureLoader.load('./references_images/material.jpg');
  const perfumeTex = textureLoader.load('./references_images/perfume_bottles.jpg');

  [environmentTex, typographyTex, materialTex, perfumeTex].forEach(t => {
    t.anisotropy = 8;
  });

  const woodPlankTex = createWoodPlankTexture();
  const rugTex = createPersianRugTexture();
  const stainedGlassTex = createStainedGlassTexture();

  // Materials
  const floorWoodMat = new THREE.MeshStandardMaterial({
    map: woodPlankTex,
    roughness: 0.82,
    metalness: 0.08
  });

  const wallWoodMat = new THREE.MeshStandardMaterial({
    map: materialTex,
    color: 0x1a0c06,
    roughness: 0.88,
    metalness: 0.03
  });

  const shelfWoodMat = new THREE.MeshStandardMaterial({
    color: 0x241811,
    roughness: 0.78,
    metalness: 0.06
  });

  const carpetMat = new THREE.MeshStandardMaterial({
    map: rugTex,
    roughness: 0.92,
    metalness: 0.02
  });

  const brassTrimMat = new THREE.MeshStandardMaterial({
    color: 0xc8963e,
    roughness: 0.35,
    metalness: 0.88
  });

  const barrelWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4a3222,
    roughness: 0.8,
    metalness: 0.05
  });

  const ironHoopMat = new THREE.MeshStandardMaterial({
    color: 0x2c2d30,
    roughness: 0.5,
    metalness: 0.75
  });

  const parchmentMat = new THREE.MeshStandardMaterial({
    map: materialTex,
    roughness: 0.88,
    metalness: 0.0
  });

  const typographyArtMat = new THREE.MeshStandardMaterial({
    map: typographyTex,
    roughness: 0.8,
    metalness: 0.0
  });

  const environmentPaintingMat = new THREE.MeshStandardMaterial({
    map: environmentTex,
    roughness: 0.65,
    metalness: 0.05
  });

  const perfumeArtMat = new THREE.MeshStandardMaterial({
    map: perfumeTex,
    roughness: 0.7,
    metalness: 0.0
  });

  const driedHerbMat = new THREE.MeshStandardMaterial({ color: 0x4a5538, roughness: 0.95, metalness: 0.0 });
  const twineCordMat = new THREE.MeshStandardMaterial({ color: 0x8c785d, roughness: 0.9, metalness: 0.0 });
  const inkPotMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.8 });
  const quillFeatherMat = new THREE.MeshStandardMaterial({ color: 0xe0d6c5, roughness: 0.8, metalness: 0.0 });

  // 1. FLOOR
  const floorGeo = new THREE.PlaneGeometry(36, 36);
  const floorMesh = new THREE.Mesh(floorGeo, floorWoodMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -3.85;
  floorMesh.receiveShadow = true;
  roomGroup.add(floorMesh);

  // 2. PERSIAN RUG (Center) + RUNNER RUG (Overlapping)
  const rugGeo = new THREE.PlaneGeometry(7.6, 6.0);
  const rugMesh = new THREE.Mesh(rugGeo, carpetMat);
  rugMesh.rotation.x = -Math.PI / 2;
  rugMesh.position.set(0, -3.83, 0);
  rugMesh.receiveShadow = true;
  roomGroup.add(rugMesh);

  // Overlapping Runner Rug on the right leading towards stairs
  const runnerGeo = new THREE.PlaneGeometry(2.4, 6.2);
  const runnerMesh = new THREE.Mesh(runnerGeo, carpetMat);
  runnerMesh.rotation.x = -Math.PI / 2;
  runnerMesh.rotation.z = 0.15;
  runnerMesh.position.set(3.8, -3.825, -0.5);
  runnerMesh.receiveShadow = true;
  roomGroup.add(runnerMesh);

  // Scattered loose parchment sheets with calligraphy
  const createFloorParchment = (x, z, rot) => {
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.65), typographyArtMat);
    paper.rotation.x = -Math.PI / 2;
    paper.rotation.z = rot;
    paper.position.set(x, -3.815, z);
    roomGroup.add(paper);
  };
  createFloorParchment(-2.6, 2.4, 0.4);
  createFloorParchment(-2.2, 2.8, -0.2);
  createFloorParchment(2.8, 2.2, 0.6);
  createFloorParchment(3.2, 2.6, -0.4);

  // 3. BACK WALL & MAXIMALIST GALLERY ART + BOOKSHELVES
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(22, 14, 0.4), wallWoodMat);
  backWall.position.set(0, 2.5, -6.5);
  backWall.receiveShadow = true;
  roomGroup.add(backWall);

  // === INTERACTIVE PHOTO WALL ===
  // Salon-style gallery wall matching the supplied reference image.
  // 40 evenly spaced wall panels repeat the 11 supplied frames across the back wall.
  const photoWallFrames = createPhotoWall(
    roomGroup,
    brassTrimMat,
    environmentPaintingMat,
    typographyArtMat,
    perfumeArtMat,
    parchmentMat
  );

  // The back wall is kept clear for the continuous photo gallery behind the cabinet.


  // 5. LEFT WALL & STAINED GLASS WINDOW
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 14, 18), wallWoodMat);
  leftWall.position.set(-8.5, 2.5, 0);
  leftWall.receiveShadow = true;
  roomGroup.add(leftWall);

  // Deep timber casing leaves a real opening for the glass to sit inside.
  const windowCenter = new THREE.Vector3(-8.2, 0.2, -1.8);
  const frameRails = [
    { size: [0.32, 5.55, 0.2], offset: [0, 0, -1.5] },
    { size: [0.32, 5.55, 0.2], offset: [0, 0, 1.5] },
    { size: [0.32, 0.24, 3.2], offset: [0, 2.66, 0] },
    { size: [0.36, 0.3, 3.35], offset: [0, -2.66, 0] }
  ];
  frameRails.forEach(({ size, offset }) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(...size), shelfWoodMat);
    rail.position.copy(windowCenter).add(new THREE.Vector3(...offset));
    rail.castShadow = true;
    rail.receiveShadow = true;
    roomGroup.add(rail);
  });

  const stainedGlassPane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.0, 5.2),
    new THREE.MeshPhysicalMaterial({
      map: stainedGlassTex,
      color: 0xe8e1d0,
      emissive: 0x382d38,
      emissiveMap: stainedGlassTex,
      emissiveIntensity: 0.18,
      roughness: 0.16,
      metalness: 0.02,
      transmission: 0.08,
      thickness: 0.08,
      clearcoat: 0.75,
      clearcoatRoughness: 0.12,
      side: THREE.DoubleSide
    })
  );
  stainedGlassPane.rotation.y = Math.PI / 2;
  stainedGlassPane.position.set(-8.015, 0.2, -1.8);
  roomGroup.add(stainedGlassPane);

  // Lead cames divide the glass into individual pieces.
  const leadMat = new THREE.MeshStandardMaterial({ color: 0x211d22, roughness: 0.5, metalness: 0.45 });
  const addLead = (width, height, depth, x, y, z) => {
    const came = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), leadMat);
    came.position.set(x, y, z);
    roomGroup.add(came);
  };
  const leadX = -7.98;
  [-2.75, -1.8, -0.85].forEach(z => addLead(0.045, 5.05, 0.045, leadX, 0.2, z));
  [-1.5, -0.15, 1.25].forEach(y => addLead(0.045, 0.045, 2.9, leadX, y, -1.8));

  // A slim pointed arch completes the window framing.
  const arch = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.045, 8, 40, Math.PI), leadMat);
  arch.rotation.y = Math.PI / 2;
  arch.position.set(-7.965, 1.48, -1.8);
  roomGroup.add(arch);

  // Gallery Wall of Framed Herbarium & Typography Prints on Left Wall
  const createWallFrame = (z, y, w, h, mat) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.08, h + 0.16, w + 0.16), shelfWoodMat);
    frame.position.set(-8.25, y, z);
    roomGroup.add(frame);

    const art = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    art.rotation.y = Math.PI / 2;
    art.position.set(-8.2, y, z);
    roomGroup.add(art);
  };
  createWallFrame(1.4, 2.2, 1.2, 1.6, typographyArtMat);
  createWallFrame(3.0, 2.2, 1.1, 1.5, perfumeArtMat);
  createWallFrame(1.4, 0.3, 1.1, 1.4, parchmentMat);
  createWallFrame(3.0, 0.3, 1.2, 1.5, typographyArtMat);

  // Side Apothecary Counter Desk under the stained glass
  const deskGroup = new THREE.Group();
  deskGroup.position.set(-6.8, -3.85, 1.2);
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 2.4), shelfWoodMat);
  deskTop.position.y = 1.95;
  deskGroup.add(deskTop);
  const deskLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.9, 0.12), shelfWoodMat);
  deskLeg1.position.set(-0.75, 0.95, -1.05);
  deskGroup.add(deskLeg1);
  const deskLeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.9, 0.12), shelfWoodMat);
  deskLeg2.position.set(0.75, 0.95, -1.05);
  deskGroup.add(deskLeg2);
  const deskLeg3 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.9, 0.12), shelfWoodMat);
  deskLeg3.position.set(0.75, 0.95, 1.05);
  deskGroup.add(deskLeg3);

  // Open Folio / Manuscript on Desk
  const openFolio = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.6), typographyArtMat);
  openFolio.rotation.x = -Math.PI / 2;
  openFolio.position.set(-0.1, 2.01, 0);
  deskGroup.add(openFolio);

  // Antique Brass Balance Scales on Desk
  const balanceScale = createBalanceScale(brassTrimMat);
  balanceScale.position.set(-0.5, 2.0, -0.6);
  deskGroup.add(balanceScale);

  // Brass Inkpot & Feather Quill on side desk
  const inkpot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.12, 16), inkPotMat);
  inkpot.position.set(0.4, 2.06, 0.5);
  deskGroup.add(inkpot);

  const quill = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.55, 8), quillFeatherMat);
  quill.rotation.z = -0.45;
  quill.rotation.x = 0.2;
  quill.position.set(0.48, 2.25, 0.5);
  deskGroup.add(quill);

  // Rolled Blueprint scroll in basket
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.25, 0.7, 16), shelfWoodMat);
  basket.position.set(-0.5, 0.35, 1.4);
  deskGroup.add(basket);

  for (let s = 0; s < 4; s++) {
    const sc = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12), parchmentMat);
    sc.position.set(-0.5 + (Math.random() - 0.5) * 0.15, 0.65, 1.4 + (Math.random() - 0.5) * 0.15);
    sc.rotation.z = (Math.random() - 0.5) * 0.3;
    sc.rotation.x = (Math.random() - 0.5) * 0.3;
    deskGroup.add(sc);
  }

  roomGroup.add(deskGroup);


  // 7. CEILING RAFTERS & HANGING HERB BOUQUETS

  // Ceiling rafters & Abundant Hanging Dried Herb Bouquets
  for (let rz = -5.5; rz <= 4.5; rz += 2.2) {
    const rafter = new THREE.Mesh(new THREE.BoxGeometry(18, 0.4, 0.3), shelfWoodMat);
    rafter.position.set(0, 7.8, rz);
    roomGroup.add(rafter);

    // Hanging herbal bouquets across rafters
    if (rz > -4) {
      [-4.5, -2.5, 0, 2.5, 4.5].forEach((hx, i) => {
        const hb = createCeilingHerbBundle(driedHerbMat, twineCordMat, 1.4 + (i % 2) * 0.5);
        hb.position.set(hx, 7.6, rz);
        roomGroup.add(hb);
      });
    }
  }

  // 8. FLOOR PROPS: Oak Barrels, Brass Urn & Crates
  const barrelGroup = new THREE.Group();
  const barrelBody = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.78, 1.4, 20), barrelWoodMat);
  barrelBody.position.y = 0.7;
  barrelGroup.add(barrelBody);

  [-0.45, -0.15, 0.15, 0.45].forEach(hy => {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.025, 12, 24), ironHoopMat);
    hoop.rotation.x = Math.PI / 2;
    hoop.position.y = 0.7 + hy;
    barrelGroup.add(hoop);
  });
  barrelGroup.position.set(4.3, -3.85, 0.6);
  roomGroup.add(barrelGroup);

  const crateMesh1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 0.9), shelfWoodMat);
  crateMesh1.position.set(-4.5, -3.85 + 0.45, 1.2);
  crateMesh1.rotation.y = 0.25;
  roomGroup.add(crateMesh1);

  const crateMesh2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.8), shelfWoodMat);
  crateMesh2.position.set(-4.3, -3.85 + 0.35, 2.3);
  crateMesh2.rotation.y = -0.3;
  roomGroup.add(crateMesh2);

  // 9. HANGING SMOKY TINTED GLASS LANTERNS (7 Realistic Product Studio Lanterns)
  const lanternPoints = [];
  const lanternConfigs = [
    { x: -1.8, y: 3.8, z: 1.2, color: 0xdf924c, glassColor: 0x9e683b, scale: 1.0 }, // Muted Amber
    { x: 0.9, y: 4.4, z: 0.6, color: 0xd96b5a, glassColor: 0x8f3c36, scale: 1.15 }, // Muted Garnet
    { x: 2.6, y: 3.5, z: 1.5, color: 0xe0a855, glassColor: 0xa87d3e, scale: 0.9 }, // Antique Ochre
    { x: -3.2, y: 4.1, z: -0.8, color: 0x769476, glassColor: 0x486348, scale: 0.95 }, // Smoky Sage
    { x: 3.8, y: 4.6, z: -1.5, color: 0xd98650, glassColor: 0x9e5836, scale: 1.1 }, // Terracotta
    { x: -0.6, y: 5.2, z: 2.2, color: 0x9b78a8, glassColor: 0x644b70, scale: 0.85 }, // Smoky Amethyst
    { x: 1.8, y: 5.0, z: -2.8, color: 0x6e96ab, glassColor: 0x416273, scale: 0.9 }  // Slate Blue
  ];

  lanternConfigs.forEach((cfg) => {
    const lanternGroup = createHangingLantern(cfg);
    roomGroup.add(lanternGroup);

    const pLight = new THREE.PointLight(cfg.color, 1.1, 6.5, 2.0);
    pLight.position.set(cfg.x, cfg.y, cfg.z);
    pLight.name = `Lantern_Light_${cfg.x}`;
    roomGroup.add(pLight);
    lanternPoints.push(pLight);
  });

  roomGroup.userData = { lanternLights: lanternPoints, photoWallFrames };
  return roomGroup;
}

/**
 * Creates the interactive salon-style photo wall matching the supplied reference.
 * Frames repositioned into y = -0.5 to 4.2 — the actual camera-visible band.
 * Gold frames use emissive material so they read against the dark wall.
 */

function createPhotoWall(roomGroup) {
  const sources = [
    { image: frame01, width: 269, height: 272, label: 'Owl portrait' },
    { image: frame02, width: 382, height: 288, label: 'Glasshouse study' },
    { image: frame03, width: 267, height: 294, label: 'Botanical study' },
    { image: frame04, width: 168, height: 143, label: 'Misty landscape' },
    { image: frame05, width: 181, height: 120, label: 'Oval landscape' },
    { image: frame06, width: 211, height: 277, label: 'Dusk architecture' },
    { image: frame07, width: 259, height: 315, label: 'Tortoise portrait' },
    { image: frame08, width: 183, height: 246, label: 'Mountain study' },
    { image: frame09, width: 197, height: 199, label: 'Skull portrait' },
    { image: frame10, width: 375, height: 263, label: 'Cloud study' },
    { image: frame11, width: 269, height: 268, label: 'Woodland study' }
  ];
  const columns = 5;
  const rows = 4;
  const cellWidth = 1.8;
  const cellHeight = 1.55;
  const frameMaxWidth = 1.55;
  const frameMaxHeight = 1.28;
  const firstX = -((columns - 1) * cellWidth) / 2;
  const wallCenterY = 2.5;
  const firstY = wallCenterY + ((rows - 1) * cellHeight) / 2;
  const wallZ = -6.22;
  const loader = new THREE.TextureLoader();
  const frames = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const sourceIndex = (row * 3 + column * 7) % sources.length;
      const source = sources[sourceIndex];
      const aspect = source.width / source.height;
      const height = Math.min(frameMaxHeight, frameMaxWidth / aspect);
      const width = height * aspect;
      const texture = loader.load(source.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.025,
        side: THREE.DoubleSide,
        toneMapped: false,
        depthWrite: false,
        fog: false
      });
      const frame = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
      frame.name = 'PhotoFrame_' + String(row + 1).padStart(2, '0') + '_' + String(column + 1).padStart(2, '0');
      frame.position.set(firstX + column * cellWidth, firstY - row * cellHeight, wallZ);
      frame.renderOrder = 2;
      frame.userData = {
        isInteractive: false,
        type: 'wallframe',
        frameIndex: sourceIndex,
        label: source.label,
        title: source.label
      };
      roomGroup.add(frame);
      frames.push(frame);
    }
  }

  return frames;
}

/**
 * Creates library rolling ladder
 */
function createLibraryLadder(woodMat, brassMat) {
  const group = new THREE.Group();
  const height = 5.2;

  const leftRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, height, 0.12), woodMat);
  leftRail.position.set(-0.35, height / 2, 0);
  group.add(leftRail);

  const rightRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, height, 0.12), woodMat);
  rightRail.position.set(0.35, height / 2, 0);
  group.add(rightRail);

  for (let y = 0.35; y < height - 0.2; y += 0.38) {
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.65, 12), woodMat);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(0, y, 0);
    group.add(rung);
  }

  [-0.35, 0.35].forEach(wx => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16), brassMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(wx, 0.08, 0);
    group.add(wheel);
  });

  return group;
}

/**
 * Creates an authentic brass balance scale with twin pans
 */
function createBalanceScale(brassMat) {
  const group = new THREE.Group();

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.04, 16), brassMat);
  group.add(base);

  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.55, 12), brassMat);
  pillar.position.y = 0.28;
  group.add(pillar);

  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.65, 8), brassMat);
  beam.rotation.z = Math.PI / 2;
  beam.position.y = 0.54;
  group.add(beam);

  [-0.28, 0.28].forEach((px, i) => {
    const panGroup = new THREE.Group();
    panGroup.position.set(px, 0.35 + (i === 0 ? -0.04 : 0.04), 0);

    const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.04, 0.04, 16), brassMat);
    panGroup.add(pan);

    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.18, 4), brassMat);
    string.position.y = 0.1;
    panGroup.add(string);

    group.add(panGroup);
  });

  return group;
}

/**
 * Background shelves filled with books & jars
 */
function createBackgroundShelves(group, { shelfWoodMat, x, y, z, w, h }) {
  const shelfCase = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.6), shelfWoodMat);
  shelfCase.position.set(x, y + h / 2, z);
  group.add(shelfCase);

  const numRows = 5;
  const rowHeight = h / numRows;

  const bookColors = [0x421d1d, 0x1a2e22, 0x1f2b38, 0x3b2a1a, 0x301a2e, 0x4a3a22];
  const jarColors = [0x7898a8, 0xbda47e, 0x6e8870, 0xab725f];

  for (let r = 0; r < numRows; r++) {
    const shelfLedge = new THREE.Mesh(new THREE.BoxGeometry(w - 0.1, 0.08, 0.55), shelfWoodMat);
    shelfLedge.position.set(x, y + r * rowHeight + 0.04, z + 0.05);
    group.add(shelfLedge);

    let currentX = x - w / 2 + 0.3;
    while (currentX < x + w / 2 - 0.3) {
      if (Math.random() > 0.3) {
        const bookW = 0.08 + Math.random() * 0.14;
        const bookH = rowHeight * 0.65 + Math.random() * (rowHeight * 0.25);
        const bookCol = bookColors[Math.floor(Math.random() * bookColors.length)];
        const bookMesh = new THREE.Mesh(
          new THREE.BoxGeometry(bookW, bookH, 0.35),
          new THREE.MeshStandardMaterial({ color: bookCol, roughness: 0.85, metalness: 0.02 })
        );
        bookMesh.position.set(currentX, y + r * rowHeight + bookH / 2 + 0.08, z + 0.05);
        group.add(bookMesh);
        currentX += bookW + 0.02;
      } else {
        const jarRadius = 0.07 + Math.random() * 0.04;
        const jarHeight = rowHeight * 0.5;
        const jarCol = jarColors[Math.floor(Math.random() * jarColors.length)];
        const jarMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(jarRadius, jarRadius, jarHeight, 16),
          new THREE.MeshPhysicalMaterial({ color: jarCol, roughness: 0.15, transmission: 0.7, transparent: true, opacity: 0.88 })
        );
        jarMesh.position.set(currentX, y + r * rowHeight + jarHeight / 2 + 0.08, z + 0.05);
        group.add(jarMesh);
        currentX += jarRadius * 2 + 0.08;
      }
    }
  }
}

/**
 * Creates ceiling suspended herb bouquet bundle
 */
function createCeilingHerbBundle(herbMat, twineMat, cordLen) {
  const group = new THREE.Group();

  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, cordLen, 6), twineMat);
  cord.position.y = -cordLen / 2;
  group.add(cord);

  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 6, 12), twineMat);
  loop.position.y = -cordLen;
  group.add(loop);

  for (let i = 0; i < 7; i++) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.018, 0.45, 6), herbMat);
    stem.position.set((Math.random() - 0.5) * 0.08, -cordLen - 0.22, (Math.random() - 0.5) * 0.08);
    stem.rotation.z = (Math.random() - 0.5) * 0.35;
    stem.rotation.x = (Math.random() - 0.5) * 0.35;
    group.add(stem);
  }

  return group;
}

/**
 * Creates hanging glass lantern
 */
function createHangingLantern({ x, y, z, glassColor, scale = 1.0 }) {
  const lantern = new THREE.Group();
  lantern.position.set(x, y, z);
  lantern.scale.setScalar(scale);

  const brassMat = new THREE.MeshStandardMaterial({ color: 0x9e8052, roughness: 0.44, metalness: 0.82 });
  const glowingGlassMat = new THREE.MeshPhysicalMaterial({
    color: glassColor,
    emissive: glassColor,
    emissiveIntensity: 0.55,
    roughness: 0.12,
    transmission: 0.75,
    ior: 1.5,
    transparent: true,
    opacity: 0.92
  });

  const chainLength = 7.8 - y;
  const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, chainLength, 8), brassMat);
  chain.position.y = chainLength / 2 + 0.3;
  lantern.add(chain);

  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.22, 16), brassMat);
  cap.position.y = 0.25;
  lantern.add(cap);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 8, 16), brassMat);
  ring.position.y = 0.38;
  lantern.add(ring);

  const glassBody = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20), glowingGlassMat);
  glassBody.scale.set(1, 1.45, 1);
  lantern.add(glassBody);

  const finial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.2, 12), brassMat);
  finial.rotation.x = Math.PI;
  finial.position.y = -0.45;
  lantern.add(finial);

  return lantern;
}
