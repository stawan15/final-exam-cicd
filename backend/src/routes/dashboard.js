import { Router } from 'express'
import supabase from '../config/supabase.js'
import { mockStats, mockTransactions, mockRevenueData, mockExpenses } from '../seed/seedData.js'

const router = Router()

// Authentication Middleware to verify JWT and attach user
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' })
    }

    const token = authHeader.split(' ')[1]

    if (token === 'demo-token') {
        req.user = { id: '00000000-0000-0000-0000-000000000000' }
        return next()
    }

    if (!supabase) {
        return res.status(500).json({ error: 'Supabase client not configured' })
    }

    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }

    req.user = user
    next()
}

router.use(requireAuth)

// GET /api/dashboard/stats
router.get('/stats', async (req, res, next) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('dashboard_stats')
                .select('*')
                .eq('user_id', req.user.id)
                .single()

            if (data && !error) return res.json(data)

            // If new user with no data, return empty stats
            return res.json({
                totalRevenue: 0, totalExpenses: 0, netProfit: 0, activeUsers: 0,
                revenueChange: 0, expenseChange: 0, profitChange: 0, userChange: 0
            })
        }

        res.json(req.user.id === '00000000-0000-0000-0000-000000000000' ? mockStats : {})
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
                .eq('user_id', req.user.id)
                .order('date', { ascending: false })
                .limit(10)

            if (!error && data) return res.json(data)
            return res.json([])
        }

        res.json(req.user.id === '00000000-0000-0000-0000-000000000000' ? mockTransactions : [])
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
                .eq('user_id', req.user.id)
                .order('id', { ascending: true }) // Assuming id represents month order

            if (!error && data && data.length > 0) {
                const labels = data.map(d => d.month_label)
                const revenue = data.map(d => d.revenue)
                const expenses = data.map(d => d.expenses)
                return res.json({ labels, revenue, expenses })
            }

            // Empty user data
            return res.json({ labels: [], revenue: [], expenses: [] })
        }

        res.json(req.user.id === '00000000-0000-0000-0000-000000000000' ? mockRevenueData : { labels: [], revenue: [], expenses: [] })
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
                .eq('user_id', req.user.id)
                .order('amount', { ascending: false })

            if (!error && data) return res.json(data)
            return res.json([])
        }

        res.json(req.user.id === '00000000-0000-0000-0000-000000000000' ? mockExpenses : [])
    } catch (error) {
        next(error)
    }
})

export default router
