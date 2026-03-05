const preAuthService = {
    /**
     * Requirement: Auto-bundle clinical evidence for TPA
     */
    async submitPreAuth(admissionId, insurerId, estimatedAmount) {
        // 1. Gather Clinical Evidence (Linked to the ICD-11 Diagnosis)
        const evidence = await db.query(`
            SELECT v.value, l.report_path 
            FROM patient_vitals v 
            JOIN lab_orders l ON v.patient_id = l.patient_id 
            WHERE l.admission_id = $1`, [admissionId]);

        // 2. Generate FHIR Claim Resource (Pre-determination)
        const preAuthPayload = {
            resourceType: "Claim",
            use: "predetermination",
            status: "active",
            priority: { coding: [{ code: "stat" }] },
            insurance: [{ identifier: { value: insurerId } }],
            total: { value: estimatedAmount, currency: "INR" },
            supportingInfo: evidence.rows.map(e => ({ category: "clinical", valueString: e.value }))
        };

        // 3. Post to HCX (National Health Claims Exchange) Gateway
        return await gateway.post('/preauth', preAuthPayload);
    }
};
