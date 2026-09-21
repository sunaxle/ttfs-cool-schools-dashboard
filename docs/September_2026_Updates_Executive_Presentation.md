# Slide Deck: September 2026 Milestone Delivery & Technical Updates
## Texas Trees Foundation & UTRGV Project Cool Schools (Grant #25065)

> **Audience:** Texas Trees Foundation Leadership, Texas A&M Forest Service, UTRGV Research Administration, Donna ISD & Mercedes ISD Superintendents  
> **Date:** September 2026 (Month 4 Milestone)  
> **Contract Earnings:** $7,022.00 (Cumulative: $91,063.00 / 57.8%)  

---

### SLIDE 1: Title & Executive Overview
**Title:** Cool Schools RGV: September 2026 Milestone Delivery  
**Subtitle:** *Transitioning from Research Prototype to Field-Resilient, Curriculum-Integrated Infrastructure*  
**Presenters:** Dr. Alexis Racelis (UTRGV PI) & Anabel Castillo-Soto (TTFS PI)  

* **Visual:** Split screen showing an offline rugged tablet running campus maps on the left, and elementary students engaged in an outdoor tree lab on the right.
* **Key Numbers:**
  * **100%** of Month 4 Contract Milestones Completed ($7,022.00 earned).
  * **$91,063.00** Cumulative Project Billing to Date (57.8% of $157,625 contract).
  * **31 / 31** Automated Validator Gate Nodes Verified Green (0 errors).
* **Presenter Script:** "Good morning, everyone. Today we are presenting our Month 4 milestone delivery for the Texas Trees Cool Schools Program. In September, we moved from prototype validation to building offline-ready field architecture, publication standards, curriculum portals, and comprehensive governance dossiers."

---

### SLIDE 2: Milestone Scorecard & Financial Summary
**Title:** Month 4 Billing & Contract Progress (Exhibit D)  

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 SEPTEMBER 2026 BILLING SCORECARD                                 │
├────────────────────────┬─────────────┬─────────────┬─────────────┬───────────────────────────────┤
│ Deliverable Component  │ Prior Billed│ Month 4 Fee │ Cumul. Billed│ Status                        │
├────────────────────────┼─────────────┼─────────────┼─────────────┼───────────────────────────────┤
│ A: Baseline Data & Map │ $44,295.00  │ $3,390.00   │ $47,685.00  │ ✅ Publication Figures Final  │
│ B: Monitoring SOPs     │ $20,015.00  │ $0.00       │ $20,015.00  │ ✅ SOP v0.8 & Lab Sheets Done │
│ C: Dashboard v2 & Models│ $19,731.00 │ $3,632.00   │ $23,363.00  │ ✅ Offline PWA & TEKS Portal  │
│ D: Training Delivery   │ $0.00       │ $0.00       │ $0.00       │ ⏳ Scheduled for Q1 2027      │
├────────────────────────┼─────────────┼─────────────┼─────────────┼───────────────────────────────┤
│ TOTAL                  │ $84,041.00  │ $7,022.00   │ $91,063.00  │ 57.8% OF TOTAL $157.6k AWARD │
└────────────────────────┴─────────────┴─────────────┴─────────────┴───────────────────────────────┘
```

* **Presenter Script:** "We are exactly on schedule and within budget. Month 4 billings total $7,022.00, bringing our cumulative earnings to $91,063.00 across Deliverables A and C."

---

### SLIDE 3: Ground-Truthing Global Science (*McDonald et al., 2026*)
**Title:** Harmonizing RGV Campus Data with *Nature Communications*  

* **Key Literature Connections:**
  1. **Closing the 1-km Gap:** McDonald et al. used a 1 km global model that missed local microclimate extremes. Our 8-station campus arrays provide sub-meter empirical validation on school playgrounds.
  2. **Semi-Arid Efficiency:** The *Nature* study proved Tree Cooling Efficiency is highest in semi-arid and dense urban cores. Donna ISD and Mercedes ISD are prime real-world models.
  3. **WBGT Solar Shading:** Trees reduce Wet Bulb Globe Temperature (WBGT) **3.1x more** than simple air temperature, dropping black globe heat by 25°F–40°F and eliminating dangerous outdoor activity cancellations.
* **Presenter Script:** "Our campus data directly operationalizes the findings of the latest Nature Communications paper on urban cooling. We are demonstrating in real time how native schoolyard canopies provide maximum heat relief where children need it most."

---

### SLIDE 4: Work Package 1 — Offline PWA Architecture
**Title:** Dashboard v2: Offline Resilience in Rural Schoolyards  

* **Core Deliverables:**
  * **Service Worker (`sw.js` v2.0.0):** Cache-first / stale-while-revalidate strategy pre-caching all 49 HTML pages, GeoJSON campus polygons, tree rosters, and CDN libraries (ArcGIS, D3.js, Chart.js, Three.js).
  * **Field Connection Badge (`sw-register.js`):** Discreet status pill displaying `Field PWA: Online` vs. `Field Offline Mode (Cached)` with interactive cache management.
  * **Zero Cell Signal Required:** Field technicians and teachers can record caliper logs and view interactive shade maps anywhere on campus perimeters without cellular drops.
* **Presenter Script:** "One of our primary feedback points from Donna ISD was that outdoor campus boundaries have weak cellular reception. Our new Service Worker pre-caches all map data and libraries so tablets function flawlessly 100% offline."

---

### SLIDE 5: Work Package 1 (Cont.) — Curriculum & Sponsorship Portals
**Title:** Engaging Students, Teachers, and Community Donors  

* **TEKS Lesson Plan Portal (`teks_lesson_plans.html`):**
  * Direct alignment with Texas Science Standards (**TEKS 3.9A, 4.9A, 5.9A**).
  * 3 interactive digital simulators: Surface Temperature Mercury Probe, Tree Transpiration Engine, and Stormwater Soil Sponge.
* **Campus Tree Sponsorship Portal (`sponsorship_portal.html`):**
  * USDA i-Tree Eco v6.0 live ROI calculator (gallons intercepted, lbs CO₂ stored, sq ft shade created, classroom A/C energy savings).
  * 4 Community adoption tiers with printable 8.5" × 11" Parchment Certificates of Stewardship.
* **Presenter Script:** "We built two new interactive portals: a TEKS-aligned lesson plan engine that turns schoolyard trees into living science labs, and a sponsorship portal that calculates the exact environmental return on investment for community tree adopters."

---

### SLIDE 6: Work Package 2 — Publication Figure Standards
**Title:** Standardizing Scientific Figures & CVD Color Ramps  

* **Standards Established (`docs/Figure_Templates_and_Caption_Conventions.md`):**
  * **Resolution:** 300 DPI vector print and 1200×800px responsive web layouts.
  * **Typography:** Humanist serif (Harding/Palatino) for titles/captions; sans-serif for data axes.
  * **Colorblind-Safe Palettes:**
    * *Land Surface Temp (LST):* Continuous thermal gradient (`#2C7BB6` to `#7A0177`).
    * *Air Temp Anomaly ($\Delta T$):* Diverging cooling/warming scale (`#2166AC` to `#B2182B`).
    * *NDVI Density:* Ecological vegetation gradient (`#E5E0D8` to `#00441B`).
    * *WBGT Safety Flags:* Standard 5-tier OSHA/NWS district safety flags.
  * **Strict 7-Part Caption Anatomy:** Title, finding, panel keys, sensor specs, confidence intervals ($\pm 1\text{ SE}$), and grant citation.
* **Presenter Script:** "To ensure all baseline reports and future peer-reviewed papers meet the highest visual standards, we locked in publication-grade figure conventions, accessible color scales, and strict caption structures."

---

### SLIDE 7: Work Package 3 — Usability Dossier & ADA Protection
**Title:** Scientific Lineage & Protecting District Revenue  

* **Dossier Highlights (`docs/Dashboard_Usability_and_Data_Caveats.md`):**
  * **Full Data Provenance:** LandScan 2020, ESA WorldCover 10m, MODIS Aqua LST, NASA NEX GDDP downscaled CMIP6 (SSP2-4.5), and NOAA ASOS weather stations.
  * **Thermodynamic Equations:** Penman-Monteith latent heat dissipation ($257.6\text{ kWh/day/tree}$) and i-Tree hydrological interception ($14.2\text{M gal/yr}$ avoided runoff).
  * **The Superintendent Business Case (ADA Protection):**
    * Texas Foundation School Program funds ~$34.22 per day per attending student.
    * A 30-day heat wave spikes asthma and heat-related absences, risking up to **$664,140** in Donna ISD state funding.
    * The 661-tree campus planting plan pays for itself within **2.1 academic years** while building **$15.13M in 10-year environmental capital**.
* **Presenter Script:** "Our usability dossier gives superintendents a powerful financial justification: schoolyard trees aren't just aesthetic amenities; they protect hundreds of thousands of dollars in State ADA attendance revenues by preventing heat-induced asthma absences."

---

### SLIDE 8: Work Package 4 — Educational Progression (v0.8) & SOP
**Title:** Empowering Educators with Turnkey Outdoor Labs  

* **Educator Presentation Deck (`docs/Training_Materials_v0.8_Educator_Deck.md`):**
  * 4 complete modules with verbatim presenter scripts, RGV native tree profiles (*Ahuehuete*, *Ebano*, *Anacua*, *Live Oak*), and teacher objection handling.
* **Printable Field Sheets (`docs/Outdoor_Science_Lab_Field_Sheets.md`):**
  * 8.5" × 11" Letter black-and-white worksheets for 5 cooperative student roles (*Thermal Scout*, *Caliper Tech*, *Canopy Pacer*, *Field Scribe*, *Wildlife Spotter*).
  * Includes mulch donut vs. volcano diagrams and a 3-minute classroom dashboard sync slip.
* **Monitoring SOP v0.8 (`docs/Monitoring_SOP_v0.8.md`):**
  * Updated standard operating procedure with monthly ice-bath IR thermometer calibration ($32.0^\circ\text{F} \pm 1.0^\circ\text{F}$) and triplicate spot sampling.
* **Presenter Script:** "We delivered complete classroom-ready materials: slide decks, printable double-sided student worksheets, and an updated monitoring standard operating procedure that makes outdoor science safe, structured, and easy for teachers to lead."

---

### SLIDE 9: Governance, Privacy & AI Compliance
**Title:** Zero PII, FERPA/COPPA Compliance, and Clean Client Handoff  

* **Compliance Verification:**
  * **Zero PII Mandate:** All student data collected during outdoor labs is aggregated at the campus/grade level. No student names, photos, or GPS tracks are ever collected or stored.
  * **UTRGV AI Compliance (Dec 1, 2025):** 100% human-in-the-loop oversight, approved enterprise tools only, and deterministic data rendering.
  * **The Handoff Mandate:** Pure static HTML5/CSS3/ES6 architecture with zero vendor lock-in, enabling seamless hosting transfer to Texas Trees Foundation IT infrastructure.
* **Presenter Script:** "Every line of code and every document adheres strictly to our COPPA and FERPA privacy mandates. The platform is entirely open, static, and portable for seamless client handoff."

---

### SLIDE 10: Next Steps & October 2026 Outlook
**Title:** Looking Ahead: Month 5 Milestones & 2027 Preparation  

* **October 2026 (Month 5 / $6,272.00 Targets):**
  1. Finalize Dashboard v2 assembly, integrating offline IndexedDB data synchronization.
  2. Draft 2027 Annual Reporting Workplan and establish stakeholder review schedules.
  3. Finalize logistics and calendar dates for District Online Training Session #1.
* **Cumulative Milestone Target:** $97,335.00 (61.8% of contract) by October 31, 2026.
* **Presenter Script:** "Thank you for your partnership and support. All September milestones are complete and validated, and we look forward to advancing our Month 5 goals in October. We are now open for questions and feedback."
