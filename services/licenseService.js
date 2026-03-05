const os = require('os');
const crypto = require('crypto');

const licenseService = {
    getMachineId() {
        const interfaces = os.networkInterfaces();
        const mac = Object.values(interfaces).flat().find(i => !i.internal && i.mac !== '00:00:00:00:00:00')?.mac;
        return crypto.createHash('sha256').update(mac + os.hostname()).digest('hex').substring(0, 16).toUpperCase();
    },
    verifyLicense(inputKey) {
        const machineId = this.getMachineId();
        const expectedKey = crypto.createHash('md5').update(machineId + "MEDIQLIQ_SALT").digest('hex').toUpperCase();
        return inputKey === expectedKey;
    }
};
module.exports = licenseService;
