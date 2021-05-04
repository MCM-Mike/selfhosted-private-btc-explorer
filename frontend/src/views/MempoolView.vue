<template>
  <div class="mt-3 grid grid-cols-1 md:grid-cols-1 gap-3">
    <div class="px-6 py-4 bg-white rounded-lg overflow-hidden">
      <h2 class="text-lg font-medium text-bitcoin-900 py-1">Mempool Transactions</h2>
      <MempoolTransactions class="h-80" />
    </div>
  </div>
</template>

<script>
import MempoolTransactions from "@/components/charts/MempoolTransactions";
export default {
  name: "MempoolView",
  components: {MempoolTransactions}
}
</script>

<style scoped>

</style>
