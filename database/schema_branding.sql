-- Store Doctor's professional credentials and signature
ALTER TABLE staff ADD COLUMN IF NOT EXISTS qualifications VARCHAR(255);
ALTER TABLE staff ADD COLUMN IF NOT EXISTS reg_number VARCHAR(100);
ALTER TABLE staff ADD COLUMN IF NOT EXISTS signature_path TEXT; -- Base64 or local path
ALTER TABLE staff ADD COLUMN IF NOT EXISTS show_signature_default BOOLEAN DEFAULT TRUE;

-- Document Preferences (Global vs. Local)
CREATE TABLE IF NOT EXISTS document_settings (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospital_profile(id),
    show_global_header BOOLEAN DEFAULT TRUE,
    show_doctor_header BOOLEAN DEFAULT TRUE,
    show_legal_disclaimer BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
