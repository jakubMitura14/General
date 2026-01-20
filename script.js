
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

// Handle 0 values by mapping them to a small number for log scale, e.g., 0.0001
const chartData = rawData.map(d => {
    return {
        x: d.date,
        y: d.value === 0 ? 0.0001 : d.value
    };
}).filter(d => d.y !== null);

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'IS-NCN [%]',
            data: chartData,
            borderColor: 'blue',
            borderWidth: 1,
            pointBackgroundColor: 'white',
            pointBorderColor: 'blue',
            pointRadius: 3,
            fill: false,
            tension: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            annotation: {
                annotations: {
                    mmr: {
                        type: 'line',
                        yMin: 0.1,
                        yMax: 0.1,
                        borderColor: 'black',
                        borderWidth: 1,
                        borderDash: [5, 5],
                        label: {
                            display: false // We will use custom ticks or separate labels if needed
                        }
                    },
                    mr4: {
                        type: 'line',
                        yMin: 0.01,
                        yMax: 0.01,
                        borderColor: 'black',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    },
                    mr45: {
                        type: 'line',
                        yMin: 0.0032,
                        yMax: 0.0032,
                        borderColor: 'black',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    },
                    mr5: {
                        type: 'line',
                        yMin: 0.001,
                        yMax: 0.001,
                        borderColor: 'black',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'yyyy-MM-dd'
                    },
                    parser: 'yyyy-MM-dd'
                },
                ticks: {
                    source: 'data',
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: true,
                    maxTicksLimit: 20
                },
                grid: {
                    display: true,
                    color: '#eee'
                }
            },
            y: {
                type: 'logarithmic',
                min: 0.0001, // allow going lower to show the dip
                max: 2000,
                grid: {
                    color: '#eee'
                },
                ticks: {
                    callback: function(value, index, values) {
                        if (value === 1000) return '1000.000';
                        if (value === 100) return '100.000';
                        if (value === 10) return '10.000';
                        if (value === 1) return '1.000';
                        if (value === 0.1) return '(MMR) 0.100';
                        if (value === 0.01) return '(MR4) 0.010';
                        if (value === 0.0032) return '(MR4.5) 0.0032';
                        if (value === 0.001) return '(MR5) 0.001';
                        // Handle the 0 replacement
                        if (value === 0.0001) return '0';
                        return null;
                    },
                    autoSkip: false,
                    maxTicksLimit: 20
                },
                afterBuildTicks: function(scale) {
                    scale.ticks = [
                        {value: 1000},
                        {value: 100},
                        {value: 10},
                        {value: 1},
                        {value: 0.1},
                        {value: 0.01},
                        {value: 0.0032},
                        {value: 0.001},
                        {value: 0.0001} // for the 0
                    ];
                }
            }
        }
    }
});
