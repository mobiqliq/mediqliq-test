const db = require('../database/db');

const referralService = {
    /**
     * Initiates a referral from one department to another
     */
    async createReferral(referralData) {
        const sql = `
            INSERT INTO internal_referrals 
            (patient_id, from_doctor_id, to_dept_id, referral_note, priority)
            VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        
        const res = await db.query(sql, [
            referralData.patientId, 
            referralData.fromDoctorId, 
            referralData.toDeptId, 
            referralData.note,
            referralData.priority
        ]);
        
        return { success: true, referralId: res.rows[0].id };
    },

    /**
     * Fetches "Incoming" referrals for a specific department
     */
    async getIncomingReferrals(deptId) {
        const sql = `
            SELECT r.id, p.name as patient_name, s.name as from_doctor, r.referral_note, r.priority
            FROM internal_referrals r
            JOIN patients p ON r.patient_id = p.id
            JOIN staff s ON r.from_doctor_id = s.id
            WHERE r.to_dept_id = $1 AND r.status = 'PENDING'`;
        
        const res = await db.query(sql, [deptId]);
        return res.rows;
    }
};

module.exports = referralService;
