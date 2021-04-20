<template>
  <v-row>
    <v-col class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <v-card
          rounded="lg"
          elevation="1"
          color="white"
      >
        <dt class="text-sm font-medium text-gray-500 truncate">
          Low priority
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          37 sat/vB ($2.88)
        </dd>
      </v-card>
    </v-col>

    <v-col class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <dt class="text-sm font-medium text-gray-500 truncate">
        Medium priority
      </dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        65 sat/vB ($5.05)
      </dd>
    </v-col>

    <v-col class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <dt class="text-sm font-medium text-gray-500 truncate">
        High priority
      </dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        72 sat/vB ($5.60)
      </dd>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'AverageFees'
}
</script>
