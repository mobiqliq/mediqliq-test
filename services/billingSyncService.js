const db = require('../database/db');

const billingSyncService = {
    /**
     * Requirement: Fetch all unbilled items prescribed by the doctor
     * for a specific patient visit.
     */
    async getPendingCharges(visitId) {
        const sql = `
            -- Fetch Lab Tests
            (SELECT 'LAB' as category, test_name as item, price 
             FROM lab_orders_pending WHERE visit_id = $1)
            UNION ALL
            -- Fetch Procedures (e.g., Scaling, Extraction)
            (SELECT 'PROCEDURE' as category, procedure_name as item, price 
             FROM dental_treatment_plans WHERE visit_id = $1 AND status = 'PROPOSED')
            UNION ALL
            -- Fetch Pharmacy Orders
            (SELECT 'PHARMACY' as category, item_name as item, price 
             FROM pharmacy_orders_pending WHERE visit_id = $1)`;
        
        const res = await db.query(sql, [visitId]);
        return res.rows;
    }
};
module.exports = billingSyncService;
