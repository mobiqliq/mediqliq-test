import React from 'react';

const AdvancedAnalytics = ({ data }) => (
  <div className="p-12 bg-slate-950 rounded-[4rem] text-white shadow-2xl min-h-screen">
    <div className="flex justify-between items-end mb-16">
      <div>
        <h2 className="text-5xl font-black tracking-tighter">Mediqliq Intelligence</h2>
        <p className="text-slate-500 font-bold uppercase text-xs mt-2 tracking-widest">Real-time Clinical & Financial Forecasting</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black text-blue-500 uppercase">30-Day Revenue Forecast</p>
        <p className="text-4xl font-black text-white">₹{data.forecast.toLocaleString()}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Revenue Velocity Card */}
      <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10">
        <h4 className="text-xs font-black text-slate-400 mb-6 uppercase">Revenue Velocity</h4>
        <div className="h-32 flex items-end gap-1">
          {/* Simple CSS-based bar chart mock */}
          {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-blue-600/40 rounded-t-lg" style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold text-blue-400">↑ 12% vs last week</p>
      </div>

      {/* Yield per Bed (Clinical Efficiency) */}
      <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10">
        <h4 className="text-xs font-black text-slate-400 mb-6 uppercase">Avg. Revenue Per Bed (ARPOB)</h4>
        <p className="text-5xl font-black mt-2">₹18,450</p>
        <p className="text-[10px] text-slate-500 mt-2 font-bold italic">Top performing ward: Semi-Private B</p>
      </div>

      {/* Disease Burden (Clinical Intelligence) */}
      <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10">
        <h4 className="text-xs font-black text-slate-400 mb-6 uppercase">Top ICD-11 Cases</h4>
        <ul className="space-y-3">
          <li className="flex justify-between text-sm"><span>1B21.Z (Pulpitis)</span> <span className="font-bold">34%</span></li>
          <li className="flex justify-between text-sm text-slate-400"><span>9A12.0 (Cataract)</span> <span className="font-bold">22%</span></li>
          <li className="flex justify-between text-sm text-slate-400"><span>5A11 (Diabetes)</span> <span className="font-bold">18%</span></li>
        </ul>
      </div>
    </div>
  </div>
);

export default AdvancedAnalytics;
