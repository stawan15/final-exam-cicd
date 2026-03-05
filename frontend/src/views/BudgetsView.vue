<template>
  <div class="h-full p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Budgets</h2>
        <p class="text-surface-400 text-sm">Control spending and hit your financial goals</p>
      </div>
      <button class="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors">
        Create Budget
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Budget Card 1 -->
      <div class="glass-card p-6 border-t-4 border-t-primary-500">
        <div class="flex items-center justify-between mb-4">
           <h3 class="text-lg font-bold text-white">Marketing Team</h3>
           <div class="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center">📢</div>
        </div>
        
        <div class="flex items-end gap-2 mb-4">
          <span class="text-3xl font-bold text-white">$18,400</span>
          <span class="text-surface-400 text-sm mb-1">/ $25,000</span>
        </div>

        <!-- Progress -->
        <div class="w-full h-2.5 bg-surface-800 rounded-full mb-2 overflow-hidden">
          <div class="h-full bg-primary-500 rounded-full w-[73%]"></div>
        </div>
        <div class="flex justify-between text-xs font-medium">
          <span class="text-surface-300">73% used</span>
          <span class="text-accent-green">On track</span>
        </div>
      </div>

       <!-- Budget Card 2 -->
      <div class="glass-card p-6 border-t-4 border-t-accent-red">
        <div class="flex items-center justify-between mb-4">
           <h3 class="text-lg font-bold text-white">Software & SaaS</h3>
           <div class="w-8 h-8 rounded-lg bg-accent-red/20 text-accent-red flex items-center justify-center">💻</div>
        </div>
        
        <div class="flex items-end gap-2 mb-4">
          <span class="text-3xl font-bold text-accent-red">$5,200</span>
          <span class="text-surface-400 text-sm mb-1">/ $5,000</span>
        </div>

        <!-- Progress -->
        <div class="w-full h-2.5 bg-surface-800 rounded-full mb-2 overflow-hidden">
          <div class="h-full bg-accent-red rounded-full w-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
        </div>
        <div class="flex justify-between text-xs font-medium">
          <span class="text-surface-300">104% used</span>
          <span class="text-accent-red font-bold">Over budget</span>
        </div>
      </div>

      <!-- Budget Card 3 -->
      <div class="glass-card p-6 border-t-4 border-t-purple-500">
        <div class="flex items-center justify-between mb-4">
           <h3 class="text-lg font-bold text-white">Office Supplies</h3>
           <div class="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">📦</div>
        </div>
        
        <div class="flex items-end gap-2 mb-4">
          <span class="text-3xl font-bold text-white">$450</span>
          <span class="text-surface-400 text-sm mb-1">/ $2,000</span>
        </div>

        <!-- Progress -->
        <div class="w-full h-2.5 bg-surface-800 rounded-full mb-2 overflow-hidden">
          <div class="h-full bg-purple-500 rounded-full w-[22%]"></div>
        </div>
        <div class="flex justify-between text-xs font-medium">
          <span class="text-surface-300">22% used</span>
          <span class="text-surface-300">Plenty remaining</span>
        </div>
      </div>

    </div>
  </div>
</template>
