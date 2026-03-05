const registerIPCHandlers = require('./controllers/ipcHandlers');

console.log("-----------------------------------------");
console.log("🏥 MEDIQLIQ SYSTEM INTEGRATION TEST");
console.log("-----------------------------------------");

try {
    console.log("1. Checking Controllers...");
    registerIPCHandlers();
    console.log("✅ IPC Handlers registered successfully.");
    
    console.log("\n2. Checking Service Imports...");
    const patientService = require('./services/patientService');
    const opdService = require('./services/opdService');
    const consultService = require('./services/consultationService');
    const billingService = require('./services/billingService');
    console.log("✅ All Services imported successfully.");

    console.log("\n-----------------------------------------");
    console.log("🚀 SYSTEM READY: ARCHITECTURE IS INTENDED");
    console.log("-----------------------------------------");
} catch (error) {
    console.log("\n❌ SYSTEM ERROR DETECTED:");
    console.error(error.message);
    console.log("\nPROBABLE CAUSE: Missing file or folder redundancy.");
}
