<script setup lang="ts">
const dataStore = useData()
const { filters } = storeToRefs(dataStore)

const ageMap = {
  'all': 0,
  'teen': 1,
  'adult': 2,
}
const genderMap = {
  'all': 0,
  'male': 1,
  'female': 2,
}
const filtersLabel = ref([{
  icon: 'hourglass',
  name: 'age',
  options: ['all', '15-25', '>25'],
  activeOptionIndex: ageMap[filters.value.age],
  isActive: false
}, {
  icon: 'gender-male',
  name: 'gender',
  options: ['all', 'male', 'female'],
  activeOptionIndex: genderMap[filters.value.gender],
  isActive: false
}])

function handleDropDown(filterIndex: number) {
  filtersLabel.value[filterIndex].isActive = !filtersLabel.value[filterIndex].isActive
  if (filtersLabel.value[filterIndex].isActive)
    filtersLabel.value[(filterIndex + 1) % 2].isActive = !filtersLabel.value[filterIndex].isActive
}

function handleOptionChange(filterIndex: number, optionIndex: number) {
  filtersLabel.value[filterIndex].activeOptionIndex = optionIndex
  const ageMap = {
    'all': 'all',
    '15-25': 'teen',
    '>25': 'adult'
  }
  if (filtersLabel.value[filterIndex].name === 'age')
    // @ts-ignore
    filters.value[filtersLabel.value[filterIndex].name] = ageMap[filtersLabel.value[filterIndex].options[optionIndex]]
  else
    // @ts-ignore
    filters.value[filtersLabel.value[filterIndex].name] = filtersLabel.value[filterIndex].options[optionIndex]
}
</script>

<template>
  <div class="flex gap-4">
    <Filter v-for="{ icon, name, options, activeOptionIndex, isActive }, filterIndex in filtersLabel" :icon="icon"
      :name="name" :options="options" :active-option-index="activeOptionIndex" :is-active="isActive"
      @dropdown="handleDropDown(filterIndex)" @change="(event: number) => handleOptionChange(filterIndex, event)" />
  </div>
</template>