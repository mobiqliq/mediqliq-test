const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mediqliqAPI', {
  getYieldData: () => ipcRenderer.invoke('get-hospital-yield'),
  sendWhatsApp: (payload) => ipcRenderer.send('open-whatsapp', payload)
});
