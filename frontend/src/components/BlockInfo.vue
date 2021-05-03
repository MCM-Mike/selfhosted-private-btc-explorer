<template>
  <div class="bg-white shadow overflow-hidden rounded-lg">
    <div class="px-4 py-5 flex justify-between sm:px-6">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Block #{{ blockStats.height }}
        </h3>
      </div>
      <p class="text-gray-500">{{ date }} ({{ timeSince(new Date(blockStats.time * 1000)) }} ago)</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Hash
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ blockStats.blockhash }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Total fees
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ (blockStats.totalfee / 1000000000).toFixed(4) }} BTC
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Subsidy
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ ((blockStats.subsidy) / 1000000000).toFixed(4) }} BTC
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Subsidy + fees
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ ((blockStats.totalfee + blockStats.subsidy) / 1000000000).toFixed(4) }} BTC
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Size
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ fileSize(blockStats.total_size) }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Weight
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ (blockStats.total_weight / 1000000).toFixed(2) }} MWU
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: 'BlockInfo',
  props: ['blockStats'],
  computed: {
    date() {
      return `${new Date(this.blockStats.time * 1000).toLocaleDateString()}, ${new Date(this.blockStats.time * 1000).toLocaleTimeString()}`
    }
  }
});
</script>
<style scoped>
.transaction-id:hover svg {
  @apply block;
}
</style>
