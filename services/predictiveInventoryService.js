const db = require('../database/db');

const predictiveInventoryService = {
    /**
     * Requirement: Predict stock-outs before they happen
     */
    async calculateDemandForecast(medicineId, daysAhead = 7) {
        // 1. Get Average Consumption Velocity (Last 30 days)
        const velocityRes = await db.query(
            `SELECT SUM(qty) / 30 as daily_velocity 
             FROM pharmacy_invoices_items 
             WHERE medicine_id = $1 AND created_at > NOW() - INTERVAL '30 days'`, [medicineId]);
        
        const velocity = parseFloat(velocityRes.rows[0].daily_velocity || 0);

        // 2. Look at Upcoming Appointments
        // Logic: Map the medicine to the specialty (e.g., Metformin -> Endocrinology)
        const appointmentRes = await db.query(
            `SELECT COUNT(*) as count FROM appointments a
             JOIN doctor_specialties ds ON a.doctor_id = ds.doctor_id
             WHERE a.appointment_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '${daysAhead} days'
             AND ds.specialty_id IN (SELECT specialty_id FROM medicine_specialty_map WHERE medicine_id = $1)`, [medicineId]);

        const upcomingPatients = parseInt(appointmentRes.rows[0].count || 0);

        // 3. The Forecast: (Velocity * Days) + (Weightage * Upcoming Patients)
        const forecastedNeed = (velocity * daysAhead) + (upcomingPatients * 0.8); 
        
        return Math.ceil(forecastedNeed);
    }
};
module.exports = predictiveInventoryService;
