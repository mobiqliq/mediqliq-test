const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
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

  mainWindow.loadURL("http://127.0.0.1:3000");
}

async function startSystem() {

  await db.connect();

  console.log("Mediqliq system starting...");

  await createWindow();
}

app.whenReady().then(startSystem);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("query", async (event, sql, params) => {
  return await db.query(sql, params);
});

ipcMain.handle("run", async (event, sql, params) => {
  return await db.run(sql, params);
});
