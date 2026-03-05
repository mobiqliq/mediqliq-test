-- Correction: The Folio links all IPD activities to a single financial bucket
CREATE TABLE IF NOT EXISTS ipd_folios (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    admission_id INTEGER, -- Link to IPD Admission
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, DISCHARGED, SETTLED
    total_accrued_amount DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Every Ward Requisition now hits the Folio instead of requiring instant payment
ALTER TABLE pharmacy_invoices ADD COLUMN IF NOT EXISTS folio_id INTEGER REFERENCES ipd_folios(id);
ALTER TABLE lab_orders ADD COLUMN IF NOT EXISTS folio_id INTEGER REFERENCES ipd_folios(id);
