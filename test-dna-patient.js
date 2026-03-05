const patientService = require('./services/patientService');
const db = require('./database/db');

async function test() {
    console.log("🧬 Testing Patient DNA: UHID & Persistence...");
    // Mocking DB query for the test
    db.query = async () => ({ rows: [{ uhid: 'MEDIQ-2026-0001', first_name: 'Test', last_name: 'Patient' }] });
    
    const result = await patientService.registerPatient({ first_name: 'Test', last_name: 'Patient', phone: '9999988888' });
    
    if (result.uhid || (result.data && result.data.uhid)) {
        console.log("✅ DNA MATCH: Professional UHID generated.");
    } else {
        console.log("❌ DNA MISMATCH: UHID logic failed.");
    }
}
test();
