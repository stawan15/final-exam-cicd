<template>
  <div class="h-full flex flex-col p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Invoices</h2>
        <p class="text-surface-400 text-sm">Create and manage your billing</p>
      </div>
      <button class="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        New Invoice
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-card p-5">
        <div class="text-surface-400 text-sm font-medium mb-2">Total Outstanding</div>
        <div class="text-2xl font-bold text-white">$14,250.00</div>
      </div>
      <div class="glass-card p-5">
        <div class="text-surface-400 text-sm font-medium mb-2">Overdue</div>
        <div class="text-2xl font-bold text-accent-red">$2,400.00</div>
      </div>
      <div class="glass-card p-5 border border-primary-500/30">
        <div class="text-surface-400 text-sm font-medium mb-2">Paid This Month</div>
        <div class="text-2xl font-bold text-accent-green">$32,100.00</div>
      </div>
    </div>

    <!-- Empty State / Placeholder -->
    <div class="glass-card flex-1 p-8 flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">No active invoices found</h3>
      <p class="text-surface-400 max-w-sm mb-6">Create your first invoice to start getting paid. You can also import existing invoices from a CSV file.</p>
      <div class="flex items-center gap-3">
        <button class="px-4 py-2 bg-surface-800 hover:bg-surface-700 text-white font-medium rounded-lg transition-colors border border-surface-700 text-sm">
          Import CSV
        </button>
        <button class="px-4 py-2 bg-primary-600/20 text-primary-400 font-medium rounded-lg hover:bg-primary-600/30 transition-colors text-sm">
          Create Template
        </button>
      </div>
    </div>
  </div>
</template>
