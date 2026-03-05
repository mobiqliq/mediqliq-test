import React, { useState } from 'react';

const ReferralModal = ({ patientId, onSend }) => {
  const [dept, setDept] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="p-6 bg-white rounded-3xl shadow-2xl border border-slate-200 w-96">
      <h2 className="text-xl font-black mb-4">Internal Referral</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Target Department</label>
          <select 
            className="w-full mt-1 p-3 bg-slate-50 border rounded-xl"
            onChange={(e) => setDept(e.target.value)}
          >
            <option>Select Department...</option>
            <option value="1">Dental</option>
            <option value="2">Pediatrics</option>
            <option value="3">Physiotherapy</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Clinical Note</label>
          <textarea 
            className="w-full mt-1 p-3 bg-slate-50 border rounded-xl h-24"
            placeholder="Why are you referring this patient?"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <button 
          onClick={() => onSend({ deptId: dept, note })}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
        >
          Send to Queue
        </button>
      </div>
    </div>
  );
};

export default ReferralModal;
