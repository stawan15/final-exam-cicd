import api from './api'

export const invoiceService = {
    async getInvoices() {
        try {
            return await api.get('/invoices')
        } catch (error) {
            console.error('Error fetching invoices:', error)
            throw error
        }
    },

    async createInvoice(invoiceData) {
        try {
            return await api.post('/invoices', invoiceData)
        } catch (error) {
            console.error('Error creating invoice:', error)
            throw error
        }
    },

    async updateInvoiceStatus(id, status) {
        try {
            return await api.put(`/invoices/${id}/status`, { status })
        } catch (error) {
            console.error('Error updating invoice status:', error)
            throw error
        }
    },

    async deleteInvoice(id) {
        try {
            return await api.delete(`/invoices/${id}`)
        } catch (error) {
            console.error('Error deleting invoice:', error)
            throw error
        }
    }
}
