<template>
  <tr>
    <td class="px-4 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
      <router-link :to="`/transactions/${transaction.txid}`" class="text-blue-500 break-words">
        {{ transaction.txid }}
      </router-link>
    </td>
    <td class="px-4 py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
      {{ totalOutputValue.toFixed(6) }}
    </td>
    <td class="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
      {{ (feesPerVByte * 100000000).toFixed(2) }} sat/vB
    </td>
  </tr>
</template>

<script>
export default {
  name: "LatestTransactionsEntry",
  props: ['transaction'],
  computed: {
    totalOutputValue() {
      if (!this.transaction.vout) return 0
      let totalOutputValue = 0
      for (const output of this.transaction.vout) {
        totalOutputValue += output.value
      }
      return totalOutputValue
    },
    totalInputValue() {
      if (!this.transaction.vin) return 0
      let totalInputValue = 0
      for (const input of this.transaction.vin) {
        if (input.coinbase) continue
        totalInputValue += input.tx.vout[input.vout].value
      }
      return totalInputValue
    },
    totalFees() {
      return this.totalInputValue - this.totalOutputValue
    },
    feesPerVByte() {
      return this.totalFees / this.transaction.vsize
    }
  }
}
</script>

<style scoped>

</style>
