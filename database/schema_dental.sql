CREATE TABLE IF NOT EXISTS tooth_conditions (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    tooth_number INTEGER NOT NULL,
    condition_type VARCHAR(50),
    notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dental_treatment_plans (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    visit_id INTEGER REFERENCES opd_visits(id),
    tooth_number INTEGER NOT NULL,
    procedure_name VARCHAR(255),
    estimated_cost DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'PROPOSED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
