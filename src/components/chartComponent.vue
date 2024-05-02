<template>
    <div class="chartjs-custom">
      <canvas ref="chartCanvas" :class="chartData.class"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    props: ['chartData'],
    mounted() {
      this.initChart();
    },
    watch: {
      chartData: {
        handler() {
        this.updateChart();
        },
        deep: true
      }
    },
    methods: {
      initChart() {
    const ctx = this.$refs.chartCanvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
                ticks: {
                    callback: function(label, index, labels) {
                        return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    }
                },
                // scaleLabel: {
                //     display: true,
                //     labelString: '1k = 1000'
                // }
            }
        ],
          // xAxes: [{
          //   ticks: {
          //     display: false // Hide x-axis labels
          //   }
          // }],

          // ... other scales options ...
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
          }
        }, 
        legend: {
          display: false
        }
        // ... other chart options ...
      }
    });
      },
      updateChart() {
      if (this.chart) {
        // Format the data values before updating the chart
        const formattedChartData = {
          ...this.chartData,
          datasets: this.chartData.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.map(value => value)
          }))
        };

        this.chart.data = formattedChartData;
        this.chart.update();
      }
    },
    formatYAxisLabel(value, index, values) {
      return value.toLocaleString(); // Format the value with thousand separator
    }
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.destroy();
      }
    }
  };
  </script>
  
  <style scoped>
    .chartjs-custom .canvasHeight300 {
      height: 300px;
    }
  </style>
  