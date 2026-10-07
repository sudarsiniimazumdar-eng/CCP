import * as THREE from 'three';

/**
 * High-End Editorial Apothecary Label Generator
 * Photometrically plausible tactile cotton-rag parchment with crisp typography
 */
function createAlchemicalLabelTexture(project) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  // Muted Matte Parchment Background (Off-white / pale linen)
  ctx.fillStyle = '#f0ebe1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft subtle organic paper grain
  ctx.fillStyle = 'rgba(120, 100, 80, 0.05)';
  for (let i = 0; i < 90; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, Math.random() * 8 + 2, Math.random() * 3 + 1);
  }

  // Refined Thin Dual Border Frame
  ctx.strokeStyle = '#28201a';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  ctx.strokeStyle = '#a6834d'; // Brushed aged gold
  ctx.lineWidth = 1.0;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  // Subtle Corner Accents
  const drawCorner = (x, y, dx, dy) => {
    ctx.fillStyle = '#a6834d';
    ctx.fillRect(x, y, 4 * dx, 4 * dy);
  };
  drawCorner(26, 26, 1, 1);
  drawCorner(canvas.width - 26, 26, -1, 1);
  drawCorner(26, canvas.height - 26, 1, -1);
  drawCorner(canvas.width - 26, canvas.height - 26, -1, -1);

  // Apothecary Header: Alchemical Number
  ctx.fillStyle = '#8f6f3a';
  ctx.font = '500 18px "DM Mono", monospace';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '2px';
  ctx.fillText(`— ${project.placement.labelNumber || 'N° 01'} —`, canvas.width / 2, 58);

  ctx.fillStyle = '#5c4838';
  ctx.font = 'italic 19px "Pinyon Script", "Alex Brush", cursive';
  ctx.fillText('Atelier Archive · Preserved Formulation', canvas.width / 2, 88);

  // Fine Hairline Divider with Center Diamond
  ctx.strokeStyle = '#b09b82';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(60, 104);
  ctx.lineTo(235, 104);
  ctx.moveTo(277, 104);
  ctx.lineTo(452, 104);
  ctx.stroke();

  ctx.fillStyle = '#a6834d';
  ctx.beginPath();
  ctx.arc(256, 104, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Project Title in Editorial Serif
  ctx.fillStyle = '#1c1510';
  ctx.font = '600 30px "Playfair Display", "Cormorant Garamond", Georgia, serif';
  
  const words = project.title.split(' ');
  if (words.length > 2) {
    ctx.fillText(words.slice(0, 2).join(' '), canvas.width / 2, 154);
    ctx.fillText(words.slice(2).join(' '), canvas.width / 2, 194);
  } else {
    ctx.fillText(project.title, canvas.width / 2, 172);
  }

  // Taxonomy & Metadata
  ctx.fillStyle = '#6e5644';
  ctx.font = '500 14px "DM Mono", monospace';
  ctx.letterSpacing = '1.8px';
  ctx.fillText(`[ ${project.category.toUpperCase()} ]`, canvas.width / 2, 250);

  ctx.fillStyle = '#8a725f';
  ctx.font = 'italic 17px "Pinyon Script", "Alex Brush", cursive';
  ctx.fillText('Permanent Collection · Studio Index', canvas.width / 2, 290);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Physically Plausible Product Visualization Generator for Perfume Bottles
 */
export function createPerfumeBottle(project) {
  const bottleGroup = new THREE.Group();
  bottleGroup.name = `Bottle_${project.id}`;

  const { bottleVariant, liquidColor, position, rotation } = project.placement;

  // 1. Physically Believable Optical Glass Material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xffffff),
    transmission: 0.96,
    opacity: 1.0,
    transparent: true,
    roughness: 0.04,
    ior: 1.515, // Real silicate glass IOR
    thickness: 0.45,
    attenuationColor: new THREE.Color(0xf4efe4),
    attenuationDistance: 1.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    reflectivity: 0.6,
    specularIntensity: 1.0
  });

  // 2. Physically Believable Liquid Medium
  const liquidMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(liquidColor || '#cbb389'),
    transmission: 0.88,
    opacity: 0.96,
    transparent: true,
    roughness: 0.06,
    ior: 1.34, // Water/ethanol IOR
    thickness: 0.75,
    attenuationColor: new THREE.Color(liquidColor || '#cbb389'),
    attenuationDistance: 0.6,
    clearcoat: 0.35,
    clearcoatRoughness: 0.08
  });

  // 3. Brushed Antique Brass & Hardware
  const brushedBrassMaterial = new THREE.MeshStandardMaterial({
    color: 0xa6834d,
    roughness: 0.42,
    metalness: 0.84
  });

  // 4. Matte Aged Cork Material
  const agedCorkMaterial = new THREE.MeshStandardMaterial({
    color: 0x6e523c,
    roughness: 0.92,
    metalness: 0.0
  });

  // 5. Ebonized Smoked Wood Cap
  const charredWoodMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e1916,
    roughness: 0.78,
    metalness: 0.04
  });

  // 6. Natural Jute Twine Cord
  const twineCordMaterial = new THREE.MeshStandardMaterial({
    color: 0x94836f,
    roughness: 0.92,
    metalness: 0.0
  });

  const labelTexture = createAlchemicalLabelTexture(project);
  const labelMaterial = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.75,
    metalness: 0.0,
    side: THREE.DoubleSide
  });

  let bodyMesh, liquidMesh, capMesh, neckMesh, labelMesh, neckCordMesh;

  switch (bottleVariant) {
    case 'apothecary': {
      const radius = 0.36;
      const height = 0.86;
      const bodyGeo = new THREE.CylinderGeometry(radius, radius, height, 36);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = height / 2;

      const liqGeo = new THREE.CylinderGeometry(radius * 0.88, radius * 0.88, height * 0.76, 28);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = (height * 0.76) / 2 + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.22, 24);
      neckMesh = new THREE.Mesh(neckGeo, glassMaterial);
      neckMesh.position.y = height + 0.11;

      const cordGeo = new THREE.TorusGeometry(0.165, 0.03, 12, 24);
      neckCordMesh = new THREE.Mesh(cordGeo, twineCordMaterial);
      neckCordMesh.rotation.x = Math.PI / 2;
      neckCordMesh.position.y = height + 0.1;

      const capGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.28, 24);
      capMesh = new THREE.Mesh(capGeo, agedCorkMaterial);
      capMesh.position.y = height + 0.24 + 0.11;

      const labelGeo = new THREE.CylinderGeometry(radius + 0.006, radius + 0.006, 0.48, 32, 1, true, -Math.PI / 2.8, (2 * Math.PI) / 2.8);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.y = height / 2;
      break;
    }

    case 'faceted': {
      const radius = 0.4;
      const height = 0.94;
      const bodyGeo = new THREE.CylinderGeometry(radius, radius * 0.84, height, 6);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = height / 2;

      const liqGeo = new THREE.CylinderGeometry(radius * 0.86, radius * 0.74, height * 0.78, 6);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = (height * 0.78) / 2 + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.18, 20);
      neckMesh = new THREE.Mesh(neckGeo, brushedBrassMaterial);
      neckMesh.position.y = height + 0.09;

      const capGroup = new THREE.Group();
      const capBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.16, 8), brushedBrassMaterial);
      const capSpire = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.35, 8), brushedBrassMaterial);
      capSpire.position.y = 0.24;
      capGroup.add(capBase);
      capGroup.add(capSpire);
      capGroup.position.y = height + 0.18 + 0.08;
      capMesh = capGroup;

      const labelGeo = new THREE.PlaneGeometry(0.44, 0.4);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.set(0, height / 2, radius * 0.86 + 0.01);
      break;
    }

    case 'flask': {
      const w = 0.72, h = 0.88, d = 0.4;
      const bodyGeo = new THREE.BoxGeometry(w, h, d);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = h / 2;

      const liqGeo = new THREE.BoxGeometry(w * 0.86, h * 0.78, d * 0.8);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = (h * 0.78) / 2 + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.18, 20);
      neckMesh = new THREE.Mesh(neckGeo, brushedBrassMaterial);
      neckMesh.position.y = h + 0.09;

      const capGeo = new THREE.BoxGeometry(0.3, 0.28, 0.3);
      capMesh = new THREE.Mesh(capGeo, charredWoodMaterial);
      capMesh.position.y = h + 0.16 + 0.13;

      const labelGeo = new THREE.PlaneGeometry(w * 0.78, h * 0.52);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.set(0, h / 2, d / 2 + 0.007);
      break;
    }

    case 'sphere': {
      const radius = 0.42;
      const bodyGeo = new THREE.SphereGeometry(radius, 32, 24);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = radius + 0.04;

      const liqGeo = new THREE.SphereGeometry(radius * 0.86, 24, 18);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = radius + 0.04;

      // Armillary Brass Cradle Rings
      const ringGroup = new THREE.Group();
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.08, 0.018, 12, 32), brushedBrassMaterial);
      ringGroup.add(ring1);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.08, 0.018, 12, 32), brushedBrassMaterial);
      ring2.rotation.y = Math.PI / 2;
      ringGroup.add(ring2);
      ringGroup.position.y = radius + 0.04;
      neckCordMesh = ringGroup;

      const neckGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.2, 20);
      neckMesh = new THREE.Mesh(neckGeo, brushedBrassMaterial);
      neckMesh.position.y = radius * 2 + 0.08;

      const capGeo = new THREE.ConeGeometry(0.16, 0.32, 16);
      capMesh = new THREE.Mesh(capGeo, brushedBrassMaterial);
      capMesh.position.y = radius * 2 + 0.22 + 0.08;

      const labelGeo = new THREE.PlaneGeometry(0.42, 0.34);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.set(0, radius + 0.04, radius + 0.01);
      break;
    }

    case 'arch':
    default: {
      const radius = 0.34;
      const height = 1.02;
      const bodyGeo = new THREE.CylinderGeometry(radius, radius * 0.88, height, 36);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = height / 2;

      const liqGeo = new THREE.CylinderGeometry(radius * 0.86, radius * 0.78, height * 0.8, 28);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = (height * 0.8) / 2 + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.24, 24);
      neckMesh = new THREE.Mesh(neckGeo, brushedBrassMaterial);
      neckMesh.position.y = height + 0.11;

      const capGroup = new THREE.Group();
      const capCol = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.28, 24), brushedBrassMaterial);
      const capFinial = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 20), glassMaterial);
      capFinial.position.y = 0.25;
      capFinial.scale.set(0.8, 1.35, 0.8);
      capGroup.add(capCol);
      capGroup.add(capFinial);
      capGroup.position.y = height + 0.22 + 0.12;
      capMesh = capGroup;

      const labelGeo = new THREE.CylinderGeometry(radius + 0.006, radius + 0.006, 0.52, 32, 1, true, -Math.PI / 2.8, (2 * Math.PI) / 2.8);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.y = height / 2;
      break;
    }
  }

  // Soft Occlusion Contact Shadow under base
  const shadowGeo = new THREE.CircleGeometry(0.42, 24);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x050403,
    transparent: true,
    opacity: 0.45,
    depthWrite: false
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.005;

  bottleGroup.add(shadowMesh);
  bottleGroup.add(bodyMesh);
  if (liquidMesh) bottleGroup.add(liquidMesh);
  if (neckMesh) bottleGroup.add(neckMesh);
  if (neckCordMesh) bottleGroup.add(neckCordMesh);
  if (capMesh) bottleGroup.add(capMesh);
  if (labelMesh) bottleGroup.add(labelMesh);

  if (position) {
    bottleGroup.position.set(position.x, position.y, position.z);
  }
  if (rotation) {
    bottleGroup.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0);
  }

  bottleGroup.userData = {
    isInteractive: true,
    type: 'bottle',
    projectData: project,
    basePosition: bottleGroup.position.clone(),
    baseRotation: bottleGroup.rotation.clone(),
    isHovered: false,
    isSelected: false
  };

  return bottleGroup;
}
