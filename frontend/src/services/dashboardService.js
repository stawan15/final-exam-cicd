import api from './api'

export const dashboardService = {
    async getStats() {
        try {
            return await api.get('/dashboard/stats')
        } catch (error) {
            console.warn('Using fallback stats data')
            return {
                totalRevenue: 284500,
                totalExpenses: 156200,
                netProfit: 128300,
                activeUsers: 2847,
                revenueChange: 12.5,
                expenseChange: -3.2,
                profitChange: 24.8,
                userChange: 8.1,
            }
        }
    },

    async getTransactions() {
        try {
            return await api.get('/dashboard/transactions')
        } catch (error) {
            console.warn('Using fallback transactions data')
            return [
                { id: 1, name: 'Stripe Payment', category: 'Revenue', amount: 2450.00, status: 'completed', date: '2026-03-05', icon: '💳' },
                { id: 2, name: 'AWS Services', category: 'Infrastructure', amount: -1280.00, status: 'completed', date: '2026-03-05', icon: '☁️' },
                { id: 3, name: 'Client Invoice #1042', category: 'Revenue', amount: 8500.00, status: 'pending', date: '2026-03-04', icon: '📄' },
                { id: 4, name: 'Office Supplies', category: 'Operations', amount: -342.50, status: 'completed', date: '2026-03-04', icon: '📦' },
                { id: 5, name: 'Subscription Revenue', category: 'Revenue', amount: 15600.00, status: 'completed', date: '2026-03-03', icon: '🔄' },
                { id: 6, name: 'Marketing Campaign', category: 'Marketing', amount: -4200.00, status: 'processing', date: '2026-03-03', icon: '📢' },
                { id: 7, name: 'Consulting Fee', category: 'Revenue', amount: 6750.00, status: 'completed', date: '2026-03-02', icon: '💼' },
                { id: 8, name: 'Software License', category: 'Operations', amount: -890.00, status: 'completed', date: '2026-03-02', icon: '🖥️' },
            ]
        }
    },

    async getRevenueData() {
        try {
            return await api.get('/dashboard/revenue')
        } catch (error) {
            console.warn('Using fallback revenue data')
            return {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                revenue: [18500, 22300, 19800, 27400, 24600, 31200, 28900, 35100, 32400, 38700, 34200, 41500],
                expenses: [12400, 14200, 13800, 16500, 15200, 18900, 17200, 20100, 19400, 22300, 20800, 24100],
            }
        }
    },

    async getExpenses() {
        try {
            return await api.get('/dashboard/expenses')
        } catch (error) {
            console.warn('Using fallback expenses data')
            return [
                { category: 'Infrastructure', amount: 45200, percentage: 29, color: '#6366f1' },
                { category: 'Salaries', amount: 52000, percentage: 33, color: '#8b5cf6' },
                { category: 'Marketing', amount: 28400, percentage: 18, color: '#06b6d4' },
                { category: 'Operations', amount: 18600, percentage: 12, color: '#10b981' },
                { category: 'Other', amount: 12000, percentage: 8, color: '#f59e0b' },
            ]
        }
    },
}
