import React from 'react';

const ReputationCenter = ({ stats }) => (
  <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-black text-slate-900">Patient Sentiment & Growth</h2>
      <div className="flex items-center gap-2">
        <span className="text-amber-500 text-2xl">★★★★★</span>
        <p className="font-black text-slate-800 text-xl">4.8</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase">Prompts Sent</p>
        <p className="text-2xl font-black text-slate-900">{stats.sent}</p>
      </div>
      <div className="p-6 bg-blue-50 rounded-[2.5rem] border border-blue-100 text-center">
        <p className="text-[10px] font-black text-blue-600 uppercase">Review Clicks</p>
        <p className="text-2xl font-black text-blue-900">{stats.clicks}</p>
      </div>
      <div className="p-6 bg-green-50 rounded-[2.5rem] border border-green-100 text-center">
        <p className="text-[10px] font-black text-green-600 uppercase">Conversion</p>
        <p className="text-2xl font-black text-green-900">{stats.conversion}%</p>
      </div>
    </div>
  </div>
);

export default ReputationCenter;
