const db = require('../database/db');
const fs = require('fs');
const path = require('path');

const exportService = {
    async exportDailyRevenue(date) {
        try {
            const sql = `SELECT i.*, p.uhid FROM invoices i JOIN patients p ON i.patient_id = p.id WHERE DATE(i.created_at) = $1`;
            const res = await db.query(sql, [date]);
            
            const header = "InvoiceID,PatientUHID,TotalAmount,Status\n";
            const rows = res.rows.map(r => `${r.id},${r.uhid},${r.total},${r.status}`).join("\n");
            
            const filePath = path.join(process.env.HOME, 'Desktop', `Mediqliq_Finance_${date}.csv`);
            fs.writeFileSync(filePath, header + rows);
            
            return { success: true, path: filePath };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

module.exports = exportService;
