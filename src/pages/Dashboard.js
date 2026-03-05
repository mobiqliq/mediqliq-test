import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    window.electron.invoke('hospital:get-stats').then(res => {
      if (res.success) setStats(res.data);
    });
  }, []);

  const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '28px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)'
  };

  const labelStyle = { fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' };

  if (!stats) return <div style={{ padding: '40px', fontWeight: '900', color: '#64748b' }}>CALCULATING ANALYTICS...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Operational Intelligence</h1>
        <p style={{ color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Clinic Performance & Disease Surveillance</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
        
        {/* Total Reach Card */}
        <div style={cardStyle}>
          <span style={labelStyle}>Total Registered Lives</span>
          <div style={{ fontSize: '48px', fontWeight: '900', color: '#2563eb', marginTop: '10px' }}>{stats.totalPatients}</div>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>↑ Global Interoperability Ready</div>
        </div>

        {/* Operational Flow (Modularity: Status tracking) */}
        <div style={cardStyle}>
          <span style={labelStyle}>30-Day Operational Load</span>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {stats.operationalLoad.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>{item.status}</span>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#f1f5f9', margin: '0 15px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(item.count / stats.totalPatients) * 100 || 20}%`, height: '100%', backgroundColor: '#2563eb' }}></div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '900' }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disease Prevalence (Global DNA: Surveillance) */}
        <div style={{ ...cardStyle, gridColumn: 'span 1' }}>
          <span style={labelStyle}>Top Diagnosis Patterns</span>
          <div style={{ marginTop: '20px' }}>
            {stats.prevalence.map((d, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i === stats.prevalence.length-1 ? 'none' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{d.diagnosis}</span>
                <span style={{ fontWeight: '900', color: '#6366f1' }}>{d.frequency} cases</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
