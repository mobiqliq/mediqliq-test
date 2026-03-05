CREATE TABLE IF NOT EXISTS bmw_logs (
    id SERIAL PRIMARY KEY,
    ward_id INTEGER REFERENCES wards(id),
    category VARCHAR(20), -- YELLOW, RED, WHITE, BLUE
    weight_kg DECIMAL(5, 2),
    staff_id INTEGER REFERENCES staff(id),
    scanned_barcode VARCHAR(100), -- Bag Barcode
    pickup_agency_id VARCHAR(50), -- Link to the waste management agency
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
