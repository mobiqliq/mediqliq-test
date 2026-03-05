const referralNotificationService = {
    /**
     * Requirement: Keep the referring doctor informed (The Trust Bridge)
     */
    async notifyAdmission(referralId) {
        const data = await db.query(`
            SELECT ed.name as doc_name, ed.contact_phone, p.name as patient_name, w.name as ward_name
            FROM referral_leads rl
            JOIN external_doctors ed ON rl.referring_doctor_id = ed.id
            JOIN patients p ON rl.patient_id = p.id
            JOIN ipd_admissions ia ON rl.admission_id = ia.id
            JOIN wards w ON ia.ward_id = w.id
            WHERE rl.id = $1`, [referralId]);

        const { doc_name, contact_phone, patient_name, ward_name } = data.rows[0];

        const message = `Dear Dr. ${doc_name}, your referred patient ${patient_name} has been admitted to ${ward_name} at Mediqliq. We will keep you updated on the progress.`;
        
        // Trigger the WhatsApp engine we built in the OPD phase
        await whatsappService.sendMessage(contact_phone, message);
    }
};
