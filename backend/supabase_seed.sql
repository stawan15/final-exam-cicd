-- 1. Drop existing tables to add the new user_id column
DROP TABLE IF EXISTS dashboard_stats CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS monthly_revenue CASCADE;
DROP TABLE IF EXISTS expense_categories CASCADE;

-- 2. Create Tables with user_id to support multiple accounts

-- Dashboard stats
CREATE TABLE dashboard_stats (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
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
  user_id UUID NOT NULL,
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
  user_id UUID NOT NULL,
  month_label TEXT,
  revenue DECIMAL,
  expenses DECIMAL
);

-- Expense categories
CREATE TABLE expense_categories (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT,
  amount DECIMAL,
  percentage INTEGER,
  color TEXT
);

-- Optional: Enable Row Level Security (RLS) so users can only access their own data directly from frontend
-- ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view their own stats" ON dashboard_stats FOR SELECT USING (auth.uid() = user_id);
-- (Repeat for other tables if querying directly from frontend)

-- 3. Insert Seed Data for the Demo Account ('00000000-0000-0000-0000-000000000000')

-- Insert Stats
INSERT INTO dashboard_stats (user_id, total_revenue, total_expenses, net_profit, active_users, revenue_change, expense_change, profit_change, user_change)
VALUES ('00000000-0000-0000-0000-000000000000', 284500, 156200, 128300, 2847, 12.5, -3.2, 24.8, 8.1);

-- Insert Transactions
INSERT INTO transactions (user_id, name, category, amount, status, date, icon) VALUES 
('00000000-0000-0000-0000-000000000000', 'Stripe Payment', 'Revenue', 2450.00, 'completed', '2026-03-05', '💳'),
('00000000-0000-0000-0000-000000000000', 'AWS Services', 'Infrastructure', -1280.00, 'completed', '2026-03-05', '☁️'),
('00000000-0000-0000-0000-000000000000', 'Client Invoice #1042', 'Revenue', 8500.00, 'pending', '2026-03-04', '📄'),
('00000000-0000-0000-0000-000000000000', 'Office Supplies', 'Operations', -342.50, 'completed', '2026-03-04', '📦'),
('00000000-0000-0000-0000-000000000000', 'Subscription Revenue', 'Revenue', 15600.00, 'completed', '2026-03-03', '🔄'),
('00000000-0000-0000-0000-000000000000', 'Marketing Campaign', 'Marketing', -4200.00, 'processing', '2026-03-03', '📢'),
('00000000-0000-0000-0000-000000000000', 'Consulting Fee', 'Revenue', 6750.00, 'completed', '2026-03-02', '💼'),
('00000000-0000-0000-0000-000000000000', 'Software License', 'Operations', -890.00, 'completed', '2026-03-02', '🖥️'),
('00000000-0000-0000-0000-000000000000', 'Product Sale', 'Revenue', 3200.00, 'completed', '2026-03-01', '🛒'),
('00000000-0000-0000-0000-000000000000', 'Team Lunch', 'Operations', -185.00, 'completed', '2026-03-01', '🍽️');

-- Insert Monthly Revenue
INSERT INTO monthly_revenue (user_id, month_label, revenue, expenses) VALUES 
('00000000-0000-0000-0000-000000000000', 'Jan', 18500, 12400),
('00000000-0000-0000-0000-000000000000', 'Feb', 22300, 14200),
('00000000-0000-0000-0000-000000000000', 'Mar', 19800, 13800),
('00000000-0000-0000-0000-000000000000', 'Apr', 27400, 16500),
('00000000-0000-0000-0000-000000000000', 'May', 24600, 15200),
('00000000-0000-0000-0000-000000000000', 'Jun', 31200, 18900),
('00000000-0000-0000-0000-000000000000', 'Jul', 28900, 17200),
('00000000-0000-0000-0000-000000000000', 'Aug', 35100, 20100),
('00000000-0000-0000-0000-000000000000', 'Sep', 32400, 19400),
('00000000-0000-0000-0000-000000000000', 'Oct', 38700, 22300),
('00000000-0000-0000-0000-000000000000', 'Nov', 34200, 20800),
('00000000-0000-0000-0000-000000000000', 'Dec', 41500, 24100);

-- Insert Expense Categories
INSERT INTO expense_categories (user_id, category, amount, percentage, color) VALUES 
('00000000-0000-0000-0000-000000000000', 'Infrastructure', 45200, 29, '#6366f1'),
('00000000-0000-0000-0000-000000000000', 'Salaries', 52000, 33, '#8b5cf6'),
('00000000-0000-0000-0000-000000000000', 'Marketing', 28400, 18, '#06b6d4'),
('00000000-0000-0000-0000-000000000000', 'Operations', 18600, 12, '#10b981'),
('00000000-0000-0000-0000-000000000000', 'Other', 12000, 8, '#f59e0b');
