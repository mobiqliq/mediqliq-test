const db = require('../database/db');

const opdService = {
    async createVisit(data) {
        const today = new Date().toISOString().split('T')[0];
        const sql = `INSERT INTO opd_visits (patient_id, doctor_id, department_id, visit_date, status) VALUES ($1, $2, $3, $4, 'WAITING') RETURNING *`;
        return await db.query(sql, [data.patient_id, data.doctor_id, data.department_id, today]);
    },
    async getDoctorQueue(doctor_id) {
        const today = new Date().toISOString().split('T')[0];
        const sql = `SELECT v.*, p.first_name, p.last_name FROM opd_visits v JOIN patients p ON v.patient_id = p.id WHERE v.doctor_id = $1 AND v.visit_date = $2 AND v.status = 'WAITING'`;
        return await db.query(sql, [doctor_id, today]);
    }
};

module.exports = opdService;
