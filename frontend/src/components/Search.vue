<template>
  <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
    <div class="max-w-lg w-full lg:max-w-xs">
      <label for="search" class="sr-only">Hash or Address</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <!-- Heroicon name: solid/search -->
          <svg class="h-5 w-5 text-bitcoin-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"/>
          </svg>
        </div>
        <form @submit.prevent="search">
          <input id="search" name="search"
                 class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 text-gray-500 placeholder-gray-400 focus:outline-none focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                 placeholder="Hash or Address" type="search" v-model="query"
          >
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { validate } from 'bitcoin-address-validation';
import socket from "@/plugins/socket.io";

export default {
  name: 'Search',
  data: () => ({
    query: "",
  }),
  methods: {
    search() {
      if (validate(this.query)) {
        this.$router.push(`/address/${this.query}`);
      } else {
        socket.emit('getBlockOrTransaction', this.query)
      }
    }
  },
  beforeMount () {
    socket.on('blockOrTransaction', (data) => {
      if (data.block) {
        this.$router.push(`/blocks/${data.block.height}`);
      } else if (data.tx) {
        this.$router.push(`/transactions/${data.tx.txid}`);
      }
    })
  }
}
</script>

<style scoped>
</style>
