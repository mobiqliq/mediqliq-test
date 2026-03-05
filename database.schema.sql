-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- =========================
-- HOSPITAL
-- =========================

CREATE TABLE hospital (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    email TEXT,
    created_at TIMESTAMP DEFAULT NOW()

);


-- =========================
-- USERS
-- =========================

CREATE TABLE users (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP DEFAULT NOW()

);


-- =========================
-- PATIENTS
-- =========================

CREATE TABLE patients (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uhid TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    gender TEXT,
    phone TEXT,
    date_of_birth DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW()

);


-- =========================
-- OPD VISITS
-- =========================

CREATE TABLE opd_visits (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES users(id),
    visit_date TIMESTAMP DEFAULT NOW(),
    status TEXT DEFAULT 'WAITING',
    notes TEXT

);


-- =========================
-- INVOICES
-- =========================

CREATE TABLE invoices (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT UNIQUE,
    patient_id UUID REFERENCES patients(id),
    total_amount NUMERIC,
    payment_status TEXT DEFAULT 'PENDING',
    payment_mode TEXT,
    created_at TIMESTAMP DEFAULT NOW()

);


-- =========================
-- EXPENSES
-- =========================

CREATE TABLE expenses (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount NUMERIC,
    category TEXT,
    description TEXT,
    expense_date TIMESTAMP DEFAULT NOW()

);


-- =========================
-- DAILY CLOSING
-- =========================

CREATE TABLE daily_closing (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    closing_date DATE,
    system_cash NUMERIC,
    system_upi NUMERIC,
    system_card NUMERIC,
    total_revenue NUMERIC,
    total_expense NUMERIC,
    physical_cash NUMERIC,
    variance NUMERIC,
    is_monthly BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()

);
