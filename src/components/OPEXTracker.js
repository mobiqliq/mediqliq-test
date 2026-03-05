import React from 'react';

const OPEXTracker = ({ expenseSummary }) => {
  return (
    <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tight">OPEX Command Center</h2>
          <p className="text-slate-400 font-medium">Monitoring monthly burn and resource efficiency</p>
        </div>
        <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase">
          Budget Status: 82% Used
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        {expenseSummary.map(item => (
          <div key={item.category} className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
            <p className="text-[10px] font-bold text-slate-500 uppercase">{item.category}</p>
            <p className="text-2xl font-black mt-2">₹{item.amount.toLocaleString()}</p>
            <div className={`mt-2 text-[10px] ${item.trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {item.trend > 0 ? '↑' : '↓'} {Math.abs(item.trend)}% vs Last Month
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10">
        <h4 className="text-sm font-bold mb-6">Recent Large Outflows</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-slate-300">Biomedical Waste Disposal (Feb 2026)</span>
            <span className="font-bold">₹12,400</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-slate-300">PSA Oxygen Plant Maintenance</span>
            <span className="font-bold">₹45,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OPEXTracker;
