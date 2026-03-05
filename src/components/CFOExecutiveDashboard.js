import React from 'react';

const CFOExecutiveDashboard = ({ metrics }) => (
  <div className="p-12 bg-[#0F172A] min-h-screen text-slate-200 font-sans">
    <div className="flex justify-between items-end mb-16">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-white">Institutional Pulse</h1>
        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-2">Mediqliq Intelligence Engine</p>
      </div>
      <div className="bg-blue-600/10 border border-blue-500/20 px-6 py-3 rounded-2xl">
        <span className="text-[10px] font-black text-blue-400 uppercase block">Daily Yield (ARPOB)</span>
        <span className="text-2xl font-black text-white">₹14,820</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Revenue Velocity Tile */}
      <div className="dashboard-tile p-8 rounded-[3rem] relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Net Revenue (24h)</p>
          <p className="text-4xl font-black text-white">₹4.2L</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-emerald-400 font-bold text-xs">↑ 8.2%</span>
            <span className="text-slate-600 text-[10px] font-bold">vs Yesterday</span>
          </div>
        </div>
        {/* Subtle Background Sparkline Mock */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
      </div>

      {/* Bed Occupancy Heatmap Tile */}
      <div className="dashboard-tile p-8 rounded-[3rem]">
        <p className="text-[10px] font-black text-slate-500 uppercase mb-2">IPD Occupancy</p>
        <p className="text-4xl font-black text-white">82%</p>
        <div className="mt-6 flex gap-1">
          {[1,1,1,1,1,1,0,0,1,0].map((bed, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${bed ? 'bg-emerald-500/50' : 'bg-slate-700'}`}></div>
          ))}
        </div>
      </div>

      {/* Leakage/Unbilled Alert Tile */}
      <div className="dashboard-tile p-8 rounded-[3rem] border-red-500/20">
        <p className="text-[10px] font-black text-red-400/60 uppercase mb-2">Biling Leakage Alert</p>
        <p className="text-4xl font-black text-white">₹12,400</p>
        <p className="text-[10px] text-slate-500 mt-4 font-bold">Unbilled consumables in ICU-3</p>
      </div>
    </div>
  </div>
);

export default CFOExecutiveDashboard;
