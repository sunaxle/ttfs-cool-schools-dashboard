/**
 * 3D Campus Canopy & Shade Explorer + Comparative Heat Island Slider
 * Pilot Campus: Donna ISD - M. Rivas Primary
 * UTRGV Agroecology & Texas Trees Foundation
 */

(function () {
    'use strict';

    // --- Geodetic Center & Scale Conversion Factors ---
    const CENTER_LON = -98.070606;
    const CENTER_LAT = 26.166986;
    const LON_METERS = 99742.37;
    const LAT_METERS = 111132.0;

    /**
     * Converts GPS (Lon, Lat) to Local 3D Coordinates (X, Z in meters)
     */
    function projectCoords(lon, lat) {
        return {
            x: (lon - CENTER_LON) * LON_METERS,
            z: -(lat - CENTER_LAT) * LAT_METERS
        };
    }

    // =========================================================================
    // SECTION 1: TOP 3D CAMPUS EXPLORER
    // =========================================================================

    let currentSunHour = 12.0;
    let currentGrowthStage = 10; // 1, 5, 10
    let selectedSpeciesFilter = null;
    let buildingHeightMeters = 5.5; // ~18 ft
    let isSunPlaying = false;
    let sunPlayTimer = null;

    let sceneExplorer, cameraExplorer, rendererExplorer, controlsExplorer;
    let sunLightExplorer, ambientLightExplorer, groundMeshExplorer;
    let buildingsGroupExplorer, treesGroupExplorer, zonesGroupExplorer;
    let treeObjectsExplorer = [];
    let buildingMeshesExplorer = [];
    let raycasterExplorer, mouseExplorer;

    // UI Elements for Section 1
    const containerExplorer = document.getElementById('campusCanvasContainer');
    const sunSlider = document.getElementById('sunTimeSlider');
    const timeBadge = document.getElementById('timeDisplayBadge');
    const btnPlaySun = document.getElementById('btnPlaySun');
    const btnResetSun = document.getElementById('btnResetSun');
    const tempExposedEl = document.getElementById('tempExposedVal');
    const tempShadedEl = document.getElementById('tempShadedVal');
    const tempDiffEl = document.getElementById('tempDiffBanner');
    const growthButtons = document.querySelectorAll('.btn-growth');
    const growthStageLabel = document.getElementById('growthStageLabel');
    const speciesItems = document.querySelectorAll('.species-item');
    const btnShowAllSpecies = document.getElementById('btnShowAllSpecies');
    const buildingHeightSlider = document.getElementById('buildingHeightSlider');
    const bldgHeightValEl = document.getElementById('bldgHeightVal');
    const toggleShadows = document.getElementById('toggleShadows');
    const toggleAutoRotate = document.getElementById('toggleAutoRotate');
    const toggleZones = document.getElementById('toggleZones');
    const presetButtons = document.querySelectorAll('.btn-preset');
    const tooltip = document.getElementById('inspectorTooltip');
    const tooltipHeader = document.getElementById('tooltipHeader');
    const tooltipBody = document.getElementById('tooltipBody');
    const hudSolarAlt = document.getElementById('hudSolarAlt');
    const hudCanopyArea = document.getElementById('hudCanopyArea');

    // Standard Architectural Materials (Cool Schools Target)
    const matBldgWall = new THREE.MeshStandardMaterial({ color: 0xded5c8, roughness: 0.85, metalness: 0.05 });
    const matBldgRoof = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.7, metalness: 0.1 });
    const matParking = new THREE.MeshStandardMaterial({ color: 0x3d4147, roughness: 0.95 });
    const matWalkway = new THREE.MeshStandardMaterial({ color: 0xc8c3b7, roughness: 0.9 });
    const matOpenField = new THREE.MeshStandardMaterial({ color: 0x7da85b, roughness: 0.95 });
    const matCourtyard = new THREE.MeshStandardMaterial({ color: 0x8eb468, roughness: 0.95 });
    const matMicroforestZone = new THREE.MeshStandardMaterial({ color: 0x5a8a48, roughness: 0.95 });

    // Botanical Foliage Materials
    const trunkMatDark = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.9 });
    const trunkMatGrey = new THREE.MeshStandardMaterial({ color: 0x736d65, roughness: 0.9 });
    const trunkMatPale = new THREE.MeshStandardMaterial({ color: 0xb5aba0, roughness: 0.85 });

    const folBurOak1 = new THREE.MeshStandardMaterial({ color: 0x1b4332, roughness: 0.8 });
    const folBurOak2 = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.8 });
    const folCypress1 = new THREE.MeshStandardMaterial({ color: 0x1f543e, roughness: 0.8 });
    const folCypress2 = new THREE.MeshStandardMaterial({ color: 0x388e3c, roughness: 0.75 });
    const folSycamore1 = new THREE.MeshStandardMaterial({ color: 0x52b788, roughness: 0.8 });
    const folSycamore2 = new THREE.MeshStandardMaterial({ color: 0x74c69d, roughness: 0.8 });
    const folPecan1 = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.8 });
    const folPecan2 = new THREE.MeshStandardMaterial({ color: 0x4caf50, roughness: 0.8 });
    const folLiveOak1 = new THREE.MeshStandardMaterial({ color: 0x234d20, roughness: 0.85 });
    const folLiveOak2 = new THREE.MeshStandardMaterial({ color: 0x366b32, roughness: 0.85 });

    // =========================================================================
    // SECTION 2: DUAL COMPARATIVE HEAT ISLAND SLIDER
    // =========================================================================

    let sceneBaseline, cameraBaseline, rendererBaseline;
    let sceneTarget, cameraTarget, rendererTarget;
    let controlsComparison; // Single master orbit controller
    let heatwaveParticles;
    let isSideBySide = false;
    let isLiveAutoPlaying = false;

    // UI Elements for Section 2
    const containerBaseline = document.getElementById('canvasContainerBaseline');
    const containerTarget = document.getElementById('canvasContainerTarget');
    const splitWipeSlider = document.getElementById('splitWipeSlider');
    const sliderStatusPill = document.getElementById('sliderStatusPill');
    const layerTargetEl = document.getElementById('layerTarget');
    const splitDividerLine = document.getElementById('splitDividerLine');
    const comparisonWrapper = document.getElementById('comparisonViewportWrapper');
    const btnLivePlayWipe = document.getElementById('btnLivePlayWipe');
    const btnModeBaseline = document.getElementById('btnModeBaseline');
    const btnModeSplit = document.getElementById('btnModeSplit');
    const btnModeTarget = document.getElementById('btnModeTarget');
    const btnModeSideBySide = document.getElementById('btnModeSideBySide');

    // Thermal False-Color Infrared Materials (Baseline Heat Island)
    const matThermalAsphalt = new THREE.MeshStandardMaterial({
        color: 0x800020,
        emissive: 0x3a0005,
        roughness: 0.95
    });

    const matThermalField = new THREE.MeshStandardMaterial({
        color: 0xd9381e,
        roughness: 0.95
    });

    const matThermalLawn = new THREE.MeshStandardMaterial({
        color: 0xe65100,
        roughness: 0.95
    });

    const matThermalBldgWall = new THREE.MeshStandardMaterial({
        color: 0x8a4529,
        roughness: 0.85
    });

    const matThermalBldgRoof = new THREE.MeshStandardMaterial({
        color: 0xb71c1c,
        emissive: 0x220000,
        roughness: 0.75
    });

    // =========================================================================
    // TREE PROCEDURAL ARCHEOLOGY GENERATORS
    // =========================================================================

    function createBurOakMesh(growthScale) {
        const group = new THREE.Group();
        const baseH = 2.5 * growthScale;
        const trunkGeo = new THREE.CylinderGeometry(0.35 * growthScale, 0.6 * growthScale, baseH, 8);
        const trunk = new THREE.Mesh(trunkGeo, trunkMatDark);
        trunk.position.y = baseH / 2;
        trunk.castShadow = true; trunk.receiveShadow = true;
        group.add(trunk);

        const crownSpread = 6.5 * growthScale;
        const mainCrownGeo = new THREE.SphereGeometry(crownSpread, 16, 12);
        mainCrownGeo.scale(1.2, 0.7, 1.2);
        const mainCrown = new THREE.Mesh(mainCrownGeo, folBurOak1);
        mainCrown.position.set(0, baseH + crownSpread * 0.5, 0);
        mainCrown.castShadow = true; mainCrown.receiveShadow = true;
        group.add(mainCrown);

        const offsets = [
            { x: crownSpread * 0.45, y: baseH + crownSpread * 0.4, z: crownSpread * 0.35, r: crownSpread * 0.55 },
            { x: -crownSpread * 0.4, y: baseH + crownSpread * 0.45, z: -crownSpread * 0.3, r: crownSpread * 0.5 },
            { x: -crownSpread * 0.3, y: baseH + crownSpread * 0.6, z: crownSpread * 0.4, r: crownSpread * 0.45 }
        ];
        offsets.forEach(off => {
            const subGeo = new THREE.SphereGeometry(off.r, 12, 10);
            const subMesh = new THREE.Mesh(subGeo, folBurOak2);
            subMesh.position.set(off.x, off.y, off.z);
            subMesh.castShadow = true; subMesh.receiveShadow = true;
            group.add(subMesh);
        });

        return group;
    }

    function createMontezumaCypressMesh(growthScale) {
        const group = new THREE.Group();
        const baseH = 4.0 * growthScale;
        const trunkGeo = new THREE.CylinderGeometry(0.25 * growthScale, 0.5 * growthScale, baseH, 8);
        const trunk = new THREE.Mesh(trunkGeo, trunkMatDark);
        trunk.position.y = baseH / 2;
        trunk.castShadow = true; trunk.receiveShadow = true;
        group.add(trunk);

        const tiers = [
            { y: baseH * 0.5, r: 4.8 * growthScale, h: 4.5 * growthScale, mat: folCypress1 },
            { y: baseH * 0.85, r: 3.6 * growthScale, h: 4.0 * growthScale, mat: folCypress2 },
            { y: baseH * 1.25, r: 2.2 * growthScale, h: 3.5 * growthScale, mat: folCypress1 },
            { y: baseH * 1.6, r: 1.0 * growthScale, h: 2.5 * growthScale, mat: folCypress2 }
        ];

        tiers.forEach(t => {
            const coneGeo = new THREE.ConeGeometry(t.r, t.h, 10);
            const cone = new THREE.Mesh(coneGeo, t.mat);
            cone.position.y = t.y + t.h / 2;
            cone.castShadow = true; cone.receiveShadow = true;
            group.add(cone);
        });

        return group;
    }

    function createMexicanSycamoreMesh(growthScale) {
        const group = new THREE.Group();
        const baseH = 3.5 * growthScale;
        const trunkGeo = new THREE.CylinderGeometry(0.3 * growthScale, 0.45 * growthScale, baseH, 8);
        const trunk = new THREE.Mesh(trunkGeo, trunkMatPale);
        trunk.position.y = baseH / 2;
        trunk.castShadow = true; trunk.receiveShadow = true;
        group.add(trunk);

        const vSpread = 5.2 * growthScale;
        const clusters = [
            { x: 0, y: baseH + vSpread * 0.7, z: 0, r: vSpread * 0.7, mat: folSycamore1 },
            { x: vSpread * 0.4, y: baseH + vSpread * 0.45, z: vSpread * 0.2, r: vSpread * 0.55, mat: folSycamore2 },
            { x: -vSpread * 0.35, y: baseH + vSpread * 0.5, z: -vSpread * 0.3, r: vSpread * 0.5, mat: folSycamore1 },
            { x: 0, y: baseH + vSpread * 0.95, z: 0, r: vSpread * 0.38, mat: folSycamore2 }
        ];

        clusters.forEach(c => {
            const geo = new THREE.SphereGeometry(c.r, 14, 10);
            geo.scale(1.0, 1.15, 1.0);
            const m = new THREE.Mesh(geo, c.mat);
            m.position.set(c.x, c.y, c.z);
            m.castShadow = true; m.receiveShadow = true;
            group.add(m);
        });

        return group;
    }

    function createTexasPecanMesh(growthScale) {
        const group = new THREE.Group();
        const baseH = 4.2 * growthScale;
        const trunkGeo = new THREE.CylinderGeometry(0.28 * growthScale, 0.48 * growthScale, baseH, 8);
        const trunk = new THREE.Mesh(trunkGeo, trunkMatGrey);
        trunk.position.y = baseH / 2;
        trunk.castShadow = true; trunk.receiveShadow = true;
        group.add(trunk);

        const pSpread = 5.8 * growthScale;
        const crownGeo = new THREE.SphereGeometry(pSpread, 16, 12);
        crownGeo.scale(0.85, 1.3, 0.85);
        const crown = new THREE.Mesh(crownGeo, folPecan1);
        crown.position.set(0, baseH + pSpread * 0.75, 0);
        crown.castShadow = true; crown.receiveShadow = true;
        group.add(crown);

        const topGeo = new THREE.SphereGeometry(pSpread * 0.5, 12, 10);
        const top = new THREE.Mesh(topGeo, folPecan2);
        top.position.set(0, baseH + pSpread * 1.3, 0);
        top.castShadow = true; top.receiveShadow = true;
        group.add(top);

        return group;
    }

    function createLiveOakMesh(growthScale) {
        const group = new THREE.Group();
        const baseH = 2.0 * growthScale;
        const trunkGeo = new THREE.CylinderGeometry(0.4 * growthScale, 0.7 * growthScale, baseH, 8);
        const trunk = new THREE.Mesh(trunkGeo, trunkMatDark);
        trunk.position.y = baseH / 2;
        trunk.castShadow = true; trunk.receiveShadow = true;
        group.add(trunk);

        const spread = 7.2 * growthScale;
        const crownGeo = new THREE.SphereGeometry(spread, 16, 12);
        crownGeo.scale(1.45, 0.5, 1.45);
        const crown = new THREE.Mesh(crownGeo, folLiveOak1);
        crown.position.set(0, baseH + spread * 0.35, 0);
        crown.castShadow = true; crown.receiveShadow = true;
        group.add(crown);

        const sub1Geo = new THREE.SphereGeometry(spread * 0.45, 12, 8);
        sub1Geo.scale(1.3, 0.55, 1.3);
        const sub1 = new THREE.Mesh(sub1Geo, folLiveOak2);
        sub1.position.set(spread * 0.5, baseH + spread * 0.3, spread * 0.2);
        sub1.castShadow = true; sub1.receiveShadow = true;
        group.add(sub1);

        const sub2 = sub1.clone();
        sub2.position.set(-spread * 0.5, baseH + spread * 0.28, -spread * 0.2);
        group.add(sub2);

        return group;
    }

    function buildTreeArchetype(species, growthScale) {
        switch (species) {
            case 'Montezuma Bald Cypress':
                return createMontezumaCypressMesh(growthScale);
            case 'Mexican Sycamore':
                return createMexicanSycamoreMesh(growthScale);
            case 'Texas Pecan':
                return createTexasPecanMesh(growthScale);
            case 'Live Oak':
                return createLiveOakMesh(growthScale);
            case 'Bur Oak':
            default:
                return createBurOakMesh(growthScale);
        }
    }

    // =========================================================================
    // SECTION 1 INITIALIZATION: CAMPUS EXPLORER
    // =========================================================================

    function initExplorerScene() {
        sceneExplorer = new THREE.Scene();
        sceneExplorer.background = new THREE.Color(0xddebf5);
        sceneExplorer.fog = new THREE.FogExp2(0xddebf5, 0.0018);

        const width = containerExplorer.clientWidth || 800;
        const height = containerExplorer.clientHeight || 600;

        cameraExplorer = new THREE.PerspectiveCamera(42, width / height, 1, 1500);
        cameraExplorer.position.set(160, 140, 200);

        rendererExplorer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererExplorer.setSize(width, height);
        rendererExplorer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererExplorer.shadowMap.enabled = true;
        rendererExplorer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererExplorer.outputEncoding = THREE.sRGBEncoding;
        containerExplorer.appendChild(rendererExplorer.domElement);

        controlsExplorer = new THREE.OrbitControls(cameraExplorer, rendererExplorer.domElement);
        controlsExplorer.enableDamping = true;
        controlsExplorer.dampingFactor = 0.06;
        controlsExplorer.maxPolarAngle = Math.PI / 2 - 0.02;
        controlsExplorer.minDistance = 20;
        controlsExplorer.maxDistance = 550;
        controlsExplorer.target.set(0, 0, 0);

        ambientLightExplorer = new THREE.AmbientLight(0xe8f0f8, 0.5);
        sceneExplorer.add(ambientLightExplorer);

        sunLightExplorer = new THREE.DirectionalLight(0xfffaed, 1.25);
        sunLightExplorer.castShadow = true;
        sunLightExplorer.shadow.mapSize.width = 2048;
        sunLightExplorer.shadow.mapSize.height = 2048;
        sunLightExplorer.shadow.camera.near = 10;
        sunLightExplorer.shadow.camera.far = 600;
        const d = 220;
        sunLightExplorer.shadow.camera.left = -d;
        sunLightExplorer.shadow.camera.right = d;
        sunLightExplorer.shadow.camera.top = d;
        sunLightExplorer.shadow.camera.bottom = -d;
        sunLightExplorer.shadow.bias = -0.0005;
        sceneExplorer.add(sunLightExplorer);

        const groundGeo = new THREE.PlaneGeometry(800, 800, 16, 16);
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x98b87e, roughness: 0.95, metalness: 0.0 });
        groundMeshExplorer = new THREE.Mesh(groundGeo, groundMat);
        groundMeshExplorer.rotation.x = -Math.PI / 2;
        groundMeshExplorer.position.y = -0.1;
        groundMeshExplorer.receiveShadow = true;
        sceneExplorer.add(groundMeshExplorer);

        zonesGroupExplorer = new THREE.Group();
        buildingsGroupExplorer = new THREE.Group();
        treesGroupExplorer = new THREE.Group();
        sceneExplorer.add(zonesGroupExplorer);
        sceneExplorer.add(buildingsGroupExplorer);
        sceneExplorer.add(treesGroupExplorer);

        raycasterExplorer = new THREE.Raycaster();
        mouseExplorer = new THREE.Vector2();

        containerExplorer.addEventListener('mousemove', onExplorerMouseMove);
        containerExplorer.addEventListener('click', onExplorerClick);
    }

    function populateExplorer(zonesData, treesData) {
        while (zonesGroupExplorer.children.length > 0) zonesGroupExplorer.remove(zonesGroupExplorer.children[0]);
        while (buildingsGroupExplorer.children.length > 0) buildingsGroupExplorer.remove(buildingsGroupExplorer.children[0]);
        while (treesGroupExplorer.children.length > 0) treesGroupExplorer.remove(treesGroupExplorer.children[0]);
        treeObjectsExplorer = [];
        buildingMeshesExplorer = [];

        zonesData.features.forEach((feature, idx) => {
            if (feature.geometry.type !== 'Polygon') return;
            const coords = feature.geometry.coordinates[0];
            const category = feature.properties.category;
            const areaSqft = feature.properties.area_sqft || 0;

            const shape = new THREE.Shape();
            const firstPt = projectCoords(coords[0][0], coords[0][1]);
            shape.moveTo(firstPt.x, -firstPt.z);

            for (let i = 1; i < coords.length; i++) {
                const pt = projectCoords(coords[i][0], coords[i][1]);
                shape.lineTo(pt.x, -pt.z);
            }

            if (category === 'Rooftop') {
                const bldgGeo = new THREE.ExtrudeGeometry(shape, {
                    depth: buildingHeightMeters,
                    bevelEnabled: true,
                    bevelSegments: 2,
                    steps: 1,
                    bevelSize: 0.2,
                    bevelThickness: 0.2
                });
                const bldgMesh = new THREE.Mesh(bldgGeo, [matBldgWall, matBldgRoof]);
                bldgMesh.rotation.x = -Math.PI / 2;
                bldgMesh.position.y = 0;
                bldgMesh.castShadow = true;
                bldgMesh.receiveShadow = true;
                bldgMesh.userData = {
                    type: 'building',
                    id: feature.properties.id || `Bldg-${idx}`,
                    category: 'Campus Building',
                    areaSqft: areaSqft,
                    heightFt: Math.round(buildingHeightMeters * 3.28084)
                };
                buildingsGroupExplorer.add(bldgMesh);
                buildingMeshesExplorer.push(bldgMesh);

            } else if (category === 'Parking Lot') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matParking);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.08;
                mesh.receiveShadow = true;
                mesh.userData = { type: 'zone', category: 'Parking Lot / Bus Loop', areaSqft };
                zonesGroupExplorer.add(mesh);

            } else if (category === 'Open Field') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matOpenField);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.04;
                mesh.receiveShadow = true;
                mesh.userData = { type: 'zone', category: 'Open Field & Play Area', areaSqft };
                zonesGroupExplorer.add(mesh);

            } else if (category === 'Grass') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matCourtyard);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.05;
                mesh.receiveShadow = true;
                mesh.userData = { type: 'zone', category: 'Lawn / Courtyard', areaSqft };
                zonesGroupExplorer.add(mesh);

            } else if (category === 'Tree Enclosed Area') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matMicroforestZone);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.06;
                mesh.receiveShadow = true;
                mesh.userData = { type: 'zone', category: 'Microforest Canopy Zone', areaSqft };
                zonesGroupExplorer.add(mesh);

            } else if (category === 'Shaded Area') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matWalkway);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.12;
                mesh.receiveShadow = true;
                mesh.userData = { type: 'zone', category: 'Pedestrian Shaded Walkway', areaSqft };
                zonesGroupExplorer.add(mesh);
            }
        });

        const growthMultipliers = { 1: 0.35, 5: 0.70, 10: 1.0 };
        const scaleMult = growthMultipliers[currentGrowthStage] || 1.0;

        treesData.features.forEach((f, i) => {
            const [lon, lat] = f.geometry.coordinates;
            const pt = projectCoords(lon, lat);
            const species = f.properties.species || 'Bur Oak';
            const baseSpreadFt = f.properties.maxRadiusFeet || 45;
            const treeScale = (baseSpreadFt / 45) * scaleMult;

            const treeGroup = buildTreeArchetype(species, treeScale);
            treeGroup.position.set(pt.x, 0, pt.z);
            treeGroup.rotation.y = (i * 0.73) % (Math.PI * 2);

            treeGroup.userData = {
                type: 'tree',
                id: f.properties.id || (i + 1),
                species: species,
                plantYear: f.properties.plantYear || 2024,
                baseRadiusFt: f.properties.baseRadiusFeet || 3.5,
                maxRadiusFt: baseSpreadFt,
                currentSpreadFt: Math.round(baseSpreadFt * scaleMult),
                airVolCuFt: Math.round(Math.pow(baseSpreadFt * scaleMult, 3) * 0.52)
            };

            treeGroup.traverse(child => {
                if (child.isMesh) child.userData = treeGroup.userData;
            });

            treesGroupExplorer.add(treeGroup);
            treeObjectsExplorer.push({ group: treeGroup, data: treeGroup.userData });
        });

        updateHUDStats();
    }

    function updateExplorerSun(hourDecimal) {
        timeBadge.textContent = formatTime(hourDecimal);

        const solarProgress = (hourDecimal - 6) / 12;
        const solarAltitudeRad = Math.sin(solarProgress * Math.PI) * (Math.PI * 0.44);
        const solarAzimuthRad = (solarProgress - 0.5) * Math.PI * 1.35;

        const sunDistance = 320;
        const sunX = Math.sin(solarAzimuthRad) * sunDistance * Math.cos(solarAltitudeRad);
        const sunY = Math.max(Math.sin(solarAltitudeRad) * sunDistance, 12);
        const sunZ = Math.cos(solarAzimuthRad) * sunDistance * Math.cos(solarAltitudeRad) + 30;

        sunLightExplorer.position.set(sunX, sunY, sunZ);

        const sunIntensity = Math.max(Math.sin(solarAltitudeRad), 0.1);
        sunLightExplorer.intensity = 0.4 + (sunIntensity * 0.95);
        ambientLightExplorer.intensity = 0.25 + (sunIntensity * 0.35);

        const skyR = 0.85 + (sunIntensity * 0.05);
        const skyG = 0.90 + (sunIntensity * 0.05);
        const skyB = 0.98;
        sceneExplorer.background.setRGB(skyR, skyG, skyB);
        sceneExplorer.fog.color.setRGB(skyR, skyG, skyB);

        const expCurve = [72, 75, 82, 90, 97, 102, 105, 103, 98, 92, 85, 78, 74];
        const shdCurve = [72, 73, 77, 81, 85, 88, 90, 89, 87, 84, 80, 76, 73];

        const idx = Math.min(Math.max(Math.floor(hourDecimal - 6), 0), 12);
        const frac = (hourDecimal - 6) - idx;
        const nextIdx = Math.min(idx + 1, 12);

        const expT = Math.round(expCurve[idx] + frac * (expCurve[nextIdx] - expCurve[idx]));
        const shdT = Math.round(shdCurve[idx] + frac * (shdCurve[nextIdx] - shdCurve[idx]));
        const diff = expT - shdT;

        tempExposedEl.textContent = `${expT}°F`;
        tempShadedEl.textContent = `${shdT}°F`;
        tempDiffEl.textContent = `↓ ${diff}°F Active Campus Cooling`;

        const altDeg = Math.round((solarAltitudeRad * 180) / Math.PI);
        hudSolarAlt.textContent = `${altDeg}° (${hourDecimal < 12 ? 'Morning' : (hourDecimal === 12 ? 'Solar Noon' : 'Afternoon')})`;
    }

    function formatTime(decimalHour) {
        const hrs = Math.floor(decimalHour);
        const mins = Math.round((decimalHour - hrs) * 60);
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        const displayHr = hrs > 12 ? hrs - 12 : (hrs === 0 ? 12 : hrs);
        const displayMin = mins < 10 ? '0' + mins : mins;
        return `${displayHr}:${displayMin} ${ampm}`;
    }

    function updateHUDStats() {
        const growthMults = { 1: 0.12, 5: 0.48, 10: 1.0 };
        const area = Math.round(245000 * (growthMults[currentGrowthStage] || 1.0));
        hudCanopyArea.textContent = `~${area.toLocaleString()} sq ft`;
    }

    function updateGrowthStage(stage) {
        currentGrowthStage = stage;
        growthButtons.forEach(btn => {
            if (parseInt(btn.getAttribute('data-stage'), 10) === stage) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        const stageNames = { 1: 'Year 1 (2026 Sapling)', 5: 'Year 5 (2031 Established)', 10: 'Year 10 (2036 Mature Canopy)' };
        growthStageLabel.textContent = stageNames[stage];

        const mults = { 1: 0.35, 5: 0.70, 10: 1.0 };
        const scaleMult = mults[stage];

        treeObjectsExplorer.forEach(obj => {
            const baseSpread = obj.data.maxRadiusFt;
            const targetScale = (baseSpread / 45) * scaleMult;
            obj.group.scale.set(targetScale, targetScale, targetScale);
            obj.data.currentSpreadFt = Math.round(baseSpread * scaleMult);
            obj.data.airVolCuFt = Math.round(Math.pow(baseSpread * scaleMult, 3) * 0.52);
        });

        updateHUDStats();
    }

    function filterSpecies(speciesName) {
        selectedSpeciesFilter = speciesName;
        speciesItems.forEach(item => {
            if (item.getAttribute('data-species') === speciesName) item.classList.add('selected');
            else item.classList.remove('selected');
        });

        treeObjectsExplorer.forEach(obj => {
            if (!speciesName || obj.data.species === speciesName) {
                obj.group.visible = true;
                obj.group.traverse(child => {
                    if (child.isMesh && child.material) child.material.opacity = 1.0;
                });
            } else {
                obj.group.visible = true;
                obj.group.traverse(child => {
                    if (child.isMesh && child.material) {
                        child.material.transparent = true;
                        child.material.opacity = 0.15;
                    }
                });
            }
        });
    }

    function resetSpeciesFilter() {
        selectedSpeciesFilter = null;
        speciesItems.forEach(item => item.classList.remove('selected'));
        treeObjectsExplorer.forEach(obj => {
            obj.group.visible = true;
            obj.group.traverse(child => {
                if (child.isMesh && child.material) {
                    child.material.transparent = false;
                    child.material.opacity = 1.0;
                }
            });
        });
    }

    function setCameraPreset(presetName) {
        presetButtons.forEach(btn => {
            if (btn.getAttribute('data-preset') === presetName) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        let targetPos, targetLookAt;

        switch (presetName) {
            case 'courtyard':
                targetPos = new THREE.Vector3(10, 45, 30);
                targetLookAt = new THREE.Vector3(-10, 0, -20);
                break;
            case 'microforest':
                targetPos = new THREE.Vector3(-140, 35, 20);
                targetLookAt = new THREE.Vector3(-80, 5, 0);
                break;
            case 'dropoff':
                targetPos = new THREE.Vector3(80, 35, 120);
                targetLookAt = new THREE.Vector3(20, 0, 50);
                break;
            case 'topdown':
                targetPos = new THREE.Vector3(0, 320, 0.001);
                targetLookAt = new THREE.Vector3(0, 0, 0);
                break;
            case 'aerial':
            default:
                targetPos = new THREE.Vector3(160, 140, 200);
                targetLookAt = new THREE.Vector3(0, 0, 0);
                break;
        }

        const startPos = cameraExplorer.position.clone();
        const startTarget = controlsExplorer.target.clone();
        const duration = 800;
        const startTime = performance.now();

        function animateCamera(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            cameraExplorer.position.lerpVectors(startPos, targetPos, ease);
            controlsExplorer.target.lerpVectors(startTarget, targetLookAt, ease);
            controlsExplorer.update();

            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            }
        }
        requestAnimationFrame(animateCamera);
    }

    function onExplorerMouseMove(event) {
        const rect = containerExplorer.getBoundingClientRect();
        mouseExplorer.x = ((event.clientX - rect.left) / containerExplorer.clientWidth) * 2 - 1;
        mouseExplorer.y = -((event.clientY - rect.top) / containerExplorer.clientHeight) * 2 + 1;

        raycasterExplorer.setFromCamera(mouseExplorer, cameraExplorer);
        const intersects = raycasterExplorer.intersectObjects([...treesGroupExplorer.children, ...buildingsGroupExplorer.children], true);

        if (intersects.length > 0) {
            const topHit = intersects[0].object;
            const data = topHit.userData;
            if (data && data.type) {
                containerExplorer.style.cursor = 'pointer';
                return;
            }
        }
        containerExplorer.style.cursor = 'grab';
    }

    function onExplorerClick(event) {
        const rect = containerExplorer.getBoundingClientRect();
        mouseExplorer.x = ((event.clientX - rect.left) / containerExplorer.clientWidth) * 2 - 1;
        mouseExplorer.y = -((event.clientY - rect.top) / containerExplorer.clientHeight) * 2 + 1;

        raycasterExplorer.setFromCamera(mouseExplorer, cameraExplorer);
        const intersects = raycasterExplorer.intersectObjects([...treesGroupExplorer.children, ...buildingsGroupExplorer.children], true);

        if (intersects.length > 0) {
            const topHit = intersects[0].object;
            const data = topHit.userData;
            if (data && data.type === 'tree') {
                tooltipHeader.textContent = `🌳 Tree #${data.id} - ${data.species}`;
                tooltipBody.innerHTML = `
                    <div class="tooltip-stat-row"><span>Botanical Species:</span><span>${data.species}</span></div>
                    <div class="tooltip-stat-row"><span>Planting Year:</span><span>${data.plantYear}</span></div>
                    <div class="tooltip-stat-row"><span>Current Spread:</span><span>${data.currentSpreadFt} ft diameter</span></div>
                    <div class="tooltip-stat-row"><span>Mature Spread:</span><span>${data.maxRadiusFt} ft diameter</span></div>
                    <div class="tooltip-stat-row"><span>Cooled Air Shield:</span><span>~${data.airVolCuFt.toLocaleString()} cu ft</span></div>
                `;
                tooltip.classList.remove('hidden');
                return;
            } else if (data && data.type === 'building') {
                tooltipHeader.textContent = `🏢 Campus Structure`;
                tooltipBody.innerHTML = `
                    <div class="tooltip-stat-row"><span>Designation:</span><span>${data.category}</span></div>
                    <div class="tooltip-stat-row"><span>Roof Area:</span><span>${data.areaSqft.toLocaleString()} sq ft</span></div>
                    <div class="tooltip-stat-row"><span>Height:</span><span>${data.heightFt} ft (${(data.heightFt * 0.3048).toFixed(1)}m)</span></div>
                    <div class="tooltip-stat-row"><span>Solar Reflectance:</span><span>High Albedo White Membrane</span></div>
                `;
                tooltip.classList.remove('hidden');
                return;
            }
        }
        tooltip.classList.add('hidden');
    }

    // =========================================================================
    // SECTION 2 INITIALIZATION: COMPARATIVE DUAL SLIDER
    // =========================================================================

    function initComparisonScenes(zonesData, treesData) {
        if (!containerBaseline || !containerTarget || !comparisonWrapper) return;

        const width = comparisonWrapper.clientWidth || 1000;
        const height = comparisonWrapper.clientHeight || 600;

        // -------------------------------------------------------------
        // A. BASELINE SCENE (Extreme Heat Island + Red Flare Atmosphere)
        // -------------------------------------------------------------
        sceneBaseline = new THREE.Scene();
        sceneBaseline.background = new THREE.Color(0x240606);
        sceneBaseline.fog = new THREE.FogExp2(0x3a0909, 0.0022);

        cameraBaseline = new THREE.PerspectiveCamera(42, width / height, 1, 1500);
        cameraBaseline.position.set(160, 140, 200);

        rendererBaseline = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererBaseline.setSize(width, height);
        rendererBaseline.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererBaseline.shadowMap.enabled = true;
        rendererBaseline.shadowMap.type = THREE.PCFSoftShadowMap;
        containerBaseline.appendChild(rendererBaseline.domElement);

        const ambientHeat = new THREE.AmbientLight(0xff5722, 0.6);
        sceneBaseline.add(ambientHeat);

        const sunHeat = new THREE.DirectionalLight(0xff3d00, 1.8);
        sunHeat.position.set(100, 260, 80);
        sunHeat.castShadow = true;
        sunHeat.shadow.mapSize.width = 1024;
        sunHeat.shadow.mapSize.height = 1024;
        const hd = 220;
        sunHeat.shadow.camera.left = -hd;
        sunHeat.shadow.camera.right = hd;
        sunHeat.shadow.camera.top = hd;
        sunHeat.shadow.camera.bottom = -hd;
        sceneBaseline.add(sunHeat);

        const groundThermalGeo = new THREE.PlaneGeometry(800, 800, 16, 16);
        const groundThermalMat = new THREE.MeshStandardMaterial({
            color: 0x941b0c,
            emissive: 0x1f0402,
            roughness: 0.95
        });
        const groundThermalMesh = new THREE.Mesh(groundThermalGeo, groundThermalMat);
        groundThermalMesh.rotation.x = -Math.PI / 2;
        groundThermalMesh.position.y = -0.1;
        groundThermalMesh.receiveShadow = true;
        sceneBaseline.add(groundThermalMesh);

        // Populate Baseline Zones
        zonesData.features.forEach((feature, idx) => {
            if (feature.geometry.type !== 'Polygon') return;
            const coords = feature.geometry.coordinates[0];
            const category = feature.properties.category;

            const shape = new THREE.Shape();
            const firstPt = projectCoords(coords[0][0], coords[0][1]);
            shape.moveTo(firstPt.x, -firstPt.z);
            for (let i = 1; i < coords.length; i++) {
                const pt = projectCoords(coords[i][0], coords[i][1]);
                shape.lineTo(pt.x, -pt.z);
            }

            if (category === 'Rooftop') {
                const bldgGeo = new THREE.ExtrudeGeometry(shape, {
                    depth: 5.5,
                    bevelEnabled: true,
                    bevelSegments: 2,
                    steps: 1,
                    bevelSize: 0.2,
                    bevelThickness: 0.2
                });
                const bldgMesh = new THREE.Mesh(bldgGeo, [matThermalBldgWall, matThermalBldgRoof]);
                bldgMesh.rotation.x = -Math.PI / 2;
                bldgMesh.position.y = 0;
                bldgMesh.castShadow = true;
                bldgMesh.receiveShadow = true;
                sceneBaseline.add(bldgMesh);

            } else if (category === 'Parking Lot') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matThermalAsphalt);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.08;
                mesh.receiveShadow = true;
                sceneBaseline.add(mesh);

            } else if (category === 'Open Field' || category === 'Grass' || category === 'Tree Enclosed Area') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, category === 'Open Field' ? matThermalField : matThermalLawn);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.05;
                mesh.receiveShadow = true;
                sceneBaseline.add(mesh);
            }
        });

        // 2 sparse baseline saplings only
        const sparsePoints = [{ x: -50, z: -30 }, { x: 70, z: 40 }];
        sparsePoints.forEach(pt => {
            const smallOak = createBurOakMesh(0.25);
            smallOak.position.set(pt.x, 0, pt.z);
            sceneBaseline.add(smallOak);
        });

        createHeatwaveParticles(sceneBaseline);

        // -------------------------------------------------------------
        // B. TARGET SCENE (Cool Canopy Oasis)
        // -------------------------------------------------------------
        sceneTarget = new THREE.Scene();
        sceneTarget.background = new THREE.Color(0xdcecf8);
        sceneTarget.fog = new THREE.FogExp2(0xdcecf8, 0.0018);

        cameraTarget = new THREE.PerspectiveCamera(42, width / height, 1, 1500);
        cameraTarget.position.set(160, 140, 200);

        rendererTarget = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererTarget.setSize(width, height);
        rendererTarget.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererTarget.shadowMap.enabled = true;
        rendererTarget.shadowMap.type = THREE.PCFSoftShadowMap;
        containerTarget.appendChild(rendererTarget.domElement);

        // SINGLE MASTER ORBIT CONTROLLER BOUND TO COMPARISON WRAPPER
        controlsComparison = new THREE.OrbitControls(cameraTarget, comparisonWrapper);
        controlsComparison.enableDamping = true;
        controlsComparison.dampingFactor = 0.06;
        controlsComparison.maxPolarAngle = Math.PI / 2 - 0.02;
        controlsComparison.minDistance = 20;
        controlsComparison.maxDistance = 550;
        controlsComparison.target.set(0, 0, 0);

        const ambientCool = new THREE.AmbientLight(0xe8f0f8, 0.55);
        sceneTarget.add(ambientCool);

        const sunCool = new THREE.DirectionalLight(0xfffaed, 1.25);
        sunCool.position.set(100, 260, 80);
        sunCool.castShadow = true;
        sunCool.shadow.mapSize.width = 1024;
        sunCool.shadow.mapSize.height = 1024;
        const cd = 220;
        sunCool.shadow.camera.left = -cd;
        sunCool.shadow.camera.right = cd;
        sunCool.shadow.camera.top = cd;
        sunCool.shadow.camera.bottom = -cd;
        sceneTarget.add(sunCool);

        const groundTargetGeo = new THREE.PlaneGeometry(800, 800, 16, 16);
        const groundTargetMat = new THREE.MeshStandardMaterial({ color: 0x98b87e, roughness: 0.95 });
        const groundTargetMesh = new THREE.Mesh(groundTargetGeo, groundTargetMat);
        groundTargetMesh.rotation.x = -Math.PI / 2;
        groundTargetMesh.position.y = -0.1;
        groundTargetMesh.receiveShadow = true;
        sceneTarget.add(groundTargetMesh);

        // Populate Target Zones
        zonesData.features.forEach((feature, idx) => {
            if (feature.geometry.type !== 'Polygon') return;
            const coords = feature.geometry.coordinates[0];
            const category = feature.properties.category;

            const shape = new THREE.Shape();
            const firstPt = projectCoords(coords[0][0], coords[0][1]);
            shape.moveTo(firstPt.x, -firstPt.z);
            for (let i = 1; i < coords.length; i++) {
                const pt = projectCoords(coords[i][0], coords[i][1]);
                shape.lineTo(pt.x, -pt.z);
            }

            if (category === 'Rooftop') {
                const bldgGeo = new THREE.ExtrudeGeometry(shape, {
                    depth: 5.5,
                    bevelEnabled: true,
                    bevelSegments: 2,
                    steps: 1,
                    bevelSize: 0.2,
                    bevelThickness: 0.2
                });
                const bldgMesh = new THREE.Mesh(bldgGeo, [matBldgWall, matBldgRoof]);
                bldgMesh.rotation.x = -Math.PI / 2;
                bldgMesh.position.y = 0;
                bldgMesh.castShadow = true;
                bldgMesh.receiveShadow = true;
                sceneTarget.add(bldgMesh);

            } else if (category === 'Parking Lot') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matParking);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.08;
                mesh.receiveShadow = true;
                sceneTarget.add(mesh);

            } else if (category === 'Open Field') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matOpenField);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.04;
                mesh.receiveShadow = true;
                sceneTarget.add(mesh);

            } else if (category === 'Grass') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matCourtyard);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.05;
                mesh.receiveShadow = true;
                sceneTarget.add(mesh);

            } else if (category === 'Tree Enclosed Area') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matMicroforestZone);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.06;
                mesh.receiveShadow = true;
                sceneTarget.add(mesh);

            } else if (category === 'Shaded Area') {
                const flatGeo = new THREE.ShapeGeometry(shape);
                const mesh = new THREE.Mesh(flatGeo, matWalkway);
                mesh.rotation.x = -Math.PI / 2;
                mesh.position.y = 0.12;
                mesh.receiveShadow = true;
                sceneTarget.add(mesh);
            }
        });

        // Add 158 Year-10 Mature Trees to Target Scene
        treesData.features.forEach((f, i) => {
            const [lon, lat] = f.geometry.coordinates;
            const pt = projectCoords(lon, lat);
            const species = f.properties.species || 'Bur Oak';
            const baseSpreadFt = f.properties.maxRadiusFeet || 45;
            const treeScale = baseSpreadFt / 45;

            const treeGroup = buildTreeArchetype(species, treeScale);
            treeGroup.position.set(pt.x, 0, pt.z);
            treeGroup.rotation.y = (i * 0.73) % (Math.PI * 2);
            sceneTarget.add(treeGroup);
        });

        setupComparisonUI();
        onComparisonResize();
    }

    function createHeatwaveParticles(targetScene) {
        const particleCount = 1200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 320;
            positions[i * 3 + 1] = Math.random() * 25;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 240;
            velocities[i] = 0.08 + Math.random() * 0.12;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));

        const material = new THREE.PointsMaterial({
            color: 0xff3d00,
            size: 2.2,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending
        });

        heatwaveParticles = new THREE.Points(geometry, material);
        targetScene.add(heatwaveParticles);
    }

    function updateHeatwaveAnimation() {
        if (!heatwaveParticles) return;
        const positions = heatwaveParticles.geometry.attributes.position.array;
        const velocities = heatwaveParticles.geometry.attributes.velocity.array;
        const count = velocities.length;

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 1] += velocities[i];
            positions[i * 3] += Math.sin(Date.now() * 0.003 + i) * 0.06;

            if (positions[i * 3 + 1] > 28) {
                positions[i * 3 + 1] = 0.2;
            }
        }
        heatwaveParticles.geometry.attributes.position.needsUpdate = true;
    }

    function setupComparisonUI() {
        if (btnLivePlayWipe) {
            btnLivePlayWipe.addEventListener('click', () => {
                isLiveAutoPlaying = !isLiveAutoPlaying;
                if (isLiveAutoPlaying) {
                    btnLivePlayWipe.classList.add('playing');
                    btnLivePlayWipe.innerHTML = '🎬 ⏸ Pause Live Wipe & Orbit';
                    if (isSideBySide) {
                        setSplitMode('split');
                    }
                } else {
                    btnLivePlayWipe.classList.remove('playing');
                    btnLivePlayWipe.innerHTML = '🎬 ▶ Auto-Play Live Wipe & 360° Orbit';
                }
            });
        }

        splitWipeSlider.addEventListener('input', (e) => {
            if (isLiveAutoPlaying) {
                isLiveAutoPlaying = false;
                if (btnLivePlayWipe) {
                    btnLivePlayWipe.classList.remove('playing');
                    btnLivePlayWipe.innerHTML = '🎬 ▶ Auto-Play Live Wipe & 360° Orbit';
                }
            }
            const val = parseFloat(e.target.value);
            updateSplitCurtain(val);
        });

        btnModeBaseline.addEventListener('click', () => {
            if (isLiveAutoPlaying) {
                isLiveAutoPlaying = false;
                if (btnLivePlayWipe) {
                    btnLivePlayWipe.classList.remove('playing');
                    btnLivePlayWipe.innerHTML = '🎬 ▶ Auto-Play Live Wipe & 360° Orbit';
                }
            }
            setSplitMode('baseline');
        });

        btnModeSplit.addEventListener('click', () => {
            if (isLiveAutoPlaying) {
                isLiveAutoPlaying = false;
                if (btnLivePlayWipe) {
                    btnLivePlayWipe.classList.remove('playing');
                    btnLivePlayWipe.innerHTML = '🎬 ▶ Auto-Play Live Wipe & 360° Orbit';
                }
            }
            setSplitMode('split');
        });

        btnModeTarget.addEventListener('click', () => {
            if (isLiveAutoPlaying) {
                isLiveAutoPlaying = false;
                if (btnLivePlayWipe) {
                    btnLivePlayWipe.classList.remove('playing');
                    btnLivePlayWipe.innerHTML = '🎬 ▶ Auto-Play Live Wipe & 360° Orbit';
                }
            }
            setSplitMode('target');
        });

        btnModeSideBySide.addEventListener('click', () => {
            if (isLiveAutoPlaying) {
                isLiveAutoPlaying = false;
                if (btnLivePlayWipe) {
                    btnLivePlayWipe.classList.remove('playing');
                    btnLivePlayWipe.innerHTML = '🎬 ▶ Auto-Play Live Wipe & 360° Orbit';
                }
            }
            setSplitMode('sidebyside');
        });
    }

    function updateSplitCurtain(val) {
        if (isSideBySide) {
            comparisonWrapper.classList.remove('side-by-side-mode');
            isSideBySide = false;
        }

        layerTargetEl.style.clipPath = `polygon(${val}% 0, 100% 0, 100% 100%, ${val}% 100%)`;
        splitDividerLine.style.left = `${val}%`;
        splitDividerLine.style.display = 'block';

        if (val <= 5) {
            sliderStatusPill.textContent = '100% Cool Canopy Oasis';
        } else if (val >= 95) {
            sliderStatusPill.textContent = '100% Barren Heat Island';
        } else {
            sliderStatusPill.textContent = `${Math.round(val)}% Baseline / ${Math.round(100 - val)}% Target Split`;
        }
    }

    function setSplitMode(mode) {
        const buttons = [btnModeBaseline, btnModeSplit, btnModeTarget, btnModeSideBySide];
        buttons.forEach(b => b.classList.remove('active'));

        if (mode === 'baseline') {
            btnModeBaseline.classList.add('active');
            splitWipeSlider.value = 100;
            updateSplitCurtain(100);
        } else if (mode === 'split') {
            btnModeSplit.classList.add('active');
            splitWipeSlider.value = 50;
            updateSplitCurtain(50);
        } else if (mode === 'target') {
            btnModeTarget.classList.add('active');
            splitWipeSlider.value = 0;
            updateSplitCurtain(0);
        } else if (mode === 'sidebyside') {
            btnModeSideBySide.classList.add('active');
            isSideBySide = true;
            comparisonWrapper.classList.add('side-by-side-mode');
            layerTargetEl.style.clipPath = 'none';
            sliderStatusPill.textContent = 'Side-by-Side Synchronized Orbit';
            onComparisonResize();
        }
    }

    function onComparisonResize() {
        if (!comparisonWrapper) return;

        const w = comparisonWrapper.clientWidth || 1000;
        const h = comparisonWrapper.clientHeight || 600;

        const wSingle = isSideBySide ? w / 2 : w;

        if (rendererBaseline && cameraBaseline) {
            cameraBaseline.aspect = wSingle / h;
            cameraBaseline.updateProjectionMatrix();
            rendererBaseline.setSize(wSingle, h);
        }

        if (rendererTarget && cameraTarget) {
            cameraTarget.aspect = wSingle / h;
            cameraTarget.updateProjectionMatrix();
            rendererTarget.setSize(wSingle, h);
        }
    }

    // =========================================================================
    // UI EVENT LISTENERS & RESIZE
    // =========================================================================

    function setupExplorerUIEventListeners(zonesData, treesData) {
        sunSlider.addEventListener('input', (e) => {
            currentSunHour = parseFloat(e.target.value);
            updateExplorerSun(currentSunHour);
        });

        btnPlaySun.addEventListener('click', () => {
            if (isSunPlaying) {
                clearInterval(sunPlayTimer);
                isSunPlaying = false;
                btnPlaySun.textContent = '▶ Play Solar Orbit';
            } else {
                isSunPlaying = true;
                btnPlaySun.textContent = '⏸ Pause Orbit';
                sunPlayTimer = setInterval(() => {
                    currentSunHour += 0.1;
                    if (currentSunHour > 18) currentSunHour = 7;
                    sunSlider.value = currentSunHour;
                    updateExplorerSun(currentSunHour);
                }, 80);
            }
        });

        btnResetSun.addEventListener('click', () => {
            if (isSunPlaying) {
                clearInterval(sunPlayTimer);
                isSunPlaying = false;
                btnPlaySun.textContent = '▶ Play Solar Orbit';
            }
            currentSunHour = 12.0;
            sunSlider.value = 12.0;
            updateExplorerSun(12.0);
        });

        growthButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const stage = parseInt(btn.getAttribute('data-stage'), 10);
                updateGrowthStage(stage);
            });
        });

        speciesItems.forEach(item => {
            item.addEventListener('click', () => {
                const sp = item.getAttribute('data-species');
                filterSpecies(sp);
            });
        });

        btnShowAllSpecies.addEventListener('click', () => {
            resetSpeciesFilter();
        });

        buildingHeightSlider.addEventListener('input', (e) => {
            const hFt = parseInt(e.target.value, 10);
            buildingHeightMeters = hFt * 0.3048;
            bldgHeightValEl.textContent = `${hFt} ft (${buildingHeightMeters.toFixed(1)}m)`;
            populateExplorer(zonesData, treesData);
        });

        toggleShadows.addEventListener('change', (e) => {
            rendererExplorer.shadowMap.enabled = e.target.checked;
            sunLightExplorer.castShadow = e.target.checked;
        });

        toggleAutoRotate.addEventListener('change', (e) => {
            controlsExplorer.autoRotate = e.target.checked;
            controlsExplorer.autoRotateSpeed = 1.0;
        });

        toggleZones.addEventListener('change', (e) => {
            zonesGroupExplorer.visible = e.target.checked;
        });

        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.getAttribute('data-preset');
                setCameraPreset(preset);
            });
        });

        window.addEventListener('resize', () => {
            const width = containerExplorer.clientWidth;
            const height = containerExplorer.clientHeight;
            if (cameraExplorer && rendererExplorer) {
                cameraExplorer.aspect = width / height;
                cameraExplorer.updateProjectionMatrix();
                rendererExplorer.setSize(width, height);
            }
            onComparisonResize();
        });
    }

    // =========================================================================
    // UNIFIED ANIMATION LOOP
    // =========================================================================

    function animate() {
        requestAnimationFrame(animate);

        // Render Explorer
        if (controlsExplorer && rendererExplorer && sceneExplorer && cameraExplorer) {
            controlsExplorer.update();
            rendererExplorer.render(sceneExplorer, cameraExplorer);
        }

        // Update Particle Heat Shimmer
        updateHeatwaveAnimation();

        // Handle Comparison Orbit and Synchronized Cameras
        if (controlsComparison) {
            if (isLiveAutoPlaying) {
                const sweepVal = (Math.sin(performance.now() * 0.00075) * 0.5 + 0.5) * 100;
                splitWipeSlider.value = sweepVal.toFixed(1);
                updateSplitCurtain(sweepVal);

                controlsComparison.autoRotate = true;
                controlsComparison.autoRotateSpeed = 1.2;
            } else {
                controlsComparison.autoRotate = false;
            }

            controlsComparison.update();
        }

        // Synchronize CameraBaseline directly to CameraTarget (master)
        if (cameraBaseline && cameraTarget) {
            cameraBaseline.position.copy(cameraTarget.position);
            cameraBaseline.quaternion.copy(cameraTarget.quaternion);
            cameraBaseline.zoom = cameraTarget.zoom;
        }

        // Render Comparison Baseline Scene
        if (rendererBaseline && sceneBaseline && cameraBaseline) {
            rendererBaseline.render(sceneBaseline, cameraBaseline);
        }

        // Render Comparison Target Scene
        if (rendererTarget && sceneTarget && cameraTarget) {
            rendererTarget.render(sceneTarget, cameraTarget);
        }
    }

    // =========================================================================
    // BOOTSTRAPPER
    // =========================================================================

    async function init() {
        initExplorerScene();

        let zonesData = window.JASON_ZONES_DATA;
        let treesData = window.MOCK_TREES_DATA;

        if (!zonesData || !treesData) {
            try {
                const [zonesRes, treesRes] = await Promise.all([
                    fetch('data/jason_m_rivas_zones.json'),
                    fetch('data/mock_trees.json')
                ]);
                zonesData = await zonesRes.json();
                treesData = await treesRes.json();
            } catch (err) {
                console.warn('Fetch error:', err);
            }
        }

        if (zonesData && treesData) {
            populateExplorer(zonesData, treesData);
            setupExplorerUIEventListeners(zonesData, treesData);

            initComparisonScenes(zonesData, treesData);

            updateExplorerSun(currentSunHour);
            animate();
        } else {
            console.error('Unable to load campus GIS or tree dataset.');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
