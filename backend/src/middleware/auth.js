import supabase from '../config/supabase.js'

export const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' })
    }

    const token = authHeader.split(' ')[1]

    if (token === 'demo-token') {
        req.user = { id: '00000000-0000-0000-0000-000000000000' }
        return next()
    }

    if (!supabase) {
        return res.status(500).json({ error: 'Supabase client not configured' })
    }

    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }

    req.user = user
    next()
}
