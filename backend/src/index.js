import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    })
})

// Routes
import dashboardRoutes from './routes/dashboard.js'
import accountsRoutes from './routes/accounts.js'
import invoicesRoutes from './routes/invoices.js'
import cardsRoutes from './routes/cards.js'
import investmentsRoutes from './routes/investments.js'
import budgetsRoutes from './routes/budgets.js'
import transactionsRoutes from './routes/transactions.js'
import profileRoutes from './routes/profile.js'
import tasksRoutes from './routes/tasks.js'

app.use('/api/dashboard', dashboardRoutes)
app.use('/api/accounts', accountsRoutes)
app.use('/api/invoices', invoicesRoutes)
app.use('/api/cards', cardsRoutes)
app.use('/api/investments', investmentsRoutes)
app.use('/api/budgets', budgetsRoutes)
app.use('/api/transactions', transactionsRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/tasks', tasksRoutes)

// Error handling
app.use(errorHandler)

// Start server (always listen - for Render deployment)
app.listen(PORT, () => {
    console.log(`
      ╔═══════════════════════════════════════════╗
      ║  🚀 FinanceFlow API Server               ║
      ║  Running on http://localhost:${PORT}        ║
      ║  Environment: ${process.env.NODE_ENV || 'development'}            ║
      ╚═══════════════════════════════════════════╝
      `)
})
