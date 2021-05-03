<template>
  <div class="grid gap-3">
    <AddressInfo :wallet="wallet" />

    <h2 class="text-lg font-medium text-gray-900">{{ wallet.history.length }} Transactions</h2>
    <TransactionInputsAndOutputs v-for="(tx) in wallet.history" :txid="tx" :key="tx" :address="wallet.address" />
  </div>
</template>

<script>
import AddressInfo from "@/components/AddressInfo";
import socket from "@/plugins/socket.io";
import TransactionInputsAndOutputs from "@/components/TransactionInputsAndOutputs";

export default {
name: "AddressDetails",
  components: {TransactionInputsAndOutputs, AddressInfo},
  data: () => ({
    wallet: {}
  }),
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
