<template>
  <div class="h-full flex flex-col p-6 space-y-6">
    <div class="flex items-center justify-between mb-2">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Investments</h2>
        <p class="text-surface-400 text-sm">Track your portfolio performance and market trends</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-surface-800 hover:bg-surface-700 text-white text-sm font-medium rounded-xl transition-colors border border-surface-700 hidden sm:block">
          Deposit
        </button>
        <button @click="isModalOpen = true" class="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors">
          Trade Asset
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20 flex-1">
      <div class="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
    </div>

    <template v-else-if="investments.length > 0">
      <!-- Portfolio Summary -->
      <div class="glass-card p-6 mb-2">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div class="text-surface-400 text-sm font-medium mb-1">Total Portfolio Value</div>
            <div class="text-3xl font-bold text-white mb-2">${{ parseFloat(totalValue).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
            <div class="text-sm font-medium text-accent-green flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              +$12,450.00 (1.5%) Today
            </div>
          </div>
          <div class="hidden md:block w-px h-full bg-surface-800 mx-auto"></div>
          <div class="col-span-1 md:col-span-1 flex items-center gap-4">
             <div class="w-1/2">
               <div class="text-surface-400 text-xs mb-1">Stocks & ETFs</div>
               <div class="text-white font-medium">${{ parseFloat(stocksValue).toLocaleString(undefined, { minimumFractionDigits: 0 }) }}</div>
               <div class="w-full h-1.5 bg-surface-800 rounded-full mt-2 overflow-hidden">
                  <div class="h-full bg-primary-500 rounded-full" :style="{ width: `${stocksPercentage}%` }"></div>
               </div>
             </div>
             <div class="w-1/2">
               <div class="text-surface-400 text-xs mb-1">Crypto</div>
               <div class="text-white font-medium">${{ parseFloat(cryptoValue).toLocaleString(undefined, { minimumFractionDigits: 0 }) }}</div>
               <div class="w-full h-1.5 bg-surface-800 rounded-full mt-2 overflow-hidden">
                  <div class="h-full bg-purple-500 rounded-full" :style="{ width: `${cryptoPercentage}%` }"></div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Asset List -->
      <h3 class="text-lg font-bold text-white mb-2">Your Assets</h3>
      <div class="glass-card flex-1 overflow-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-surface-800/50 bg-surface-900/50">
              <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Asset</th>
              <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Price (Avg)</th>
              <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Holdings</th>
              <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider text-right">Total Value</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-800/50 text-sm">
            <tr v-for="asset in investments" :key="asset.id" class="hover:bg-surface-800/30 transition-colors group cursor-pointer">
              <td class="p-4 flex items-center gap-3">
                <div :class="['w-8 h-8 rounded-full flex items-center justify-center p-1.5', getIconBg(asset.type)]">
                  <div class="text-lg">{{ getIconForAsset(asset) }}</div>
                </div>
                <div>
                  <div class="font-medium text-white">{{ asset.name }}</div>
                  <div class="text-xs text-surface-500">{{ asset.symbol }}</div>
                </div>
              </td>
              <td class="p-4 font-mono text-surface-200">
                ${{ parseFloat(asset.current_price).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
                <div class="text-xs text-surface-500 mt-0.5">Avg: ${{ parseFloat(asset.avg_price).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
              </td>
              <td class="p-4 font-mono text-surface-200">{{ parseFloat(asset.shares).toLocaleString() }}</td>
              <td class="p-4 font-mono font-medium text-white text-right">${{ (parseFloat(asset.shares) * parseFloat(asset.current_price)).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Empty State -->
    <div v-else class="glass-card flex-1 p-8 flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">No active investments</h3>
      <p class="text-surface-400 max-w-sm mb-6">Build your wealth by trading stocks, ETFs, and cryptocurrencies.</p>
      <button @click="isModalOpen = true" class="px-4 py-2 bg-primary-600/20 text-primary-400 font-medium rounded-lg hover:bg-primary-600/30 transition-colors text-sm">
        Trade Asset
      </button>
    </div>

    <!-- Trade Asset Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
      <div class="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
        <div class="p-5 border-b border-surface-800 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">Trade Asset</h3>
          <button @click="isModalOpen = false" class="text-surface-400 hover:text-white transition-colors">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form @submit.prevent="submitInvestment" class="p-5 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Ticker Symbol</label>
              <input v-model="form.symbol" required type="text" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors uppercase" placeholder="AAPL">
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Asset Type</label>
              <select v-model="form.type" required class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option value="Stock">Stock</option>
                <option value="ETF">ETF</option>
                <option value="Crypto">Crypto</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-surface-300 mb-1.5">Company / Asset Name</label>
            <input v-model="form.name" required type="text" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Apple Inc.">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Shares / Quantity</label>
              <input v-model.number="form.shares" required type="number" step="0.001" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Avg Price ($)</label>
              <input v-model.number="form.avg_price" required type="number" step="0.01" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="0.00">
            </div>
          </div>
          
          <div class="pt-4 flex gap-3">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2 border border-surface-700 hover:bg-surface-800 text-white rounded-xl transition-colors font-medium text-sm">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl shadow-glow transition-colors font-medium text-sm">
              {{ isSubmitting ? 'Confirming...' : 'Confirm Trade' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { investmentService } from '../services/investmentService'

const investments = ref([])
const isLoading = ref(true)
const isModalOpen = ref(false)
const isSubmitting = ref(false)

const form = ref({
  symbol: '',
  name: '',
  type: 'Stock',
  shares: null,
  avg_price: null
})

onMounted(() => {
  fetchInvestments()
})

async function fetchInvestments() {
  isLoading.value = true
  try {
    investments.value = await investmentService.getInvestments()
  } catch (error) {
    console.error('Failed to load investments')
  } finally {
    isLoading.value = false
  }
}

async function submitInvestment() {
  isSubmitting.value = true
  try {
    const newAsset = await investmentService.addInvestment({
      ...form.value,
      current_price: form.value.avg_price // Dummy logic: market price = avg price on buy
    })
    investments.value.unshift(newAsset)
    isModalOpen.value = false
    form.value = { symbol: '', name: '', type: 'Stock', shares: null, avg_price: null }
  } catch (error) {
    alert('Failed to add investment')
  } finally {
    isSubmitting.value = false
  }
}

// Stats
const totalValue = computed(() => {
  return investments.value.reduce((sum, i) => sum + (parseFloat(i.shares) * parseFloat(i.current_price)), 0)
})

const stocksValue = computed(() => {
  return investments.value
    .filter(i => i.type === 'Stock' || i.type === 'ETF')
    .reduce((sum, i) => sum + (parseFloat(i.shares) * parseFloat(i.current_price)), 0)
})

const cryptoValue = computed(() => {
  return investments.value
    .filter(i => i.type === 'Crypto')
    .reduce((sum, i) => sum + (parseFloat(i.shares) * parseFloat(i.current_price)), 0)
})

const stocksPercentage = computed(() => {
  if (totalValue.value === 0) return 0
  return (stocksValue.value / totalValue.value) * 100
})

const cryptoPercentage = computed(() => {
  if (totalValue.value === 0) return 0
  return (cryptoValue.value / totalValue.value) * 100
})

// Visuals
function getIconForAsset(asset) {
  if (asset.symbol.toLowerCase() === 'btc') return '₿'
  if (asset.symbol.toLowerCase() === 'eth') return 'Ξ'
  if (asset.type === 'Stock') return '📈'
  if (asset.type === 'Crypto') return '🪙'
  return '📉'
}

function getIconBg(type) {
  if (type === 'Crypto') return 'bg-[#F7931A]/20'
  if (type === 'ETF') return 'bg-[#00A8E1]/20'
  return 'bg-white/20'
}
</script>
