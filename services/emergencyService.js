const emergencyService = {
    /**
     * Requirement: One-click admission for Critical Cases
     */
    async fastTrackAdmission(bedId) {
        // 1. Create a "Placeholder" Patient (Anonymous ER)
        const patient = await db.query(
            "INSERT INTO patients (name, status) VALUES ('EMERGENCY_UNIDENTIFIED', 'CRITICAL') RETURNING id"
        );
        
        // 2. Assign to Bed immediately
        await db.query(
            "UPDATE beds SET status = 'OCCUPIED', patient_id = $1 WHERE id = $2",
            [patient.rows[0].id, bedId]
        );

        // 3. Mark for "Post-Stabilization Documentation"
        await db.query(
            "INSERT INTO security_alerts (severity, alert_type, description) VALUES ($1, $2, $3)",
            ['LOW', 'PENDING_DOCS', `Patient in Bed ${bedId} requires photo and ID registration.`]
        );
        
        return { success: true, tempId: patient.rows[0].id };
    }
};
module.exports = emergencyService;
