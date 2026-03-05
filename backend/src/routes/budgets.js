import { Router } from 'express'
import supabase from '../config/supabase.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/budgets
router.get('/', async (req, res, next) => {
    try {
        if (!supabase) return res.json([])
        const { data, error } = await supabase
            .from('budgets')
            .select('*')
            .eq('user_id', req.user.id)
            .order('limit_amount', { ascending: false })

        if (error) throw error
        res.json(data || [])
    } catch (error) {
        next(error)
    }
})

// POST /api/budgets
router.post('/', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { category, limit_amount, month } = req.body

        const { data, error } = await supabase
            .from('budgets')
            .insert([{
                user_id: req.user.id,
                category,
                limit_amount,
                spent_amount: 0,
                month
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
