const db = require('../database/db');

const payrollService = {
    async generateStaffMonthlySalary(staffId, month) {
        // 1. Fetch Commissions earned in the month (from our previous module)
        const commRes = await db.query(
            'SELECT SUM(doctor_share) as total FROM commission_ledger WHERE doctor_id = $1 AND is_settled = FALSE',
            [staffId]
        );

        // 2. Fetch Base Salary and Attendance hours
        const staffRes = await db.query('SELECT base_salary FROM staff WHERE id = $1', [staffId]);
        
        const commission = parseFloat(commRes.rows[0].total || 0);
        const base = parseFloat(staffRes.rows[0].base_salary || 0);

        const netPayable = base + commission;

        return {
            staffId,
            baseSalary: base,
            commissionEarned: commission,
            netPayable: netPayable
        };
    }
};
module.exports = payrollService;
