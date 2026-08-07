document.addEventListener('DOMContentLoaded', () => {
    const studentCount = 285;
    const facultyCount = 21;

    const budgetInput = document.getElementById('budgetInput');
    const costPerStudentEl = document.getElementById('costPerStudent');
    const costPerFacultyEl = document.getElementById('costPerFaculty');

    // Format currency
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Initialize Chart
    const ctx = document.getElementById('valuationChart').getContext('2d');

    // Base appreciation curve (simulating growth compounding)
    const years = Array.from({ length: 21 }, (_, i) => `Year ${i}`);
    const calculateValuation = (budget) => {
        let initialAssetValue = budget * 4; // Assume initial stock + labor is 4x annual budget
        let values = [];
        let currentVal = initialAssetValue;
        for (let i = 0; i <= 20; i++) {
            values.push(currentVal);
            // Trees appreciate in value as they grow larger (shade, stormwater, aesthetic value)
            // We simulate a 8.5% compounding appreciation rate
            currentVal = currentVal * 1.085;
        }
        return values;
    };

    const calculateMaintenance = (budget) => {
        let costs = [];
        let cumulative = 0;
        for (let i = 0; i <= 20; i++) {
            cumulative += Number(budget);
            costs.push(cumulative);
        }
        return costs;
    };

    let valuationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Total Asset Valuation ($)',
                    data: calculateValuation(5000),
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Cumulative Maintenance Cost ($)',
                    data: calculateMaintenance(5000),
                    borderColor: '#F44336',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += formatter.format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return '$' + value / 1000 + 'k';
                        }
                    }
                }
            }
        }
    });

    // Update UI on input
    function updateMetrics() {
        const budget = Number(budgetInput.value);

        // Update Per Capita
        costPerStudentEl.textContent = formatter.format(budget / studentCount);
        costPerFacultyEl.textContent = formatter.format(budget / facultyCount);

        // Update Chart
        valuationChart.data.datasets[0].data = calculateValuation(budget);
        valuationChart.data.datasets[1].data = calculateMaintenance(budget);
        valuationChart.update();
    }

    budgetInput.addEventListener('input', updateMetrics);
    updateMetrics(); // Run once
});
