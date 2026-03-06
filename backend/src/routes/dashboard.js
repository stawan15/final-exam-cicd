import { Router } from 'express'
import prisma from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

// GET /api/dashboard/stats
router.get('/stats', async (req, res, next) => {
    try {
        const data = await prisma.dashboardStats.findFirst({
            where: { userId: req.user.id },
        })

        if (data) return res.json(data)

        // If new user with no data, return empty stats
        return res.json({
            totalRevenue: 0, totalExpenses: 0, netProfit: 0, activeUsers: 0,
            revenueChange: 0, expenseChange: 0, profitChange: 0, userChange: 0
        })
    } catch (error) {
        next(error)
    }
})

// GET /api/dashboard/transactions
router.get('/transactions', async (req, res, next) => {
    try {
        const data = await prisma.transaction.findMany({
            where: { userId: req.user.id },
            orderBy: { date: 'desc' },
            take: 10,
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// GET /api/dashboard/revenue
router.get('/revenue', async (req, res, next) => {
    try {
        const data = await prisma.monthlyRevenue.findMany({
            where: { userId: req.user.id },
            orderBy: { id: 'asc' },
        })

        if (data && data.length > 0) {
            const labels = data.map(d => d.monthLabel)
            const revenue = data.map(d => Number(d.revenue))
            const expenses = data.map(d => Number(d.expenses))
            return res.json({ labels, revenue, expenses })
        }

        return res.json({ labels: [], revenue: [], expenses: [] })
    } catch (error) {
        next(error)
    }
})

// GET /api/dashboard/expenses
router.get('/expenses', async (req, res, next) => {
    try {
        const data = await prisma.expenseCategory.findMany({
            where: { userId: req.user.id },
            orderBy: { amount: 'desc' },
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

export default router
