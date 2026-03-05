const db = require('../database/db');

const pharmacyRBACService = {
    /**
     * Requirement: Pharmacist fetches prescription without edit rights
     */
    async getPrescriptionForDispensing(visitId, staffRole) {
        if (staffRole !== 'PHARMACIST' && staffRole !== 'ADMIN') {
            throw new Error("Unauthorized: Only Pharmacists can access the Dispensing Queue.");
        }

        const sql = `
            SELECT 
                p.name as patient_name, 
                v.uhid, 
                rx.medication_json, 
                rx.doctor_signature,
                b.status as payment_status
            FROM prescriptions rx
            JOIN patients p ON rx.patient_id = p.id
            JOIN opd_visits v ON rx.visit_id = v.id
            JOIN billing b ON b.visit_id = v.id
            WHERE rx.visit_id = $1`;
        
        const res = await db.query(sql, [visitId]);
        return res.rows[0];
    }
};
module.exports = pharmacyRBACService;
