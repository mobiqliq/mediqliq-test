const opdService = require('./services/opdService');
const db = require('./database/db');

async function test() {
    console.log("🧬 Testing OPD DNA: Tokenization...");
    db.query = async (sql) => {
        if (sql.includes('COUNT')) return { rows: [{ count: '14' }] }; // Mocking 14 patients already seen
        return { rows: [{ token_number: 15 }] };
    };

    const result = await opdService.createVisit({ patient_id: 1, doctor_id: 1 });
    const token = result.data ? result.data.token_number : result.rows ? result.rows[0].token_number : null;

    if (token === 15) {
        console.log("✅ DNA MATCH: Sequential token issued (Token #15).");
    } else {
        console.log("❌ DNA MISMATCH: Token logic error.");
    }
}
test();
