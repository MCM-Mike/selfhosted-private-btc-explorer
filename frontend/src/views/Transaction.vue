<template>
  <div class="grid gap-3">
    <TransactionInfo :transaction="transaction"/>
    <TransactionInputsAndOutputs :txid="$route.params.id" />
  </div>
</template>

<script>
import TransactionInfo from "../components/TransactionInfo";
import socket from "@/plugins/socket.io";
import TransactionInputsAndOutputs from "@/components/TransactionInputsAndOutputs";

export default {
  name: "transaction",
  components: {TransactionInfo, TransactionInputsAndOutputs},
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
