<template>
  <div class="bg-white overflow-hidden rounded-lg px-4 py-5">
    <h2 class="text-lg font-medium text-gray-900">Mempool size</h2>
    <MempoolTransactions class="h-80" />
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
