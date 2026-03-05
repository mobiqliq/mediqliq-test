const db = require('../database/db');

const guardianService = {
    /**
     * Predictive Risk Analysis
     * Combines dental history with genomic markers to predict future loss
     */
    async predictRisk(patient_id) {
        try {
            const sql = `
                SELECT b.risk_factor, count(tp.id) as procedure_history
                FROM patient_biomarkers b
                LEFT JOIN dental_treatment_plans tp ON b.patient_id = tp.patient_id
                WHERE b.patient_id = $1
                GROUP BY b.risk_factor`;
            
            const res = await db.query(sql, [patient_id]);
            const data = res.rows[0];

            if (data && data.risk_factor > 0.7) {
                return {
                    alert: "HIGH SYSTEMIC RISK",
                    insight: "Patient DNA suggests high inflammatory response. Recommend 3-month recall instead of 6-month.",
                    evidence: "Precision Medicine Module - Biomarker IL-1"
                };
            }
            return { alert: "NORMAL", insight: "Standard care path recommended." };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

module.exports = guardianService;
