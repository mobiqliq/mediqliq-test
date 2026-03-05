-- Admin Policy Control
ALTER TABLE hospital_profile ADD COLUMN IF NOT EXISTS follow_up_window_days INTEGER DEFAULT 7;
ALTER TABLE hospital_profile ADD COLUMN IF NOT EXISTS dormant_account_months INTEGER DEFAULT 12;

-- Enhanced Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    doctor_id INTEGER REFERENCES staff(id),
    appointment_type VARCHAR(20), -- 'NEW', 'FOLLOW_UP', 'PROCEDURE'
    scheduled_at TIMESTAMP,
    duration_minutes INTEGER DEFAULT 15,
    is_paid BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'SCHEDULED', -- SCHEDULED, CHECKED_IN, NO_SHOW
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
