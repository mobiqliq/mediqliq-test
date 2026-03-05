import React from 'react';

const AuditPanel = ({ logs }) => (
  <div className="overflow-hidden">
    <h3 className="text-xl font-bold text-slate-800 mb-6">Price Revision History</h3>
    <table className="w-full text-left">
      <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
        <tr>
          <th className="px-6 py-4">Service</th>
          <th className="px-6 py-4">Adjustment</th>
          <th className="px-6 py-4">Changed By</th>
          <th className="px-6 py-4">Reason</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        <tr className="text-sm">
          <td className="px-6 py-4 font-bold text-slate-700">Root Canal Treatment</td>
          <td className="px-6 py-4">
            <span className="text-red-500">₹5,000</span> → <span className="text-green-600">₹5,500</span>
          </td>
          <td className="px-6 py-4 text-slate-500 font-medium">Dr. Manish (Owner)</td>
          <td className="px-6 py-4 italic text-slate-400">"Annual Tariff Revision"</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default AuditPanel;
