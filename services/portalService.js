const whatsappService = require('./whatsappService');
const portalService = {
    async sendPatientSummary(patientId, phone, language = 'hi') {
        const portalUrl = `https://mediqliq.global/portal/${patientId}`;
        const message = language === 'hi' 
            ? `Namaste, aapka Mediqliq record taiyaar hai: ${portalUrl}`
            : `Hello, your Mediqliq record is ready: ${portalUrl}`;
        return await whatsappService.sendRawMessage(phone, message);
    }
};
module.exports = portalService;
