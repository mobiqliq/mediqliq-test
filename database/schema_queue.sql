-- Tracking the live state of a patient visit
ALTER TABLE opd_visits ADD COLUMN IF NOT EXISTS queue_status VARCHAR(30) DEFAULT 'CHECKED_IN'; 
-- Statuses: CHECKED_IN, VITALS_DONE, IN_CONSULTATION, PHARMACY_PENDING, COMPLETED

-- Track wait times for Analytics
ALTER TABLE opd_visits ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE opd_visits ADD COLUMN IF NOT EXISTS consultation_started_at TIMESTAMP;
