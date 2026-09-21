# 📜 Environmental Monitoring Standard Operating Procedures (SOP v0.8)
## Physical Campus Field Protocols, Equipment Calibration, Quality Assurance & Digital Dashboard Integration
**Texas Trees Foundation (TTFS) × UTRGV Agroecology Evaluation Team**  
*Project Cool Schools — Texas A&M Forest Service (TFS) Community Forestry Grant Deliverable B & D*

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ DOCUMENT CONTROL: SOP-ENV-2026-v0.8                                                              │
├──────────────────────┬───────────────────────────────────────────────────────────────────────────┤
│ Title:               │ Standard Operating Procedure for Campus Urban Forest & Microclimate       │
│                      │ Monitoring (Version 0.8 — Field Implementation Standard)                  │
│ Effective Date:      │ Fall Semester 2026                                                        │
│ Participating Sites: │ Donna ISD Campuses & Mercedes ISD Campuses                                │
│ Research Lineage:    │ UTRGV Agroecology Lab (Dr. Alexis Racelis) & TTFS Urban Forestry Division │
│ Privacy Compliance:  │ 100% FERPA & COPPA Compliant Zero-PII Architecture                        │
│ Status:              │ Approved for Active Field Implementation                                  │
└──────────────────────┴───────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Scope, Objectives & Compliance Framework

### 1.1 Scope & Purpose
This Standard Operating Procedure (SOP) defines mandatory technical protocols for physical on-campus tree inventory, microclimate thermal monitoring, equipment calibration, data quality assurance (QA/QC), and digital data synchronization for the Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools initiative across participating Donna ISD and Mercedes ISD campuses.

### 1.2 Multi-Benefit Objectives
1. **Microclimate Physics Verification:** Measure and validate surface and ambient cooling deltas ($\Delta T$) delivered by native tree canopies against unshaded impervious surfaces (asphalt, concrete, poured rubber turf).
2. **Urban Forest Phenology & Growth Tracking:** Systematically monitor 10-year growth trajectories (caliper DBH, height, canopy drip-line spread) of native South Texas species (*Taxodium mucronatum*, *Ebenopsis ebano*, *Ehretia anacua*, *Quercus virginiana*).
3. **Pedagogical Integration:** Standardize K–12 student STEM field inquiry aligning with Texas Essential Knowledge and Skills (TEKS §112.14–§112.16) for Grades 3 through 5.
4. **Grant & Contract Compliance:** Maintain auditable, high-integrity environmental records satisfying Texas A&M Forest Service (TFS) Schoolyard Forest Grant milestones and UTRGV research protocols.

### 1.3 Strict Privacy & Governance Directives (COPPA / FERPA)
* **Zero PII Standard:** In accordance with the Project Cool Schools Charter and federal COPPA/FERPA regulations, **no personally identifiable information (PII)**—including student names, student IDs, home addresses, or identifiable facial photographs—shall ever be recorded on field sheets, entered into digital portals, stored in databases, or displayed on public dashboards.
* **Campus-Level Aggregation:** All student citizen-science observations are recorded under classroom cohort identifiers (e.g., *"Room 204 - 4th Grade Cohort"* or *"Team Bravo"*) and aggregated at the campus level.
* **Open Lineage & Handoff Mandate:** All raw datasets, schemas, and calibration logs are maintained in open, non-proprietary formats (CSV, GeoJSON, standard JSON) to ensure seamless long-term handoff to the Texas Trees Foundation.

---

## 2. Roles, Responsibilities & RACI Governance Matrix

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 OPERATIONAL RACI MATRIX                                          │
├─────────────────────────────────────────┬──────────┬──────────┬──────────┬──────────┬────────────┤
│ Task / Operational Phase                │ Educator │ Students │ TTFS Arb │ UTRGV    │ Facilities │
├─────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────┼────────────┤
│ 1. Pre-Field Equipment Calibration      │    A     │    I     │    R     │    C     │     I      │
│ 2. Student Safety & Role Assignment     │    A/R   │    R     │    I     │    C     │     I      │
│ 3. Outdoor Lab Measurement Execution    │    A     │    R     │    C     │    C     │     I      │
│ 4. Classroom Data Aggregation & Math    │    A/R   │    R     │    I     │    I     │     I      │
│ 5. Digital Portal Upload / Offline Sync │    A/R   │    I     │    I     │    C     │     I      │
│ 6. QA/QC Outlier Validation & Filtering │    I     │    I     │    C     │    A/R   │     I      │
│ 7. Quarterly Arborist Health Inspection │    I     │    I     │    A/R   │    C     │     C      │
│ 8. Irrigation & Gator Bag Maintenance   │    I     │    I     │    C     │    I     │     A/R    │
└─────────────────────────────────────────┴──────────┴──────────┴──────────┴──────────┴────────────┘
R = Responsible (Completes work) | A = Accountable (Final approval) | C = Consulted | I = Informed
```

### 2.1 Role Definitions
* **Campus Lead Science Educator:** Accountable for student outdoor safety, dividing student teams into cooperative learning roles, verifying worksheet completion, and submitting class data via `teks_sandbox.html` or `tree_diary.html`.
* **Student Science Teams:** Responsible for hands-on data collection in designated roles (*Thermal Scout*, *Caliper Tech*, *Canopy Pacer*, *Field Scribe*, *Wildlife Spotter*).
* **TTFS Certified Arborists (ISA):** Accountable for baseline tagging, quarterly structural health audits, tree pruning/mulch remediation, and technical tree health escalations.
* **UTRGV Agroecology Evaluation Team:** Accountable for sensor calibration standards, QA/QC outlier validation, i-Tree Eco modeling pipelines, and TFS grant reporting.
* **District Facilities & Grounds Staff:** Responsible for irrigation system maintenance, bi-weekly summer Gator Bag hydration, and protecting tree root zones from mowing/weed-eater damage.

---

## 3. Equipment Specifications & Calibration Protocols

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                REQUIRED FIELD MONITORING EQUIPMENT                               │
├──────────────────────────┬───────────────────────────────┬───────────────────────────────────────┤
│ Equipment Name           │ Technical Specification       │ Primary Function                      │
├──────────────────────────┼───────────────────────────────┼───────────────────────────────────────┤
│ Handheld IR Thermometer  │ 12:1 D:S Ratio, 8–14 μm, ε=0.95│ Surface radiometric temperature (°F)  │
│ DBH Caliper Tape         │ Flexible Fiberglass (100ths)  │ Trunk diameter at breast height (in)  │
│ Long Measuring Tape      │ 50 ft / 15 m Open Reel        │ Canopy drip-line cross-axial spread   │
│ Soil Moisture Sensor     │ Dual-Probe TDR (or Tactile)   │ Volumetric water content / Hydration  │
│ Ambient Weather Logger   │ NIST-Traceable Thermohygrometer│ Air temp (°F), Relative Humidity (%) │
│ Field Worksheets         │ High-Contrast 8.5" × 11" Paper│ Zero-PII analog data recording        │
└──────────────────────────┴───────────────────────────────┴───────────────────────────────────────┘
```

---

### 3.1 Handheld Infrared (IR) Surface Thermometers

```text
                    DISTANCE-TO-SPOT RATIO (12:1 OPTICAL CONE)
       ┌───────────┐
       │ IR SENSOR │═══════════════════════════► ( Spot Diameter = 1 inch at 12 inches )
       └───────────┘ \
                      \════════════════════════► ( Spot Diameter = 2 inches at 24 inches )
```

#### A. Technical Specifications
* **Distance-to-Spot Ratio ($D:S$):** $12:1$ (At a distance of 12 inches, the measurement spot size is 1.0 inch; at 24 inches, spot size is 2.0 inches).
* **Spectral Response:** $8\text{ to }14\ \mu\text{m}$.
* **Fixed Emissivity ($\varepsilon$):** Standardized at $\varepsilon = 0.95$ (optimal for asphalt, concrete, moist soil, grass, and tree bark).
* **Measurement Range:** $-58^\circ\text{F}\text{ to }1,022^\circ\text{F}\ (-50^\circ\text{C}\text{ to }550^\circ\text{C})$ with accuracy $\pm 1.5\%$.
* **Targeting Laser:** Class II red laser ($< 1\text{ mW}$ output, $\lambda = 630\text{--}670\text{ nm}$).

#### B. Pre-Field Ice-Bath Calibration Verification Protocol (Monthly)
1. Prepare a stabilized ice-water slurry: fill a standard insulated beaker or thermos with crushed distilled ice, add cold distilled water until voids are filled, and stir thoroughly for 3 minutes until thermal equilibrium is established ($32.0^\circ\text{F} / 0.0^\circ\text{C}$).
2. Aim the IR thermometer perpendicular ($90^\circ$) to the water surface at a distance of 6 inches (ensuring the optical cone does not capture beaker walls).
3. Squeeze and hold the trigger for 3 seconds.
4. **Acceptance Threshold:** The instrument must read between **$31.0^\circ\text{F}\text{ and }33.0^\circ\text{F}$** ($32.0^\circ\text{F} \pm 1.0^\circ\text{F}$). If reading deviates by $> 1.0^\circ\text{F}$, replace 9V battery and re-test. If error persists, flag instrument for recalibration or decommission.
5. Record calibration verification in the *Master Equipment Calibration Log*.

#### C. Field Measurement Protocol & Safety
1. **Measurement Angle:** Hold the sensor perpendicular ($90^\circ \pm 15^\circ$) to the target surface to prevent reflective glancing errors.
2. **Measurement Distance:** Maintain a consistent distance of **12 to 24 inches (30 to 60 cm)** from the target surface.
3. **Trigger Pacing:** Depress the trigger for a full **2 seconds**, release, and read the frozen display value.
4. **Laser Safety:** Never direct the targeting laser toward eyes, faces, shiny polished metal, or classroom windows.

---

### 3.2 Caliper & Diameter at Breast Height (DBH) Measuring Tapes

```text
       STANDARD FORESTRY DBH MEASURING PROTOCOL (4.5 FT / 1.37 M)
       
              / \           / \
             /   \         /   \
            |     |       |     |
            |     |       |     |
       ─────┼─────┼───────┼─────┼─────  ◄─── 4.5 ft (Breast Height Line)
            |     |       |     |
            |     |       |     |
            |  A  |       |  B  |
           /       \     /       \
          /  Root   \   /  Root   \
       ──┴───────────┴─┴───────────┴──  ◄─── Ground Level
         [ Single Trunk ] [ Multi-Stem: Measure each stem if fork < 4.5 ft ]
```

#### A. Standard Measurement Height
* **Standard DBH Height:** Measure trunk circumference exactly **4.5 feet (1.37 meters)** above average ground level on the uphill side of the tree.

#### B. Specialized Botanical Tree Forms
1. **Montezuma Cypress (*Taxodium mucronatum*):** Due to dramatic basal trunk flare and harmonic fluting ($1.8\times\text{--}2.5\times\text{ DBH}$ swelling), ensure the measuring tape is placed cleanly at 4.5 feet above ground line, well above the basal root swell.
2. **Forked / Multi-Stem Trees (e.g., Texas Ebony):**
   * *Fork above 4.5 ft:* Measure as a single trunk at 4.5 ft below the fork junction.
   * *Fork below 4.5 ft:* Measure each stem separately at 4.5 ft above ground; calculate equivalent combined DBH:
     $$\text{DBH}_{\text{equiv}} = \sqrt{\text{DBH}_1^2 + \text{DBH}_2^2 + \dots + \text{DBH}_n^2}$$
3. **Leaning Trees:** Measure at 4.5 feet along the axis of the trunk parallel to the angle of lean.

---

### 3.3 Canopy Crown Spread Measurement

#### A. Cross-Axial Drip-Line Method (Arborist Standard)
1. Identify the widest horizontal axis of the tree's outer drip-line crown ($W_1$). Measure distance from outer leaf edge to opposite outer leaf edge through the center of trunk using the 50-ft reel tape.
2. Measure the perpendicular horizontal axis ($90^\circ$ to $W_1$) crown width ($W_2$).
3. Calculate Average Crown Spread ($W_{\text{avg}}$):
   $$W_{\text{avg}} = \frac{W_1 + W_2}{2}$$
4. Calculate Canopy Projection Area ($A_{\text{canopy}}$):
   $$A_{\text{canopy}} = \pi \left( \frac{W_{\text{avg}}}{2} \right)^2 = \frac{\pi}{4} W_{\text{avg}}^2$$

#### B. Student Step-Pacing Method (Classroom Standard)
1. Calibrate student walking pace: 1 standard elementary giant step $\approx 2.5\text{ feet } (0.76\text{ m})$.
2. The *Canopy Pacer* walks from the trunk center to the outer drip-line shadow boundary, counting strides ($N_{\text{paces}}$).
3. Compute estimated canopy radius: $R_{\text{canopy}} = N_{\text{paces}} \times 2.5\text{ ft}$.

---

### 3.4 Soil Moisture & Microclimate Weather Logging

#### A. Electronic TDR Dual-Probe Sensor (Arborist / Research Standard)
* Insert 4.7-inch stainless steel probes vertically into undisturbed root zone soil 18 inches away from trunk base. Record Volumetric Water Content (VWC %):
  * **$< 12\%$ VWC:** Critical Drought Deficit $\to$ Trigger deep root watering.
  * **$15\%–28\%$ VWC:** Optimal Aerobic Root Hydration.
  * **$> 35\%$ VWC:** Anoxic Saturation $\to$ Risk of root rot; suspend irrigation.

#### B. Tactile 3-Point Field Rubric (Student Classroom Standard)
* **Rating 1 — Bone Dry ("Dry Cracker"):** Soil surface is dusty, cracked, and crumbles without clumping. *(Action: Refill Gator Bag).*
* **Rating 2 — Damp & Cool ("Wrung Sponge"):** Soil feels cool to the touch, dark in color, forms a temporary ball when squeezed but releases cleanly. *(Optimal).*
* **Rating 3 — Muddy / Saturated ("Muddy Puddle"):** Soil oozes water when gently pressed; standing puddles. *(Action: Verify drainage).*

---

## 4. Standardized Monitoring Schedules & Temporal Cadence

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 ANNUAL MONITORING CADENCE TIMELINE                               │
├──────────────┬──────────────────┬─────────────────────────────┬──────────────────────────────────┤
│ Cycle        │ Window           │ Primary Lead                │ Core Focus & Deliverable         │
├──────────────┼──────────────────┼─────────────────────────────┼──────────────────────────────────┤
│ Phase 1      │ Aug 15 – Sep 15  │ UTRGV & Lead Educators      │ Peak Heat Baseline Thermal Audit │
│ Phase 2      │ Oct 1 – May 15   │ Classroom STEM Cohorts      │ Monthly Outdoor Lab Rotations    │
│ Phase 3      │ Quarterly (Q1-Q4)│ TTFS Certified Arborist     │ Arboricultural Health & Risk     │
│ Phase 4      │ Post-Event       │ Facilities & Rapid Response │ Severe Weather Impact Assessment │
└──────────────┴──────────────────┴─────────────────────────────┴──────────────────────────────────┘
```

### 4.1 Phase 1: Back-to-School Baseline Thermal Audit (August 15 – September 15)
* **Timing:** Conducted during peak annual ambient temperatures (1:00 PM – 3:00 PM CST).
* **Scope:** Comprehensive radiometric mapping of all 14 project campuses.
* **Deliverable:** Update baseline Urban Heat Island vulnerability indices and Average Daily Attendance (ADA) financial exposure models.

### 4.2 Phase 2: Monthly Student Outdoor STEM Labs (October – May)
* **Cadence:** Executed once per month by participating 3rd–5th grade science classes during designated 45-minute inquiry blocks.
* **Activities:** 4-zone thermal matrix logging, trunk caliper tracking, mulch donut inspections, and wildlife observation.
* **Deliverable:** Real-time upload into `teks_sandbox.html` and `tree_diary.html`.

### 4.3 Phase 3: Quarterly Certified Arborist Health Audits
* **Cadence:** Executed quarterly (September, December, March, June) by TTFS ISA-Certified Arborists.
* **Activities:** Complete tree risk assessment (TRAQ standard), pest/disease pathology evaluation, structural pruning, and mulch collar remediation.

### 4.4 Phase 4: Post-Severe-Weather Event Contingency Protocols
Triggered within 72 hours of any of the following regional climatic anomalies:
1. **Hard Freeze Event ($T < 28^\circ\text{F}$ for $> 6$ hours):** Inspect foliage for cold necrosis; verify bark split integrity on young Live Oaks and Anacua.
2. **Tropical Storm / Gale Wind Event (Wind gusts $> 45\text{ mph}$):** Inspect structural scaffold limbs for branch tears, root-plate heaving, or trunk leaning.
3. **Extended Drought ($> 30$ consecutive days without measurable precipitation):** Execute emergency root-drenching and evaluate vertisol soil shrinkage cracks.

---

## 5. Quality Assurance & Quality Control (QA/QC) Protocols

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               QA/QC DATA VALIDATION BOUNDARIES                                   │
├──────────────────────────────┬──────────────────┬──────────────────┬─────────────────────────────┤
│ Field Parameter              │ Min Permitted    │ Max Permitted    │ Action on Breach            │
├──────────────────────────────┼──────────────────┼──────────────────┼─────────────────────────────┤
│ Asphalt Surface Temp (°F)    │ 70.0 °F          │ 185.0 °F         │ Flag outlier; repeat scan   │
│ Shaded Ground Temp (°F)      │ 55.0 °F          │ 120.0 °F         │ Verify full canopy shade    │
│ Cooling Delta (ΔT °F)        │ 0.0 °F           │ 75.0 °F          │ Re-measure both zones       │
│ Trunk Caliper DBH (in)       │ 0.5 in           │ 55.0 in          │ Check measuring tape units  │
│ Canopy Spread Radius (ft)    │ 1.5 ft           │ 45.0 ft          │ Verify pace calibration     │
└──────────────────────────────┴──────────────────┴──────────────────┴─────────────────────────────┘
```

### 5.1 Triplicate Sampling Protocol
To eliminate single-point sensor anomalies or shadow flicker artifacts:
* For each surface zone (Asphalt, Turf, Grass, Tree Shade), the *Thermal Scout* must collect **three (3) independent readings** spaced 3 feet apart.
* The *Field Scribe* records the median value on the field sheet.

### 5.2 5-Point Arborist Tree Health Rating Standard
When evaluating tree vitality in `tree_diary.html` or arborist inspection sheets, evaluate using this standardized rubric:

```text
┌─────┬──────────────┬─────────────────────────────────────────────────────────────────────────────┐
│ Pts │ Health Class │ Physical & Pathological Criteria                                            │
├─────┼──────────────┼─────────────────────────────────────────────────────────────────────────────┤
│  5  │ EXCELLENT    │ Full vigorous canopy; zero deadwood; healthy annual terminal growth > 12";  │
│     │              │ trunk bark clean with no mechanical damage; root collar properly exposed.   │
│  4  │ GOOD         │ Canopy intact (> 90% full foliage); minor twig dieback < 10%; minor wound   │
│     │              │ callusing cleanly; normal seasonal leaf color.                              │
│  3  │ FAIR         │ Crown dieback 10%–25%; sparse foliage; minor insect/mite feeding; superficial│
│     │              │ bark damage from weed-eaters; slightly compacted root zone.                 │
│  2  │ POOR         │ Severe canopy dieback 25%–50%; large dead scaffold limbs; trunk wood decay   │
│     │              │ or fungal fruiting bodies; severe mulch volcano; immediate care required.   │
│  1  │ CRITICAL     │ > 50% dead crown; structural trunk split or root failure; severe systemic   │
│     │ / DEAD       │ decline. Flagged for immediate arborist removal/replacement review.         │
└─────┴──────────────┴─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Digital Ingestion, Offline Sync & Dashboard Pipeline

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 DIGITAL DATA INGESTION PIPELINE                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│   [ Student Field Worksheets ]                                                                   │
│                │                                                                                 │
│                ▼ (Classroom Aggregation)                                                         │
│   [ Teacher Desktop / Tablet ] ──────► [ IndexedDB Local Queue ] (Offline Field Mode)            │
│                │                                │                                                │
│                ▼ (Network Online)               ▼ (Auto-Sync on Reconnect)                       │
│   [ Cool Schools Dashboard Hub ] ───► [ Service Worker Cache ]                                   │
│                │                                                                                 │
│                ├────────────────────────┬────────────────────────┐                               │
│                ▼                        ▼                        ▼                               │
│     [ teks_sandbox.html ]      [ tree_diary.html ]     [ district_comparison.html ]              │
│       • Live Histograms          • 10-Yr Growth Curve    • Satellite UHI Ranking                 │
│       • STAAR Math Deltas        • Cohort Legacy Log     • TFS Grant CSV/GeoJSON                 │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.1 Step-by-Step Teacher Classroom Ingestion Procedure
1. **Step 1 — Sheet Collection:** Teacher collects completed *Outdoor Science Lab Field Sheets* from team scribes upon returning indoors.
2. **Step 2 — Portal Launch:** Open `teks_sandbox.html` or `tree_diary.html` on the classroom computer or interactive SMART Board.
3. **Step 3 — Batch Entry:** Input aggregate class numbers:
   * Select Campus & Enter Classroom Cohort Identifier (e.g., *"Runn Elem - Room 104"*).
   * Enter Average Asphalt Temp (°F) and Tree Shade Temp (°F).
   * Enter Measured Trunk DBH (inches) and Soil Moisture rating.
4. **Step 4 — Automated Processing:** The system automatically executes:
   * Generates real-time comparative bar charts.
   * Calculates carbon sequestration rates ($C_{\text{seq}}$ in lbs $\text{CO}_2$/yr) using adapted regional i-Tree Eco growth equations.
   * Logs entry into the campus permanent timeline.

### 6.2 Offline Field Operation & PWA Synchronization (`offline_sync.js`)
* When operating on remote campus fields outside Wi-Fi range, the Progressive Web App (PWA) activates `offline_sync.js`.
* Data entries are committed locally to the browser's persistent `IndexedDB` storage.
* Upon reconnecting to the school network, a background sync listener flushes pending records to the central dashboard repository with zero user intervention.

### 6.3 Export & Grant Reporting Capabilities
* In `district_comparison.html`, authorized users can generate:
  * **1-Click CSV Export:** Tabular summary of all campus metrics for district CFOs and school board briefings.
  * **GeoJSON Centroid Export:** Spatial boundaries and tree coordinates for Texas A&M Forest Service GIS specialists and UTRGV researchers.

---

## 7. Technical Assistance (TA), Escalation & Client Handoff

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               TECHNICAL ASSISTANCE WORKFLOW                                      │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│   District Inquiry / Issue ──► Logged in TA Portal ──► Categorized (Pedagogy/Tech/Arborist)      │
│                                                                   │                              │
│   Resolution Delivered (Within 24–48 Hrs) ◄───────────────────────┘                              │
│            │                                                                                     │
│            ▼                                                                                     │
│   Documented in Monthly TFS Grant Deliverable Report                                             │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 7.1 Technical Assistance Response SLA
All district inquiries regarding hardware malfunctions, replacement batteries, curriculum assistance, or dashboard data questions submitted via the Technical Assistance Log are bound by a **strict 24-hour intake / 48-hour resolution Service Level Agreement (SLA)**.

### 7.2 Arboricultural Emergency Escalation Triggers
Immediately notify the TTFS Urban Forestry Lead upon discovering:
1. **Critical Structural Hazard:** Major split limbs hanging over student walkways or playgrounds (*Immediate yellow caution tape perimeter required*).
2. **Irrigation Line Failure:** Broken drip emitters or dry Gator Bags during summer heat advisory periods.
3. **Severe Bark Beetle / Fungal Infection:** Visible frass, boring holes, or bracket fungi on main trunks.

### 7.3 Client Handoff & IT Governance Package
To fulfill the project's Handoff Mandate:
* All documentation, schemas, and source code are delivered fully self-contained.
* Texas Trees Foundation IT staff can host the static client application on standard web infrastructure (Apache, Nginx, GitHub Pages, or AWS S3) with zero recurring licensing dependencies or vendor lock-in.

---

## 8. Appendix: Field Inspection Checklists & Quick-Reference

### 8.1 Pre-Lab Educator Quick-Checklist
- [ ] 2× Handheld IR Thermometers checked for battery level and Class II laser function.
- [ ] 2× Flexible DBH caliper measuring tapes on hand.
- [ ] 1× Printed *Student Field Worksheet* per 5-student team on clipboards.
- [ ] Water bottles and sun protection verified for all students.
- [ ] Safety briefing completed: *"Lasers point down only; never touch scorching blacktop."*

### 8.2 End-of-Day Data Verification Checklist
- [ ] All team field sheets verified for zero student PII (cohort codes used exclusively).
- [ ] Data entries submitted into `teks_sandbox.html` or `tree_diary.html`.
- [ ] Offline sync status verified as "Synced / Green".
- [ ] Instruments powered down and safely stowed in campus STEM storage cabinet.
