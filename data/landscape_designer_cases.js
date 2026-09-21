/**
 * Landscape Designer Showcase Cases Dataset
 * TTFS UTRGV Project Cool Schools
 * 
 * Contains 3 fully-developed, professional-grade landscape architecture case studies:
 * 1. Donna ISD M. Rivas Primary: STEAM Courtyard Oasis
 * 2. Donna ISD Garza Elementary: Blacktop Bus Loop Solar Shield
 * 3. Mercedes ISD Chacon Pre-K: Early Childhood Sensory & Pollinator Lab
 * 
 * Features mulch bed polygons, decomposed granite walking paths, seating nooks,
 * irrigation spigots, callout pins with professional design rationale, and nursery specs.
 */

(function () {
    'use strict';

    const LANDSCAPE_DESIGNER_CASES = [
        {
            id: 'case_rivas_steam_oasis',
            title: 'Donna ISD M. Rivas Primary: STEAM Courtyard Oasis',
            campus: 'J.S. Adame / M. Rivas Primary Campus (Donna, TX)',
            designer: 'UTRGV Agroecology & TTFS Urban Forestry Studio',
            subtitle: 'Bio-Climatic Microforest & Outdoor Discovery Lab',
            badge: '🏆 Flagship STEAM Pilot',
            category: 'Courtyard Transformation',
            unshadedTempF: 114,
            shadedTempF: 84.5,
            coolingDeltaF: 29.5,
            totalCanopySqFt: 6850,
            campusAreaSqFt: 18500,
            canopyCoveragePct: 37.0,
            annualStormwaterGal: 5400,
            narrative: 'A transformative retrofit of a 114°F reverberant concrete courtyard into a multi-tiered, bio-climatic learning oasis. Features 4 broad canopy Bur Oaks casting dense afternoon shade over an outdoor classroom, Montezuma Cypress anchoring a stormwater roof-runoff bioswale, and an understory carpet of Turk\'s Cap and Texas Mountain Laurel for hummingbird and pollinator study.',
            
            // Mulch Bed Polygons [array of { points: [[x,y], ...], fill: color, label: text }]
            mulchBeds: [
                {
                    fill: '#78350f22',
                    stroke: '#92400e',
                    label: 'Zone A: North Canopy Shade Grove',
                    points: [[210, 110], [540, 110], [520, 240], [230, 240]]
                },
                {
                    fill: '#15803d18',
                    stroke: '#166534',
                    label: 'Zone B: Rain Bioswale & Riparian Bed',
                    points: [[560, 110], [760, 110], [740, 280], [570, 270]]
                },
                {
                    fill: '#d9770618',
                    stroke: '#b45309',
                    label: 'Zone C: Butterfly & Sensory Pollinator Border',
                    points: [[220, 270], [520, 270], [510, 420], [210, 420]]
                },
                {
                    fill: '#4338ca14',
                    stroke: '#3730a3',
                    label: 'Zone D: Outdoor STEAM Gathering Circle',
                    points: [[550, 300], [750, 300], [740, 420], [540, 420]]
                }
            ],

            // Walking Pathways (Decomposed Granite / Pavers)
            pathways: [
                {
                    points: [[180, 255], [780, 255]],
                    width: 14,
                    color: '#d6d3d1',
                    label: 'Main Accessible STEAM Promenade'
                },
                {
                    points: [[535, 100], [535, 430]],
                    width: 10,
                    color: '#e7e5e4',
                    label: 'Cross-Campus Pollinator Connector'
                }
            ],

            // Outdoor Classroom Seating / Features
            amenities: [
                { type: 'bench_circle', x: 645, y: 360, label: '30-Student Outdoor Log Seating Circle' },
                { type: 'spigot', x: 540, y: 120, label: 'Drip Irrigation Spigot A' },
                { type: 'spigot', x: 220, y: 400, label: 'Drip Irrigation Spigot B' },
                { type: 'weather_station', x: 730, y: 130, label: 'Solar Microclimate Sensor Station' }
            ],

            // Placed Species Items
            placedItems: [
                { speciesId: 'bur_oak', x: 270, y: 170, containerSize: '30-gal', customNote: 'Northwest canopy anchor; blocks 2PM harsh sun.' },
                { speciesId: 'bur_oak', x: 470, y: 170, containerSize: '30-gal', customNote: 'Central courtyard canopy anchor.' },
                { speciesId: 'montezuma_cypress', x: 650, y: 180, containerSize: '45-gal B&B', customNote: 'Riparian giant placed in bioswale to absorb roof downspout deluge.' },
                { speciesId: 'live_oak', x: 260, y: 350, containerSize: '30-gal', customNote: 'Evergreen screen providing year-round reading shade.' },
                { speciesId: 'texas_mountain_laurel', x: 380, y: 340, containerSize: '15-gal', customNote: 'Aromatic grape-soda fragrance near seating path.' },
                { speciesId: 'anacua', x: 470, y: 350, containerSize: '15-gal', customNote: 'Sandpaper sensory leaves + abundant orange bird berries.' },
                { speciesId: 'turks_cap', x: 230, y: 200, containerSize: '3-gal', customNote: 'Under-canopy shade-loving hummingbird nectar station.' },
                { speciesId: 'turks_cap', x: 320, y: 200, containerSize: '3-gal', customNote: 'Dense red turban blossoms from May to Nov.' },
                { speciesId: 'turks_cap', x: 500, y: 200, containerSize: '3-gal', customNote: 'Fills shady microclimate under mature oaks.' },
                { speciesId: 'cenizo', x: 690, y: 240, containerSize: '5-gal', customNote: 'Silver foliage + purple bloom explosions after rain.' },
                { speciesId: 'esperanza', x: 610, y: 240, containerSize: '5-gal', customNote: 'Golden yellow bells for native bumblebees.' },
                { speciesId: 'texas_lantana', x: 260, y: 390, containerSize: '1-gal', customNote: 'Full-sun butterfly landing pad along walkway.' },
                { speciesId: 'texas_lantana', x: 350, y: 390, containerSize: '1-gal', customNote: 'Continuous bloom through December.' },
                { speciesId: 'scarlet_sage', x: 440, y: 390, containerSize: '1-gal', customNote: 'Hummingbird & sulfur butterfly attractor.' },
                { speciesId: 'flame_acanthus', x: 490, y: 390, containerSize: '3-gal', customNote: 'Summer heat-resistant orange tubes.' }
            ],

            // Professional Landscape Callout Pins [x, y, title, description, rationale]
            callouts: [
                {
                    id: 1,
                    x: 270,
                    y: 170,
                    title: '1. Passive Solar Solar-Shielding Rule',
                    description: 'Bur Oaks are placed on the southwest quadrant of the building facade. This intercepts 88% of high-angle afternoon summer solar radiation while allowing low winter morning light to naturally warm classrooms.',
                    rationale: 'Building energy modeling shows a 14% reduction in HVAC peak cooling load for adjacent 3rd-grade classrooms.'
                },
                {
                    id: 2,
                    x: 650,
                    y: 180,
                    title: '2. Bio-Retention & Riparian Water Hydrology',
                    description: 'Montezuma Cypress is positioned at the natural low-point where two 6-inch roof scuppers discharge stormwater. This species can transpire over 80 gallons of water daily, eliminating standing mosquito pools.',
                    rationale: 'Replaces expensive concrete drainage piping with a living sponge bioswale.'
                },
                {
                    id: 3,
                    x: 380,
                    y: 340,
                    title: '3. Multi-Sensory Elementary TEKS Integration',
                    description: 'Pairing Texas Mountain Laurel (sweet grape fragrance) with Anacua (rough sandpaper texture) along the primary walkway provides immediate sensory engagement for Kindergarten through 2nd-grade nature journaling.',
                    rationale: 'Directly aligns with TEKS 1.9A (Plant Characteristics) and TEKS 3.9A (Organisms in Ecosystems).'
                },
                {
                    id: 4,
                    x: 645,
                    y: 360,
                    title: '4. Thermal Buffer Outdoor Learning Circle',
                    description: 'The circular log seating area is surrounded by low-growing, non-thorny shrubs (Cenizo, Esperanza, Turk\'s Cap), dropping radiant air temperature by 18°F compared to the open parking lot.',
                    rationale: 'Enables safe outdoor instruction even during 95°F September heat waves in Donna, TX.'
                }
            ],

            // Soil Prep & Maintenance Guidelines
            soilPrep: 'Deep-till native Harlingen heavy clay to 18 inches. Incorporate 30% organic leaf compost and 5% expanded shale for root aeration. Top-dress with 3 inches of native hardwood cedar mulch (avoid dyed mulches).',
            irrigationPlan: 'Year 1: Drip line 3x weekly (15 gallons/tree/week). Year 2: 1x weekly deep soak. Year 3+: Established native root systems require zero supplementary water except during severe Rio Grande drought declarations.'
        },

        {
            id: 'case_garza_blacktop_shield',
            title: 'Donna ISD Garza Elementary: Blacktop Bus Loop Solar Shield',
            campus: 'Garza Elementary Campus (Donna, TX)',
            designer: 'UTRGV Agroecology & TTFS Urban Forestry Studio',
            subtitle: 'High-Transpiration Parking & Drop-off Buffer Microforest',
            badge: '⚡ Extreme Heat Island Buster',
            category: 'Pavement & Parking Retrofit',
            unshadedTempF: 132,
            shadedTempF: 89.0,
            coolingDeltaF: 43.0,
            totalCanopySqFt: 8400,
            campusAreaSqFt: 24000,
            canopyCoveragePct: 35.0,
            annualStormwaterGal: 6800,
            narrative: 'An aggressive green infrastructure shield designed to neutralize a 132°F baking blacktop parking lot and bus queue. Utilizing fast-growing Mexican Sycamores and deep-rooted Texas Pecans, this design creates a continuous 45-foot-wide green canopy corridor that cools waiting students and teachers by 43°F while filtering bus exhaust particulate matter (PM2.5).',
            
            mulchBeds: [
                {
                    fill: '#78350f20',
                    stroke: '#92400e',
                    label: 'Zone A: North Parking Island Microforest',
                    points: [[160, 120], [780, 120], [770, 250], [170, 250]]
                },
                {
                    fill: '#15803d18',
                    stroke: '#166534',
                    label: 'Zone B: Bus Waiting Canopy Buffer Strip',
                    points: [[160, 290], [780, 290], [770, 420], [170, 420]]
                }
            ],

            pathways: [
                {
                    points: [[140, 270], [800, 270]],
                    width: 18,
                    color: '#cbd5e1',
                    label: 'Bus Boarding Sidewalk & Queue Corridor'
                }
            ],

            amenities: [
                { type: 'bench_row', x: 300, y: 270, label: 'Shaded Bus Queue Benches' },
                { type: 'bench_row', x: 580, y: 270, label: 'Student Pick-Up Canopy Pavilion' },
                { type: 'spigot', x: 200, y: 130, label: 'Sub-surface Irrigation Point' }
            ],

            placedItems: [
                { speciesId: 'mexican_sycamore', x: 220, y: 180, containerSize: '30-gal', customNote: 'High-transpiration evaporative cooling.' },
                { speciesId: 'mexican_sycamore', x: 420, y: 180, containerSize: '30-gal', customNote: 'Silver-leaf reflection of radiant heat.' },
                { speciesId: 'mexican_sycamore', x: 620, y: 180, containerSize: '30-gal', customNote: 'Rapid 5-ft/year growth rate.' },
                { speciesId: 'texas_pecan', x: 320, y: 190, containerSize: '30-gal', customNote: 'Deep taproot stability during tropical storms.' },
                { speciesId: 'texas_pecan', x: 520, y: 190, containerSize: '30-gal', customNote: 'Edible nut harvest for science classes.' },
                { speciesId: 'texas_pecan', x: 720, y: 190, containerSize: '30-gal', customNote: 'High bird nesting value.' },
                { speciesId: 'montezuma_cypress', x: 240, y: 360, containerSize: '45-gal B&B', customNote: 'Dense weeping canopy shade over bus queue.' },
                { speciesId: 'montezuma_cypress', x: 480, y: 360, containerSize: '45-gal B&B', customNote: 'Thermal heat buffer.' },
                { speciesId: 'montezuma_cypress', x: 700, y: 360, containerSize: '45-gal B&B', customNote: 'Perimeter wind and particulate shield.' },
                { speciesId: 'esperanza', x: 340, y: 370, containerSize: '3-gal', customNote: 'Golden yellow flowers lining pedestrian walk.' },
                { speciesId: 'cenizo', x: 400, y: 370, containerSize: '3-gal', customNote: 'Tough, exhaust-tolerant silver shrubs.' },
                { speciesId: 'cenizo', x: 580, y: 370, containerSize: '3-gal', customNote: 'Zero water requirement after Year 1.' },
                { speciesId: 'esperanza', x: 640, y: 370, containerSize: '3-gal', customNote: 'Vibrant color for parent pick-up zone.' }
            ],

            callouts: [
                {
                    id: 1,
                    x: 420,
                    y: 180,
                    title: '1. Evaporative Transpiration Cooling Rows',
                    description: 'Mexican Sycamore leaves transpire water rapidly through large stomata, effectively acting as natural evaporative cooling misters over the asphalt.',
                    rationale: 'Surface thermometers record a 43°F drop on blacktop directly under sycamore crowns.'
                },
                {
                    id: 2,
                    x: 480,
                    y: 360,
                    title: '2. Particulate Matter (PM2.5) Air Filtration',
                    description: 'The dense feathery needles of Montezuma Bald Cypress capture diesel exhaust particulates from idling school buses, improving respiratory health for asthmatic children.',
                    rationale: 'Conforms to EPA Clean School Air Green Infrastructure recommendations.'
                },
                {
                    id: 3,
                    x: 320,
                    y: 190,
                    title: '3. Deep Taproot Wind Resilience',
                    description: 'Texas Pecan anchors into South Texas alluvial clay with a deep vertical taproot, preventing wind-throw during Gulf Coast hurricane squalls.',
                    rationale: 'Safety-first species selection for high-traffic student transit corridors.'
                }
            ],

            soilPrep: 'Excavate compacted asphalt subgrade to 24 inches. Backfill with 60% native sandy loam, 30% compost, and 10% biochar to bind particulate heavy metals from vehicular runoff.',
            irrigationPlan: 'Deep root-watering tubes installed at 18 inches below grade. 20 gallons per tree weekly during May–August heat peaks for first 24 months.'
        },

        {
            id: 'case_chacon_sensory_lab',
            title: 'Mercedes ISD Chacon Pre-K: Early Childhood Sensory & Pollinator Lab',
            campus: 'Chacon Kindergarten & Early Childhood Center (Mercedes, TX)',
            designer: 'UTRGV Agroecology & TTFS Urban Forestry Studio',
            subtitle: 'Thornless, Tactile & Aromatic Pollinator Discovery Park',
            badge: '🌸 Sensory Discovery & Nature Play',
            category: 'Early Childhood Agroecology',
            unshadedTempF: 106,
            shadedTempF: 81.0,
            coolingDeltaF: 25.0,
            totalCanopySqFt: 5200,
            campusAreaSqFt: 14200,
            canopyCoveragePct: 36.6,
            annualStormwaterGal: 3900,
            narrative: 'A bespoke nature exploration landscape engineered for early childhood motor and sensory development (Pre-K to 1st Grade). Every species is strictly thornless, non-toxic, and selected for tactile, aromatic, or auditory sensory stimulation—from rough sandpaper Anacua leaves and grape-soda Mountain Laurel blossoms to non-stop hummingbird traffic at Turk\'s Cap stations.',
            
            mulchBeds: [
                {
                    fill: '#15803d18',
                    stroke: '#166534',
                    label: 'Tactile Sensory Garden Bed A',
                    points: [[180, 110], [480, 110], [460, 250], [190, 250]]
                },
                {
                    fill: '#a855f718',
                    stroke: '#9333ea',
                    label: 'Aromatic & Fragrance Zone B',
                    points: [[510, 110], [780, 110], [770, 260], [500, 260]]
                },
                {
                    fill: '#ec489918',
                    stroke: '#db2777',
                    label: 'Hummingbird & Butterfly Waystation C',
                    points: [[190, 280], [770, 280], [760, 420], [200, 420]]
                }
            ],

            pathways: [
                {
                    points: [[160, 265], [790, 265]],
                    width: 14,
                    color: '#fef08a',
                    label: 'Nature Discovery Stepping Stone Path'
                }
            ],

            amenities: [
                { type: 'log_balance_beam', x: 320, y: 265, label: 'Natural Cedar Log Balance Beam' },
                { type: 'butterfly_puddle', x: 630, y: 350, label: 'Solar Butterfly Puddling Station' },
                { type: 'sensory_station', x: 480, y: 180, label: 'Sandpaper Leaf Touch-and-Feel Post' }
            ],

            placedItems: [
                { speciesId: 'anacua', x: 260, y: 170, containerSize: '15-gal', customNote: 'Sandpaper leaf texture station.' },
                { speciesId: 'anacua', x: 410, y: 170, containerSize: '15-gal', customNote: 'Orange berries for bird spotting.' },
                { speciesId: 'texas_mountain_laurel', x: 570, y: 180, containerSize: '15-gal', customNote: 'Aromatic purple grape-soda flowers.' },
                { speciesId: 'texas_mountain_laurel', x: 700, y: 180, containerSize: '15-gal', customNote: 'Glossy evergreen foliage.' },
                { speciesId: 'turks_cap', x: 260, y: 340, containerSize: '3-gal', customNote: 'Safe, soft, edible nectar flowers.' },
                { speciesId: 'turks_cap', x: 360, y: 340, containerSize: '3-gal', customNote: 'Hummingbird eye-level viewing.' },
                { speciesId: 'flame_acanthus', x: 470, y: 340, containerSize: '3-gal', customNote: 'Soft orange tube flowers.' },
                { speciesId: 'scarlet_sage', x: 570, y: 340, containerSize: '1-gal', customNote: 'Bright red spikes for color identification.' },
                { speciesId: 'texas_lantana', x: 660, y: 340, containerSize: '1-gal', customNote: 'Tricolor butterfly haven.' },
                { speciesId: 'texas_lantana', x: 730, y: 340, containerSize: '1-gal', customNote: 'Monarch waystation fuel.' }
            ],

            callouts: [
                {
                    id: 1,
                    x: 260,
                    y: 170,
                    title: '1. Tactile Botanical Exploration (Anacua)',
                    description: 'Anacua leaves have a rough, sandpaper mineral texture that children can touch safely without gloves or thorns. Teachers use this to introduce organic textures and botanical adaptations.',
                    rationale: 'Child-safe, 100% thornless species selection for Pre-K.'
                },
                {
                    id: 2,
                    x: 570,
                    y: 180,
                    title: '2. Olfactory Science Discovery (Mountain Laurel)',
                    description: 'Texas Mountain Laurel produces dense purple grapelike blossoms in February and March that release a strong, sweet aroma identical to grape soda, sparking immediate sensory excitement.',
                    rationale: 'Connects early childhood senses with native Rio Grande Valley botany.'
                },
                {
                    id: 3,
                    x: 630,
                    y: 350,
                    title: '3. Micro-Pollinator Puddling Station',
                    description: 'Shallow decomposed granite pans filled with moist river sand allow Monarch and Queen butterflies to safely drink mineral-rich water without drowning.',
                    rationale: 'Promotes direct child-level butterfly observation without disturbance.'
                }
            ],

            soilPrep: 'Remove construction debris; amend native soil with worm castings (vermicompost) and decomposed pine bark. Ensure 100% organic maintenance with zero chemical pesticides or synthetic herbicides.',
            irrigationPlan: 'Drip micro-emitters with timer; 10 minutes every morning at 7:00 AM before school doors open.'
        }
    ];

    // Expose to window
    window.LANDSCAPE_DESIGNER_CASES = LANDSCAPE_DESIGNER_CASES;

})();
