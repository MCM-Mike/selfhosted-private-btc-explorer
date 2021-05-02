<template>
  <div>
    <div class="bg-white shadow overflow-hidden rounded-lg px-4 py-2">
      <h3 class="text-sm leading-6 font-medium text-gray-900">
        <router-link :to="`/transactions/${transaction.txid}`" class="text-blue-500 break-words">
          {{ transaction.txid }}
        </router-link>
      </h3>
    </div>
    <div class="bg-white shadow overflow-hidden rounded-lg mt-2 px-4 py-4">
      <div class="divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
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
          <dl v-if="transaction" class="sm:divide-y sm:divide-gray-200">
            <div v-for="(input, index) in transaction.vin" :key="index"
                 class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                <router-link
                    v-if="input.txid"
                    :to="`/address/${input.tx.vout[input.vout].scriptPubKey.addresses[0]}`"
                    class="text-green-500"
                    :class="{'text-blue-500': input.tx.vout[input.vout].scriptPubKey.addresses[0] !== address}"
                >
                  {{ input.tx.vout[input.vout].scriptPubKey.addresses[0] }}
                </router-link>
                <span v-else>Coinbase (Newly Generated Coins)</span>
              </dt>
              <dd class="mt-1 text-sm text-right text-gray-900 sm:mt-0 sm:col-span-2">
                {{ input.tx.vout[input.vout].value }} BTC
              </dd>
            </div>
          </dl>
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
          <dl v-if="transaction" class="sm:divide-y sm:divide-gray-200">
            <div v-for="(output, index) in transaction.vout" :key="index"
                 class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                <router-link
                    v-if="output.scriptPubKey.hasOwnProperty('addresses')"
                    :to="`/address/${output.scriptPubKey.addresses[0]}`"
                    class="text-green-500"
                    :class="{'text-blue-500': output.scriptPubKey.addresses[0] !== address}"
                >
                  {{ output.scriptPubKey.addresses[0] }}
                </router-link>
                <span v-else class="truncate">
                {{ output.scriptPubKey.asm }}
              </span>
              </dt>
              <dd class="mt-1 text-sm text-right text-gray-900 sm:mt-0 sm:col-span-2">
                {{ output.value }} BTC
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <span class="badge bg-red-100 text-red-800 float-left">
        Fee: {{ totalFees.toFixed(8) }} BTC
      </span>
      <span class="badge bg-green-100 text-green-800 float-right">
        Output: {{ totalOutputValue.toFixed(8) }} BTC
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
    totalOutputValue: 0,
    totalInputValue: 0,
    totalFees: 0
  }),
  props: {
    txid: String,
    address: String
  },
  methods: {
    calcTotalOutputValue() {
      let totalOutputValue = 0
      for (const output of this.transaction.vout) {
        totalOutputValue += output.value
      }
      this.totalOutputValue = totalOutputValue
    },
    calcTotalInputValue() {
      let totalInputValue = 0
      for (let index = 0; index < this.transaction.vin.length; index++) {
        if (this.transaction.vin[index].coinbase || !this.transaction.vin[index].txid) continue
        totalInputValue += this.transaction.vin[index].tx.vout[this.transaction.vin[index].vout].value
      }
      this.totalInputValue = totalInputValue
    },
    calcTotalFees() {
      this.totalFees = this.totalInputValue - this.totalOutputValue
    }
  },
  created() {
    socket.on('transaction', (data) => {
      if (data?.txid === this.txid) {
        this.transaction = data;
        this.calcTotalOutputValue()
        this.calcTotalInputValue()
        this.calcTotalFees()
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
