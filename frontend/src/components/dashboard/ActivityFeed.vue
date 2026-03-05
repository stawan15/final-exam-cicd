<template>
  <div class="glass-card-hover p-5 animate-slide-up animate-delay-300">
    <div class="mb-5">
      <h3 class="text-lg font-semibold text-surface-100">Recent Activity</h3>
      <p class="text-sm text-surface-500 mt-0.5">Latest updates & events</p>
    </div>
    <div class="space-y-4">
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="flex items-start gap-3 group"
      >
        <div class="relative flex flex-col items-center">
          <div :class="[
            'w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0',
            activity.bg
          ]">
            {{ activity.icon }}
          </div>
          <div v-if="index < activities.length - 1" class="w-px h-full bg-surface-800/50 my-1"></div>
        </div>
        <div class="flex-1 pb-4">
          <p class="text-sm text-surface-200 group-hover:text-white transition-colors">
            <span class="font-medium">{{ activity.title }}</span>
          </p>
          <p class="text-xs text-surface-500 mt-1">{{ activity.description }}</p>
          <p class="text-xs text-surface-600 mt-1.5">{{ activity.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activities = [
  {
    icon: '💰',
    bg: 'bg-emerald-500/15',
    title: 'Payment Received',
    description: '$2,450.00 from Stripe - Invoice #1041',
    time: '2 minutes ago',
  },
  {
    icon: '📊',
    bg: 'bg-primary-500/15',
    title: 'Monthly Report Generated',
    description: 'February 2026 financial summary is ready',
    time: '1 hour ago',
  },
  {
    icon: '🔔',
    bg: 'bg-amber-500/15',
    title: 'Budget Alert',
    description: 'Marketing budget is at 85% utilization',
    time: '3 hours ago',
  },
  {
    icon: '👤',
    bg: 'bg-cyan-500/15',
    title: 'New Team Member',
    description: 'Sarah Chen joined the Finance team',
    time: '5 hours ago',
  },
  {
    icon: '🏦',
    bg: 'bg-purple-500/15',
    title: 'Account Connected',
    description: 'Business savings account linked successfully',
    time: 'Yesterday',
  },
]
</script>
