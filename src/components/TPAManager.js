import React from 'react';

const TPAManager = ({ patient, billAmount }) => {
  return (
    <div className="p-10 bg-white rounded-[3rem] border border-slate-200 shadow-sm max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black">Insurance / TPA Desk</h2>
        <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-[10px] font-bold">Pending Approval</span>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-slate-50 rounded-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase">Insurance Provider</p>
          <select className="w-full mt-2 bg-transparent border-none font-bold text-lg outline-none">
            <option>Star Health Insurance</option>
            <option>HDFC Ergo</option>
            <option>ICICI Lombard</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Policy Number</p>
            <input className="w-full mt-1 font-mono" placeholder="POL-12345678" />
          </div>
          <div className="p-4 border rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Pre-Auth ID</p>
            <input className="w-full mt-1 font-mono" placeholder="Waiting..." disabled />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h4 className="text-sm font-bold text-blue-800 mb-2">Compliance Check</h4>
          <p className="text-xs text-blue-600">Mediqliq has auto-attached the following for Pre-Auth:</p>
          <ul className="mt-2 text-[10px] font-bold text-blue-500 space-y-1">
            <li>✓ Hospital Registration (NOC)</li>
            <li>✓ Doctor's Qualification (MDS)</li>
            <li>✓ Estimated Treatment Plan (Dental)</li>
          </ul>
        </div>

        <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg">
          Submit Pre-Auth Request
        </button>
      </div>
    </div>
  );
};

export default TPAManager;
