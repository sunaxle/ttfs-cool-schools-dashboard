// Root Hierarchy combining Racelis Students (Branches) and Scientific Domains (Roots)

const domains = {
    "Ecology": [
        "Population Dynamics", "Community Ecology", "Ecosystem Services", "Biodiversity", "Biogeochemical Cycles", 
        "Trophic Cascades", "Restoration Ecology", "Landscape Ecology", "Disturbance Regimes", "Succession"
    ],
    "Biology": [
        "Botany", "Entomology", "Microbiology", "Genetics", "Plant Physiology", 
        "Mycology", "Zoology", "Pathology", "Taxonomy", "Evolutionary Biology"
    ],
    "Chemistry": [
        "Soil Chemistry", "Biochemistry", "Organic Chemistry", "Nutrient Cycling", "Toxicology",
        "Isotope Analysis", "Pesticide Chemistry", "Water Quality", "Photosynthesis Pathways", "Metabolomics"
    ],
    "Economics": [
        "Resource Economics", "Market Equilibrium", "Supply Chains", "Ecological Economics", "Cost-Benefit Analysis",
        "Agricultural Policy", "Labor Economics", "Yield Optimization", "Trade Tariffs", "Food Security"
    ],
    "Sociology": [
        "Rural Sociology", "Civic Engagement", "Food Justice", "Traditional Knowledge", "Environmental Justice",
        "Community Organizing", "Land Tenure", "Demographics", "Cultural Geography", "Policy Adoption"
    ],
    "Agronomy": [
        "Crop Rotation", "Cover Cropping", "Soil Mechanics", "Irrigation Management", "Weed Science",
        "Integrated Pest Management", "Tillage Practices", "Precision Agriculture", "Seed Saving", "Agroforestry"
    ],
    "Physics": [
        "Thermodynamics", "Fluid Dynamics", "Microclimates", "Radiation", "Hydrology",
        "Soil Physics", "Evapotranspiration", "Mechanization", "Spectroscopy", "Remote Sensing"
    ],
    "World Traveling": [
        "Cultural Exchange", "Global Perspective", "Cross-cultural Communication", 
        "Adaptability", "Empathy", "Historical Context", "Resilience", 
        "Language Acquisition", "Breaking Stereotypes", "Creative Inspiration"
    ]
};

// Generates specific sub-topic for deep roots
function getSubtopic(topic) {
    const subtopics = {
        "Cover Cropping": ["Legume Inoculation", "Biomass Accumulation", "Nitrogen Fixation"],
        "Entomology": ["Biocontrol Agents", "Pollinators", "Invasive Species"],
        "Microbiology": ["Mycorrhizal Fungi", "Soil Microbiome", "Pathogens"],
        "Precision Agriculture": ["Drone Imagery", "Sensors", "GIS Mapping"],
        "Community Organizing": ["Farmer Collectives", "Action Research", "Workshops"]
    };
    
    // Check if it's a World Traveling topic to provide a country
    if (domains["World Traveling"] && domains["World Traveling"].includes(topic)) {
        const countries = [
            "Japan", "Peru", "Iceland", "South Africa", "Morocco", "New Zealand", 
            "Italy", "Vietnam", "Costa Rica", "Spain", "Brazil", "India", "Kenya"
        ];
        return countries[Math.floor(Math.random() * countries.length)];
    }

    if (subtopics[topic]) return subtopics[topic][Math.floor(Math.random() * subtopics[topic].length)];
    return topic + " Applications";
}
// Build the roots array
const rootNodes = [];
let rootCounter = 0;

for (const [domain, topics] of Object.entries(domains)) {
    const domainNode = {
        id: `root-${rootCounter++}`,
        name: domain,
        group: -1, // Primary root
        radius: 12,
        children: []
    };
    
    topics.forEach(topic => {
        const topicNode = {
            id: `root-${rootCounter++}`,
            name: topic,
            group: -2, // Secondary root
            radius: 8,
            children: []
        };
        
        // Procedurally heavily branch into sub-roots to recreate the massive density 
        // from the original physics tree concept (Halved to tighten the layout)
        const numL3 = Math.floor(Math.random() * 2) + 1; // 1-2 subtopics
        for (let i = 0; i < numL3; i++) {
            const L3Node = {
                id: `root-${rootCounter++}`,
                name: getSubtopic(topic),
                group: -3,
                radius: 5,
                children: []
            };
            
            // Branch perfectly into Level -4 fibrous roots
            const numL4 = Math.floor(Math.random() * 2) + 1; // 1-2 deep roots
            for (let j = 0; j < numL4; j++) {
                const L4Node = {
                    id: `root-${rootCounter++}`,
                    name: "Field Study",
                    group: -4,
                    radius: 3,
                    children: []
                };
                
                // Branch into microscopic root tips Level -5
                const numL5 = Math.floor(Math.random() * 2); // 0-1 tips
                for (let k = 0; k < numL5; k++) {
                    L4Node.children.push({
                        id: `root-${rootCounter++}`,
                        name: "Data Point",
                        group: -5,
                        radius: 2
                    });
                }
                L3Node.children.push(L4Node);
            }
            topicNode.children.push(L3Node);
        }
        
        domainNode.children.push(topicNode);
    });
    
    rootNodes.push(domainNode);
}

// Build Agencies & Funders Root structure
const agencyFundersNode = {
    id: "root-agencies-funders",
    name: "Agencies & Funders",
    group: -1,
    radius: 12,
    children: [
        {
            id: "root-federal", name: "Federal Agencies", group: -2, radius: 8, children: [
                { id: "root-usda", name: "USDA", group: -3, radius: 5, children: [] },
                { id: "root-nrcs", name: "NRCS", group: -3, radius: 5, children: [] },
                { id: "root-nasa", name: "NASA", group: -3, radius: 5, children: [] }
            ]
        },
        {
            id: "root-state", name: "State Agencies", group: -2, radius: 8, children: [
                { id: "root-tceq", name: "TCEQ", group: -3, radius: 5, children: [] }
            ]
        },
        {
            id: "root-funders", name: "Grant Funders", group: -2, radius: 8, children: [
                { id: "root-large-funders", name: "Large Private Funders", group: -3, radius: 5, children: [] },
                { id: "root-small-funders", name: "Small Private Funders", group: -3, radius: 5, children: [] }
            ]
        }
    ]
};
// Add abstract procedural depth to them so they match the rest of the dark roots
agencyFundersNode.children.forEach(category => {
    category.children.forEach(entity => {
        const numGrants = Math.floor(Math.random() * 3) + 2; // 2-4 grants/projects per entity
        for(let i=0; i<numGrants; i++) {
            const projNode = { id: `root-funder-proj-${Math.random()}`, name: "Funded Project / Initiative", group: -4, radius: 3, children: [] };
            const numPoints = Math.floor(Math.random() * 3) + 1; // 1-3 outcomes
            for(let j=0; j<numPoints; j++) {
                projNode.children.push({ id: `root-funder-out-${Math.random()}`, name: "Agroecology Outcome", group: -5, radius: 2 });
            }
            entity.children.push(projNode);
        }
    });
});
rootNodes.push(agencyFundersNode);

// Build Agroecology Funders Network Root
const agroFundersNetwork = {
    id: "root-agroecology-network",
    name: "Agroecology Funders Network",
    group: -1,
    radius: 12,
    children: []
};
const globalRegions = ["North America", "South America", "Europe", "Africa", "Asia"];
globalRegions.forEach(region => {
    const regionNode = { id: `root-afn-${region}`, name: region, group: -2, radius: 8, children: [] };
    
    // Abstracting global scholars (a representation of the 400 total)
    const numScholars = Math.floor(Math.random() * 4) + 3; 
    for(let i=0; i<numScholars; i++) {
        const scholarNode = { id: `root-afn-sch-${Math.random()}`, name: "Global Agroecologist", group: -3, radius: 5, children: [] };
        
        // Abstracting global projects
        const numProjects = Math.floor(Math.random() * 3) + 2;
        for(let j=0; j<numProjects; j++) {
            const projNode = { id: `root-afn-proj-${Math.random()}`, name: "International Research", group: -4, radius: 3, children: [] };
            
            // Global outcomes
            const numOutcomes = Math.floor(Math.random() * 3) + 1;
            for(let k=0; k<numOutcomes; k++) {
                projNode.children.push({ id: `root-afn-out-${Math.random()}`, name: "Global Benchmark / Outcome", group: -5, radius: 2 });
            }
            scholarNode.children.push(projNode);
        }
        regionNode.children.push(scholarNode);
    }
    agroFundersNetwork.children.push(regionNode);
});
rootNodes.push(agroFundersNetwork);

// Build Community Market & Customers Root
const communityMarketNode = {
    id: "root-community-market",
    name: "Community Farmers Market",
    group: -1,
    radius: 12,
    children: [
        {
            id: "root-cm-customers", name: "Market Customers Fed", group: -2, radius: 8, children: []
        }
    ]
};
// Procedurally map out a dense root system for the thousands of customers
const customerBranch = communityMarketNode.children[0];
for (let yr = 1; yr <= 5; yr++) {
    const yrNode = { id: `root-cm-yr-${yr}`, name: `Year ${yr} Operations`, group: -3, radius: 5, children: [] };
    const numMonths = Math.floor(Math.random() * 5) + 3; // abstracting seasons
    for(let m = 0; m<numMonths; m++) {
        const moNode = { id: `root-cm-mo-${Math.random()}`, name: "Market Season", group: -4, radius: 3, children: [] };
        const numCust = Math.floor(Math.random() * 4) + 3; // dense root tips
        for(let c = 0; c<numCust; c++) {
            moNode.children.push({ id: `root-cm-c-${Math.random()}`, name: "Local Family Nourished", group: -5, radius: 2 });
        }
        yrNode.children.push(moNode);
    }
    customerBranch.children.push(yrNode);
}
rootNodes.push(communityMarketNode);

// Build South Texas Agricultural Network Root
const agNetworkNode = {
    id: "root-south-texas-ag",
    name: "South Texas Agricultural Network",
    group: -1,
    radius: 12,
    children: [
        {
            id: "root-farmers", name: "Local South Texas Farmers", group: -2, radius: 8, children: [
                { id: "root-organic", name: "Transition to Organic Practices", group: -3, radius: 5, children: [] },
                { id: "root-cover", name: "10+ Year Cover Cropping Farmers", group: -3, radius: 5, children: [] }
            ]
        },
        {
            id: "root-distribution", name: "Food Distribution Centers", group: -2, radius: 8, children: []
        },
        {
            id: "root-restaurants", name: "Local Farm-to-Table Restaurants", group: -2, radius: 8, children: []
        }
    ]
};

// 1. Transition to Organic Farmers
const numOrganic = Math.floor(Math.random() * 50) + 100; // 100-150 farmers
for (let i = 0; i < numOrganic; i++) {
    agNetworkNode.children[0].children[0].children.push({
        id: `root-org-farmer-${Math.random()}`,
        name: "Transitioning Farmer",
        group: -4,
        radius: 3,
        children: [
            { id: `root-org-out-${Math.random()}`, name: "Organic Yield", group: -5, radius: 2 }
        ]
    });
}

// 2. Cover Cropping Farmers
const numCover = Math.floor(Math.random() * 20) + 30; // 30-50 farmers
for (let i = 0; i < numCover; i++) {
    agNetworkNode.children[0].children[1].children.push({
        id: `root-cov-farmer-${Math.random()}`,
        name: "Cover Cropping Farmer",
        group: -4,
        radius: 3,
        children: [
            { id: `root-cov-out-${Math.random()}`, name: "Soil Health Marker", group: -5, radius: 2 }
        ]
    });
}

// 3. Distribution Centers
const distributionBranch = agNetworkNode.children[1];
const numDist = Math.floor(Math.random() * 5) + 5; // 5-10
for (let i = 0; i < numDist; i++) {
    const distNode = { id: `root-dist-${Math.random()}`, name: "Regional Food Hub", group: -3, radius: 5, children: [] };
    const numPantries = Math.floor(Math.random() * 4) + 3;
    for(let j = 0; j < numPantries; j++) {
        distNode.children.push({
            id: `root-pantry-${Math.random()}`, name: "Local Pantry / Vendor", group: -4, radius: 3, children: [
                { id: `root-dist-out-${Math.random()}`, name: "Meals Provided", group: -5, radius: 2 }
            ]
        });
    }
    distributionBranch.children.push(distNode);
}

// 4. Sourcing Restaurants
const restBranch = agNetworkNode.children[2];
const numRest = Math.floor(Math.random() * 10) + 15; // 15-25
for (let i = 0; i < numRest; i++) {
    restBranch.children.push({
        id: `root-rest-${Math.random()}`,
        name: "Sourcing Restaurant",
        group: -3,
        radius: 5,
        children: [
            { id: `root-rest-out1-${Math.random()}`, name: "Local Menu Item", group: -4, radius: 3, children: [
                { id: `root-rest-out2-${Math.random()}`, name: "Diners Fed", group: -5, radius: 2 }
            ]}
        ]
    });
}
rootNodes.push(agNetworkNode);

// Build the branches array from Racelis Data
const branchNodes = [
    {
        id: "branch-leadership",
        name: "Leadership & Postdocs",
        group: 1,
        radius: 10,
        children: [
            { id: "b1", name: "Dr. Pushpa Soti", group: 2, radius: 6, description: "Integrated pest management, biogeochemistry, mycorrhizal fungi." },
            { id: "b2", name: "Dr. Carlo Moreno", group: 2, radius: 6, description: "SOAR Postdoctoral fellow. Organic brassica production, reduced-till systems." },
            { id: "b3", name: "Dr. Bradley Christoffersen", group: 2, radius: 6, description: "Co-leader, CIT Project." },
            { id: "b4", name: "Dr. Liu", group: 2, radius: 6, description: "Economics Cohort Leader." }
        ]
    },
    {
        id: "branch-masters",
        name: "Master's Students",
        group: 1,
        radius: 10,
        children: [
            { id: "bm1", name: "Katie Lavallee", group: 3, radius: 6, description: "Thesis on native cover crop trials." },
            { id: "bm2", name: "Roberto Reyna Oviedo", group: 3, radius: 6, description: "AESS master's student." },
            { id: "bm3", name: "Allison Kaika", group: 3, radius: 6, description: "Relationship between local agriculture and civic engagement." },
            { id: "bm4", name: "Samikshya Subedi", group: 3, radius: 6, description: "Biological control agents for Silverleaf Nightshade." },
            { id: "bm5", name: "Savannah Rugg", group: 3, radius: 6, description: "Sustainable food systems, SOAR transition to organic farm management." },
            { id: "bm6", name: "Madeline Marshall", group: 3, radius: 6, description: "Chemical ecology." },
            { id: "bm7", name: "Stephanie Kasper", group: 3, radius: 6, description: "Cover crops as a pathway to improved soil health." },
            { id: "bm8", name: "Brenda Leal", group: 3, radius: 6, description: "Cattle Fever Tick Research." },
            { id: "bm9", name: "Katharine Jones", group: 3, radius: 6, description: "Ecology, tree worth in property value assessment." },
            { id: "bm10", name: "Habraham Lopez", group: 3, radius: 6, description: "Biological control." },
            { id: "bm11", name: "John Brush", group: 3, radius: 6, description: "Avian ecology, bird communities of urban areas." },
            { id: "bm12", name: "Jorge Cantu", group: 3, radius: 6, description: "Tree Campus USA Initiative." },
            { id: "bm13", name: "Joy", group: 3, radius: 6, description: "Heavy metal contamination patterns in agricultural sites." },
            { id: "bm14", name: "Qulina", group: 3, radius: 6, description: "Effective Inoculation Techniques in Leguminous cover crops." },
            { id: "bm15", name: "Manish", group: 3, radius: 6, description: "CIT Cohort 1 (2021-2023)." },
            { id: "bm16", name: "Daphne", group: 3, radius: 6, description: "CIT Cohort 1 (2021-2023)." },
            { id: "bm17", name: "Adeg", group: 3, radius: 6, description: "CIT Cohort 1 (2021-2023)." },
            { id: "bm18", name: "Mia", group: 3, radius: 6, description: "CIT Cohort 1 (2021-2023)." },
            { id: "bm19", name: "Fabrizio", group: 3, radius: 6, description: "CIT Middle Cohort (2022-2024)." },
            { id: "bm20", name: "Carlos", group: 3, radius: 6, description: "CIT Middle Cohort (2022-2024)." },
            { id: "bm21", name: "McKenzie", group: 3, radius: 6, description: "CIT Middle Cohort (2022-2024)." },
            { id: "bm22", name: "Anup", group: 3, radius: 6, description: "Economics Cohort." },
            { id: "bm23", name: "Bonnie", group: 3, radius: 6, description: "Economics Cohort." },
            { id: "bm24", name: "Pravti", group: 3, radius: 6, description: "Economics Cohort." }
        ]
    },
    {
        id: "branch-undergrad",
        name: "Undergraduates & Interns",
        group: 1,
        radius: 10,
        children: [
            { id: "bu1", name: "Matt Kutugata", group: 4, radius: 6, description: "Drone imagery and AI to evaluate cover crops." },
            { id: "bu2", name: "Marisol Cervantes", group: 4, radius: 6, description: "Program assistant and garden manager." },
            { id: "bu3", name: "Luzyannet Ballesteros", group: 4, radius: 6, description: "Heavy Metal Contamination and Environment Relationships." },
            { id: "bu4", name: "Alejandra Fuentes", group: 4, radius: 6, description: "Host specificity for RGV mites." },
            { id: "bu5", name: "Mia Infante", group: 4, radius: 6, description: "Agroecology Communications Coordinator." },
            { id: "bu6", name: "Joseph Villarreal", group: 4, radius: 6, description: "Biocontrol agents for Arundo donax." },
            { id: "bu7", name: "Kevin Thompson", group: 4, radius: 6, description: "Predator-prey relationship of invasive citrus insects." },
            { id: "bu8", name: "Guadalupe Diaz", group: 4, radius: 6, description: "Fungal interactions with maize." },
            { id: "bu9", name: "Brian Trich", group: 4, radius: 6, description: "Entomology and biologic control programs." },
            { id: "bu10", name: "Alma", group: 4, radius: 6, description: "Ecology and phenology of Giant Reed." },
            { id: "bu11", name: "Eleanor", group: 4, radius: 6, description: "Cover crop research." },
            { id: "bu12", name: "Jesus Gonzalez", group: 4, radius: 6, description: "Testing diets for the Mexican fruit fly." },
            { id: "bu13", name: "Stefani Gocon", group: 4, radius: 6, description: "Insect biodiversity at different canopy strata." },
            { id: "bu14", name: "Heather Hernandez", group: 4, radius: 6, description: "Organics research at Hill Top farm." },
            { id: "bu15", name: "Rico Marez", group: 4, radius: 6, description: "Fertilizer research; salinity tolerance of tomatoes." },
            { id: "bu16", name: "Andrew Wells", group: 4, radius: 6, description: "USDA Arundo Project." },
            { id: "bu17", name: "Claudia Pena", group: 4, radius: 6, description: "Biological control of Arundo donax." },
            { id: "bu18", name: "Julian Gonzales", group: 4, radius: 6, description: "Insect biodiversity." },
            { id: "bu19", name: "Jose Gonzalez", group: 4, radius: 6, description: "Aquaponics project comparing distinct growing methods." },
            { id: "bu20", name: "Rocio Hernandez", group: 4, radius: 6, description: "Bridging organic food gaps with CENA." },
            { id: "bu21", name: "Darcy Gonzalez", group: 4, radius: 6, description: "Plant stress on the garden pea and legumes." },
            { id: "bu22", name: "Rebekah Lopez", group: 4, radius: 6, description: "Spectroradiometer analysis on tomato plant wavelengths." },
            { id: "bu23", name: "Diana Cantu", group: 4, radius: 6, description: "Organic weed irradication." },
            { id: "bu24", name: "Amrita Singh", group: 4, radius: 6, description: "Mycorrhizal fungi research." },
            { id: "bu25", name: "Mylen Arias", group: 4, radius: 6, description: "Lab intern, environmental engagement." },
            { id: "bu26", name: "Quentin Van Camp", group: 4, radius: 6, description: "Agroecology internship focusing on leaf cutter ants." },
            { id: "bu27", name: "Bobby Escamilla", group: 4, radius: 6, description: "Evapotranspiration water use in A. donax." },
            { id: "bu28", name: "Andre Munoz", group: 4, radius: 6, description: "USDA Cattle Tick Fever Research." },
            { id: "bu29", name: "Desi", group: 4, radius: 6, description: "Technical Agricultural Specialist." },
            { id: "bu30", name: "Omar Montalvo", group: 4, radius: 6, description: "Technical Agricultural Specialist." },
            { id: "bu31", name: "Angelita Garcia", group: 4, radius: 6, description: "Agroecology Intern." },
            { id: "bu32", name: "Suzanne Elhaj", group: 4, radius: 6, description: "Agroecology Intern." }
        ]
    }
];

// Build procedural filler canopy branches to create thick volume
const fillerCanopyNodes = [];
let fillerCounter = 0;
const numFillerBranches = 6; // 6 main filler branches extending from trunk
for (let i = 0; i < numFillerBranches; i++) {
    const bNode = {
        id: `filler-b-${fillerCounter++}`,
        name: "Future Cohort / Academic Hub",
        group: 1,
        radius: 8,
        isFiller: true,
        children: []
    };
    
    // Sub-branches (group 2)
    const numL2 = Math.floor(Math.random() * 3) + 3; // 3-5
    for (let j = 0; j < numL2; j++) {
        const L2Node = {
            id: `filler-b-${fillerCounter++}`,
            name: "Research Initiative",
            group: 2,
            radius: 5,
            isFiller: true,
            children: []
        };
        
        // Leaves (group 3)
        const numL3 = Math.floor(Math.random() * 3) + 4; // 4-6
        for (let k = 0; k < numL3; k++) {
            const L3Node = {
                id: `filler-b-${fillerCounter++}`,
                name: "Alumni / Collaborator",
                group: 3,
                radius: 3,
                isFiller: true,
                children: []
            };
            
            // Canopy tips (group 4)
            const numL4 = Math.floor(Math.random() * 2) + 2; // 2-3
            for (let l = 0; l < numL4; l++) {
                L3Node.children.push({
                    id: `filler-b-${fillerCounter++}`,
                    name: "Future Project",
                    group: 4,
                    radius: 2,
                    isFiller: true
                });
            }
            L2Node.children.push(L3Node);
        }
        bNode.children.push(L2Node);
    }
    fillerCanopyNodes.push(bNode);
}

// Append 5-year generational legacy nodes to real student data
let legacyCounter = 0;
branchNodes.forEach(cohort => {
    cohort.children.forEach(student => {
        student.children = [];
        
        // Level 1: Direct Impacts (Mentees, Immediate Projects)
        const numL1 = Math.floor(Math.random() * 3) + 2; // 2-4 direct impact nodes
        for(let i=0; i<numL1; i++) {
            const l1Node = {
                id: `legacy-${legacyCounter++}`,
                name: "Mentee / Project",
                group: student.group + 1,
                radius: 4,
                isLegacy: true,
                children: []
            };
            
            // Level 2: Generational Field Impact
            const numL2 = Math.floor(Math.random() * 4) + 2; // 2-5 secondary impacts
            for(let j=0; j<numL2; j++) {
                l1Node.children.push({
                    id: `legacy-${legacyCounter++}`,
                    name: "Broader Impact",
                    group: student.group + 2,
                    radius: 2,
                    isLegacy: true
                });
            }
            student.children.push(l1Node);
        }
    });
});

// Build Region 1 Community Teachers Branch
const region1Nodes = [];
const r1branch = {
    id: "branch-region1",
    name: "Region 1 Community Teachers",
    group: 1,
    radius: 10,
    children: []
};
let r1Counter = 0;

for (let c = 1; c <= 5; c++) {
    const yearsActive = 6 - c;
    const cohortNode = {
        id: `r1c-${c}`,
        name: `Cohort ${c} (${yearsActive} Years Active)`,
        group: 2,
        radius: 8,
        children: []
    };
    
    // Abstracting 20 teachers into a visually manageable cluster (so the browser engine doesn't crash)
    const numTeachers = Math.floor(Math.random() * 4) + 4; // 4-7 teacher clusters
    for (let t = 0; t < numTeachers; t++) {
        const teacherNode = {
            id: `r1t-${r1Counter++}`,
            name: "Community Teacher",
            group: 3,
            radius: 5,
            children: []
        };
        
        // Years of teaching
        for (let y = 1; y <= yearsActive; y++) {
            const yearNode = {
                id: `r1y-${r1Counter++}`,
                name: `Year ${y} Instruction`,
                group: 4,
                radius: 3,
                children: []
            };
            
            // Abstracting the 50-100 students into heavy nodes
            const numStudents = Math.floor(Math.random() * 3) + 3; // 3-5 massive student clusters
            for (let s = 0; s < numStudents; s++) {
                yearNode.children.push({
                    id: `r1s-${r1Counter++}`,
                    name: "Impacted Students",
                    group: 5,
                    radius: 2,
                    isLegacy: true // Paint these as the legacy green projection
                });
            }
            teacherNode.children.push(yearNode);
        }
        cohortNode.children.push(teacherNode);
    }
    r1branch.children.push(cohortNode);
}
region1Nodes.push(r1branch);

// Build University Classes Branch (2013-Present)
const directClassesNodes = [];
const dcbranch = {
    id: "branch-classes",
    name: "University Classes (2013-Present)",
    group: 1,
    radius: 10,
    children: []
};
let dcCounter = 0;

for (let yr = 2013; yr <= 2025; yr++) {
    const classNode = {
        id: `dcc-${yr}`,
        name: `${yr} Student Cohort`,
        group: 2,
        radius: 8,
        children: []
    };
    
    // Abstracting hundreds of students into manageable clusters
    const numSemesters = Math.floor(Math.random() * 3) + 2; // 2-4 instruction blocks
    for (let s = 0; s < numSemesters; s++) {
        const semesterNode = {
            id: `dcs-${dcCounter++}`,
            name: "Direct Instruction",
            group: 3,
            radius: 5,
            children: []
        };
        
        // Abstract student groups (Increased to mathematically hit the ~777 node target for Group 4)
        const numBlocks = Math.floor(Math.random() * 3) + 5; // 5-7 groups (up from 2-4)
        for (let b = 0; b < numBlocks; b++) {
            const blockNode = {
                id: `dcb-${dcCounter++}`,
                name: "Student Group",
                group: 4,
                radius: 3,
                children: []
            };
            
            // Legacy impact (using UTRGV Green projection)
            const numImpacts = Math.floor(Math.random() * 3) + 2; 
            for (let i = 0; i < numImpacts; i++) {
                blockNode.children.push({
                    id: `dci-${dcCounter++}`,
                    name: "Career / Outreach Impact",
                    group: 5,
                    radius: 2,
                    isLegacy: true // Paint these as the legacy green projection
                });
            }
            semesterNode.children.push(blockNode);
        }
        classNode.children.push(semesterNode);
    }
    dcbranch.children.push(classNode);
}
directClassesNodes.push(dcbranch);

const treeData = {
    id: "trunk",
    name: "Dr. Alex Racelis",
    group: 0,
    radius: 20,
    description: "Agroecology Program Director",
    children: [...rootNodes, ...branchNodes, ...directClassesNodes, ...region1Nodes, ...fillerCanopyNodes]
};
