<script setup lang="ts">
import { addDays, subDays, formatISO, isAfter, isBefore, parseISO } from 'date-fns'

export type Feature = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
export type AggregatedData = {
  [key in Feature]: number;
};
export interface DataPoint {
  date: string;
  age: 'teen' | 'adult';
  gender: 'male' | 'female';
  feature: AggregatedData
}

const data = ref<DataPoint[]>([{
  date: new Date().toISOString(), age: 'teen', gender: 'male', feature: {
    A: 65,
    B: 317,
    C: 909,
    D: 804,
    E: 556,
    F: 934,
  }
}, {
  date: new Date().toISOString(), age: 'adult', gender: 'male', feature: {
    A: 637,
    B: 778,
    C: 576,
    D: 435,
    E: 596,
    F: 451,
  },
},])

export interface Filters {
  age: 'all' | 'teen' | 'adult'
  gender: 'all' | 'male' | 'female'
  date: {
    start: string,
    end: string
  }
}

const filters = ref<Filters>({
  age: 'all',
  gender: 'male',
  date: {
    start: formatISO(subDays(new Date(), 1), { format: 'basic' }),
    end: formatISO(addDays(new Date(), 1), { format: 'basic' })
  }
})

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