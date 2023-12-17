<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col-reverse sm:flex-row sm:gap-5 w-screen h-screen">
    <nav class="flex flex-row sm:flex-col gap-5 relative px-3 md:px-[18px] py-4 md:py-6 bg-dark-500">
      <NuxtLink to="/barchart" class="rounded-lg p-2 md:p-3" active-class="bg-dark-400">
        <NuxtIcon name="bar-chart" class="text-[28px] md:text-[36px]" />
      </NuxtLink>
      <NuxtLink to="/linechart" class="rounded-lg p-2 md:p-3" active-class="bg-dark-400">
        <NuxtIcon name="line-chart" class="text-[28px] md:text-[36px]" />
      </NuxtLink>
    </nav>
    <div class="flex-grow py-8 px-4 sm:pl-0 overflow-y-auto">
      <slot />
    </div>
  </div>
</template>