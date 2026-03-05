const db = require('../database/db');
const billingService = require('./billingService');

const pharmacyService = {
    async dispenseMedicine(patientId, medicineId, quantity) {
        await db.query('UPDATE inventory SET stock = stock - $1 WHERE id = $2', [quantity, medicineId]);
        const med = await db.query('SELECT name, price FROM inventory WHERE id = $1', [medicineId]);
        await billingService.addToBill(patientId, {
            item: med.rows[0].name,
            amount: med.rows[0].price * quantity,
            type: 'PHARMACY'
        });
        return { success: true };
    }
};
module.exports = pharmacyService;
