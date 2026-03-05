import React from 'react';

const ExpiryReturnsDashboard = ({ expiringItems }) => (
  <div className="p-10 bg-slate-50 min-h-screen">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-black text-slate-900 mb-8">Expiry & Return Management</h2>
      
      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-red-100">
        <table className="w-full text-left">
          <thead className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">Medicine (Batch)</th>
              <th className="px-8 py-4">Expiry Date</th>
              <th className="px-8 py-4">Qty</th>
              <th className="px-8 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expiringItems.map(item => (
              <tr key={item.id} className="hover:bg-red-50/50">
                <td className="px-8 py-6">
                  <p className="font-bold text-slate-800">{item.medicine_name}</p>
                  <p className="text-[10px] font-mono text-slate-400">BATCH: {item.batch_no}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="text-red-600 font-black">{item.expiry_date}</span>
                </td>
                <td className="px-8 py-6 font-bold">{item.quantity_in_hand}</td>
                <td className="px-8 py-6 text-right">
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-bold">Return to Vendor</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ExpiryReturnsDashboard;
