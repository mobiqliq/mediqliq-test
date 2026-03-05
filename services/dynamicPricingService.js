const db = require('../database/db');

const dynamicPricingService = {
    async calculateCharge(serviceId, patientId, doctorId) {
        // 1. Fetch standard rate
        const service = await db.query('SELECT standard_rate, category FROM service_catalog WHERE id = $1', [serviceId]);
        
        // 2. Fetch Doctor's specific fee if it's a consultation
        if (service.rows[0].category === 'CONSULTATION') {
            const doc = await db.query('SELECT consultation_fee FROM staff WHERE id = $1', [doctorId]);
            return doc.rows[0].consultation_fee || service.rows[0].standard_rate;
        }

        // 3. Check if patient is a "Follow-up" (Free registration logic)
        if (service.rows[0].category === 'REGISTRATION') {
            const lastVisit = await db.query('SELECT created_at FROM opd_visits WHERE patient_id = $1 ORDER BY created_at DESC LIMIT 1', [patientId]);
            // If visited in last 7 days, Charge = 0
            return (lastVisit.rows.length > 0) ? 0 : service.rows[0].standard_rate;
        }

        return service.rows[0].standard_rate;
    }
};

module.exports = dynamicPricingService;
