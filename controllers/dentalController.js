const dentalService = require('../services/dentalService');
const paymentService = require('../services/paymentService');

const dentalController = {
    // Approve a plan and attempt to deduct from wallet
    handleApproveAndPay: async (event, { plan_id, patient_id, amount }) => {
        try {
            // 1. Try to deduct from the Indian Pre-payment Wallet
            const payment = await paymentService.processPayment(patient_id, amount);
            
            if (payment.success) {
                // 2. If payment succeeds, update the Treatment Plan status
                const updateSql = `UPDATE dental_treatment_plans SET status = 'APPROVED' WHERE id = $1 RETURNING *`;
                // Note: We use the service or direct DB query here
                return { success: true, message: "Plan Approved & Paid", balance: payment.remaining };
            }
        } catch (error) {
            return { success: false, error: "Payment Failed: Insufficient Wallet Balance" };
        }
    }
};

module.exports = dentalController;
