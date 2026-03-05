CREATE TABLE IF NOT EXISTS mediqliq_subscription (
    id SERIAL PRIMARY KEY,
    license_key TEXT UNIQUE,
    plan_type VARCHAR(50), -- 'TRIAL', 'GROWTH', 'ENTERPRISE'
    start_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    last_check_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed an initial trial for the user
INSERT INTO mediqliq_subscription (plan_type, expiry_date) 
VALUES ('GROWTH', CURRENT_DATE + INTERVAL '365 days')
ON CONFLICT DO NOTHING;
