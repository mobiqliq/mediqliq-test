-- 1. Master Inventory
CREATE TABLE IF NOT EXISTS pharmacy_stock (
    id SERIAL PRIMARY KEY,
    medicine_name VARCHAR(100),
    generic_name VARCHAR(100),
    batch_no VARCHAR(50),
    expiry_date DATE,
    quantity_in_hand INTEGER,
    reorder_level INTEGER DEFAULT 50,
    unit_price DECIMAL(10, 2)
);

-- 2. Automatic Reorder Queue
CREATE TABLE IF NOT EXISTS inventory_reorders (
    id SERIAL PRIMARY KEY,
    medicine_id INTEGER REFERENCES pharmacy_stock(id),
    suggested_quantity INTEGER,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, ORDERED, RECEIVED
    vendor_id INTEGER REFERENCES suppliers(id)
);
