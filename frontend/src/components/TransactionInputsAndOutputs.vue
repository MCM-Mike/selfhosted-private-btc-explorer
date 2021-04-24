<template>
  <div class="grid grid-cols-2 divide-x">
    <dl>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 whitespace-nowrap inline-flex items-center">
          Newly generated coins
          <span class="pl-3 text-red-700">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                    fill-rule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path><path fill-rule="evenodd"
                                                     d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                                     clip-rule="evenodd"></path></svg>
              </span>
        </dt>
        <dd class="mt-1 text-sm text-right text-gray-900 sm:mt-0 sm:col-span-2">
          0.00030900 BTC
        </dd>
      </div>
    </dl>
    <dl>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          0.00030900 BTC
        </dt>
        <dd class="mt-1 text-sm text-right text-blue-500 sm:mt-0 sm:col-span-2 inline-flex items-center">
              <span class="pr-3 text-green-700">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                    fill-rule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path><path fill-rule="evenodd"
                                                     d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                                     clip-rule="evenodd"></path></svg>
              </span>
          <p class="truncate">
            3LVVE1rXCp4YTGqP7XJi4Vz7kS9BEk2S7t
          </p>
        </dd>
      </div>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'TransactionInputsAndOutputs',
  props: {
    transaction: Object
  }
}
</script>
