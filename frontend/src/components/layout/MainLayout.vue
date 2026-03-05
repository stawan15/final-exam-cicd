<template>
  <div class="min-h-screen bg-surface-950">
    <Sidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div
      :class="[
        'transition-all duration-300',
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      ]"
    >
      <Header />
      <main class="p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const sidebarCollapsed = ref(false)
</script>
