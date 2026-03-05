const db = require('../database/db');

const timelineService = {
    /**
     * Aggregates all clinical and financial events for a single patient
     */
    async getFullHistory(patientId) {
        const sql = `
            (SELECT created_at, 'VISIT' as type, 'General Consultation' as title, 'Visit to ' || d.dept_name as description 
             FROM opd_visits v JOIN departments d ON v.department_id = d.id WHERE v.patient_id = $1)
            UNION ALL
            (SELECT created_at, 'DENTAL' as type, 'Procedure: ' || procedure_name as title, 'Tooth #' || tooth_number as description 
             FROM dental_treatment_plans WHERE patient_id = $1)
            UNION ALL
            (SELECT created_at, 'PHARMACY' as type, 'Medicine Dispensed' as title, item_name as description 
             FROM billing WHERE patient_id = $1 AND type = 'PHARMACY')
            UNION ALL
            (SELECT created_at, 'REFERRAL' as type, 'Internal Referral' as title, referral_note as description 
             FROM internal_referrals WHERE patient_id = $1)
            ORDER BY created_at DESC`;
        
        const res = await db.query(sql, [patientId]);
        return res.rows;
    }
};

module.exports = timelineService;
