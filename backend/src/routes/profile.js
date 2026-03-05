import express from 'express';
const router = express.Router();
import supabase from '../config/supabase.js';
import { requireAuth } from '../middleware/auth.js';

// GET /api/profile
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', req.user.id)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"

        // If no profile exists yet, return empty object or default
        res.json(data || { id: req.user.id });
    } catch (error) {
        next(error);
    }
});

// PUT /api/profile
router.put('/', requireAuth, async (req, res, next) => {
    try {
        const { first_name, last_name, workspace_name, currency, theme, avatar_url } = req.body;

        const { data, error } = await supabase
            .from('profiles')
            .upsert({
                id: req.user.id,
                first_name,
                last_name,
                workspace_name,
                currency,
                theme,
                avatar_url,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        next(error);
    }
});

export default router;
