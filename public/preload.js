const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {

query: (sql, params) => ipcRenderer.invoke("query", sql, params),

getHospital: () => ipcRenderer.invoke("getHospital")

});