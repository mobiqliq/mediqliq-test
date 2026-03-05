const db = require('../database/db');

const dentalService = {
    // Create a Treatment Plan (Estimate)
    async createTreatmentPlan(data) {
        try {
            const { patient_id, visit_id, tooth_number, procedure_name, estimated_cost } = data;
            const sql = `
                INSERT INTO dental_treatment_plans (patient_id, visit_id, tooth_number, procedure_name, estimated_cost, status)
                VALUES ($1, $2, $3, $4, $5, 'PROPOSED') RETURNING *`;
            const res = await db.query(sql, [patient_id, visit_id, tooth_number, procedure_name, estimated_cost]);
            return { success: true, data: res.rows[0] };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update tooth chart status
    async getPatientToothHistory(patient_id) {
        const sql = `SELECT * FROM dental_treatment_plans WHERE patient_id = $1 ORDER BY tooth_number ASC`;
        const res = await db.query(sql, [patient_id]);
        return { success: true, data: res.rows };
    }
};

module.exports = dentalService;
