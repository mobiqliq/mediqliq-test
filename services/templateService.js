const db = require('../database/db');

const templateService = {
    /**
     * Requirement: Save and Fetch Clinical Bundles
     */
    async saveTemplate(staffId, trigger, data) {
        // data = { medicines: [], instructions: '', diagnosis: '' }
        const sql = `INSERT INTO clinical_templates (staff_id, trigger_word, template_data) 
                     VALUES ($1, $2, $3)`;
        return await db.query(sql, [staffId, trigger.toLowerCase(), JSON.stringify(data)]);
    },

    async getTemplate(staffId, trigger) {
        const sql = `SELECT template_data FROM clinical_templates 
                     WHERE staff_id = $1 AND trigger_word = $2`;
        const res = await db.query(sql, [staffId, trigger.toLowerCase()]);
        return res.rows[0]?.template_data || null;
    }
};
module.exports = templateService;
