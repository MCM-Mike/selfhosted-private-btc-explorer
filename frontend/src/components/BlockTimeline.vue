<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <h2 class="text-lg font-medium text-gray-900 px-4 py-5 border-b">
      Latest blocks
    </h2>

    <table class="divide-y divide-gray-200 table-fixed break-words" width="100%">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="w-2/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Height
          </th>
          <th scope="col" class="w-4/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Mined
          </th>
          <th scope="col" class="w-0 invisible md:visible md:w-4/12 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            TXs
          </th>
          <th scope="col" class="w-2/12 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Size
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="i in 10" :key="i">
          <td class="px-4 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
            <router-link to="/transactions/1" class="text-blue-500 break-words">
              679840
            </router-link>
          </td>
          <td class="px-4 py-4 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
            17 minutes ago
          </td>
          <td class="px-4 py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
            1712
          </td>
          <td class="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
            1.34 MB
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'BlockTimeline'
}
</script>
