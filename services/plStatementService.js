const db = require('../database/db');

const plStatementService = {
    async generateMonthlyPL(month, year) {
        // 1. Fetch Revenue (Hospital + Pharmacy)
        const revenue = await db.query(`
            SELECT 
                SUM(CASE WHEN entity = 'HOSPITAL' THEN taxable_value ELSE 0 END) as hosp_rev,
                SUM(CASE WHEN entity = 'PHARMACY' THEN taxable_value ELSE 0 END) as pharm_rev
            FROM unified_invoices WHERE MONTH(date) = $1 AND YEAR(date) = $2`, [month, year]);

        // 2. Fetch Direct Costs (COGS)
        const cogs = await db.query(`
            SELECT SUM(total_amount) as total_cogs 
            FROM vendor_invoices WHERE status = 'PAID' AND category = 'CONSUMABLES'`);

        // 3. Fetch Professional Fees (Doctor Commissions)
        const doctorFees = await db.query(`
            SELECT SUM(doctor_share) as total_fees 
            FROM commission_ledger WHERE MONTH(created_at) = $1`, [month]);

        // 4. Fetch Fixed OPEX (Rent, Utilities, etc.)
        const opex = await db.query(`
            SELECT SUM(amount) as total_opex 
            FROM expense_ledger WHERE category NOT IN ('CONSUMABLES')`);

        return {
            income: revenue.rows[0],
            cogs: cogs.rows[0].total_cogs,
            proFees: doctorFees.rows[0].total_fees,
            fixedOpex: opex.rows[0].total_opex,
            netProfit: (revenue.rows[0].hosp_rev + revenue.rows[0].pharm_rev) - 
                       (cogs.rows[0].total_cogs + doctorFees.rows[0].total_fees + opex.rows[0].total_opex)
        };
    }
};
module.exports = plStatementService;
