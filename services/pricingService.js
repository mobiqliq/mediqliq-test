const db = require('../database/db');
const pricingService = {
    async getRate(itemName) {
        const res = await db.query('SELECT standard_rate, tax_percent FROM service_catalog WHERE item_name = $1', [itemName]);
        return res.rows[0] || { standard_rate: 0, tax_percent: 0 };
    }
};
module.exports = pricingService;
