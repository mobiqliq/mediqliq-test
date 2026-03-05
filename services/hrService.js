const db = require('../database/db');

const hrService = {
    async getStaffByRole(role) {
        const sql = `SELECT id, name, role, department_id, active FROM users WHERE role = $1`;
        return await db.query(sql, [role]);
    },
    async processMonthlyPayroll(month, year) {
        // Architecture for payroll calculation
        const sql = `SELECT u.name, u.role, u.phone, COUNT(v.id) as consultation_count 
                     FROM users u 
                     LEFT JOIN opd_visits v ON u.id = v.doctor_id 
                     WHERE u.role = 'doctor' AND EXTRACT(MONTH FROM v.visit_date) = $1 
                     GROUP BY u.id`;
        return await db.query(sql, [month]);
    }
};

module.exports = hrService;
