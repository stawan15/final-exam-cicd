<template>
  <div class="h-full p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Cards</h2>
        <p class="text-surface-400 text-sm">Manage physical and virtual corporate cards</p>
      </div>
      <button class="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors">
        Issue Virtual Card
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cards List -->
      <div class="lg:col-span-1 space-y-4">
        <!-- Card Rendering (CSS Credit Card) -->
        <div class="relative w-full aspect-[1.586/1] rounded-2xl p-6 text-white overflow-hidden shadow-glow group cursor-pointer transition-transform hover:-translate-y-2">
          <div class="absolute inset-0 bg-gradient-to-br from-[#1a1c29] via-[#312e81] to-[#6366f1] z-0"></div>
          <!-- Decorative shapes -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 z-0"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-8 -mb-8 z-0"></div>
          
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <div class="font-bold tracking-widest text-lg opacity-80">FinanceFlow</div>
              <svg class="w-10 opacity-80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="24" r="16" fill="#EA001B"/>
                <circle cx="32" cy="24" r="16" fill="#FFA200" fill-opacity="0.8"/>
              </svg>
            </div>
            
            <div class="mt-auto">
              <!-- Chip -->
              <div class="w-10 h-8 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md opacity-80 mb-4"></div>
              <div class="font-mono text-xl tracking-[0.2em] mb-2 text-white/90">**** **** **** 4092</div>
              <div class="flex justify-between items-end">
                <div>
                  <div class="text-[10px] text-white/50 uppercase tracking-wider mb-1">Card Holder</div>
                  <div class="font-medium tracking-wide">ADMIN USER</div>
                </div>
                <div>
                  <div class="text-[10px] text-white/50 uppercase tracking-wider mb-1">Expires</div>
                  <div class="font-medium tracking-wide">12/28</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="relative w-full aspect-[1.586/1] rounded-2xl p-6 text-white overflow-hidden group cursor-pointer border border-surface-700 bg-surface-800/30 hover:bg-surface-800 transition-all opacity-60 hover:opacity-100">
           <div class="relative z-10 h-full flex flex-col justify-between grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500">
            <div class="flex justify-between items-start">
               <div class="font-medium">Marketing Team V-Card</div>
               <div class="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-surface-700 text-surface-300">Virtual</div>
            </div>
             <div class="mt-auto">
               <div class="font-mono text-lg tracking-widest mb-1 text-white/70">**** **** **** 8852</div>
               <div class="text-xs text-white/50">Limit: $5,000 / month</div>
             </div>
           </div>
        </div>
      </div>

      <!-- Card Details -->
      <div class="lg:col-span-2 glass-card p-6">
        <div class="flex items-center justify-between mb-8 pb-6 border-b border-surface-800/50">
          <div>
            <h3 class="text-xl font-bold text-white mb-1">Primary Corporate Card</h3>
            <p class="text-surface-400 text-sm">Physical Card • Plated Metal</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 bg-accent-green/20 text-accent-green rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 bg-accent-green rounded-full"></span> Active
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div class="text-sm text-surface-400 mb-1">Monthly Limit</div>
            <div class="text-2xl font-bold text-white">$50,000.00</div>
            <!-- Progress bar -->
            <div class="w-full h-2 bg-surface-800 rounded-full mt-3 overflow-hidden">
              <div class="h-full bg-primary-500 w-[15%] rounded-full shadow-glow"></div>
            </div>
            <div class="text-xs text-surface-500 mt-2">$7,450.00 spent</div>
          </div>
           <div>
            <div class="text-sm text-surface-400 mb-1">Status</div>
            <div class="text-white font-medium mb-1 flex items-center gap-2">
              <svg class="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               Good Standing
            </div>
             <div class="text-xs text-surface-500">Auto-pay enabled</div>
          </div>
        </div>

        <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Card Settings</h4>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-4 bg-surface-900/50 rounded-xl border border-surface-800">
            <div>
              <div class="text-white font-medium">Freeze Card</div>
              <div class="text-sm text-surface-400">Temporarily block all new purchases</div>
            </div>
            <!-- Toggle Switch -->
            <div class="w-11 h-6 bg-surface-700 rounded-full relative cursor-pointer">
              <div class="absolute left-1 top-1 w-4 h-4 bg-surface-400 rounded-full"></div>
            </div>
          </div>
           <div class="flex items-center justify-between p-4 bg-surface-900/50 rounded-xl border border-surface-800">
            <div>
              <div class="text-white font-medium">Online Transactions</div>
              <div class="text-sm text-surface-400">Allow card to be used for internet purchases</div>
            </div>
            <div class="w-11 h-6 bg-primary-600 rounded-full relative cursor-pointer">
              <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
           <div class="flex items-center justify-between p-4 bg-surface-900/50 rounded-xl border border-surface-800">
            <div>
              <div class="text-white font-medium">Show PIN</div>
              <div class="text-sm text-surface-400">Requires multi-factor authentication</div>
            </div>
            <button class="px-3 py-1.5 bg-surface-800 text-white text-xs font-medium rounded border border-surface-700 hover:bg-surface-700 transition-colors">
              Reveal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
