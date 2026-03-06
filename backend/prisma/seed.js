import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000'

async function main() {
    console.log('🌱 Seeding database...')

    // Seed Tasks (required by exam spec)
    await prisma.task.createMany({
        data: [
            { title: 'Setup project structure', completed: true },
            { title: 'Create database schema', completed: true },
            { title: 'Implement API endpoints', completed: true },
            { title: 'Deploy to cloud', completed: false },
            { title: 'Write documentation', completed: false },
        ],
        skipDuplicates: true,
    })
    console.log('✅ Tasks seeded')

    // Seed Dashboard Stats
    await prisma.dashboardStats.upsert({
        where: { id: 1 },
        update: {},
        create: {
            userId: DEMO_USER_ID,
            totalRevenue: 284500,
            totalExpenses: 156200,
            netProfit: 128300,
            activeUsers: 2847,
            revenueChange: 12.5,
            expenseChange: -3.2,
            profitChange: 24.8,
            userChange: 8.1,
        },
    })
    console.log('✅ Dashboard stats seeded')

    // Seed Transactions
    await prisma.transaction.createMany({
        data: [
            { userId: DEMO_USER_ID, name: 'Stripe Payment', category: 'Revenue', amount: 2450.00, status: 'completed', date: new Date('2026-03-05'), icon: '💳' },
            { userId: DEMO_USER_ID, name: 'AWS Services', category: 'Infrastructure', amount: -1280.00, status: 'completed', date: new Date('2026-03-05'), icon: '☁️' },
            { userId: DEMO_USER_ID, name: 'Client Invoice #1042', category: 'Revenue', amount: 8500.00, status: 'pending', date: new Date('2026-03-04'), icon: '📄' },
            { userId: DEMO_USER_ID, name: 'Office Supplies', category: 'Operations', amount: -342.50, status: 'completed', date: new Date('2026-03-04'), icon: '📦' },
            { userId: DEMO_USER_ID, name: 'Subscription Revenue', category: 'Revenue', amount: 15600.00, status: 'completed', date: new Date('2026-03-03'), icon: '🔄' },
            { userId: DEMO_USER_ID, name: 'Marketing Campaign', category: 'Marketing', amount: -4200.00, status: 'processing', date: new Date('2026-03-03'), icon: '📢' },
            { userId: DEMO_USER_ID, name: 'Consulting Fee', category: 'Revenue', amount: 6750.00, status: 'completed', date: new Date('2026-03-02'), icon: '💼' },
            { userId: DEMO_USER_ID, name: 'Software License', category: 'Operations', amount: -890.00, status: 'completed', date: new Date('2026-03-02'), icon: '🖥️' },
            { userId: DEMO_USER_ID, name: 'Product Sale', category: 'Revenue', amount: 3200.00, status: 'completed', date: new Date('2026-03-01'), icon: '🛒' },
            { userId: DEMO_USER_ID, name: 'Team Lunch', category: 'Operations', amount: -185.00, status: 'completed', date: new Date('2026-03-01'), icon: '🍽️' },
        ],
        skipDuplicates: true,
    })
    console.log('✅ Transactions seeded')

    // Seed Monthly Revenue
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const revenueValues = [18500, 22300, 19800, 27400, 24600, 31200, 28900, 35100, 32400, 38700, 34200, 41500]
    const expenseValues = [12400, 14200, 13800, 16500, 15200, 18900, 17200, 20100, 19400, 22300, 20800, 24100]

    await prisma.monthlyRevenue.createMany({
        data: months.map((m, i) => ({
            userId: DEMO_USER_ID,
            monthLabel: m,
            revenue: revenueValues[i],
            expenses: expenseValues[i],
        })),
        skipDuplicates: true,
    })
    console.log('✅ Monthly revenue seeded')

    // Seed Expense Categories
    await prisma.expenseCategory.createMany({
        data: [
            { userId: DEMO_USER_ID, category: 'Infrastructure', amount: 45200, percentage: 29, color: '#6366f1' },
            { userId: DEMO_USER_ID, category: 'Salaries', amount: 52000, percentage: 33, color: '#8b5cf6' },
            { userId: DEMO_USER_ID, category: 'Marketing', amount: 28400, percentage: 18, color: '#06b6d4' },
            { userId: DEMO_USER_ID, category: 'Operations', amount: 18600, percentage: 12, color: '#10b981' },
            { userId: DEMO_USER_ID, category: 'Other', amount: 12000, percentage: 8, color: '#f59e0b' },
        ],
        skipDuplicates: true,
    })
    console.log('✅ Expense categories seeded')

    // Seed User Accounts
    await prisma.userAccount.createMany({
        data: [
            { userId: DEMO_USER_ID, name: 'Chase Business Checking', type: 'Checking', balance: 124500.50, numberLast4: '4092', status: 'active' },
            { userId: DEMO_USER_ID, name: 'Stripe USD Account', type: 'Wallet', balance: 45200.00, numberLast4: 'N/A', status: 'active' },
            { userId: DEMO_USER_ID, name: 'Wise EUR Account', type: 'Wallet', balance: 18450.75, numberLast4: 'N/A', status: 'active' },
        ],
        skipDuplicates: true,
    })
    console.log('✅ User accounts seeded')

    // Seed Invoices
    await prisma.invoice.createMany({
        data: [
            { userId: DEMO_USER_ID, clientName: 'Acme Corp', invoiceNumber: 'INV-2026-001', amount: 8500.00, status: 'Pending', dueDate: new Date('2026-03-15') },
            { userId: DEMO_USER_ID, clientName: 'Globex Inc', invoiceNumber: 'INV-2026-002', amount: 12400.00, status: 'Paid', dueDate: new Date('2026-03-01') },
            { userId: DEMO_USER_ID, clientName: 'Soylent Corp', invoiceNumber: 'INV-2026-003', amount: 4200.00, status: 'Overdue', dueDate: new Date('2026-02-28') },
        ],
        skipDuplicates: true,
    })
    console.log('✅ Invoices seeded')

    // Seed Cards
    await prisma.card.createMany({
        data: [
            { userId: DEMO_USER_ID, cardType: 'Virtual', cardNetwork: 'Visa', lastFour: '4592', expiry: '12/28', cardholderName: 'Admin User', balance: 1450.00, status: 'active' },
            { userId: DEMO_USER_ID, cardType: 'Physical', cardNetwork: 'Mastercard', lastFour: '9931', expiry: '08/29', cardholderName: 'Admin User', balance: 0.00, status: 'active' },
        ],
        skipDuplicates: true,
    })
    console.log('✅ Cards seeded')

    // Seed Investments
    await prisma.investment.createMany({
        data: [
            { userId: DEMO_USER_ID, symbol: 'AAPL', name: 'Apple Inc.', shares: 150, avgPrice: 145.20, currentPrice: 172.50, type: 'Stock' },
            { userId: DEMO_USER_ID, symbol: 'BTC', name: 'Bitcoin', shares: 2.5, avgPrice: 42000.00, currentPrice: 64200.00, type: 'Crypto' },
            { userId: DEMO_USER_ID, symbol: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 300, avgPrice: 380.00, currentPrice: 410.25, type: 'ETF' },
        ],
        skipDuplicates: true,
    })
    console.log('✅ Investments seeded')

    // Seed Budgets
    await prisma.budget.createMany({
        data: [
            { userId: DEMO_USER_ID, category: 'Infrastructure', limitAmount: 50000, spentAmount: 45200, month: '2026-03' },
            { userId: DEMO_USER_ID, category: 'Marketing', limitAmount: 35000, spentAmount: 28400, month: '2026-03' },
            { userId: DEMO_USER_ID, category: 'Software Licenses', limitAmount: 15000, spentAmount: 18600, month: '2026-03' },
        ],
        skipDuplicates: true,
    })
    console.log('✅ Budgets seeded')

    // Seed Profile
    await prisma.profile.upsert({
        where: { id: DEMO_USER_ID },
        update: {},
        create: {
            id: DEMO_USER_ID,
            firstName: 'Admin',
            lastName: 'User',
            workspaceName: 'FinanceFlow Demo',
            currency: 'USD',
            theme: 'dark',
        },
    })
    console.log('✅ Profile seeded')

    console.log('🎉 All seed data inserted successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
