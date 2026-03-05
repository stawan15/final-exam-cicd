import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/',
        component: () => import('../components/layout/MainLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('../views/DashboardView.vue'),
            },
            // Dummy routes for sidebar links
            { path: 'analytics', name: 'Analytics', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Analytics Page (Coming Soon)</div>' } },
            { path: 'transactions', name: 'Transactions', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Transactions Page (Coming Soon)</div>' } },
            { path: 'invoices', name: 'Invoices', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Invoices Page (Coming Soon)</div>' } },
            { path: 'accounts', name: 'Accounts', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Accounts Page (Coming Soon)</div>' } },
            { path: 'cards', name: 'Cards', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Cards Page (Coming Soon)</div>' } },
            { path: 'investments', name: 'Investments', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Investments Page (Coming Soon)</div>' } },
            { path: 'budgets', name: 'Budgets', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Budgets Page (Coming Soon)</div>' } },
            { path: 'profile', name: 'Profile', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Profile Page (Coming Soon)</div>' } },
            { path: 'settings', name: 'Settings', component: { template: '<div class="text-white text-2xl h-full flex items-center justify-center">Settings Page (Coming Soon)</div>' } },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' })
    } else if (to.meta.requiresGuest && isAuthenticated) {
        next({ name: 'Dashboard' })
    } else {
        next()
    }
})

export default router
