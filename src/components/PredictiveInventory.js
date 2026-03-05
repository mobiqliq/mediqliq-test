import React from 'react';

const PredictiveInventory = ({ forecastData }) => (
  <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900">Predictive Procurement</h2>
        <p className="text-slate-500 font-medium">AI-driven stock forecasting based on appointments & velocity</p>
      </div>
      <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs">
        7-Day Forecast Active
      </div>
    </div>

    <div className="space-y-4">
      {forecastData.map(item => (
        <div key={item.id} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className={`w-3 h-3 rounded-full ${item.gap < 0 ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></div>
            <div>
              <p className="font-black text-slate-800">{item.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Linked Specialty: {item.specialty}</p>
            </div>
          </div>

          <div className="flex gap-12 text-center">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">On Hand</p>
              <p className="font-black text-slate-900">{item.currentStock}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Expected Demand</p>
              <p className="font-black text-blue-600">{item.forecastedDemand}</p>
            </div>
            <div className="bg-white px-6 py-2 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Order Suggestion</p>
              <p className={`font-black ${item.gap < 0 ? 'text-red-600' : 'text-slate-400'}`}>
                {item.gap < 0 ? `+${Math.abs(item.gap)} units` : 'Optimum'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PredictiveInventory;
