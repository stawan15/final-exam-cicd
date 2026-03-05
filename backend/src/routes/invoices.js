import { Router } from 'express'
import supabase from '../config/supabase.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /api/invoices
router.get('/', async (req, res, next) => {
    try {
        if (!supabase) return res.json([])
        const { data, error } = await supabase
            .from('invoices')
            .select('*')
            .eq('user_id', req.user.id)
            .order('due_date', { ascending: false })

        if (error) throw error
        res.json(data || [])
    } catch (error) {
        next(error)
    }
})

// POST /api/invoices
router.post('/', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { client_name, invoice_number, amount, status, due_date } = req.body

        const { data, error } = await supabase
            .from('invoices')
            .insert([{
                user_id: req.user.id,
                client_name,
                invoice_number,
                amount,
                status,
                due_date
            }])
            .select()
            .single()

        if (error) throw error
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

// PUT /api/invoices/:id/status
router.put('/:id/status', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { id } = req.params
        const { status } = req.body

        const { data, error } = await supabase
            .from('invoices')
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

// DELETE /api/invoices/:id
router.delete('/:id', async (req, res, next) => {
    try {
        if (!supabase) return res.status(500).json({ error: 'DB disconnected' })
        const { id } = req.params
        const { error } = await supabase
            .from('invoices')
            .delete()
            .eq('id', id)
            .eq('user_id', req.user.id)

        if (error) throw error
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

export default router
