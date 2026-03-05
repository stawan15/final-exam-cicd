<template>
  <div class="h-full p-6 space-y-6 max-w-4xl">
    <div>
      <h2 class="text-2xl font-bold text-white mb-1">Settings</h2>
      <p class="text-surface-400 text-sm">Configure your workspace and preferences</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      
      <!-- Settings Nav -->
      <div class="md:col-span-1 space-y-1">
        <button class="w-full text-left px-4 py-2 bg-surface-800 text-white font-medium rounded-lg text-sm border border-surface-700">General</button>
        <button class="w-full text-left px-4 py-2 hover:bg-surface-800/50 text-surface-400 hover:text-white font-medium rounded-lg text-sm transition-colors">Notifications</button>
        <button class="w-full text-left px-4 py-2 hover:bg-surface-800/50 text-surface-400 hover:text-white font-medium rounded-lg text-sm transition-colors">Billing</button>
        <button class="w-full text-left px-4 py-2 hover:bg-surface-800/50 text-surface-400 hover:text-white font-medium rounded-lg text-sm transition-colors">Integrations</button>
        <button class="w-full text-left px-4 py-2 hover:bg-surface-800/50 text-surface-400 hover:text-white font-medium rounded-lg text-sm transition-colors">API Keys</button>
      </div>

      <!-- Settings Content -->
      <div class="md:col-span-3 glass-card p-6 space-y-8">
        
        <div>
           <h3 class="text-lg font-bold text-white mb-4">Workspace Preferences</h3>
           <div class="space-y-4">
             <div>
                <label class="block text-sm font-medium text-surface-300 mb-1.5">Workspace Name</label>
                <input type="text" value="FinanceFlow HQ" class="w-full max-w-md px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:border-primary-500/50">
             </div>
             <div>
                <label class="block text-sm font-medium text-surface-300 mb-1.5">Primary Currency</label>
                <select class="w-full max-w-xs px-4 py-2.5 bg-surface-900/50 border border-surface-700 rounded-xl text-white focus:outline-none focus:border-primary-500/50">
                  <option selected>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>JPY (¥)</option>
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

         <div class="pt-6 border-t border-surface-800/50">
           <h3 class="text-lg font-bold text-accent-red mb-2">Danger Zone</h3>
           <p class="text-sm text-surface-400 mb-4">Once you delete your workspace, there is no going back. Please be certain.</p>
           <button class="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 font-medium rounded-lg transition-colors text-sm">
             Delete Workspace
           </button>
        </div>

      </div>

    </div>
  </div>
</template>
