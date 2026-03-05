const db = require('../database/db');

const labResultService = {
    /**
     * Requirement: Enter results and auto-flag abnormalities
     */
    async saveResults(orderId, results) {
        // results = [{ parameter: 'Hemoglobin', value: 10.5, unit: 'g/dL', range: '13-17' }]
        
        const processedResults = results.map(r => {
            const [min, max] = r.range.split('-').map(Number);
            return {
                ...r,
                is_abnormal: r.value < min || r.value > max,
                flag_type: r.value < min ? 'LOW' : r.value > max ? 'HIGH' : 'NORMAL'
            };
        });

        const sql = `UPDATE lab_orders SET result_data = $1, status = 'REPORTED', reported_at = CURRENT_TIMESTAMP WHERE id = $2`;
        await db.query(sql, [JSON.stringify(processedResults), orderId]);
        
        return { success: true, results: processedResults };
    }
};
module.exports = labResultService;
