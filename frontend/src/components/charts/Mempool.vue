<template>
  <div class="chart-container" ref="chartNode"></div>
</template>

<script>
import Chartist from 'chartist';

export default {
  name: "Mempool",
  beforeMount() {

  },
  created() {

  },
  mounted() {
    const divNode = this.$refs.chartNode;

    const labels = this.memPoolData.map((memPoolInfo) => new Intl.DateTimeFormat('default', {
      dateStyle: 'short',
      timeStyle: 'medium'
    }).format(new Date(memPoolInfo.time * 1000)) );
    const data = this.memPoolData.map((memPoolInfo) => memPoolInfo.bytes);

    this.chartInstance = new Chartist.Line(divNode, {
      labels: labels,
      series: [data]
    }, this.chartOptions);
  },
  data: () => ({
    memPoolData: [
      {
        time: 1619543768,
        "bytes": 100,
        "usage": 1000,
      },
      {
        time: 1619543868,
        "bytes": 300,
        "usage": 1000,
      },
      {
        time: 1619543968,
        "bytes": 600,
        "usage": 1000,
      },
      {
        time: 1619544068,
        "bytes": 400,
        "usage": 1000,
      },
      {
        time: 1619544168,
        "bytes": 900,
        "usage": 1000,
      },
      {
        time: 1619544268,
        "bytes": 700,
        "usage": 1000,
      },
      {
        time: 1619544368,
        "bytes": 800,
        "usage": 1000,
      },
      {
        time: 1619544468,
        "bytes": 800,
        "usage": 1000,
      },
      {
        time: 1619544568,
        "bytes": 400,
        "usage": 1000,
      },
      {
        time: 1619544668,
        "bytes": 600,
        "usage": 1000,
      },
    ],
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
    }
  }),
}
</script>

<style scoped>

</style>
