<template>
  <div class="h-full p-6 space-y-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-6">User Profile</h2>

    <div class="glass-card p-8">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        
        <!-- Avatar Section -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-32 h-32 rounded-full border-4 border-surface-800 relative group overflow-hidden bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-glow">
            {{ userInitial }}
            <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span class="text-sm font-medium">Change</span>
            </div>
          </div>
          <div class="flex gap-2">
            <span class="px-2.5 py-1 bg-primary-500/20 text-primary-400 rounded-lg text-xs font-bold uppercase tracking-wider">Admin</span>
          </div>
        </div>

        <!-- Info Form -->
        <div class="flex-1 w-full space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">First Name</label>
              <input type="text" value="System" class="w-full px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:border-primary-500/50">
            </div>
             <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Last Name</label>
              <input type="text" value="Admin" class="w-full px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:border-primary-500/50">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Email Address</label>
              <input type="email" :value="userEmail" disabled class="w-full px-4 py-2.5 bg-surface-800/80 border border-surface-700 rounded-xl text-surface-400 cursor-not-allowed">
              <p class="text-xs text-surface-500 mt-2">Email changes require re-authentication.</p>
            </div>
          </div>

          <div class="pt-6 border-t border-surface-800/50">
            <h3 class="text-lg font-semibold text-white mb-4">Security</h3>
            <button class="px-4 py-2 bg-surface-800 hover:bg-surface-700 text-white text-sm font-medium rounded-xl transition-colors border border-surface-700">
              Reset Password
            </button>
          </div>

          <div class="pt-6 flex justify-end gap-3">
             <button class="px-6 py-2.5 text-surface-300 hover:text-white font-medium rounded-xl transition-colors">
              Cancel
            </button>
             <button class="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl shadow-glow transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const userEmail = computed(() => authStore.user?.email || 'admin@financeflow.io')
const userInitial = computed(() => userEmail.value.charAt(0).toUpperCase())
</script>
