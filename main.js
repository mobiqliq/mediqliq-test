const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs-extra');

// Path to your local JSON database
const DB_PATH = path.join(__dirname, 'db.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load the React build or dev server
  const startUrl = process.env.ELECTRON_START_URL || 
                   `file://${path.join(__dirname, './build/index.html')}`;
  win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

// --- Mediqliq Bridge Logic ---

// Handle Data Fetching for Analytics
ipcMain.handle('get-hospital-yield', async () => {
  try {
    const data = await fs.readJson(DB_PATH);
    return data.hospitalYield || [];
  } catch (err) {
    console.error("Database Read Error:", err);
    return [];
  }
});

// Handle WhatsApp Bridge
ipcMain.on('open-whatsapp', (event, { phone, message }) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  shell.openExternal(url);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
