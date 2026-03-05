-- Master Price List with expanded categories
CREATE TABLE IF NOT EXISTS service_prices (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) UNIQUE,
    category VARCHAR(50), -- 'CONSULTATION', 'PROCEDURE', 'BED', 'NURSING'
    current_price DECIMAL(10, 2),
    updated_by INTEGER REFERENCES staff(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- The Audit Log: Tracking every single change
CREATE TABLE IF NOT EXISTS price_audit_logs (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES service_prices(id),
    old_price DECIMAL(10, 2),
    new_price DECIMAL(10, 2),
    changed_by INTEGER REFERENCES staff(id),
    reason TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
