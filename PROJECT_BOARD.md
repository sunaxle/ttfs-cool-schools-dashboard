[[work]]

# 📋 TTFS UTRGV Project - Mission Control Board

> **Last Updated:** June 2026
> **Project Phase:** Dashboard V1 Production-Ready Deployment & V2 Planning

## 🚀 Features to Come (Backlog)
- [ ] **Production Deployment CI/CD Pipeline:** Configure an automated CI/CD pipeline (e.g., GitHub Actions) to securely deploy the production-ready static assets.
- [ ] **Live API Transition & Data Hydration:** Begin replacing mock data architecture with live API fetches (sensor data, iNaturalist) for real-time visualization.
- [ ] **Asset Bundling & Minification:** Implement a build tool (e.g., Vite, Webpack) to bundle, tree-shake, and minify the newly separated 49 `.js` and `.css` files for production.
- [ ] **Offline Caching (Service Worker):** Add a Service Worker to cache the static assets and preconnected CDN libraries (ArcGIS, D3.js, Three.js) for offline field use.
- [ ] **End-to-End Testing:** Implement a modern E2E testing framework (like Playwright or Cypress) to replace the deprecated Puppeteer tests and ensure the 49 interactive pages remain stable.
- [ ] **Data Export Feature:** Allow users to export CSV data directly from the charts.
- [ ] **Mobile Responsiveness:** Audit the newly extracted CSS files to ensure all maps and sidebars collapse gracefully on mobile devices.
- [ ] **Model Testing Framework:** Implement unit tests (e.g., using Jest) for the complex physics and simulation logic that was recently modularized.
- [ ] **Ingestion Validation:** Create a data validation service for user-uploaded CSV/GeoJSON files.
- [ ] **Global Error Handling Service:** Build a centralized logging utility to capture and route the newly standardized `console.warn` occurrences for production observability.
- [ ] **Data Model Integration:** Begin mapping the UI frontend state values directly into the Dashboard V1 backend schema.
- [x] **Feature Concept 1 - "Tree Diary & Living Tree Legacy":** Delivered kid-friendly photo/caliper measurement log and 10-year cohort class naming wall (`tree_diary.html`, `tree_diary.js`, `tree_diary.css`).
- [x] **Feature Concept 2 - "Campus Care Quests":** Shipped gamified maintenance checklists using farmer/elementary talk ("Is the dirt dry like a cracker?") with campus badge unlocks (`campus_quests.html`).
- [x] **Feature Concept 3 - "Habitat Spotter":** Deployed elementary wildlife & pollinator observation logger with zero-PII campus-level aggregations (`biodiversity_analog_concept.html`).
- [x] **Feature Concept 4 - "Time Machine" 10-Year Canopy Slider:** Built interactive decade shade scrubber modeling longitudinal canopy growth, stormwater interception, and cooling (`time_machine.html`).
- [x] **Feature Concept 5 - "Living Tree Legacy (Cohort Naming Timeline)":** Automated cohort naming history morphing tree tag numbers with student class names across decade lifecycle (`tree_diary.html`).
- [x] **TTFS Curriculum Feature 6 - "Tree Stewardship & Health Tracking Portal":** Delivered dual-mode portal (`tree_stewardship.html`, `.css`, `.js`) with 100% faithful TTFS lesson module, 8.5" × 11" printable field log, and digital health/moisture/DBH logger.
- [x] **TTFS Curriculum Feature 7 - "Birding & Biodiversity Field Lab":** Delivered dual-mode portal (`birding_biodiversity.html`, `.css`, `.js`) with 100% faithful TTFS observation lesson, "Parts of a Cowboy" anatomy explorer, "Chachalaca & Friends" Web Audio guide, and printable tally sheet.


## 🎯 Active Sprint: October 2026 TTFS Contract Deliverables (Month 5 — $6,272.00)
- [ ] **1. Dashboard v2 Near-Finalization:** Ingestion workflows, styling documentation, and PWA offline field sync validation.
- [ ] **2. Final Baseline Cartographic Atlas (Deliverable A Locking):** High-resolution composite GIS map plates across Donna & Mercedes ISDs.
- [ ] **3. 2027 Reporting Workplan & Governance Memo:** Review cycles, stakeholder roles, and evaluation schedules.

## 📌 Campus Expansion (UTRGV)
- [x] **UTRGV Green Campus Explorer & Shade Dashboard:** Shipped standalone interactive geospatial campus explorer (`utrgv_campus.html`, `utrgv_campus.js`, `utrgv_campus.css`) with Edinburg/Brownsville tree inventory, solar shade buffers, micro-climate cooling models, and student/faculty QR feedback loop.

## ✅ Recently Completed (Month 4 Deliverables — $7,022.00 | Cumulative $91,063.00 / 57.8%)
- [x] **Month 4 Progress Report Package ($7,022.00):** Compiled formal `Month_4_Progress_Report.md` documenting milestone completion across Deliverable A ($3,390.00) and Deliverable C ($3,632.00).
- [x] **Month 4 Milestone Invoice #4 Package ($7,022.00):** Packaged formal billing invoice bringing cumulative billing to **$91,063.00 (57.8%)** under Texas A&M Forest Service Grant #25065 (`invoices/Invoice_004_September_2026_TTFS_UTRGV.html` and `.md`).
- [x] **Baseline Refinements & Cartographic Figure Conventions:** Standardized uniform thermal/NDVI color ramps, scale bars, true north indicators, and bilingual English/Spanish captioning conventions (`docs/Modeling_Visuals_Package.md`).
- [x] **Regional 30% Canopy Baseline Cross-Examination:** Evaluated the $1,314\text{ sq ft}$ crown constant vs. regional species and quantified the net +661 tree deficit across 13 campuses / 8.45M sq ft (`docs/CANOPY_CONSTANT_1314_ANALYSIS.md`, `docs/REGIONAL_CANOPY_30_PERCENT_STUDY_MASTER.md`).
- [x] **Research Lineage & Provenance Ledger Integration:** Synthesized PEIMS attendance metrics, NWS heat indices, and TEA TEC §25.081 waiver rules (`docs/research_provenance_and_lineage.md`).
- [x] **Dashboard v2 Early Components & Usability Pass:** Deployed performance optimizations across 49 static pages, documented PEIMS granularity/sensor calibration limits, and refined RBAC/Habitat Spotter prototype modules (`docs/Dashboard_v2_Planning_Memo.md`).

## ✅ Prior Completed (Month 3 Deliverables — $15,514.00)
- [x] **Buzz Attack Swarm Verification (100% / 26 Nodes Passed):** Full DAG state graph locked in `matrices/master_matrix.json`, validated via `00-system/validator_gate.py` with zero-token mechanical gates.
- [x] **Master Unified Executive Portal Hub v5:** Deployed complete executive portal hub (`portals/v5/index.html`) connecting all 49+ tools, planners, GIS zoning, and curriculum modules with live search and category filtering.
- [x] **Publication-Grade Print Media Package (8.5" × 11"):** Compiled Donna ISD Cool Schools Executive Dossier, Educator Outdoor Lab Field Guide, and Campus Shade Satisfaction Kiosk Flyer (`print_media/*.html`).
- [x] **Month 3 Milestone Invoice #3 Package ($15,514.00):** Packaged formal billing invoice bringing cumulative billing to **$84,041.00 (53.3%)** under Texas A&M Forest Service Grant #25065 (`invoices/Invoice_003_August_2026_TTFS_UTRGV.html` and `.md`).
- [x] **Month 3 Progress Report Package:** Compiled formal `Month_3_Progress_Report.docx` and `.md` documenting milestone completion across Deliverables A, B, and C.
- [x] **Modeling Visuals & Figure Package:** Assembled diurnal heat surface profiles and 5/10-yr longitudinal canopy growth projections (`docs/Modeling_Visuals_Package.md` and `.docx`).
- [x] **Training Materials v0.5 & TA Log Structure:** Finalized educator slide deck (`docs/donna_isd_presentation_slides.md`) and auditable TA log schema (`docs/Technical_Assistance_Log_v0.5.md`).
- [x] **Dashboard v2 Planning Memo:** Synthesized stakeholder feedback, offline field caching roadmap, and new module specifications (`docs/Dashboard_v2_Planning_Memo.md`).


## 🏗️ General Backlog

## ✅ Recently Completed
- [x] **Schoolyard Microforest & Garden Planner (`schoolyard_planner.html`):** Shipped full interactive 2D/3D campus planting designer, real schoolyard photo-overlay tool, 12-month seasonal bloom & pollinator timeline, 10-year growth time machine, and printable TEKS classroom blueprint generator with 16+ RGV native species.
- [x] **Phase 1 Production Readiness (Iter 30):** Holistic QA pass confirmed strict IIFE isolations, modular architecture, and zero inline scripts. Codebase officially production-ready!
- [x] **PWA & Strict HTML Validation (Iter 29):** Added PWA apple-touch-icons and enforced strict `type="button"` attributes across all interactive components to prevent form reloads.
- [x] **Whitespace Minimization (Iter 28):** Stripped trailing whitespace and empty lines globally to reduce byte payload size without bundler overhead.
- [x] **CSS Variable Integrity (Iter 27):** Patched missing global UI variables (`--primary`, `--green-highlight`) to restore and enforce strict UTRGV branding.
- [x] **Asset Lazy Loading (Iter 26):** Implemented native `loading="lazy"` on multi-megabyte images and injected font preconnecting to prevent render-blocking.
- [x] **Network Performance Optimization:** Injected `<link rel="preconnect">` tags for core CDNs (ArcGIS, D3.js, Chart.js, Three.js).
- [x] **SEO & Metadata Standardization:** Standardized `<meta name="description">` and `<meta name="author">` tags across all 49 static HTML pages.
- [x] **Accessibility & ARIA Pass:** Validated HTML tags, resolved duplicate IDs, added `role="button"` and `tabindex="0"`.
- [x] **Scope Hygiene & CSS Utility Extraction:** Wrapped data modules in IIFEs to prevent scope pollution and extracted common UI inline styles.
- [x] **Frontend Architecture Modularization:** 100% extraction of embedded `<style>` and `<script>` blocks into dedicated `.css` and `.js` files.

---

## 🤖 Automated Project Manager Notes
*This board is automatically updated by the Project Manager Subagent based on the `optimizer_log.md` and the current `milestones.js` tracker.*
