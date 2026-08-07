// treeData is loaded from agriculture_physics_data.js

const root = d3.hierarchy(treeData);
const nodes = root.descendants();
const links = root.links();

const width = window.innerWidth;
const height = window.innerHeight;
const groundY = height - 350; // The Y position for the ground line and main node

const svg = d3.select("#chart-container").append("svg")
    .attr("viewBox", [0, 0, width, height]);

const group = svg.append("g");

// Zoom and pan
const zoom = d3.zoom()
    .scaleExtent([0.1, 4])
    .on("zoom", (e) => {
        group.attr("transform", e.transform);
    });

svg.call(zoom).on("dblclick.zoom", null);

// Define colors based on group
const colorScale = d3.scaleLinear()
    .domain([-5, -2, 0, 1, 4])
    .range(["#291002", "#78350f", "#f59e0b", "#10b981", "#67e8f9"]);

const realDataColor = d3.scaleOrdinal()
    .domain([1, 2, 3, 4])
    .range(["#10b981", "#fbbf24", "#f43f5e", "#8b5cf6"]);

const depthY = d3.scaleLinear()
    .domain([-5, 0, 1, 7])
    .range([groundY + 900, groundY, groundY - 450, -800]);

svg.on("click", (event) => {
    if (event.target.tagName !== "circle" && event.target.tagName !== "path") {
        node.classed("dimmed", false).classed("highlighted", false);
        link.classed("dimmed", false).classed("highlighted", false);
        simulation.alpha(0.3).restart();
    }
});

const layerCounts = {};
nodes.forEach(n => {
    if (!layerCounts[n.data.group]) layerCounts[n.data.group] = 0;
    layerCounts[n.data.group]++;
});

const activeLayers = Object.keys(layerCounts).map(Number).sort((a,b) => b - a);

activeLayers.forEach(g => {
    const lineY = depthY(g);
    const isGround = g === 0;

    group.append("line")
        .attr("class", "layer-guide")
        .attr("x1", -width * 5)
        .attr("y1", lineY)
        .attr("x2", width * 5)
        .attr("y2", lineY)
        .attr("stroke", isGround ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.05)")
        .attr("stroke-width", isGround ? 2 : 1)
        .attr("stroke-dasharray", "8,4");

    group.append("text")
        .attr("class", "layer-counter")
        .attr("x", width * 2.5)
        .attr("y", lineY - 20)
        .attr("text-anchor", "start")
        .attr("fill", "#fde047")
        .style("font-size", isGround ? "64px" : "48px")
        .style("font-weight", isGround ? "800" : "600")
        .style("pointer-events", "none")
        .style("letter-spacing", "2px")
        .style("filter", "drop-shadow(0 0 15px rgba(253, 224, 71, 0.8))")
        .text(`Level ${isGround ? "0 (Trunk)" : (g > 0 ? "+" + g : g)} • ${layerCounts[g].toLocaleString()} Nodes`);
});

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.data.id).distance(d => {
        if (d.target.data.group === -1) return 150;
        if (d.target.data.group < 0) return 60 + Math.abs(d.target.data.group) * 20;
        if (d.target.data.group === 1) return 350;
        return 40;
    }))
    .force("charge", d3.forceManyBody().strength(d => {
        if (d.data.group < 0) return -450;
        if (d.data.group === 0) return -1000;
        return -300;
    }))
    .force("y", d3.forceY(d => depthY(d.data.group)).strength(0.85))
    .force("x", d3.forceX(d => {
        let ancestor = d;
        while (ancestor.parent && ancestor.data.group > 1) {
            ancestor = ancestor.parent;
        }

        if (ancestor.data.group === 1 && !ancestor.data.isFiller) {
            if (ancestor.data.name.includes("Leadership")) return width * 0.10;
            if (ancestor.data.name.includes("Master's")) return width * 0.30;
            if (ancestor.data.name.includes("Undergraduates")) return width * 0.50;
            if (ancestor.data.name.includes("University Classes")) return width * 0.70;
            if (ancestor.data.name.includes("Region 1")) return width * 0.90;
        }

        return width / 2;
    }).strength(d => {
        if (d.data.group <= 0) return 0.05;

        let ancestor = d;
        while (ancestor.parent && ancestor.data.group > 1) {
            ancestor = ancestor.parent;
        }

        if (ancestor.data.group === 1 && !ancestor.data.isFiller) {
            return Math.max(0.06, 0.4 - (d.data.group * 0.05));
        }

        return 0.015;
    }))
    .force("collide", d3.forceCollide().radius(d => d.data.radius + 5));

const link = group.append("g")
    .attr("class", "link")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => {
        if (d.target.data.group < 0) {
            return Math.max(4, 25 - Math.abs(d.target.data.group) * 7);
        } else if (d.target.data.group === 0) {
            return 25;
        } else if (d.target.data.group === 1) {
            return 15;
        } else {
            return Math.max(1, 8 - d.target.data.group * 1.5);
        }
    })
    .attr("stroke", d => {
        if (d.target.data.group < 0) return "rgba(70, 35, 15, 0.7)";
        if (d.target.data.isFiller) return "rgba(255, 255, 255, 0.08)";
        if (d.target.data.isLegacy) return "rgba(0, 168, 80, 0.5)";
        return "rgba(245, 130, 32, 0.9)";
    });

const node = group.append("g")
    .attr("class", "node")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .classed("root", d => d.data.group === 0)
    .classed("branch-level-1", d => d.data.group === 1)
    .call(drag(simulation))
    .on("mouseover", function(event, d) {
        d3.select(this).select("text").style("opacity", 1);

        const tooltip = d3.select("#tooltip");
        tooltip.style("opacity", 1);

        document.getElementById('tt-name').innerText = d.data.name;

        let desc = d.data.description;
        if (!desc) {
            if (d.data.group < 0) desc = "Foundational science domain connected to Agroecology.";
            else if (d.data.group === 1 && d.data.isFiller) desc = "Procedural academic hub expansion.";
            else if (d.data.isFiller) desc = "Future cohort projection.";
            else if (d.data.isLegacy) desc = "Generational real-world impact.";
            else desc = "Agroecology network member.";
        }
        document.getElementById('tt-desc').innerText = desc;
    })
    .on("mousemove", function(event) {
        d3.select("#tooltip")
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 15) + "px");
    })
    .on("mouseout", function(event, d) {
        d3.select(this).select("text").style("opacity", 0);
        d3.select("#tooltip").style("opacity", 0);
    })
    .on("click", function(event, d) {
        if (d.data.group <= 0 || (d.children && d.children.length > 0)) {
            node.classed("dimmed", false).classed("highlighted", false);
            link.classed("dimmed", false).classed("highlighted", false);
            simulation.alpha(0.3).restart();
            return;
        }

        simulation.stop();

        const highlightedNodes = new Set();
        const highlightedLinks = new Set();

        let current = d;
        while(current) {
            highlightedNodes.add(current.data.id);
            if (current.parent) {
                highlightedLinks.add(`${current.parent.data.id}->${current.data.id}`);
                highlightedLinks.add(`${current.data.id}->${current.parent.data.id}`);
            }
            current = current.parent;
        }

        const trunkNode = nodes[0];
        const rootChildren = trunkNode.children.filter(c => c.data.group < 0);
        const numTopRoots = Math.min(rootChildren.length, Math.floor(Math.random() * 3) + 6);
        const randomRoots = rootChildren.sort(() => 0.5 - Math.random()).slice(0, numTopRoots);

        randomRoots.forEach(rootBranch => {
            highlightedNodes.add(rootBranch.data.id);
            highlightedLinks.add(`${trunkNode.data.id}->${rootBranch.data.id}`);
            highlightedLinks.add(`${rootBranch.data.id}->${trunkNode.data.id}`);

            let layer = [rootBranch];
            while (layer.length > 0) {
                const nextLayer = [];
                layer.forEach(n => {
                    if(n.children && n.children.length > 0) {
                        const childArray = Array.from(n.children);

                        const numToPick = Math.floor(Math.random() * 3) + 1;
                        const picks = childArray.sort(() => 0.5 - Math.random()).slice(0, numToPick);

                        picks.forEach(p => {
                            highlightedNodes.add(p.data.id);
                            highlightedLinks.add(`${n.data.id}->${p.data.id}`);
                            highlightedLinks.add(`${p.data.id}->${n.data.id}`);
                            nextLayer.push(p);
                        });
                    }
                });
                layer = nextLayer;
            }
        });

        node.classed("dimmed", n => !highlightedNodes.has(n.data.id))
            .classed("highlighted", n => highlightedNodes.has(n.data.id));

        link.classed("dimmed", l => !highlightedLinks.has(`${l.source.data.id}->${l.target.data.id}`) && !highlightedLinks.has(`${l.target.data.id}->${l.source.data.id}`))
            .classed("highlighted", l => highlightedLinks.has(`${l.source.data.id}->${l.target.data.id}`) || highlightedLinks.has(`${l.target.data.id}->${l.source.data.id}`));

        event.stopPropagation();
    });

node.each(function(d) {
    const el = d3.select(this);
    if (d.data.group === 0) {
        el.append("path")
            .attr("d", "M -100 60 C -40 10 -25 -50 -25 -120 L 25 -120 C 25 -50 40 10 100 60 Z")
            .attr("fill", "#b45309")
            .attr("stroke", "rgba(255,255,255,0.2)")
            .attr("stroke-width", 2)
            .style("filter", "drop-shadow(0 0 15px rgba(245,158,11,0.6))");
    } else {
        el.append("circle")
            .attr("r", Math.abs(d.data.radius))
            .attr("fill", () => {
                if (d.data.group > 0 && (!d.children || d.children.length === 0)) {
                    return "#fde047";
                }
                if (d.data.group < 0) return colorScale(d.data.group);
                if (d.data.isFiller) return "rgba(103, 232, 249, 0.4)";
                if (d.data.isLegacy) return "#00a850";
                return "#f58220";
            })
            .attr("stroke", () => {
                if (d.data.group > 0 && (!d.children || d.children.length === 0)) return "#fff";
                return "rgba(255, 255, 255, 0.4)";
            })
            .attr("stroke-width", () => {
                if (d.data.group > 0 && (!d.children || d.children.length === 0)) return 2;
                return 1;
            });
    }
});

node.append("text")
    .attr("dx", d => d.data.group === 0 ? 55 : 15)
    .attr("dy", "0.3em")
    .text(d => d.data.name);

simulation.on("tick", () => {
    nodes[0].fx = width / 2;
    nodes[0].fy = groundY;

    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => {
            if (d.source.data.group === 0 && d.target.data.group > 0) {
                return d.source.y - 110;
            }
            if (d.source.data.group === 0 && d.target.data.group < 0) {
                return d.source.y + 40;
            }
            return d.source.y;
        })
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
});

/**
 * Standard D3 drag behavior implementation for the agriculture physics tree nodes.
 * Explicitly sets coordinates (fx, fy) during user interaction to pin nodes,
 * keeping the trunk (group 0) permanently pinned.
 * @param {Object} simulation - The active D3 force simulation
 * @returns {Object} The configured d3.drag instance
 */
function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        if (d.data.group !== 0) {
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
