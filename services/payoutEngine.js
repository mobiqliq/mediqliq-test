const db = require('../database/db');

const payoutEngine = {
    async calculateAndLog(billingId, doctorId, amount, category) {
        // 1. Fetch the specific rule for this doctor and service
        const ruleRes = await db.query(
            'SELECT payout_type, payout_value FROM doctor_commission_rules WHERE doctor_id = $1 AND service_category = $2',
            [doctorId, category]
        );

        let doctorShare = 0;
        if (ruleRes.rows.length > 0) {
            const rule = ruleRes.rows[0];
            if (rule.payout_type === 'PERCENTAGE') {
                doctorShare = (amount * rule.payout_value) / 100;
            } else {
                doctorShare = rule.payout_value; // Fixed Fee
            }
        }

        const clinicShare = amount - doctorShare;

        // 2. Log into the ledger for end-of-month settlement
        await db.query(
            'INSERT INTO commission_ledger (billing_id, doctor_id, total_bill_amount, doctor_share, clinic_share) VALUES ($1, $2, $3, $4, $5)',
            [billingId, doctorId, amount, doctorShare, clinicShare]
        );

        return { doctorShare, clinicShare };
    }
};
module.exports = payoutEngine;
