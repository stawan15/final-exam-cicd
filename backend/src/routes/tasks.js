import { Router } from 'express'
import prisma from '../config/prisma.js'

const router = Router()

// GET /api/tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { id: 'asc' },
        })
        res.json(tasks)
    } catch (error) {
        next(error)
    }
})

export default router
