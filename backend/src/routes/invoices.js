import { Router } from 'express'
import prisma from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/invoices
router.get('/', async (req, res, next) => {
    try {
        const data = await prisma.invoice.findMany({
            where: { userId: req.user.id },
            orderBy: { dueDate: 'desc' },
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// POST /api/invoices
router.post('/', async (req, res, next) => {
    try {
        const { client_name, invoice_number, amount, status, due_date } = req.body
        const data = await prisma.invoice.create({
            data: {
                userId: req.user.id,
                clientName: client_name,
                invoiceNumber: invoice_number,
                amount,
                status,
                dueDate: new Date(due_date),
            },
        })
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

// PUT /api/invoices/:id/status
router.put('/:id/status', async (req, res, next) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const data = await prisma.invoice.updateMany({
            where: {
                id: parseInt(id),
                userId: req.user.id,
            },
            data: { status },
        })
        // Fetch updated record
        const updated = await prisma.invoice.findUnique({ where: { id: parseInt(id) } })
        res.json(updated)
    } catch (error) {
        next(error)
    }
})

// DELETE /api/invoices/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await prisma.invoice.deleteMany({
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
