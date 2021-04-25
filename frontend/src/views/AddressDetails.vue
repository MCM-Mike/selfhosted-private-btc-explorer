<template>
  <div class="grid gap-3">
    <AddressInfo :wallet="wallet" />

    <div class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
      <h2 class="text-lg font-medium text-gray-900">Transactions</h2>
      <TransactionTable :fixed="false" :transactions="wallet.transactions" />
    </div>
  </div>
</template>

<script>
import AddressInfo from "@/components/AddressInfo";
import TransactionTable from "@/components/TransactionTable";
export default {
name: "AddressDetails",
  components: {TransactionTable, AddressInfo},
  data: () => ({
    wallet: {
      address: "1Muxr4hJvwzeTjE98PX7NoLigJ3BPzJrcx",
      received: 6,
      sent: 4,
      balance: 2,
      transactions: [
        {
          id: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          value: 1
        },
        {
          id: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          value: 1
        },
        {
          id: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          value: 1
        },{
          id: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          value: 1
        },{
          id: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          value: 1
        },
        {
          id: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          value: 1
        },
      ]
    }
  }),
}
</script>

<style scoped>

</style>
