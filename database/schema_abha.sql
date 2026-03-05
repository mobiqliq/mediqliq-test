-- Link the National Health ID to the Local Patient Profile
ALTER TABLE patients ADD COLUMN IF NOT EXISTS abha_number VARCHAR(17) UNIQUE; -- XX-XXXX-XXXX-XXXX
ALTER TABLE patients ADD COLUMN IF NOT EXISTS abha_address VARCHAR(50) UNIQUE; -- name@abdm
ALTER TABLE patients ADD COLUMN IF NOT EXISTS abha_status VARCHAR(20) DEFAULT 'UNVERIFIED';

-- Audit table for ABDM Consent (Legal Requirement)
CREATE TABLE IF NOT EXISTS abha_consent_logs (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    consent_type VARCHAR(50), -- 'VIEW_RECORD', 'SHARE_RECORD'
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_at TIMESTAMP
);
