const db = require('../database/db');

const configService = {
    /**
     * Toggles where the Vitals module appears in the UI
     */
    async updateVitalsWorkflow(location) {
        // location can be 'RECEPTION', 'DOCTOR_ONLY', or 'NURSING_STATION'
        await db.query(`
            UPDATE hospital_profile 
            SET workflow_settings = jsonb_set(workflow_settings, '{vitals_location}', $1)
            WHERE id = 1`, [JSON.stringify(location)]);
        
        return { success: true, activeLocation: location };
    }
};

module.exports = configService;
