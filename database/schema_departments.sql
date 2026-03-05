-- 1. Create Departmental Hierarchy
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospital_profile(id),
    dept_name VARCHAR(100), -- e.g., 'Dental', 'Pediatrics', 'General Medicine'
    dept_head_id INTEGER, -- Links to a Doctor in the staff table
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Link Staff to Departments
ALTER TABLE staff ADD COLUMN IF NOT EXISTS department_id INTEGER REFERENCES departments(id);

-- 3. Department-Specific Service Mapping
ALTER TABLE service_catalog ADD COLUMN IF NOT EXISTS department_id INTEGER REFERENCES departments(id);
