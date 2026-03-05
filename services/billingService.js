const db = require('../database/db');

const billingService = {
    async generateInvoice(visit_id) {
        try {
            const visitSql = `SELECT v.*, p.first_name, p.last_name, p.uhid FROM opd_visits v JOIN patients p ON v.patient_id = p.id WHERE v.id = $1`;
            const visitRes = await db.query(visitSql, [visit_id]);
            const visit = visitRes.rows[0];
            const itemsSql = `SELECT pr.* FROM prescriptions pr JOIN consultations c ON pr.consultation_id = c.id WHERE c.visit_id = $1`;
            const itemsRes = await db.query(itemsSql, [visit_id]);
            const total = 500; 
            const invoiceSql = `INSERT INTO invoices (patient_id, visit_id, total, status) VALUES ($1, $2, $3, 'UNPAID') RETURNING *`;
            const invRes = await db.query(invoiceSql, [visit.patient_id, visit_id, total]);
            return { success: true, invoice: invRes.rows[0], items: itemsRes.rows };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

module.exports = billingService;
