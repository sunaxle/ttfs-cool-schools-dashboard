# Monthly Progress Report — Month 5 (October 2026)
## Project Cool Schools: Environmental Impact Evaluation & Dashboard Development

> **Contract Reference:** Master Service Agreement between Texas Trees Foundation & UTRGV (TTF_UTRGV_FINAL_05252026)  
> **Grant Reference:** Texas A&M Forest Service Community Forestry Grants — Schoolyard Forests Program (#25065)  
> **Reporting Period:** October 1, 2026 – October 31, 2026  
> **Invoice Reference:** Invoice #5 (October 2026 Milestone Billing — UTRGV-TTFS-INV-005)  
> **Submitted To:** Jorge Rodriguez (Project Liaison & Site Lead), Iesha Perkins (Grants Lead), & Beth Edwards (CFO), Texas Trees Foundation  
> **Submitted By:** Dr. Alexis Racelis (PI) & Project Evaluation Team (UTRGV Agroecology & Resilient Food Systems)  

---

## 1. Executive Summary & Billing Overview

During the reporting period of October 2026 (Month 5 of the 19-month project lifecycle), The University of Texas Rio Grande Valley (UTRGV) Project Cool Schools evaluation team completed all scheduled milestone deliverables in accordance with **Exhibit D (Monthly Progress Activities and Milestone Narrative)** of the Master Service Agreement, while also directly implementing the **Dashboard Simplification & Feature Consolidation** revisions requested by Texas Trees Foundation Operations.

Work in Month 5 centered on two primary contract pillars:
1. **Deliverable A (Environmental Baseline Data Summary — $2,542.00):** Locked the final baseline cartographic metrics across all 14 schools, calibrated realistic semi-urban schoolyard soil and construction sub-base tree crown growth curves, and authored the structured **2027 Reporting Workplan, Review Cycles & Stakeholder Roles** (`docs/2027_Reporting_Workplan.md`).
2. **Deliverable C (Forecasting & Digital Dashboard Support Materials — $3,730.00):** Delivered the near-final **Dashboard v2 (`v2-simplified`)** build incorporating TTFS partner recommendations: pruning 6 secondary tabs, consolidating *Surface Breakdown*, *3D Shade Model*, and *Temperature* under *Albedo & Reflectance* (`albedo.html`) with representative campus simulations for Donna ISD (**J.W. Caceres Discovery Intermediate Academy**) and Mercedes ISD (**Ruben Hinojosa Elementary School**), adding *Before Planting $\rightarrow$ Year 1 $\rightarrow$ Grown Trees (10–15 Yr)* impact reports across all retained modeling tabs, and configuring *Biodiversity* and *Tree Sponsorship Roster* as live district-updated feeds.

This report substantiates the **October 2026 Milestone Invoice #5 of $6,272.00**, bringing cumulative project billing to **$97,335.00 (61.8% of the $157,625.00 total contract value)**.

---

### Table 1: Milestone Allocation and Cumulative Progress Summary (Exhibit D Schedule)

| SOW Deliverable Component | Total Contract Allocation | Prior Billed (Jun – Sep 2026) | October 2026 Milestone Earned | Cumulative Total to Date | Milestone Progress % Earned |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Deliverable A:** Environmental Baseline Data Summary | $54,670.00 | $47,685.00 | **$2,542.00** | $50,227.00 | **91.9%** |
| **Deliverable B:** Environmental Monitoring Documentation Package | $32,150.00 | $20,015.00 | **$0.00** | $20,015.00 | **62.3%** |
| **Deliverable C:** Forecasting & Digital Dashboard Support Materials | $55,805.00 | $23,363.00 | **$3,730.00** | $27,093.00 | **48.5%** |
| **Deliverable D:** Training & Technical Assistance Delivery | $15,000.00 | $0.00 | **$0.00** | $0.00 | **0.0%** *(2027 Target)* |
| **TOTAL CONTRACT BILLING** | **$157,625.00** | **$91,063.00** | **$6,272.00** | **$97,335.00** | **61.8%** |

---

## 2. Detailed Deliverable Progress Achieved (October 2026)

### Deliverable A: Baseline Locking, Semi-Urban Soil Calibration & 2027 Reporting Workplan
**October Milestone Earned: $2,542.00** *(Cumulative: $50,227.00 / 91.9% of Deliverable A Allocation)*

1. **Semi-Urban Schoolyard Soil & Construction Sub-Base Allometric Calibration (`config.js`, `itree_engine.js`, `data/mock_trees.json`):**
   - Calibrated the 10–15 year tree crown expansion models across all 9 native Rio Grande Valley planting species (*Bur Oak, Live Oak, Montezuma Bald Cypress, Texas Pecan, Mexican Sycamore, Cedar Elm, Texas Ebony, Honey Mesquite, Anacua*) to account for real-world semi-urban schoolyard conditions: compacted grounds, stratified layers of imported construction fill/caliche from school construction, a 2-year root establishment lag, and realistic sapling survival (`94%`).
   - Replaced overly optimistic park-style projections with realistic, un-hyped 10–15 year schoolyard canopy projections (**`22.8%` shade coverage** at Donna ISD's J.W. Caceres and **`21.6%` shade coverage** at Mercedes ISD's Ruben Hinojosa Elementary) while keeping the complex soil mechanics hidden in the backend so the public interface remains simple and easy to read.

2. **2027 Reporting Workplan & Governance Schedule (`docs/2027_Reporting_Workplan.md` — Exhibit D `oct-26-2`):**
   - Established the complete 2027 quarterly review calendar, sign-off SLAs, and role assignments between UTRGV, Texas Trees Foundation, Donna ISD, and Mercedes ISD covering Online Educator Trainings #1 (Jan 2027) and #2 (Mar 2027), the Implementation Support Memo (Apr–Jun 2027), the Portable Web Handoff Package (Jul 2027), and the Final Evaluation Report (Aug–Nov 2027).

---

### Deliverable C: Dashboard v2 Near-Finalization & TTFS Partner Consolidation
**October Milestone Earned: $3,730.00** *(Cumulative: $27,093.00 / 48.5% of Deliverable C Allocation)*

1. **Navigation Streamlining & Archive Preservation (`v2-simplified`):**
   - Archived the complete 49-page exploratory v1 suite under Git tag `v1.0-full-archive` (`archive/v1-full-suite`) so zero prior work is lost.
   - Removed the 6 secondary modules requested by TTFS (*Site Zoning, Economics/ROI, Trails, Wind, Water Table,* and *Soils/Moisture*) from the primary navigation bar across all retained pages.

2. **Consolidated Albedo, Surface Breakdown, 3D Shade & Temperature Module (`albedo.html`, `albedo.js`, `albedo.css`):**
   - Merged *Surface Breakdown* (`surface_area.html`), *3D Shade Model* (`tree_3d.html`), and *Temperature* (`temperature.html`) directly into *Albedo & Reflectance* (`albedo.html`) using a clean 50/50 split-screen layout.
   - Configured one-click representative campus simulations for each partner district:
     - **Donna ISD Representative:** J.W. Caceres Discovery Intermediate Academy (`154` planted trees, `450,000 sq ft` campus footprint).
     - **Mercedes ISD Representative:** Ruben Hinojosa Elementary School (`142` planted trees, `418,000 sq ft` campus footprint).

3. **Before Planting $\rightarrow$ Year 1 $\rightarrow$ Grown Trees (10–15 Yr) Impact Reports & Public-Friendly UX Pass:**
   - Added interactive 3-stage comparison tables and toggles across *Dashboard Overview* (`dashboard_map.html`), *Canopy Over Time* (`canopy.html`), *Albedo & Reflectance* (`albedo.html`), *Impact* (`index.html`), and *i-Tree Eco Ledger* (`itree_ledger.html`).
   - Configured *Biodiversity* (`biodiversity.html`) and *Tree Sponsorship Roster* (`rivas_tree_roster.html` / `sponsorship_portal.html`) with live district-upload banners (`LIVE FEED`) as requested by TTFS.
   - Translated technical terminology into student-, teacher-, and parent-friendly language across all public views and linked the tactile student field tools (**📌 Birding & Tree Cork Bulletin Board**, **📓 Naturalist's Leather Field Journal**, and **🌡️ IR Surface Temperature Corkboard Lab**) directly in the navigation bar.

---

## 3. Live Web Links (October 2026 `v2-simplified` Build)
* **Main Streamlined Dashboard (`Impact`):** https://sunaxle.github.io/ttfs-cool-schools-dashboard/
* **Consolidated Albedo, Surface Breakdown, 3D Shade & Temp:** https://sunaxle.github.io/ttfs-cool-schools-dashboard/albedo.html
* **Canopy Over Time (with Realistic Schoolyard Growth Curve):** https://sunaxle.github.io/ttfs-cool-schools-dashboard/canopy.html
* **USDA i-Tree Eco Ledger (Before/After-to-Grown Trees):** https://sunaxle.github.io/ttfs-cool-schools-dashboard/itree_ledger.html
* **📌 Schoolyard Ecosystem & Birding Cork Bulletin Board:** https://sunaxle.github.io/ttfs-cool-schools-dashboard/birding_biodiversity_bulletin.html
* **📓 Tree Stewardship Leather Field Journal:** https://sunaxle.github.io/ttfs-cool-schools-dashboard/tree_stewardship_journal.html
* **🌡️ IR Surface Temperature & Shade Relief Lab:** https://sunaxle.github.io/ttfs-cool-schools-dashboard/ir_surface_temp_lab.html

---

## 4. Certification of Progress

I hereby certify that the work described in this progress report has been performed in full accordance with the terms and specifications of the Master Service Agreement (TTF_UTRGV_FINAL_05252026) between the Texas Trees Foundation and The University of Texas Rio Grande Valley, and that all documented milestone deliverables are accurate, complete, and verifiable.

<br>

____________________________________________________  
**Dr. Alexis Racelis, Ph.D.**  
Principal Investigator, Project Cool Schools  
Director, Agroecology and Resilient Food Systems Program  
The University of Texas Rio Grande Valley  
**Date:** October 31, 2026  
