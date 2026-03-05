const db = require('../database/db');

const tallyIntegrationService = {
    /**
     * Requirement: Export Daily Sales for Tally Prime
     * Generates an XML structure that Tally can "Import Data" from.
     */
    async generateDailySalesXML(entityType, date) {
        const table = entityType === 'PHARMACY' ? 'pharmacy_invoices' : 'hospital_invoices';
        const sales = await db.query(`SELECT * FROM ${table} WHERE date(created_at) = $1`, [date]);

        let xml = `<ENVELOPE><HEADER><TALLYREQUEST>Import Data</TALLYREQUEST></HEADER><BODY><IMPORTDATA><REQUESTDESC><REPORTNAME>Vouchers</REPORTNAME></REQUESTDESC><REQUESTDATA>`;

        sales.rows.forEach(inv => {
            xml += `
            <TALLYMESSAGE xmlns:UDF="TallyUDF">
                <VOUCHER VCHTYPE="Sales" ACTION="Create">
                    <DATE>${inv.created_at.toISOString().split('T')[0].replace(/-/g, '')}</DATE>
                    <VOUCHERNUMBER>${inv.invoice_no}</VOUCHERNUMBER>
                    <PARTYLEDGERNAME>Cash/UPI Customer</PARTYLEDGERNAME>
                    <ALLLEDGERENTRIES.LIST>
                        <LEDGERNAME>Sales - GST 12%</LEDGERNAME>
                        <AMOUNT>-${inv.total_taxable_value}</AMOUNT>
                    </ALLLEDGERENTRIES.LIST>
                    <ALLLEDGERENTRIES.LIST>
                        <LEDGERNAME>SGST</LEDGERNAME>
                        <AMOUNT>-${inv.sgst_amount}</AMOUNT>
                    </ALLLEDGERENTRIES.LIST>
                </VOUCHER>
            </TALLYMESSAGE>`;
        });

        xml += `</REQUESTDATA></IMPORTDATA></BODY></ENVELOPE>`;
        return xml;
    }
};
module.exports = tallyIntegrationService;
