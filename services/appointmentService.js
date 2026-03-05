const db = require('../database/db');

const appointmentService = {
    async determineAppointmentType(patientId, doctorId) {
        const config = await db.query('SELECT follow_up_window_days FROM hospital_profile LIMIT 1');
        const window = config.rows[0].follow_up_window_days;

        const lastVisit = await db.query(`
            SELECT created_at FROM opd_visits 
            WHERE patient_id = $1 AND doctor_id = $2 AND status = 'COMPLETED'
            ORDER BY created_at DESC LIMIT 1`, [patientId, doctorId]);

        if (lastVisit.rows.length === 0) return 'NEW';

        const lastDate = new Date(lastVisit.rows[0].created_at);
        const diffDays = Math.ceil((new Date() - lastDate) / (1000 * 60 * 60 * 24));

        return (diffDays <= window) ? 'FOLLOW_UP' : 'NEW';
    }
};
module.exports = appointmentService;
