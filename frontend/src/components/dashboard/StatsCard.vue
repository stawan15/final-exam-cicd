<template>
  <div
    :class="[
      'glass-card-hover p-5 animate-slide-up',
      animationDelay
    ]"
  >
    <div class="flex items-start justify-between mb-4">
      <div>
        <p class="text-sm font-medium text-surface-400 mb-1">{{ title }}</p>
        <p class="stat-value">{{ formattedValue }}</p>
      </div>
      <div :class="[
        'w-11 h-11 rounded-xl flex items-center justify-center text-xl',
        iconBg
      ]">
        {{ icon }}
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span :class="[
        'inline-flex items-center gap-1 text-sm font-medium',
        change >= 0 ? 'text-emerald-400' : 'text-red-400'
      ]">
        <svg v-if="change >= 0" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </svg>
        {{ Math.abs(change) }}%
      </span>
      <span class="text-xs text-surface-500">vs last month</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: Number,
  change: Number,
  icon: String,
  iconBg: {
    type: String,
    default: 'bg-primary-500/15',
  },
  prefix: {
    type: String,
    default: '$',
  },
  delay: {
    type: Number,
    default: 0,
  },
})

const animationDelay = computed(() => {
  return `animate-delay-${props.delay}`
})

const formattedValue = computed(() => {
  if (props.prefix === '$') {
    return `$${props.value.toLocaleString()}`
  }
  return props.value.toLocaleString()
})
</script>
