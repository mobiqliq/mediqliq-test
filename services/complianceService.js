const db = require('../database/db');

const complianceService = {
    /**
     * Logs PHI (Protected Health Information) access for Regulatory Audits
     */
    async logAccess(staff_id, patient_id, action_type) {
        const sql = `
            INSERT INTO compliance_audit_logs 
            (staff_id, patient_id, action_type, ip_address, access_timestamp)
            VALUES ($1, $2, $3, 'LOCAL_OS', CURRENT_TIMESTAMP)`;
        
        try {
            await db.query(sql, [staff_id, patient_id, action_type]);
            return { success: true };
        } catch (error) {
            console.error("Compliance Log Failure:", error);
            // In a high-security environment, we might block the action if logging fails
        }
    }
};

module.exports = complianceService;
