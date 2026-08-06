# Cool Schools Vlog Research & Script
*This document tracks dashboard design research and provides media production scripts for the Texas Trees Foundation's Cool Schools program.*

## Vlog Script: "Hyper-Local Green Tech on Campus"
**Format:** Two-column storyboard (A/V) for easy recording.

| Visual / Video Cues | Audio / Voiceover Script |
| :--- | :--- |
| **[0:00 - 0:15] Intro Hook**<br>Host (Desiderio) on camera, standing in front of a newly planted tree or on a school campus. High energy, friendly. | "What does it take to turn a school campus into a living, breathing climate shield? Welcome back, everyone. Today, we're talking about hyper-local green tech—the exact philosophy driving our Cool Schools program." |
| **[0:15 - 0:45] The Big Picture**<br>Cut to a screenshot or screen recording of our campus canopy dashboard (e.g., Mercedes or Donna ISD mapping). | "We aren't just planting trees; we are building a digital and physical ecosystem. In our research this week, we looked at a dashboard approach to understanding tree canopy cover. Think about it: a live, interactive map that tracks how every single branch fights urban heat." |
| **[0:45 - 1:15] Hyper-Local Impact**<br>Cut back to the host, holding a leaf or gesturing to the school courtyard. | "We're taking inspiration from innovators who are proving that change starts small. It's about taking the story of seven cut trees and turning it into a roadmap for greener cities. That 'hyper-local' focus is exactly how we empower our schools and our students." |
| **[1:15 - 1:30] Call to Action**<br>Host smiling, pointing to the screen overlay with a URL. | "Next up, we're diving deeper into our dashboard designs—and we want your feedback! What data points matter most to you? Drop a comment below, and let's keep greening South Texas together. See you in the next vlog!" |

---

## Cool Schools Dashboard & Media Research Board
*Below is the structured index of the videos we've collected, including direct takeaways and program alignment notes.*

### 1. Giles Knight - A dashboard approach to understanding urban tree canopy cover
* **Category / Focus:** Urban Canopy Coverage
* **Takeaway (Desiderio):** Primo, super good. Focuses on the macro-to-micro dashboard approach for tracking canopy cover over time. Action: Keep this at the top of our design inspirations.
* **Status:** HIGH PRIORITY (Integrating into canopy.html)

### 2. From 7 Cut Trees to Greener Cities: My Journey in Hyper-Local Green Tech
* **Category / Focus:** Urban Canopy / Community Tech
* **Takeaway (Desiderio):** Touched my heart. The phrasing 'hyper-local green tech' is the absolute essence of our Cool Schools program. A great case study we can get endless miles of content and inspiration out of.
* **Status:** HIGH PRIORITY (Dashboard narrative reference)

### 3. i-Tree Canopy - Classify Sample Points
* **Category / Focus:** Surface Classification & Grid Design
* **Takeaway (Desiderio):**
    * *Dashboard Layout Strategy:* School campus layouts can be structured using high-resolution grids of 1-meter zones/polygons to map surface classifications. This allows for detailed thermal/surface temperature analysis.
    * *Ground-Truth Verification:* Establish on-ground verification protocols to classify existing surfaces (e.g., grass, asphalt, canopy).
    * *Custom Mobile/Web Utility:* Create a custom web/mobile application for field teams, researchers, and students to record coordinates, tree counts, and ground observations. This data will sync directly into a master dataset feeding the dashboard map (e.g., treeObservations and schoolAreas in config.js).
* **Status:** HIGH PRIORITY (Ground-truth verification tool & grid layout design)

### 4. Power BI as an Environmental Sensitivity Mapping tool
* **Category / Focus:** Environmental Baselines
* **Takeaway:** Uses Power BI for mapping environmental sensitivity. A helpful reference for advanced data layer structures.
* **Status:** Pending User Feedback (Ask Desiderio about interest in Power BI workflows)

### 5. AAFM Environmental Benefits Baseline Report User Guide
* **Category / Focus:** Environmental Baselines
* **Takeaway:** A guide to regional baseline reporting dashboards. Shows how to present scientific data to a broad community audience.
* **Status:** Pending User Feedback (Ask Desiderio about reporting styles)

### 6. Kids and Data - Play with Shapes - Tableau for Kids
* **Category / Focus:** Dashboards for Kids
* **Takeaway:** Tableau concepts broken down into simple, shape-based visualizations for children.
* **Status:** Pending User Feedback (Ask Desiderio about student curriculum ideas)

### 7. My New Home Assistant Dashboard To Make Plex Kid-Friendly
* **Category / Focus:** Dashboards for Kids
* **Takeaway:** Focuses on simplified UI/UX and visual navigation designed specifically for child accessibility.
* **Status:** Pending User Feedback (Ask Desiderio about kid-friendly dashboard UI)

### 8. Let's Make a Dashboard - Box Car
* **Category / Focus:** Dashboards for Kids
* **Takeaway:** A physical cardboard crafting activity for building toy dashboards with children.
* **Status:** Pending User Feedback (Ask Desiderio if physical school crafts are of interest)

---

## UTRGV Parallel Mock Zone Strategy
**Objective:** To circumvent administrative and physical campus access limitations by establishing a parallel, fully featured "sandbox" zone at the University of Texas Rio Grande Valley (UTRGV) campus. This zone will serve as our primary staging ground for prototyping, testing, and verifying our cool school dashboard elements.

**Staging & Testing Focus Areas:**
* **Feature Prototyping:** Implement and test interactive dashboard elements (like the swipe map, temperature sliders, and growth projections) using UTRGV campus data before pushing updates live to public school school profiles.
* **Sensor & IR Calibration:** Match ground-level infrared thermometer readings with aerial thermal satellite (LST) and drone-based imagery to establish accurate calibration formulas.
* **Data Pipeline Testing:** Prototype the collection of real-time data from field teams, streaming it into a master GeoJSON/JSON dataset feeding the web map.

### To-Do List: UTRGV "Cool Zone" Prediction & Verification Experiment
*This experiment combines remote predictive analysis with physical ground-truth verification.*
1. **Step 1: Predict the Coolest Zone via i-Tree Canopy**
    * Run remote predictive GIS analysis on the UTRGV campus map using existing canopy cover data, albedo levels, and shade patterns.
    * Predict the coldest coordinates on campus during peak summer heat (e.g., 2 PM to 4 PM).
2. **Step 2: Mobilize the Field Team & Log Coordinates**
    * Organize campus photos of developed "cool zones" (e.g., mature oak groves, shaded patios) into our Idea/Vision board.
    * Prepare a target list of 3-5 predicted cool locations on campus and export their GIS coordinates.
3. **Step 3: Deploy Ground-Truthing Verification**
    * Physically visit the coordinates during peak hours to take real-time surface and air temperature readings.
    * Test temperature variations between shaded turf, unshaded turf, asphalt, and concrete.
4. **Step 4: Analyze, Document, & Vlog the Process**
    * Compare actual ground-level temperature drops against remote predictions.
    * Write up a field report comparing predicted vs. verified results and record a follow-up vlog showing the process in action.

---

## Technical Instruction Sheet: Community Science Ground-Truthing Protocol
**Target Audience:** Jorge, students, and community scientists.
**Purpose:** Standardizing high-resolution surface and temperature data collection for integration into the Cool Schools Master Dataset.

**Phase 1: Pre-Field Equipment & Preparation**
* **Thermal Measurement:** Handheld Infrared (IR) Thermometer (calibrated and set to Fahrenheit).
* **Location Tracking:** Smartphone with a GPS coordinate logger app or the custom Cool Schools Web Utility.
* **Metadata Sheet:** Physical clipboard or digital logging form.

**Phase 2: In-Field Data Collection Procedure**
1. **Locate Your 1-Meter Grid Target:**
    * Stand exactly at your assigned coordinate point (or within the designated 1-meter polygon).
2. **Record Spatial Metadata:**
    * Open your coordinate app and log the exact Latitude/Longitude (minimum of 5 decimal places for accuracy, e.g., 26.16751, -98.07062).
3. **Classify the Surface Material:**
    * Identify and record the surface category: Asphalt, Concrete, Bare Soil, Grass/Turf, Mulch, or Tree Canopy Cover.
4. **Take Temperature Readings (Peak Hours recommended):**
    * Hold the IR thermometer approximately 1 meter above the surface, point it straight down, and pull the trigger.
    * Take three readings at slightly different spots within your 1-meter zone and record the average.
    * *If under a tree:* Take a surface temperature reading in the shade, and then take a reading 5 meters away in full sun on the same material (e.g., asphalt vs. shaded asphalt) to measure the "canopy cooling drop."

**Phase 3: Master Data Logging & Submission**
* Open the Cool Schools Data Upload Utility.
* Input your name (Observer), Date, Time of Day, Coordinates, Surface Class, Surface Temp, and Shade Temp.
* Submit the form to sync with the master dataset. This data will automatically render in the dashboard's treeObservations and schoolAreas layers.

---

## Heliodon Solar & Shadow Simulation in Landscape Architecture
**What is a Heliodon?** A Heliodon is an analog mechanical device or a computational simulation tool that models the sun's path to analyze shading and solar exposure on physical models of buildings and landscapes. Physical heliodons date back to the 1930s (popularized by architect Henry Wright Jr. at Columbia University) and are adjusted along three solar geometry axes: Latitude, Day of Year (solar declination), and Time of Day (solar azimuth).

**History of Heliodons in Tree Planting and Landscape Design**
* **Passive Solar and Bioclimatic Design:** Historically, architects and landscape designers used physical models of miniature trees, trellises, and buildings on a pivoting heliodon table under a single parallel light source to study shadow movements. This helped design "bioclimatic envelopes" and shade structures to naturally reduce thermal loads without mechanical systems.
* **Modern "Shade Prints" for Canopy Optimization:** Today, landscape architects use digital Heliodon tools (integrated into software like CAD, Vectorworks, and custom WebGIS engines) to create shade prints. A shade print layers shadow projections across multiple hours, days, or months to:
    1. **Determine Plant Suitability:** Identifying micro-climates on campus to place shade-resilient species in low-sun areas and solar-loving plants in high-sun areas.
    2. **Map Human Thermal Comfort:** Ensuring that play areas, sandpits, outdoor classrooms, and school benches are covered by tree shadows at peak high-use hours (e.g., 12 PM to 3 PM recess) rather than wasting shade on empty areas.

**Cool Schools Dashboard Implementation Concept**
By adding a digital Heliodon layer to the dashboard, we can let users (and students) slide through hours of the day and months of the year to watch the predicted 3D canopy shadows move across the campus in real-time. This turns the dashboard into a living solar responsive design tool.

**Supplementary Heliodon Research Videos (Added to Research Board)**
* **What is a Heliodon? ☀️ The Machine That Simulates the Sun!** A quick animated visual overview showing how physical heliodons replicate the Ptolemaic perspective of the solar beam relative to scale models.
* **Heliodon Assessing Shadows on Adjoining Buildings:** A technical walkthrough demonstrating digital heliodon tools in design software to calculate, visualize, and analyze precise shadow impacts over space and time.

**Active To-Do List: Heliodon Dashboard Staging**
1. **Step 1: Prototype a Solar Shadow Engine**
    * Research lightweight 3D web rendering libraries (such as Three.js or SVG shadow projections) to build an interactive, time-of-day shadow-casting slider for the UTRGV parallel zone.
2. **Step 2: Collect Foliage and Canopy Height Data**
    * Document average branch height, tree form shapes (e.g., spreading live oak vs. tall live oak), and foliage density parameters to feed accurate shadow projections into the code.
3. **Step 3: Map Playground & Bench High-Use Recess Areas**
    * Overlay high-use student zones (playground equipment, picnic tables) with our Heliodon models to verify if existing and proposed planting sites cast shade exactly where and when children gather.

---

## Art & Photography Historical Initiatives in the RGV
Several historical and current initiatives in the Rio Grande Valley (RGV) over the past several decades have bridged conservation, community reforestation, and artistic expression.

### 1. "Last Poet in the Woods: Eco-Tapestry of Art and Poetry" Exhibit (February 2025)
* **Overview:** A prominent eco-art and poetry collaboration showcased at the historical Spanish Revival mansion at [Quinta Mazatlán](https://truchargv.com/a-taste-of-the-last-poet-in-the-woods-exhibit-an-ekphrastic-journey-through-art-and-nature/) in McAllen. The exhibit was co-sponsored as part of UTRGV's annual FESTIBA (Festival of International Books and Arts).
* **The Intersect of Trees and Art:** Created by UTRGV Creative Writing Professor Dr. Steven P. Schneider and watercolorist Reefka Schneider, the exhibit was inspired by Edward O. Wilson’s concept of "biophilia" and Richard Louv’s book *Last Child in the Woods*. It featured an ekphrastic journey (poetry written in direct response to visual art) showcasing watercolor paintings of wooded trails, old-growth forests, and seasonal landscapes alongside evocative nature poems.
* **Community Engagement:** Visitors participated in interactive writing activities on parchment paper with tree-bark pencils, using prompt cards to reflect on how regional nature inspires artistic expression.
* **Sources:** ["A Taste of the Last Poet in the Woods" Eco-Art and Poetry Exhibit](https://truchargv.com/a-taste-of-the-last-poet-in-the-woods-exhibit-an-ekphrastic-journey-through-art-and-nature/) \| [Events — Poetry-Art](https://poetry-art.com/category/events/)

### 2. "Nature of the Valley" Fine Art & Poetry Exhibition (April 2019 / April 2020)
* **Overview:** A multi-medium artistic campaign sponsored by the UTRGV School of Art in collaboration with the South Texas Border Chapter of the Texas Master Naturalists (STBCTMN) during FESTIBA.
* **The Intersect of Trees and Art:** The primary mission of this repeating exhibition, hosted at the Edinburg Campus Charles & Dorothy Clark Gallery, was to leverage visual fine arts and poetry to raise public awareness about the beauty, preservation, and ecological conservation of the native ecosystems and flora of the Rio Grande Valley.
* **Sources:** [Pre-FESTIBA Events — UTRGV](https://www.utrgv.edu/festiba/_files/documents/19107-gcr-festiba-weekbooklet-4.pdf) \| [Nature of the Valley — STBCTMN](https://www.stbctmn.org/post/nature-of-the-valley)

### 3. "Rio Reforestation" Annual Community Campaign (1994 – Present)
* **Overview:** The signature habitat restoration campaign of the Lower Rio Grande Valley National Wildlife Refuge. Having recently celebrated its 31st annual planting in October 2025, this project represents one of the longest-running community conservation efforts in South Texas.
* **Campaign Scope:** Because less than 10% of the native subtropical Tamaulipan thornforest remains in the RGV, the campaign mobilizes over 700 local volunteers annually to plant upwards of 10,000 native tree and shrub seedlings (such as Texas ebony, wild olive, and fiddlewood) on former agricultural fields (like the Milagro Tract), actively expanding wildlife corridors. UTRGV students, staff, and faculty regularly support and coordinate volunteer teams.
* **Sources:** [31st Annual Rio Reforestation Community Planting](https://ez.utrgv.edu/need/detail/?need_id=1146186) \| [Rio Reforestation — U.S. Fish & Wildlife Service](https://www.fws.gov/refuge/lower-rio-grande-valley/rio-reforestation)

### 4. UTRGV "Tree Campus" Higher Education Campaign (Ongoing)
* **Overview:** A long-term campus greening and data-collection campaign managed by UTRGV Facilities Planning and Operations alongside the Office for Sustainability. The university has earned consecutive designations by the Arbor Day Foundation for over a decade.
* **Campaign Scope:** The campaign focuses on planting native species, such as Cedar Elms, and engaging local youth in environmental education (e.g., plantings with the UTRGV Child Development Center). It also incorporates computational tracking, where students map, measure, and analyze the specific cooling and microclimate benefits of local tree canopies.
* **Sources:** [UTRGV Marks Ninth Tree Campus Designation with Arbor Day Plantings](https://www.utrgv.edu/newsroom/2022/11/22-utrgv-marks-ninth-tree-campus-designation-with-arbor-day-plantings.htm) \| [10 Years of Counting Campus Trees — UTRGV](https://www.utrgv.edu/newsroom/2024/12/6/ten-years-of-counting-campus-trees.htm)

---

*These programs demonstrate a rich historical precedent of combining South Texas ecology with artistic advocacy, community-led plantings, and regional research.*

---

## Additional RGV Art & Conservation Initiatives (AI Researched)
*I acted as your researcher and dug into the archives to find even more historical and current overlaps between art and trees in the Valley to add to your list!*

### 5. Quinta Mazatlán "Tiny Forests" & "Destino Monarca" (Current)
* **Overview:** Quinta Mazatlán in McAllen hosts "Tiny Forests" (microforests) that serve as living laboratories for students, alongside commissioning public art such as the massive "Destino Monarca" mural.
* **The Intersect of Trees and Art:** These microforests directly inspire creative writing, journaling, and art projects for youth, blending environmental monitoring with artistic reflection. The mural work raises massive public awareness for native pollinators that rely on the local tree canopy.
* **Sources:** [Quinta Mazatlan Conservation](https://quintamazatlan.com)

### 6. The Rio Grande Valley Birding Festival Art Advocacy (Ongoing)
* **Overview:** A major annual eco-tourism event in the RGV that heavily incorporates regional conservation artists to promote habitat preservation.
* **The Intersect of Trees and Art:** Artists like Terrilyn Alaniz create specific illustrations of native foliage, trees, and wildlife to raise funds and awareness for habitat preservation, demonstrating how visual arts drive regional ecotourism and conservation efforts.
* **Sources:** [RGV Birding Festival](https://www.rgvbf.org)

### 7. Carol Cullar's Rio Grande Corridor Advocacy (Historical)
* **Overview:** A prominent regional artist, publisher, and writer who dedicated her work to the ecology of the Rio Grande.
* **The Intersect of Trees and Art:** Cullar combined wildlife printmaking with poetry, prose, and direct environmental advocacy to educate the public on the necessity of preserving the river corridor's native thornscrub habitats.
* **Sources:** [Texas Legacy Project - Carol Cullar](https://texaslegacy.org)
