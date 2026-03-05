CREATE TABLE IF NOT EXISTS internal_referrals (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    from_doctor_id INTEGER REFERENCES staff(id),
    to_dept_id INTEGER REFERENCES departments(id),
    to_doctor_id INTEGER REFERENCES staff(id), -- Optional: Specific or "Any"
    referral_note TEXT,
    priority VARCHAR(20) DEFAULT 'ROUTINE', -- ROUTINE, URGENT, EMERGENCY
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, ACCEPTED, COMPLETED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
