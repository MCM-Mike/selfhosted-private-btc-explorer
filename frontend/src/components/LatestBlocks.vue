<template>
  <div class="px-6 py-4 bg-white rounded-lg overflow-hidden">
    <h2 class="text-lg font-medium text-bitcoin-900 py-1">
      Latest Blocks
    </h2>

    <table class="table-fixed break-words w-full">
      <thead>
      <tr class="text-xs text-gray-400 uppercase tracking-wider">
        <th scope="col" class="w-2/12 py-3 font-medium text-left">
          Height
        </th>
        <th scope="col" class="w-4/12 py-3 font-medium text-left">
          Mined
        </th>
        <th scope="col" class="w-0 invisible md:visible md:w-4/12 py-3 font-medium text-right">
          TXs
        </th>
        <th scope="col" class="w-2/12 py-3 font-medium text-right">
          Size
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-100">
        <LatestBlocksEntry v-for="block in blocks" :key="block.height" :block="block" />
      </tbody>
    </table>
  </div>
</template>
<script>
import LatestBlocksEntry from "@/components/LatestBlocksEntry";

export default {
  name: 'BlockTimeline',
  components: {LatestBlocksEntry},
  props: {
    blocks: Array
  }
}
</script>
