<template>
  <div class="bg-white shadow overflow-hidden rounded-lg">
    <div class="px-4 py-5 flex justify-between sm:px-6">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Transaction
          <span class="badge bg-green-100 text-green-800" v-if="transaction.confirmations > 0">
            Confirmed ({{ transaction.confirmations }})
          </span>
          <span v-else class="badge bg-red-100 text-red-800">
            Not confirmed
          </span>
        </h3>
        <p @click="copyTransactionId"
           class="transaction-id cursor-pointer inline-flex justify-center items-center mt-1 max-w-2xl text-sm text-blue-500">
          {{ transaction.txid }}
          <svg class="hidden mx-2 w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
            <path
                d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
          </svg>
        </p>
      </div>
      <p class="text-gray-500" v-if="transaction.time">{{ new Intl.DateTimeFormat('default', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }).format(new Date(transaction.time * 1000)) }} ({{ timeSince(new Date(transaction.time * 1000)) }} ago)</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Fee
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            ...
          </dd>
        </div>
<!--        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">-->
<!--          <dt class="text-sm font-medium text-gray-500">-->
<!--            Fee Rate-->
<!--          </dt>-->
<!--          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">-->
<!--            68.5 sat/vB-->
<!--            <span class="badge bg-green-100 text-green-800">Optimal</span>-->
<!--          </dd>-->
<!--        </div>-->
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Size
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ transaction.size }} B
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Virtual size
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ transaction.vsize }} vB
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Weight
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ transaction.weight }} WU
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Features
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span class="badge bg-yellow-100 text-yellow-800">SegWit</span>
            <span class="badge bg-red-100 text-red-800">RBF</span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TransactionDetails',
  components: {},
  props: {
    transaction: Object
  },
  watch: {
    transaction() {
      console.log(this.transaction)
    }
  },
  methods: {
    copyTransactionId() {
      navigator.clipboard.writeText(this.transactionId).then(function () {
        console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  }
}
</script>
<style scoped>
.transaction-id:hover svg {
  @apply block;
}

.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium;
}
</style>
