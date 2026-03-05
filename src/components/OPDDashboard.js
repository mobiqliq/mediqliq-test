import React, { useState, useEffect } from 'react';

const OPDDashboard = () => {
  const [queue, setQueue] = useState([
    { id: 101, name: 'Manish Thapa', uhid: 'MQL-8821', status: 'VITALS_DONE', payment: 'PAID', time: '10 mins ago', dept: 'Dental' },
    { id: 102, name: 'Aditi Sharma', uhid: 'MQL-9012', status: 'CHECKED_IN', payment: 'PENDING', time: '5 mins ago', dept: 'Gen Med' },
  ]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Live OPD Queue</h1>
          <p className="text-slate-500 font-medium">Monitoring {queue.length} active patients across all wings</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm text-center min-w-[120px]">
            <p className="text-[10px] font-black text-slate-400 uppercase">Avg Wait</p>
            <p className="text-xl font-bold text-blue-600">14 Min</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-8 py-6">Token / UHID</th>
              <th className="px-8 py-6">Patient Name</th>
              <th className="px-8 py-6">Department</th>
              <th className="px-8 py-6">Payment</th>
              <th className="px-8 py-6">Clinical Status</th>
              <th className="px-8 py-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {queue.map((p) => (
              <tr key={p.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-8 py-6">
                  <span className="font-mono font-bold text-slate-400">{p.uhid}</span>
                </td>
                <td className="px-8 py-6 font-bold text-slate-800">{p.name}</td>
                <td className="px-8 py-6">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{p.dept}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                    p.payment === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {p.payment}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${p.status === 'VITALS_DONE' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                    <span className="text-xs font-bold text-slate-600">{p.status.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all">
                    Start Consult
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OPDDashboard;
