const db = require('../database/db');

const onboardingService = {
    async registerStaff(staffData) {
        // 1. Validate mandatory medical fields for Doctors
        if (staffData.role === 'DOCTOR' && !staffData.reg_number) {
            throw new Error("Medical Registration Number is mandatory for Doctors.");
        }

        const sql = `
            INSERT INTO staff 
            (name, role, department_id, qualifications, reg_number, phone, status)
            VALUES ($1, $2, $3, $4, $5, $6, 'ACTIVE') 
            RETURNING id`;

        const res = await db.query(sql, [
            staffData.name,
            staffData.role,
            staffData.deptId,
            staffData.qualifications,
            staffData.reg_number,
            staffData.phone
        ]);

        return { success: true, staffId: res.rows[0].id };
    }
};

module.exports = onboardingService;
