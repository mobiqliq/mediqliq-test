const db = require('../database/db');

const internalReferralService = {
    /**
     * Requirement: Refer to another In-House Specialist
     */
    async createReferral(visitId, fromDocId, toDeptId, priority = 'NORMAL', note) {
        const visit = await db.query('SELECT patient_id, episode_id FROM opd_visits WHERE id = $1', [visitId]);
        
        const sql = `
            INSERT INTO internal_referrals (episode_id, from_doctor_id, to_department_id, priority, referral_note)
            VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        
        await db.query(sql, [visit.rows[0].episode_id, fromDocId, toDeptId, priority, note]);

        // This creates a "Referral" entry in the OPD Queue for the receiving department
        return { success: true, message: "Referral sent to the receiving department queue." };
    }
};
module.exports = internalReferralService;
