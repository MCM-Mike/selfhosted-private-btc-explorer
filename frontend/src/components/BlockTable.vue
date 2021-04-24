<template>
  <table class="divide-y divide-gray-200 table-fixed break-words w-full">
    <thead class="bg-gray-50">
    <tr>
      <th scope="col" class="w-2/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Height
      </th>
      <th scope="col" class="w-4/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Mined
      </th>
      <th scope="col"
          class="w-0 invisible md:visible md:w-4/12 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        TXs
      </th>
      <th scope="col" class="w-2/12 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Size
      </th>
    </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="block in blocks" :key="block.height">
      <td class="px-4 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
        <router-link :to="`/blocks/${block.hash}`" class="text-blue-500 break-words">
          {{ block.height }}
        </router-link>
      </td>
      <td class="px-4 py-4 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ timeSince(new  Date(block.time * 1000)) }} ago
      </td>
      <td class="px-4 py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ block.tx.length }}
      </td>
      <td class="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ fileSize(block.size) }}
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'BlockTable',
  props: {
    blocks: Array
  },
  methods: {
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  }
}
</script>
