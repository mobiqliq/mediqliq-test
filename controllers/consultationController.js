const consultationService = require('../services/consultationService');

const consultationController = {
    handleSubmit: async (event, data) => {
        return await consultationService.submitConsultation(data);
    }
};

module.exports = consultationController;
