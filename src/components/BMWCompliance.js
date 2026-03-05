import React from 'react';

const BMWCompliance = ({ dailyLogs }) => (
  <div className="p-8 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
      <span>☣️</span> BMW Compliance Tracker
    </h3>

    <div className="grid grid-cols-4 gap-4 mb-8">
      {['Yellow', 'Red', 'White', 'Blue'].map(color => (
        <div key={color} className="text-center p-4 rounded-2xl border border-slate-100">
          <div className={`w-4 h-4 rounded-full mx-auto mb-2 bg-${color.toLowerCase()}-500`}></div>
          <p className="text-[10px] font-black uppercase text-slate-500">{color}</p>
          <p className="font-bold">12.4kg</p>
        </div>
      ))}
    </div>

    <div className="space-y-3">
      {dailyLogs.map((log, i) => (
        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
          <div>
            <p className="font-bold text-slate-700">{log.wardName}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Bag ID: {log.barcode}</p>
          </div>
          <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-black">
            {log.weight} KG
          </span>
        </div>
      ))}
    </div>
  </div>
);
