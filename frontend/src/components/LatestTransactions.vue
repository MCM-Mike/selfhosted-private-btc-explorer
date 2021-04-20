<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <h2 class="text-lg font-medium text-gray-900 px-4 py-5 border-b">Latest transactions</h2>

    <table class="divide-y divide-gray-200 table-fixed break-words" width="100%">
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
        <tr v-for="i in 10" :key="i">
          <td class="px-4 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
            <router-link to="/transactions/1" class="text-blue-500 break-words">d433bbe87785c5694c8fa2adbad5a29a279e24724b4b06fa8eec73cbad6d0527</router-link>
          </td>
          <td class="px-4 py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
            <div>0.01346589 BTC</div>
          </td>
          <td class="px-4 py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              &euro;127
            </span>
          </td>
          <td class="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
            107.0 sat/vB
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'LatestTransactions'
}
</script>
