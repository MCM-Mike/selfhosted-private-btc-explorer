<template>
  <div class="grid gap-3">
    <AddressInfo :wallet="wallet" />

    <div class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <h2 class="text-lg font-medium text-gray-900">Transactions</h2>
      <TransactionInputsAndOutputs v-for="(tx) in wallet.history" :txid="tx" :key="tx" />
    </div>
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
  }
}
</script>

<style scoped>

</style>
