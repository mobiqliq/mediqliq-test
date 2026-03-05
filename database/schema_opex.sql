-- 1. Master Expense Registry
CREATE TABLE IF NOT EXISTS expense_ledger (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50), -- HR, UTILITIES, RENT, CONSUMABLES, WASTE
    description TEXT,
    amount DECIMAL(12, 2),
    gst_paid DECIMAL(12, 2) DEFAULT 0.00,
    itc_eligible BOOLEAN DEFAULT FALSE,
    payment_method VARCHAR(20), -- UPI, BANK, PETTY_CASH
    vendor_id INTEGER REFERENCES suppliers(id), -- If applicable
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Petty Cash Log (For high-frequency small spends)
CREATE TABLE IF NOT EXISTS petty_cash (
    id SERIAL PRIMARY KEY,
    issued_to VARCHAR(100),
    purpose VARCHAR(255),
    amount DECIMAL(10, 2),
    voucher_no VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
