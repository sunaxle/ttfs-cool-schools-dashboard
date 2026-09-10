/**
 * TEKS Forest Literacy Knowledge Graph & Learning Engine
 * Implements Directed Acyclic Graph (DAG) state, topological sorting, 
 * prerequisite unlocking, and multi-track filtering for Khan Academy-style learning.
 *
 * @project Texas Trees Foundation & UTRGV Cool Schools Project
 * @version 2.0.0
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ForestKnowledgeGraph = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const GRAPH_DATA = {
    metadata: {
      framework: "Comprehensive TEKS Forest Literacy Architecture",
      version: "2.0.0",
      tiers: [
        { id: "all", label: "🌟 All Pathways", desc: "View full interconnected system" },
        { id: "k2", label: "🌱 K–2 Primary", desc: "Foundational sensory & anatomy exploration" },
        { id: "3_5", label: "🌿 3–5 Elementary", desc: "Food webs, geometry & indigenous ethnobotany" },
        { id: "6_8", label: "🌳 6–8 Middle School", desc: "Thermodynamics, carbon & clinometers" },
        { id: "9_12", label: "🌲 9–12 High School", desc: "Agroecology, APES allometry & heat equity" },
        { id: "community", label: "🏡 Parent & Community", desc: "Bilingual home shade, ollas & pechita" },
        { id: "college", label: "🔬 Higher Ed & Grad", desc: "PM2.5 calibration, WBGT & epidemiology" },
        { id: "spiritual", label: "🧘 Spiritual & Cultural", desc: "Shinrin-yoku, sacred cypress & ethics" }
      ],
      subjects: [
        { id: "all", label: "All Subjects" },
        { id: "Science", label: "Science (3D TEKS)" },
        { id: "Mathematics", label: "Mathematics" },
        { id: "Social Studies", label: "Social Studies & History" },
        { id: "ELAR", label: "ELAR & Journaling" },
        { id: "Fine Arts", label: "Fine Arts" },
        { id: "Health & PE", label: "Health & Thermoregulation" },
        { id: "Interdisciplinary", label: "Community & Hands-on" },
        { id: "Environmental Engineering & Public Health", label: "Engineering & Health" },
        { id: "Atmospheric Physics & Agroecology", label: "Atmospheric Physics" },
        { id: "Environmental Epidemiology", label: "Epidemiology" },
        { id: "Contemplative Ecology & Well-being", label: "Contemplative Ecology" },
        { id: "Cultural Heritage & Philosophy", label: "Cultural Heritage" },
        { id: "Environmental Philosophy", label: "Environmental Ethics" }
      ],
      plt_themes: [
        { id: 1, label: "Theme 1: What is a Forest?", color: "#2e7d32" },
        { id: 2, label: "Theme 2: Why Do Forests Matter?", color: "#0288d1" },
        { id: 3, label: "Theme 3: How Do We Sustain Our Forests?", color: "#ef6c00" },
        { id: 4, label: "Theme 4: What is Our Responsibility?", color: "#7b1fa2" }
      ]
    },
    nodes: [
      {
        id: "k2_tree_anatomy",
        title: "Parts of a Tree: Roots, Trunk, Crown & Bark",
        tier: "k2",
        tier_label: "K–2 Primary",
        subject: "Science",
        theme_plt: 1,
        theme_plt_label: "What is a Forest?",
        teks_codes: ["Science K.12A", "Science 1.12B", "Science 2.12B"],
        science_rtc: "Structure and Function",
        science_sep: "Planning and Conducting Descriptive Investigations",
        prerequisites: [],
        mastery_points: 100,
        summary: "Discover the four vital structures of a tree—roots that drink and anchor, a trunk that supports, bark that protects like skin, and leaves that create food.",
        hook: "Did you know that a tree wears a suit of armor just like a knight? It's called bark!",
        theory: "A tree is a tall, woody plant built of four interconnected systems. Roots spread underground like anchors and sponges. The trunk acts as a sturdy highway carrying water upward. Bark protects delicate inner layers from blistering South Texas heat and insects. The crown holds thousands of green solar panels called leaves.",
        lab: "Take a magnifying glass outdoors. Hug a campus Honey Mesquite or Live Oak. Feel the rough bark grooves, search for surface root anchors, and observe leaf clusters in the canopy.",
        quiz: {
          question: "Which part of the tree acts like a giant sponge and anchor beneath the soil?",
          options: ["The green leaves", "The root system", "The upper branches", "The outer bark"],
          correct_index: 1,
          explanation: "Roots grow deep into the ground to anchor the tree securely and drink water and nutrients from the soil."
        },
        citations: ["Project Learning Tree (2020) Theme 1: Concept 1.A.1", "Texas A&M Forest Service: Trees of Texas Guide"]
      },
      {
        id: "k2_leaf_detective",
        title: "Leaf Shapes, Textures & Simple Patterns",
        tier: "k2",
        tier_label: "K–2 Primary",
        subject: "Science",
        theme_plt: 1,
        theme_plt_label: "What is a Forest?",
        teks_codes: ["Science 1.12A", "Science 2.12A"],
        science_rtc: "Patterns",
        science_sep: "Collecting and Recording Observational Data",
        prerequisites: ["k2_tree_anatomy"],
        mastery_points: 100,
        summary: "Investigate how native South Texas trees evolved tiny compound leaflets to survive extreme summer heat without wilting.",
        hook: "Why are some leaves wide like dinner plates while mesquite leaves look like tiny green feathers?",
        theory: "In hot climates like the Rio Grande Valley, giant leaves lose too much water through evaporation. Native trees like Honey Mesquite and Texas Ebony have compound leaves with dozens of tiny leaflets. These leaflets let wind pass through easily while conserving precious hydration.",
        lab: "Collect 5 fallen leaves from the ground. Use sorting mats to classify them into smooth vs rough margins and simple vs compound leaflet shapes.",
        quiz: {
          question: "Why do Honey Mesquite trees have lots of tiny leaflets instead of one giant leaf?",
          options: ["To hide from birds", "To conserve water and stay cool in hot weather", "To catch heavier rain", "Because they are baby trees"],
          correct_index: 1,
          explanation: "Tiny leaflets reduce water loss from desert evaporation and allow cooling breezes to pass through easily."
        },
        citations: ["TFS Trees of Texas Leaf Key", "PLT Activity 64: Looking at Leaves"]
      },
      {
        id: "k2_creature_habitats",
        title: "Who Lives in the Tree? Animal & Insect Homes",
        tier: "k2",
        tier_label: "K–2 Primary",
        subject: "Science",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Science K.13B", "Science 1.13A", "Science 2.13A"],
        science_rtc: "Systems and System Models",
        science_sep: "Communicating Explanations and Observations",
        prerequisites: ["k2_tree_anatomy"],
        mastery_points: 100,
        summary: "Uncover how a single campus tree is a bustling high-rise apartment building for Green Jays, cicadas, anoles, and honeybees.",
        hook: "Look up! You're standing underneath a multi-story hotel where the guests have wings, six legs, or green scales!",
        theory: "Trees provide shelter, food, nesting materials, and shade for diverse wildlife. Roots house burrowing beetles, the trunk provides shelter for woodpeckers and lizards, and the crown offers safety from ground predators.",
        lab: "Sit silently for 10 minutes with binoculars. Keep a tally of every bird, insect on bark, and lizard resting in the shade branches.",
        quiz: {
          question: "Which of the following is an example of an animal using a tree for shelter?",
          options: ["A fish swimming in a pond", "A bird building a nest on a sturdy branch", "A rock sitting on the ground", "A cloud making rain"],
          correct_index: 1,
          explanation: "Trees provide physical shelter, shade, and protection from predators for nesting birds and small mammals."
        },
        citations: ["PLT Activity 22: Trees as Habitats", "UTRGV Agroecology Campus Biodiversity Survey"]
      },
      {
        id: "k2_bark_rubbing_art",
        title: "Eco-Canvas: Bark Textures & Leaf Impressions",
        tier: "k2",
        tier_label: "K–2 Primary",
        subject: "Fine Arts",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Fine Arts 117.102.b.1.A", "Fine Arts 117.105.b.2.B"],
        science_rtc: "Patterns",
        science_sep: "Constructing Models and Artistic Artifacts",
        prerequisites: ["k2_tree_anatomy"],
        mastery_points: 100,
        summary: "Transform tactile bark topography and leaf venation into high-contrast crayon rubbings and printmaking art.",
        hook: "Every tree species has a fingerprint carved into its bark. Can your crayon capture it?",
        theory: "Artists use textures and natural patterns found in living flora to create visual balance. By rubbing flat wax across paper placed over rough bark ridges, the physical topography is transferred into print.",
        lab: "Tape heavy newsprint paper over Cedar Elm and Mesquite trunks. Rub unwrapped earth-tone crayons horizontally to build a comparative bark texture gallery.",
        quiz: {
          question: "What happens when you rub a crayon flat across paper pressed against rough tree bark?",
          options: ["The paper turns into wood", "The raised ridges of the bark create a visible texture pattern", "The tree loses its bark", "The crayon disappears"],
          correct_index: 1,
          explanation: "The raised ridges of the bark resist the crayon pressure, transferring the tree's unique fingerprint onto paper."
        },
        citations: ["PLT Activity 61: The Closer You Look", "Texas Trees Foundation Cool Schools Art Series"]
      },
      {
        id: "elem_food_webs",
        title: "Solar Energy Flow & Campus Food Webs",
        tier: "3_5",
        tier_label: "3–5 Elementary",
        subject: "Science",
        theme_plt: 1,
        theme_plt_label: "What is a Forest?",
        teks_codes: ["Science 3.12B", "Science 4.12B", "Science 5.12B"],
        science_rtc: "Energy and Matter: Cycles and Conservation",
        science_sep: "Developing and Using Conceptual Models",
        prerequisites: ["k2_creature_habitats"],
        mastery_points: 150,
        summary: "Trace how solar photons captured by green leaves cascade through caterpillars, Green Jays, Roadrunners, and decomposers in a campus web.",
        hook: "Did you know that every bite of energy a hawk eats originally fell from the Sun 93 million miles away?",
        theory: "Autotrophs (trees) perform photosynthesis, transforming radiant energy into glucose bonds. Herbivores consume leaves/seeds, carnivores consume herbivores, and decomposers recycle minerals back into fertile soil.",
        lab: "Conduct the Yarn Web of Life simulation. Stand in a circle with organism role cards passing yarn cords. Tug one strand to feel how removing trees destabilizes the entire ecosystem.",
        quiz: {
          question: "In a campus microforest ecosystem, what is the ultimate original source of all energy?",
          options: ["Soil fertilizer", "Sunlight captured by green leaves", "Rainwater puddles", "Decomposing leaf mulch"],
          correct_index: 1,
          explanation: "Photosynthesis captures radiant solar energy and transforms it into chemical glucose, feeding the entire food web."
        },
        citations: ["2024-2025 Revised Science TEKS 5.12B", "PLT Activity 45: Web of Life"]
      },
      {
        id: "elem_canopy_geometry",
        title: "Tree Geometry: Pacing, Shade Area & Radius",
        tier: "3_5",
        tier_label: "3–5 Elementary",
        subject: "Mathematics",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Math 3.6C", "Math 4.8C", "Math 5.4H"],
        science_rtc: "Scale, Proportion, and Quantity",
        science_sep: "Using Mathematics and Computational Thinking",
        prerequisites: ["k2_tree_anatomy"],
        mastery_points: 150,
        summary: "Calibrate your personal walking pace to calculate the circular cooling shade footprint cast by campus trees (Area = π * r^2).",
        hook: "Can you measure the size of a giant tree's cooling shadow without a 50-foot ruler? Yes—using your own two feet!",
        theory: "By calculating the average step pace in meters, students can pace out shadow radii in four cardinal directions (N, S, E, W). Applying the circle formula Area = π * r^2 yields total square meters of shaded ground.",
        lab: "Measure a 10-step baseline, calculate your pace length, pace out 4 shadow radii of a campus tree, compute shaded square footage, and compare with thermal thermometer gun readings.",
        quiz: {
          question: "If a mature Cedar Elm casts a circular shadow with a radius of 4 meters, what is its approximate shaded ground area? (Use π ≈ 3.14)",
          options: ["12.5 sq meters", "25.1 sq meters", "50.2 sq meters", "100.5 sq meters"],
          correct_index: 2,
          explanation: "Area = π * r^2 = 3.14 * (4)^2 = 3.14 * 16 = 50.24 square meters."
        },
        citations: ["Texas Trees Foundation Cool Schools Math Curriculum", "PLT Activity 67: How Big is Your Tree?"]
      },
      {
        id: "elem_indigenous_mesquite",
        title: "Roots of the RGV: Indigenous Ethnobotany & Mesquite",
        tier: "3_5",
        tier_label: "3–5 Elementary",
        subject: "Social Studies",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Social Studies 3.4A", "Social Studies 4.1A", "Social Studies 4.21A"],
        science_rtc: "Systems and System Models",
        science_sep: "Obtaining, Evaluating, and Communicating Information",
        prerequisites: ["k2_leaf_detective"],
        mastery_points: 150,
        summary: "Explore how Coahuiltecan and Karankawa peoples relied on the Honey Mesquite as a 'Tree of Life' for nutrient-rich pechita flour, medicine, and shade.",
        hook: "What if you could harvest sweet, cinnamon-tasting flour straight from tree branches in the middle of a blazing desert summer?",
        theory: "For thousands of years, indigenous South Texas communities sustainably harvested Honey Mesquite bean pods (*pechita*). Rich in protein and complex sugars, the pods were ground in stone mortars into sweet meal that sustained families without agricultural irrigation.",
        lab: "Inspect dry golden mesquite pods, snap them to observe the high-sugar pulp, grind pods in stone mortars, and taste traditional sweet mesquite flour.",
        quiz: {
          question: "Why was the Honey Mesquite tree known as a vital 'Tree of Life' for indigenous South Texas tribes?",
          options: [
            "It produced ripe nutrient-rich pods that could be stored and ground into sweet flour during hot dry summers",
            "It made fast-growing paper for books",
            "It only grew in freezing winter temperatures",
            "It was the only tree that produced metal tools"
          ],
          correct_index: 0,
          explanation: "Mesquite bean pods provided high-protein, sweet carbohydrates without requiring irrigation, sustaining indigenous communities through harsh droughts."
        },
        citations: ["Tull, D. (2013) Edible and Useful Plants of Texas", "UTRGV Center for Mexican American Studies Ethnobotany Archive"]
      },
      {
        id: "elem_nature_journaling",
        title: "Sensory Nature Journaling & Tree Poetry",
        tier: "3_5",
        tier_label: "3–5 Elementary",
        subject: "ELAR",
        theme_plt: 4,
        theme_plt_label: "What is Our Responsibility?",
        teks_codes: ["ELAR 3.11A", "ELAR 4.11A", "ELAR 5.11A"],
        science_rtc: "Patterns",
        science_sep: "Communicating Explanations and Scientific Ideas",
        prerequisites: ["k2_bark_rubbing_art"],
        mastery_points: 150,
        summary: "Develop vivid descriptive writing and sensory poetry in physical field notebooks while resting in campus microforest shade.",
        hook: "Close your eyes under a tree canopy. What does the wind smell like? What rhythm do the leaves dance to?",
        theory: "Nature journaling combines scientific observation with creative language. Deep sensory immersion under trees stimulates cognitive restoration and sharpens descriptive writing skills.",
        lab: "Complete the 15-minute 'Sit Spot' writing protocol. Choose a tree, observe in complete silence for 7 minutes tuning in to sounds and smells, then compose a structured Haiku or Cinquain.",
        quiz: {
          question: "Which sentence contains the strongest sensory imagery suitable for a field journal entry?",
          options: [
            "I saw a tree outside.",
            "The rough, checkered mesquite bark smelled like warm cedar as rustling leaves whispered in the southern breeze.",
            "Trees have green leaves that make shade.",
            "It was very hot today."
          ],
          correct_index: 1,
          explanation: "Sentence 2 uses sensory details (rough/checkered touch, warm cedar smell, whispering sound) to vividly transport the reader to the outdoor setting."
        },
        citations: ["PLT Activity 5: Poet-Tree", "John Muir Laws Nature Journaling Curriculum"]
      },
      {
        id: "elem_heat_safety",
        title: "Beat the Heat: Thermoregulation, Hydration & Shade",
        tier: "3_5",
        tier_label: "3–5 Elementary",
        subject: "Health & PE",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Health 3.1A", "Health 4.3B", "Health 5.3A"],
        science_rtc: "Cause and Effect: Mechanism and Explanation",
        science_sep: "Analyzing and Interpreting Observational Data",
        prerequisites: ["elem_canopy_geometry"],
        mastery_points: 150,
        summary: "Investigate how the human body regulates core temperature and audit how tree canopies lower asphalt heat by up to 35°F.",
        hook: "Why does an asphalt basketball court feel like a giant frying pan, while sitting under a tree feels like an air conditioner?",
        theory: "Children absorb environmental heat rapidly due to larger body surface-area-to-mass ratios. Black asphalt absorbs shortwave radiation, heating past 140°F. Tree leaves actively transpire moisture, dropping surface and ambient temperatures.",
        lab: "Conduct an Infrared Surface Temperature Audit. Measure asphalt courts, playground synthetic turf, and grass under tree shade with non-contact IR guns.",
        quiz: {
          question: "If the asphalt playground surface reaches 135°F at 1:00 PM, what is the best proactive health strategy for students?",
          options: [
            "Run faster on the blacktop",
            "Move physical activities to the shaded microforest lawn and drink water frequently",
            "Wear heavy black jackets",
            "Stop drinking water"
          ],
          correct_index: 1,
          explanation: "Moving to tree shade dramatically reduces radiant thermal load, while hydration replaces fluids lost to cooling sweat."
        },
        citations: ["Texas DSHS Heat Safety in Schools Guide", "UTRGV Cool Schools Public Health Brief"]
      },
      {
        id: "ms_photosynthesis_carbon",
        title: "Photosynthesis Thermodynamics & Carbon Sequestration",
        tier: "6_8",
        tier_label: "6–8 Middle School",
        subject: "Science",
        theme_plt: 1,
        theme_plt_label: "What is a Forest?",
        teks_codes: ["Science 6.12A", "Science 7.12C", "Science 8.12A"],
        science_rtc: "Energy and Matter: Cycles and Conservation",
        science_sep: "Constructing Explanations and Designing Solutions",
        prerequisites: ["elem_food_webs"],
        mastery_points: 200,
        summary: "Calculate how trees extract invisible atmospheric CO2 gas and lock it away into solid wood biomass over a 10-year campus lifecycle.",
        hook: "Where did a 2,000-pound oak tree come from if it started as a tiny 1-ounce acorn? From thin air!",
        theory: "During photosynthesis, plants split water molecules and fix carbon dioxide into glucose (6 CO2 + 6 H2O -> C6H12O6 + 6 O2). This carbon forms cellulose cell walls, locking away gigatons of carbon in wood biomass.",
        lab: "Use forestry calipers to measure tree DBH (Diameter at Breast Height). Apply USDA allometric multipliers to compute kilograms of sequestered carbon and annual CO2 offsets.",
        quiz: {
          question: "Where does the vast majority of the physical dry biomass of a growing tree originate?",
          options: [
            "From solid dirt absorbed by roots",
            "From carbon dioxide gas captured directly from the air during photosynthesis",
            "From raindrops",
            "From chemical fertilizers"
          ],
          correct_index: 1,
          explanation: "Trees build their solid cellular cellulose and lignin skeletons out of carbon atoms extracted directly from atmospheric CO2 gas during photosynthesis."
        },
        citations: ["USDA Forest Service i-Tree Eco Equations", "Nowak et al. (2006) Carbon Storage and Sequestration"]
      },
      {
        id: "ms_microclimate_physics",
        title: "Microclimate Thermodynamics & Albedo Effects",
        tier: "6_8",
        tier_label: "6–8 Middle School",
        subject: "Science",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Science 6.9A", "Science 7.9A", "Science 8.9C"],
        science_rtc: "Systems and System Models",
        science_sep: "Planning and Carrying Out Controlled Investigations",
        prerequisites: ["elem_heat_safety", "ms_photosynthesis_carbon"],
        mastery_points: 200,
        summary: "Differentiate between sensible heat flux and latent heat cooling to map urban heat island contours across campus grounds.",
        hook: "Why does a canvas shade umbrella still feel hot underneath, but a tree canopy feels cool and refreshing?",
        theory: "Surface albedo dictates how much solar radiation is reflected versus absorbed. Dark asphalt (albedo ~ 0.08) converts light into radiant sensible heat. Living vegetation transpires liquid water into vapor, absorbing heat through latent heat flux.",
        lab: "Walk a 200-meter microclimate transect from unshaded parking lot into the Cool Schools microforest, logging temperature and humidity every 25 meters.",
        quiz: {
          question: "How do tree leaves physically cool ambient air compared to a canvas shade sail?",
          options: [
            "Leaves blow fans with their branches",
            "Leaves undergo evapotranspiration, converting liquid water to water vapor and absorbing sensible heat as latent heat",
            "Leaves are made of cold ice crystals",
            "Leaves absorb all oxygen from the atmosphere"
          ],
          correct_index: 1,
          explanation: "Unlike inert canvas, living trees transpire gallons of water daily through stomata; the phase change from liquid to vapor actively chills surrounding ambient air."
        },
        citations: ["Oke, T. R. (1987) Boundary Layer Climates", "Texas Trees Foundation Urban Heat Study"]
      },
      {
        id: "ms_trig_tree_height",
        title: "Forestry Trigonometry: Clinometers & Tangent Ratios",
        tier: "6_8",
        tier_label: "6–8 Middle School",
        subject: "Mathematics",
        theme_plt: 3,
        theme_plt_label: "How Do We Sustain Our Forests?",
        teks_codes: ["Math 7.5C", "Math 8.7C", "Math 8.8D"],
        science_rtc: "Scale, Proportion, and Quantity",
        science_sep: "Using Mathematics and Computational Thinking",
        prerequisites: ["elem_canopy_geometry"],
        mastery_points: 200,
        summary: "Construct DIY protractor clinometers to solve right triangles: Height = (Distance * tan θ) + Eye Height.",
        hook: "How do professional foresters measure a 60-foot tree without climbing to the top with a tape measure?",
        theory: "Right triangle trigonometry allows us to calculate vertical heights using baseline distance and the angle of elevation: tan(θ) = Opposite / Adjacent. Adding observer eye height gives total tree height.",
        lab: "Construct a cardboard protractor clinometer with straw and weighted string. Stand 15 meters from a tree base, sight the top branch, read the angle, and calculate height.",
        quiz: {
          question: "A student stands 10 meters away from a Live Oak. Her clinometer reads 45°. If her eye height is 1.4 meters, how tall is the tree? (tan 45° = 1.0)",
          options: ["10.0 meters", "11.4 meters", "14.0 meters", "15.4 meters"],
          correct_index: 1,
          explanation: "Height = (Distance * tan 45°) + Eye Height = (10 * 1.0) + 1.4 = 11.4 meters."
        },
        citations: ["Texas A&M Forest Service Measuring Trees Field Guide", "PLT Activity 67"]
      },
      {
        id: "ms_urban_watersheds",
        title: "Urban Hydrology: Infiltration, Runoff & Root Porosity",
        tier: "6_8",
        tier_label: "6–8 Middle School",
        subject: "Science",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Science 6.10B", "Science 7.8C", "Science 8.11C"],
        science_rtc: "Systems and System Models",
        science_sep: "Planning and Carrying Out Investigations",
        prerequisites: ["ms_microclimate_physics"],
        mastery_points: 200,
        summary: "Measure how tree roots and organic mulch create macro-pores in compacted clay soil, preventing schoolyard flash flooding.",
        hook: "Where does all the rainwater go when a subtropical storm drops 3 inches of rain in 30 minutes?",
        theory: "Impervious surfaces channel stormwater rapidly into storm drains, carrying pollutants. Tree canopies intercept raindrops, slowing velocity, while deep root systems increase soil percolation and hydraulic conductivity.",
        lab: "Perform the Coffee-Can Infiltrometer Lab. Drive metal cylinders 5 cm into bare playground dirt vs mulched microforest soil, pour 500 mL of water, and time infiltration rates.",
        quiz: {
          question: "Why does rainwater soak into soil much faster under a mature tree canopy than on an open turf lawn?",
          options: [
            "Trees attract magnets in the water",
            "Root channels and organic leaf mulch create macro-pores that increase soil permeability and prevent compaction",
            "Turf grass has deeper taproots than trees",
            "Tree leaves boil the water into steam"
          ],
          correct_index: 1,
          explanation: "Tree roots break up compacted clay, and decomposing leaf litter creates spongy organic loam that rapidly absorbs stormwater."
        },
        citations: ["USDA Natural Resources Conservation Service Soil Health Guide", "i-Tree Hydro Technical Manual"]
      },
      {
        id: "hs_agroecology_systems",
        title: "Urban Agroecology & Tamaulipan Native Polycultures",
        tier: "9_12",
        tier_label: "9–12 High School",
        subject: "Science",
        theme_plt: 3,
        theme_plt_label: "How Do We Sustain Our Forests?",
        teks_codes: ["Biology 112.34.c.12B", "Environmental Systems 112.37.c.4E", "Aquatic Science 112.36.c.5B"],
        science_rtc: "Systems and System Models",
        science_sep: "Designing Solutions and Evaluating Trade-offs",
        prerequisites: ["ms_photosynthesis_carbon", "ms_urban_watersheds"],
        mastery_points: 250,
        summary: "Design multi-strata food forests utilizing nitrogen-fixing native legumes (Honey Mesquite, Texas Ebony, Retama) to regenerate urban soils.",
        hook: "Can we design an urban landscape that waters itself, fertilizes itself, resists extreme heat, and produces edible food?",
        theory: "Monoculture lawns demand heavy synthetic fertilizers and irrigation. Tamaulipan native polycultures mimic natural ecological succession. Symbiotic Rhizobium bacteria in legume root nodules convert atmospheric N2 into plant-available ammonium without synthetic chemicals.",
        lab: "Conduct a root nodule and polyculture strata audit. Extract gentle root core samples of wild legumes to identify pink leghaemoglobin-active Rhizobium nodules.",
        quiz: {
          question: "How do native leguminous trees like Texas Ebony naturally fertilize poor urban soils?",
          options: [
            "They absorb nitrogen through leaf stomata",
            "They harbor symbiotic Rhizobium bacteria in root nodules that fix atmospheric N2 into bioavailable ammonium (NH4+)",
            "They manufacture synthetic chemical pellets",
            "They kill surrounding weeds with poison"
          ],
          correct_index: 1,
          explanation: "Symbiotic bacteria in legume root nodules convert inert atmospheric N2 gas into nitrogen compounds that nourish the tree and adjacent plants."
        },
        citations: ["Gliessman, S. R. (2014) Agroecology: The Ecology of Sustainable Food Systems", "UTRGV Agroecology Research Program"]
      },
      {
        id: "hs_environmental_justice",
        title: "Environmental Justice, Redlining & Urban Heat Equity",
        tier: "9_12",
        tier_label: "9–12 High School",
        subject: "Social Studies",
        theme_plt: 4,
        theme_plt_label: "What is Our Responsibility?",
        teks_codes: ["World Geography 113.43.c.16C", "World History 113.42.c.28E", "Environmental Systems 112.37.c.9D"],
        science_rtc: "Cause and Effect: Mechanism and Explanation",
        science_sep: "Engaging in Argument from Evidence",
        prerequisites: ["ms_microclimate_physics"],
        mastery_points: 250,
        summary: "Analyze GIS overlays correlating 20th-century urban disinvestment with modern canopy deficits, high surface temperatures, and pediatric health disparities.",
        hook: "Why is one neighborhood in a Texas city 10°F hotter than another neighborhood just two miles away?",
        theory: "Historical redlining and inequitable municipal tree planting resulted in lower canopy coverage and higher concentrations of asphalt in lower-income communities, exacerbating urban heat vulnerability and asthma rates.",
        lab: "Use GIS demographic mapping tools to overlay satellite NDVI vegetation layers, thermal Landsat surface temperatures, and CDC Social Vulnerability indices across South Texas school districts.",
        quiz: {
          question: "What is a primary systemic cause of the 'tree canopy deficit' observed in many lower-income urban neighborhoods?",
          options: [
            "Trees refuse to grow in certain soils",
            "Decades of inequitable municipal infrastructure investment, redlining, and lack of green space zoning",
            "Residents in low-income areas dislike trees",
            "Lower-income neighborhoods receive less total sunlight"
          ],
          correct_index: 1,
          explanation: "Historical redlining and unequal capital allocation produced neighborhoods with dense pavement and minimal municipal tree planting programs."
        },
        citations: ["Hoffman et al. (2020) The Effects of Historical Housing Policies on Intra-Urban Heat", "Texas Trees Foundation Dallas Urban Forest Study"]
      },
      {
        id: "hs_allometric_carbon_modeling",
        title: "Advanced Biomass Allometry & i-Tree Engine Mathematics",
        tier: "9_12",
        tier_label: "9–12 High School",
        subject: "Mathematics",
        theme_plt: 3,
        theme_plt_label: "How Do We Sustain Our Forests?",
        teks_codes: ["Pre-Calculus 111.42.c.2I", "Environmental Systems 112.37.c.2J", "Statistics 111.47.c.3A"],
        science_rtc: "Scale, Proportion, and Quantity",
        science_sep: "Using Mathematics and Computational Thinking",
        prerequisites: ["ms_trig_tree_height", "ms_photosynthesis_carbon"],
        mastery_points: 250,
        summary: "Formulate non-linear logarithmic regressions to model dry tree biomass and quantify monetized ecosystem services ($/metric ton CO2e).",
        hook: "How can mathematical formulas turn a living tree into an auditable financial asset on a city balance sheet?",
        theory: "Allometric power laws ln(M) = a + b*ln(DBH) model dry biomass. Multiplying dry mass by carbon fraction (50%) and stoichiometric CO2 ratio (44/12) calculates total sequestered carbon.",
        lab: "Perform a Campus Whole-Forest Biomass Census. Measure 25 trees, compute dry biomass in kilograms, monetize their annual ecosystem services, and model 10-year growth trajectories.",
        quiz: {
          question: "If an allometric equation for Honey Mesquite is ln(M) = -2.13 + 2.45*ln(DBH), what happens to predicted dry biomass M if DBH doubles?",
          options: [
            "Biomass exactly doubles (increases by 2x)",
            "Biomass increases non-linearly by approximately 2^2.45 ≈ 5.46 times",
            "Biomass stays constant",
            "Biomass decreases"
          ],
          correct_index: 1,
          explanation: "Because power-law scaling has an exponent greater than 2, a doubling of trunk diameter produces a more than five-fold increase in structural mass and carbon."
        },
        citations: ["Chave et al. (2014) Improved allometric models to estimate biomass", "USDA Forest Service General Technical Report"]
      },
      {
        id: "comm_sombra_sana",
        title: "Sombra Sana: Backyard Shade Placement & Energy Savings",
        tier: "community",
        tier_label: "Parent & Community",
        subject: "Interdisciplinary",
        theme_plt: 3,
        theme_plt_label: "How Do We Sustain Our Forests?",
        teks_codes: ["Community Lifelong Education"],
        science_rtc: "Energy and Matter",
        science_sep: "Designing Practical Engineering Solutions",
        prerequisites: [],
        mastery_points: 100,
        summary: "Learn how strategic placement of native shade trees on South and West walls reduces household summer electricity bills by 15–25%.",
        hook: "¿Sabías que sembrar un árbol nativo en el lado oeste de tu casa puede reducir tu recibo de luz hasta un 25%?",
        theory: "West-facing residential walls absorb punishing afternoon solar radiation when outdoor ambient temperatures peak. Planting deciduous or evergreen native species shades roofs and windows, reducing air conditioning run-time.",
        lab: "Participate in a hands-on community tree planting clinic. Master the 'champagne glass' hole width (3x root ball width) and ensure root flare is positioned 1 inch above finished grade.",
        quiz: {
          question: "Which side of a South Texas home receives the most intense, heating afternoon sunlight in July and August?",
          options: ["The North-facing wall", "The West-facing wall", "The East-facing wall at sunrise", "Directly under the foundation"],
          correct_index: 1,
          explanation: "West-facing exterior walls absorb punishing afternoon solar radiation when outdoor ambient temperatures peak, making West-side shade trees the most effective for lowering electric bills."
        },
        citations: ["Texas Trees Foundation Residential Energy Study", "Texas A&M AgriLife Extension Tree Care Guide"]
      },
      {
        id: "comm_olla_irrigation",
        title: "Agua y Vida: Water-Wise Olla & Drip Irrigation",
        tier: "community",
        tier_label: "Parent & Community",
        subject: "Interdisciplinary",
        theme_plt: 3,
        theme_plt_label: "How Do We Sustain Our Forests?",
        teks_codes: ["Community Lifelong Education"],
        science_rtc: "Systems and System Models",
        science_sep: "Constructing Practical Solutions",
        prerequisites: ["comm_sombra_sana"],
        mastery_points: 100,
        summary: "Build low-cost terracotta olla pot sub-surface irrigation systems that deliver water directly to root zones with zero evaporation loss.",
        hook: "Save water, save money: How can an unglazed clay flowerpot keep a tree alive during a 100°F drought with zero electricity?",
        theory: "Unglazed terracotta is micro-porous. When buried next to tree roots, soil moisture tension draws water through clay walls only when surrounding soil is dry, reducing water use by 70%+ compared to sprinklers.",
        lab: "Assemble an olla pot with silicone sealant, bury it 10 inches deep near a sapling root zone, fill with water, and monitor weekly using the 'cookie crumb' soil touch test.",
        quiz: {
          question: "Why is sub-surface olla irrigation significantly more efficient than overhead lawn sprinklers in South Texas?",
          options: [
            "Ollas purify water with electricity",
            "Water is released directly underground at the root zone with zero loss to surface air evaporation or wind drift",
            "Terracotta pots make rain clouds form",
            "Ollas use saltwater"
          ],
          correct_index: 1,
          explanation: "Because water is released below ground only when soil tension demands it, evaporation loss is virtually zero."
        },
        citations: ["Fanslow et al. (2018) Ancient Irrigation in Modern Arid Zones", "UTRGV Agroecology Water Conservation Lab"]
      },
      {
        id: "comm_pechita_kitchen",
        title: "La Cocina del Monte: Mesquite Pod Milling & Foraging",
        tier: "community",
        tier_label: "Parent & Community",
        subject: "Interdisciplinary",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Community Cultural Heritage"],
        science_rtc: "Structure and Function",
        science_sep: "Obtaining and Communicating Traditional Ecological Knowledge",
        prerequisites: [],
        mastery_points: 100,
        summary: "Harvest ripe, golden Honey Mesquite bean pods (pechita) and mill them into gluten-free, high-protein, low-glycemic traditional flour.",
        hook: "Discover the sweet, cinnamon superfood growing for free right in your neighborhood microforest!",
        theory: "Honey Mesquite bean pods are rich in protein, calcium, and soluble dietary fiber. Because mesquite sugars are complex polysaccharides, they digest slowly without spiking blood sugar.",
        lab: "Join a community harvest and milling bee. Gather crisp dry pods, run them through an electric impact mill, sift fibrous chaff, and prepare traditional mesquite atole and energy bars.",
        quiz: {
          question: "What is a key nutritional benefit of wild-harvested Honey Mesquite flour for families managing blood sugar?",
          options: [
            "It contains pure high-fructose corn syrup",
            "It is naturally sweet yet rich in soluble dietary fiber and protein with a low glycemic index",
            "It contains artificial chemical sweeteners",
            "It has zero calories"
          ],
          correct_index: 1,
          explanation: "Mesquite flour contains complex polysaccharides and dietary fiber that slow carbohydrate absorption, preventing sharp blood sugar spikes."
        },
        citations: ["Tull, D. (2013) Edible and Useful Plants of Texas", "Native Plant Society of Texas (NPSOT) South Texas Chapter"]
      },
      {
        id: "grad_sensor_calibration",
        title: "Low-Cost PM2.5 Sensor Metrology & Empirical RH Correction",
        tier: "college",
        tier_label: "Higher Ed & Graduate",
        subject: "Environmental Engineering & Public Health",
        theme_plt: 3,
        theme_plt_label: "How Do We Sustain Our Forests?",
        teks_codes: ["UTRGV Graduate Agroecology ENVR 6301"],
        science_rtc: "Systems and System Models",
        science_sep: "Analyzing and Interpreting Complex Data Sets",
        prerequisites: ["hs_allometric_carbon_modeling"],
        mastery_points: 300,
        summary: "Derive non-linear hygroscopic growth correction curves to calibrate low-cost optical laser particle counters against state reference stations.",
        hook: "When high humidity turns water vapor into optical fog, how can we calibrate a $20 sensor to match a $25,000 EPA beta-attenuation monitor?",
        theory: "Laser light-scattering sensors overestimate PM2.5 mass at relative humidity > 70% due to hygroscopic aerosol swelling. Applying empirical correction equations restores accuracy for local schoolyard air monitoring.",
        lab: "Deploy ESP32 microcontrollers with PMS5003 sensors. Ingest raw 1-minute time-series logs, write Python cleaning scripts, and run non-linear regression against TCEQ CAMS 80 air quality data.",
        quiz: {
          question: "Why do uncalibrated low-cost optical particulate sensors report artificially high PM2.5 concentrations during humid mornings?",
          options: [
            "Lasers lose power in humidity",
            "Hygroscopic aerosols absorb ambient water vapor, swelling in diameter and scattering more laser light which the algorithm misinterprets as solid particulate mass",
            "Moisture shorts out the electronic circuit board",
            "Trees release heavy smoke in the morning"
          ],
          correct_index: 1,
          explanation: "Hygroscopic particles grow in size due to water condensation, scattering more light and leading uncorrected algorithms to over-estimate actual solid dry mass."
        },
        citations: ["Morawska et al. (2018) Atmospheric Environment", "EPA Air Sensor Guidebook (2021)"]
      },
      {
        id: "grad_wbgt_thermodynamics",
        title: "Microclimate Energy Budgets & Wet-Bulb Globe Temperature Modeling",
        tier: "college",
        tier_label: "Higher Ed & Graduate",
        subject: "Atmospheric Physics & Agroecology",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["UTRGV Graduate Agroecology ENVR 6305"],
        science_rtc: "Energy and Matter: Fluxes and Conservation",
        science_sep: "Constructing Mathematical and Physical Models",
        prerequisites: ["ms_microclimate_physics", "grad_sensor_calibration"],
        mastery_points: 300,
        summary: "Deploy micrometeorological flux towers to quantify mean radiant temperature (Tmrt) and Wet-Bulb Globe Temperature reduction under microforests.",
        hook: "Why is thermometer air temperature completely insufficient for determining when heat becomes lethal to exercising humans?",
        theory: "Wet-Bulb Globe Temperature (WBGT = 0.7*Tnw + 0.2*Tg + 0.1*Tdb) factors in evaporative cooling limits, solar radiant load, and dry-bulb ambient temperature to model true physiological thermal strain.",
        lab: "Set up paired micrometeorological masts equipped with black globe thermometers and sonic anemometers over asphalt vs campus microforest canopy to compute sensible vs latent heat flux.",
        quiz: {
          question: "In the standard WBGT formula, why is natural wet-bulb temperature (Tnw) given the highest weighting (70%)?",
          options: [
            "It measures the temperature of rain",
            "It directly reflects the human body's physiological limit to cool itself through evaporative sweat dissipation in humid conditions",
            "It is the easiest sensor to manufacture",
            "It measures wind speed"
          ],
          correct_index: 1,
          explanation: "Tnw reflects evaporative potential; when air is hot and saturated with moisture, sweat cannot evaporate, representing the greatest physiological risk for heat stroke."
        },
        citations: ["Liljegren et al. (2008) Modeling the Wet Bulb Globe Temperature", "UT Southwestern Medical Center Pediatric Heat Study"]
      },
      {
        id: "grad_spatial_epidemiology",
        title: "Spatial Epidemiology & Pediatric Heat-Health Vulnerability",
        tier: "college",
        tier_label: "Higher Ed & Graduate",
        subject: "Environmental Epidemiology",
        theme_plt: 4,
        theme_plt_label: "What is Our Responsibility?",
        teks_codes: ["UTRGV School of Medicine PUBH 6310"],
        science_rtc: "Cause and Effect: Mechanism and Explanation",
        science_sep: "Engaging in Evidence-Based Epidemiological Argument",
        prerequisites: ["hs_environmental_justice", "grad_wbgt_thermodynamics"],
        mastery_points: 300,
        summary: "Design FERPA-compliant spatial regression models correlating satellite thermal anomalies with pediatric asthma emergency visits in Hidalgo County.",
        hook: "How can spatial statistics and satellite heat rasters prove to school boards that planting trees directly reduces student sick days?",
        theory: "Spatial epidemiology links localized environmental stressors (particulates, ozone, thermal extremes) with population health outcomes while maintaining strict de-identification standards (FERPA/COPPA).",
        lab: "Build a spatial bivariate Moran's I regression in R/Python examining whether every 10% increase in campus canopy coverage corresponds with statistically significant declines in pediatric heat illness.",
        quiz: {
          question: "When designing a public health dashboard under strict COPPA and FERPA mandates, how must pediatric health outcomes be reported?",
          options: [
            "With individual student names and home addresses",
            "Exclusively as de-identified, anonymized population rates aggregated at the campus or census tract level",
            "Only using social security numbers",
            "No health data can ever be analyzed by researchers"
          ],
          correct_index: 1,
          explanation: "FERPA and COPPA require absolute protection of student privacy, mandating that all research data be stripped of PII and aggregated at the campus or tract level."
        },
        citations: ["Texas DSHS Public Health Data Policies", "Harlan et al. (2006) Neighborhood Microclimates and Vulnerability"]
      },
      {
        id: "spirit_shinrin_yoku",
        title: "Shinrin-yoku: Contemplative Forest Bathing & Sensory Grounding",
        tier: "spiritual",
        tier_label: "Spiritual & Cultural",
        subject: "Contemplative Ecology & Well-being",
        theme_plt: 4,
        theme_plt_label: "What is Our Responsibility?",
        teks_codes: ["Mindfulness & Mental Well-being"],
        science_rtc: "Systems and Stability",
        science_sep: "Observing and Documenting Phenomenological Experience",
        prerequisites: [],
        mastery_points: 100,
        summary: "Experience the stress-reducing psychophysiological benefits of silent canopy immersion and volatile phytoncides (*Shinrin-yoku*).",
        hook: "Can 20 minutes of silent stillness beneath a tree canopy physically reset your heartbeat, calm your nervous system, and clear your mind?",
        theory: "Japanese *Shinrin-yoku* (forest bathing) immerses the senses in forest atmospheres. Inhaling aromatic phytoncides (antimicrobial terpenes emitted by trees) clinically reduces salivary cortisol and blood pressure.",
        lab: "Complete the guided 20-minute Sensory Forest Bathing Protocol. Enter the microforest in silence, observe dappled light (komorebi), and practice slow 5-senses grounding.",
        quiz: {
          question: "What are 'phytoncides' and how do they benefit human health during a walk through a tree canopy?",
          options: [
            "Artificial chemical sprays used for cleaning",
            "Natural volatile aromatic compounds released by plants that have been shown to lower cortisol, blood pressure, and boost immune activity",
            "Dangerous poisons produced by dead trees",
            "Plastic microfibers floating in the air"
          ],
          correct_index: 1,
          explanation: "Trees emit phytoncides to protect themselves from fungal and insect attack; inhaling these organic aerosols has been clinically shown to reduce human stress hormones and enhance immune function."
        },
        citations: ["Li, Q. (2010) Shinrin-yoku (Forest Bathing) and Immune Function", "Kaplan & Kaplan (1989) Attention Restoration Theory"]
      },
      {
        id: "spirit_sacred_ahuehuete",
        title: "The Sacred Ahuehuete: Ancient Living Witnesses of the Rio Grande",
        tier: "spiritual",
        tier_label: "Spiritual & Cultural",
        subject: "Cultural Heritage & Philosophy",
        theme_plt: 2,
        theme_plt_label: "Why Do Forests Matter?",
        teks_codes: ["Regional Cultural Heritage"],
        science_rtc: "Stability and Change Over Deep Time",
        science_sep: "Synthesizing Historical, Cultural, and Ecological Records",
        prerequisites: ["elem_indigenous_mesquite"],
        mastery_points: 100,
        summary: "Reflect on the sacred status of the Montezuma Cypress (*Ahuehuete* / *Taxodium mucronatum*) as living cultural archives enduring across millennia.",
        hook: "Imagine standing face-to-face with a living being that was alive when the ancient pyramids were built and is still breathing today!",
        theory: "Known as *Ahuehuete* ('old man of the water' in Nahuatl), the Montezuma Cypress lives for over 1,500 years along the Rio Grande basin, revered in indigenous lore as a sacred living witness of human history.",
        lab: "Stand before a mature Montezuma Cypress or Live Oak. Review historical milestone timeline cards spanning 1000 CE to present, and compose an honorific living biography of the tree.",
        quiz: {
          question: "What does the Nahuatl name 'Ahuehuete' translate to, and why is this ancient tree revered along the Rio Grande?",
          options: [
            "It means 'Thorn of the Desert' and was used as a fence",
            "It translates to 'Old Man of the Water', revered for its 1,000+ year lifespan and sacred presence along riverways",
            "It translates to 'Fast Growing Weed'",
            "It means 'Tree with Yellow Fruit'"
          ],
          correct_index: 1,
          explanation: "Ahuehuete signifies 'old man of the water' in Nahuatl, honoring the tree's centuries-long lifespan, massive trunk buttresses, and essential riparian ecosystem guardianship."
        },
        citations: ["Cavazos, R. (2016) Native Flora and Cultural Traditions of the RGV", "Mexican National Institute of Anthropology and History (INAH) Sacred Trees Archive"]
      },
      {
        id: "spirit_seven_generations",
        title: "The Seven-Generations Ethic: An Intergenerational Covenant",
        tier: "spiritual",
        tier_label: "Spiritual & Cultural",
        subject: "Environmental Philosophy",
        theme_plt: 4,
        theme_plt_label: "What is Our Responsibility?",
        teks_codes: ["Environmental Ethics & Civic Stewardship"],
        science_rtc: "Systems, Stability, and Change",
        science_sep: "Communicating Ethical and Philosophical Frameworks",
        prerequisites: ["spirit_shinrin_yoku", "hs_environmental_justice"],
        mastery_points: 100,
        summary: "Ground ecological action in the Indigenous Seven-Generations philosophy: planting canopy today to shade children seven generations in the future.",
        hook: "A Greek proverb says: 'A society grows great when old men plant trees in whose shade they know they shall never sit.'",
        theory: "The Seven-Generations philosophy calls on us to weigh environmental stewardship against its impact 150+ years into the future. A sapling planted in Donna or Mercedes today will reach its majestic prime when our great-great-great grandchildren attend school.",
        lab: "Compose an archival 'Letter to a Student in 2176' establishing an intergenerational covenant of care. Seal the dedication in a weatherproof campus time-capsule.",
        quiz: {
          question: "How does the 'Seven-Generations' principle change how a community views planting an oak or cypress sapling that takes 50 years to mature?",
          options: [
            "It encourages people to cut down trees immediately for fast cash",
            "It reframes tree planting as an act of selfless love and stewardship for descendants we will never meet",
            "It suggests that only fast-growing annual weeds should be planted",
            "It teaches that nature has no long-term value"
          ],
          correct_index: 1,
          explanation: "The Seven-Generations philosophy reminds us that our ancestors planted shade for us, and our highest ecological duty is to plant canopy for descendants far into the future."
        },
        citations: ["Kimmerer, R. W. (2013) Braiding Sweetgrass", "Haudenosaunee Environmental Protection Philosophy"]
      }
    ]
  };

  class ForestKnowledgeGraphEngine {
    constructor(data = GRAPH_DATA) {
      this.data = data;
      this.nodeMap = new Map();
      this.data.nodes.forEach(node => {
        this.nodeMap.set(node.id, node);
      });
      this.validateDAG();
    }

    /**
     * Verifies that the graph is a valid Directed Acyclic Graph (no circular loops or missing refs)
     */
    validateDAG() {
      const visited = new Set();
      const recStack = new Set();

      const isCyclic = (nodeId) => {
        if (!this.nodeMap.has(nodeId)) {
          console.warn(`[KnowledgeGraph] Referenced prerequisite node '${nodeId}' does not exist.`);
          return false;
        }
        if (recStack.has(nodeId)) return true;
        if (visited.has(nodeId)) return false;

        visited.add(nodeId);
        recStack.add(nodeId);

        const node = this.nodeMap.get(nodeId);
        for (const prereqId of node.prerequisites) {
          if (isCyclic(prereqId)) return true;
        }

        recStack.delete(nodeId);
        return false;
      };

      for (const node of this.data.nodes) {
        if (isCyclic(node.id)) {
          throw new Error(`[KnowledgeGraph Error] Circular dependency detected involving node: ${node.id}`);
        }
      }
      return true;
    }

    /**
     * Get all nodes filtered by tier and/or subject
     */
    getFilteredNodes(tier = 'all', subject = 'all', pltTheme = 'all', searchTerm = '') {
      return this.data.nodes.filter(node => {
        const matchTier = (tier === 'all' || node.tier === tier);
        const matchSubject = (subject === 'all' || node.subject === subject);
        const matchTheme = (pltTheme === 'all' || node.theme_plt === parseInt(pltTheme, 10));
        
        let matchSearch = true;
        if (searchTerm && searchTerm.trim() !== '') {
          const q = searchTerm.toLowerCase().trim();
          const teksText = (node.teks_codes || []).join(' ').toLowerCase();
          const citationsText = (node.citations || []).join(' ').toLowerCase();
          matchSearch = node.title.toLowerCase().includes(q) ||
                        node.summary.toLowerCase().includes(q) ||
                        node.theory.toLowerCase().includes(q) ||
                        teksText.includes(q) ||
                        citationsText.includes(q);
        }

        return matchTier && matchSubject && matchTheme && matchSearch;
      });
    }

    /**
     * Determines which nodes are unlocked based on the set of completed node IDs
     */
    getNodeStatuses(completedNodeIds = []) {
      const completedSet = new Set(completedNodeIds);
      const statusMap = new Map();

      this.data.nodes.forEach(node => {
        if (completedSet.has(node.id)) {
          statusMap.set(node.id, 'completed');
        } else {
          // Check if all prerequisites are completed
          const allPrereqsMet = node.prerequisites.every(prereqId => completedSet.has(prereqId));
          statusMap.set(node.id, allPrereqsMet ? 'unlocked' : 'locked');
        }
      });

      return statusMap;
    }

    /**
     * Computes user mastery stats
     */
    getProgressStats(completedNodeIds = []) {
      const completedSet = new Set(completedNodeIds);
      let earnedPoints = 0;
      let totalPoints = 0;

      this.data.nodes.forEach(node => {
        totalPoints += (node.mastery_points || 100);
        if (completedSet.has(node.id)) {
          earnedPoints += (node.mastery_points || 100);
        }
      });

      const percent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
      return {
        completedCount: completedSet.size,
        totalCount: this.data.nodes.length,
        earnedPoints,
        totalPoints,
        percent
      };
    }

    /**
     * Get single node by ID
     */
    getNode(id) {
      return this.nodeMap.get(id) || null;
    }

    /**
     * Get graph metadata
     */
    getMetadata() {
      return this.data.metadata;
    }

    /**
     * Generate Cytoscape / D3 graph nodes & links payload for visualization
     */
    getD3GraphData(tier = 'all', subject = 'all') {
      const filtered = this.getFilteredNodes(tier, subject);
      const nodeIds = new Set(filtered.map(n => n.id));

      const links = [];
      filtered.forEach(node => {
        node.prerequisites.forEach(prereqId => {
          if (nodeIds.has(prereqId)) {
            links.push({
              source: prereqId,
              target: node.id
            });
          }
        });
      });

      return {
        nodes: filtered.map(n => ({
          id: n.id,
          title: n.title,
          tier: n.tier,
          tier_label: n.tier_label,
          subject: n.subject,
          theme_plt: n.theme_plt,
          mastery_points: n.mastery_points,
          teks_codes: n.teks_codes
        })),
        links
      };
    }
  }

  return {
    raw: GRAPH_DATA,
    Engine: ForestKnowledgeGraphEngine,
    createEngine: () => new ForestKnowledgeGraphEngine(GRAPH_DATA)
  };
}));
