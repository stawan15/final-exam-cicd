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
            {
                path: 'analytics',
                name: 'Analytics',
                component: () => import('../views/AnalyticsView.vue'),
            },
            {
                path: 'transactions',
                name: 'Transactions',
                component: () => import('../views/TransactionsView.vue'),
            },
            {
                path: 'invoices',
                name: 'Invoices',
                component: () => import('../views/InvoicesView.vue'),
            },
            {
                path: 'accounts',
                name: 'Accounts',
                component: () => import('../views/AccountsView.vue'),
            },
            {
                path: 'cards',
                name: 'Cards',
                component: () => import('../views/CardsView.vue'),
            },
            {
                path: 'investments',
                name: 'Investments',
                component: () => import('../views/InvestmentsView.vue'),
            },
            {
                path: 'budgets',
                name: 'Budgets',
                component: () => import('../views/BudgetsView.vue'),
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('../views/ProfileView.vue'),
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('../views/SettingsView.vue'),
            },
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
