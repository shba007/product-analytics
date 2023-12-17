<template>
  <div class="flex flex-col-reverse sm:flex-row sm:gap-5 w-screen h-screen ">
    <nav class="relative px-[18px] py-6 w-24 h-full bg-dark-500">
      <ul class="flex flex-col gap-5">
        <li class="rounded-lg p-3 bg-dark-400">
          <NuxtIcon name="bar-chart" class="text-[36px]" />
        </li>
        <li class="rounded-lg p-3 bg-dark-400">
          <NuxtIcon name="line-chart" class="text-[36px]" />
        </li>
      </ul>
    </nav>
    <div class="flex-grow py-8 px-4 sm:pl-0 overflow-y-auto">
      <slot />
    </div>
  </div>
</template>