const db = require('../database/db');

const dashboardService = {
    async getLiveQueue(deptId = null) {
        let sql = `
            SELECT 
                v.id as visit_id, p.name, p.uhid, v.queue_status, 
                v.checked_in_at, d.dept_name,
                (SELECT status FROM billing WHERE visit_id = v.id AND type = 'CONSULTATION' LIMIT 1) as payment_status
            FROM opd_visits v
            JOIN patients p ON v.patient_id = p.id
            JOIN departments d ON v.department_id = d.id
            WHERE v.status != 'COMPLETED'
        `;
        
        if (deptId) sql += ` AND v.department_id = ${deptId}`;
        sql += ` ORDER BY v.checked_in_at ASC`;

        const res = await db.query(sql);
        return res.rows;
    }
};

module.exports = dashboardService;
