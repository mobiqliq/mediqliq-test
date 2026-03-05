CREATE TABLE IF NOT EXISTS access_logs (
    id SERIAL PRIMARY KEY,
    staff_id INTEGER REFERENCES staff(id),
    patient_id INTEGER REFERENCES patients(id),
    access_type VARCHAR(50), -- 'ROUTINE', 'EMERGENCY_BREAK_GLASS'
    justification TEXT,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
