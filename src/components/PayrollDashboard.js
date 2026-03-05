import React from 'react';

const PayrollDashboard = ({ payrollData }) => (
  <div className="p-10 bg-slate-50 min-h-screen">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-black text-slate-900">Payroll & HR</h2>
      <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl">
        Execute Monthly Payout
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {payrollData.map(staff => (
        <div key={staff.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center font-bold text-blue-600">
              {staff.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{staff.name}</h4>
              <p className="text-[10px] text-slate-400 uppercase font-black">Role: {staff.role}</p>
            </div>
          </div>

          <div className="flex gap-10 items-center">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Base</p>
              <p className="font-bold">₹{staff.baseSalary}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Commissions</p>
              <p className="font-bold text-green-600">₹{staff.commissionEarned}</p>
            </div>
            <div className="text-right bg-slate-50 px-6 py-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Net Payable</p>
              <p className="text-xl font-black text-slate-900">₹{staff.netPayable}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PayrollDashboard;
