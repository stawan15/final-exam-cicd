<template>
  <div>
    <!-- Page Title -->
    <div class="mb-8 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">Dashboard</h1>
          <p class="text-surface-400 mt-1">Welcome back! Here's your financial overview.</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-surface-500">Last updated: just now</span>
          <button
            @click="refreshData"
            class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-glow hover:shadow-glow-lg"
            id="refresh-btn"
          >
            <svg :class="['w-4 h-4', isRefreshing ? 'animate-spin' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="dashboard.isLoading" class="flex items-center justify-center py-32">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
        <p class="text-surface-400 text-sm">Loading dashboard data...</p>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatsCard
          title="Total Revenue"
          :value="dashboard.stats?.totalRevenue ?? 0"
          :change="dashboard.stats?.revenueChange ?? 0"
          icon="💰"
          iconBg="bg-emerald-500/15"
          :delay="100"
        />
        <StatsCard
          title="Total Expenses"
          :value="dashboard.stats?.totalExpenses ?? 0"
          :change="dashboard.stats?.expenseChange ?? 0"
          icon="💸"
          iconBg="bg-red-500/15"
          :delay="200"
        />
        <StatsCard
          title="Net Profit"
          :value="dashboard.stats?.netProfit ?? 0"
          :change="dashboard.stats?.profitChange ?? 0"
          icon="📈"
          iconBg="bg-primary-500/15"
          :delay="300"
        />
        <StatsCard
          title="Active Users"
          :value="dashboard.stats?.activeUsers ?? 0"
          :change="dashboard.stats?.userChange ?? 0"
          icon="👥"
          iconBg="bg-cyan-500/15"
          prefix=""
          :delay="400"
        />
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div class="lg:col-span-2">
          <RevenueChart :data="dashboard.revenueData" />
        </div>
        <ExpenseBreakdown :expenses="dashboard.expenses" />
      </div>

      <!-- Bottom Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div class="lg:col-span-2">
          <TransactionTable :transactions="dashboard.transactions" />
        </div>
        <div class="space-y-5">
          <ActivityFeed />
          <QuickActions />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import StatsCard from '../components/dashboard/StatsCard.vue'
import RevenueChart from '../components/dashboard/RevenueChart.vue'
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown.vue'
import TransactionTable from '../components/dashboard/TransactionTable.vue'
import ActivityFeed from '../components/dashboard/ActivityFeed.vue'
import QuickActions from '../components/dashboard/QuickActions.vue'

const dashboard = useDashboardStore()
const isRefreshing = ref(false)

onMounted(() => {
  dashboard.fetchAllData()
})

async function refreshData() {
  isRefreshing.value = true
  await dashboard.fetchAllData()
  setTimeout(() => {
    isRefreshing.value = false
  }, 500)
}
</script>
