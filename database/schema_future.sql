-- 1. Precision Medicine Layer
CREATE TABLE IF NOT EXISTS patient_biomarkers (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    marker_name VARCHAR(100), -- e.g., 'IL-1 Genetic Variation'
    marker_value VARCHAR(100),
    risk_factor DECIMAL(3,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Ambient Voice Log (For Zero-UI Audit)
CREATE TABLE IF NOT EXISTS ambient_recordings_log (
    id SERIAL PRIMARY KEY,
    visit_id INTEGER REFERENCES opd_visits(id),
    transcript_hash TEXT, -- Encrypted hash for legal proof of conversation
    ai_confidence_score DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
