import { Router } from 'express'
import supabase from '../config/supabase.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/accounts
router.get('/', async (req, res, next) => {
    try {
        if (!supabase) return res.json([])
        const { data, error } = await supabase
            .from('user_accounts')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false })

        if (error) throw error
        res.json(data || [])
    } catch (error) {
        next(error)
    }
})

// POST /api/accounts
router.post('/', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { name, type, balance, number_last4 } = req.body

        const { data, error } = await supabase
            .from('user_accounts')
            .insert([{
                user_id: req.user.id,
                name,
                type,
                balance: balance || 0,
                number_last4,
                status: 'active'
            }])
            .select()
            .single()

        if (error) throw error
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

// DELETE /api/accounts/:id
router.delete('/:id', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { id } = req.params
        const { error } = await supabase
            .from('user_accounts')
            .delete()
            .eq('id', id)
            .eq('user_id', req.user.id) // Ensure users can only delete their own

        if (error) throw error
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

export default router
