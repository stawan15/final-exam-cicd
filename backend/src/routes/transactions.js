import { Router } from 'express'
import prisma from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// POST /api/transactions
router.post('/', async (req, res, next) => {
    try {
        const { name, category, amount, status, date, icon } = req.body
        const data = await prisma.transaction.create({
            data: {
                userId: req.user.id,
                name,
                category,
                amount,
                status: status || 'completed',
                date: date ? new Date(date) : new Date(),
                icon: icon || '💰',
            },
        })
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

export default router
