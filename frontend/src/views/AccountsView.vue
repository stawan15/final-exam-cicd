<template>
  <div class="h-full p-6 space-y-6">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Bank Accounts</h2>
        <p class="text-surface-400 text-sm">Manage your connected bank and wallet accounts</p>
      </div>
      <button class="px-4 py-2.5 bg-surface-800 hover:bg-surface-700 text-white text-sm font-medium rounded-xl transition-colors border border-surface-700 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
        Link Account
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Account Card 1 -->
      <div class="glass-card p-6 relative overflow-hidden group hover:border-primary-500/50 transition-colors cursor-pointer">
        <div class="absolute top-0 right-0 p-4">
          <span class="w-3 h-3 rounded-full bg-accent-green inline-block shadow-glow"></span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#0070BA]/20 flex items-center justify-center mb-4">
          <span class="text-xl font-bold text-[#0070BA]">P</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-1">PayPal Business</h3>
        <p class="text-surface-400 text-sm font-mono mb-6">**** **** **** 5432</p>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-xs text-surface-500 mb-1">Available Balance</div>
            <div class="text-2xl font-bold text-white">$42,500.00</div>
          </div>
          <svg class="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </div>
      </div>

      <!-- Account Card 2 -->
      <div class="glass-card p-6 relative overflow-hidden group hover:border-primary-500/50 transition-colors cursor-pointer">
        <div class="absolute top-0 right-0 p-4">
          <span class="w-3 h-3 rounded-full bg-accent-green inline-block shadow-glow"></span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#6366f1]/20 flex items-center justify-center mb-4 text-xl">
          🏦
        </div>
        <h3 class="text-lg font-bold text-white mb-1">Chase Checking</h3>
        <p class="text-surface-400 text-sm font-mono mb-6">**** **** **** 9012</p>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-xs text-surface-500 mb-1">Available Balance</div>
            <div class="text-2xl font-bold text-white">$185,240.50</div>
          </div>
          <svg class="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </div>
      </div>

       <!-- Account Card 3 -->
       <div class="glass-card p-6 border border-dashed border-surface-700 bg-surface-900/20 hover:bg-surface-800/40 hover:border-surface-600 transition-all cursor-pointer flex flex-col items-center justify-center text-center min-h-[220px]">
        <div class="w-12 h-12 rounded-full border-2 border-dashed border-surface-600 flex items-center justify-center text-surface-400 mb-4 group-hover:border-primary-500 group-hover:text-primary-500 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </div>
        <h3 class="text-white font-medium mb-1">Add New Account</h3>
        <p class="text-surface-500 text-sm">Connect another bank or wallet</p>
      </div>
    </div>
  </div>
</template>
