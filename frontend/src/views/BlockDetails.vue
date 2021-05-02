<template>
  <div class="grid gap-3">
    <BlockInfo v-if="blockStats" :block-stats="blockStats"/>

    <h2 class="text-lg font-medium text-gray-900">{{ block.tx.length }} Transactions</h2>
    <div v-for="tx in pageData" :key="tx" class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <TransactionInputsAndOutputs :txid="tx" />
    </div>
    <Pagination :current-page.sync="currentPage" :total-pages="totalPages" :total-results="block.tx.length || 0" page-size="20" />
  </div>
</template>

<script>
import socket from '../plugins/socket.io'
import TransactionInputsAndOutputs from "../components/TransactionInputsAndOutputs";
import Pagination from "@/components/Pagination";
import BlockInfo from "@/components/BlockInfo";

export default {
  name: "BlockDetails",
  components: {BlockInfo, Pagination, TransactionInputsAndOutputs},
  data: () => ({
    block: {
      tx: []
    },
    blockStats: {},
    currentPage: 1
  }),
  computed: {
    totalPages() {
      return Math.ceil(this.block.tx.length / 20)
    },
    pageData() {
      return this.block?.tx.slice((this.currentPage * 20) - 20, this.currentPage * 20);
    }
  },
  created () {
    socket.on('block', (data) => {
      this.block = data
    })
    socket.on('blockStats', (data) => {
      this.blockStats = data
    })
  },
  beforeMount() {
    socket.emit('getBlockStats', this.$route.params.id)
    socket.emit('getBlock', this.$route.params.id)
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route' (to, from) {
      socket.emit('getBlockStats', this.$route.params.id)
      socket.emit('getBlock', this.$route.params.id)
    }
  }
}
</script>

