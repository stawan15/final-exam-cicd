<template>
  <div class="glass-card-hover p-5 animate-slide-up">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-surface-100">Revenue Overview</h3>
        <p class="text-sm text-surface-500 mt-0.5">Monthly revenue & expenses trend</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-for="period in periods"
          :key="period"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            activePeriod === period
              ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
              : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/60'
          ]"
          @click="activePeriod = period"
        >
          {{ period }}
        </button>
      </div>
    </div>
    <div class="h-72">
      <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const props = defineProps({
  data: Object,
})

const periods = ['7D', '1M', '3M', '1Y']
const activePeriod = ref('1Y')

const chartData = computed(() => {
  if (!props.data) return null

  return {
    labels: props.data.labels,
    datasets: [
      {
        label: 'Revenue',
        data: props.data.revenue,
        borderColor: '#6366f1',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 280)
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)')
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)')
          return gradient
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#6366f1',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Expenses',
        data: props.data.expenses,
        borderColor: '#8b5cf6',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 280)
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)')
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)')
          return gradient
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#8b5cf6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        color: '#94a3b8',
        usePointStyle: true,
        pointStyle: 'circle',
        font: { size: 12, family: 'Inter' },
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#e2e8f0',
      bodyColor: '#94a3b8',
      borderColor: '#334155',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      displayColors: true,
      callbacks: {
        label: (context) => ` ${context.dataset.label}: $${context.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(51, 65, 85, 0.3)',
        drawBorder: false,
      },
      ticks: {
        color: '#64748b',
        font: { size: 11, family: 'Inter' },
      },
    },
    y: {
      grid: {
        color: 'rgba(51, 65, 85, 0.3)',
        drawBorder: false,
      },
      ticks: {
        color: '#64748b',
        font: { size: 11, family: 'Inter' },
        callback: (value) => `$${(value / 1000).toFixed(0)}k`,
      },
    },
  },
}
</script>
