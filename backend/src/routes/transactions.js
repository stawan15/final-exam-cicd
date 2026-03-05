import { Router } from 'express'
import supabase from '../config/supabase.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// POST /api/transactions
router.post('/', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { name, category, amount, status, date, icon } = req.body

        const { data, error } = await supabase
            .from('transactions')
            .insert([{
                user_id: req.user.id,
                name,
                category,
                amount,
                status: status || 'completed',
                date: date || new Date().toISOString().split('T')[0],
                icon: icon || '💰'
            }])
            .select()
            .single()

        if (error) throw error
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

export default router
