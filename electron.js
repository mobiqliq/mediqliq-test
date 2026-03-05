const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const db = require("./simple-db");
const registerIPCHandlers = require("./controllers/ipcHandlers");

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL("http://127.0.0.1:3000");

}

app.whenReady().then(async () => {

  console.log("Mediqliq system starting...");

  await db.connect();

  registerIPCHandlers();

  createWindow();

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});