<template>
  <div class="h-full flex flex-col p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Transactions</h2>
        <p class="text-surface-400 text-sm">Manage and filter all your financial activity</p>
      </div>
      <button @click="isModalOpen = true" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        New Transaction
      </button>
    </div>

    <div class="glass-card flex-1 flex flex-col overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 border-b border-surface-800/50 flex flex-wrap gap-4 items-center justify-between">
        <div class="flex items-center gap-2 flex-1 min-w-[300px]">
          <div class="relative w-full max-w-md">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input v-model="searchQuery" type="text" placeholder="Search by name or category..." class="w-full pl-9 pr-4 py-2 bg-surface-900/50 border border-surface-700/50 rounded-lg text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500/50">
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-2 bg-surface-800 hover:bg-surface-700 text-surface-200 text-sm font-medium rounded-lg transition-colors border border-surface-700 font-mono">
            Export CSV
          </button>
          <button class="px-3 py-2 bg-surface-800 hover:bg-surface-700 text-surface-200 text-sm font-medium rounded-lg transition-colors border border-surface-700 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filter
          </button>
        </div>
      </div>

      <!-- Import the existing component, passing a prop to show more -->
      <div class="flex-1 overflow-auto p-4">
        <TransactionTable :transactions="filteredTransactions" />
      </div>
      
      <!-- Pagination -->
      <div class="p-4 border-t border-surface-800/50 flex items-center justify-between text-sm text-surface-400">
        <div>Showing 1 to 10 of 142 entries</div>
        <div class="flex items-center gap-2">
          <button class="p-1.5 rounded-lg hover:bg-surface-800 disabled:opacity-50"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
          <button class="w-8 h-8 rounded-lg bg-primary-600 text-white font-medium flex items-center justify-center">1</button>
          <button class="w-8 h-8 rounded-lg hover:bg-surface-800 text-surface-300 font-medium flex items-center justify-center">2</button>
          <button class="w-8 h-8 rounded-lg hover:bg-surface-800 text-surface-300 font-medium flex items-center justify-center">3</button>
          <span>...</span>
          <button class="p-1.5 rounded-lg hover:bg-surface-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
        </div>
      </div>
    </div>

    <!-- New Transaction Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
      <div class="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
        <div class="p-5 border-b border-surface-800 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">New Transaction</h3>
          <button @click="isModalOpen = false" class="text-surface-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form @submit.prevent="submitTransaction" class="p-5 space-y-4">
          <div>
            <label class="block text-sm font-medium text-surface-300 mb-1.5">Description / Name</label>
            <input v-model="form.name" required type="text" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="e.g. AWS Invoice">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Amount ($)</label>
              <input v-model.number="form.amount" required type="number" step="0.01" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="0.00">
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Category</label>
              <select v-model="form.category" required class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option value="Revenue">Revenue</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Status</label>
              <select v-model="form.status" required class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Date</label>
              <input v-model="form.date" required type="date" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
            </div>
          </div>
          <div class="pt-4 flex gap-3">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2 border border-surface-700 hover:bg-surface-800 text-white rounded-xl transition-colors font-medium text-sm">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl shadow-glow transition-colors font-medium text-sm">
              {{ isSubmitting ? 'Saving...' : 'Save Transaction' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TransactionTable from '../components/dashboard/TransactionTable.vue'
import { useDashboardStore } from '../stores/dashboard'
import { dashboardService } from '../services/dashboardService'

const dashboard = useDashboardStore()
const searchQuery = ref('')
const isModalOpen = ref(false)
const isSubmitting = ref(false)

const form = ref({
  name: '',
  amount: null,
  category: 'Revenue',
  status: 'completed',
  date: new Date().toISOString().split('T')[0]
})

onMounted(() => {
  if (!dashboard.transactions.length) {
    dashboard.fetchAllData()
  }
})

const filteredTransactions = computed(() => {
  let txs = dashboard.transactions || []
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    txs = txs.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
  }
  return txs
})

async function submitTransaction() {
  isSubmitting.value = true
  try {
    const iconMap = { 'Revenue': '💰', 'Infrastructure': '☁️', 'Marketing': '📢', 'Operations': '📦', 'Other': '📝'}
    await dashboardService.createTransaction({
      ...form.value,
      icon: iconMap[form.value.category] || '💰'
    })
    isModalOpen.value = false
    // Refetch data to show the new transaction
    await dashboard.fetchAllData()
    // Reset form
    form.value = {
      name: '',
      amount: null,
      category: 'Revenue',
      status: 'completed',
      date: new Date().toISOString().split('T')[0]
    }
  } catch (error) {
    alert('Failed to create transaction')
  } finally {
    isSubmitting.value = false
  }
}
</script>
