/**
 * Initialization and D3.js force-directed graph logic for the Racelis Academic Network.
 * Maps cohorts interactively using physics-based force simulation.
 */
// Flatten the hierarchy to a set of nodes and links
const root = d3.hierarchy(treeData);
        const nodes = root.descendants();
        const links = root.links();

        const width = window.innerWidth;
        const height = window.innerHeight;

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

        // Define colors
        const colorScale = {
            "root": "#c084fc",
            "leadership": "#f59e0b",
            "masters": "#3b82f6",
            "undergrad": "#10b981"
        };

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(80))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2 + 50))
            .force("collide", d3.forceCollide().radius(25));

        const link = group.append("g")
            .attr("class", "link")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.source.depth === 0 ? 4 : 2));

        const node = group.append("g")
            .attr("class", "node")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .call(drag(simulation));

        node.append("circle")
            .attr("r", d => d.depth === 0 ? 16 : (d.depth === 1 ? 12 : 8))
            .attr("fill", d => colorScale[d.data.group])
            .on("mouseover", function(event, d) {
                const tooltip = d3.select("#tooltip");
                tooltip.style("opacity", 1);

                document.getElementById('tt-name').innerText = d.data.name;
                document.getElementById('tt-desc').innerText = d.data.description || 'No description available.';
                document.getElementById('tt-group').innerText = (d.data.group || 'Node').toUpperCase();

                let bgColors = {
                    "leadership": "rgba(245, 158, 11, 0.2)",
                    "masters": "rgba(59, 130, 246, 0.2)",
                    "undergrad": "rgba(16, 185, 129, 0.2)",
                    "root": "rgba(192, 132, 252, 0.2)"
                };
                document.getElementById('tt-group').style.background = bgColors[d.data.group] || "rgba(255,255,255,0.1)";
            })
            .on("mousemove", function(event) {
                d3.select("#tooltip")
                    .style("left", (event.pageX + 15) + "px")
                    .style("top", (event.pageY - 15) + "px");
            })
            .on("mouseout", function() {
                d3.select("#tooltip").style("opacity", 0);
            });

        node.append("text")
            .attr("x", 12)
            .attr("y", "0.31em")
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("fill", "none")
            .attr("stroke", "rgba(15,23,42,0.8)")
            .attr("stroke-width", 3);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("transform", d => `translate(${d.x},${d.y})`);
        });

        /**
         * Standard D3 drag behavior implementation for the force graph nodes.
         * Sets fixed coordinates (fx, fy) during interaction to pin nodes.
         * @param {Object} simulation - The active D3 force simulation
         * @returns {Object} The configured d3.drag instance
         */
        function drag(simulation) {
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }
