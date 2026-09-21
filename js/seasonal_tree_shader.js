/**
 * Three.js 3D Montezuma Cypress Seasonal Shader & Solar Shadow Calculator
 * TTFS × UTRGV Project Cool Schools
 * Dr. Alexis Racelis Agroecology Physics Engine
 */

(function (window) {
  'use strict';

  const RGV_LATITUDE = 26.18; // Donna / Edinburg, TX

  const SEASONAL_PALETTES = {
    spring: {
      name: 'Spring Flush (March–May)',
      foliageColor: 0x76c893,
      needleDensity: 0.85,
      coolingIndexF: -14.2,
      description: 'Bright lime-green new growth with high transpiration and fresh vegetative shoot elongation.'
    },
    summer: {
      name: 'Peak Summer Canopy (June–August)',
      foliageColor: 0x1b4d3e,
      needleDensity: 1.00,
      coolingIndexF: -42.6,
      description: 'Maximum evergreen needle density producing profound thermal shade protection during heatwave peaks.'
    },
    fall: {
      name: 'Autumn Foliar Shift (September–November)',
      foliageColor: 0xd97706,
      needleDensity: 0.90,
      coolingIndexF: -28.4,
      description: 'Copper-amber foliar transition; high pollinator attraction and seed cone development.'
    },
    winter: {
      name: 'Winter Dormancy (December–February)',
      foliageColor: 0x78350f,
      needleDensity: 0.65,
      coolingIndexF: -8.5,
      description: 'Semi-deciduous dormancy allowing winter sunlight penetration to warm courtyard grounds.'
    }
  };

  // Solar Vector Calculator for Rio Grande Valley
  function calculateSolarPosition(hourOfDay) {
    // Hour: 8 (8 AM) to 18 (6 PM)
    const hour = Math.max(8, Math.min(18, hourOfDay));
    const solarTimeFraction = (hour - 6) / 12; // 0 (sunrise) to 1 (sunset)
    
    // Solar Elevation: 0° at horizon, up to ~85° at solar noon (1:00 PM CST)
    const solarElevationDeg = Math.sin(solarTimeFraction * Math.PI) * 82;
    const solarElevationRad = (solarElevationDeg * Math.PI) / 180;

    // Azimuth: East (90°) in morning -> South (180°) at noon -> West (270°) in evening
    const azimuthDeg = 90 + solarTimeFraction * 180;
    const azimuthRad = (azimuthDeg * Math.PI) / 180;

    // 3D Directional Coordinates
    const distance = 100;
    const x = distance * Math.cos(solarElevationRad) * Math.sin(azimuthRad);
    const y = distance * Math.sin(solarElevationRad);
    const z = distance * Math.cos(solarElevationRad) * Math.cos(azimuthRad);

    return {
      hour: hour,
      elevationDeg: Math.round(solarElevationDeg),
      azimuthDeg: Math.round(azimuthDeg),
      vector: { x, y, z },
      shadowLengthMultiplier: Math.max(0.2, 1 / Math.tan(Math.max(0.1, solarElevationRad)))
    };
  }

  // Apply Seasonal Color to Three.js Mesh or Canvas
  function applySeasonToMesh(seasonKey, mesh) {
    const pal = SEASONAL_PALETTES[seasonKey] || SEASONAL_PALETTES.summer;
    if (mesh && mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(mat => {
          if (mat.name === 'foliage' || mat.name === 'canopy') {
            mat.color.setHex(pal.foliageColor);
          }
        });
      } else {
        mesh.material.color.setHex(pal.foliageColor);
      }
    }
    return pal;
  }

  window.CoolSchools3D = {
    palettes: SEASONAL_PALETTES,
    calculateSolarPosition: calculateSolarPosition,
    applySeason: applySeasonToMesh
  };
})(window);
