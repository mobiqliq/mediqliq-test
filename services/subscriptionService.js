const db = require('../database/db');

const subscriptionService = {
    async checkStatus() {
        const res = await db.query('SELECT expiry_date, plan_type FROM mediqliq_subscription LIMIT 1');
        if (res.rows.length === 0) return { status: 'EXPIRED', daysLeft: 0 };

        const expiry = new Date(res.rows[0].expiry_date);
        const today = new Date();
        const diffTime = expiry - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            status: daysLeft > 0 ? 'ACTIVE' : 'EXPIRED',
            daysLeft: daysLeft,
            plan: res.rows[0].plan_type,
            needsAlert: daysLeft <= 15 // Trigger alert if 15 days or less
        };
    }
};

module.exports = subscriptionService;
