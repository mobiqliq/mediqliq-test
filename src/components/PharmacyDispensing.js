import React, { useState } from 'react';

const PharmacyDispensing = ({ activePrescriptions }) => {
  const [dispensingId, setDispensingId] = useState(null);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-black text-slate-900 mb-8">Pharmacy Queue</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {activePrescriptions.map(rx => (
          <div key={rx.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">💊</div>
              <div>
                <h4 className="font-black text-slate-800 text-lg">{rx.patientName}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Prescribed by Dr. {rx.doctorName}</p>
              </div>
            </div>

            <div className="flex-1 px-12">
              <div className="flex gap-2 overflow-x-auto">
                {rx.medicines.map((med, i) => (
                  <span key={i} className={`px-4 py-2 rounded-xl text-xs font-bold border ${med.inStock ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-600'}`}>
                    {med.name} {!med.inStock && '(OOS)'}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${rx.isPaid ? 'bg-green-600 text-white' : 'bg-amber-400 text-white'}`}>
                {rx.isPaid ? 'Ready to Dispense' : 'Awaiting Payment'}
              </span>
              <button 
                disabled={!rx.isPaid}
                className="mt-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 transition-all"
              >
                Mark Dispensed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyDispensing;
