import api from './api'

export const budgetService = {
    async getBudgets() {
        try {
            return await api.get('/budgets')
        } catch (error) {
            console.error('Error fetching budgets:', error)
            throw error
        }
    },

    async setBudget(budgetData) {
        try {
            return await api.post('/budgets', budgetData)
        } catch (error) {
            console.error('Error setting budget:', error)
            throw error
        }
    }
}
