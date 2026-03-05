-- Support for multi-mode payments and TPA
ALTER TABLE billing ADD COLUMN IF NOT EXISTS payment_mode VARCHAR(20) DEFAULT 'CASH'; -- CASH, UPI, CARD, TPA, MIXED
ALTER TABLE billing ADD COLUMN IF NOT EXISTS transaction_ref VARCHAR(100); -- UPI Ref or Card Auth ID
ALTER TABLE billing ADD COLUMN IF NOT EXISTS insurance_provider VARCHAR(100); -- For Cashless
ALTER TABLE billing ADD COLUMN IF NOT EXISTS approval_status VARCHAR(20) DEFAULT 'PAID'; -- PAID, PENDING_TPA, PARTIAL

-- Track Split Payments
CREATE TABLE IF NOT EXISTS payment_splits (
    id SERIAL PRIMARY KEY,
    billing_id INTEGER REFERENCES billing(id),
    mode VARCHAR(20),
    amount DECIMAL(10, 2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
