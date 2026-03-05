import React from 'react';

const ReferralSettlement = ({ referrals }) => (
  <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-black text-slate-900">Referral Network Payouts</h2>
      <div className="text-right">
        <p className="text-[10px] font-black text-slate-400 uppercase">Total Outstanding</p>
        <p className="text-2xl font-black text-blue-600">₹42,500</p>
      </div>
    </div>

    <div className="space-y-4">
      {referrals.map(ref => (
        <div key={ref.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex justify-between items-center">
          <div>
            <p className="font-bold text-slate-800">Dr. {ref.doctorName}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Patient: {ref.patientName}</p>
          </div>
          <div className="flex gap-8 items-center">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400">Fee (Net of TDS)</p>
              <p className="font-black text-slate-900">₹{ref.netAmount}</p>
            </div>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase">
              Settle via UPI
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
