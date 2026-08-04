        // Generate abstract tree data procedurally
        const maxBranchDepth = 5;
        const maxRootDepth = -5; // Increased depth for longer roots
        let idCounter = 0;
        /**
         * Recursively generates abstract hierarchical tree data for the physics simulation.
         * Creates branches upwards (positive groupOffset) and roots downwards (negative groupOffset).
         * @param {number} groupOffset - The current structural depth/height of the tree layer
         * @returns {Object} A node object containing id, group, radius, and children
         */
        function generateTree(groupOffset) {
            const node = {
                id: `node-${idCounter++}`,
                group: groupOffset,
                radius: groupOffset < 0 ? 6 : Math.max(3, 15 - groupOffset * 2.5),
                children: []
            };

            if (groupOffset === 0) {
                // Main seed node (Ground level)
                // Branches
                const numBranches = 5;
                for (let i = 0; i < numBranches; i++) {
                    node.children.push(generateTree(1));
                }
                // Roots - Way more primary roots
                const numRoots = Math.floor(Math.random() * 3) + 4; // 4-6 main roots
                for (let i = 0; i < numRoots; i++) {
                    node.children.push(generateTree(-1));
                }
            } else if (groupOffset > 0 && groupOffset < maxBranchDepth) {
                // Branches growing up
                const numChildren = Math.floor(Math.random() * 3) + 2;
                for (let i = 0; i < numChildren; i++) {
                    node.children.push(generateTree(groupOffset + 1));
                }
            } else if (groupOffset < 0 && groupOffset > maxRootDepth) {
                // Roots growing down (More dense sub-roots)
                const numSubRoots = Math.floor(Math.random() * 3) + 2; // 2-4 sub roots
                for (let i = 0; i < numSubRoots; i++) {
                    node.children.push(generateTree(groupOffset - 1));
                }
            }

            if (node.children.length === 0) delete node.children;
            return node;
        }

        const treeData = generateTree(0);

        // Flatten the hierarchy to a set of nodes and links
        const root = d3.hierarchy(treeData);
        const nodes = root.descendants();
        const links = root.links();

        const width = window.innerWidth;
        const height = window.innerHeight;
        const groundY = height - 300; // Raised slightly to give roots more room to grow down

        const svg = d3.select("#chart-container").append("svg")
            .attr("viewBox", [0, 0, width, height]);

        const group = svg.append("g");

        // Zoom and pan
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on("zoom", (e) => {
                group.attr("transform", e.transform);
            });
        svg.call(zoom);

        // Add Ground Line
        group.append("line")
            .attr("class", "ground-line")
            .attr("x1", -width * 2)
            .attr("y1", groundY)
            .attr("x2", width * 3)
            .attr("y2", groundY)
            .attr("stroke", "rgba(255, 255, 255, 0.2)")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "8,4");

        // Define colors based on group
        // Roots (-5 to -1): Dark browns
        // Trunk (0): Brown
        // Branches (1 to 5): Greens to teals
        const colorScale = d3.scaleLinear()
            .domain([-5, -2, 0, 1, 3, 5])
            .range(["#291002", "#451a03", "#78350f", "#b45309", "#10b981", "#67e8f9"]);

        // The physics magic to make it look like a tree standing up with roots:
        // Roots are pulled much deeper (-5 goes to +400 Y)
        const depthY = d3.scaleLinear()
            .domain([maxRootDepth, 0, maxBranchDepth])
            .range([groundY + 450, groundY, 100]);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.data.id).distance(d => {
                if (d.target.data.group < 0) return 30 + Math.abs(d.target.data.group) * 10; // Roots have longer segments
                return 20 + Math.abs(d.target.data.group) * 5;
            }))
            .force("charge", d3.forceManyBody().strength(d => {
                if(d.data.group < 0) return -300; // Roots powerfully repel to create a wide thick network
                return -100 + (Math.abs(d.data.group) * 10);
            }))
            .force("y", d3.forceY(d => depthY(d.data.group)).strength(0.85)) // Tighter Y lock so they grow straight down
            .force("x", d3.forceX(width / 2).strength(0.05))
            .force("collide", d3.forceCollide().radius(d => d.data.radius + 5));

        // Draw links: very thick roots, thinning branches
        const link = group.append("g")
            .attr("class", "link")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => {
                if (d.target.data.group < 0) {
                    // Way thicker roots (from 35 down to 10 based on depth)
                    return Math.max(10, 35 - Math.abs(d.target.data.group) * 5);
                } else if (d.target.data.group === 0) {
                    return 20; // Trunk base
                } else {
                    return Math.max(1, 14 - d.target.data.group * 2); // Thinner branches
                }
            })
            // Dark rich color for thick roots
            .attr("stroke", d => d.target.data.group < 0 ? "rgba(90, 50, 30, 0.6)" : "rgba(255, 255, 255, 0.15)");

        // Draw nodes
        const node = group.append("g")
            .attr("class", "node")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", d => d.data.radius)
            .attr("fill", d => colorScale(d.data.group))
            .call(drag(simulation));

        simulation.on("tick", () => {
            // Pin the root node to the absolute center on the ground line
            nodes[0].fx = width / 2;
            nodes[0].fy = groundY;

            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        /**
         * Standard D3 drag behavior implementation for the physics tree nodes.
         * Sets fixed coordinates (fx, fy) during interaction, keeping the trunk pinned.
         * @param {Object} simulation - The active D3 force simulation
         * @returns {Object} The configured d3.drag instance
         */
        function drag(simulation) {
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                if (d.data.group !== 0) { // Keep seed pinned
                    d.fx = d.x;
                    d.fy = d.y;
                }
            }

            function dragged(event, d) {
                if (d.data.group !== 0) {
                    d.fx = event.x;
                    d.fy = event.y;
                }
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                if (d.data.group !== 0) {
                    d.fx = null;
                    d.fy = null;
                }
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }
