ALTER TABLE prescriptions 
ADD COLUMN IF NOT EXISTS icd_code VARCHAR(20), -- ICD-10 or ICD-11
ADD COLUMN IF NOT EXISTS icd_version VARCHAR(10) DEFAULT 'ICD-11',
ADD COLUMN IF NOT EXISTS procedure_code VARCHAR(20), -- CPT or SNOMED-CT
ADD COLUMN IF NOT EXISTS procedure_standard VARCHAR(20) DEFAULT 'SNOMED-CT';

-- Create a lookup index for research and insurance audits
CREATE INDEX idx_clinical_codes ON prescriptions (icd_code, procedure_code);
