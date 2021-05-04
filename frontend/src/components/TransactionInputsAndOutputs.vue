<template>
  <div>
    <div class="bg-white overflow-hidden rounded-lg px-4 py-2">
      <h3 class="text-sm leading-6 font-medium">
        <router-link :to="`/transactions/${transaction.txid}`" class="text-bitcoin-500 break-words">
          {{ transaction.txid }}
        </router-link>
      </h3>
    </div>
    <div class="bg-white overflow-hidden rounded-lg mt-2 px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="relative group bg-white">
          <div class="inline-flex items-center mb-2">
          <span class="pr-3 text-green-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path><path fill-rule="evenodd"
                                                 d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                                 clip-rule="evenodd"></path></svg>
          </span>
            Inputs
          </div>
          <div v-for="(input, index) in transaction.vin" :key="index" class="py-1 table-fixed sm:grid sm:grid-cols-3 sm:gap-4">
            <dl class="col-span-2 text-sm font-medium text-left text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
              <router-link
                  v-if="input.txid"
                  :to="`/address/${input.address}`"
                  class="text-blue-500"
                  :class="{'text-bitcoin-500': input.address === address}"
              >
                {{ input.address }}
              </router-link>
              <div v-else>Coinbase (Newly Generated Coins)</div>
            </dl>
            <dd v-if="input.txid" class="col-span-1 text-sm font-medium text-right sm:mt-0">
              {{ input.value }} BTC
            </dd>
          </div>
        </div>
        <div class="relative group bg-white">
          <div class="inline-flex items-center mb-2">
            Outputs
            <span class="pr-3 text-red-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path><path fill-rule="evenodd"
                                                 d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                                 clip-rule="evenodd"></path></svg>
          </span>
          </div>
          <div v-for="(output, index) in transaction.vout" :key="index" class="py-1 table-fixed sm:grid sm:grid-cols-3 sm:gap-4">
            <dl class="col-span-2 text-sm font-medium text-left text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
              <router-link
                  v-if="output.scriptPubKey.hasOwnProperty('addresses')"
                  :to="`/address/${output.scriptPubKey.addresses[0]}`"
                  class="text-blue-500"
                  :class="{'text-bitcoin-500': output.scriptPubKey.addresses[0] === address}"
              >
                {{ output.scriptPubKey.addresses[0] }}
              </router-link>
              <div v-else class="whitespace-nowrap overflow-hidden overflow-ellipsis">
                {{ output.scriptPubKey.asm }}
              </div>
            </dl>
            <dd class="col-span-1 text-sm font-medium text-right sm:mt-0">
              {{ output.value }} BTC
            </dd>
          </div>
        </div>
      </div>
      <span v-if="transaction.inputValue" class="mt-4 badge bg-red-100 text-red-800 float-left">
        Input: {{ (transaction.inputValue).toFixed(8) }} BTC
      </span>
      <span v-if="transaction.fee && !transaction.coinbase" class="ml-1 mt-4 badge bg-yellow-100 text-yellow-800 float-left">
        Fee: {{ (transaction.fee).toFixed(8) }} BTC
      </span>
      <span v-if="transaction.feeRate && !transaction.coinbase" class="ml-1 mt-4 badge bg-yellow-100 text-yellow-800 float-left">
        Fee: {{ (transaction.feeRate * 100000000).toFixed(2) }} sat/vB
      </span>
      <span v-if="transaction.outputValue" class="mt-4 badge bg-green-100 text-green-800 float-right">
        Output: {{ (transaction.outputValue).toFixed(8) }} BTC
      </span>
    </div>
  </div>
</template>
<script>
import socket from "@/plugins/socket.io";

export default {
  name: 'TransactionInputsAndOutputs',
  data: () => ({
    transaction: {},
  }),
  props: {
    txid: String,
    address: String
  },
  created() {
    socket.on('transaction', (data) => {
      if (data?.txid === this.txid) {
        this.transaction = data;
      }
    })
  },
  beforeMount() {
    socket.emit('getTransaction', this.txid)
  }
}
</script>

<style scoped>
.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium;
}
</style>
