/**
 * Global application configuration object for the TTFS Cool Schools Dashboard.
 * Stores map settings, ArcGIS layer URLs, district boundaries, baseline metrics,
 * and tree growth parameters used by various dashboard models.
 * @type {Object}
 */
window.APP_CONFIG = {
  map: {
    basemap: "hybrid", // Using hybrid to see street labels over satellite
    center: [-98.0706, 26.1675], // Exact location of J.W. Caceres & M. Rivas Academy
    zoom: 17,
    minZoom: 16,
    maxZoom: 19
  },
  districts: [
    {
      id: "mercedes",
      name: "Mercedes CSID",
      where: "LEA_NAME LIKE 'Mercedes%'"
    },
    {
      id: "donna",
      name: "Donna ISD",
      where: "LEA_NAME = 'Donna ISD'"
    }
  ],
  layers: {
    districts: {
      type: "feature",
      title: "School Districts",
      url: "https://nces.ed.gov/opengis/rest/services/School_District_Boundaries/EDGE_ADMINDATA_SCHOOLDISTRICTS_SY2223/MapServer/1"
    },
    schools: {
      type: "feature",
      title: "Elementary Campuses",
      url: "https://services1.arcgis.com/Ua5sjt3LWTPigjyD/ArcGIS/rest/services/School_Characteristics_Current/FeatureServer/0"
    },
    canopy: {
      type: "imagery",
      title: "Tree Canopy",
      url: ""
    },
    albedo: {
      type: "imagery",
      title: "Albedo",
      url: ""
    },
    lstSummer: {
      type: "imagery",
      title: "Summer Land Surface Temperature",
      url: ""
    },
    lstSpring: {
      type: "imagery",
      title: "Spring Land Surface Temperature",
      url: ""
    },
    lstFall: {
      type: "imagery",
      title: "Fall Land Surface Temperature",
      url: ""
    },
    lstWinter: {
      type: "imagery",
      title: "Winter Land Surface Temperature",
      url: ""
    },
    schoolAreas: {
      type: "feature",
      title: "School Areas",
      url: "data/bowie_grid.geojson",
      mockData: [
        { id: "area_1", name: "Zone A - Front Entrance", surfaceType: "asphalt" },
        { id: "area_2", name: "Zone B - Courtyard", surfaceType: "grass" },
        { id: "area_3", name: "Zone C - Playground", surfaceType: "canopy" }
      ]
    },
    treeObservations: {
      type: "feature",
      title: "Tree Observations",
      url: "",
      mockData: []
    },
    rgv: {
      reference: {
        title: "Reference",
        layers: [
          {
            title: "City Limits Reference",
            url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/RGV_Communities/FeatureServer/0"
          },
          {
            title: "City Limits",
            url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/RGV_Communities/FeatureServer/0"
          },
          {
            title: "Schools/Medical Reference",
            url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/RGV_Schools_Medical/FeatureServer/0"
          },
          {
            title: "Rights-of-Way (ROW) Reference",
            url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/RGV_RightOfWay/FeatureServer/0"
          }
        ]
      },
      residential: {
        title: "Residential Areas",
        layers: [
          {
            title: "Residential Areas Over 500 Meters of a Park or Greenspace",
            url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/RGV_ResidentialAreas_Over500m_FromParks/FeatureServer/0"
          },
          {
            title: "Residential Areas Within 500 Meters of a Park or Greenspace",
            url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/RGV_ResidentialAreas_Within500m_FromParks/FeatureServer/0"
          },
          {
            title: "Parks and Greenspaces",
            url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/Protected_Areas_RGV/FeatureServer/0"
          }
        ]
      },
      standalone: [
        {
          title: "Rights-of-Way (ROW)",
          url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/RGV_RightOfWay/FeatureServer/0",
          visible: true
        },
        {
          title: "Schools/Medical",
          url: "https://services5.arcgis.com/ELI1iJkCzTIagHkp/arcgis/rest/services/RGV_Schools_Medical/FeatureServer/0",
          visible: false
        }
      ]
    }
  },
  fields: {
    districtName: "LEA_NAME",
    schoolsDistrict: "LEA_NAME",
    schoolsLevel: "SCHOOL_LEVEL",
    schoolsType: "SCHOOL_TYPE_TEXT",
    schoolsName: "SCH_NAME",
    observationSchool: "school_id",
    observationCount: "trees_count",
    observationObserver: "observer",
    observationDate: "obs_date",
    observationMethod: "method",
    observationNotes: "notes",
    areaSchool: "school_id",
    areaName: "school_name"
  },
  metrics: {
    mercedes: {
      canopyPct: 5,
      albedoPct: 45,
      lst: {
        summer: 109,
        spring: 102,
        fall: 92,
        winter: 80
      }
    },
    donna: {
      canopyPct: 7,
      albedoPct: 40,
      lst: {
        summer: 108,
        spring: 101,
        fall: 91,
        winter: 79
      }
    }
  },
  treeSpecies: {
    "Bur Oak": {
      growthRateFeetPerYear: 1.05,
      matureRadiusFeet: 20.5,
      soilTolerance: "Moderate (Deep taproot; slowed by caliche hardpan)",
      compactionPenalty: 0.62,
      color: [34, 139, 34, 0.65]
    },
    "Live Oak": {
      growthRateFeetPerYear: 1.15,
      matureRadiusFeet: 22.0,
      soilTolerance: "High (Strong lateral roots; adapts to semi-urban fill)",
      compactionPenalty: 0.72,
      color: [0, 100, 0, 0.65]
    },
    "Montezuma Bald Cypress": {
      growthRateFeetPerYear: 1.20,
      matureRadiusFeet: 21.0,
      soilTolerance: "Moderate-High (Fast grower if irrigated; sensitive to bone-dry fill)",
      compactionPenalty: 0.65,
      color: [46, 125, 50, 0.65]
    },
    "Texas Pecan": {
      growthRateFeetPerYear: 0.95,
      matureRadiusFeet: 20.0,
      soilTolerance: "Low-Moderate (Requires deep alluvial soil; stunted by construction fill)",
      compactionPenalty: 0.52,
      color: [107, 142, 35, 0.65]
    },
    "Mexican Sycamore": {
      growthRateFeetPerYear: 1.20,
      matureRadiusFeet: 19.5,
      soilTolerance: "Moderate (Rapid foliage; leaf scorch in unamended hot asphalt zones)",
      compactionPenalty: 0.58,
      color: [154, 205, 50, 0.65]
    },
    "Cedar Elm": {
      growthRateFeetPerYear: 1.05,
      matureRadiusFeet: 19.5,
      soilTolerance: "Very High (Tolerates heavy clay, compacted alkaline fill & drought)",
      compactionPenalty: 0.78,
      color: [67, 160, 71, 0.65]
    },
    "Texas Ebony": {
      growthRateFeetPerYear: 0.85,
      matureRadiusFeet: 16.0,
      soilTolerance: "Extreme (Nitrogen-fixing RGV native; thrives in dry caliche/imported fill)",
      compactionPenalty: 0.85,
      color: [27, 94, 32, 0.70]
    },
    "Honey Mesquite": {
      growthRateFeetPerYear: 1.10,
      matureRadiusFeet: 18.5,
      soilTolerance: "Extreme (Deep root penetrator; breaks compacted schoolyard sub-base)",
      compactionPenalty: 0.88,
      color: [124, 179, 66, 0.65]
    },
    "Anacua": {
      growthRateFeetPerYear: 0.95,
      matureRadiusFeet: 17.5,
      soilTolerance: "High (Drought-hardy RGV native understory/canopy stabilizer)",
      compactionPenalty: 0.80,
      color: [56, 142, 60, 0.65]
    }
  },
  soilRegimes: {
    unamended_compacted: {
      id: "unamended_compacted",
      label: "Unamended Schoolyard Soil (Compacted Construction Fill)",
      shortLabel: "Compacted Construction Soil (Unamended)",
      growthMultiplier: 0.52,
      maxRadiusMultiplier: 0.72,
      establishmentLagYears: 3.0,
      survivalRate: 0.88,
      bulkDensityGcm3: "1.72 g/cm³ (Root-Restricting Hardpan)",
      organicMatterPct: "0.6% (Biologically Depleted)",
      summary: "Models typical semi-urban school grounds with stratified imported construction fill, mower/foot-traffic compaction (>1.7 g/cm³), 3-year transplant shock lag, high radiant asphalt heat, and 12% sapling mortality—stalling 2040 canopy at ~16.4%."
    },
    semi_urban_realistic: {
      id: "semi_urban_realistic",
      label: "Standard Semi-Urban Schoolyard Growth Model",
      shortLabel: "Realistic Schoolyard Growth",
      growthMultiplier: 0.64,
      maxRadiusMultiplier: 0.84,
      establishmentLagYears: 2.0,
      survivalRate: 0.94,
      bulkDensityGcm3: "1.48 g/cm³",
      organicMatterPct: "1.8%",
      summary: "Realistic 10–15 year growth projection calibrated for South Texas schoolyards."
    },
    agroecology_remediated: {
      id: "agroecology_remediated",
      label: "UTRGV Agroecology Soil Remediation (Subsoiling + Mulch/Bio-Amendment)",
      shortLabel: "Agroecology Remediated Soil (Optimal)",
      growthMultiplier: 0.93,
      maxRadiusMultiplier: 1.0,
      establishmentLagYears: 0.5,
      survivalRate: 0.98,
      bulkDensityGcm3: "1.28 g/cm³ (Decompacted Rhizosphere)",
      organicMatterPct: "4.2% (Active Mycorrhizal Mulch Ring)",
      summary: "Applies UTRGV Agroecology intervention: deep ripping of imported construction hardpan layers, wide native woodchip mulch rings to cool soil by 12°F, and mycorrhizal inoculation—surpassing the 30.0% canopy target ahead of 2040."
    }
  },
  swipe: {
    leading: "canopy",
    trailing: "lstSummer"
  }
};

// Automatically purge legacy v2.0.0 Service Worker caches so pages always render fresh content
(function purgeLegacyCaches() {
  try {
    const PURGE_FLAG = "ttfs_sw_cache_purged_20261029_v3";
    if ("caches" in window && !sessionStorage.getItem(PURGE_FLAG)) {
      caches.keys().then((keys) => {
        const legacyKeys = keys.filter((k) => !k.includes("v3.0.0-20261029"));
        if (legacyKeys.length > 0) {
          Promise.all(legacyKeys.map((k) => caches.delete(k))).then(() => {
            sessionStorage.setItem(PURGE_FLAG, "1");
          });
        } else {
          sessionStorage.setItem(PURGE_FLAG, "1");
        }
      }).catch(() => {});
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.update().catch(() => {}));
      }).catch(() => {});
    }
  } catch (e) {
    // Ignore storage/SW security restrictions in private browsing
  }
})();

