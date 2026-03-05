const db = require('../database/db');

const paymentService = {
    // Add Advance Payment to Patient Wallet
    async addAdvance(patient_id, amount, method) {
        try {
            // 1. Record the transaction
            const txSql = `INSERT INTO transactions (patient_id, amount, type, method) VALUES ($1, $2, 'CREDIT', $3)`;
            await db.query(txSql, [patient_id, amount, method]);

            // 2. Update Patient Balance (Assuming a balance column exists)
            const updateSql = `UPDATE patients SET wallet_balance = wallet_balance + $1 WHERE id = $2 RETURNING wallet_balance`;
            const res = await db.query(updateSql, [amount, patient_id]);
            
            return { success: true, newBalance: res.rows[0].wallet_balance };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Deduct from Wallet for a Procedure
    async processPayment(patient_id, amount) {
        const sql = `UPDATE patients SET wallet_balance = wallet_balance - $1 WHERE id = $2 AND wallet_balance >= $1 RETURNING wallet_balance`;
        const res = await db.query(sql, [amount, patient_id]);
        if (res.rows.length === 0) throw new Error("Insufficient Wallet Balance");
        return { success: true, remaining: res.rows[0].wallet_balance };
    }
};

module.exports = paymentService;
