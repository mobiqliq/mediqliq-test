import React from 'react';

const GSTR1Dashboard = ({ reportData }) => (
  <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900">GSTR-1 Compliance Hub</h2>
        <p className="text-slate-500 font-medium italic">Validated for 2026 GST Guidelines</p>
      </div>
      <button className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black hover:scale-95 transition-all">
        Export JSON for GST Offline Tool
      </button>
    </div>

    <div className="grid grid-cols-3 gap-6">
      <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-blue-100">
        <p className="text-[10px] font-black text-blue-600 uppercase">Table 4 (B2B)</p>
        <p className="text-2xl font-black mt-2">₹1,24,500</p>
        <p className="text-xs text-slate-400 mt-1">12 Invoices ready</p>
      </div>
      <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-purple-100">
        <p className="text-[10px] font-black text-purple-600 uppercase">Table 7 (B2C)</p>
        <p className="text-2xl font-black mt-2">₹8,45,200</p>
        <p className="text-xs text-slate-400 mt-1">Consolidated rate-wise</p>
      </div>
      <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-amber-100">
        <p className="text-[10px] font-black text-amber-600 uppercase">Validation Alerts</p>
        <p className="text-2xl font-black mt-2 text-amber-600">0 Errors</p>
        <p className="text-xs text-slate-400 mt-1">All HSN codes mapped</p>
      </div>
    </div>
  </div>
);

export default GSTR1Dashboard;
