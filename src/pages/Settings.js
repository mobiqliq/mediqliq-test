import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [modules, setModules] = useState({});

  useEffect(() => {
    window.electron.invoke('config:get-modules').then(res => {
      if (res.success) setModules(res.value);
    });
  }, []);

  const toggleModule = async (key) => {
    const newModules = { ...modules, [key]: !modules[key] };
    const res = await window.electron.invoke('config:save-modules', newModules);
    if (res.success) setModules(newModules);
  };

  const moduleList = [
    { key: 'triage', label: 'Triage Station', desc: 'Pre-consultation vitals entry by nurses/receptionists.' },
    { key: 'billing', label: 'Billing & Invoicing', desc: 'Generate invoices and track payments (GST/Global Tax ready).' },
    { key: 'pharmacy', label: 'Digital Pharmacy', desc: 'Inventory management and medicine dispensing module.' },
    { key: 'laboratory', label: 'Lab Integration', desc: 'Manage pathology requests and digital result entry.' }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Module Manager</h1>
        <p style={{ color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Plug & Play Clinical Workflows</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {moduleList.map((m) => (
          <div key={m.key} style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '24px', 
            border: `2px solid ${modules[m.key] ? '#2563eb' : '#f1f5f9'}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>{m.label}</h3>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: '900', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  backgroundColor: modules[m.key] ? '#dbeafe' : '#f1f5f9',
                  color: modules[m.key] ? '#2563eb' : '#94a3b8'
                }}>
                  {modules[m.key] ? 'PLUGGED IN' : 'OFFLINE'}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold', lineHeight: '1.5' }}>{m.desc}</p>
            </div>
            
            <button 
              onClick={() => toggleModule(m.key)}
              style={{
                marginTop: '25px',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: modules[m.key] ? '#ef4444' : '#2563eb',
                color: 'white',
                fontWeight: '900',
                fontSize: '11px',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              {modules[m.key] ? 'UNPLUG MODULE' : 'ACTIVATE MODULE'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
