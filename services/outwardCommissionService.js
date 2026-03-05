const outwardCommissionService = {
    /**
     * Requirement: Calculate and Log Outward Commission
     */
    async logCommission(referralId, actualBillValue) {
        const referral = await db.query(`
            SELECT r.*, p.commission_percentage 
            FROM outward_referrals r
            JOIN external_partners p ON r.partner_id = p.id
            WHERE r.id = $1`, [referralId]);

        const { commission_percentage } = referral.rows[0];
        const earnings = (actualBillValue * commission_percentage) / 100;

        // Update the ledger for P&L tracking
        await db.query(
            'UPDATE outward_referrals SET actual_commission_earned = $1, status = "COMPLETED" WHERE id = $2',
            [earnings, referralId]
        );

        return { hospitalEarnings: earnings };
    }
};
