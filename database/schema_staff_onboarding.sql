-- Enhanced Staff Table for Polyclinic Professionalism
ALTER TABLE staff ADD COLUMN IF NOT EXISTS gender VARCHAR(10);
ALTER TABLE staff ADD COLUMN IF NOT EXISTS date_of_joining DATE DEFAULT CURRENT_DATE;
ALTER TABLE staff ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(20);
ALTER TABLE staff ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ACTIVE'; -- ACTIVE, ON_LEAVE, TERMINATED

-- Track which Doctor belongs to which Medical Council
CREATE TABLE IF NOT EXISTS medical_councils (
    id SERIAL PRIMARY KEY,
    council_name VARCHAR(100) -- e.g., 'Delhi Medical Council', 'Karnataka Dental Council'
);
