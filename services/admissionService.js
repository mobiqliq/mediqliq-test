const db = require('../database/db');

const admissionService = {
    /**
     * Requirement: Prepare OPD for IPD transition
     * Creates an IPD request that the Billing Desk must approve.
     */
    async requestAdmission(visitId, roomTypeId, doctorId, reason) {
        const visit = await db.query('SELECT patient_id FROM opd_visits WHERE id = $1', [visitId]);
        const patientId = visit.rows[0].patient_id;

        // 1. Create the Episode (Type: IPD)
        const episode = await db.query(`
            INSERT INTO clinical_episodes (patient_id, episode_type, primary_doctor_id, status)
            VALUES ($1, 'IPD', $2, 'OPEN') RETURNING id`, [patientId, doctorId]);

        // 2. Link the current OPD visit to this new IPD Episode
        await db.query('UPDATE opd_visits SET episode_id = $1 WHERE id = $2', [episode.rows[0].id, visitId]);

        return { 
            success: true, 
            episodeId: episode.rows[0].id,
            message: "Admission Request Generated. Patient marked for IPD Transfer." 
        };
    }
};
module.exports = admissionService;
