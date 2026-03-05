const analyticsService = {
    /**
     * Requirement: Forecast Revenue for the next month
     */
    async getRevenueForecast() {
        // 1. Current IPD "Work in Progress" Revenue
        const ipdAccrued = await db.query('SELECT SUM(total_accrued_amount) FROM ipd_folios WHERE status = "ACTIVE"');
        
        // 2. Projected OPD Revenue (Appointments * Conversion Rate * Avg Bill)
        const upcomingAppointments = await db.query('SELECT COUNT(*) FROM appointments WHERE date > NOW()');
        const forecastOPD = (upcomingAppointments.rows[0].count * 0.85) * 1200; // 85% show-rate, ₹1200 avg bill

        return {
            guaranteedIPD: ipdAccrued.rows[0].sum,
            projectedOPD: forecastOPD,
            totalForecast: parseFloat(ipdAccrued.rows[0].sum) + forecastOPD
        };
    }
};
module.exports = analyticsService;
