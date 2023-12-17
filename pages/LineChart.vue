<script setup lang="ts">
import type { DataPoint, Feature, Filters } from './BarChart.vue';
import { addDays, subDays, formatISO, parseISO, isAfter, isBefore } from 'date-fns'

export type AggregatedData = {
  [key: string]: number;
};

const data = ref<DataPoint[]>([{
  date: subDays(new Date(), 1).toISOString(), age: 'teen', gender: 'male', feature: {
    A: 65,
    B: 317,
    C: 909,
    D: 804,
    E: 556,
    F: 934,
  }
}, {
  date: new Date().toISOString(), age: 'teen', gender: 'female', feature: {
    A: 100,
    B: 317,
    C: 909,
    D: 804,
    E: 556,
    F: 934,
  }
}, {
  date: addDays(new Date(), 1).toISOString(), age: 'adult', gender: 'male', feature: {
    A: 637,
    B: 778,
    C: 576,
    D: 435,
    E: 596,
    F: 451,
  },
},])

const filters = ref<Filters>({
  age: 'all',
  gender: 'all',
  date: {
    start: formatISO(subDays(new Date(), 1), { format: 'basic' }),
    end: formatISO(addDays(new Date(), 2), { format: 'basic' })
  }
})
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