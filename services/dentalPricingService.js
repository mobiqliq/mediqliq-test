const db = require('../database/db');

const dentalPricingService = {
    /**
     * Updates a specific dental procedure price with an audit trail
     */
    async updateDentalPrice(staffId, procedureId, newPrice, reason) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            // 1. Get old price for the audit log
            const oldPriceRes = await client.query(
                'SELECT current_price FROM service_prices WHERE id = $1', 
                [procedureId]
            );
            const oldPrice = oldPriceRes.rows[0].current_price;

            // 2. Update the master price list
            await client.query(
                'UPDATE service_prices SET current_price = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
                [newPrice, procedureId]
            );

            // 3. Create the Audit Trail entry
            await client.query(
                'INSERT INTO price_audit_logs (service_id, old_price, new_price, changed_by, reason) VALUES ($1, $2, $3, $4, $5)',
                [procedureId, oldPrice, newPrice, staffId, reason]
            );

            await client.query('COMMIT');
            return { success: true, message: "Dental Tariff Updated." };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
};
module.exports = dentalPricingService;
