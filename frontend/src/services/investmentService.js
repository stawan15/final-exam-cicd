import api from './api'

export const investmentService = {
    async getInvestments() {
        try {
            return await api.get('/investments')
        } catch (error) {
            console.error('Error fetching investments:', error)
            throw error
        }
    },

    async addInvestment(assetData) {
        try {
            return await api.post('/investments', assetData)
        } catch (error) {
            console.error('Error adding investment:', error)
            throw error
        }
    }
}
