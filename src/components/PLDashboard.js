import React from 'react';

const PLDashboard = ({ data }) => (
  <div className="p-12 bg-white rounded-[4rem] shadow-2xl border border-slate-100 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Profit & Loss Statement</h1>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">FY 2025-26 • Standalone & Consolidated</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black text-slate-400 uppercase">EBITDA Margin</p>
        <p className="text-3xl font-black text-blue-600">24.2%</p>
      </div>
    </div>

    <div className="space-y-8">
      {/* Revenue Section */}
      <section className="bg-slate-50 p-8 rounded-[2.5rem]">
        <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Total Operating Income</h3>
        <div className="flex justify-between items-end border-b border-slate-200 pb-4">
          <span className="font-bold text-slate-700 text-lg">Hospital & Diagnostics (SAC 9993)</span>
          <span className="font-black text-xl">₹{data.income.hosp_rev}</span>
        </div>
        <div className="flex justify-between items-end mt-4">
          <span className="font-bold text-slate-700 text-lg">Pharmacy Retail</span>
          <span className="font-black text-xl">₹{data.income.pharm_rev}</span>
        </div>
      </section>

      {/* Expenses Section */}
      <section className="px-8">
        <h3 className="text-xs font-black text-red-400 uppercase mb-4">Operating Expenses (OPEX)</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-slate-600">
            <span>Direct Consumables (COGS)</span>
            <span className="font-bold text-slate-900">(₹{data.cogs})</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Doctor Professional Fees</span>
            <span className="font-bold text-slate-900">(₹{data.proFees})</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Fixed Overhead (Rent/Utilities)</span>
            <span className="font-bold text-slate-900">(₹{data.fixedOpex})</span>
          </div>
        </div>
      </section>

      {/* Bottom Line */}
      <div className="bg-slate-900 text-white p-10 rounded-[3rem] flex justify-between items-center shadow-xl">
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase">Net Owner Earnings</h2>
          <p className="text-[10px] text-slate-500 mt-1 italic">After Tax Provisioning & Professional Fees</p>
        </div>
        <p className="text-5xl font-black text-green-400">₹{data.netProfit}</p>
      </div>
    </div>
  </div>
);

export default PLDashboard;
