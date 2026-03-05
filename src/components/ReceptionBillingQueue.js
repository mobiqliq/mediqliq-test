import React, { useState } from 'react';

const ReceptionBillingQueue = ({ pendingItems, onCollect }) => {
  return (
    <div className="p-8 bg-white rounded-[3rem] shadow-2xl border border-amber-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
        <h3 className="text-xl font-black text-slate-800">Pending Doctor Orders</h3>
      </div>

      <div className="space-y-3">
        {pendingItems.map((item, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.category}</span>
              <p className="font-bold text-slate-800">{item.item}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-slate-900">₹{item.price}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Payable Now</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Total to be Collected</p>
          <p className="text-3xl font-black text-slate-900">₹{pendingItems.reduce((a, b) => a + b.price, 0)}</p>
        </div>
        <button onClick={onCollect} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-green-600 transition-all">
          Generate Receipt & Unlock Services
        </button>
      </div>
    </div>
  );
};

export default ReceptionBillingQueue;
