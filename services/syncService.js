const db = require('../database/db');

const syncService = {
    /**
     * Proactive Health Scanner
     * Identifies patients due for follow-ups or at-risk
     */
    async getProactiveInsights() {
        try {
            const sql = `
                SELECT p.first_name, p.phone, c.diagnosis, c.created_at as last_visit
                FROM patients p
                JOIN consultations c ON p.id = c.patient_id
                WHERE c.followup_date < CURRENT_DATE AND c.status != 'RECALLED'
            `;
            const res = await db.query(sql);
            return { 
                insight: "Proactive Recall Opportunity",
                count: res.rows.length,
                suggested_action: "Send WhatsApp Follow-up regarding 'Periodontal Maintenance'",
                data: res.rows 
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

module.exports = syncService;
