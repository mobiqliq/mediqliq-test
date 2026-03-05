CREATE TABLE IF NOT EXISTS automated_lab_results (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    test_name VARCHAR(100),
    test_value DECIMAL(10, 3),
    unit VARCHAR(20),
    reference_range VARCHAR(50),
    is_critical BOOLEAN DEFAULT FALSE,
    raw_hl7_data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
