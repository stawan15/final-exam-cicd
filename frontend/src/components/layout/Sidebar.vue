<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300 ease-in-out',
      'bg-surface-950/90 backdrop-blur-xl border-r border-surface-800/50',
      collapsed ? 'w-20' : 'w-64'
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-5 h-16 border-b border-surface-800/50">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-glow">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <transition name="fade">
        <span v-if="!collapsed" class="text-lg font-bold text-gradient whitespace-nowrap">FinanceFlow</span>
      </transition>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <div v-for="section in navSections" :key="section.title" class="mb-6">
        <transition name="fade">
          <p v-if="!collapsed" class="px-4 mb-2 text-xs font-semibold uppercase tracking-widest text-surface-500">
            {{ section.title }}
          </p>
        </transition>
        <router-link
          v-for="item in section.items"
          :key="item.name"
          :to="item.path"
          class="nav-link group"
          exact-active-class="active"
          :title="collapsed ? item.name : ''"
        >
          <span class="text-xl flex-shrink-0" v-html="item.icon"></span>
          <transition name="fade">
            <span v-if="!collapsed" class="text-sm font-medium whitespace-nowrap">{{ item.name }}</span>
          </transition>
          <transition name="fade">
            <span
              v-if="!collapsed && item.badge"
              class="ml-auto text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full"
            >
              {{ item.badge }}
            </span>
          </transition>
        </router-link>
      </div>
    </nav>

    <!-- Collapse Toggle -->
    <div class="px-3 py-4 border-t border-surface-800/50">
      <button
        @click="$emit('toggle')"
        class="nav-link w-full justify-center"
      >
        <svg
          :class="['w-5 h-5 transition-transform duration-300', collapsed ? 'rotate-180' : '']"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <transition name="fade">
          <span v-if="!collapsed" class="text-sm font-medium">Collapse</span>
        </transition>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle'])

const navSections = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', icon: '📊', path: '/' },
      { name: 'Analytics', icon: '📈', badge: 'New', path: '/analytics' },
      { name: 'Transactions', icon: '💸', path: '/transactions' },
      { name: 'Invoices', icon: '📄', badge: '3', path: '/invoices' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { name: 'Accounts', icon: '🏦', path: '/accounts' },
      { name: 'Cards', icon: '💳', path: '/cards' },
      { name: 'Investments', icon: '📉', path: '/investments' },
      { name: 'Budgets', icon: '🎯', path: '/budgets' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { name: 'Profile', icon: '👤', path: '/profile' },
      { name: 'Settings', icon: '⚙️', path: '/settings' },
    ],
  },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
