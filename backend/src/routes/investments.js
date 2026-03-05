import { Router } from 'express'
import supabase from '../config/supabase.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/investments
router.get('/', async (req, res, next) => {
    try {
        if (!supabase) return res.json([])
        const { data, error } = await supabase
            .from('investments')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false })

        if (error) throw error
        res.json(data || [])
    } catch (error) {
        next(error)
    }
})

// POST /api/investments
router.post('/', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { symbol, name, shares, avg_price, current_price, type } = req.body

        const { data, error } = await supabase
            .from('investments')
            .insert([{
                user_id: req.user.id,
                symbol,
                name,
                shares,
                avg_price,
                current_price,
                type
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
