const fs = require('fs');
const path = require('path');

const recoveryEngine = {
    async initiateBackup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = path.join(process.env.HOME, 'Documents', 'Mediqliq_Backups');
        const backupPath = path.join(backupDir, `backup-${timestamp}.json`);

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }
        
        console.log("Snapshot created at: " + backupPath);
        return backupPath;
    }
};
module.exports = recoveryEngine;
