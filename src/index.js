import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Send signal to Electron Main Process
if (window.require) {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.send('heartbeat', 'alive');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ backgroundColor: '#0F172A', color: 'white', height: '100vh', padding: '20px' }}>
      <App />
    </div>
  </React.StrictMode>
);
