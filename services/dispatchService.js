const dispatchService = {
    async dispatchReceipt(billData, mode = 'DIGITAL') {
        if (mode === 'DIGITAL') {
            // Generate PDF and send via WhatsApp Bridge
            const pdfUrl = await generatePDF(billData);
            await whatsappService.sendDocument(billData.phone, pdfUrl, "Your Receipt");
            return { success: true, method: 'WhatsApp' };
        } else {
            // "Need-Based" Physical Thermal Print (ESC/POS)
            const printer = require('node-thermal-printer');
            printer.init({ type: 'epson', interface: 'printer:USB001' });
            printer.alignCenter();
            printer.println("MEDIQLIQ CLINIC");
            printer.println(`Receipt: ${billData.id}`);
            await printer.execute();
            return { success: true, method: 'Thermal' };
        }
    }
};
