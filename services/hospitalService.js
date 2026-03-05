const db = require('../database/db');

const hospitalService = {
  // Fix: Added the missing getProfile function
  async getProfile() {
    return await db.query("SELECT * FROM hospital_profile LIMIT 1");
  },

  async getOperationalStats() {
    // Patient Volume (Resource Lightness)
    const patientCount = await db.query("SELECT COUNT(*) FROM patients");
    
    // Disease Prevalence (Modularity)
    const topDiagnosis = await db.query(`
      SELECT diagnosis, COUNT(diagnosis) as frequency 
      FROM opd_visits 
      WHERE diagnosis IS NOT NULL AND status = 'COMPLETED'
      GROUP BY diagnosis 
      ORDER BY frequency DESC LIMIT 5`);

    // Operational Load (Compliance)
    const loadStats = await db.query(`
      SELECT status, COUNT(*) as count 
      FROM opd_visits 
      WHERE created_at > CURRENT_DATE - INTERVAL '30 days'
      GROUP BY status`);

    return {
      success: true,
      data: {
        totalPatients: patientCount.data[0].count,
        prevalence: topDiagnosis.data || [],
        operationalLoad: loadStats.data || []
      }
    };
  }
};

module.exports = hospitalService;
