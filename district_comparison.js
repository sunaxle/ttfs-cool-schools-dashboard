/**
 * Multi-Campus Comparative Analytics & Equity Matrix Logic
 * TTFS × UTRGV Project Cool Schools
 * Deliverable A Environmental Baseline Analytics
 */

(function () {
  'use strict';

  const CAMPUS_DATA = [
    { campus: 'J.W. Caceres Discovery Intermediate', district: 'Donna ISD', lat: 26.1750, lng: -98.0500, meanTempC: 34.6, maxTempC: 38.3, canopyPct: 13.8, imperviousPct: 56.4, siteAreaSF: 711254, greenSpaceSF: 310213, targetCanopySF: 93064, existingCanopySF: 42824, treesNeeded: 38 },
    { campus: 'M. Rivas Primary', district: 'Donna ISD', lat: 26.1760, lng: -98.0510, meanTempC: 34.7, maxTempC: 38.4, canopyPct: 13.8, imperviousPct: 56.4, siteAreaSF: 711254, greenSpaceSF: 310213, targetCanopySF: 93064, existingCanopySF: 42824, treesNeeded: 38 },
    { campus: 'Captain D. Salinas II STEAM', district: 'Donna ISD', lat: 26.1800, lng: -98.0700, meanTempC: 34.3, maxTempC: 38.0, canopyPct: 1.0, imperviousPct: 29.7, siteAreaSF: 1052783, greenSpaceSF: 740375, targetCanopySF: 222113, existingCanopySF: 7715, treesNeeded: 163 },
    { campus: 'Daniel Singleterry Senior Elementary', district: 'Donna ISD', lat: 26.2050, lng: -98.0800, meanTempC: 34.5, maxTempC: 38.2, canopyPct: 8.2, imperviousPct: 43.8, siteAreaSF: 572971, greenSpaceSF: 322105, targetCanopySF: 96631, existingCanopySF: 26297, treesNeeded: 54 },
    { campus: 'C. Stainke Intermediate', district: 'Donna ISD', lat: 26.1680, lng: -98.0400, meanTempC: 35.2, maxTempC: 39.1, canopyPct: 7.0, imperviousPct: 52.4, siteAreaSF: 518386, greenSpaceSF: 246970, targetCanopySF: 74091, existingCanopySF: 17393, treesNeeded: 43 },
    { campus: 'A.M. Ochoa Primary', district: 'Donna ISD', lat: 26.1700, lng: -98.0450, meanTempC: 34.9, maxTempC: 38.6, canopyPct: 10.4, imperviousPct: 65.9, siteAreaSF: 438155, greenSpaceSF: 149131, targetCanopySF: 44739, existingCanopySF: 15567, treesNeeded: 22 },
    { campus: 'P.S. Garza Elementary', district: 'Donna ISD', lat: 26.1950, lng: -98.0650, meanTempC: 34.4, maxTempC: 38.1, canopyPct: 6.5, imperviousPct: 44.9, siteAreaSF: 620126, greenSpaceSF: 341987, targetCanopySF: 102596, existingCanopySF: 22362, treesNeeded: 61 },
    { campus: 'A.P. Solis Middle', district: 'Donna ISD', lat: 26.1720, lng: -98.0480, meanTempC: 34.8, maxTempC: 38.7, canopyPct: 5.7, imperviousPct: 59.4, siteAreaSF: 854776, greenSpaceSF: 346783, targetCanopySF: 104035, existingCanopySF: 19741, treesNeeded: 70 },
    { campus: 'Sgt. Manuel Chacon Middle', district: 'Mercedes ISD', lat: 26.1300, lng: -97.9250, meanTempC: 35.0, maxTempC: 38.9, canopyPct: 3.8, imperviousPct: 49.8, siteAreaSF: 1193342, greenSpaceSF: 599483, targetCanopySF: 179845, existingCanopySF: 22529, treesNeeded: 120 },
    { campus: 'Sgt. William G. Harrell Elementary', district: 'Mercedes ISD', lat: 26.1580, lng: -97.9050, meanTempC: 34.2, maxTempC: 37.8, canopyPct: 4.0, imperviousPct: 66.9, siteAreaSF: 461387, greenSpaceSF: 152835, targetCanopySF: 45851, existingCanopySF: 6045, treesNeeded: 30 },
    { campus: 'W.B. Travis Elementary', district: 'Mercedes ISD', lat: 26.1420, lng: -97.9110, meanTempC: 34.8, maxTempC: 38.5, canopyPct: 15.6, imperviousPct: 48.7, siteAreaSF: 420140, greenSpaceSF: 215359, targetCanopySF: 64608, existingCanopySF: 33579, treesNeeded: 24 },
    { campus: 'Ruben Hinojosa Elementary', district: 'Mercedes ISD', lat: 26.1365, lng: -97.9150, meanTempC: 34.5, maxTempC: 38.2, canopyPct: 8.3, imperviousPct: 65.9, siteAreaSF: 389167, greenSpaceSF: 132891, targetCanopySF: 39867, existingCanopySF: 10972, treesNeeded: 22 },
    { campus: 'Mercedes High School', district: 'Mercedes ISD', lat: 26.1350, lng: -97.9080, meanTempC: 35.1, maxTempC: 39.0, canopyPct: 36.9, imperviousPct: 77.2, siteAreaSF: 951666, greenSpaceSF: 216905, targetCanopySF: 65072, existingCanopySF: 80131, treesNeeded: 0 },
    { campus: 'Mercedes Academic Academy', district: 'Mercedes ISD', lat: 26.1320, lng: -97.9230, meanTempC: 35.0, maxTempC: 38.8, canopyPct: 3.5, imperviousPct: 54.0, siteAreaSF: 265025, greenSpaceSF: 121875, targetCanopySF: 36563, existingCanopySF: 4246, treesNeeded: 25 }
  ];

  // Compute Heat Vulnerability Index (HVI)
  CAMPUS_DATA.forEach(c => {
    // HVI: weighted scale (0-100) based on Max Surface Temp, Impervious %, and Canopy Deficit
    const tempFactor = (c.maxTempC - 37.0) * 20; // 0 to 40
    const impFactor = (c.imperviousPct / 100) * 35; // 0 to 35
    const canopyDeficitFactor = Math.max(0, (30 - c.canopyPct) / 30) * 25; // 0 to 25
    c.hvi = Math.min(100, Math.max(10, Math.round(tempFactor + impFactor + canopyDeficitFactor)));
    c.status = c.hvi >= 75 ? 'Critical Priority' : c.hvi >= 55 ? 'Moderate Need' : 'Healthy Canopy';
  });

  // DOM Elements
  const districtFilter = document.getElementById('districtFilter');
  const sortBySelect = document.getElementById('sortBySelect');
  const campusTableBody = document.getElementById('campusTableBody');
  const avgCanopyVal = document.getElementById('avgCanopyVal');
  const totalTreesNeededVal = document.getElementById('totalTreesNeededVal');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const exportGeoJsonBtn = document.getElementById('exportGeoJsonBtn');

  let scatterChartInstance = null;
  let barChartInstance = null;

  function getFilteredAndSorted() {
    const selectedDist = districtFilter.value;
    let list = CAMPUS_DATA.filter(c => selectedDist === 'all' || c.district === selectedDist);

    const sortKey = sortBySelect.value;
    list.sort((a, b) => {
      if (sortKey === 'hvi') return b.hvi - a.hvi;
      if (sortKey === 'canopy_asc') return a.canopyPct - b.canopyPct;
      if (sortKey === 'trees_desc') return b.treesNeeded - a.treesNeeded;
      if (sortKey === 'name') return a.campus.localeCompare(b.campus);
      return 0;
    });

    return list;
  }

  function renderTable(data) {
    campusTableBody.innerHTML = '';
    data.forEach(c => {
      const tr = document.createElement('tr');
      const tagClass = c.hvi >= 75 ? 'critical' : c.hvi >= 55 ? 'moderate' : 'good';
      tr.innerHTML = `
        <td><strong>${c.campus}</strong></td>
        <td>${c.district}</td>
        <td><strong>${c.canopyPct}%</strong></td>
        <td>${c.imperviousPct}%</td>
        <td><span class="status-tag ${tagClass}">${c.hvi} / 100</span></td>
        <td><strong>${c.treesNeeded > 0 ? c.treesNeeded + ' trees' : 'Achieved ✅'}</strong></td>
        <td><span class="status-tag ${tagClass}">${c.status}</span></td>
      `;
      campusTableBody.appendChild(tr);
    });

    // Update KPI calculations
    const totalCanopy = data.reduce((acc, curr) => acc + curr.canopyPct, 0);
    const avgCanopy = (totalCanopy / data.length).toFixed(1);
    avgCanopyVal.textContent = `${avgCanopy}%`;

    const totalTrees = data.reduce((acc, curr) => acc + (curr.treesNeeded > 0 ? curr.treesNeeded : 0), 0);
    totalTreesNeededVal.textContent = `${totalTrees.toLocaleString()} Trees`;
  }

  function renderCharts(data) {
    const labels = data.map(c => c.campus.split(' ')[0] + ' ' + (c.campus.split(' ')[1] || ''));
    const hviValues = data.map(c => c.hvi);
    const canopyValues = data.map(c => c.canopyPct);
    const treesNeededValues = data.map(c => Math.max(0, c.treesNeeded));

    // 1. Scatter/Bar Chart: Heat Vulnerability vs Canopy
    if (scatterChartInstance) scatterChartInstance.destroy();
    const ctxScatter = document.getElementById('heatScatterChart').getContext('2d');
    scatterChartInstance = new Chart(ctxScatter, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Heat Vulnerability Index (HVI)',
            data: hviValues,
            backgroundColor: 'rgba(240, 80, 35, 0.8)',
            yAxisID: 'y'
          },
          {
            label: 'Existing Canopy %',
            data: canopyValues,
            backgroundColor: 'rgba(27, 77, 62, 0.8)',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: { type: 'linear', position: 'left', min: 0, max: 100, title: { display: true, text: 'HVI Score' } },
          y1: { type: 'linear', position: 'right', min: 0, max: 45, grid: { drawOnChartArea: false }, title: { display: true, text: 'Canopy %' } }
        }
      }
    });

    // 2. Bar Chart: Trees Needed
    if (barChartInstance) barChartInstance.destroy();
    const ctxBar = document.getElementById('treesBarChart').getContext('2d');
    barChartInstance = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Trees to Install (Target: 30% Canopy)',
            data: treesNeededValues,
            backgroundColor: '#1B4D3E',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: { beginAtZero: true, title: { display: true, text: 'Tree Count' } }
        }
      }
    });
  }

  function update() {
    const list = getFilteredAndSorted();
    renderTable(list);
    renderCharts(list);
  }

  // Export CSV
  exportCsvBtn.addEventListener('click', () => {
    let csv = 'Campus,District,Latitude,Longitude,MeanTemp_C,MaxTemp_C,CanopyPct,ImperviousPct,TreesNeeded30Pct,HVI_Score,Priority_Status\n';
    CAMPUS_DATA.forEach(c => {
      csv += `"${c.campus}","${c.district}",${c.lat},${c.lng},${c.meanTempC},${c.maxTempC},${c.canopyPct},${c.imperviousPct},${c.treesNeeded},${c.hvi},"${c.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TTFS_UTRGV_Campus_Equity_Matrix_2026.csv';
    link.click();
  });

  // Export GeoJSON
  exportGeoJsonBtn.addEventListener('click', () => {
    const geojson = {
      type: 'FeatureCollection',
      features: CAMPUS_DATA.map(c => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [c.lng, c.lat]
        },
        properties: {
          campus: c.campus,
          district: c.district,
          canopyPct: c.canopyPct,
          imperviousPct: c.imperviousPct,
          maxTempC: c.maxTempC,
          treesNeeded: c.treesNeeded,
          hvi: c.hvi,
          status: c.status
        }
      }))
    };
    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TTFS_UTRGV_Campus_Centroids.geojson';
    link.click();
  });

  districtFilter.addEventListener('change', update);
  sortBySelect.addEventListener('change', update);

  update();
})();
