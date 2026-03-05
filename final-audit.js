const fs = require('fs');
const path = require('path');
const requiredFolders = ['controllers', 'services', 'database'];
const coreFiles = [
    'controllers/ipcHandlers.js',
    'controllers/patientController.js',
    'controllers/opdController.js',
    'controllers/dentalController.js',
    'services/patientService.js',
    'services/opdService.js',
    'services/dentalService.js',
    'services/aiService.js',
    'services/paymentService.js'
];
let errors = 0;
requiredFolders.forEach(f => {
    if (!fs.existsSync(f)) { console.log("❌ MISSING FOLDER: " + f); errors++; }
});
coreFiles.forEach(f => {
    if (!fs.existsSync(f)) { console.log("❌ MISSING FILE: " + f); errors++; }
    else { console.log("✅ FOUND: " + f); }
});
const services = fs.readdirSync('services');
services.forEach(s => {
    if (fs.lstatSync(path.join('services', s)).isDirectory()) {
        console.log("⚠️ REDUNDANCY: Folder found in services: " + s);
        errors++;
    }
});
if (errors === 0) { console.log("\n🚀 AUDIT PASSED: Mediqliq is Clean."); }
else { console.log("\n🛑 AUDIT FAILED: Fix " + errors + " issues."); }
