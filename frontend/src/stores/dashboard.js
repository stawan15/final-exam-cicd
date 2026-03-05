import { defineStore } from 'pinia'
import { dashboardService } from '../services/dashboardService'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        stats: null,
        transactions: [],
        revenueData: null,
        expenses: [],
        isLoading: true,
        error: null,
    }),

    getters: {
        hasData: (state) => state.stats !== null,
    },

    actions: {
        async fetchAllData() {
            this.isLoading = true
            this.error = null
            try {
                const [stats, transactions, revenueData, expenses] = await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getTransactions(),
                    dashboardService.getRevenueData(),
                    dashboardService.getExpenses(),
                ])
                this.stats = stats
                this.transactions = transactions
                this.revenueData = revenueData
                this.expenses = expenses
            } catch (error) {
                this.error = error.message
                console.error('Failed to fetch dashboard data:', error)
            } finally {
                this.isLoading = false
            }
        },
    },
})
