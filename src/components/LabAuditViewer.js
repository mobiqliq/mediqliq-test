import React from 'react';

const LabAuditViewer = ({ auditData }) => (
  <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-red-100">
    <div className="mb-8">
      <h2 className="text-2xl font-black text-slate-900">Lab-Finance Reconciliation</h2>
      <p className="text-xs text-slate-400 font-bold uppercase">Detecting samples processed without valid billing</p>
    </div>

    <table className="w-full text-left">
      <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
        <tr>
          <th className="px-6 py-4">Sample ID</th>
          <th className="px-6 py-4">Test Name</th>
          <th className="px-6 py-4">Billing Status</th>
          <th className="px-6 py-4">Risk Level</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-red-50 bg-red-50/30">
          <td className="px-6 py-4 font-mono text-xs">LAB-9921</td>
          <td className="px-6 py-4 font-bold">Lipid Profile</td>
          <td className="px-6 py-4 text-red-600 font-black">UNPAID</td>
          <td className="px-6 py-4"><span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black">CRITICAL</span></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default LabAuditViewer;
