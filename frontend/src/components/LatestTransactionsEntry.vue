<template>
  <tr>
    <td class="py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
      <router-link :to="`/transactions/${transaction.txid}`" class="text-bitcoin-500 font-bold break-words">
        {{ transaction.txid }}
      </router-link>
    </td>
    <td class="py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
      {{ transaction.outputValue.toFixed(8) }}
    </td>
    <td class="py-4 text-right text-sm text-bitcoin-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
      {{ (transaction.feeRate * 100000000).toFixed(2) }} sat/vB
    </td>
  </tr>
</template>

<script>
export default {
  name: "LatestTransactionsEntry",
  props: ['transaction']
}
</script>

<style scoped>

</style>
