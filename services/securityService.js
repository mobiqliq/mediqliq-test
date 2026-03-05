const securityService = {
    /**
     * Requirement: Log every sensitive access for HIPAA/GDPR audit
     */
    async logAccess(staffId, entityType, entityId, action, req) {
        const auditData = {
            performed_by: staffId,
            entity_type: entityType,
            entity_id: entityId,
            action: action,
            client_ip: req.ip,
            user_agent: req.headers['user-agent']
        };
        
        await db.query(
            'INSERT INTO security_audit_logs (entity_type, entity_id, action, performed_by, client_ip) VALUES ($1, $2, $3, $4, $5)',
            [auditData.entity_type, auditData.entity_id, auditData.action, auditData.performed_by, auditData.client_ip]
        );
    },

    /**
     * Detection: Look for mass data exports (Potential Data Breach)
     */
    async detectAnomaly(staffId, action) {
        if (action === 'BULK_EXPORT') {
            await db.query('INSERT INTO security_alerts (severity, alert_type, description) VALUES ($1, $2, $3)', 
            ['CRITICAL', 'DATA_EXPORT', `Staff ID ${staffId} attempted a bulk patient export.`]);
        }
    }
};
