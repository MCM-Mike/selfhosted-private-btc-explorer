<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <h2 class="text-lg font-medium text-gray-900 px-4 py-5 border-b">Latest transactions</h2>

    <table class="table-fixed divide-y divide-gray-200 break-words w-full">
      <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="w-2/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          TX
        </th>
        <th scope="col" class="w-1/4 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Value (BTC)
        </th>
        <th scope="col" class="w-1/4 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Fee
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
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
