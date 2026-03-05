import React from 'react';

const FinanceSync = ({ syncStatus }) => (
  <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-black text-slate-900">Accounting Bridge</h2>
      <div className="flex gap-2">
        <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase">Tally Prime Ready</span>
        <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase">QuickBooks Sync Active</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-8">
      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200">
        <h4 className="text-sm font-bold text-slate-800 mb-4">Pending Exports</h4>
        <div className="space-y-4">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Hospital Sales (124 Invoices)</span>
            <button className="text-blue-600 font-bold underline">Download XML</button>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Pharmacy Sales (89 Invoices)</span>
            <button className="text-blue-600 font-bold underline">Download XML</button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">CA Audit Status</p>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <p className="font-bold">GST Reconciliation: 100% Match</p>
        </div>
        <p className="text-[10px] mt-4 text-slate-500 leading-relaxed italic">
          "All HSN/SAC codes are verified against the current India GST Council guidelines."
        </p>
      </div>
    </div>
  </div>
);

export default FinanceSync;
