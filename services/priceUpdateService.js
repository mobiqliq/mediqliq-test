const db = require('../database/db');

const priceUpdateService = {
    async updatePrice(staffId, serviceId, newPrice, reason) {
        // 1. Fetch current price for audit
        const current = await db.query('SELECT current_price FROM service_prices WHERE id = $1', [serviceId]);
        const oldPrice = current.rows[0].current_price;

        // 2. Start Transaction
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            
            // Update the master price
            await client.query('UPDATE service_prices SET current_price = $1, updated_by = $2 WHERE id = $3', 
                [newPrice, staffId, serviceId]);
            
            // Log the audit
            await client.query('INSERT INTO price_audit_logs (service_id, old_price, new_price, changed_by, reason) VALUES ($1, $2, $3, $4, $5)', 
                [serviceId, oldPrice, newPrice, staffId, reason]);

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
module.exports = priceUpdateService;
