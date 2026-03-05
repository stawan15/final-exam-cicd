<template>
  <div class="glass-card-hover p-5 animate-slide-up animate-delay-100">
    <div class="flex items-center justify-between mb-5">
      <div>
        <h3 class="text-lg font-semibold text-surface-100">Recent Transactions</h3>
        <p class="text-sm text-surface-500 mt-0.5">Latest financial activity</p>
      </div>
      <button class="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors">
        View All →
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full" id="transactions-table">
        <thead>
          <tr class="border-b border-surface-800/50">
            <th class="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-surface-500">Transaction</th>
            <th class="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-surface-500">Category</th>
            <th class="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-surface-500">Amount</th>
            <th class="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wider text-surface-500">Status</th>
            <th class="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-surface-500">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tx in transactions"
            :key="tx.id"
            class="border-b border-surface-800/30 hover:bg-surface-800/20 transition-colors group"
          >
            <td class="py-3.5 px-2">
              <div class="flex items-center gap-3">
                <span class="text-lg">{{ tx.icon }}</span>
                <span class="text-sm font-medium text-surface-200 group-hover:text-white transition-colors">{{ tx.name }}</span>
              </div>
            </td>
            <td class="py-3.5 px-2">
              <span class="text-sm text-surface-400">{{ tx.category }}</span>
            </td>
            <td class="py-3.5 px-2 text-right">
              <span :class="[
                'text-sm font-semibold',
                tx.amount >= 0 ? 'text-emerald-400' : 'text-red-400'
              ]">
                {{ tx.amount >= 0 ? '+' : '' }}${{ Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
              </span>
            </td>
            <td class="py-3.5 px-2 text-center">
              <span :class="statusClass(tx.status)">
                {{ tx.status }}
              </span>
            </td>
            <td class="py-3.5 px-2 text-right">
              <span class="text-sm text-surface-500">{{ formatDate(tx.date) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})

function statusClass(status) {
  const map = {
    completed: 'badge-success',
    pending: 'badge-warning',
    processing: 'badge-info',
    failed: 'badge-danger',
  }
  return map[status] || 'badge-info'
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>
