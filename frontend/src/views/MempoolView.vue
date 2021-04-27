<template>
  <div class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
    <h2 class="text-lg font-medium text-gray-900">Mempool size</h2>
    <Mempool class="h-80" />
  </div>
</template>

<script>
import Mempool from "@/components/charts/Mempool";
export default {
  name: "MempoolView",
  components: {Mempool}
}
</script>

<style scoped>

</style>
