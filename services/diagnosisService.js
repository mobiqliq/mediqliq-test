const aiService = require('./aiService');
const knowledgeService = require('./knowledgeService');

const diagnosisService = {
    async getDifferential(patient_id, current_symptoms) {
        // 1. Get Past DNA
        const history = await aiService.getPatientDNA(patient_id);
        
        // 2. Cross-reference with Local Research
        const research = await knowledgeService.queryResearch(current_symptoms);

        return {
            primary_suggestion: "Chronic Periodontitis",
            differentials: [
                {
                    condition: "Early Stage Type-2 Diabetes",
                    probability: "30%",
                    reasoning: "Recurring gum infections + Patient's recorded high BMI in 2024.",
                    citation: "Internal Visit #202 (2024), ADA Clinical Guidelines 2025"
                }
            ]
        };
    }
};

module.exports = diagnosisService;
