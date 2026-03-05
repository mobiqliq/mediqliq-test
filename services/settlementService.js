const db = require('../database/db');

const settlementService = {
    /**
     * Requirement: Batch settle all outstanding dues for a doctor
     */
    async processDoctorSettlement(doctorId, staffId, paymentMethod, refNo) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            // 1. Calculate total due before clearing
            const dueRes = await client.query(
                'SELECT SUM(doctor_share) as total FROM commission_ledger WHERE doctor_id = $1 AND is_settled = FALSE',
                [doctorId]
            );
            const totalAmount = dueRes.rows[0].total || 0;

            if (totalAmount <= 0) throw new Error("No outstanding dues for this doctor.");

            // 2. Create the Master Payout Record
            const payout = await client.query(
                `INSERT INTO master_payouts (doctor_id, amount, processed_by, payment_method, reference_no) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                [doctorId, totalAmount, staffId, paymentMethod, refNo]
            );

            // 3. Mark individual ledger entries as settled and link to Master Payout
            await client.query(
                'UPDATE commission_ledger SET is_settled = TRUE, master_payout_id = $1 WHERE doctor_id = $2 AND is_settled = FALSE',
                [payout.rows[0].id, doctorId]
            );

            await client.query('COMMIT');
            return { success: true, amountSettled: totalAmount };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
};
module.exports = settlementService;
