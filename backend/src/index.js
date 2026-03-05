import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboard.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    })
})

// Routes
import accountsRoutes from './routes/accounts.js'
import invoicesRoutes from './routes/invoices.js'
import cardsRoutes from './routes/cards.js'
import investmentsRoutes from './routes/investments.js'
import budgetsRoutes from './routes/budgets.js'
import transactionsRoutes from './routes/transactions.js'
import profileRoutes from './routes/profile.js'

app.use('/api/dashboard', dashboardRoutes)
app.use('/api/accounts', accountsRoutes)
app.use('/api/invoices', invoicesRoutes)
app.use('/api/cards', cardsRoutes)
app.use('/api/investments', investmentsRoutes)
app.use('/api/budgets', budgetsRoutes)
app.use('/api/transactions', transactionsRoutes)
app.use('/api/profile', profileRoutes)

// Error handling
app.use(errorHandler)

// Start server
// Start server only if we are running locally
if (process.env.NODE_ENV !== 'production' || process.env.RUN_LOCAL === 'true') {
    app.listen(PORT, () => {
        console.log(`
      ╔═══════════════════════════════════════════╗
      ║  🚀 FinanceFlow API Server               ║
      ║  Running on http://localhost:${PORT}        ║
      ║  Environment: ${process.env.NODE_ENV || 'development'}            ║
      ╚═══════════════════════════════════════════╝
      `)
    })
}

// Export the app for Vercel serverless
export default app
