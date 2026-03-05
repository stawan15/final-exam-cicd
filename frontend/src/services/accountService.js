import api from './api'

export const accountService = {
    async getAccounts() {
        try {
            return await api.get('/accounts')
        } catch (error) {
            console.error('Error fetching accounts:', error)
            throw error
        }
    },

    async linkAccount(accountData) {
        try {
            return await api.post('/accounts', accountData)
        } catch (error) {
            console.error('Error linking account:', error)
            throw error
        }
    },

    async unlinkAccount(id) {
        try {
            return await api.delete(`/accounts/${id}`)
        } catch (error) {
            console.error('Error unlinking account:', error)
            throw error
        }
    }
}
