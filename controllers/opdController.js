const opdService = require('../services/opdService');

const opdController = {
    handleCheckIn: async (event, data) => {
        return await opdService.createVisit(data);
    },
    handleGetQueue: async (event, doctor_id) => {
        return await opdService.getDoctorQueue(doctor_id);
    },
    handleUpdateStatus: async (event, { visit_id, status }) => {
        return await opdService.updateStatus(visit_id, status);
    }
};

module.exports = opdController;
