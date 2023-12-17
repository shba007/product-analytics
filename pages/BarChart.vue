<script setup lang="ts">
import { isAfter, isBefore, parseISO } from 'date-fns'

export type AggregatedData = {
  [key in Feature]: number;
};

const dataStore = useData()
const { data, filters } = storeToRefs(dataStore)

const aggregatedData = computed<AggregatedData>(() => data.value.reduce((acc, value) => {
  const ageFilter = filters.value.age === 'all' || filters.value.age === value.age
  const genderFilter = filters.value.gender === 'all' || filters.value.gender === value.gender
  const dateFilter = isAfter(parseISO(value.date), parseISO(filters.value.date.start)) && isBefore(parseISO(value.date), parseISO(filters.value.date.end))

  if (ageFilter && genderFilter && dateFilter) {
    acc.A += value.feature.A
    acc.B += value.feature.B
    acc.C += value.feature.C
    acc.D += value.feature.D
    acc.E += value.feature.E
    acc.F += value.feature.F
  }
  return acc
}, {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
}))
</script>

<template>
  <main class="grid grid-rows-[auto_min-content] md:grid-rows-1 grid-cols-7 gap-8">
    <ChartBar class="col-span-7 md:col-span-5" :data="aggregatedData" />
    <Calender class="col-span-7 md:col-span-2" />
  </main>
</template>