<template>
  <div class="h-full flex flex-col p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Transactions</h2>
        <p class="text-surface-400 text-sm">Manage and filter all your financial activity</p>
      </div>
      <button class="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors flex items-center gap-2">
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
            <input type="text" placeholder="Search by name or ID..." class="w-full pl-9 pr-4 py-2 bg-surface-900/50 border border-surface-700/50 rounded-lg text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500/50">
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
        <TransactionTable />
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
  </div>
</template>

<script setup>
import TransactionTable from '../components/dashboard/TransactionTable.vue'
</script>
