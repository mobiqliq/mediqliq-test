ALTER TABLE hospital_profile ADD COLUMN IF NOT EXISTS primary_specialty VARCHAR(50) DEFAULT 'GENERAL';

-- Create a dynamic Clinical Findings table that works for any specialty
CREATE TABLE IF NOT EXISTS clinical_observations (
    id SERIAL PRIMARY KEY,
    visit_id INTEGER REFERENCES opd_visits(id),
    observation_key VARCHAR(100), -- e.g., 'BP', 'SpO2', 'Tooth_16_Condition', 'Refraction'
    observation_value TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
