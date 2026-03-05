<template>
  <div class="h-full p-6 space-y-6">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Investments</h2>
        <p class="text-surface-400 text-sm">Track your portfolio performance and market trends</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-surface-800 hover:bg-surface-700 text-white text-sm font-medium rounded-xl transition-colors border border-surface-700">
          Deposit
        </button>
        <button class="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors">
          Trade
        </button>
      </div>
    </div>

    <!-- Portfolio Summary -->
    <div class="glass-card p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div class="text-surface-400 text-sm font-medium mb-1">Total Portfolio Value</div>
          <div class="text-3xl font-bold text-white mb-2">$845,200.50</div>
          <div class="text-sm font-medium text-accent-green flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            +$12,450.00 (1.5%) Today
          </div>
        </div>
        <div class="hidden md:block w-px h-full bg-surface-800 mx-auto"></div>
        <div class="col-span-1 md:col-span-1 flex items-center gap-4">
           <div class="w-1/2">
             <div class="text-surface-400 text-xs mb-1">Stocks & ETFs</div>
             <div class="text-white font-medium">$620,000</div>
             <div class="w-full h-1.5 bg-surface-800 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-primary-500 w-[73%] rounded-full"></div>
             </div>
           </div>
           <div class="w-1/2">
             <div class="text-surface-400 text-xs mb-1">Crypto</div>
             <div class="text-white font-medium">$225,200</div>
             <div class="w-full h-1.5 bg-surface-800 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-purple-500 w-[27%] rounded-full"></div>
             </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Asset List -->
    <h3 class="text-lg font-bold text-white mb-4">Your Assets</h3>
    <div class="glass-card overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-surface-800/50 bg-surface-900/50">
            <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Asset</th>
            <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Price</th>
            <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Holdings</th>
            <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Total Value</th>
            <th class="p-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">24h Change</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-800/50 text-sm">
          <tr class="hover:bg-surface-800/30 transition-colors group cursor-pointer">
            <td class="p-4 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1">
                <svg class="w-full h-full text-[#150016]" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-11.458c0-3.21-2.92-5.462-8.082-5.694v5.717c3.483.181 5.378 1.472 5.378 3.518 0 2.222-2.126 3.8-5.83 3.8h-4.6v-2.028h4.62c2.094 0 3.32-.614 3.32-1.859 0-.853-.6-1.503-2.16-1.782v-1.92c1.77.203 3.425.86 3.425 2.124h2.93zm-10.74 3.313h-2.16V6.15h2.16v17.705zm2.747 0h-2.16V6.15h2.16v17.705zm8.175-10.871c0 2.222-2.126 3.8-5.83 3.8h-4.6v-2.028h4.62c2.094 0 3.32-.614 3.32-1.859 0-.853-.6-1.503-2.16-1.782v-1.92c1.77.203 3.425.86 3.425 2.124h2.93c0-3.21-2.92-5.462-8.082-5.694V6.15h2.805v5.717c3.483.181 5.378 1.472 5.378 3.518z"/></svg>
              </div>
              <div>
                <div class="font-medium text-white">Apple Inc.</div>
                <div class="text-xs text-surface-500">AAPL</div>
              </div>
            </td>
            <td class="p-4 font-mono text-surface-200">$173.50</td>
            <td class="p-4 font-mono text-surface-200">1,240.5</td>
            <td class="p-4 font-mono font-medium text-white">$215,226.75</td>
             <td class="p-4">
              <span class="inline-flex items-center gap-1 text-accent-green font-medium">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7"></path></svg>
                1.2%
              </span>
            </td>
          </tr>
           <tr class="hover:bg-surface-800/30 transition-colors group cursor-pointer">
            <td class="p-4 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#F7931A] flex items-center justify-center p-1.5 overflow-hidden">
                <svg class="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.654 10.375c.995-.333 1.705-1.077 1.705-2.227 0-1.795-1.468-2.603-4.04-2.603H8.38v12.91h4.156c2.89 0 4.545-.968 4.545-3.05 0-1.577-.993-2.52-2.427-2.822l2.67-3.805h-2.508l-2.072 3.104h-1.925v-8.225h1.564c1.232 0 1.943.433 1.943 1.346 0 1.1-.664 1.54-2.132 1.54h-1.35v1.89h1.565c1.47 0 2.37.48 2.37 1.637 0 1.102-.853 1.638-2.418 1.638h-1.517v-4.331zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              </div>
              <div>
                <div class="font-medium text-white">Bitcoin</div>
                <div class="text-xs text-surface-500">BTC</div>
              </div>
            </td>
            <td class="p-4 font-mono text-surface-200">$64,250.00</td>
            <td class="p-4 font-mono text-surface-200">2.5</td>
            <td class="p-4 font-mono font-medium text-white">$160,625.00</td>
             <td class="p-4">
              <span class="inline-flex items-center gap-1 text-accent-green font-medium">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7"></path></svg>
                4.8%
              </span>
            </td>
          </tr>
          <tr class="hover:bg-surface-800/30 transition-colors group cursor-pointer">
            <td class="p-4 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#00A8E1] flex items-center justify-center p-1.5 opacity-90">
                <svg class="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M11.996 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12 12 12 0 00-12-12zm4.846 15.65c-2.32 1.56-5.55 2.15-7.85 1.56-1.57-.4-2.8-1.5-3.32-3.08-1-2.9 1.18-5.74 4.15-5.74 3.03 0 4.67 1.8 3.96 4.62H8.35c.1 1.05.84 2 1.86 2.3 2.08.6 4.77.22 6.5-1.2l.13.56c-.05.35.34.42.5.1l.36-1.05a8.21 8.21 0 00-.85 1.93zM14 9.4c0-1.12-.76-1.77-1.78-1.77-1.18 0-2.12.82-2.3 2h3.9c.1-1.05.1-1.07.18-1.07z"/></svg>
              </div>
              <div>
                <div class="font-medium text-white">Vanguard S&P 500</div>
                <div class="text-xs text-surface-500">VOO</div>
              </div>
            </td>
            <td class="p-4 font-mono text-surface-200">$450.20</td>
            <td class="p-4 font-mono text-surface-200">540.0</td>
            <td class="p-4 font-mono font-medium text-white">$243,108.00</td>
             <td class="p-4">
              <span class="inline-flex items-center gap-1 text-accent-red font-medium">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                0.4%
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
