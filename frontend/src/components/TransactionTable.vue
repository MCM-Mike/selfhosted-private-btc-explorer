<template>
  <table class="divide-y divide-gray-200 break-words w-full" :class="{'table-fixed': fixed}">
    <thead class="bg-gray-50">
    <tr>
      <th scope="col" class="w-1/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        TX
      </th>
      <th scope="col" class="w-4/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        First Seen
      </th>
      <th scope="col" class="w-2/12 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Value
      </th>
      <th scope="col" class="w-1/4 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Fee
      </th>
    </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="(transaction, index) in transactions.slice(0, 97)" :key="index">
      <td class="px-4 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
        <router-link :to="`/transactions/${transaction.txid}`" class="text-blue-500 break-words">
          {{ transaction.txid }}
        </router-link>
      </td>
      <td class="px-4 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ timeSince(new Date(transaction.info.time * 1000)) }} ago
      </td>
      <td class="px-4 py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ valueTransaction(transaction) }}
      </td>
      <td class="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ transaction.info.fee }} sat/vB
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TransactionTable',
  props: {
    transactions: Array,
    fixed: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    valueTransaction(tx) {
      let value = 0

      for (const output of tx.vout) {
        value += output.value
      }

      return value
    }
  }
}
</script>
