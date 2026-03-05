const { ipcMain } = require('electron');
const branchService = require('../services/branchService');

function registerIPCHandlers() {
    if (ipcMain && ipcMain.handle) {
        // Multi-Branch Intelligence
        ipcMain.handle('admin:get-global-stats', async () => await branchService.getGlobalRevenue());
        ipcMain.handle('admin:get-low-stock', async () => await branchService.getGlobalInventoryAlerts());
        
        console.log("🚀 MEDIQLIQ: MULTI-SPECIALTY & BRANCH ENGINES ACTIVE");
    }
}

module.exports = registerIPCHandlers;
