import { Router } from 'express'
import prisma from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/cards
router.get('/', async (req, res, next) => {
    try {
        const data = await prisma.card.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// POST /api/cards
router.post('/', async (req, res, next) => {
    try {
        const { card_type, card_network, last_four, expiry, cardholder_name } = req.body
        const data = await prisma.card.create({
            data: {
                userId: req.user.id,
                cardType: card_type,
                cardNetwork: card_network,
                lastFour: last_four,
                expiry,
                cardholderName: cardholder_name,
                status: 'active',
                balance: 0,
            },
        })
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

// PUT /api/cards/:id/settings
router.put('/:id/settings', async (req, res, next) => {
    try {
        const { id } = req.params
        const { status } = req.body
        await prisma.card.updateMany({
            where: {
                id: parseInt(id),
                userId: req.user.id,
            },
            data: { status },
        })
        const updated = await prisma.card.findUnique({ where: { id: parseInt(id) } })
        res.json(updated)
    } catch (error) {
        next(error)
    }
})

export default router
