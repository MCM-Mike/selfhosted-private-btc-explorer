<template>
  <div class="px-10 py-2 bg-white overflow-hidden rounded-lg">
    <div class="py-5 flex justify-between">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Address
          <span class="badge bg-gray-200 text-gray-800 uppercase mx-2">{{ type }}</span>
          <span class="badge uppercase" :class="bech32 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">bech32</span>
        </h3>
        <p @click="copyTransactionId"
           class="transaction-id cursor-pointer inline-flex justify-center items-center mt-1 max-w-2xl text-sm font-bold text-bitcoin-500">
          {{ wallet.address }}
          <svg class="hidden mx-2 w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
            <path
                d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
          </svg>
        </p>
      </div>
    </div>
    <div class="border-t border-gray-100 py-5 sm:p-0">
      <dl class="divide-y divide-gray-100">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-500">
            Current balance
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ wallet.balance.confirmed / 100000000 }} BTC
            <span class="text-gray-600">({{ wallet.balance.unconfirmed / 100000000 }} BTC Unconfirmed)</span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script>
import { validate, getAddressInfo } from 'bitcoin-address-validation';


export default {
  name: 'AddressInfo',
  props: {
    wallet: {
      type: Object,
      required: true
    }
  },
  methods: {
    copyTransactionId() {
      navigator.clipboard.writeText(this.wallet.address).then(function () {
        console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  },
  computed: {
    bech32() {
      if (!validate(this.wallet.address)) {
        return false;
      }

      return getAddressInfo(this.wallet.address).bech32;
    },
    type() {
      if (!validate(this.wallet.address)) {
        return false;
      }

      return getAddressInfo(this.wallet.address).type;
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
