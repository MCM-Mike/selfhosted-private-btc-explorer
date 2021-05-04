<template>
  <tr>
    <td class="py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
      <router-link :to="`/blocks/${block.hash}`" class="text-bitcoin-500 font-bold break-words">
        {{ block.height }}
      </router-link>
    </td>
    <td class="py-4 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
      {{ timeSince(new  Date(block.time * 1000)) }} ago
    </td>
    <td class="py-4 text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
      {{ block.tx.length }}
    </td>
    <td class="py-4 text-right text-sm text-bitcoin-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
      {{ fileSize(block.size) }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "LatestBlocksEntry",
  props: ['block']
}
</script>

<style scoped>

</style>
