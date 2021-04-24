<template>
  <div class="bg-white shadow overflow-hidden rounded-lg px-4 py-5">
    <h2 class="text-lg font-medium text-gray-900">Blocks</h2>
    <BlockTable :blocks="blocks" :fixed="false" />
    <Pagination :current-page.sync="currentPage" :total-pages="100" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import BlockTable from "@/components/BlockTable";

export default {
  name: "Blocks",
  components: {BlockTable, Pagination},
  data: () => ({
    currentPage: 96,
    blocks: [
      {
        id: 1000,
        numTransactions: 1727,
        bytes: 15000
      },
      {
        id: 1000,
        numTransactions: 1727,
        bytes: 15000
      },
      {
        id: 1000,
        numTransactions: 1727,
        bytes: 15000
      },
      {
        id: 1000,
        numTransactions: 1727,
        bytes: 15000
      },
      {
        id: 1000,
        numTransactions: 1727,
        bytes: 15000
      },{
        id: 1000,
        numTransactions: 1727,
        bytes: 15000
      },{
        id: 1000,
        numTransactions: 1727,
        bytes: 15000
      },
      {
        id: 1000,
        numTransactions: 1727,
        bytes: 15000
      },
    ]
  })
}
</script>
