<template>
  <header class="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50">
    <!-- Left: Search -->
    <div class="flex items-center gap-4 flex-1">
      <div class="relative max-w-md w-full">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search transactions, reports..."
          class="w-full pl-10 pr-4 py-2 bg-surface-900/60 border border-surface-700/50 rounded-xl text-sm text-surface-200 placeholder-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
        />
        <kbd class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-surface-500 bg-surface-800 rounded border border-surface-700">
          ⌘K
        </kbd>
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-3">
      <!-- Notifications -->
      <button class="relative p-2 rounded-xl hover:bg-surface-800/60 transition-colors group" id="notifications-btn">
        <svg class="w-5 h-5 text-surface-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-red rounded-full ring-2 ring-surface-950"></span>
      </button>

      <!-- Divider -->
      <div class="w-px h-8 bg-surface-800"></div>

      <!-- User Profile (Click to Sign Out) -->
      <button @click="handleSignOut" class="flex items-center gap-3 pl-2 cursor-pointer group text-left hover:bg-surface-800/40 p-1.5 rounded-xl transition-colors" id="user-profile" title="Click to Sign Out">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-glow uppercase">
          {{ userInitial }}
        </div>
        <div class="hidden sm:block max-w-[120px]">
          <p class="text-sm font-medium text-surface-200 group-hover:text-red-400 transition-colors truncate">Sign Out</p>
          <p class="text-xs text-surface-500 truncate">{{ userEmail }}</p>
        </div>
        <svg class="w-4 h-4 text-surface-500 hidden sm:block group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const userEmail = computed(() => authStore.user?.email || 'user@financeflow.io')
const userInitial = computed(() => userEmail.value.charAt(0))

async function handleSignOut() {
  try {
    await authStore.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
</script>
