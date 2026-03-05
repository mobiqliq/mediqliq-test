const db = require('../database/db');

const abhaService = {
    /**
     * Step 1: Initialize verification via Aadhaar/Mobile OTP
     */
    async initOTP(abhaId) {
        console.log(`🔗 Initializing ABDM Handshake for: ${abhaId}`);
        // Mocking the ABDM Gateway response
        return { txnId: "TXN_" + Math.random().toString(36).substr(2, 9), status: "OTP_SENT" };
    },

    /**
     * Step 2: Link the verified data to the Mediqliq Patient Record
     */
    async linkProfile(patientId, abhaData) {
        const sql = `
            UPDATE patients 
            SET abha_number = $1, abha_address = $2, abha_status = 'VERIFIED'
            WHERE id = $3 RETURNING name`;
        
        const res = await db.query(sql, [abhaData.number, abhaData.address, patientId]);
        return { success: true, message: `ABHA linked for ${res.rows[0].name}` };
    }
};

module.exports = abhaService;
