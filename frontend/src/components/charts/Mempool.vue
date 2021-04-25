<template>
  <div class="chart-container" ref="chartNode"></div>
</template>

<script>
import Chartist from 'chartist';

export default {
  name: "Mempool",
  mounted() {
    const divNode = this.$refs.chartNode;
    new Chartist.Line(divNode, {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    });
    // this.chartInstance = new Chartist.Line(divNode, this.data, this.options);
  },
  data: () => ({
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    },
    chartOptions: {
      showArea: true,
      showLine: true,
      fullWidth: true,
      showPoint: true,
      low: 0,
      axisY: {
        showLabel: false,
        offset: 0
      },
      axisX: {
        showGrid: true,
        showLabel: false,
        offset: 0
      },
    }
  }),
}
</script>

<style scoped>

</style>
