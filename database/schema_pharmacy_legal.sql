-- 1. Pharmacy Legal Profile
CREATE TABLE IF NOT EXISTS pharmacy_legal_config (
    id SERIAL PRIMARY KEY,
    entity_name VARCHAR(150), -- e.g., "Mediqliq Pharmacy Pvt Ltd"
    gstin VARCHAR(15),
    drug_license_no VARCHAR(50),
    hsn_sac_code VARCHAR(10) DEFAULT '3004', -- Medicines
    bank_details JSONB,
    tax_inclusive BOOLEAN DEFAULT TRUE
);

-- 2. Isolated Pharmacy Invoicing (Different series from Hospital)
CREATE TABLE IF NOT EXISTS pharmacy_invoices (
    id SERIAL PRIMARY KEY,
    invoice_no VARCHAR(50) UNIQUE, -- e.g., PH/25-26/0001
    visit_id INTEGER REFERENCES opd_visits(id),
    total_taxable_value DECIMAL(12, 2),
    cgst_amount DECIMAL(12, 2),
    sgst_amount DECIMAL(12, 2),
    total_invoice_value DECIMAL(12, 2),
    payment_status VARCHAR(20) DEFAULT 'PAID'
);
