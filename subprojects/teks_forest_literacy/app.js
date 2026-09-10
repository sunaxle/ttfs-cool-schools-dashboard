/**
 * TEKS Forest Literacy Learning Architecture - Master Application Controller (v2.2)
 * Features:
 * 1. Zero-overlap Topological DAG Rank layout and Horizontal Swimlane layout.
 * 2. Interactive node drag-and-drop on Canvas with live-updating bezier connectors.
 * 3. Interactive simulation widgets (Canopy Area, Microclimate Albedo, Carbon Vault, PM2.5 RH metrology).
 * 4. Tabbed lesson drawer with full 3D TEKS & SEP/RTC matrices.
 * 5. Confetti particle system and Official Mastery Certificate generator.
 *
 * @project Texas Trees Foundation & UTRGV Cool Schools Project
 * @version 2.2.0
 */

(function () {
  'use strict';

  // 1. Initialize State & Knowledge Graph Engine
  const engine = window.ForestKnowledgeGraph ? window.ForestKnowledgeGraph.createEngine() : null;
  if (!engine) {
    console.error("[ForestLiteracy] Knowledge Graph Engine failed to load.");
    return;
  }

  const STORAGE_KEY = 'ttfs_forest_literacy_completed_v2';
  let completedNodeIds = loadCompletedNodes();
  let currentTier = 'all';
  let currentSubject = 'all';
  let currentTheme = 'all';
  let searchQuery = '';
  let activeNodeId = null;
  let currentViewMode = 'topological'; // 'topological' or 'swimlanes'

  // Canvas Viewport State (pan & zoom & dragging)
  let canvas, ctx;
  let zoomLevel = 0.95;
  let panX = 40;
  let panY = 30;
  let isPanning = false;
  let panStartX = 0;
  let panStartY = 0;
  
  let draggedNode = null;
  let hoveredNode = null;
  let nodeCoordinates = new Map(); // id -> { x, y, node, rank, swimlane }

  function loadCompletedNodes() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Could not read localStorage:", e);
      return [];
    }
  }

  function saveCompletedNodes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedNodeIds));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  // 2. DOM Elements
  const statsCountEl = document.getElementById('statCompletedCount');
  const statsPointsEl = document.getElementById('statTotalPoints');
  const progressFillEl = document.getElementById('progressFill');
  const modulesGridEl = document.getElementById('modulesGrid');
  const tierTabsContainer = document.getElementById('tierTabsContainer');
  const subjectSelect = document.getElementById('subjectFilterSelect');
  const themeSelect = document.getElementById('themeFilterSelect');
  const searchInput = document.getElementById('moduleSearchInput');

  // Drawer Elements
  const drawerOverlay = document.getElementById('lessonDrawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerSubtitle = document.getElementById('drawerSubtitle');
  const drawerHook = document.getElementById('drawerHook');
  const drawerTheory = document.getElementById('drawerTheory');
  const drawerTeksCodes = document.getElementById('drawerTeksCodes');
  const drawerRtc = document.getElementById('drawerRtc');
  const drawerSep = document.getElementById('drawerSep');
  const drawerLabTitle = document.getElementById('drawerLabTitle');
  const drawerLabDetails = document.getElementById('drawerLabDetails');
  const drawerQuizQuestion = document.getElementById('drawerQuizQuestion');
  const drawerQuizOptions = document.getElementById('drawerQuizOptions');
  const drawerQuizFeedback = document.getElementById('drawerQuizFeedback');
  const drawerCitations = document.getElementById('drawerCitations');
  const drawerSimContainer = document.getElementById('drawerSimulationContainer');

  // Modals & Certificate
  const citationsModal = document.getElementById('citationsModal');
  const btnOpenCitations = document.getElementById('btnOpenCitations');
  const btnCloseCitations = document.getElementById('btnCloseCitations');
  const printModal = document.getElementById('printModal');
  const btnOpenPrint = document.getElementById('btnOpenPrint');
  const btnClosePrint = document.getElementById('btnClosePrint');
  const btnResetProgress = document.getElementById('btnResetProgress');
  const certModal = document.getElementById('certModal');
  const btnOpenCert = document.getElementById('btnOpenCert');
  const btnCloseCert = document.getElementById('btnCloseCert');

  // 3. Lifecycle Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initConfetti();
    renderTierTabs();
    populateSelectFilters();
    bindEvents();
    refreshAll();
  });

  function bindEvents() {
    // Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderModulesGrid();
        layoutGraphNodes();
        renderGraphCanvas();
      });
    }

    // Select filters
    if (subjectSelect) {
      subjectSelect.addEventListener('change', (e) => {
        currentSubject = e.target.value;
        renderModulesGrid();
        layoutGraphNodes();
        renderGraphCanvas();
      });
    }

    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        currentTheme = e.target.value;
        renderModulesGrid();
        layoutGraphNodes();
        renderGraphCanvas();
      });
    }

    // View Mode Toggles
    const btnModeTopo = document.getElementById('btnModeTopological');
    const btnModeSwim = document.getElementById('btnModeSwimlanes');
    if (btnModeTopo) {
      btnModeTopo.addEventListener('click', () => {
        currentViewMode = 'topological';
        btnModeTopo.classList.add('active');
        if (btnModeSwim) btnModeSwim.classList.remove('active');
        panX = 40; panY = 30; zoomLevel = 0.95;
        layoutGraphNodes();
        renderGraphCanvas();
      });
    }
    if (btnModeSwim) {
      btnModeSwim.addEventListener('click', () => {
        currentViewMode = 'swimlanes';
        btnModeSwim.classList.add('active');
        if (btnModeTopo) btnModeTopo.classList.remove('active');
        panX = 40; panY = 30; zoomLevel = 0.85;
        layoutGraphNodes();
        renderGraphCanvas();
      });
    }

    // Drawer tabs
    document.querySelectorAll('.drawer-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.drawer-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.drawer-tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetPane = document.getElementById(btn.getAttribute('data-target'));
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // Drawer close
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeLessonDrawer);
    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', (e) => {
        if (e.target === drawerOverlay) closeLessonDrawer();
      });
    }

    // Keyboard navigation (ESC closes drawer)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLessonDrawer();
        if (citationsModal) citationsModal.classList.remove('active');
        if (printModal) printModal.classList.remove('active');
        if (certModal) certModal.classList.remove('active');
      }
    });

    // Modals
    if (btnOpenCitations) btnOpenCitations.addEventListener('click', () => citationsModal.classList.add('active'));
    if (btnCloseCitations) btnCloseCitations.addEventListener('click', () => citationsModal.classList.remove('active'));
    if (citationsModal) citationsModal.addEventListener('click', (e) => { if (e.target === citationsModal) citationsModal.classList.remove('active'); });

    if (btnOpenPrint) btnOpenPrint.addEventListener('click', () => printModal.classList.add('active'));
    if (btnClosePrint) btnClosePrint.addEventListener('click', () => printModal.classList.remove('active'));
    if (printModal) printModal.addEventListener('click', (e) => { if (e.target === printModal) printModal.classList.remove('active'); });

    if (btnOpenCert) btnOpenCert.addEventListener('click', () => { updateCertificatePreview(); certModal.classList.add('active'); });
    if (btnCloseCert) btnCloseCert.addEventListener('click', () => certModal.classList.remove('active'));
    if (certModal) certModal.addEventListener('click', (e) => { if (e.target === certModal) certModal.classList.remove('active'); });

    // Reset progress
    if (btnResetProgress) {
      btnResetProgress.addEventListener('click', () => {
        if (confirm("Reset all lesson progress and points back to zero?")) {
          completedNodeIds = [];
          saveCompletedNodes();
          refreshAll();
        }
      });
    }

    // Canvas Zoom Controls
    const zoomInBtn = document.getElementById('btnGraphZoomIn');
    const zoomOutBtn = document.getElementById('btnGraphZoomOut');
    const zoomFitBtn = document.getElementById('btnGraphFit');

    if (zoomInBtn) zoomInBtn.addEventListener('click', () => { zoomLevel = Math.min(2.2, zoomLevel + 0.15); renderGraphCanvas(); });
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => { zoomLevel = Math.max(0.4, zoomLevel - 0.15); renderGraphCanvas(); });
    if (zoomFitBtn) zoomFitBtn.addEventListener('click', () => { zoomLevel = 0.95; panX = 40; panY = 30; layoutGraphNodes(); renderGraphCanvas(); });
  }

  function refreshAll() {
    updateStatsBar();
    renderModulesGrid();
    layoutGraphNodes();
    renderGraphCanvas();
  }

  // 4. Render Stats Bar
  function updateStatsBar() {
    const stats = engine.getProgressStats(completedNodeIds);
    if (statsCountEl) statsCountEl.textContent = `${stats.completedCount} / ${stats.totalCount}`;
    if (statsPointsEl) statsPointsEl.textContent = `${stats.earnedPoints} pts`;
    if (progressFillEl) progressFillEl.style.width = `${stats.percent}%`;
  }

  // 5. Render Pathway Filter Tabs
  function renderTierTabs() {
    if (!tierTabsContainer) return;
    const metadata = engine.getMetadata();
    tierTabsContainer.innerHTML = '';

    metadata.tiers.forEach(tier => {
      const btn = document.createElement('button');
      btn.className = `tier-tab-btn ${tier.id === currentTier ? 'active' : ''}`;
      btn.type = 'button';
      btn.innerHTML = `<span>${tier.label}</span>`;
      btn.title = tier.desc;
      btn.addEventListener('click', () => {
        currentTier = tier.id;
        document.querySelectorAll('.tier-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderModulesGrid();
        layoutGraphNodes();
        renderGraphCanvas();
      });
      tierTabsContainer.appendChild(btn);
    });
  }

  function populateSelectFilters() {
    const metadata = engine.getMetadata();
    if (subjectSelect) {
      subjectSelect.innerHTML = '';
      metadata.subjects.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub.id;
        opt.textContent = sub.label;
        subjectSelect.appendChild(opt);
      });
    }

    if (themeSelect) {
      themeSelect.innerHTML = '<option value="all">All PLT Themes (1–4)</option>';
      metadata.plt_themes.forEach(theme => {
        const opt = document.createElement('option');
        opt.value = theme.id;
        opt.textContent = `${theme.label}`;
        themeSelect.appendChild(opt);
      });
    }
  }

  // 6. Render Modules Grid (Khan Academy Style)
  function renderModulesGrid() {
    if (!modulesGridEl) return;
    const nodes = engine.getFilteredNodes(currentTier, currentSubject, currentTheme, searchQuery);
    const statusMap = engine.getNodeStatuses(completedNodeIds);

    modulesGridEl.innerHTML = '';

    if (nodes.length === 0) {
      modulesGridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #ffffff; border-radius: 12px; border: 1px dashed var(--border-light);">
          <p style="font-size: 1.1rem; color: var(--text-muted); font-weight: 600;">No learning modules found matching current filters.</p>
          <button type="button" class="btn-header" style="margin-top: 12px;" onclick="window.ForestApp.resetFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    nodes.forEach(node => {
      const status = statusMap.get(node.id) || 'locked';
      const isCompleted = (status === 'completed');
      const isLocked = (status === 'locked');

      const card = document.createElement('div');
      card.className = `module-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;

      let teksBadgesHtml = (node.teks_codes || [])
        .map(code => `<span class="teks-badge">${code}</span>`)
        .join('');

      let actionBtnText = isCompleted ? '✓ Review Mastered Module' : (isLocked ? '🔒 Prerequisites Needed' : '▶ Start Interactive Lesson');
      let actionBtnClass = isCompleted ? 'completed-btn' : (isLocked ? 'locked-btn' : '');

      card.innerHTML = `
        <div class="card-header-bar">
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <span class="badge-tier">${node.tier_label || node.tier}</span>
            <span class="badge-subject">${node.subject}</span>
          </div>
          <span class="points-pill">+${node.mastery_points || 100} pts</span>
        </div>

        <h3 class="module-title">${node.title}</h3>

        <div class="teks-badges-row">
          ${teksBadgesHtml}
        </div>

        <p class="module-summary">${node.summary}</p>

        <div class="card-footer">
          <button type="button" class="btn-card-action ${actionBtnClass}" ${isLocked ? 'disabled' : ''}>
            ${actionBtnText}
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!isLocked) {
          openLessonDrawer(node.id);
        } else {
          alert(`This module is locked! You must complete its prerequisites first: ${node.prerequisites.join(', ')}`);
        }
      });

      modulesGridEl.appendChild(card);
    });
  }

  // 7. Robust Topological Rank & Swimlane Layout Engine (ZERO OVERLAPS)
  function calculateDAGRanks(nodes) {
    const nodeMap = new Map();
    nodes.forEach(n => nodeMap.set(n.id, n));
    const ranks = new Map();

    function getRank(nodeId) {
      if (ranks.has(nodeId)) return ranks.get(nodeId);
      const node = nodeMap.get(nodeId);
      if (!node || !node.prerequisites || node.prerequisites.length === 0) {
        ranks.set(nodeId, 0);
        return 0;
      }
      let maxPrereqRank = 0;
      node.prerequisites.forEach(pId => {
        maxPrereqRank = Math.max(maxPrereqRank, getRank(pId));
      });
      const r = maxPrereqRank + 1;
      ranks.set(nodeId, r);
      return r;
    }

    nodes.forEach(n => getRank(n.id));
    return ranks;
  }

  function layoutGraphNodes() {
    const filteredNodes = engine.getFilteredNodes(currentTier, currentSubject, currentTheme, searchQuery);
    const ranks = calculateDAGRanks(engine.data.nodes);

    const CARD_WIDTH = 250;
    const CARD_HEIGHT = 74;
    const COL_GAP = 340; // 340 - 250 = 90px horizontal gap between cards!
    const ROW_GAP = 110; // 110 - 74 = 36px vertical gap between cards!

    if (currentViewMode === 'topological') {
      // Group by Rank
      const rankBuckets = {};
      filteredNodes.forEach(node => {
        const r = ranks.get(node.id) || 0;
        if (!rankBuckets[r]) rankBuckets[r] = [];
        rankBuckets[r].push(node);
      });

      Object.keys(rankBuckets).forEach(rKey => {
        const r = parseInt(rKey, 10);
        const bucket = rankBuckets[r];
        const x = 70 + (r * COL_GAP);

        bucket.forEach((node, idx) => {
          // Check if user has manually dragged this node
          if (nodeCoordinates.has(node.id) && nodeCoordinates.get(node.id).isCustomPosition) {
            const existing = nodeCoordinates.get(node.id);
            nodeCoordinates.set(node.id, { ...existing, node, rank: r });
          } else {
            const y = 80 + (idx * ROW_GAP);
            nodeCoordinates.set(node.id, { x, y, node, rank: r, isCustomPosition: false });
          }
        });
      });

    } else {
      // Horizontal Swimlanes Layout
      const swimlanes = {
        'k12_sci_math': { label: 'K–12 Science & Mathematics', y: 80, items: [] },
        'k12_humanities': { label: 'K–12 Social Studies & Arts', y: 220, items: [] },
        'community': { label: 'Parent & Community Forestry', y: 360, items: [] },
        'higher_ed': { label: 'Higher Ed & Research Lab', y: 500, items: [] },
        'spiritual': { label: 'Contemplative & Ethics', y: 640, items: [] }
      };

      filteredNodes.forEach(node => {
        if (node.tier === 'community') swimlanes.community.items.push(node);
        else if (node.tier === 'college') swimlanes.higher_ed.items.push(node);
        else if (node.tier === 'spiritual') swimlanes.spiritual.items.push(node);
        else if (node.subject === 'Social Studies' || node.subject === 'Fine Arts' || node.subject === 'ELAR') {
          swimlanes.k12_humanities.items.push(node);
        } else {
          swimlanes.k12_sci_math.items.push(node);
        }
      });

      Object.keys(swimlanes).forEach(laneKey => {
        const lane = swimlanes[laneKey];
        lane.items.forEach((node, idx) => {
          if (nodeCoordinates.has(node.id) && nodeCoordinates.get(node.id).isCustomPosition) {
            const existing = nodeCoordinates.get(node.id);
            nodeCoordinates.set(node.id, { ...existing, node, lane: laneKey });
          } else {
            const x = 70 + (idx * 280);
            const y = lane.y;
            nodeCoordinates.set(node.id, { x, y, node, lane: laneKey, isCustomPosition: false });
          }
        });
      });
    }
  }

  // 8. Interactive Canvas Knowledge Graph Engine
  function initCanvas() {
    canvas = document.getElementById('knowledgeGraphCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      renderGraphCanvas();
    }

    window.addEventListener('resize', resize);
    resize();

    // Mouse Interactions (Pan & Drag Nodes)
    canvas.addEventListener('mousedown', (e) => {
      const clicked = getNodeAtCanvasCoords(e);
      if (clicked) {
        draggedNode = clicked;
        const rect = canvas.getBoundingClientRect();
        dragStartX = (e.clientX - rect.left - panX) / zoomLevel - clicked.x;
        dragStartY = (e.clientY - rect.top - panY) / zoomLevel - clicked.y;
      } else {
        isPanning = true;
        panStartX = e.clientX - panX;
        panStartY = e.clientY - panY;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (draggedNode) {
        const rect = canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left - panX) / zoomLevel;
        const my = (e.clientY - rect.top - panY) / zoomLevel;
        draggedNode.x = mx - dragStartX;
        draggedNode.y = my - dragStartY;
        draggedNode.isCustomPosition = true;
        renderGraphCanvas();
      } else if (isPanning) {
        panX = e.clientX - panStartX;
        panY = e.clientY - panStartY;
        renderGraphCanvas();
      } else {
        checkCanvasHover(e);
      }
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
      draggedNode = null;
    });

    canvas.addEventListener('click', (e) => {
      const clicked = getNodeAtCanvasCoords(e);
      if (clicked) {
        const statusMap = engine.getNodeStatuses(completedNodeIds);
        const status = statusMap.get(clicked.node.id) || 'locked';
        if (status !== 'locked') {
          openLessonDrawer(clicked.node.id);
        } else {
          alert(`Prerequisites required for ${clicked.node.title}:\n${clicked.node.prerequisites.join(', ')}`);
        }
      }
    });
  }

  function renderGraphCanvas() {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(zoomLevel, zoomLevel);

    const statusMap = engine.getNodeStatuses(completedNodeIds);

    // Draw Column Rank Level Headers in Topological Mode
    if (currentViewMode === 'topological') {
      const rankLabels = [
        "Level 0: Foundations",
        "Level 1: Explorations",
        "Level 2: Systems & Geometry",
        "Level 3: Energetics & Carbon",
        "Level 4: Microclimate & Models",
        "Level 5: Urban Watersheds & Sensors",
        "Level 6: Advanced Agroecology & Ethics",
        "Level 7: Spatial Epidemiology"
      ];
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      rankLabels.forEach((lbl, r) => {
        const x = 70 + (r * 340);
        ctx.fillStyle = '#4e6153';
        ctx.fillText(lbl, x, 30);
        // Column divider guide
        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = '#e0eae2';
        ctx.lineWidth = 1;
        ctx.moveTo(x, 45);
        ctx.lineTo(x, 800);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }

    // Draw Links (Prerequisite Bezier Curved Wires)
    ctx.lineWidth = 2;
    nodeCoordinates.forEach((targetCoord, targetId) => {
      const targetNode = targetCoord.node;
      (targetNode.prerequisites || []).forEach(sourceId => {
        if (nodeCoordinates.has(sourceId)) {
          const sourceCoord = nodeCoordinates.get(sourceId);
          const isSrcCompleted = (statusMap.get(sourceId) === 'completed');
          const isTargetCompleted = (statusMap.get(targetId) === 'completed');

          ctx.beginPath();
          if (isTargetCompleted) {
            ctx.strokeStyle = '#2e7d32'; // Green wire
            ctx.lineWidth = 2.5;
          } else if (isSrcCompleted) {
            ctx.strokeStyle = '#1976d2'; // Blue wire
            ctx.lineWidth = 2;
          } else {
            ctx.strokeStyle = '#cbd5e1'; // Grey wire
            ctx.lineWidth = 1.5;
          }

          const startX = sourceCoord.x + 125;
          const startY = sourceCoord.y;
          const endX = targetCoord.x - 125;
          const endY = targetCoord.y;

          const cpX1 = startX + Math.max(40, (endX - startX) * 0.4);
          const cpY1 = startY;
          const cpX2 = endX - Math.max(40, (endX - startX) * 0.4);
          const cpY2 = endY;

          ctx.moveTo(startX, startY);
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, endX, endY);
          ctx.stroke();

          // Arrowhead
          drawArrowhead(ctx, cpX2, cpY2, endX, endY, 6, ctx.strokeStyle);
        }
      });
    });

    // Draw Node Cards
    nodeCoordinates.forEach((coord, nodeId) => {
      const node = coord.node;
      const status = statusMap.get(nodeId) || 'locked';
      const isHovered = (hoveredNode && hoveredNode.node.id === nodeId);

      const width = 250;
      const height = 74;
      const x = coord.x - (width / 2);
      const y = coord.y - (height / 2);

      // Card Body Background
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, 10);

      if (status === 'completed') {
        ctx.fillStyle = isHovered ? '#e8f5e9' : '#ffffff';
        ctx.strokeStyle = '#2e7d32';
        ctx.lineWidth = 2.5;
      } else if (status === 'unlocked') {
        ctx.fillStyle = isHovered ? '#e3f2fd' : '#ffffff';
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 2;
      } else {
        ctx.fillStyle = '#f8faf9';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
      }

      ctx.fill();
      ctx.stroke();

      // Status indicator dot
      ctx.beginPath();
      ctx.arc(x + 18, coord.y - 12, 6, 0, Math.PI * 2);
      ctx.fillStyle = (status === 'completed') ? '#2e7d32' : ((status === 'unlocked') ? '#1976d2' : '#94a3b8');
      ctx.fill();

      // Node Title (Two lines if long)
      ctx.fillStyle = (status === 'locked') ? '#64748b' : '#0d381c';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      
      const lines = wrapText(ctx, node.title, 205);
      if (lines.length === 1) {
        ctx.fillText(lines[0], x + 32, coord.y - 12);
      } else {
        ctx.fillText(lines[0], x + 32, coord.y - 18);
        ctx.fillText(lines[1], x + 32, coord.y - 4);
      }

      // Bottom Row: Tier Badge & Subject Label
      ctx.fillStyle = '#4e6153';
      ctx.font = '9.5px Inter, sans-serif';
      ctx.fillText(`${node.tier_label || node.tier} · ${node.subject}`, x + 14, coord.y + 18);

      // Mastery Points Pill
      ctx.fillStyle = '#e65100';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`+${node.mastery_points || 100} pts`, x + width - 12, coord.y + 18);
    });

    ctx.restore();
  }

  function drawArrowhead(context, fromx, fromy, tox, toy, radius, color) {
    const angle = Math.atan2(toy - fromy, tox - fromx);
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(tox, toy);
    context.lineTo(tox - radius * Math.cos(angle - Math.PI / 6), toy - radius * Math.sin(angle - Math.PI / 6));
    context.lineTo(tox - radius * Math.cos(angle + Math.PI / 6), toy - radius * Math.sin(angle + Math.PI / 6));
    context.closePath();
    context.fill();
    context.restore();
  }

  function wrapText(context, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = context.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
        if (lines.length >= 1) break; // Limit to 2 lines
      }
    }
    lines.push(currentLine);
    if (lines.length > 2) lines[1] = lines[1] + '...';
    return lines;
  }

  function checkCanvasHover(e) {
    const prevHovered = hoveredNode;
    hoveredNode = getNodeAtCanvasCoords(e);
    if (prevHovered !== hoveredNode) {
      canvas.style.cursor = hoveredNode ? 'pointer' : (isPanning ? 'grabbing' : 'grab');
      renderGraphCanvas();
    }
  }

  function getNodeAtCanvasCoords(e) {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - panX) / zoomLevel;
    const mouseY = (e.clientY - rect.top - panY) / zoomLevel;

    for (const [nodeId, coord] of nodeCoordinates.entries()) {
      const width = 250;
      const height = 74;
      const x = coord.x - (width / 2);
      const y = coord.y - (height / 2);

      if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        return coord;
      }
    }
    return null;
  }

  // 9. Slide-Out Lesson Reader Drawer with Interactive Simulations
  function openLessonDrawer(nodeId) {
    const node = engine.getNode(nodeId);
    if (!node) return;
    activeNodeId = nodeId;

    drawerTitle.textContent = node.title;
    drawerSubtitle.textContent = `${node.tier_label || node.tier} · ${node.subject} · +${node.mastery_points || 100} Mastery Points`;
    
    drawerHook.textContent = node.hook || node.summary;
    drawerTheory.innerHTML = `<p>${node.theory}</p>`;

    // 3D TEKS & SEP/RTC Metadata
    drawerTeksCodes.textContent = (node.teks_codes && node.teks_codes.length > 0) ? node.teks_codes.join(', ') : 'Interdisciplinary / Community';
    drawerRtc.textContent = node.science_rtc || 'Systems & Patterns';
    drawerSep.textContent = node.science_sep || 'Scientific Inquiry & Investigation';

    // Lab details
    if (node.outdoor_lab_activity) {
      drawerLabTitle.textContent = `🌲 ${node.outdoor_lab_activity.title} (${node.outdoor_lab_activity.duration_min} min)`;
      drawerLabDetails.innerHTML = `
        <p style="margin-bottom: 8px;"><strong>Equipment:</strong> ${(node.outdoor_lab_activity.equipment || []).join(', ')}</p>
        <p><strong>Procedure:</strong> ${node.outdoor_lab_activity.procedure}</p>
      `;
    } else {
      drawerLabTitle.textContent = '🌲 Hands-on Field Investigation';
      drawerLabDetails.innerHTML = `<p>${node.lab || 'Observe tree canopy in physical schoolyard microforest.'}</p>`;
    }

    // Render Simulation Widget
    renderSimulationWidget(node);

    // Quiz setup
    renderDrawerQuiz(node);

    // Citations
    drawerCitations.innerHTML = (node.citations || []).map(c => `<li>${c}</li>`).join('');

    // Reset to Tab 1
    document.querySelectorAll('.drawer-tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    document.querySelectorAll('.drawer-tab-pane').forEach((p, i) => p.classList.toggle('active', i === 0));

    drawerOverlay.classList.add('active');
  }

  function closeLessonDrawer() {
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    activeNodeId = null;
  }

  // 10. Interactive Simulation Engine inside Drawer
  function renderSimulationWidget(node) {
    if (!drawerSimContainer) return;
    drawerSimContainer.innerHTML = '';

    if (node.id === 'elem_canopy_geometry' || node.id === 'ms_trig_tree_height') {
      // Canopy Area & Trigonometric Height Sim
      drawerSimContainer.innerHTML = `
        <div class="lesson-block simulation">
          <div class="block-header">📐 Interactive Canopy Area & Pacing Simulator</div>
          <p class="text-xs text-muted-foreground mb-3">Adjust the shadow radius to compute real-time cooling shade square meters and estimated thermal drop.</p>
          
          <div class="sim-control-group">
            <div class="sim-label">
              <span>Shadow Radius (r):</span>
              <strong id="simRadiusVal">4.0 meters</strong>
            </div>
            <input type="range" id="simRadiusSlider" min="1" max="12" step="0.5" value="4" class="sim-slider" />
          </div>

          <div class="sim-results-grid">
            <div class="sim-result-card">
              <div class="sim-result-val" id="simAreaVal">50.2 m²</div>
              <div class="sim-result-label">Shaded Area (π*r²)</div>
            </div>
            <div class="sim-result-card">
              <div class="sim-result-val" id="simStepsVal">6 paces</div>
              <div class="sim-result-label">Student Steps (0.7m/pace)</div>
            </div>
            <div class="sim-result-card">
              <div class="sim-result-val" id="simTempDropVal">-28°F</div>
              <div class="sim-result-label">Radiant Surface Cooling</div>
            </div>
          </div>
        </div>
      `;

      const slider = document.getElementById('simRadiusSlider');
      if (slider) {
        slider.addEventListener('input', (e) => {
          const r = parseFloat(e.target.value);
          const area = (Math.PI * r * r).toFixed(1);
          const steps = Math.round(r / 0.7);
          const tempDrop = Math.min(38, Math.round(18 + r * 2.2));

          document.getElementById('simRadiusVal').textContent = `${r.toFixed(1)} meters`;
          document.getElementById('simAreaVal').textContent = `${area} m²`;
          document.getElementById('simStepsVal').textContent = `${steps} paces`;
          document.getElementById('simTempDropVal').textContent = `-${tempDrop}°F`;
        });
      }

    } else if (node.id === 'ms_photosynthesis_carbon' || node.id === 'hs_allometric_carbon_modeling') {
      // Carbon Vault Allometric Biomass Sim
      drawerSimContainer.innerHTML = `
        <div class="lesson-block simulation">
          <div class="block-header">🌲 Allometric Carbon Storage & i-Tree Valuation Calculator</div>
          <p class="text-xs text-muted-foreground mb-3">Adjust Trunk Diameter at Breast Height (DBH) to calculate dry biomass, total carbon stored, and monetized environmental value.</p>
          
          <div class="sim-control-group">
            <div class="sim-label">
              <span>Trunk DBH (cm):</span>
              <strong id="simDbhVal">25 cm</strong>
            </div>
            <input type="range" id="simDbhSlider" min="5" max="90" step="1" value="25" class="sim-slider" />
          </div>

          <div class="sim-results-grid">
            <div class="sim-result-card">
              <div class="sim-result-val" id="simBiomassVal">312 kg</div>
              <div class="sim-result-label">Dry Biomass</div>
            </div>
            <div class="sim-result-card">
              <div class="sim-result-val" id="simCo2Val">572 kg</div>
              <div class="sim-result-label">CO2e Sequestered</div>
            </div>
            <div class="sim-result-card">
              <div class="sim-result-val" id="simDollarVal">$29.17</div>
              <div class="sim-result-label">Monetized Value ($51/t)</div>
            </div>
          </div>
        </div>
      `;

      const slider = document.getElementById('simDbhSlider');
      if (slider) {
        slider.addEventListener('input', (e) => {
          const dbh = parseFloat(e.target.value);
          // ln(M) = -2.13 + 2.45 * ln(DBH)
          const biomass = Math.round(Math.exp(-2.13 + 2.45 * Math.log(dbh)));
          const co2 = Math.round(biomass * 0.5 * (44 / 12));
          const dollars = ((co2 / 1000) * 51).toFixed(2);

          document.getElementById('simDbhVal').textContent = `${dbh} cm`;
          document.getElementById('simBiomassVal').textContent = `${biomass} kg`;
          document.getElementById('simCo2Val').textContent = `${co2} kg`;
          document.getElementById('simDollarVal').textContent = `$${dollars}`;
        });
      }

    } else if (node.id === 'grad_sensor_calibration') {
      // PM2.5 Hygroscopic Growth Correction Sim
      drawerSimContainer.innerHTML = `
        <div class="lesson-block simulation">
          <div class="block-header">🔬 Optical PM2.5 Hygroscopic Humidity Calibration Lab</div>
          <p class="text-xs text-muted-foreground mb-3">Simulate how high relative humidity swells aerosols, causing raw optical sensors to over-report PM2.5 mass unless calibrated.</p>
          
          <div class="sim-control-group">
            <div class="sim-label">
              <span>Relative Humidity (RH %):</span>
              <strong id="simRhVal">85%</strong>
            </div>
            <input type="range" id="simRhSlider" min="30" max="98" step="1" value="85" class="sim-slider" />
          </div>

          <div class="sim-control-group">
            <div class="sim-label">
              <span>Raw Optical Reading:</span>
              <strong id="simRawPmVal">35.0 µg/m³</strong>
            </div>
            <input type="range" id="simRawPmSlider" min="5" max="100" step="1" value="35" class="sim-slider" />
          </div>

          <div class="sim-results-grid">
            <div class="sim-result-card">
              <div class="sim-result-val text-rose-600" id="simRawDisplay">35 µg/m³</div>
              <div class="sim-result-label">Raw Uncalibrated</div>
            </div>
            <div class="sim-result-card">
              <div class="sim-result-val text-emerald-600" id="simCalDisplay">14.2 µg/m³</div>
              <div class="sim-result-label">TCEQ Reference Calibrated</div>
            </div>
            <div class="sim-result-card">
              <div class="sim-result-val" id="simHygroFactor">2.46x</div>
              <div class="sim-result-label">Water Swelling Factor</div>
            </div>
          </div>
        </div>
      `;

      function updatePmSim() {
        const rh = parseFloat(document.getElementById('simRhSlider').value);
        const raw = parseFloat(document.getElementById('simRawPmSlider').value);
        const factor = (1 + 0.25 * Math.pow(rh / (100 - rh), 1.3));
        const cal = (raw / factor).toFixed(1);

        document.getElementById('simRhVal').textContent = `${rh}%`;
        document.getElementById('simRawPmVal').textContent = `${raw.toFixed(1)} µg/m³`;
        document.getElementById('simRawDisplay').textContent = `${raw} µg/m³`;
        document.getElementById('simCalDisplay').textContent = `${cal} µg/m³`;
        document.getElementById('simHygroFactor').textContent = `${factor.toFixed(2)}x`;
      }

      document.getElementById('simRhSlider').addEventListener('input', updatePmSim);
      document.getElementById('simRawPmSlider').addEventListener('input', updatePmSim);

    } else if (node.id === 'spirit_shinrin_yoku') {
      // Shinrin-yoku Breathing Meditation Guide
      drawerSimContainer.innerHTML = `
        <div class="lesson-block simulation text-center">
          <div class="block-header justify-center">🧘 Guided 4-7-8 Forest Breathing</div>
          <p class="text-xs text-muted-foreground mb-4">Synchronize your breath with the dappled canopy movement to down-regulate heart rate and activate parasympathetic restoration.</p>
          
          <div style="display: flex; justify-content: center; align-items: center; height: 140px;">
            <div id="breathCircle" style="width: 80px; height: 80px; border-radius: 50%; background: #c8e6c9; border: 4px solid #2e7d32; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #1b5e20; transition: all 4s ease-in-out;">
              Inhale
            </div>
          </div>
        </div>
      `;

      const circle = document.getElementById('breathCircle');
      if (circle) {
        let phase = 0;
        setInterval(() => {
          phase = (phase + 1) % 3;
          if (phase === 0) {
            circle.style.transform = 'scale(1.4)';
            circle.textContent = 'Inhale (4s)';
            circle.style.backgroundColor = '#a5d6a7';
          } else if (phase === 1) {
            circle.style.transform = 'scale(1.4)';
            circle.textContent = 'Hold (7s)';
            circle.style.backgroundColor = '#81c784';
          } else {
            circle.style.transform = 'scale(1.0)';
            circle.textContent = 'Exhale (8s)';
            circle.style.backgroundColor = '#c8e6c9';
          }
        }, 4000);
      }
    }
  }

  // 11. Interactive Quiz Logic
  function renderDrawerQuiz(node) {
    drawerQuizOptions.innerHTML = '';
    drawerQuizFeedback.className = 'quiz-feedback-box';
    drawerQuizFeedback.style.display = 'none';

    if (!node.quiz) {
      drawerQuizQuestion.textContent = 'No formative quiz available for this module.';
      return;
    }

    drawerQuizQuestion.textContent = node.quiz.question;

    node.quiz.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.type = 'button';
      btn.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> <span>${optText}</span>`;

      btn.addEventListener('click', () => {
        handleQuizSubmission(node, index, btn);
      });

      drawerQuizOptions.appendChild(btn);
    });
  }

  function handleQuizSubmission(node, selectedIndex, selectedBtn) {
    const isCorrect = (selectedIndex === node.quiz.correct_index);
    const allBtns = drawerQuizOptions.querySelectorAll('.quiz-option-btn');

    allBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === node.quiz.correct_index) {
        b.classList.add('correct');
      } else if (idx === selectedIndex && !isCorrect) {
        b.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      drawerQuizFeedback.className = 'quiz-feedback-box correct';
      drawerQuizFeedback.innerHTML = `
        <strong>🎉 Correct! (+${node.mastery_points || 100} Points Awarded)</strong>
        <p style="margin-top: 4px;">${node.quiz.explanation}</p>
      `;

      triggerConfetti();

      if (!completedNodeIds.includes(node.id)) {
        completedNodeIds.push(node.id);
        saveCompletedNodes();
        updateStatsBar();
        renderModulesGrid();
        renderGraphCanvas();
      }
    } else {
      drawerQuizFeedback.className = 'quiz-feedback-box incorrect';
      drawerQuizFeedback.innerHTML = `
        <strong>Not quite. Let's review:</strong>
        <p style="margin-top: 4px;">${node.quiz.explanation}</p>
      `;
    }
  }

  // 12. Confetti Particle Animation
  let confettiParticles = [];
  let confettiCanvas, confettiCtx;

  function initConfetti() {
    confettiCanvas = document.getElementById('confettiCanvas');
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    });
  }

  function triggerConfetti() {
    if (!confettiCtx) return;
    const colors = ['#2e7d32', '#4caf50', '#81c784', '#f05023', '#fbc02d', '#0288d1'];
    for (let i = 0; i < 60; i++) {
      confettiParticles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        alpha: 1.0
      });
    }
    animateConfetti();
  }

  function animateConfetti() {
    if (!confettiCtx || confettiParticles.length === 0) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vr;
      p.alpha -= 0.015;

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, p.alpha);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      confettiCtx.restore();
    });

    confettiParticles = confettiParticles.filter(p => p.alpha > 0);
    if (confettiParticles.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // 13. Certificate Generator
  function updateCertificatePreview() {
    const stats = engine.getProgressStats(completedNodeIds);
    const certName = document.getElementById('certStudentName') || { value: 'Forest Scholar' };
    const certDateEl = document.getElementById('certDate');
    const certScoreEl = document.getElementById('certScore');
    const certLevelEl = document.getElementById('certLevel');

    if (certDateEl) certDateEl.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (certScoreEl) certScoreEl.textContent = `${stats.earnedPoints} Points (${stats.completedCount} Modules Mastered)`;
    if (certLevelEl) {
      if (stats.completedCount >= 20) certLevelEl.textContent = "🏆 Master Urban Agroecologist & Forest Guardian";
      else if (stats.completedCount >= 10) certLevelEl.textContent = "🌲 Advanced Forest Systems Specialist";
      else if (stats.completedCount >= 5) certLevelEl.textContent = "🌿 Certified Campus Naturalist";
      else certLevelEl.textContent = "🌱 Apprentice Forest Explorer";
    }
  }

  // Global Exports
  window.ForestApp = {
    resetFilters: () => {
      currentTier = 'all';
      currentSubject = 'all';
      currentTheme = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (subjectSelect) subjectSelect.value = 'all';
      if (themeSelect) themeSelect.value = 'all';
      renderTierTabs();
      refreshAll();
    },
    openLesson: (nodeId) => openLessonDrawer(nodeId),
    triggerConfetti: triggerConfetti
  };

})();
