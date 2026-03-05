import React from 'react';

const VitalsChart = ({ vitalsHistory }) => (
  <div className="p-8 bg-slate-900 rounded-[3rem] text-white shadow-2xl">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-xl font-black">Clinical Trend Monitor</h3>
      <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">Live Sync Active</span>
    </div>

    {/* Simple Visual representation of Pulse and BP trends */}
    <div className="h-48 flex items-end gap-2 border-b border-white/10 pb-4">
      {vitalsHistory.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-blue-500/40 rounded-t-lg" style={{ height: `${v.pulse}%` }}></div>
          <span className="text-[8px] font-bold">{v.time}</span>
        </div>
      ))}
    </div>
    
    <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
        <p className="text-[10px] text-slate-500 uppercase font-black">Total Intake (24h)</p>
        <p className="text-xl font-bold">1850 ml</p>
      </div>
      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
        <p className="text-[10px] text-slate-500 uppercase font-black">Total Output (24h)</p>
        <p className="text-xl font-bold text-amber-400">1420 ml</p>
      </div>
    </div>
  </div>
);
