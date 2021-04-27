<template>
  <div class="grid gap-3">
    <BlockInfo :block-stats="blockStats"/>

    <div v-if="block.coinbasetx" class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <h2 class="text-lg font-medium text-gray-900">Coinbase transaction</h2>
      <TransactionInputsAndOutputs :txid="block.coinbasetx.txid" />
    </div>


    <div v-if="block.height" class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <h2 class="text-lg font-medium text-gray-900">Transactions</h2>
      <!--
      <TransactionTable :transactions="block.tx" :fixed="false" />
      -->
      <TransactionInputsAndOutputs v-for="(tx) in pageData" :txid="tx" :key="tx" />
      <Pagination :current-page.sync="currentPage" :total-pages="totalPages" :total-results="block.tx.length" page-size="20" />
    </div>
  </div>
</template>

<script>
import socket from '../plugins/socket.io'
import TransactionInputsAndOutputs from "../components/TransactionInputsAndOutputs";
import Pagination from "@/components/Pagination";
import BlockInfo from "@/components/BlockInfo";
import TransactionTable from "@/components/TransactionTable";

export default {
  name: "BlockDetails",
  // eslint-disable-next-line vue/no-unused-components
  components: {TransactionTable, BlockInfo, Pagination, TransactionInputsAndOutputs},
  data: () => ({
    block: {},
    blockStats: {},
    currentPage: 1
  }),
  computed: {
    totalPages() {
      return Math.ceil(this.block.tx.length / 20)
    },
    pageData() {
      return this.block.tx.slice((this.currentPage * 20) - 20 + 1, this.currentPage * 20);
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
  }
}
</script>

