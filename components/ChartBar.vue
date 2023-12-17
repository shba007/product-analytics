<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import type { AggregatedData } from '~/pages/BarChart.vue';
import { format, parseISO } from 'date-fns'

const props = defineProps<{
  data: AggregatedData
}>()

const dataStore = useData()
const { filters } = storeToRefs(dataStore)
const date = toRef(() => filters.value.date)

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  scales: {
    x: {
      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: 1200,
      stepSize: 200,
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.2)',
        lineWidth: 2,
      },
      border: {
        dash: [7, 7],
      }
    },
  },
  elements: {
    bar: {
      borderRadius: 8,
    },
  },
  plugins: {
    legend: {
      display: false
    },
  },
  onClick: (event: any, activeElements: string | any[]) => {
    if (activeElements && activeElements.length > 0) {
      const barIndex = activeElements[0].index;
      handleBarClick(barIndex);
    }
  },
})

const total = computed(() => Object.values(props.data).reduce((acc, value) => acc + value, 0))
const average = computed(() => total.value / Object.values(props.data).length)

const chartData = computed(() => ({
  labels: Object.keys(props.data),
  datasets: [{
    axis: 'y',
    backgroundColor: '#3259E8',
    barThickness: 28,
    data: Object.values(props.data),
  }],
}))

function handleBarClick(barIndex: number) {
  console.log("bar Clicked", barIndex)
}
</script>

<template>
  <section class="rounded-xl p-9 bg-dark-500">
    <div class="grid grid-flow-col grid-cols-[auto_min-content] grid-rows-[repeat(3,min-content)] gap-y-4">
      <span class="block text-xl">Time Spent per Feature</span>
      <div class="flex items-end gap-3">
        <span class="block text-3xl">{{ total }}</span>
        <span>Unit Total Time Spent</span>
      </div>
      <Filters />
      <!-- <DatePreset @change="handleDateRangeChange" /> -->
      <div class="justify-self-end self-center whitespace-nowrap">
        <time :datetime="date.start">{{ format(parseISO(date.start), "d MMM") }}</time>
        -
        <time :datetime="date.end">{{ format(parseISO(date.end), "d MMM yyyy") }}</time>
      </div>
    </div>
    <div class="w-full aspect-[2]">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>