import React, { useState } from 'react';

const SettlementDesk = ({ pendingPayouts }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Professional Fee Settlement</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {pendingPayouts.map(doc => (
            <div key={doc.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-green-700">
                  {doc.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-800">Dr. {doc.name}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase">{doc.specialty} • {doc.unpaidCount} Pending Bills</p>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Outstanding</p>
                  <p className="text-3xl font-black text-slate-900">₹{doc.totalDue.toLocaleString()}</p>
                </div>
                
                <button 
                  onClick={() => setSelectedDoc(doc)}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 shadow-xl transition-all"
                >
                  Process Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Modal (Simplistic) */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-2xl font-black mb-2">Confirm Payout</h3>
            <p className="text-slate-500 mb-8 text-sm">Settling ₹{selectedDoc.totalDue} for Dr. {selectedDoc.name}</p>
            
            <div className="space-y-4 mb-8">
              <select className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none">
                <option>Bank Transfer (NEFT/IMPS)</option>
                <option>Cheque</option>
                <option>UPI</option>
                <option>Cash</option>
              </select>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none" placeholder="Reference / UTR Number" />
            </div>

            <div className="flex gap-4">
              <button onClick={() => setSelectedDoc(null)} className="flex-1 py-4 font-bold text-slate-400">Cancel</button>
              <button className="flex-1 py-4 bg-green-600 text-white font-black rounded-2xl shadow-lg">Finalize Payout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettlementDesk;
