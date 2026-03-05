import React from 'react';

const DoctorPayoutReport = ({ doctorName, ledgerItems }) => {
  const totalDue = ledgerItems.reduce((acc, item) => acc + item.doctor_share, 0);

  return (
    <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Professional Fees</h2>
          <p className="text-slate-500 font-medium tracking-tight">Statement for Dr. {doctorName}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Payout Due</p>
          <p className="text-4xl font-black text-green-600">₹{totalDue.toLocaleString()}</p>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
          <tr>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Service</th>
            <th className="px-6 py-4">Patient</th>
            <th className="px-6 py-4">Bill Amount</th>
            <th className="px-6 py-4">Your Share</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {ledgerItems.map((item, i) => (
            <tr key={i} className="hover:bg-slate-50/50">
              <td className="px-6 py-4 text-xs font-medium text-slate-400">{item.date}</td>
              <td className="px-6 py-4 font-bold text-slate-700">{item.service}</td>
              <td className="px-6 py-4 text-slate-600">{item.patientName}</td>
              <td className="px-6 py-4 font-medium text-slate-400">₹{item.total_bill}</td>
              <td className="px-6 py-4 font-black text-slate-900">₹{item.doctor_share}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorPayoutReport;
