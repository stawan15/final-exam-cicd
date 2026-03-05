<template>
  <div class="h-full flex flex-col p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Analytics Overview</h2>
        <p class="text-surface-400 text-sm">Deep dive into your financial metrics</p>
      </div>
      <div class="glass-card px-4 py-2 flex items-center gap-2">
        <span class="text-sm text-surface-300">Date Range:</span>
        <select class="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="kpi in kpis" :key="kpi.label" class="glass-card p-5 group hover:-translate-y-1 transition-all duration-300">
        <div class="text-surface-400 text-sm font-medium mb-2">{{ kpi.label }}</div>
        <div class="flex items-end justify-between">
          <div class="text-2xl font-bold text-white">{{ kpi.value }}</div>
          <div :class="['text-sm font-medium flex items-center', kpi.trend >= 0 ? 'text-accent-green' : 'text-accent-red']">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="kpi.trend >= 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>
            {{ Math.abs(kpi.trend) }}%
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Placeholder -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[400px]">
      <div class="glass-card p-6 flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center mb-4">
          <span class="text-2xl">📈</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Growth Trends</h3>
        <p class="text-surface-400 text-sm max-w-xs">Detailed monthly breakdown of user acquisition and revenue scaling.</p>
        <button class="mt-4 px-4 py-2 bg-primary-600/20 text-primary-400 rounded-lg text-sm font-medium hover:bg-primary-600/30 transition-colors">
          Configure Chart
        </button>
      </div>
      <div class="glass-card p-6 flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center mb-4">
          <span class="text-2xl">🗺️</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Geographic Distribution</h3>
        <p class="text-surface-400 text-sm max-w-xs">Revenue mapping by region and country over time.</p>
        <button class="mt-4 px-4 py-2 bg-primary-600/20 text-primary-400 rounded-lg text-sm font-medium hover:bg-primary-600/30 transition-colors">
          View Map Map
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const kpis = [
  { label: 'Customer Acquisition Cost', value: '$42.50', trend: -12.4 },
  { label: 'Lifetime Value (LTV)', value: '$1,240', trend: 8.2 },
  { label: 'Churn Rate', value: '2.4%', trend: -0.5 },
  { label: 'MRR Growth', value: '$14,200', trend: 15.3 },
]
</script>
