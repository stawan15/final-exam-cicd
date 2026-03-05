# FinanceFlow 💰

A premium financial dashboard built with **Vue 3**, **Tailwind CSS**, and **Vite** on the frontend, powered by **Node.js/Express** and **Supabase** on the backend.

![Vue](https://img.shields.io/badge/Vue.js-3-4FC08D?style=flat-square&logo=vue.js)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)

---

## Features

- 📊 **Real-time Dashboard** — Revenue, expenses, profit, and user metrics
- 📈 **Interactive Charts** — Line/area charts and doughnut breakdowns (Chart.js)
- 💸 **Transaction Management** — Sortable table with status badges
- 🎯 **Quick Actions** — Shortcuts for common financial operations
- 🌙 **Dark Mode** — Premium glassmorphism design
- 📱 **Responsive** — Mobile-first layout with collapsible sidebar
- 🔄 **CI/CD** — GitHub Actions pipeline
- 🚀 **Vercel Ready** — One-click deployment

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3, Vite, Tailwind CSS 3, Pinia, Vue Router, Chart.js |
| Backend | Node.js, Express, Helmet, CORS |
| Database | Supabase (PostgreSQL) |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- (Optional) Supabase account

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd Final

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials (optional - app works with mock data)
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Supabase Setup (Optional)

Create these tables in your Supabase project:

```sql
-- Dashboard stats
CREATE TABLE dashboard_stats (
  id SERIAL PRIMARY KEY,
  total_revenue DECIMAL,
  total_expenses DECIMAL,
  net_profit DECIMAL,
  active_users INTEGER,
  revenue_change DECIMAL,
  expense_change DECIMAL,
  profit_change DECIMAL,
  user_change DECIMAL
);

-- Transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  name TEXT,
  category TEXT,
  amount DECIMAL,
  status TEXT,
  date DATE,
  icon TEXT
);

-- Monthly revenue
CREATE TABLE monthly_revenue (
  id SERIAL PRIMARY KEY,
  month_label TEXT,
  revenue DECIMAL,
  expenses DECIMAL
);

-- Expense categories
CREATE TABLE expense_categories (
  id SERIAL PRIMARY KEY,
  category TEXT,
  amount DECIMAL,
  percentage INTEGER,
  color TEXT
);
```

---

## Deployment

### Vercel

1. Connect your GitHub repository to Vercel
2. Set the root directory to the project root
3. Add your environment variables in Vercel dashboard
4. Deploy!

### GitHub Actions

The CI pipeline runs automatically on push/PR to `main`:
- ✅ Frontend build verification
- ✅ Backend syntax check

---

## Project Structure

```
├── frontend/          # Vue 3 + Vite + Tailwind
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── views/       # Page views
│   │   ├── router/      # Vue Router config
│   │   ├── stores/      # Pinia state management
│   │   └── services/    # API service layer
│   └── ...
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── config/      # Supabase client
│   │   └── seed/        # Mock data
│   └── ...
├── .github/workflows/ # CI/CD pipeline
└── vercel.json        # Deployment config
```

---

## License

MIT
