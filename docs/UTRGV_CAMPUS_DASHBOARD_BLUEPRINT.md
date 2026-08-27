# 🌳 UTRGV Green Campus Explorer & Shade Dashboard — Project Blueprint

> **Status:** 📌 Bookmarked / Queued for Post-August Sprints  
> **Initiative:** UTRGV Campus Tree & Shade Expansion  
> **Stakeholders:** UTRGV Agroecology (Dr. Alexis Racelis), TTFS Cool Schools, UTRGV Grounds & Facilities  

---

## 1. Executive Summary & Vision

The **UTRGV Green Campus Explorer** is an interactive, split-screen geospatial and environmental impact dashboard dedicated to the UTRGV Edinburg and Brownsville campuses. Leveraging existing campus tree inventory data, the dashboard visualizes localized shade footprints, micro-climate cooling benefits (°F), carbon sequestration, and stormwater diversion.

It bridges academic research from Dr. Racelis's Agroecology lab with student life, campus facilities management, and real-time field testing.

---

## 2. Core Dashboard Components

```
+-----------------------------------------------------------------------------------+
|  UTRGV Green Campus Explorer & Living Tree Legacy                                 |
+------------------------------------------+----------------------------------------+
|                                          |  Selected Tree / Quad Factsheet        |
|   Interactive 2D/3D UTRGV Campus Map     |  - Common & Scientific Name            |
|   - Satellite & Campus Footprint Layers  |  - DBH, Height, Canopy Spread (sq ft)  |
|   - Tree Point Clusters & Shade Rings    |  - Microclimate Cooling Index (-°F)    |
|   - Quad / Parking Lot Heat Overlays     |  - Annual Eco-Savings ($ / yr)         |
|   - Time Machine Growth (5 & 10-yr)      |  - Lab / Student Research Notes        |
|                                          +----------------------------------------+
|                                          |  Campus Environmental Ledger           |
|                                          |  - Total Canopy %                      |
|                                          |  - Carbon Sequestered (tons)           |
|                                          |  - Stormwater Diverted (gal/yr)        |
+------------------------------------------+----------------------------------------+
|   💬 Quick Campus Feedback / Report Tree Observation (30-Sec No-PII Form)         |
+-----------------------------------------------------------------------------------+
```

### Component Details
1. **Interactive Campus Map (`utrgv_campus.html`)**
   - Centered on UTRGV campus coordinates (Edinburg Quad / Student Union / Science buildings).
   - High-contrast shade polygons showing tree canopy radius and summer shade projection.
   - 5-year and 10-year growth simulation slider ("Time Machine").
2. **Eco-Ledger & Living Tree Legacy**
   - i-Tree Eco engine calculations adapted for regional Rio Grande Valley species (Live Oak, Honey Mesquite, Texas Ebony, Anacua, Sabal Palm).
   - "Living Tree Legacy" feature: Allows student cohorts or labs to tag trees, record phenology observations, and view chronological growth logs.
3. **No-PII Campus Feedback & Field Survey Micro-Widget**
   - Embedded single-click rating & suggestion box compliant with FERPA/COPPA and UTRGV AI policies.

---

## 3. Implementation Roadmap (When Resumed)

| Phase | Tasks | Deliverables |
| :--- | :--- | :--- |
| **Phase 1: Ingestion & Geometry** | • Ingest UTRGV tree dataset into `data/utrgv_trees.json`<br>• Define campus boundary & building footprint GeoJSON | `data/utrgv_trees.json`<br>`data/utrgv_campus_zones.json` |
| **Phase 2: UI & Map Scaffolding** | • Scaffold `utrgv_campus.html`, `utrgv_campus.js`, `utrgv_campus.css`<br>• Connect D3/ArcGIS/Leaflet basemap centered on campus | Dedicated standalone portal page |
| **Phase 3: Eco & Heat Engine** | • Hook into `itree_engine.js` for real-time carbon, runoff, and cooling estimates | Live computed factsheets per tree |
| **Phase 4: Field Testing Rollout** | • Deploy Tier 1 QR code micro-survey for student foot traffic<br>• Schedule Tier 2 structured focus groups with Agroecology researchers & facilities | Field feedback summary report |

---

## 4. Governance & Privacy Checklist

- [x] **Zero PII:** No student or user personal information requested or stored.
- [x] **Handoff Friendly:** 100% client-side static modular architecture (HTML5/CSS3/ES6).
- [x] **UTRGV AI Compliance:** All data models and outputs validated with human-in-the-loop oversight.
