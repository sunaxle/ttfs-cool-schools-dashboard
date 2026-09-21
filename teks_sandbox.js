/**
 * Interactive TEKS Classroom Science Sandbox Logic
 * TTFS × UTRGV Project Cool Schools
 * TEKS Science 3.9A, 4.9A, 5.9B Inquiry Engine
 */

(function () {
  'use strict';

  let readings = [
    { location: 'Playground Basketball Court', sunTemp: 138.4, shadeTemp: 87.2 },
    { location: 'Cafeteria Pedestrian Walkway', sunTemp: 126.8, shadeTemp: 85.0 },
    { location: 'Main Entrance Bus Drop-off', sunTemp: 132.5, shadeTemp: 86.4 },
    { location: 'Open Soccer Field Turfgrass', sunTemp: 108.6, shadeTemp: 83.2 },
    { location: 'Science Outdoor Lab Gazebo', sunTemp: 118.0, shadeTemp: 82.5 }
  ];

  const readingTableBody = document.getElementById('readingTableBody');
  const addRowBtn = document.getElementById('addRowBtn');
  const loadSampleDataBtn = document.getElementById('loadSampleDataBtn');
  const clearDataBtn = document.getElementById('clearDataBtn');
  const labDateInput = document.getElementById('labDateInput');

  const avgSunTemp = document.getElementById('avgSunTemp');
  const avgShadeTemp = document.getElementById('avgShadeTemp');
  const meanDeltaTemp = document.getElementById('meanDeltaTemp');
  const maxDeltaTemp = document.getElementById('maxDeltaTemp');

  let chartInstance = null;

  // Initialize Date
  if (labDateInput) {
    labDateInput.value = new Date().toISOString().split('T')[0];
  }

  function renderTable() {
    readingTableBody.innerHTML = '';
    readings.forEach((r, idx) => {
      const delta = (r.sunTemp - r.shadeTemp).toFixed(1);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text" value="${r.location}" class="loc-input" data-idx="${idx}" placeholder="Location name"></td>
        <td><input type="number" step="0.1" value="${r.sunTemp}" class="sun-input" data-idx="${idx}"></td>
        <td><input type="number" step="0.1" value="${r.shadeTemp}" class="shade-input" data-idx="${idx}"></td>
        <td><strong style="color: #16a34a;">-${delta}°F</strong></td>
        <td><button type="button" class="delete-row-btn" data-idx="${idx}">&times;</button></td>
      `;
      readingTableBody.appendChild(tr);
    });

    bindRowInputs();
    calculateStats();
    updateChart();
  }

  function bindRowInputs() {
    document.querySelectorAll('.loc-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = e.target.getAttribute('data-idx');
        readings[idx].location = e.target.value;
        updateChart();
      });
    });

    document.querySelectorAll('.sun-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = e.target.getAttribute('data-idx');
        readings[idx].sunTemp = parseFloat(e.target.value) || 0;
        renderTable();
      });
    });

    document.querySelectorAll('.shade-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = e.target.getAttribute('data-idx');
        readings[idx].shadeTemp = parseFloat(e.target.value) || 0;
        renderTable();
      });
    });

    document.querySelectorAll('.delete-row-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-idx');
        readings.splice(idx, 1);
        renderTable();
      });
    });
  }

  function calculateStats() {
    if (readings.length === 0) {
      avgSunTemp.textContent = '--°F';
      avgShadeTemp.textContent = '--°F';
      meanDeltaTemp.textContent = '--°F';
      maxDeltaTemp.textContent = '--°F';
      return;
    }

    const sumSun = readings.reduce((acc, r) => acc + r.sunTemp, 0);
    const sumShade = readings.reduce((acc, r) => acc + r.shadeTemp, 0);
    const meanSun = (sumSun / readings.length).toFixed(1);
    const meanShade = (sumShade / readings.length).toFixed(1);
    const meanDelta = (meanSun - meanShade).toFixed(1);

    const deltas = readings.map(r => r.sunTemp - r.shadeTemp);
    const maxDrop = Math.max(...deltas).toFixed(1);

    avgSunTemp.textContent = `${meanSun}°F`;
    avgShadeTemp.textContent = `${meanShade}°F`;
    meanDeltaTemp.textContent = `-${meanDelta}°F`;
    maxDeltaTemp.textContent = `-${maxDrop}°F`;
  }

  function updateChart() {
    const labels = readings.map(r => r.location || 'Site');
    const sunData = readings.map(r => r.sunTemp);
    const shadeData = readings.map(r => r.shadeTemp);

    if (chartInstance) chartInstance.destroy();

    const ctx = document.getElementById('tempCompareChart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sunny Ground Temp (°F)',
            data: sunData,
            backgroundColor: 'rgba(240, 80, 35, 0.85)',
            borderColor: '#F05023',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Canopy Shade Temp (°F)',
            data: shadeData,
            backgroundColor: 'rgba(27, 77, 62, 0.85)',
            borderColor: '#1B4D3E',
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: { beginAtZero: false, min: 60, max: 160, title: { display: true, text: 'Surface Temp (°F)' } }
        }
      }
    });
  }

  // Action Buttons
  addRowBtn.addEventListener('click', () => {
    readings.push({ location: `Sampling Site #${readings.length + 1}`, sunTemp: 120.0, shadeTemp: 85.0 });
    renderTable();
  });

  loadSampleDataBtn.addEventListener('click', () => {
    readings = [
      { location: 'Playground Basketball Court', sunTemp: 138.4, shadeTemp: 87.2 },
      { location: 'Cafeteria Pedestrian Walkway', sunTemp: 126.8, shadeTemp: 85.0 },
      { location: 'Main Entrance Bus Drop-off', sunTemp: 132.5, shadeTemp: 86.4 },
      { location: 'Open Soccer Field Turfgrass', sunTemp: 108.6, shadeTemp: 83.2 },
      { location: 'Science Outdoor Lab Gazebo', sunTemp: 118.0, shadeTemp: 82.5 }
    ];
    renderTable();
  });

  clearDataBtn.addEventListener('click', () => {
    readings = [];
    renderTable();
  });

  // Initial Load
  renderTable();
})();
