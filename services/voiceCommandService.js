const voiceCommandService = {
    /**
     * Requirement 3: Regional Voice to Text
     * Maps regional keywords to Clinical English
     */
    processVoice(transcript) {
        const dictionary = {
            'acidity': 'Dyspepsia/GERD',
            'dard': 'Pain/Tenderness',
            'bukhaar': 'Pyrexia (Fever)',
            'sugar': 'Diabetes Mellitus'
        };

        let professionalNote = transcript;
        Object.keys(dictionary).forEach(key => {
            professionalNote = professionalNote.replace(new RegExp(key, 'gi'), dictionary[key]);
        });
        
        return professionalNote;
    }
};
module.exports = voiceCommandService;
