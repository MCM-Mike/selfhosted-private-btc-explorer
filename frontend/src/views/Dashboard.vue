<template>
  <v-container>
    <v-row>
      <average-fees />
    </v-row>
  </v-container>
</template>

<script>
import AverageFees from "@/components/AverageFees";
export default {
  name: 'Dashboard',
  components: {
    AverageFees
  },
  data: () => ({
  }),
};
</script>

<style scoped>
</style>
