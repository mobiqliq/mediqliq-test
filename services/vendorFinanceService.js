const db = require('../database/db');

const vendorFinanceService = {
    /**
     * Requirement: Manage Supplier Receivables and Billing
     */
    async recordStockInward(supplierId, invoiceNo, items) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            let totalInvoiceValue = 0;
            for (const item of items) {
                // 1. Update Inventory Levels
                await client.query(
                    'UPDATE pharmacy_stock SET quantity_in_hand = quantity_in_hand + $1 WHERE id = $2',
                    [item.qty, item.medicineId]
                );
                totalInvoiceValue += (item.qty * item.purchasePrice);
            }

            // 2. Update Supplier Outstanding Balance
            await client.query(
                'UPDATE suppliers SET total_payable = total_payable + $1 WHERE id = $2',
                [totalInvoiceValue, supplierId]
            );

            // 3. Log the Vendor Invoice for Audit
            await client.query(
                'INSERT INTO vendor_invoices (supplier_id, invoice_no, amount, status) VALUES ($1, $2, $3, $4)',
                [supplierId, invoiceNo, totalInvoiceValue, 'UNPAID']
            );

            await client.query('COMMIT');
            return { success: true, amountRecorded: totalInvoiceValue };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
};
module.exports = vendorFinanceService;
