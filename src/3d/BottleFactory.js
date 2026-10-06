import * as THREE from 'three';

/**
 * Exact Visual Match: Antique Apothecary & Alchemical Label Generator
 */
function createAlchemicalLabelTexture(project) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');

  // Stained, Decaying Parchment Background (Aged Amber Patina)
  const bgGrad = ctx.createRadialGradient(256, 170, 30, 256, 170, 260);
  bgGrad.addColorStop(0, '#f5ebdb');
  bgGrad.addColorStop(0.65, '#e5d1b5');
  bgGrad.addColorStop(0.92, '#cbb290');
  bgGrad.addColorStop(1, '#8e6f49');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Weathered stains & micro-grunge speckles
  ctx.fillStyle = 'rgba(75, 50, 25, 0.09)';
  for (let i = 0; i < 70; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    const rw = Math.random() * 24 + 4;
    ctx.fillRect(rx, ry, rw, rw * 0.55);
  }

  // Ornate Engraved Border Frame
  ctx.strokeStyle = '#241a12';
  ctx.lineWidth = 5;
  ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

  ctx.strokeStyle = '#b5843a';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);

  // Four corner filigree insets
  const drawFiligreeCorner = (x, y, dx, dy) => {
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 16);
    ctx.lineTo(x + dx * 16, y);
    ctx.strokeStyle = '#241a12';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#b5843a';
    ctx.fillRect(x + dx * 8, y + dy * 8, 4, 4);
  };
  drawFiligreeCorner(25, 25, 1, 1);
  drawFiligreeCorner(canvas.width - 25, 25, -1, 1);
  drawFiligreeCorner(25, canvas.height - 25, 1, -1);
  drawFiligreeCorner(canvas.width - 25, canvas.height - 25, -1, -1);

  // Apothecary Header: Alchemical Number
  ctx.fillStyle = '#b5843a';
  ctx.font = 'bold 22px "DM Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`— ${project.placement.labelNumber || 'N° 01'} —`, canvas.width / 2, 60);

  ctx.fillStyle = '#4a3625';
  ctx.font = 'italic 23px "Pinyon Script", "Alex Brush", cursive';
  ctx.fillText('Old Field Apothecary · Preserved Elixir', canvas.width / 2, 92);

  // Dividing engraved line
  ctx.strokeStyle = '#856644';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(60, 108);
  ctx.lineTo(230, 108);
  ctx.moveTo(282, 108);
  ctx.lineTo(452, 108);
  ctx.stroke();

  ctx.fillStyle = '#b5843a';
  ctx.fillRect(251, 103, 10, 10);

  // Project Title
  ctx.fillStyle = '#160e0a';
  ctx.font = '700 34px "Playfair Display", "Cormorant Garamond", Georgia, serif';
  
  const words = project.title.split(' ');
  if (words.length > 2) {
    ctx.fillText(words.slice(0, 2).join(' '), canvas.width / 2, 156);
    ctx.fillText(words.slice(2).join(' '), canvas.width / 2, 200);
  } else {
    ctx.fillText(project.title, canvas.width / 2, 175);
  }

  // Taxonomy & Year
  ctx.fillStyle = '#5c4532';
  ctx.font = '600 17px "DM Mono", monospace';
  ctx.letterSpacing = '2.5px';
  ctx.fillText(`[ ${project.category.toUpperCase()} ]`, canvas.width / 2, 255);

  ctx.fillStyle = '#7a5e46';
  ctx.font = 'italic 20px "Pinyon Script", "Alex Brush", cursive';
  ctx.fillText('All flesh rots, but inquiry endures', canvas.width / 2, 295);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Procedural Perfume Bottle Generator (360° Spatial Placement)
 */
export function createPerfumeBottle(project) {
  const bottleGroup = new THREE.Group();
  bottleGroup.name = `Bottle_${project.id}`;

  const { bottleVariant, liquidColor, position, rotation } = project.placement;

  // Materials
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.9,
    opacity: 1,
    transparent: true,
    roughness: 0.14,
    ior: 1.52,
    metalness: 0.04,
    clearcoat: 0.8,
    clearcoatRoughness: 0.12
  });

  const liquidMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(liquidColor || '#cf8a3c'),
    roughness: 0.28,
    metalness: 0.15,
    transparent: true,
    opacity: 0.9
  });

  const antiqueBrassMaterial = new THREE.MeshStandardMaterial({
    color: 0xb5843a,
    roughness: 0.42,
    metalness: 0.82
  });

  const agedCorkMaterial = new THREE.MeshStandardMaterial({
    color: 0x855e3c,
    roughness: 0.95,
    metalness: 0.0
  });

  const charredWoodMaterial = new THREE.MeshStandardMaterial({
    color: 0x221711,
    roughness: 0.85,
    metalness: 0.05
  });

  const twineCordMaterial = new THREE.MeshStandardMaterial({
    color: 0x9e886c,
    roughness: 0.9,
    metalness: 0.0
  });

  const labelTexture = createAlchemicalLabelTexture(project);
  const labelMaterial = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.8,
    metalness: 0.0,
    side: THREE.DoubleSide
  });

  let bodyMesh, liquidMesh, capMesh, neckMesh, labelMesh, neckCordMesh;

  switch (bottleVariant) {
    case 'apothecary': {
      const radius = 0.38;
      const height = 0.85;
      const bodyGeo = new THREE.CylinderGeometry(radius, radius, height, 32);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = height / 2;

      const liqGeo = new THREE.CylinderGeometry(radius * 0.9, radius * 0.9, height * 0.76, 24);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = (height * 0.76) / 2 + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.24, 24);
      neckMesh = new THREE.Mesh(neckGeo, glassMaterial);
      neckMesh.position.y = height + 0.12;

      const cordGeo = new THREE.TorusGeometry(0.18, 0.035, 12, 24);
      neckCordMesh = new THREE.Mesh(cordGeo, twineCordMaterial);
      neckCordMesh.rotation.x = Math.PI / 2;
      neckCordMesh.position.y = height + 0.11;

      const capGeo = new THREE.CylinderGeometry(0.2, 0.15, 0.3, 24);
      capMesh = new THREE.Mesh(capGeo, agedCorkMaterial);
      capMesh.position.y = height + 0.26 + 0.12;

      const labelGeo = new THREE.CylinderGeometry(radius + 0.007, radius + 0.007, 0.48, 32, 1, true, -Math.PI / 2.8, (2 * Math.PI) / 2.8);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.y = height / 2;
      break;
    }

    case 'faceted': {
      const radius = 0.42;
      const height = 0.92;
      const bodyGeo = new THREE.CylinderGeometry(radius, radius * 0.82, height, 6);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = height / 2;

      const liqGeo = new THREE.CylinderGeometry(radius * 0.86, radius * 0.74, height * 0.78, 6);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = (height * 0.78) / 2 + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.2, 16);
      neckMesh = new THREE.Mesh(neckGeo, antiqueBrassMaterial);
      neckMesh.position.y = height + 0.1;

      const capGroup = new THREE.Group();
      const capBase = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 0.18, 8), antiqueBrassMaterial);
      const capSpire = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.38, 8), antiqueBrassMaterial);
      capSpire.position.y = 0.26;
      capGroup.add(capBase);
      capGroup.add(capSpire);
      capGroup.position.y = height + 0.2 + 0.09;
      capMesh = capGroup;

      const labelGeo = new THREE.PlaneGeometry(0.48, 0.42);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.set(0, height / 2, radius * 0.88 + 0.01);
      break;
    }

    case 'flask': {
      const w = 0.76, h = 0.86, d = 0.42;
      const bodyGeo = new THREE.BoxGeometry(w, h, d);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = h / 2;

      const liqGeo = new THREE.BoxGeometry(w * 0.88, h * 0.78, d * 0.82);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = (h * 0.78) / 2 + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.18, 20);
      neckMesh = new THREE.Mesh(neckGeo, antiqueBrassMaterial);
      neckMesh.position.y = h + 0.09;

      const capGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
      capMesh = new THREE.Mesh(capGeo, charredWoodMaterial);
      capMesh.position.y = h + 0.18 + 0.14;

      const labelGeo = new THREE.PlaneGeometry(w * 0.8, h * 0.54);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.set(0, h / 2, d / 2 + 0.007);
      break;
    }

    case 'atomizer': {
      const radius = 0.46;
      const bodyGeo = new THREE.SphereGeometry(radius, 32, 24);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = radius + 0.04;

      const liqGeo = new THREE.SphereGeometry(radius * 0.88, 24, 18);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = radius + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.25, 20);
      neckMesh = new THREE.Mesh(neckGeo, antiqueBrassMaterial);
      neckMesh.position.y = radius * 2 + 0.12;

      const capGroup = new THREE.Group();
      const sprayHead = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.2, 16), antiqueBrassMaterial);
      sprayHead.rotation.z = Math.PI / 2;
      const bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), charredWoodMaterial);
      bulbMesh.position.set(0.26, 0, 0);
      capGroup.add(sprayHead);
      capGroup.add(bulbMesh);
      capGroup.position.y = radius * 2 + 0.25 + 0.09;
      capMesh = capGroup;

      const labelGeo = new THREE.PlaneGeometry(0.46, 0.38);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.set(0, radius + 0.04, radius + 0.008);
      break;
    }

    case 'arch':
    default: {
      const radius = 0.36;
      const height = 1.05;
      const bodyGeo = new THREE.CylinderGeometry(radius, radius * 0.88, height, 32);
      bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
      bodyMesh.position.y = height / 2;

      const liqGeo = new THREE.CylinderGeometry(radius * 0.88, radius * 0.78, height * 0.82, 24);
      liquidMesh = new THREE.Mesh(liqGeo, liquidMaterial);
      liquidMesh.position.y = (height * 0.82) / 2 + 0.04;

      const neckGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.25, 24);
      neckMesh = new THREE.Mesh(neckGeo, antiqueBrassMaterial);
      neckMesh.position.y = height + 0.12;

      const capGroup = new THREE.Group();
      const capCol = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.32, 24), antiqueBrassMaterial);
      const capFinial = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), glassMaterial);
      capFinial.position.y = 0.28;
      capFinial.scale.set(0.8, 1.4, 0.8);
      capGroup.add(capCol);
      capGroup.add(capFinial);
      capGroup.position.y = height + 0.24 + 0.14;
      capMesh = capGroup;

      const labelGeo = new THREE.CylinderGeometry(radius + 0.007, radius + 0.007, 0.54, 32, 1, true, -Math.PI / 2.8, (2 * Math.PI) / 2.8);
      labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
      labelMesh.position.y = height / 2;
      break;
    }
  }

  // Base Contact Shadow
  const shadowGeo = new THREE.CircleGeometry(0.44, 24);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x050403,
    transparent: true,
    opacity: 0.55,
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

  // Position & Orientation in Assemblage Tower
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
