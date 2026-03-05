const db = require('../database/db');

const patientService = {
  async searchPatients(query) {
    const sql = "SELECT * FROM patients WHERE first_name ILIKE $1 OR uhid ILIKE $1 LIMIT 10";
    return await db.query(sql, [`%${query}%`]);
  },

  async createVisit(patientId) {
    try {
      // Ensure patientId is handled as an integer for Postgres
      const pid = parseInt(patientId);
      const sql = "INSERT INTO opd_visits (patient_id, status) VALUES ($1, 'WAITING') RETURNING token_number";
      const result = await db.query(sql, [pid]);
      
      if (result.success && result.data && result.data.length > 0) {
        return { success: true, token: result.data[0].token_number };
      }
      return { success: false, error: "Database rejected the entry" };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

module.exports = patientService;
