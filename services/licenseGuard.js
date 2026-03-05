const db = require('../database/db');

const licenseGuard = {
    /**
     * Verifies the key. In production, this would use an RSA 
     * decryption to verify the key was signed by your private key.
     */
    async activateKey(inputKey) {
        // Mock Logic: If key ends in 'PRO', it's a 1-year Growth Plan
        let daysToAdd = 0;
        let planType = 'TRIAL';

        if (inputKey.endsWith('-PRO')) {
            daysToAdd = 365;
            planType = 'GROWTH';
        } else if (inputKey.endsWith('-LIFE')) {
            daysToAdd = 3650; // 10 years
            planType = 'ENTERPRISE';
        }

        if (daysToAdd > 0) {
            const expiry = new Date();
            expiry.setDate(expiry.getDate() + daysToAdd);
            
            await db.query(`
                UPDATE mediqliq_subscription 
                SET license_key = $1, expiry_date = $2, plan_type = $3, is_active = TRUE
                WHERE id = 1`, 
            [inputKey, expiry, planType]);

            return { success: true, plan: planType, expiry: expiry.toDateString() };
        }

        return { success: false, message: "Invalid or Expired License Key." };
    }
};

module.exports = licenseGuard;
