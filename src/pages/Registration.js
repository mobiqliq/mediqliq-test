import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', phone: '', email: '',
    date_of_birth: '', gender: 'Male', blood_group: 'Unknown',
    abha_id: '', nationality: 'Indian', address: '',
    emergency_contact: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await window.electron.invoke('patient:register', formData);
    if (res.success) {
      alert(`FHIR-Compliant Record Created!\nUHID: ${res.data[0].uhid}`);
      setFormData({ 
        first_name: '', last_name: '', phone: '', email: '',
        date_of_birth: '', gender: 'Male', blood_group: 'Unknown',
        abha_id: '', nationality: 'Indian', address: '',
        emergency_contact: ''
      });
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px', border: '1px solid #e2e8f0',
    borderRadius: '12px', outline: 'none', fontSize: '14px', fontWeight: '600'
  };

  const labelStyle = {
    display: 'block', fontSize: '10px', fontWeight: '900',
    color: '#64748b', textTransform: 'uppercase', marginBottom: '8px',
    letterSpacing: '0.5px'
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Patient Registration</h1>
        <p style={{ color: '#64748b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>
          Interoperable EMR (HL7 FHIR & ABDM Compliant)
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
        
        {/* PERSONAL INFO */}
        <div style={{ gridColumn: 'span 2', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#2563eb', textTransform: 'uppercase' }}>1. Demographics</h3>
        </div>
        
        <div>
          <label style={labelStyle}>First Name</label>
          <input style={inputStyle} value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} required />
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input style={inputStyle} value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} required />
        </div>
        <div>
          <label style={labelStyle}>Date of Birth</label>
          <input type="date" style={inputStyle} value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} required />
        </div>
        <div>
          <label style={labelStyle}>Gender</label>
          <select style={inputStyle} value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
            <option>Male</option><option>Female</option><option>Non-Binary</option><option>Other</option>
          </select>
        </div>

        {/* COMPLIANCE & IDENTITY */}
        <div style={{ gridColumn: 'span 2', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginTop: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#2563eb', textTransform: 'uppercase' }}>2. Identity & Compliance (ABDM/Global)</h3>
        </div>

        <div>
          <label style={labelStyle}>ABHA ID / National ID</label>
          <input style={{...inputStyle, border: '1px solid #38bdf8'}} placeholder="14-digit ABHA or Global ID" value={formData.abha_id} onChange={e => setFormData({...formData, abha_id: e.target.value})} />
        </div>
        <div>
          <label style={labelStyle}>Blood Group</label>
          <select style={inputStyle} value={formData.blood_group} onChange={e => setFormData({...formData, blood_group: e.target.value})}>
            <option>Unknown</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
          </select>
        </div>

        {/* CONTACT INFO */}
        <div style={{ gridColumn: 'span 2', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginTop: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#2563eb', textTransform: 'uppercase' }}>3. Contact Details</h3>
        </div>

        <div>
          <label style={labelStyle}>Phone Number</label>
          <input style={inputStyle} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input type="email" style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Residential Address</label>
          <textarea style={{...inputStyle, height: '80px'}} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
        </div>

        <button type="submit" style={{ gridColumn: 'span 2', marginTop: '20px', padding: '20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Finalize FHIR Registration
        </button>
      </form>
    </div>
  );
};

export default Registration;
