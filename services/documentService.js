const db = require('../database/db');

const documentService = {
    async getPrescriptionHeader(doctorId, hospitalId, userChoices) {
        // userChoices = { includeGlobalHeader: true, includeSignature: false }
        
        const docQuery = 'SELECT name, qualifications, reg_number, signature_path FROM staff WHERE id = $1';
        const hospQuery = 'SELECT name, address, logo_path, reg_details FROM hospital_profile WHERE id = $1';
        
        const doctor = await db.query(docQuery, [doctorId]);
        const hospital = await db.query(hospQuery, [hospitalId]);

        return {
            header: userChoices.includeGlobalHeader ? hospital.rows[0] : null,
            doctor_info: {
                name: doctor.rows[0].name,
                qualifications: doctor.rows[0].qualifications,
                reg_number: doctor.rows[0].reg_number,
                // Only include signature if the doctor chose to "Add" it for this specific session
                signature: userChoices.includeSignature ? doctor.rows[0].signature_path : null
            }
        };
    }
};

module.exports = documentService;
