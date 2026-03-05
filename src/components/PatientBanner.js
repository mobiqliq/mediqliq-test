import React from 'react';

const PatientBanner = ({ patient, vitals }) => {
  if (!patient) return null;

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
    borderRight: '1px solid #e2e8f0'
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const valueStyle = {
    fontSize: '14px',
    fontWeight: '800',
    color: '#0f172a'
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#f8fafc', 
      padding: '15px 25px', 
      borderRadius: '20px',
      marginBottom: '25px',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ ...itemStyle, paddingLeft: 0 }}>
        <span style={labelStyle}>Patient Name</span>
        <span style={{ ...valueStyle, color: '#2563eb' }}>{patient.first_name} {patient.last_name}</span>
      </div>
      <div style={itemStyle}>
        <span style={labelStyle}>UHID (Global)</span>
        <span style={valueStyle}>{patient.uhid}</span>
      </div>
      <div style={itemStyle}>
        <span style={labelStyle}>Age/Gender</span>
        <span style={valueStyle}>{patient.age || 'N/A'} / {patient.gender}</span>
      </div>
      <div style={itemStyle}>
        <span style={labelStyle}>Latest BP</span>
        <span style={{ ...valueStyle, color: '#ef4444' }}>{vitals?.bp || '--/--'}</span>
      </div>
      <div style={{ ...itemStyle, borderRight: 'none' }}>
        <span style={labelStyle}>ABHA ID (India)</span>
        <span style={valueStyle}>{patient.abha_id || 'Not Linked'}</span>
      </div>
    </div>
  );
};

export default PatientBanner;
