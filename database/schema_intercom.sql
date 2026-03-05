CREATE TABLE IF NOT EXISTS internal_messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES staff(id),
    receiver_role VARCHAR(50),
    ward_id INTEGER REFERENCES wards(id),
    priority VARCHAR(10) DEFAULT 'NORMAL',
    message_text TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
