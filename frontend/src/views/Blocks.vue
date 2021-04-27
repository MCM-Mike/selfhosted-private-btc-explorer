<template>
  <div class="bg-white shadow overflow-hidden rounded-lg px-4 py-5 relative">
    <div v-if="isLoading" class="loading flex justify-center items-center">
      <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <h2 class="text-lg font-medium text-gray-900">Blocks</h2>
    <BlockTable :blocks="blocks" :fixed="false" />
    <Pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total-results="totalBlockCount"
        :total-pages="Math.ceil(totalBlockCount / pageSize)"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import BlockTable from "@/components/BlockTable";
import socket from '../plugins/socket.io'

export default {
  name: "Blocks",
  components: {BlockTable, Pagination},
  created() {
    socket.emit('getLatestBlocksOffset', 0);
    socket.emit('getBlockCount');
  },
  beforeMount() {
    socket.on('latestBlocksOffset', (data) => {
      this.blocks = data;
      this.isLoading = false;
    });
    socket.on('blockCount', (data) => {
      this.totalBlockCount = data;
    });
  },
  data: () => ({
    isLoading: true,
    currentPage: 1,
    totalBlockCount: 0,
    blocks: [],
    pageSize: 20,
  }),
  watch: {
    currentPage(page) {
      this.isLoading = true;
      socket.emit('getLatestBlocksOffset', (page * this.pageSize) - this.pageSize);
    }
  }
}
</script>

<style scoped>
.loading {
  @apply absolute inset-0 bg-gray-800 opacity-30 w-full h-full z-40
}
</style>
