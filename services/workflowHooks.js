const notificationEngine = require('./notificationEngine');

// Hook: Called when Lab Tech clicks 'Finalize'
async function onLabReportFinalized(order) {
    await notificationEngine.triggerDelivery(order.patient_id, 'LAB_REPORT', order.file_path);
}

// Hook: Called when Doctor signs Prescription
async function onPrescriptionSigned(visit) {
    await notificationEngine.triggerDelivery(visit.patient_id, 'PRESCRIPTION', visit.rx_path);
}
