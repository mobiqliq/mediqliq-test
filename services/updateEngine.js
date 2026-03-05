const { autoUpdater } = require('electron-updater');

const updateEngine = {
    init() {
        autoUpdater.checkForUpdatesAndNotify();

        autoUpdater.on('update-available', () => {
            console.log('✨ New Clinical Protocol Update Available.');
        });

        autoUpdater.on('update-downloaded', () => {
            // "Silent" install: Update applies when the app restarts
            console.log('✅ Update ready. Will install on next launch.');
        });
    }
};
module.exports = updateEngine;
