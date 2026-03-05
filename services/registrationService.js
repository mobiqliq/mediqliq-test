const db = require('../database/db');

const registrationService = {
    /**
     * Requirement 4: Prevents duplicate entry via multiple keys
     */
    async checkExistingPatient(phone, abha) {
        const sql = `SELECT id, name, uhid FROM patients WHERE phone = $1 OR (abha_number = $2 AND $2 IS NOT NULL)`;
        const res = await db.query(sql, [phone, abha]);
        return res.rows[0] || null;
    },

    /**
     * Requirement 3 & 7: Lightweight registration with auto-UHID generation
     */
    async createPatient(data) {
        const uhid = `MQL-${Date.now().toString().slice(-6)}`;
        const sql = `
            INSERT INTO patients (name, phone, age, gender, uhid, abha_number)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        
        const res = await db.query(sql, [data.name, data.phone, data.age, data.gender, uhid, data.abha]);
        return res.rows[0];
    }
};

module.exports = registrationService;
