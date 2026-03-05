<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-950 p-4">
    <!-- Background effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
    </div>

    <div class="glass-card w-full max-w-md p-8 relative z-10 animate-slide-up">
      <div class="text-center mb-8">
        <div class="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-glow mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">Welcome to FinanceFlow</h2>
        <p class="text-surface-400 text-sm">Sign in to your account to continue</p>
      </div>

      <form @submit.prevent="handleAuth" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-surface-300 mb-1.5">Email address</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="w-full px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-surface-300 mb-1.5">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="w-full px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
            placeholder="••••••••"
          />
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {{ errorMsg }}
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-all duration-200 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSignUp ? 'Create Account' : 'Sign In' }}
        </button>
      </form>

      <div class="mt-6 text-center text-sm">
        <span class="text-surface-400">{{ isSignUp ? 'Already have an account?' : 'Don\'t have an account?' }}</span>
        <button @click="isSignUp = !isSignUp" class="ml-1 text-primary-400 hover:text-primary-300 font-medium transition-colors">
          {{ isSignUp ? 'Sign In' : 'Sign Up' }}
        </button>
      </div>
      
      <div class="mt-8 pt-6 border-t border-surface-800 text-center">
        <p class="text-xs text-surface-500 mb-2">For demo purposes, you can use:</p>
        <p class="text-xs text-surface-400 font-mono bg-surface-900/50 p-2 rounded-lg inline-block">
          admin@financeflow.io / password123
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isSignUp = ref(false)
const loading = ref(false)
const errorMsg = ref('')

async function handleAuth() {
  loading.value = true
  errorMsg.value = ''
  
  try {
    if (isSignUp.value) {
      await authStore.signUp(email.value, password.value)
      // For Supabase, sign up usually requires email confirmation.
      // If auto-confirm is enabled, they will be logged in.
      // For this demo, we'll try to sign in immediately after sign up if possible,
      // or show a message.
      if (authStore.user) {
        router.push('/')
      } else {
        errorMsg.value = 'Account created! Please check your email to confirm, or try logging in.'
        isSignUp.value = false
      }
    } else {
      await authStore.signIn(email.value, password.value)
      router.push('/')
    }
  } catch (error) {
    errorMsg.value = error.message || 'Authentication failed'
  } finally {
    loading.value = false
  }
}
</script>
