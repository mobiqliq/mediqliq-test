const db = require('../database/db');

const branchService = {
    async getGlobalRevenue() {
        // Aggregates billing across all branches/hospital_ids
        const sql = `
            SELECT h.name as branch_name, sum(b.total_amount) as revenue 
            FROM hospital_profile h
            LEFT JOIN billing b ON h.id = b.hospital_id
            GROUP BY h.name`;
        const res = await db.query(sql);
        return res.rows;
    },
    async getGlobalInventoryAlerts() {
        // Finds low stock items across the entire organization
        return await db.query('SELECT branch_name, item_name, stock FROM inventory WHERE stock < 10');
    }
};

module.exports = branchService;
