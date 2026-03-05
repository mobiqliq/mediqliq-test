const privacyManager = {
    /**
     * Requirement: Multi-jurisdictional Consent Logic
     */
    getConsentRequirements(countryCode) {
        const rules = {
            'IN': { standard: 'DPDP', allowImplied: true, requiresConsentManager: true, ageOfMajority: 18 },
            'US': { standard: 'HIPAA', allowImplied: false, minRetention: '6 years', rightToErasure: false },
            'UK': { standard: 'GDPR', allowImplied: false, rightToErasure: true, ageOfMajority: 13 }
        };
        return rules[countryCode] || rules['UK']; // Default to strictest (GDPR)
    },

    async recordConsent(patientId, purpose, countryCode) {
        const config = this.getConsentRequirements(countryCode);
        // HL7 FHIR R5 Consent Resource mapping
        const fhirConsent = {
            resourceType: "Consent",
            status: "active",
            scope: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/consentscope", code: "patient-privacy" }] },
            category: [{ coding: [{ system: "http://loinc.org", code: "59284-0" }] }],
            patient: { reference: `Patient/${patientId}` },
            dateTime: new Date().toISOString(),
            provision: { type: "permit", purpose: [{ code: purpose }] }
        };
        return await db.save('consent_store', fhirConsent);
    }
};
module.exports = privacyManager;
