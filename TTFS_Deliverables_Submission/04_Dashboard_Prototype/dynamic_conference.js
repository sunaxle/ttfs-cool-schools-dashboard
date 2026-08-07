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

// Define distinct bright colors for the actual populated academic cohorts
const realDataColor = d3.scaleOrdinal()
    .domain([1, 2, 3, 4])
    .range(["#10b981", "#fbbf24", "#f43f5e", "#8b5cf6"]); // Emerald, Amber, Rose, Violet

// The physics target Y coordinates
const depthY = d3.scaleLinear()
    .domain([-5, 0, 1, 7]) // Explicitly define a massive vertical jump for group 1
    .range([groundY + 900, groundY, groundY - 450, -800]);

// Background click clears active golden paths and unfreezes tree
svg.on("click", (event) => {
    if (event.target.tagName !== "circle" && event.target.tagName !== "path") {
        node.classed("dimmed", false).classed("highlighted", false);
        link.classed("dimmed", false).classed("highlighted", false);
        simulation.alpha(0.3).restart();
    }
});

// Add Layer Guides and Node Counters
const layerCounts = {};
nodes.forEach(n => {
    if (!layerCounts[n.data.group]) layerCounts[n.data.group] = 0;
    layerCounts[n.data.group]++;
});

const activeLayers = Object.keys(layerCounts).map(Number).sort((a,b) => b - a); // Top to bottom

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
        .attr("x", width * 2.5) // Pushed extremely far to the right
        .attr("y", lineY - 20)
        .attr("text-anchor", "start") // Expand outward bounds
        .attr("fill", "#fde047") // Bright sunflower yellow
        .style("font-size", isGround ? "64px" : "48px")
        .style("font-weight", isGround ? "800" : "600")
        .style("pointer-events", "none")
        .style("letter-spacing", "2px")
        .style("filter", "drop-shadow(0 0 15px rgba(253, 224, 71, 0.8))") // Glowing neon drop-shadow
        .text(`Level ${isGround ? "0 (Trunk)" : (g > 0 ? "+" + g : g)} • ${layerCounts[g].toLocaleString()} Nodes`);
});

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.data.id).distance(d => {
        if (d.target.data.group === -1) return 150; // Primary roots long
        if (d.target.data.group < 0) return 60 + Math.abs(d.target.data.group) * 20;
        if (d.target.data.group === 1) return 350; // Massive link length for main branches so they shoot up first
        return 40;
    }))
    .force("charge", d3.forceManyBody().strength(d => {
        if (d.data.group < 0) return -450; // Powerfully repel to spread roots extremely wide
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
            if (ancestor.data.name.includes("Leadership")) return width * 0.10; // Far left
            if (ancestor.data.name.includes("Master's")) return width * 0.30;   // Mid left
            if (ancestor.data.name.includes("Undergraduates")) return width * 0.50; // Center
            if (ancestor.data.name.includes("University Classes")) return width * 0.70; // Mid right
            if (ancestor.data.name.includes("Region 1")) return width * 0.90;   // Far right
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

// Draw links
const link = group.append("g")
    .attr("class", "link")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => {
        if (d.target.data.group < 0) {
            return Math.max(4, 25 - Math.abs(d.target.data.group) * 7);
        } else if (d.target.data.group === 0) {
            return 25; // Trunk base
        } else if (d.target.data.group === 1) {
            return 15; // Main branches
        } else {
            return Math.max(1, 8 - d.target.data.group * 1.5); // Thinner branches
        }
    })
    .attr("stroke", d => {
        if (d.target.data.group < 0) return "rgba(70, 35, 15, 0.7)";
        if (d.target.data.isFiller) return "rgba(255, 255, 255, 0.08)";
        if (d.target.data.isLegacy) return "rgba(0, 168, 80, 0.5)";
        return "rgba(245, 130, 32, 0.9)";
    });

// Draw nodes
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

// Render distinct shapes conditionally
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

// Add text labels
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
 * Standard D3 drag behavior implementation for dynamic conference nodes.
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

// CONFERENCE MODE
document.getElementById('conference-btn').addEventListener('click', function() {
    simulation.stop();
    this.disabled = true;
    this.style.opacity = '0.5';
    this.innerText = 'SYNCING NETWORK...';

    const leafNodes = nodes.filter(d => d.data.group > 0 && (!d.children || d.children.length === 0)).filter((d, i) => i % 10 === 0);
    const sporeNodes = nodes.filter(d => d.data.group < 0 && (!d.children || d.children.length === 0)).filter((d, i) => i % 10 === 0);

    node.transition().duration(2000).style("opacity", 0.15);
    link.transition().duration(2000).style("opacity", 0.05);
    d3.selectAll(".layer-counter").transition().duration(1000).style("opacity", 0.1);

    const activeParticles = [];
    leafNodes.forEach(n => {
        activeParticles.push({ id: n.data.id + "-clone", x: n.x, y: n.y, type: "leaf" });
    });
    sporeNodes.forEach(n => {
        activeParticles.push({ id: n.data.id + "-clone", x: n.x, y: n.y, type: "spore" });
    });

    const particles = group.selectAll(".frenzy-particle")
        .data(activeParticles)
        .enter()
        .append("circle")
        .attr("class", "frenzy-particle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.type === "leaf" ? 6 : 4)
        .attr("fill", d => d.type === "leaf" ? "#fde047" : "#000000")
        .attr("stroke", d => d.type === "spore" ? "#10b981" : "none")
        .attr("stroke-width", d => d.type === "spore" ? 2 : 0)
        .style("filter", d => d.type === "leaf" ? "drop-shadow(0 0 10px rgba(253, 224, 71, 0.9))" : "drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))");

    const lineGlows = group.append("g").attr("class", "combinatorial-sparks");
    const targetY = depthY(0);

    const metaphorGroup = group.append("g").attr("class", "metaphor-titles").style("opacity", 0);

    metaphorGroup.append("text")
        .attr("x", width / 2)
        .attr("y", depthY(4) - 50)
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(255, 255, 255, 0.4)")
        .style("font-size", "72px")
        .style("font-weight", "800")
        .style("letter-spacing", "10px")
        .text("THE AIR: ACADEMIC & SCIENTIFIC DOMAIN");

    const citations = [
        "Cover Crop Impacts on Entomopathogenic Nematodes",
        "Organic Transition in Subtropical Semi-Arid Gradients",
        "Mycorrhizal Responses to Sunn Hemp Integration",
        "Socio-Ecological Dynamics in RGV Food Pantries",
        "Civic Agriculture and Student-Led Farm Models",
        "Arthropod Abundance in Multi-Species Cover Systems",
        "Soil Microbiome Health in the Rio Grande Valley",
        "Water Conservation via Agroecological Intervention",
        "Community Scale Food System Resilience",
        "Bio-Indicators of Transitioning Arable Land"
    ];

    for(let c = 0; c < 15; c++) {
        const cloudG = metaphorGroup.append("g")
            .attr("transform", `translate(${(Math.random() * width * 2) - width * 0.5}, ${depthY(5) - Math.random() * 800})`);

        for(let p = 0; p < 3; p++) {
            cloudG.append("text")
                .attr("x", (Math.random() - 0.5) * 100)
                .attr("y", p * 20)
                .attr("text-anchor", "middle")
                .attr("fill", "rgba(203, 213, 225, 0.25)")
                .style("font-size", "14px")
                .style("font-style", "italic")
                .text(citations[Math.floor(Math.random() * citations.length)]);
        }

        function driftCloud(element) {
            element.transition()
                .duration(30000 + Math.random() * 20000)
                .attr("transform", `translate(${element.node().transform.baseVal[0].matrix.e + 300}, ${element.node().transform.baseVal[0].matrix.f})`)
                .on("end", function() { driftCloud(element); });
        }
        driftCloud(cloudG);
    }

    metaphorGroup.append("text")
        .attr("x", width / 2)
        .attr("y", depthY(-4) + 150)
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(255, 255, 255, 0.4)")
        .style("font-size", "72px")
        .style("font-weight", "800")
        .style("letter-spacing", "10px")
        .text("THE SOIL: RIO GRANDE VALLEY ECOSYSTEM");

    metaphorGroup.append("text")
        .attr("x", width / 2)
        .attr("y", depthY(-4) + 220)
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(245, 158, 11, 0.5)")
        .style("font-size", "24px")
        .style("font-weight", "600")
        .style("letter-spacing", "6px")
        .text("HIDALGO • CAMERON • STARR • WILLACY • WEBB • ZAPATA • JIM HOGG • BROOKS • KENEDY");

    const rainGroup = group.insert("g", ":first-child").attr("class", "rain-system");
    for(let i=0; i<150; i++) {
        const startX = (Math.random() * (width * 3)) - width;
        const startY = depthY(5) - Math.random() * 2000;
        const endY = depthY(-5) + 1000;

        const drop = rainGroup.append("g").attr("transform", `translate(${startX}, ${startY})`);

        drop.append("line")
            .attr("x1", 0).attr("y1", 0)
            .attr("x2", 0).attr("y2", 60)
            .attr("stroke", "rgba(34, 211, 238, 0.3)")
            .attr("stroke-width", 2);

        drop.append("text")
            .attr("x", 4).attr("y", 65)
            .attr("fill", "rgba(34, 211, 238, 0.7)")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text("$");

        drop.transition()
            .delay(Math.random() * 4000)
            .duration(1200 + Math.random() * 800)
            .ease(d3.easeLinear)
            .attr("transform", `translate(${startX}, ${endY})`)
            .on("end", function repeat() {
                d3.select(this)
                    .attr("transform", `translate(${startX}, ${startY})`)
                    .transition()
                    .duration(1200 + Math.random() * 800)
                    .ease(d3.easeLinear)
                    .attr("transform", `translate(${startX}, ${endY})`)
                    .on("end", repeat);
            });
    }

    metaphorGroup.append("text")
        .attr("x", width / 2)
        .attr("y", depthY(2))
        .attr("text-anchor", "middle")
        .attr("fill", "#22d3ee")
        .style("font-size", "36px")
        .style("font-weight", "800")
        .style("letter-spacing", "4px")
        .style("filter", "drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))")
        .text("WATER: GRANT FUNDING & CAPITAL CYCLE");

    metaphorGroup.transition().duration(3000).style("opacity", 1);

    particles.transition()
        .duration(4000)
        .ease(d3.easeCubicInOut)
        .delay(d => Math.random() * 2000)
        .attr("cy", targetY)
        .attr("cx", d => d.x + ((Math.random() - 0.5) * 300))
        .end()
        .then(() => {
            particles.each(function(d) {
                d.x = parseFloat(d3.select(this).attr("cx"));
                d.y = parseFloat(d3.select(this).attr("cy"));
            });

            const frenzySim = d3.forceSimulation(activeParticles)
                .velocityDecay(0.15)
                .force("y", d3.forceY(targetY).strength(0.04))
                .force("x", d3.forceX(0).strength(0.01))
                .force("collide", d3.forceCollide(d => d.type === "leaf" ? 8 : 6).iterations(3))
                .force("charge", d3.forceManyBody().strength(d => d.type === "leaf" ? -1 : 3))
                .on("tick", () => {
                    particles
                        .attr("cx", d => d.x)
                        .attr("cy", d => Math.max(targetY - 100, Math.min(targetY + 100, d.y)));

                    if(Math.random() > 0.85) {
                        const randomLeaf = activeParticles.find(p => p.type === "leaf" && Math.random() > 0.9);
                        const randomSpore = activeParticles.find(p => p.type === "spore" && Math.random() > 0.9);

                        if(randomLeaf && randomSpore) {
                            if(Math.abs(randomLeaf.x - randomSpore.x) < 80 && Math.abs(randomLeaf.y - randomSpore.y) < 80) {
                                lineGlows.append("line")
                                    .attr("x1", randomLeaf.x)
                                    .attr("y1", randomLeaf.y)
                                    .attr("x2", randomSpore.x)
                                    .attr("y2", randomSpore.y)
                                    .attr("stroke", "#ffffff")
                                    .attr("stroke-width", 1.5)
                                    .style("filter", "drop-shadow(0 0 5px #ffffff)")
                                    .transition()
                                    .duration(600)
                                    .style("opacity", 0)
                                    .remove();
                            }
                        }
                    }
                });
        })
        .catch(err => console.warn("Transition Interrupted", err));
});
