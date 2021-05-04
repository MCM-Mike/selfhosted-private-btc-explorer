<template>
  <div class="w-full grid-cols-3">
    <!-- WIP
    <AverageFees />
    -->

    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-white overflow-hidden rounded-lg col-span-1">
        <div class="px-4 py-5 sm:p-6">
          <h4>Incoming transaction chart</h4>
        </div>
      </div>
      <div class="bg-white overflow-hidden rounded-lg col-span-1">
        <div class="px-4 py-5 sm:p-6">
          <Mempool />
        </div>
      </div>
    </div>

    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
      <LatestTransactions :transactions="latestTransactions" class="col-span-2 md:col-span-1" />
      <BlockTimeline :blocks="latestBlocks" class="col-span-2 md:col-span-1" />
    </div>
  </div>
</template>

<script>
import socket from '../plugins/socket.io'
import BlockTimeline from '../components/LatestBlocks.vue'
import AverageFees from '../components/AverageFees.vue'
import LatestTransactions from '../components/LatestTransactions.vue'
import Mempool from "@/components/charts/Mempool";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {Mempool, LatestTransactions, AverageFees, BlockTimeline },
  data: () => ({
    latestTransactions: [],
    latestBlocks: []
  }),
  created() {
    socket.emit('getLatestBlocks')
    socket.emit('getLatestTransactions')
  },
  mounted () {
    socket.on('latestBlocks', (data) => {
      this.latestBlocks = data
    })
    socket.on('latestTransactions', (data) => {
      this.latestTransactions = data
    })
  }
}
</script>
