<template>
  <div class="w-full">
    <!-- WIP

    <div class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div class="px-4 py-5 bg-white rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium truncate">
          Market Price
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-bitcoin-500">
          &euro;0
        </dd>
      </div>

      <div class="px-4 py-5 bg-white rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium truncate">
          Market Cap
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-bitcoin-500">
          &euro;0
        </dd>
      </div>

      <div class="px-4 py-5 bg-white rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium truncate">
          24h Volume
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-bitcoin-500">
          0 BTC
        </dd>
      </div>
    </div>

    -->

    <div class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div class="px-4 py-5 bg-white rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium truncate">
          Mempool Size
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-bitcoin-500">
          {{ network.mempoolInfo ? network.mempoolInfo.size : 0 }} TX's
        </dd>
      </div>

      <div class="px-4 py-5 bg-white rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium truncate">
          Network Difficulty
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-bitcoin-500">
          {{ network.difficulty ? `${(network.difficulty / 1000000000000).toFixed(2)}e12` : 0 }}
        </dd>
      </div>

      <div class="px-4 py-5 bg-white rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium truncate">
          Smart Fee ({{ network.smartFee.blocks }} Blocks)
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-bitcoin-500">
          {{ network.smartFee.feerate ? (network.smartFee.feerate * 100000).toFixed(2) : 0 }} sat/Byte
        </dd>
      </div>
    </div>

    <div class="mt-3 grid grid-cols-1 md:grid-cols-1 gap-3">
      <div class="px-6 py-4 bg-white rounded-lg overflow-hidden">
        <h2 class="text-lg font-medium text-bitcoin-900 py-1">Mempool Transactions</h2>
        <MempoolTransactions class="h-80" />
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
import MempoolTransactions from "@/components/charts/MempoolTransactions";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {MempoolTransactions, LatestTransactions, AverageFees, BlockTimeline },
  data: () => ({
    latestTransactions: [],
    latestBlocks: [],
    network: {}
  }),
  created() {
    socket.on('latestBlocks', (data) => {
      this.latestBlocks = data
    })
    socket.on('latestTransactions', (data) => {
      this.latestTransactions = data
    })
    socket.on('networkStats', (data) => {
      this.network = data
    })
  },
  beforeMount () {
    socket.emit('getLatestBlocks')
    socket.emit('getLatestTransactions')
    socket.emit('getNetworkStats')
  }
}
</script>
