import { addDays, subDays, formatISO } from 'date-fns'

function getData(): Promise<DataPoint[]> {
  return $fetch('/api/data', { method: 'GET' });
};


export const useData = defineStore('data', () => {
  const route = useRoute()
  const router = useRouter()

  const data = ref<DataPoint[]>([])
  const filters = reactive<Filters>({
    age: route.query.age ?? 'all',
    gender: route.query.gender ?? 'all',
    date: {
      start: route.query.start ?? formatISO(subDays(new Date(), 1000), { format: 'basic' }),
      end: route.query.end ?? formatISO(addDays(new Date(), 1), { format: 'basic' })
    }
  })

  watch(filters, (value, oldValue) => {
    router.push({ query: { age: value.age, gender: value.gender, start: value.date.start, end: value.date.end } })
  }, { deep: true })

  function handleDateRangeChange(preset: 'D' | 'W' | 'M' | 'Y') {
    const subtractMap = {
      'D': 1,
      'W': 7,
      'M': 30,
      'Y': 365
    }
    filters.date.start = formatISO(subDays(new Date(), subtractMap[preset]), { format: 'basic' })
  }

  onMounted(async () => {
    data.value = await getData()
  })

  return { data, filters, handleDateRangeChange }
})