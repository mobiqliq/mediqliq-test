export async function logAudit(
  action,
  entityType,
  entityId = null,
  newValues = null,
  oldValues = null
) {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    const auditId = await window.electronAPI.generateId();

    await window.electronAPI.run(
      `INSERT INTO audit_logs
       (id, user_id, action, entity_type, entity_id, old_values, new_values)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        auditId,
        user.id,
        action,
        entityType,
        entityId,
        oldValues ? JSON.stringify(oldValues) : null,
        newValues ? JSON.stringify(newValues) : null
      ]
    );

  } catch (error) {
    console.error("Audit logging failed", error);
  }
}
