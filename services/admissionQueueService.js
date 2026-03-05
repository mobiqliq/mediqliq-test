const db = require('../database/db');

const admissionQueueService = {
    /**
     * Requirement: Click to Admit -> Generate Reception Queue
     */
    async triggerAdmission(visitId, doctorId, roomCategory, notes) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            // 1. Mark the OPD Visit as "Admission Proposed"
            await client.query('UPDATE opd_visits SET queue_status = $1 WHERE id = $2', ['ADMISSION_PROPOSED', visitId]);

            // 2. Insert into the IPD Admission Queue (Reception View)
            const sql = `
                INSERT INTO admission_queue (visit_id, requested_by, preferred_room_type, clinical_notes, status)
                VALUES ($1, $2, $3, $4, 'AWAITING_DEPOSIT')`;
            
            await client.query(sql, [visitId, doctorId, roomCategory, notes]);

            await client.query('COMMIT');
            return { success: true, message: "Admission request sent to Reception for billing." };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
};
module.exports = admissionQueueService;
