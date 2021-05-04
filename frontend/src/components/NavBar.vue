<template>
  <nav class="bg-bitcoin-500">
    <div class="lg:w-4/5 mx-auto px-2 sm:px-4 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex items-center px-2 lg:px-0">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clip-rule="evenodd"></path></svg>
          </div>
          <div class="hidden lg:block lg:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link to="/dashboard" class="nav-link px-3 py-2 rounded-md text-sm font-medium">Dashboard</router-link>
              <router-link to="/blocks" class="nav-link px-3 py-2 rounded-md text-sm font-medium">Blocks</router-link>
              <router-link to="/mempool" class="nav-link px-3 py-2 rounded-md text-sm font-medium">Mempool</router-link>
            </div>
          </div>
        </div>
        <Search/>
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <button @click="navOpenend = !navOpenend" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!--
              Icon when menu is closed.

              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg :class="[navOpenend ? 'hidden' : 'block']" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!--
              Icon when menu is open.

              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg :class="[navOpenend ? 'block' : 'hidden']" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-show="navOpenend" class="lg:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <router-link to="/dashboard" class="mobile-nav block px-3 py-2 rounded-md text-base font-medium">Dashboard</router-link>
        <router-link to="/blocks" class="mobile-nav block px-3 py-2 rounded-md text-base font-medium">Blocks</router-link>
        <router-link to="/mempool" class="mobile-nav block px-3 py-2 rounded-md text-base font-medium">Mempool</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Search from "@/components/Search";

export default {
  name: "NavBar",
  components: {Search},
  data: () => ({
    navOpenend: false,
  })
}
</script>

<style scoped>
.nav-link:not(.router-link-active) {
  @apply text-white font-bold hover:bg-bitcoin-600 hover:text-white;
}
.nav-link.router-link-active {
  @apply bg-bitcoin-600 text-white;
}

.mobile-nav:not(.router-link-active) {
  @apply text-gray-300 hover:bg-gray-700 hover:text-white;
}
.mobile-nav.router-link-active {
  @apply bg-gray-900 text-white;
}
</style>
