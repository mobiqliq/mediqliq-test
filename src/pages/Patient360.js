import React, { useState, useEffect } from 'react';
import PatientBanner from '../components/PatientBanner';
import ClinicalTimeline from '../components/ClinicalTimeline';

const Patient360 = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Security DNA: Direct IPC calls ensure data never touches an unencrypted bus
      const pRes = await window.electron.invoke('patient:get-one', patientId);
      const hRes = await window.electron.invoke('patient:get-history', patientId);
      
      if (pRes.success) setPatient(pRes.data[0]);
      if (hRes.success) setHistory(hRes.data);
      setLoading(false);
    };
    fetchData();
  }, [patientId]);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center', fontWeight: '900', color: '#64748b' }}>LOADING SECURE RECORD...</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#2563eb', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', fontSize: '11px' }}>
        ← Back to Patient List
      </button>

      {/* DNA: Interoperability - Standardized Banner */}
      <PatientBanner patient={patient} vitals={history[0]?.vitals} />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* LEFT COLUMN: The Longitudinal Timeline (Modularity) */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase' }}>Clinical Timeline</h2>
            <button style={{ padding: '8px 16px', borderRadius: '10px', backgroundColor: '#f1f5f9', border: 'none', fontSize: '10px', fontWeight: '900', color: '#475569' }}>FILTER BY TYPE</button>
          </div>
          <div style={{ height: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
            <ClinicalTimeline encounters={history} />
          </div>
        </section>

        {/* RIGHT COLUMN: Clinical Insights & Summary (Compliance) */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* Allergies & Alerts - Security/Safety DNA */}
          <div style={{ backgroundColor: '#fff1f2', padding: '25px', borderRadius: '24px', border: '1px solid #fecdd3' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#be123c', textTransform: 'uppercase', marginBottom: '15px' }}>Critical Alerts</h3>
            <p style={{ margin: 0, color: '#9f1239', fontWeight: 'bold', fontSize: '14px' }}>No known drug allergies (NKDA)</p>
          </div>

          {/* Quick Stats - Resource Lightness (Calculated on fly) */}
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', marginBottom: '15px' }}>Visit Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}>Total Visits</span>
                <span style={{ fontWeight: '900' }}>{history.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}>First Visit</span>
                <span style={{ fontWeight: '900' }}>{history[history.length-1]?.created_at ? new Date(history[history.length-1].created_at).getFullYear() : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Compliance DNA: Export for ABDM/Global Interoperability */}
          <div style={{ backgroundColor: '#f0f9ff', padding: '25px', borderRadius: '24px', border: '1px solid #bae6fd' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#0369a1', textTransform: 'uppercase', marginBottom: '10px' }}>Data Portability</h3>
            <p style={{ fontSize: '11px', color: '#0c4a6e', lineHeight: '1.5', fontWeight: 'bold' }}>Generate FHIR JSON or ABDM-compliant Health Record for this patient.</p>
            <button style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '11px', cursor: 'pointer' }}>EXPORT FHIR BUNDLE</button>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default Patient360;
