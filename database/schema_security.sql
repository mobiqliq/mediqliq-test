-- 1. Central Audit Log (Immutable)
CREATE TABLE IF NOT EXISTS security_audit_logs (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50), -- e.g., 'PRESCRIPTION', 'BILL', 'PATIENT'
    entity_id INTEGER,
    action VARCHAR(20), -- INSERT, UPDATE, DELETE, ACCESS
    performed_by INTEGER REFERENCES staff(id),
    client_ip VARCHAR(45),
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Security Alerts (Real-time monitoring)
CREATE TABLE IF NOT EXISTS security_alerts (
    id SERIAL PRIMARY KEY,
    severity VARCHAR(10), -- LOW, MEDIUM, HIGH, CRITICAL
    alert_type VARCHAR(50), -- BRUTE_FORCE, PRIVILEGE_ESCALATION, DATA_EXPORT
    description TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
