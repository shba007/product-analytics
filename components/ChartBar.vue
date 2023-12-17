<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import type { AggregatedData } from '~/pages/BarChart.vue';
import { subDays, formatISO, format, parseISO } from 'date-fns'


const { data } = defineProps<{
  data: AggregatedData
}>()

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

const total = computed(() => Object.values(data).reduce((acc, value) => acc + value, 0))
const average = computed(() => total.value / Object.values(data).length)

const chartData = computed(() => ({
  labels: Object.keys(data),
  datasets: [{
    axis: 'y',
    backgroundColor: '#3259E8',
    barThickness: 28,
    data: Object.values(data),
  }],
}))

function handleBarClick(barIndex: number) {
  console.log("bar Clicked", barIndex)
}

const activeDateRange = ref({ start: formatISO(subDays(new Date(), 1), { format: 'basic' }), end: formatISO(new Date(), { format: 'basic' }) })

function handleDateRangeChange(preset: 'D' | 'W' | 'M' | 'Y') {
  const substractMap = {
    'D': 1,
    'W': 7,
    'M': 30,
    'Y': 365
  }
  activeDateRange.value.start = formatISO(subDays(new Date(), substractMap[preset]), { format: 'basic' })
}
</script>

<template>
  <section class="rounded-xl p-9 bg-dark-500">
    <div class="grid grid-flow-col grid-cols-[auto_min-content] grid-rows-3">
      <span class="block text-xl">Time Spent per Feature</span>
      <div class="flex items-end gap-3">
        <span class="block text-3xl">{{ total }}</span>
        <span>Unit Total Time Spent</span>
      </div>
      <div>Filters</div>
      <DatePreset @change="handleDateRangeChange" />
      <div class="justify-self-end self-center">
        <time :datetime="activeDateRange.start">{{ format(parseISO(activeDateRange.start), "d MMM") }}</time>
        -
        <time :datetime="activeDateRange.end">{{ format(parseISO(activeDateRange.end), "d MMM yyyy") }}</time>
      </div>
    </div>
    <div class="w-full aspect-[2]">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>