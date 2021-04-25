<template>
  <div class="grid gap-3">
    <BlockInfo :block-stats="blockStats"/>

    <div v-if="block.height" class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <h2 class="text-lg font-medium text-gray-900">Coinbase transaction</h2>
      <TransactionInputsAndOutputs :transaction="block.tx[0]" />
    </div>


    <div v-if="block.height" class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <h2 class="text-lg font-medium text-gray-900">Transactions</h2>
      <TransactionTable :transactions="block.tx" :fixed="false" />
      <Pagination :current-page="1" :total-pages="10" />
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
  components: {TransactionTable, BlockInfo, Pagination, TransactionInputsAndOutputs},
  data: () => ({
    block: {},
    blockStats: {},
    blockTest: {
      transactions: [
        {
          id: '77399d98e6a818770abb5ccb7f307a8ac834dc6f693a6fbdf2e04849c677ebfb',
          value: 7.53557498,
          fee: 12.5,
          inputs: [
            {
              value: 8,
            }
          ],
          outputs: [
            {
              address: '12312334857462314',
              value: 8
            }
          ]
        },
        {
          id: '77399d98e6a818770abb5ccb7f307a8ac834dc6f693a6fbdf2e04849c677ebfb',
          value: 7.53557498,
          fee: 12.5
        },
        {
          id: '77399d98e6a818770abb5ccb7f307a8ac834dc6f693a6fbdf2e04849c677ebfb',
          value: 7.53557498,
          fee: 12.5
        },
        {
          id: '77399d98e6a818770abb5ccb7f307a8ac834dc6f693a6fbdf2e04849c677ebfb',
          value: 7.53557498,
          fee: 12.5
        }
      ]
    }
  }),
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

