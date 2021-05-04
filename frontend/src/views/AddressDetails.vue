<template>
  <div class="grid gap-3">
    <AddressInfo :wallet="wallet" />

    <h2 class="text-lg font-medium text-bitcoin-900">{{ wallet.history.length }} Transactions</h2>
    <Pagination
        v-if="wallet.history.length > 20"
        :current-page.sync="currentPage"
        :total-pages="totalPages"
        :total-results="wallet.history.length || 0"
        page-size="20"
    />
    <TransactionInputsAndOutputs v-for="tx in pageData" :txid="tx" :key="tx" :address="wallet.address" />
    <Pagination
        v-if="wallet.history.length > 20"
        :current-page.sync="currentPage"
        :total-pages="totalPages"
        :total-results="wallet.history.length || 0"
        page-size="20"
    />
  </div>
</template>

<script>
import AddressInfo from "@/components/AddressInfo";
import socket from "@/plugins/socket.io";
import TransactionInputsAndOutputs from "@/components/TransactionInputsAndOutputs";
import Pagination from "@/components/Pagination";

export default {
name: "AddressDetails",
  components: {Pagination, TransactionInputsAndOutputs, AddressInfo},
  data: () => ({
    wallet: {
      history: [],
      balance: {}
    },
    currentPage: 1,
  }),
  computed: {
    totalPages() {
      return Math.ceil(this.wallet.history.length / 20)
    },
    pageData() {
      return this.wallet?.history.slice((this.currentPage * 20) - 20, this.currentPage * 20);
    }
  },
  created() {
    this.wallet.address = this.$route.params.id;
    socket.emit('getAddressInfo', this.$route.params.id)
  },
  beforeMount () {
    socket.on('addressInfo', (data) => {
      this.wallet = data;
      console.log(data);
    })
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route' (to, from) {
      this.wallet.address = this.$route.params.id;
      socket.emit('getAddressInfo', this.$route.params.id)
    }
  }
}
</script>

<style scoped>

</style>
