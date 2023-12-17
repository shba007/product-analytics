<script setup lang="ts">
const props = defineProps<{
  icon: string,
  name: string,
  options: string[],
  activeOptionIndex: number,
  isActive: boolean
}>()
const emit = defineEmits<{
  (event: 'dropdown'): void,
  (event: 'change', option: number): void
}>()
</script>

<template>
  <div class="relative capitalize">
    <div
      class="flex gap-2 rounded-full border border-primary-500 px-3 py-[6px] w-fit h-fit bg-primary-500/20 text-primary-500 cursor-pointer"
      @click="emit('dropdown')">
      <NuxtIcon name="hourglass" class="text-[24px]" />
      <span>{{ name }}:</span>
      <span>{{ options[activeOptionIndex] }}</span>
    </div>
    <ul v-if="isActive"
      class="flex flex-col gap-2 absolute -bottom-2 translate-y-full rounded-md  py-2 w-full bg-dark-400">
      <li v-for="option, index in options" class="cursor-pointer px-4"
        :class="{ 'bg-primary-500': index === activeOptionIndex }" @click="emit('change', index)">{{ option }}</li>
    </ul>
  </div>
</template>