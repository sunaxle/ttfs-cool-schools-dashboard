const treeData = {
    name: "Dr. Alex Racelis",
    group: "root",
    description: "Agroecology Program Director",
    children: [
        {
            name: "Leadership & Postdocs",
            group: "leadership",
            children: [
                { name: "Dr. Pushpa Soti", group: "leadership", description: "Integrated pest management, biogeochemistry, mycorrhizal fungi." },
                { name: "Dr. Carlo Moreno", group: "leadership", description: "SOAR Postdoctoral fellow. Organic brassica production, reduced-till systems." },
                { name: "Dr. Bradley Christoffersen", group: "leadership", description: "Co-leader, CIT Project." },
                { name: "Dr. Liu", group: "leadership", description: "Economics Cohort Leader." }
            ]
        },
        {
            name: "Master's Students",
            group: "masters",
            children: [
                { name: "Katie Lavallee", group: "masters", description: "Thesis on native cover crop trials." },
                { name: "Roberto Reyna Oviedo", group: "masters", description: "AESS master's student." },
                { name: "Allison Kaika", group: "masters", description: "Relationship between local agriculture and civic engagement." },
                { name: "Samikshya Subedi", group: "masters", description: "Biological control agents for Silverleaf Nightshade." },
                { name: "Savannah Rugg", group: "masters", description: "Sustainable food systems, SOAR transition to organic farm management." },
                { name: "Madeline Marshall", group: "masters", description: "Chemical ecology." },
                { name: "Stephanie Kasper", group: "masters", description: "Cover crops as a pathway to improved soil health." },
                { name: "Brenda Leal", group: "masters", description: "Cattle Fever Tick Research." },
                { name: "Katharine Jones", group: "masters", description: "Ecology, tree worth in property value assessment." },
                { name: "Habraham Lopez", group: "masters", description: "Biological control." },
                { name: "John Brush", group: "masters", description: "Avian ecology, bird communities of urban areas." },
                { name: "Jorge Cantu", group: "masters", description: "Tree Campus USA Initiative." },
                { name: "Joy", group: "masters", description: "Heavy metal contamination patterns in agricultural sites." },
                { name: "Qulina", group: "masters", description: "Effective Inoculation Techniques in Leguminous cover crops." },
                { name: "Manish", group: "masters", description: "CIT Cohort 1 (2021-2023)." },
                { name: "Daphne", group: "masters", description: "CIT Cohort 1 (2021-2023)." },
                { name: "Adeg", group: "masters", description: "CIT Cohort 1 (2021-2023)." },
                { name: "Mia", group: "masters", description: "CIT Cohort 1 (2021-2023)." },
                { name: "Fabrizio", group: "masters", description: "CIT Middle Cohort (2022-2024)." },
                { name: "Carlos", group: "masters", description: "CIT Middle Cohort (2022-2024)." },
                { name: "McKenzie", group: "masters", description: "CIT Middle Cohort (2022-2024)." },
                { name: "Anup", group: "masters", description: "Economics Cohort." },
                { name: "Bonnie", group: "masters", description: "Economics Cohort." },
                { name: "Pravti", group: "masters", description: "Economics Cohort." }
            ]
        },
        {
            name: "Undergraduates & Interns",
            group: "undergrad",
            children: [
                { name: "Matt Kutugata", group: "undergrad", description: "Drone imagery and AI to evaluate cover crops." },
                { name: "Marisol Cervantes", group: "undergrad", description: "Program assistant and garden manager." },
                { name: "Luzyannet Ballesteros", group: "undergrad", description: "Heavy Metal Contamination and Environment Society Relationships." },
                { name: "Alejandra Fuentes", group: "undergrad", description: "Host specificity for RGV mites transmitting citrus leprosis virus." },
                { name: "Mia Infante", group: "undergrad", description: "Agroecology Communications Coordinator." },
                { name: "Joseph Villarreal", group: "undergrad", description: "Biocontrol agents for Arundo donax." },
                { name: "Kevin Thompson", group: "undergrad", description: "Predator-prey relationship of invasive citrus insects." },
                { name: "Guadalupe Diaz", group: "undergrad", description: "Fungal interactions with maize." },
                { name: "Brian Trich", group: "undergrad", description: "Entomology and acarology, biological control programs." },
                { name: "Alma", group: "undergrad", description: "Ecology and phenology of Giant Reed (Arundo donax)." },
                { name: "Eleanor", group: "undergrad", description: "Cover crop research." },
                { name: "Jesus Gonzalez", group: "undergrad", description: "Testing diets for the Mexican fruit fly." },
                { name: "Stefani Gocon", group: "undergrad", description: "Insect biodiversity at different canopy strata." },
                { name: "Heather Hernandez", group: "undergrad", description: "Organics research at Hill Top farm." },
                { name: "Rico Marez", group: "undergrad", description: "Fertilizer research; salinity & drought tolerance of tomatoes." },
                { name: "Andrew Wells", group: "undergrad", description: "USDA Arundo Project." },
                { name: "Claudia Pena", group: "undergrad", description: "Biological control of Arundo donax." },
                { name: "Julian Gonzales", group: "undergrad", description: "Insect biodiversity." },
                { name: "Jose Gonzalez", group: "undergrad", description: "Aquaponics project comparing distinct growing methods." },
                { name: "Rocio Hernandez", group: "undergrad", description: "Bridging organic food gaps with CENA." },
                { name: "Darcy Gonzalez", group: "undergrad", description: "Plant stress on the garden pea and legumes." },
                { name: "Rebekah Lopez", group: "undergrad", description: "Spectroradiometer analysis on tomato plant wavelengths." },
                { name: "Diana Cantu", group: "undergrad", description: "Organic weed irradication." },
                { name: "Amrita Singh", group: "undergrad", description: "Mycorrhizal fungi research." },
                { name: "Mylen Arias", group: "undergrad", description: "Lab intern, environmental engagement." },
                { name: "Quentin Van Camp", group: "undergrad", description: "Agroecology internship focusing on leaf cutter ants." },
                { name: "Bobby Escamilla", group: "undergrad", description: "Evapotranspiration water use in A. donax." },
                { name: "Andre Munoz", group: "undergrad", description: "USDA Cattle Tick Fever Research, controlling guinea grass." },
                { name: "Desi", group: "undergrad", description: "Technical Agricultural Specialist." },
                { name: "Omar Montalvo", group: "undergrad", description: "Technical Agricultural Specialist." },
                { name: "Angelita Garcia", group: "undergrad", description: "Agroecology Intern." },
                { name: "Suzanne Elhaj", group: "undergrad", description: "Agroecology Intern." }
            ]
        }
    ]
};
