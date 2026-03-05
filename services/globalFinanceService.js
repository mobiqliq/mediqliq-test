const axios = require('axios');

const globalFinanceService = {
    /**
     * Requirement: Real-time Multi-Currency Consolidation
     */
    async getConsolidatedPL(clinics, baseCurrency = 'USD') {
        let totalRevenue = 0;
        
        for (const clinic of clinics) {
            const localRevenue = await db.getRevenue(clinic.id);
            // Fetch real-time FX rate
            const fx = await axios.get(`https://api.exchangerate.host/convert?from=${clinic.currency}&to=${baseCurrency}`);
            totalRevenue += (localRevenue * fx.data.result);
        }

        return {
            consolidatedRevenue: totalRevenue,
            reportingCurrency: baseCurrency,
            timestamp: new Date().toISOString()
        };
    }
};
module.exports = globalFinanceService;
