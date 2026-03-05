import { Router } from 'express'
import supabase from '../config/supabase.js'
import { mockStats, mockTransactions, mockRevenueData, mockExpenses } from '../seed/seedData.js'

const router = Router()

// GET /api/dashboard/stats
router.get('/stats', async (req, res, next) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('dashboard_stats')
                .select('*')
                .single()

            if (error) throw error
            return res.json(data)
        }

        res.json(mockStats)
    } catch (error) {
        next(error)
    }
})

// GET /api/dashboard/transactions
router.get('/transactions', async (req, res, next) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })
                .limit(10)

            if (error) throw error
            return res.json(data)
        }

        res.json(mockTransactions)
    } catch (error) {
        next(error)
    }
})

// GET /api/dashboard/revenue
router.get('/revenue', async (req, res, next) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('monthly_revenue')
                .select('*')
                .order('month', { ascending: true })

            if (error) throw error

            const labels = data.map(d => d.month_label)
            const revenue = data.map(d => d.revenue)
            const expenses = data.map(d => d.expenses)

            return res.json({ labels, revenue, expenses })
        }

        res.json(mockRevenueData)
    } catch (error) {
        next(error)
    }
})

// GET /api/dashboard/expenses
router.get('/expenses', async (req, res, next) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('expense_categories')
                .select('*')
                .order('amount', { ascending: false })

            if (error) throw error
            return res.json(data)
        }

        res.json(mockExpenses)
    } catch (error) {
        next(error)
    }
})

export default router
