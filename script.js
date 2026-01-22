
// Inlined data for portability - PRECISELY THE SAME as requested
const rawData = [
  {"date": "2018-04-12", "value": 32.5},
  {"date": "2018-09-11", "value": null},
  {"date": "2018-10-09", "value": 0.47},
  {"date": "2019-01-03", "value": 0.546},
  {"date": "2019-02-20", "value": 0.875},
  {"date": "2019-05-09", "value": 0.148},
  {"date": "2019-08-27", "value": 0.226},
  {"date": "2019-10-25", "value": 1.137},
  {"date": "2020-01-07", "value": 0.075},
  {"date": "2020-03-19", "value": 0.048},
  {"date": "2020-06-09", "value": 0.110},
  {"date": "2020-09-04", "value": 0.095},
  {"date": "2020-11-24", "value": 0.072},
  {"date": "2021-02-23", "value": 0.042},
  {"date": "2021-05-25", "value": 0.023},
  {"date": "2021-09-21", "value": 0.169},
  {"date": "2021-12-16", "value": 0.038},
  {"date": "2022-03-15", "value": 0.008},
  {"date": "2022-08-29", "value": 0.026},
  {"date": "2022-12-09", "value": 0.019},
  {"date": "2023-03-28", "value": 0.006},
  {"date": "2023-05-26", "value": 0.011},
  {"date": "2023-07-06", "value": 0.013},
  {"date": "2023-10-20", "value": 0.003},
  {"date": "2024-01-11", "value": 0},
  {"date": "2024-03-13", "value": 0.006},
  {"date": "2024-06-07", "value": 0.0104},
  {"date": "2024-07-10", "value": 0.002},
  {"date": "2024-08-05", "value": 0.005},
  {"date": "2024-10-31", "value": 0.007},
  {"date": "2025-01-16", "value": 0.007},
  {"date": "2025-03-26", "value": 2.905},
  {"date": "2025-05-20", "value": 0},
  {"date": "2025-08-08", "value": 0.006},
  {"date": "2025-11-26", "value": 0.006}
];

// Preprocess data: handle nulls and 0s for log scale
// Log scale cannot show 0. We'll clamp 0 to 0.001 (MR5 level) for visualization
const processedData = rawData.map(d => {
    // Keep nulls so they appear on the axis as gaps/ticks
    if (d.value === null) {
        return { x: d.date, y: null };
    }
    let val = d.value;
    // Log scale 0 handling
    if (val === 0) val = 0.001;
    return {
        x: d.date,
        y: val
    };
});

// Chart.js global defaults for font
Chart.defaults.font.family = "'Times New Roman', Times, serif";
Chart.defaults.color = '#ffffff';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.2)'; // Grid lines

const ctx = document.getElementById('myChart').getContext('2d');

// Plugin to draw background area colors
const annotations = {
    imatynib: {
        type: 'box',
        xMin: '2018-04-01', // Extended to start of data
        xMax: '2019-11-01',
        backgroundColor: 'rgba(0, 128, 128, 0.3)', // Teal
        borderWidth: 0,
        label: {
            display: true,
            content: 'imatynib',
            color: 'white',
            font: { size: 14, weight: 'bold' },
            position: 'start',
            yAdjust: 10
        }
    },
    dasatynib: {
        type: 'box',
        xMin: '2019-11-01',
        xMax: '2023-06-01',
        backgroundColor: 'rgba(0, 128, 0, 0.3)', // Green
        borderWidth: 0,
        label: {
            display: true,
            content: 'dasatynib',
            color: 'white',
            font: { size: 14, weight: 'bold' },
            position: 'start',
            yAdjust: 10
        }
    },
    nilotynib: {
        type: 'box',
        xMin: '2023-06-01',
        xMax: '2023-07-01',
        backgroundColor: 'rgba(255, 215, 0, 0.3)', // Yellow
        borderWidth: 0,
        label: {
            display: true,
            content: 'nilotynib',
            color: 'white',
            font: { size: 12, weight: 'bold' }, // Smaller font for narrow region
            position: 'start',
            yAdjust: 10,
            rotation: -90
        }
    },
    bosutynib: {
        type: 'box',
        xMin: '2023-07-01',
        xMax: '2025-03-01',
        backgroundColor: 'rgba(255, 140, 0, 0.3)', // Orange
        borderWidth: 0,
        label: {
            display: true,
            content: 'bosutynib',
            color: 'white',
            font: { size: 14, weight: 'bold' },
            position: 'start',
            yAdjust: 10
        }
    },
    asciminib: {
        type: 'box',
        xMin: '2025-03-01',
        xMax: '2026-01-01', // Extend to future
        backgroundColor: 'rgba(200, 0, 0, 0.3)', // Red
        borderWidth: 0,
        label: {
            display: true,
            content: 'asciminib',
            color: 'white',
            font: { size: 14, weight: 'bold' },
            position: 'start',
            yAdjust: 10
        }
    },
    // Reference Lines
    lineMMR: {
        type: 'line',
        yMin: 0.1,
        yMax: 0.1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
        borderDash: [5, 5],
        label: {
            display: true,
            content: '(MMR) 0.100',
            position: 'start',
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'white',
            font: { size: 10 },
            xAdjust: 5,
            yAdjust: -10
        }
    },
    lineMR4: {
        type: 'line',
        yMin: 0.01,
        yMax: 0.01,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
        borderDash: [5, 5],
        label: {
            display: true,
            content: '(MR4) 0.010',
            position: 'start',
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'white',
            font: { size: 10 },
            xAdjust: 5,
            yAdjust: -10
        }
    },
    lineMR45: {
        type: 'line',
        yMin: 0.0032,
        yMax: 0.0032,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
        borderDash: [5, 5],
        label: {
            display: true,
            content: '(MR4.5) 0.0032',
            position: 'start',
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'white',
            font: { size: 10 },
            xAdjust: 5,
            yAdjust: -10
        }
    }
};

new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'IS-NCN [%]',
            data: processedData,
            borderColor: '#33b5e5', // Light Blue line
            backgroundColor: '#33b5e5',
            pointStyle: 'rectRot', // Square-ish
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2,
            fill: false,
            tension: 0.1,
            spanGaps: false // Do not connect lines over null values
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 5,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                    displayFormats: {
                        month: 'yyyy-MM-dd'
                    },
                    tooltipFormat: 'yyyy-MM-dd'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    source: 'data', // Important: use ticks from the data points
                    color: 'white',
                    maxRotation: 90,
                    minRotation: 45,
                    autoSkip: false // Show all data dates
                },
                title: {
                    display: true,
                    text: 'Data',
                    color: 'white',
                    font: { size: 14 }
                }
            },
            y: {
                type: 'logarithmic',
                min: 0.001,
                max: 1000,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'white',
                    callback: function(value, index, values) {
                        const niceValues = [1000, 100, 10, 1, 0.1, 0.01, 0.001];
                        if (niceValues.includes(value)) {
                            return value.toString();
                        }
                        return null;
                    }
                },
                title: {
                    display: true,
                    text: 'IS-NCN [%]',
                    color: 'white',
                    font: { size: 14 }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            annotation: {
                annotations: annotations
            },
            datalabels: {
                color: 'white',
                align: 'top',
                offset: 4,
                font: {
                    size: 11
                },
                formatter: function(value, context) {
                    if (value.y === null) return '';
                    return value.y;
                }
            }
        }
    }
});
