import React, { useState } from 'react';

const PathologyTerminal = ({ pendingSamples }) => {
  return (
    <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-slate-900">Lab Logistics</h2>
        <div className="flex gap-4">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase">In-House: 12</span>
          <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase">Outsourced: 4</span>
        </div>
      </div>

      <div className="space-y-4">
        {pendingSamples.map(sample => (
          <div key={sample.id} className={`p-6 rounded-2xl border-2 flex justify-between items-center ${
            sample.source === 'OUTSOURCED' ? 'border-purple-100 bg-purple-50/30' : 'border-slate-50'
          }`}>
            <div>
              <p className="font-bold text-slate-800">{sample.testName}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Patient: {sample.patientName} • {sample.uhid}</p>
            </div>
            
            <div className="flex items-center gap-6">
              {sample.source === 'OUTSOURCED' ? (
                <div className="text-right">
                  <p className="text-[10px] font-black text-purple-600 uppercase">Vendor: {sample.vendorName}</p>
                  <button className="mt-2 bg-purple-600 text-white px-6 py-2 rounded-xl text-xs font-bold">Mark as Dispatched</button>
                </div>
              ) : (
                <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold">Enter Results</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathologyTerminal;
