const pdf = require('html-pdf'); // Example PDF library
const whatsapp = require('./whatsappService');

const prescriptionOutputService = {
    async finalizePrescription(visitId, clinicalData, drawingUri) {
        // 1. Generate HTML for the Prescription (Using the Polyclinic Identity built earlier)
        const html = `
            <div style="font-family: sans-serif; padding: 40px;">
                <h1>${clinicalData.hospitalName}</h1>
                <hr/>
                <p><strong>Patient:</strong> ${clinicalData.patientName} (UHID: ${clinicalData.uhid})</p>
                <h3>Clinical Notes</h3>
                <p>${clinicalData.notes}</p>
                <h3>Rx</h3>
                <ul>${clinicalData.medicines.map(m => `<li>${m.name} - ${m.dose}</li>`).join('')}</ul>
                <img src="${drawingUri}" style="width: 200px;" />
                <br/><br/>
                <p>Digital Signature: Dr. ${clinicalData.doctorName}</p>
            </div>
        `;

        // 2. Export to PDF and Send via WhatsApp
        pdf.create(html).toFile(`./prescriptions/rx_${visitId}.pdf`, (err, res) => {
            whatsapp.sendDocument(clinicalData.patientPhone, res.filename, "Your Digital Prescription from Mediqliq");
        });
        
        return { success: true, message: "Sent to Patient via WhatsApp." };
    }
};
module.exports = prescriptionOutputService;
