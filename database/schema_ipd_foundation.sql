-- 1. Create the Episode of Care (The Bridge)
CREATE TABLE IF NOT EXISTS clinical_episodes (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    episode_type VARCHAR(20) DEFAULT 'OPD', -- OPD, IPD, EMERGENCY
    admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    discharge_date TIMESTAMP,
    primary_doctor_id INTEGER REFERENCES staff(id),
    status VARCHAR(20) DEFAULT 'OPEN' -- OPEN, CLOSED, TRANSFERRED
);

-- 2. Link OPD visits and Future Bed stays to the Episode
ALTER TABLE opd_visits ADD COLUMN IF NOT EXISTS episode_id INTEGER REFERENCES clinical_episodes(id);

-- 3. Bed/Room Registry (The physical foundation)
CREATE TABLE IF NOT EXISTS room_registry (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(20) UNIQUE,
    room_type VARCHAR(50), -- General, Private, ICU, Day-Care
    base_price_per_day DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'AVAILABLE' -- AVAILABLE, OCCUPIED, CLEANING, MAINTENANCE
);
