import React, { useEffect, useState } from 'react';

const ClinicalFeed = () => {
  const [records, setRecords] = useState([]);

  const fetchFeed = async () => {
    // Calling the bridge defined in preload.js
    const data = await window.mediqliqAPI.getYieldData();
    setRecords(data);
  };

  useEffect(() => {
    fetchFeed();
    // Optional: Refresh feed every 30 seconds
    const interval = setInterval(fetchFeed, 30000);
    return () => clearInterval(interval);
  }, []);

  const sendWhatsApp = (phone, date) => {
    const message = `Mediqliq Update: Your clinical record for ${date} is ready.`;
    window.mediqliqAPI.sendWhatsApp({ phone: "91" + phone, message });
  };

  return (
    <div style={{ padding: '20px', background: '#f4f7f6', height: '100vh' }}>
      <h2 style={{ color: '#2c3e50' }}>Live Clinical Feed (30-Day Snapshot)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
        <thead>
          <tr style={{ background: '#4F46E5', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>OPD Patients</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Revenue (₹)</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((row, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{row.date}</td>
              <td style={{ padding: '12px' }}>{row.patients}</td>
              <td style={{ padding: '12px' }}>{row.revenue.toLocaleString()}</td>
              <td style={{ padding: '12px' }}>
                <button 
                  onClick={() => sendWhatsApp('9876543210', row.date)}
                  style={{ background: '#25D366', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  WhatsApp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClinicalFeed;
