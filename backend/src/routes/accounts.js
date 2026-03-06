import { Router } from 'express'
import prisma from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/accounts
router.get('/', async (req, res, next) => {
    try {
        const data = await prisma.userAccount.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// POST /api/accounts
router.post('/', async (req, res, next) => {
    try {
        const { name, type, balance, number_last4 } = req.body
        const data = await prisma.userAccount.create({
            data: {
                userId: req.user.id,
                name,
                type,
                balance: balance || 0,
                numberLast4: number_last4,
                status: 'active',
            },
        })
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

// DELETE /api/accounts/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await prisma.userAccount.deleteMany({
            where: {
                id: parseInt(id),
                userId: req.user.id,
            },
        })
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

export default router
