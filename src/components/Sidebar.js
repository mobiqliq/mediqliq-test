import React, { useState, useEffect } from 'react';

const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    window.electron.invoke('hospital:get-profile').then(res => {
      if (res && res.success) setHospital(res.data[0]);
    });
  }, []);

  const allMenus = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', roles: ['SUPER_ADMIN'] },
    { id: 'registration', label: 'Patient Reg', icon: '👤', roles: ['SUPER_ADMIN', 'RECEPTIONIST'] },
    { id: 'opd', label: 'OPD Check-in', icon: '🏥', roles: ['SUPER_ADMIN', 'RECEPTIONIST'] },
    { id: 'doctor', label: 'Doctor Queue', icon: '👨‍⚕️', roles: ['SUPER_ADMIN', 'DOCTOR', 'NURSE'] },
    { id: 'staff', label: 'Staff Management', icon: '👥', roles: ['SUPER_ADMIN'] },
    { id: 'subscription', label: 'Subscription', icon: '💳', roles: ['SUPER_ADMIN'] },
  ];

  const visibleMenus = allMenus.filter(m => m.roles.includes(user.role));

  return (
    <div style={{ 
      width: '280px', 
      backgroundColor: '#0f172a', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      borderRight: '1px solid #1e293b'
    }}>
      {/* Hospital Brand Header */}
      <div style={{ padding: '30px 24px', borderBottom: '1px solid #1e293b' }}>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: '900', 
          color: '#38bdf8', 
          textTransform: 'uppercase', 
          margin: 0,
          letterSpacing: '-0.5px'
        }}>
          {hospital ? hospital.hospital_name : 'MEDIQLIQ OS'}
        </h1>
        <div style={{ marginTop: '12px' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>{user.fullName}</p>
          <p style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', margin: '2px 0 0 0', fontWeight: '900' }}>{user.role}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {visibleMenus.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveTab(m.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              backgroundColor: activeTab === m.id ? '#2563eb' : 'transparent',
              color: activeTab === m.id ? 'white' : '#94a3b8',
            }}
          >
            <span style={{ fontSize: '20px' }}>{m.icon}</span>
            <span style={{ fontSize: '14px', fontWeight: '800' }}>{m.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Area */}
      <div style={{ padding: '24px', borderTop: '1px solid #1e293b' }}>
        <button 
          onClick={() => window.location.reload()}
          style={{ 
            width: '100%', 
            padding: '14px', 
            backgroundColor: '#1e293b', 
            color: '#f87171', 
            borderRadius: '12px', 
            border: '1px solid #334155',
            fontWeight: '900',
            fontSize: '11px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Exit Session
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
