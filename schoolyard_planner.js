/**
 * TTFS UTRGV Project Cool Schools - Landscape Architecture Studio Engine
 * 
 * BloomsEye Studio-Inspired 3D Botanical Visualizer & Masterplan Studio:
 * - 16 Distinct RGV Native Botanical Procedural 3D Models
 * - Real-time 12-Month Seasonal Blooming & Color-Morphing Timeline
 * - Real-time 10-Year Canopy Growth Time Machine (Yr 1, 3, 5, 10)
 * - Solar Sun Arc Simulator (8 AM to 6 PM with Real-Time Thermal Cooling)
 * - Direct 3D Planting Tool & Interactive 3D Tree Manipulation
 * - 2D Engineering Masterplan, FLIR Thermal IR Heatmap & Photo Overlay Modes
 * - 4-Tab Dossier: Designer Showcases, Plant Palette, Eco Impact & Submittal Blueprint
 */

(function () {
    'use strict';

    // Core State
    const state = {
        mode: '3d', // '3d' default BloomsEye Studio mode, '2d', 'thermal', 'photo'
        activeCaseId: 'case_rivas_steam_oasis',
        activeCaseData: null,
        activeDossierTab: 'showcase',
        placedItems: [],
        history: [],
        selectedItemIndex: -1,
        activeCalloutId: null,
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
        currentMonth: 4, // 1 to 12 (April default)
        growthHorizonYear: 10, // 1, 3, 5, 10
        sunHour: 12, // 8.0 to 18.0 (Noon default)
        customPhotoImg: null,
        showMulchBeds: true,
        showWalkways: true,
        showCallouts: true,
        showShadows: true,
        showSpacing: true,
        categoryFilter: 'all',
        searchQuery: '',
        teamName: 'Team Monarch',
        isTourRunning: false,
        tourInterval: null,
        isSeasonsPlaying: false,
        seasonsInterval: null,
        plantingSpeciesId: null // Active species when in direct 3D planting mode
    };

    // Month & Season Metadata
    const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const SEASON_LABELS = {
        1: 'Winter Dormancy',
        2: 'Late Winter Awakening',
        3: 'Early Spring Awakening',
        4: 'Spring Flowering Peak',
        5: 'Late Spring Lush Growth',
        6: 'Early Summer Bloom Peak',
        7: 'Midsummer Heat Shielding',
        8: 'Late Summer Heat Buffer',
        9: 'Early Autumn Monsoon Blooms',
        10: 'Autumn Pollinator Migration',
        11: 'Late Autumn Berry Harvest',
        12: 'Early Winter Rest'
    };

    let dom = {};

    let threeState = {
        scene: null,
        camera: null,
        renderer: null,
        controls: null,
        plantObjects: [], // Array of plant object records
        envGroup: null,
        groundMesh: null,
        sunLight: null,
        ambientLight: null,
        hemiLight: null,
        raycaster: null,
        mouse: null,
        hoveredPlantObj: null,
        selectedPlantObj: null,
        draggedPlantObj: null,
        isPointerDown: false,
        pointerDownPos: { x: 0, y: 0 },
        dragPlane: null,
        placementGhostGroup: null,
        placementReticleMesh: null,
        selectionRingMesh: null,
        isInitialized: false,
        autoRotate: false
    };

    const CAMERA_PRESETS = {
        isometric: { pos: { x: 46, y: 36, z: 52 }, target: { x: 0, y: 2, z: 0 } },
        ground: { pos: { x: 0, y: 3.2, z: 26 }, target: { x: 0, y: 4.5, z: -8 } },
        topdown: { pos: { x: 0, y: 62, z: 0.01 }, target: { x: 0, y: 0, z: 0 } }
    };

    /**
     * Initializes the application.
     */
    function init() {
        try {
            cacheDom();
            bindEvents();
            renderPaletteList();
            loadShowcaseCase(state.activeCaseId);
            updateAnalytics();
            setViewportMode('3d');
        } catch (err) {
            console.error("Init Error in Studio Engine:", err);
            try { setViewportMode('3d'); } catch (e) { console.error("3D init fallback error:", e); }
        }
    }

    /**
     * Caches DOM elements.
     */
    function cacheDom() {
        // Dossier Tabs
        dom.dossierTabButtons = document.querySelectorAll('.dossier-tab-btn');
        dom.dossierContentShowcase = document.getElementById('dossierContentShowcase');
        dom.dossierContentPalette = document.getElementById('dossierContentPalette');
        dom.dossierContentImpact = document.getElementById('dossierContentImpact');
        dom.dossierContentBlueprint = document.getElementById('dossierContentBlueprint');

        // Showcase Case Elements
        dom.showcaseCards = document.querySelectorAll('.showcase-card');
        dom.btnCaseTour = document.getElementById('btnCaseTour');

        // Palette Elements
        dom.paletteListContainer = document.getElementById('paletteListContainer');
        dom.paletteSearch = document.getElementById('paletteSearch');
        dom.categoryPills = document.querySelectorAll('.category-pill-btn');

        // Canvas & Viewport
        dom.plannerCanvas = document.getElementById('plannerCanvas');
        dom.canvasCtx = dom.plannerCanvas.getContext('2d');
        dom.threeContainer = document.getElementById('threeCanvasContainer');
        dom.canvasViewportWrapper = document.getElementById('canvasViewportWrapper');

        // 3D Controls & Inspect HUD
        dom.threeCameraBar = document.getElementById('threeCameraBar');
        dom.btnCamPresets = document.querySelectorAll('.btn-cam-preset[data-cam]');
        dom.btnToggle3DRotate = document.getElementById('btnToggle3DRotate');
        dom.threeInspectHud = document.getElementById('threeInspectHud');
        dom.hud3DPlantName = document.getElementById('hud3DPlantName');
        dom.hud3DPlantBot = document.getElementById('hud3DPlantBot');
        dom.hud3DPlantState = document.getElementById('hud3DPlantState');
        dom.hud3DPlantMetrics = document.getElementById('hud3DPlantMetrics');
        dom.hud3DPlantSpec = document.getElementById('hud3DPlantSpec');

        // Direct 3D Planting & Selection HUD Elements
        dom.threePlantingBanner = document.getElementById('threePlantingBanner');
        dom.plantingBannerSpecies = document.getElementById('plantingBannerSpecies');
        dom.btnCancelPlanting = document.getElementById('btnCancelPlanting');
        dom.threeSelectedCard = document.getElementById('threeSelectedCard');
        dom.selPlantName = document.getElementById('selPlantName');
        dom.selPlantDetails = document.getElementById('selPlantDetails');
        dom.btnDuplicate3DPlant = document.getElementById('btnDuplicate3DPlant');
        dom.btnDelete3DPlant = document.getElementById('btnDelete3DPlant');
        dom.btnDeselect3D = document.getElementById('btnDeselect3D');

        // Mode Switcher Pills
        dom.btnMode2D = document.getElementById('btnMode2D');
        dom.btnModeThermal = document.getElementById('btnModeThermal');
        dom.btnModePhoto = document.getElementById('btnModePhoto');
        dom.btnMode3D = document.getElementById('btnMode3D');

        // Stage Action Tools
        dom.btnUploadCustomPhoto = document.getElementById('btnUploadCustomPhoto');
        dom.photoFileInput = document.getElementById('photoFileInput');
        dom.btnUndo = document.getElementById('btnUndo');
        dom.btnClearCanvas = document.getElementById('btnClearCanvas');

        // Layer Toggles
        dom.toggleMulchBeds = document.getElementById('toggleMulchBeds');
        dom.toggleWalkways = document.getElementById('toggleWalkways');
        dom.toggleCallouts = document.getElementById('toggleCallouts');
        dom.toggleShadows = document.getElementById('toggleShadows');
        dom.toggleSpacing = document.getElementById('toggleSpacing');
        dom.thermalLegendBar = document.getElementById('thermalLegendBar');

        // Callout Popover
        dom.calloutPopover = document.getElementById('calloutPopover');
        dom.popoverTitle = document.getElementById('popoverTitle');
        dom.popoverDesc = document.getElementById('popoverDesc');
        dom.popoverRationale = document.getElementById('popoverRationale');
        dom.btnClosePopover = document.getElementById('btnClosePopover');

        // Timeline, Growth & Solar Controls
        dom.monthSlider = document.getElementById('monthSlider');
        dom.currentMonthLabel = document.getElementById('currentMonthLabel');
        dom.monthTicks = document.querySelectorAll('.month-tick');
        dom.btnPlaySeasons = document.getElementById('btnPlaySeasons');
        dom.growthButtons = document.querySelectorAll('.growth-horizon-strip .btn-growth-pill');
        dom.growthStageBadge = document.getElementById('growthStageBadge');
        dom.sunTimeSlider = document.getElementById('sunTimeSlider');
        dom.sunTimeLabel = document.getElementById('sunTimeLabel');

        // HUD Badges
        dom.hudPlacedCount = document.getElementById('hudPlacedCount');
        dom.hudCurrentMonth = document.getElementById('hudCurrentMonth');
        dom.hudCurrentStage = document.getElementById('hudCurrentStage');

        // Impact Tab Readouts
        dom.metricCoolingDelta = document.getElementById('metricCoolingDelta');
        dom.metricHotTemp = document.getElementById('metricHotTemp');
        dom.metricCoolTemp = document.getElementById('metricCoolTemp');
        dom.metricCanopySqFt = document.getElementById('metricCanopySqFt');
        dom.metricCanopyRatio = document.getElementById('metricCanopyRatio');
        dom.metricStormwaterGal = document.getElementById('metricStormwaterGal');
        dom.metricWildlifeScore = document.getElementById('metricWildlifeScore');
        dom.metricCarbonLbs = document.getElementById('metricCarbonLbs');
        dom.bloomMiniStrip = document.getElementById('bloomMiniStrip');
        dom.auditStatusBadge = document.getElementById('auditStatusBadge');
        dom.auditDescText = document.getElementById('auditDescText');
        dom.visitorsListContainer = document.getElementById('visitorsListContainer');
        dom.teamSelect = document.getElementById('teamSelect');
        dom.teamBadgeLabel = document.getElementById('teamBadgeLabel');
        dom.dossierBomSummaryBody = document.getElementById('dossierBomSummaryBody');

        // Blueprint Modal
        dom.btnOpenBlueprint = document.getElementById('btnOpenBlueprint');
        dom.blueprintModal = document.getElementById('blueprintModal');
        dom.btnCloseBlueprint = document.getElementById('btnCloseBlueprint');
        dom.modalTabButtons = document.querySelectorAll('.modal-tab-btn');
        dom.tabContentBom = document.getElementById('tabContentBom');
        dom.tabContentNursery = document.getElementById('tabContentNursery');
        dom.tabContentMaintenance = document.getElementById('tabContentMaintenance');

        dom.bpModalTitle = document.getElementById('bpModalTitle');
        dom.bpModalSubtitle = document.getElementById('bpModalSubtitle');
        dom.bpGroupVal = document.getElementById('bpGroupVal');
        dom.bpYearVal = document.getElementById('bpYearVal');
        dom.bpPlantCountVal = document.getElementById('bpPlantCountVal');
        dom.bpShadeAreaVal = document.getElementById('bpShadeAreaVal');
        dom.bpCoolingVal = document.getElementById('bpCoolingVal');
        dom.bpBomTableBody = document.getElementById('bpBomTableBody');
        dom.bpSoilPrepText = document.getElementById('bpSoilPrepText');
        dom.bpNurseryBudgetBody = document.getElementById('bpNurseryBudgetBody');
        dom.bpIrrigationText = document.getElementById('bpIrrigationText');

        dom.btnExportImage = document.getElementById('btnExportImage');
        dom.btnSavePlanLocal = document.getElementById('btnSavePlanLocal');
    }

    /**
     * Binds UI events.
     */
    function bindEvents() {
        // Dossier Tabs Navigation
        dom.dossierTabButtons.forEach((tabBtn) => {
            tabBtn.addEventListener('click', () => {
                dom.dossierTabButtons.forEach((b) => b.classList.remove('active'));
                tabBtn.classList.add('active');
                const tabKey = tabBtn.getAttribute('data-dossier-tab');
                state.activeDossierTab = tabKey;

                dom.dossierContentShowcase.style.display = tabKey === 'showcase' ? 'block' : 'none';
                dom.dossierContentPalette.style.display = tabKey === 'palette' ? 'block' : 'none';
                dom.dossierContentImpact.style.display = tabKey === 'impact' ? 'block' : 'none';
                dom.dossierContentBlueprint.style.display = tabKey === 'blueprint' ? 'block' : 'none';
            });
        });

        // Showcase Case Study Selection
        dom.showcaseCards.forEach((card) => {
            card.addEventListener('click', () => {
                const caseId = card.getAttribute('data-case');
                if (caseId) {
                    dom.showcaseCards.forEach((c) => c.classList.remove('active'));
                    card.classList.add('active');
                    loadShowcaseCase(caseId);
                }
            });
        });

        // Auto-tour button
        if (dom.btnCaseTour) {
            dom.btnCaseTour.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleCaseTour();
            });
        }

        // Palette Search & Filters
        dom.paletteSearch.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase();
            renderPaletteList();
        });

        dom.categoryPills.forEach((pill) => {
            pill.addEventListener('click', () => {
                dom.categoryPills.forEach((p) => p.classList.remove('active'));
                pill.classList.add('active');
                state.categoryFilter = pill.getAttribute('data-category');
                renderPaletteList();
            });
        });

        // Viewport Mode Buttons
        dom.btnMode2D.addEventListener('click', () => setViewportMode('2d'));
        dom.btnModeThermal.addEventListener('click', () => setViewportMode('thermal'));
        dom.btnModePhoto.addEventListener('click', () => setViewportMode('photo'));
        dom.btnMode3D.addEventListener('click', () => setViewportMode('3d'));

        // 3D Camera Preset Buttons
        if (dom.btnCamPresets) {
            dom.btnCamPresets.forEach((btn) => {
                btn.addEventListener('click', () => {
                    dom.btnCamPresets.forEach((b) => b.classList.remove('active'));
                    btn.classList.add('active');
                    const camKey = btn.getAttribute('data-cam');
                    if (CAMERA_PRESETS[camKey]) {
                        animateCameraTo(CAMERA_PRESETS[camKey].pos, CAMERA_PRESETS[camKey].target);
                    }
                });
            });
        }

        // 3D Auto Rotate Toggle
        if (dom.btnToggle3DRotate) {
            dom.btnToggle3DRotate.addEventListener('click', () => {
                threeState.autoRotate = !threeState.autoRotate;
                if (threeState.controls) threeState.controls.autoRotate = threeState.autoRotate;
                dom.btnToggle3DRotate.classList.toggle('active', threeState.autoRotate);
            });
        }

        // 3D Container Interaction Events
        if (dom.threeContainer) {
            dom.threeContainer.addEventListener('mousedown', handle3DPointerDown);
            dom.threeContainer.addEventListener('mousemove', handle3DMouseMove);
            window.addEventListener('mouseup', handle3DPointerUp);
            dom.threeContainer.addEventListener('mouseleave', handle3DMouseLeave);
        }

        // Direct 3D Planting Cancel Button
        if (dom.btnCancelPlanting) {
            dom.btnCancelPlanting.addEventListener('click', cancel3DPlantingMode);
        }

        // Selected Plant Quick Action Card Handlers
        if (dom.btnDuplicate3DPlant) {
            dom.btnDuplicate3DPlant.addEventListener('click', duplicateSelected3DPlant);
        }
        if (dom.btnDelete3DPlant) {
            dom.btnDelete3DPlant.addEventListener('click', deleteSelected3DPlant);
        }
        if (dom.btnDeselect3D) {
            dom.btnDeselect3D.addEventListener('click', deselect3DPlant);
        }

        // Custom Photo Upload
        dom.btnUploadCustomPhoto.addEventListener('click', () => dom.photoFileInput.click());
        dom.photoFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const img = new Image();
                    img.onload = () => {
                        state.customPhotoImg = img;
                        setViewportMode('photo');
                        renderCanvas();
                    };
                    img.src = evt.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Layer Toggles
        dom.toggleMulchBeds.addEventListener('change', (e) => { state.showMulchBeds = e.target.checked; renderCanvas(); if (threeState.isInitialized) update3DLayerVisibility(); });
        dom.toggleWalkways.addEventListener('change', (e) => { state.showWalkways = e.target.checked; renderCanvas(); if (threeState.isInitialized) update3DLayerVisibility(); });
        dom.toggleCallouts.addEventListener('change', (e) => { state.showCallouts = e.target.checked; renderCanvas(); });
        dom.toggleShadows.addEventListener('change', (e) => { state.showShadows = e.target.checked; renderCanvas(); if (threeState.isInitialized) update3DLayerVisibility(); });
        dom.toggleSpacing.addEventListener('change', (e) => { state.showSpacing = e.target.checked; renderCanvas(); });

        // Undo & Clear
        dom.btnUndo.addEventListener('click', undoLastAction);
        dom.btnClearCanvas.addEventListener('click', () => {
            if (confirm('Clear all placed plants from the design?')) {
                saveHistory();
                state.placedItems = [];
                state.selectedItemIndex = -1;
                deselect3DPlant();
                updateAnalytics();
                renderCanvas();
                if (threeState.isInitialized) rebuild3DPlantMeshes();
            }
        });

        // Seasonal Month Slider & Ticks
        dom.monthSlider.addEventListener('input', (e) => setMonth(parseInt(e.target.value, 10)));
        dom.monthTicks.forEach((tick) => {
            tick.addEventListener('click', () => {
                const month = parseInt(tick.getAttribute('data-month'), 10);
                dom.monthSlider.value = month;
                setMonth(month);
            });
        });

        // Play Seasons Auto-Cycle Button
        if (dom.btnPlaySeasons) {
            dom.btnPlaySeasons.addEventListener('click', togglePlaySeasons);
        }

        // Growth Horizon Time Machine
        dom.growthButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                dom.growthButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                const yr = parseInt(btn.getAttribute('data-year'), 10);
                setGrowthHorizon(yr);
            });
        });

        // Solar Sun Arc Slider
        if (dom.sunTimeSlider) {
            dom.sunTimeSlider.addEventListener('input', (e) => setSunHour(parseFloat(e.target.value)));
        }

        // Team Selector
        dom.teamSelect.addEventListener('change', (e) => {
            state.teamName = e.target.value;
            updateAnalytics();
        });

        // 2D Canvas Mouse Events
        const canvas = dom.plannerCanvas;
        canvas.addEventListener('mousedown', handleCanvasMouseDown);
        canvas.addEventListener('mousemove', handleCanvasMouseMove);
        window.addEventListener('mouseup', handleCanvasMouseUp);

        // Popover Close
        dom.btnClosePopover.addEventListener('click', () => {
            dom.calloutPopover.classList.remove('active');
            state.activeCalloutId = null;
        });

        // Blueprint Modal Handlers
        dom.btnOpenBlueprint.addEventListener('click', openBlueprintModal);
        dom.btnCloseBlueprint.addEventListener('click', closeBlueprintModal);
        dom.blueprintModal.addEventListener('click', (e) => {
            if (e.target === dom.blueprintModal) closeBlueprintModal();
        });

        dom.modalTabButtons.forEach((tabBtn) => {
            tabBtn.addEventListener('click', () => {
                dom.modalTabButtons.forEach((b) => b.classList.remove('active'));
                tabBtn.classList.add('active');
                const tabKey = tabBtn.getAttribute('data-tab');
                dom.tabContentBom.style.display = tabKey === 'tabBom' ? 'block' : 'none';
                dom.tabContentNursery.style.display = tabKey === 'tabNursery' ? 'block' : 'none';
                dom.tabContentMaintenance.style.display = tabKey === 'tabMaintenance' ? 'block' : 'none';
            });
        });

        // Exports & LocalStorage
        dom.btnExportImage.addEventListener('click', exportCanvasImage);
        dom.btnSavePlanLocal.addEventListener('click', savePlanToLocalStorage);

        // Keyboard Shortcuts (Delete / Backspace to delete selected plant, Esc to cancel planting)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (state.plantingSpeciesId) cancel3DPlantingMode();
                else deselect3DPlant();
            } else if (e.key === 'Delete' || e.key === 'Backspace') {
                if (state.selectedItemIndex >= 0 && !['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
                    deleteSelected3DPlant();
                }
            }
        });
    }

    /**
     * Loads a Showcase Case Study.
     */
    function loadShowcaseCase(caseId) {
        state.activeCaseId = caseId;
        saveHistory();

        if (caseId === 'custom_blank') {
            state.activeCaseData = null;
            state.placedItems = [];
            state.selectedItemIndex = -1;
            deselect3DPlant();
            updateAnalytics();
            renderCanvas();
            if (threeState.isInitialized) {
                build3DEnvironment(null);
                rebuild3DPlantMeshes();
            }
            return;
        }

        const caseData = window.LANDSCAPE_DESIGNER_CASES.find((c) => c.id === caseId) || window.LANDSCAPE_DESIGNER_CASES[0];
        state.activeCaseData = caseData;

        // Clone placed items
        state.placedItems = caseData.placedItems.map((item, idx) => ({
            id: 'case_item_' + idx,
            speciesId: item.speciesId,
            x: item.x,
            y: item.y,
            containerSize: item.containerSize,
            customNote: item.customNote,
            scale: 1.0,
            angle: 0
        }));

        state.selectedItemIndex = -1;
        deselect3DPlant();
        dom.calloutPopover.classList.remove('active');

        setGrowthHorizon(10);
        setMonth(4); // April spring bloom peak
        setSunHour(12);

        updateAnalytics();
        renderCanvas();
        if (threeState.isInitialized) {
            build3DEnvironment(caseData);
            rebuild3DPlantMeshes();
        }
    }

    /**
     * Sets growth horizon (1, 3, 5, 10).
     */
    function setGrowthHorizon(yr) {
        state.growthHorizonYear = yr;
        dom.growthButtons.forEach((b) => {
            const bYr = parseInt(b.getAttribute('data-year'), 10);
            b.classList.toggle('active', bYr === yr);
        });

        dom.growthStageBadge.textContent = `Year ${yr} (${2026 + yr - 1})`;
        dom.hudCurrentStage.textContent = `⏳ Year ${yr} (${yr === 1 ? 'Sapling' : yr === 10 ? 'Mature Microforest' : 'Expanding'})`;

        updateAnalytics();
        renderCanvas();
        if (threeState.isInitialized) {
            update3DGrowthScaling();
        }
    }

    /**
     * Sets active month (1..12).
     */
    function setMonth(month) {
        state.currentMonth = month;
        dom.currentMonthLabel.textContent = `${MONTH_NAMES[month - 1]} (${SEASON_LABELS[month]})`;
        dom.hudCurrentMonth.textContent = `🌸 ${MONTH_NAMES[month - 1]} (${SEASON_LABELS[month]})`;

        dom.monthTicks.forEach((t) => {
            const m = parseInt(t.getAttribute('data-month'), 10);
            t.classList.toggle('active', m === month);
        });

        updateAnalytics();
        renderCanvas();
        if (threeState.isInitialized) {
            update3DSeasonalMorphing();
        }
    }

    /**
     * Toggles 12-Month Seasonal Auto-Play.
     */
    function togglePlaySeasons() {
        state.isSeasonsPlaying = !state.isSeasonsPlaying;
        if (state.isSeasonsPlaying) {
            dom.btnPlaySeasons.textContent = '⏸ Pause Seasons';
            dom.btnPlaySeasons.classList.add('playing');
            state.seasonsInterval = setInterval(() => {
                let nextMonth = state.currentMonth + 1;
                if (nextMonth > 12) nextMonth = 1;
                dom.monthSlider.value = nextMonth;
                setMonth(nextMonth);
            }, 1400);
        } else {
            clearInterval(state.seasonsInterval);
            state.seasonsInterval = null;
            dom.btnPlaySeasons.textContent = '▶ Play Seasons';
            dom.btnPlaySeasons.classList.remove('playing');
        }
    }

    /**
     * Sets Solar Sun Hour (8.0 to 18.0).
     */
    function setSunHour(hour) {
        state.sunHour = hour;
        if (dom.sunTimeSlider) dom.sunTimeSlider.value = hour;

        // Formatted label
        const hrs = Math.floor(hour);
        const mins = Math.round((hour - hrs) * 60);
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        const dispHr = hrs > 12 ? hrs - 12 : (hrs === 0 ? 12 : hrs);
        const dispMin = mins < 10 ? '0' + mins : mins;
        let descriptor = hour < 10 ? '(Morning)' : hour <= 14 ? '(Noon Peak)' : '(Golden Hour)';
        if (dom.sunTimeLabel) dom.sunTimeLabel.textContent = `${dispHr}:${dispMin} ${ampm} ${descriptor}`;

        if (threeState.isInitialized) {
            update3DSunPosition();
        }
        updateAnalytics();
    }

    /**
     * Sets active viewport mode (2d, thermal, photo, 3d).
     */
    function setViewportMode(mode) {
        state.mode = mode;
        dom.btnMode2D.classList.toggle('active', mode === '2d');
        dom.btnModeThermal.classList.toggle('active', mode === 'thermal');
        dom.btnModeThermal.classList.toggle('thermal-active', mode === 'thermal');
        dom.btnModePhoto.classList.toggle('active', mode === 'photo');
        dom.btnMode3D.classList.toggle('active', mode === '3d');

        dom.thermalLegendBar.style.display = mode === 'thermal' ? 'flex' : 'none';

        if (mode === '3d') {
            dom.plannerCanvas.style.display = 'none';
            dom.threeContainer.style.display = 'block';
            if (dom.threeCameraBar) dom.threeCameraBar.style.display = 'flex';
            initOrUpdate3D();
        } else {
            cancel3DPlantingMode();
            deselect3DPlant();
            dom.plannerCanvas.style.display = 'block';
            dom.threeContainer.style.display = 'none';
            if (dom.threeCameraBar) dom.threeCameraBar.style.display = 'none';
            if (dom.threeInspectHud) dom.threeInspectHud.classList.remove('active');
            renderCanvas();
        }
    }

    /**
     * Renders plant palette in Tab 2.
     */
    function renderPaletteList() {
        if (!window.RGV_PLANT_PALETTE) return;
        const palette = window.RGV_PLANT_PALETTE;
        const container = dom.paletteListContainer;
        container.innerHTML = '';

        const filtered = palette.filter((plant) => {
            const matchCategory = state.categoryFilter === 'all' || plant.category === state.categoryFilter;
            const matchSearch = !state.searchQuery ||
                plant.commonName.toLowerCase().includes(state.searchQuery) ||
                plant.scientificName.toLowerCase().includes(state.searchQuery) ||
                plant.badge.toLowerCase().includes(state.searchQuery) ||
                (plant.nurserySpec && plant.nurserySpec.defaultContainer.toLowerCase().includes(state.searchQuery)) ||
                plant.pollinators.some((p) => p.toLowerCase().includes(state.searchQuery));
            return matchCategory && matchSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; color:#94a3b8; padding:24px 12px; font-size:0.82rem;">
                    No native species match "<strong>${state.searchQuery}</strong>".
                </div>
            `;
            return;
        }

        filtered.forEach((plant) => {
            const card = document.createElement('div');
            card.className = 'plant-card';
            card.setAttribute('data-id', plant.id);

            const isCurrentlyBlooming = plant.bloomMonths.includes(state.currentMonth);
            const categoryEmoji = plant.category === 'canopy' ? '🌳' : plant.category === 'understory' ? '🌿' : plant.category === 'shrub' ? '🌺' : '🦋';

            card.innerHTML = `
                <div class="plant-card-top">
                    <div class="plant-swatch" style="background:${plant.flowerColor}22; border-color:${plant.flowerColor};">
                        ${categoryEmoji}
                    </div>
                    <div class="plant-meta">
                        <div class="plant-name">${plant.commonName}</div>
                        <div class="plant-botanical">${plant.scientificName}</div>
                        <div class="plant-badges">
                            <span class="badge-tag cooling">↓ ${plant.maxCoolingDeltaF}°F Cooling</span>
                            <span class="badge-tag container-tag">${plant.nurserySpec.defaultContainer}</span>
                            <span class="badge-tag ${isCurrentlyBlooming ? 'bloom' : ''}">
                                ${isCurrentlyBlooming ? '🌸 Blooming' : `Blooms: M${plant.bloomMonths[0]}-M${plant.bloomMonths[plant.bloomMonths.length - 1]}`}
                            </span>
                        </div>
                    </div>
                </div>
                <div style="font-size:0.7rem; color:#64748b; margin-top:5px; line-height:1.3;">
                    ${plant.badge} • Est. $${plant.nurserySpec.estUnitCostUsd.toFixed(0)}
                </div>
                <div style="font-size:0.68rem; color:#15803d; font-weight:700; margin-top:4px;">
                    ▶ Click to Plant in 3D Studio
                </div>
            `;

            card.addEventListener('click', () => {
                if (state.mode === '3d') {
                    activate3DPlantingMode(plant.id);
                } else {
                    addPlantToCanvas(plant.id);
                }
            });

            container.appendChild(card);
        });
    }

    /**
     * Activates Direct 3D Planting Mode.
     */
    function activate3DPlantingMode(speciesId) {
        state.plantingSpeciesId = speciesId;
        const plant = getPlantData(speciesId);

        if (dom.plantingBannerSpecies) dom.plantingBannerSpecies.textContent = plant.commonName;
        if (dom.threePlantingBanner) dom.threePlantingBanner.style.display = 'flex';

        deselect3DPlant();

        // Create 3D ghost preview mesh in Three scene
        if (threeState.isInitialized) {
            update3DPlacementGhost(speciesId);
        }
    }

    /**
     * Cancels Direct 3D Planting Mode.
     */
    function cancel3DPlantingMode() {
        state.plantingSpeciesId = null;
        if (dom.threePlantingBanner) dom.threePlantingBanner.style.display = 'none';

        if (threeState.placementGhostGroup && threeState.scene) {
            threeState.scene.remove(threeState.placementGhostGroup);
            threeState.placementGhostGroup = null;
        }
        if (threeState.placementReticleMesh && threeState.scene) {
            threeState.scene.remove(threeState.placementReticleMesh);
            threeState.placementReticleMesh = null;
        }
    }

    /**
     * Adds plant to 2D canvas & 3D scene.
     */
    function addPlantToCanvas(speciesId, x, y) {
        saveHistory();
        const canvas = dom.plannerCanvas;
        const placeX = x !== undefined ? x : (canvas.width / 2) + (Math.random() * 80 - 40);
        const placeY = y !== undefined ? y : (canvas.height / 2) + (Math.random() * 80 - 40);

        const plant = getPlantData(speciesId);
        const newItem = {
            id: 'item_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            speciesId: speciesId,
            x: placeX,
            y: placeY,
            containerSize: plant.nurserySpec.defaultContainer,
            scale: 1.0,
            angle: 0
        };

        state.placedItems.push(newItem);
        state.selectedItemIndex = state.placedItems.length - 1;

        updateAnalytics();
        renderCanvas();
        if (threeState.isInitialized) {
            const pObj = createProcedural3DPlant(newItem, true); // Spring bounce animation
            if (pObj) {
                threeState.scene.add(pObj.group);
                threeState.plantObjects.push(pObj);
                select3DPlant(pObj);
            }
        }
    }

    /**
     * Saves history for undo.
     */
    function saveHistory() {
        state.history.push(JSON.stringify(state.placedItems));
        if (state.history.length > 25) state.history.shift();
    }

    /**
     * Undo last action.
     */
    function undoLastAction() {
        if (state.history.length > 0) {
            state.placedItems = JSON.parse(state.history.pop());
            state.selectedItemIndex = -1;
            deselect3DPlant();
            updateAnalytics();
            renderCanvas();
            if (threeState.isInitialized) rebuild3DPlantMeshes();
        }
    }

    /**
     * Fetches plant definition.
     */
    function getPlantData(speciesId) {
        return window.RGV_PLANT_PALETTE.find((p) => p.id === speciesId) || window.RGV_PLANT_PALETTE[0];
    }

    /**
     * Calculates crown radius based on growth stage.
     */
    function getRadiusForGrowth(plant, horizonYear) {
        const stageKey = 'year' + horizonYear;
        const spreadFt = plant.growth[stageKey] ? plant.growth[stageKey].spreadFt : plant.growth.year5.spreadFt;
        return spreadFt / 2;
    }

    /**
     * Canvas Mouse Down (2D).
     */
    function handleCanvasMouseDown(e) {
        const rect = dom.plannerCanvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (dom.plannerCanvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (dom.plannerCanvas.height / rect.height);

        // Check callout pins
        if (state.showCallouts && state.activeCaseData && state.activeCaseData.callouts) {
            for (let callout of state.activeCaseData.callouts) {
                const dist = Math.hypot(mouseX - callout.x, mouseY - (callout.y - 30));
                if (dist <= 18) {
                    showCalloutPopover(callout, e.clientX, e.clientY);
                    return;
                }
            }
        }

        // Check plant selection
        let clickedIndex = -1;
        for (let i = state.placedItems.length - 1; i >= 0; i--) {
            const item = state.placedItems[i];
            const plantData = getPlantData(item.speciesId);
            const radius = getRadiusForGrowth(plantData, state.growthHorizonYear) * 3.5;
            const dist = Math.hypot(mouseX - item.x, mouseY - item.y);
            if (dist <= radius) {
                clickedIndex = i;
                break;
            }
        }

        if (clickedIndex >= 0) {
            state.selectedItemIndex = clickedIndex;
            state.isDragging = true;
            state.dragOffsetX = mouseX - state.placedItems[clickedIndex].x;
            state.dragOffsetY = mouseY - state.placedItems[clickedIndex].y;
            dom.calloutPopover.classList.remove('active');
            saveHistory();
        } else {
            state.selectedItemIndex = -1;
            dom.calloutPopover.classList.remove('active');
        }

        renderCanvas();
    }

    /**
     * Canvas Mouse Move (2D).
     */
    function handleCanvasMouseMove(e) {
        if (!state.isDragging || state.selectedItemIndex < 0) return;
        const rect = dom.plannerCanvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (dom.plannerCanvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (dom.plannerCanvas.height / rect.height);

        const item = state.placedItems[state.selectedItemIndex];
        item.x = Math.max(30, Math.min(dom.plannerCanvas.width - 30, mouseX - state.dragOffsetX));
        item.y = Math.max(30, Math.min(dom.plannerCanvas.height - 30, mouseY - state.dragOffsetY));

        renderCanvas();
        updateAnalytics();
    }

    /**
     * Canvas Mouse Up (2D).
     */
    function handleCanvasMouseUp() {
        if (state.isDragging) {
            state.isDragging = false;
            renderCanvas();
            updateAnalytics();
        }
    }

    /**
     * Shows Callout Popover Card.
     */
    function showCalloutPopover(callout, clientX, clientY) {
        state.activeCalloutId = callout.id;
        dom.popoverTitle.textContent = callout.title;
        dom.popoverDesc.textContent = callout.desc;
        dom.popoverRationale.textContent = `💡 Rationale: ${callout.rationale}`;

        const pop = dom.calloutPopover;
        pop.style.left = `${clientX + 14}px`;
        pop.style.top = `${clientY - 20}px`;
        pop.classList.add('active');
    }

    /**
     * Renders 2D Canvas Viewport.
     */
    function renderCanvas() {
        if (state.mode === '3d') return; // Three.js handles 3D
        const ctx = dom.canvasCtx;
        const canvas = dom.plannerCanvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Background Base
        if (state.mode === 'photo' && state.customPhotoImg) {
            ctx.drawImage(state.customPhotoImg, 0, 0, canvas.width, canvas.height);
        } else if (state.mode === 'thermal') {
            drawThermalBackground(ctx, canvas);
        } else {
            drawArchitecturalBase(ctx, canvas);
        }

        // 2. Mulch Beds
        if (state.showMulchBeds && state.activeCaseData && state.activeCaseData.mulchBeds) {
            state.activeCaseData.mulchBeds.forEach((bed) => {
                ctx.save();
                ctx.beginPath();
                bed.points.forEach((pt, i) => {
                    if (i === 0) ctx.moveTo(pt[0], pt[1]);
                    else ctx.lineTo(pt[0], pt[1]);
                });
                ctx.closePath();
                ctx.fillStyle = state.mode === 'thermal' ? 'rgba(70, 150, 100, 0.4)' : '#6d4c41';
                ctx.fill();
                ctx.strokeStyle = state.mode === 'thermal' ? '#2e7d32' : '#4e342e';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            });
        }

        // 3. Walkways
        if (state.showWalkways && state.activeCaseData && state.activeCaseData.walkways) {
            state.activeCaseData.walkways.forEach((walk) => {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(walk.from[0], walk.from[1]);
                ctx.lineTo(walk.to[0], walk.to[1]);
                ctx.strokeStyle = state.mode === 'thermal' ? '#fbbf24' : '#e2d9cc';
                ctx.lineWidth = walk.width;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.restore();
            });
        }

        // 4. Solar Canopy Shadows
        if (state.showShadows && state.mode !== 'thermal') {
            const sunAngleRad = ((state.sunHour - 8) / 10) * Math.PI;
            const shadowDist = (12 - state.sunHour) * 3.2;
            state.placedItems.forEach((item) => {
                const plant = getPlantData(item.speciesId);
                const radius = getRadiusForGrowth(plant, state.growthHorizonYear) * 3.5;
                ctx.save();
                ctx.beginPath();
                ctx.arc(item.x + shadowDist, item.y + 6, radius * 1.15, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(15, 23, 42, 0.18)';
                ctx.fill();
                ctx.restore();
            });
        }

        // 5. Placed Plant Specimen Nodes
        state.placedItems.forEach((item, idx) => {
            const plant = getPlantData(item.speciesId);
            const radius = getRadiusForGrowth(plant, state.growthHorizonYear) * 3.5;
            const isSelected = idx === state.selectedItemIndex;
            const isBlooming = plant.bloomMonths.includes(state.currentMonth);

            // Spacing Guideline
            if (state.showSpacing || isSelected) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(item.x, item.y, radius * 1.3, 0, Math.PI * 2);
                ctx.strokeStyle = isSelected ? '#3b82f6' : 'rgba(100, 116, 139, 0.35)';
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.restore();
            }

            // Crown Disc
            ctx.save();
            ctx.beginPath();
            ctx.arc(item.x, item.y, radius, 0, Math.PI * 2);
            if (state.mode === 'thermal') {
                ctx.fillStyle = 'rgba(34, 197, 94, 0.75)';
            } else {
                ctx.fillStyle = isBlooming ? plant.flowerColor + 'bb' : (plant.category === 'canopy' ? '#166534cc' : '#2d6a4fcc');
            }
            ctx.fill();
            ctx.strokeStyle = isSelected ? '#ffffff' : '#0f172a';
            ctx.lineWidth = isSelected ? 3 : 1.5;
            ctx.stroke();

            // Center Trunk Core
            ctx.beginPath();
            ctx.arc(item.x, item.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // Label
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(plant.commonName.split(' ')[0], item.x, item.y - radius - 4);
            ctx.restore();
        });

        // 6. Callout Pins
        if (state.showCallouts && state.activeCaseData && state.activeCaseData.callouts) {
            state.activeCaseData.callouts.forEach((callout) => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(callout.x, callout.y - 20, 12, 0, Math.PI * 2);
                ctx.fillStyle = '#ef4444';
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 10px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(callout.markerNumber, callout.x, callout.y - 16);
                ctx.restore();
            });
        }
    }

    /**
     * Draws standard architectural plan base.
     */
    function drawArchitecturalBase(ctx, canvas) {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines (10ft CAD grid)
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let x = 0; x <= canvas.width; x += 30) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y <= canvas.height; y += 30) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // Campus Classroom Wing Building Base
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(160, 20, 640, 70);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.strokeRect(160, 20, 640, 70);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🏫 CAMPUS CLASSROOM WING (M. Rivas Pilot Courtyard)', 480, 60);

        // Asphalt Drop-off Loop
        ctx.fillStyle = '#475569';
        ctx.fillRect(100, 460, 760, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = '11px sans-serif';
        ctx.fillText('🚌 Bus Drop-Off & Blacktop Perimeter', 480, 495);
    }

    /**
     * Draws FLIR Thermal IR Heatmap.
     */
    function drawThermalBackground(ctx, canvas) {
        // High thermal gradient background
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#7f1d1d');
        grad.addColorStop(0.5, '#dc2626');
        grad.addColorStop(1, '#991b1b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Hot Blacktop Loop
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(100, 460, 760, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔥 FLIR HOT SPOT: Exposed Asphalt 148°F–162°F', 480, 495);
    }

    /**
     * Updates Eco, Canopy & Thermal Analytics.
     */
    function updateAnalytics() {
        let totalCanopySqFt = 0;
        let maxCoolDelta = 0;
        let totalStormwater = 0;
        let totalWildlife = 0;
        let totalCarbon = 0;

        const activeBloomMonthsSet = new Set();
        const attractedWildlifeSet = new Set();
        const speciesCountMap = {};

        state.placedItems.forEach((item) => {
            const plant = getPlantData(item.speciesId);
            const stageKey = 'year' + state.growthHorizonYear;
            const spreadFt = plant.growth[stageKey] ? plant.growth[stageKey].spreadFt : 15;
            const radiusFt = spreadFt / 2;
            const area = Math.PI * radiusFt * radiusFt;

            totalCanopySqFt += area;
            if (plant.maxCoolingDeltaF > maxCoolDelta) maxCoolDelta = plant.maxCoolingDeltaF;
            totalStormwater += plant.annualStormwaterGal || 500;
            totalWildlife += plant.wildlifeScore || 50;
            totalCarbon += (plant.category === 'canopy' ? 48 : 18);

            plant.bloomMonths.forEach((m) => activeBloomMonthsSet.add(m));
            plant.pollinators.forEach((w) => attractedWildlifeSet.add(w));
            speciesCountMap[item.speciesId] = (speciesCountMap[item.speciesId] || 0) + 1;
        });

        // Courtyard Total Area = ~25,000 sq ft
        const totalYardSqFt = 25000;
        const canopyRatio = Math.min(100, ((totalCanopySqFt / totalYardSqFt) * 100)).toFixed(1);

        // Readouts
        if (dom.metricCanopySqFt) dom.metricCanopySqFt.textContent = `${Math.round(totalCanopySqFt).toLocaleString()} sq ft`;
        if (dom.metricCanopyRatio) dom.metricCanopyRatio.textContent = `Coverage: ${canopyRatio}% of schoolyard`;
        if (dom.metricCoolingDelta) dom.metricCoolingDelta.textContent = `↓ ${maxCoolDelta}°F Thermal Drop`;
        if (dom.metricHotTemp) dom.metricHotTemp.textContent = `Exposed Asphalt: ${(108 + (state.sunHour - 8) * 3.5).toFixed(0)}°F`;
        if (dom.metricCoolTemp) dom.metricCoolTemp.textContent = `Shaded Ground: ${(108 + (state.sunHour - 8) * 3.5 - maxCoolDelta).toFixed(0)}°F`;
        if (dom.metricStormwaterGal) dom.metricStormwaterGal.textContent = `${Math.round(totalStormwater).toLocaleString()} gal/yr`;
        if (dom.metricWildlifeScore) dom.metricWildlifeScore.textContent = `${Math.min(100, Math.round(totalWildlife / (state.placedItems.length || 1)))}/100`;
        if (dom.metricCarbonLbs) dom.metricCarbonLbs.textContent = `${Math.round(totalCarbon * (state.growthHorizonYear / 5))} lbs/yr`;

        if (dom.hudPlacedCount) dom.hudPlacedCount.textContent = `${state.placedItems.length} Plants Placed`;

        // 12-Month Bloom Strip
        if (dom.bloomMiniStrip) {
            dom.bloomMiniStrip.innerHTML = '';
            let missingMonthsCount = 0;
            for (let m = 1; m <= 12; m++) {
                const hasBloom = activeBloomMonthsSet.has(m);
                const cell = document.createElement('div');
                cell.className = `mini-month-cell ${hasBloom ? 'covered' : 'gap'}`;
                cell.title = `${MONTH_NAMES[m - 1]}: ${hasBloom ? 'Flowers & Nectar Active' : 'Bloom Gap'}`;
                dom.bloomMiniStrip.appendChild(cell);
                if (!hasBloom) missingMonthsCount++;
            }

            if (dom.auditStatusBadge && dom.auditDescText) {
                if (state.placedItems.length === 0) {
                    dom.auditStatusBadge.className = 'audit-badge gaps';
                    dom.auditStatusBadge.textContent = 'No Plants Placed';
                    dom.auditDescText.textContent = 'Add native plants to generate a continuous year-round pollinator corridor.';
                } else if (missingMonthsCount <= 2) {
                    dom.auditStatusBadge.className = 'audit-badge perfect';
                    dom.auditStatusBadge.textContent = 'Continuous Forage! 🌟';
                    dom.auditDescText.textContent = 'Awesome! Your planting plan provides non-stop flowers & nectar from March through November.';
                } else {
                    dom.auditStatusBadge.className = 'audit-badge gaps';
                    dom.auditStatusBadge.textContent = `${missingMonthsCount} Month Gaps Found`;
                    dom.auditDescText.textContent = 'Consider adding Cenizo or Mountain Laurel to fill early spring/late autumn nectar gaps.';
                }
            }
        }

        // Wildlife Badges
        if (dom.visitorsListContainer) {
            dom.visitorsListContainer.innerHTML = '';
            if (attractedWildlifeSet.size === 0) {
                dom.visitorsListContainer.innerHTML = '<span style="font-size:0.75rem; color:#94a3b8;">Place species to attract pollinators.</span>';
            } else {
                Array.from(attractedWildlifeSet).forEach((w) => {
                    const badge = document.createElement('span');
                    badge.className = 'visitor-badge';
                    badge.textContent = `🌿 ${w}`;
                    dom.visitorsListContainer.appendChild(badge);
                });
            }
        }

        // Dossier Tab 4 Mini BOM Summary
        if (dom.dossierBomSummaryBody) {
            dom.dossierBomSummaryBody.innerHTML = '';
            if (Object.keys(speciesCountMap).length === 0) {
                dom.dossierBomSummaryBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#94a3b8;">No plants placed yet.</td></tr>';
            } else {
                Object.keys(speciesCountMap).forEach((spId) => {
                    const plant = getPlantData(spId);
                    const count = speciesCountMap[spId];
                    const unitCost = plant.nurserySpec ? plant.nurserySpec.estUnitCostUsd : 50;
                    const lineTotal = count * unitCost;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${plant.commonName}</strong></td>
                        <td>${count}</td>
                        <td><small>${plant.nurserySpec.defaultContainer}</small></td>
                        <td>$${lineTotal.toFixed(0)}</td>
                    `;
                    dom.dossierBomSummaryBody.appendChild(tr);
                });
            }
        }
    }

    /**
     * Auto-Tour for Designer Showcase Cases.
     */
    function toggleCaseTour() {
        state.isTourRunning = !state.isTourRunning;
        dom.btnCaseTour.textContent = state.isTourRunning ? '⏹ Stop Tour' : '▶ Auto-Tour Showcase';

        if (!state.isTourRunning) {
            clearInterval(state.tourInterval);
            state.tourInterval = null;
            return;
        }

        const cases = window.LANDSCAPE_DESIGNER_CASES || [];
        let caseIdx = 0;
        let step = 0;

        state.tourInterval = setInterval(() => {
            const c = cases[caseIdx % cases.length];
            loadShowcaseCase(c.id);

            const years = [1, 3, 5, 10];
            const yr = years[step % years.length];
            const months = [3, 4, 7, 10];
            const m = months[step % months.length];

            setGrowthHorizon(yr);
            setMonth(m);

            if (state.activeCaseData && state.activeCaseData.callouts) {
                const callout = state.activeCaseData.callouts[step % state.activeCaseData.callouts.length];
                const rect = dom.plannerCanvas.getBoundingClientRect();
                showCalloutPopover(callout, rect.left + callout.x, rect.top + callout.y);
            }

            step++;
            if (step % 4 === 0) caseIdx++;
        }, 3200);
    }

    /**
     * =========================================================================
     * BLOOMSEYE-INSPIRED 3D BOTANICAL VISUALIZER & DIRECT PLANTING ENGINE
     * =========================================================================
     */

    const clock = new THREE.Clock();

    /**
     * Initializes or updates the Three.js 3D Viewport.
     */
    function initOrUpdate3D() {
        const container = dom.threeContainer;
        if (!container || !window.THREE) return;

        if (!threeState.isInitialized) {
            // 1. Scene setup with soft Texas atmospheric sky & fog
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xdcecf8);
            scene.fog = new THREE.FogExp2(0xdcecf8, 0.0065);

            // 2. Perspective Camera
            const width = container.clientWidth || 960;
            const height = container.clientHeight || 540;
            const aspect = width / height;
            const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
            camera.position.set(CAMERA_PRESETS.isometric.pos.x, CAMERA_PRESETS.isometric.pos.y, CAMERA_PRESETS.isometric.pos.z);
            camera.lookAt(CAMERA_PRESETS.isometric.target.x, CAMERA_PRESETS.isometric.target.y, CAMERA_PRESETS.isometric.target.z);

            // 3. WebGL Renderer with High-Performance Soft Shadows & Graceful Fallback
            let renderer = null;
            try {
                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
            } catch (e1) {
                try {
                    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
                } catch (e2) {
                    console.warn("WebGL not available in this browser environment:", e2);
                    setViewportMode('2d');
                    return;
                }
            }
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.outputEncoding = THREE.sRGBEncoding;

            container.innerHTML = '';
            container.appendChild(renderer.domElement);

            // 4. Orbit Controls
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.06;
            controls.maxPolarAngle = Math.PI / 2 - 0.04; // Prevent going underground
            controls.minDistance = 6;
            controls.maxDistance = 160;
            controls.target.set(CAMERA_PRESETS.isometric.target.x, CAMERA_PRESETS.isometric.target.y, CAMERA_PRESETS.isometric.target.z);

            // 5. Natural Solar Lighting (Solar South Orbit)
            const hemiLight = new THREE.HemisphereLight(0xffffff, 0x475569, 0.75);
            scene.add(hemiLight);
            threeState.hemiLight = hemiLight;

            const sunLight = new THREE.DirectionalLight(0xfffaed, 1.35);
            sunLight.position.set(38, 65, 28);
            sunLight.castShadow = true;
            sunLight.shadow.mapSize.width = 2048;
            sunLight.shadow.mapSize.height = 2048;
            sunLight.shadow.camera.near = 0.5;
            sunLight.shadow.camera.far = 180;
            sunLight.shadow.camera.left = -75;
            sunLight.shadow.camera.right = 75;
            sunLight.shadow.camera.top = 75;
            sunLight.shadow.camera.bottom = -75;
            sunLight.shadow.bias = -0.0003;
            scene.add(sunLight);
            threeState.sunLight = sunLight;

            const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.45);
            fillLight.position.set(-30, 40, -20);
            scene.add(fillLight);

            const ambientLight = new THREE.AmbientLight(0xf1f5f9, 0.4);
            scene.add(ambientLight);
            threeState.ambientLight = ambientLight;

            // 6. Raycaster & Mouse Coordinate Vector
            threeState.raycaster = new THREE.Raycaster();
            threeState.mouse = new THREE.Vector2();

            // Drag plane for moving plants smoothly along the ground (Y = 0)
            const dragPlaneGeo = new THREE.PlaneGeometry(400, 400);
            const dragPlaneMat = new THREE.MeshBasicMaterial({ visible: false });
            const dragPlane = new THREE.Mesh(dragPlaneGeo, dragPlaneMat);
            dragPlane.rotation.x = -Math.PI / 2;
            scene.add(dragPlane);
            threeState.dragPlane = dragPlane;

            // 7. Store Three.js State
            threeState.scene = scene;
            threeState.camera = camera;
            threeState.renderer = renderer;
            threeState.controls = controls;
            threeState.isInitialized = true;

            // 8. Handle Container & Window Resizing
            window.addEventListener('resize', onWindowResize3D);

            // 9. Continuous Animation Loop with Natural Breeze Wind Physics
            function animate3D() {
                requestAnimationFrame(animate3D);
                const elapsed = clock.getElapsedTime();

                // Natural wind breeze swaying tree canopies, fronds, and blossoms
                threeState.plantObjects.forEach((pObj, idx) => {
                    if (pObj.foliageGroup) {
                        const swayAmt = 0.022;
                        pObj.foliageGroup.rotation.z = Math.sin(elapsed * 1.5 + idx * 0.8) * swayAmt;
                        pObj.foliageGroup.rotation.x = Math.cos(elapsed * 1.2 + idx * 0.5) * (swayAmt * 0.7);
                    }
                    if (pObj.flowerGroup) {
                        pObj.flowerGroup.rotation.z = Math.sin(elapsed * 1.5 + idx * 0.8) * 0.015;
                    }
                });

                // Smooth spring-bounce scale animation for freshly planted items
                threeState.plantObjects.forEach((pObj) => {
                    if (pObj.springBounceProgress !== undefined && pObj.springBounceProgress < 1) {
                        pObj.springBounceProgress += 0.045;
                        const p = pObj.springBounceProgress;
                        // Elastic overshoot ease out
                        const s = 1.70158;
                        const ease = Math.min(1, Math.pow(p - 1, 3) + 1 + Math.sin(p * Math.PI * 2) * (1 - p) * 0.35);
                        pObj.group.scale.set(
                            (pObj.targetScaleXZ || 1) * Math.max(0.01, ease),
                            (pObj.targetScaleY || 1) * Math.max(0.01, ease),
                            (pObj.targetScaleXZ || 1) * Math.max(0.01, ease)
                        );
                    }
                });

                // Selection ring pulse animation
                if (threeState.selectionRingMesh && threeState.selectionRingMesh.visible) {
                    const pulse = 1 + Math.sin(elapsed * 4) * 0.06;
                    threeState.selectionRingMesh.scale.set(pulse, 1, pulse);
                }

                // Placement reticle pulse
                if (threeState.placementReticleMesh && threeState.placementReticleMesh.visible) {
                    const rPulse = 1 + Math.sin(elapsed * 5) * 0.08;
                    threeState.placementReticleMesh.scale.set(rPulse, 1, rPulse);
                }

                controls.update();
                renderer.render(scene, camera);
            }
            animate3D();
        }

        // Build Environment & Plant Meshes for active case
        build3DEnvironment(state.activeCaseData);
        rebuild3DPlantMeshes();
        update3DSunPosition();
        onWindowResize3D();
    }

    /**
     * Handles 3D Viewport Resize.
     */
    function onWindowResize3D() {
        if (!threeState.isInitialized || !dom.threeContainer) return;
        const container = dom.threeContainer;
        const width = container.clientWidth || 960;
        const height = container.clientHeight || 540;
        if (width === 0 || height === 0) return;
        threeState.camera.aspect = width / height;
        threeState.camera.updateProjectionMatrix();
        threeState.renderer.setSize(width, height);
    }

    /**
     * Smoothly animates camera to a target preset.
     */
    function animateCameraTo(targetPos, targetLookAt, durationMs = 850) {
        if (!threeState.camera || !threeState.controls) return;
        const startPos = threeState.camera.position.clone();
        const startTarget = threeState.controls.target.clone();
        const endPos = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
        const endTarget = new THREE.Vector3(targetLookAt.x, targetLookAt.y, targetLookAt.z);
        const startTime = performance.now();

        function stepCamera(now) {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            const ease = 1 - Math.pow(1 - progress, 3);

            threeState.camera.position.lerpVectors(startPos, endPos, ease);
            threeState.controls.target.lerpVectors(startTarget, endTarget, ease);
            threeState.controls.update();

            if (progress < 1) {
                requestAnimationFrame(stepCamera);
            }
        }
        requestAnimationFrame(stepCamera);
    }

    /**
     * Updates 3D Sun Position & Ambient Lighting from Solar Arc Slider.
     */
    function update3DSunPosition() {
        if (!threeState.isInitialized || !threeState.sunLight) return;
        const hour = state.sunHour;
        const theta = ((hour - 8) / 10) * Math.PI; // 0 at 8 AM, PI/2 at 1 PM, PI at 6 PM

        // East to West Arc
        const sunX = Math.cos(theta) * 55;
        const sunY = Math.sin(theta) * 58 + 12;
        const sunZ = 28 - Math.sin(theta) * 8;

        threeState.sunLight.position.set(sunX, sunY, sunZ);
        threeState.sunLight.intensity = 0.6 + Math.sin(theta) * 0.85;

        // Color warm shift for morning/golden hour
        if (hour < 9.5 || hour > 16.5) {
            threeState.sunLight.color.setHex(0xffedd5); // Warm golden peach
        } else {
            threeState.sunLight.color.setHex(0xfffaed); // Bright midday solar white
        }
    }

    /**
     * Creates a stylized 3D student figure enjoying shaded tree seating.
     */
    function createStudentFigure3D(shirtHex, isSitting = false) {
        const student = new THREE.Group();
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xf5d0b5, roughness: 0.6, flatShading: true });
        const shirtMat = new THREE.MeshStandardMaterial({ color: shirtHex, roughness: 0.65, flatShading: true });
        const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.7, flatShading: true });
        const hairMat = new THREE.MeshStandardMaterial({ color: 0x2b1d0c, roughness: 0.9, flatShading: true });

        // Head & Hair
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 10), skinMat);
        head.position.y = isSitting ? 1.45 : 1.7;
        head.castShadow = true;
        student.add(head);

        const hair = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 10), hairMat);
        hair.position.set(0, (isSitting ? 1.45 : 1.7) + 0.05, -0.04);
        hair.scale.set(1, 0.9, 0.95);
        hair.castShadow = true;
        student.add(hair);

        // Torso / Shirt
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.65, 7), shirtMat);
        torso.position.y = isSitting ? 0.95 : 1.15;
        torso.castShadow = true;
        student.add(torso);

        // Legs
        if (isSitting) {
            const thighs = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.45), pantsMat);
            thighs.position.set(0, 0.65, 0.22);
            thighs.castShadow = true;
            student.add(thighs);

            const shins = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.45, 0.18), pantsMat);
            shins.position.set(0, 0.35, 0.42);
            shins.castShadow = true;
            student.add(shins);
        } else {
            const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.7, 7), pantsMat);
            legs.position.y = 0.45;
            legs.castShadow = true;
            student.add(legs);
        }

        return student;
    }

    /**
     * Builds the 3D Schoolyard Environment (Campus Building, Walkways, Mulch Beds, Amenities, Students).
     */
    function build3DEnvironment(caseData) {
        if (!threeState.isInitialized) return;
        const scene = threeState.scene;

        if (threeState.envGroup) {
            scene.remove(threeState.envGroup);
            threeState.envGroup = null;
        }

        const envGroup = new THREE.Group();

        // 1. Lush Green Turf Lawn Ground Plane (160 x 160 ft)
        const groundGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
        const groundMat = new THREE.MeshStandardMaterial({
            color: 0x5a8a18,
            roughness: 0.92,
            metalness: 0.05,
            flatShading: true
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        envGroup.add(ground);
        threeState.groundMesh = ground;

        // 2. Campus Classroom Wing Building Block
        const bldgGeo = new THREE.BoxGeometry(72, 9.5, 15);
        const bldgMat = new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            roughness: 0.65,
            flatShading: true
        });
        const building = new THREE.Mesh(bldgGeo, bldgMat);
        building.position.set(0, 4.75, -34.5);
        building.castShadow = true;
        building.receiveShadow = true;
        envGroup.add(building);

        // Brick Wainscot / Base
        const brickGeo = new THREE.BoxGeometry(72.2, 2.5, 15.2);
        const brickMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.9, flatShading: true });
        const brick = new THREE.Mesh(brickGeo, brickMat);
        brick.position.set(0, 1.25, -34.5);
        brick.castShadow = true;
        envGroup.add(brick);

        // Building Roof Overhang & Parapet
        const roofGeo = new THREE.BoxGeometry(74, 0.8, 17);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7, flatShading: true });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(0, 9.8, -34.5);
        roof.castShadow = true;
        envGroup.add(roof);

        // Classroom Glass Windows Row
        for (let wx = -30; wx <= 30; wx += 7.5) {
            const winGeo = new THREE.PlaneGeometry(4.8, 3.4);
            const winMat = new THREE.MeshStandardMaterial({
                color: 0x38bdf8,
                roughness: 0.1,
                metalness: 0.85,
                transparent: true,
                opacity: 0.85
            });
            const win = new THREE.Mesh(winGeo, winMat);
            win.position.set(wx, 5.5, -26.85);
            envGroup.add(win);
        }

        // Classroom Entry Vestibule & Awning
        const entryGeo = new THREE.BoxGeometry(9, 6.2, 3.2);
        const entryMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, flatShading: true });
        const entry = new THREE.Mesh(entryGeo, entryMat);
        entry.position.set(0, 3.1, -25.4);
        envGroup.add(entry);

        // 3. Drop-off Bus Loop & Blacktop (South of Courtyard)
        const asphaltGeo = new THREE.PlaneGeometry(98, 16);
        const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.95, flatShading: true });
        const asphalt = new THREE.Mesh(asphaltGeo, asphaltMat);
        asphalt.rotation.x = -Math.PI / 2;
        asphalt.position.set(0, 0.02, 32);
        asphalt.receiveShadow = true;
        envGroup.add(asphalt);

        // Concrete Curbing
        const curbGeo = new THREE.BoxGeometry(98, 0.35, 0.6);
        const curbMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.6, flatShading: true });
        const curb = new THREE.Mesh(curbGeo, curbMat);
        curb.position.set(0, 0.17, 23.7);
        curb.castShadow = true;
        curb.receiveShadow = true;
        envGroup.add(curb);

        // 4. 3D Raised Cedar Mulch Beds
        const mulchBedColor = 0x452a19;
        if (caseData && caseData.mulchBeds) {
            caseData.mulchBeds.forEach((bed) => {
                const shape = new THREE.Shape();
                bed.points.forEach((pt, i) => {
                    const bx = (pt[0] - 480) * 0.1;
                    const bz = (pt[1] - 270) * 0.1;
                    if (i === 0) shape.moveTo(bx, -bz);
                    else shape.lineTo(bx, -bz);
                });
                const extrudeSettings = { depth: 0.14, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.12, bevelThickness: 0.06 };
                const bedGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                const bedMat = new THREE.MeshStandardMaterial({ color: mulchBedColor, roughness: 0.95, flatShading: true });
                const bedMesh = new THREE.Mesh(bedGeo, bedMat);
                bedMesh.rotation.x = -Math.PI / 2;
                bedMesh.position.y = 0.035;
                bedMesh.receiveShadow = true;
                bedMesh.name = 'mulchBedMesh';
                envGroup.add(bedMesh);
            });
        }

        // 5. 3D Flagstone Walkway Slabs
        const walkwayMat = new THREE.MeshStandardMaterial({ color: 0xe2d9cc, roughness: 0.8, flatShading: true });
        for (let pz = -23; pz <= 20; pz += 3.2) {
            const stoneGeo = new THREE.BoxGeometry(3.6, 0.06, 2.6);
            const stone = new THREE.Mesh(stoneGeo, walkwayMat);
            stone.position.set(0, 0.045, pz);
            stone.receiveShadow = true;
            stone.name = 'walkwayMesh';
            envGroup.add(stone);
        }

        // 6. 3D Outdoor Learning Circle (8 Cedar Log Benches & Students)
        const benchMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.85, flatShading: true });
        const benchRadius = 6.2;
        const studentShirtColors = [0xf97316, 0x3b82f6, 0x10b981, 0x8b5cf6, 0xef4444, 0x06b6d4];

        for (let b = 0; b < 8; b++) {
            const angle = (b / 8) * Math.PI * 2;
            const bx = Math.cos(angle) * benchRadius;
            const bz = Math.sin(angle) * benchRadius;
            const benchGeo = new THREE.CylinderGeometry(0.45, 0.45, 2.4, 8);
            const bench = new THREE.Mesh(benchGeo, benchMat);
            bench.position.set(bx, 0.4, bz);
            bench.rotation.z = Math.PI / 2;
            bench.rotation.y = -angle;
            bench.castShadow = true;
            bench.receiveShadow = true;
            envGroup.add(bench);

            // Add seated students on 4 of the benches
            if (b % 2 === 0) {
                const student = createStudentFigure3D(studentShirtColors[b % studentShirtColors.length], true);
                student.position.set(bx * 0.95, 0.2, bz * 0.95);
                student.rotation.y = angle + Math.PI; // Face center of circle
                envGroup.add(student);
            }
        }

        // 7. 3D Hydration Spigot Standpipe & Modern Bike Racks
        const spigotGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.4, 8);
        const spigotMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3 });
        const spigot = new THREE.Mesh(spigotGeo, spigotMat);
        spigot.position.set(16, 0.7, 6);
        spigot.castShadow = true;
        envGroup.add(spigot);

        for (let r = 0; r < 3; r++) {
            const rackGeo = new THREE.TorusGeometry(0.8, 0.08, 8, 16, Math.PI);
            const rackMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.2 });
            const rack = new THREE.Mesh(rackGeo, rackMat);
            rack.position.set(-16 + r * 2.2, 0.8, 6);
            rack.castShadow = true;
            envGroup.add(rack);
        }

        // 8. Selection Ring Mesh (Pre-created for fast toggle)
        const selRingGeo = new THREE.RingGeometry(2.0, 2.3, 32);
        const selRingMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
        const selRing = new THREE.Mesh(selRingGeo, selRingMat);
        selRing.rotation.x = -Math.PI / 2;
        selRing.position.y = 0.06;
        selRing.visible = false;
        envGroup.add(selRing);
        threeState.selectionRingMesh = selRing;

        scene.add(envGroup);
        threeState.envGroup = envGroup;
    }

    /**
     * Updates 3D Layer Visibility (Mulch Beds, Walkways, Shadows).
     */
    function update3DLayerVisibility() {
        if (!threeState.envGroup) return;
        threeState.envGroup.traverse((child) => {
            if (child.name === 'mulchBedMesh') child.visible = state.showMulchBeds;
            if (child.name === 'walkwayMesh') child.visible = state.showWalkways;
        });
        threeState.plantObjects.forEach((pObj) => {
            if (pObj.shadowDisc) pObj.shadowDisc.visible = state.showShadows;
        });
    }

    /**
     * Rebuilds all procedural 3D plant models based on state.placedItems.
     */
    function rebuild3DPlantMeshes() {
        if (!threeState.isInitialized) return;
        const scene = threeState.scene;

        // Clean up previous plant objects
        threeState.plantObjects.forEach((pObj) => {
            scene.remove(pObj.group);
        });
        threeState.plantObjects = [];

        // Generate procedural plant models
        state.placedItems.forEach((item) => {
            const pObj = createProcedural3DPlant(item, false);
            if (pObj) {
                scene.add(pObj.group);
                threeState.plantObjects.push(pObj);
            }
        });

        // Apply real-time seasonal blooming & 10-year growth scaling
        update3DSeasonalMorphing();
        update3DGrowthScaling();
        update3DLayerVisibility();
    }

    /**
     * Deforms a geometry's vertices slightly with deterministic noise for organic natural foliage.
     */
    function applyOrganicFoliageDeformation(geometry, noiseStrength = 0.22) {
        const pos = geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const vx = pos.getX(i);
            const vy = pos.getY(i);
            const vz = pos.getZ(i);
            const noise = 1 + (Math.sin(vx * 3.5) * Math.cos(vy * 3.5) * Math.sin(vz * 3.5)) * noiseStrength;
            pos.setXYZ(i, vx * noise, vy * noise, vz * noise);
        }
        geometry.computeVertexNormals();
        return geometry;
    }

    /**
     * Creates an individual botanical procedural 3D Plant Model with rich botanical features.
     * Features 16 distinct species architectures tailored for BloomsEye Studio fidelity.
     */
    function createProcedural3DPlant(item, animateSpring = false) {
        const plantData = getPlantData(item.speciesId);
        if (!plantData) return null;

        const stageKey = 'year' + state.growthHorizonYear;
        const growth = plantData.growth[stageKey] || plantData.growth.year5;
        const hFt = growth.heightFt || 15;
        const sFt = growth.spreadFt || 15;
        const caliperIn = growth.caliperIn || 3;

        // World Coordinates
        const worldX = (item.x - 480) * 0.1;
        const worldZ = (item.y - 270) * 0.1;

        const baseH = hFt * 0.38;
        const baseSpread = sFt * 0.34;
        const caliper = caliperIn * 0.065;

        const group = new THREE.Group();
        group.position.set(worldX, 0, worldZ);
        group.userData = { id: item.id, speciesId: plantData.id, plantData: plantData };

        // Bark & Trunk Materials per Species
        let trunkColorHex = 0x3a2c20;
        if (plantData.id === 'mexican_sycamore') trunkColorHex = 0xf1f5f9; // Mottled white/olive
        else if (plantData.id === 'retama') trunkColorHex = 0x65a30d; // Bright lime green photosynthetic bark
        else if (plantData.id === 'texas_mountain_laurel') trunkColorHex = 0x78716c; // Smooth gray
        else if (plantData.id === 'montezuma_cypress') trunkColorHex = 0x5c3a21; // Fibrous cedar
        else if (plantData.id === 'cenizo') trunkColorHex = 0x8c7853; // Beige tan
        else if (plantData.id === 'texas_redbud') trunkColorHex = 0x292524; // Dark charcoal brown

        const trunkMat = new THREE.MeshStandardMaterial({
            color: trunkColorHex,
            roughness: 0.88,
            metalness: 0.05,
            flatShading: true
        });

        const branchMeshes = [];
        let trunkMesh = null;

        const foliageGroup = new THREE.Group();
        group.add(foliageGroup);
        const foliageMeshes = [];

        const flowerGroup = new THREE.Group();
        group.add(flowerGroup);
        const flowerMeshes = [];

        const fruitGroup = new THREE.Group();
        group.add(fruitGroup);
        const fruitMeshes = [];

        const flowerHex = parseInt(plantData.flowerColor.replace('#', '0x')) || 0xf59e0b;

        // =====================================================================
        // SPECIES-SPECIFIC 3D BOTANICAL ARCHITECTURES
        // =====================================================================

        if (plantData.id === 'montezuma_cypress') {
            // 1. Montezuma Bald Cypress (Ahuehuete)
            // Fluted buttressed base with 5 root flares
            const buttressGeo = new THREE.CylinderGeometry(caliper * 0.7, caliper * 2.5, baseH * 0.3, 8);
            const buttress = new THREE.Mesh(buttressGeo, trunkMat);
            buttress.position.y = baseH * 0.15;
            buttress.castShadow = true;
            group.add(buttress);

            const trunkGeo = new THREE.CylinderGeometry(caliper * 0.25, caliper * 0.7, baseH * 0.75, 8);
            trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
            trunkMesh.position.y = baseH * 0.55;
            trunkMesh.castShadow = true;
            group.add(trunkMesh);

            // 8 Tiered Weeping Conical Layers
            const tiers = 8;
            for (let t = 0; t < tiers; t++) {
                const tierSpread = baseSpread * (0.94 - t * 0.11);
                const tierH = baseH * 0.22;
                const tierGeo = applyOrganicFoliageDeformation(new THREE.ConeGeometry(tierSpread, tierH, 10), 0.2);
                const tierMat = new THREE.MeshStandardMaterial({ color: 0x234e36, roughness: 0.85, flatShading: true });
                const tierMesh = new THREE.Mesh(tierGeo, tierMat);
                tierMesh.position.y = baseH * (0.3 + t * 0.11);
                tierMesh.castShadow = true;
                tierMesh.receiveShadow = true;
                foliageGroup.add(tierMesh);
                foliageMeshes.push(tierMesh);
            }

            // Male catkin blossoms (Spring)
            for (let b = 0; b < 24; b++) {
                const cGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 5);
                const cMat = new THREE.MeshStandardMaterial({ color: 0x8da372, emissive: 0x8da372, emissiveIntensity: 0.2, flatShading: true });
                const cMesh = new THREE.Mesh(cGeo, cMat);
                const ang = (b / 24) * Math.PI * 2;
                const dist = baseSpread * 0.5;
                cMesh.position.set(Math.cos(ang) * dist, baseH * (0.4 + (b % 4) * 0.1), Math.sin(ang) * dist);
                flowerGroup.add(cMesh);
                flowerMeshes.push(cMesh);
            }

        } else if (plantData.id === 'sabal_palm') {
            // 2. Texas Sabal Palm
            // Sturdy columnar trunk with cross-hatched boot ridges
            const trunkGeo = new THREE.CylinderGeometry(caliper * 0.9, caliper * 1.15, baseH * 0.78, 10);
            trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
            trunkMesh.position.y = baseH * 0.39;
            trunkMesh.castShadow = true;
            group.add(trunkMesh);

            // 16 Arching 3D Fan Fronds with costapalmate curvature
            const frondCount = 16;
            for (let f = 0; f < frondCount; f++) {
                const frondGroup = new THREE.Group();
                frondGroup.position.y = baseH * 0.78;
                frondGroup.rotation.y = (f / frondCount) * Math.PI * 2;

                // Petiole stalk
                const stalkGeo = new THREE.CylinderGeometry(0.05, 0.08, baseSpread * 0.45, 5);
                const stalkMat = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.7, flatShading: true });
                const stalk = new THREE.Mesh(stalkGeo, stalkMat);
                stalk.position.set(0, baseSpread * 0.15, baseSpread * 0.2);
                stalk.rotation.x = 0.55;
                stalk.castShadow = true;
                frondGroup.add(stalk);

                // Wide fan blade
                const bladeGeo = new THREE.ConeGeometry(baseSpread * 0.42, 0.06, 7);
                const bladeMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.65, flatShading: true });
                const blade = new THREE.Mesh(bladeGeo, bladeMat);
                blade.position.set(0, baseSpread * 0.28, baseSpread * 0.5);
                blade.rotation.x = 0.75;
                blade.scale.set(1, 0.05, 0.75);
                blade.castShadow = true;
                frondGroup.add(blade);

                foliageGroup.add(frondGroup);
                foliageMeshes.push(blade);
            }

            // Hanging flower/fruit panicles
            for (let fp = 0; fp < 6; fp++) {
                const panGeo = new THREE.CylinderGeometry(0.06, 0.18, baseSpread * 0.35, 5);
                const panMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, emissive: 0xfef3c7, emissiveIntensity: 0.25, flatShading: true });
                const panMesh = new THREE.Mesh(panGeo, panMat);
                const pAng = (fp / 6) * Math.PI * 2;
                panMesh.position.set(Math.cos(pAng) * baseSpread * 0.25, baseH * 0.72, Math.sin(pAng) * baseSpread * 0.25);
                panMesh.rotation.z = 0.4;
                flowerGroup.add(panMesh);
                flowerMeshes.push(panMesh);

                // Black palm berries (Autumn)
                const berryGeo = new THREE.SphereGeometry(0.12, 6, 6);
                const berryMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.4 });
                const berryMesh = new THREE.Mesh(berryGeo, berryMat);
                berryMesh.position.set(Math.cos(pAng) * baseSpread * 0.3, baseH * 0.68, Math.sin(pAng) * baseSpread * 0.3);
                fruitGroup.add(berryMesh);
                fruitMeshes.push(berryMesh);
            }

        } else if (plantData.id === 'bur_oak') {
            // 3. Bur Oak (Heavy Gnarled Bark, 4 Crooked Scaffold Limbs & Multi-Lobe Canopy)
            const rootGeo = new THREE.CylinderGeometry(caliper * 0.8, caliper * 1.8, baseH * 0.22, 8);
            const root = new THREE.Mesh(rootGeo, trunkMat);
            root.position.y = baseH * 0.11;
            root.castShadow = true;
            group.add(root);

            const trunkGeo = new THREE.CylinderGeometry(caliper * 0.65, caliper * 0.8, baseH * 0.45, 8);
            trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
            trunkMesh.position.y = baseH * 0.35;
            trunkMesh.castShadow = true;
            group.add(trunkMesh);

            // 4 Spreading Scaffold Limbs
            const scaffoldAngles = [0.2, 1.8, 3.4, 4.9];
            scaffoldAngles.forEach((ang) => {
                const limbGeo = new THREE.CylinderGeometry(caliper * 0.35, caliper * 0.5, baseH * 0.38, 6);
                const limb = new THREE.Mesh(limbGeo, trunkMat);
                limb.position.set(Math.cos(ang) * baseSpread * 0.2, baseH * 0.52, Math.sin(ang) * baseSpread * 0.2);
                limb.rotation.z = Math.cos(ang) * 0.45;
                limb.rotation.x = Math.sin(ang) * 0.45;
                limb.castShadow = true;
                group.add(limb);
                branchMeshes.push(limb);
            });

            // 14 Dense Multi-Lobe Oak Canopy Clusters
            const oakClusterCount = 14;
            for (let c = 0; c < oakClusterCount; c++) {
                const isTop = c === 0;
                const cRadius = isTop ? baseSpread * 0.52 : baseSpread * (0.3 + (c % 4) * 0.06);
                const cGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(cRadius, 1), 0.25);
                const cMat = new THREE.MeshStandardMaterial({
                    color: c % 2 === 0 ? 0x1e5631 : 0x14532d,
                    roughness: 0.82,
                    flatShading: true
                });
                const cMesh = new THREE.Mesh(cGeo, cMat);

                if (isTop) {
                    cMesh.position.set(0, baseH * 0.82, 0);
                } else {
                    const ang = ((c - 1) / (oakClusterCount - 1)) * Math.PI * 2;
                    const dist = baseSpread * 0.42;
                    cMesh.position.set(Math.cos(ang) * dist, baseH * (0.62 + (c % 3) * 0.08), Math.sin(ang) * dist);
                }
                cMesh.castShadow = true;
                cMesh.receiveShadow = true;
                foliageGroup.add(cMesh);
                foliageMeshes.push(cMesh);
            }

            // Mossy Acorn Clusters & Spring Catkins
            for (let b = 0; b < 36; b++) {
                const bRadius = Math.max(0.14, baseSpread * 0.042);
                const bGeo = new THREE.IcosahedronGeometry(bRadius, 1);
                const bMat = new THREE.MeshStandardMaterial({ color: flowerHex, emissive: flowerHex, emissiveIntensity: 0.25, flatShading: true });
                const bMesh = new THREE.Mesh(bGeo, bMat);
                const theta = (b / 36) * Math.PI * 2;
                const phi = Math.acos(2 * (b / 36) - 1);
                const dist = baseSpread * 0.54;
                bMesh.position.set(Math.sin(phi) * Math.cos(theta) * dist, baseH * 0.72 + Math.cos(phi) * (baseSpread * 0.3), Math.sin(phi) * Math.sin(theta) * dist);
                flowerGroup.add(bMesh);
                flowerMeshes.push(bMesh);
            }

        } else if (plantData.id === 'mexican_sycamore') {
            // 4. Mexican Sycamore (Mottled White/Olive Bark & Broad Palmate Crown)
            const trunkGeo = new THREE.CylinderGeometry(caliper * 0.5, caliper * 0.75, baseH * 0.52, 8);
            trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
            trunkMesh.position.y = baseH * 0.38;
            trunkMesh.castShadow = true;
            group.add(trunkMesh);

            // 12 Broad Palmate Leaf Masses
            for (let c = 0; c < 12; c++) {
                const isCenter = c === 0;
                const cRadius = isCenter ? baseSpread * 0.58 : baseSpread * 0.38;
                const cGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(cRadius, 1), 0.28);
                const cMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8, flatShading: true });
                const cMesh = new THREE.Mesh(cGeo, cMat);

                if (isCenter) {
                    cMesh.position.set(0, baseH * 0.85, 0);
                } else {
                    const ang = ((c - 1) / 11) * Math.PI * 2;
                    cMesh.position.set(Math.cos(ang) * baseSpread * 0.45, baseH * (0.65 + (c % 3) * 0.08), Math.sin(ang) * baseSpread * 0.45);
                }
                cMesh.castShadow = true;
                foliageGroup.add(cMesh);
                foliageMeshes.push(cMesh);
            }

            // Hanging Sycamore Seedballs
            for (let sb = 0; sb < 16; sb++) {
                const ballGeo = new THREE.SphereGeometry(0.18, 6, 6);
                const ballMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9, flatShading: true });
                const ball = new THREE.Mesh(ballGeo, ballMat);
                const sAng = (sb / 16) * Math.PI * 2;
                ball.position.set(Math.cos(sAng) * baseSpread * 0.4, baseH * 0.6, Math.sin(sAng) * baseSpread * 0.4);
                fruitGroup.add(ball);
                fruitMeshes.push(ball);
            }

        } else if (plantData.id === 'retama') {
            // 5. Retama (Palo Verde) - Lime Green Photosynthetic Trunk, Weeping Branchlets & Yellow Blossoms
            const trunkGeo = new THREE.CylinderGeometry(caliper * 0.4, caliper * 0.6, baseH * 0.48, 6);
            trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
            trunkMesh.position.y = baseH * 0.28;
            trunkMesh.castShadow = true;
            group.add(trunkMesh);

            // 6 Airy Weeping Limbs
            for (let r = 0; r < 6; r++) {
                const rAng = (r / 6) * Math.PI * 2;
                const limbGeo = new THREE.CylinderGeometry(caliper * 0.2, caliper * 0.35, baseH * 0.4, 5);
                const limb = new THREE.Mesh(limbGeo, trunkMat);
                limb.position.set(Math.cos(rAng) * baseSpread * 0.22, baseH * 0.45, Math.sin(rAng) * baseSpread * 0.22);
                limb.rotation.z = Math.cos(rAng) * 0.55;
                limb.rotation.x = Math.sin(rAng) * 0.55;
                limb.castShadow = true;
                group.add(limb);
                branchMeshes.push(limb);

                // Feathery Weeping Leaf Sprays
                const sprayGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(baseSpread * 0.34, 1), 0.28);
                const sprayMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.75, flatShading: true });
                const spray = new THREE.Mesh(sprayGeo, sprayMat);
                spray.position.set(Math.cos(rAng) * baseSpread * 0.45, baseH * 0.62, Math.sin(rAng) * baseSpread * 0.45);
                foliageGroup.add(spray);
                foliageMeshes.push(spray);
            }

            // 50+ Starry Yellow Flowers with Red Centers
            for (let b = 0; b < 50; b++) {
                const bGeo = new THREE.ConeGeometry(0.18, 0.12, 5);
                const bMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xfacc15, emissiveIntensity: 0.35, flatShading: true });
                const bMesh = new THREE.Mesh(bGeo, bMat);
                const bAng = (b / 50) * Math.PI * 2;
                const bDist = baseSpread * (0.25 + (b % 4) * 0.08);
                bMesh.position.set(Math.cos(bAng) * bDist, baseH * (0.45 + (b % 5) * 0.08), Math.sin(bAng) * bDist);
                flowerGroup.add(bMesh);
                flowerMeshes.push(bMesh);
            }

        } else if (plantData.id === 'texas_redbud') {
            // 6. Texas Redbud - Multi-Trunk Vase with Early Spring Magenta Pea-Blossoms
            const stemCount = 3;
            for (let s = 0; s < stemCount; s++) {
                const sAng = (s / stemCount) * Math.PI * 2;
                const stemGeo = new THREE.CylinderGeometry(caliper * 0.3, caliper * 0.5, baseH * 0.55, 6);
                const stem = new THREE.Mesh(stemGeo, trunkMat);
                stem.position.set(Math.cos(sAng) * baseSpread * 0.12, baseH * 0.28, Math.sin(sAng) * baseSpread * 0.12);
                stem.rotation.z = Math.cos(sAng) * 0.28;
                stem.rotation.x = Math.sin(sAng) * 0.28;
                stem.castShadow = true;
                group.add(stem);
                if (s === 0) trunkMesh = stem;
                else branchMeshes.push(stem);
            }

            // Heart-shaped Foliage Clusters
            for (let f = 0; f < 8; f++) {
                const fAng = (f / 8) * Math.PI * 2;
                const fGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(baseSpread * 0.32, 1), 0.2);
                const fMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.75, flatShading: true });
                const fMesh = new THREE.Mesh(fGeo, fMat);
                fMesh.position.set(Math.cos(fAng) * baseSpread * 0.35, baseH * (0.6 + (f % 2) * 0.1), Math.sin(fAng) * baseSpread * 0.35);
                foliageGroup.add(fMesh);
                foliageMeshes.push(fMesh);
            }

            // 60+ Magenta Flowers Hugging Limbs & Twigs
            for (let b = 0; b < 60; b++) {
                const bGeo = new THREE.SphereGeometry(0.14, 6, 6);
                const bMat = new THREE.MeshStandardMaterial({ color: 0xdb2777, emissive: 0xdb2777, emissiveIntensity: 0.45, flatShading: true });
                const bMesh = new THREE.Mesh(bGeo, bMat);
                const bAng = (b / 60) * Math.PI * 2;
                const bDist = baseSpread * (0.15 + (b % 4) * 0.08);
                bMesh.position.set(Math.cos(bAng) * bDist, baseH * (0.35 + (b % 6) * 0.08), Math.sin(bAng) * bDist);
                flowerGroup.add(bMesh);
                flowerMeshes.push(bMesh);
            }

        } else if (plantData.id === 'texas_mountain_laurel') {
            // 7. Texas Mountain Laurel - Smooth Slate Gray Multi-Stem with Drooping Purple Racemes
            for (let s = 0; s < 3; s++) {
                const sAng = (s / 3) * Math.PI * 2;
                const stemGeo = new THREE.CylinderGeometry(caliper * 0.35, caliper * 0.55, baseH * 0.5, 6);
                const stem = new THREE.Mesh(stemGeo, trunkMat);
                stem.position.set(Math.cos(sAng) * baseSpread * 0.14, baseH * 0.25, Math.sin(sAng) * baseSpread * 0.14);
                stem.rotation.z = Math.cos(sAng) * 0.24;
                stem.castShadow = true;
                group.add(stem);
                if (s === 0) trunkMesh = stem;
                else branchMeshes.push(stem);
            }

            // Glossy Dark Evergreen Canopy
            for (let f = 0; f < 8; f++) {
                const fAng = (f / 8) * Math.PI * 2;
                const fGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(baseSpread * 0.36, 1), 0.2);
                const fMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.65, flatShading: true });
                const fMesh = new THREE.Mesh(fGeo, fMat);
                fMesh.position.set(Math.cos(fAng) * baseSpread * 0.36, baseH * (0.58 + (f % 2) * 0.1), Math.sin(fAng) * baseSpread * 0.36);
                foliageGroup.add(fMesh);
                foliageMeshes.push(fMesh);
            }

            // 28 Drooping Purple Wisteria-like Flower Racemes (Cones)
            for (let r = 0; r < 28; r++) {
                const racGeo = new THREE.ConeGeometry(0.24, 0.65, 6);
                const racMat = new THREE.MeshStandardMaterial({ color: 0x7c3aed, emissive: 0x6d28d9, emissiveIntensity: 0.35, flatShading: true });
                const racMesh = new THREE.Mesh(racGeo, racMat);
                const rAng = (r / 28) * Math.PI * 2;
                const rDist = baseSpread * 0.44;
                racMesh.position.set(Math.cos(rAng) * rDist, baseH * 0.58 - 0.2, Math.sin(rAng) * rDist);
                racMesh.rotation.x = Math.PI; // Drooping downward
                flowerGroup.add(racMesh);
                flowerMeshes.push(racMesh);
            }

        } else if (plantData.id === 'cenizo') {
            // 8. Cenizo (Texas Purple Sage) - Compact Silvery-Lavender Dome with 80+ Purple Bell Blooms
            const stemGeo = new THREE.CylinderGeometry(caliper * 0.3, caliper * 0.6, baseH * 0.25, 6);
            trunkMesh = new THREE.Mesh(stemGeo, trunkMat);
            trunkMesh.position.y = baseH * 0.12;
            group.add(trunkMesh);

            // Silvery-Lavender Foliage Dome
            const domeGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(baseSpread * 0.65, 2), 0.22);
            const domeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85, flatShading: true });
            const dome = new THREE.Mesh(domeGeo, domeMat);
            dome.position.y = baseH * 0.55;
            dome.scale.set(1, 0.75, 1);
            dome.castShadow = true;
            foliageGroup.add(dome);
            foliageMeshes.push(dome);

            // 80+ Purple Bell Flowers
            for (let b = 0; b < 80; b++) {
                const bGeo = new THREE.ConeGeometry(0.14, 0.18, 5);
                const bMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x9333ea, emissiveIntensity: 0.4, flatShading: true });
                const bMesh = new THREE.Mesh(bGeo, bMat);
                const theta = (b / 80) * Math.PI * 2;
                const phi = Math.acos(2 * (b / 80) - 1);
                const dist = baseSpread * 0.66;
                bMesh.position.set(Math.sin(phi) * Math.cos(theta) * dist, baseH * 0.55 + Math.cos(phi) * (baseSpread * 0.4), Math.sin(phi) * Math.sin(theta) * dist);
                flowerGroup.add(bMesh);
                flowerMeshes.push(bMesh);
            }

        } else if (plantData.id === 'turks_cap') {
            // 9. Turk's Cap - Velvety Mounded Shrub with 45+ Upright Scarlet Red Spiral Tubes
            const shrubGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(baseSpread * 0.55, 1), 0.22);
            const shrubMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8, flatShading: true });
            const shrub = new THREE.Mesh(shrubGeo, shrubMat);
            shrub.position.y = baseH * 0.48;
            shrub.castShadow = true;
            foliageGroup.add(shrub);
            foliageMeshes.push(shrub);

            // 45+ Scarlet Red Upright Spiral Corolla Tubes
            for (let b = 0; b < 45; b++) {
                const bGeo = new THREE.CylinderGeometry(0.08, 0.05, 0.42, 6);
                const bMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xef4444, emissiveIntensity: 0.4, flatShading: true });
                const bMesh = new THREE.Mesh(bGeo, bMat);
                const theta = (b / 45) * Math.PI * 2;
                const phi = Math.acos(2 * (b / 45) - 1);
                const dist = baseSpread * 0.56;
                bMesh.position.set(Math.sin(phi) * Math.cos(theta) * dist, baseH * 0.48 + Math.cos(phi) * (baseSpread * 0.32), Math.sin(phi) * Math.sin(theta) * dist);
                flowerGroup.add(bMesh);
                flowerMeshes.push(bMesh);
            }

        } else if (plantData.id === 'esperanza') {
            // 10. Esperanza (Yellow Bells) - Upright Bush with Golden Trumpet Clusters
            const shrubGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(baseSpread * 0.52, 1), 0.2);
            const shrubMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.75, flatShading: true });
            const shrub = new THREE.Mesh(shrubGeo, shrubMat);
            shrub.position.y = baseH * 0.52;
            shrub.castShadow = true;
            foliageGroup.add(shrub);
            foliageMeshes.push(shrub);

            // 45+ Golden Trumpet Flower Clusters
            for (let b = 0; b < 45; b++) {
                const bGeo = new THREE.ConeGeometry(0.18, 0.38, 6);
                const bMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xeab308, emissiveIntensity: 0.4, flatShading: true });
                const bMesh = new THREE.Mesh(bGeo, bMat);
                const theta = (b / 45) * Math.PI * 2;
                const phi = Math.acos(2 * (b / 45) - 1);
                const dist = baseSpread * 0.54;
                bMesh.position.set(Math.sin(phi) * Math.cos(theta) * dist, baseH * 0.52 + Math.cos(phi) * (baseSpread * 0.34), Math.sin(phi) * Math.sin(theta) * dist);
                flowerGroup.add(bMesh);
                flowerMeshes.push(bMesh);
            }

        } else if (plantData.id === 'prickly_pear') {
            // 11. Texas Prickly Pear Cactus (Segmented Flat Oval Cladode Pads + Yellow Blooms)
            const padMat = new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.7, flatShading: true });
            const padPositions = [
                { x: 0, y: 0.4, z: 0, rx: 0, ry: 0.2, s: 1.0 },
                { x: -0.4, y: 0.8, z: 0.1, rx: 0.1, ry: -0.3, s: 0.85 },
                { x: 0.4, y: 0.85, z: -0.1, rx: -0.1, ry: 0.4, s: 0.88 },
                { x: 0, y: 1.25, z: 0, rx: 0.2, ry: 0.1, s: 0.75 },
                { x: -0.65, y: 1.2, z: 0.2, rx: -0.2, ry: 0.5, s: 0.7 }
            ];

            padPositions.forEach((pos) => {
                const padGeo = new THREE.CylinderGeometry(baseSpread * 0.32 * pos.s, baseSpread * 0.32 * pos.s, 0.08, 10);
                const pad = new THREE.Mesh(padGeo, padMat);
                pad.position.set(pos.x * baseSpread, pos.y * baseH * 0.45, pos.z * baseSpread);
                pad.rotation.z = Math.PI / 2;
                pad.rotation.y = pos.ry;
                pad.rotation.x = pos.rx;
                pad.scale.set(1, 0.25, 1.4);
                pad.castShadow = true;
                foliageGroup.add(pad);
                foliageMeshes.push(pad);

                // Yellow cactus blooms on pad tops
                const bloomGeo = new THREE.ConeGeometry(0.18, 0.22, 6);
                const bloomMat = new THREE.MeshStandardMaterial({ color: 0xfde047, emissive: 0xfde047, emissiveIntensity: 0.35, flatShading: true });
                const bloom = new THREE.Mesh(bloomGeo, bloomMat);
                bloom.position.set(pos.x * baseSpread, (pos.y * baseH * 0.45) + baseSpread * 0.22 * pos.s, pos.z * baseSpread);
                flowerGroup.add(bloom);
                flowerMeshes.push(bloom);

                // Purple tuna fruit (Autumn)
                const tunaGeo = new THREE.SphereGeometry(0.14, 6, 6);
                const tunaMat = new THREE.MeshStandardMaterial({ color: 0xbe185d, roughness: 0.5 });
                const tuna = new THREE.Mesh(tunaGeo, tunaMat);
                tuna.position.set(pos.x * baseSpread, (pos.y * baseH * 0.45) + baseSpread * 0.2 * pos.s, pos.z * baseSpread);
                fruitGroup.add(tuna);
                fruitMeshes.push(tuna);
            });

        } else {
            // Generic Native Shrub / Perennial (Flame Acanthus, Mexican Bush Sage, Lantana, Blackfoot Daisy, Anacua)
            const clusterCount = plantData.category === 'canopy' ? 10 : plantData.category === 'understory' ? 7 : 5;
            for (let c = 0; c < clusterCount; c++) {
                const isCenter = c === 0;
                const cRadius = isCenter ? baseSpread * 0.52 : baseSpread * 0.32;
                const cGeo = applyOrganicFoliageDeformation(new THREE.DodecahedronGeometry(cRadius, 1), 0.22);
                const cMat = new THREE.MeshStandardMaterial({
                    color: plantData.id === 'mexican_bush_sage' ? 0x475569 : 0x166534,
                    roughness: 0.8,
                    flatShading: true
                });
                const cMesh = new THREE.Mesh(cGeo, cMat);

                if (isCenter) {
                    cMesh.position.set(0, baseH * 0.55, 0);
                } else {
                    const ang = ((c - 1) / (clusterCount - 1)) * Math.PI * 2;
                    cMesh.position.set(Math.cos(ang) * baseSpread * 0.32, baseH * (0.45 + (c % 2) * 0.1), Math.sin(ang) * baseSpread * 0.32);
                }
                cMesh.castShadow = true;
                foliageGroup.add(cMesh);
                foliageMeshes.push(cMesh);
            }

            // 32+ Blossoms
            const bCount = 32;
            for (let b = 0; b < bCount; b++) {
                const bRadius = Math.max(0.12, baseSpread * 0.045);
                const bGeo = new THREE.IcosahedronGeometry(bRadius, 1);
                const bMat = new THREE.MeshStandardMaterial({ color: flowerHex, emissive: flowerHex, emissiveIntensity: 0.35, flatShading: true });
                const bMesh = new THREE.Mesh(bGeo, bMat);
                const theta = (b / bCount) * Math.PI * 2;
                const phi = Math.acos(2 * (b / bCount) - 1);
                const dist = baseSpread * 0.52;
                bMesh.position.set(Math.sin(phi) * Math.cos(theta) * dist, baseH * 0.55 + Math.cos(phi) * (baseSpread * 0.28), Math.sin(phi) * Math.sin(theta) * dist);
                flowerGroup.add(bMesh);
                flowerMeshes.push(bMesh);
            }
        }

        // Soft Ground Contact Shadow Disc
        const shadowGeo = new THREE.CircleGeometry(baseSpread * 0.88, 24);
        const shadowMat = new THREE.MeshBasicMaterial({
            color: 0x0f172a,
            transparent: true,
            opacity: 0.28,
            depthWrite: false
        });
        const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
        shadowDisc.rotation.x = -Math.PI / 2;
        shadowDisc.position.y = 0.015;
        group.add(shadowDisc);

        // Spring Bounce Animation Parameters if freshly planted
        let springProgress = animateSpring ? 0.01 : 1.0;
        if (animateSpring) {
            group.scale.set(0.01, 0.01, 0.01);
        }

        return {
            id: item.id,
            speciesId: plantData.id,
            group: group,
            trunkMesh: trunkMesh,
            branchMeshes: branchMeshes,
            foliageGroup: foliageGroup,
            foliageMeshes: foliageMeshes,
            flowerGroup: flowerGroup,
            flowerMeshes: flowerMeshes,
            fruitGroup: fruitGroup,
            fruitMeshes: fruitMeshes,
            shadowDisc: shadowDisc,
            plantData: plantData,
            baseHeight: baseH,
            baseSpread: baseSpread,
            baseCaliper: caliper,
            targetScaleXZ: 1.0,
            targetScaleY: 1.0,
            springBounceProgress: springProgress
        };
    }

    /**
     * Updates 3D Placement Ghost Mesh when hovering in Direct Planting mode.
     */
    function update3DPlacementGhost(speciesId) {
        if (!threeState.scene) return;

        if (threeState.placementGhostGroup) {
            threeState.scene.remove(threeState.placementGhostGroup);
            threeState.placementGhostGroup = null;
        }

        const plantData = getPlantData(speciesId);
        const ghostGroup = new THREE.Group();

        // Translucent preview sphere & stem
        const gGeo = new THREE.DodecahedronGeometry(3.2, 1);
        const gMat = new THREE.MeshStandardMaterial({
            color: 0x84cc16,
            transparent: true,
            opacity: 0.55,
            wireframe: false,
            flatShading: true
        });
        const gMesh = new THREE.Mesh(gGeo, gMat);
        gMesh.position.y = 4.2;
        ghostGroup.add(gMesh);

        const gStemGeo = new THREE.CylinderGeometry(0.3, 0.5, 3.5, 6);
        const gStemMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, transparent: true, opacity: 0.55 });
        const gStem = new THREE.Mesh(gStemGeo, gStemMat);
        gStem.position.y = 1.75;
        ghostGroup.add(gStem);

        // Glowing Ground Reticle
        const reticleGeo = new THREE.RingGeometry(2.6, 3.0, 32);
        const reticleMat = new THREE.MeshBasicMaterial({ color: 0x84cc16, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
        const reticle = new THREE.Mesh(reticleGeo, reticleMat);
        reticle.rotation.x = -Math.PI / 2;
        reticle.position.y = 0.05;
        ghostGroup.add(reticle);

        ghostGroup.visible = false;
        threeState.scene.add(ghostGroup);
        threeState.placementGhostGroup = ghostGroup;
        threeState.placementReticleMesh = reticle;
    }

    /**
     * Real-time 12-Month Seasonal Morphing Slider Controller.
     * Morphs flower bud scaling (0 to 1), fruit maturation, and color-lerps foliage across seasons.
     */
    function update3DSeasonalMorphing() {
        if (!threeState.isInitialized) return;
        const month = state.currentMonth;

        threeState.plantObjects.forEach((pObj) => {
            const plant = pObj.plantData;
            const isBlooming = plant.bloomMonths.includes(month);

            // 1. Calculate Target Foliage Color & Deciduous Dormancy Scale
            let targetFoliageHex = 0x166534; // Summer lush default
            let foliageScale = 1.0;

            if (plant.foliageType === 'deciduous') {
                if (month === 12 || month === 1) {
                    // Winter dormancy: bare twig silhouette
                    targetFoliageHex = 0x78350f;
                    foliageScale = 0.12; // Leaves dropped, sculptural branches visible
                } else if (month === 2) {
                    // Late winter bud awakening
                    targetFoliageHex = 0x84cc16;
                    foliageScale = 0.45;
                } else if (month >= 3 && month <= 5) {
                    // Spring fresh vibrant flush
                    targetFoliageHex = 0x65a30d;
                    foliageScale = 1.0;
                } else if (month >= 6 && month <= 8) {
                    // Summer dense heat shield
                    targetFoliageHex = 0x166534;
                    foliageScale = 1.0;
                } else if (month === 9) {
                    // Early autumn monsoon flush
                    targetFoliageHex = 0x4ade80;
                    foliageScale = 1.0;
                } else if (month >= 10 && month <= 11) {
                    // Autumn golden amber foliage turn
                    targetFoliageHex = 0xca8a04;
                    foliageScale = 0.95;
                }
            } else if (plant.id === 'cenizo') {
                // Silvery-lavender Texas Sage foliage
                targetFoliageHex = 0x94a3b8;
                foliageScale = 1.0;
            } else if (plant.id === 'montezuma_cypress') {
                // Montezuma Cypress semi-evergreen autumn bronze turn
                if (month === 12 || month === 1) targetFoliageHex = 0x9a3412; // Bronze rust
                else if (month >= 3 && month <= 5) targetFoliageHex = 0x22c55e;
                else targetFoliageHex = 0x234e36;
                foliageScale = 1.0;
            } else {
                // Evergreen / Semi-evergreen
                if (month >= 3 && month <= 5) targetFoliageHex = 0x4ade80;
                else targetFoliageHex = 0x14532d;
                foliageScale = 1.0;
            }

            // Apply foliage color & scale
            pObj.foliageMeshes.forEach((mesh) => {
                mesh.material.color.setHex(targetFoliageHex);
                mesh.scale.set(foliageScale, foliageScale, foliageScale);
            });

            // 2. Real-time Flower Blossom Morphing (Scales 0 to 1 when scrubbing month slider)
            const targetFlowerScale = isBlooming ? 1.0 : 0.001;
            pObj.flowerMeshes.forEach((fMesh) => {
                fMesh.scale.set(targetFlowerScale, targetFlowerScale, targetFlowerScale);
            });

            // 3. Autumn Fruit / Berry Maturation (Months 9 to 11)
            const isFruiting = (month >= 9 && month <= 11);
            pObj.fruitMeshes.forEach((frMesh) => {
                frMesh.scale.set(isFruiting ? 1.0 : 0.001, isFruiting ? 1.0 : 0.001, isFruiting ? 1.0 : 0.001);
            });
        });

        // Update 3D Inspect HUD in real-time if an object is currently hovered
        if (threeState.hoveredPlantObj) {
            update3DInspectHudData(threeState.hoveredPlantObj);
        }
    }

    /**
     * Real-time 10-Year Growth Scaling Controller.
     * Scales 3D tree height, crown spread, trunk thickness, and ground shadow discs.
     */
    function update3DGrowthScaling() {
        if (!threeState.isInitialized) return;
        const horizon = state.growthHorizonYear;
        const stageKey = 'year' + horizon;

        threeState.plantObjects.forEach((pObj) => {
            const growth = pObj.plantData.growth[stageKey] || pObj.plantData.growth.year5;
            const hFt = growth.heightFt || 15;
            const sFt = growth.spreadFt || 15;

            const targetH = hFt * 0.38;
            const targetSpread = sFt * 0.34;

            const scaleY = targetH / (pObj.baseHeight || 1);
            const scaleXZ = targetSpread / (pObj.baseSpread || 1);

            pObj.targetScaleY = scaleY;
            pObj.targetScaleXZ = scaleXZ;

            if (pObj.springBounceProgress === undefined || pObj.springBounceProgress >= 1) {
                pObj.group.scale.set(scaleXZ, scaleY, scaleXZ);
            }
        });

        if (threeState.hoveredPlantObj) {
            update3DInspectHudData(threeState.hoveredPlantObj);
        }
    }

    /**
     * 3D Pointer Down Event (Handles selection and drag-start).
     */
    function handle3DPointerDown(e) {
        if (!threeState.isInitialized || !threeState.raycaster || !threeState.camera) return;
        threeState.isPointerDown = true;
        threeState.pointerDownPos = { x: e.clientX, y: e.clientY };

        const hitPlant = raycastForPlant(e);
        if (hitPlant && !state.plantingSpeciesId) {
            threeState.draggedPlantObj = hitPlant;
            threeState.controls.enabled = false; // Disable orbit while dragging plant
        }
    }

    /**
     * 3D Pointer Move Event (Hover inspect, direct planting ghost reticle, or dragging plant).
     */
    function handle3DMouseMove(e) {
        if (!threeState.isInitialized || !threeState.raycaster || !threeState.camera) return;

        const rect = dom.threeContainer.getBoundingClientRect();
        threeState.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        threeState.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        threeState.raycaster.setFromCamera(threeState.mouse, threeState.camera);

        // CASE 1: Direct 3D Planting Mode Active (Ghost Follows Cursor)
        if (state.plantingSpeciesId && threeState.placementGhostGroup) {
            const groundIntersects = threeState.raycaster.intersectObject(threeState.dragPlane);
            if (groundIntersects.length > 0) {
                const pt = groundIntersects[0].point;
                threeState.placementGhostGroup.position.set(pt.x, 0, pt.z);
                threeState.placementGhostGroup.visible = true;
            }
            return;
        }

        // CASE 2: Dragging an Existing 3D Plant
        if (threeState.draggedPlantObj && threeState.isPointerDown) {
            const groundIntersects = threeState.raycaster.intersectObject(threeState.dragPlane);
            if (groundIntersects.length > 0) {
                const pt = groundIntersects[0].point;
                threeState.draggedPlantObj.group.position.set(pt.x, 0, pt.z);

                // Update 2D canvas coordinates
                const item = state.placedItems.find((it) => it.id === threeState.draggedPlantObj.id);
                if (item) {
                    item.x = pt.x * 10 + 480;
                    item.y = pt.z * 10 + 270;
                }

                if (threeState.selectionRingMesh) {
                    threeState.selectionRingMesh.position.set(pt.x, 0.06, pt.z);
                }
                updateAnalytics();
            }
            return;
        }

        // CASE 3: Hover Inspection
        const hitPlantObj = raycastForPlant(e);
        if (hitPlantObj) {
            if (threeState.hoveredPlantObj !== hitPlantObj) {
                clear3DHighlight();
                threeState.hoveredPlantObj = hitPlantObj;
                hitPlantObj.foliageMeshes.forEach((m) => {
                    if (m.material.emissive) {
                        m.material.emissive.setHex(0x3b82f6);
                        m.material.emissiveIntensity = 0.35;
                    }
                });

                update3DInspectHudData(hitPlantObj);
                dom.threeInspectHud.classList.add('active');
            }
        } else {
            clear3DHighlight();
            dom.threeInspectHud.classList.remove('active');
        }
    }

    /**
     * 3D Pointer Up Event (Click-to-Plant, Select, or Drag-End).
     */
    function handle3DPointerUp(e) {
        if (!threeState.isInitialized) return;
        const dragDist = Math.hypot(e.clientX - threeState.pointerDownPos.x, e.clientY - threeState.pointerDownPos.y);

        // CASE 1: Click in Direct 3D Planting Mode
        if (state.plantingSpeciesId && dragDist < 8) {
            const groundIntersects = threeState.raycaster.intersectObject(threeState.dragPlane);
            if (groundIntersects.length > 0) {
                const pt = groundIntersects[0].point;
                const canvasX = pt.x * 10 + 480;
                const canvasY = pt.z * 10 + 270;

                addPlantToCanvas(state.plantingSpeciesId, canvasX, canvasY);
                cancel3DPlantingMode();
            }
        }
        // CASE 2: Click to Select / Deselect Plant
        else if (dragDist < 8) {
            const hitPlant = raycastForPlant(e);
            if (hitPlant) {
                select3DPlant(hitPlant);
            } else {
                deselect3DPlant();
            }
        }

        // Re-enable OrbitControls
        threeState.isPointerDown = false;
        threeState.draggedPlantObj = null;
        if (threeState.controls) threeState.controls.enabled = true;
    }

    /**
     * Raycasts scene for plant group.
     */
    function raycastForPlant(e) {
        if (!threeState.raycaster || !threeState.camera || !threeState.scene) return null;
        const intersects = threeState.raycaster.intersectObjects(threeState.scene.children, true);

        for (let hit of intersects) {
            let parent = hit.object;
            while (parent && parent !== threeState.scene) {
                if (parent.userData && parent.userData.id) {
                    return threeState.plantObjects.find((p) => p.id === parent.userData.id);
                }
                parent = parent.parent;
            }
        }
        return null;
    }

    /**
     * Selects a 3D Plant and displays its action card.
     */
    function select3DPlant(pObj) {
        threeState.selectedPlantObj = pObj;
        const itemIdx = state.placedItems.findIndex((it) => it.id === pObj.id);
        state.selectedItemIndex = itemIdx;

        // Position & show selection ring
        if (threeState.selectionRingMesh) {
            threeState.selectionRingMesh.position.set(pObj.group.position.x, 0.06, pObj.group.position.z);
            const spread = pObj.baseSpread * (pObj.targetScaleXZ || 1);
            threeState.selectionRingMesh.scale.set(spread * 0.45, 1, spread * 0.45);
            threeState.selectionRingMesh.visible = true;
        }

        // Show floating selected card
        const plant = pObj.plantData;
        const stageKey = 'year' + state.growthHorizonYear;
        const growth = plant.growth[stageKey] || plant.growth.year5;

        if (dom.selPlantName) dom.selPlantName.textContent = `🌳 ${plant.commonName}`;
        if (dom.selPlantDetails) {
            dom.selPlantDetails.innerHTML = `
                <div><em>${plant.scientificName}</em></div>
                <div style="margin-top:2px;">Yr ${state.growthHorizonYear}: ${growth.heightFt}ft H × ${growth.spreadFt}ft W • ${plant.nurserySpec.defaultContainer}</div>
                <div style="color:#15803d; font-weight:700; margin-top:2px;">Est. $${plant.nurserySpec.estUnitCostUsd.toFixed(0)} • Cooling ↓${plant.maxCoolingDeltaF}°F</div>
            `;
        }
        if (dom.threeSelectedCard) dom.threeSelectedCard.style.display = 'block';

        renderCanvas();
    }

    /**
     * Deselects current 3D plant.
     */
    function deselect3DPlant() {
        threeState.selectedPlantObj = null;
        state.selectedItemIndex = -1;

        if (threeState.selectionRingMesh) threeState.selectionRingMesh.visible = false;
        if (dom.threeSelectedCard) dom.threeSelectedCard.style.display = 'none';

        renderCanvas();
    }

    /**
     * Duplicates the selected 3D plant.
     */
    function duplicateSelected3DPlant() {
        if (state.selectedItemIndex < 0) return;
        const item = state.placedItems[state.selectedItemIndex];
        const newX = item.x + 35;
        const newY = item.y + 35;
        addPlantToCanvas(item.speciesId, newX, newY);
    }

    /**
     * Deletes the selected 3D plant.
     */
    function deleteSelected3DPlant() {
        if (state.selectedItemIndex < 0) return;
        saveHistory();
        const removedItem = state.placedItems.splice(state.selectedItemIndex, 1)[0];

        // Remove from Three.js scene
        const pIdx = threeState.plantObjects.findIndex((p) => p.id === removedItem.id);
        if (pIdx >= 0) {
            const pObj = threeState.plantObjects.splice(pIdx, 1)[0];
            threeState.scene.remove(pObj.group);
        }

        deselect3DPlant();
        updateAnalytics();
        renderCanvas();
    }

    /**
     * Clears 3D Tree Hover Highlight.
     */
    function clear3DHighlight() {
        if (threeState.hoveredPlantObj) {
            threeState.hoveredPlantObj.foliageMeshes.forEach((m) => {
                if (m.material.emissive) {
                    m.material.emissive.setHex(0x000000);
                    m.material.emissiveIntensity = 0;
                }
            });
            threeState.hoveredPlantObj = null;
        }
    }

    /**
     * Handles Mouse Leave from 3D Container.
     */
    function handle3DMouseLeave() {
        clear3DHighlight();
        if (dom.threeInspectHud) dom.threeInspectHud.classList.remove('active');
    }

    /**
     * Updates the Floating 3D Inspect HUD Card Content.
     */
    function update3DInspectHudData(pObj) {
        if (!dom.threeInspectHud || !pObj) return;
        const plant = pObj.plantData;
        const stageKey = 'year' + state.growthHorizonYear;
        const growth = plant.growth[stageKey] || plant.growth.year5;
        const isBlooming = plant.bloomMonths.includes(state.currentMonth);

        dom.hud3DPlantName.textContent = plant.commonName;
        dom.hud3DPlantBot.textContent = plant.scientificName;

        if (isBlooming) {
            dom.hud3DPlantState.innerHTML = `<span style="color:#d97706;">🌸 Active Flowering Peak</span> • Visiting: ${plant.pollinators.slice(0, 2).join(', ')}`;
        } else if (plant.foliageType === 'deciduous' && (state.currentMonth === 12 || state.currentMonth === 1)) {
            dom.hud3DPlantState.innerHTML = `<span style="color:#78350f;">🍂 Winter Dormancy</span> • Sculptural Branch Architecture`;
        } else {
            dom.hud3DPlantState.innerHTML = `<span style="color:#15803d;">🌿 Vegetative Canopy</span> • Cooling Delta: ↓ ${plant.maxCoolingDeltaF}°F`;
        }

        dom.hud3DPlantMetrics.textContent = `Year ${state.growthHorizonYear}: Height ${growth.heightFt} ft • Spread ${growth.spreadFt} ft • Caliper ${growth.caliperIn} in`;
        dom.hud3DPlantSpec.textContent = `Spec: ${plant.nurserySpec.defaultContainer} • Est. $${plant.nurserySpec.estUnitCostUsd.toFixed(0)}`;
    }

    /**
     * Opens Full Blueprint Modal.
     */
    function openBlueprintModal() {
        const caseData = state.activeCaseData;
        dom.bpModalTitle.textContent = caseData ? `📋 Landscape Architecture Blueprint: ${caseData.title}` : '📋 Custom Schoolyard Microforest Blueprint';
        dom.bpModalSubtitle.textContent = caseData ? `${caseData.campus} • Designed by ${caseData.designer}` : 'TTFS UTRGV Project Cool Schools';

        dom.bpGroupVal.textContent = state.teamName;
        dom.bpYearVal.textContent = `Year ${state.growthHorizonYear} (${2026 + state.growthHorizonYear - 1})`;
        dom.bpPlantCountVal.textContent = state.placedItems.length;
        dom.bpShadeAreaVal.textContent = dom.metricCanopySqFt.textContent;
        dom.bpCoolingVal.textContent = dom.metricCoolingDelta.textContent;

        const speciesCountMap = {};
        state.placedItems.forEach((item) => {
            speciesCountMap[item.speciesId] = (speciesCountMap[item.speciesId] || 0) + 1;
        });

        const bomTbody = dom.bpBomTableBody;
        bomTbody.innerHTML = '';
        let totalPlantCost = 0;

        Object.keys(speciesCountMap).forEach((spId) => {
            const plant = getPlantData(spId);
            const count = speciesCountMap[spId];
            const unitCost = plant.nurserySpec ? plant.nurserySpec.estUnitCostUsd : 50;
            const lineTotal = count * unitCost;
            totalPlantCost += lineTotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${plant.commonName}</strong></td>
                <td><em>${plant.scientificName}</em></td>
                <td><strong>${count}</strong></td>
                <td><span class="badge-tag container-tag">${plant.nurserySpec.defaultContainer}</span></td>
                <td>M${plant.bloomMonths[0]}-M${plant.bloomMonths[plant.bloomMonths.length - 1]}</td>
                <td>$${lineTotal.toFixed(2)}</td>
            `;
            bomTbody.appendChild(tr);
        });

        dom.bpSoilPrepText.textContent = caseData ? caseData.soilPrep : 'Deep-till native Harlingen clay to 18 inches. Incorporate 30% organic compost and top-dress with 3 inches cedar mulch.';
        const budgetTbody = dom.bpNurseryBudgetBody;
        budgetTbody.innerHTML = `
            <tr>
                <td><strong>1. Spec Native Plant Stock (${state.placedItems.length} specimens)</strong></td>
                <td>Container nursery stock ANSI Z60.1 grade</td>
                <td><strong>$${totalPlantCost.toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td><strong>2. Soil Amendments & Organic Leaf Compost</strong></td>
                <td>30 cu yds Texas organic compost & expanded shale</td>
                <td>$1,450.00</td>
            </tr>
            <tr>
                <td><strong>3. Hardwood Cedar Mulch (3-inch layer)</strong></td>
                <td>40 cu yds double-shredded Texas cedar mulch</td>
                <td>$1,200.00</td>
            </tr>
            <tr>
                <td><strong>4. Sub-Surface Drip Irrigation & Smart Controller</strong></td>
                <td>Pressure-compensating inline drip + rain sensor</td>
                <td>$2,100.00</td>
            </tr>
            <tr style="background:#f0fdf4; font-weight:bold;">
                <td colspan="2"><strong>TOTAL ESTIMATED IMPLEMENTATION BUDGET:</strong></td>
                <td style="color:#15803d;">$${(totalPlantCost + 4750).toFixed(2)}</td>
            </tr>
        `;

        dom.bpIrrigationText.textContent = caseData ? caseData.irrigationPlan : 'Year 1: Drip line 3x weekly (15 gal/tree/week). Year 2: 1x weekly deep soak. Year 3+: Zero supplementary water needed.';

        dom.blueprintModal.classList.add('active');
    }

    /**
     * Closes Blueprint Modal.
     */
    function closeBlueprintModal() {
        dom.blueprintModal.classList.remove('active');
    }

    /**
     * Exports High-Res PNG.
     */
    function exportCanvasImage() {
        const dataUrl = dom.plannerCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `TTFS_Cool_Schools_${state.activeCaseId}_Landscape_Plan.png`;
        link.href = dataUrl;
        link.click();
    }

    /**
     * Saves plan locally.
     */
    function savePlanToLocalStorage() {
        const planData = {
            teamName: state.teamName,
            activeCaseId: state.activeCaseId,
            growthYear: state.growthHorizonYear,
            placedItems: state.placedItems,
            savedAt: new Date().toISOString()
        };
        try {
            localStorage.setItem('ttfs_cool_schools_plan', JSON.stringify(planData));
            alert(`✅ Plan saved locally for ${state.teamName}! You can reload it anytime in this browser.`);
        } catch (e) {
            console.warn('LocalStorage save failed:', e);
        }
    }

    // Auto-run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
