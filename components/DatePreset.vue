<script setup lang="ts">
const emit = defineEmits<{
  (event: 'change', preset: 'D' | 'W' | 'M' | 'Y'): void
}>()

const datePresets = ref<('D' | 'W' | 'M' | 'Y')[]>(['D', 'W', 'M', 'Y'])
const activePreset = ref(0)

watch(activePreset, (value) => {
  emit('change', datePresets.value[value])
})
</script>

<template>
  <div class="flex rounded-lg p-1 bg-dark-600">
    <button v-for="datePreset, index in datePresets" class="rounded-md px-5 py-2"
      :class="{ 'bg-dark-500': index === activePreset }" @click="activePreset = index">{{ datePreset }}</button>
  </div>
</template>