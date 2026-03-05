const db = require('../database/db');

const secureSearchService = {
    async findPatient(query, userRole) {
        // 1. Basic Identity Search (Always visible to all staff)
        const identitySql = `
            SELECT id, name, uhid, phone 
            FROM patients 
            WHERE name ILIKE $1 OR phone ILIKE $1 OR uhid ILIKE $1 
            LIMIT 5`;
        
        const patients = await db.query(identitySql, [`%${query}%`]);

        // 2. Role-Based Data Masking
        return patients.rows.map(patient => {
            const result = { identity: patient };
            
            // Front Desk sees only the queue status
            if (userRole === 'FRONT_DESK') {
                result.allowed_modules = ['REGISTRATION', 'BILLING_SUMMARY'];
            }
            // Doctors see the full clinical picture
            else if (userRole === 'DOCTOR') {
                result.allowed_modules = ['TIMELINE', 'CHARTING', 'PRESCRIPTION'];
            }
            
            return result;
        });
    }
};

module.exports = secureSearchService;
