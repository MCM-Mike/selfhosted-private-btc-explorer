<template>
  <div class="px-6 py-4 bg-white rounded-lg overflow-hidden">
    <h2 class="text-lg font-medium text-bitcoin-900 py-1">Latest Transactions</h2>

    <table class="table-fixed break-words w-full">
      <thead>
        <tr class="text-xs text-gray-400 uppercase tracking-wider">
          <th scope="col" class="w-2/4 py-3 font-medium text-left">
            TX
          </th>
          <th scope="col" class="w-1/4 py-3 font-medium text-right">
            Value (BTC)
          </th>
          <th scope="col" class="w-1/4 py-3 font-medium text-right">
            Fee
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
      <LatestTransactionsEntry v-for="(transaction, index) in transactions" :key="index" :transaction="transaction" />
      </tbody>
    </table>
  </div>
</template>
<script>
import LatestTransactionsEntry from "@/components/LatestTransactionsEntry";
export default {
  name: 'LatestTransactions',
  components: {LatestTransactionsEntry},
  props: {
    transactions: Array
  }
}
</script>
