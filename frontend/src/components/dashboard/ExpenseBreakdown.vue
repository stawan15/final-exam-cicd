<template>
  <div class="glass-card-hover p-5 animate-slide-up animate-delay-200">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-surface-100">Expense Breakdown</h3>
      <p class="text-sm text-surface-500 mt-0.5">Category distribution</p>
    </div>
    <div class="flex items-center gap-6">
      <div class="w-44 h-44 flex-shrink-0">
        <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
      </div>
      <div class="flex-1 space-y-3">
        <div
          v-for="item in expenses"
          :key="item.category"
          class="flex items-center justify-between group"
        >
          <div class="flex items-center gap-2.5">
            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.color }"></div>
            <span class="text-sm text-surface-300 group-hover:text-white transition-colors">{{ item.category }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-surface-200">${{ item.amount.toLocaleString() }}</span>
            <span class="text-xs text-surface-500 w-8 text-right">{{ item.percentage }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

const props = defineProps({
  expenses: {
    type: Array,
    default: () => [],
  },
})

const chartData = computed(() => {
  if (!props.expenses.length) return null

  return {
    labels: props.expenses.map(e => e.category),
    datasets: [{
      data: props.expenses.map(e => e.amount),
      backgroundColor: props.expenses.map(e => e.color),
      borderColor: '#0f172a',
      borderWidth: 3,
      hoverBorderColor: '#1e293b',
      hoverOffset: 6,
    }],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#e2e8f0',
      bodyColor: '#94a3b8',
      borderColor: '#334155',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      callbacks: {
        label: (context) => ` $${context.raw.toLocaleString()}`,
      },
    },
  },
}
</script>
