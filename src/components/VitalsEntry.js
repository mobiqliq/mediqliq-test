import React, { useState } from 'react';

const VitalsEntry = ({ patientName, onSave, showTitle = true }) => {
  const [vitals, setVitals] = useState({ bp: '', hr: '', temp: '', weight: '', spo2: '' });

  const handleSave = () => {
    // Validation: Ensure at least one field is filled
    if (Object.values(vitals).some(v => v !== '')) {
      onSave(vitals);
    }
  };

  return (
    <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
      {showTitle && (
        <div className="mb-4">
          <h3 className="font-bold text-slate-800">Vitals for {patientName}</h3>
          <p className="text-[10px] text-slate-400 uppercase font-black">Pre-Consultation Screening</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 ml-1">BP (mmHg)</label>
          <input className="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 ring-blue-500" 
            placeholder="120/80" onChange={(e) => setVitals({...vitals, bp: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 ml-1">Heart Rate (bpm)</label>
          <input className="w-full p-3 bg-slate-50 rounded-xl text-sm border-none" 
            placeholder="72" onChange={(e) => setVitals({...vitals, hr: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 ml-1">Temp (°F)</label>
          <input className="w-full p-3 bg-slate-50 rounded-xl text-sm border-none" 
            placeholder="98.6" onChange={(e) => setVitals({...vitals, temp: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 ml-1">Weight (kg)</label>
          <input className="w-full p-3 bg-slate-50 rounded-xl text-sm border-none" 
            placeholder="65" onChange={(e) => setVitals({...vitals, weight: e.target.value})} />
        </div>
      </div>

      <button onClick={handleSave} 
        className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition-all active:scale-95">
        Sync to Clinical Record
      </button>
    </div>
  );
};

export default VitalsEntry;
