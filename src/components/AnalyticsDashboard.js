import React, { useState } from 'react';

const AnalyticsDashboard = () => {
  const [kpis] = useState({ revenue: '₹84,200', alerts: 4, patients: 12 });
  const [depts] = useState([
    { name: 'Dental', revenue: '₹42,000', patients: 18 },
    { name: 'Gen Med', revenue: '₹28,500', patients: 24 },
    { name: 'Pharmacy', revenue: '₹13,700', patients: 32 }
  ]);

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Hospital Performance</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue Today</p>
          <h2 className="text-4xl font-black text-blue-600 mt-2">{kpis.revenue}</h2>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Alerts</p>
          <h2 className="text-4xl font-black text-amber-500 mt-2">{kpis.alerts}</h2>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Queue</p>
          <h2 className="text-4xl font-black text-slate-900 mt-2">{kpis.patients}</h2>
        </div>
      </div>

      {/* Dept Breakdown */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
        <h3 className="font-bold text-xl mb-6">Revenue by Department</h3>
        <div className="space-y-6">
          {depts.map((d, i) => (
            <div key={i} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl transition-all">
              <span className="font-bold text-slate-700">{d.name}</span>
              <div className="flex gap-12 text-right">
                <div><p className="text-[10px] text-slate-400 uppercase">Patients</p><p className="font-bold">{d.patients}</p></div>
                <div><p className="text-[10px] text-slate-400 uppercase">Income</p><p className="font-black text-blue-600">{d.revenue}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
