-- 1. External Doctor Directory
CREATE TABLE IF NOT EXISTS external_doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    specialty VARCHAR(100),
    clinic_name VARCHAR(200),
    contact_phone VARCHAR(15),
    upi_id VARCHAR(50), -- For professional fee settlement
    pan_card VARCHAR(10) -- For TDS compliance
);

-- 2. Referral Transaction Log
CREATE TABLE IF NOT EXISTS referral_leads (
    id SERIAL PRIMARY KEY,
    referring_doctor_id INTEGER REFERENCES external_doctors(id),
    patient_id INTEGER REFERENCES patients(id),
    visit_id INTEGER REFERENCES opd_visits(id),
    admission_id INTEGER REFERENCES ipd_admissions(id),
    referral_fee_amount DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, CONVERTED, SETTLED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
