import { Router } from 'express'
import prisma from '../config/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/profile
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const data = await prisma.profile.findUnique({
            where: { id: req.user.id },
        })
        res.json(data || { id: req.user.id })
    } catch (error) {
        next(error)
    }
})

// PUT /api/profile
router.put('/', requireAuth, async (req, res, next) => {
    try {
        const { first_name, last_name, workspace_name, currency, theme, avatar_url } = req.body
        const data = await prisma.profile.upsert({
            where: { id: req.user.id },
            update: {
                firstName: first_name,
                lastName: last_name,
                workspaceName: workspace_name,
                currency,
                theme,
                avatarUrl: avatar_url,
                updatedAt: new Date(),
            },
            create: {
                id: req.user.id,
                firstName: first_name,
                lastName: last_name,
                workspaceName: workspace_name,
                currency,
                theme,
                avatarUrl: avatar_url,
            },
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
})

export default router
