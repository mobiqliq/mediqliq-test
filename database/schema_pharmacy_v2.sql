-- Master Medicine Catalog (NLEM + International Mapping)
CREATE TABLE IF NOT EXISTS medicine_catalog (
    id SERIAL PRIMARY KEY,
    nlem_category VARCHAR(100), -- e.g., 'Analgesics'
    generic_name VARCHAR(255) NOT NULL, -- e.g., 'Paracetamol'
    brand_name VARCHAR(255), -- e.g., 'Crocin'
    rxnorm_code VARCHAR(20), -- International Interoperability (e.g., 32248)
    atc_code VARCHAR(20), -- WHO ATC classification
    dosage_form VARCHAR(50), -- Tablet, Syrup, Injection
    is_nlem BOOLEAN DEFAULT TRUE
);

-- Supplier & Payables Management
CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(150) NOT NULL,
    gstin VARCHAR(15),
    contact_phone VARCHAR(15),
    total_payable DECIMAL(15, 2) DEFAULT 0.00,
    credit_period_days INTEGER DEFAULT 30
);

-- Purchase Orders (The Reorder Logic)
CREATE TABLE IF NOT EXISTS purchase_orders (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, SENT, RECEIVED, PAID
    total_amount DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
