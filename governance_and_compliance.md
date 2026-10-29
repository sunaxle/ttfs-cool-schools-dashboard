# Governance & Compliance Log

## TTFS UTRGV Cool Schools Project

This document tracks all privacy, compliance, and governance audits to ensure strict adherence to FERPA, COPPA, and the Global Project Rules (Privacy-First Architecture).

### Audit Logs

#### [2026-06-19] Prototype B (Verified Volunteer Scanner)
*   **Location**: `/portfolio/volunteer_scanner/prototype_b_verified/`
*   **Auditor**: Privacy & Compliance Officer Agent
*   **Status**: **FAILED - HIGH RISK (PII VIOLATION)**
*   **Findings**:
    *   **FERPA/COPPA Violation**: The application directly requests, captures, and displays a "Student ID Number" (`#student-id` in `index.html` and `currentStudentId` in `app.js`). 
    *   **Rule Conflict**: Global Project Rule 1 states "Absolutely no Personally Identifiable Information (names, exact student locations, specific student photos without waivers) can be required or stored by default in any user-facing module."
    *   **Anonymization Failure**: The receipt process is tied to an individual student identifier rather than being aggregated at the campus level.
*   **Action Required**:
    *   Remove the "Student ID Number" input field and internal logic.
    *   Refactor the verification process to use a non-PII, anonymized method (e.g., a generic "Campus/Class Group Code" or anonymous hash) or drop the requirement entirely to strictly aggregate hours at the campus/homeroom level without individual tracking.

---

#### [2026-08-21] Full Codebase Compliance Audit & Remediation
*   **Auditor**: Antigravity AI Agent (Claude Opus 4.6) + Human Review
*   **Scope**: All 99 HTML files, 176+ total files, 14 campus profiles, all data structures
*   **Status**: **REMEDIATED — 3 Critical Issues Fixed**

##### Finding 1: `data/mock_students.json` — CRITICAL (FIXED)
*   **Severity**: 🔴 HIGH RISK (COPPA/FERPA VIOLATION)
*   **Finding**: File contained **3,065 individual student movement records** with fields: `student_id: "Student_1"`, exact GPS coordinates `[-98.07006, 26.16716]`, timestamps, zone descriptions, and hour-of-day tracking. Also duplicated in `TTFS_Deliverables_Submission/04_Dashboard_Prototype/data/mock_students.json`.
*   **Rule Violated**: Global Project Rule 1 — "Absolutely no Personally Identifiable Information (names, exact student locations) can be required or stored."
*   **Remediation**: Both files replaced with COPPA/FERPA-compliant aggregated zone-level GeoJSON containing only campus zone names, average students per hour, peak hours, and departmental breakdowns. Zero individual student records remain.
*   **Verification**: Project-wide search confirmed no other files referenced `mock_students.json`.

##### Finding 2: `field_survey.html` — HIGH (FIXED)
*   **Severity**: 🟡 HIGH RISK (PII Ingestion Vector)
*   **Finding**: Free-text `<input type="text" id="observerName">` field allowed students to type their real names, which would then be stored in `localStorage` as PII.
*   **Rule Violated**: Global Project Rule 1 — No PII collection.
*   **Remediation**: Replaced free-text input with anonymous team/group code `<select>` dropdown (Team Falcon, Team Ocelot, Team Monarch, Homeroom 3A–5A, UTRGV Research, TTF Staff). Updated `field_survey.js` to store `team_code` instead of `observerName`.

##### Finding 3: `school.js` Runtime Error — MEDIUM (FIXED)
*   **Severity**: 🟢 MEDIUM (Functional Defect)
*   **Finding**: `school.js` queried for DOM elements (`profileCanopy`, `saveProfile`, `schoolMap`) that do not exist in `school.html`, causing `TypeError: Cannot read properties of null`.
*   **Remediation**: All DOM queries wrapped in defensive null checks. No functional changes to existing behavior.

##### Additional Fixes (Navigation & Broken Links)
*   **21 portfolio mini-apps**: Added back-navigation bars to prevent one-way navigation traps.
*   **`portfolio/teks_curriculum/index.html`**: Created missing hub page linking to 5 TEKS curriculum sub-apps.
*   **`rivas_tree_roster.html`**: Added back-navigation to dashboard.

##### Remaining Compliance Notes
*   `schoolyard_planner.html` (BloomsEye-Grade 3D Microforest & Landscape Studio): **FULLY COMPLIANT** — Zero student PII collected or stored. Uses anonymous classroom team selections (`Team Monarch`, `Team Ocelot`), client-side only browser memory/localStorage, and open standard client-side WebGL (Three.js r128). Fully portable for Texas Trees Foundation packaging, self-hosting, and static deployment.
*   `survey.html` (Biometeorological Kiosk): **FULLY COMPLIANT** — Zero PII, anonymous emoji-button clicks aggregated at zone level.
*   `student_tracking.html`: **FULLY COMPLIANT** — Displays only aggregated class/department metrics, no individual student data.
*   `photo_data.js`: **FULLY COMPLIANT** — Uses anonymous Teacher IDs (e.g., "Teacher ID: 492"), no student names or faces.
*   `donors_data.js`: **LOW RISK** — Contains simulated donor data with `@example.com` emails and `555` phone numbers. Acceptable for demo purposes but should be replaced with real anonymized data before production.

---

#### [2026-09-15] Dashboard v2 Core Modules & Offline Service Worker PWA Audit
*   **Auditor**: Antigravity AI Agent + Lead Systems Architect
*   **Scope**: `sw.js`, `sw-register.js`, `teks_lesson_plans.html/js/css`, `sponsorship_portal.html/js/css`
*   **Status**: **APPROVED — FULLY COMPLIANT**

##### 1. `sw.js` & `sw-register.js` (PWA Offline Field Architecture)
*   **Portability & Zero Lock-in**: Uses standard W3C Service Worker APIs without proprietary cloud dependencies. Implements cache-first / stale-while-revalidate for static assets, local datasets (GeoJSON/CSV), and pre-caches CDN dependencies (Leaflet, D3, Chart.js, Three.js, ArcGIS JS API).
*   **Resilience**: Operates 100% offline on rural schoolyard tablets with `IndexedDB` sync queues and connection diagnostic pills.
*   **Handoff**: Client can package and deploy to any standard HTTPS static host (GitHub Pages, Netlify, Apache, NGINX, Firebase Hosting).

##### 2. `teks_lesson_plans.html`, `.js`, `.css` (Elementary Science Standards Portal)
*   **Curriculum Standards**: Aligned to TEA Elementary Science TEKS 3.9A, 4.9A, and 5.9A.
*   **COPPA/FERPA Compliance**: Zero individual student PII collected or stored. Field worksheets and reflection forms utilize anonymous team codes (`Team Monarch`, `Homeroom 3A`) and anonymous feedback logs.
*   **Dual-Platform Layout**: Supports desktop/tablet interactive thermal and transpiration simulators alongside `@media print` 8.5" × 11" printable field worksheets.
*   **Human-Analog Aesthetic**: Tactile paper palette (`#FBFBF9`, `#1B4D3E`, `#F05023`, `#ECA100`), accessible ARIA tab patterns, and strict zero-inline-scripts modular JavaScript.

##### 3. `sponsorship_portal.html`, `.js`, `.css` (Campus Tree Adoption & Environmental ROI)
*   **USDA i-Tree Eco v6.0 Integration**: Client-side mathematical calculation of stormwater interception, carbon sequestration, direct cooling shade ($ft^2$), classroom energy savings ($/kWh), and CTLA tree replacement asset value.
*   **Zero PII Community Sponsorship**: Dedications restricted to family/organization/classroom names (`The Treviño Family`, `Room 4B Monarchs`, `RGV Wildlife Alliance`).
*   **Printable Certificate**: 8.5" × 11" Certificate of Environmental Stewardship formatted with official Texas Trees Foundation and UTRGV Agroecology seals for physical donor presentation.

---

#### [2026-09-18] TTFS Education Department Curriculum Integration Audit
*   **Auditor**: Multi-Agent Working Group (Chief of Staff, Pedagogy Specialist, Environmental Educator, Senior Developer) + Human Review
*   **Scope**: `tree_stewardship.html/.css/.js`, `birding_biodiversity.html/.css/.js`, and `docs/curriculum_inputs/`
*   **Status**: **APPROVED — FULLY COMPLIANT**

##### 1. `tree_stewardship.html`, `.css`, `.js` (Tree Stewardship & Health Tracking)
*   **Source Fidelity**: Implements 100% of the verbatim lesson structure from TTFS Education Department Word documents (`Tree Stewardship Brainstorming.docx` and `Tree Stewardship Tracking.docx`).
*   **Dual-Mode Architecture**: Provides a persistent top switcher between the verbatim official TTFS lesson/tracking sheet and the enhanced "Interactive Digital Field Lab".
*   **COPPA/FERPA Compliance**: Zero individual student PII collected. Tree tracking is strictly organized by `Classroom Nickname` (e.g., `Room 301 — Tree Rangers`), `Campus Tree Tag #`, and `Tree Nickname`. Local observations are stored in browser `localStorage` and aggregated at the campus level.
*   **Field Usability & Print Optimization**: Features an 8.5" × 11" `@media print` optimized field sheet with blank rows for outdoor clipboards when tablets are unavailable.

##### 2. `birding_biodiversity.html`, `.css`, `.js` (Birding & Biodiversity Field Lab)
*   **Source Fidelity**: Implements 100% of the verbatim curriculum from TTFS Education Department Word documents (`Birding and Biodiversity Brainstorming.docx` and `Birding and Biodiversity Tracking.docx`).
*   **Pedagogical Innovations ("Parts of a Cowboy" & "Chachalaca & Friends")**:
    *   *Parts of a Cowboy*: Visual inquiry diagram connecting cowboy hat ➔ crown/crest, bandana ➔ throat gorget, lasso ➔ beak adaptations, boots/spurs ➔ perching talons.
    *   *Birding by Ear (Web Audio API)*: Zero-dependency sound synthesis allowing students to listen to calls of signature RGV species (Plain Chachalaca, Great Kiskadee, Green Jay, Golden-fronted Woodpecker).
*   **Zero Vendor Lock-in & Portability**: 100% vanilla ES6 JavaScript, zero backend API locks, client-side synthesized audio, and static asset portability ready for immediate Texas Trees Foundation hosting handoff.

---

#### [2026-10-27] TTFS October 2026 Dashboard Simplification & Feature Consolidation (`v2-simplified`)
*   **Auditor**: Antigravity AI Agent + Lead Systems Architect
*   **Scope**: `albedo.html/js/css`, `index.html/js`, `canopy.html/js`, `itree_ledger.html`, `dashboard_map.html`, `main.js`, `biodiversity.html`, `rivas_tree_roster.html`, `sponsorship_portal.html`, `campuses.html`, `style.css`
*   **Status**: **APPROVED — FULLY COMPLIANT**

##### 1. Version Control & Handoff Preservation
*   **Full v1 Snapshot Frozen**: Tagged the complete 49-page exploratory suite as `v1.0-full-archive` on branch `archive/v1-full-suite` (and `main`), and created independent branch `v2-simplified` for the streamlined district-facing delivery.
*   **Navigation Pruning**: Removed the 6 secondary modules (`Site Zoning`, `Economics/ROI`, `Trails`, `Wind`, `Water Table`, `Soils/Moisture`) and 3 standalone absorbed tabs (`Surface Breakdown`, `3D Shade Models`, `Temp`) from the core navigation bar across all retained pages.

##### 2. Consolidated Albedo, Surface Breakdown, 3D Shade & Temperature Module (`albedo.html`, `albedo.js`, `albedo.css`)
*   **Unified Architecture**: Consolidates `surface_area.html`, `tree_3d.html`, and `temperature.html` directly into `albedo.html` using a Human-Analog 50/50 split-screen layout:
    *   *Left Persistent Viewport*: Switches cleanly between the 2D FLIR Smooth Thermal Heatmap, 2D Digitized Surface Zone Polygons (Leaflet), and the 360° 3D Orbital Shade & Canopy Simulator (Three.js WebGL), complete with an 8:00 AM – 6:00 PM diurnal solar scrubber and live solar/thermal KPI strip.
    *   *Right Scrollable Analytical Pane*: Houses the Pre/Post-to-Mature Tree Impact Comparison Report, Surface Breakdown Doughnut Chart & Land Cover Proportions Table (with optional custom `*_Zones.json` drag-and-drop), 2025–2040 Microclimate Temperature Trajectory Chart, and Zone-by-Zone Hourly Surface Temperature Matrix.
*   **Representative District Campuses**: Configured with a one-click switcher between one representative campus from each partner school district:
    *   *Donna ISD*: **J.W. Caceres Discovery Intermediate Academy** (`donna_jw_caceres`, 154 trees planted, 450,000 sq ft footprint, 5% baseline $\rightarrow$ 30% mature target).
    *   *Mercedes ISD*: **Ruben Hinojosa Elementary School** (`mercedes_hinojosa`, 142 trees planted, 418,000 sq ft footprint, 4% baseline $\rightarrow$ 30% mature target).

##### 3. Pre/Post Planting-to-Mature Tree Impact Reports & Live District Feeds
*   **Pre/Post-to-Mature Reports**: Standardized 3-stage lifecycle toggles and side-by-side comparison tables (`1. Pre-Planting Baseline` $\rightarrow$ `2. Initial Planting (Yr 1)` $\rightarrow$ `3. Mature Tree Canopy (10–15 Yr)`) across `dashboard_map.html`, `canopy.html`, `albedo.html`, `index.html`, and `itree_ledger.html`.
*   **Live District Upload Exceptions**: Preserved `biodiversity.html` and `rivas_tree_roster.html` (`sponsorship_portal.html`) as live district-updated feeds with zero individual student PII (COPPA/FERPA compliant).

##### 4. Semi-Urban Schoolyard Soil & Construction Sub-Base Crown Modeling (`config.js`, `itree_engine.js`, `canopy.js`, `itree_ledger.js`, `albedo.js`, `data/mock_trees.json`)
*   **Allometric & Soil Calibration**: Replaced idealized botanical park growth rates with semi-urban Rio Grande Valley schoolyard growth curves across all 9 native tree species (*Bur Oak, Live Oak, Montezuma Bald Cypress, Texas Pecan, Mexican Sycamore, Cedar Elm, Texas Ebony, Honey Mesquite, Anacua*).
*   **3-Tier Schoolyard Soil Regimes**:
    *   *Unamended Compacted Construction Fill*: Models `1.72 g/cm³` bulk density, `0.6%` organic matter, stratified imported caliche/clay sub-base pan (`14–24 in`), 3-year transplant root shock lag, `88%` survival (`12%` sapling mortality), and a `0.52×` growth multiplier (stalling at `16.4%` canopy cover in 2040).
    *   *Realistic Semi-Urban Schoolyard Planting (Default)*: Models `1.48 g/cm³` bulk density, `1.8%` organic matter, 3× rootball pit excavation through the construction fill layer, 1.5-year establishment lag, `95%` survival, and a `0.76×` growth multiplier (reaching `28.1%` canopy in Year 15 and `29.9%` by Year 20).
    *   *UTRGV Agroecology Soil Remediation*: Models `1.28 g/cm³` bulk density, `4.2%` organic matter, deep pneumatic radial trenching (`36 in` sub-soiling fracturing the construction pan), mycorrhizal biochar amendment, 0.5-year lag, `98%` survival, and a `0.93×` growth multiplier (exceeding the `30.0%` Cool Schools shade target by 2040).
*   **Client Portability**: 100% deterministic client-side math in `ITreeEngine` (`itree_engine.js`) and `config.js` with zero external API dependencies.





