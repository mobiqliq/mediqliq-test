const db = require('../database/db');

const billingGatekeeper = {
    /**
     * Requirement: Advance Payment for Labs/Consults
     * Checks if a patient is cleared for a specific service.
     */
    async isClearedForService(patientId, serviceType) {
        const sql = `
            SELECT b.status 
            FROM billing b 
            WHERE b.patient_id = $1 AND b.type = $2 
            ORDER BY b.created_at DESC LIMIT 1`;
        
        const res = await db.query(sql, [patientId, serviceType]);
        
        // If "Global Mode" is ON, always return true. 
        // If "India Mode" is ON, only return true if status is 'PAID'.
        return res.rows[0]?.status === 'PAID';
    }
};
module.exports = billingGatekeeper;
