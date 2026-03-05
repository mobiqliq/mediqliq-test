const reputationEngine = {
    /**
     * Requirement: Trigger Review Request 24h after successful discharge
     */
    async scheduleReviewRequest(patientId, admissionId) {
        // 1. Check for 'Happy Path' (Successful discharge, no grievances)
        const patientData = await db.query(`
            SELECT p.name, p.phone, ia.discharge_status 
            FROM patients p 
            JOIN ipd_admissions ia ON p.id = ia.patient_id 
            WHERE ia.id = $1`, [admissionId]);

        if (patientData.rows[0].discharge_status !== 'STABLE') return;

        // 2. Delay for 24 hours (Allow the patient to settle at home)
        setTimeout(async () => {
            const googleReviewLink = "https://g.page/mediqliq-clinic/review";
            const message = `Hello ${patientData.rows[0].name}, we hope you are recovering well. If you were happy with our care, please share your feedback on Google: ${googleReviewLink}`;
            
            await whatsappService.sendMessage(patientData.rows[0].phone, message);
            console.log(`✅ Reputation prompt sent to ${patientData.rows[0].name}`);
        }, 86400000); // 24 Hours in ms
    }
};
module.exports = reputationEngine;
