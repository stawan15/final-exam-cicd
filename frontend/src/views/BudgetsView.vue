<template>
  <div class="h-full flex flex-col p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Budgets</h2>
        <p class="text-surface-400 text-sm">Control spending and hit your financial goals</p>
      </div>
      <button @click="isModalOpen = true" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors">
        Create Budget
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20 flex-1">
      <div class="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
    </div>

    <div v-else-if="budgets.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 content-start overflow-y-auto pr-2 custom-scrollbar">
      <div 
        v-for="budget in budgets" 
        :key="budget.id"
        :class="['glass-card p-6 border-t-4 transition-transform hover:-translate-y-1', getBorderColor(budget)]"
      >
        <div class="flex items-center justify-between mb-4">
           <h3 class="text-lg font-bold text-white">{{ budget.category }}</h3>
           <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-lg', getIconBg(budget)]">
             {{ getIcon(budget.category) }}
           </div>
        </div>
        
        <div class="flex items-end gap-2 mb-4">
          <span :class="['text-3xl font-bold', getTextColor(budget)]">
            ${{ parseFloat(budget.spent_amount).toLocaleString(undefined, { minimumFractionDigits: 0 }) }}
          </span>
          <span class="text-surface-400 text-sm mb-1">
            / ${{ parseFloat(budget.limit_amount).toLocaleString(undefined, { minimumFractionDigits: 0 }) }}
          </span>
        </div>

        <!-- Progress -->
        <div class="w-full h-2.5 bg-surface-800 rounded-full mb-2 overflow-hidden">
          <div 
            :class="['h-full rounded-full transition-all duration-1000', getProgressBarClass(budget)]" 
            :style="{ width: `${Math.min(getPercentage(budget), 100)}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-xs font-medium">
          <span class="text-surface-300">{{ getPercentage(budget).toFixed(1) }}% used · {{ formatMonth(budget.month) }}</span>
          <span :class="getStatusTextColor(budget)">
            {{ getStatusText(budget) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="glass-card flex-1 p-8 flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">No active budgets</h3>
      <p class="text-surface-400 max-w-sm mb-6">Create a budget to track spending limits for different categories.</p>
      <button @click="isModalOpen = true" class="px-4 py-2 bg-primary-600/20 text-primary-400 font-medium rounded-lg hover:bg-primary-600/30 transition-colors text-sm">
        Create Budget
      </button>
    </div>

    <!-- Create Budget Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
      <div class="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
        <div class="p-5 border-b border-surface-800 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">Create Budget</h3>
          <button @click="isModalOpen = false" class="text-surface-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form @submit.prevent="submitBudget" class="p-5 space-y-4">
          <div>
            <label class="block text-sm font-medium text-surface-300 mb-1.5">Category</label>
            <input v-model="form.category" required type="text" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="e.g. Marketing, Software, Office">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Monthly Limit ($)</label>
              <input v-model.number="form.limit_amount" required type="number" step="100" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Target Month</label>
              <input v-model="form.month" required type="month" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
            </div>
          </div>
          
          <div class="pt-4 flex gap-3">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2 border border-surface-700 hover:bg-surface-800 text-white rounded-xl transition-colors font-medium text-sm">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl shadow-glow transition-colors font-medium text-sm">
              {{ isSubmitting ? 'Saving...' : 'Set Budget' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { budgetService } from '../services/budgetService'

const budgets = ref([])
const isLoading = ref(true)
const isModalOpen = ref(false)
const isSubmitting = ref(false)

const form = ref({
  category: '',
  limit_amount: null,
  month: new Date().toISOString().slice(0, 7) // 'YYYY-MM'
})

onMounted(() => {
  fetchBudgets()
})

async function fetchBudgets() {
  isLoading.value = true
  try {
    budgets.value = await budgetService.getBudgets()
  } catch (error) {
    console.error('Failed to load budgets')
  } finally {
    isLoading.value = false
  }
}

async function submitBudget() {
  isSubmitting.value = true
  try {
    const newBudget = await budgetService.setBudget(form.value)
    budgets.value.unshift(newBudget)
    isModalOpen.value = false
    form.value = { category: '', limit_amount: null, month: new Date().toISOString().slice(0, 7) }
  } catch (error) {
    alert('Failed to set budget')
  } finally {
    isSubmitting.value = false
  }
}

// Visual Helpers
function getPercentage(budget) {
  if (budget.limit_amount == 0) return 0
  return (budget.spent_amount / budget.limit_amount) * 100
}

function getLevel(budget) {
  const p = getPercentage(budget)
  if (p >= 100) return 'danger'
  if (p >= 80) return 'warning'
  return 'safe'
}

function getBorderColor(budget) {
  const levels = { 'danger': 'border-t-accent-red', 'warning': 'border-t-orange-500', 'safe': 'border-t-primary-500' }
  return levels[getLevel(budget)]
}

function getProgressBarClass(budget) {
  const levels = { 
    'danger': 'bg-accent-red shadow-[0_0_10px_rgba(239,68,68,0.5)]', 
    'warning': 'bg-orange-500', 
    'safe': 'bg-primary-500' 
  }
  return levels[getLevel(budget)]
}

function getTextColor(budget) {
  return getLevel(budget) === 'danger' ? 'text-accent-red' : 'text-white'
}

function getStatusTextColor(budget) {
  const levels = { 'danger': 'text-accent-red font-bold', 'warning': 'text-orange-400', 'safe': 'text-accent-green' }
  return levels[getLevel(budget)]
}

function getStatusText(budget) {
  const levels = { 'danger': 'Over budget', 'warning': 'Nearing limit', 'safe': 'On track' }
  return levels[getLevel(budget)]
}

function getIcon(category) {
  const lower = category.toLowerCase()
  if (lower.includes('market') || lower.includes('ad')) return '📢'
  if (lower.includes('soft') || lower.includes('saas') || lower.includes('tech')) return '💻'
  if (lower.includes('office') || lower.includes('suppl')) return '📦'
  if (lower.includes('infra') || lower.includes('server')) return '☁️'
  if (lower.includes('travel') || lower.includes('flight')) return '✈️'
  return '💰'
}

function getIconBg(budget) {
  const levels = { 'danger': 'bg-accent-red/20 text-accent-red', 'warning': 'bg-orange-500/20 text-orange-400', 'safe': 'bg-primary-500/20 text-primary-400' }
  return levels[getLevel(budget)]
}

function formatMonth(monthStr) {
  if (!monthStr) return ''
  const [year, month] = monthStr.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleString('default', { month: 'short', year: 'numeric' })
}
</script>
