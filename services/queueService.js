const db = require('../database/db');

const queueService = {
    /**
     * Routes a patient to a specific department and doctor
     */
    async assignToDepartment(patientId, deptId, doctorId) {
        const sql = `
            INSERT INTO opd_visits (patient_id, department_id, doctor_id, status)
            VALUES ($1, $2, $3, 'WAITING') RETURNING token_number`;
        
        const res = await db.query(sql, [patientId, deptId, doctorId]);
        return { success: true, token: res.rows[0].token_number };
    },

    /**
     * Fetches the active queue for a specific doctor
     */
    async getDoctorQueue(doctorId) {
        const sql = `
            SELECT p.name, v.token_number, v.created_at 
            FROM opd_visits v
            JOIN patients p ON v.patient_id = p.id
            WHERE v.doctor_id = $1 AND v.status = 'WAITING'
            ORDER BY v.token_number ASC`;
        
        const res = await db.query(sql, [doctorId]);
        return res.rows;
    }
};

module.exports = queueService;
