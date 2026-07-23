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
- [ ] **Feature Concept 1 - "Tree Diary":** A kid-friendly photo and measurement log to track individual tree growth over the decade (Time-lapse galleries for admins, math/science lesson inputs for teachers).
- [ ] **Feature Concept 2 - "Campus Care Quests":** Gamified, simple maintenance checklists (watering, weeding) using "farmer/elementary talk" (e.g., "Is the dirt dry like a cracker?").
- [ ] **Feature Concept 3 - "Habitat Spotter":** An elementary-friendly wildlife logging module (bugs, birds) to track biodiversity returning to the campus over 10 years.
- [ ] **Feature Concept 4 - "Time Machine" Slider:** A visualization tool using CAD data to show the projected 5- and 10-year canopy growth ("See the shade when you're in high school!").
- [ ] **Feature Concept 5 - "Living Tree Legacy (Time-Lapse Naming)":** An automated visual time-lapse showing individual trees growing over a decade. Every incoming UTRGV class names a tree via tag numbers; the visualization overlaps/morphs the tree's growth with its evolving names (a collage of names) over the years.


## 🏗️ In Progress (Active Sprints)
- [ ] **July Milestone - Baseline QA & Finalization:** Lock v1 tables & campus fact sheets.
- [ ] **July Milestone - Monitoring Docs v0.8:** Internal review of updated Standard Operating Procedures.
- [ ] **July Milestone - Training #1 Prep:** Prepare Training #1 outline and synthesize dashboard user notes.
- [ ] **August Milestone - Dashboard v2 Planning:** Begin planning for v2 features and performance tweaks based on v1 feedback.
- [ ] **August Milestone - Modeling Visuals Integration:** Start integrating heat/canopy projection visuals for reporting placeholders.

## ✅ Recently Completed
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
