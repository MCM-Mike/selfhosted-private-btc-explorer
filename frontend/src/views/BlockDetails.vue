<template>
  <div class="grid gap-3">
    <BlockDetails :block-id="$route.params.id"/>

    <div class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <h2 class="text-lg font-medium text-gray-900">Coinbase transaction</h2>
      <TransactionInputsAndOutputs :transaction="block.transactions[0]" />
    </div>


    <div class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <h2 class="text-lg font-medium text-gray-900">Transactions</h2>
      <TransactionTable :transactions="block.transactions" :fixed="false" />
      <Pagination :current-page="1" :total-pages="10" />
    </div>
  </div>
</template>

<script>
import TransactionInputsAndOutputs from "../components/TransactionInputsAndOutputs";
import Pagination from "@/components/Pagination";
import BlockDetails from "@/components/BlockInfo";
import TransactionTable from "@/components/TransactionTable";

export default {
  name: "transaction",
  components: {TransactionTable, BlockDetails, Pagination, TransactionInputsAndOutputs},
  data: () => ({
    block: {
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
  })
}
</script>

