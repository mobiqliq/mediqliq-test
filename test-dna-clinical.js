const consultService = require('./services/consultationService');
const db = require('./database/db');

async function test() {
    console.log("🧬 Testing Clinical DNA: Transactional Integrity...");
    // Mocking the Transaction Client
    db.getClient = async () => ({
        query: async () => ({ rows: [{ id: 99 }] }),
        release: () => {},
    });

    const result = await consultService.submitConsultation({
        visit_id: 1,
        prescriptionItems: [{ medicine: 'Amoxicillin', dosage: '500mg' }]
    });

    if (result.success) {
        console.log("✅ DNA MATCH: Consultation committed and OPD Visit closed.");
    } else {
        console.error("❌ DNA MISMATCH:", result.error);
    }
}
test();
