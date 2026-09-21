/**
 * RGV Native Plant & Tree Palette Dataset (Enhanced Landscape Designer Edition)
 * TTFS UTRGV Project Cool Schools
 * 
 * Curated specifically for the Rio Grande Valley (USDA Hardiness Zones 9b/10a).
 * Features botanical metrics, 10-year growth dimensions, monthly bloom schedules,
 * ecological cooling values, nursery container standards, estimated procurement costs,
 * rootball excavation parameters, and pollinator relationships.
 */

(function () {
    'use strict';

    const RGV_PLANT_PALETTE = [
        {
            id: 'montezuma_cypress',
            commonName: 'Montezuma Bald Cypress',
            scientificName: 'Taxodium mucronatum Ten.',
            spanishName: 'Ahuehuete / Sabino',
            category: 'canopy',
            foliageType: 'semi-evergreen',
            flowerColor: '#8da372',
            bloomMonths: [3, 4],
            waterNeeds: 'Medium to High (riparian native)',
            sunExposure: 'Full Sun to Part Shade',
            soilPreference: 'Clay, Loam, Silt (tolerates standing water)',
            nurserySpec: {
                defaultContainer: '45-gal B&B',
                caliperAtPlantingIn: 2.5,
                heightAtPlantingFt: 10,
                rootballDepthIn: 24,
                rootballDiameterIn: 32,
                estUnitCostUsd: 340.00
            },
            maxCoolingDeltaF: 16,
            annualStormwaterGal: 1450,
            wildlifeScore: 92,
            pollinators: ['Nesting Birds', 'Green Jays', 'Beneficial Insects'],
            growth: {
                year1: { heightFt: 10, spreadFt: 5, caliperIn: 2.5 },
                year3: { heightFt: 18, spreadFt: 14, caliperIn: 4.5 },
                year5: { heightFt: 28, spreadFt: 24, caliperIn: 7.0 },
                year10: { heightFt: 50, spreadFt: 48, caliperIn: 13.5 }
            },
            badge: '💧 Riparian Giant & Bioswale Sponge',
            description: 'The national tree of Mexico and native to the Rio Grande riverbanks. Extremely long-lived, rapid grower, with feathery, weeping foliage providing dense, cool shade and exceptional stormwater absorption.'
        },
        {
            id: 'bur_oak',
            commonName: 'Bur Oak',
            scientificName: 'Quercus macrocarpa Michx.',
            spanishName: 'Roble Bur',
            category: 'canopy',
            foliageType: 'deciduous',
            flowerColor: '#d4af37',
            bloomMonths: [3, 4, 5],
            waterNeeds: 'Low once established',
            sunExposure: 'Full Sun',
            soilPreference: 'Alkaline, Limestone, Heavy Clay',
            nurserySpec: {
                defaultContainer: '30-gal Container',
                caliperAtPlantingIn: 2.0,
                heightAtPlantingFt: 8,
                rootballDepthIn: 20,
                rootballDiameterIn: 26,
                estUnitCostUsd: 220.00
            },
            maxCoolingDeltaF: 18,
            annualStormwaterGal: 1620,
            wildlifeScore: 98,
            pollinators: ['Acorn Woodpeckers', 'Squirrels', 'Moths & Native Bees'],
            growth: {
                year1: { heightFt: 8, spreadFt: 5, caliperIn: 2.0 },
                year3: { heightFt: 15, spreadFt: 16, caliperIn: 4.0 },
                year5: { heightFt: 24, spreadFt: 28, caliperIn: 6.8 },
                year10: { heightFt: 45, spreadFt: 52, caliperIn: 12.5 }
            },
            badge: '🛡️ Heavy Thermal Canopy Shield',
            description: 'Rugged canopy tree with massive mossy-capped acorns. Provides unmatched wide-area thermal shielding over school courtyards and blacktop.'
        },
        {
            id: 'mexican_sycamore',
            commonName: 'Mexican Sycamore',
            scientificName: 'Platanus mexicana Moric.',
            spanishName: 'Sicómoro Mexicano',
            category: 'canopy',
            foliageType: 'deciduous',
            flowerColor: '#c5a059',
            bloomMonths: [2, 3, 4],
            waterNeeds: 'Moderate',
            sunExposure: 'Full Sun',
            soilPreference: 'Adaptable, highly caliche and alkaline tolerant',
            nurserySpec: {
                defaultContainer: '30-gal Container',
                caliperAtPlantingIn: 2.0,
                heightAtPlantingFt: 9,
                rootballDepthIn: 20,
                rootballDiameterIn: 26,
                estUnitCostUsd: 195.00
            },
            maxCoolingDeltaF: 15,
            annualStormwaterGal: 1380,
            wildlifeScore: 85,
            pollinators: ['Cavity Nesting Birds', 'Beneficial Insects'],
            growth: {
                year1: { heightFt: 9, spreadFt: 6, caliperIn: 2.0 },
                year3: { heightFt: 20, spreadFt: 18, caliperIn: 5.0 },
                year5: { heightFt: 30, spreadFt: 30, caliperIn: 8.5 },
                year10: { heightFt: 52, spreadFt: 48, caliperIn: 14.5 }
            },
            badge: '⚡ Rapid Growth Evaporative Cooler',
            description: 'Remarkably rapid growth with striking silvery-white undersides on its broad maple-like leaves. High transpiration delivers active evaporative misting and shade.'
        },
        {
            id: 'live_oak',
            commonName: 'Southern Live Oak',
            scientificName: 'Quercus virginiana Mill.',
            spanishName: 'Encino Siempreverde',
            category: 'canopy',
            foliageType: 'evergreen',
            flowerColor: '#a1887f',
            bloomMonths: [3, 4],
            waterNeeds: 'Very Low (drought-tolerant)',
            sunExposure: 'Full Sun',
            soilPreference: 'Deep sand, loam, heavy clay',
            nurserySpec: {
                defaultContainer: '30-gal Container',
                caliperAtPlantingIn: 2.0,
                heightAtPlantingFt: 7,
                rootballDepthIn: 20,
                rootballDiameterIn: 26,
                estUnitCostUsd: 210.00
            },
            maxCoolingDeltaF: 17,
            annualStormwaterGal: 1550,
            wildlifeScore: 96,
            pollinators: ['Monarch Roosting', 'Migratory Songbirds', 'Native Bees'],
            growth: {
                year1: { heightFt: 7, spreadFt: 6, caliperIn: 2.0 },
                year3: { heightFt: 13, spreadFt: 17, caliperIn: 3.8 },
                year5: { heightFt: 21, spreadFt: 30, caliperIn: 6.2 },
                year10: { heightFt: 38, spreadFt: 50, caliperIn: 12.0 }
            },
            badge: '🌿 365-Day Evergreen Canopy',
            description: 'Iconic wide-spreading branches that remain green throughout the entire school year, creating permanent shaded outdoor reading nooks.'
        },
        {
            id: 'texas_pecan',
            commonName: 'Texas Pecan',
            scientificName: 'Carya illinoinensis (Wangenh.) K.Koch',
            spanishName: 'Nogal Pecanero',
            category: 'canopy',
            foliageType: 'deciduous',
            flowerColor: '#8bc34a',
            bloomMonths: [4, 5],
            waterNeeds: 'Moderate to High',
            sunExposure: 'Full Sun',
            soilPreference: 'Deep alluvial river silt & loam',
            nurserySpec: {
                defaultContainer: '30-gal Container',
                caliperAtPlantingIn: 1.8,
                heightAtPlantingFt: 7.5,
                rootballDepthIn: 22,
                rootballDiameterIn: 26,
                estUnitCostUsd: 225.00
            },
            maxCoolingDeltaF: 16,
            annualStormwaterGal: 1420,
            wildlifeScore: 94,
            pollinators: ['Native Bees', 'Pollinators', 'Small Mammals'],
            growth: {
                year1: { heightFt: 7.5, spreadFt: 5, caliperIn: 1.8 },
                year3: { heightFt: 15, spreadFt: 15, caliperIn: 3.8 },
                year5: { heightFt: 25, spreadFt: 26, caliperIn: 6.8 },
                year10: { heightFt: 48, spreadFt: 54, caliperIn: 13.0 }
            },
            badge: '🌰 State Tree & Edible Nut',
            description: 'Majestic upright canopy that drops edible pecans in late autumn. Deep taproot provides unmatched storm stability.'
        },
        {
            id: 'honey_mesquite',
            commonName: 'Texas Honey Mesquite',
            scientificName: 'Prosopis glandulosa Torr.',
            spanishName: 'Mezquite Dulce',
            category: 'understory',
            foliageType: 'deciduous',
            flowerColor: '#fff9c4',
            bloomMonths: [4, 5, 6, 7, 8, 9],
            waterNeeds: 'Ultra-low (extreme drought tough)',
            sunExposure: 'Full Sun',
            soilPreference: 'Any soil, highly caliche-tolerant',
            nurserySpec: {
                defaultContainer: '15-gal Container',
                caliperAtPlantingIn: 1.25,
                heightAtPlantingFt: 5.5,
                rootballDepthIn: 16,
                rootballDiameterIn: 20,
                estUnitCostUsd: 110.00
            },
            maxCoolingDeltaF: 12,
            annualStormwaterGal: 750,
            wildlifeScore: 95,
            pollinators: ['Honeybees', 'Solitary Bees', 'Mesquite Cutworm', 'Quail'],
            growth: {
                year1: { heightFt: 5.5, spreadFt: 4, caliperIn: 1.25 },
                year3: { heightFt: 11, spreadFt: 11, caliperIn: 2.8 },
                year5: { heightFt: 18, spreadFt: 18, caliperIn: 4.8 },
                year10: { heightFt: 28, spreadFt: 32, caliperIn: 8.5 }
            },
            badge: '🐝 Nitrogen Fixer & Pollinators',
            description: 'Feathery light-filtering canopy that enriches campus soil through bacterial nitrogen fixation while feeding hundreds of native bee species.'
        },
        {
            id: 'retama',
            commonName: 'Retama / Jerusalem Thorn',
            scientificName: 'Parkinsonia aculeata L.',
            spanishName: 'Retama / Palo Verde',
            category: 'understory',
            foliageType: 'deciduous (photosynthetic bark)',
            flowerColor: '#ffd600',
            bloomMonths: [4, 5, 6, 7, 8, 9, 10, 11],
            waterNeeds: 'Ultra-low',
            sunExposure: 'Full Sun',
            soilPreference: 'Sandy loam, clay, caliche',
            nurserySpec: {
                defaultContainer: '15-gal Container',
                caliperAtPlantingIn: 1.25,
                heightAtPlantingFt: 6,
                rootballDepthIn: 16,
                rootballDiameterIn: 20,
                estUnitCostUsd: 95.00
            },
            maxCoolingDeltaF: 10,
            annualStormwaterGal: 620,
            wildlifeScore: 88,
            pollinators: ['Leafcutter Bees', 'Bumblebees', 'Monarch Butterflies'],
            growth: {
                year1: { heightFt: 6, spreadFt: 4.5, caliperIn: 1.25 },
                year3: { heightFt: 13, spreadFt: 12, caliperIn: 3.0 },
                year5: { heightFt: 19, spreadFt: 19, caliperIn: 4.8 },
                year10: { heightFt: 27, spreadFt: 27, caliperIn: 7.8 }
            },
            badge: '🌟 8-Month Golden Blooms',
            description: 'Spectacular bright yellow flowers from spring through Thanksgiving. Bright green bark continues photosynthesis even during severe summer heat.'
        },
        {
            id: 'anacua',
            commonName: 'Anacua (Sugarberry / Sandpaper Tree)',
            scientificName: 'Ehretia anacua (Terán & Berl.) I.M.Johnst.',
            spanishName: 'Anacua / Palo Anacua',
            category: 'understory',
            foliageType: 'semi-evergreen',
            flowerColor: '#ffffff',
            bloomMonths: [3, 4, 5, 6, 7, 8, 9, 10],
            waterNeeds: 'Low to Moderate',
            sunExposure: 'Full Sun to Partial Shade',
            soilPreference: 'Loam, clay loam',
            nurserySpec: {
                defaultContainer: '15-gal Container',
                caliperAtPlantingIn: 1.25,
                heightAtPlantingFt: 5.5,
                rootballDepthIn: 16,
                rootballDiameterIn: 20,
                estUnitCostUsd: 125.00
            },
            maxCoolingDeltaF: 14,
            annualStormwaterGal: 980,
            wildlifeScore: 97,
            pollinators: ['Chachalacas', 'Green Jays', 'Honeybees', 'Butterflies'],
            growth: {
                year1: { heightFt: 5.5, spreadFt: 4, caliperIn: 1.25 },
                year3: { heightFt: 12, spreadFt: 11, caliperIn: 2.8 },
                year5: { heightFt: 18, spreadFt: 18, caliperIn: 5.0 },
                year10: { heightFt: 30, spreadFt: 32, caliperIn: 9.0 }
            },
            badge: '🦜 Tactile Sandpaper & Bird Berries',
            description: 'Dark green rough leaves that feel like sandpaper (tactile favorite for elementary sensory gardens). Produces abundant orange berries beloved by RGV birds.'
        },
        {
            id: 'texas_mountain_laurel',
            commonName: 'Texas Mountain Laurel',
            scientificName: 'Dermatophyllum secundiflorum (Ortega) Gandhi & Reveal',
            spanishName: 'Frijolillo',
            category: 'understory',
            foliageType: 'evergreen',
            flowerColor: '#7b1fa2',
            bloomMonths: [2, 3, 4],
            waterNeeds: 'Ultra-low (requires good drainage)',
            sunExposure: 'Full Sun',
            soilPreference: 'Limestone, rocky, alkaline caliche',
            nurserySpec: {
                defaultContainer: '15-gal Container',
                caliperAtPlantingIn: 1.0,
                heightAtPlantingFt: 4.0,
                rootballDepthIn: 16,
                rootballDiameterIn: 20,
                estUnitCostUsd: 145.00
            },
            maxCoolingDeltaF: 8,
            annualStormwaterGal: 480,
            wildlifeScore: 86,
            pollinators: ['Native Bees', 'Swallowtail Butterflies', 'Hummingbirds'],
            growth: {
                year1: { heightFt: 4.0, spreadFt: 3, caliperIn: 1.0 },
                year3: { heightFt: 7.0, spreadFt: 5.5, caliperIn: 2.0 },
                year5: { heightFt: 10.5, spreadFt: 9.5, caliperIn: 3.2 },
                year10: { heightFt: 16.5, spreadFt: 16.5, caliperIn: 5.5 }
            },
            badge: '🍇 Grape Soda Aroma & Purple Clusters',
            description: 'Stunning purple blossom clusters that smell distinctly like artificial grape soda. Glossy evergreen leaves maintain lush color year-round.'
        },
        {
            id: 'cenizo',
            commonName: 'Cenizo / Texas Barometer Bush',
            scientificName: 'Leucophyllum frutescens (Berland.) I.M.Johnst.',
            spanishName: 'Cenizo / Hierba del Cenizo',
            category: 'shrub',
            foliageType: 'evergreen (silver-gray)',
            flowerColor: '#ba68c8',
            bloomMonths: [6, 7, 8, 9, 10, 11],
            waterNeeds: 'Extremely Low',
            sunExposure: 'Full Sun',
            soilPreference: 'Well-draining, caliche, alkaline clay',
            nurserySpec: {
                defaultContainer: '3-gal Container',
                caliperAtPlantingIn: 0.5,
                heightAtPlantingFt: 2.0,
                rootballDepthIn: 10,
                rootballDiameterIn: 12,
                estUnitCostUsd: 28.00
            },
            maxCoolingDeltaF: 6,
            annualStormwaterGal: 320,
            wildlifeScore: 89,
            pollinators: ['Native Bees', 'Checkerspot Butterflies', 'Moths'],
            growth: {
                year1: { heightFt: 2.0, spreadFt: 2.0, caliperIn: 0.5 },
                year3: { heightFt: 4.0, spreadFt: 4.0, caliperIn: 1.2 },
                year5: { heightFt: 6.0, spreadFt: 6.0, caliperIn: 2.0 },
                year10: { heightFt: 8.5, spreadFt: 8.5, caliperIn: 2.8 }
            },
            badge: '🌧️ Barometer Rain Forecaster',
            description: 'Silver-velvet leaves burst into vibrant purple flower blankets within 48 hours of humidity shifts and South Texas rainstorms.'
        },
        {
            id: 'turks_cap',
            commonName: "Turk's Cap",
            scientificName: 'Malvaviscus arboreus var. drummondii',
            spanishName: 'Manzanita / Cascarilla',
            category: 'shrub',
            foliageType: 'perennial',
            flowerColor: '#d32f2f',
            bloomMonths: [5, 6, 7, 8, 9, 10, 11],
            waterNeeds: 'Low to Moderate',
            sunExposure: 'Part Sun to Dense Tree Shade',
            soilPreference: 'Tolerant of all soils',
            nurserySpec: {
                defaultContainer: '3-gal Container',
                caliperAtPlantingIn: 0.4,
                heightAtPlantingFt: 2.0,
                rootballDepthIn: 10,
                rootballDiameterIn: 12,
                estUnitCostUsd: 24.00
            },
            maxCoolingDeltaF: 5,
            annualStormwaterGal: 280,
            wildlifeScore: 95,
            pollinators: ['Ruby-throated Hummingbirds', 'Gulf Fritillary', 'Sulfur Butterflies'],
            growth: {
                year1: { heightFt: 2.0, spreadFt: 2.0, caliperIn: 0.4 },
                year3: { heightFt: 4.0, spreadFt: 4.0, caliperIn: 0.9 },
                year5: { heightFt: 5.5, spreadFt: 5.5, caliperIn: 1.4 },
                year10: { heightFt: 6.5, spreadFt: 6.5, caliperIn: 1.6 }
            },
            badge: '🌺 Under-Canopy Shade Nectar',
            description: 'Thrives directly underneath mature oak and sycamore shade where other flowers cannot grow. Red turban blossoms are top hummingbird nectar stations.'
        },
        {
            id: 'esperanza',
            commonName: 'Esperanza / Yellow Bells',
            scientificName: 'Tecoma stans (L.) Juss. ex Kunth',
            spanishName: 'Esperanza / Tronadora',
            category: 'shrub',
            foliageType: 'deciduous (dies back in rare freeze)',
            flowerColor: '#ffeb3b',
            bloomMonths: [4, 5, 6, 7, 8, 9, 10, 11],
            waterNeeds: 'Low',
            sunExposure: 'Full Sun',
            soilPreference: 'Adaptable',
            nurserySpec: {
                defaultContainer: '3-gal Container',
                caliperAtPlantingIn: 0.6,
                heightAtPlantingFt: 3.0,
                rootballDepthIn: 10,
                rootballDiameterIn: 12,
                estUnitCostUsd: 26.00
            },
            maxCoolingDeltaF: 7,
            annualStormwaterGal: 340,
            wildlifeScore: 90,
            pollinators: ['Black-chinned Hummingbirds', 'Honeybees', 'Bumblebees'],
            growth: {
                year1: { heightFt: 3.0, spreadFt: 2.5, caliperIn: 0.6 },
                year3: { heightFt: 6.5, spreadFt: 5.5, caliperIn: 1.4 },
                year5: { heightFt: 9.0, spreadFt: 8.0, caliperIn: 2.2 },
                year10: { heightFt: 11.0, spreadFt: 11.0, caliperIn: 3.0 }
            },
            badge: '🎺 Golden Trumpet Clusters',
            description: 'Prolific bright golden yellow bell clusters that flower non-stop throughout the entire Texas summer heat.'
        },
        {
            id: 'flame_acanthus',
            commonName: 'Flame Acanthus / Hummingbird Bush',
            scientificName: 'Anisacanthus quadrifidus var. wrightii',
            spanishName: 'Acanthus de Fuego',
            category: 'shrub',
            foliageType: 'deciduous',
            flowerColor: '#ff5722',
            bloomMonths: [6, 7, 8, 9, 10, 11],
            waterNeeds: 'Very Low',
            sunExposure: 'Full Sun to Light Shade',
            soilPreference: 'Clay, loam, rocky limestone',
            nurserySpec: {
                defaultContainer: '3-gal Container',
                caliperAtPlantingIn: 0.4,
                heightAtPlantingFt: 2.0,
                rootballDepthIn: 10,
                rootballDiameterIn: 12,
                estUnitCostUsd: 22.00
            },
            maxCoolingDeltaF: 4,
            annualStormwaterGal: 210,
            wildlifeScore: 91,
            pollinators: ['Hummingbirds', 'Swallowtail Butterflies'],
            growth: {
                year1: { heightFt: 2.0, spreadFt: 2.0, caliperIn: 0.4 },
                year3: { heightFt: 3.5, spreadFt: 3.5, caliperIn: 0.8 },
                year5: { heightFt: 4.8, spreadFt: 4.8, caliperIn: 1.2 },
                year10: { heightFt: 5.5, spreadFt: 5.5, caliperIn: 1.5 }
            },
            badge: '🔥 Summer Hummingbird Hub',
            description: 'Slender fiery orange tubes that withstand 100°F+ heat waves and act as crucial pitstops for south-bound autumn hummingbird migrations.'
        },
        {
            id: 'texas_lantana',
            commonName: 'Texas Lantana / Calico Bush',
            scientificName: 'Lantana urticoides Hayek',
            spanishName: 'Lantana Texana / Alfombrilla',
            category: 'pollinator',
            foliageType: 'perennial',
            flowerColor: '#ff9800',
            bloomMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12],
            waterNeeds: 'Ultra-low',
            sunExposure: 'Full Sun',
            soilPreference: 'Poor soils, clay, sandy loam',
            nurserySpec: {
                defaultContainer: '1-gal Pot',
                caliperAtPlantingIn: 0.25,
                heightAtPlantingFt: 1.0,
                rootballDepthIn: 7,
                rootballDiameterIn: 8,
                estUnitCostUsd: 12.00
            },
            maxCoolingDeltaF: 4,
            annualStormwaterGal: 190,
            wildlifeScore: 94,
            pollinators: ['Monarchs', 'Queens', 'Gulf Fritillary', 'Skippers'],
            growth: {
                year1: { heightFt: 1.5, spreadFt: 2.0, caliperIn: 0.25 },
                year3: { heightFt: 2.8, spreadFt: 3.8, caliperIn: 0.6 },
                year5: { heightFt: 3.8, spreadFt: 4.5, caliperIn: 0.9 },
                year10: { heightFt: 4.5, spreadFt: 5.0, caliperIn: 1.1 }
            },
            badge: '🦋 9-Month Butterfly Landing Pad',
            description: 'Tricolor flower umbels that change from bright yellow to rich orange and red. The number one nectar plant for RGV elementary pollinator waystations.'
        },
        {
            id: 'scarlet_sage',
            commonName: 'Scarlet Sage / Tropical Sage',
            scientificName: 'Salvia coccinea Buc\'hoz ex Etl.',
            spanishName: 'Salvia Roja',
            category: 'pollinator',
            foliageType: 'perennial wildflower',
            flowerColor: '#e53935',
            bloomMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11],
            waterNeeds: 'Low to Moderate',
            sunExposure: 'Full Sun to Dappled Shade',
            soilPreference: 'Rich loam to light clay',
            nurserySpec: {
                defaultContainer: '1-gal Pot',
                caliperAtPlantingIn: 0.2,
                heightAtPlantingFt: 1.0,
                rootballDepthIn: 7,
                rootballDiameterIn: 8,
                estUnitCostUsd: 10.00
            },
            maxCoolingDeltaF: 3,
            annualStormwaterGal: 150,
            wildlifeScore: 88,
            pollinators: ['Hummingbirds', 'Cloudless Sulfur', 'Native Bees'],
            growth: {
                year1: { heightFt: 1.5, spreadFt: 1.2, caliperIn: 0.2 },
                year3: { heightFt: 2.8, spreadFt: 2.2, caliperIn: 0.4 },
                year5: { heightFt: 3.2, spreadFt: 2.8, caliperIn: 0.6 },
                year10: { heightFt: 3.5, spreadFt: 3.2, caliperIn: 0.8 }
            },
            badge: '🌱 Self-Seeding Red Spikes',
            description: 'Bright red spikes that re-seed effortlessly each season, filling gaps under tree canopies with vibrant color and pollinator traffic.'
        },
        {
            id: 'prickly_pear',
            commonName: 'Texas Prickly Pear Cactus',
            scientificName: 'Opuntia engelmannii var. lindheimeri',
            spanishName: 'Nopal / Tuna',
            category: 'pollinator',
            foliageType: 'evergreen succulent',
            flowerColor: '#ffee58',
            bloomMonths: [4, 5, 6],
            waterNeeds: 'Zero supplementary water needed',
            sunExposure: 'Full Sun',
            soilPreference: 'Rocky, sandy, fast-draining clay',
            nurserySpec: {
                defaultContainer: '3-gal Container',
                caliperAtPlantingIn: 0.5,
                heightAtPlantingFt: 1.5,
                rootballDepthIn: 8,
                rootballDiameterIn: 10,
                estUnitCostUsd: 22.00
            },
            maxCoolingDeltaF: 3,
            annualStormwaterGal: 120,
            wildlifeScore: 92,
            pollinators: ['Diadasia Cactus Bees', 'Desert Tortoises', 'Cactus Wrens'],
            growth: {
                year1: { heightFt: 1.5, spreadFt: 2.0, caliperIn: 0.5 },
                year3: { heightFt: 3.2, spreadFt: 4.2, caliperIn: 1.3 },
                year5: { heightFt: 4.8, spreadFt: 5.8, caliperIn: 2.1 },
                year10: { heightFt: 6.5, spreadFt: 7.0, caliperIn: 2.6 }
            },
            badge: '🌵 Cultural Heritage & Nopal',
            description: 'Thick succulent pads with glorious yellow blossoms followed by deep magenta "tuna" fruits. Crucial habitat for native South Texas cactus bees.'
        }
    ];

    // Expose to window
    window.RGV_PLANT_PALETTE = RGV_PLANT_PALETTE;

})();
