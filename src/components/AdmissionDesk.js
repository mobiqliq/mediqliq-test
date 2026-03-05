import React from 'react';

const AdmissionDesk = ({ pendingAdmissions }) => {
  return (
    <div className="p-8 bg-blue-50 rounded-[3rem] border border-blue-200 shadow-inner">
      <h3 className="text-xl font-black text-blue-900 mb-6 flex items-center gap-2">
        <span>🏥</span> IPD Admission Requests
      </h3>

      <div className="space-y-4">
        {pendingAdmissions.map(req => (
          <div key={req.id} className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
            <div>
              <p className="font-black text-slate-800 text-lg">{req.patientName}</p>
              <p className="text-xs text-slate-500 font-bold">Req by: Dr. {req.doctorName} • {req.roomType}</p>
            </div>
            
            <div className="text-right flex items-center gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Required Deposit</p>
                <p className="text-xl font-black text-slate-900">₹{req.depositAmount}</p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-900 transition-all">
                Collect & Assign Bed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionDesk;
