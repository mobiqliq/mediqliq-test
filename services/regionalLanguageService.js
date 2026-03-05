const axios = require('axios');

const regionalLanguageService = {
    /**
     * Process Regional Voice Consultation using Sarvam AI Saaras
     */
    async transcribeConsultation(audioStream, sourceLang = 'hi') {
        try {
            // Integration with Sarvam AI API for Indic Speech-to-Text
            const response = await axios.post('https://api.sarvam.ai/speech-to-text', {
                audio: audioStream,
                language_code: sourceLang, // 'hi' for Hindi, 'ta' for Tamil, etc.
                model: 'saaras-medical-v1'
            });

            return {
                raw_vernacular: response.data.transcript,
                translated_clinical_notes: response.data.english_translation,
                confidence: response.data.confidence
            };
        } catch (error) {
            return { success: false, error: "Sarvam API Error: " + error.message };
        }
    }
};

module.exports = regionalLanguageService;
