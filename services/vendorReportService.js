const db = require('../database/db');

const vendorReportService = {
    async getVendorStatement(vendorId, startDate, endDate) {
        const sql = `
            SELECT 
                v.vendor_name,
                t.test_name,
                lo.created_at as test_date,
                tc.base_cost as vendor_payable,
                tc.selling_price as patient_paid,
                (tc.selling_price - tc.base_cost) as clinic_margin
            FROM lab_orders lo
            JOIN lab_test_catalog tc ON lo.test_id = tc.id
            JOIN lab_vendors v ON tc.vendor_id = v.id
            WHERE v.id = $1 AND lo.created_at BETWEEN $2 AND $3
        `;
        const res = await db.query(sql, [vendorId, startDate, endDate]);
        
        const totalPayable = res.rows.reduce((sum, row) => sum + parseFloat(row.vendor_payable), 0);
        return { statement: res.rows, totalPayable };
    }
};
module.exports = vendorReportService;
