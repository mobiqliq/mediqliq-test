import React, { useEffect, useState } from 'react';

function App() {
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, count: 0 });

  const loadData = async () => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      const data = await ipcRenderer.invoke('db-operation', { collection: 'patients', action: 'READ' });
      setPatients(data);
      const totalRev = data.reduce((acc, curr) => acc + (parseInt(curr.bill) || 0), 0);
      setStats({ revenue: totalRev, count: data.length });
    }
  };

  const registerPatient = async () => {
    const names = ["Aravind Sharma", "Priya Das", "Rahul Verma", "Sita Iyer"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      await ipcRenderer.invoke('db-operation', { 
        collection: 'patients', 
        action: 'WRITE', 
        data: { name: randomName, bill: 4500, dept: "General Medicine" } 
      });
      loadData();
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1E293B', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontWeight: '900' }}>MEDIQLIQ <span style={{ color: '#6366F1' }}>OS v1.0</span></h1>
        <button onClick={registerPatient} style={{ background: '#6366F1', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
          + New Registration
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        {/* Financial Pulse */}
        <section style={{ background: '#1E293B', padding: '30px', borderRadius: '24px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase' }}>Hospital Yield</h3>
          <p style={{ fontSize: '42px', margin: '10px 0', fontWeight: 'bold' }}>₹{stats.revenue.toLocaleString()}</p>
          <p style={{ color: '#10B981' }}>Total Patients: {stats.count}</p>
        </section>

        {/* Clinical Records List */}
        <section style={{ background: '#0F172A', padding: '30px', borderRadius: '24px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', marginBottom: '20px' }}>Live Patient Feed</h3>
          {patients.slice(-5).reverse().map(p => (
            <div key={p.id} style={{ padding: '15px', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between' }}>
              <span>{p.name}</span>
              <span style={{ color: '#6366F1', fontWeight: 'mono' }}>{p.dept}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
