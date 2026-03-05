const db = require('../database/db');

const gstr1Service = {
    /**
     * Requirement: Generate GSTR-1 Table 12 (HSN-wise Summary)
     * Mandatory bifurcation for 2026: B2B vs B2C HSN reporting.
     */
    async generateHSNSummary(entityId, month, year) {
        const sql = `
            SELECT 
                m.atc_code as hsn_code, 
                m.generic_name as description, 
                SUM(i.qty) as total_qty, 
                SUM(i.taxable_value) as total_taxable_value,
                i.tax_rate
            FROM pharmacy_invoices_items i
            JOIN medicine_catalog m ON i.medicine_id = m.id
            WHERE i.entity_id = $1 AND MONTH(i.date) = $2 AND YEAR(i.date) = $3
            GROUP BY m.atc_code, m.generic_name, i.tax_rate`;
        
        const res = await db.query(sql, [entityId, month, year]);
        return res.rows;
    }
};
module.exports = gstr1Service;
