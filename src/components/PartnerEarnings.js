import React from 'react';

const PartnerEarnings = ({ earningsData }) => (
  <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-xl">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-black text-slate-800">Partner Revenue (Outward)</h3>
      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase">
        Network Growth: +12%
      </span>
    </div>

    <div className="space-y-4">
      {earningsData.map(partner => (
        <div key={partner.id} className="flex justify-between items-center p-6 bg-white rounded-3xl shadow-sm">
          <div>
            <p className="font-bold text-slate-700">{partner.name}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">{partner.type} • {partner.totalReferrals} Referrals</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Comm. Accrued</p>
            <p className="text-xl font-black text-slate-900">₹{partner.totalEarned}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
