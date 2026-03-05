const db = require('../database/db');
const bcrypt = require('bcryptjs');

const authService = {
  async countUsers() { return await db.query("SELECT COUNT(*) FROM users"); },

  async createInitialSuperAdmin(data) {
    const { hospitalId, username, password, fullName } = data;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const sql = "INSERT INTO users (hospital_id, username, password_hash, role, full_name, can_triage) VALUES ($1, $2, $3, 'SUPER_ADMIN', $4, true) RETURNING id";
    return await db.query(sql, [hospitalId, username.trim().toLowerCase(), hash, fullName]);
  },

  async createStaff(data) {
    const { username, password, fullName, role, canTriage } = data;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const hRes = await db.query("SELECT hospital_id FROM hospital_profile LIMIT 1");
    const sql = "INSERT INTO users (hospital_id, username, password_hash, role, full_name, can_triage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
    return await db.query(sql, [hRes.data[0].hospital_id, username.trim().toLowerCase(), hash, role, fullName, canTriage || false]);
  },

  // NEW: Master Reset Function
  async masterResetPassword(userId, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    const sql = "UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING id";
    return await db.query(sql, [hash, userId]);
  },

  async getAllUsers() {
    return await db.query("SELECT id, username, role, full_name, can_triage FROM users ORDER BY role ASC");
  },

  async login(username, password) {
    const res = await db.query("SELECT * FROM users WHERE LOWER(username) = LOWER($1)", [username.trim()]);
    if (res.data.length === 0) return { success: false, error: "User not found" };
    const user = res.data[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (valid) return { success: true, user: { id: user.id, username: user.username, role: user.role, fullName: user.full_name, canTriage: user.can_triage } };
    return { success: false, error: "Invalid password" };
  }
};
module.exports = authService;
