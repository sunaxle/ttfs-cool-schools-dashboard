document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('itreeYearSlider');
    const yearReadout = document.getElementById('itreeYearReadout');
    const bannerYear = document.getElementById('bannerYear');
    const bannerTotalValue = document.getElementById('bannerTotalValue');
    const exportReportBtn = document.getElementById('exportReportBtn');
    const soilRegimeSelect = document.getElementById('itreeSoilRegimeSelect');
    const campusLabel = document.getElementById('itreeCampusLabel');

    const CAMPUS_META = {
        donna_jw_caceres: { name: "J.W. Caceres Discovery Academy (Donna ISD)", treeLimit: 158, areaSqFt: 450000 },
        mercedes_hinojosa: { name: "Ruben Hinojosa Elementary (Mercedes ISD)", treeLimit: 142, areaSqFt: 418000 }
    };

    let activeCampusKey = (localStorage.getItem('activeCampusId') === 'mercedes_hinojosa') ? 'mercedes_hinojosa' : 'donna_jw_caceres';
    let mockTrees = [];

    fetch('data/mock_trees.json')
        .then(res => res.json())
        .then(data => {
            mockTrees = data.features || [];
            updateLedger();
        })
        .catch(err => console.error("Error loading mock trees for i-Tree engine:", err));

    function getActiveTreesSlice() {
        const meta = CAMPUS_META[activeCampusKey] || CAMPUS_META.donna_jw_caceres;
        return mockTrees.slice(0, meta.treeLimit);
    }

    function updateLedger() {
        const year = parseInt(slider.value, 10);
        const soilRegime = soilRegimeSelect ? soilRegimeSelect.value : 'semi_urban_realistic';
        const meta = CAMPUS_META[activeCampusKey] || CAMPUS_META.donna_jw_caceres;

        yearReadout.textContent = year;
        bannerYear.textContent = year;
        if (campusLabel) campusLabel.textContent = meta.name;

        if (!window.ITreeEngine) return;

        const res = window.ITreeEngine.calculateEcoServices(year, getActiveTreesSlice(), soilRegime, meta.areaSqFt);

        // Update Banner
        bannerTotalValue.textContent = `$${res.totalAnnualEcoBenefitsUsd.toLocaleString()} / yr`;

        // 1. Stormwater
        document.getElementById('valRunoffGal').textContent = `${res.annualRunoffAvoidedGallons.toLocaleString()} gal / yr`;
        document.getElementById('valRunoffUsd').textContent = `$${res.stormwaterSavingsUsd.toLocaleString()} / yr`;

        // 2. Carbon
        document.getElementById('valCarbonSeqLbs').textContent = `${res.annualCo2SequestrationLbs.toLocaleString()} lbs CO₂ / yr`;
        document.getElementById('valCarbonStoreLbs').textContent = `${res.lifetimeCo2StorageLbs.toLocaleString()} lbs CO₂ stored`;
        document.getElementById('valCarbonUsd').textContent = `$${res.carbonSequestrationValueUsd.toLocaleString()} / yr`;

        // 3. Air Quality
        document.getElementById('valPm25Lbs').textContent = `${res.annualPm25RemovedLbs} lbs / yr`;
        document.getElementById('valOzoneLbs').textContent = `${res.annualOzoneRemovedLbs} lbs / yr`;
        document.getElementById('valHealthUsd').textContent = `$${res.healthSavingsUsd.toLocaleString()} / yr`;

        // 4. Energy
        document.getElementById('valEnergyKwh').textContent = `${res.annualAcSavingsKwh.toLocaleString()} kWh / yr`;
        document.getElementById('valEnergyUsd').textContent = `$${res.energySavingsUsd.toLocaleString()} / yr`;

        // 5. Microclimate
        document.getElementById('valLai').textContent = res.overallLai;
        document.getElementById('valLeafAreaSqFt').textContent = `${res.totalLeafAreaSqFt.toLocaleString()} sq ft`;
        document.getElementById('valCanopyAreaSqFt').textContent = `${res.effectiveCanopySqFt.toLocaleString()} sq ft (${res.canopyCoverPct}%)`;

        // 6. Asset Valuation
        document.getElementById('valTreeCount').textContent = res.mortalityCount > 0
            ? `${res.activeTreesCount} Surviving (${res.mortalityCount} Lost to Soil Stress)`
            : `${res.activeTreesCount} Trees`;
        document.getElementById('valCtlaAssetUsd').textContent = `$${res.totalCtlaAssetValue.toLocaleString()}`;
        const avgAsset = res.activeTreesCount > 0 ? Math.round(res.totalCtlaAssetValue / res.activeTreesCount) : 0;
        document.getElementById('valAvgAssetUsd').textContent = `$${avgAsset.toLocaleString()} / tree`;

        renderItreePrePostTable(year);
    }

    function renderItreePrePostTable(activeYear) {
        const tbody = document.getElementById('itreePrePostTableBody');
        const stageBtns = document.querySelectorAll('.itree-stage-btn');
        stageBtns.forEach(btn => {
            btn.classList.toggle('active', Number(btn.dataset.year) === activeYear);
        });

        if (!tbody || !window.ITreeEngine) return;
        const soilRegime = soilRegimeSelect ? soilRegimeSelect.value : 'semi_urban_realistic';
        const meta = CAMPUS_META[activeCampusKey] || CAMPUS_META.donna_jw_caceres;
        const slice = getActiveTreesSlice();

        const rPre = window.ITreeEngine.calculateEcoServices(2024, slice, soilRegime, meta.areaSqFt);
        const rPost = window.ITreeEngine.calculateEcoServices(2026, slice, soilRegime, meta.areaSqFt);
        const rMat = window.ITreeEngine.calculateEcoServices(2040, slice, soilRegime, meta.areaSqFt);

        const rows = [
            {
                label: "🌳 Surviving Trees & Canopy Cover (%)",
                pre: `${rPre.activeTreesCount} Trees (${rPre.canopyCoverPct}%)`,
                post: `${rPost.activeTreesCount} Trees (${rPost.canopyCoverPct}%)`,
                mat: `${rMat.activeTreesCount} Surviving (${rMat.canopyCoverPct}% Cover)`,
                delta: `+${(parseFloat(rMat.canopyCoverPct) - parseFloat(rPre.canopyCoverPct)).toFixed(1)}% Canopy (${rMat.mortalityCount} Soil Mortality)`
            },
            {
                label: "🌧️ Avoided Stormwater Runoff",
                pre: `${rPre.annualRunoffAvoidedGallons.toLocaleString()} gal/yr ($${rPre.stormwaterSavingsUsd.toLocaleString()})`,
                post: `${rPost.annualRunoffAvoidedGallons.toLocaleString()} gal/yr ($${rPost.stormwaterSavingsUsd.toLocaleString()})`,
                mat: `${rMat.annualRunoffAvoidedGallons.toLocaleString()} gal/yr ($${rMat.stormwaterSavingsUsd.toLocaleString()})`,
                delta: `+${(rMat.annualRunoffAvoidedGallons - rPost.annualRunoffAvoidedGallons).toLocaleString()} gal/yr`
            },
            {
                label: "🌿 Annual CO₂ Sequestration",
                pre: `${rPre.annualCo2SequestrationLbs.toLocaleString()} lbs/yr`,
                post: `${rPost.annualCo2SequestrationLbs.toLocaleString()} lbs/yr`,
                mat: `${rMat.annualCo2SequestrationLbs.toLocaleString()} lbs/yr`,
                delta: `+${(rMat.annualCo2SequestrationLbs - rPost.annualCo2SequestrationLbs).toLocaleString()} lbs CO₂/yr`
            },
            {
                label: "🫁 Fine Particulate (PM2.5) & Ozone Filtered",
                pre: `${rPre.annualPm25RemovedLbs} lbs PM2.5 / ${rPre.annualOzoneRemovedLbs} lbs O₃`,
                post: `${rPost.annualPm25RemovedLbs} lbs PM2.5 / ${rPost.annualOzoneRemovedLbs} lbs O₃`,
                mat: `${rMat.annualPm25RemovedLbs} lbs PM2.5 / ${rMat.annualOzoneRemovedLbs} lbs O₃`,
                delta: `+$${(rMat.healthSavingsUsd - rPost.healthSavingsUsd).toLocaleString()}/yr Health Value`
            },
            {
                label: "⚡ Summer A/C Electricity Saved",
                pre: `${rPre.annualAcSavingsKwh.toLocaleString()} kWh/yr ($${rPre.energySavingsUsd.toLocaleString()})`,
                post: `${rPost.annualAcSavingsKwh.toLocaleString()} kWh/yr ($${rPre.energySavingsUsd.toLocaleString()})`,
                mat: `${rMat.annualAcSavingsKwh.toLocaleString()} kWh/yr ($${rMat.energySavingsUsd.toLocaleString()})`,
                delta: `+${(rMat.annualAcSavingsKwh - rPost.annualAcSavingsKwh).toLocaleString()} kWh/yr`
            },
            {
                label: "💎 CTLA Structural Replacement Asset Value",
                pre: `$${rPre.totalCtlaAssetValue.toLocaleString()}`,
                post: `$${rPost.totalCtlaAssetValue.toLocaleString()}`,
                mat: `$${rMat.totalCtlaAssetValue.toLocaleString()}`,
                delta: `+$${(rMat.totalCtlaAssetValue - rPost.totalCtlaAssetValue).toLocaleString()} Asset Growth`
            },
            {
                label: "💰 Combined Annual Ecosystem Benefit",
                pre: `$${rPre.totalAnnualEcoBenefitsUsd.toLocaleString()} / yr`,
                post: `$${rPost.totalAnnualEcoBenefitsUsd.toLocaleString()} / yr`,
                mat: `$${rMat.totalAnnualEcoBenefitsUsd.toLocaleString()} / yr`,
                delta: `+$${(rMat.totalAnnualEcoBenefitsUsd - rPost.totalAnnualEcoBenefitsUsd).toLocaleString()} / yr`
            }
        ];

        tbody.innerHTML = rows.map(r => `
            <tr>
                <td><strong>${r.label}</strong></td>
                <td style="${activeYear <= 2024 ? 'background:#fef3c7; font-weight:700;' : ''}">${r.pre}</td>
                <td style="${activeYear >= 2025 && activeYear <= 2027 ? 'background:#e0f2fe; font-weight:700;' : ''}">${r.post}</td>
                <td style="${activeYear >= 2035 ? 'background:#dcfce7; font-weight:700; color:#14532d;' : ''}">${r.mat}</td>
                <td><span class="delta-badge">${r.delta}</span></td>
            </tr>
        `).join('');
    }

    document.querySelectorAll('.itree-stage-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            slider.value = btn.dataset.year;
            updateLedger();
        });
    });

    document.querySelectorAll('.itree-campus-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.campus === activeCampusKey);
        btn.addEventListener('click', () => {
            document.querySelectorAll('.itree-campus-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCampusKey = btn.dataset.campus;
            localStorage.setItem('activeCampusId', activeCampusKey);
            updateLedger();
        });
    });

    if (soilRegimeSelect) {
        soilRegimeSelect.addEventListener('change', updateLedger);
    }

    slider.addEventListener('input', updateLedger);

    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', () => {
            const year = parseInt(slider.value, 10);
            const soilRegime = soilRegimeSelect ? soilRegimeSelect.value : 'semi_urban_realistic';
            const meta = CAMPUS_META[activeCampusKey] || CAMPUS_META.donna_jw_caceres;
            const res = window.ITreeEngine.calculateEcoServices(year, getActiveTreesSlice(), soilRegime, meta.areaSqFt);

            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += `USDA i-Tree Eco Summary Report - ${meta.name}\n`;
            csvContent += `Schoolyard Soil Regime,${soilRegime}\n`;
            csvContent += `Simulation Year,${year}\n`;
            csvContent += `Surviving Trees,${res.activeTreesCount}\n`;
            csvContent += `Soil/Heat Sapling Mortality,${res.mortalityCount}\n`;
            csvContent += `Canopy Cover Area (sq ft),${res.effectiveCanopySqFt}\n`;
            csvContent += `Canopy Cover Percentage,${res.canopyCoverPct}%\n`;
            csvContent += `Leaf Area Index (LAI),${res.overallLai}\n`;
            csvContent += `Avoided Runoff (Gallons/yr),${res.annualRunoffAvoidedGallons}\n`;
            csvContent += `Stormwater Treatment Savings ($/yr),${res.stormwaterSavingsUsd}\n`;
            csvContent += `Annual CO2 Sequestration (lbs/yr),${res.annualCo2SequestrationLbs}\n`;
            csvContent += `Cumulative Carbon Storage (lbs),${res.lifetimeCo2StorageLbs}\n`;
            csvContent += `PM2.5 Air Filtration (lbs/yr),${res.annualPm25RemovedLbs}\n`;
            csvContent += `Healthcare Expense Savings ($/yr),${res.healthSavingsUsd}\n`;
            csvContent += `Summer AC Electricity Savings (kWh/yr),${res.annualAcSavingsKwh}\n`;
            csvContent += `CTLA Replacement Asset Value ($),${res.totalCtlaAssetValue}\n`;
            csvContent += `Total Combined Ecosystem Benefit ($/yr),${res.totalAnnualEcoBenefitsUsd}\n`;

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `iTree_Eco_Report_${activeCampusKey}_${year}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
