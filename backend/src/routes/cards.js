import { Router } from 'express'
import supabase from '../config/supabase.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/cards
router.get('/', async (req, res, next) => {
    try {
        if (!supabase) return res.json([])
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false })

        if (error) throw error
        res.json(data || [])
    } catch (error) {
        next(error)
    }
})

// POST /api/cards
router.post('/', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { card_type, card_network, last_four, expiry, cardholder_name } = req.body

        const { data, error } = await supabase
            .from('cards')
            .insert([{
                user_id: req.user.id,
                card_type,
                card_network,
                last_four,
                expiry,
                cardholder_name,
                status: 'active',
                balance: 0
            }])
            .select()
            .single()

        if (error) throw error
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

// PUT /api/cards/:id/settings
router.put('/:id/settings', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { id } = req.params
        const { status } = req.body // e.g., 'frozen' or 'active'

        const { data, error } = await supabase
            .from('cards')
            .update({ status })
            .eq('id', id)
            .eq('user_id', req.user.id)
            .select()
            .single()

        if (error) throw error
        res.json(data)
    } catch (error) {
        next(error)
    }
})

export default router
