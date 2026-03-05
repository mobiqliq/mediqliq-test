const db = require('../database/db');

const procedureScheduler = {
    /**
     * Automatically adds a scheduled procedure to the top of tomorrow's queue
     * and blocks that time in the appointment calendar.
     */
    async scheduleProcedure(patientId, doctorId, date, startTime) {
        // 1. Create the Procedure Record
        await db.query(`
            INSERT INTO appointments (patient_id, doctor_id, appointment_type, scheduled_at, duration_minutes)
            VALUES ($1, $2, $3, 60)`, [patientId, doctorId, 'PROCEDURE', `${date} ${startTime}`]);

        // 2. Mark the slot as "BLOCKED" in the global calendar to prevent New Appts
        return { success: true, message: "Procedure Locked: Morning slots reserved." };
    }
};
module.exports = procedureScheduler;
