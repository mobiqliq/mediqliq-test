const db = require('../database/db');

const interopService = {
    /**
     * Converts a Mediqliq record into a FHIR-compliant JSON Bundle
     * This is the "Gold Standard" for interoperability.
     */
    async generateFHIRBundle(patientId) {
        const patient = await db.query('SELECT * FROM patients WHERE id = $1', [patientId]);
        const vitals = await db.query('SELECT * FROM clinical_observations WHERE visit_id IN (SELECT id FROM opd_visits WHERE patient_id = $1)', [patientId]);

        return {
            resourceType: "Bundle",
            type: "collection",
            entry: [
                {
                    resource: {
                        resourceType: "Patient",
                        id: patient.rows[0].uhid,
                        name: [{ text: patient.rows[0].name }],
                        telecom: [{ system: "phone", value: patient.rows[0].phone }]
                    }
                },
                // Vitals mapped to Observation resources
                ...vitals.rows.map(v => ({
                    resource: {
                        resourceType: "Observation",
                        status: "final",
                        code: { text: v.observation_key },
                        valueString: v.observation_value
                    }
                }))
            ]
        };
    }
};

module.exports = interopService;
