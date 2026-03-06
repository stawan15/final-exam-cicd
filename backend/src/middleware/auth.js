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

    // For non-demo tokens, reject (Supabase auth removed after Prisma migration)
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
}
