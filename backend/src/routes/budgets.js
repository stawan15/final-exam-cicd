import { Router } from 'express'
import prisma from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/budgets
router.get('/', async (req, res, next) => {
    try {
        const data = await prisma.budget.findMany({
            where: { userId: req.user.id },
            orderBy: { limitAmount: 'desc' },
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// POST /api/budgets
router.post('/', async (req, res, next) => {
    try {
        const { category, limit_amount, month } = req.body
        const data = await prisma.budget.create({
            data: {
                userId: req.user.id,
                category,
                limitAmount: limit_amount,
                spentAmount: 0,
                month,
            },
        })
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

export default router
