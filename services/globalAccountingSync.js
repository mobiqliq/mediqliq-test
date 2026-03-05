const axios = require('axios');

const globalAccountingSync = {
    /**
     * Requirement: Sync with Global Leaders (QuickBooks/Xero)
     */
    async syncToQuickBooks(invoiceData, accessToken) {
        const qboInvoice = {
            Line: invoiceData.items.map(item => ({
                DetailType: "SalesItemLineDetail",
                Amount: item.total,
                SalesItemLineDetail: { ItemRef: { name: item.name, value: item.id } }
            })),
            CustomerRef: { value: invoiceData.patientId }
        };

        // Push to QuickBooks Online Global API
        return await axios.post('https://quickbooks.api.intuit.com/v3/company/ID/invoice', qboInvoice, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
    }
};
module.exports = globalAccountingSync;
