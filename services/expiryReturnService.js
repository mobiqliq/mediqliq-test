const db = require('../database/db');

const expiryReturnService = {
    /**
     * Requirement: Identify nearing expiry and manage returns
     */
    async getExpiringStock(daysThreshold = 60) {
        const sql = `
            SELECT id, medicine_name, batch_no, expiry_date, quantity_in_hand, unit_price
            FROM pharmacy_stock
            WHERE expiry_date <= CURRENT_DATE + INTERVAL '${daysThreshold} days'
            AND quantity_in_hand > 0`;
        const res = await db.query(sql);
        return res.rows;
    },

    async initiateReturn(stockId, qtyToReturn, vendorId, reason) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            // 1. Deduct from active stock
            await client.query('UPDATE pharmacy_stock SET quantity_in_hand = quantity_in_hand - $1 WHERE id = $2', [qtyToReturn, stockId]);
            // 2. Create Return Note (Debit Note) for Vendor
            await client.query('INSERT INTO vendor_returns (stock_id, vendor_id, qty, reason) VALUES ($1, $2, $3, $4)', [stockId, vendorId, qtyToReturn, reason]);
            await client.query('COMMIT');
            return { success: true };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
};
module.exports = expiryReturnService;
