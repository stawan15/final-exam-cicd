<template>
  <div class="glass-card-hover p-5 animate-slide-up animate-delay-400">
    <div class="mb-5">
      <h3 class="text-lg font-semibold text-surface-100">Quick Actions</h3>
      <p class="text-sm text-surface-500 mt-0.5">Common shortcuts</p>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="action in actions"
        :key="action.name"
        class="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-surface-700/30 bg-surface-800/20 hover:bg-surface-800/50 hover:border-primary-500/30 hover:shadow-glow transition-all duration-300 group"
      >
        <span class="text-2xl group-hover:scale-110 transition-transform duration-300">{{ action.icon }}</span>
        <span class="text-xs font-medium text-surface-400 group-hover:text-surface-200 transition-colors">{{ action.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const actions = [
  { name: 'Send Payment', icon: '💸' },
  { name: 'Create Invoice', icon: '📄' },
  { name: 'Add Account', icon: '🏦' },
  { name: 'Export Report', icon: '📊' },
  { name: 'Set Budget', icon: '🎯' },
  { name: 'View Calendar', icon: '📅' },
]
</script>
