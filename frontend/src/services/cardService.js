import api from './api'

export const cardService = {
    async getCards() {
        try {
            return await api.get('/cards')
        } catch (error) {
            console.error('Error fetching cards:', error)
            throw error
        }
    },

    async issueCard(cardData) {
        try {
            return await api.post('/cards', cardData)
        } catch (error) {
            console.error('Error issuing card:', error)
            throw error
        }
    },

    async updateCardStatus(id, status) {
        try {
            return await api.put(`/cards/${id}/settings`, { status })
        } catch (error) {
            console.error('Error updating card settings:', error)
            throw error
        }
    }
}
