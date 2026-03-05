const db = require('../database/db');

const nursingService = {
    /**
     * Allows Nurses to record pre-consultation vitals
     */
    async recordVitals(visitId, vitalsData) {
        // vitalsData = { bp: '120/80', weight: '70kg', pulse: '72' }
        const sql = `
            INSERT INTO clinical_observations (visit_id, observation_key, observation_value)
            VALUES ($1, 'VITALS', $2)`;
        
        await db.query(sql, [visitId, JSON.stringify(vitalsData)]);
        return { success: true, message: "Vitals synced to Doctor's Dashboard." };
    }
};

module.exports = nursingService;
