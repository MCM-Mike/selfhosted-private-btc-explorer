<template>
  <div class="grid gap-3">
    <TransactionDetails :transaction="transaction"/>

    <div class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
      <div class="relative group bg-white p-6">
        <div class="inline-flex items-center mb-2">
          <span class="pr-3 text-green-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
          Inputs
        </div>
        <dl class="sm:divide-y sm:divide-gray-200">
          <div v-for="(input, index) in transaction.vin" :key="index" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              {{ input.txid }}
            </dt>
            <dd class="mt-1 text-sm text-right text-gray-900 sm:mt-0 sm:col-span-2">
              {{ input.value }} BTC
            </dd>
          </div>
        </dl>
      </div>

      <div class="relative group bg-white p-6">
        <div class="inline-flex items-center mb-2">
          Outputs
          <span class="pr-3 text-red-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </div>
        <dl class="sm:divide-y sm:divide-gray-200">
          <div v-for="(output, index) in transaction.vout" :key="index" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              <router-link v-if="output.scriptPubKey.hasOwnProperty('addresses')" :to="`/address/${output.scriptPubKey.addresses[0]}`" class="text-blue-500">
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
  </div>
</template>

<script>
import TransactionDetails from "../components/TransactionInfo";
import socket from "@/plugins/socket.io";


export default {
  name: "transaction",
  components: {TransactionDetails},
  methods: {},
  data: () => ({
    transaction: {}
  }),
  created() {
    const txid = this.$route.params.id;

    socket.emit('getTransaction', txid)
  },
  beforeMount () {
    socket.on('transaction', (data) => {
      if (data?.txid === this.$route.params.id) {
        this.transaction = {...data}
      }
    })
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route' (to, from) {
      const txid = this.$route.params.id;

      socket.emit('getTransaction', txid)
    }
  }
}
</script>

<style scoped>
</style>
