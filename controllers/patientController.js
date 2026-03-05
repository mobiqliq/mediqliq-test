const patientService = require('../services/patientService');

const patientController = {
    handleRegister: async (event, data) => {
        return await patientService.registerPatient(data);
    },
    handleSearch: async (event, query) => {
        return await patientService.searchPatients(query);
    }
};

module.exports = patientController;
