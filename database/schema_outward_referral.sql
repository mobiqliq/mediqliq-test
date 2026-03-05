-- 1. External Partner Registry (Labs, Scan Centers)
CREATE TABLE IF NOT EXISTS external_partners (
    id SERIAL PRIMARY KEY,
    partner_name VARCHAR(150),
    service_type VARCHAR(50), -- PATHOLOGY, RADIOLOGY, SPECIALIST
    commission_percentage DECIMAL(5, 2), -- e.g., 15.00
    contact_phone VARCHAR(15)
);

-- 2. Outward Referral Ledger
CREATE TABLE IF NOT EXISTS outward_referrals (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    internal_doctor_id INTEGER REFERENCES staff(id), -- Doctor who referred
    partner_id INTEGER REFERENCES external_partners(id),
    service_description TEXT,
    estimated_bill_value DECIMAL(12, 2),
    actual_commission_earned DECIMAL(12, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, COMPLETED, SETTLED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
