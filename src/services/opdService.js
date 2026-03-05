const OPDService = {

  async getTodayQueue() {

    const result = await window.electronAPI.query(
      `SELECT opd_visits.id,
              opd_visits.token_number,
              opd_visits.status,
              patients.first_name,
              patients.last_name
       FROM opd_visits
       LEFT JOIN patients ON patients.id = opd_visits.patient_id
       WHERE visit_date = date('now')
       ORDER BY token_number`
    );

    return result.data || [];

  },

  async getNextToken() {

    const tokenResult = await window.electronAPI.query(
      "SELECT MAX(token_number) as lastToken FROM opd_visits WHERE visit_date = date('now')"
    );

    return (tokenResult.data[0]?.lastToken || 0) + 1;

  },

  async createVisit(patientId, departmentId, doctorId) {

    const nextToken = await this.getNextToken();

    await window.electronAPI.query(
      `INSERT INTO opd_visits
       (id, patient_id, department_id, doctor_id, visit_date, token_number, status)
       VALUES (?, ?, ?, ?, date('now'), ?, 'WAITING')`,
      [
        "visit-" + Date.now(),
        patientId,
        departmentId,
        doctorId,
        nextToken
      ]
    );

    return nextToken;

  },

  async callPatient(visitId) {

    await window.electronAPI.query(
      `UPDATE opd_visits
       SET status='IN_CONSULTATION'
       WHERE id=?`,
      [visitId]
    );

  },

  async nextPatient(doctorId) {

    await window.electronAPI.query(
      `UPDATE opd_visits
       SET status='PRESCRIPTION_COMPLETE'
       WHERE doctor_id=? AND status='IN_CONSULTATION'`,
      [doctorId]
    );

    const result = await window.electronAPI.query(
      `SELECT id
       FROM opd_visits
       WHERE doctor_id=? AND status='WAITING'
       ORDER BY token_number
       LIMIT 1`,
      [doctorId]
    );

    if (!result.data.length) return;

    const nextId = result.data[0].id;

    await window.electronAPI.query(
      `UPDATE opd_visits
       SET status='IN_CONSULTATION'
       WHERE id=?`,
      [nextId]
    );

  },

  async finishConsultation(visitId) {

    await window.electronAPI.query(
      `UPDATE opd_visits
       SET status='PRESCRIPTION_COMPLETE'
       WHERE id=?`,
      [visitId]
    );

  }

};

export default OPDService;
