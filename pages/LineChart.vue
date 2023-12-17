<script setup lang="ts">
import { parseISO, isAfter, isBefore } from 'date-fns'

export type AggregatedData = {
  [key: string]: number;
};

const dataStore = useData()
const { data, filters } = storeToRefs(dataStore)

const selectedFeature = ref<Feature>('A')

const aggregatedData = computed<AggregatedData>(() => data.value.reduce((acc, value) => {
  const ageFilter = filters.value.age === 'all' || filters.value.age === value.age
  const genderFilter = filters.value.gender === 'all' || filters.value.gender === value.gender
  const dateFilter = isAfter(parseISO(value.date), parseISO(filters.value.date.start)) && isBefore(parseISO(value.date), parseISO(filters.value.date.end))

  if (ageFilter && genderFilter && dateFilter) {
    if (acc[value.date] === undefined)
      acc[value.date] = 0

    acc[value.date] += value.feature[selectedFeature.value]
  }
  return acc
}, {} as AggregatedData))
</script>

<template>
  <main>
    <ChartLine :data="aggregatedData" />
  </main>
</template>