import { Router } from 'express'
import prisma from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/investments
router.get('/', async (req, res, next) => {
    try {
        const data = await prisma.investment.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// POST /api/investments
router.post('/', async (req, res, next) => {
    try {
        const { symbol, name, shares, avg_price, current_price, type } = req.body
        const data = await prisma.investment.create({
            data: {
                userId: req.user.id,
                symbol,
                name,
                shares,
                avgPrice: avg_price,
                currentPrice: current_price,
                type,
            },
        })
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

export default router
