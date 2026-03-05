const db = require('../database/db');

const consultationService = {
    async submitConsultation(consultationData) {
        const client = await db.getClient();
        try {
            await client.query('BEGIN');
            const { visit_id, doctor_id, symptoms, diagnosis, notes, prescriptionItems } = consultationData;

            const consultSql = `
                INSERT INTO consultations (visit_id, doctor_id, symptoms, diagnosis, notes)
                VALUES ($1, $2, $3, $4, $5) RETURNING id`;
            const consultRes = await client.query(consultSql, [visit_id, doctor_id, symptoms, diagnosis, notes]);
            const consultationId = consultRes.rows[0].id;

            const itemSql = `
                INSERT INTO prescriptions (consultation_id, medicine, dosage, frequency, days, instructions)
                VALUES ($1, $2, $3, $4, $5, $6)`;
            
            if (prescriptionItems && prescriptionItems.length > 0) {
                for (const item of prescriptionItems) {
                    await client.query(itemSql, [
                        consultationId, item.medicine, item.dosage, item.frequency, item.days, item.instructions
                    ]);
                }
            }

            await client.query("UPDATE opd_visits SET status = 'COMPLETED' WHERE id = $1", [visit_id]);
            await client.query('COMMIT');
            return { success: true, consultationId };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Consultation Error:", error);
            return { success: false, error: error.message };
        } finally {
            client.release();
        }
    }
};

module.exports = consultationService;
