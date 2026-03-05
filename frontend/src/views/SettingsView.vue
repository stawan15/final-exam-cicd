<template>
  <div class="h-full p-6 space-y-6 max-w-4xl">
    <div>
      <h2 class="text-2xl font-bold text-white mb-1">Settings</h2>
      <p class="text-surface-400 text-sm">Configure your workspace and preferences</p>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
      
      <!-- Settings Nav -->
      <div class="md:col-span-1 space-y-1">
        <button class="w-full text-left px-4 py-2 bg-surface-800 text-white font-medium rounded-lg text-sm border border-surface-700">General</button>
        <button class="w-full text-left px-4 py-2 hover:bg-surface-800/50 text-surface-400 hover:text-white font-medium rounded-lg text-sm transition-colors">Notifications</button>
        <button class="w-full text-left px-4 py-2 hover:bg-surface-800/50 text-surface-400 hover:text-white font-medium rounded-lg text-sm transition-colors">Billing</button>
        <button class="w-full text-left px-4 py-2 hover:bg-surface-800/50 text-surface-400 hover:text-white font-medium rounded-lg text-sm transition-colors">Integrations</button>
        <button class="w-full text-left px-4 py-2 hover:bg-surface-800/50 text-surface-400 hover:text-white font-medium rounded-lg text-sm transition-colors">API Keys</button>
      </div>

      <!-- Settings Content -->
      <form @submit.prevent="saveSettings" class="md:col-span-3 glass-card p-6 space-y-8">
        
        <div>
           <h3 class="text-lg font-bold text-white mb-4">Workspace Preferences</h3>
           <div class="space-y-4">
             <div>
                <label class="block text-sm font-medium text-surface-300 mb-1.5">Workspace Name</label>
                <input v-model="form.workspace_name" type="text" class="w-full max-w-md px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:border-primary-500/50">
             </div>
             <div>
                <label class="block text-sm font-medium text-surface-300 mb-1.5">Primary Currency</label>
                <select v-model="form.currency" class="w-full max-w-xs px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white focus:outline-none focus:border-primary-500/50">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
             </div>
           </div>
        </div>

        <div class="pt-6 border-t border-surface-800/50">
           <h3 class="text-lg font-bold text-white mb-4">Theme</h3>
           <div class="flex gap-4">
             <div class="w-24 h-20 rounded-xl border-2 border-primary-500 bg-surface-950 flex shadow-[0_0_15px_rgba(99,102,241,0.2)] cursor-pointer">
                <div class="w-1/3 bg-surface-900 border-r border-surface-800 rounded-l-lg"></div>
                <div class="w-2/3 p-2"><div class="w-full h-2 bg-surface-800 rounded-sm mb-1"></div></div>
             </div>
             <div class="w-24 h-20 rounded-xl border-2 border-surface-700 bg-white flex opacity-50 cursor-not-allowed">
                <div class="w-1/3 bg-gray-100 border-r border-gray-200 rounded-l-lg"></div>
                <div class="w-2/3 p-2"><div class="w-full h-2 bg-gray-200 rounded-sm mb-1"></div></div>
             </div>
           </div>
           <p class="text-xs text-surface-500 mt-3">Light mode coming soon.</p>
        </div>

        <div class="pt-6 border-t border-surface-800/50 flex justify-end gap-3">
          <button type="button" @click="resetForm" class="px-6 py-2.5 text-surface-300 hover:text-white font-medium rounded-xl transition-colors">
            Cancel
          </button>
          <button type="submit" :disabled="isSubmitting" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl shadow-glow transition-colors disabled:opacity-50">
            {{ isSubmitting ? 'Saving...' : 'Save Settings' }}
          </button>
        </div>

         <div class="pt-6 border-t border-surface-800/50">
           <h3 class="text-lg font-bold text-accent-red mb-2">Danger Zone</h3>
           <p class="text-sm text-surface-400 mb-4">Once you delete your workspace, there is no going back. Please be certain.</p>
           <button type="button" class="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 font-medium rounded-lg transition-colors text-sm">
             Delete Workspace
           </button>
        </div>

      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { profileService } from '../services/profileService'

const isLoading = ref(true)
const isSubmitting = ref(false)
const profile = ref(null)

const form = ref({
  workspace_name: '',
  currency: 'USD'
})

onMounted(() => {
  fetchSettings()
})

async function fetchSettings() {
  isLoading.value = true
  try {
    profile.value = await profileService.getProfile()
    if (profile.value) {
      form.value.workspace_name = profile.value.workspace_name || ''
      form.value.currency = profile.value.currency || 'USD'
    }
  } catch (error) {
    console.error('Failed to load settings')
  } finally {
    isLoading.value = false
  }
}

async function saveSettings() {
  isSubmitting.value = true
  try {
    const updated = await profileService.updateProfile({
      ...profile.value,
      workspace_name: form.value.workspace_name,
      currency: form.value.currency
    })
    profile.value = updated
    alert('Settings saved successfully!')
  } catch (error) {
    alert('Failed to save settings')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  if (profile.value) {
    form.value.workspace_name = profile.value.workspace_name || ''
    form.value.currency = profile.value.currency || 'USD'
  }
}
</script>
