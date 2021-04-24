<template>
  <table class="divide-y divide-gray-200 break-words w-full" :class="{'table-fixed': fixed}">
    <thead class="bg-gray-50">
    <tr>
      <th scope="col" class="w-1/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        TX
      </th>
      <th scope="col" class="w-4/12 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Amount
      </th>
      <th scope="col" class="w-2/12 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Eur
      </th>
      <th scope="col" class="w-1/4 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Fee
      </th>
    </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="transaction in transactions" :key="transaction.id">
      <td class="px-4 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
        <router-link :to="`/transactions/${transaction.id}`" class="text-blue-500 break-words">
          {{ transaction.id }}
        </router-link>
      </td>
      <td class="px-4 py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ transaction.value }}
      </td>
      <td class="px-4 py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          &euro;127
        </span>
      </td>
      <td class="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ transaction.fee }} sat/vB
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
  }
}
</script>
