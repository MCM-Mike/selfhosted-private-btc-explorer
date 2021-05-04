<template>
  <div class="my-3 chart-container" ref="chartNode"></div>
</template>

<script>
import Chartist from 'chartist';
import socket from "@/plugins/socket.io";

export default {
  name: "Mempool",
  data: () => ({
    memPoolData: [],
    chartOptions: {
      showArea: true,
      showLine: true,
      fullWidth: true,
      showPoint: false,
      low: 0,
    },
    divNode: ''
  }),
  methods: {
    renderGraph() {
      let xScale = 6 // label per minute
      if (this.memPoolData.length === 8640) xScale = 720 // label per 2 hours
      else if (this.memPoolData.length > 4320) xScale = 360 // label per 1 hour
      else if(this.memPoolData.length > 2160) xScale = 180 // label per 30 mins
      else if(this.memPoolData.length > 720) xScale = 90 // label per 15 mins
      else if(this.memPoolData.length > 360) xScale = 30 // label per 5 mins
      else if(this.memPoolData.length > 180) xScale = 18 // label per 3 mins
      else if(this.memPoolData.length > 90) xScale = 12 // label per 2 mins

      const labels = this.memPoolData.map((memPoolInfo, index) => {
        if (index === this.memPoolData.length - 1) {
          return ''
        } else if (index % xScale === 0) {
          return new Date(memPoolInfo.time).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
        }
      })

      const data = this.memPoolData.map((memPoolInfo) => memPoolInfo.tx_count);

      this.chartInstance = new Chartist.Line(this.divNode, {
        labels: labels,
        series: [data]
      }, this.chartOptions);
    }
  },
  mounted() {
    this.divNode = this.$refs.chartNode;
    socket.on('mempoolTransactionsChart', (data) => {
      this.memPoolData = data.slice(-8640)
      this.renderGraph()
    })
    socket.emit('getMempoolTransactionsChart')
  }
}
</script>

<style>
.ct-series-a .ct-line {
  /* Set the colour of this series line */
  stroke: #ff9900!important;
  /* Control the thikness of your lines */
  stroke-width: 2px;
}

.ct-series-a .ct-point {
  /* Set the colour of this series line */
  stroke: #ff9900!important;
}

.ct-series-a .ct-area {
  fill: #ff9900!important;
}
</style>
