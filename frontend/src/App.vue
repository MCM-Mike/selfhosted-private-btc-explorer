<template>
  <div>
    <nav-bar />
    <main class="w-11/12 xl:w-3/4 mx-auto my-4" style="max-width: 1140px">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: 'App',
  components: {
    NavBar
  },
};
</script>

<style>
html {
  font-family: 'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  @apply bg-gray-200;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
