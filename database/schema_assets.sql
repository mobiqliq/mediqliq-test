-- 1. Asset Registry
CREATE TABLE IF NOT EXISTS medical_assets (
    id SERIAL PRIMARY KEY,
    asset_name VARCHAR(150),
    serial_number VARCHAR(100) UNIQUE,
    department_id INTEGER,
    purchase_date DATE,
    warranty_expiry DATE,
    last_calibration_date DATE,
    next_service_due DATE,
    status VARCHAR(20) DEFAULT 'OPERATIONAL' -- OPERATIONAL, UNDER_REPAIR, DECOMMISSIONED
);

-- 2. Maintenance Logs (Required for NABH/ISO audits)
CREATE TABLE IF NOT EXISTS asset_maintenance_logs (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER REFERENCES medical_assets(id),
    service_type VARCHAR(50), -- CALIBRATION, PREVENTIVE, BREAKDOWN
    performed_by VARCHAR(100),
    cost DECIMAL(12, 2),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
