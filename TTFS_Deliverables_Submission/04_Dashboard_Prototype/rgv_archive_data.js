// Centralized Data Layer for the RGV Eco-Archive Parallax Site
// This makes it easy to add new blogs, historical notes, or locations without touching UI code.

const archiveNodes = [
    {
        type: "blog",
        title: "Anita's Blog – Blue-eyed Ensign",
        description: "A fascinating look at a family of insects found at a black light and moth sheet. Discover why these insects, while not always loved by humans, are crucial for a protein-rich diet for predators like lizards, geckos, and praying mantises.",
        link: "https://www.stbctmn.org/post/anita-s-blog-blue-eyed-ensign",
        date: "July 2026",
        icon: "🐛"
    },
    {
        type: "history",
        title: "\"Last Poet in the Woods\" Eco-Tapestry",
        description: "An eco-art and poetry collaboration at Quinta Mazatlán featuring watercolor paintings of wooded trails alongside nature poems, inspired by 'biophilia'.",
        link: "https://truchargv.com/a-taste-of-the-last-poet-in-the-woods-exhibit-an-ekphrastic-journey-through-art-and-nature/",
        date: "February 2025",
        icon: "🎨"
    },
    {
        type: "location",
        title: "Quinta Mazatlán & Tiny Forests",
        description: "Explore the 'Tiny Forests' (microforests) that serve as living laboratories for students, and check out the massive 'Destino Monarca' mural celebrating native pollinators.",
        link: "https://quintamazatlan.com",
        date: "Current",
        icon: "🦋",
        masterNaturalistApproved: true
    },
    {
        type: "history",
        title: "Nature of the Valley Exhibition",
        description: "A multi-medium artistic campaign hosted by UTRGV School of Art and STBCTMN to raise public awareness about the preservation of native ecosystems.",
        link: "https://www.stbctmn.org/post/nature-of-the-valley",
        date: "April 2019 / 2020",
        icon: "🖼️"
    },
    {
        type: "history",
        title: "Rio Reforestation Community Campaign",
        description: "One of the longest-running conservation efforts in South Texas, mobilizing over 700 volunteers annually to plant upwards of 10,000 native tree seedlings.",
        link: "https://www.fws.gov/refuge/lower-rio-grande-valley/rio-reforestation",
        date: "1994 - Present",
        icon: "🌱"
    },
    {
        type: "calendar",
        title: "RGV Birding Festival",
        description: "A major annual eco-tourism event. Look out for artists creating specific illustrations of native foliage to raise funds for habitat preservation.",
        link: "https://www.rgvbf.org",
        date: "November",
        icon: "📅"
    },
    {
        type: "history",
        title: "Carol Cullar's Rio Grande Advocacy",
        description: "Historical artist and writer who combined wildlife printmaking with poetry to educate the public on preserving the river corridor's native thornscrub.",
        link: "https://texaslegacy.org",
        date: "Historical",
        icon: "📜"
    },
    // --- FEDERAL PRESERVES ---
    {
        type: "location",
        title: "Santa Ana National Wildlife Refuge",
        description: "Known as the 'Jewel of the National Wildlife Refuge System.' Features a 100-foot suspension bridge and 40-foot observation tower for canopy-level views.",
        link: "https://www.fws.gov/refuge/santa-ana",
        date: "Alamo, TX",
        icon: "🦅",
        masterNaturalistApproved: true
    },
    {
        type: "location",
        title: "Lower Rio Grande Valley NWR",
        description: "A vital wildlife corridor protecting nearly 40,000 acres of diverse habitat stretching along the final 275 miles of the Rio Grande.",
        link: "https://www.fws.gov/refuge/lower-rio-grande-valley",
        date: "Multiple Tracts",
        icon: "🐾"
    },
    {
        type: "location",
        title: "Laguna Atascosa NWR",
        description: "The largest protected area of natural habitat in the Lower RGV. One of the last remaining strongholds for the endangered Texas ocelot.",
        link: "https://www.fws.gov/refuge/laguna-atascosa",
        date: "Los Fresnos, TX",
        icon: "🐆"
    },
    // --- STATE PARKS & WORLD BIRDING CENTERS ---
    {
        type: "location",
        title: "Bentsen-Rio Grande Valley State Park",
        description: "Headquarters for the World Birding Center. A car-free park protecting ancient riparian woodland and serving as a major stopover for migratory birds.",
        link: "https://tpwd.texas.gov/state-parks/bentsen-rio-grande-valley",
        date: "Mission, TX",
        icon: "🦉",
        masterNaturalistApproved: true
    },
    {
        type: "location",
        title: "Estero Llano Grande State Park",
        description: "Boasts the largest wetlands environment in the WBC network. Known for 'Alligator Lake' and spectacular wading birds.",
        link: "https://tpwd.texas.gov/state-parks/estero-llano-grande",
        date: "Weslaco, TX",
        icon: "🐊",
        masterNaturalistApproved: true
    },
    {
        type: "location",
        title: "Resaca de la Palma State Park",
        description: "Features the largest remaining tract of native sabal palm forest in the U.S. Built around ancient channels (resacas) of the Rio Grande.",
        link: "https://tpwd.texas.gov/state-parks/resaca-de-la-palma",
        date: "Brownsville, TX",
        icon: "🌴",
        masterNaturalistApproved: true
    },
    {
        type: "location",
        title: "Falcon State Park",
        description: "Situated along Falcon Reservoir, offering a unique blend of arid, desert-like scrubland for spotting Greater Roadrunners.",
        link: "https://tpwd.texas.gov/state-parks/falcon",
        date: "Falcon Heights, TX",
        icon: "🌵"
    },
    {
        type: "location",
        title: "Edinburg Scenic Wetlands",
        description: "A 40-acre urban oasis integrating nature into the city environment with large wetland ponds and an extensive butterfly garden.",
        link: "http://www.edinburgwbc.org",
        date: "Edinburg, TX",
        icon: "🦆"
    },
    {
        type: "location",
        title: "Harlingen Arroyo Colorado",
        description: "Located at Hugh Ramsey Nature Park, featuring native brushlands and shaded trails that act as a magnet for migrating songbirds.",
        link: "https://visitharlingentexas.com",
        date: "Harlingen, TX",
        icon: "🐦"
    },
    {
        type: "location",
        title: "Old Hidalgo Pumphouse Museum",
        description: "Bridges the gap between industrial history and natural beauty, surrounded by lush birding trails along the Rio Grande.",
        link: "https://www.cityofhidalgo.net",
        date: "Hidalgo, TX",
        icon: "🏭"
    },
    {
        type: "location",
        title: "South Padre Island Birding Center",
        description: "Provides vital resting grounds for birds crossing the Gulf. Features thousands of feet of boardwalks over the Laguna Madre.",
        link: "https://www.spibirding.org",
        date: "South Padre Island, TX",
        icon: "🐢"
    },
    // --- CITY PARKS & PRESERVES ---
    {
        type: "location",
        title: "McAllen Nature Center",
        description: "A hidden 33-acre gem tucked into the city offering winding trails through old-growth thornscrub and native flora.",
        link: "https://mcallenparks.net",
        date: "McAllen, TX",
        icon: "🌳",
        masterNaturalistApproved: true
    },
    {
        type: "location",
        title: "Valley Nature Center",
        description: "The oldest nature center in the RGV. A 6-acre secret garden focusing deeply on environmental education and native plants.",
        link: "https://www.weslaco.com",
        date: "Weslaco, TX",
        icon: "🌺",
        masterNaturalistApproved: true
    },
    {
        type: "location",
        title: "Lennox Foundation Southmost Preserve",
        description: "Managed by The Nature Conservancy, protecting one of the last two remaining stands of native Sabal Palms in the United States.",
        link: "https://www.nature.org",
        date: "Brownsville, TX",
        icon: "🌿"
    }
];
