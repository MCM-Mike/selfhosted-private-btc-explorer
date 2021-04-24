<template>
  <div class="w-full overflow-hidden grid-cols-3">
    <AverageFees />

    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-white overflow-hidden shadow rounded-lg col-span-1">
        <div class="px-4 py-5 sm:p-6">
          <h4>Incoming transaction chart</h4>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg col-span-1">
        <div class="px-4 py-5 sm:p-6">
          <h4>Memory chart</h4>
        </div>
      </div>
    </div>

    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
      <LatestTransactions class="col-span-2 md:col-span-1" />
      <BlockTimeline :blocks="latestBlocks" class="col-span-2 md:col-span-1" />
    </div>

    <button class="mt-3 w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md shadow focus:outline-none">
      Back to top ^
    </button>

    <p class="block w-full text-sm p-4 text-center">
      &copy; DutchBits 2021
    </p>
  </div>
</template>

<script>
import socket from '../plugins/socket.io'
import BlockTimeline from '../components/BlockTimeline.vue'
import AverageFees from '../components/AverageFees.vue'
import LatestTransactions from '../components/LatestTransactions.vue'

export default {
  components: { LatestTransactions, AverageFees, BlockTimeline },
  data: () => ({
    latestBlocks: []
  }),
  mounted () {
    socket.emit('getLatestBlocks')
    socket.on('latestBlocks', (data) => {
      this.latestBlocks = data
    })
  }
}
</script>
