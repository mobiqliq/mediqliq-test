const billingService = require('../services/billingService');

const billingController = {
    handleGenerateInvoice: async (event, visit_id) => {
        return await billingService.generateInvoice(visit_id);
    }
};

module.exports = billingController;
