const db = require('../database/db');

const pathologyService = {
    /**
     * Requirement: Move from Doctor's Order to Lab Queue
     */
    async createLabOrder(visitId, tests) {
        // tests = ['CBC', 'HbA1c', 'Lipid Profile']
        const sampleId = `LAB-${Date.now().toString().slice(-6)}`;
        
        const sql = `
            INSERT INTO lab_orders (visit_id, sample_id, test_list, status)
            VALUES ($1, $2, $3, 'AWAITING_SAMPLE')`;
        
        await db.query(sql, [visitId, sampleId, JSON.stringify(tests)]);
        return { success: true, sampleId };
    }
};
module.exports = pathologyService;
