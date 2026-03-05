-- 1. Lab Catalog with Sourcing Logic
CREATE TABLE IF NOT EXISTS lab_test_catalog (
    id SERIAL PRIMARY KEY,
    test_name VARCHAR(100),
    test_source VARCHAR(20), -- 'IN_HOUSE', 'OUTSOURCED'
    base_cost DECIMAL(10, 2), -- What the clinic pays the outsource lab
    selling_price DECIMAL(10, 2), -- What the patient pays
    vendor_id INTEGER REFERENCES lab_vendors(id) -- NULL if in-house
);

-- 2. Outsource Lab Vendors Registry
CREATE TABLE IF NOT EXISTS lab_vendors (
    id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(100),
    contact_person VARCHAR(100),
    api_endpoint TEXT, -- For future digital integration
    account_balance DECIMAL(10, 2) DEFAULT 0.00
);
