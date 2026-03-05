<template>
  <div class="h-full p-6 space-y-6">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Bank Accounts</h2>
        <p class="text-surface-400 text-sm">Manage your connected bank and wallet accounts</p>
      </div>
      <button @click="isModalOpen = true" class="px-4 py-2.5 bg-surface-800 hover:bg-surface-700 text-white text-sm font-medium rounded-xl transition-colors border border-surface-700 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
        Link Account
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Account Cards -->
      <div 
        v-for="account in accounts" 
        :key="account.id"
        class="glass-card p-6 relative overflow-hidden group hover:border-primary-500/50 transition-colors"
      >
        <div class="absolute top-0 right-0 p-4">
          <span :class="['w-3 h-3 rounded-full inline-block shadow-glow', account.status === 'active' ? 'bg-accent-green' : 'bg-surface-500']"></span>
        </div>
        <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl', getIconBg(account.type)]">
          {{ getIcon(account.type) }}
        </div>
        <h3 class="text-lg font-bold text-white mb-1">{{ account.name }}</h3>
        <p class="text-surface-400 text-sm font-mono mb-6">
          {{ account.number_last4 && account.number_last4 !== 'N/A' ? `**** **** **** ${account.number_last4}` : account.type }}
        </p>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-xs text-surface-500 mb-1">Available Balance</div>
            <div class="text-2xl font-bold text-white">${{ parseFloat(account.balance).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
          </div>
          <button @click="deleteAccount(account.id)" class="text-surface-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-surface-800" title="Remove Account">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>

       <!-- Add New Button -->
       <div @click="isModalOpen = true" class="glass-card p-6 border border-dashed border-surface-700 bg-surface-900/20 hover:bg-surface-800/40 hover:border-surface-600 transition-all cursor-pointer flex flex-col items-center justify-center text-center min-h-[220px] group">
        <div class="w-12 h-12 rounded-full border-2 border-dashed border-surface-600 flex items-center justify-center text-surface-400 mb-4 group-hover:border-primary-500 group-hover:text-primary-500 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </div>
        <h3 class="text-white font-medium mb-1 group-hover:text-primary-400 transition-colors">Add New Account</h3>
        <p class="text-surface-500 text-sm">Connect another bank or wallet</p>
      </div>
    </div>

    <!-- Link Account Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
      <div class="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
        <div class="p-5 border-b border-surface-800 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">Link Account</h3>
          <button @click="isModalOpen = false" class="text-surface-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form @submit.prevent="submitAccount" class="p-5 space-y-4">
          <div>
            <label class="block text-sm font-medium text-surface-300 mb-1.5">Institution Name</label>
            <input v-model="form.name" required type="text" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="e.g. Chase Bank">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Account Type</label>
              <select v-model="form.type" required class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
                <option value="Wallet">Wallet / App</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Last 4 Digits</label>
              <input v-model="form.number_last4" type="text" maxlength="4" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="e.g. 1234">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-surface-300 mb-1.5">Current Balance ($)</label>
            <input v-model.number="form.balance" required type="number" step="0.01" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="0.00">
          </div>
          
          <div class="pt-4 flex gap-3">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2 border border-surface-700 hover:bg-surface-800 text-white rounded-xl transition-colors font-medium text-sm">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl shadow-glow transition-colors font-medium text-sm">
              {{ isSubmitting ? 'Linking...' : 'Link Account' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { accountService } from '../services/accountService'

const accounts = ref([])
const isLoading = ref(true)
const isModalOpen = ref(false)
const isSubmitting = ref(false)

const form = ref({
  name: '',
  type: 'Checking',
  number_last4: '',
  balance: null
})

onMounted(() => {
  fetchAccounts()
})

async function fetchAccounts() {
  isLoading.value = true
  try {
    accounts.value = await accountService.getAccounts()
  } catch (error) {
    console.error('Failed to load accounts')
  } finally {
    isLoading.value = false
  }
}

async function submitAccount() {
  isSubmitting.value = true
  try {
    const newAccount = await accountService.linkAccount({
      ...form.value,
      number_last4: form.value.number_last4 || 'N/A'
    })
    accounts.value.unshift(newAccount)
    isModalOpen.value = false
    form.value = { name: '', type: 'Checking', number_last4: '', balance: null }
  } catch (error) {
    alert('Failed to link account')
  } finally {
    isSubmitting.value = false
  }
}

async function deleteAccount(id) {
  if (!confirm('Are you sure you want to remove this account?')) return
  try {
    await accountService.unlinkAccount(id)
    accounts.value = accounts.value.filter(a => a.id !== id)
  } catch (error) {
    alert('Failed to delete account')
  }
}

// Helpers for UI
function getIcon(type) {
  const map = {
    'Checking': '🏦',
    'Savings': '💰',
    'Wallet': '📱',
    'Credit': '💳'
  }
  return map[type] || '🏦'
}

function getIconBg(type) {
  const map = {
    'Checking': 'bg-[#6366f1]/20 text-[#6366f1]',
    'Savings': 'bg-emerald-500/20 text-emerald-500',
    'Wallet': 'bg-[#0070BA]/20 text-[#0070BA]',
    'Credit': 'bg-orange-500/20 text-orange-500'
  }
  return map[type] || 'bg-primary-500/20 text-primary-500'
}
</script>
