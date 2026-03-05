import React from 'react';

const AssetTracker = ({ assets }) => (
  <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-black text-slate-900">Medical Asset Command</h2>
      <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase">
        Schedule Service
      </button>
    </div>

    <div className="space-y-4">
      {assets.map(asset => (
        <div key={asset.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className={`w-3 h-3 rounded-full ${asset.isDue ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <div>
              <p className="font-bold text-slate-800">{asset.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">S/N: {asset.serial}</p>
            </div>
          </div>

          <div className="flex gap-10">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400">Last Service</p>
              <p className="font-bold text-slate-700">{asset.lastService}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400">Next Due</p>
              <p className={`font-black ${asset.isDue ? 'text-red-600' : 'text-slate-900'}`}>{asset.nextDue}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AssetTracker;
