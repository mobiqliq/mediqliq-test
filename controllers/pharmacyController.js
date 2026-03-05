const pharmacyService = require('../services/pharmacyService');

const pharmacyController = {
    handleSearch: async (event, query) => {
        return await pharmacyService.searchMedicines(query);
    },
    handleDispense: async (event, { medicine_id, quantity }) => {
        return await pharmacyService.updateStock(medicine_id, quantity);
    }
};

module.exports = pharmacyController;
