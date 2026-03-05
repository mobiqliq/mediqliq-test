-- Define granular permissions for staff categories
CREATE TABLE IF NOT EXISTS role_permissions (
    role_name VARCHAR(50) PRIMARY KEY, -- 'NURSING', 'HOUSEKEEPING', 'PARAMEDICAL'
    can_view_vitals BOOLEAN DEFAULT FALSE,
    can_edit_inventory BOOLEAN DEFAULT FALSE,
    can_access_billing BOOLEAN DEFAULT FALSE,
    can_mark_room_clean BOOLEAN DEFAULT FALSE
);

-- Seed the professional hierarchy
INSERT INTO role_permissions (role_name, can_view_vitals, can_edit_inventory) VALUES 
('NURSING', TRUE, TRUE),
('PARAMEDICAL', TRUE, FALSE),
('HOUSEKEEPING', FALSE, FALSE);
