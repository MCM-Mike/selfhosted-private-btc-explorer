<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <h2 class="text-lg font-medium text-gray-900 px-4 py-5 border-b">
      Latest blocks
    </h2>

    <BlockTable :blocks="blocks" />
  </div>
</template>
<script>
import BlockTable from "@/components/BlockTable";

export default {
  name: 'BlockTimeline',
  components: {BlockTable},
  props: {
    blocks: Array
  }
}
</script>
