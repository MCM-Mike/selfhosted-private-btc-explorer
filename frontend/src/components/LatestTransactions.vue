<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <h2 class="text-lg font-medium text-gray-900 px-4 py-5 border-b">Latest transactions</h2>

    <TransactionTable :transactions="transactions" />
  </div>
</template>
<script>
import TransactionTable from "@/components/TransactionTable";

export default {
  name: 'LatestTransactions',
  components: {TransactionTable},
  props: {
    transactions: Array
  }
}
</script>
