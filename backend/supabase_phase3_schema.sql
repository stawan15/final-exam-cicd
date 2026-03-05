-- Phase 3 Schema Additions for FinanceFlow
-- Run this in your Supabase SQL Editor

-- 1. Drop existing tables if re-applying
DROP TABLE IF EXISTS user_accounts CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS investments CASCADE;
DROP TABLE IF EXISTS budgets CASCADE;

-- 2. Create New Tables for Full CRUD

-- User Linked Accounts (Bank/Wallet)
CREATE TABLE user_accounts (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  balance DECIMAL NOT NULL DEFAULT 0,
  number_last4 TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  client_name TEXT NOT NULL,
  invoice_number TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  status TEXT NOT NULL,
  due_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cards (Virtual and Physical)
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  card_type TEXT NOT NULL, -- 'Virtual' or 'Physical'
  card_network TEXT NOT NULL, -- 'Visa' or 'Mastercard'
  last_four TEXT NOT NULL,
  expiry TEXT NOT NULL,
  cardholder_name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  balance DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investments (Portfolio Assets)
CREATE TABLE investments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  shares DECIMAL NOT NULL,
  avg_price DECIMAL NOT NULL,
  current_price DECIMAL NOT NULL,
  type TEXT NOT NULL, -- 'Stock', 'Crypto', 'ETF'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budgets (Monthly Tracking)
CREATE TABLE budgets (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  limit_amount DECIMAL NOT NULL,
  spent_amount DECIMAL DEFAULT 0,
  month TEXT NOT NULL, -- e.g. '2026-03'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Insert Phase 3 Seed Data for the Demo Account ('00000000-0000-0000-0000-000000000000')

-- Seed User Accounts
INSERT INTO user_accounts (user_id, name, type, balance, number_last4, status) VALUES 
('00000000-0000-0000-0000-000000000000', 'Chase Business Checking', 'Checking', 124500.50, '4092', 'active'),
('00000000-0000-0000-0000-000000000000', 'Stripe USD Account', 'Wallet', 45200.00, 'N/A', 'active'),
('00000000-0000-0000-0000-000000000000', 'Wise EUR Account', 'Wallet', 18450.75, 'N/A', 'active');

-- Seed Invoices
INSERT INTO invoices (user_id, client_name, invoice_number, amount, status, due_date) VALUES 
('00000000-0000-0000-0000-000000000000', 'Acme Corp', 'INV-2026-001', 8500.00, 'Pending', '2026-03-15'),
('00000000-0000-0000-0000-000000000000', 'Globex Inc', 'INV-2026-002', 12400.00, 'Paid', '2026-03-01'),
('00000000-0000-0000-0000-000000000000', 'Soylent Corp', 'INV-2026-003', 4200.00, 'Overdue', '2026-02-28');

-- Seed Cards
INSERT INTO cards (user_id, card_type, card_network, last_four, expiry, cardholder_name, balance, status) VALUES 
('00000000-0000-0000-0000-000000000000', 'Virtual', 'Visa', '4592', '12/28', 'Admin User', 1450.00, 'active'),
('00000000-0000-0000-0000-000000000000', 'Physical', 'Mastercard', '9931', '08/29', 'Admin User', 0.00, 'active');

-- Seed Investments
INSERT INTO investments (user_id, symbol, name, shares, avg_price, current_price, type) VALUES 
('00000000-0000-0000-0000-000000000000', 'AAPL', 'Apple Inc.', 150, 145.20, 172.50, 'Stock'),
('00000000-0000-0000-0000-000000000000', 'BTC', 'Bitcoin', 2.5, 42000.00, 64200.00, 'Crypto'),
('00000000-0000-0000-0000-000000000000', 'VOO', 'Vanguard S&P 500 ETF', 300, 380.00, 410.25, 'ETF');

-- Seed Budgets
INSERT INTO budgets (user_id, category, limit_amount, spent_amount, month) VALUES 
('00000000-0000-0000-0000-000000000000', 'Infrastructure', 50000, 45200, '2026-03'),
('00000000-0000-0000-0000-000000000000', 'Marketing', 35000, 28400, '2026-03'),
('00000000-0000-0000-0000-000000000000', 'Software Licenses', 15000, 18600, '2026-03'); -- Over budget example
