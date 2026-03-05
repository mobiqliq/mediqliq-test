-- Store legal and taxation documents
CREATE TABLE IF NOT EXISTS compliance_documents (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospital_profile(id),
    document_type VARCHAR(100), -- 'GST', 'Trade_License', 'Pollution_Board_NOC', 'Clinical_Establishment'
    document_number VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    file_path TEXT, -- Local path or Base64
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add PAN and GST directly to the main profile for billing headers
ALTER TABLE hospital_profile ADD COLUMN IF NOT EXISTS pan_number VARCHAR(20);
ALTER TABLE hospital_profile ADD COLUMN IF NOT EXISTS gst_number VARCHAR(20);
