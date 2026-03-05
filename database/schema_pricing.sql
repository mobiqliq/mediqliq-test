CREATE TABLE IF NOT EXISTS service_catalog (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50),
    item_name VARCHAR(100) UNIQUE,
    standard_rate DECIMAL(10, 2),
    tax_percent DECIMAL(5, 2) DEFAULT 18.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO service_catalog (category, item_name, standard_rate) VALUES 
('DENTAL', 'Root Canal Treatment', 5500.00),
('DENTAL', 'Simple Extraction', 1200.00),
('CONSULTATION', 'General Checkup', 500.00)
ON CONFLICT (item_name) DO NOTHING;
