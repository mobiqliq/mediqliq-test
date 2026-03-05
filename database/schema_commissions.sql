-- 1. Master Commission Rules
CREATE TABLE IF NOT EXISTS doctor_commission_rules (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES staff(id),
    service_category VARCHAR(50), -- 'CONSULTATION', 'LAB', 'PROCEDURE', 'PHARMACY'
    payout_type VARCHAR(20), -- 'PERCENTAGE', 'FIXED'
    payout_value DECIMAL(10, 2), -- e.g., 40.00 (%) or 500.00 (Fixed)
    UNIQUE(doctor_id, service_category)
);

-- 2. Real-time Payout Ledger
CREATE TABLE IF NOT EXISTS commission_ledger (
    id SERIAL PRIMARY KEY,
    billing_id INTEGER REFERENCES billing(id),
    doctor_id INTEGER REFERENCES staff(id),
    total_bill_amount DECIMAL(10, 2),
    doctor_share DECIMAL(10, 2),
    clinic_share DECIMAL(10, 2),
    is_settled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
