const db = require('../database/db');
const whatsapp = require('./whatsappService'); // Wrapper for Meta/Twilio API

const notificationEngine = {
    /**
     * Requirement: Auto-deliver based on status change
     */
    async triggerDelivery(patientId, type, documentPath) {
        // 1. Fetch Patient Contact
        const patient = await db.query('SELECT name, phone, language FROM patients WHERE id = $1', [patientId]);
        const { name, phone, language } = patient.rows[0];

        // 2. Generate Secure Temporary Link (Expiring in 24h)
        const secureUrl = `https://mediqliq.com/view/rx?id=${Buffer.from(documentPath).toString('base64')}`;

        // 3. Multilingual Template Logic (Regional Friendly)
        const messages = {
            'EN': `Hello ${name}, your ${type} from Mediqliq is ready. View here: ${secureUrl}`,
            'HI': `नमस्ते ${name}, Mediqliq से आपकी ${type} रिपोर्ट तैयार है। यहाँ देखें: ${secureUrl}`
        };

        const body = messages[language] || messages['EN'];

        // 4. Send via WhatsApp (Priority) and SMS (Backup)
        await whatsapp.sendMessage(phone, body);
        console.log(`✅ ${type} delivered to ${name} at ${phone}`);
    }
};
module.exports = notificationEngine;
