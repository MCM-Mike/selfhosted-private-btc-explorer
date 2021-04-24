<template>
  <div class="bg-white shadow overflow-hidden rounded-lg">
    <div class="px-4 py-5 flex justify-between sm:px-6">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Block #{{ blockId }}
        </h3>
      </div>
      <p class="text-gray-500">2021-03-27 21:15 (10 minutes ago)</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Total fees
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            0.51 BTC ($30,164)
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Subsidy + fees
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            6.76 BTC ($400,907)
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Size
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            1.37 MB
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Weight
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            4 MWU
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: 'BlockDetails',
  props: {
    blockId: {
      type: String,
      required: true
    }
  },
});
</script>
<style scoped>
.transaction-id:hover svg {
  @apply block;
}
</style>
