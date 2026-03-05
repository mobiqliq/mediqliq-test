CREATE TABLE IF NOT EXISTS staff_attendance (
    id SERIAL PRIMARY KEY,
    staff_id INTEGER REFERENCES staff(id),
    clock_in TIMESTAMP,
    clock_out TIMESTAMP,
    total_hours DECIMAL(5, 2),
    status VARCHAR(20) -- 'PRESENT', 'LATE', 'ON_LEAVE'
);

CREATE TABLE IF NOT EXISTS monthly_payroll (
    id SERIAL PRIMARY KEY,
    staff_id INTEGER REFERENCES staff(id),
    month_year VARCHAR(7), -- e.g., '2026-03'
    base_salary DECIMAL(12, 2),
    commission_earned DECIMAL(12, 2), -- Fetched from commission_ledger
    deductions DECIMAL(12, 2) DEFAULT 0.00,
    net_payable DECIMAL(12, 2),
    status VARCHAR(20) DEFAULT 'DRAFT' -- 'DRAFT', 'PROCESSED', 'PAID'
);
