/**
 * Initialization and D3.js logic for the Racelis Academic Network Radial Tree.
 * Maps cohorts radially from the root node.
 */
const width = window.innerWidth;
        const height = window.innerHeight - 100;
        const radius = Math.min(width, height) / 2 - 100;

        const svg = d3.select("#chart-container").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const tree = d3.tree()
            .size([2 * Math.PI, radius])
            .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

        const root = d3.hierarchy(treeData);
        tree(root);

        // Zoom and Pan
        const zoom = d3.zoom()
            .scaleExtent([0.5, 3])
            .on("zoom", (e) => {
                svg.attr("transform", `translate(${width/2 + e.transform.x}, ${height/2 + e.transform.y}) scale(${e.transform.k})`);
            });
        d3.select("svg").call(zoom);

        // Links
        const link = svg.append("g")
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("class", "link")
            .attr("d", d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y));

        // Nodes
        const node = svg.append("g")
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("class", d => `node ${d.data.group || ''}`)
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90})
                translate(${d.y},0)
            `);

        node.append("circle")
            .attr("r", d => d.depth === 0 ? 8 : (d.depth === 1 ? 6 : 4))
            .on("mouseover", function(event, d) {
                const tooltip = d3.select("#tooltip");
                tooltip.style("opacity", 1);

                document.getElementById('tt-name').innerText = d.data.name;
                document.getElementById('tt-desc').innerText = d.data.description || 'No description available.';
                document.getElementById('tt-group').innerText = (d.data.group || 'Node').toUpperCase();

                let color = "rgba(255,255,255,0.1)";
                if(d.data.group === 'leadership') color = "rgba(245, 158, 11, 0.2)";
                if(d.data.group === 'masters') color = "rgba(59, 130, 246, 0.2)";
                if(d.data.group === 'undergrad') color = "rgba(16, 185, 129, 0.2)";
                if(d.data.group === 'root') color = "rgba(192, 132, 252, 0.2)";
                document.getElementById('tt-group').style.background = color;
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
            .attr("dy", "0.31em")
            .attr("x", d => d.x < Math.PI === !d.children ? 8 : -8)
            .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
            .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("stroke", "rgba(15,23,42,0.8)")
            .attr("stroke-width", 3);
