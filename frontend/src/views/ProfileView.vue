<template>
  <div class="h-full p-6 space-y-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-6">User Profile</h2>

    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
    </div>

    <div v-else class="glass-card p-8 animate-fade-in">
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
        <form @submit.prevent="saveChanges" class="flex-1 w-full space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">First Name</label>
              <input v-model="form.first_name" type="text" class="w-full px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:border-primary-500/50">
            </div>
             <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Last Name</label>
              <input v-model="form.last_name" type="text" class="w-full px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:border-primary-500/50">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Email Address</label>
              <input type="email" :value="userEmail" disabled class="w-full px-4 py-2.5 bg-surface-800/80 border border-surface-700 rounded-xl text-surface-400 cursor-not-allowed">
              <p class="text-xs text-surface-500 mt-2">Email changes require re-authentication.</p>
            </div>
          </div>

          <div class="pt-6 border-t border-surface-800/50">
            <h3 class="text-lg font-semibold text-white mb-4">Security</h3>
            <button type="button" class="px-4 py-2 bg-surface-800 hover:bg-surface-700 text-white text-sm font-medium rounded-xl transition-colors border border-surface-700">
              Reset Password
            </button>
          </div>

          <div class="pt-6 flex justify-end gap-3">
             <button type="button" @click="resetForm" class="px-6 py-2.5 text-surface-300 hover:text-white font-medium rounded-xl transition-colors">
              Cancel
            </button>
             <button type="submit" :disabled="isSubmitting" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl shadow-glow transition-colors disabled:opacity-50">
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { profileService } from '../services/profileService'

const authStore = useAuthStore()
const userEmail = computed(() => authStore.user?.email || 'admin@financeflow.io')
const userInitial = computed(() => (form.value.first_name || userEmail.value).charAt(0).toUpperCase())

const isLoading = ref(true)
const isSubmitting = ref(false)
const profile = ref(null)

const form = ref({
  first_name: '',
  last_name: ''
})

onMounted(() => {
  fetchProfile()
})

async function fetchProfile() {
  isLoading.value = true
  try {
    profile.value = await profileService.getProfile()
    if (profile.value) {
      form.value.first_name = profile.value.first_name || ''
      form.value.last_name = profile.value.last_name || ''
    }
  } catch (error) {
    console.error('Failed to load profile')
  } finally {
    isLoading.value = false
  }
}

async function saveChanges() {
  isSubmitting.value = true
  try {
    const updated = await profileService.updateProfile({
      ...profile.value,
      first_name: form.value.first_name,
      last_name: form.value.last_name
    })
    profile.value = updated
    alert('Profile updated successfully!')
  } catch (error) {
    alert('Failed to update profile')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  if (profile.value) {
    form.value.first_name = profile.value.first_name || ''
    form.value.last_name = profile.value.last_name || ''
  }
}
</script>
