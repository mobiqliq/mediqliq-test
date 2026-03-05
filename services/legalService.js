const db = require('../database/db');

const legalService = {
    async getUpcomingExpiries() {
        // Find documents expiring in the next 60 days
        const sql = `
            SELECT document_type, document_number, expiry_date 
            FROM compliance_documents 
            WHERE expiry_date <= CURRENT_DATE + INTERVAL '60 days'`;
        
        const res = await db.query(sql);
        return {
            needs_action: res.rows.length > 0,
            documents: res.rows
        };
    },
    
    async uploadLegalDoc(docData) {
        const sql = `
            INSERT INTO compliance_documents 
            (hospital_id, document_type, document_number, expiry_date, file_path)
            VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        
        const res = await db.query(sql, [
            docData.hospitalId, docData.type, docData.number, docData.expiry, docData.path
        ]);
        return { success: true, docId: res.rows[0].id };
    }
};

module.exports = legalService;
