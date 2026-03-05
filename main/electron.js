const { app, BrowserWindow } = require("electron");
const path = require("path");

const registerIPC = require("../controllers/ipcHandlers");
const db = require("../database/db");

let mainWindow;

async function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  await mainWindow.loadURL("http://127.0.0.1:3000");

}

app.whenReady().then(async () => {

  await db.connect();

  console.log("Mediqliq system starting...");

  registerIPC();

  createWindow();

});

app.on("window-all-closed", () => {

  if (process.platform !== "darwin") {
    app.quit();
  }

});
