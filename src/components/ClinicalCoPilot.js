import React, { useState } from 'react';

const ClinicalCoPilot = ({ patientData, onFinalApproval }) => {
  const [draft, setDraft] = useState({
    diagnosis: 'Acute Pulpitis',
    notes: 'Severe pain in lower right molar. Cold sensitivity present.',
    rx: [{ name: 'Ibuprofen 400mg', dose: '1-0-1' }]
  });

  return (
    <div className="grid grid-cols-3 gap-6 p-8 bg-slate-50">
      {/* AI Assistant Column */}
      <div className="col-span-1 space-y-4">
        <div className="p-6 bg-blue-600 rounded-[2rem] text-white shadow-xl">
          <h3 className="text-xs font-black uppercase tracking-widest opacity-80">AI Predictive Insights</h3>
          <p className="mt-4 text-sm font-medium italic">"Patient had a similar episode in Dec 2025. Suggesting X-Ray (IOPA) for Tooth #46."</p>
          <p className="text-[10px] mt-2 opacity-60">Source: Mediqliq History Engine</p>
        </div>
      </div>

      {/* Interactive Note Taking */}
      <div className="col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black mb-6">Active Consultation</h2>
        
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase">Clinical Notes (AI Drafted - Edit to modify)</label>
            <textarea 
              className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-none h-32 focus:ring-2 ring-blue-500"
              value={draft.notes}
              onChange={(e) => setDraft({...draft, notes: e.target.value})}
            />
          </div>

          <div className="p-6 border-2 border-dashed border-slate-100 rounded-2xl">
            <h4 className="text-xs font-black text-slate-800 uppercase mb-4">Draft Prescription</h4>
            {draft.rx.map((med, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="font-bold text-slate-700">{med.name}</span>
                <span className="text-xs text-slate-400">{med.dose}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl">Discard Draft</button>
            <button 
              onClick={() => onFinalApproval(draft)}
              className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-green-600 transition-all shadow-xl"
            >
              Approve & Sign Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCoPilot;
