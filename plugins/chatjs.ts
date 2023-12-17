import { Chart, Title, Tooltip, Legend, PointElement, LineElement, BarElement, CategoryScale, LinearScale } from 'chart.js'

export default defineNuxtPlugin(() => {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)
})